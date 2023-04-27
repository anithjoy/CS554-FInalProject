import React from "react";
import CreateStateForm from "@/components/CreateStateForm";
import { getAllState } from "@/api/state";

export const getServerSideProps = async (context) => {
  const companyId = context.query.companyId;
  const response = await getAllState(companyId);
  const allStates = response.data;

  return {
    props: {
      allStates,
      companyId,
    },
  };
};

const CreateState = ({ allStates, companyId }) => {
  return (
    <div>
      <h1>Create State Form</h1>
      <CreateStateForm allStates={allStates} companyId={companyId} />
    </div>
  );
};

export default CreateState;
