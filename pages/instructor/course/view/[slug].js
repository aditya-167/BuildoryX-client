import { useState, useEffect, useContext } from 'react';
import axios from "axios";

import { useRouter } from 'next/router'
import InstructorRoute from '../../../../components/routes/InstructorRoute';
import { Avatar, Tooltip, Button, Modal, List } from 'antd';
import  ReactMarkdown  from 'react-markdown';
import {EditOutlined, CheckOutlined, UploadOutlined, QuestionOutlined, CloseOutlined} from '@ant-design/icons'
import LessonForms from '../../../../components/LessonForms';
import { toast } from 'react-toastify'
import { Context } from "../../../../context";


const CoursePage = () => {
    const currLessons = [];

    const [course, setCourse] = useState({});
    const [visible, setVisible] = useState(false);
    const router = useRouter();
    const { slug } = router.query;
    const { state: { user }} = useContext(Context);

    const [values, setValues] = useState({
        lessonName: "",
        description: "",
        video: {},
    });

    const [uploading, setUploading ]  = useState(false);
    const [uploadButtonText,setUploadButtonText] = useState("Upload Video")
    const [progressBar,setProgressBar] = useState(0);

    useEffect(()=>{
        getCourse();

    },[slug])

    const getCourse = async() => {
        const { data } = await axios.get(`/api/course/${slug}`);
        setCourse(data);
    }


    const handleAddLesson = async(e) => {
        e.preventDefault();
       
        try{
            const {data } = await axios.post(`/api/course/lesson/${slug}`, values); 
            
            setValues({...values,lessonName: "", description: "", video: {}});
            setProgressBar(0);
            setUploadButtonText("Upload Video");
            setVisible(false);
            setCourse(data);
            toast.success("Lesson Added!");
        }catch(err){
            console.log(err);
            
            toast.error("upload lesson failed!");
        }
    };

    const handleCancelVideo = async(e) => {
        try{
            
            setUploading(false);
            const { data } = await axios.post("/api/course/cancel-video",
            values.video
            );
            console.log(data);
            setValues({...values, video: {}});
            setProgressBar(0);
            setUploading(false);
            setUploadButtonText("Upload another Video")
        }catch(err){
            setUploading(false);
            console.log(err)
            toast.error("Video upload failed!")
        
        }

    };

    const handleVideo = async(e) => {
        try{
            
        const file = e.target.files[0];
        setUploadButtonText(file.name);
        setUploading(true);
        const videoData = new FormData()
        videoData.append('video', file);

        const { data } = await axios.post('/api/course/video-upload', videoData, {
            onUploadProgress: (e) => {
                setProgressBar(Math.round((100*e.loaded)/e.total));
            }
        });

        toast.success("Video Uploaded!")
        setValues({...values, video:data})
        setUploading(false);

        }catch(err){
            setUploading(false);
            console.log(err)
            toast.error("Video upload failed!")
        
        }
        
        
        

    }

    const handlePublish = async(e,courseId) => {
        try{
            let response = window.confirm("Upload to main ADY's Page?")
            if(!response) return;

            const {data} = await axios.put(`/api/course/publish/${courseId}`);
            setCourse(data);
            toast.success("Your course is now live!")

        }catch(err){
            toast.error("Course publish failed!")
        }
        
    
    }


    const handleUnPublish = async(e,courseId) => {
        try{
            let response = window.confirm("If unpublish, user no longer access to course.")
            if(!response) return;
            
            const {data} = await axios.put(`/api/course/unpublish/${courseId}`);
            setCourse(data);
            toast.success("Course unpublish!")
            

        }catch(err){
            toast.error("Course unpublish failed!")
        }


        
    }


    return (
        <InstructorRoute>
        <div id="card-course" style = {{width: "800px"}}>
        <div id="card-content-course">
        <div id="card-title-course">
                <h2>Course Details</h2>
                <div className="underline-title-course"></div>
            </div>
            <form className="form-course">
                {course && <div className="contianer-fluid pt-1">

                <div className="media pt-2">
                    <Avatar size = {80} src = {course.image ? course.image.Location: "/images/courseCreate.jpg"}/>
                    <div className = "media-body pl-2">
                        <div className = "row">
                            <div className = "col">
                                <h5 className = "mt-2 text-primart">
                                    {course.name}
                                </h5>
                                <p style = {{marginTop: "-10px",marginBottom:"1px"}}>
                                    {course.lessons && course.lessons.length} Lessons
                                </p>
                                <span style = {{marginTop: "-1px",cursor:"default"}} class="tag tag-teal">{course.category}</span>
                            </div>
                            <div className = "d-flex pt-4">

                                <Tooltip title = "Edit">
                                    <EditOutlined onClick = {()=>(router.push(`/instructor/course/edit/${slug}`))}className = "h5 pointer text-warning mr-4"/>
                                </Tooltip>

                                {course.lessons && course.lessons.length < 5 ? (
                                <Tooltip title = "Minimum 5 lessons required to publish course">
                                    <QuestionOutlined className = "h5 pointer text-danger"/>
                                </Tooltip>):course.published ? (                           
                                
                                    <Tooltip onClick = {(e)=> handleUnPublish(e,course._id)} title = "Unpublish" className = "h5 pointer text-danger">
                                        <CloseOutlined/>
                                    </Tooltip>
                                ):(
                                    <Tooltip onClick = {(e)=> handlePublish(e,course._id)} title = "Publish" className = "h5 pointer text-success">
                                        <CheckOutlined/>
                                    </Tooltip>
                                )}


                            </div>


                        </div>
                    </div>

                </div>
                <hr/>

                <div className = "row">
                    <div className = "col">
                        <ReactMarkdown children = {course.description}/>
                    </div>
                </div>

                <div className = "row">

                <Button onClick = {
                    () => setVisible(true)
                }
                className = "col-md-6 offset-md-3 text-center"
                type = "primary"
                shape = "round"
                icon = {<UploadOutlined />}
                size = "large"
                >
                    Add Lesson
                </Button>
                </div>

                <br />

                <Modal title = "+ Lesson"
                centered
                visible = {visible}
                onCancel = {() => setVisible(false)}
                footer = {null}
                >
                <LessonForms values = {values} setValues = {setValues} handleAddLesson = {handleAddLesson} uploading = {uploading} uploadButtonText = {uploadButtonText} handleVideo = {handleVideo} progressBar = {progressBar} handleCancelVideo = {handleCancelVideo}/>
                </Modal>

                {course && course.lessons && course.lessons.length>0 && (
                    <div className ="row bp-5">
                    <div className = "col lesson-list">
                        <h3>
                            {course && course.lessons && course.lessons.length} Lessons
                            
                        </h3>

                        <main>
                            
                            
                            
                            {course.lessons.map(element => {
                                currLessons.push(<li><p style = {{marginBottom: "10px", fontWeight: "45px", fontSize: "25px"}}>{element.lessonName}</p>{element.description} <div style = {{marginLeft:"0"}}></div></li>)
                            })}

                            <ol class="gradient-list">
                                {currLessons}
                            </ol>
                        </main>

                        

                    </div>
                </div>
                )}
                
                


            </div> 
            }              
            </form>
            </div>
            </div>

            
        </InstructorRoute>
    )
}

export default CoursePage;