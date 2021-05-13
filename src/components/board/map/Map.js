import React, {
  useState,
  createRef
} from 'react';

import classes from './map.css';

import mapImg from '../../../../assets/img/radar_de_inferno.svg';
// import mapSvg from '../mapsvg/MapSvg';

export default ()=>{
  const [zoom, setZoom]             = useState(1);
  const [zoomMeta, setZoomMeta]     = useState({y: "center", x: "center"});

  const refMapContainer = createRef();

  // Log
  // console.log(refMapContainer);

  // | Handle - Scale
  // |----------
  const handleSclale = ()=>{
    // Log
    console.log('--| scale!');
  }

  // | Handle - Unscale
  // |----------
  const handleUnsclale = ()=>{
    // Log
    console.log('--| unscale!');
  }

  // | Handle - Zoom
  // |----------
  const handleZoom = (e)=>{
    // Log
    console.log('--| zoom!');
    console.log(' -| y: ' +e.clientY);
    console.log(' -| x: ' +e.clientX);

    e.preventDefault();

    if(e.deltaY>0){
      console.log(' -| zoom out');
      if(zoom>1) {
        setZoom(zoom-1);
      }
    } else {
      console.log(' -| zoom in');
      if(zoom<5){
        setZoom(zoom+1);
      }
    }

    // |--- calculate new zoom origin
    if(zoom>1){
      let newX, newY;

      newX = zoomMeta.x + ((e.clientX - zoomMeta.x )/zoom);
      newY = zoomMeta.y + ((e.clientY - zoomMeta.y )/zoom);

      // Log
      console.log(zoomMeta.x);
      console.log(e.clientX);

      console.log(' -| newX: ' +newX);
      console.log(' -| newY: ' +newY);

      setZoomMeta({x: newX, y: newY});
    } else {
      setZoomMeta({x: e.clientX, y: e.clientY});
    }
  }

  return (
    <div
      className={classes.map}
      onWheel={handleZoom}
    >
      <div 
        className={classes['svg-container']}
        dangerouslySetInnerHTML={{ __html: mapImg }}
        ref={refMapContainer}
        style={{
          transform: "scale("+ zoom +")",
          transformOrigin: zoomMeta.x+'px' +' '+ zoomMeta.y+'px'
        }}
      >
      </div>
    </div>
  );
};
