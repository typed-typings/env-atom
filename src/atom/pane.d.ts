import EventKit = require('event-kit');

declare class Pane {
  // Event Subscription
  onDidChangeFlexScale(callback: (flexScale: number) => void): EventKit.Disposable;
  observeFlexScale(callback: (flexScale: number) => void): EventKit.Disposable;
  onDidActivate: EventKit.EventHandler;
  onWillDestroy: EventKit.EventHandler;
  onDidDestroy: EventKit.EventHandler;
  onDidChangeActive(callback: (active: boolean) => void): EventKit.Disposable;
  observeActive(callback: (active: boolean) => void): EventKit.Disposable;
  onDidAddItem(callback: (event: { item: any, index: number }) => void): EventKit.Disposable;
  onDidRemoveItem(callback: (event: { item: any, index: number }) => void): EventKit.Disposable;
  onWillRemoveItem(callback: (event: { item: any, index: number }) => void): EventKit.Disposable;
  onDidMoveItem(callback: (event: { item: any, oldIndex: number, newIndex: number }) => void): EventKit.Disposable;
  observeItems(callback: (item: any) => void): EventKit.Disposable;
  onDidChangeActiveItem(callback: (activeItem: any) => void): EventKit.Disposable;
  observeActiveItem(callback: (activeItem: any) => void): EventKit.Disposable;
  onWillDestroyItem(callback: (event: { item: any, index: number }) => void): EventKit.Disposable;

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
