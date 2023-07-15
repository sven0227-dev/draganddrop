import React from 'react'
import { Resizable } from 'react-resizable'

const ResizableExample = () => {
  const [width, setWidth] = React.useState(200)
  const [height, setHeight] = React.useState(200)

  const handleResize = (event, { size }) => {
    console.log('SDFSDF');
    setWidth(size.width)
    setHeight(size.height)
  }

  return (
    <div>
      <Resizable
        width={width}
        height={height}
        onResize={handleResize}
        draggableOpts={{ grid: [20, 20] }}
      >
        <div
          style={{
            width: `${width}px`,
            height: `${height}px`,
            background: 'lightblue'
          }}
        >
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <div
              className='resize-handle'
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: '10px',
                height: '10px',
                background: 'gray',
                cursor: 'se-resize'
              }}
            />
            Resize me!
          </div>
        </div>
      </Resizable>
    </div>
  )
}

export default ResizableExample
