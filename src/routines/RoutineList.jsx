import { Link } from "react-router";
import { routinesUrl } from "../urls/urls";

export default function RoutineList() {
  return (
    <div>
      <Link to={`${routinesUrl}/1`}>TODO: Routine List</Link>
    </div>
  );
}
