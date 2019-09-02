import React, { Suspense, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { unstable_createResource as createResource } from '../../utils/reactCache';
import { Box } from '../box/Box';
import { materials } from './materials';

const resource = createResource(
  (file: string) => new Promise(res => new OBJLoader().load(file, res)),
);

function HotDogModel() {
  const scene = resource.read('/objects/hotdog.obj');
  const ref = useRef<THREE.Object3D>();

  useEffect(() => {
    if (ref && ref.current) {
      ref.current.traverse(child => {
        if (child instanceof THREE.Mesh) {
          switch (child.name) {
            case 'bread':
              child.material = materials.bread;
              break;
            case 'sausage':
              child.material = materials.sausage;
              break;
            case 'eyes':
              child.material = materials.black;
              break;
            default:
          }
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

export function HotDog() {
  return (
    <>
      <Suspense fallback={<Box />}>
        <HotDogModel />
        {/* <group rotation={} /> */}
      </Suspense>
    </>
  );
}
