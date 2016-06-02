import EventKit = require('event-kit');

import TextEditorMarker = require('./text-editor-marker');
import Decoration = require('./decoration');

declare interface Gutter {
  // Gutter Destruction
  destroy(): void;

  // Event Subscription
  onDidChangeVisible(callback: (gutter: Gutter) => void): EventKit.Disposable;
  onDidDestroy: (callback: () => void) => EventKit.Disposable;

  // Visibility
  hide(): void;
  show(): void;
  isVisible(): boolean;
  decorateMarker(marker: TextEditorMarker, decorationParams: { type: 'line-number' | 'gutter' }): Decoration;
}
export = Gutter;
