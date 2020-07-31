import React from 'react';

import './Error.css'


function Error(props){
    const urlGif = "https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif";
    let content = (
        <div className="Error">
            { props.error ? <h1>{props.error.message}</h1> : props.isLoading ? <img className="Loading" src={urlGif} alt="" />:""}
        </div>
    );
    return content
}

export default Error
