import Disposable = require('../event-kit/disposable');

import Grammar = require('./grammar');

import GrammarEventHandler from './grammar-event-handler';

declare class GrammarRegistry {
  onDidAddGrammar: GrammarEventHandler;
  onDidUpdateGrammar: GrammarEventHandler;
  getGrammars(): Grammar[];
  grammarForScopeName(scopeName: string): Grammar;
  addGrammar(grammar: Grammar): Disposable;
  removeGrammarForScopeName(scopeName: string): Grammar;
  readGrammarSync(grammarPath: string): Grammar;
  readGrammar(grammarPath: string, callback: (err: Error, grammar: Grammar) => void): void;
  loadGrammarSync(grammarPath: string): Grammar;
  loadGrammar(grammarPath: string, callback: (err: Error, grammar: Grammar) => void): void;
}

export = GrammarRegistry;
