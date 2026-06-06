import { Component } from "unchain";

import { posts } from "@db";
import { styles } from "@styles";

class PostItem extends Component {
  template() {
    const { id, description } = this.props.post;
    return /*html*/ `
      <td>${description}</td>
      <td><a href="#posts/${id}" class="btn-edit">Edit</a>
        <button class="btn-remove" class="btn-remove">Remove</button>
      </td>
    `;
  }

  onUpdate() {
    this.$(".btn-remove").onclick = () => this.props.onRemove();
  }
}

class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = { posts: props.posts };
  }

  template() {
    return /*html*/ `
    <table>
      <thead>
        <tr>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody id="posts"></tbody>
    </table>
  `;
  }

  onUpdate() {
    this.state.posts.forEach((post) => {
      const slot = document.createElement("tr");
      this.$("#posts").appendChild(slot);

      const props = {
        post,
        onRemove: () => this.removePost(post.id),
      };

      new PostItem(props).mount(slot);
    });
  }

  removePost(id) {
    const isRemoved = posts.delete(id);
    if (!isRemoved) return;

    this.setState({
      posts: this.state.posts.filter((post) => post.id !== id),
    });
  }
}

export class Posts extends Component {
  constructor(props) {
    super({ ...props, stylesheet: styles.posts });
  }

  template() {
    return /*html*/ `
      <div class="posts" >
        <div class="post-container" >
          <h1>Posts</h1>
          <a href="#posts/new" class="btn-create">Create new</a>
          <table id="postList"></table>
        </div>
      </div>
    `;
  }

  onUpdate() {
    const postList = new PostList({ posts: posts.all() });
    postList.mount(this.$("#postList"));
  }
}
