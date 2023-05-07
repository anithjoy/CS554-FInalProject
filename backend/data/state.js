const mongoCollections = require("../config/mongoCollections");
const companies = mongoCollections.company;
const stateCol = mongoCollections.state;
const helper = require("../helper");
const { ObjectId } = require("mongodb");
const constant = require("../constant");

const getCompanyById = async (id) => {
  id = helper.common.isValidId(id);

  const companyCollection = await companies();
  const company = await companyCollection.findOne({_id: new ObjectId(id)},{projection:{hashedPassword:0}});
  if (company === null) throw {status:"404",error:'No company with that id'};
  company['_id']=company['_id'].toString()
  return company;
};

const createState = async (name, companyId, transition, description, flag=true) => {
  name = helper.state.isValidStateName(name);

  companyId = helper.common.isValidId(companyId);
  await getCompanyById(companyId);

  description = helper.state.isValidDescription(description);

  transition = helper.state.isValidTransition(transition);
  let companyStates = await getAllState(companyId);
  let companyStateIds = companyStates.map(s => s._id.toString());
  for(let t of transition){
    if(!companyStateIds.includes(t)) throw {status:400,error:'Invalid transition Id'}
  }

  if(flag && constant.DEFAULT_STATE.includes(name.toUpperCase()))
  throw {
    status: 403,
    error: "Forbidden - can't create state with this name",
  };

  await Promise.all(
    transition.map(async (id) => {
      await getStateById(id);
    })
  );

  const newState = {
    name: name,
    companyId: companyId,
    transition: transition,
    description: description,
  };
  const stateCollection = await stateCol();
  const insertInfo = await stateCollection.insertOne(newState);

  if (!insertInfo.acknowledged || !insertInfo.insertedId) {
    throw { status: 500, error: "Could not add state" };
  }

  const newId = insertInfo.insertedId.toString();
  const stateDocument = await getStateById(newId);

  return stateDocument;
};

const getStateById = async (stateId) => {
  stateId = helper.common.isValidId(stateId);

  const stateCollection = await stateCol();
  const state = await stateCollection.findOne({ _id: new ObjectId(stateId) });
  if (!state) {
    throw { status: 404, error: "couldn't find state" };
  }
  return state;
};

const getAllState = async (companyId) => {
  companyId = helper.common.isValidId(companyId);

  const stateCollection = await stateCol();
  const resState = await stateCollection
    .find({ companyId: companyId })
    .toArray();

  return resState;
};

const updateState = async (stateId, data) => {
  stateId = helper.common.isValidId(stateId);
  data = helper.state.isValidData(data);

  const state = await getStateById(stateId);
  if(constant.DEFAULT_STATE.includes(state.name))
    throw {
      status: 403,
      error: "Forbidden",
    };

  if(data.transition.length){
    let companyStates = await getAllState(companyId);
    let companyStateIds = companyStates.map(s => s._id);
    for(let t of data.transition){
      if(!companyStateIds.includes(t)) throw {status:400,error:'Invalid transition Id'}
    }
  }
  const stateCollection = await stateCol();
  const updatedInfo = await stateCollection.updateMany(
    { _id: new ObjectId(stateId) },
    {
      $set: data,
    }
  );

  if (updatedInfo.modifiedCount === 0) {
    throw {
      status: 400,
      error: "could not update because values are same as previous one",
    };
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
};
