import EventKit = require('event-kit');

declare interface MenuItem {
  label: string;
  submenu?: MenuItem[];
  command?: string;
}

declare class MenuManager {
  add(items: MenuItem): EventKit.Disposable;
  update(): void;
}
export = MenuManager;
