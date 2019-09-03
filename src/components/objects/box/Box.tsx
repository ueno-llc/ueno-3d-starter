import React from 'react';

export function Box({
  position,
  size = 1,
}: {
  position?: THREE.Vector3 | number[];
  size: number;
}) {
  return (
    <mesh>
      <boxBufferGeometry
        attach="geometry"
        args={[size, size, size]}
        position={position}
      />
      <meshStandardMaterial attach="material" transparent opacity={0.5} />
    </mesh>
  );
}
