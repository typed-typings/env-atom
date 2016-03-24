/// <reference path="./atom-namespace.d.ts" />

declare module 'event-kit' {
  export var Emitter: typeof atom.Typings.Emitter;
  export var Disposable: typeof atom.Typings.Disposable;
  export var CompositeDisposable: typeof atom.Typings.CompositeDisposable;
}
