import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import useStore from '../../store/company'; // Assuming you have a Zustand store for token
import { classnames } from '../../constants/classnames';
import { buttonPrimary } from '../../constants/colors';

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5); // Default limit of jobs per page
  const [totalPages, setTotalPages] = useState(1);
  const token = useStore((state) => state.token); // Fetch token from Zustand store

  useEffect(() => {
    // Fetch jobs when the component loads or when the page or limit changes
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/company/jobs`, {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in headers
          },
          params: {
            page, // Current page for pagination
            limit, // Number of jobs per page
          },
        });

        if (response.data.success) {
          setJobs(response.data.data); // Set jobs in the state
          setTotalPages(response.data.totalPages); // Set total pages for pagination
        }
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      }
    };

    fetchJobs();
  }, [page, limit, token]);

  // Handle pagination
  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  // Handle entries per page change
  const handleLimitChange = (e) => {// Update the limit when user selects a new value
    setPage(1); 
  };

  return (
    <div className="mt-4">
      <button className={classnames("text-white px-4 py-2 rounded-md mb-6 font-semibold",buttonPrimary)}>
        <Link to='/jobform'>
          Create Interview
        </Link>
      </button>

      <div className="mb-6">
        <label htmlFor="entriesPerPage" className="mr-2 text-gray-700">Entries per page:</label>
        <select
          id="entriesPerPage"
          value={limit}
          onChange={handleLimitChange}
          className="border px-2 py-1 rounded-md"
        >
          <option value={2}>2</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>

      {/* Display added jobs */}
      <div>
        {jobs.length > 0 ? (
          <ul>
            {jobs.map((job) => (
              <li key={job._id} className="mb-4 p-4 bg-gray-100 rounded-md shadow-md">
                <h2 className="text-xl font-semibold">{job.jobTitle}</h2>
                <p>{job.jobDescription}</p>
                <p><strong>Experience Level:</strong> {job.experienceLevel}</p>
                <p><strong>End Date:</strong> {new Date(job.endDate).toLocaleDateString()}</p>
                <p><strong>Created At:</strong> {new Date(job.createdAt).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No jobs added yet.</p>
        )}
      </div>

    {jobs.length > 0 &&   <div className="flex justify-between mt-6">
        <button
          className={`px-4 py-2 rounded-md ${page === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
          onClick={handlePreviousPage}
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          className={`px-4 py-2 rounded-md ${page === totalPages ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
          onClick={handleNextPage}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>}
    </div>
  );
};

export default Home;
