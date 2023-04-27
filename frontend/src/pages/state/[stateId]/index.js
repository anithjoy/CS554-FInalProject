import React from "react";

import { getStateById } from "@/api/state";
import StateComponent from "../../../components/state";

export const getServerSideProps = async (context) => {
  const { stateId } = context.params;
  const response = await getStateById(stateId);
  const state = response.data;

  return {
    props: {
      state,
    },
  };
};
const State = ({ state }) => {
  return (
    <div>
      <StateComponent state={state} />
    </div>
  );
};

export default State;
