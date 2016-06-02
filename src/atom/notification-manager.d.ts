import EventKit = require('event-kit');
import Notification = require('./notification');

declare class NotificationManager {
  onDidAddNotification(callback: (notification: Notification) => void): EventKit.Disposable;
  addSuccess(message: string, options?: {
    detail?: string;
    dismissable?: boolean;
    icon?: string;
  }): void;
  addInfo(message: string, options?: {
    detail?: string;
    dismissable?: boolean;
    icon?: string;
  }): void;
  addWarning(message: string, options?: {
    detail?: string;
    dismissable?: boolean;
    icon?: string;
  }): void;
  addError(message: string, options?: {
    detail?: string;
    dismissable?: boolean;
    icon?: string;
  }): void;
  addFatalError(message: string, options?: {
    detail?: string;
    dismissable?: boolean;
    icon?: string;
  }): void;
  getNotifications(): Notification[];
}

export = NotificationManager;
