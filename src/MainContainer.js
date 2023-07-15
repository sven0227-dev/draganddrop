import React from 'react'
import { Resizable } from 'react-resizable'
import Draggable from 'react-draggable'

const GRID_SIZE = 10

class MainContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      subContainers: []
    }
    this.handleDrop = this.handleDrop.bind(this)
  }

  handleDrop (event) {
    event.preventDefault()
    const color = event.dataTransfer.getData('color')
    const x = Math.round(event.clientX / GRID_SIZE) * GRID_SIZE
    const y = Math.round(event.clientY / GRID_SIZE) * GRID_SIZE
    const subContainer = {
      id: Date.now(),
      color: color,
      x: x,
      y: y,
      width: 100,
      height: 100
    }
    this.setState(prevState => ({
      subContainers: [...prevState.subContainers, subContainer]
    }))
  }

  render () {
    const { subContainers } = this.state

    return (
      <div
        onDrop={this.handleDrop}
        onDragOver={event => event.preventDefault()}
        style={{
          position: 'relative',
          width: '100%',
          height: 500,
          border: '1px solid black',
          backgroundColor: 'white',
          userSelect: 'none'
        }}
      >
        {[...Array(50)].map((_, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              top: index * GRID_SIZE,
              left: 0,
              width: '100%',
              height: 1,
              backgroundColor: 'gray',
              opacity: 0.5,
              pointerEvents: 'none'
            }}
          />
        ))}
        {[...Array(50)].map((_, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              top: 0,
              left: index * GRID_SIZE,
              width: 1,
              height: '100%',
              backgroundColor: 'gray',
              opacity: 0.5,
              pointerEvents: 'none'
            }}
          />
        ))}
        {subContainers.map(subContainer => (
          <Draggable
            key={subContainer.id}
            defaultPosition={{ x: subContainer.x, y: subContainer.y }}
            onStop={(event, data) => {
              const index = subContainers.findIndex(
                c => c.id === subContainer.id
              )
              const updatedSubContainer = {
                ...subContainer,
                x: data.x,
                y: data.y
              }
              const updatedSubContainers = [...subContainers]
              updatedSubContainers[index] = updatedSubContainer
              this.setState({ subContainers: updatedSubContainers })
            }}
            cancel='.react-resizable-handle'
          >
            <Resizable
              width={subContainer.width}
              height={subContainer.height}
              onResizeStop={(event, data) => {
                const index = subContainers.findIndex(
                  c => c.id === subContainer.id
                )
                const updatedSubContainer = {
                  ...subContainer,
                  width: data.size.width,
                  height: data.size.height
                }
                const updatedSubContainers = [...subContainers]
                updatedSubContainers[index] = updatedSubContainer
                this.setState({ subContainers: updatedSubContainers })
              }}
            >
              <div
                draggable={false}
                style={{
                  backgroundColor: subContainer.color,
                  border: '1px solid black',
                  cursor: 'move',
                  position: 'relative',
                  height: '100px'
                }}
              >
                <div
                  className='react-resizable-handle'
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: 10,
                    height: 10,
                    border: '1px solid black',
                    backgroundColor: 'white',
                    cursor: 'se-resize'
                  }}
                />
              </div>
            </Resizable>
          </Draggable>
        ))}
      </div>
    )
  }
}

export default MainContainer
