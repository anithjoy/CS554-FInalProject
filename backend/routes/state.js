const express = require("express");
const router = express.Router();
const stateData = require("../data/state");
const allHelper = require("../helper");
const helper = allHelper.state;
const commonHelp = allHelper.common;

// /state
// Post - create a state ->
// Get - get all the state of the ticket for that company (company information can be retrieve using login info or can be pass as query params ->Done
// /state/:stateId
// Get - to get information about a particular state
// Patch - update info of the state

//Anith
router
  .route("/")
  //  Do i have to do pagiantion for get all states ?
  .get(async (req, res) => {
    try {
      let companyId = req.query.companyId;
      companyId = helper.checkId(companyId);
      await commonHelp.checkCompanyById(companyId);

      const states = await stateData.getAllState(companyId);
      return res.status(200).json({ allState: states });
    } catch (error) {
      return res.status(error.status).json({ error: error.error });
    }
  })
  .post(async (req, res) => {
    try {
      // inputs => name,comapnyID,transition,description
      let name = req.body.name;
      let companyId = req.query.companyId;
      let transition = req.body.transition;
      let description = req.body.description;

      // validation
      name = helper.checkName(name);

      companyId = helper.checkId(companyId);
      await commonHelp.checkCompanyById(companyId);

      transition = helper.checkTransition(transition);
      await Promise.all(
        transition.map(async (id) => {
          await stateData.checkState(id);
        })
      );

      description = helper.checkDescription(description);

      const newState = await stateData.createState(
        name,
        companyId,
        transition,
        description
      );

      return res.status(200).json({ state: newState });
    } catch (error) {
      return res.status(error.status).json({ error: error.error });
    }
  });

//Anith
router
  .route("/:stateId")
  .get(async (req, res) => {
    try {
      let stateId = req.params.stateId;
      let companyId = req.query.companyId;
      stateId = helper.checkId(stateId);

      const state = await stateData.getStateById(stateId);
      if (state.companyId != companyId) {
        return res.status(401).json({ error: "Unauthorized access" });
      }
      return res.status(200).json({ state: state });
    } catch (error) {
      return res.status(error.status).json({ error: error.error });
    }
  })
  .patch(async (req, res) => {
    try {
      let stateId = req.params.stateId;
      stateId = helper.checkId(stateId);

      const prevState = await stateData.getStateById(stateId);

      let companyId = req.query.companyId;
      await commonHelp.checkCompanyById(companyId);
      companyId = helper.checkId(companyId);
      if (prevState.companyId != companyId) {
        return res.status(401).json({ error: "Unauthorized access" });
      }

      let name = req.body.name || prevState.name;
      let transition = req.body.transition || prevState.transition;
      let description = req.body.description || prevState.description;

      name = helper.checkName(name);

      transition = helper.checkTransition(transition);
      await Promise.all(
        transition.map(async (id) => {
          await stateData.checkState(id);
        })
      );

      description = helper.checkDescription(description);

      const updatedState = await stateData.updateState(
        stateId,
        name,
        companyId,
        transition,
        description
      );
      return res.status(200).json({ state: updatedState });
    } catch (error) {
      return res.status(error.status).json({ error: error.error });
    }
  });

module.exports = router;
