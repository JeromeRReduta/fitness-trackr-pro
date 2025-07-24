import { useNavigate, useParams } from "react-router";
import useQuery from "../api/useQuery";

export default function ActivityDetails() {
  const { id } = useParams();
  const navigateTo = useNavigate();
  console.log("id is:", id);
  const { data, loading, error } = useQuery("/activities/" + id, "activities");
  if (error) {
    navigateTo("error");
    return; // Unsure if this is needed
  }
  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  if (data) {
    const { name, description, creatorName } = data;

    return (
      <div className="activity-details">
        <div>{name}</div>
        <div>{description}</div>
        <div>{creatorName}</div>
      </div>
    );
  }
  console.error("THIS PART SHOULD NEVER RUN");
  navigateTo("error");
  return;
}
