'use strict';

/**
 * doc: http://docs.cartodb.com/cartodb-platform/torque/torquejs-getting-started/
 */
class TorqueLayer {

  createLayer(callback) {
    this.layer = L.marker([0, 0]);
    this.layer = new L.TorqueLayer({
      user: this.options.account,
      table: this.options.tablename,
      sql: this.options.sql,
      cartocss: this.options.cartocss
    });
    this.layer.error((err) => {
      console.warn(err);
    });
    setTimeout(() => {
      if (callback && typeof callback === 'function') {
        callback(this.layer);
      }
    }, 0);
  }

  play() {
    if (this.layer) {
      this.layer.play();
    }
  }

}

export default TorqueLayer;
