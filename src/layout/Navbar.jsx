import { NavLink } from "react-router";
import { useAuth } from "../auth/AuthContext";
import {
  activitiesUrl,
  loginUrl,
  registerUrl,
  routinesUrl,
} from "../urls/urls";

/** Navbar with site navigation links */

export default function Navbar() {
  const { token, logout } = useAuth();
  const accountLinks = token ? (
    <>
      <NavLink to={activitiesUrl} onClick={() => logout()}>
        logout
      </NavLink>
    </>
  ) : (
    <>
      <NavLink to={registerUrl}>Register</NavLink>
      <NavLink to={loginUrl}>Login</NavLink>
    </>
  );
  return (
    <header>
      <p>Fitness Trackr</p>
      <nav>
        <NavLink to={activitiesUrl}>Activities</NavLink>
        <NavLink to={routinesUrl}>Routines</NavLink>
        {accountLinks}
      </nav>
    </header>
  );
}
