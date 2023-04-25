const express = require('express');
const router = express.Router();
const data = require("../data");
const helper = require('../helper');
const companyData = data.company;
const xss = require('xss');

//Maggie
router
 .route('/')
 .post(async (req, res) => {
    try{
        const bodyData = req.body;
        for(let i in bodyData)
          bodyData[i]=xss(bodyData[i])
        bodyData.email=helper.common.isValidEmail(bodyData.email);
        bodyData.name=helper.common.isValidString(bodyData.name, 'company name');
        bodyData.EIN=helper.company.isValidEIN(bodyData.EIN);
        
        let newCompany = await companyData.createCompany(bodyData.email,bodyData.EIN,bodyData.name);
        if(newCompany){
          res.json(newCompany);
        } else throw {status:401,error:'Could not create company'};
      }catch(e){
        if(typeof e !== 'object' || !('status' in e))
          res.status(500).json("Internal server error");
        else
          res.status(parseInt(e.status)).json(e.error);
        return;
      }
 })

//Maggie
router
 .route('/:companyId/user')
 .get(async (req, res) => {
  try{
    req.params.companyId = helper.common.isValidId(req.params.companyId);
        
    let users = await data.user.getUsersByCompanyId(req.params.companyId);
    if(users){
      res.json(users);
    } else throw {status:401,error:'Could not create user'};
  }catch(e){
    if(typeof e !== 'object' || !('status' in e))
    res.status(500).json("Internal server error");
  else
    res.status(parseInt(e.status)).json(e.error);
  return;
  }  
 })
 .post(async (req, res) => {
  try{
    req.params.companyId = helper.common.isValidId(req.params.companyId);
    const bodyData = req.body;
    for(let i in bodyData)
      bodyData[i]=xss(bodyData[i])
    bodyData.email=helper.common.isValidEmail(bodyData.email);
    bodyData.name=helper.common.isValidString(bodyData.name, 'user name');
    bodyData.role=helper.user.isValidRole(bodyData.role);
        
    let users = await data.user.createUser(req.params.companyId,bodyData.email,bodyData.name,bodyData.role);
    if(users){
      res.json(users);
    } else throw {status:401,error:'Could not create user'};
  }catch(e){
    if(typeof e !== 'object' || !('status' in e))
    res.status(500).json("Internal server error");
  else
    res.status(parseInt(e.status)).json(e.error);
  return;
  }  
 })

module.exports = router;