import React from 'react';
import {
  useSelector
} from 'react-redux';

import classes from './mapsvg.css';
import inferno from '../../../../assets/img/de_inferno.svg';

export default ()=>{

  // | Reduxt
  // |----------
  const stateMap = useSelector((state)=>{
    return state.map;
  });

  // Log
  console.log('--| State Map:');
  console.log(stateMap);

  return (
    <div dangerouslySetInnerHTML={{ __html: inferno }}>
    </div>
  );
}
