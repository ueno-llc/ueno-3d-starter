import React, { useCallback, useEffect, useRef, useState } from 'react';
import { a, useSpring } from 'react-spring/three';
import { useThree } from 'react-three-fiber';
import styled, { createGlobalStyle } from 'styled-components';
import * as THREE from 'three';
import { Canvas } from '../components/canvas/Canvas';
import { Box } from '../components/objects/box/Box';

const SceneContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #f8f8f8;
  overflow-x: scroll;
`;

const ScrollView = styled.div`
  width: 200vw;
  height: 10px;
`;

const FlushedBody = createGlobalStyle`
  html, body {
    padding: 0;
    margin: 0;
  }
`;

function Scene({ left }: any) {
  const camera = useRef<THREE.PerspectiveCamera>();
  const { size, setDefaultCamera } = useThree();
  const [center] = useState(size.width / 3);

  useEffect(() => setDefaultCamera(camera.current!), []);

  return (
    <>
      <a.perspectiveCamera
        ref={camera}
        aspect={size.width / size.height}
        fov={55}
        position-x={left.interpolate([0, size.width * 2], [0, 40])}
        position-y={0}
        position-z={20}
        onUpdate={(self: any) => self.updateProjectionMatrix()}
      />
      <ambientLight intensity={0.5} />
      <spotLight intensity={0.8} position={[300, 300, 400]} />
      <Box size={2} />
      <Box size={2} position={[3, 0, 0]} />
      <Box size={2} position={[6, 0, 0]} />
      <Box
        size={2}
        position={[9, 0, 0]}
        scale={left.interpolate({
          range: [center, center + center / 2, center * 2],
          output: [1, 2, 1],
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })}
      />
      <Box size={2} position={[12, 0, 0]} />
      <Box size={2} position={[15, 0, 0]} />
      <Box size={2} position={[18, 0, 0]} />
    </>
  );
}

export default function HorizontalPage() {
  const houseScene = useRef<HTMLDivElement>();

  const [{ left }, setScroll] = useSpring(() => ({ left: 0 }));
  const onScroll = useCallback(
    e => setScroll({ left: e.target.scrollLeft }),
    [],
  );

  const onWheel = (e: React.WheelEvent) => {
    if (houseScene.current) {
      houseScene.current.scrollLeft += e.nativeEvent.deltaY;
    }
  };

  return (
    <SceneContainer
      ref={houseScene as any}
      onWheel={onWheel}
      onScroll={onScroll}
    >
      <FlushedBody />
      <Canvas
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 16,
          right: 0,
          height: 'auto',
        }}
      >
        <Scene left={left} />
      </Canvas>
      <ScrollView />
    </SceneContainer>
  );
}
