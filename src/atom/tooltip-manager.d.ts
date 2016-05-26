import Disposable = require('../event-kit/disposable');

// Available in lib.d.ts?
declare interface JSTooltipOption {
  animation?: boolean;
  container?: string | boolean;
  delay?: number | { show: number, hide: number };
  html?: boolean;
  placement?: string | ((tooltipDomNode: any, triggeringElementDomNode: any) => string);
  selector?: string | boolean;
  template?: string;
  title?: string | (() => string);
  trigger?: string;
  viewport?: string | { selector: string, padding: number } | ((triggeringElementDomNode: any) => string | { selector: string, padding: number });
}

declare interface TooltipOption extends JSTooltipOption {
  keyBindingCommand?: string;
  keyBindingTarget?: HTMLElement;
}


declare class TooltipManager {
  add(target: HTMLElement, options: TooltipOption): Disposable;
}

export = TooltipManager;
