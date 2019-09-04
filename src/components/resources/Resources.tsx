import React, { createContext, useContext, useEffect, useState } from 'react';
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { OBJLoader2 } from 'three/examples/jsm/loaders/OBJLoader2';
import { createResource } from '../../utils/createResource';
import { Canvas } from '../canvas/Canvas';

interface ResourcesContext {
  resources: number;
  progress: number;
  loaded: number;
  queueResource(file: string, resolve: any): void;
}

interface ResourcesQueueEntry {
  progress: number;
  resolvers: Array<(result: THREE.Object3D) => void>;
  result?: THREE.Object3D;
}

// This is a hack to bridge the context
// to a different react reconciler (react-three-fiber)
// (all reconceilers suffer from this problem)
export const ResourcesCanvas = ({ children, ...props }: any) => (
  <ResourcesContext.Consumer>
    {value => (
      <Canvas {...props}>
        <ResourcesContext.Provider value={value}>
          {children}
        </ResourcesContext.Provider>
      </Canvas>
    )}
  </ResourcesContext.Consumer>
);

export const ResourcesContext = createContext<ResourcesContext>({
  resources: 0,
  progress: 1,
  loaded: 0,
  queueResource() {
    return;
  },
});

export class ResourcesProvider extends React.Component<any, ResourcesContext> {
  queue = new Map<string, ResourcesQueueEntry>();

  state = {
    resources: 0,
    progress: 0,
    loaded: 0,
    queueResource: (file: string, resolve: any) => {
      const Loader = OBJLoader2;
      const key = file + Loader.toString();

      if (this.queue.has(key)) {
        const entry = this.queue.get(key);
        if (entry!.result) {
          resolve(entry!.result.clone());
        } else {
          entry!.resolvers.push(resolve);
        }
      } else {
        this.queue.set(key, { resolvers: [resolve], progress: 0 });
        this.setState({ resources: this.queue.size });
        new Loader().load(
          file,
          result => {
            const entry = this.queue.get(key);
            if (entry && result) {
              entry.result = result;
              entry.resolvers.forEach((resolver: any) =>
                resolver(entry.result!.clone()),
              );
              const queue = Array.from(this.queue.values());
              this.setState({
                loaded: queue.filter(item => item.result).length,
              });
            }
          },
          (e: ProgressEvent) => {
            const entry = this.queue.get(key);
            if (entry) {
              entry.progress = e.loaded / e.total;
              const queue = Array.from(this.queue.values());
              this.setState({
                loaded: queue.filter(item => item.result).length,
                progress:
                  queue.reduce((acc, item) => acc + item.progress, 0) /
                  this.queue.size,
              });
            }
          },
        );
      }
    },
  };

  render() {
    return (
      <ResourcesContext.Provider value={this.state}>
        {this.props.children}
      </ResourcesContext.Provider>
    );
  }
}

const resource = createResource((file: string) => {
  const context = useContext(ResourcesContext);
  return new Promise(res => context.queueResource(file, res));
});

export const useResource = (file: string) => {
  const context = useContext(ResourcesContext);
  const [object, setObject] = useState(null);
  useEffect(() => context.queueResource(file, setObject), [file]);
  return object;
};

export const useResourceSuspense = (file: string) => resource.read(file);
