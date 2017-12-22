import React, { Component } from 'react'
import { LineChart } from 'react-easy-chart'
import './App.css'

class App extends Component {
  constructor() {
    super()
    const initialWidth = window.innerWidth > 0 ? window.innerWidth : 500
    const initialHeight = window.innerHeight > 0 ? window.innerHeight : 500
    this.state = {
      data: [],
      graphWidth: initialWidth,
      graphHeight: initialHeight
    }

    this.handleResize = this.handleResize.bind(this)
  }

  handleResize() {
    this.setState({
      graphWidth: window.innerWidth > 0 ? window.innerWidth : 500,
      graphHeight: window.innerHeight > 0 ? window.innerHeight : 500
    })
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize)
    const docClient = new AWS.DynamoDB.DocumentClient() //eslint-disable-line no-undef

    docClient.scan(
      {
        TableName: 'btx',

      },
      (err, data) => {
        if (err) console.error(err)
        this.setState(() => ({
          // TODO: change AWS dynamo data type to send a number.
          data: [
            data.Items.sort((a, b) => {
              const dateA = Date.parse(a.date)
              const dateB = Date.parse(b.date)
                return dateA - dateB
            }).map((item, index) => ({
              x: Number(Date.parse(item.date)),
              y: Number(item.value)
            }))
          ]
        }))
      }
    )
  }

  render() {
    return (
      <div className="App">
        <LineChart axes width={this.state.graphWidth} height={this.state.graphHeight} data={this.state.data} />
      </div>
    )
  }
}

export default App
