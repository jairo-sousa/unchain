/** @import { Component } from "./types" */

export class Component {
  constructor(props = {}) {
    this.props = props;
    this.state = {};
    this.outlet = null;
  }

  template() {
    return "";
  }

  /**
   * Called after every render (mount and setState).
   * Use to bind events and mount child components.
   */
  onUpdate() {}

  /**
   * Called once after first mount.
   * Use for one-time setup that shouldn't repeat on re-render.
   */
  onMount() {}

  /**
   * Called before component is destroyed.
   * Use to clean up timers, listeners, etc.
   */
  onDestroy() {}

  mount(outlet) {
    this.outlet = outlet;
    this.update();
    this.onMount();
  }

  update() {
    this.outlet.innerHTML = this.template();
    this.onUpdate();
  }

  setState(partial) {
    Object.assign(this.state, partial);
    this.update();
  }

  $(selector) {
    return this.outlet.querySelector(selector);
  }

  destroy() {
    this.onDestroy();
    this.outlet.innerHTML = "";
  }
}
