import { useNavigate, useParams } from "react-router";
import { useAuth } from "../auth/AuthContext";
import SetForm from "../sets/SetForm";
import SetList from "../sets/SetList";
import { errorUrl } from "../urls/urls";
import { useEffect } from "react";
import useQuery from "../api/useQuery";
import useMutation from "../api/useMutation";

export default function RoutineDetails() {
  const { id } = useParams();

  const { token } = useAuth();
  const {
    data,
    loading: isQuerying,
    error: queryError,
  } = useQuery("/routines/" + id, "routines");
  const navigateTo = useNavigate();
  useEffect(() => {
    if (queryError) {
      navigateTo(errorUrl);
    }
  }, [navigateTo, queryError]);
  const {
    mutate: deleteRoutine,
    loading: isDeleting,
    error: deleteError,
  } = useMutation("DELETE", "/routines/" + id, ["routines"]);

  if (isQuerying) {
    return <div className="loading">Loading...</div>;
  }
  if (data) {
    const { name, goal, creatorName, sets } = data;
    let buttonMessage;
    if (isDeleting) {
      buttonMessage = "Deleting...";
    } else if (deleteError) {
      buttonMessage = deleteError;
    } else {
      buttonMessage = "Delete Routine";
    }
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
        {token && (
          <button onClick={() => deleteRoutine()}>{buttonMessage}</button>
        )}
      </div>
    );
  }
}
