import React from 'react';
import 'react-circular-progressbar/dist/styles.css';
import { Controls } from '../components/controls/Controls';
import { LoadingScreen } from '../components/loading-screen/LoadingScreen';
import {
  ResourcesCanvas,
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
  return (
    <ResourcesProvider>
      <ResourcesCanvas style={{ width: 800, height: 600 }}>
        <ambientLight intensity={0.5} />
        <spotLight intensity={0.8} position={[300, 300, 400]} />
        <ObjectOne position={[-1, 0, 0]} />
        <ObjectOne position={[1, 0, 0]} />
        <ObjectTwo position={[0, -20, 0]} />
        <Controls />
      </ResourcesCanvas>
      <LoadingScreen />
    </ResourcesProvider>
  );
}
