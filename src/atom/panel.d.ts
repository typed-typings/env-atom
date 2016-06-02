import EventKit = require('event-kit');

declare interface Panel {
  // Construction and Destruction
  destroy(): void;

  // Event Subscription
  onDidChangeVisible(callback: (visible) => void): EventKit.Disposable;
  onDidDestroy: EventKit.EventHandler;

  // Panel Details
  getItem(): any;
  getPriority(): number;
  isVisible(): boolean;
  hide(): void;
  show(); void;
}

export = Panel;
