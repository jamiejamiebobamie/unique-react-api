import React, {Component} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';


import Error from './Error.js'
import './Error.css';

class OptionsModal extends Component {
    constructor(props){
        super(props)
        this.state = {
            tabIndex: 0,
            inputTextValue: "",
            urlValue: 'https://www.gutenberg.org/files/1342/1342-0.txt',
            authorValue: 'shakespeare',
            modalData: "",
            shouldShowOptionsMenu:false,
        }
        this.submitURL = this.submitURL.bind(this);
        this.submitAuthor = this.submitAuthor.bind(this);
        this.submitText = this.submitText.bind(this);
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
        this.setState({ modalData: null })
        this.setState({ modalData: json.quote })
        this.setState({error:this.state.data.error})
        this.setState({isLoading:false})
      }).catch((err) => {
        // If there is no data, clear the 'data' value
        this.setState({ inputTextValue: null })
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
        this.setState({ modalData: null })
        this.setState({ modalData: json.quote })
        this.setState({error:this.state.data.error})
        this.setState({isLoading:false})
      }).catch((err) => {
        // If there is no data, clear the 'data' value
        this.setState({ modalData: null })
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
          this.setState({ modalData: null })
          this.setState({ modalData: json.quote })
          this.setState({error:this.state.data.error})
          this.setState({isLoading:false})
        }).catch((err) => {
          // If there is no data, clear the 'data' value
          this.setState({ modalData: null })
          this.setState({error:undefined})
          // Print an error to the console.
          console.log('-- Error fetching --')
          console.log(err.message)
          // You may want to display an error to the screen here.
          this.setState({isLoading:false})
        })
    }

    render(){
        return(
            <div>
            { (this.state.isLoading ) ?
                  <Error error={null} isLoading={this.state.isLoading}/> :
                      <div className="output">{this.state.modalData}</div>
            }
      <Tabs selectedindex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
        <TabList selectedindex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
            <Tab>text</Tab>
            <Tab>url</Tab>
            <Tab>author</Tab>
        </TabList>
        <TabPanel>
        <div className="input-Box">
            <textarea className="input" placeholder='enter text here' value={this.state.inputTextValue}
                onChange={e => this.setState({ inputTextValue: e.target.value })}
                onSubmit={e => this.handleSubmit(e)}>
            </textarea>
            <button onClick={this.submitText} type="submit">Submit</button>
        </div>
        </TabPanel>
        <TabPanel>
            <div className="input-Box">
                <input className="inputUrl" value={this.state.urlValue}
                    onChange={e => this.setState({ urlValue: e.target.value })}
                    onSubmit={e => this.handleSubmit(e)}>
                </input>
                <button onClick={this.submitURL} type="submit">Submit</button>
            </div>
        </TabPanel>
        <TabPanel>
            <div className="input-Box">
                <div>
                  <input type="radio" name="author" id="grimm" value="grimm" onChange={e => this.setState({ authorValue: e.target.value })}/>
                  <label htmlFor="grimm">The Brothers Grimm</label>
                </div>
                <div>
                  <input type="radio" name="author" id="rowling" value="rowling" onChange={e => this.setState({ authorValue: e.target.value })}/>
                  <label htmlFor="rowling">JK Rowling</label>
                </div>
                <div>
                  <input type="radio" name="author" id="shakespeare" value="shakespeare" onChange={e => this.setState({ authorValue: e.target.value })}/>
                  <label htmlFor="shakespeare">Shakespeare</label>
                </div>
                <button onClick={this.submitAuthor} type="submit">Submit</button>
            </div>
        </TabPanel>
    </Tabs>
    </div>
)
}
}

export default OptionsModal;
