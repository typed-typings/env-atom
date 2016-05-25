declare class Disposable {
  static isDisposable(object: Object): boolean;
  constructor(disposalAction: Function);
  dispose(): void;
}

export = Disposable;
