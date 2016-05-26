declare class Color {
  public static parse(value: string | Object): Color;
  public toHexString(): string;
  public toRGBAString(): string;
}
export = Color;
