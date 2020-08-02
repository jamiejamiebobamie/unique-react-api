import React, {Component} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import './App.css';

import TweetOutput from './TweetOutput.js'

import Error from './Error.js'
import './Error.css';

function OutputBox(props){
        return (
            (props.isLoading ) ?
            <Error error={null} isLoading={props.isLoading}/>
            :
            (props.data==null) ?
                ""
                :
                // <div className="output">{props.data}</div>
                <TweetOutput data={props.data} submitTweet={props.submitTweet}/>
                // <div className="output">{props.data}</div>
                // <button className="tweetButton" onClick={props.submitTweet}>Tweet it!</button>}
        );
}

export default OutputBox
