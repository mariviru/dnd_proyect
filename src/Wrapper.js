import React, { useState, useEffect } from 'react';
import './css/Wrapper.css';

import Canvas from './Canvas';

function Wrapper(props) {
  let svg;

  useEffect(() => {
    svg = document.querySelector('#svg');
  }, [])

  const _drawZone = () => {
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

      const drawZoneRect = (e) => {
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
        rect.setAttributeNS(null, 'class', 'zone')
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

      const endDrawZone = (e) => {
        svg.removeEventListener('mousemove', drawZoneRect);
        svg.removeEventListener('mouseup', endDrawZone);
      }

      svg.addEventListener('mousemove', drawZoneRect);
      svg.addEventListener('mouseup', endDrawZone);
    });
  }

  const _drawBox = () => {
    const svgPoint = (elem, x, y) => {
      let p = svg.createSVGPoint();
      p.x = x;
      p.y = y;
      return p.matrixTransform(elem.getScreenCTM().inverse());
    }

    svg.addEventListener('mousedown', (event) => {
      const rectBox = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      const start = svgPoint(svg, event.clientX, event.clientY);

      const drawBoxRect = (e) => {
        let p = svgPoint(svg, e.clientX, e.clientY);
        let w = Math.abs(p.x - start.x);
        let h = Math.abs(p.y - start.y);
        if (p.x > start.x) {
          p.x = start.x;
        }

        if (p.y > start.y) {
          p.y = start.y;
        }

        rectBox.setAttributeNS(null, 'x', p.x);
        rectBox.setAttributeNS(null, 'y', p.y);
        rectBox.setAttributeNS(null, 'width', w);
        rectBox.setAttributeNS(null, 'height', h);
        rectBox.setAttributeNS(null, 'class', 'box')
        svg.appendChild(rectBox);

        const rects_group = document.querySelectorAll('rect')
        let id = rects_group.length
        rectBox.setAttributeNS(null, 'id', id)
        
      }

      const endDrawBox = (e) => {
        svg.removeEventListener('mousemove', drawBoxRect);
        svg.removeEventListener('mouseup', endDrawBox);
      }

      svg.addEventListener('mousemove', drawBoxRect);
      svg.addEventListener('mouseup', endDrawBox);
    });
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
      <Canvas/>
      <div className="creation-zone">
        <button
          className="button"
          onClick={() => _drawZone()}
        >
          Añadir zona
        </button>
        <button
          className="button"
          onClick={() => _drawBox()}
        >
          Añadir cajón
      </button>
      </div>
    </div>
  )
}

export default Wrapper;