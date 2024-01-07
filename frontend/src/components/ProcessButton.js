import React from 'react';

const ProcessButton = ({ onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        border: '2px solid #3498db',
        background: '#3498db',
        color: 'white',
        padding: '8px 12px',
        borderRadius: '4px',
      }}
    >
      Process
    </button>
  );
};

export default ProcessButton;
