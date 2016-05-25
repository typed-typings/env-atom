declare class BufferedProcess {
  constructor(options: {
    command: string,
    args?: any[],
    options?: Object,
    stdout?: (data: string) => void;
    stderr?: (data: string) => void;
    exit?: (code: number) => void;
  });
  onWillThrowError(callback: (errorObject: { error: Object, handle(): void }) => void): atom.Typings.Disposable;
  kill(): void;
}


export = BufferedProcess;
