import React, { useState } from 'react';
import './Resources.css';
import { FiExternalLink, FiSearch } from 'react-icons/fi';

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(false);

  const data = [
    {
      id: 1,
      imagelink: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop&crop=center",
      title: "LEARNER SPACE 2025",
      descpt1: "EVOLUTION101: FROM MOLECULES TO MANKIND",
      descpt2: "Comprehensive evolution course",
      descpt3: "Molecular to organismal level",
      link: "https://drive.google.com/drive/folders/1a9AhTowi1JFn2qF1mmi0KfcMLi5_9Flo?usp=sharing",
      category: "Course"
    },
    {
      id: 2,
      imagelink: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=250&fit=crop&crop=center",
      title: "INTRODUCTION TO BIOCHEMISTRY",
      descpt1: "BIOCHEMICAL ENGINEERING",
      descpt2: "Chemistry and Biology bond",
      descpt3: "Dive into exciting interactions",
      link: "https://drive.google.com/drive/folders/1a9AhTowi1JFn2qF1mmi0KfcMLi5_9Flo?usp=sharing",
      category: "Course"
    },
    {
      id: 3,
      imagelink: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=400&h=250&fit=crop&crop=center",
      title: "TSS 2024 - IMMUNOLOGY",
      descpt1: "IMMUNOLOGY AND VACCINOLOGY",
      descpt2: "Immune system mechanisms",
      descpt3: "Vaccine development principles",
      link: "https://drive.google.com/drive/folders/1kSPcCMD_BgffFIozL6KRbVzzALIOqbSx?usp=sharing",
      category: "Research"
    },
    {
      id: 4,
      imagelink: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=250&fit=crop&crop=center",
      title: "TSS 2024 - PROTEOMICS",
      descpt1: "Protein analysis techniques",
      descpt2: "Mass spectrometry",
      descpt3: "Structural biology",
      link: "https://drive.google.com/drive/folders/164K0IoHomkItTPaiKtIMuIu17jiWWFkn?usp=sharing",
      category: "Research"
    },
    {
      id: 5,
      imagelink: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop&crop=center",
      title: "NEW FRONTIERS SYMPOSIUM",
      descpt1: "Biotechnology symposium",
      descpt2: "Industry experts",
      descpt3: "Latest research trends",
      link: "/symposium",
      category: "Symposium"
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
