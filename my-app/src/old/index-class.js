import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// 개별 컴포넌트는 props라는 매개변수를 받아오고 render 함수를 통해 표시할 뷰 계층 구조를 반환
// Board 컴포넌트에서 Square 컴포넌트로 데이터를 전달 (자식 컴포넌트는 데이터가 깡통이어야 여러곳에서 활용 할 수 있다.)



class Square extends React.Component {

    // 무언가를 “기억하기”위해 component는 state를 사용 (생성자에서)
    // 하지만 square는 게임의 상태를 유지할 필요가 없다.
    // constructor(props) {
    //     // 하위 클래스의 생성자를 정의할 때 항상 super를 호출 / super(props) 호출 구문부터 작성
    //     super(props);
    //     this.state = {
    //         value: null,
    //     }
    // }

    render() {
      return (
        <button
            className="square"
            // onClick={()=> this.setState({value: 'X'})}
            onClick={()=> this.props.onClick()}
        >
            {/* props를 이용해 전달된 데이터 중, value라는 데이터를 표시함 */}
            {this.props.value}

            {/* <button>을 클릭할 때 Square가 다시 렌더링해야 한다고 알릴 수 있다. */}
            {/* this.state를 호출하면 자동으로 컴포넌트 내부의 자식 컴포넌트 역시 업데이트합니다. */}
            {/* {this.state.value} */}
        </button>
      );
    }
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
  