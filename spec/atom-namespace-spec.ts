describe('atom namespace', () => {
  it('commands', () => {
    expect(atom.commands).toBeDefined();
  });
  it('config', () => {
    expect(atom.config).toBeDefined();
  });
});
