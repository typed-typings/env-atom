
import Directory = require('./directory');

declare class File {
  constructor(filePath: string, symlink?: boolean);
  create(): PromiseLike<boolean>;
  onDidChange(callback: () => void): void;
  onDidRename(callback: () => void): void;
  onDidDelete(callback: () => void): void;
  onWillThrowWatchError(callback: (errorObject: {
    error: Object;
    handle(): void
  }) => void): void;
  isFile(): boolean;
  isDirectory(): boolean;
  isSymbolicLink(): boolean;
  exists(): PromiseLike<boolean>;
  existsSync(): boolean;
  getDigest(): PromiseLike<string>;
  getDigestSync(): string;
  setEncoding(encoding: string): void;
  getEncoding(): string;
  getPath(): string;
  getRealPathSync(): string;
  getRealPath(): PromiseLike<string>;
  getBaseName(): string;
  getParent(): Directory;
  read(flushCache: boolean): PromiseLike<string>;
  write(text: string): PromiseLike<void>;
  writeSync(text: string): void;
}

export = File;
