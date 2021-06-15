import React, {
  useEffect
} from 'react';
import {
  useSelector
} from 'react-redux';

import classes from './canvas.css';

import Nade from '../nade/Nade';


export default ()=>{
  let nadesList = [];

  // | Redux
  // |----------
  const stateNades = useSelector((state)=>{
    return state.nades.list;
  });

  const stateSettings = useSelector((state)=>{
    return state.settings.filters;
  });

  stateNades.map((e, i)=>{
    // Log
    console.log(' -| nade type:   ' +e.type);
    // console.log(' -| setings type:' +stateSettings.type);
    console.log(e);

    if(!(stateSettings.type===e.type)) return false;

    nadesList.push(<Nade key={e.name} nade={e}></Nade>);
  });

  // Log
  console.log(nadesList);

  return (
    <svg
      className={classes.canvas}
      viewBox="0 0 1024 1024"
    >
      { nadesList }
    </svg>
  );
}
