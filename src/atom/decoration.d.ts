import EventKit = require('event-kit');

declare class Decoration {
  destroy(): void;
  onDidChangeProperties(callback: (event: {
    oldProperties: Object;
    newProperties: Object;
  }) => void): EventKit.Disposable;
  onDidDestroy: (callback: () => void) => EventKit.Disposable;
  getId(): any;
  getMarker(): any; // Marker;
  getProperties(): Object;
  setProperties(newProperties: Object): void;
}
export = Decoration;
