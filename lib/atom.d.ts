import { AtomEnvironment } from './AtomEnvironment.d.ts';
import { Color } from './Color.d.ts';
import { Disposable } from './Disposable.d.ts';

declare var atom: AtomEnvironment

declare module 'atom' {
  export var atom: AtomEnvironment
  export { Color }
  export { Disposable }
}
