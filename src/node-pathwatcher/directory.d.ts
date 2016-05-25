
import Disposable = require('../event-kit/disposable');

declare class Directory {
  constructor(directoryPath: string, symlink?: boolean);
  create(mode?: number): PromiseLike<boolean>;
  onDidChange: (callback: () => void) => Disposable;
  isFile(): boolean;
  isDirectory(): boolean;
  isSymbolicLink(): boolean;
  exists(): PromiseLike<boolean>;
  existsSync(): boolean;
  isRoot(): boolean;
  getPath(): string;
  getRealPathSync(): string;
  getBaseName(): string;
  relativize(): string;
  getParent(): Directory;
  getFile(filename: string): File;
  getSubdirectory(dirname: string): Directory;
  getEntriesSync(): (File | Directory)[];
  getEntries(callback: (error: Error, entries: (File | Directory)[]) => void): void;
  contains(pathToCheck: string): boolean;
}

export = Directory;
