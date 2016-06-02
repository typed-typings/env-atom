import EventKit = require('event-kit');
import TextBuffer = require('text-buffer');
import Cursor = require('./cursor');

declare interface CursorChangeEventHandler {
  (callback: (event: {
    oldBufferPosition: TextBuffer.Point,
    oldScrrenPosition: TextBuffer.Point,
    newBufferPosition: TextBuffer.Point,
    newScrrenPosition: TextBuffer.Point,
    textChanged: boolean,
    cursor: Cursor
  }) => void): EventKit.Disposable;
}
export = CursorChangeEventHandler;
