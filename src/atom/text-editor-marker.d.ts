import EventKit = require('event-kit');
import TextBuffer = require('text-buffer');

declare class TextEditorMarker {
  destroy(): void;
  copy(properties?: Object): TextEditorMarker;
  onDidChange(callback: (event: {
    oldHeadBufferPosition: TextBuffer.Point;
    newHeadBufferPosition: TextBuffer.Point;
    oldTailBufferPosition: TextBuffer.Point;
    newTailBufferPosition: TextBuffer.Point;
    oldHeadScreenPosition: TextBuffer.Point;
    newHeadScreenPosition: TextBuffer.Point;
    oldTailScreenPosition: TextBuffer.Point;
    newTailScreenPosition: TextBuffer.Point;
    wasValid: boolean;
    isValid: boolean;
    hadTail: boolean;
    hasTail: boolean;
    oldProperties: Object;
    newProperties: Object;
    textChanged: boolean;
  }) => void): EventKit.Disposable;
  onDidDestroy: (callback: () => void) => EventKit.Disposable;
  isValid(): boolean;
  isDestroyed(): boolean;
  isReversed(): boolean;
  getInvalidationStrategy(): string;
  getProperties(): Object;
  setProperties(properties: Object): void;
  isEqual(other: TextEditorMarker): boolean;
  compare(other: TextEditorMarker): number;
  getBufferRange(): TextBuffer.Range;
  setBufferRange(bufferRange: TextBuffer.Range, properties?: { reversed: boolean }): void;
  getScreenRange(): TextBuffer.Range;
  setScreenRange(bufferRange: TextBuffer.Range, properties?: { reversed: boolean }): void;
  getStartBufferPosition(): TextBuffer.Point;
  getStartScreenPosition(): TextBuffer.Point;
  getEndBufferPosition(): TextBuffer.Point;
  getEndScreenPosition(): TextBuffer.Point;

  // Extended Methods
  getHeadBufferPosition(): TextBuffer.Point;
  getHeadBufferPosition(bufferPosition: TextBuffer.Point, properties?: Object): void;
  getHeadScreenPosition(): TextBuffer.Point;
  getHeadScreenPosition(screenPosition: TextBuffer.Point, properties?: Object): void;
  getTailBufferPosition(): TextBuffer.Point;
  getTailBufferPosition(bufferPosition: TextBuffer.Point, properties?: Object): void;
  getTailScreenPosition(): TextBuffer.Point;
  getTailScreenPosition(screenPosition: TextBuffer.Point, properties?: Object): void;
  hasTail(): boolean;
  plantTail(properties?: Object): void;
  clearTail(properties?: Object): void;
}

export = TextEditorMarker;
