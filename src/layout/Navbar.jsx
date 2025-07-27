import { NavLink } from "react-router";
import { useAuth } from "../auth/AuthContext";

/** Navbar with site navigation links */
export default function Navbar() {
  const { token, logout } = useAuth();
  const accountLinks = token ? (
    <>
      <NavLink to="/activities" onClick={() => logout()}>
        logout
      </NavLink>
    </>
  ) : (
    <>
      <NavLink to="/account/register">Register</NavLink>
      <NavLink to="/account/login">Login</NavLink>
    </>
  );
  return (
    <header>
      <p>Fitness Trackr</p>
      <nav>
        <NavLink to="/activities">Activities</NavLink>
        <NavLink to="/routines">Routines</NavLink>
        {accountLinks}
      </nav>
    </header>
  );
}
