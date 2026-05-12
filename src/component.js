/** @import { Component } from "./types" */

export class Component {
  mount(outlet) {
    this.outlet = outlet;
    this.render();
  }

  render() {}

  destroy() {}
}
