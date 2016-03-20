declare namespace atom {
  namespace Typings {
    export interface AtomEnvironment {
      command: CommandRegistry;
      config: Config;
      clipboard: Clipboard;
      contextMenu: ContextMenuManager;
      menu: MenuManager;
      keymaps: KeymapManager;
      tooltips: TooltipManager;
      notifications: NotificationManager;
      project: Project;
      grammars: GrammarRegistry;
      packages: PackageManager;
      themes: ThemeManager;
      styles: StyleManager;
      deserializers: DeserializerManager;
      views: ViewRegistry;
      workspace: Workspace;
      // Extended Methods
      onDidBeep(callback: () => void): Disposable;
      onWillThrowError(callback: (event: {
        originalError: Object;
        message: string;
        url: string;
        line: number;
        column: number;
        preventDefault(): void;
      }) => void): Disposable;
      onDidThrowError(callback: (event: {
        originalError: Object;
        message: string;
        url: string;
        line: number;
        column: number;
      }) => void): Disposable;

      // Atom Details
      inDevMode(): boolean;
      inSafeMode(): boolean;
      inSpecMode(): boolean;
      getVersion(): string;
      isReleasedVersion(): boolean;
      getWindowLoadTime(): number;
      getLoadSettings(): Object;

      // Managing The Atom Window
      open(params: {
        pathsToOpen: string[];
        newWindow: boolean;
        devMode: boolean;
        safeMode: boolean;
      }): void;
      close();
      getSize(): { width: number, height: number };
      setSize(width: number, height: number): void;
      getPosition(): { x: number, y: number };
      setPosition(x: number, y: number): void;

      // Extended Methods
      pickFolder(callback: (paths: string[]) => void): void;
      getCurrentWindow(): any;
      center(): void;
      focus(): void;
      show(): void;
      hide(): void;
      reload(): void;
      isMaximized(): boolean;
      isFullScreen(): boolean;
      setFullScreen(): void;
      toggleFullScreen(): void;

      // Messaging The User
      beep(): void;
      confirm(options: {
        message: string;
        detailedMessage?: string;
        buttons?: string[] | ButtonBag[]
      }): number;

      // Managing the Dev Tools
      // Extended Methods
      openDevTools(): PromiseLike<void>;
      toggleDevTools(): PromiseLike<void>;
      executeJavaScriptInDevTools(): void;
    }

    export interface ButtonBag {
      [index: string]: Function;
    }

    export class Color {
      public static parse(value: string | Object): Color;
      public toHexString(): string;
      public toRGBAString(): string;
    }

    export class Clipboard {
      write(text: string, metadata?: any): void;
      read(): string;
      readWithMetadata(): {
        text: string;
        metadata: any;
      };
    }

    export interface CommandRegistry {
      add(target: string, commandName: string, callback: EventCallback): any;
      findCommands(params: { target: any }): Array<{ name: string, displayName: string }>;
      dispatch(target: any, commandName: string): void;
      onWillDispatch(callback: EventCallback): void;
      onDidDispatch(callback: EventCallback): void;
    }

    export interface Config {
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

    export interface ConfigOption {
      sources?: string[];
      excludeSources?: string[];
      scope?: ScopeDescriptor;
    }

    export interface ContextMenuItem {
      label?: string;
      command?: string;
      enabled?: boolean;
      submenu?: ContextMenuItem[];
      type?: 'separator';
      visible?: boolean;
      created?: (event: EventCallback) => void;
      shouldDisplay?: (event: EventCallback) => void;
    }

    export class ContextMenuManager {
      add(itemsBySelector: ContextMenuItem): Disposable;
    }

    export class Decoration {
      destroy(): void;
      onDidChangeProperties(callback: (event: {
        oldProperties: Object;
        newProperties: Object;
      }) => void): Disposable;
      onDidDestroy(callback: () => void): Disposable;
      getId(): any;
      getMarker(): any; // Marker;
      getProperties(): Object;
      setProperties(newProperties: Object): void;
    }

    export class DeserializerManager {
      add(deserializers: { name: string, deserialize: (serializedState: any, atom: AtomEnvironment) => any }): void;
      deserialize(state: Object): void;
    }

    export class Directory {
      constructor(directoryPath: string, symlink?: boolean);
      create(mode?: number): PromiseLike<boolean>;
      onDidChange(callback: () => void): Disposable;
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

    export class Disposable {
      static isDisposable(object: Object): boolean;
      constructor(disposalAction: Function);
      dispose(): void;
    }

    export class Emitter {
      clear(): void;
      dispose(): void;
      on(eventName: string, handler: (value: any) => void): Disposable;
      preempt(eventName: string, handler: (value: any) => void): Disposable;
      emit(eventName: string, value: any): void;
    }

    export interface EventCallback {
      (event): void
    }

    export class File {
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

    export class GitRepository {
      static open(path: string, options?: { refreshOnWindowFocus: boolean }): GitRepository;
      destroy();
      onDidDestroy(callback: () => void): Disposable;
      onDidChangeStatus(callback: (event: {
        path: string;
        pathStatus: number;
      }) => void): Disposable;
      onDidChangeStatuses(callback: () => void): Disposable;
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

    export interface Grammar {
      onDidUpdate(callback: () => void): Disposable;
      tokenizeLines(text: string): any[];
      tokenizeLine(line: string, ruleStack?: any[], firstLine?: boolean): {
        line: string;
        tags: number[];
        tokens(): any;
        ruleStack: any[];
      }
    }

    export interface GrammarRegistry {
      onDidAddGrammar(callback: (grammar: Grammar) => void): Disposable;
      onDidUpdateGrammar(callback: (grammar: Grammar) => void): Disposable;
      getGrammars(): Grammar[];
      grammarForScopeName(scopeName: string): Grammar;
      addGrammar(grammar: Grammar): Disposable;
      removeGrammarForScopeName(scopeName: string): Grammar;
      readGrammarSync(grammarPath: string): Grammar;
      readGrammar(grammarPath: string, callback: (err: Error, grammar: Grammar) => void): void;
      loadGrammarSync(grammarPath: string): Grammar;
      loadGrammar(grammarPath: string, callback: (err: Error, grammar: Grammar) => void): void;
    }

    // Available in lib.d.ts?
    export interface JSTooltipOption {
      animation?: boolean;
      container?: string | boolean;
      delay?: number | { show: number, hide: number };
      html?: boolean;
      placement?: string | ((tooltipDomNode: any, triggeringElementDomNode: any) => string);
      selector?: string | boolean;
      template?: string;
      title?: string | (() => string);
      trigger?: string;
      viewport?: string | { selector: string, padding: number } | ((triggeringElementDomNode: any) => string | { selector: string, padding: number });
    }

    export interface KeyBinding {
      enabled: boolean;
      matches(keystroke: string): boolean;
      compare(keyBinding: KeyBinding): number;
    }

    export class KeymapManager {
      static buildKeydownEvent(key: string, options?: KeyOption): void;
      constructor(options: { defaultTarget?: any });
      clear(): void;
      destroy(): void;

      // Event Subscription
      onDidMatchBinding(callback: (event: {
        keystrokes: string;
        binding: KeyBinding;
        keyboardEventTarget: any; // DOM element
      }) => void): Disposable;
      onDidPartiallyMatchBindings(callback: (event: {
        keystrokes: string;
        partiallyMatchedBindings: KeyBinding[];
        keyboardEventTarget: any;
      }) => void): Disposable;
      onDidFailToMatchBinding(callback: (event: {
        keystrokes: string;
        keyboardEventTarget: any;
      }) => void): Disposable;
      onDidFailToReadFile(callback: (error: {
        message: string;
        stack: string;
      }) => void): Disposable;

      // Adding and Removing Bindings
      add(source: string, bindings: Object, priority: number): void;

      // Accessing Bindings
      getKeyBindings(): KeyBinding[];
      findKeyBindings(params: {
        keystrokes: string;
        command: string;
        target: any
      }): KeyBinding[];
      loadKeymap(path: string, options: {
        watch: boolean;
        priority: number;
      }): void;
      watchKeymap(path: string, options: {
        priority: number;
      }): void;

      // Managing Keyboard Events
      handleKeyboardEvent(event: KeyboardEvent): void;
      keystrokeForKeyboardEvent(event: KeyboardEvent): string;
      getPartialMatchTimeout(): number;
    }

    export interface KeyOption {
      ctrl?: boolean;
      alt?: boolean;
      shift?: boolean;
      cmd?: boolean;
      which?: number;
      target: any; // ELEMNT?
    }

    export class LayerDecoration {
      destroy(): void;
      isDestroyed(): boolean;
      getProperties(): Object;
      setProperties(newProperties: Object): void;
      setPropertiesForMarker(marker: TextEditorMarker /* | Marker */, properties: Object): void;
    }

    export interface MenuItem {
      label: string;
      submenu?: MenuItem[];
      command?: string;
    }

    export class MenuManager {
      add(items: MenuItem): Disposable;
      update(): void;
    }

    export interface Notification {
      onDidDismiss(callback: () => void): Disposable;
      onDidDisplay(callback: () => void): Disposable;
      getType(): string;
      getMessage(): string;

      // Extended Methods
      dismiss(): void;
    }

    export class NotificationManager {
      onDidAddNotification(callback: (notification: Notification) => void): Disposable;
      addSuccess(message: string, options?: {
        detail?: string;
        dismissable?: boolean;
        icon?: string;
      }): void;
      addInfo(message: string, options?: {
        detail?: string;
        dismissable?: boolean;
        icon?: string;
      }): void;
      addWarning(message: string, options?: {
        detail?: string;
        dismissable?: boolean;
        icon?: string;
      }): void;
      addError(message: string, options?: {
        detail?: string;
        dismissable?: boolean;
        icon?: string;
      }): void;
      addFatalError(message: string, options?: {
        detail?: string;
        dismissable?: boolean;
        icon?: string;
      }): void;
      getNotifications(): Notification[];
    }

    export interface Package {
      onDidDeactivate(callback: () => void): Disposable;
      isCompatible(): boolean;
      rebuild(): PromiseLike<{
        code: any,
        stdout: any,
        stderr: any
      }>;
      getBuildFailureOutput(): string;
    }

    export class PackageManager {
      onDidLoadInitialPackages(callback: () => void): Disposable;
      onDidActivateInitialPackages(callback: () => void): Disposable;
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

    export class Point {
      static fromObject(object: Point | number[], copy?: boolean): Point;
      static min(point1: Point, point2: Point): Point;
      row: number;
      column: number;
      constructor(row: number, column: number);
      copy(): Point;
      negate(): Point;

      compare(other: Point): Point;
      isEqual(other: Point): boolean;
      isLessThan(other: Point): boolean;
      isLessThanOrEqual(other: Point): boolean;
      isGreaterThan(other: Point): boolean;
      isGreaterThanOrEqual(other: Point): boolean;
      freeze(): void;
      translate(other: Point): Point;
      traverse(other: Point): Point;
      toArray(): number[];
      serialize(): number[];
      toString(): string;
    }

    export class Project {
      // Event Subscription
      onDidChangePaths(callback: (projectPaths: string[]) => void): Disposable;

      // Accessing the git repository
      /**
       * Will be removed in 2.0
       */
      getRepositories(): GitRepository[];
      repositoryForDirectory(directory: Directory): PromiseLike<Repository>;
      getPaths(): string[];
      setPaths(projectPaths: string[]): void;
      addPath(projectPath: string): void;
      removePath(projectPath: string): void;
      getDirectories(): Directory[];
      relativizePath(fullPath: string): { projectPath: string, relativePath: string }[];
      contains(pathToCheck: string): boolean;
    }

    export class Range {
      start: Point;
      end: Point;
      static fromObject(object: Range | Point[], copy?: boolean): Range;
      constructor(pointA: Point, pointB: Point);
      copy(): Range;
      negate(): Range;

      static deserialize(array: any): Range;
      serialize(): any;

      isEmpty(): boolean;
      isSingleLine(): boolean;
      getRowCount(): number;
      getRows(): number[];

      freeze(): void;
      union(otherRange: Range): Range;
      translate(startDelta: Point, endDelta?: Point): Range;
      traverse(delta: Point): Range;


      compare(otherRange: Range): Range;
      isEqual(otherRange: Range): boolean;
      coversSameRows(otherRange: Range): boolean;
      intersectsWith(otherRange: Range, exclusive?: boolean): boolean;
      containsRange(otherRange: Range, exclusive?: boolean): boolean;
      containsPoint(point: Point, exclusive?: boolean): boolean;
      intersectsRow(row: number): boolean;
      intersectsRowRange(startRow: number, endRow: number): boolean;
      toString(): string;

    }

    export interface Repository { }

    export interface SetRangeOption {
      preserveFolds: boolean;
      autoScroll: boolean;
    }
    export class Selection {
      onDidChangeRange(callback: (event: {
        oldBufferRange: Range;
        oldScreenRange: Range;
        newBufferRange: Range;
        newScreenRange: Range;
        selection: Selection
      }) => void): Disposable;
      onDidDestroy(callback: () => void): Disposable;
      getScreenRange(): Range;
      setScreenRange(screenRange: Range, options?: SetRangeOption): void;
      getbufferRange(): Range;
      setbufferRange(bufferRange: Range, options?: SetRangeOption): void;
      getBufferRowRange(): any;
      isEmpty(): boolean;
      isReversed(): boolean;
      isSingleScreenLine(): boolean;
      getText(): string;
      intersectsBufferRange(bufferRange: Range): boolean;
      intersectsWith(otherSelection: Selection): boolean;
      clear(options?: { autoScroll: boolean }): void;
      selectToScreenPosition(position: Point): void;
      selectToBufferPosition(position: Point): void;
      selectRight(columnCount?: number): void;
      selectLeft(columnCount?: number): void;
      selectUp(rowCount?: number): void;
      selectDown(rowCount?: number): void;
      selectToTop(): void;
      selectToBottom(): void;
      selectAll(): void;
      selectToBeginningOfLine(): void;
      selectToFirstCharactorOfLine(): void;
      selectToEndOfLine(): void;
      selectToEndOfBufferLine(): void;
      selectToBeginningOfWord(): void;
      selectToEndOfWord(): void;
      selectToBeginningOfNextWord(): void;
      selectToPreviousWordBoundary(): void;
      selectToNextWordBoundary(): void;
      selectToPreviousSubwordBoundary(): void;
      selectToNextSubwordBoundary(): void;
      selectToBeginningOfNextParagraph(): void;
      selectToBeginningOfPreviousParagraph(): void;
      selectWord(): void;
      expandOverWord(): void;
      selectLine(row: number): void;
      expandOverLine(): void;
      insertText(text: string, options?: {
        select: boolean;
        autoIndent: boolean;
        autoIndentNewLine: boolean;
        autoDecreaseIndent: boolean;
        normalizeLineEndings?: boolean;
        undo: string
      }): void;
      backspace(): void;
      deleteToPreviousWordBoundary(): void;
      deleteToNextWordBoundary(): void;
      deleteToBeginningOfWord(): void;
      deleteToBeginningOfLine(): void;
      delete(): void;
      deleteToEndOfLine(): void;
      deleteToEndOfWord(): void;
      deleteToBeginningOfSubword(): void;
      deleteToEndOfSubword(): void;
      deleteLine(): void;
      joinLines(): void;
      outdentSelectedRows(): void;
      autoIndentSelectedRows(): void;
      toggleLineComments(): void;
      cutToEndOfLine(): void;
      cutToEndOfBufferLine(): void;
      cut(maintainClipboard: boolean, fullLine: boolean): void;
      copy(maintainClipboard: boolean, fullLine: boolean): void;
      fold(): void;
      indentSelectedRows(): void;
      addSelectionBelow(): void;
      addSelectionAbove(): void;
      merge(otherSelection: Selection, options?: SetRangeOption): void;
      compare(otherSelection: Selection): number;
    }

    export class ScopeDescriptor {
      constructor(options?: { scopes: string[] });
      getScopesArray(): string[];
    }

    export interface StyleElement extends HTMLStyleElement {
      sourcePath: string;
      context: string;
    }

    export class StyleManager {
      observeStyleElements(callback: (styleElement: StyleElement) => void): Disposable;
      onDidAddSytleElement(callback: (styleElement: StyleElement) => void): Disposable;
      onDidRemoveSytleElement(callback: (styleElement: HTMLStyleElement) => void): Disposable;
      onDidUpdateSytleElement(callback: (styleElement: StyleElement) => void): Disposable;
      getStyleElements(): StyleElement[];
      getUserStyleSheetPath(): string;
    }

    export class TextEditorMarker {
      destroy(): void;
      copy(properties?: Object): TextEditorMarker;
      onDidChange(callback: (event: {
        oldHeadBufferPosition: Point;
        newHeadBufferPosition: Point;
        oldTailBufferPosition: Point;
        newTailBufferPosition: Point;
        oldHeadScreenPosition: Point;
        newHeadScreenPosition: Point;
        oldTailScreenPosition: Point;
        newTailScreenPosition: Point;
        wasValid: boolean;
        isValid: boolean;
        hadTail: boolean;
        hasTail: boolean;
        oldProperties: Object;
        newProperties: Object;
        textChanged: boolean;
      }) => void): Disposable;
      onDidDestroy(callback: () => void): Disposable;
      isValid(): boolean;
      isDestroyed(): boolean;
      isReversed(): boolean;
      getInvalidationStrategy(): string;
      getProperties(): Object;
      setProperties(properties: Object): void;
      isEqual(other: TextEditorMarker): boolean;
      compare(other: TextEditorMarker): number;
      getBufferRange(): Range;
      setBufferRange(bufferRange: Range, properties?: { reversed: boolean } ): void;
      getScreenRange(): Range;
      setScreenRange(bufferRange: Range, properties?: { reversed: boolean } ): void;
      getStartBufferPosition(): Point;
      getStartScreenPosition(): Point;
      getEndBufferPosition(): Point;
      getEndScreenPosition(): Point;

      // Extended Methods
      getHeadBufferPosition(): Point;
      getHeadBufferPosition(bufferPosition: Point, properties?: Object): void;
      getHeadScreenPosition(): Point;
      getHeadScreenPosition(screenPosition: Point, properties?: Object): void;
      getTailBufferPosition(): Point;
      getTailBufferPosition(bufferPosition: Point, properties?: Object): void;
      getTailScreenPosition(): Point;
      getTailScreenPosition(screenPosition: Point, properties?: Object): void;
      hasTail(): boolean;
      plantTail(properties?: Object): void;
      clearTail(properties?: Object): void;
    }

    export class ThemeManager {
      onDidChangeActiveThemes(callback: () => void): Disposable;
      getLoadedThemeNames(): string[];
      getLoadedThemes(): any[];
      getActiveThemeNames(): string[];
      getActiveThemes(): any[];
      getEnabledThemeNames(): string[];
    }

    export interface TooltipOption extends JSTooltipOption {
      keyBindingCommand?: string;
      keyBindingTarget?: HTMLElement;
    }

    export class TooltipManager {
      add(target: HTMLElement, options: TooltipOption): Disposable;
    }

    export class ViewRegistry {
      addViewProvider(createView: () => HTMLElement): Disposable;
      addViewProvider(modelConstructor: Function, createView: () => HTMLElement): Disposable;
      getView(object: Object): any; // DOM element
    }

    export interface Workspace {
      addModalPanel(option: any);
    }

  }

  export var command: Typings.CommandRegistry;
  export var config: Typings.Config;
  export var clipboard: Typings.Clipboard;
  export var contextMenu: Typings.ContextMenuManager;
  export var menu: Typings.MenuManager;
  export var keymaps: Typings.KeymapManager;
  export var tooltips: Typings.TooltipManager;
  export var notifications: Typings.NotificationManager;
  export var project: Typings.Project;
  export var grammars: Typings.GrammarRegistry;
  export var packages: Typings.PackageManager;
  export var themes: Typings.ThemeManager;
  export var styles: Typings.StyleManager;
  export var deserializers: Typings.DeserializerManager;
  export var views: Typings.ViewRegistry;
  export var workspace: Typings.Workspace;

  // Extended Methods
  export function onDidBeep(callback: () => void): Typings.Disposable;
  export function onWillThrowError(callback: (event: {
    originalError: Object;
    message: string;
    url: string;
    line: number;
    column: number;
    preventDefault(): void;
  }) => void): Typings.Disposable;
  export function onDidThrowError(callback: (event: {
    originalError: Object;
    message: string;
    url: string;
    line: number;
    column: number;
  }) => void): Typings.Disposable;

  // Atom Details
  export function inDevMode(): boolean;
  export function inSafeMode(): boolean;
  export function inSpecMode(): boolean;
  export function getVersion(): string;
  export function isReleasedVersion(): boolean;
  export function getWindowLoadTime(): number;
  export function getLoadSettings(): Object;

  // Managing The Atom Window
  export function open(params: {
    pathsToOpen: string[];
    newWindow: boolean;
    devMode: boolean;
    safeMode: boolean;
  }): void;
  export function close();
  export function getSize(): { width: number, height: number };
  export function setSize(width: number, height: number): void;
  export function getPosition(): { x: number, y: number };
  export function setPosition(x: number, y: number): void;

  // Extended Methods
  export function pickFolder(callback: (paths: string[]) => void): void;
  export function getCurrentWindow(): any;
  export function center(): void;
  export function focus(): void;
  export function show(): void;
  export function hide(): void;
  export function reload(): void;
  export function isMaximized(): boolean;
  export function isFullScreen(): boolean;
  export function setFullScreen(): void;
  export function toggleFullScreen(): void;

  // Messaging The User
  export function beep(): void;
  export function confirm(options: {
    message: string;
    detailedMessage?: string;
    buttons?: string[] | Typings.ButtonBag[]
  }): number;

  // Managing the Dev Tools
  // Extended Methods
  export function openDevTools(): PromiseLike<void>;
  export function toggleDevTools(): PromiseLike<void>;
  export function executeJavaScriptInDevTools(): void;
}

declare module 'atom' {
  export class CompositeDisposable {
    constructor(...disposables: { dispose: () => any }[]);
    dispose(): void;
    add(...disposables: { dispose: () => any }[]): void;
    remove(disposable: { dispose: () => any }): void;
    clear(): void;
  }
}
