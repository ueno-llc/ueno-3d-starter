import React, { useRef } from 'react';
import { extend, useRender, useThree } from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

extend({ OrbitControls });

export function Controls(props: any) {
  const ref = useRef<OrbitControls>();
  const { camera } = useThree();

  useRender(() => {
    if (ref.current) {
      ref.current.update();
    }
  });

  return <orbitControls ref={ref} args={[camera]} {...props} />;
}
