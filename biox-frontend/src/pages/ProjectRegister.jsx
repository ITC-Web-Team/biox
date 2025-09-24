import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
    fetch(`http://127.0.0.1:8000/projects/${projectId}/`)
      .then((res) => res.json())
      .then((data) => setProject(data))
      .catch((err) => console.error("Error fetching project:", err));
  }, [projectId]);

  // handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      project: projectId, // backend expects project ID
      ...formData
    };

    fetch("http://127.0.0.1:8000/registrations/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
      .then((res) => {
        if (res.ok) {
          setStatus(" Registered successfully!");
          setFormData({ student_name: "", student_email: "", student_phoneno: "" });
        } else {
          setStatus("Failed to register. Try again.");
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        setStatus(" Error submitting form.");
      });
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
