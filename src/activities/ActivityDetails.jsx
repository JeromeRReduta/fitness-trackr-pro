import { useNavigate, useParams } from "react-router";
import useQuery from "../api/useQuery";
import { useAuth } from "../auth/AuthContext";
import useMutation from "../api/useMutation";

export default function ActivityDetails() {
  const { id } = useParams();
  const { token } = useAuth();
  const navigateTo = useNavigate();
  const {
    data,
    loading: loadingQuery,
    error: queryError,
  } = useQuery("/activities/" + id, "activities");
  const {
    mutate: deleteActivity,
    loading: loadingDelete,
    error: deleteError,
  } = useMutation("DELETE", "/activities/" + id, ["activities"]);

  if (queryError) {
    navigateTo("error");
    return; // Unsure if this is needed
  }
  if (loadingQuery) {
    return <div className="loading">Loading...</div>;
  }
  if (data) {
    const { name, description, creatorName } = data;
    return (
      <div className="activity-details">
        <div>{name}</div>
        <div>{description}</div>
        <div>{creatorName}</div>
        {token && (
          <button onClick={() => deleteActivity()}>
            {loadingDelete ? "Deleting" : deleteError ? deleteError : "Delete"}
          </button>
        )}
      </div>
    );
  }

  console.error("THIS PART SHOULD NEVER RUN");
  navigateTo("error");
  return;
}
