import { useNavigate, useParams } from "react-router";
import { useAuth } from "../auth/AuthContext";
import SetForm from "../sets/SetForm";
import SetList from "../sets/SetList";
import { errorUrl } from "../urls/urls";
import { useEffect } from "react";
import useQuery from "../api/useQuery";

export default function RoutineDetails() {
  const { id } = useParams();

  const { token } = useAuth();
  const { data, loading, error } = useQuery("/routines/" + id, "routines");
  const navigateTo = useNavigate();
  useEffect(() => {
    if (error) {
      navigateTo(errorUrl);
    }
  }, [navigateTo, error]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  if (data) {
    const { name, goal, creatorName } = data;
    return (
      <div className="routine-details">
        <div>{name}</div>
        <div>{goal}</div>
        <div>{creatorName}</div>
        <SetList data={data} />
        {token && <SetForm />}
      </div>
    );
  }
}
