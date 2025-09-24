import './BSP.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const BSP = () => {
  const [projects, setProjects] = useState([]);
  const [expanded, setExpanded] = useState({}); // track read more states
  const navigate = useNavigate();

  // Fetch projects
  useEffect(() => {
    fetch('http://127.0.0.1:8000/projects/')
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error(err));
  }, []);

  // Handle register click
  const HandleRegister = (projectId) => {
    console.log("Navigating to:", `/Register/${projectId}`);
    navigate(`/Register/${projectId}`);
  };

  // Handle read more toggle
  const toggleReadMore = (id) => {
    setExpanded(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div>
      <h2 >Available Projects</h2>
      <div className="projects-container">
        {projects.map(project => (
          <div key={project.id} className="project-card">
            <h3>{project.title}</h3>
            <img src={project.image} alt={project.title} />
            <div class="card-body">
            <div>Mentor: {project.mentor}</div>
            {/* Description with Read More */}
            <p className="description">
              {expanded[project.id]
                ? project.description
                : project.description.slice(0, 100) + (project.description.length > 100 ? "..." : "")
              }
            </p>
            
            {project.description.length > 100 && (
              <button 
                className="readmore-btn" 
                onClick={() => toggleReadMore(project.id)}
              >
                {expanded[project.id] ? "Read Less" : "Read More"}
              </button>
            )}
            </div>
            
            <button 
              className="register-btn"
              onClick={() => HandleRegister(project.id)}
            >
              Register
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BSP;
