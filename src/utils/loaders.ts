import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { createResource } from './createResource';

export const loaders = {
  obj: createResource(
    (file: string) => new Promise(res => new OBJLoader().load(file, res)),
  ),
};
