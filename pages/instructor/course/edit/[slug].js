import { useState, useEffect, useContext } from 'react';
import axios from "axios";
import InstructorRoute from "../../../../components/routes/InstructorRoute";
import CourseCreateForm from "../../../../components/forms/CourseCreateForm";
import Resizer from "react-image-file-resizer"
import {toast} from "react-toastify";
import { Context } from "../../../../context";
import { useRouter } from 'next/router';

const courseEdit = () => {
    const currLessons = [];
    
    const [values, setValues ] = useState({
        name: '',
        description: '',
        price: 'Free',
        uploading: false,
        paid: true,
        loading: false,
        category:'',
        about: '',
        lessons: [],
        
    })
    

    const [ visible, setVisible ] = useState(false);
    const [current, setCurrent] = useState({})
    const router = useRouter();
    const { slug } = router.query;  
    const [uploadButtonText, setUploadButtonText] = useState("Upload Image");
    const [image, setImage] = useState({});
    const [preview, setPreview] = useState("");
    const [imageButtonText, setimageButtonText] = useState('Upload Image');
    const [uploadVideoButtonText, setUploadVideoButtonText] = useState("Upload Video");
    const [progressBar, setProgressBar] = useState(0);
    const [uploading, setUpload] = useState(false);
    const [isNew, setIsNew] = useState(true);
    useEffect(()=>{
        setIsNew(false);
        getCourse();

    },[slug])

    const getCourse = async() => {
        const { data } = await axios.get(`/api/course/${slug}`);
        if (data) setValues(data);
        
        if (data && data.image) 
        setImage(data.image);
    }


    const handleImageRemove = async(req,res) => {

        try{
            setValues({...values,loading: true});
            const res = await axios.post(`/api/course/remove-image`,{ image });
            setImage({});
            setPreview('');
            setimageButtonText('Upload Image');
            
            setValues({...values,loading: false});
        }catch(err){
            console.log(err);
            setValues({...values,loading: false});

        }

    }

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value});
    }

    const handleImage = (e) => {
        let file = e.target.files[0];
        setPreview(window.URL.createObjectURL(file));
        setimageButtonText(file.name);
        setValues({ ...values, loading:true });

        Resizer.imageFileResizer(file,720,500,"JPEG",100,0, async(uri)=>{
            try{

                let {data} = await axios.post(`/api/course/upload-image`,{
                    image: uri,
                })
                console.log("Image Uploaded",data);

                setImage(data);
                setValues({ ...values, loading:false });
            } catch(err){
                    console.log(err);
                    setValues({ ...values, loading:false });
                    toast('Image upload failed, try again!')
            }
        });

    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(values);
        try{
            const { data } = await axios.put(`/api/course/${slug}`,{
                ...values,
                image,
            });
            toast.success("Course created!");
            router.push("/instructor");
        }catch(err){
            toast.error(err.response.data);
        }
    }

    const handleDrag =  (e,index)=>{
        e.dataTransfer.setData("itemIndex",index);
    }
    const handleDrop = async (e,index)=>{

        const movingItemIndex = e.dataTransfer.getData("itemIndex");
        const targetItemIndex = index;

         let allLessons = values.lessons;

        let moving = allLessons[movingItemIndex]
        allLessons.splice(movingItemIndex,1);
        allLessons.splice(targetItemIndex,0,moving);


        setValues({...values, lessons: [...allLessons]});

        const { data } = await axios.put(`/api/course/${slug}`,{
            ...values,
            image,
        });
        toast("Lessons saved")

    }
    const handleDelete = async(index) => {
        try{
        const lessonDelete = window.prompt("Are you sure want to delete the selected lesson?");

        if(!lessonDelete) return;

        let allLessons = values.lessons; 
        const removed = allLessons.splice(index,1);
        setValues({...values, lessons: allLessons});

        const  { data } = await axios.put(`/api/course/${slug}/${removed[0]._id}`)
        

        }catch(err) {
            console.log(err.response.data);
        }

        
    }

    ///lesson update

    const handleVideoEdit = async(e) => {
        //remove exisisting

        if(current.video && current.video.Location){
            const res = await axios.post(`/api/course/cancel-video`,
            current.video
            );
        }

        const f = e.target.files[0];
        setUploadVideoButtonText(f.name);
        setUpload(true);

        const videoData = new FormData()
        videoData.append('video',f);
        videoData.append('courseId',values._id);

        const { data } = await axios.post(`/api/course/video-upload`,videoData,{
            onUploadProgress: (e) => setProgressBar(Math.round((100*e.loaded)/e.total))
        });

        console.log(data);
    setCurrent({...current, video: data});
    setUpload(false);
    };
    
    const handleEditLesson = async(e) =>{
        e.preventDefault();
        const { data } = await axios.put(`/api/course/lesson/${slug}`
        ,current
        );

        setUploadVideoButtonText('Upload Video');
        setVisible(false);


        if(data.ok){
            let arr = values.lessons
            const index = arr.findIndex((el)=> el._id === current._id);
            arr[index] = current;
            setValues({...values, lessons: arr});
            toast.success('Lesson updated');
        }
    }






    return(
        <InstructorRoute>
            <h1 className="createCourse jumbotron text-center sqaure ">Edit Course</h1>
            <CourseCreateForm 
            handleSubmit={handleSubmit} 
            handleImage={handleImage}
            handleChange={handleChange} 
            values={values} 
            setValues = {setValues}
            preview = {preview}
            imageButtonText = {imageButtonText}
            handleImageRemove = { handleImageRemove }
            isNew = {isNew}
            edit = {true}
            image = {image}
            currLessons = {currLessons}
            handleDrag = {handleDrag}
            handleDrop = {handleDrop}
            handleDelete = {handleDelete}
            visible = {visible}
            setVisible = {setVisible}
            current = {current}
            setCurrent = {setCurrent}
            handleVideoEdit = {handleVideoEdit}
            handleEditLesson = {handleEditLesson}
            progressBar = {progressBar}
            uploadButtonText = {uploadButtonText}
            uploadVideoButtonText = {uploadVideoButtonText}
            uploading = {uploading}
            setUpload = {setUpload}
            setUploadVideoButtonText = {setUploadVideoButtonText}
            setUploadButtonText = {setUploadButtonText}
            setProgressBar = {setProgressBar}
            
            />
            
            
        </InstructorRoute>
    );
};

export default courseEdit;