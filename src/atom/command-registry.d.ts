import EventCallback = require('../event-kit/event-callback');

declare interface CommandRegistry {
  add(target: string, commandName: string, callback: EventCallback): any;
  findCommands(params: { target: any }): Array<{ name: string, displayName: string }>;
  dispatch(target: any, commandName: string): void;
  onWillDispatch(callback: EventCallback): void;
  onDidDispatch(callback: EventCallback): void;
}

export = CommandRegistry;
