import { Link } from "react-router";
import { routinesUrl } from "../urls/urls";
import useQuery from "../api/useQuery";

export default function RoutineList() {
  const { data: routines, loading, error } = useQuery("/routines", "routines");

  if (loading || !routines) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Sorry! {error}</p>;
  }

  return (
    <ul>
      {routines
        .filter((routine) => routine.isPublic)
        .map((publicRoutine) => (
          <RoutineListItem key={publicRoutine.id} routine={publicRoutine} />
        ))}
    </ul>
  );
}

function RoutineListItem({ routine }) {
  return (
    <li>
      <div>
        <Link to={`${routinesUrl}/${routine.id}`}>{routine.name}</Link>
      </div>
    </li>
  );
}
