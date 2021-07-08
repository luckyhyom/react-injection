'use strict';

const e = React.createElement;

ReactDOM.render(
  <h1 onClick={() => alert('test')}>Hello, world!</h1>,
  document.getElementById('root')
);