import test = require('blue-tape');
import a = require('atom');

test('global atom', (t) => {
  t.plan(1);
  t.assert(atom.workspace);
});