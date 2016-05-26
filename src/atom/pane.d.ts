import Disposable = require('../event-kit/disposable');
import EventHandler = require('../event-kit/event-handler');

declare class Pane {
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

export = Pane;
