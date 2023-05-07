import Link from "next/link";
import { useState, useEffect } from "react";
import StateComponent from "../../components/State";
import { api } from "../../api";

const State = () => {
  const [stateData, setStateData] = useState("");
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: stateDataTemp } = await api.state.getAllState();
        setStateData(stateDataTemp);
      } catch (e) {
        if(!e.response || !e.response.status || e.response.status===500)
          router.push("/error");
        else if(e.response.status===401 )
        {
          localStorage.clear();
          router.push("/login");
        }else{
          setHasError(true);
          setError(e.response.data);
        }
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      {hasError && <div className="error">{error}</div>}
      {stateData ? (
        <>
          <Link href={`/state/create-state`}>
            Create State 
          </Link>
          {stateData.map((state, index) => (
            <StateComponent key={index} state={state} />
          ))}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default State;
