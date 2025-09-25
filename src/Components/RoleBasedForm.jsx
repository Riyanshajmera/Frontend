import React from 'react'
import { useState } from 'react'


export default function RoleBasedForm() {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    role: "STUDENT",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Example: submit to your registration endpoint.
      // Ensure backend accepts these field names and uppercase role values.
      /*
      const response = await fetch("/api/register/", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Registration failed");
      const data = await response.json();
      */

      // Redirect after successful registration/login based on role
      const role = formData.role?.toUpperCase();
      if (role === "INSTITUTION" || role === "EMPLOYER") {
        // send institution/employer users to the institution page
        window.location.href = "/institution";
      } else {
        // send students to student area
        window.location.href = "/student";
      }

      alert("Form submitted successfully!");
    } catch (error) {
      alert("Error in form submission");
    }
  };

  return (
    <div className="form-wrapper">
      <div className="header">
        <h1>Registration Page</h1>
        <p>Please fill out all required fields</p>
      </div>
      <form className="form-container" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userName">UserName</label>
          <input
            type="text"
            name="userName"
            placeholder="Enter UserName"
            value={formData.userName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter a strong password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="role">Select your role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="">-- Select --</option>
            <option value="EMPLOYER">Employer</option>
            <option value="STUDENT">Student</option>
            <option value="INSTITUTION">Institution</option>
          </select>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};