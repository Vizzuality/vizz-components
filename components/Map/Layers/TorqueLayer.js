'use strict';

/**
 * doc: http://docs.cartodb.com/cartodb-platform/torque/torquejs-getting-started/
 */
class TorqueLayer {

  constructor(props) {
    this.options = props;
  }

  createLayer(callback) {
    this.layer = new L.TorqueLayer({
      user: this.options.account,
      table: this.options.tablename,
      sql: this.options.sql,
      cartocss: this.options.cartocss
    });
    this.layer.error((err) => {
      console.warn(err);
    });
    if (callback && typeof callback === 'function') {
      callback(this.layer);
    }
  }

  /**
   * Add layer to map
   * @param  {L.Map} map
   * @param {Function} callback
   */
  addLayer(map, callback) {
    // If layer exists so it will be added to map
    if (this.layer && map) {
      return map.addLayer(this.layer);
    }

    if (!map) {
      throw new Error('map param is required');
    }

    // Creating layer if layer doesn't exist
    this.createLayer((layer) => {
      this.layer = layer;
      map.addLayer(this.layer);
      if (callback && typeof callback === 'function') {
        callback(this.layer);
      }
    });
  }

  /**
   * Remove layer from map
   * @param  {L.Map} map
   */
  removeLayer(map) {
    if (map && this.layer) {
      map.removeLayer(this.layer);
    }
  }

  play() {
    if (this.layer) {
      this.layer.play();
    }
  }

}

export default TorqueLayer;
