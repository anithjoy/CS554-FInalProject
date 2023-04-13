const mongoCollections = require('../config/mongoCollections');
const companies = mongoCollections.company;

const bcryptjs = require('bcryptjs');

const {ObjectId} = require('mongodb');

const saltRounds = 10;

const getCompanyById = async (id) => {
    //id = commonHelper.isValidId(id);

    const companyCollection = await companies();
    const company = await companyCollection.findOne({_id: new ObjectId(id)},{projection:{hashedPassword:0}});
    if (company === null) throw {status:"404",error:'No company with that id'};
    company['_id']=company['_id'].toString()
    return company;
  };

const createCompany = async (email,EIN,name,password) => {
    let hashedPassword = await bcryptjs.hash(password,saltRounds);
    let newCompany = {
        email,
        EIN,
        name,
        hashedPassword
    }
    const companyCollection = await companies(); 
    const insertInfo = await companyCollection.insertOne(newCompany);
    if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw {status:"400",error:'Could not add Company'};

    const newCompanyId = insertInfo.insertedId.toString();
    return await getCompanyById(newCompanyId);
}



module.exports = {
    createCompany,
    getCompanyById
};