import { useAuth } from "../auth/AuthContext";
import RoutineForm from "./RoutineForm";
import RoutineList from "./RoutineList";

export default function RoutinesPage() {
  const { token } = useAuth();
  return (
    <>
      <RoutineList />
      {token && <RoutineForm />}
    </>
  );
}
