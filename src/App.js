import React, {Component} from 'react';
import './App.css';
import Error from './Error.js'
import Message from './Message.js'


class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            isLoading: false,
            data: null,
            inputValue: '',
            error: undefined,
        }
    }


  handleSubmit(e) {
    this.setState({isLoading:true})
    this.setState({error:undefined})
    e.preventDefault()
    const text = this.state.inputValue
    const shakespeareUrl = `https://api.funtranslations.com/translate/shakespeare.json?text=${text}`
    // Form an API request URL with the apikey and zip

    // Get data from the API with fetch
    fetch(shakespeareUrl).then(res => {
      // Handle the response stream as JSON
      return res.json()
    }).then((json) => {
      // If the request was successful assign the data to component state
      this.setState({ data: json })
      this.setState({error:this.state.data.error})

      // ! This needs better error checking here or at renderWeather()
      // It's possible to get a valid JSON response that is not weather
      // data, for example when a bad zip code entered.
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
        console.log(this.state.data, this.state.error, this.state.error === null && this.state.data)

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
                {(this.state.error === undefined && this.state.data) ? <Message message={this.state.data} /> : <Error error={this.state.error} isLoading={this.state.isLoading}/>}
              </div>

            </div>

        );
    }
}

export default App
