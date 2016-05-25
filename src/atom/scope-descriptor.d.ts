declare class ScopeDescriptor {
  constructor(options?: { scopes: string[] });
  getScopesArray(): string[];
}

export = ScopeDescriptor;
