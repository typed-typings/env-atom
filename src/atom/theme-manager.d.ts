import EventHandler = require('../event-kit/event-handler');

declare class ThemeManager {
  onDidChangeActiveThemes: EventHandler;
  getLoadedThemeNames(): string[];
  getLoadedThemes(): any[];
  getActiveThemeNames(): string[];
  getActiveThemes(): any[];
  getEnabledThemeNames(): string[];
}

export = ThemeManager;
