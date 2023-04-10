const express = require('express');
const router = express.Router();

//PD
router
.route('/')
.post(async (req, res) => {

})

//PD
router
 .route('/:ticketId')
 .get(async (req, res) => {

 })
 .patch(async (req, res) => {

 })

//Megh
router
.route('/:ticketId/comment')
 .get(async (req, res) => {

 })
 .post(async (req, res) => {

 })

//Anyone can pickup this
router
 .route('/:ticketId/comment/commentId')
 .delete(async (req, res) => {

    })

module.exports = router;