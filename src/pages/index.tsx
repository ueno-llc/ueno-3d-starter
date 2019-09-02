import React from 'react';
import { Canvas } from 'react-three-fiber';
import styled from 'styled-components';
import { Controls } from '../components/controls/Controls';
import { HotDog } from '../components/hot-dog/HotDog';
import { Layout } from '../components/layout/Layout';

const MainCanvas = styled(Canvas)`
  width: 100%;
  height: 400px;
  background-color: #f8f8f8;
`;

export default function IndexPage() {
  return (
    <Layout>
      <h1>Welcome</h1>
      <MainCanvas>
        <ambientLight intensity={0.5} />
        <spotLight intensity={0.8} position={[300, 300, 400]} />
        <HotDog />
        <Controls />
      </MainCanvas>
    </Layout>
  );
}
