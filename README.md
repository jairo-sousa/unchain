# 🌿 Unchain

A lightweight way to build web applications without unnecessary complexity.

> Not for production use. Intended for small apps, rapid prototyping, and learning.

---

## Getting Started

```html
<script type="importmap">
  {
    "imports": {
      "unchain": "https://cdn.jsdelivr.net/gh/jairo-sousa/unchain@v1.0.0/src/unchain.js"
    }
  }
</script>
<script type="module" src="app.js"></script>
```

```js
import { Router, Component, Repository } from "unchain";
```

---

## Router

```js
const router = new Router(
  { "/": { component: Home, title: "App | Home" } },
  document.getElementById("outlet")
);

router.add("404", { component: NotFound, title: "App | Not found" });
router.add("posts", {
  component: PostList,
  paramComponent: PostForm,
  title: "App | Posts",
});
```

Navigating to `#posts/123` renders `PostForm` with `this.props.param === "123"`.  
Navigating to `#posts` renders `PostList`.

---

## Component

```js
class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  template() {
    return `
      <div>
        <p>${this.state.count}</p>
        <button id="btn">+1</button>
      </div>
    `;
  }

  onUpdate() {
    this.$("#btn").onclick = () => {
      this.setState({ count: this.state.count + 1 });
    };
  }
}
```

### Lifecycle

| Method | When |
|---|---|
| `onMount()` | Once, after first mount |
| `onUpdate()` | After every render — bind events and mount children here |
| `onDestroy()` | Before component is removed |

### Methods

| Method | Description |
|---|---|
| `mount(outlet)` | Mounts into an HTMLElement |
| `setState(partial)` | Merges state and re-renders |
| `$(selector)` | Queries inside component root |
| `destroy()` | Removes component and cleans up |

### Stylesheet

```js
class Posts extends Component {
  constructor(props) {
    super({ ...props, stylesheet: "styles/posts.css" });
  }
}
```

The `<link>` is injected into `<head>` on mount and removed on destroy.

### Child components

```js
onUpdate() {
  this.state.posts.forEach((post) => {
    const slot = document.createElement("tr");
    this.$("#posts").appendChild(slot);
    new PostItem({ post }).mount(slot);
  });
}
```

---

## Repository

```js
const posts = new Repository();

posts.create({ description: "Hello" });   // { id: 1, description: "Hello" }
posts.readById(1);                         // { id: 1, description: "Hello" }
posts.all();                               // [{ id: 1, ... }]
posts.where({ status: "active" });         // filtered array
posts.update(1, { description: "Hi" });    // { id: 1, description: "Hi" }
posts.delete(1);                           // true
```

### Singleton via module

```js
// db.js
import { Repository } from "unchain";
export const posts = new Repository();
```

```js
// any view
import { posts } from "./db.js";
```

ES modules are cached by the browser — same instance everywhere.

---

## Project structure

```
app.html
app.js
db.js
routes/
  index.js
views/
  home.js
  posts/
    posts.js
    postForm.js
styles/
  index.js
  posts.css
```

Centralizing stylesheets in `styles/index.js`:

```js
export const styles = {
  posts: "styles/posts.css",
  post: "styles/post.css",
};
```

Extended import map:

```json
{
  "imports": {
    "unchain": "https://cdn.jsdelivr.net/gh/jairo-sousa/unchain@v1.0.0/src/unchain.js",
    "@db": "./db.js",
    "@styles": "./styles/index.js",
    "@views/posts": "./views/posts/posts.js",
    "@views/post-form": "./views/posts/postForm.js"
  }
}
```

---

## Example

A full CRUD example is available in the `/example` directory.
