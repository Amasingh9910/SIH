import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Quality() {
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [ocrResult1, setOcrResult1] = useState('');
  const [ocrResult2, setOcrResult2] = useState('');
  const [imageFile1, setImageFile1] = useState(null);
  const [imageFile2, setImageFile2] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    setMessage('');
    setError(null);
    setOcrResult1('');
    setOcrResult2('');

    if (!imageFile1 || !imageFile2) {
      setError('Please upload both images.');
      return;
    }

    const expiryDate = new Date('2024-12-31');
    const selectedDate = new Date(date);

    if (selectedDate > expiryDate) {
      setMessage('The selected date is earlier than the expiry date. The item is not good.');
    } else {
      setMessage('The selected date is valid. The item is good.');
    }

    setLoading(true);

    try {
      
      const [result1, result2] = await Promise.all([processImage(imageFile1), processImage(imageFile2)]);

      setOcrResult1(result1);  
      setOcrResult2(result2);  
    } catch (error) {
      setError(`Failed to process images: ${error.message}`);
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
                <div className="alert alert-info mt-3">
                  {message}
                </div>
              )}
              {loading && (
                <div className="alert alert-info mt-3">
                  Processing images...
                </div>
              )}
              {error && (
                <div className="alert alert-danger mt-3">
                  {error}
                </div>
              )}
              {ocrResult1 && (
                <div className="alert alert-success mt-3">
                  <h5>Manufacturer OCR Result:</h5>
                  <pre>{ocrResult1}</pre>
                </div>
              )}
              {ocrResult2 && (
                <div className="alert alert-success mt-3">
                  <h5>Expiry Date OCR Result:</h5>
                  <pre>{ocrResult2}</pre>
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
