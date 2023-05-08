import { useState, useEffect } from "react";
import { api } from "../api";
import { useRouter } from "next/router";
import { helper } from "../helper";

const CreateStateForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [transition, setTransition] = useState([]);
  const [allStates, setAllStates] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: stateDataTemp } = await api.state.getAllState();
        setAllStates(stateDataTemp);
      } catch (e) {
        if(!e.response || !e.response.status || e.response.status===500)
          router.push("/error");
        else if(e.response.status===401 )
        {
          localStorage.clear();
          router.push("/login");
        }else{
          setHasError(true);
          setError(e.response.data);
        }
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setName(helper.validationFunctions.isValidStateName(name));
      setDescription(
        helper.validationFunctions.isValidDescription(description)
      );
      setTransition(helper.validationFunctions.isValidTransition(transition));
      setHasError(false);
    } catch (e) {
      setHasError(true);
      setError(e.message);
      return;
    }
    const data = {
      name: helper.validationFunctions.isValidStateName(name),
      description: helper.validationFunctions.isValidDescription(description),
      transition: helper.validationFunctions.isValidTransition(transition),
    };
    try {
      await api.state.createState(data);
      router.push(`/state`);
    } catch (e) {
      if(!e.response || !e.response.status || e.response.status===500)
        router.push("/error");
      else if(e.response.status===401 )
      {
        localStorage.clear();
        router.push("/login");
      }else{
        setHasError(true);
        setError(e.response.data);
      }
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
    <div className="CreateUserCard card p-4 shadow-sm">
      {hasError && <div className="error">{error}</div>}
      {allStates ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Name"
              required
              className="form-control"
            />
          </div>
          <br/>
          <div>
            <label htmlFor="description" className="form-label">
              Description:
            </label>
            <input
              type="text"
              name="description"
              placeholder="Enter Description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-control"
            />
          </div>
          <br/>
          <label className="form-label">
              Transitions:
          </label>
          <div className="form-check form-switch">
              {allStates.map((state) => (
                <div key={state._id} className="form-check mb-2">
                  <input
                    type="checkbox"
                    name="transitions"
                    value={state._id}
                    checked={transition.includes(state._id)}
                    onChange={handleSelect}
                    className="form-check-input"
                    id={state.name}
                  />
                  <label htmlFor={state.name} className="form-check-label">
                    {state.name}
                  </label>
                </div>
              ))}
          </div>
          <br/>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      ) : (
        <div>Loading....</div>
      )}
    </div>
  );
};

export default CreateStateForm;
