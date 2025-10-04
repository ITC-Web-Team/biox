import React, { useState } from 'react';
import './Resources.css';
import { FiExternalLink, FiSearch } from 'react-icons/fi';

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(false);

  const data = [
    {
      id: 1,
      imagelink: "/resources-images/evolution.png",
      title: "LEARNER SPACE 2025",
      descpt1: "Evolution101: From molecules to mankind",
      descpt2: "Comprehensive evolution course",
      descpt3: "Molecular to organismal level",
      link: "https://drive.google.com/drive/folders/1a9AhTowi1JFn2qF1mmi0KfcMLi5_9Flo?usp=sharing",
      category: "Course"
    },
    {
      id: 2,
      imagelink: "/resources-images/biochem bioeng.png",
      title: "INTRODUCTION TO BIOCHEMISTRY",
      descpt1: "Biochemical Engineering",
      descpt2: "Chemistry and Biology bond",
      descpt3: "Dive into exciting interactions",
      link: "https://drive.google.com/drive/folders/1a9AhTowi1JFn2qF1mmi0KfcMLi5_9Flo?usp=sharing",
      category: "Course"
    },
    {
      id: 3,
      imagelink: "/resources-images/immunology.jpg",
      title: "TSS 2024 - IMMUNOLOGY",
      descpt1: "Immunology and viccinology",
      descpt2: "Immune system mechanisms",
      descpt3: "Vaccine development principles",
      link: "https://drive.google.com/drive/folders/1kSPcCMD_BgffFIozL6KRbVzzALIOqbSx?usp=sharing",
      category: "Research"
    },
    {
      id: 4,
      imagelink: "/resources-images/proteomics.png",
      title: "TSS 2024 - PROTEOMICS",
      descpt1: "Protein analysis techniques",
      descpt2: "Mass spectrometry",
      descpt3: "Structural biology",
      link: "https://drive.google.com/drive/folders/164K0IoHomkItTPaiKtIMuIu17jiWWFkn?usp=sharing",
      category: "Research"
    },
    {
      id: 5,
      imagelink: "/resources-images/symposium.png",
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
