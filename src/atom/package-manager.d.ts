import EventKit = require('event-kit');
import Package = require('./package');

declare class PackageManager {
  onDidLoadInitialPackages: EventKit.EventHandler;
  onDidActivateInitialPackages: EventKit.EventHandler;
  onDidActivatePackage(callback: (activatedPackage: Package) => void): EventKit.Disposable;
  onDidDeactivatePackage(callback: (deactivatedPackage: Package) => void): EventKit.Disposable;
  onDidLoadPackage(callback: (loadedPackage: Package) => void): EventKit.Disposable;
  onDidUnloadPackage(callback: (unloadedPackage: Package) => void): EventKit.Disposable;
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
