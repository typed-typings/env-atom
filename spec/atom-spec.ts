import atom = require('atom');

describe('atom module', () => {
  it('defines all properties', () => {
    expect(atom.BufferedNodeProcess).toBeDefined();
    expect(atom.BufferedProcess).toBeDefined();
    expect(atom.GitRepository).toBeDefined();
    // expect(atom.GitRepositoryAsync).toBeDefined();
    expect(atom.Notification).toBeDefined();
    expect(atom.TextBuffer).toBeDefined();
    expect(atom.Point).toBeDefined();
    expect(atom.Range).toBeDefined();
    expect(atom.File).toBeDefined();
    expect(atom.Directory).toBeDefined();
    expect(atom.Emitter).toBeDefined();
    expect(atom.Disposable).toBeDefined();
    expect(atom.CompositeDisposable).toBeDefined();
    expect(atom.Task).toBeDefined();
    expect(atom.TextEditor).toBeDefined();
    let Point: atom.Point = new atom.Point();
  });
})

