const mongoCollections = require("../config/mongoCollections");
const states = mongoCollections.state;
const allHelper = require("../helper");
const helper = allHelper.state;
const commonHelp = allHelper.common;
const { ObjectId } = require("mongodb");

// input - name,companyid,transition,description
const createState = async (name, companyId, transition, description) => {
  // validation

  // name validation
  name = helper.checkName(name);

  //   company
  companyId = helper.checkId(companyId);
  await commonHelp.checkCompanyById(companyId);

  // transition
  transition = helper.checkTransition(transition);
  await Promise.all(
    transition.map(async (id) => {
      await checkState(id);
    })
  );

  // description
  description = helper.checkDescription(description);

  //   stateID,companyID,Name,transition,description
  const newState = {
    _id: new ObjectId(),
    name: name,
    companyId: companyId,
    transition: transition,
    description: description,
  };
  const stateCollection = await states();
  const insertInfo = await stateCollection.insertOne(newState);

  if (!insertInfo.acknowledged || !insertInfo.insertedId) {
    throw { status: 500, error: "Could not add project" };
  }
  const newId = insertInfo.insertedId.toString();
  const stateDocument = await getStateById(newId);

  if (!stateDocument) {
    throw { status: 404, error: "couldn't find state" };
  }
  return stateDocument;
};

const checkState = async (id) => {
  // id
  id = helper.checkId(id);
  const stateCollection = await states();
  const state = await stateCollection.findOne({ _id: new ObjectId(id) });
  if (!state) {
    throw { status: 404, error: "couldn't find state" };
  }
};

const getStateById = async (id) => {
  // id
  id = helper.checkId(id);

  const stateCollection = await states();
  const state = await stateCollection.findOne({ _id: new ObjectId(id) });
  if (!state) {
    throw { status: 404, error: "couldn't find state" };
  }
  return state;
};

const getAllState = async (companyId) => {
  // id
  companyId = helper.checkId(companyId);

  const stateCollection = await states();
  const resState = await stateCollection
    .find({ companyId: companyId })
    .toArray();

  if (resState.length === 0) {
    throw { status: 404, error: "No states found with the given companyId" };
  }
  return resState;
};

const updateState = async (
  stateId,
  name,
  companyId,
  transition,
  description
) => {
  stateId = helper.checkId(stateId);
  name = helper.checkName(name);

  //   company
  companyId = helper.checkId(companyId);
  await commonHelp.checkCompanyById(companyId);

  // transition
  transition = helper.checkTransition(transition);
  await Promise.all(
    transition.map(async (id) => {
      await checkState(id);
    })
  );

  description = helper.checkDescription(description);

  const stateCollection = await states();
  const updatedInfo = await stateCollection.updateOne(
    { _id: new ObjectId(stateId) },
    {
      $set: {
        name: name,
        companyId: companyId,
        transition: transition,
        description: description,
      },
    }
  );

  if (updatedInfo.matchedCount < 1) {
    throw { status: 404, error: "State not found with the given stateId" };
  }

  if (!updatedInfo.matchedCount && !updatedInfo.modifiedCount) {
    throw { status: 500, error: "State update failed" };
  }

  const newState = await getStateById(stateId);
  return newState;
};

module.exports = {
  createState,
  getStateById,
  getAllState,
  updateState,
  checkState,
};
