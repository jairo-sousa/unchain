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
    this._mountStyle();
    this.onMount();
  }

  _mountStyle() {
    if (!this.props.stylesheet) return;
    if (document.querySelector(`link[data-unchain="${this.props.stylesheet}"]`))
      return this.update();

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = this.props.stylesheet;
    link.dataset.unchain = this.props.stylesheet;
    link.onload = () => this.update();
    document.head.appendChild(link);
    this._styleEl = link;
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
    if (this._styleEl) this._styleEl.remove();
    this.outlet.innerHTML = "";
  }
}
