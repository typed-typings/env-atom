import ScopeDescriptor = require('./scope-descriptor');

declare interface ConfigOption {
  sources?: string[];
  excludeSources?: string[];
  scope?: ScopeDescriptor;
}

declare interface Config {
  get<T>(keyPath: string, options?: ConfigOption): T;
  set(keyPath: string, value: any, options?: { scopeSelector?: string, source?: string }): boolean;
  unset(keyPath: string, options?: { scopeSelector?: string, source?: string }): void;
  // Extended Methods
  getAll<T>(keyPath: string, options?: ConfigOption): { scopeDescriptor: ScopeDescriptor, value: T }[];
  getSources(): string[];
  getSchema(keyPath): any;
  getUserConfigPath(): string;
  transact(callback: () => void): void;
}

export = Config;
