import React from 'react';
import axiosInstance from '../services/axiosInstance';

const UploadButton = ({ onFileChange }) => {
  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    try {
      const formData = new FormData();
      formData.append('file', file);

      await axiosInstance.post('/api/csv/process', formData);

      console.log('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
    }

    onFileChange(file);
  };

  return (
    <div>
      <label htmlFor="fileInput">Choose a file:</label>
      <input
        type="file"
        id="fileInput"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <button
        style={{
          border: '2px solid #3498db',
          background: '#3498db',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '4px', 
          cursor: 'pointer', 
        }}
        onClick={() => document.getElementById('fileInput').click()}
      >
        Upload
      </button>
    </div>
  );
};

export default UploadButton;
