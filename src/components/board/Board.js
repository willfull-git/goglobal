import React from 'react';

import classes from './board.css';

import Map from './map/Map';
import Canvas from './canvas/Canvas';

export default ()=>{
  return (
    <div className={classes.board}>
      <Map></Map>
      <Canvas></Canvas>
    </div>
  );
}
