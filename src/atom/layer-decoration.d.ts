import TextEditorMarker = require('./text-editor-marker');

declare class LayerDecoration {
  destroy(): void;
  isDestroyed(): boolean;
  getProperties(): Object;
  setProperties(newProperties: Object): void;
  setPropertiesForMarker(marker: TextEditorMarker /* | Marker */, properties: Object): void;
}

export = LayerDecoration;
