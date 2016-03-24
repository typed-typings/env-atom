declare namespace atom {
  namespace Typings {
    export class BufferedNodeProcess extends BufferedProcess {
    }

    export class BufferedProcess {
      constructor(options: {
        command: string,
        args?: any[],
        options?: Object,
        stdout?: (data: string) => void;
        stderr?: (data: string) => void;
        exit?: (code: number) => void;
      });
      onWillThrowError(callback: (errorObject: { error: Object, handle(): void })=>void): atom.Typings.Disposable;
      kill(): void;
    }
    export class CompositeDisposable {
      constructor(...disposables: { dispose: () => any }[]);
      dispose(): void;
      add(...disposables: { dispose: () => any }[]): void;
      remove(disposable: { dispose: () => any }): void;
      clear(): void;
    }

    export class Task {
      // Methods
      static once(taskPath: string, args: any[]): Task;
      constructor(taskPath: string);
      start(args: any[], callback?: Function): void;
      send(message: any): void;
      on(eventName: string, callback: Function): void;
      once(taskPath: string, args: any[]): Task;
      terminate(): void;
    }

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
      onDidBeep: EventHandler;
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

    export interface ClipScreenPositionOption {
        wrapBeyondNewlines?: boolean;
        wrapAtSoftNewlines?: boolean;
        screenLine?: boolean;
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

    export interface Cursor {
      onDidChangePosition: CursorChangeEventHandler;
      onDidDestroy: EventHandler;
      onDidChangeVisibility(callback: (visibility: boolean) => void): Disposable;
      setScreenPosition(screenPosition: number[], options?: { autoscroll: boolean }): void;
      getScreenPosition(): Point;
      setBufferPosition(bufferPosition: number[], options?: { autoscroll: boolean }): void;
      getBufferPosition(): Point;
      getScreenRow(): number;
      getScreenColumn(): number;
      getBufferRow(): number;
      getBufferColumn(): number;
      getCurrentBufferLine(): number;
      isAtBeginningOfLine(): boolean;
      isAtEndOfLine(): boolean;
      getMarker(): TextEditorMarker;
      isSurroundedByWhitespace(): boolean;
      isBetweenWOrdAndNonWord(): boolean;
      isInsideWord(option?: { wordRegex: RegExp }): boolean;
      getIndentLevel(): number;
      getScopeDescriptor(): ScopeDescriptor;
      hasPrecedingCharactersOnLine(): boolean;
      isLastCursor(): boolean;
      moveUp(rowCount?: number, options?: { moveToEndOfSelection }): void;
      moveDown(rowCount?: number, options?: { moveToEndOfSelection }): void;
      moveLeft(columnCount?: number, options?: { moveToEndOfSelection }): void;
      moveRight(columnCount?: number, options?: { moveToEndOfSelection }): void;
      moveToTop(): void;
      moveToBottom(): void;
      moveToBeginningOfScreenLine(): void;
      moveToBeginningOfLine(): void;
      moveToFirstCharacterOfLine(): void;
      moveToEndOfScreenLine(): void;
      moveToEndOfLine(): void;
      moveToBeginningOfWord(): void;
      moveToEndOfWord(): void;
      moveToBeginningOfNextWord(): void;
      moveToPreviousWordBoundary(): void;
      moveToNextWordBoundary(): void;
      moveToPreviousSubwordBoundary(): void;
      moveToNextSubwordBoundary(): void;
      skipLeadingWhitespace(): void;
      moveToBeginningOfNextParagraph(): void;
      moveToBeginningOfPreviousParagraph(): void;
      getPreviousWordBoundaryBufferPosition(options?: { wordRegex: RegExp }): any;
      getNextWordBoundaryBufferPosition(options?: { wordRegex: RegExp }): any;
      getBeginningOfCurrentWordBufferPosition(options?: {
        wordRegex: RegExp,
        includeNonWordCharacters: boolean,
        allowPrevious: boolean}): Range;
      getEndOfCurrentWordBufferPosition(options?: {
        wordRegex: RegExp,
        includeNonWordCharacters: boolean
      }): Range;
      getBeginningOfNextWordBufferPosition(options?: { wordRegex: RegExp }): Range;
      getCurrentWordBufferRange(options?: { wordRegex: RegExp }): Range;
      getCurrentLineBufferRange(options?: { includeNewLine: boolean }): Range;
      getCurrentParagraphBufferRange(): Range;
      getCurrentWordPrefix(): string;
      setVisible(): void;
      isVisible(): boolean;
      compare(otherCursor: Cursor): number;
      clearAutoscroll(): void;
      clearSelection(): void;
      wordRegExp(options?: { includeNonWordCharacters?: boolean }): RegExp;
      subwordRegExp(options?: { backwards?: boolean}): RegExp;
    }

    export interface CursorChangeEventHandler {
      (callback: (event: {
        oldBufferPosition: Point,
        oldScrrenPosition: Point,
        newBufferPosition: Point,
        newScrrenPosition: Point,
        textChanged: boolean,
        cursor: Cursor
      }) => void): Disposable;
    }

    export class Decoration {
      destroy(): void;
      onDidChangeProperties(callback: (event: {
        oldProperties: Object;
        newProperties: Object;
      }) => void): Disposable;
      onDidDestroy: EventHandler;
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
      onDidChange: EventHandler;
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

    export interface EventHandler {
      (callback: () => void): Disposable;
    }

    export interface EventCallback {
      (event: any): void;
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
      onDidDestroy: EventHandler;
      onDidChangeStatus(callback: (event: {
        path: string;
        pathStatus: number;
      }) => void): Disposable;
      onDidChangeStatuses: EventHandler;
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
      onDidUpdate: EventHandler;
      tokenizeLines(text: string): any[];
      tokenizeLine(line: string, ruleStack?: any[], firstLine?: boolean): {
        line: string;
        tags: number[];
        tokens(): any;
        ruleStack: any[];
      };
    }

    export interface GrammarEventHandler {
      (callback: (grammar: Grammar) => void): Disposable;
    }

    export interface GrammarRegistry {
      onDidAddGrammar: GrammarEventHandler;
      onDidUpdateGrammar:GrammarEventHandler;
      getGrammars(): Grammar[];
      grammarForScopeName(scopeName: string): Grammar;
      addGrammar(grammar: Grammar): Disposable;
      removeGrammarForScopeName(scopeName: string): Grammar;
      readGrammarSync(grammarPath: string): Grammar;
      readGrammar(grammarPath: string, callback: (err: Error, grammar: Grammar) => void): void;
      loadGrammarSync(grammarPath: string): Grammar;
      loadGrammar(grammarPath: string, callback: (err: Error, grammar: Grammar) => void): void;
    }

    export interface Gutter {
      // Gutter Destruction
      destroy(): void;

      // Event Subscription
      onDidChangeVisible(callback: (gutter: Gutter) => void): Disposable;
      onDidDestroy: EventHandler;

      // Visibility
      hide(): void;
      show(): void;
      isVisible(): boolean;
      decorateMarker(marker: TextEditorMarker, decorationParams: { type: 'line-number' | 'gutter' }): Decoration;
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

    // NOT FOUND
    export class Marker extends TextEditorMarker {

    }

    export interface MarkerLayer {
      // Lifecycle
      copy(): void;
      destroy(): void;
      isDestroyed(): boolean;
      // Querying
      getMarker(): Marker;
      getMarkers(): Marker[];
      getMarkerCount(): number;
      /**
       * @params params A hash of key-value pairs constraining the set of returned markers.
       * You can query against custom marker properties by listing the desired key-value pairs here.
       * In addition, the following keys are reserved and have special semantics:
       *    startPosition	Only include markers that start at the given Point.
       *    endPosition Only include markers that end at the given Point.
       *    containsPoint Only include markers that contain the given Point, inclusive.
       *    containsRange	Only include markers that contain the given Range, inclusive.
       *    startRow Only include markers that start at the given row Number.
       *    endRow Only include markers that end at the given row Number.
       *    intersectsRow Only include markers that intersect the given row Number.
       */
      findMarkers(params: {
        startPosition?: Point,
        endPosition?: Point,
        containsPoint?: Point,
        containsRange?: Range,
        startRow?: number,
        endRow?: number;
        intersectsRow?: number
      }): Marker[];
      // Marker creation
      markRange(range: Range | Point[], properties: {
        reversed?: boolean,
        persistent?: boolean,
        invalidate?: 'never' | 'surround' | 'overlap' | 'inside' | 'touch'
      }): Marker;
      markPosition(position: Point | number[], properties: {
        reversed?: boolean,
        persistent?: boolean,
        invalidate?: 'never' | 'surround' | 'overlap' | 'inside' | 'touch'
      }): Marker;
      // Event subscription

      onDidUpdate: EventHandler;
      onDidCreateMarker: EventHandler;
      onDidDestroy(): Disposable;
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
      onDidDismiss: EventHandler;
      onDidDisplay: EventHandler;
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
      onDidDeactivate: EventHandler;
      isCompatible(): boolean;
      rebuild(): PromiseLike<{
        code: any,
        stdout: any,
        stderr: any
      }>;
      getBuildFailureOutput(): string;
    }

    export class PackageManager {
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

    export interface Pane {
      // Event Subscription
      onDidChangeFlexScale(callback: (flexScale: number) => void): Disposable;
      observeFlexScale(callback: (flexScale: number) => void): Disposable;
      onDidActivate: EventHandler;
      onWillDestroy: EventHandler;
      onDidDestroy: EventHandler;
      onDidChangeActive(callback: (active: boolean) => void): Disposable;
      observeActive(callback: (active: boolean) => void): Disposable;
      onDidAddItem(callback: (event: { item: any, index: number }) => void): Disposable;
      onDidRemoveItem(callback: (event: { item: any, index: number }) => void): Disposable;
      onWillRemoveItem(callback: (event: { item: any, index: number }) => void): Disposable;
      onDidMoveItem(callback: (event: { item: any, oldIndex: number, newIndex: number }) => void): Disposable;
      observeItems(callback: (item: any) => void): Disposable;
      onDidChangeActiveItem(callback: (activeItem: any) => void): Disposable;
      observeActiveItem(callback: (activeItem: any) => void): Disposable;
      onWillDestroyItem(callback: (event: { item: any, index: number }) => void): Disposable;

      // Items
      getItems(): any[];
      getActiveItem(): any;
      itemAtIndex(index: number): any;
      activateNextItem(): void;
      activatePreviousItem(): void;
      moveItemRight(): void;
      moveItemLeft(): void;
      getActiveItemIndex(): number;
      activateItemAtIndex(index: number): void;
      activateItem(options?: { pending?: boolean }): void;
      addItem(item: any, options: { index: number, pending: boolean }): any;
      addItems(items: any[], index?: number): any[];
      moveItem(item: any, index: number): void;
      moveItemToPane(item: any, pane: Pane, index: number): void;
      destroyActiveItem(): void;
      destroyItem(item: any): void;
      destroyItems(): void;
      destroyInactiveItems(): void;
      saveActiveItem(): void;
      saveActiveItemAs(nextAction?: Function): void;
      saveItem(item, nextAction?: Function): void;
      saveItemAs(item, nextAction?: Function): void;
      saveItems(): void;
      itemForURI(uri: string): void;
      activateItemForURI(uri: string): boolean;

      // Lifecycle
      isActive(): boolean;
      activate(): void;
      destroy(): void;

      // Splitting
      splitLeft(params?: { items?: any[], copyActiveItem?: boolean }): Pane;
      splitRight(params?: { items?: any[], copyActiveItem?: boolean }): Pane;
      splitUp(params?: { items?: any[], copyActiveItem?: boolean }): Pane;
      splitDown(params?: { items?: any[], copyActiveItem?: boolean }): Pane;
    }

    export interface Panel {
      // Construction and Destruction
      destroy(): void;

      // Event Subscription
      onDidChangeVisible(callback: (visible) => void): Disposable;
      onDidDestroy: EventHandler;

      // Panel Details
      getItem(): any;
      getPriority(): number;
      isVisible(): boolean;
      hide(): void;
      show(); void;
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
      repositoryForDirectory(directory: Directory): PromiseLike<GitRepository>; // Was Repository. Likely API mistake.
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

    // NOT FOUND
    export interface Repository { }

    export interface ScanFunction {
      (regex: RegExp, iterator: (match: any, matchText: string, range: Range, stop: Function, replace: (value: string) => void) => void): void;
    }

    export interface ScanInRangeFunction {
      (regex: RegExp, range: Range, iterator: (match: any, matchText: string, range: Range, stop: Function, replace: (value: string) => void) => void): void;
    }

    export class ScopeDescriptor {
      constructor(options?: { scopes: string[] });
      getScopesArray(): string[];
    }

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
      onDidDestroy: EventHandler;
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
        undo: 'skip'
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

    export interface SelectionChangeEventHandler {
      (callback: (event: {
        oldBufferRange: Range,
        oldScreenRange: Range,
        newBufferRange: Range,
        newScreenRange: Range,
        selection: Selection
      }) => void): Disposable;
    }

    export class TextBuffer {
      constructor(params: string | { load: boolean, text: string });
      onWillChange(callback: (event: {
        oldRange: Range,
        newRange: Range,
        oldText: string,
        newText: string
      }) => void): Disposable;
      onDidChange(callback: (event: {
        oldRange: Range,
        newRange: Range,
        oldText: string,
        newText: string
      }) => void): Disposable;
      onDidStopChanging: EventHandler;
      onDidConflict: EventHandler;
      onDidChangeModified(callback: (modified: boolean) => void): Disposable;
      onDidUpdateMarkers: EventHandler;
      onDidCreateMarker(callback: (marker: TextEditorMarker)=> void): Disposable;
      onDidChangePath(callback: (path: string) => void): Disposable;
      onDidChangeEncoding(callback: (encoding: string) => void): Disposable;
      onWillSave: EventHandler;
      onDidSave(callback: (event: { path: string })=>void): Disposable;
      onDidDelete: EventHandler;
      onWillReload: EventHandler;
      onDidReload: EventHandler;
      onDidDestroy: EventHandler;
      onWillThrowWatchError(callback: (errorObject: {
        error: Object,
        handle(): void
      }) => void): Disposable;
      getStoppedChangingDelay(): number;
      isModified(): boolean;
      isInConflict(): boolean;
      getPath(): string;
      setPath(filePath: string): void;
      setEncoding(encoding: string): void;
      getEncoding(): string;
      getUri(): string;
      isEmpty(): boolean;
      getText(): string;
      getTextInRange(range: Range): string;
      getLines(): string[];
      getLastLine(): string;
      lineForRow(row: number): string;
      lineEndingForRow(row: number): '\n' | '\r' | '\r\n' | '';
      lineLengthForRow(row: number): number;
      isRowBlank(row: number): boolean;
      previousNonBlankRow(startRow: number): number;
      nextNonBlankRow(startRow: number): number;
      setText(text: string): Range;
      setTextViaDiff(text: string): any;
      setTextInRange(range: Range, text: string, options?: { normalizeLineEndings?: boolean, undo?: 'skip'}): Range;
      insert(position: Point, text: string, options?: { normalizeLineEndings?: boolean, undo?: 'skip'}): Range;
      append(text: string, options?: { normalizeLineEndings?: boolean, undo?: 'skip'}): Range;
      delete(range: Range): Range;
      deleteRow(row: number): Range;
      deleteRows(startRow: number, endRow: number): Range;
      addMarkerLayer(options: { maintainHistory: boolean }): MarkerLayer;
      getMarkerLayer(id: any): MarkerLayer;
      markRange(range: Range | Point[], properties: {
        reversed?: boolean,
        persistent?: boolean,
        invalidate?: 'never' | 'surround' | 'overlap' | 'inside' | 'touch'
      }): Marker;
      markPosition(position: Point | number[], properties: {
        reversed?: boolean,
        persistent?: boolean,
        invalidate?: 'never' | 'surround' | 'overlap' | 'inside' | 'touch'
      }): Marker;
      getMarkers(): Marker[];
      getMarker(id: number): Marker;
      /**
       * @params params A hash of key-value pairs constraining the set of returned markers.
       * You can query against custom marker properties by listing the desired key-value pairs here.
       * In addition, the following keys are reserved and have special semantics:
       *    startPosition	Only include markers that start at the given Point.
       *    endPosition Only include markers that end at the given Point.
       *    containsPoint Only include markers that contain the given Point, inclusive.
       *    containsRange	Only include markers that contain the given Range, inclusive.
       *    startRow Only include markers that start at the given row Number.
       *    endRow Only include markers that end at the given row Number.
       *    intersectsRow Only include markers that intersect the given row Number.
       */
      findMarkers(params: {
        startPosition?: Point,
        endPosition?: Point,
        containsPoint?: Point,
        containsRange?: Range,
        startRow?: number,
        endRow?: number;
        intersectsRow?: number
      }): Marker[];
      getMarkerCount(): number;
      undo(): void;
      redo(): void;
      transact(fn: () => void): void;
      transact(groupingInterval: number, fn: () => void): void;
      clearUndoStack(): void;
      createCheckpoint(): any;
      revertToCheckpoint(): boolean;
      groupChangesSinceCheckpoint(): boolean;
      scan: ScanFunction;
      backwardsScan: ScanFunction;
      scanInRange: ScanInRangeFunction;
      backwardsScanInRange: ScanInRangeFunction;
      replace(regex: RegExp, replacementText: string): number;
      getRange(): Range;
      getLineCount(): number;
      getLastRow(): number;

      getFirstPosition(): Point;
      getEndPosition(): Point;
      getMaxCharacterIndex():  number;
      rangeForRow(row: number, includeNewline: boolean): Range;
      characterIndexForPosition(position: Point): number;
      positionForCharacterIndex(offset: number): Point;
      clipRange(range: Range): Range;
      clipPosition(position: Point): Point;
      save(): void;
      saveAs(filePath: string): void;
      reload(): void;
    }

    export class TextEditor {
      onDidChangeTitle: EventHandler;
      onDidChangePath: EventHandler;
      onDidChange: EventHandler;
      onDidStopChanging: EventHandler;
      onDidChangeCursorPosition: CursorChangeEventHandler;
      onDidChangeSelectionRange: SelectionChangeEventHandler;
      onDidSave(callback: (event: { path: string }) => void): Disposable;
      onDidDestroy: EventHandler;
      getBuffer(): TextBuffer;
      observeGutters(callback: (gutter: Gutter) => void): Disposable;
      onDidAddGutter(callback: (gutter: Gutter) => void): Disposable;
      onDidRemoveGutter(callback: (name: string) => void): Disposable;

      // Extended Methods
      onDidChangeSoftWrapped: EventHandler;
      onDidChangeEncoding: EventHandler;
      observeGrammar: GrammarEventHandler;
      onDidChangeGrammar: GrammarEventHandler;
      onDidChangeModified: EventHandler;
      onDidConflict: EventHandler;
      onWillInsertText(callback: (event: { text: string, cancel(): void }) => void): Disposable;
      onDidInsertText(callback: (event: { text: string }) => void): Disposable;
      observeCursors(callback: (cursor: Cursor) => void): Disposable;
      onDidAddCursor(callback: (cursor: Cursor) => void): Disposable;
      onDidRemoveCursor(callback: (cursor: Cursor) => void): Disposable;
      observeSelections(callback: (selection: Selection) => void): Disposable;
      onDidAddSelection(callback: (selection: Selection) => void): Disposable;
      onDidRemoveSelection(callback: (selection: Selection) => void): Disposable;
      observeDecorations(callback: (decoration: Decoration) => void): Disposable;
      onDidAddDecoration(callback: (decoration: Decoration) => void): Disposable;
      onDidRemoveDecoration(callback: (decoration: Decoration) => void): Disposable;
      onDidChangePlaceholderText(callback: (placeholderText: string) => void): Disposable;

      // File Details
      getTitle(): string;
      getLongTitle(): string;
      getPath(): string;
      isModified(): boolean;
      isEmpty(): boolean

      // Extended Methods
      getEncoding(): string;
      setEncoding(encoding): void;

      // File Operations
      save(): void;
      saveAs(filePath: string): void;

      // Reading Text
      getText(): string;
      getTextInBufferRange(range: Range): string;
      getLineCount(): number;
      getScreenLineCount(): number;
      getLastBufferRow(): number;
      getLastScreenRow(): number;
      lineTextForBufferRow(bufferRow: number): string;
      lineTextForScreenRow(screenRow: number): string;
      getCurrentParagraphBufferRange(): Range;

      // Mutating Text
      setText(text: string): void
      setTextInBufferRange(range: Range, text: string, options?: {
        normalizeLineEndings?: boolean,
        undo?: 'skip'
      }): Range;
      insertText(text: string, options?: {
        select: boolean;
        autoIndent: boolean;
        autoIndentNewLine: boolean;
        autoDecreaseIndent: boolean;
        normalizeLineEndings?: boolean;
        undo: 'skip'
      }): Range | boolean;
      insertNewline(): void;
      delete(): void;
      backspace(): void;

      // Extended Methods
      mutateSelectedText(fn: (selection: Selection, index: number) => void): void;
      transpose(): void;
      upperCase(): void;
      lowerCase(): void;
      toggleLineCommentsInSelection(): void;
      insertNewlineBelow(): void;
      insertNewlineAbove(): void;
      deleteToBeginningOfWord(): void;
      deleteToPreviousWordBoundary(): void;
      deleteToNextWordBoundary(): void;
      deleteToBeginningOfSubword(): void;
      deleteToEndOfSubword(): void;
      deleteToBeginningOfLine(): void;
      deleteToEndOfLine(): void;
      deleteToEndOfWord(): void;
      deleteLine(): void;

      // History
      undo(): void;
      redo(): void;

      // Extended Methods
      transact(fn: Function): void;
      transact(groupingInterval: number, fn: Function): void;
      abortTransaction(): void;
      createCheckpoint(): any;
      revertToCheckpoint(): boolean;
      groupChangesSinceCheckpoint(): boolean;

      // TextEditor Coordinates
      screenPositionForBufferPosition(bufferPosition: Point | number[], options?: ClipScreenPositionOption): Point;
      bufferPositionForScreenPosition(bufferPosition: Point | number[], options?: ClipScreenPositionOption): Point;
      screenRangeForBufferRange(bufferRange: Range): Range;
      bufferRangeForScreenRange(screenRange: Range): Range;

      // Extended Methods
      clipBufferPosition(bufferPosition: Point): Point;
      clipBufferRange(range: Range): Range;
      clipScreenPosition(screenPosition: Point, options?: ClipScreenPositionOption): Point;
      clipScreenRange(range: Range, options?: ClipScreenPositionOption): Range;

      // Decorations
      decorateMarker(marker: TextEditorMarker, decorationParams: {
        type: 'line' | 'line-number' | 'highlight' | 'overlay' | 'gutter' | 'block',
        class: string,
        item?: HTMLElement | Object,
        onlyHead?: boolean,
        onlyEmpty?: boolean,
        onlyNonEmpty?: boolean,
        position?: 'head' | 'tail' | 'before' | 'after'
      }): Decoration;
      decorateMarkerLayer(markerLayer: TextEditorMarkerLayer | MarkerLayer, decorationParams: {
        type: 'line' | 'line-number' | 'highlight' | 'block',
        class: string,
        item?: HTMLElement | Object,
        onlyHead?: boolean,
        onlyEmpty?: boolean,
        onlyNonEmpty?: boolean,
        position?: 'head' | 'tail' | 'before' | 'after'
      }): Decoration;

      // Extended Methods
      getDecorations(propertyFilter?: Object): Decoration[];
      getLineDecorations(propertyFilter?: Object): Decoration[];
      getLineNumberDecorations(propertyFilter?: Object): Decoration[];
      getHighlightDecorations(propertyFilter?: Object): Decoration[];
      getOverlayDecorations(propertyFilter?: Object): Decoration[];

      // Markers
      markBufferRange(range: Range | Point[], properties: {
        maintainHistory?: boolean,
        reversed?: boolean,
        persistent?: boolean,
        invalidate?: 'never' | 'surround' | 'overlap' | 'inside' | 'touch'
      }): TextEditorMarker;
      markScreenRange(range: Range, properties: {
        maintainHistory?: boolean,
        reversed?: boolean,
        persistent?: boolean,
        invalidate?: 'never' | 'surround' | 'overlap' | 'inside' | 'touch'
      }): TextEditorMarker;
      markBufferPosition(position: Point | number[], options?: {
        reversed?: boolean,
        persistent?: boolean,
        invalidate?: 'never' | 'surround' | 'overlap' | 'inside' | 'touch'
      }): TextEditorMarker;
      markScreenPosition(position: Point | number[], options?: {
        reversed?: boolean,
        persistent?: boolean,
        invalidate?: 'never' | 'surround' | 'overlap' | 'inside' | 'touch'
      }): TextEditorMarker;
      findMarkers(properties: {
        startBufferRow: number,
        endBufferRow: number,
        containsBufferRange: Range | Point[],
        containsBufferPosition: Point | number[]
      }): TextEditorMarker[];
      getMarkerLayer(id: any): TextEditorMarkerLayer;
      getDefaultMarkerLayer(): TextEditorMarkerLayer;

      // Extended Methods
      getMarker(id: number): TextEditorMarker;
      getMarkers(): TextEditorMarker[];
      getMarkerCount(): number;
      addMarkerLayer(options: { maintainHistory?: boolean }): TextEditorMarkerLayer;

      // Cursors
      getCursorBufferPosition(): Point;
      getCursorBufferPositions(): Point[];
      setCursorBufferPosition(position: Point | number[], options?: { autoscroll?: boolean }): void
      getCursorAtScreenPosition(position: Point | number[]): Cursor;
      getCursorScreenPosition(): Point;
      getCursorScreenPositions(): Point[];
      setCursorScreenPosition(position: Point | number[], options?: { autoscroll?: boolean }): void;
      addCursorAtBufferPosition(bufferPosition: Point): Cursor;
      addCursorAtScreenPosition(screenPosition: Point): Cursor;
      hasMultipleCursors(): boolean;
      moveUp(lineCount?: number): void;
      moveDown(lineCount?: number): void;
      moveLeft(columnCount?: number): void;
      moveRight(columnCount?: number): void;
      moveToBeginningOfLine(): void;
      moveToBeginningOfScreenLine(): void;
      moveToFirstCharacterOfLine(): void;
      moveToEndOfLine(): void;
      moveToEndOfScreenLine(): void;
      moveToBeginningOfWord(): void;
      moveToEndOfWord(): void;

      // Extended Methods
      moveToTop(): void;
      moveToBottom(): void;
      moveToBeginningOfNextWord(): void;
      moveToPreviousWordBoundary(): void;
      moveToNextWordBoundary(): void;
      moveToPreviousSubwordBoundary(): void;
      moveToNextSubwordBoundary(): void;
      moveToBeginningOfNextParagraph(): void;
      moveToBeginningOfPreviousParagraph(): void;
      getLastCursor(): Cursor;
      getWordUnderCursor(options?: { wordRegex?: RegExp, includeNonWordCharacters: boolean, allowPrevious: boolean }): string;
      getCursors(): Cursor[];
      getCursorsOrderedByBufferPosition(): Cursor[];

      // Selections
      getSelectedText(): string;
      getSelectedBufferRange(): Range;
      getSelectedBufferRanges(): Range[];
      setSelectedBufferRange(bufferRange: Range | Point[], options?: {
        reversed: boolean,
        preserveFolds: boolean
      }): void;
      setSelectedBufferRanges(bufferRanges: Range[] | Point[][], options?: {
        reversed: boolean,
        preserveFolds: boolean
      }): void;
      getSelectedScreenRange(): Range;
      getSelectedScreenRanges(): Range[];
      setSelectedScreenRange(screenRange: Range | Point[], options?: { reversed: boolean}): void;
      setSelectedScreenRanges(screenRangee: Range[] | Point[][], options?: { reversed: boolean }): void;
      addSelectionForBufferRange(bufferRange, options?: { reversed: boolean }): Selection;
      addSelectionForScreenRange(screenRange, options?: { reversed: boolean }): Selection;
      selectToBufferPosition(position: Point): void;
      selectToScreenPosition(position: Point): void;
      selectUp(rowCount: number): void;
      selectDown(rowCount: number): void;
      selectLeft(columnCount: number): void;
      selectRight(columnCount: number): void;
      selectToTop(): void;
      selectToBottom(): void;
      selectAll(): void;
      selectToBeginningOfLine(): void;
      selectToFirstCharacterOfLine(): void;
      selectToEndOfLine(): void;
      selectToBeginningOfWord(): void;
      selectToEndOfWord(): void;
      selectLinesContainingCursors(): void;
      selectWordsContainingCursors(): void;

      // Extended Methods
      selectToPreviousSubwordBoundary(): void;
      selectToNextSubwordBoundary(): void;
      selectToPreviousWordBoundary(): void;
      selectToNextWordBoundary(): void;
      selectToBeginningOfNextWord(): void;
      selectToBeginningOfNextParagraph(): void;
      selectToBeginningOfPreviousParagraph(): void;
      selectMarker(marker: TextEditorMarker): void;
      getLastSelection(): Selection;
      getSelections(): Selection[];
      getSelectionsOrderedByBufferPosition(): Selection[];
      selectionIntersectsBufferRange(bufferRange: Range | Point[]): boolean;

      // Searching and Replacing
      scan: ScanFunction;
      scanInBufferRange: ScanInRangeFunction;
      backwardsScanInBufferRange: ScanInRangeFunction;

      // Tab Behavior
      getSoftTabs(): boolean;
      setSoftTabs(softTabs: boolean): void;
      toggleSoftTabs(): void;
      getTabLength(): number;
      setTabLength(tabLength: number): void;

      // Extended Methods
      usesSoftTabs(): boolean;
      getTabText(): string;

      // Soft Wrap Behavior
      isSoftWrapped(): boolean;
      setSoftWrapped(softWrapped: boolean): void;
      toggleSoftWrapped(): void;
      getSoftWrapColumn(): number;

      // Indentation
      indentationForBufferRow(bufferRow: number): number;
      setIndentationForBufferRow(bufferRow: number, newLevel: number, options?: { preserveLeadingWhitespace: boolean }): void;

      // Extended Methods
      indentSelectedRows(): void;
      outdentSelectedRows(): void;
      indentLevelForLine(line: string): number;
      autoIndentSelectedRows(): void;

      // Grammars
      getGrammar(): Grammar;
      setGrammar(grammar: Grammar): void;

      // Managing Syntax Scopes
      getRootScopeDescriptor(): ScopeDescriptor;
      scopeDescriptorForBufferPosition(bufferPosition: Point | number[]): ScopeDescriptor;

      // Extended Methods
      bufferRangeForScopeAtCursor(scopeSelector: string): Range;
      isBufferRowCommented(): boolean;

      // Clipboard Operations
      copySelectedText(): void;
      cutSelectedText(): void;
      pasteText(options?: {
        select: boolean;
        autoIndent: boolean;
        autoIndentNewLine: boolean;
        autoDecreaseIndent: boolean;
        normalizeLineEndings?: boolean;
        undo: 'skip'
      }): void;
      cutToEndOfLine(): void;
      cutToEndOfBufferLine(): void;

      // Folds
      foldCurrentRow(): void;
      unfoldCurrentRow(): void;
      foldBufferRow(bufferRow: number): void;
      unfoldBufferRow(bufferRow: number): void;

      //  Extended Methods
      foldSelectedLines(): void;
      foldAll(): void;
      unfoldAll(): void;
      foldAllAtIndentLevel(level: number): void;
      isFoldableAtBufferRow(bufferRow: number): boolean;
      isFoldableAtScreenRow(bufferRow: number): boolean;
      toggleFoldAtBufferRow(): void;
      isFoldedAtCursorRow(): boolean;
      isFoldedAtBufferRow(bufferRow: number): boolean;
      isFoldedAtScreenRow(screenRow: number): boolean;

      // Gutters
      addGutter(options: { name: string, priority?: number, visible?: boolean }): Gutter;
      getGutters(): Gutter[];
      gutterWithName(name: string): Gutter;

      // Scrolling the TextEditor
      scrollToCursorPosition(options?: { center?: boolean }): void;
      scrollToBufferPosition(bufferPosition: Point | number[] | { row: number, column: number }, options?: { center?: boolean }): void;
      scrollToScreenPosition(screenPosition: Point | number[] | { row: number, column: number }, options?: { center?: boolean }): void;

      // TextEditor Rendering
      getPlaceholderText(): string
      setPlaceholderText(placeholderText: string): void;
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
      onDidDestroy: EventHandler;
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

    export class TextEditorMarkerLayer {
      // Lifecycle
      destroy(): void;

      // Querying
      getMarker(): TextEditorMarker;
      getMarkers(): TextEditorMarker[];
      getMarkerCount(): number;
      findMarkers(properties: {
        startBufferRow: number,
        endBufferRow: number,
        containsBufferRange: Range | Point[],
        containsBufferPosition: Point | number[]
      }): TextEditorMarker[];

      // Marker creation
      markBufferRange(range: Range | Point[], properties: {
        maintainHistory?: boolean,
        reversed?: boolean,
        persistent?: boolean,
        invalidate?: 'never' | 'surround' | 'overlap' | 'inside' | 'touch'
      }): TextEditorMarker;
      markScreenRange(range: Range, properties: {
        maintainHistory?: boolean,
        reversed?: boolean,
        persistent?: boolean,
        invalidate?: 'never' | 'surround' | 'overlap' | 'inside' | 'touch'
      }): TextEditorMarker;
      markBufferPosition(position: Point | number[], options?: {
        reversed?: boolean,
        persistent?: boolean,
        invalidate?: 'never' | 'surround' | 'overlap' | 'inside' | 'touch'
      }): TextEditorMarker;
      markScreenPosition(position: Point | number[], options?: {
        reversed?: boolean,
        persistent?: boolean,
        invalidate?: 'never' | 'surround' | 'overlap' | 'inside' | 'touch'
      }): TextEditorMarker;

      // Event Subscription
      onDidUpdate: EventHandler;
      onDidCreateMarker(callback: (marker: TextEditorMarker) => void): Disposable;
      onDidDestroy: EventHandler;
    }

    export class ThemeManager {
      onDidChangeActiveThemes: EventHandler;
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