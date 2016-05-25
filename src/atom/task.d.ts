declare class Task {
  // Methods
  static once(taskPath: string, args: any[]): Task;
  constructor(taskPath: string);
  start(args: any[], callback?: Function): void;
  send(message: any): void;
  on(eventName: string, callback: Function): void;
  once(taskPath: string, args: any[]): Task;
  terminate(): void;
}
export = Task;
