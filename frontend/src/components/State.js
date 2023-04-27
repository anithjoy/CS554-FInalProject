import React from "react";
import { useRouter } from "next/router";

const State = (props) => {
  const state = props.state;
  const companyId = props.companyId;
  const router = useRouter();

  const handleEditClick = () => {
    router.push(`/state/${state._id}/edit-state?companyId=${companyId}`);
  };

  return (
    <div key={state._id}>
      <h1>{state.name}</h1>
      <p>{state.description}</p>
      <ul>
        {state.transition.map((transitionId) => (
          <li key={transitionId}>{transitionId}</li>
        ))}
      </ul>
      <button onClick={handleEditClick}>Edit</button>
    </div>
  );
};

export default State;
