import { useRouter } from "next/router";

const State = (props) => {
  const state = props.state;
  const router = useRouter();

  const handleEditClick = () => {
    router.push(`/state/${state._id}`);
  };

  return (
    <div key={state._id}>
      <h1>{state.name}</h1>
      <p>{state.description}</p>
      <button onClick={handleEditClick}>Edit</button>
    </div>
  );
};

export default State;
