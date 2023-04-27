import React from "react";
import EditStateForm from "@/components/EditStateForm";
import { getAllState, getStateById } from "@/api/state";
import { useRouter } from "next/router";

export const getServerSideProps = async (context) => {
  const companyId = context.query.companyId;
  const stateId = context.query.stateId;

  const responseState = await getStateById(stateId);
  const responseAllState = await getAllState(companyId);
  const state = responseState.data;
  const allStates = responseAllState.data;

  return {
    props: {
      state,
      companyId,
      allStates,
    },
  };
};

const EditState = ({ state, companyId, allStates }) => {
  return (
    <div>
      <h1>Edit State Form</h1>

      <EditStateForm
        state={state}
        companyId={companyId}
        allStates={allStates}
      />
    </div>
  );
};

export default EditState;
