import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Link from 'next/link';
import ReactPlayer from 'react-player';
import { Modal } from 'antd';
import {CheckCircleOutlined, CloseCircleOutlined} from '@ant-design/icons'
import { useRouter } from 'next/router';
import SingleCourseView from '../../../../components/CourseView/SingleCourseView'
import PreviewModal from '../../../../components/CourseView/PreviewModal'
import SingleCourseLessons from '../../../../components/CourseView/SingleCourseLessons'
import { Context } from '../../../../context'
import { toast } from 'react-toastify';

const SingleCoursePage = ({menu}) => {
    const currLessons = []
    const router = useRouter();
    const {slug} = router.query;
    const [showModal, setShowModal] = useState(false);
    const [preview, setPreview] = useState("");
    const [loading, setLoading] = useState(false);
    const { state: {user}}  = useContext(Context);
    const [enrolled, setEnrolled] = useState({});

    useEffect(()=>{
        if(user && menu) enrollment()
    },[user, menu]);

    const enrollment = async(e) => {
        
        const {data} = await axios.get(`/api/enrollment/${menu._id}`);
        console.log(data);
        setEnrolled(data);
    }

    const handleEnroll = async (e) =>{
        e.preventDefault();
        
        if(!user) router.push("/login");
        if(enrolled.status) return router.push(`/user/userCourse/${enrolled.course.slug}`);
        
        setLoading(true);
        
    
        try{
            console.log("just before trigger");
            const { data } = await axios.post(`/api/freeEnroll/${menu._id}`);

            console.log("success!");
            toast.success(data.message);
            setLoading(false);
            router.push(`/user/userCourse/${data.course.slug}`);

        }catch(err){
            console.log(err);
            setLoading(false);
            toast.error(err.response.data);
            
            
        };

    };
    return(
        <>
                
                <SingleCourseView 
                menu={menu}
                showModal = {showModal}
                setShowModal = {setShowModal}
                preview = {preview}
                setPreview = {setPreview}
                loading = {loading}
                handleEnroll = {handleEnroll}
                user = {user}
                enrolled = {enrolled}
                setEnrolled = {setEnrolled}
                />

                <PreviewModal 
                showModal = {showModal}
                setShowModal = {setShowModal}
                preview = {preview}
                />

                {menu.lessons && (
                    <SingleCourseLessons currLessons = {currLessons} lessons = {menu.lessons} setPreview = {setPreview} showModal = {showModal} setShowModal = {setShowModal} preview = {preview}/>
                )}
        </>
    )

};

export async function getServerSideProps({query}){
    const {data} = await axios.get(`${process.env.API}/course/${query.slug}`);
    return {
        props: {
            menu: data
        },
    };
}


export default SingleCoursePage;
