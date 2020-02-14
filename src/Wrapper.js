import React from 'react';
import './css/Wrapper.css';
import Canvas from './Canvas';
// import Zone from './Zone';

import CanvasTwo from './CanvasTwo';


function Wrapper(props) {
  // const [zones, setZones] = useState([]);
  // const _addZone = () => {
  //   let zone = 1;
  //   let new_zones;
  //   new_zones = zones.concat(zone);

  //   setZones(new_zones)
  // };

  return (
    <div className="wrapper">
      <Canvas/>
      {/* <Canvas
        zones={zones}
      />
      <div className="creation-zone">
        <button
          className="button"
          onClick={() => _addZone()}
        >
          Añadir zona
      </button>
        {
          zones.length > 0 &&
          <Zone />
        }
      </div> */}
    </div>
  )
}

export default Wrapper;