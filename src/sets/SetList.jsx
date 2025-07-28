import { Link } from "react-router";
import { activitiesUrl } from "../urls/urls";
import { useAuth } from "../auth/AuthContext";
import useMutation from "../api/useMutation";

export default function SetList({ sets }) {
  return (
    <ul>
      {sets.map((set) => (
        <SetListItem key={set.id} set={set} />
      ))}
    </ul>
  );
}

function SetListItem({ set }) {
  const { token } = useAuth();

  const {
    mutate: deleteSet,
    loading,
    error,
  } = useMutation("DELETE", "/sets/" + set.id, ["routines"]);

  let buttonMessage;
  if (error) {
    buttonMessage = error;
  } else if (loading) {
    buttonMessage = "Deleting...";
  } else {
    buttonMessage = "Delete";
  }

  return (
    <li>
      <div>
        <Link to={`${activitiesUrl}/${set.activityId}`}>{set.name}</Link>
        <p>({set.count})</p>
        {token && <button onClick={() => deleteSet()}>{buttonMessage}</button>}
      </div>
    </li>
  );
}
