import BufferedProcess = require('./buffer-process');
import BufferedNodeProcess = require('./buffer-node-process');
import GitRepository = require('./git-repository');
import Notification = require('./notification');
import TextBuffer = require('../text-buffer/text-buffer');
import Point = require('../text-buffer/point');
import Range = require('../text-buffer/range');
import File = require('../node-pathwatcher/file');
import Directory = require('../node-pathwatcher/directory');
import Emitter = require('../event-kit/emitter');
import Disposable = require('../event-kit/disposable');
import CompositeDisposable = require('../event-kit/composite-disposable');

import KeymapManager = require('../atom-keymap/keymap-manager');
import GrammarRegistry = require('../first-mate/grammar-registry');

import CommandRegistry = require('./command-registry');
import Config = require('./config');
import Clipboard = require('./clipboard');
import ContextMenuManager = require('./context-menu-manager');
import MenuManager = require('./menu-manager');
import TooltipManager = require('./tooltip-manager');
import NotificationManager = require('./notification-manager');
import Project = require('./project');
import PackageManager = require('./package-manager');
import ThemeManager = require('./theme-manager');
import StyleManager = require('./style-manager');
import DeserializerManager = require('./deserializer-manager');
import ViewRegistry = require('./view-registry');
import Workspace = require('./workspace');
import Task = require('./task');
import TextEditor = require('./text-editor');

export var BufferedNodeProcess: BufferedNodeProcess;
export var BufferedProcess: BufferedProcess;
export var GitRepository: GitRepository;
export var Notification: Notification;
export var TextBuffer: TextBuffer;
export var Point: Point;
export var Range: Range;
export var File: File;
export var Directory: Directory;
export var Emitter: Emitter;
export var Disposable: Disposable;
export var CompositeDisposable: CompositeDisposable;
export var Task: Task;
export var TextEditor: TextEditor;


declare global {
  namespace atom {
    export var commands: CommandRegistry;
    export var config: Config;
    export var clipboard: Clipboard;
    export var contextMenu: ContextMenuManager;
    export var menu: MenuManager;
    export var keymaps: KeymapManager;
    export var tooltips: TooltipManager;
    export var notifications: NotificationManager;
    export var project: Project;
    export var grammars: GrammarRegistry;
    export var packages: PackageManager;
    export var themes: ThemeManager;
    export var styles: StyleManager;
    export var deserializers: DeserializerManager;
    export var views: ViewRegistry;
    export var workspace: Workspace;

    // Extended Methods
    export function onDidBeep(callback: () => void): Disposable;
    export function onWillThrowError(callback: (event: {
      originalError: Object;
      message: string;
      url: string;
      line: number;
      column: number;
      preventDefault(): void;
    }) => void): Disposable;
    export function onDidThrowError(callback: (event: {
      originalError: Object;
      message: string;
      url: string;
      line: number;
      column: number;
    }) => void): Disposable;

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
      buttons?: string[] | Array<{
        [index: string]: Function;
      }>
    }): number;

    // Managing the Dev Tools
    // Extended Methods
    export function openDevTools(): PromiseLike<void>;
    export function toggleDevTools(): PromiseLike<void>;
    export function executeJavaScriptInDevTools(): void;
  }
}
