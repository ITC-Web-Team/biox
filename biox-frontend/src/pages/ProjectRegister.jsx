import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api";
import { getCSRFToken } from "../config/csrf";
import "./ProjectRegister.css"
const ProjectRegistration = () => {
  const { projectId } = useParams(); // project id from URL
  const [project, setProject] = useState(null);
  const [formData, setFormData] = useState({
    student_name: "",
    student_email: "",
    student_phoneno: "",
    student_sop:"",
  });
  const [status, setStatus] = useState(null);

  // fetch project details
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`${API_ENDPOINTS.projects}${projectId}/`);
        setProject(response.data);
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };
    
    fetchProject();
  }, [projectId]);

  // handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        project: projectId, // backend expects project ID
        ...formData
      };

      // Get CSRF token for secure submission
      const csrfToken = await getCSRFToken();
      
      // Configure headers for Django backend
      const config = {
        headers: {
          'Content-Type': 'application/json',
          ...(csrfToken && { 'X-CSRFToken': csrfToken })
        }
      };

      const response = await axios.post(API_ENDPOINTS.projectRegistrations, payload, config);
      setStatus("Registered successfully!");
      setFormData({ student_name: "", student_email: "", student_phoneno: "", student_sop: "" });
    } catch (error) {
      console.error("Registration error:", error);
      if (error.response) {
        console.error("Backend response:", error.response.data);
        setStatus(`Registration failed: ${error.response.data.message || 'Server error'}`);
      } else {
        setStatus("Registration failed. Please check your connection and try again.");
      }
    }
  };

  return (
    <div className="page-div">
    <div className="Register-container">
      {project ? (
        <>
          <h2 className="project.title">{project.title}</h2>
          <p className="project.mentor">Mentor: {project.mentor}</p>
          {/* <p className="project.description">{project.description}</p> */}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className= "nameContainer containers">
            <div>Name:</div>
            <input
              type="text"
              name="student_name"
              placeholder="Your Name"
              value={formData.student_name}
              onChange={handleChange}
              required
              className="input-name"
            />
            </div>
            <div className="emailContainer containers">
            <div>Email:</div>
            <input
              type="email"
              name="student_email"
              placeholder="Your Email"
              value={formData.student_email}
              onChange={handleChange}
              required
              className="input-email"
            />
            </div>
            <div className="phonenoContainer containers">
            <div>Phone n.o :</div>
            <input
              type="text"
              name="student_phoneno"
              placeholder="Your Phone (10 digits)"
              value={formData.student_phoneno}
              onChange={handleChange}
              required
              className="input-phone"/>
              </div>
              <div className="sopContainer containers">
            <div>Statement of purpose :</div>
            <textarea
              name="student_sop"
              placeholder="Write your SOP(max of 200 words)"
              value={formData.student_sop}
              onChange={handleChange}
              required
              rows="7"
              className="inputSop"/>
              </div>
            <button
              type="submit"
              className="Register-btn">
              Register
            </button>
          </form>

          {status && <p className="mt-4">{status}</p>}
        </>
      ) : (
        <p>Loading project details...</p>
      )}
    </div>
    </div>
  );
};

export default ProjectRegistration;
