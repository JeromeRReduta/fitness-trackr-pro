import { useState } from "react";
import { useAuth } from "./AuthContext";
import { Link, useNavigate } from "react-router";
import { activitiesUrl, loginUrl } from "../urls/urls";

/** A form that allows users to register for a new account */
export default function Register() {
  const { register } = useAuth();
  const navigateTo = useNavigate();

  const [error, setError] = useState(null);

  const tryRegister = async (formData) => {
    const username = formData.get("username");
    const password = formData.get("password");
    try {
      await register({ username, password });
      navigateTo(activitiesUrl);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <h1>Register for an account</h1>
      <form action={tryRegister}>
        <label>
          Username
          <input type="text" name="username" required autoComplete="on" />
        </label>
        <label>
          Password
          <input type="password" name="password" required autoComplete="on" />
        </label>
        <button>Register</button>
        {error && <output>{error}</output>}
      </form>
      <Link to={loginUrl}>Already have an account? Log in here.</Link>
    </>
  );
}
