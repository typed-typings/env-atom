import Disposable = require('../event-kit/disposable');
import Directory = require('../node-pathwatcher/directory');

import GitRepository = require('./git-repository');

declare class Project {
  // Event Subscription
  onDidChangePaths(callback: (projectPaths: string[]) => void): Disposable;

  // Accessing the git repository
  /**
   * Will be removed in 2.0
   */
  getRepositories(): GitRepository[];
  repositoryForDirectory(directory: Directory): PromiseLike<GitRepository>; // Was Repository. Likely API mistake.
  getPaths(): string[];
  setPaths(projectPaths: string[]): void;
  addPath(projectPath: string): void;
  removePath(projectPath: string): void;
  getDirectories(): Directory[];
  relativizePath(fullPath: string): { projectPath: string, relativePath: string }[];
  contains(pathToCheck: string): boolean;
}

export = Project;
