import 'atom';
import {CompositeDisposable} from 'atom';

describe('global atom', () => {
  it('exists', () => {
    expect(atom.workspace.addModalPanel).toBeDefined();
  });
});

describe('atom module', () => {
  it('exports CompositeDisposable', () => {
    expect(CompositeDisposable).toBeDefined();
  });
})