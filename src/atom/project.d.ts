import EventKit = require('event-kit');
import PathWatcher = require('pathwatcher');

import GitRepository = require('./git-repository');

declare class Project {
  // Event Subscription
  onDidChangePaths(callback: (projectPaths: string[]) => void): EventKit.Disposable;

  // Accessing the git repository
  /**
   * Will be removed in 2.0
   */
  getRepositories(): GitRepository[];
  repositoryForDirectory(directory: PathWatcher.Directory): PromiseLike<GitRepository>; // Was Repository. Likely API mistake.
  getPaths(): string[];
  setPaths(projectPaths: string[]): void;
  addPath(projectPath: string): void;
  removePath(projectPath: string): void;
  getDirectories(): PathWatcher.Directory[];
  relativizePath(fullPath: string): { projectPath: string, relativePath: string }[];
  contains(pathToCheck: string): boolean;
}

export = Project;
