import React from 'react';

import classes from './canvas.css';

import Nade from '../nade/Nade';

export default ()=>{
  return (
    <svg className={classes.canvas}>
      <Nade></Nade>
    </svg>
  );
}
