// 1. selectOption이라는 컴포넌트 안에
// 2. option이라는 컴포넌트 안에
// 3. input 컴포넌트

// - option부터는 개수가 동적으로 변한다.
// - jquery로 Cafe24 API를 불러들여서, 그 안에서 React컴포넌트를 쓸 수 있나?.. useScript이용?
//     selectOption컴포넌트에 Cafe24Api를 넣어야 할 것 같다.

// 1. 현재 jsx에 익숙치 않음, class와 헷갈림.
// => jsx과 class가 아닌, class와 hook(함수형 컴포넌트)을 비교해야함.

// jsx : react.createComponet함수를 이용하는 대신, html코드를 넣음
// ?? 이것이 어떻게 가능한지? 무언가 라이브러리를 쓰는건가.

// ReactDOM이 있고, React가 있다. React가 useState를 가지고있다.

// hook과 jsx를 사용함
// => 함수형 컴포넌트와, html태그를 사용함.

// hook을 사용하는 이유(장점)
// https://velog.io/@jinsk9268/React-Hooks%EC%97%90-%EB%8C%80%ED%95%98%EC%97%AC
// 로직의 재사용 가능, 관리가 쉽다. (api 혹은 다른 컴포넌트 결합 쉬움)
// hook은 함수형 컴포넌트 이므로, 함수안에서 다른 함수를 호출하는 것으로 새로운 hook 생성 가능.
// constructor,this를 쓰지 않아도 되므로 비교적 간결해짐.


// 1. 일단 class를 hook으로 변경 해보기*
'use strict';
const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }

    return e(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'Like'
    );
  }
}


const domContainer = document.querySelector('#like_button_container');
ReactDOM.render(e(LikeButton), domContainer);


// to jsx

'use strict';
const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }

    return (
      <button onClick={()=>this.setState({liked:true})}>Like</button>
    );
  }
}
const domContainer = document.querySelector('#like_button_container');
ReactDOM.render(e(LikeButton), domContainer);


// to hook
// * state값은 변하지만, 컴포넌트는 업데이트 되지 않음. => 오타.. liekd
// => 조건문안에서 return을 작성하면 상태에 따라서 저절로 변경된다. angular와 비교하면?
// *{like}, {like.liked} 되지 않음.. 왜? => boolean이라 그런듯. string은 표시됨.
// *이 코드는 babel스크립트에 쓸수 없고 변환해서 넣어야 적용됨. 왜? => <>태그 미지원

const {useState} = React;

const LikeButton = (props) =>{
  
  const [like,setLike] = useState({liked:false});

  if(like.liked){
    return 'You liked this.';
  }
  
  // 리스트 해야한다면 <>사용 (fragments)
  return(
    <div>
      <button onClick={()=>setLike({liked:true})}>Like</button>
      <button onClick={()=>console.log(like.liked)}>Like {like.liked ? "yes" :"no"}</button>
    </div>
  )
}

const domContainer = document.querySelector('#root');
ReactDOM.render(<LikeButton/>,domContainer);