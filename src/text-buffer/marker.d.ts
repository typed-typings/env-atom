
import Point = require('./point');
import Range = require('./range');
import Disposable = require('../event-kit/disposable')
declare interface MarkerOption {

}
declare class Marker {
  constructor(id, layer, range: Range, params: Object);
  onDidDestroy: (callback: () => void) => Disposable;
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
  getRange(): Range;
  setRange(range: Range, params?: { reversed?: boolean, exclusive?: boolean }): void;
  getHeadPosition(): Position;
  setHeadPosition(position: Position): void;
  getTailPosition(): Position;
  setTailPosition(position: Position): void;
  getStartPosition(): Position;
  getEndPosition(): Position;
  clearTail(): void;
  plantTail(): void;
  isReversed(): boolean;
  hasTail(): boolean;
  isValid(): boolean;
  isDestroyed(): boolean;
  isExclusive(): boolean;
  isEqual(other: Marker): boolean;
  getInvalidationStrategy(): string;
  getProperties(): Object;
  setProperties(properties: Object): void;
  copy(option?: Object): Marker;
  destroy(): void;
  compare(other: Marker): boolean;
}

export = Marker;