import React, { useState } from 'react';
import axios from 'axios';
import useStore from '../../store/company'; // Assuming you're using Zustand for the token

const JobForm = () => {
  const [candidates, setCandidates] = useState([]);
  const [candidateInput, setCandidateInput] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [endDate, setEndDate] = useState('');
  const token = useStore((state) => state.token); // Fetching the token from Zustand store

  const addCandidate = (e) => {
    e.preventDefault();
    if (candidateInput && !candidates.includes(candidateInput)) {
      setCandidates([...candidates, candidateInput]);
      setCandidateInput('');
    }
  };

  const removeCandidate = (candidate) => {
    setCandidates(candidates.filter((c) => c !== candidate));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create the job data object
    const jobData = {
      jobTitle,
      jobDescription,
      experienceLevel,
      candidates,
      endDate,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/company', jobData, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
        },
      });

      if (response.data.success) {
        // Handle successful job creation, e.g., reset the form or show a success message
        console.log('Job added successfully:', response.data.data);
        // Reset the form
        setJobTitle('');
        setJobDescription('');
        setExperienceLevel('');
        setCandidates([]);
        setCandidateInput('');
        setEndDate('');
      }
    } catch (error) {
      console.error('Failed to add job:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Job Title</label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="Enter Job Title"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Job Description</label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Enter Job Description"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 h-24"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Experience Level</label>
            <select
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="" disabled>Select Experience Level</option>
              <option value="entry">Entry Level</option>
              <option value="mid">Mid Level</option>
              <option value="senior">Senior Level</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Add Candidate</label>
            <div className="flex items-center space-x-2">
              <input
                type="email"
                value={candidateInput}
                onChange={(e) => setCandidateInput(e.target.value)}
                placeholder="Enter candidate email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={addCandidate}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Add
              </button>
            </div>

            {/* Display added candidates */}
            <div className="mt-2">
              {candidates.map((candidate, index) => (
                <span
                  key={index}
                  className="inline-flex items-center bg-gray-200 text-sm text-gray-700 py-1 px-3 rounded-full mr-2 mt-2"
                >
                  {candidate}
                  <button
                    onClick={() => removeCandidate(candidate)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobForm;
