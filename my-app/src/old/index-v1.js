import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// const messageRef = useRef();
// message: messageRef.current.value||'',

// const [fileName,setFileName] = useState('');
// const onFileChange = file =>{
//   setFileName(file.name);
//   setFileURL(file.url);
// }

// 개별 컴포넌트는 props라는 매개변수를 받아오고 render 함수를 통해 표시할 뷰 계층 구조를 반환
// Board 컴포넌트에서 Square 컴포넌트로 데이터를 전달 (자식 컴포넌트는 데이터가 깡통이어야 여러곳에서 활용 할 수 있다.)



// class Square extends React.Component {
//     render() {
//       return (
//         <button className="square" onClick={()=> this.props.onClick()}>
//             {this.props.value}
//         </button>
//       );
//     }
// }

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
          xIsNext: true,
      }
  }

  handleClick(i) {
      const squares = this.state.squares.slice();
      if(calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        squares: squares,
        xIsNext: !this.state.xIsNext,
      });
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
    const winner = calculateWinner(this.state.squares);
    let status;
    if(winner){
      status = 'Winner: '+winner;
    }else{
      // () 안에 코드작성: 자동 세미클론 삽입 방지
      const status = 'Next player:' + (this.state.xIsNext ? 'X' : 'O');
    }

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

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}