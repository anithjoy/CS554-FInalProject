const mongoCollections = require('../config/mongoCollections');
const companies = mongoCollections.company;
const userData = require("./user");
const {ObjectId} = require('mongodb');
const helper = require('../helper');

const getCompanyById = async (id) => {
    id = helper.common.isValidId(id);

    const companyCollection = await companies();
    const company = await companyCollection.findOne({_id: new ObjectId(id)},{projection:{hashedPassword:0}});
    if (company === null) throw {status:"404",error:'No company with that id'};
    company['_id']=company['_id'].toString()
    return company;
  };

  const isCompanyEmailInDb = async(email) => {
    email=helper.common.isValidEmail(email).toLowerCase();

    const companyCollection = await companies();
    const companyInDb = await companyCollection.findOne({email:email});
    if (companyInDb === null) return false;
    return true;  
  }

  const isEINInDb = async(EIN) => {
    EIN=helper.company.isValidEIN(EIN);

    const companyCollection = await companies();
    const companyInDb = await companyCollection.findOne({EIN:EIN});
    if (companyInDb === null) return false;
    return true;  
  }

const createCompany = async (email,EIN,name) => {
    email = helper.common.isValidEmail(email);
    EIN = helper.company.isValidEIN(EIN);
    name = helper.common.isValidString(name,'company name');

    if(await isCompanyEmailInDb(email)) throw {status:400,error:'An company account already exists with this email'};
    if(await userData.isUserEmailInDb(email)) throw {status:400,error:'An user account already exists with this email'};
    if(await isEINInDb(EIN)) throw {status:400,error:'An account already exists with this EIN'};
    
    let newCompany = {
        email,
        EIN,
        name
    }

    const companyCollection = await companies(); 
    const insertInfo = await companyCollection.insertOne(newCompany);
    if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw {status:"400",error:'Could not add Company'};

    const newCompanyId = insertInfo.insertedId.toString();
    await userData.createUser(newCompanyId,email,"Company Account","SUPER-ADMIN");
    return await getCompanyById(newCompanyId);
}

module.exports = {
    createCompany,
    getCompanyById
};