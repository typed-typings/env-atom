import Disposable = require('../event-kit/disposable');
import Point = require('../text-buffer/point');
import Cursor = require('./cursor');

declare interface CursorChangeEventHandler {
  (callback: (event: {
    oldBufferPosition: Point,
    oldScrrenPosition: Point,
    newBufferPosition: Point,
    newScrrenPosition: Point,
    textChanged: boolean,
    cursor: Cursor
  }) => void): Disposable;
}
export default CursorChangeEventHandler;
