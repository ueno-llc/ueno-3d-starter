import React, { Suspense, useRef, useState } from 'react';
import styled from 'styled-components';
import * as THREE from 'three';
import { Canvas } from '../components/canvas/Canvas';
import { Controls } from '../components/controls/Controls';
import { Layout } from '../components/layout/Layout';
import { Box } from '../components/objects/box/Box';
import { HotDog } from '../components/objects/hot-dog/HotDog';
import { UenoHouse } from '../components/objects/ueno-house/UenoHouse';

const SceneContainer = styled.div`
  width: 100%;
  height: 400px;
  background-color: #f8f8f8;
  margin: 30px 0;
`;

export default function IndexPage() {
  const houseScene = useRef<HTMLDivElement>();
  const [hotDogActive, setHotDogActive] = useState(false);

  return (
    <Layout>
      <h1>Welcome to the third dimension</h1>
      <SceneContainer ref={houseScene as any}>
        <Canvas
          camera={{
            position: new THREE.Vector3(-40, 25, 10),
          }}
        >
          <ambientLight intensity={0.5} />
          <spotLight intensity={0.8} position={[300, 300, 400]} />
          <Suspense fallback={<Box size={10} />}>
            <UenoHouse />
          </Suspense>
          <Controls containerRef={houseScene} />
        </Canvas>
      </SceneContainer>

      <h1>Here is a hot dog</h1>
      <SceneContainer onClick={() => setHotDogActive(!hotDogActive)}>
        <Canvas>
          <ambientLight intensity={0.5} />
          <spotLight intensity={0.8} position={[300, 300, 400]} />
          <Suspense fallback={<Box size={2} />}>
            <HotDog active={hotDogActive} />
          </Suspense>
        </Canvas>
      </SceneContainer>
    </Layout>
  );
}
