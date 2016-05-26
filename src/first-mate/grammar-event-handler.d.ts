import Disposable = require('../event-kit/disposable');
import Grammar = require('../first-mate/grammar');

declare interface GrammarEventHandler {
  (callback: (grammar: Grammar) => void): Disposable;
}


export = GrammarEventHandler;
