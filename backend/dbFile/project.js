const {ObjectId} = require('mongodb');

const project = [{
    "_id": new ObjectId("644903971ed69af2c16ed405"),
    "name": "project 1",
    "companyId": "6448fbb3d6242a22961da169",
    "creator": "pdarji@stevens.edu",
    "manager": "pdarji99@gmail.com",
    "watchers": [
      "pdarji99@gmail.com",
      "pdarji7777@gmail.com",
      "pdarji@stevens.edu",
      "pdarji998@gmail.com"
    ],
    "sprint": [
      {
        "_id": {
          "$oid": "64510f98764ef067c6aff8f2"
        },
        "name": "New One nn",
        "startDate": {
          "$date": {
            "$numberLong": "1683120404000"
          }
        },
        "description": "hahahahavvfjdjkvdksv",
        "endDate": {
          "$date": {
            "$numberLong": "1684209600000"
          }
        }
      },
      {
        "_id": {
          "$oid": "64527a569ad888ce6273a8b1"
        },
        "name": "New One",
        "startDate": {
          "$date": {
            "$numberLong": "1683126865000"
          }
        },
        "description": "xxx"
      },
      {
        "_id": {
          "$oid": "64527ac29ad888ce6273a8b2"
        },
        "name": "New One",
        "startDate": {
          "$date": {
            "$numberLong": "1683731773000"
          }
        },
        "description": "aaafdfsd"
      },
      {
        "_id": {
          "$oid": "64562e8c1d0cededde2c8329"
        },
        "name": "New Onec2",
        "startDate": {
          "$date": {
            "$numberLong": "1684900800000"
          }
        },
        "description": "yghgbjh"
      }
    ],
    "description": "pddddrr"
  },{
    "_id": new ObjectId("644e66e8f2d62c1d3d6e9ab3"),
    "name": "Project 2",
    "companyId": "6448fbb3d6242a22961da169",
    "creator": "pdarji@stevens.edu",
    "manager": "pdarji99@gmail.com",
    "watchers": [
      "pdarji998@gmail.com",
      "pdarji@gmail.com",
      "pdarji@stevens.edu",
      "pdarji99@gmail.com"
    ],
    "sprint": [],
    "description": "Testing"
  }]

  module.exports = project