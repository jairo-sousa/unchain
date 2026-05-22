/**
 * @typedef {Object} Component
 * @property {Object} props - External data passed to the component.
 * @property {Object} state - Internal mutable state.
 * @property {(outlet: HTMLElement) => void} mount
 * @property {() => void} update
 * @property {() => void} destroy
 */

/**
 * @typedef {Object} RouteConfig
 * @property {Component} component
 * @property {string} title
 */

export {};
