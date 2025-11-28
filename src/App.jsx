// src/App.jsx
import { useState } from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import LoginPage from "./components/LoginPage";

function App() {
  const [user, setUser] = useState(null);

  function handleLogin(userData) {
    setUser(userData); // e.g. { email }
  }

  function handleLogout() {
    setUser(null);
  }

  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <nav style={styles.nav}>
          <Link to="/" style={styles.link}>Home</Link>
          <Link to="/dashboard" style={styles.link}>Dashboard</Link>
        </nav>

        {user && (
          <div style={styles.userSection}>
            <span>{user.email}</span>
            <button style={styles.logoutButton} onClick={handleLogout}>
              Log out
            </button>
          </div>
        )}
      </header>

      <main style={styles.main}>
        <Routes>
          {/* Home */}
          <Route
            path="/"
            element={
              user ? (
                <p>
                  Welcome back, {user.email}! Go to your{" "}
                  <Link to="/dashboard">dashboard</Link>.
                </p>
              ) : (
                <p>
                  You are not logged in. Go to{" "}
                  <Link to="/login">Login</Link>.
                </p>
              )
            }
          />

          {/* Login */}
          <Route
            path="/login"
            element={
              user ? (
                // already logged in → redirect to dashboard
                <Navigate to="/dashboard" replace />
              ) : (
                <LoginPage onLogin={handleLogin} />
              )
            }
          />

          {/* Protected dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute user={user}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Catch-all: unknown paths go home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

function ProtectedRoute({ user, children }) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>This is your protected dashboard page.</p>
      <p>Only visible after login.</p>
    </div>
  );
}

const styles = {
  app: {
    minHeight: "100vh",
    background: "#f9fafb",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 16px",
    borderBottom: "1px solid #e5e7eb",
    background: "white",
  },
  nav: {
    display: "flex",
    gap: "12px",
  },
  link: {
    textDecoration: "none",
    color: "#2563eb",
    fontSize: "14px",
  },
  userSection: {
    display: "flex",
    gap: "8px",
    alignItems: "center",
    fontSize: "14px",
  },
  logoutButton: {
    padding: "4px 8px",
    borderRadius: "4px",
    border: "1px solid #d1d5db",
    background: "white",
    cursor: "pointer",
  },
  main: {
    padding: "16px",
  },
};

export default App;
