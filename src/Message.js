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
            <div class="center">
              <h1>
                <span class="glitch" data-text={props.message.contents.translated}>
                  {props.message.contents.translated}
                </span>
              </h1>
            </div>
        )
    }
    return content
}



export default Message
