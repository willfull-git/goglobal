import React from 'react';

import classes from './board.css';

import Map from './map/Map';
import Sidebar from './sidebar/Sidebar';

export default ()=>{
  return (
    <div className={classes.board}>
      <Map></Map>
      <Sidebar></Sidebar>
    </div>
  );
}
