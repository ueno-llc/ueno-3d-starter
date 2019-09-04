import React from 'react';
import { a } from 'react-spring/three';

export function Box({
  position = [0, 0, 0],
  size = 1,
  scale = 1,
}: {
  position?: THREE.Vector3 | number[];
  size?: number;
  scale?: any;
}) {
  return (
    <a.mesh position={position} scale-x={scale} scale-y={scale} scale-z={scale}>
      <boxBufferGeometry attach="geometry" args={[size, size, size]} />
      <meshStandardMaterial attach="material" transparent opacity={0.5} />
    </a.mesh>
  );
}
