import EventKit = require('event-kit');

declare interface ContextMenuItem {
  label?: string;
  command?: string;
  enabled?: boolean;
  submenu?: ContextMenuItem[];
  type?: 'separator';
  visible?: boolean;
  created?: (event: EventKit.EventCallback) => void;
  shouldDisplay?: (event: EventKit.EventCallback) => void;
}

declare class ContextMenuManager {
  add(itemsBySelector: ContextMenuItem): EventKit.Disposable;
}

export = ContextMenuManager;
