import Disposable = require('../event-kit/disposable');

declare interface SelectionChangeEventHandler {
  (callback: (event: {
    oldBufferRange: Range,
    oldScreenRange: Range,
    newBufferRange: Range,
    newScreenRange: Range,
    selection: Selection
  }) => void): Disposable;
}

export default SelectionChangeEventHandler;
