const mongoCollections = require('../config/mongoCollections');
const helper = require('../helper');
const users = mongoCollections.user;
const {ObjectId} = require('mongodb');

const getuserById = async (id) =>{
    helper.common.checkId(id);
    console.log('Showing data of '+id);
    const userCollection = await users();
    const user = await userCollection.findOne({_id : new ObjectId(id)});
    user._id = user._id.toString();
    return user;
}
const updateUser = async (id,email,name,role,companyId,accessProjects) =>{
    helper.common.checkId(id);
    const userCollection = await users();
    email = helper.common.checkEmail(email);
    name = helper.common.checkName(name);
    role = helper.common.checkRole(role);
    companyId = helper.common.checkId(companyId);
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

    const user = await getuserById(id);
    return user;
}
module.exports = {
    getuserById,
    updateUser
};