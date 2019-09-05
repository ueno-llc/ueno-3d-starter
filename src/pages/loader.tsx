import React, { useState } from 'react';
import { Controls } from '../components/controls/Controls';
import { LoadingScreen } from '../components/loading-screen/LoadingScreen';
import {
  Canvas,
  ResourcesProvider,
  useResource,
} from '../components/resources/Resources';

const ObjectOne = ({ position = [0, 0, 0] }: any) => {
  const scene = useResource('/objects/hotdog.obj');

  return (
    <mesh visible position={position} scale={[0.25, 0.25, 0.25]}>
      {scene && <primitive attach="geometry" object={scene} />}
    </mesh>
  );
};

const ObjectTwo = ({ position = [0, 0, 0] }: any) => {
  const scene = useResource('/objects/ueno-house.obj');
  return (
    <mesh visible position={position} scale={[0.25, 0.25, 0.25]}>
      {scene && <primitive attach="geometry" object={scene} />}
    </mesh>
  );
};

export default function LoaderPage() {
  const [show, setShow] = useState(false);
  return (
    <ResourcesProvider resources={['/objects/ueno-house.obj']}>
      <Canvas style={{ width: 800, height: 600 }}>
        <ambientLight intensity={0.5} />
        <spotLight intensity={0.8} position={[300, 300, 400]} />
        <ObjectOne position={[-1, 0, 0]} />
        <ObjectOne position={[1, 0, 0]} />
        {show && <ObjectTwo position={[0, -20, 0]} />}
        <Controls />
      </Canvas>
      <LoadingScreen />
      <button onClick={() => setShow(true)}>Add preloaded object</button>
    </ResourcesProvider>
  );
}
