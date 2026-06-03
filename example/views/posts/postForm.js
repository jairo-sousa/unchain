import { Component } from "unchain";
import { posts } from "@db";

import { styles } from "@styles";

export class PostForm extends Component {
  constructor(props) {
    super({ ...props, stylesheet: styles.post });
  }

  onMount() {
    const post = posts.readById(this.props.param);
    this.setState({ post });
  }

  template() {
    const post = this.state.post;
    if (!post) return `<p>Post não encontrado.</p>`;

    return /*html*/ `
    <div>
      <h1>Post</h1>
      <form>
        <label for="description">Descrição</label>
        <input type="text" id="description" name="description" value="${post.description || ""}">
        <button type="submit">Salvar</button>
      </form>
    </div>
  `;
  }
}
