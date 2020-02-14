import React, { useState, useEffect } from 'react';
import './css/Canvas.css';

//import Zone from './Zone';

function Canvas(props) {
  //const [zones, setZones] = useState(props.zones);

  useEffect(() => {
    const svg = document.querySelector('#svg');

    const svgPoint = (elem, x, y) => {
      let p = svg.createSVGPoint();
      p.x = x;
      p.y = y;
      return p.matrixTransform(elem.getScreenCTM().inverse());
    }

    svg.addEventListener('mousedown', (event) => {
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      const rect2 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      const start = svgPoint(svg, event.clientX, event.clientY);

      const drawRect = (e) => {
        let p = svgPoint(svg, e.clientX, e.clientY);
        let w = Math.abs(p.x - start.x);
        let h = Math.abs(p.y - start.y);
        if (p.x > start.x) {
          p.x = start.x;
        }

        if (p.y > start.y) {
          p.y = start.y;
        }

        rect.setAttributeNS(null, 'x', p.x);
        rect.setAttributeNS(null, 'y', p.y);
        rect.setAttributeNS(null, 'width', w);
        rect.setAttributeNS(null, 'height', h);
        svg.appendChild(rect);

        const rects_group = document.querySelectorAll('rect')
        let id = rects_group.length
        rect.setAttributeNS(null, 'id', id)
        
        let resizeID = p.x + id;
        rect2.setAttributeNS(null, 'x', p.x);
        rect2.setAttributeNS(null, 'y', p.y);
        rect2.setAttributeNS(null, 'width', 20);
        rect2.setAttributeNS(null, 'height', 20);
        rect2.setAttributeNS(null, 'id', resizeID)
        rect2.setAttributeNS(null, 'class', 'resize')
        svg.appendChild(rect2);
        rect2.addEventListener('click', moveRect(id, resizeID))
      }

      const endDraw = (e) => {
        svg.removeEventListener('mousemove', drawRect);
        svg.removeEventListener('mouseup', endDraw);
      }

      svg.addEventListener('mousemove', drawRect);
      svg.addEventListener('mouseup', endDraw);
    });

  }, [])


  const moveRect = (id, resizeID) => {
    console.log('arguments', id);
    console.log('arguments', resizeID);
    
    
    let mousedown_points;

    const mousedown = (e) => {
      console.log('id', e.target.id);
      let target = e.target;
      if (target.id === resizeID) {
        mousedown_points = {
          x: e.clientX,
          y: e.clientY
        }
        document.addEventListener('mouseup', mouseup, false);
        document.addEventListener('mousemove', mousemove, false);
      }
    }

    const mousemove = (e) => {

      let current_points = {
        x: e.clientX,
        y: e.clientY
      }

      let rect = document.getElementById(id);
      let w = parseFloat(rect.getAttribute('width'));
      let h = parseFloat(rect.getAttribute('height'));

      let dx = current_points.x - mousedown_points.x;
      let dy = current_points.y - mousedown_points.y;

      w += dx;
      h += dy;

      rect.setAttribute('width', w);
      rect.setAttribute('height', h);

      mousedown_points = current_points;

      updateResizeIcon(dx, dy);
    }

    const updateResizeIcon = (dx, dy) => {
      let resize = document.getElementById(resizeID);
      let x = parseFloat(resize.getAttribute('x'));
      let y = parseFloat(resize.getAttribute('y'));

      x += dx;
      y += dy;

      resize.setAttribute('x', x);
      resize.setAttribute('y', y);
    }


    const mouseup = (e) => {
      document.removeEventListener('mouseup', mouseup, false);
      document.removeEventListener('mousemove', mousemove, false);
    }

    document.addEventListener('mousedown', mousedown, false);
  }


  return (
    <svg id="svg" width="800" height="500" className="wrapper-canvas"></svg>

    // <div className="wrapper-canvas" >
    //   {
    //     zones.map((zone, i) => {
    //       return (
    //         <Zone
    //           key={zone}
    //           id={zone}
    //         />
    //       )
    //     })
    //   }
    // </div>
  )
}

export default Canvas;