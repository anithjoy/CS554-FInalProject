const express = require('express');
const router = express.Router();

//Anyone can pickup this
router
  .route('/:userId')
  .get(async (req, res) => {

  })
  .patch(async (req, res) => {

    })

module.exports = router;