import React from 'react';
import './Message.css'

// function Message(props){
//     let content = null
//     if (props.message.contents !== undefined) {
//         content = <h1>{props.message.contents.translated}</h1>
//     }
//     return content
// }


function Message(props){
    let content = null
    if (props.message.contents !== undefined) {
        content = (
              <h1 className="Message">
                  {props.message.contents.translated}
              </h1>
        )
    }
    return content
}



export default Message
