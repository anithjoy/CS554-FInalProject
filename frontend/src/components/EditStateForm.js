import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { api } from "../api";
import { helper } from "../helper";

const EditStateForm = (props) => {
  const [stateData, setStateData] = useState(null);
  const [allState, setAllState] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState("");
  const [hasSuccessMessage, setHasSuccessMessage] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: stateDataTemp } = await api.state.getStateById(
          props.stateId
        );

        const { data: allStateDataTemp } = await api.state.getAllState();

        setStateData(stateDataTemp);
        setAllState(allStateDataTemp);
      } catch (e) {
        if (e.response.status === 500) router.push("/error");
        else if (e.response.status === 401) {
          router.push("/login");
        } else {
          setHasError(true);
          setError(e.response.data);
        }
      }
    };
    fetchData();
  }, []);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let stateDataTemp = { ...stateData };
    try {
      stateDataTemp.name = helper.validationFunctions.isValidStateName(
        stateDataTemp.name
      );
      stateDataTemp.description = helper.validationFunctions.isValidDescription(
        stateDataTemp.description
      );
      stateDataTemp.transition = helper.validationFunctions.isValidTransition(
        stateDataTemp.transition
      );
      setHasError(false);
    } catch (e) {
      setHasError(true);
      setError(e.message);
      return;
    }
    setStateData(stateDataTemp);
    try {
      delete stateDataTemp["_id"];
      delete stateDataTemp["companyId"];
      const { data } = await api.state.updateState(
        props.stateId,
        stateDataTemp
      );
      setHasSuccessMessage(true);
      setHasError(false);
      setStateData(data);
    } catch (e) {
      setHasError(true);
      if (!e.response) setError("Error");
      else setError(e.response.data);
      return;
    }
  };

  const handleSelect = (e) => {
    if (hasSuccessMessage) setHasSuccessMessage(false);
    if (hasError) setError(false);
    const option = e.target.value;
    const options = stateData.transition.includes(option)
      ? stateData.transition.filter((t) => t !== option)
      : [...stateData.transition, option];
    setStateData({ ...stateData, transition: options });
  };

  return (
    <>
      {hasSuccessMessage && (
        <div className="alert alert-success" role="alert">
          Successfully updated
        </div>
      )}
      {stateData && allState ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              type="text"
              name="name"
              value={stateData.name}
              onChange={(e) => {
                if (hasSuccessMessage) setHasSuccessMessage(false);
                if (hasError) setError(false);
                setStateData({ ...stateData, name: e.target.value });
              }}
              placeholder="Enter Name"
              required
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description:
            </label>
            <input
              type="text"
              name="description"
              placeholder="Enter Description"
              required
              value={stateData.description}
              onChange={(e) => {
                if (hasSuccessMessage) setHasSuccessMessage(false);
                if (hasError) setError(false);
                setStateData({ ...stateData, description: e.target.value });
              }}
              className="form-control"
            />
          </div>

          {allState.length != 1 && (
            <div className="mb-3">
              <label className="form-label">Transitions:</label>
              {allState.map((state) => {
                if (state._id != props.stateId)
                  return (
                    <div key={state._id} className="form-check">
                      <input
                        type="checkbox"
                        name="transitions"
                        value={state._id}
                        checked={stateData.transition.includes(state._id)}
                        onChange={handleSelect}
                        className="form-check-input"
                        id={state.name}
                      />
                      <label htmlFor={state.name} className="form-check-label">
                        {state.name}
                      </label>
                    </div>
                  );
              })}
            </div>
          )}

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      ) : (
        <div>Loading.....</div>
      )}
      {hasError && <div className="alert alert-danger">{error}</div>}
    </>
  );
};

export default EditStateForm;
