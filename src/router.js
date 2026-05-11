/** @import { RouteConfig } from "./types" */

/**
 * A minimal hash-based router.
 */

export class Router {
  /**
   * @param {RouteConfig} routes
   * @param {HTMLElement} outlet
   */
  constructor(routes = {}, outlet) {
    if (!(outlet instanceof HTMLElement)) {
      throw new Error("Router: outlet must be an HTMLElement");
    }

    this.routes = routes;
    this.outlet = outlet;

    this.currentPath = null;

    this.currentComponent = null;

    this.onRouteChange = this.onRouteChange.bind(this);

    window.addEventListener("hashchange", this.onRouteChange);
  }

  /**
   * Gets current hash path.
   *
   * @returns {string}
   */
  getPath() {
    return window.location.hash.slice(1) || "/";
  }

  /**
   * Handles hash changes.
   */
  onRouteChange() {
    this.navigate(this.getPath());
  }

  /**
   * Navigates to a route.
   *
   * @param {string} path
   */
  navigate(path) {
    if (this.currentPath === path) return;

    const route = this.routes[path] || this.routes["404"];

    if (!route) throw new Error('Router: missing "404" route');

    if (this.currentComponent?.destroy) {
      this.currentComponent.destroy();
    }

    this.outlet.innerHTML = "";

    const component = new route.component();

    component.mount(this.outlet);

    this.currentComponent = component;

    this.currentPath = path;

    document.title = route.title;
  }

  /**
   * Registers or overrides a route.
   *
   * @param {string} path
   * @param {RouteConfig} config
   */
  add(path, config) {
    this.routes[path] = config;
  }

  /**
   * Cleanup router listeners.
   */
  destroy() {
    window.removeEventListener("hashchange", this.onRouteChange);

    if (this.currentComponent?.destroy) {
      this.currentComponent.destroy();
    }
  }
}
