const express = require("express");
const router = express.Router();
const redis = require('redis');
const client = redis.createClient({url: "redis://redis:6379/"});
client.connect().then(() => {});
const helper = require("../helper");
const { state: stateData } = require("../data");
const xss = require('xss');

//Anith
router
  .route("/")
  .get(async (req, res) => {

    let companyId = req.user.companyId;
    try{
      companyId = helper.common.isValidId(companyId);
    } catch (e) {
      if (typeof e !== "object" || !("status" in e))
        res.status(500).json("Internal server error");
      else res.status(parseInt(e.status)).json(e.error);
      return;
    }

    try {
      const states = await stateData.getAllState(companyId);
      await client.hSet("state", req.user.companyId, JSON.stringify(states));
      return res.status(200).json(states);
    } catch (e) {
      if (typeof e !== "object" || !("status" in e))
        res.status(500).json("Internal server error");
      else res.status(parseInt(e.status)).json(e.error);
      return;
    }
  })
  .post(async (req, res) => {
    const data = req.body;
    try {
      for(let i in data)
      {
        if(i == 'transition'){
          for(let w=0;w<data[i].length;w++){
            data[i][w] = xss(data[i][w]);
          }
        }
        else data[i]=xss(data[i]);
      }
      data.name = helper.state.isValidStateName(data.name);
      data.companyId = helper.common.isValidId(req.user.companyId);
      data.transition = helper.state.isValidTransition(data.transition);
      data.description = helper.state.isValidDescription(data.description);
      await Promise.all(
        data.transition.map(async (id) => {
          await stateData.getStateById(id);
        })
      );
    } catch (error) {
      if (typeof e !== "object" || !("status" in e))
        res.status(500).json("Internal server error");
      else res.status(parseInt(e.status)).json(e.error);
      return;
    }
    try {
      const newState = await stateData.createState(
        data.name,
        data.companyId,
        data.transition,
        data.description
      );
      await client.set(newState._id.toString(), JSON.stringify(newState));
      await client.hDel("state", req.user.companyId);
      return res.status(201).json(newState);
    } catch (e) {
      if (typeof e !== "object" || !("status" in e))
        res.status(500).json("Internal server error");
      else res.status(parseInt(e.status)).json(e.error);
      return;
    }
  });

//Anith
router
  .route("/:stateId")
  .get(async (req, res) => {
    try {
      let stateId = req.params.stateId;
      stateId = helper.common.isValidId(stateId);

      const state = await stateData.getStateById(stateId);
      await client.set(state._id.toString(), JSON.stringify(state));
      return res.status(200).json(state);
    } catch (e) {
      if (typeof e !== "object" || !("status" in e))
        res.status(500).json("Internal server error");
      else res.status(parseInt(e.status)).json(e.error);
      return;
    }
  })
  .patch(async (req, res) => {
    try {
      let stateId = req.params.stateId;
      let data = req.body;
      for(let i in data)
      {
        if(i == 'transition'){
          for(let w=0;w<data[i].length;w++){
            data[i][w] = xss(data[i][w]);
          }
        }
        else data[i]=xss(data[i]);
      }
      stateId = helper.common.isValidId(stateId);
      data = helper.state.isValidData(data);

      const updatedState = await stateData.updateState(stateId, data);
      await client.set(updatedState._id.toString(), JSON.stringify(updatedState));
      await client.hDel("state", req.user.companyId);
      return res.status(200).json(updatedState);
    } catch (e) {
      if(typeof e !== 'object' || !('status' in e))
        res.status(500).json("Internal server error");
      else res.status(parseInt(e.status)).json(e.error);
      return;
    }
  });

module.exports = router;
