function Square(props) {
  return (
      <button className="square" onClick={props.onClick}>
          {props.value}
      </button>
  );
}





// 부모 컴포넌트는 props를 사용하여 자식 컴포넌트에 state를 다시 전달할 수 있다
// state를 부모 컴포넌트로 끌어올리는 것은 React 컴포넌트를 리팩토링할 때 흔히 사용

class Board extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          squares: Array(9).fill(null),
          // [
          //     'O', null, 'X',
          //     'X', 'X', 'O',
          //     'O', null, null,
          //   ]
      }
  }

  handleClick(i) {
      const squares = this.state.squares.slice();
      squares[i] = 'X';
      this.setState({squares: squares});
  }
  
  // 컴포넌트를 반환하는 함수
  renderSquare(i) {
    return (<Square 
              value={this.state.squares[i]}
              // 컴포넌트는 자신이 정의한 state에만 접근할 수 있으므로 Square에서 Board의 state를 직접 변경할 수 없다.
              // state를 직접 변경하지 못하므로 함수를 전달한다.
              onClick={() => this.handleClick(i)}
          />);
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
