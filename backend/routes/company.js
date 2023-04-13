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
        // bodyData.email=commonHelper.isValidEmail(bodyData.email);
        // bodyData.age = patientHelper.isValidAge(bodyData.age);
        // bodyData.name=commonHelper.isValidName(bodyData.name);
        
        // bodyData.zip=commonHelper.isValidZip(bodyData.zip);
        // bodyData.password=commonHelper.isValidPassword(bodyData.password);
        
        let newCompany = await companyData.createCompany(bodyData.email,bodyData.EIN,bodyData.name,bodyData.password);
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

 })
 .post(async (req, res) => {

 })

module.exports = router;