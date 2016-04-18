'use strict';

import backbone from 'Backbone';
import ParamsModel from './ParamsModel';

class Router extends Backbone.Router {

  initialize() {
    this.params = new ParamsModel();
  }

  execute(callback, args, name) {
    if (callback) {
      callback.apply(this, args);
    }
  }

  serializeParams() {
    // TODO: detect pushState
  }

  /**
   * Use it to start history HTML5 API
   * @param  {Object} options
   */
  start(options) {
    Backbone.history.start(options);
  }

}

Router.prototype.routes = routes;

export default Router;
