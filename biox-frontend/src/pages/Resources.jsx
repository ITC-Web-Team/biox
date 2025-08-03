import React, { useState } from 'react';
import './Resources.css';
import { FiExternalLink, FiSearch } from 'react-icons/fi';

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(false);

  const data = [
    {
      id: 1,
      imagelink: "https://svs.gsfc.nasa.gov/vis/a010000/a010300/a010394/pollen.jpg",
      title: "Films on Pollen and Pollination",
      descpt1: "Plant reproduction",
      descpt2: "Variation",
      descpt3: "Gene Replication",
      link: "https://www.google.com"
    },
    {
      id: 2,
      imagelink: "https://svs.gsfc.nasa.gov/vis/a010000/a010300/a010394/pollen.jpg",
      title: "Another Resource",
      descpt1: "Photosynthesis",
      descpt2: "Energy",
      descpt3: "Oxygen Production",
      link: "https://www.google.com"
    }
  ];

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='resources-container'>
      <div className="search-container">
  {showSearchBar && (
    <input
      type="text"
      className="search-bar"
      placeholder="Search by title..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  )}
  <FiSearch
    className="search-icon"
    onClick={() => setShowSearchBar(!showSearchBar)}
    style={{ cursor: 'pointer' }}
  />
</div>

      <div className='resources-page'>
        {filteredData.map((item) => (
          <div className="resource-card" key={item.id}>
            <img src={item.imagelink} alt={item.title} className="resource-image" />
            <div className="resource-content">
              <h3 className="resource-title">{item.title}</h3>
              <div className='content'>
                <div className="tags">
                  <span className="tag">{item.descpt1}</span>
                  <span className="tag">{item.descpt2}</span>
                  <span className="tag">{item.descpt3}</span>
                </div>
                <a href={item.link} className="external-link" target="_blank" rel="noopener noreferrer">
                  <FiExternalLink size={20} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resources;
