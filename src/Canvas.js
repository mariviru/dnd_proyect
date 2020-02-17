import React from 'react';
import './css/Canvas.css';

function Canvas(props) {
  return (
    <svg
      id="svg"
      width="800"
      height="500"
      className="wrapper-canvas"
      onMouseDown={(e) => props.onMouseDownSvg(e, e.target)}
    >
      {
        props.zones.length > 0 &&
        props.zones.map((zone, i) => {
          return (
            <rect
              key={i + zone.id}
              className={zone.class}
              x={zone.x}
              y={zone.y}
              width={zone.width}
              height={zone.height}
              id={zone.id}
              onMouseDown={(e) => props.onMouseDownRect(e, e.currentTarget.parentElement)}
            />
          )
        })
      }

      {
        props.boxes.length > 0 &&
        props.boxes.map((box, j) => {
          return (
            <rect
              key={j}
              className={box.class}
              x={box.x}
              y={box.y}
              id={box.id}
              onMouseDown={(e) => e.stopPropagation()}
            />
          )
        })
      }
    </svg>
  )
}

export default Canvas;