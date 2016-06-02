import EventKit = require('event-kit');
import TextBuffer = require('text-buffer');

import TextEditorMarker = require('./text-editor-marker');

declare class TextEditorMarkerLayer {
  // Lifecycle
  destroy(): void;

  // Querying
  getMarker(): TextEditorMarker;
  getMarkers(): TextEditorMarker[];
  getMarkerCount(): number;
  findMarkers(properties: {
    startBufferRow: number,
    endBufferRow: number,
    containsBufferRange: TextBuffer.Range | TextBuffer.Point[],
    containsBufferPosition: TextBuffer.Point | number[]
  }): TextEditorMarker[];

  // Marker creation
  markBufferRange(range: TextBuffer.Range | TextBuffer.Point[], properties: {
    maintainHistory?: boolean,
    reversed?: boolean,
    persistent?: boolean,
    invalidate?: 'never' | 'surround' | 'overlap' | 'inside' | 'touch'
  }): TextEditorMarker;
  markScreenRange(range: TextBuffer.Range, properties: {
    maintainHistory?: boolean,
    reversed?: boolean,
    persistent?: boolean,
    invalidate?: 'never' | 'surround' | 'overlap' | 'inside' | 'touch'
  }): TextEditorMarker;
  markBufferPosition(position: TextBuffer.Point | number[], options?: {
    reversed?: boolean,
    persistent?: boolean,
    invalidate?: 'never' | 'surround' | 'overlap' | 'inside' | 'touch'
  }): TextEditorMarker;
  markScreenPosition(position: TextBuffer.Point | number[], options?: {
    reversed?: boolean,
    persistent?: boolean,
    invalidate?: 'never' | 'surround' | 'overlap' | 'inside' | 'touch'
  }): TextEditorMarker;

  // Event Subscription
  onDidUpdate: EventKit.EventHandler;
  onDidCreateMarker(callback: (marker: TextEditorMarker) => void): EventKit.Disposable;
  onDidDestroy: EventKit.EventHandler;
}

export = TextEditorMarkerLayer;
