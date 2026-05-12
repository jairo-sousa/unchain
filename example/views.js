import { Component } from "../src/unchain.js";

export class Home extends Component {
  render() {
    this.outlet.innerHTML = /*html*/ `
        <h1>Dashboard</h1>
    `;
  }
}

export class NotFound extends Component {
  render() {
    this.outlet.innerHTML = /*html*/ `
        <h1>404 | Page not found</h1>
    `;
  }
}

export class Posts extends Component {
  render() {
    this.outlet.innerHTML = /*html*/ `
        <h1>Posts</h1>
    `;
  }
}

export class Settings extends Component {
  render() {
    this.outlet.innerHTML = /*html*/ `
        <h1>Settings</h1>
    `;
  }
}
