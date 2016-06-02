import EventKit = require('event-kit');

declare interface CommandRegistry {
  add(target: string, commandName: string, callback: EventKit.EventCallback): any;
  findCommands(params: { target: any }): Array<{ name: string, displayName: string }>;
  dispatch(target: any, commandName: string): void;
  onWillDispatch(callback: EventKit.EventCallback): void;
  onDidDispatch(callback: EventKit.EventCallback): void;
}

export = CommandRegistry;
