import Disposable = require('../event-kit/disposable');

declare class ViewRegistry {
  addViewProvider(createView: () => HTMLElement): Disposable;
  addViewProvider(modelConstructor: Function, createView: () => HTMLElement): Disposable;
  getView(object: Object): any; // DOM element
}

export = ViewRegistry;
