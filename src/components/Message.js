import React from 'react'

function Message (props){
    return (
        <div className = "message">
                <div className = "message-username">{props.userName}</div>
                <div className = "message-text">{props.userText}</div>
            </div>
    )
}

export default Message