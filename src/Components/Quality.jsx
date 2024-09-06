import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Quality() {
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [message1, setMessage1] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [api, setApi] = useState([]); 
  const [submitted, setSubmitted] = useState(false); 

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const expiryDate = new Date('2024-12-31');
    const selectedDate = new Date(date);

    if (selectedDate > expiryDate) {
      setMessage('The selected date is earlier than the expiry date. The item is not good.');
    } else {
      setMessage('The selected date is valid. The item is good.');
    }

    setLoading(true);
    setError(null);
    setMessage1('');
    setApi([]); 
    setSubmitted(true);

    try {
      const response = await fetch(`https://api.fda.gov/drug/event.json?search=patient.drug.medicinalproduct:"${name}"&limit=1`);

      if (response.status >= 200 && response.status < 300) {
        const result = await response.json();

        if (result.results && result.results.length > 0) {
          const report = result.results[0];

          const safetyReportId = report.safetyreportid || 'N/A';
          const seriousness = report.serious ? 'Serious' : 'Not Serious';
          const country = report.primarysourcecountry || 'N/A';
          const hospitalization = report.seriousnesshospitalization ? 'Hospitalization' : 'No Hospitalization';

          const reactions = (report.reaction && Array.isArray(report.reaction))
            ? report.reaction.map((reaction, index) => ({
                name: reaction.reactionmeddrapt || 'Unknown',
                outcome: reaction.reactionoutcome === '6' ? 'Recovered' : 'Not recovered',
              }))
            : [];

          setMessage1(
            `Report ID: ${safetyReportId}, Seriousness: ${seriousness}, Country: ${country}, Hospitalization: ${hospitalization}`
          );
          setApi(reactions); 
        } else {
          setMessage1('No adverse events found for this medicine.');
          setApi([]);
        }
      } else {
        throw new Error(`Failed with status code: ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(`Failed to fetch data: ${error.message}`);
      setApi([]); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="card mb-3">
            <div className="card-header bg-primary text-white">
              <h4>Medicine Quality Check</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="nameInput">Name of Medicine</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nameInput"
                    value={name}
                    onChange={handleNameChange}
                    placeholder="Enter the medicine name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="dateInput">Select Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="dateInput"
                    value={date}
                    onChange={handleDateChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
              {message && (
                <div className="alert alert-info mt-3">
                  {message}
                </div>
              )}
              {loading && (
                <div className="alert alert-info mt-3">
                  Loading...
                </div>
              )}
              {error && (
                <div className="alert alert-danger mt-3">
                  {error}
                </div>
              )}
              {submitted && !loading && !error && api.length === 0 && (
                <div className="alert alert-info mt-3">
                  No reactions to display.
                </div>
              )}
            </div>
          </div>

          
          <div className="card">
            <div className="card-header bg-info text-white">
              <h4>Report Section</h4>
            </div>
            <div className="card-body">
              {message1 && (
                <div className="alert alert-info">
                  {message1}
                </div>
              )}
              {api.length > 0 && !loading && !error && (
                <div className="mt-3">
                  <h5>Reactions:</h5>
                  <ul className="list-group">
                    {api.map((reaction, index) => (
                      <li key={index} className="list-group-item">
                        <strong>{reaction.name}:</strong> {reaction.outcome}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quality;
