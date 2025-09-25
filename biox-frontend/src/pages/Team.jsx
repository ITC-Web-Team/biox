import React from 'react'
import Team_card from '../components/Team_card'
import './team.css'

// Import team member images
import gaurishImg from '../assets/Images/Gaurish.jpg'
import khushiImg from '../assets/Images/Khushi.jpg'
import jovitaImg from '../assets/Images/Jovita.jpg'
import ayushImg from '../assets/Images/Ayush.jpg'
import adwaiImg from '../assets/Images/Adwai.jpg'
import reetImg from '../assets/Images/reet.jpg'

function Team() {
  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: "GAURISH KHODKE",
      position: "MANAGER",
      department: "3RD YEAR MECHANICAL ENG. STUDENT",
      image: gaurishImg,
      instagram: "https://www.instagram.com/gaurish_940?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      linkedin: "https://www.linkedin.com/in/gaurish-khodke/",
      email: "23b2270@iitb.ac.in"
    },
    {
      id: 2,
      name: "KHUSHI KUCHERIA",
      position: "CONVENOR",
      department: "SOPHIE IN ELECTRICAL ENGINEERING",
      image: khushiImg,
      instagram: "https://www.instagram.com/khushi_kucheria/?hl=en",
      linkedin: "https://www.linkedin.com/in/khushi-kucheria-8aa51b324/",
      email: "24b1219@iitb.ac.in"
    },
    {
      id: 3,
      name: "JOVITA BHASIN",
      position: "CONVENOR",
      department: "SOPHIE IN CSE",
      image: jovitaImg,
      instagram: "https://www.instagram.com/jovitabhasin/?hl=en",
      linkedin: "https://www.linkedin.com/in/jovita-bhasin-720319217/",
      email: "24b0939@iitb.ac.in"
    },
    {
      id: 4,
      name: "AYUSH MOHAPATRA",
      position: "CONVENOR",
      department: "SOPHIE IN MECHANICAL ENGINEERING",
      image: ayushImg,
      instagram: "https://www.instagram.com/ayush.mohapatra60/?hl=en",
      linkedin: "https://www.linkedin.com/in/ayush-mohapatra-18323128a/",
      email: "24b2139@iitb.ac.in"
    },
    {
      id: 5,
      name: "ADWAI KUKKADAPU",
      position: "CONVENOR",
      department: "SOPHIE IN CIVIL ENGINEERING",
      image: adwaiImg,
      instagram: "https://www.instagram.com/_k_adwai_/?hl=en",
      linkedin: "https://www.linkedin.com/in/adwai-kukkadapu-530362334/",
      email: "24b0606@iitb.ac.in"
    },
    {
      id: 6,
      name: "REET DEDHIA",
      position: "CONVENOR",
      department: "SOPHIE IN MEMS",
      image: reetImg,
      instagram: "https://www.instagram.com/reetrockz/?hl=en",
      linkedin: "https://www.linkedin.com/in/reet-dedhia-b798a4321/",
      email: "24b2437@iitb.ac.in"
    }
  ];

  return (
    <div className='team-page'>
      <div className='team-hero'>
        <h1 className='team-title'>Meet Our Team</h1>
        <p className='team-subtitle'>The dedicated individuals behind BioX</p>
      </div>
      <div className='team_cards'>
        {teamMembers.map(member => (
          <Team_card key={member.id} member={member} />
        ))}
      </div>
    </div>
  )
}

export default Team;
