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
    const { name, goal, creatorName, sets } = data;
    console.log(data);
    return (
      <div className="routine-details">
        <div>{name}</div>
        <div>{goal}</div>
        <div>{creatorName}</div>
        {!sets || sets.length == 0 ? (
          <p>No sets found. If you made this routine, log in to add sets!</p>
        ) : (
          <SetList sets={sets} />
        )}
        {token && <SetForm />}
      </div>
    );
  }
}
