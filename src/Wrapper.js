import React, { useState } from 'react';
import './css/Wrapper.css';

import Canvas from './Canvas';

function Wrapper(props) {
  const [zones, setZones] = useState([]);
  const [boxes, setBoxes] = useState([]);
  const [activeDrawZone, setActiveDrawZone] = useState(false);
  const [activeDrawBox, setActiveDrawBox] = useState(false);

  const svgPoint = (elem, x, y) => {
    let p = elem.createSVGPoint();
    p.x = x;
    p.y = y;
    return p.matrixTransform(elem.getScreenCTM().inverse());
  }

  const _triggerZone = () => {
    setActiveDrawZone(true)
    setActiveDrawBox(false)
  };

  const _triggerBox = () => {
    setActiveDrawBox(true)
    setActiveDrawZone(false)
  };

  const _drawZone = (e, svg_canvas) => {
    const start = svgPoint(svg_canvas, e.clientX, e.clientY);

    if (activeDrawZone === true) {
      
      const drawZoneRect = (e) => {
        let p = svgPoint(svg_canvas, e.clientX, e.clientY);
        let w = Math.abs(p.x - start.x);
        let h = Math.abs(p.y - start.y);
        if (p.x > start.x) {
          p.x = start.x;
        }

        if (p.y > start.y) {
          p.y = start.y;
        }

        const zones_group = document.querySelectorAll('.zone')
        let id = zones_group.length

        setZones([...zones,
        {
          width: w,
          height: h,
          x: p.x,
          y: p.y,
          class: 'zone',
          id: id
        }
        ])
      }

      const endDrawZone = (e) => {
        svg_canvas.removeEventListener('mousemove', drawZoneRect);
        svg_canvas.removeEventListener('mouseup', endDrawZone);
      }

      svg_canvas.addEventListener('mousemove', drawZoneRect);
      svg_canvas.addEventListener('mouseup', endDrawZone);
    }



  }

  const _drawBox = (e, rect_zone, box=false) => {

    const start = svgPoint(rect_zone, e.clientX, e.clientY);

    if (activeDrawBox === true) {
      e.stopPropagation()
      const drawBoxRect = (e) => {

        let p = svgPoint(rect_zone, e.clientX, e.clientY);
        if (p.x > start.x) {
          p.x = start.x;
        }

        if (p.y > start.y) {
          p.y = start.y;
        }

        const boxes_group = document.querySelectorAll('.box')
        let id = boxes_group.length

        setBoxes([...boxes,
        {
          x: p.x,
          y: p.y,
          class: 'box',
          id: 'b' + id
        }
        ])
      }

      const endDrawBox = (e) => {
        rect_zone.removeEventListener('mousemove', drawBoxRect);
        rect_zone.removeEventListener('mouseup', endDrawBox);
      }

      rect_zone.addEventListener('mousemove', drawBoxRect);
      rect_zone.addEventListener('mouseup', endDrawBox);

    }
  };

  const moveRect = (id, resizeID) => {

    // let mousedown_points;

    // const mousedown = (e) => {
    //   console.log('id', e.target.id);
    //   let target = e.target;
    //   if (target.id === resizeID) {
    //     mousedown_points = {
    //       x: e.clientX,
    //       y: e.clientY
    //     }
    //     document.addEventListener('mouseup', mouseup, false);
    //     document.addEventListener('mousemove', mousemove, false);
    //   }
    // }

    // const mousemove = (e) => {

    //   let current_points = {
    //     x: e.clientX,
    //     y: e.clientY
    //   }

    //   let rect = document.getElementById(id);
    //   let w = parseFloat(rect.getAttribute('width'));
    //   let h = parseFloat(rect.getAttribute('height'));

    //   let dx = current_points.x - mousedown_points.x;
    //   let dy = current_points.y - mousedown_points.y;

    //   w += dx;
    //   h += dy;

    //   rect.setAttribute('width', w);
    //   rect.setAttribute('height', h);

    //   mousedown_points = current_points;

    //   updateResizeIcon(dx, dy);
    // }

    // const updateResizeIcon = (dx, dy) => {
    //   let resize = document.getElementById(resizeID);
    //   let x = parseFloat(resize.getAttribute('x'));
    //   let y = parseFloat(resize.getAttribute('y'));

    //   x += dx;
    //   y += dy;

    //   resize.setAttribute('x', x);
    //   resize.setAttribute('y', y);
    // }


    // const mouseup = (e) => {
    //   document.removeEventListener('mouseup', mouseup, false);
    //   document.removeEventListener('mousemove', mousemove, false);
    // }

    // document.addEventListener('mousedown', mousedown, false);
  }

  return (
    <div className="wrapper">
      <Canvas
        onMouseDownSvg={(e, svg_canvas) => _drawZone(e, svg_canvas)}
        onMouseDownRect={(e, rect_zone) => _drawBox(e, rect_zone)}
        zones={zones}
        boxes={boxes}
      />
      <div className="creation-zone">
        <button
          className="button"
          onClick={() => _triggerZone()}
        >
          Añadir zona
        </button>
        <button
          className="button"
          onClick={() => _triggerBox()}
        >
          Añadir cajón
      </button>
      </div>
    </div>
  )
}

export default Wrapper;