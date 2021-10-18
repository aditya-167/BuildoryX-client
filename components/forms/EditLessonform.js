import { Button, Progress, Switch } from 'antd';
import {CloseCircleFilled} from '@ant-design/icons'
import ReactPlayer from 'react-player';
 
const EditLessonform = ({
    
    current,
    setCurrent,
    handleVideoEdit,
    handleEditLesson,
    uploadButtonText,
    uploadVideoButtonText,
    progressBar,
    uploading,
    setUpload,
    setUploadVideoButtonText,
    setUploadButtonText,
    setProgressBar,
    }) =>{

    return (
    <div className = "container pt-3">
        <form onSubmit = {handleEditLesson}>
            <input 
            type = "text"
            className = "form-control-square"
            onChange = {(e) => setCurrent({ ...current, lessonName: e.target.value})}
            value = {current.lessonName}
            
            autoFocus
            required
            />

            <textarea className = "form-control mt-3" cols = "7" rows = "7"
                onChange = {(e) => setCurrent({ ...current, description :e.target.value})}
                value = {current.description}
                >

            </textarea>

            <div>
            

            {!uploading && current.video && current.video.Location && (
                <div className = "pt-2 d-flex justify-content-center">
                        <ReactPlayer
                            url = {current.video.Location }
                            width = "410px"
                            height = "240px"
                            controls
                            >
                        </ReactPlayer>
                </div>
            )}
            <label className = "btn btn-dark text-left mt-3">
                {uploadVideoButtonText}
                <input onChange = {handleVideoEdit} type = "file" accept = "video/*" hidden />
            </label>
            </div>

            {progressBar >0 && (
                <Progress 
                className = "d-flex justify-content-center pt-2"
                percent = {progressBar}
                steps = {5}
                />
            )}
            <div className = "d-flex justify-content-between">
                <span className = "pt-3 badge"><h6>Preview</h6></span>
                <Switch className = "float-left mt-2" disabled = {uploading} checked = {current.lessonPreview}
                name="Preview Lesson"
                onChange = {(v)=> setCurrent({...current, lessonPreview: v })}
                />
                
            </div>

            <Button onClick = {handleEditLesson} className = "col mt-3"
            size = "large"
            type = "primary"
            loading = {uploading}
            shape = "round"
            >
            Save Lesson
            </Button>

        </form>
    </div>
    )}


export default EditLessonform;