import React, { useState, useContext } from "react";
import { UserContext } from "./UserContext.jsx";
import { usersApi } from "../api/users";
import "./Form.css";

const ProfessionalForm = ({ onSignupSuccess }) => {
  const [formData, setFormData] = useState({
    user: "",
    email: "",
    password: "",
    role: "",
  });
  const { setUser } = useContext(UserContext);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.user.trim()) newErrors.user = "User is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.password || !formData.password.trim()) newErrors.password = "Password is required";
    if (!formData.role) newErrors.role = "Role is required";
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
    const res = await usersApi.register({
      username: formData.user,
      email: formData.email,
      password: formData.password,
      role: formData.role || 'STUDENT'
    });
    setLoading(false);

    if (res.success) {
      setUser({ username: formData.user });
      if (onSignupSuccess) onSignupSuccess();
      setServerMessage('Registration successful');
    } else {
      setServerMessage(res.message || 'Registration failed');
    }
  };

  const handleReset = () => {
    setFormData({ user: "", email: "", password: "", role: "" });
    setErrors({});
    setServerMessage("");
  };

  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: "20px",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    formWrapper: {
      maxWidth: "700px",
      margin: "0 auto",
      background: "rgba(255, 255, 255, 0.95)",
      backdropFilter: "blur(10px)",
      borderRadius: "24px",
      padding: "40px",
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
    },
    header: {
      textAlign: "center",
      marginBottom: "30px",
    },
    title: {
      fontSize: "2.5em",
      fontWeight: "700",
      color: "#2c3e50",
      marginBottom: "10px",
    },
    subtitle: {
      fontSize: "1.1em",
      color: "#7f8c8d",
      margin: 0,
    },
    formContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "25px",
    },
    row: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "20px",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
    },
    label: {
      fontSize: "0.95em",
      fontWeight: "600",
      color: "#34495e",
      marginBottom: "8px",
    },
    required: {
      color: "#e74c3c",
    },
    input: {
      width: "100%",
      padding: "15px",
      border: "2px solid #e1e8ed",
      borderRadius: "12px",
      fontSize: "1em",
      transition: "all 0.3s ease",
      background: "#fff",
      outline: "none",
      boxSizing: "border-box",
    },
    inputFocus: {
      borderColor: "#667eea",
      boxShadow: "0 0 0 3px rgba(102, 126, 234, 0.1)",
      transform: "translateY(-2px)",
    },
    inputError: {
      borderColor: "#e74c3c",
    },
    textarea: {
      width: "100%",
      padding: "15px",
      border: "2px solid #e1e8ed",
      borderRadius: "12px",
      fontSize: "1em",
      transition: "all 0.3s ease",
      background: "#fff",
      outline: "none",
      resize: "vertical",
      minHeight: "100px",
      fontFamily: "inherit",
      boxSizing: "border-box",
    },
    errorMessage: {
      color: "#e74c3c",
      fontSize: "0.85em",
      marginTop: "5px",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "center",
      gap: "15px",
      marginTop: "30px",
    },
    submitButton: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      border: "none",
      padding: "15px 40px",
      borderRadius: "50px",
      fontSize: "1.1em",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0 10px 20px rgba(102, 126, 234, 0.3)",
    },
    resetButton: {
      background: "transparent",
      color: "#7f8c8d",
      border: "2px solid #bdc3c7",
      padding: "13px 30px",
      borderRadius: "50px",
      fontSize: "1em",
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
  };

  const mobileStyles = `
    @media (max-width: 768px) {
      .form-row {
        grid-template-columns: 1fr !important;
        gap: 0 !important;
      }
      .form-wrapper {
        padding: 30px 20px !important;
      }
      .title {
        font-size: 2em !important;
      }
      .button-container {
        flex-direction: column;
        align-items: center;
      }
      .button-container button {
        width: 100%;
        max-width: 300px;
      }
    }
  `;

  return (
    <>
      <style>{mobileStyles}</style>
      <div style={styles.container}>
        <div style={styles.formWrapper} className="form-wrapper">
          <div style={styles.header}>
            <h1 style={styles.title} className="title">
              Professional Registration
            </h1>
            <p style={styles.subtitle}>
              Please fill out all required fields to complete your registration
            </p>
          </div>

          <form style={styles.formContainer} onSubmit={handleSubmit}>
            {/* Stream ID and User */}
            <div style={styles.row} className="form-row">
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  User <span style={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  name="user"
                  value={formData.user}
                  onChange={handleChange}
                  style={{
                    ...styles.input,
                    ...(errors.user ? styles.inputError : {}),
                  }}
                  placeholder="Enter username"
                  onFocus={(e) => {
                    e.target.style.borderColor = "#667eea";
                    e.target.style.boxShadow =
                      "0 0 0 3px rgba(102, 126, 234, 0.1)";
                    e.target.style.transform = "translateY(-2px)";
                  }}
                  onBlur={(e) => {
                    if (!errors.user) {
                      e.target.style.borderColor = "#e1e8ed";
                      e.target.style.boxShadow = "none";
                      e.target.style.transform = "translateY(0)";
                    }
                  }}
                />
                {errors.user && (
                  <span style={styles.errorMessage}>{errors.user}</span>
                )}
              </div>
            </div>

            <div style={styles.row} className="form-row">
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Password <span style={styles.required}>*</span>
                </label>
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
                  onFocus={(e) => {
                    e.target.style.borderColor = "#667eea";
                    e.target.style.boxShadow =
                      "0 0 0 3px rgba(102, 126, 234, 0.1)";
                    e.target.style.transform = "translateY(-2px)";
                  }}
                  onBlur={(e) => {
                    if (!errors.email) {
                      e.target.style.borderColor = "#e1e8ed";
                      e.target.style.boxShadow = "none";
                      e.target.style.transform = "translateY(0)";
                    }
                  }}
                />
                {errors.password && (
                  <span style={styles.errorMessage}>{errors.password}</span>
                )}
              </div>
            </div>

            {/* Email and Contact Number */}
            <div style={styles.row} className="form-row">
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Email <span style={styles.required}>*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={{
                    ...styles.input,
                    ...(errors.email ? styles.inputError : {}),
                  }}
                  placeholder="Enter your email"
                  onFocus={(e) => {
                    e.target.style.borderColor = "#667eea";
                    e.target.style.boxShadow =
                      "0 0 0 3px rgba(102, 126, 234, 0.1)";
                    e.target.style.transform = "translateY(-2px)";
                  }}
                  onBlur={(e) => {
                    if (!errors.email) {
                      e.target.style.borderColor = "#e1e8ed";
                      e.target.style.boxShadow = "none";
                      e.target.style.transform = "translateY(0)";
                    }
                  }}
                />
                {errors.email && (
                  <span style={styles.errorMessage}>{errors.email}</span>
                )}
              </div>
            </div>

            {/* Role */}
            <label style={styles.label}>
              Select Role <span style={styles.required}>*</span>
            </label>
            <div style={styles.buttonContainer} className="button-container">
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                style={{ padding: '12px', borderRadius: '12px', border: '2px solid #e1e8ed' }}
              >
                <option value="">Select your role</option>
                <option value="INSTITUTION">Institution</option>
                <option value="STUDENT">Student</option>
                <option value="EMPLOYER">Employer</option>
              </select>
            </div>
            {errors.role && (
              <span style={styles.errorMessage}>{errors.role}</span>
            )}
            {/* Buttons */}
            <div style={styles.buttonContainer} className="button-container">
              <button
                style={styles.submitButton}
                onMouseOver={(e) => {
                  e.target.style.transform = "translateY(-3px)";
                  e.target.style.boxShadow =
                    "0 15px 30px rgba(102, 126, 234, 0.4)";
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow =
                    "0 10px 20px rgba(102, 126, 234, 0.3)";
                }}
                onMouseDown={(e) => {
                  e.target.style.transform = "translateY(-1px)";
                }}
                disabled={loading}
                type="submit"
              >
                {loading ? 'Submitting...' : 'Submit Form'}
              </button>
              <button
                onClick={handleReset}
                style={styles.resetButton}
                onMouseOver={(e) => {
                  e.target.style.color = "#e74c3c";
                  e.target.style.borderColor = "#e74c3c";
                }}
                onMouseOut={(e) => {
                  e.target.style.color = "#7f8c8d";
                  e.target.style.borderColor = "#bdc3c7";
                }}
              >
                Reset
              </button>
            </div>
            {serverMessage && (
              <p style={{ color: serverMessage.includes('success') ? '#16a34a' : '#e74c3c' }}>{serverMessage}</p>
            )}
            <a href="/login" target="_self" rel="noopener noreferrer">Login Page</a>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProfessionalForm;
