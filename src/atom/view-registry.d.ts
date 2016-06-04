import EventKit = require('event-kit');

declare class ViewRegistry {
  addViewProvider(createView: () => HTMLElement): EventKit.Disposable;
  addViewProvider(modelConstructor: Function, createView: () => HTMLElement): EventKit.Disposable;
  getView(object: Object): any; // DOM element
}

export = ViewRegistry;
