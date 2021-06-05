import React, {
  useState,
  useEffect,
  createRef
} from 'react';

import classes from './map.css';

import mapImg from '../../../../assets/img/radar_de_inferno.svg';
import Nav    from './Navigation';

export default ()=>{
  const refSvgContainer = createRef();
  const refMap          = createRef();

  let tmpNav;

  // |--- state
  const [nav, setNav] = useState(new Nav(1));

  console.log('--| current nav object');
  console.log(nav);

  useEffect(()=>{
    tmpNav = new Nav(nav.zoomLevel, refMap.current, refSvgContainer.current);
  });

  // | Handle - Zoom
  // |----------
  const handleZoom = (e)=>{
    if(e.deltaY>0){
      console.log(' -| zoom out');
      tmpNav.zoomOut(e);
    } else {
      console.log(' -| zoom in');
      tmpNav.zoomIn(e);
    }

    setNav(tmpNav);
  }


  // | Handle - Drag
  // |----------
  const handleDrag = (e)=>{
    // Log
    console.log('--| drag!');
  }


  // | Handle - Drag end
  // |----------
  const handleDragEnd = ()=>{
    // Log
    console.log('--| drag end!');
  }


  // | Handle - Scroll
  // |----------
  const handleMouseMove = (e)=>{
    console.log('--|');
    // console.log(e.clientX);
    // console.log(e.clientY);
  }
  

  return (
    <div
      className={classes.map}
      onWheel={handleZoom}
      onMouseDown={handleDrag}
      onMouseUp={handleDragEnd}
      ref={refMap}
    >
      <div 
        className={classes['svg-container']}
        dangerouslySetInnerHTML={{ __html: mapImg }}
        ref={refSvgContainer}
        style={{
          height: 'calc(100% * '+ nav.zoomLevel +')',
          width: 'calc(100% * '+ nav.zoomLevel +')',
          transform: 'translate('+ nav.x +'px, '+ nav.y +'px)'
        }}
      >
      </div>
    </div>
  );
};
