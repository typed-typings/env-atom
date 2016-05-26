import Disposable = require('../event-kit/disposable');
import EventCallback = require('../event-kit/event-callback');

declare interface ContextMenuItem {
  label?: string;
  command?: string;
  enabled?: boolean;
  submenu?: ContextMenuItem[];
  type?: 'separator';
  visible?: boolean;
  created?: (event: EventCallback) => void;
  shouldDisplay?: (event: EventCallback) => void;
}

declare class ContextMenuManager {
  add(itemsBySelector: ContextMenuItem): Disposable;
}

export = ContextMenuManager;
