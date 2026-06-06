import { Component } from "unchain";
import { posts } from "@db";

import { styles } from "@styles";

export class PostForm extends Component {
  constructor(props) {
    super({ ...props, stylesheet: styles.post });

    this.onSubmit = this.onSubmit.bind(this);
  }

  onMount() {
    if (this.props.param === "new") {
      this.setState({ post: { description: "" } });
      return;
    }

    const post = posts.readById(this.props.param) || null;

    this.setState({ post });
  }

  onUpdate() {
    const form = this.$("form");
    if (!form) return;

    form.onsubmit = this.onSubmit;
  }

  /**
   * @param {SubmitEvent} event
   */
  onSubmit(event) {
    event.preventDefault();

    const formdata = new FormData(event.target);
    const data = Object.fromEntries(formdata.entries());

    const post = {
      ...this.state.post,
      ...data,
    };

    if (post.id == null) posts.create(post);
    else posts.update(post.id, post);

    location.hash = "#posts";
  }

  template() {
    const post = this.state.post;
    if (!post) return /*html*/ `<p>Post not found.</p>`;

    const isCreating = post.id == null;

    return /*html*/ `
    <div>
      <h1>${isCreating ? "Create new post" : "Edit Post #" + post.id}</h1>
      <form>
        <label for="description">Description</label>
        <input type="text" id="description" name="description" value="${post.description || ""}">
        <button 
          class="btn-confirm"
          type="submit"
          >
          ${isCreating ? "Create" : "Save"}
        </button>
      </form>
    </div>
  `;
  }
}
