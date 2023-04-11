const {ObjectId} = require('mongodb');
const checkId = (id) =>{
    if (!id) throw {status:400, error : 'You must provide an id to search for'};
    if (typeof id !== 'string') throw {status:400, error : 'Id must be a string'};
    if (id.trim().length === 0)
        throw {status:400, error : 'Id cannot be an empty string or just spaces'};
    id = id.trim();
    if (!ObjectId.isValid(id)) throw {status:400, error : 'invalid object ID'};
    return id;
    }
const checkName = (name) => {
    if (!name) throw {status:400, error : 'You must provide an name to search for'};
    name = name.trim();
    if(typeof name !== 'string'){
        throw {status:400, error : 'not a string'};
    }
    if(name.length<4){
        throw {status:400, error : 'less than 4 character name'};
    }
    if(/[~`!@#$%\^&*+=\-\[\]\\;,/{}|\\":<>\?]/g.test(name)){
        throw {status:400, error : 'speical character not allowed'};
    }
    name = name.toLowerCase();
    return name;
};

const checkEmail = (email) => {
    if (!email) throw {status: '400', error : `You must provide an email`};
    if (typeof email !== 'string') throw {status: '400', error : `email must be a string`};
    email = email.trim()
    if (email.length === 0)
      throw {status: '400', error : `email cannot be an empty string or just spaces`};
    if(!email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ))
      throw {status: '400', error : 'Invalid Email'}
    return email.toLowerCase();
}
module.exports = {
    checkId,
    checkName,
    checkEmail
};