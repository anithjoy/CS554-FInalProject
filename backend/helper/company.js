const commonHelper = require('../helper/common');
const isValidEIN = (EIN) => {
    EIN = commonHelper.isValidString(EIN, "EIN");
    if(!EIN.match(/^[0-9]{9}$/))
        throw {status: '400', error : 'Invalid EIN'}
    return EIN;
    }

module.exports = {
 isValidEIN
};