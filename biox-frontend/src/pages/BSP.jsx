
import './BSP.css'
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const BSP = () => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    fetch('http://127.0.0.1:8000/projects/')
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error(err));
  }, []);
  const navigate = useNavigate()

  const HandleRegister = (projectId) => {
    console.log("Navigating to:", `/Register/${projectId}`);
    navigate(`/Register/${projectId}`);
  };

  return (
    <div>
      <h2>Available Projects</h2>
      <div className="projects-container">
        {projects.map(project => (
          <div key={project.id} className="project-card">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <small>Mentor: {project.mentor}</small>
            <button onClick={() => HandleRegister(project.id)}>Register</button>
          </div>
        ))}
  </div >
</div >

    )
}

export default BSP
