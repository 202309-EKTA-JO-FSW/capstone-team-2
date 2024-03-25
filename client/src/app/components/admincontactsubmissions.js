import React, { useState, useEffect } from "react";

function AdminContactSubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch contact submissions data from the backend
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/admin/submit");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setSubmissions(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData(); // Call the fetchData function to initiate the data fetching
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (submissions.length === 0) {
    return <div>No submissions to display.</div>;
  }

  return (
    <div className="admin-container bg-white text-black p-8">
      <h1 className="text-3xl font-bold mb-8">
        Admin Page - Contact Form Submissions
      </h1>
      <div className="submissions-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {submissions.map((submission, index) => (
          <div
            key={index}
            className="submission bg-white p-4 rounded border border-black-300 text-black"
          >
            <p style={{ color: "black" }}>
              <strong>Name:</strong> {submission.name}
            </p>
            <p style={{ color: "black" }}>
              <strong>Email:</strong> {submission.email}
            </p>
            <p style={{ color: "black" }}>
              <strong>Subject:</strong> {submission.subject}
            </p>
            <p style={{ color: "black" }}>
              <strong>Message:</strong> {submission.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminContactSubmissions;
