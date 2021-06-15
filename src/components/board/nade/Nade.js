import React from 'react';

import classes from './nade.css';

import {
  useSelector
} from 'react-redux';

export default (props)=>{
  const radius = 6;

  // | Redux
  // |----------
  const map = useSelector((state)=>{
    return { x: state.map.x, y: state.map.y, scale: state.map.scale };
  });

  console.log('--| map:');
  console.log(map);

  let
    fromX = Math.abs((props.nade.coords.from.x - map.x) / map.scale),
    fromY = Math.abs((props.nade.coords.from.y - map.y) / map.scale),
    toX   = Math.abs((props.nade.coords.to.x - map.x)   / map.scale),
    toY   = Math.abs((props.nade.coords.to.y - map.y)   / map.scale);

  return (
    <g id={props.nade.id} className={classes.nade+' '+classes['style-'+props.nade.type]}>
      <line
        className={classes.path}
        x1={fromX}
        y1={fromY}
        x2={toX}
        y2={toY}
      ></line>

      <circle
        className={classes.from}
        cx={fromX}
        cy={fromY}
        r={radius}
      ></circle>

      <circle
        className={classes.to}
        cx={toX}
        cy={toY}
        r={radius}
      ></circle>
    </g>
  );
}
