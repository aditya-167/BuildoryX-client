import React from 'react'

function Button({categories, filter}) {
    return (
        <div className="buttons">
            {
                categories.map((cat, i)=>{
                    return <button type="button" onClick={()=> filter(cat)} className="btn">{cat}</button>
                })
            }
        </div>
    )
}
export default Button;
