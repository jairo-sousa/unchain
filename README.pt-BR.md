# 🌿 Unchain

[English](README.md) | [Português](README.pt-BR.md)

Uma forma leve de construir aplicações web sem complexidade desnecessária.

> Não indicado para uso em produção. Destinado a pequenas aplicações, prototipagem rápida e aprendizado.

---

## Primeiros passos

> Unchain usa módulos ES — abrir o `index.html` diretamente no navegador não funcionará. Veja [Rodando localmente](#rodando-localmente).

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
  document.getElementById("outlet"),
);

router.add("404", { component: NotFound, title: "App | Não encontrado" });
router.add("posts", {
  component: PostList,
  paramComponent: PostForm,
  title: "App | Posts",
});
```

Navegar para `#posts/123` renderiza `PostForm` com `this.props.param === "123"`.  
Navegar para `#posts` renderiza `PostList`.

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

### Ciclo de vida

| Método        | Quando                                                       |
| ------------- | ------------------------------------------------------------ |
| `onMount()`   | Uma vez, após a primeira montagem                            |
| `onUpdate()`  | Após cada renderização — vincule eventos e monte filhos aqui |
| `onDestroy()` | Antes de o componente ser removido                           |

### Métodos

| Método              | Descrição                               |
| ------------------- | --------------------------------------- |
| `mount(outlet)`     | Monta em um HTMLElement                 |
| `setState(partial)` | Mescla o estado e re-renderiza          |
| `$(selector)`       | Consulta dentro da raiz do componente   |
| `destroy()`         | Remove o componente e realiza a limpeza |

### Folha de estilos

```js
class Posts extends Component {
  constructor(props) {
    super({ ...props, stylesheet: "styles/posts.css" });
  }
}
```

O `<link>` é injetado no `<head>` na montagem e removido na destruição.

### Componentes filhos

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

posts.create({ description: "Olá" }); // { id: 1, description: "Olá" }
posts.readById(1); // { id: 1, description: "Olá" }
posts.all(); // [{ id: 1, ... }]
posts.where({ status: "active" }); // array filtrado
posts.update(1, { description: "Oi" }); // { id: 1, description: "Oi" }
posts.delete(1); // true
```

### Singleton via módulo

```js
// db.js
import { Repository } from "unchain";
export const posts = new Repository();
```

```js
// qualquer view
import { posts } from "./db.js";
```

Módulos ES são armazenados em cache pelo navegador — mesma instância em todo lugar.

---

## Estrutura do projeto

```
index.html
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

Centralizando folhas de estilo em `styles/index.js`:

```js
export const styles = {
  posts: "styles/posts.css",
  post: "styles/post.css",
};
```

Import map estendido:

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

## Exemplo

Um exemplo completo de CRUD está disponível no diretório `/example`.

## Rodando localmente

Unchain usa módulos ES e import maps, então você precisa de um servidor — abrir o `index.html` diretamente não funcionará.

**Opção 1 — Live Server** (sem Node necessário)

- Use a [extensão Live Server do VS Code](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) ou qualquer servidor estático de sua preferência.

**Opção 2 — Node.js (sem dependências)**

Copie `example/server-http.js` para a raiz do seu projeto e execute:

```bash
node server-http.js
```

**Opção 3 — Express**

Copie `example/server-express.js`, instale o express e execute:

```bash
npm install express
node server-express.js
```
