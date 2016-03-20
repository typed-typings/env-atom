
interface Workspace {
  addModalPanel(option: any);
}

declare namespace atom {
  export var workspace: Workspace;
}

declare module 'atom' {
  export interface CompositeDisposable {}
}
