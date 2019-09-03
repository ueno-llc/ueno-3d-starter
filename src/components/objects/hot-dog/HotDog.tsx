import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { loaders } from '../../../utils/loaders';

export const materials: { [key: string]: THREE.Material } = {
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
  eyes: new THREE.MeshBasicMaterial({ color: 0x000000 }),
};

export function HotDog() {
  const scene = loaders.obj.read('/objects/hotdog.obj');
  const ref = useRef<THREE.Object3D>();

  useEffect(() => {
    if (ref.current) {
      ref.current.traverse(child => {
        if (child instanceof THREE.Mesh && materials[child.name]) {
          child.material = materials[child.name];
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [ref]);

  return (
    <primitive
      ref={ref}
      object={scene}
      position={[0, -2, 0]}
      scale={[0.1, 0.1, 0.1]}
      rotation={new THREE.Euler(0.2 * Math.PI, Math.PI * 0.9, 0)}
    />
  );
}