import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { useResource } from '../../resources/Resources';

const materials: { [key: string]: any } = {
  white: new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 1,
    metalness: 0.3,
  }),
  'orange-fridge': new THREE.MeshStandardMaterial({
    color: 0xf97d0f,
    roughness: 1,
    metalness: 0.1,
  }),
  orange: new THREE.MeshStandardMaterial({
    color: 0xf97d0f,
    roughness: 1,
    metalness: 0.2,
    side: THREE.DoubleSide,
  }),
  dark: new THREE.MeshStandardMaterial({
    color: 0x303030,
    roughness: 0.6,
    metalness: 0.7,
  }),
  red: new THREE.MeshStandardMaterial({
    color: 0xff2f3a,
    roughness: 1,
    metalness: 0.2,
  }),
  green: new THREE.MeshStandardMaterial({
    color: 0x57d1a6,
    roughness: 1,
    metalness: 0.4,
  }),
  'green-2': null,
  grey: new THREE.MeshStandardMaterial({
    color: 0xc6bebe,
    roughness: 1,
    metalness: 0.45,
  }),
  wood: new THREE.MeshStandardMaterial({
    color: 0xeaaa65,
    roughness: 0.6,
    metalness: 0.2,
  }),
  blue: new THREE.MeshStandardMaterial({
    color: 0x31a3fa,
    roughness: 0.6,
    metalness: 0.5,
  }),
  pink: new THREE.MeshStandardMaterial({
    color: 0xd3447d,
    roughness: 0.7,
    metalness: 0.1,
  }),
  yellow: new THREE.MeshStandardMaterial({
    color: 0xf7bc2d,
    roughness: 0.7,
    metalness: 0.1,
    side: THREE.DoubleSide,
  }),
};

const shadows: { [key: string]: any } = {
  white: { receiveShadow: true, castShadow: true },
  'orange-fridge': { castShadow: true },
  dark: { castShadow: true },
  red: { castShadow: true },
  grey: { castShadow: true },
  wood: { receiveShadow: true, castShadow: true },
  blue: { receiveShadow: true },
  pink: { castShadow: true },
  yellow: { castShadow: true },
};

export function UenoHouse() {
  const scene = useResource('/objects/ueno-house.obj', OBJLoader);
  const ref = useRef<THREE.Object3D>();

  useEffect(() => {
    if (ref.current) {
      ref.current.traverse(child => {
        if (child instanceof THREE.Mesh) {
          if (materials[child.name]) {
            child.material = materials[child.name];
          }
          if (shadows[child.name]) {
            child.castShadow =
              shadows[child.name].castShadow || child.castShadow;
            child.receiveShadow =
              shadows[child.name].receiveShadow || child.receiveShadow;
          }
        }
      });
    }
  }, [ref, scene]);

  if (!scene) {
    return null;
  }

  return (
    <primitive
      ref={ref}
      object={scene}
      position={[0, 0, 0]}
      scale={[0.1, 0.1, 0.1]}
    />
  );
}
