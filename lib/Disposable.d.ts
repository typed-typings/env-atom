export class Disposable {
  public static isDisposable(object: Object): boolean;
  constructor(disposalAction: Function);
  public dispose(): void;
}
