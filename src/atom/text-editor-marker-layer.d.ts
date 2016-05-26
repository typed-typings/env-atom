import Disposable = require('../event-kit/disposable');
import EventHandler = require('../event-kit/event-handler');
import Point = require('../text-buffer/point');
import Range = require('../text-buffer/range');
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
    containsBufferRange: Range | Point[],
    containsBufferPosition: Point | number[]
  }): TextEditorMarker[];

  // Marker creation
  markBufferRange(range: Range | Point[], properties: {
    maintainHistory?: boolean,
    reversed?: boolean,
    persistent?: boolean,
    invalidate?: 'never' | 'surround' | 'overlap' | 'inside' | 'touch'
  }): TextEditorMarker;
  markScreenRange(range: Range, properties: {
    maintainHistory?: boolean,
    reversed?: boolean,
    persistent?: boolean,
    invalidate?: 'never' | 'surround' | 'overlap' | 'inside' | 'touch'
  }): TextEditorMarker;
  markBufferPosition(position: Point | number[], options?: {
    reversed?: boolean,
    persistent?: boolean,
    invalidate?: 'never' | 'surround' | 'overlap' | 'inside' | 'touch'
  }): TextEditorMarker;
  markScreenPosition(position: Point | number[], options?: {
    reversed?: boolean,
    persistent?: boolean,
    invalidate?: 'never' | 'surround' | 'overlap' | 'inside' | 'touch'
  }): TextEditorMarker;

  // Event Subscription
  onDidUpdate: EventHandler;
  onDidCreateMarker(callback: (marker: TextEditorMarker) => void): Disposable;
  onDidDestroy: EventHandler;
}

export = TextEditorMarkerLayer;
