import { Component } from "unchain";

import { posts } from "../../db.js";

class PostItem extends Component {
  template() {
    const { id, description } = this.props.post;
    return /*html*/ `
      <td>${description}</td>
      <td><a href="#posts/${id}" class="btn-edit">Editar</a></td>
      <td>
        <button id="btn-remove" class="btn-remove">Excluir</button>
      </td>
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
    super({ ...props, stylesheet: "./views/posts/posts.css" });
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
    const postList = new PostList({ posts: posts.all() });
    postList.mount(this.$("#postList"));
  }
}
