
import { useState, useEffect, useContext } from 'react';
import axios from "axios";
import InstructorRoute from "../../../components/routes/InstructorRoute";
import CourseCreateForm from "../../../components/forms/CourseCreateForm";
import Resizer from "react-image-file-resizer"
import {toast} from "react-toastify";
import { Context } from "../../../context";
import { useRouter } from 'next/router';

const createCourse = () => {
    
    const { state, dispatch } = useContext(Context);
    const [values, setValues ] = useState({
        name: '',
        description: '',
        price: 'Free',
        uploading: false,
        paid: true,
        loading: false,
        category:'',
        about: '',
    })

    const { user } = state;
    
    const router = useRouter();  
    
    useEffect(()=>{
    },[]);

    const [image, setImage] = useState({});
    const [preview, setPreview] = useState("");
    const [imageButtonText, setimageButtonText] = useState('Upload Image');
    const [isNew, setIsNew] = useState(true);

    const handleImageRemove = async(req,res) => {

        try{
            setValues({...values,loading: true});
            const res = await axios.post("/api/course/remove-image",{ image });
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

                let {data} = await axios.post('/api/course/upload-image',{
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
            const { data } = await axios.post('/api/course',{
                ...values,
                image,
            });
            toast.success("Course created!");
            router.push("/instructor");
        }catch(err){
            toast.error(err.response.data);
        }
    }
    return(
        <InstructorRoute>
            <h1 className="createCourse jumbotron text-center sqaure ">Create Course</h1>
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
            />
        </InstructorRoute>
    );
};

export default createCourse;