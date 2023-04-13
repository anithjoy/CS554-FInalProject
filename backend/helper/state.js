const { ObjectId } = require("mongodb");

const checkId = (id) => {
  if (!id) throw { status: 400, error: "You must provide an id to search for" };
  if (typeof id !== "string")
    throw { status: 400, error: "Id must be a string" };
  if (id.trim().length === 0)
    throw { status: 400, error: "Id cannot be an empty string or just spaces" };
  id = id.trim();
  if (!ObjectId.isValid(id)) throw { status: 400, error: "invalid object ID" };
  return id;
};

const checkName = (name) => {
  if (!name) {
    throw { status: 400, error: "You must provide an name to search for" };
  }

  if (typeof name !== "string") {
    throw { status: 400, error: "not a string" };
  }

  name = name.trim();
  if (name.length === 0 || name.length > 50) {
    throw {
      status: 400,
      error: "Name must not be empty and should be less than 50 characters",
    };
  }

  const nameRegex = /^[a-zA-Z\s]*$/;
  if (!nameRegex.test(name)) {
    throw { status: 400, error: "speical character not allowed" };
  }

  name = name.toLowerCase();

  return name;
};

const checkDescription = (description) => {
  if (!description) {
    throw { status: 400, error: "Description is empty " };
  }

  if (typeof description !== "string") {
    throw { status: 400, error: "description not a string" };
  }

  description = description.trim();
  if (description.length < 10 || description.length > 1000) {
    throw {
      status: 400,
      error: "Description must be between 10 and 1000 characters long",
    };
  }

  return description;
};

const checkTransition = (transition) => {
  if (!Array.isArray(transition)) {
    throw { status: 400, error: "Transition must be na array" };
  }

  return transition.map((element) => element.trim());
};
module.exports = { checkName, checkDescription, checkId, checkTransition };
