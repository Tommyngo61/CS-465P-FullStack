import React from 'react'
import './PopBio.css'

function PopBio(props) {
    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                { props.children }
                {/* <button className="close-btn" onClick={() => props.setTrigger(false)}>cancel</button> */}
            </div>
        </div>
    ) : "";
}

export default PopBio