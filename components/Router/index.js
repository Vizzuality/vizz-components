'use strict';

import Backbone from 'backbone';
import ParamsModel from './ParamsModel';
import URI from 'urijs';

const routes = {
  '*routes': 'everyAction',
};

class Router extends Backbone.Router {

  initialize() {
    this.params = new ParamsModel();
  }

  execute(callback, args, name) {
    this.currentRoute = args[0];
    if (args[1]) {
      this.params.set(this.parseParams(args[1]));
    }
    if (callback) {
      callback.apply(this, args);
    }
  }

  update(params) {
    this.params.set(params, { trigger: false });
    const routeString = this.serializeParams(this.params.attributes);
    this.navigate(`${this.currentRoute || ''}${routeString}`);
  }

  /**
   * Parse URL params using URI.js API
   * @param  {String} queryString https://medialize.github.io/URI.js/docs.html
   * @return {Object}
   */
  parseParams(queryString) {
    // TODO: detect pushState
    return URI.parseQuery(`?${queryString}`);
  }

  /**
   * Serialze URL params using URI.js API
   * @param  {Object} params https://medialize.github.io/URI.js/docs.html
   * @return {String}
   */
  serializeParams(params) {
    const queryString = URI.buildQuery(params);
    return `?${queryString}`;
  }

  /**
   * Use it to start history HTML5 API
   */
  start(options) {
    let opts = options;
    if (!options) {
      opts = { pushState: false };
    }
    Backbone.history.start(options);
  }

}

Router.prototype.routes = routes;

export default Router;
