declare class KeyBinding {
  enabled: boolean;
  matches(keystroke: string): boolean;
  compare(keyBinding: KeyBinding): number;
}

export = KeyBinding;
