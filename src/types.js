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
 * @property {typeof Component} component
 * @property {typeof Component} [paramComponent]
 * @property {string} title
 */

export {};
