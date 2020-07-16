import React, {Component} from 'react';
import './App.css';
import Message from './Message.js'

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            isLoading: false,
            data: undefined,
            inputValue: '',
            error: undefined,
        }
        this.getQuoteFromDB = this.getQuoteFromDB.bind(this);
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
      console.log(this.state.data)
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

    render(){
        return (
          <div className="App">
              <h1 className="title">type something to speak like Shakespeare</h1>

              <img className="shakespeare" src="https://i2.wp.com/bryanbumgardner.com/wp-content/uploads/2016/03/shakespeare.jpg?resize=730%2C350&ssl=1" alt=""/>

              <div className="input_output">
                  <form  onSubmit={e => this.handleSubmit(e)}>
                  <input
                  value={this.state.inputValue}
                  onChange={e => this.setState({ inputValue: e.target.value })}
                  type="text"
                  className="textBox"
                  // pattern="(\d{5}([\-]\d{4})?)"
                  placeholder="type here"
                />
                <button type="submit">Submit</button>
                </form>
                <button onClick={this.getQuoteFromDB}>generate quote from shakespeare's own words!</button>
                { (this.state.data) ? <Message message={this.state.data} />: "" }
              </div>

            </div>

        );
    }
}

export default App
