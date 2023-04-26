import * as constant from "./constants";

export const isValidRole = (role) => {
  for(let validRole of constant.ROLE)
  {
      if(role.toUpperCase()==validRole) return role.toUpperCase();
  }
  throw {status:400,error:'Invalid role'}
}

export const isValidString = (string, parameter) =>{
    if (!string) throw new Error(`You must provide a ${parameter}`);
    if (typeof string !== 'string') throw new Error(`${parameter} must be a string`);
    string = string.trim()
    if (string.length === 0)
      throw new Error(`${parameter} cannot be an empty string or just spaces`);
    return string;
}

export const isValidEmail = (email) => {
    email = isValidString(email, "Email");
    if(!email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ))
      throw new Error('Invalid Email');
    return email.toLowerCase();
}

export const isPasswordSame = (repassword, password) => {
  repassword = isValidPassword(repassword);
  if(repassword === password) return repassword
  throw new Error('Passwords dont match')
}

export const isValidPassword = (passowrd) => {
    if(!passowrd.match(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,12}$/))
        throw new Error('Invalid password');
    return passowrd
}

export const isValidCompanyName = (inputName) => {
  inputName = isValidString(inputName,"Name");
  return inputName;
}

export const isValidName = (inputName) => {
  inputName = isValidString(inputName,"Name");
  let name=inputName.split(' '); 
  if(name.length!==2) throw new Error('Invalid name'); 
  if(name[0].length<3)
    throw new Error('First name should be atleast 3 character');
  if(name[1].length<3)
    throw new Error('Last name should be atleast 3 character');
  if(name[0].match(/^[^a-zA-Z0-9]+$/) || (name[0].replace(/[^a-zA-Z0-9 ]/g, '').length !== name[0].length && name[0].replace(/[^a-zA-Z0-9 ]/g, '').length !== name[0].length-1))
    throw new Error( 'Invalid first name');
  if(name[1].match(/^[^a-zA-Z0-9]+$/) || (name[1].replace(/[^a-zA-Z0-9 ]/g, '').length !== name[1].length && name[1].replace(/[^a-zA-Z0-9 ]/g, '').length !== name[1].length-1))
    throw new Error( 'Invalid last name');
  if(!name[0].match(/^[a-z.'-]+$/i))
    throw new Error('Invalid first name');
  if(!name[1].match(/^[a-z.'-]+$/i))
    throw new Error('Invalid last name');
  return inputName;
}

export const isValidPastDate = (time) => {
  if (!time) throw new Error("No date provided");
  time = new Date(time);
  let today = new Date();
  if (time === "Invalid Date" || time > today)
    throw new Error("Invalid date");
  return time;
};

export const isValidFutureDate = (time) => {
  if (!time) throw new Error("No date provided");
  time = new Date(time);
  let today = new Date();
  if (time === "Invalid Date" || time < today)
    throw new Error("Invalid date");
  return time;
};

export const isValidDate = (time) => {
  if (!time) throw new Error("No date provided");
  time = new Date(time);
  if (time === "Invalid Date")
    throw new Error("Invalid date");
  return time;
};

export const isValidWatchers = (watchers) => {
  if(!Array.isArray(watchers))
          throw new Error(`Invalid data type for watchers`);
  for(let i=0;i<watchers.length;i++)
  {            
      watchers[i] = isValidEmail(watchers);
  }
  return watchers;    
}

export const isValidProjectName = (name) => {

  name = isValidString(name, "Project Name");

  if(name.length<4)
    new Error('less than 4 character name');

  return name;
};

export const isValidStateName = (name) => {
  
  name = isValidString(name, "State Name");

  if (name.length === 0 || name.length > 50) {
    throw new Error("Name must not be empty and should be less than 50 characters");
  }

  const nameRegex = /^[a-zA-Z\s]*$/;
  if (!nameRegex.test(name)) {
    throw { status: 400, error: "speical character not allowed" };
  }

  return name;
};

export const isValidDescription = (description) => {
  
  description = isValidString(description, "State Description");

  if (description.length < 10 || description.length > 1000) {
    throw new Error( "Description must be between 10 and 1000 characters long");
  }

  return description;
};

export const isValidTransition = (transition) => {

  if (!Array.isArray(transition)) {
    throw new Error("Transition must be na array");
  }

  return transition;
};

export const isValidTicketPriority = (priority) => {
  priority = isValidString(priority, "ticketPriority");

  for(let i=0;i<constant.PRIORITY.length;i++)
      if(priority.toLowerCase() === constant.PRIORITY[i].toLowerCase())
          return constant.PRIORITY[i];
  throw new Error( "Invalid ticket priority");
}

export const isValidTicketType = (type) => {
  type = isValidString(type, "ticketType");

  for(let i=0;i<constant.TICKET_TYPE.length;i++)
      if(type.toLowerCase() === constant.TICKET_TYPE[i].toLowerCase())
          return constant.TICKET_TYPE[i];
  throw new Error( "Invalid ticket type");
}

export const isValidDependedOnTickets = (dependedOnTickets) => {
  if(!Array.isArray(dependedOnTickets))
          throw new Error( `Invalid data type for dependedOnTickets field`);
  return dependedOnTickets;    
}

export const isValidEIN = (EIN) => {
  EIN = isValidString(EIN, "EIN");
  if(!EIN.match(/^[0-9]{9}$/))
      throw new Error( 'Invalid EIN')
  return EIN;
  }