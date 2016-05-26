import Disposable = require('../event-kit/disposable');
import Range = require('../text-buffer/range');
import Selection = require('./selection');

declare interface SelectionChangeEventHandler {
  (callback: (event: {
    oldBufferRange: Range,
    oldScreenRange: Range,
    newBufferRange: Range,
    newScreenRange: Range,
    selection: Selection
  }) => void): Disposable;
}

export = SelectionChangeEventHandler;
