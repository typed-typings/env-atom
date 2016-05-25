import Disposable = require('./disposable');

declare interface EventHandler {
  (callback: () => void): Disposable;
}

export default EventHandler;