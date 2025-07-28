import { Link } from "react-router";
import { activitiesUrl } from "../urls/urls";

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
  return (
    <li>
      <div>
        <Link to={`${activitiesUrl}/${set.activityId}`}>{set.name}</Link>
        <p>({set.count})</p>
      </div>
    </li>
  );
}
