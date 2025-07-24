import { NavLink } from "react-router";
import { useAuth } from "../auth/AuthContext";

/** Navbar with site navigation links */
export default function Navbar() {
  return (
    <header>
      <p>Fitness Trackr</p>
      <nav>
        <ActivitiesLink />
        <AccountLinks />
      </nav>
    </header>
  );
}

function ActivitiesLink() {
  return <NavLink to="/activities">Activities</NavLink>;
}

function AccountLinks() {
  const { token, logout } = useAuth();
  return token ? (
    <>
      <NavLink to="/activities" onClick={() => logout()}>
        logout
      </NavLink>
    </>
  ) : (
    <>
      <NavLink to="/register">Register</NavLink>
      <NavLink to="/login">Login</NavLink>
    </>
  );
}
