import React, { useState } from "react";
import * as XLSX from "xlsx";
import { institutionsApi } from "../api/institutions";

const InstitutionForm = () => {
  const [formData, setFormData] = useState({
    institution: "",
    studentName: "",
    fatherName: "",
    dateOfBirth: "",
    rollNumber: "",
    course: "",
    yearOfPassing: "",
    certificateNumber: "",
    grade: "",
  });

  const [uploadedData, setUploadedData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [loading, setLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerMessage("");
    setLoading(true);
    const res = await institutionsApi.createStudentRecord({
      student_name: formData.studentName,
      father_name: formData.fatherName,
      date_of_birth: formData.dateOfBirth || null,
      roll_number: formData.rollNumber,
      course: formData.course,
      year_of_passing: parseInt(formData.yearOfPassing || '0', 10),
      certificate_number: formData.certificateNumber,
      grade_or_cgpa: formData.grade
    });
    setLoading(false);
    if (res.success) {
      setServerMessage('Student record submitted successfully');
    } else {
      setServerMessage(res.message || 'Failed to submit');
    }
  };

  // Handle CSV/Excel upload
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setServerMessage("");
      setLoading(true);
      const res = await institutionsApi.uploadStudentRecords(file);
      setLoading(false);
      if (res.success) {
        setServerMessage(res.data?.success || 'File uploaded successfully');
        // Best-effort preview: parse locally too
        const reader = new FileReader();
        reader.onload = (evt) => {
          const data = evt.target.result;
          const workbook = XLSX.read(data, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);
          setUploadedData(jsonData);
        };
        reader.readAsBinaryString(file);
      } else {
        setServerMessage(res.message || 'Upload failed');
      }
    }
  };

  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: "20px",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    formWrapper: {
      maxWidth: "800px",
      margin: "0 auto",
      background: "rgba(255, 255, 255, 0.95)",
      padding: "40px",
      borderRadius: "20px",
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
    },
    title: {
      textAlign: "center",
      fontSize: "2em",
      fontWeight: "700",
      marginBottom: "20px",
      color: "#2c3e50",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
      marginBottom: "15px",
    },
    label: {
      fontWeight: "600",
      marginBottom: "8px",
      color: "#34495e",
    },
    input: {
      padding: "12px",
      border: "2px solid #e1e8ed",
      borderRadius: "10px",
      fontSize: "1em",
    },
    button: {
      padding: "12px 30px",
      borderRadius: "50px",
      border: "none",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "#fff",
      fontSize: "1.1em",
      fontWeight: "600",
      cursor: "pointer",
      marginTop: "20px",
    },
    uploadBox: {
      marginTop: "30px",
      padding: "20px",
      border: "2px dashed #ccc",
      borderRadius: "12px",
      textAlign: "center",
      background: "#f9f9f9",
    },
    table: {
      marginTop: "20px",
      width: "100%",
      borderCollapse: "collapse",
    },
    th: {
      background: "#667eea",
      color: "#fff",
      padding: "10px",
    },
    td: {
      border: "1px solid #ddd",
      padding: "8px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        <h2 style={styles.title}>Institution Student Entry</h2>

        {/* Manual Entry Form */}
        <form onSubmit={handleSubmit}>
          {[
            { label: "Institution", name: "institution" },
            { label: "Student Name", name: "studentName" },
            { label: "Father Name", name: "fatherName" },
            { label: "Date of Birth", name: "dateOfBirth", type: "date" },
            { label: "Roll Number", name: "rollNumber" },
            { label: "Course", name: "course" },
            { label: "Year of Passing", name: "yearOfPassing" },
            { label: "Certificate Number", name: "certificateNumber" },
            { label: "Grade/CGPA", name: "grade" },
          ].map((field) => (
            <div style={styles.formGroup} key={field.name}>
              <label style={styles.label}>{field.label}</label>
              <input
                type={field.type || "text"}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                style={styles.input}
                placeholder={`Enter ${field.label}`}
              />
            </div>
          ))}

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>

        {/* File Upload Section */}
        <div style={styles.uploadBox}>
          <h3>Or Upload CSV/Excel File</h3>
          <input type="file" accept=".csv, .xlsx, .xls" onChange={handleFileUpload} />
          {serverMessage && (
            <p style={{ marginTop: '10px', color: serverMessage.includes('success') ? '#16a34a' : '#e74c3c' }}>{serverMessage}</p>
          )}
        </div>

        {/* Show Uploaded Data */}
        {uploadedData.length > 0 && (
          <table style={styles.table}>
            <thead>
              <tr>
                {Object.keys(uploadedData[0]).map((key) => (
                  <th key={key} style={styles.th}>
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {uploadedData.map((row, idx) => (
                <tr key={idx}>
                  {Object.values(row).map((val, i) => (
                    <td key={i} style={styles.td}>
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default InstitutionForm;
