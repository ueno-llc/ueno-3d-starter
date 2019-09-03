import React, { Suspense } from 'react';
import styled from 'styled-components';
import { Canvas } from '../components/canvas/Canvas';
import { Controls } from '../components/controls/Controls';
import { Layout } from '../components/layout/Layout';
import { Box } from '../components/objects/box/Box';
import { HotDog } from '../components/objects/hot-dog/HotDog';

const Main = styled.div`
  width: 100%;
  height: 400px;
  background-color: #f8f8f8;
`;

export default function IndexPage() {
  return (
    <Layout>
      <h1>Welcome to the third dimension</h1>
      <Main>
        <Canvas>
          <ambientLight intensity={0.5} />
          <spotLight intensity={0.8} position={[300, 300, 400]} />
          <Suspense fallback={<Box />}>
            <HotDog />
          </Suspense>
          <Controls />
        </Canvas>
      </Main>
    </Layout>
  );
}
