import {useRouter} from 'next/router';
import { useContext, useEffect, createElement, useState } from 'react';
import { Context } from '../../../context';
import axios from 'axios'
import StudentRoute from '../../../components/routes/StudentRoute'
import { Button, Menu, Avatar } from 'antd';
import ReactPlayer from 'react-player';
import ReactMarkdown from 'react-markdown';
import { PlayCircleOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

const SingleCourse = () => {
    
    const {Item} = Menu;
    const [clicked, setClicked ] = useState(-1);
    const [collapsed, setCollapsed ] = useState(false);
    const router = useRouter();
    
    const [loading, setLoading] = useState(false);
    const [course, setCourse] = useState({lessons:[]});
    const {slug} = router.query;

    useEffect(()=>{
        if (slug) loadCourse()
       

    },[slug]);

    const markCompleted = async() => {
        const {data} = await axios.post(`/api/markComplete`,{
            courseId: course._id,
            lessonId: course.lessons[clicked]._id
        });
        console.log(data);
    }
    const loadCourse = async () => {
        const { data } = await axios.get(`/api/user/userCourse/${slug}`);
        setCourse(data);
    };
    return (
        <StudentRoute>
            <div style={{backgroundColor: "white"}}className="row">
                <div style={{maxWidth: 400}}>
                    <Button onClick={()=>setCollapsed(!collapsed)} className="text-primary mt-1 btn-block mb-2">
                        {createElement(collapsed? MenuUnfoldOutlined: MenuFoldOutlined) }{" "}
                        {!collapsed && "Lessons"}
                    </Button>
                    <Menu 
                    inlineCollapsed ={collapsed} 
                    style={{height: 'auto',overflow:'scroll'}} 
                    defaultSelectedKeys = {[clicked]}
                    >
                        
                        {course.lessons.map((lesson,index)=>(
                            <Item icon = {<Avatar>{index + 1}</Avatar>} Key  = {index} onClick = {()=>setClicked(index)}>
                                {lesson.lessonName.substring(0,40)}
                            </Item>
                        ))}
                    </Menu>
                </div>
                <div className="col">{clicked!==-1 ?(
                <>
                    <div style={{fontSize:"20px"}} className="col alert alert-primary square text-center">
                        <b>{course.name}</b>
                    </div>
                    {course.lessons[clicked].video && course.lessons[clicked].video.Location && (<>
                        <div className="wrapper">
                            <ReactPlayer className="player" url={course.lessons[clicked].video.Location}
                                height="100%"
                                width="100%"
                                controls
                                config = {{file: {attributes: {controlsList: 'nodownload'}}}}
                                onContextMenu = {e=>e.preventDefault()} 
                                />
                        </div>
                        <ReactMarkdown children = {course.lessons[clicked].description} className="single-post"/>
                    </>)}
                </>):(
                <>
                    <div style={{fontSize:"20px"}} className="col alert alert-primary square text-center">
                        <b>{course.name}</b>
                    </div>
                    <div className="d-flex justify-content-center p-5">
                        <div className="text-center p-5">
                            <PlayCircleOutlined className="text-primary display-1 p-5"/>

                            <p className="lead">Click on the lessons to start learning! </p>

                        </div>

                    </div>
                </>)}

                </div>
            </div>
            
        </StudentRoute>
    );
};

export default SingleCourse;