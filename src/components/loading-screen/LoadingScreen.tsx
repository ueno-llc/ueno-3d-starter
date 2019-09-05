import React, { useContext } from 'react';
import styled from 'styled-components';
import { ResourcesContext } from '../resources/Resources';

const Overlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  left: 8px;
  top: 8px;
  width: 800px;
  height: 600px;
  background-color: rebeccapurple;
`;

const Progress = styled.div`
  width: 200px;
  height: 40px;
  background: rgba(0, 0, 0, 0.2);
`;

const ProgressBar = styled.div<{ progress: number }>`
  background: white;
  height: 40px;
  width: ${props => `${Math.round(props.progress * 100)}%`};
`;

const ProgressText = styled.div`
  margin-top: 10px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 18px;
  color: white;
`;

export function LoadingScreen() {
  const context = useContext(ResourcesContext);
  if (context.loaded === context.resources) {
    return null;
  }

  return (
    <Overlay>
      <Progress>
        <ProgressBar progress={context.progress} />
      </Progress>
      <ProgressText>
        Loading {context.loaded + 1} of {context.resources} resources (
        {Math.round(context.progress * 100)}%)
      </ProgressText>
      <ProgressText>
        {context.bytesLoaded} / {context.bytesTotal} bytes
      </ProgressText>
    </Overlay>
  );
}
