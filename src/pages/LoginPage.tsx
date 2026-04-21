import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../firebase/auth";
import { getAuthErrorMessage } from "../firebase/getAuthErrorMessage";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");

    try {
      await loginUser(email, password);
      navigate("/");
    } catch (error) {
      setErrorMessage(getAuthErrorMessage(error));
    }
  };

  return (
    <section className="auth-page">
      <h2>Login</h2>

      <form className="auth-form" onSubmit={handleSubmit}>
        <label htmlFor="login-email">Email</label>
        <input
          id="login-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <button type="submit">Log In</button>
      </form>

      {errorMessage && <p className="auth-error">{errorMessage}</p>}

      <p>
        Don&apos;t have an account? <Link to="/register">Register here</Link>
      </p>
    </section>
  );
}

export default LoginPage;
