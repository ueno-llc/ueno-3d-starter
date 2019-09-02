import React from 'react';

export function Box({ position }: { position?: THREE.Vector3 | number[] }) {
  return (
    <mesh>
      <boxBufferGeometry
        attach="geometry"
        args={[1, 1, 1]}
        position={position}
      />
      <meshStandardMaterial attach="material" transparent opacity={0.5} />
    </mesh>
  );
}
