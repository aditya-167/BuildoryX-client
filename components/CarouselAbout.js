import React from 'react';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'



const CarouselAbout = ({slides, currentSlide}) => {
    
    return(
       <>
            {slides.map((slide,indx)=>{

                return(
                    
                    <div className={indx===currentSlide ? 'slide active' : 'slide'} keys={indx}>
                        {indx===currentSlide &&(
                            <img className="image" src = {slide.image}/>
                        )}
                    </div>
                ) 

            })}
       </>

    );
}
export default CarouselAbout;