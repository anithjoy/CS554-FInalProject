import React from "react";
import { getAllState } from "@/api/state";
import StateComponent from "../../components/state";
import Link from "next/link";

export const getServerSideProps = async (context) => {
  const companyId = context.query.companyId;
  const response = await getAllState(companyId);
  const states = response.data;

  return {
    props: {
      states,
      companyId,
    },
  };
};

const State = ({ states, companyId }) => {
  return (
    <div>
      <Link href={`/state/create-state?companyId=${companyId}`}>
        <button>Create State </button>
      </Link>
      {states.map((state) => (
        <StateComponent state={state} companyId={companyId} />
      ))}
    </div>
  );
};

export default State;
