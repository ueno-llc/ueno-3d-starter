import * as THREE from 'three';

export const materials = {
  bread: new THREE.MeshStandardMaterial({
    color: 0xffbd3b,
    roughness: 1,
    metalness: 0,
    side: THREE.DoubleSide,
  }),
  sausage: new THREE.MeshStandardMaterial({
    color: 0xff731e,
    roughness: 1,
    metalness: 0.2,
    side: THREE.DoubleSide,
  }),
  black: new THREE.MeshBasicMaterial({ color: 0x000000 }),
};
