import { useAuth } from "../auth/AuthContext";
import SetForm from "../sets/SetForm";
import SetList from "../sets/SetList";

export default function RoutineDetails() {
  const { token } = useAuth();
  return (
    <>
      <SetList />
      {token && <SetForm />}
    </>
  );
}
