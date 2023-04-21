const constants = require('../constant')
const isValidRole = (role) => {
    for(let validRole of constants.ROLE)
    {
        if(role.toUpperCase()==validRole) return role.toUpperCase();
    }
    throw {status:400,error:'Invalid role'}
}
module.exports = {
isValidRole
};