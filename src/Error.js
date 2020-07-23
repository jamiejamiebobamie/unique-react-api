import React from 'react';

import './Error.css'


function Error(props){
    let content = undefined
    // const urlGif = "https://media.giphy.com/media/feN0YJbVs0fwA/giphy.gif"
    // const urlGif = "https://media.giphy.com/media/N256GFy1u6M6Y/giphy.gif"https://media.giphy.com/media/feN0YJbVs0fwA/giphy.gif
    const urlGif = "https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif";
    if (props.error) {
        content = (
            <div className="Error">
                <h1>hey{props.error.message}</h1>
            </div>
        )
        } else {
            content = (
                <div className="Error">
                hey
                    {(props.isLoading) ? <img className="Loading" src={urlGif} alt="" />:""}
                </div>
            )
        }
    return content
}

// <iframe src="https://giphy.com/embed/feN0YJbVs0fwA" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/artists-on-tumblr-design-feN0YJbVs0fwA">via GIPHY</a></p>




export default Error
