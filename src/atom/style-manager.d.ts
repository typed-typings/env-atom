import EventKit = require('event-kit');

declare interface StyleElement extends HTMLStyleElement {
  sourcePath: string;
  context: string;
}

declare class StyleManager {
  observeStyleElements(callback: (styleElement: StyleElement) => void): EventKit.Disposable;
  onDidAddSytleElement(callback: (styleElement: StyleElement) => void): EventKit.Disposable;
  onDidRemoveSytleElement(callback: (styleElement: HTMLStyleElement) => void): EventKit.Disposable;
  onDidUpdateSytleElement(callback: (styleElement: StyleElement) => void): EventKit.Disposable;
  getStyleElements(): StyleElement[];
  getUserStyleSheetPath(): string;
}

export = StyleManager;
