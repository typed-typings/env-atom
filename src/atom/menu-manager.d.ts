import Disposable = require('../event-kit/disposable');

declare interface MenuItem {
  label: string;
  submenu?: MenuItem[];
  command?: string;
}

declare class MenuManager {
  add(items: MenuItem): Disposable;
  update(): void;
}
export = MenuManager;
