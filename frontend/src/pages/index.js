import { useState } from 'react';
import UploadButton from '../components/UploadButton';
import ProcessButton from '../components/ProcessButton';
import EmployeeTable from '../components/EmployeeTable';
import JobSummaryTable from '../components/JobSummaryTable';
import axiosInstance from '../services/axiosInstance';

export default function Home() {
  const [currentInterface, setCurrentInterface] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [jobSummary, setJobSummary] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [jobSummaryPageIndex, setJobSummaryPageIndex] = useState(0);
  const jobSummaryPageSize = 5;

  const columns = [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Employee Name', accessor: 'employeeName' },
    { Header: 'Job Title', accessor: 'jobTitle' },
    { Header: 'Salary', accessor: 'salary' },
  ];

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setCurrentInterface(2);
  };

  const handleProcess = async () => {
    if (!selectedFile) {
      console.error('No file selected');
      return;
    }

    setProcessing(true);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await axiosInstance.post('/api/csv/process', formData);

      if (response.status === 200) {
        const result = response.data;

        setEmployees(result.employees);
        setJobSummary(result.jobSummary);

        setCurrentInterface(3);
      } else {
        console.error('Error processing file');
      }

      setCurrentPage(1);
    } catch (error) {
      console.error('Error processing file:', error);
    } finally {
      setProcessing(false);
    }
  };

  const handleJobSummaryPageChange = (page) => {
    setJobSummaryPageIndex(page);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleBackToUpload = () => {
    setSelectedFile(null);
    setCurrentInterface(1);
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      DNA Engineering Full-Stack Internship Home Assignment
      {currentInterface === 1 && <UploadButton onFileChange={handleFileSelect} />}
      {currentInterface === 2 && (
        <>
          <UploadButton onFileChange={handleFileSelect} />
          <ProcessButton onClick={handleProcess} disabled={processing} />
        </>
      )}
      {currentInterface === 3 && (
        <>
          <UploadButton onFileChange={handleFileSelect} />
          <div style={{ width: '100%' }}>
            <h2>Employee Table</h2>
            <EmployeeTable columns={columns} data={employees} />
          </div>
          <JobSummaryTable
            jobSummary={jobSummary}
            pageIndex={jobSummaryPageIndex}
            pageSize={jobSummaryPageSize}
            onPageChange={handleJobSummaryPageChange}
          />
        </>
      )}
      {processing && <p>Processing...</p>}
    </main>
  );
}
