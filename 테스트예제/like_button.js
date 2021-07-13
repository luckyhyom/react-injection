'use strict';

var e = React.createElement;

ReactDOM.render(React.createElement(
  'h1',
  { onClick: function onClick() {
      return alert('test');
    } },
  'Hello, world!'
), document.getElementById('root'));