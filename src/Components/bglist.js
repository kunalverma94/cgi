import React from 'react'
export function Scrolls ({ extern, update }) {
  const { url, ilist } = extern
  const drop_area = React.createRef()
  return (
    <div className='list' ref={drop_area}>
      {ilist.map((k, i) => (
        <div key={i} onClick={() => update(url.replace('[[X]]', k))}>
          <img
            className='img'
            onError={e => {
              e.target.src = url.replace(
                '[[X]]',
                Math.floor(Math.random() * 1000)
              )
            }}
            src={url.replace('[[X]]', k)}
            alt={k}
          />
        </div>
      ))}
    </div>
  )
}
