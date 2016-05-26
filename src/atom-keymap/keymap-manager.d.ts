import Disposable = require('../event-kit/disposable');
import KeyBinding = require('./key-binding');

declare interface KeyOption {
  ctrl?: boolean;
  alt?: boolean;
  shift?: boolean;
  cmd?: boolean;
  which?: number;
  target: any; // ELEMNT?
}

declare class KeymapManager {
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

export = KeymapManager;
