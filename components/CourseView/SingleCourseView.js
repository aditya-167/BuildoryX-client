
import ReactPlayer from 'react-player';
import { Button } from 'antd';

import { LoadingOutlined, SafetyOutlined } from '@ant-design/icons';
const SingleCourseView  = ({
    menu,
    showModal,
    setShowModal,
    preview,
    setPreview,
    loading,
    handleEnroll,
    user,
    enrolled,
    setEnrolled, 
    }) => {

        let descript = menu.description;
        let description = descript.split(":")[0];
        let skills = descript.split(":")[1];

        return(
            <>
<div className = "jumbotron square">
                        <div className = "row">
                            <div className = "col-md-8">
                                <h1 className="text-light font-weight-bold">
                                    {menu.name}
                                </h1>
                                <p className = "lead">{menu.description && description.substring(0,description.length-7)}</p>
                                <span class="tag tag-teal">{menu.category}</span>
                                <p style={{color:"white",fontSize:"19px",fontWeight:"900"}}>Skills: <span style={{fontSize:"17px",fontWeight:"900"}} class="dag tag-deal">  {skills}</span></p>

                                
                            </div>
                            <div className = "col-md-4">
                                {menu.lessons[0].video && menu.lessons[0].video && !showModal? (
                                    <div onClick = {
                                        (e)=>{
                                            setPreview(menu.lessons[0].video.Location);
                                            setShowModal(!showModal);
                                        }
                                    }>
                                        <ReactPlayer
                                            className = "react-player-div"
                                            url = {menu.lessons[0].video.Location}
                                            light = {menu.image.Location}
                                            
                                            width = "100%"
                                            height = "225px"
                                        />
                                        
                                    </div>
                                ):(
                                    <>
                                        <img src = {menu.image.Location}
                                            alt = {menu.name}
                                            className = "img img-fluid"
                                        />
                                    </>
                                )}
                                {loading ? (
                                    <div className="d-flex justify-content-center">
                                        <LoadingOutlined className = "h1 text-danger"/>

                                    </div>
                                ):(
                                    <Button
                                    className = "mb-3 mt-3"
                                    type = "danger"
                                    block
                                    shape = "round"
                                    icon = {<SafetyOutlined />}
                                    disabled = {loading}
                                    onClick={handleEnroll}
                                    >
                                        {user ? enrolled.status ? " Go to course" : "Enroll" : "Login to Enroll"}
                                    </Button>
                                )}
                                <p style={{color:"orange",fontSize:"16px"}}>Created by Aditya Srichandan</p>
                            
                            </div>
                                
                        
                    </div>
                </div>
            </>
        )

}

export default SingleCourseView;