import React from 'react';
import * as THREE from 'three';
import orbitControl from 'three-orbit-controls';
import earthImage from './images/earth-clouds.jpg';
import earthBumpImage from './images/earth-bump.jpg';
import './style.scss';

const Control = orbitControl(THREE);

class GlobeComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      scrollTop: props.scrollTop
    };
  }

  componentDidMount() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.scene = new THREE.Scene();
    this.imageLoader = new THREE.TextureLoader();
    this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 1500);
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    this.renderer.setSize(width, height);

    // Appending to DOM
    this.el.appendChild(this.renderer.domElement);

    this.addControls();
    this.addLights();
    this.addGlobe();

    this.camera.position.z = 880;

    this.draw();
  }

  addControls() {
    this.control = new Control(this.camera, this.renderer.domElement);
    this.control.enableDamping = true;
    this.control.dampingFactor = 0.1;
    this.control.autoRotate = this.props.autorotate;
    this.control.enablePan = false;
    this.control.enableZoom = false;
    this.control.rotateSpeed = 0.1;
    this.control.autoRotateSpeed = this.props.velocity;
  }

  addLights() {
    const ambientLight = new THREE.AmbientLight(0x333333);
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    this.directionalLight.position.set(5, 3, 40);
    this.scene.add(ambientLight);
    this.scene.add(this.directionalLight);
  }

  addGlobe() {
    const material = new THREE.MeshPhongMaterial({
      map: this.imageLoader.load(this.props.basemapImage),
      bumpMap: this.imageLoader.load(earthBumpImage),
      bumpScale: 2
    });
    const geometry = new THREE.SphereGeometry(this.props.radius, 40, 30);
    const earth = new THREE.Mesh(geometry, material);
    earth.rotation.y = Math.PI;
    earth.updateMatrix();

    this.scene.add(earth);
  }

  draw() {
    requestAnimationFrame(this.draw.bind(this));
    this.directionalLight.position.copy(this.camera.position);
    this.control.update();
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    return (
      <div ref={(node) => this.el = node} className="vizz-component-globe"></div>
    );
  }

}

GlobeComponent.defaultProps = {
  width: 500,
  height: 500,
  radius: 200,
  autorotate: true,
  velocity: 0.15,
  scrollTop: 0,
  basemapImage: earthImage
};

export default GlobeComponent;
