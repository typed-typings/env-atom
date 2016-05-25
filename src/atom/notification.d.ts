import Disposable = require('../event-kit/disposable');

declare class Notification {
  onDidDismiss: (callback: () => void) => Disposable;
  onDidDisplay: (callback: () => void) => Disposable;
  getType(): string;
  getMessage(): string;

  // Extended Methods
  dismiss(): void;
}

export = Notification;
