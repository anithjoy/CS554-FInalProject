const express = require('express');
const router = express.Router();

//Dhru
router
 .route('/')
 .get(async (req, res) => {

 })
 .post(async (req, res) => {

 })

//Dhru
router
 .route('/:projectId')
 .get(async (req, res) => {

 })
 .patch(async (req, res) => {

 })

//Maunish
router
 .route('/:projectId/sprint')
 .get(async (req, res) => {

 })
 .post(async (req, res) => {

 })

//Maunish
router
 .route('/:projectId/sprint/sprintId')
 .get(async (req, res) => {

 })
 .patch(async (req, res) => {

 })

//PD
router
 .route('/:projectId/ticket')
 .get(async (req, res) => {

 })

module.exports = router;