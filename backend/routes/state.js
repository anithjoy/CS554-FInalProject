const express = require('express');
const router = express.Router();
const helper = require('../helper');
const {state : stateData} = require("../data");

//Anith
router
  .route("/")
  .get(async (req, res) => {
    let companyId = req.user.companyId;
    try{
      companyId = helper.common.isValidId(companyId);
    } catch (error) {
      if(typeof e !== 'object' || !('status' in e))
        res.status(500).json("Internal server error");
      else
        res.status(parseInt(e.status)).json(e.error);
      return;
    }

    try {
      const states = await stateData.getAllState(companyId);
      return res.status(200).json(states);
    } catch (error) {
      if(typeof e !== 'object' || !('status' in e))
        res.status(500).json("Internal server error");
      else
        res.status(parseInt(e.status)).json(e.error);
      return;
    }
  })
  .post(async (req, res) => {
    const data = req.body;
    try{
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
      if(typeof e !== 'object' || !('status' in e))
        res.status(500).json("Internal server error");
      else
        res.status(parseInt(e.status)).json(e.error);
      return;
    }
    try {
      const newState = await stateData.createState(
        data.name,
        data.companyId,
        data.transition,
        data.description
      );

      return res.status(201).json(newState);
    } catch (error) {
      if(typeof e !== 'object' || !('status' in e))
        res.status(500).json("Internal server error");
      else
        res.status(parseInt(e.status)).json(e.error);
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
      return res.status(200).json(state);
    } catch (error) {
      if(typeof e !== 'object' || !('status' in e))
        res.status(500).json("Internal server error");
      else
        res.status(parseInt(e.status)).json(e.error);
      return;
    }
  })
  .patch(async (req, res) => {
    try {
      let stateId = req.params.stateId;
      let data = body.data;

      stateId = helper.common.isValidId(stateId);
      data = helper.state.isValidData(data);

      const updatedState = await stateData.updateState(
        stateId,
        data
      );
      return res.status(200).json(updatedState);
    } catch (error) {
      if(typeof e !== 'object' || !('status' in e))
        res.status(500).json("Internal server error");
      else
        res.status(parseInt(e.status)).json(e.error);
      return;
    }
  });

module.exports = router;
