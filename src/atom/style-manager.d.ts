import Disposable = require('../event-kit/disposable');

declare interface StyleElement extends HTMLStyleElement {
  sourcePath: string;
  context: string;
}

declare class StyleManager {
  observeStyleElements(callback: (styleElement: StyleElement) => void): Disposable;
  onDidAddSytleElement(callback: (styleElement: StyleElement) => void): Disposable;
  onDidRemoveSytleElement(callback: (styleElement: HTMLStyleElement) => void): Disposable;
  onDidUpdateSytleElement(callback: (styleElement: StyleElement) => void): Disposable;
  getStyleElements(): StyleElement[];
  getUserStyleSheetPath(): string;
}

export = StyleManager;
