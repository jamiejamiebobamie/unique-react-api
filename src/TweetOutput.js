import React, {Component} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import './App.css';

import './Error.css';

function TweetOutput(props){
        return (
            <div>
            <div className="output">
                {props.data}
            </div>
            <button
                className="tweetButton"
                onClick={props.submitTweet}>
                Tweet it!
            </button>
            </div>

        );
}

export default TweetOutput
