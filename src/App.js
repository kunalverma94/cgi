import React, { Component } from 'react'
import { Chroma } from './Components/chroma'
import { Control } from './Components/control'
import { Scrolls } from './Components/bglist'
import { Header } from './Components/Header'
import './style.css'
export const Effect = {
  bw: 'COUT',
  c1: 'COUT',
  c2: 'CIN',
  ilet: 'null'
}

export default class App extends Component {
  state = {
    picked: {
      color: 'black',
      rbga: { r: 126, g: 126, b: 126, a: 255 }
    },
    image: null,
    effect: 'CIN'
  }

  config = {
    url: 'https://picsum.photos/id/[[X]]/640/360',
    ilist: Array.apply(null, { length: 10 })
      .map(Math.random.call, Math.random)
      .map(j => Math.floor(j * 1000))
  }
  render () {
    return (
      <div className='app'>
        <Header />
        <Chroma
          extern={this.state}
          update_color={r => {
            console.log(r)
            this.setState(s => {
              s.picked = r
              return s
            })
          }}
        />
        <Scrolls
          extern={this.config}
          update={r => {
            console.log(r)
            this.setState(s => {
              s.ilet = r
              return s
            })
          }}
        />
        <Control
          rgb={this.state.picked.rbga}
          effin={w => {
            console.log(w)
            this.setState(s => {
              s.effect = w
              return s
            })
          }}
          update={(v, r) => {
            this.setState(s => {
              s.picked.rbga[v] = r
              return s
            })
          }}
        />
      </div>
    )
  }
}
