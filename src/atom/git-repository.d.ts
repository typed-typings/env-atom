import EventKit = require('event-kit');

declare class GitRepository {
  static open(path: string, options?: { refreshOnWindowFocus: boolean }): GitRepository;
  destroy();
  onDidDestroy: (callback: () => void) => EventKit.Disposable;
  onDidChangeStatus(callback: (event: {
    path: string;
    pathStatus: number;
  }) => void): EventKit.Disposable;
  onDidChangeStatuses: (callback: () => void) => EventKit.Disposable;
  getType(): string;
  getPath(): string;
  getWorkingDirectory(): string;
  isProjectAtRoot(): boolean;
  relativize(): string;
  hasBranch(): boolean;
  getShortHead(path: string): string;
  isSubmodule(path: string): boolean;
  getAheadBehindCount(reference: string, path?: string): number;
  getCachedUpstreamAheadBehindCount(path: string): { ahead: number, behind: number };
  getConfigValue(path: string): any;
  getOriginURL(path?: string): string;
  getUpstreamBranch(path: string): string;
  getReferences(path: string): { heads: string[], remotes: string[], tags: string[] };
  getReferenceTarget(reference: string, path?: string): string;
  isPathModified(path: string): boolean;
  isPathNew(path: string): boolean;
  isPathIgnored(path): boolean;
  getDirectoryStatus(path: string): number;
  getPathStatus(): number;
  getCachedPathStatus(path: string): number;
  isStatusModified(status: boolean): boolean;
  isStatusNew(status: number): boolean;
  getDiffStats(path: string): { added: number, deleted: number };
  getLinkDiffs(path: string, text: string): { oldStart: number, newStart: number, oldLines: number, newLines: number }[];
  checkoutHead(path: string): boolean;
  checkoutReference(reference: string, create: boolean): boolean;
}


export = GitRepository;
