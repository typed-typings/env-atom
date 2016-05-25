import Disposable = require('./disposable');
declare class Emitter {
  clear(): void;
  dispose(): void;
  on(eventName: string, handler: (value: any) => void): Disposable;
  preempt(eventName: string, handler: (value: any) => void): Disposable;
  emit(eventName: string, value: any): void;
}

export = Emitter;
