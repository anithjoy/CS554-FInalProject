import { useState, useEffect } from "react";
import {api} from "../api";
import { useRouter } from "next/router";
import {helper} from "../helper";

const CreateStateForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [transition, setTransition] = useState([]);
  const [allStates, setAllStates] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () =>{
        try{
            const {data: stateDataTemp} = await api.state.getAllState();
            setAllStates(stateDataTemp);
        }
        catch(e){
          if(e.response.status===500)
            router.push("/error");
          else if(e.response.status===401 )
          {
            router.push("/login");
          }else{
            setHasError(true);
            setError(e.response.data);
          }
        }
    }
    fetchData();
  },[]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setName(helper.validationFunctions.isValidStateName(name));
      setDescription(helper.validationFunctions.isValidDescription(description));
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
      if(e.response.status===500)
            router.push("/error");
      else if(e.response.status===401 )
      {
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
    <>
      {allStates ? <form onSubmit={handleSubmit}>
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
      </form>:
      <div>Loading....</div>}
      {hasError && <div className="error">{error}</div>}
    </>
  );
};

export default CreateStateForm;
