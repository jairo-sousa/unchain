import { Component } from "../../src/unchain.js";

export class Home extends Component {
  template() {
    return /*html*/ `<h1>Dashboard</h1>`;
  }
}

export class NotFound extends Component {
  template() {
    return /*html*/ `<h1>404 | Page not found</h1>`;
  }
}

export class Settings extends Component {
  template() {
    return /*html*/ `<h1>Settings</h1>`;
  }
}
