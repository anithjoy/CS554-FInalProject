import { useRouter } from "next/router";

const State = (props) => {
  const state = props.state;
  const router = useRouter();

  const handleEditClick = () => {
    router.push(`/state/${state._id}`);
  };

  return (
    <div className="card" key={state._id}>
      <div className="card-body">
        <h5 className="card-title">{state.name}</h5>
        <p className="card-text">{state.description}</p>
        <button onClick={handleEditClick} className="btn btn-primary">
          Edit
        </button>
      </div>
    </div>
  );
};

export default State;
