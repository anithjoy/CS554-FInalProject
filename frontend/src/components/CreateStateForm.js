import React, { useState } from "react";
import { createState } from "@/api/state";
import { useRouter } from "next/router";
import {
  isValidStateName,
  isValidDescription,
  isValidTransition,
} from "@/helper/validationFunctions";

const CreateStateForm = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [transition, setTransition] = useState("");
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const allStates = props.allStates;

  let companyId = props.companyId;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let nameCheck = isValidStateName(name);
      let descriptionCheck = isValidDescription(description);
      let transitionCheck = isValidTransition(transition);
      setHasError(false);
    } catch (e) {
      setHasError(true);
      setError(e.message);
      return;
    }
    const data = {
      name: name,
      description: description,
      transition: transition,
    };
    try {
      const response = await createState(data, companyId);
      alert("State Created");
      router.push(`/state?companyId=${companyId}`);
      setHasError(false);
    } catch (e) {
      setHasError(true);
      if (!e.response) setError("Error");
      else setError(e.response.data);
      return;
    }
  };

  const handleSelect = (e) => {
    const option = e.target.value;
    const options = transition.includes(option)
      ? transition.filter((t) => t !== option)
      : [...transition, option];
    setTransition(options);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Name"
              required
            />
          </label>
        </div>
        <div>
          <label>
            Description:
            <input
              type="text"
              name="description"
              placeholder="Enter Description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            Transitions:
            {allStates.map((state) => (
              <div key={state._id}>
                <input
                  type="checkbox"
                  name="transitions"
                  value={state._id}
                  checked={transition.includes(state._id)}
                  onChange={handleSelect}
                />
                <label>{state.name}</label>
              </div>
            ))}
          </label>
        </div>

        <button type="submit">Submit</button>
      </form>
      {hasError && <div className="error">{error}</div>}
    </>
  );
};

export default CreateStateForm;
