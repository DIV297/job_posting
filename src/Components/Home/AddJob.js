import React, { useState } from 'react';

const JobForm = () => {
  const [candidates, setCandidates] = useState([]);
  const [candidateInput, setCandidateInput] = useState('');

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

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg">
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Job Title</label>
            <input
              type="text"
              placeholder="Enter Job Title"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Job Description</label>
            <textarea
              placeholder="Enter Job Description"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 h-24"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Experience Level</label>
            <select className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500">
              <option value="" disabled selected>
                Select Experience Level
              </option>
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
