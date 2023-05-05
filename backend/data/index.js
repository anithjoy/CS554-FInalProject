const companyData = require('./company');
const userData = require('./user');
const projectData = require('./project');
const stateData = require('./state');
const ticketData = require('./ticket');
const validationData = require('./validation');

module.exports = {
    company : companyData,
    user : userData,
    project : projectData,
    state : stateData,
    ticket : ticketData,
    validation : validationData
}