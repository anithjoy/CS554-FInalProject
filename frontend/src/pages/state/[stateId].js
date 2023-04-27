import EditStateForm from "@/components/EditStateForm";
import { useRouter } from "next/router";

const EditState = () => {
  const router = useRouter();
  return (
    <div>
      <h1>Edit State Form</h1>

      <EditStateForm
        stateId = {router.query.stateId}
      />
    </div>
  );
};

export default EditState;
