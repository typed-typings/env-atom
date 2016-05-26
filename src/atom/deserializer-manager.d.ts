import AtomEnvironment = require('./atom-environment');

declare class DeserializerManager {
  add(deserializers: { name: string, deserialize: (serializedState: any, atom: AtomEnvironment) => any }): void;
  deserialize(state: Object): void;
}

export = DeserializerManager;
