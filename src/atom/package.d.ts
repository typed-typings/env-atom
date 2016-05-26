import EventHandler = require('../event-kit/event-handler');

declare interface Package {
  onDidDeactivate: EventHandler;
  isCompatible(): boolean;
  rebuild(): PromiseLike<{
    code: any,
    stdout: any,
    stderr: any
  }>;
  getBuildFailureOutput(): string;
}

export = Package;
