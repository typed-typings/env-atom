import { AtomEnvironment } from './AtomEnvironment.d.ts';
import { Disposable } from './Disposable.d.ts';

declare var atom: AtomEnvironment

declare module 'atom' {
  export var atom: AtomEnvironment
  export { Disposable }
}
