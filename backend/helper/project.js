const common = require("./common");

const isValidProjectName = (name) => {

    name = common.isValidString(name, "Project Name");

    if(name.length<4)
        throw {status:400, error : 'less than 4 character name'};

    return name;
};

const isValidUpdateData = (data) =>{
    for(key in data)
    {
        switch(key){
            case "name":
                data.name = isValidProjectName(data.name);
                break;
            case "manager":
                data.assign = common.isValidEmail(data.assign);
                break;
            case "watchers":
                data.watchers = common.isValidWatchers(data.watchers);
                break;
            case "description":
                data.description = common.isValidString(data.description);
                break;
            default:
                throw {status: '400', error : `Invalid key - ${key}`};
            
        }
    }
    return data;
}

const isValidSprintName = (name) => {

    name = common.isValidString(name, "Sprint Name");

    if(name.length<4)
        throw {status:400, error : 'less than 4 character name'};

    return name;
};

const isValidSprintUpdateData = (data) => {
    for(key in data)
    {
        switch(key){
            case "name":
                data.name = isValidSprintName(data.name);
                break;
            case "startDate":
                data.startDate = common.isValidDate(data.startDate);
                break;
            case "description":
                data.description = common.isValidString(data.description);
                break;
            default:
                throw {status: '400', error : `Invalid key - ${key}`};
            
        }
    }
    return data;
}
module.exports = {
    isValidProjectName,
    isValidUpdateData,
    isValidSprintName,
    isValidSprintUpdateData
};