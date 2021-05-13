import React    from 'react';
import ReactDOM from 'react-dom';

import Board from './components/board/Board';

function App(){
   return (
      <div>
        <Board> </Board>        
      </div>
   );
}

ReactDOM.render(
   <App/>,
   document.getElementById('app')
);
