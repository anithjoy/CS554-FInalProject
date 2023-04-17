const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.user;
const helper = require('../helper')

//Anyone can pickup this
router
  .route('/:userId')
  .get(async (req, res) => {
    try {
      req.params.userId = helper.common.checkId(req.params.userId);
    } catch (e) {
        res.status(e.status).json(e.error);
      return;
    }
    try{
        let user = await userData.getUserById(req.params.userId);
        res.json(user);
    }catch(e){
        res.status(e.status).json(e.error);
      return;
    }

  })
  .patch(async (req, res) => {
    let userReq = req.body;
    try{
        let userInfo = await userData.getUserById(req.params.userId);
        email = userReq.email  || userInfo.email;
        let name = userReq.name || userInfo.name;
        role = userReq.role  || userInfo.role ;
        companyId = userReq.companyId  || userInfo.companyId;
        accessProjects = userReq.accessProjects  || userInfo.accessProjects;

        email = helper.common.checkEmail(email);
        name = helper.common.checkName(name);
        role = helper.common.checkRole(role);
        companyId = helper.common.checkId(companyId);

        console.log('Updating user : ' +name);

        const newUser = await userData.updateUser(
            req.params.userId,
            email,
            name,
            role,
            companyId,
            accessProjects
        )
        res.json(newUser);
    }catch(e){
        res.status(e.status).json(e.error);
        return;
    }

    })

module.exports = router;