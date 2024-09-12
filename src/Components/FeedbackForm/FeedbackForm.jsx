import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './FeedbackForm.css';
import { Link} from 'react-router-dom'

const FeedbackForm = () => {
  const [showForm, setShowForm] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    alert("Form Submitted!");
  };

  useEffect(() => {
   
    const timer = setTimeout(() => {
      setShowForm(true);
    }, 2000); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="form-page">
      
      <div className="drop-animation"></div>

      
      {showForm && (
        <div className="container form-container p-5 shadow-lg rounded">
          <h2 className="form-heading typing-animation">Feedback Form</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row mb-4">
              <div className="col-md-6">
                <label className="form-label">Medicine Name</label>
                <input
                  className="form-control form-input"
                  {...register('medicineName', { required: true })}
                />
                {errors.medicineName && <span className="text-danger">This field is required</span>}
              </div>

              <div className="col-md-6">
                <label className="form-label">Batch Number</label>
                <input
                  className="form-control form-input"
                  {...register('batchNumber', { required: true })}
                />
                {errors.batchNumber && <span className="text-danger">This field is required</span>}
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-md-6">
                <label className="form-label">Manufacturer</label>
                <input
                  className="form-control form-input"
                  {...register('manufacturer', { required: true })}
                />
                {errors.manufacturer && <span className="text-danger">This field is required</span>}
              </div>

              <div className="col-md-6">
                <label className="form-label">Expiry Date</label>
                <input
                  type="date"
                  className="form-control form-input"
                  {...register('expiryDate', { required: true })}
                />
                {errors.expiryDate && <span className="text-danger">This field is required</span>}
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label">Does the medicine have side effects?</label>
              <select className="form-select form-input" {...register('sideEffects', { required: true })}>
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
              {errors.sideEffects && <span className="text-danger">This field is required</span>}
            </div>

            <div className="mb-4">
              <label className="form-label">Severity Level</label>
              <select className="form-select form-input" {...register('severity', { required: true })}>
                <option value="None">None</option>
                <option value="Slight">Slight</option>
                <option value="Moderate">Moderate</option>
                <option value="Severe">Severe</option>
                <option value="Fatal">Fatal</option>
              </select>
              {errors.severity && <span className="text-danger">This field is required</span>}
            </div>

            <div className="mb-4">
              <label className="form-label">Any dangerous effects?</label>
              <select className="form-select form-input" {...register('dangerousEffects', { required: true })}>
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
              {errors.dangerousEffects && <span className="text-danger">This field is required</span>}
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-success w-50 submit-btn">
                Submit Report
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default FeedbackForm;