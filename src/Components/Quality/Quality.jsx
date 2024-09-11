import React, { useState } from 'react';

function Quality() {
  const [ocrResult1, setOcrResult1] = useState('');
  const [ocrResult2, setOcrResult2] = useState('');
  const [imageFile1, setImageFile1] = useState(null);
  const [imageFile2, setImageFile2] = useState(null);
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [message1, setMessage1] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [api, setApi] = useState([]); 
  const [submitted, setSubmitted] = useState(false); 
  const [storageInfo, setStorageInfo] = useState("");
  const [storageLoading, setStorageLoading] = useState(false);
  const [storageError, setStorageError] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleImageChange1 = (event) => {
    setImageFile1(event.target.files[0]);
  };

  const handleImageChange2 = (event) => {
    setImageFile2(event.target.files[0]);
  };

  const processImage = async (imageFile) => {
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('apikey', 'K85155280288957'); 
    formData.append('language', 'eng'); 

    const response = await fetch('https://api.ocr.space/parse/image', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const result = await response.json();
      if (result && result.ParsedResults && result.ParsedResults.length > 0) {
        return result.ParsedResults[0].ParsedText || 'No text found in the image.';
      } else {
        return 'No text found in the image.';
      }
    } else {
      throw new Error(`OCR API failed with status: ${response.status}`);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setOcrResult1('');
    setOcrResult2('');

    const expiryDate = new Date('2024-12-31');
    const selectedDate = new Date(date);

    if (!imageFile1 || !imageFile2) {
      setError('Please upload both images.');
      return;
    }

    if (selectedDate > expiryDate) {
      setMessage('The selected date is past the expiry date. The item is no longer good.');
    } else {
      setMessage('The selected date is valid. The item is good.');
    }

    setLoading(true);
    setError(null);
    setMessage1('');
    setApi([]); 
    setSubmitted(true);
    setStorageInfo("");
    setStorageLoading(true);
    setStorageError("");

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

       // Fetch storage conditions from OpenFDA
       try {
        const response = await fetch(
          `https://api.fda.gov/drug/label.json?search=openfda.brand_name:"${encodeURIComponent(name)}"&limit=1`
        );
  
        const data = await response.json();
  
        if (data.results && data.results[0].storage_and_handling) {
          const storageInfo = data.results[0].storage_and_handling[0];
  
          // Extract temperature conditions
          const temperatureRegex = /store.*?(\d+°[CF].*?to.*?\d+°[CF])/i;
          const match = storageInfo.match(temperatureRegex);
  
          if (match) {
            setStorageInfo(match[0]);
          } else {
            setStorageInfo(storageInfo);
          }
        } else {
          setStorageError('No storage information available for this medicine.');
        }
      } catch (err) {
        console.error('Error fetching storage data:', err);
        setStorageError('Error fetching storage conditions. Please try again later.');
      } finally {
        setStorageLoading(false);
      }
    };
  
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <div className="card mb-3">
              <div className="card-header bg-primary text-white">
                <h2>Medicine Quality Check</h2>
              </div>
              <div className="card border p-3 bg-light">
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
                  <div className="form-group">
                    <label htmlFor="imageInput1">Upload Manufacturer Image</label>
                    <input
                      type="file"
                      className="form-control"
                      id="imageInput1"
                      onChange={handleImageChange1}
                      accept="image/*"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="imageInput2">Upload Another Image</label>
                    <input
                      type="file"
                      className="form-control"
                      id="imageInput2"
                      onChange={handleImageChange2}
                      accept="image/*"
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </form>
                {message && (
                  <div
                    className={`alert ${
                      message.includes("past the expiry date")
                        ? "alert-danger"
                        : "alert-info"
                    } mt-3`}
                  >
                    {message}
                  </div>
                )}
                {loading && (
                  <div className="alert alert-info mt-3">Loading...</div>
                )}
                {error && <div className="alert alert-danger mt-3">{error}</div>}
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
                {message1 && <div className="alert alert-info">{message1}</div>}
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
  
            <div className="card">
              <div className="card-header bg-info text-white">
                <h4>Storage Conditions</h4>
              </div>
              <div className="card-body">
                {storageLoading ? (
                  <p>Loading...</p>
                ) : (
                  <div>
                    {storageError ? (
                      <p>Error: {storageError}</p>
                    ) : (
                      <p>{storageInfo}</p>
                    )}
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