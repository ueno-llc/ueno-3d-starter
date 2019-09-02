import React from 'react';
import { Canvas } from 'react-three-fiber';
import { Controls } from '../components/controls/Controls';
import { HotDog } from '../components/hot-dog/HotDog';
import { Layout } from '../components/layout/Layout';

export default function IndexPage() {
  return (
    <Layout>
      <h1>Welcome</h1>
      <Canvas
        style={{ width: '100%', height: 400, backgroundColor: '#f8f8f8' }}
      >
        <ambientLight intensity={0.5} />
        <spotLight intensity={0.8} position={[300, 300, 400]} />
        <HotDog />
        <Controls />
      </Canvas>
    </Layout>
  );
}
