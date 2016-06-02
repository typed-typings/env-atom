import EventKit = require('event-kit');

declare interface Package {
  onDidDeactivate: EventKit.EventHandler;
  isCompatible(): boolean;
  rebuild(): PromiseLike<{
    code: any,
    stdout: any,
    stderr: any
  }>;
  getBuildFailureOutput(): string;
}

export = Package;
