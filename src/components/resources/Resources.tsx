import React, { createContext, useContext, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OBJLoader2 } from 'three/examples/jsm/loaders/OBJLoader2';
import { createResource } from '../../utils/createResource';

interface ResourcesContext {
  queue: Map<string, ResourcesQueueEntry>;
  resources: number;
  progress: number;
  loaded: number;
  bytesTotal: number;
  bytesLoaded: number;
  queueResource(file: string, resolve: any, loader?: ResourceLoaderClass): void;
}

interface ResourcesProviderProps {
  children: React.ReactNode;
  resources?: Array<string | [string, any]>;
}

interface ResourcesQueueEntry {
  progress: number;
  resolvers: Array<(group: THREE.Group) => void>;
  bytesTotal: number;
  bytesLoaded: number;
  result?: THREE.Object3D;
}

interface ResourceLoader {
  load(
    url: string,
    onLoad: (group: THREE.Group) => void,
    onProgress?: (event: ProgressEvent) => void,
    onError?: (event: ErrorEvent) => void,
  ): void;
}

type ResourceLoaderClass = new () => ResourceLoader;

// This is a bridge to pass the context
// to a different react reconciler (react-three-fiber)
// (all reconceilers suffer from this problem)
export const Canvas = ({ children, ...props }: any) => {
  if (typeof window === 'undefined') {
    return <div {...props} />;
  }

  const RTFCanvas = require('react-three-fiber').Canvas;

  return (
    <ResourcesContext.Consumer>
      {value => (
        <RTFCanvas {...props}>
          <ResourcesContext.Provider value={value}>
            {children}
          </ResourcesContext.Provider>
        </RTFCanvas>
      )}
    </ResourcesContext.Consumer>
  );
};

export const ResourcesContext = createContext<ResourcesContext>({
  queue: new Map(),
  resources: 0,
  progress: 0,
  loaded: 0,
  bytesTotal: 0,
  bytesLoaded: 0,
  queueResource() {
    return;
  },
});

export function ResourcesProvider(props: ResourcesProviderProps) {
  const [queue] = useState(new Map<string, ResourcesQueueEntry>());
  const [resources, setResources] = useState(0);
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(0);
  const [bytesLoaded, setBytesLoaded] = useState(0);
  const [bytesTotal, setBytesTotal] = useState(0);

  function queueResource(file: string, resolve: any, loader?: any) {
    let Loader: ResourceLoaderClass = OBJLoader2;
    if (loader) {
      Loader = loader;
    }
    const key = file + Loader.toString();
    if (queue.has(key)) {
      const entry = queue.get(key);
      if (entry!.result) {
        resolve(entry!.result.clone());
      } else {
        entry!.resolvers.push(resolve);
      }
    } else {
      queue.set(key, {
        resolvers: [resolve],
        progress: 0,
        bytesLoaded: 0,
        bytesTotal: 0,
      });
      setResources(queue.size);
      new Loader().load(
        file,
        (result: THREE.Object3D) => {
          const entry = queue.get(key);
          if (entry && result) {
            entry.result = result;
            entry.progress = 1;
            entry.bytesLoaded = entry.bytesTotal;
            entry.resolvers.forEach((resolver: any) =>
              resolver(entry.result!.clone()),
            );
            const entries = Array.from(queue.values());
            setLoaded(entries.filter(n => n.result).length);
          }
        },
        (e: ProgressEvent) => {
          const entry = queue.get(key);
          if (entry) {
            entry.progress = e.loaded / e.total;
            entry.bytesTotal = e.total;
            entry.bytesLoaded = e.loaded;
            const entries = Array.from(queue.values());
            setLoaded(entries.filter(item => item.result).length);
            setBytesLoaded(
              entries.reduce((acc, item) => acc + item.bytesLoaded, 0),
            );
            setBytesTotal(
              entries.reduce((acc, item) => acc + item.bytesTotal, 0),
            );
            setProgress(
              queue.size === 0
                ? 0
                : entries.reduce((acc, item) => acc + item.progress, 0) /
                    queue.size,
            );
          }
        },
      );
    }
  }

  useEffect(() => {
    (props.resources || []).forEach(file => {
      if (Array.isArray(file)) {
        queueResource(file[0], () => null, file[1]);
      } else {
        queueResource(file, () => null);
      }
    });
  }, [resources]);

  return (
    <ResourcesContext.Provider
      value={{
        queue,
        resources,
        progress,
        loaded,
        bytesLoaded,
        bytesTotal,
        queueResource,
      }}
    >
      {props.children}
    </ResourcesContext.Provider>
  );
}

export function useResource(file: string, loader?: ResourceLoaderClass) {
  const context = useContext(ResourcesContext);
  const [object, setObject] = useState(null);
  useEffect(() => context.queueResource(file, setObject, loader), [file]);
  return object;
}

// Suspense only (still WIP)
const resource = createResource((file: string) => {
  const context = useContext(ResourcesContext);
  return new Promise(res => context.queueResource(file, res));
});
export const useResourceSuspense = (file: string) => resource.read(file);
