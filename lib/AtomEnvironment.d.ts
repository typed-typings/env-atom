import { CommandRegistry } from './CommandRegistry.d.ts';

export interface AtomEnvironment {
  commands: CommandRegistry;
  config: any;
  clipboard: any;
  contextMenu: any;
  menu: any;
  keymaps: any;
  tooltips: any;
  notifications: any;
  project: any;
  grammars: any;
  packages: any;
  themes: any;
  styles: any;
  deserializers: any;
  views: any;
  workspace: any;
}
