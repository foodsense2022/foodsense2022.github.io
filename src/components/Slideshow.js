import React from 'react';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import './Slideshow.css';

export default function Slideshow(slideImages) {
    return (
      <div className="slide-container">
        <Fade>
         {slideImages.map((slideImage, index)=> (
            <div className="each-slide" key={index}>
              <div className="image-selector" style={{'backgroundImage': `url(${slideImage.url})`}}>
                <span className="caption">{slideImage.caption}</span>
              </div>
            </div>
          ))} 
        </Fade>
      </div>
    )
}