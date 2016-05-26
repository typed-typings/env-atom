import Disposable = require('../event-kit/disposable');
import EventHandler = require('../event-kit/event-handler');

declare interface Panel {
  // Construction and Destruction
  destroy(): void;

  // Event Subscription
  onDidChangeVisible(callback: (visible) => void): Disposable;
  onDidDestroy: EventHandler;

  // Panel Details
  getItem(): any;
  getPriority(): number;
  isVisible(): boolean;
  hide(): void;
  show(); void;
}

export = Panel;
