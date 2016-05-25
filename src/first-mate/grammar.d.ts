import Disposable = require('../event-kit/disposable');

import GrammarRegistry = require('./grammar-registry');

declare class Grammar {
  constructor(registry: GrammarRegistry, options?: Object);

  onDidUpdate: (callback: () => void) => Disposable;
  tokenizeLines(text: string): any[];
  tokenizeLine(line: string, ruleStack?: any[], firstLine?: boolean): {
    line: string;
    tags: number[];
    tokens(): any;
    ruleStack: any[];
  };
}

export = Grammar;
