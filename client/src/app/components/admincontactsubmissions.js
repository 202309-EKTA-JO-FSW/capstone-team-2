import React, { useState, useEffect } from 'react';

function AdminContactSubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

//   useEffect(() => {
//     fetch('http://localhost:3001/admin/submit')
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then(data => {
//         setSubmissions(data);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//         setError(error.message);
//         setLoading(false);
//       });
//   }, []);

useEffect(() => {
    // Fetch contact submissions data from the backend
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/admin/submit');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSubmissions(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
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
    <div className="admin-container">
      <h1>Admin Page - Contact Form Submissions</h1>
      <div className="submissions-list">
        {submissions.map((submission, index) => (
          <div key={index} className="submission">
            <p><strong>Name:</strong> {submission.name}</p>
            <p><strong>Email:</strong> {submission.email}</p>
            <p><strong>Subject:</strong> {submission.subject}</p>
            <p><strong>Message:</strong> {submission.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminContactSubmissions;