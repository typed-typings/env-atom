/// <reference path="./atom-namespace.d.ts" />

declare module 'event-kit' {
  export class Emitter extends atom.Typings.Emitter {}
  export class Disposable extends atom.Typings.Disposable {}
  export class CompositeDisposable extends atom.Typings.CompositeDisposable {}
}
