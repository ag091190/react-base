// src/components/RegisterPage.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function RegisterPage({ onRegister }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !passwordConfirm) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password should be at least 6 characters.");
      return;
    }

    if (password !== passwordConfirm) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    // For now, we "fake" registration.
    // Later, you can replace this with a real API call
    setTimeout(() => {
      const userData = { email, name };

      // Tell App that registration succeeded and log in the user
      onRegister(userData);

      // Go to dashboard
      navigate("/dashboard");
      setIsSubmitting(false);
    }, 800);
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Create account</h1>
        <p style={styles.subtitle}>Sign up to start using the app</p>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>
            Name
            <input
              type="text"
              style={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
          </label>

          <label style={styles.label}>
            Email
            <input
              type="email"
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </label>

          <label style={styles.label}>
            Password
            <input
              type="password"
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </label>

          <label style={styles.label}>
            Confirm password
            <input
              type="password"
              style={styles.input}
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              placeholder="••••••••"
            />
          </label>

          <button
            type="submit"
            style={styles.button}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <p style={styles.footerText}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "calc(100vh - 56px)", // header height-ish
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "100%",
    maxWidth: "400px",
    background: "white",
    borderRadius: "12px",
    padding: "24px 20px",
    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
  },
  title: {
    fontSize: "24px",
    fontWeight: 700,
    margin: "0 0 4px 0",
  },
  subtitle: {
    fontSize: "14px",
    color: "#6b7280",
    margin: "0 0 16px 0",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  label: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    fontSize: "13px",
    color: "#374151",
  },
  input: {
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
  },
  button: {
    marginTop: "8px",
    width: "100%",
    padding: "10px 12px",
    borderRadius: "999px",
    border: "none",
    background: "#2563eb",
    color: "white",
    fontWeight: 600,
    fontSize: "15px",
    cursor: "pointer",
  },
  error: {
    backgroundColor: "#fef2f2",
    color: "#b91c1c",
    border: "1px solid #fecaca",
    padding: "8px 10px",
    borderRadius: "8px",
    fontSize: "13px",
    marginBottom: "8px",
  },
  footerText: {
    marginTop: "16px",
    fontSize: "13px",
    textAlign: "center",
    color: "#6b7280",
  },
  link: {
    color: "#2563eb",
    textDecoration: "none",
  },
};

export default RegisterPage;
