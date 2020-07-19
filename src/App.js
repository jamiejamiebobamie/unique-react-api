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
            error: undefined,
        }
        this.getQuoteFromDB = this.getQuoteFromDB.bind(this);
        this.submitInput = this.submitInput.bind(this);

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
     console.log(this.state)
    this.setState({isLoading:true})
    this.setState({error:undefined})
    const data = this.state.inputValue
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
      // this.setState({ inputValue: json.quote })
      console.log(json.quote)
    this.setState({ data: undefined })
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
    console.log(this.state.data)

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
           </div>
           </div>


            </div>

        );
    }
}
export default App
