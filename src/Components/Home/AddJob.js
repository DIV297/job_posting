import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useStore from '../../store/company';
import { classnames } from '../../constants/classnames';
import { buttonPrimary } from '../../constants/colors';
import { addJobHeading, borderFocus } from '../../constants/style';

const JobForm = () => {
  const [candidates, setCandidates] = useState([]);
  const [candidateInput, setCandidateInput] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [endDate, setEndDate] = useState('');
  const [templateType, setTemplateType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState(''); 

  const token = useStore((state) => state.token);
  const navigate = useNavigate();

  const isFormValid = jobTitle && jobDescription && experienceLevel && endDate && templateType && candidates.length > 0;

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const addCandidate = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (candidateInput && !candidates.includes(candidateInput)) {
        if (validateEmail(candidateInput)) {
          setCandidates([...candidates, candidateInput]);
          setCandidateInput('');
          setEmailError(''); // Clear error if email is valid
        } else {
          setEmailError('Please enter a valid email address'); // Set error if email is invalid
        }
      }
    }
  };

  const removeCandidate = (candidate) => {
    setCandidates(candidates.filter((c) => c !== candidate));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jobData = {
      jobTitle,
      jobDescription,
      experienceLevel,
      candidates,
      endDate,
      templateType,
    };

    setIsSubmitting(true); 

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASEURL}/api/company`, jobData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        navigate('/home');
      }
    } catch (error) {
      console.error('Failed to add job:', error);
    } finally {
      setIsSubmitting(false); 
    }
  };

  return (
    <div className="mt-4 flex items-center">
      <div className="bg-white w-full max-w-3xl">
        <form onSubmit={handleSubmit}>
          <div className={classnames(addJobHeading)}>
            <label className="block text-gray-700 font-medium mt-1 w-1/3 text-right">Job Title</label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="Enter Job Title"
              className={classnames("w-full px-4 py-2 border rounded-md", borderFocus)}
              required
            />
          </div>

          <div className={classnames(addJobHeading)}>
            <label className="block text-gray-700 font-medium mt-1 w-1/3 text-right">Job Description</label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Enter Job Description"
              className={classnames("w-full px-4 py-2 border rounded-md h-24", borderFocus)}
              required
            />
          </div>

          <div className={classnames(addJobHeading)}>
            <label className="block text-gray-700 font-medium mt-1 w-1/3 text-right">Experience Level</label>
            <select
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
              className={classnames("w-full px-4 py-2 border rounded-md", borderFocus, experienceLevel ? "" : "text-gray-400")}
              required
            >
              <option value="" disabled>Select Experience Level</option>
              <option value="entry">Entry Level</option>
              <option value="mid">Mid Level</option>
              <option value="senior">Senior Level</option>
            </select>
          </div>

          <div className={classnames(addJobHeading)}>
            <label className="block text-gray-700 font-medium mt-1 w-1/3 text-right">Template Type</label>
            <select
              value={templateType}
              onChange={(e) => setTemplateType(e.target.value)}
              className={classnames("w-full px-4 py-2 border rounded-md", borderFocus, templateType ? "" : "text-gray-400")}
              required
            >
              <option value="" disabled>Select Template Type</option>
              <option value="BASIC">Basic</option>
              <option value="INTERMEDIATE">Intermediate</option>
              <option value="ADVANCED">Advanced</option>
            </select>
          </div>

          <div className={classnames(addJobHeading)}>
            <label className="block text-gray-700 font-medium mt-1 w-1/3 text-right">Add Candidate</label>
            <div className={classnames("relative flex items-center border rounded-md px-4 py-2 w-full h-full", borderFocus)}>
              {candidates.map((candidate, index) => (
                <span
                  key={index}
                  className="inline-flex items-center bg-gray-200 text-sm text-gray-700 py-1 px-3 rounded-full mr-2"
                >
                  {candidate}
                  <button
                    type="button"
                    onClick={() => removeCandidate(candidate)}
                    className="ml-2"
                  >
                    &times;
                  </button>
                </span>
              ))}
              <input
                type="email"
                value={candidateInput}
                onChange={(e) => setCandidateInput(e.target.value)}
                onKeyDown={addCandidate}
                placeholder="Add Candidate (Email)"
                className="w-full focus:outline-none"
              />
            </div>
          </div>
            {emailError && <div className="text-red-500 text-sm mb-1 w-full text-right">{emailError}</div>} 

          <div className={classnames(addJobHeading)}>
            <label className="block text-gray-700 font-medium mt-1 w-1/3 text-right">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className={classnames("w-full px-4 py-2 border rounded-md", borderFocus, endDate ? "" : "text-gray-400")}
              required
            />
          </div>

          <div className="w-full relative">
            <button
              type="submit"
              className={classnames(buttonPrimary, "w-fit px-4 text-white py-2 rounded-md hover:bg-blue-600  absolute right-0",(!isFormValid || isSubmitting)?"opacity-50 hover:shadow-lg":"")}
              disabled={!isFormValid || isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Send'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobForm;
