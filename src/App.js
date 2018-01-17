import React, { Component } from 'react'
import { ScatterChart, Scatter, XAxis, YAxis } from 'recharts'
import debounce from 'debounce'
import './App.css'

class App extends Component {
  constructor() {
    super()
    const initialWidth = window.innerWidth > 0 ? window.innerWidth : 500
    const initialHeight = window.innerHeight > 0 ? window.innerHeight - 80 : 500
    this.state = {
      data: [],
      graphWidth: initialWidth,
      graphHeight: initialHeight
    }

    this.handleResize = this.handleResize.bind(this)
  }

  debounceResize() {
    return debounce(2000, this.handleResize())
  }

  handleResize() {
    return this.setState({
      graphWidth: window.innerWidth > 0 ? window.innerWidth : 500,
      graphHeight: window.innerHeight > 0 ? window.innerHeight - 80 : 500
    })
  }

  componentDidMount() {
    window.addEventListener('resize', this.debounceResize.bind(this))
    const docClient = new AWS.DynamoDB.DocumentClient() //eslint-disable-line no-undef
    docClient.scan(
      {
        TableName: 'btx'
      },
      (err, data) => {
        if (err) console.error(err)
        this.setState(() => ({
          // TODO: change AWS dynamo data type to send a number.
          data: data.Items
            .sort((a, b) => {
              const dateA = Date.parse(a.date)
              const dateB = Date.parse(b.date)
              return dateA - dateB
            })
            .map((item, index) => ({
              x: Number(Date.parse(item.date)),
              y: Number(item.value)
            }))
        }))
      }
    )
  }

  render() {
    return (
      <div className="App">
        <h1> Current value of BTX wallet (in BTC) </h1>
        <ScatterChart
          isAnimationActive={false}
          interpolate="cardinal"
          margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
          width={this.state.graphWidth}
          height={this.state.graphHeight}
        >
          <XAxis dataKey={'x'} type="number" name="date" domain={['auto', 'auto']} />
          <YAxis dataKey={'y'} type="number" name="btc value" />
          <Scatter
            shape={() => '.'}
            isAnimationActive={false}
            line
            name="BTC value over time"
            data={this.state.data}
            fill="#0F75FF"
          />
        </ScatterChart>
      </div>
    )
  }
}

export default App
