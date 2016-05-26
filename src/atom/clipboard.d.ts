declare class Clipboard {
  write(text: string, metadata?: any): void;
  read(): string;
  readWithMetadata(): {
    text: string;
    metadata: any;
  };
}

export = Clipboard;
