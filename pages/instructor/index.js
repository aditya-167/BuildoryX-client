import {useState, useEffect, useContext } from 'react';
import { Avatar, Tooltip } from 'antd';
import Link from 'next/link';
import { Context } from "../../context";
import { useRouter } from 'next/router';
import axios from "axios";
import InstructorRoute from "../../components/routes/InstructorRoute";
import {CheckCircleOutlined, CloseCircleOutlined} from '@ant-design/icons'
const Instructor = () => {
    const { state: { user }} = useContext(Context);
    const [courses, setCourses] = useState([]);
    const router = useRouter();

    useEffect(()=>{
        
        
        getCourses();
    },[user]);

    const getCourses = async () => {
        const { data } = await axios.get("/api/instructor-course");
        setCourses(data);
    }
    return(
        <InstructorRoute>
            <h1 className="jumbotron text-center sqaure">Instructor DashBoard</h1>

            <div className="master-container-course-instructor">
            <div class="container-course-instructor">
                
                {courses && courses.map((course) => (
                <>
                    <Link href={`/instructor/course/view/${course.slug}`} style={{ textDecoration: "none", color: "black"}} >
                        <a>
                                <div class="card-course-instructor">
                                <div class="card-course-instructor-header">
                                <img src={course.image? course.image.Location:"/images/courseCreate.jpg"} alt="rover" />
                                </div>
                                <div class="card-course-instructor-body">
                                <span class="tag tag-teal">{course.category}</span>
                                <h4 style = {{marginTop: "0.5rem"}}> 
                                    {course.name}
                                </h4>
                                <p>
                                    {course.about}
                                </p>

                                {course.lessons.length >= 5 && !course.published? (
                                    <>
                                    <p style = {{color:'blue',marginTop: "-20px"}}>
                                        {course.lessons.length} Lessons
                                    </p>
                                        
                                        <p style = {{color:'green',marginTop: "-30px"}}>
                                                You can publish the course now. 
                                        </p>
                                    </>
                                ):course.lessons.length >= 5 && course.published?(
                                    <>
                                        <p style = {{color:'blue',marginTop: "-20px"}}>
                                        {course.lessons.length} Lessons
                                        </p>
                                        
                                        <p style = {{color:'green',marginTop: "-30px"}}>
                                                Your Course is now live!
                                        </p>
                                    
                                    </>
                                ):(
                                    <>
                                        <p style = {{fontSize: '15px',color:'red',marginTop: "-20px"}}>
                                            {course.lessons.length} Lessons
                                        </p>
                                        <p style = {{color:'red',marginTop: "-30px"}}>
                                            Atleast 5 lessons needed to publish the course
                                        </p>
                                </>)

                                }

                                <div className = "col-md-5 float-left">
                                    {course.published?(
                                        <Tooltip title="Published">
                                            <CheckCircleOutlined className = "h5 pointer text-success">Published Course</CheckCircleOutlined>
                                        </Tooltip>
                                    ):(
                                        <Tooltip title="Unpublished">
                                            <CloseCircleOutlined className = "h5 pointer text-warning">Unpublished Course</CloseCircleOutlined>
                                        </Tooltip>
                                    )}

                                </div>
                                
                                
                                

                        </div>
                                
                            </div>
                        </a>
                        
                    </Link>
                    
                    
                </>
                ))}
            </div>

            </div>
            
        
            
                
            
            
        </InstructorRoute>
    );
};

export default Instructor;