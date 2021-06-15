import React from 'react';
import {
  useSelector, useDispatch
} from 'react-redux';
import Select from 'react-select';

import {
  setNadeType, clearAll
} from '../../../redux/slices/settings';
import {
  setMap
} from '../../../redux/slices/map';

import classes from './sidebar.css';

const optionsMaps = [
  { value: 'de_dust2',    label: 'Dust 2' },
  { value: 'de_mirage',   label: 'Mirage' },
  { value: 'de_inferno',  label: 'Inferno' },
  { value: 'de_overpass', label: 'Overpass' },
  { value: 'de_train',    label: 'Train' }
]

const optionsNades = [
  { value: 'flash', label: 'Flash Bang' },
  { value: 'he',    label: 'HE' },
  { value: 'fire',  label: 'Fire' },
  { value: 'smoke', label: 'Smoke' },
  { value: 'decoy', label: 'Decoy' }
]

export default ()=>{
  const dispatch = useDispatch();

  // | Handle - on Change
  // |----------
  const handleOnChangeMap = (action, obj)=>{
    dispatch( setMap(action.value) );
  }

  const handleOnChangeNade = (action, obj)=>{
    dispatch( setNadeType(action.value) );
  }
  
  return (
    <div className={classes.sidebar}>
      <Select
        options={optionsMaps}
        onChange={handleOnChangeMap}
      ></Select>

      <Select
        options={optionsNades}
        onChange={handleOnChangeNade}
      ></Select>
    </div>
  );
}
