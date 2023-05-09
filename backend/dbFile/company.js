const {ObjectId} = require('mongodb');

const company = [{
    "_id": new ObjectId( "6448fbb3d6242a22961da169"),
    "email": "pdarji@stevens.edu",
    "EIN": "123456789",
    "name": "MSI"
  },{
    "_id": new ObjectId( "645350d158315fe8ba85fc10"),
    "email": "pdarji999@stevens.edu",
    "EIN": "123456777",
    "name": "MSI"
  },{
    "_id": new ObjectId( "6456310ce9637d3dfce74967"),
    "email": "pdarji00@stevens.edu",
    "EIN": "123344556",
    "name": "MSI"
  },{
    "_id": new ObjectId( "64583021dac460ef6aa8a9b1"),
    "email": "pdarji0011@stevens.edu",
    "EIN": "121232459",
    "name": "MSI"
  }]

  module.exports = company;