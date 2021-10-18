
import { EyeOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
const SingleCourseLessons = (
    {
        currLessons,
        lessons,
        setPreview,
        showModal,
        setShowModal,
        
    }
) => {

    return (

        
        <div id="card-course" style = {{width: "800px"}}>
        <div id="card-content-course">
            <div id="card-title-course">
                    <h2>Course Details</h2>
                <div className="underline-title-course"></div>
            </div>
                <form className="form-course">


                {lessons && lessons.length>0 && (
            
            <div className ="row bp-5">
                <div className = "col lesson-list">
                    <h3>
                        {lessons && lessons && lessons.length} Lessons
                        
                    </h3>

                    <main>
                        
                        
                        
                        {lessons.map(element => {
                            currLessons.push(<li>
                                <p style = {{marginBottom: "10px", fontWeight: "45px", fontSize: "25px"}}>{element.lessonName}</p>
                                {element.description} 
                                {element.video && element.video!==null && element.lessonPreview &&(
                                    <Tooltip title = "Preview Lesson">
                                        <EyeOutlined onClick={()=>{
                                            setPreview(element.video.Location);
                                            setShowModal(!showModal);
                                        }} style = {{cursor: "pointer", zIndex : "1"}} className = "h4 text-info float-right" />
                                    </Tooltip>    
                                
                                )}
                                </li>
                            )
                        })}

                        <ol class="gradient-list">
                            {currLessons}
                        </ol>
                    </main>

                    

                </div>
            </div>)}
                
                

 
            
            </form>
            </div>
            </div>
        
    )
}

export default SingleCourseLessons;


/**/