import React, {Component} from 'react';
import './App.css';

import Error from './Error.js'
import './Error.css';

import OptionsModal from './OptionsModal.js'
import OutputBox from './OutputBox.js'


class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            isLoading: false,
            data: null,
            handleValue: '@Oprah',
            error: undefined,
            shouldDisplayModal:false,
        }
        // this.getQuoteFromDB = this.getQuoteFromDB.bind(this);

        // note route needs to handle the inclusion and absence of '@'
        this.submitHandle = this.submitHandle.bind(this);
        this.getRandHandleAndSubmit = this.getRandHandleAndSubmit.bind(this);
        this.submitTweet = this.submitTweet.bind(this);
        this.displayModal = this.displayModal.bind(this);
    }

  submitHandle(){
      this.setState({isLoading:true})
      this.setState({error:undefined})
      const handle = this.state.handleValue
      // const url = "http://www.gutenberg.org/cache/epub/288/pg288.txt"
      const backend = 'https://re-tweet.herokuapp.com/api/v1/quote-from-twitter-handle'
      // const backend = "http://localhost:7000/api/v1/quote-from-twitter-handle"
      // Get data from the API with fetch
      fetch(backend, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json'},
                  body: JSON.stringify(handle)
                  }
              ).then(res => {
        // Handle the response stream as JSON
        return res.json()
      }).then((json) => {
        // If the request was successful clear the 'data' value and
          // assign the response to it.
        this.setState({ data: null })
        this.setState({ data: json.quote })
        this.setState({error:this.state.data.error})
        this.setState({isLoading:false})
      }).catch((err) => {
        // If there is no data, clear the 'data' value
        this.setState({ data: null })
        this.setState({error:undefined})
        // Print an error to the console.
        console.log('-- Error fetching --')
        console.log(err.message)
        // You may want to display an error to the screen here.
        this.setState({isLoading:false})
      })
  }


  getRandHandleAndSubmit(){
      this.setState({error:undefined})
      const backend = 'https://re-tweet.herokuapp.com/api/v1/rand-handle'
      fetch(backend).then(res => {
        return res.json()
      }).then((json) => {
        this.setState({ handleValue: '@' + json.handle })
      }).then(() => {
          this.submitHandle();
      }).catch((err) => {
        console.log('-- Error fetching --')
        console.log(err.message)
        this.setState({isLoading:false})
      })
  }

  submitTweet(){
      const backend = 'https://re-tweet.herokuapp.com/api/v1/tweet'
      const data = {"handle":this.state.handleValue, "tweet":this.state.data }
      // Get data from the API with fetch
      fetch(backend, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json'},
                  body: JSON.stringify(data)
                  }
            ).then(res => {
              return res.json()
          }).then( (json)=>{
                // console.log(json)
              window.location.replace("https://twitter.com/retweeter_bot");
            }).catch((err) => {
                // console.log(err)
             window.location.replace("https://twitter.com/retweeter_bot");
            })
  }

  displayModal(){
      console.log("hey");
      this.setState( {shouldDisplayModal: !this.state.shouldDisplayModal} )
  }

    render(){
        return (
          <div className="App">
              <div className="boxes">

                  <div className="output-Box">
                      { (this.state.shouldDisplayModal)
                          ?
                            <OptionsModal/>
                            :
                            <OutputBox isLoading={this.state.isLoading} data={this.state.data} submitTweet={this.submitTweet}/>

                  }
                 </div>
                 <div className="input-Box">
                        <input className="inputUrl" value={this.state.handleValue}
                            onChange={e => this.setState({ handleValue: e.target.value })}
                            onSubmit={e => this.handleSubmit(e)}>
                        </input>
                        <div className="buttons">
                            <button onClick={this.submitHandle}>Generate</button>
                            <button onClick={this.getRandHandleAndSubmit}>Random</button>
                            <button className="moreInfoButton" onClick={this.displayModal}>?</button>
                        </div>
                </div>

            </div>
        </div>
    );

    }
}
export default App
