import { useContext, useEffect, useState } from 'react';
import { Context } from '../../context';
import axios from 'axios'
import {useRouter} from 'next/router';
import { Avatar } from 'antd';
import Link from 'next/link';
import { SyncOutlined, PlayCircleOutlined} from '@ant-design/icons';
import UserRoute from '../../components/routes/UserRoute'
const UserIndex = () => {
    
    const { state: {user} } = useContext(Context);
    const [courses, setCourses] = useState();
    useEffect(()=>{
        loadCourses();
    },[])

    const [loading, setLoading] = useState(false);
    const loadCourses = async () => {
        setLoading(true);
        try{
            const { data } = await axios.get('/api/user-courses');
            setCourses(data)
            setLoading(false);
        }catch(err){
            setLoading(false);
            console.log(err);
        }
        
    }
    return (
        <UserRoute>
            {loading && (
                <SyncOutlined spin className="d-flex justify-content-center display-1 text-danger p-5"/>
            
            )}
            
            <div id="card-course">
                <div id="card-content-course">
                    <div id="card-title-course">
                        <h2>ENROLLED COURSES</h2>
                        <div className="underline-title-course"></div>
                    </div>
                    <form className="form-course">  
                    {courses && courses.map(c => (
                        <div key={c._id} className="media pt-2 pb-5">
                            <Avatar size = {100} shape = "square" src = {c.image.Location}/>
                            <div className = "media-body pl-3">
                        <div className="row">
                            <div className="col">
                                <Link href = {`user/userCourse/${c.slug}`} className="pointer">
                                    <a>
                                        <h5 className = "mt-2 text-primary">
                                            {c.name} 
                                        </h5>
                                    </a>
                                </Link>
                                <p style = {{marginTop: "-10px", font:'Kodchasan', fontWeight:"600",fontSize: "1.2rem"}}>{c.lessons.length} Lessons</p>
                                <p style={{marginTop:"-15px",fontSize: "12px"}} className="text-muted">
                                    By Aditya Srichandan
                                </p>
                            </div>
                            <div col-md-4 mt-4 text-center>
                                <Link href = {`user/userCourse/${c.slug}`} className="pointer">
                                    <a>
                                        <PlayCircleOutlined className="h2 pointer text-primary"/>
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                        </div>
                        
                    ))} 

                    
                    </form>
                </div>
            </div>
        
        </UserRoute>
    );
};

export default UserIndex;
