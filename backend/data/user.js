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
const updateUser = async (userId,body) =>{
    for(let field in body){
        switch(field)
        {
          case "name":
            body.name = helper.common.isValidString(body.name,'name');
            break;
          case "role":
            body.role = helper.user.isValidRole(body.role);
            break;
          case "password":
            body.password = helper.common.isValidPassword(body.password);
            body.hashedPassword = await bcryptjs.hash(body.password, saltRounds);
            delete body.password;
            break;
          case "accessProjects":
            body.accessProjects = helper.user.isValidAccessProjects(body.accessProjects);
            break;
          default:
            throw { status: 400, error: `Invalid key - ${field}` };
        }
      }
    let userInDb = await getUserById(userId);
    if(!userInDb) throw {status:400,error:'No user with that ID'}  
    if(body.accessProjects){
        body.accessProjects = [...userInDb.accessProjects,...body.accessProjects];
    }
    const userCollection = await users();
    const updateInfo = await userCollection.updateMany({_id : new ObjectId(userId)}, {$set : body});
    if (updateInfo.modifiedCount === 0) {
      throw {status:500 , error : 'Could not update user successfully'};
    }

    return await getUserById(userId);
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