declare namespace atom {
  namespace Typings {
    export class Color {
      public static parse(value: string | Object): Color;
      public toHexString(): string;
      public toRGBAString(): string;
    }

    export interface CommandRegistry {
      add(target: string, commandName: string, callback: EventCallback): any;
      findCommands(params: { target: any }): Array<{ name: string, displayName: string }>;
      dispatch(target: any, commandName: string): void;
      onWillDispatch(callback: EventCallback): void;
      onDidDispatch(callback: EventCallback): void;
    }

    export interface ConfigOption {
      sources?: string[];
      excludeSources?: string[];
      scope?: ScopeDescriptor;
    }

    export interface Config {
      get<T>(keyPath: string, options?: ConfigOption): T;
      set(keyPath: string, value: any, options?: { scopeSelector?: string, source?: string }): boolean;
      unset(keyPath: string, options?: { scopeSelector?: string, source?: string }): void;
      // Extended Methods
      getAll<T>(keyPath: string, options?: ConfigOption): { scopeDescriptor: ScopeDescriptor, value: T}[];
      getSources(): string[];
      getSchema(keyPath): any;
      getUserConfigPath(): string;
      transact(callback: Function): void;
    }

    export class Disposable {
      public static isDisposable(object: Object): boolean;
      constructor(disposalAction: Function);
      public dispose(): void;
    }

    export interface EventCallback {
      (event): void
    }

    export class ScopeDescriptor {
      constructor(options?: { scopes: string[] });
      getScopesArray(): string[];
    }

    export interface Workspace {
      addModalPanel(option: any);
    }

  }
  export var command: Typings.CommandRegistry;
  export var config: Typings.Config;
  export var clipboard: any;
  export var contextMenu: any;
  export var menu: any;
  export var keymaps: any;
  export var tooltips: any;
  export var notifications: any;
  export var project: any;
  export var grammars: any;
  export var packages: any;
  export var themes: any;
  export var styles: any;
  export var deserializers: any;
  export var views: any;
  export var workspace: Typings.Workspace;
}

declare module 'atom' {
  export interface CompositeDisposable { }
}
