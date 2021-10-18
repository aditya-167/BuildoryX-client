import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Avatar, Tooltip } from 'antd';
import {CheckCircleOutlined, CloseCircleOutlined, LeftCircleOutlined, RightCircleOutlined} from '@ant-design/icons'
import CarouselAbout from '../components/CarouselAbout';

import {fadeImages} from '../components/SlidesData';






const Index = ({menu}) =>{
    console.log(menu)
    const [courses, setCourses] = useState([]);
    const [allcourses, setAllCourses] = useState([]);
    const categories = []
    const [currentSlide, setCurrentSlide] = useState(0);
    const length = fadeImages.length;
    useEffect(()=>{
        const fetchCourses = ()=>{
            setCourses(menu);
            setAllCourses(menu);
        };
        fetchCourses();

    },[]);
    
    const allCategories = ['All', ...new Set(allcourses.map(course => course.category))];
    
    if(!Array.isArray(fadeImages) || fadeImages.length <= 0 ){
        return null;
    }
    
    const handlefilter = (button) =>{

        if(button === 'All'){
          setCourses(allcourses);
          return;
        }
        const filteredData = allcourses.filter((course) => course.category ===  button);
        setCourses(filteredData);
    }
    const prevSlide = () =>{
        setCurrentSlide(currentSlide===0?length-1:currentSlide-1)

    }
    const nextSlide = () =>{
        setCurrentSlide(currentSlide===length-1?0:currentSlide+1)
    }
    return (
        <>  
            <div className="slider">
                <LeftCircleOutlined onClick={prevSlide} className="left-arrow"/>
                
                <RightCircleOutlined onClick={nextSlide} className="right-arrow" /> 
                <CarouselAbout slides={fadeImages} currentSlide={currentSlide}/>
            </div>
            <div className="App text-center">
                <div ClassName="buttons">
                    {allCategories.map((cat,index)=>{

                        categories.push(<button type="button" onClick={()=> handlefilter(cat)} className="filter-btn btn text-center">{cat}</button>);   
                    })
                    }
                    {categories}
                </div>
            </div>
            
            <div className="master-container-course-instructor">
            <div class="container-course-instructor">
                
                {courses && courses.map((course) => (
                <>
                    <Link href={`/instructor/course/courseView/${course.slug}`} style={{ textDecoration: "none", color: "black"}} >
                        <a>
                                <div class="card-course-instructor">
                                <div class="card-course-instructor-header">
                                <img src={course.image? course.image.Location:"/images/courseCreate.jpg"} alt="rover" />
                                </div>
                                <div class="card-course-instructor-body">
                                <span class="tag tag-teal">{course.category}</span>
                                <h4 style = {{marginTop: "0.5rem"}}> 
                                    <span style={{fontSize: "30px",letterSpacing: ".2rem",fontFamily:"Kelly Slab, cursive",fontWeight:"700"}}>{course.name}</span>
                                </h4>
                                <p>
                                    <span style={{color:"rgba(11, 66, 32, 0.993)",fontSize: "17px",fontFamily:"Mirza, cursive",fontWeight:"100"}} >{course.about}</span>
                                </p>
                                <p style = {{fontSize:"20px", color:'rgba(22, 125, 212, 0.774)',marginTop: "-20px"}}>
                                        {course.lessons.length} Lessons
                                </p>                               
                            </div>
                                
                        </div>
                    </a>
                        
                </Link>
                    
                    
            </>
            ))}
        </div>

        </div>
    </>
);
};

export async function getServerSideProps(){
    const {data} = await axios.get(`${process.env.API}/courses`);
    return {
        props: {
            menu: data
        },
    };
}

export default Index;