declare class CompositeDisposable {
  constructor(...disposables: { dispose: () => any }[]);
  dispose(): void;
  add(...disposables: { dispose: () => any }[]): void;
  remove(disposable: { dispose: () => any }): void;
  clear(): void;
}

export = CompositeDisposable;
