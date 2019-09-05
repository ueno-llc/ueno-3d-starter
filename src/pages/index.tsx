import { Link } from 'gatsby';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import * as THREE from 'three';
import { Controls } from '../components/controls/Controls';
import { Layout } from '../components/layout/Layout';
import { HotDog } from '../components/objects/hot-dog/HotDog';
import { UenoHouse } from '../components/objects/ueno-house/UenoHouse';
import { Canvas, ResourcesProvider } from '../components/resources/Resources';

const SceneContainer = styled.div`
  width: 100%;
  height: 400px;
  background-color: #f8f8f8;
  margin: 30px 0;
`;

const List = styled.ul`
  list-style-type: initial;
  margin-left: 16px;
  margin-top: 16px;
  line-height: 1.5;
`;

export default function IndexPage() {
  const houseScene = useRef<HTMLDivElement>();
  const [hotDogActive, setHotDogActive] = useState(false);

  return (
    <ResourcesProvider>
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
            <UenoHouse />
            <Controls containerRef={houseScene} />
          </Canvas>
        </SceneContainer>

        <h1>Here is a hot dog</h1>
        <SceneContainer onClick={() => setHotDogActive(!hotDogActive)}>
          <Canvas>
            <ambientLight intensity={0.5} />
            <spotLight intensity={0.8} position={[300, 300, 400]} />
            <HotDog active={hotDogActive} />
          </Canvas>
        </SceneContainer>

        <h1>Other examples</h1>
        <List>
          <li>
            <Link to="/horizontal">Horizontal Scrolling</Link>
          </li>
          <li>
            <Link to="/loader">Loading manager</Link>
          </li>
        </List>
      </Layout>
    </ResourcesProvider>
  );
}
