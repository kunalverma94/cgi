import React, { Component } from 'react'
import { Bw, gw, gx } from './Effects'
export class Chroma extends Component {
  state = {
    h: 360,
    w: 640,
    sm: false
  }
  resolutions = {
    '240p': { h: 240, w: 320 },
    '360p': { h: 360, w: 640 },
    '480p': { h: 480, w: 640 },
    '720p': { h: 720, w: 1280 },
    '1080p': { h: 1080, w: 1920 }
  }
  video = React.createRef()
  pickerCanvas = React.createRef()
  displayCanvas = React.createRef()

  componentDidMount () {
    this.startVideo(this.replicateAndFx)
  }
  replicateAndFx = () => {
    let context = this.pickerCanvas.current.getContext('2d')
    context.drawImage(this.video.current, 0, 0, this.state.w, this.state.h)
    let _context = this.displayCanvas.current.getContext('2d')
    let image = context.getImageData(0, 0, this.state.w, this.state.h)
    switch (this.props.extern.effect) {
      case 'BW':
        Bw(image)
        _context.putImageData(image, 0, 0)
        break
      case 'CIN':
        gw({
          m: this.props.extern.picked.rbga,
          srcc: this.props.extern.ilet || 'https://picsum.photos/id/79/640/360',
          cc: _context,
          c: context
        })
        break
      case 'COUT':
        gx({
          m: this.props.extern.picked.rbga,
          srcc: this.props.extern.ilet || document.querySelector('img').src,
          cc: _context,
          c: context
        })
        break
      default:
        _context.putImageData(image, 0, 0)
        break
    }
    requestAnimationFrame(this.replicateAndFx)
  }
  startVideo = init =>
    navigator.getUserMedia(
      {
        video: {
          height: this.state.h,
          width: this.state.w,
          facingMode: 'user'
        }
      },
      d => {
        this.video.current.srcObject = d
        init()
      },
      d => console.log(d)
    )
  getColor = e => {
    if (this.state.sm) {
      var x = e.layerX
      var y = e.layerY
      let data = this.pickerCanvas.current
        .getContext('2d')
        .getImageData(x, y, 1, 1).data
      let r = data[0]
      let g = data[1]
      let b = data[2]
      let a = data[3]

      var rgba = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a / 255 + ')'
      let picked = {
        color: rgba,
        rbga: { r: r, g: g, b: b, a: a }
      }
      this.props.update_color(picked)
    }
  }
  enableselectMode = () => {
    this.setState({ ...this.state, sm: !this.state.sm })
  }
  Save = () => {
    this.displayCanvas.current.toBlob(function (b) {
      let URLObj = window.URL || window.webkitURL
      let a = document.createElement('a')
      a.href = URLObj.createObjectURL(b)
      a.download = Math.floor(Math.random() * 100) + '.png'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    })
    ///
  }
  render () {
    return (
      <>
        <div className='cam'>
          <div className='source'>
            <video
              style={{ display: 'none' }}
              ref={this.video}
              controls
              autoPlay
              height={this.state.h}
              width={this.state.w}
            />
          </div>
          <div
            className='orignal'
            style={{ position: this.state.sm ? 'relative' : 'absolute' }}
          >
            <canvas
              onContextMenu={() => {
                this.setState({ ...this.state, sm: false })
              }}
              ref={this.pickerCanvas}
              id='org'
              height={this.state.h}
              width={this.state.w}
              style={{
                cursor: this.state.sm ? 'crosshair' : 'default',
                opacity: this.state.sm ? '1' : '0'
              }}
              onClick={e => this.getColor(e.nativeEvent)}
            />
          </div>
          <div className='final'>
            <canvas
              ref={this.displayCanvas}
              id='fin'
              height={this.state.h}
              width={this.state.w}
            />
          </div>
          <div className='select_mode' onClick={() => this.enableselectMode()}>
            Select Color
            <div
              className='selected_color'
              style={{ background: this.props.extern.picked.color }}
            />{' '}
          </div>
          <div className='select_mode save' onClick={() => this.Save()}>
            Save
          </div>
        </div>
        <div>
          <select
            style={{ display: 'none' }}
            defaultValue={'360p'}
            onChange={e => {
              e.persist()
              this.setState(
                j => {
                  let o = this.resolutions[e.target.value]
                  j.w = o.w
                  j.h = o.h
                  return j
                },
                () => this.startVideo(() => {})
              )
            }}
          >
            {Object.keys(this.resolutions).map((g, i) => (
              <option key={i} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>
      </>
    )
  }
}
