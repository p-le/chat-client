import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      connection: null,
      message: '',
      isConnected: false,
      messages: []
    }
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
  }
  componentDidMount() {
    const connection = new WebSocket('ws://localhost:9000/chat')
    connection.onopen = e => {
      this.setState({
        connection,
        isConnected: true
      })
    }
    connection.onmessage = e => {
      this.setState({
        messages: this.state.messages.concat([ e.data ])
      })
    }
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      this.state.connection.send(this.state.message)
      this.setState({
        message: ''
      })
    }
  }

  handleOnChange(e) {
    this.setState({
      message: e.target.value
    })
  }

  render() {
    return (
      <div className="container">
        <h3>Chat Room</h3>
        <h5>{this.state.isConnected ? 'Connected' : 'No Connection'}</h5>
        <ul>
        {
          this.state.messages.map((message, i) => <li key={i}>{message}</li>)
        }
        </ul>
        <label htmlFor="exampleMessage">Message</label>
        <textarea 
          className="u-full-width"
          placeholder="Message"
          id="exampleMessage"
          value={this.state.message}
          onChange={this.handleOnChange}
          onKeyPress={this.handleKeyPress} />
      </div>
    );
  }
}

export default App;
