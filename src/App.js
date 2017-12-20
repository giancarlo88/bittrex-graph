import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

class App extends Component {
  constructor() {
    super()
    this.state = {
      data: {}
    }
  }
  componentDidMount() {
    const docClient = new AWS.DynamoDB.DocumentClient() //eslint-disable-line no-undef

    docClient.scan({
      TableName: 'btx',
      FilterExpression: 'attribute_exists(utc)'
    }, (err, data) => {
      if (err) console.error(err)
      this.setState(() => ({
        data: data
      }))
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          {JSON.stringify(this.state.data)}
        </p>
      </div>
    )
  }
}

export default App
