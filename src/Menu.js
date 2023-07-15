import React from 'react'

const COLORS = ['lightblue', 'lightgreen', 'lightpink', 'lightyellow']

const Menu = () => {
  return (
    <div>
      {COLORS.map(color => (
        <div
          key={color}
          draggable={true}
          onDragStart={event => {
            event.dataTransfer.setData('color', color)
          }}
          style={{
            backgroundColor: color,
            width: 50,
            height: 50,
            margin: 10,
            cursor: 'move'
          }}
        ></div>
      ))}
    </div>
  )
}

export default Menu
