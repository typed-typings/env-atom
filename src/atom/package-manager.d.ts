import Disposable = require('../event-kit/disposable');
import EventHandler = require('../event-kit/event-handler');
import Package = require('./package');

declare class PackageManager {
  onDidLoadInitialPackages: EventHandler;
  onDidActivateInitialPackages: EventHandler;
  onDidActivatePackage(callback: (activatedPackage: Package) => void): Disposable;
  onDidDeactivatePackage(callback: (deactivatedPackage: Package) => void): Disposable;
  onDidLoadPackage(callback: (loadedPackage: Package) => void): Disposable;
  onDidUnloadPackage(callback: (unloadedPackage: Package) => void): Disposable;
  getApmPath(): string;
  getPackageDirPaths(): string[];
  resolvePackagePath(name: string): string;
  isBundledPackage(name: string): boolean;
  enablePackage(name: string): Package;
  disablePackage(name: string): Package;
  isPackageDisabled(name: string): boolean;
  getActivePackages(): Package[];
  getActivePackage(name: string): Package;
  isPackageActive(name: string): boolean;
  getLoadedPackages(): Package[];
  getLoadedPackage(name: string): Package;
  isPackageLoaded(name: string): boolean;
  getAvailablePackagePaths(): string[];
  getAvailablePackageNames(): string[];
  getAvailablePackageMetadata(): string[];
}

export = PackageManager;
