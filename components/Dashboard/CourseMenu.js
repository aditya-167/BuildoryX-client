import React from 'react'

function CourseMenu({courses}) {
    return (
        <div className="item">
            {
                courses.map((course) =>{
                    return <div className="item-con">
                        <div className="item-container">
                            <img src={course.image.Location} alt=""/>
                            <h2>{course.name}</h2>
                            <p>{course.about}</p>
                            <span style = {{marginTop: "-1px",cursor:"default"}} class="tag tag-teal">{course.category}</span>
                        </div>
                    </div>
                })
            }
        </div>
    )
}

export default CourseMenu;