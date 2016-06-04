import EventKit = require('event-kit');

declare class ThemeManager {
  onDidChangeActiveThemes: EventKit.EventHandler;
  getLoadedThemeNames(): string[];
  getLoadedThemes(): any[];
  getActiveThemeNames(): string[];
  getActiveThemes(): any[];
  getEnabledThemeNames(): string[];
}

export = ThemeManager;
