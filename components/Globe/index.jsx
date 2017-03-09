import React from 'react';
import { debounce } from 'lodash';
import * as THREE from 'three';
import orbitControls from 'three-orbit-controls';

/* global Stats */
const OrbitControls = orbitControls(THREE);
const imageLoader = new THREE.TextureLoader();

class GlobeComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      texture: props.texture,
      height: props.height,
      width: props.width
    };
  }

  componentDidMount() {
    const { useHalo, useDefaultLayer } = this.props;

    this.createScene();
    this.createEarth();
    if (useHalo) {
      this.addHalo();
    }
    if (useDefaultLayer) {
      this.setTexture();
    }
    this.addLights();
    this.addControls();

    // Start!
    this.draw();

    window.addEventListener('resize', debounce(() => {
      const nextWidth = this.el.clientWidth || this.el.innerWidth;
      const nextHeight = this.el.clientHeight || this.el.innerHeight;
      this.setState({ width: nextWidth, height: nextHeight });
    }, 250));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.texture !== this.props.texture) {
      this.setState({ texture: nextProps.texture || null });
    }
    if (nextProps.width !== this.props.width) {
      this.setState({ width: nextProps.width });
    }
    if (nextProps.height !== this.props.height) {
      this.setState({ height: nextProps.height });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.texture !== this.state.texture) {
      this.setTexture();
      this.slideToRight();
    }
    if ((prevState.width !== this.state.width) ||
      (prevState.height !== this.state.height)) {
      this.update();
    }
  }

  /**
   * Method to change layers to earth
   */
  setTexture() {
    const mapImage = this.state.texture ?
       imageLoader.load(this.state.texture) : imageLoader.load(this.props.defaultLayerImagePath);
    const { radius, segments, rings, textureExtraRadiusPercentage } = this.props;
    const newRadius = radius + ((radius * textureExtraRadiusPercentage) / 100);
    if (!this.currentTexture) {
      const geometry = new THREE.SphereGeometry(newRadius, segments, rings);
      const material = new THREE.MeshBasicMaterial({
        map: mapImage,
        transparent: true
      });
      this.currentTexture = new THREE.Mesh(geometry, material);
    } else {
      this.currentTexture.material.map = mapImage;
      this.currentTexture.material.needsUpdate = true;
    }
    this.currentTexture.updateMatrix();
    this.scene.add(this.currentTexture);
  }

  /**
  * Calculate the halo radius according to the properties involved
  */
  getHaloRadius() {
    const { radius, haloExtraRadiusPercentage } = this.props;
    return radius + ((radius * haloExtraRadiusPercentage) / 100);
  }

  /**
   * Initialize three.js and create scene, camera and renderer.
   * Then append canvas.
   */
  createScene() {
    if (this.scene) {
      throw new Error('Scene has been created before.');
    }

    const { width, height } = this.state;
    const { cameraFov, cameraFar, cameraNear, cameraPositionZ } = this.props;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(cameraFov, width / height, cameraNear, cameraFar);
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.scene.add(this.camera);

    this.camera.position.z = cameraPositionZ;

    // Appending canvas
    this.el.appendChild(this.renderer.domElement);

    if (this.props.showStats) {
      this.addStats();
    }
  }

  /**
   * Create and add Earth
   */
  createEarth() {
    if (!this.scene) {
      throw new Error('Scene should be created before.');
    }
    const { radius, segments, rings, earthImagePath, earthBumpImagePath, bumpScale } = this.props;
    const material = new THREE.MeshPhongMaterial({
      map: imageLoader.load(earthImagePath),
      bumpMap: imageLoader.load(earthBumpImagePath),
      bumpScale: bumpScale
    });
    const geometry = new THREE.SphereGeometry(radius, segments, rings);
    const earth = new THREE.Mesh(geometry, material);
    earth.updateMatrix();
    this.scene.add(earth);
  }

  addHalo() {
    if (!this.scene) {
      throw new Error('Scene and camera should be created before.');
    }

    const vertexShaderString = `
      varying vec3 vNormal;
      void main()
      {
        vNormal = normalize( normalMatrix * normal );
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
      }
    `;
    const fragmentShaderString = `
      varying vec3 vNormal;
      void main()
      {
        float intensity = pow( 0.7 - dot( vNormal, vec3( 0.0, 0.0, 1.0 ) ), 4.0 );
        gl_FragColor = vec4( 0.32, 0.32, 0.9, 0.7 ) * intensity;
      }
    `;
    const material = new THREE.ShaderMaterial({
      uniforms: {},
      vertexShader: vertexShaderString,
      fragmentShader: fragmentShaderString,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true
    });

    const { segments } = this.props;
    const haloRadius = this.getHaloRadius();
    const geometry = new THREE.SphereGeometry(haloRadius, segments, segments);
    this.halo = new THREE.Mesh(geometry, material);

    this.scene.add(this.halo);
  }

  /**
   * Draw globe and start animation
   */
  draw() {
    requestAnimationFrame(this.draw.bind(this));
    if (this.controls) {
      this.controls.update();
    }
    if (!this.state.texture) {
      this.currentTexture.rotation.y += 0.0002;
    } else if (this.currentTexture.rotation.y !== 0) {
      this.currentTexture.rotation.y = 0;
    }
    this.renderer.render(this.scene, this.camera);
  }

  /**
   * Change globe position
   * @param  {Number} offsetX
   * @param  {Number} offsetY
   */
  changePosition(offsetX, offsetY) {
    const width = this.state.width;
    const height = this.state.height;
    const oX = offsetX ? (width * offsetX * -1) / 1000 : 0;
    const oY = offsetY ? (width * offsetY * -1) / 1000 : 0;

    this.camera.setViewOffset(width, height, oX, oY, width, height);
  }

  /**
   * Add stats
   */
  addStats() {
    const scriptElement = document.createElement('script');
    scriptElement.onload = function onLoad() {
      const stats = new Stats();
      document.body.appendChild(stats.dom);
      requestAnimationFrame(function loop() {
        stats.update();
        requestAnimationFrame(loop);
      });
    };
    scriptElement.src = '//rawgit.com/mrdoob/stats.js/master/build/stats.min.js';
    document.head.appendChild(scriptElement);
    return this;
  }

  addLights() {
    if (!this.scene) {
      throw new Error('Scene and camera should be created before.');
    }

    const { pointLightIntensity, pointLightColor, ambientLightColor,
      pointLightPosition, pointLightX, pointLightY, pointLightZ } = this.props;

    const ambientLight = new THREE.AmbientLight(ambientLightColor);
    const pointLight = new THREE.PointLight(pointLightColor, pointLightIntensity);

    if (pointLightPosition === 'left') {
      pointLight.position.set(-pointLightX, pointLightY, pointLightZ);
    } else {
      pointLight.position.set(pointLightX, pointLightY, pointLightZ);
    }

    this.scene.add(ambientLight);
    this.camera.add(pointLight);
  }

  addControls() {
    const controls = new OrbitControls(this.camera, this.renderer.domElement);

    const { enableDamping, dampingFactor, autorotate, enablePan, enableZoom,
      zoomSpeed, rotateSpeed, autoRotateSpeed, maxDistance, minDistance } = this.props;

    // Configuring controls
    controls.minDistance = minDistance;
    controls.maxDistance = maxDistance;
    controls.enableDamping = enableDamping;
    controls.dampingFactor = dampingFactor;
    controls.autoRotate = autorotate;
    controls.enablePan = enablePan;
    controls.enableZoom = enableZoom;
    controls.zoomSpeed = zoomSpeed;
    controls.rotateSpeed = rotateSpeed;
    controls.autoRotateSpeed = autoRotateSpeed;

    this.controls = controls;
  }

  slideToRight() {
    if (this.state.texture) {
      this.changePosition(180, 0);
    } else {
      this.resetPosition();
    }
  }

  /**
   * Reset globe position
   */
  resetPosition() {
    const width = this.state.width;
    const height = this.state.height;

    this.camera.setViewOffset(width, height, 0, 0, width, height);
  }

  update() {
    this.camera.aspect = this.state.width / this.state.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.state.width, this.state.height);
    // TODO: update halo size
    // this.halo.geometry.radius = this.getHaloRadius();
    // console.info('this.halo.geometry.radius', this.halo.geometry.radius);
  }

  render() {
    return (
      <div ref={(node) => { this.el = node; }} className="vizz-component-globe" />
    );
  }

}

GlobeComponent.defaultProps = {

  // Size
  width: window.innerWidth,
  height: window.innerHeight,

  // Lights
  ambientLightColor: 0x262626,
  // Point light
  pointLightColor: 0xdddddd,
  pointLightIntensity: 0.885,
  pointLightPosition: 'left',
  pointLightX: 400,
  pointLightY: 350,
  pointLightZ: 250,

  // Controls
  autorotate: false,
  autoRotateSpeed: 2.0, // It depends on autorotate
  rotateSpeed: 0.25,
  enablePan: false,
  enableZoom: false,
  zoomSpeed: 0.25,
  enableDamping: true, // Set true to enable inertia
  dampingFactor: 0.25,
  maxDistance: 124,
  minDistance: 80,
  radius: 50,
  segments: 32,
  rings: 32,
  textureExtraRadiusPercentage: 0.4, /* Resulting from calculating the increment
  taking into account that for a given radius of 50 the new radius should be 50.2 */

  // Earth textures
  earthImagePath: null,
  earthBumpImagePath: null,
  bumpScale: 0.01,
  texture: null,
  // Default layer
  userDefaultLayer: false,
  defaultLayerImagePath: null,

  // Camera
  cameraFov: 75,
  cameraNear: 0.01,
  cameraFar: 1000,
  cameraPositionZ: 124,

  // Halo
  useHalo: true,
  haloExtraRadiusPercentage: 16, /* Resulting from calculating the increment
  taking into account that for a given radius of 50 the new radius should be 58 */

  // Stats
  showStats: false
};

GlobeComponent.propTypes = {

  // Size
  width: React.PropTypes.number,
  height: React.PropTypes.number,

  // Lights
  ambientLightColor: React.PropTypes.number,
  pointLightColor: React.PropTypes.number,
  pointLightIntensity: React.PropTypes.number,
  pointLightPosition: React.PropTypes.string,
  pointLightX: React.PropTypes.number,
  pointLightY: React.PropTypes.number,
  pointLightZ: React.PropTypes.number,

  // Controls

  // Sphere structure
  radius: React.PropTypes.number,
  segments: React.PropTypes.number,
  rings: React.PropTypes.number,
  textureExtraRadiusPercentage: React.PropTypes.number,

  // Rotation
  enableDamping: React.PropTypes.bool,
  autorotate: React.PropTypes.bool,
  autoRotateSpeed: React.PropTypes.number,
  rotateSpeed: React.PropTypes.number,
  dampingFactor: React.PropTypes.number,

  // Zoom + Pan
  enablePan: React.PropTypes.bool,
  enableZoom: React.PropTypes.bool,
  zoomSpeed: React.PropTypes.number,
  maxDistance: React.PropTypes.number,
  minDistance: React.PropTypes.number,

  // Top layer (e.g. clouds)

  // Earth textures
  earthImagePath: React.PropTypes.string,
  earthBumpImagePath: React.PropTypes.string,
  bumpScale: React.PropTypes.number,
  texture: React.PropTypes.string,
  // Default layer
  defaultLayerImagePath: React.PropTypes.string,
  useDefaultLayer: React.PropTypes.bool,

  // Camera
  cameraFov: React.PropTypes.number,
  cameraNear: React.PropTypes.number,
  cameraFar: React.PropTypes.number,
  cameraPositionZ: React.PropTypes.number,

  // Halo
  useHalo: React.PropTypes.bool,
  haloExtraRadiusPercentage: React.PropTypes.number,

  // Stats
  showStats: React.PropTypes.bool
};

export default GlobeComponent;
