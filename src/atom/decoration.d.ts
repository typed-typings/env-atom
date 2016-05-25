import Disposable = require('../event-kit/disposable');

declare class Decoration {
  destroy(): void;
  onDidChangeProperties(callback: (event: {
    oldProperties: Object;
    newProperties: Object;
  }) => void): Disposable;
  onDidDestroy: (callback: () => void) => Disposable;
  getId(): any;
  getMarker(): any; // Marker;
  getProperties(): Object;
  setProperties(newProperties: Object): void;
}
export = Decoration;
