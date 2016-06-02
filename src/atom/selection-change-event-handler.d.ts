import EventKit = require('event-kit');
import TextBuffer = require('text-buffer');
import Selection = require('./selection');

declare interface SelectionChangeEventHandler {
  (callback: (event: {
    oldBufferRange: TextBuffer.Range,
    oldScreenRange: TextBuffer.Range,
    newBufferRange: TextBuffer.Range,
    newScreenRange: TextBuffer.Range,
    selection: Selection
  }) => void): EventKit.Disposable;
}

export = SelectionChangeEventHandler;
