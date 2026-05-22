import { Component } from "../../../src/unchain.js";

const getPosts = () => [
  { description: "Hello world!" },
  { description: "Happy new year!" },
  { description: "Unchain The Code!" },
];

class PostItem extends Component {
  template() {
    return /*html*/ `
      <td>${this.props.post.description}</td>
      <td><button id="btn-remove">Excluir</button></td>
    `;
  }

  onUpdate() {
    this.$("#btn-remove").onclick = () => this.props.onRemove();
  }
}

class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = { posts: props.posts };
  }

  template() {
    return /*html*/ `<table><tbody id="posts"></tbody></table>`;
  }

  onUpdate() {
    this.state.posts.forEach((post) => {
      const slot = document.createElement("tr");
      this.$("#posts").appendChild(slot);

      const props = {
        post,
        onRemove: () => this.removePost(post),
      };

      new PostItem(props).mount(slot);
    });
  }

  removePost(postToRemove) {
    this.setState({
      posts: this.state.posts.filter((t) => t !== postToRemove),
    });
  }
}

export class Posts extends Component {
  constructor(props) {
    super({ ...props, stylesheet: "./views/posts/post.css" });
  }

  template() {
    return /*html*/ `
      <div>
        <h1>Posts</h1>
        <table id="postList"></table>
      </div>
    `;
  }

  onUpdate() {
    const postList = new PostList({ posts: getPosts() });
    postList.mount(this.$("#postList"));
  }
}
