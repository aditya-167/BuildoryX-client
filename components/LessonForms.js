import { Button, Progress, Tooltip } from 'antd';
import {CloseCircleFilled} from '@ant-design/icons'

const LessonForms = ({values,setValues,handleAddLesson, 
    uploading, 
    uploadButtonText,
    handleVideo,
    progressBar,
    handleCancelVideo,
    }) =>{

    return (
    <div className = "container pt-3">
        <form onSubmit = {handleAddLesson}>
            <input 
            type = "text"
            className = "form-control-square"
            onChange = {(e) => setValues({ ...values, lessonName: e.target.value})}
            value = {values.lessonName}
            placeholder = "Lesson Title"
            autoFocus
            required
            />

            <textarea className = "form-control mt-3" cols = "7" rows = "7"
                onChange = {(e) => setValues({ ...values, description :e.target.value})}
                value = {values.description}
                placeholder = "Content Description">

            </textarea>

            <div className = "d-flex justify-content-center">
            <label className = "btn btn-dark text-left mt-3">
                {uploadButtonText}
                <input onChange = {handleVideo} type = "file" accept = "video/*" hidden />
            </label>

            {!uploading && values.video.Location && (
                <Tooltip title = "Cancel">
                    <span onClick = {handleCancelVideo} className = "pt-1 pl-3">
                        <CloseCircleFilled style = {{cursor: "pointer"}} className = "text-danger d-flex justify-content-center pt-4 pointer"/>

                    </span>
                </Tooltip>
            )}
            </div>

            {progressBar >0 && (
                <Progress 
                className = "d-flex justify-content-center pt-2"
                percent = {progressBar}
                steps = {5}
                />
            )}

            <Button onClick = {handleAddLesson} className = "col mt-3"
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


export default LessonForms;