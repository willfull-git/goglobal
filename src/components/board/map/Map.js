import React, {
  useState,
  createRef
} from 'react';

import classes from './map.css';

import mapImg from '../../../../assets/img/radar_de_inferno.svg';

export default ()=>{
  const refMapContainer = createRef();
  const refMap          = createRef();

  // |--- zoom meta object
  const zoomObj = {
    level: 1,
    _x: 0, _y: 0,
    set x(val){
      // Log
      console.log('--| set zoom x: ' +val);

      let gap = document.querySelector('.map_map').offsetLeft;

      this._x = val-gap;
    },
    get x(){
      return this._x;
    },
    set y(val){
      let gap = document.querySelector('.map_map').offsetTop;

      this._y = val-gap;
    },
    get y(){
      return this._y;
    }
  };

  // |--- state
  const [zoom, setZoom] = useState(zoomObj);

  // | Handle - Zoom
  // |----------
  const handleZoom = (e)=>{
    // Log
    // console.log('--| zoom!');
    // console.log(e);
    // console.log(' -| map y:    ' +refMapContainer.current.offsetTop);
    // console.log(' -| map x:    ' +refMapContainer.current.offsetLeft);
    // console.log(' -| transform:' +refMapContainer.current.style.transform);

    let newZoom = Object.assign({}, JSON.parse(JSON.stringify(zoom)));

    if(e.deltaY>0){
      console.log(' -| zoom out');
      if(zoom.level>1) {
        newZoom.level = newZoom.level-0.5;
      }
    } else {
      console.log(' -| zoom in');
      if(zoom.level<5){
        newZoom.level = newZoom.level+0.5;
      }
    }

    // |--- set zoom center
    if(newZoom.level>=1.5){
      let
        cssTransform = refMapContainer.current.style.transform,
        mapOffLeft   = Math.abs( parseInt( cssTransform.slice( cssTransform.indexOf('(')+1 ) ) ),
        mapOffTop    = Math.abs( parseInt( cssTransform.slice( cssTransform.indexOf(',')+1 ) ) ),
        zoomCef      = 0,
        mapMargin    = document.querySelector('.map_map').offsetLeft;

      zoomCef = zoom.level / newZoom.level;

      newZoom.x = ((e.clientX-mapMargin+mapOffLeft)/zoomCef) - (refMap.current.offsetWidth/2);
      newZoom.y = ((e.clientY-mapMargin+mapOffTop)/zoomCef)  - (refMap.current.offsetHeight/2);

      if(newZoom.x>0){
        console.log(' -| x higher then 0');
        newZoom.x = -Math.abs(newZoom.x);
      } else {
        newZoom.x = Math.abs(newZoom.x);
      }

      if(newZoom.y>0){
        console.log(' -| y higher than 0');
        newZoom.y = -Math.abs(newZoom.y);
      } else {
        newZoom.y = Math.abs(newZoom.y);
      }

      // Log
      console.log(zoomCef);
      console.log(' -| client x:  ' +e.clientX);
      console.log(' -| client y:  ' +e.clientY);

      console.log(' -| map off x: ' +mapOffLeft);
      console.log(' -| map off y: ' +mapOffTop);

      console.log(' -| old map x: ' +(e.clientX+mapOffLeft));
      console.log(' -| old map y: ' +(e.clientY+mapOffTop));

      console.log(' -| map adjust x: ' +(refMap.current.offsetWidth/2));
      console.log(' -| map adjust y: ' +(refMap.current.offsetHeight/2));

      console.log(' -| new map x: ' +(e.clientX-mapMargin+mapOffLeft)/zoomCef);
      console.log(' -| new map y: ' +(e.clientY-mapMargin+mapOffLeft)/zoomCef);

      console.log(' -| new zoom x: ' +newZoom.x);
      console.log(' -| new zoom y: ' +newZoom.y);
    }

    setZoom(newZoom);

    // Log
    console.log(newZoom);
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
        ref={refMapContainer}
        style={{
          height: 'calc(100% * '+ zoom.level +')',
          width: 'calc(100% * '+ zoom.level +')',
          transform: 'translate('+ zoom.x +'px, '+ zoom.y +'px)'
        }}
      >
      </div>
    </div>
  );
};
