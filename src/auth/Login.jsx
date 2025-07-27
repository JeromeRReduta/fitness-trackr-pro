import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { activitiesUrl, registerUrl } from "../urls/urls";
import { useAuth } from "./AuthContext";

/** A form that allows users to log into an existing account. */
export default function Login() {
  const { login } = useAuth();
  const navigateTo = useNavigate();

  const [error, setError] = useState(null);

  const tryLogin = async (formData) => {
    const username = formData.get("username");
    const password = formData.get("password");
    try {
      await login({ username, password });
      navigateTo(activitiesUrl);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <h1>Log in to your account</h1>
      <form action={tryLogin}>
        <label>
          Username
          <input type="text" name="username" required />
        </label>
        <label>
          Password
          <input type="password" name="password" required />
        </label>
        <button>Login</button>
        {error && <output>{error}</output>}
      </form>
      <Link to={registerUrl}>Need an account? Register here.</Link>
    </>
  );
}
