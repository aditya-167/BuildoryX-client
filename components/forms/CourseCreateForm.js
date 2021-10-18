import {useState, useEffect } from 'react';
import { Avatar, Badge,Tooltip, Modal} from 'antd';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import EditLessonform from './EditLessonform';

const CourseCreateForm = ({
    handleSubmit,
    handleImage,
    handleChange,
    values,
    setValues,
    preview,
    imageButtonText,
    handleImageRemove,
    isNew,
    edit = false,
    currLessons,
    handleDrag,
    handleDrop,
    handleDelete,
    visible,
    setVisible,
    current,
    setCurrent,
    handleVideoEdit,
    handleEditLesson,
    progressBar,
    uploadButtonText,
    uploadVideoButtonText,
    uploading,
    setUpload,
    setUploadVideoButtonText,
    setUploadButtonText,
    setProgressBar,
    
    }) =>{
return(
    <>
    {values && <div id="card-course">
        <div id="card-content-course">
        <div id="card-title-course">
                {isNew ? (
                    <h2>NEW COURSE</h2>
                ):(
                    <h2>COURSE UPDATE</h2>
                )}
                
            </div>
            <form onSubmit={handleSubmit} className="form-course">
                <label for="user-email" style={{paddingTop:'30px'}}>
                    &nbsp;
                </label>
                <input name="name" onChange = {handleChange} value={values.name} id="user-email-course" className="form-content-course" placeholder = "Name" type="text" autoComplete="on" required />
                <div className="form-border-course"></div>

                <label for="user-email" style={{paddingTop:'30px'}}>
                    &nbsp;
                </label>
                <input name="category" onChange = {handleChange} value={values.category} id="user-email-course" className="form-content-course" placeholder = "Category" type="text" autoComplete="on" required />

                <div className="form-border-course"></div>

                <label for="user-password-course" style={{paddingTop:'30px'}}>
                    &nbsp;
                </label>
                
                <textarea onChange = {handleChange} id="user-password-course" placeholder = "About Course" name="about" required cols = "3" rows = "3" value = {values.about} required/>
                <div className="form-border" style={{marginBottom:'15px'}}></div>
                
                <label for="user-password-course" style={{paddingTop:'30px'}}>
                    &nbsp;
                </label>
                
                <textarea onChange = {handleChange} id="user-password-course" placeholder = "Description" name="description" required cols = "7" rows = "7" value = {values.description} required/>
                <div className="form-border" style={{marginBottom:'15px'}}></div>
                

                <label className = "btn btn-outline-secondary btn-block form-content-course" for="file_upload" style={{paddingTop:'10px'}}>
                    &nbsp; <span><i class="fa fa-upload" aria-hidden="true"></i>{" "+imageButtonText}</span> 
                    <input id = "file_upload"
                    type="file"
                    name="image"
                    onChange={handleImage}
                    accept="image/*"
                    hidden

                    
                    />
                </label>

                {preview ? (
                    
                    <>

                        <div className = "text-center" style={{width: "auto"}}>
                            <Badge count="X" onClick = {handleImageRemove} style = {{cursor: "pointer"}}>
                                

                                <Avatar style={{ height: '70px', width: '70px' }} src={preview}/>
                            
                            </Badge>
                        </div>
                        
                    </>
                ):( edit && values.image && 
                    <div className = "text-center" style={{width: "auto"}}>
                        
                        

                        <Avatar style={{ height: '70px', width: '70px' }} src={values.image.Location}/>
                    
                </div>
                )}

                <button id="submit-btn-course" style = {{marginBottom: "90px"}} 
                onClick = {handleSubmit}
                type="submit" 
                value="Submit" 
                disabled = {values.loading || values.uploading}
                >{values.loading ? "Saving .." :"Continue"}
                </button>
                
                <hr />

                {values && values.lessons && values.lessons.length>0 && (
                    <div className ="row bp-5">
                    <div className = "col lesson-list">
                        <h3>
                            {values && values.lessons && values.lessons.length} Lessons
                            
                        </h3>

                        <main>
                            
                            
                            
                            {values.lessons.map((element,index) => {
                                
                                    currLessons.push(
                                       
                                    <li  draggable onDragStart = {e=>handleDrag(e,index)} onDrop = {e=>handleDrop(e,index)}><p style = {{marginBottom: "10px", fontWeight: "45px", fontSize: "25px"}}>{element.lessonName}</p>{element.description}
                                    
                                        <DeleteOutlined onClick = {e=>handleDelete(index)} style = {{cursor: "pointer", zIndex : "1"}} className = "h4 text-danger float-right" />
                                    
                                        <Tooltip title = "Edit">
                                        <EditOutlined onClick = {()=>{
                                        setVisible(true);
                                        setCurrent(element);

                                    }} className = "h4 pointer text-warning float-right" style={{marginRight: "4px"}}/>
                                    </Tooltip>
                                    </li>
                                    
                                    )
                                
                            })}

                            <ol onDragOver = {(e)=>{
                                    e.stopPropagation();
                                    e.preventDefault();
                                }}
                                
                                class="gradient-list">
                                    {currLessons}
                               
                            </ol>
                        </main>
                        
                        

                    </div>
                </div>

            )}
            </form>
        </div>
        
    </div>

    
    
    }
    <Modal title = "Update Lesson"
    centered
    visible = {visible}
    onCancel = {()=>setVisible(false)}
    footer = {null}
    >
    <EditLessonform 
            current = {current}
            setCurrent = {setCurrent}
            handleVideoEdit = {handleVideoEdit}
            handleEditLesson = {handleEditLesson}
            uploadButtonText = {uploadButtonText}
            uploadVideoButtonText = {uploadVideoButtonText}
            progressBar = {progressBar}
            uploading = {uploading}
            setUpload = {setUpload}
            setUploadVideoButtonText = {setUploadVideoButtonText}
            setUploadButtonText = {setUploadButtonText}
            setProgressBar = {setProgressBar}
        
    />      
    </Modal>
    
    
    </>
)
    


}

export default CourseCreateForm;