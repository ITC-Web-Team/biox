import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
// import red from '../static/red.jpeg';
// import logo from '../static/logo.png';
import slider6 from '../static/slider6.jpg';
import slider7 from '../static/slider7.jpg';
import slider8 from '../static/slider8.jpg';
import slider9 from '../static/slider9.jpg';
// import slider10 from '../static/slider5.jpg';

const slider_images = [slider6, slider7, slider8, slider9];

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
    pauseonHover: true,
} ;   


return (
    <div className='slider_container' style={{
        position: 'relative',
        width: '50%',
        aspectRatio: '16 / 9',
        margin: '0 auto',
        overflow: 'hidden',
        borderRadius: '12px',
        border: '2px solid #ccc',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
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
