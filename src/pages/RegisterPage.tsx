import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../firebase/auth";

function RegisterPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");

    try {
      await registerUser(email, password);
      navigate("/");
    } catch {
      setErrorMessage("Registration failed. Please try again.");
    }
  };

  return (
    <section className="auth-page">
      <h2>Register</h2>

      <form className="auth-form" onSubmit={handleSubmit}>
        <label htmlFor="register-email">Email</label>
        <input
          id="register-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <label htmlFor="register-password">Password</label>
        <input
          id="register-password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <button type="submit">Create Account</button>
      </form>

      {errorMessage && <p className="auth-error">{errorMessage}</p>}

      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </section>
  );
}

export default RegisterPage;
