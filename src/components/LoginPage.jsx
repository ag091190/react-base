import { useState } from "react";

function LoginPage({ onLogin }) {
    // Form state (controlled inputs)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // UI state
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    function handleSubmit(event) {
        event.preventDefault(); // stop the browser from reloading the page
        setError("");

        // Simple front-end validation
        if (!email || !password) {
            setError("Please enter both email and password.");
            return;
        }

        // Simulate login request
        setIsSubmitting(true);

        // Fake async call (e.g. to an API)
        setTimeout(() => {
            // For now, just log the values
            console.log("Logging in with:", { email, password });

            // Example: fake error if password isn't "password"
            if (password !== "password") {
                setError("Invalid email or password (try using 'password').");
            } else {
                alert("Login successful! (front-end only for now)");
                // later: redirect or set logged-in state
                onLogin({ email });
            }

            setIsSubmitting(false);
        }, 1000);
    }

    return (
        <div style={styles.page}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h1 style={styles.title}>Sign in</h1>

                {error && <div style={styles.error}>{error}</div>}

                <label style={styles.label}>
                    Email
                    <input
                        style={styles.input}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                    />
                </label>

                <label style={styles.label}>
                    Password
                    <input
                        style={styles.input}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                    />
                </label>

                <button type="submit" style={styles.button} disabled={isSubmitting}>
                    {isSubmitting ? "Signing in..." : "Sign in"}
                </button>
            </form>
        </div>
    );
}

const styles = {
    page: {
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "16px",                // small padding around edges on mobile
        background: "#f3f4f6",
    },
    form: {
        width: "100%",                  // full width on small screens
        maxWidth: "360px",              // but don’t exceed this
        padding: "24px 20px",
        borderRadius: "12px",
        background: "white",
        boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
    },
    title: {
        marginBottom: "4px",
        fontSize: "22px",
        textAlign: "center",
    },
    subtitle: {
        marginBottom: "8px",
        fontSize: "13px",
        textAlign: "center",
        color: "#6b7280",
    },
    label: {
        fontSize: "14px",
        display: "flex",
        flexDirection: "column",
        gap: "6px",
    },
    input: {
        padding: "10px 12px",
        borderRadius: "6px",
        border: "1px solid #d1d5db",
        fontSize: "16px",              // 👈 important for iPhone (no zoom)
        lineHeight: 1.4,
    },
    button: {
        marginTop: "8px",
        padding: "12px",
        borderRadius: "6px",
        border: "none",
        background: "#2563eb",
        color: "white",
        fontSize: "16px",              // 👈 also >=16
        fontWeight: 500,
        cursor: "pointer",
    },
    error: {
        padding: "8px 10px",
        borderRadius: "6px",
        background: "#fee2e2",
        color: "#b91c1c",
        fontSize: "13px",
    },
};


export default LoginPage;
