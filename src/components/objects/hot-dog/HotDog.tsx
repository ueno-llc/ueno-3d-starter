import React, { useEffect, useRef } from 'react';
import { a, useSpring } from 'react-spring/three';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { useResource } from '../../resources/Resources';

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

export function HotDog({ active }: any) {
  const scene = useResource('/objects/hotdog.obj', OBJLoader);
  const ref = useRef<THREE.Object3D>();

  const props = useSpring({
    config: {
      tension: 200,
      friction: 10,
    },
    rotation: active
      ? [-Math.PI / 2, Math.PI, Math.PI / 2]
      : [0.2 * Math.PI, Math.PI * 0.9, 0],
    scale: active ? [0.15, 0.15, 0.15] : [0.1, 0.1, 0.1],
  });

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
  }, [ref, scene]);

  if (!scene) {
    return null;
  }

  return (
    <a.primitive ref={ref} object={scene} position={[0, 0, 0]} {...props} />
  );
}
