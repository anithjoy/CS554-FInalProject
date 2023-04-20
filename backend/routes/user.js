const express = require('express');
const router = express.Router();
const data = require('../data');
const helper = require('../helper')

//Anyone can pickup this
router
  .route('/:userId')
  .get(async (req, res) => {
    try {
      req.params.userId = helper.common.isValidId(req.params.userId);
    } catch (e) {
        res.status(e.status).json(e.error);
      return;
    }
    try{
        let user = await data.user.getUserById(req.params.userId);
        res.json(user);
    }catch(e){
        res.status(e.status).json(e.error);
      return;
    }

  })
  .patch(async (req, res) => {
    try{
        let body = req.body;
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
              break;
            case "accessProjects":
              body.accessProjects = helper.user.isValidAccessProjects(body.accessProjects);
              break;
            default:
              throw { status: 400, error: `Invalid key - ${field}` };
          }
        }

        const newUser = await data.user.updateUser(req.params.userId,body);
        res.json(newUser);
    }catch(e){
        res.status(e.status).json(e.error);
        return;
    }

    })

module.exports = router;