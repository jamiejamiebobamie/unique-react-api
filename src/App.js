import React, {Component} from 'react';
import './App.css';
import Message from './Message.js'

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            isLoading: false,
            data: "generated text will appear here",
            inputValue: 'enter text here',
            urlValue: '',
            error: undefined,
        }
        this.getQuoteFromDB = this.getQuoteFromDB.bind(this);
        this.submitInput = this.submitInput.bind(this);
        this.submitURL = this.submitURL.bind(this);
    }

    getQuoteFromDB(){
        this.setState({isLoading:true})
        const url = "http://localhost:7000/api/v1/quote"
        // Get data from the API with fetch
        fetch(url).then(res => {
          // Handle the response stream as JSON
          return res.json()
        }).then((json) => {
          this.setState({ data: json.quote })
          this.setState({isLoading:false})
        }).catch((err) => {
          // If there is no data
          this.setState({ data: null })
          this.setState({error:undefined})

          // Print an error to the console.
          console.log('-- Error fetching --')
          console.log(err.message)

          // You may want to display an error to the screen here.
              this.setState({isLoading:false})
        })
    }

  handleSubmit(e) {
    this.setState({isLoading:true})
    this.setState({error:undefined})
    e.preventDefault()
    const data = this.getState.inputValue
    const url = "http://localhost:7000/api/v1/quote-from-input"

    // Get data from the API with fetch
    fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json'},
                    body: JSON.stringify(data)
                }).then(res => {
      // Handle the response stream as JSON
      return res.json()
    }).then((json) => {
      // If the request was successful assign the data to component state
      console.log(this.state.data)
      // this.setState({ inputValue: json.quote })
      this.setState({ data: json.quote })
      this.setState({error:this.state.data.error})

      this.setState({isLoading:false})
    }).catch((err) => {
      // If there is no data
      this.setState({ data: null }) // Clear the weather data we don't have any to display
      this.setState({error:undefined})

      // Print an error to the console.
      console.log('-- Error fetching --')
      console.log(err.message)

      // You may want to display an error to the screen here.
          this.setState({isLoading:false})
    })
  }

  submitInput(){
    this.setState({isLoading:true})
    this.setState({error:undefined})
    const data = this.state.inputValue
    const backend = "http://localhost:7000/api/v1/quote-from-input"
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

  submitURL(){
    this.setState({isLoading:true})
    this.setState({error:undefined})
    const url = this.state.urlValue
    // const url = "http://www.gutenberg.org/cache/epub/288/pg288.txt"
    const backend = "http://localhost:7000/api/v1/quote-from-url"
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

    render(){
        return (
          <div className="App">
          <div className="boxes">
            <div className="output-Box">
                <div className="output">
                 {this.state.data} </div>
                </div>
        <div className="input-Box">
             <textArea className="input" placeholder='enter text here' value={this.state.inputValue}
              onChange={e => this.setState({ inputValue: e.target.value })}
              onSubmit={e => this.handleSubmit(e)}>
           </textArea>
            <button onClick={this.submitInput} type="submit">Submit</button>
            <input className="inputUrl" value={this.state.urlValue}
             onChange={e => this.setState({ urlValue: e.target.value })}
             onSubmit={e => this.handleSubmit(e)}>
          </input>
           <button onClick={this.submitURL} type="submit">Submit</button>
           </div>
           </div>


            </div>

        );
    }
}
export default App
