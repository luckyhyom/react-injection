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

  // 컴포넌트를 반환하는 함수
  renderSquare(i) {
    return (<Square 
              value={this.props.squares[i]}
              // 컴포넌트는 자신이 정의한 state에만 접근할 수 있으므로 Square에서 Board의 state를 직접 변경할 수 없다.
              // state를 직접 변경하지 못하므로 함수를 전달한다.
              onClick={() => this.props.onClick(i)}
          />);
  }

  render() {
    return (
      <div>
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

  // 생성자, 함수, 렌더, 모두 옮겨옴.
  
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    }
  }

  
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if(calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      // 배열 push() 함수와 같이 더 익숙한 방식과 달리 concat() 함수는 기존 배열을 변경하지 않기 때문에 이를 더 권장
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber:history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step){
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  }

  render() {

    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step,move)=>{
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';

      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}></button>
        </li>
      )
    })


    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            // i는 무엇을 받아온걸까? 자식에게서 받아온건가?
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
// "리스트 아이템에 key prop을 지정"하여 각 아이템이 다른 아이템들과 다르다는 것을 알려주어야함
// 키는 각 컴포넌트를 구별할 수 있도록 하여 React에게 다시 렌더링할 때 state를 유지할 수 있게함
// 동적인 리스트를 만들 때마다 적절한 키를 할당할 것
// 키는 전역에서 고유할 필요는 없으며 "컴포넌트와 관련 아이템 사이"에서는 고유한 값을 가져함

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