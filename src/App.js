import React, {Component} from 'react';
import './App.css';

import Error from './Error.js'
import './Error.css';


import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';


let ipsum = "Two roads diverged in a yellow wood, And sorry I could not travel both And be one traveler, long I stood And looked down one as far as I could To where it bent in the undergrowth; Then took the other, as just as fair, And having perhaps the better claim, Because it was grassy and wanted wear; Though as for that the passing there Had worn them really about the same, And both that morning equally lay In leaves no step had trodden black. Oh, I kept the first for another day! Yet knowing how way leads on to way, I doubted if I should ever come back. I shall be telling this with a sigh Somewhere ages and ages hence:Two roads diverged in a wood, and I I took the one less traveled by, And that has made all the difference.";

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            isLoading: false,
            data: null,
            inputTextValue: ipsum,
            handleValue: '@Oprah',
            urlValue: 'https://www.gutenberg.org/files/1342/1342-0.txt',
            authorValue: 'shakespeare',
            error: undefined,
            tabIndex: 0,
        }
        // this.getQuoteFromDB = this.getQuoteFromDB.bind(this);
        this.submitText = this.submitText.bind(this);
        // note route needs to handle the inclusion and absence of '@'
        this.submitHandle = this.submitHandle.bind(this);
        this.submitURL = this.submitURL.bind(this);
        this.submitAuthor = this.submitAuthor.bind(this);
        this.getRandHandleAndSubmit = this.getRandHandleAndSubmit.bind(this);
        this.submitTweet = this.submitTweet.bind(this);


    }

  submitText(){
    this.setState({isLoading:true})
    this.setState({error:undefined})
    const data = this.state.inputTextValue
    const backend = "https://re-tweet.herokuapp.com/api/v1/quote-from-input"

    // Get data from the API with fetch
    fetch(backend, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(data)
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

  submitURL(){
    this.setState({isLoading:true})
    this.setState({error:undefined})
    const url = this.state.urlValue
    // const url = "http://www.gutenberg.org/cache/epub/288/pg288.txt"
    // const backend = "http://localhost:7000/api/v1/quote-from-url"
    const backend = "https://re-tweet.herokuapp.com/api/v1/quote-from-url"

    // Get data from the API with fetch
    fetch(backend, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(url)
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

  submitAuthor(){
      this.setState({isLoading:true})
      this.setState({error:undefined})
      const author = this.state.authorValue
      // const url = "http://www.gutenberg.org/cache/epub/288/pg288.txt"
      // const backend = "http://localhost:7000/api/v1/quote-from-author"
      const backend = "https://re-tweet.herokuapp.com/api/v1/quote-from-author"

      // Get data from the API with fetch
      fetch(backend, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json'},
                  body: JSON.stringify(author)
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
              ).then(() => {
                  window.location.href("https://twitter.com/retweeter_bot");
              }).catch((err) => {
                  window.location.href("https://twitter.com/retweeter_bot");
              })
  }

    render(){
        return (
          <div className="App">
              <div className="boxes">
                  <div className="output-Box">
                  { (this.state.isLoading ) ?
                        <Error error={null} isLoading={this.state.isLoading}/> :
                            <div className="output">{this.state.data}</div>
                  }
                  {(this.state.isLoading || this.state.data==null) ? "":
                  <button className="tweetButton" onClick={this.submitTweet}>Tweet it!</button>}
                </div>
                    <div className="input-Box">
                        <input className="inputUrl" value={this.state.handleValue}
                            onChange={e => this.setState({ handleValue: e.target.value })}
                            onSubmit={e => this.handleSubmit(e)}>
                        </input>
                        <div className="buttons">
                            <button onClick={this.submitHandle} type="submit">Generate</button>
                            <button onClick={this.getRandHandleAndSubmit} type="submit">Random</button>
                        </div>
                    </div>
            </div>
            </div>

        );
    }
}
export default App


// { (this.state.isLoading) ?
//       <div className="output-Box"><Error error={this.state.data} isLoading={this.state.isLoading}/></div> :
//       <div className="output-Box"> <div className="output">{this.state.data}</div></div> }

// <div className="output-Box">
//   <div className="input-Box">
//   <Tabs selectedindex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
//     <TabList selectedindex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
//         <Tab>text</Tab>
//         <Tab>tweet</Tab>
//         <Tab>url</Tab>
//         <Tab>author</Tab>
//     </TabList>
//     <TabPanel>
//     <div className="input-Box">
//         <textarea className="input" placeholder='enter text here' value={this.state.inputTextValue}
//             onChange={e => this.setState({ inputTextValue: e.target.value })}
//             onSubmit={e => this.handleSubmit(e)}>
//         </textarea>
//         <button onClick={this.submitText} type="submit">Submit</button>
//     </div>
//     </TabPanel>
//     <TabPanel>
//     <div className="input-Box">
//         <input className="inputUrl" value={this.state.handleValue}
//             onChange={e => this.setState({ handleValue: e.target.value })}
//             onSubmit={e => this.handleSubmit(e)}>
//         </input>
//         <button onClick={this.submitHandle} type="submit">Submit</button>
//     </div>
//     </TabPanel>
//     <TabPanel>
//         <div className="input-Box">
//             <input className="inputUrl" value={this.state.urlValue}
//                 onChange={e => this.setState({ urlValue: e.target.value })}
//                 onSubmit={e => this.handleSubmit(e)}>
//             </input>
//             <button onClick={this.submitURL} type="submit">Submit</button>
//         </div>
//     </TabPanel>
//     <TabPanel>
//         <div className="input-Box">
//             <div>
//               <input type="radio" name="author" id="grimm" value="grimm" onChange={e => this.setState({ authorValue: e.target.value })}/>
//               <label htmlFor="grimm">The Brothers Grimm</label>
//             </div>
//             <div>
//               <input type="radio" name="author" id="rowling" value="rowling" onChange={e => this.setState({ authorValue: e.target.value })}/>
//               <label htmlFor="rowling">JK Rowling</label>
//             </div>
//             <div>
//               <input type="radio" name="author" id="shakespeare" value="shakespeare" onChange={e => this.setState({ authorValue: e.target.value })}/>
//               <label htmlFor="shakespeare">Shakespeare</label>
//             </div>
//             <button onClick={this.submitAuthor} type="submit">Submit</button>
//         </div>
//     </TabPanel>
// </Tabs>
// </div>
// </div>
