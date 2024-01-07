import React from 'react';

const JobSummaryTable = ({ jobSummary, pageIndex, pageSize, onPageChange }) => {
  const startIndex = pageIndex * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = Object.entries(jobSummary).slice(startIndex, endIndex);

  return (
    <div style={{ width: '100%', marginTop: '40px' }}>
      <h2>Job Summary Table</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead style={{ backgroundColor: '#3498db', color: 'white' }}>
          <tr>
            <th style={{ padding: '10px', borderBottom: '2px solid #ddd' }}>Job Title</th>
            <th style={{ padding: '10px', borderBottom: '2px solid #ddd' }}>Average Salary</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map(([jobTitle, averageSalary], index) => (
            <tr key={jobTitle} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : 'white' }}>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{jobTitle}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{averageSalary}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <button
          onClick={() => onPageChange(pageIndex - 1)}
          disabled={pageIndex === 0}
          style={{
            padding: '10px',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Previous
        </button>
        <span style={{ fontSize: '16px' }}>
          Page{' '}
          <strong>
            {pageIndex + 1} of {Math.ceil(Object.keys(jobSummary).length / pageSize)}
          </strong>{' '}
        </span>
        <button
          onClick={() => onPageChange(pageIndex + 1)}
          disabled={pageIndex === Math.ceil(Object.keys(jobSummary).length / pageSize) - 1}
          style={{
            padding: '10px',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default JobSummaryTable;
