import EventKit = require('event-kit');

declare class Notification {
  onDidDismiss: (callback: () => void) => EventKit.Disposable;
  onDidDisplay: (callback: () => void) => EventKit.Disposable;
  getType(): string;
  getMessage(): string;

  // Extended Methods
  dismiss(): void;
}

export = Notification;
