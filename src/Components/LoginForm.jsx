import React, { useState, useContext } from "react";
import { UserContext } from "./UserContext.jsx";
import { useNavigate, Link } from "react-router-dom"; // for navigation
import { authApi } from "../api/auth";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { setUser } = useContext(UserContext);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerMessage("");
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    const res = await authApi.login({ username: formData.username, password: formData.password });
    setLoading(false);
    if (res.success) {
      // Prefer role from login response if provided
      let nextUser = null;
      if (res.data && (res.data.role || res.data.user)) {
        const role = (res.data.role || '').toUpperCase();
        const username = res.data.username || res.data.user || formData.username;
        nextUser = { username, role };
      }
      // Fetch current user details to sync
      const me = await authApi.me();
      if (me.success) {
        const normalized = { ...me.data, role: (me.data?.role || nextUser?.role || '').toUpperCase() };
        setUser(normalized);
      } else {
        setUser(nextUser || { username: formData.username });
      }
      navigate("/");
    } else {
      setServerMessage(res.message || "Login failed");
    }
  };

  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
    },
    formWrapper: {
      width: "100%",
      maxWidth: "450px",
      background: "rgba(255, 255, 255, 0.95)",
      padding: "40px",
      borderRadius: "24px",
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
    },
    title: {
      fontSize: "2em",
      fontWeight: "700",
      color: "#2c3e50",
      marginBottom: "20px",
    },
    formGroup: {
      marginBottom: "20px",
      textAlign: "left",
    },
    label: {
      fontWeight: "600",
      color: "#34495e",
      marginBottom: "8px",
      display: "block",
    },
    input: {
      width: "100%",
      padding: "15px",
      border: "2px solid #e1e8ed",
      borderRadius: "12px",
      fontSize: "1em",
      outline: "none",
      transition: "0.3s",
    },
    inputError: {
      borderColor: "#e74c3c",
    },
    errorMessage: {
      color: "#e74c3c",
      fontSize: "0.85em",
      marginTop: "5px",
    },
    button: {
      width: "100%",
      padding: "15px",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "#fff",
      border: "none",
      borderRadius: "50px",
      fontSize: "1.1em",
      fontWeight: "600",
      cursor: "pointer",
      boxShadow: "0 10px 20px rgba(102, 126, 234, 0.3)",
      marginTop: "10px",
    },
    signupText: {
      marginTop: "20px",
      fontSize: "0.95em",
      color: "#7f8c8d",
    },
    link: {
      color: "#667eea",
      fontWeight: "600",
      textDecoration: "none",
      marginLeft: "5px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        <h2 style={styles.title}>Login</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              style={{
                ...styles.input,
                ...(errors.username ? styles.inputError : {}),
              }}
              placeholder="Enter your username"
            />
            {errors.username && (
              <span style={styles.errorMessage}>{errors.username}</span>
            )}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={{
                ...styles.input,
                ...(errors.password ? styles.inputError : {}),
              }}
              placeholder="Enter your password"
            />
            {errors.password && (
              <span style={styles.errorMessage}>{errors.password}</span>
            )}
          </div>

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {serverMessage && (
          <p style={{ ...styles.signupText, color: '#e74c3c' }}>{serverMessage}</p>
        )}

        <p style={styles.signupText}>
          Don't have an account?
          <Link to="/signup" style={styles.link}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
