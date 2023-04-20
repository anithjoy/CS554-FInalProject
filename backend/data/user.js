const mongoCollections = require('../config/mongoCollections');
const helper = require('../helper');
const users = mongoCollections.user;
const {ObjectId} = require('mongodb');
const bcryptjs = require('bcryptjs');
const saltRounds = 10;

const getUserById = async (id) =>{
    helper.common.isValidId(id);
    const userCollection = await users();
    const user = await userCollection.findOne({_id : new ObjectId(id)});
    user._id = user._id.toString();
    return user;
}
const updateUser = async (id,email,name,role,companyId,accessProjects) =>{
    id = helper.common.isValidId(id);
    const userCollection = await users();
    email = helper.common.isValidEmail(email);
    name = helper.common.isValidString(name,'name');
    role = helper.user.isValidRole(role);
    companyId = helper.common.isValidId(companyId);
    let newUser = {
        email,
        name,
        role,
        companyId,
        accessProjects,
    };
    const updateInfo = await userCollection.updateOne({_id : new ObjectId(id)}, {$set : newUser});
    if (updateInfo.modifiedCount === 0) {
      throw {status:500 , error : 'could not update user successfully'};
    }

    const user = await getUserById(id);
    return user;
}

const createUser = async(companyId,email,name,role,password) => {
    companyId = helper.common.isValidId(companyId);
    email = helper.common.isValidEmail(email);
    name = helper.common.isValidString(name,'user name');
    role = helper.user.isValidRole(role);
    password = helper.common.isValidPassword(password);
    
// Add checking if a company exists with this companyId
// 
// 
// 


    if(await isUserEmailInDb(email)) throw {status:400,error:'A user account already exists with this email'};
    
    let hashedPassword = await bcryptjs.hash(password,saltRounds);

    let newUser = {
      companyId,
      email,
      name,
      hashedPassword,
      role,
      accessProjects:[]
  }
  const userCollection = await users(); 
  const insertInfo = await userCollection.insertOne(newUser);
  if (!insertInfo.acknowledged || !insertInfo.insertedId)
  throw {status:"400",error:'Could not add User'};

  const newUserId = insertInfo.insertedId.toString();
  return await getUserById(newUserId);

}
const isUserEmailInDb = async(email) => {
    email=helper.common.isValidEmail(email).toLowerCase();
  
    const userCollection = await users();
    const userInDb = await userCollection.findOne({email:email});
    if (userInDb === null) return false;
    return true;  
  }

const getUsersByCompanyId = async(companyId) => {
    companyId = helper.common.isValidId(companyId);
    //check if a company exists with that id
    const userCollection = await users()
    const companyUsers = await userCollection.find({companyId: companyId}).toArray();
    if (companyUsers === null) throw {status:"404",error:'No users in that company'};
    for(let tempUser of companyUsers)
    tempUser['_id']=tempUser['_id'].toString()
    return companyUsers;
}

module.exports = {
    getUserById,
    updateUser,
    createUser,
    getUsersByCompanyId
};