import React from 'react'
export function Control ({ rgb, update, effin }) {
  const gc = e => {
    switch (e) {
      case 'r':
        return '#FF5722'
      case 'g':
        return '#4CAF50'
      case 'b':
        return '#2196F3'
      default:
        break
    }
  }
  return (
    <div className='controls'>
      {['BW', 'COUT', 'CIN'].map((g, i) => (
        <div
          onClick={() => {
            effin(g)
          }}
          key={i}
          className={'eff ' + g}
        >
          {g}
        </div>
      ))}
      {Object.keys(rgb).map((g, i) => {
        return (
          <div className={'color_' + g} key={i} style={{ background: gc(g) }}>
            <div>
              <input
                type='range'
                max='255'
                min='0'
                step='1'
                value={rgb[g]}
                name={g}
                onChange={e => {
                  update(g, e.target.value)
                }}
              />
            </div>
            <div>{rgb[g]}</div>
          </div>
        )
      })}
    </div>
  )
}
