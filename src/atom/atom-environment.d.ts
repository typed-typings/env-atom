import EventKit = require('event-kit');
import KeymapManager = require('atom-keymap');
import FirstMate = require('first-mate');

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
  grammars: FirstMate.GrammarRegistry;
  packages: PackageManager;
  themes: ThemeManager;
  styles: StyleManager;
  deserializers: DeserializerManager;
  views: ViewRegistry;
  workspace: Workspace;
  // Extended Methods
  onDidBeep: EventKit.EventHandler;
  onWillThrowError(callback: (event: {
    originalError: Object;
    message: string;
    url: string;
    line: number;
    column: number;
    preventDefault(): void;
  }) => void): EventKit.Disposable;
  onDidThrowError(callback: (event: {
    originalError: Object;
    message: string;
    url: string;
    line: number;
    column: number;
  }) => void): EventKit.Disposable;
}

export = AtomEnvironment;
