// minify.. npx terser -c -m -o like_button.min.js -- like_button.js

'use strict';

const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'You liked comment number ' + this.props.commentID;
    }

    return e(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'Like'
    );
  }
}

// Find all DOM containers, and render Like buttons into them.
document.querySelectorAll('.like_button_container')
  .forEach(domContainer => {
    // Read the comment ID from a data-* attribute.
    const commentID = parseInt(domContainer.dataset.commentid, 10);
    console.log(domContainer);
    console.log(domContainer.dataset);
    console.log(commentID);
    ReactDOM.render(
      e(LikeButton, { commentID: commentID }),
      domContainer
    );
  });