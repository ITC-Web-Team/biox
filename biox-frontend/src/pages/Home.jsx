import React from 'react'
import Hero from '../components/Hero'
import './home.css'
import Abouthp from '../components/Abouthp'
import JoinClub from '../components/JoinClub'
import DiscoverX from '../components/DiscoverX'
import GallerySlideshow from '../components/GallerySlideshow'
import FAQ from '../components/FAQ'

function Home() {
  return (
    <>
        <Hero />
        <Abouthp />
        <JoinClub />
        <DiscoverX />
        <GallerySlideshow />
        <FAQ />
    </>
  )
}

export default Home