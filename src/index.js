import React    from 'react';
import ReactDOM from 'react-dom';

import store from './redux/store';
import {
  Provider
} from 'react-redux';

import Board from './components/board/Board';

function App(){
  return (
    <Provider store={store}>
      <div>
        <Board> </Board>        
      </div>
    </Provider>
  );
}

ReactDOM.render(
   <App/>,
   document.getElementById('app')
);
