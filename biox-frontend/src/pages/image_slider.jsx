import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import red from '../static/red.jpeg';
import logo from '../static/logo.png';

const slider_images = [red, logo];

function ImageSlider(){
 
const settings ={
    dots:true,
    infinite:true,
    speed:200,
    slidesToShow: 1,        
    slidesToScroll: 1,      
    autoplay: true,         
    autoplaySpeed: 3000,    
    arrows: true,      
} ;   


return (
    <div className='slider_container' style={{
        height: '120rem',
        border:'2px solid',
        borderRadius: '10px',
        width:'50%',
        margin: '0 auto', 
        justifyContent: 'center',
        alignItems: 'center',
        overflow:'hidden',
        // objectFit: 'contain',
      }}>
<Slider {...settings}>
    {slider_images.map((img,index)=>(
        <div key = {index}>
            <img 
            src ={img}
            style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                borderRadius: '10px',
                
        
              }}/>

        </div>
    ))}
</Slider>
    </div>
);
}

export default ImageSlider;
