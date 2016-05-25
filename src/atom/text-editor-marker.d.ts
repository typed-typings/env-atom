import Point = require('../text-buffer/point');
import Disposable = require('../event-kit/disposable');

declare class TextEditorMarker {
  destroy(): void;
  copy(properties?: Object): TextEditorMarker;
  onDidChange(callback: (event: {
    oldHeadBufferPosition: Point;
    newHeadBufferPosition: Point;
    oldTailBufferPosition: Point;
    newTailBufferPosition: Point;
    oldHeadScreenPosition: Point;
    newHeadScreenPosition: Point;
    oldTailScreenPosition: Point;
    newTailScreenPosition: Point;
    wasValid: boolean;
    isValid: boolean;
    hadTail: boolean;
    hasTail: boolean;
    oldProperties: Object;
    newProperties: Object;
    textChanged: boolean;
  }) => void): Disposable;
  onDidDestroy: (callback: () => void) => Disposable;
  isValid(): boolean;
  isDestroyed(): boolean;
  isReversed(): boolean;
  getInvalidationStrategy(): string;
  getProperties(): Object;
  setProperties(properties: Object): void;
  isEqual(other: TextEditorMarker): boolean;
  compare(other: TextEditorMarker): number;
  getBufferRange(): Range;
  setBufferRange(bufferRange: Range, properties?: { reversed: boolean }): void;
  getScreenRange(): Range;
  setScreenRange(bufferRange: Range, properties?: { reversed: boolean }): void;
  getStartBufferPosition(): Point;
  getStartScreenPosition(): Point;
  getEndBufferPosition(): Point;
  getEndScreenPosition(): Point;

  // Extended Methods
  getHeadBufferPosition(): Point;
  getHeadBufferPosition(bufferPosition: Point, properties?: Object): void;
  getHeadScreenPosition(): Point;
  getHeadScreenPosition(screenPosition: Point, properties?: Object): void;
  getTailBufferPosition(): Point;
  getTailBufferPosition(bufferPosition: Point, properties?: Object): void;
  getTailScreenPosition(): Point;
  getTailScreenPosition(screenPosition: Point, properties?: Object): void;
  hasTail(): boolean;
  plantTail(properties?: Object): void;
  clearTail(properties?: Object): void;
}

export = TextEditorMarker;
