import Disposable = require('../event-kit/disposable');

import TextEditorMarker = require('./text-editor-marker');
import Decoration = require('./decoration');

declare interface Gutter {
  // Gutter Destruction
  destroy(): void;

  // Event Subscription
  onDidChangeVisible(callback: (gutter: Gutter) => void): Disposable;
  onDidDestroy: (callback: () => void) => Disposable;

  // Visibility
  hide(): void;
  show(): void;
  isVisible(): boolean;
  decorateMarker(marker: TextEditorMarker, decorationParams: { type: 'line-number' | 'gutter' }): Decoration;
}
export = Gutter;
