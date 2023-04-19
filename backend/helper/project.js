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
            default:
                throw {status: '400', error : `Invalid key - ${key}`};
            
        }
    }
    return data;
}

module.exports = {
    isValidProjectName,
    isValidUpdateData
};