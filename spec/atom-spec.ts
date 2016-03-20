import 'atom';

describe('global atom', () => {
  it('exists', () => {
    expect(atom.workspace.addModalPanel).toBeDefined();
  });
});
