import React, { useState, useEffect } from 'react';
import './css/Canvas.css';

//import Zone from './Zone';

function Canvas(props) {
  //const [zones, setZones] = useState(props.zones);

  return (
    <svg id="svg" width="800" height="500" className="wrapper-canvas" onMouseDown={(e) => props.onMouseDownSvg(e, e.target)}>
      {
        props.zones.length > 0 &&
        props.zones.map((zone, i) => {
          return (
            <rect
              className={zone.class}
              x={zone.x}
              y={zone.y}
              width={zone.width}
              height={zone.height}
              id={zone.id}
            />
          )
        })
      }
    </svg>
  )
}

export default Canvas;