import Disposable = require('../event-kit/disposable');
import EventHandler = require('../event-kit/event-handler');
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

declare interface AtomEnvironment {
  commands: CommandRegistry;
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
}

export = AtomEnvironment;
