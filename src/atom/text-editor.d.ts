import EventKit = require('event-kit');
import TextBuffer = require('text-buffer');
import FirstMate = require('first-mate');

import Cursor = require('./cursor');
import Decoration = require('./decoration');
import Gutter = require('./gutter');
import TextEditorMarker = require('./text-editor-marker');
import TextEditorMarkerLayer = require('./text-editor-marker-layer');
import ScopeDescriptor = require('./scope-descriptor');

import CursorChangeEventHandler = require('./cursor-change-event-handler');
import SelectionChangeEventHandler = require('./selection-change-event-handler');
import ClipScreenPositionOption = require('./clip-screen-position-option');

declare class TextEditor {
  onDidChangeTitle: (callback: () => void) => EventKit.Disposable;
  onDidChangePath: (callback: () => void) => EventKit.Disposable;
  onDidChange: (callback: () => void) => EventKit.Disposable;
  onDidStopChanging: (callback: () => void) => EventKit.Disposable;
  onDidChangeCursorPosition: CursorChangeEventHandler;
  onDidChangeSelectionRange: SelectionChangeEventHandler;
  onDidSave(callback: (event: { path: string }) => void): EventKit.Disposable;
  onDidDestroy: (callback: () => void) => EventKit.Disposable;
  getBuffer(): TextBuffer;
  observeGutters(callback: (gutter: Gutter) => void): EventKit.Disposable;
  onDidAddGutter(callback: (gutter: Gutter) => void): EventKit.Disposable;
  onDidRemoveGutter(callback: (name: string) => void): EventKit.Disposable;

  // Extended Methods
  onDidChangeSoftWrapped: (callback: () => void) => EventKit.Disposable;
  onDidChangeEncoding: (callback: () => void) => EventKit.Disposable;
  observeGrammar: FirstMate.GrammarEventHandler;
  onDidChangeGrammar: FirstMate.GrammarEventHandler;
  onDidChangeModified: (callback: () => void) => EventKit.Disposable;
  onDidConflict: (callback: () => void) => EventKit.Disposable;
  onWillInsertText(callback: (event: { text: string, cancel(): void }) => void): EventKit.Disposable;
  onDidInsertText(callback: (event: { text: string }) => void): EventKit.Disposable;
  observeCursors(callback: (cursor: Cursor) => void): EventKit.Disposable;
  onDidAddCursor(callback: (cursor: Cursor) => void): EventKit.Disposable;
  onDidRemoveCursor(callback: (cursor: Cursor) => void): EventKit.Disposable;
  observeSelections(callback: (selection: Selection) => void): EventKit.Disposable;
  onDidAddSelection(callback: (selection: Selection) => void): EventKit.Disposable;
  onDidRemoveSelection(callback: (selection: Selection) => void): EventKit.Disposable;
  observeDecorations(callback: (decoration: Decoration) => void): EventKit.Disposable;
  onDidAddDecoration(callback: (decoration: Decoration) => void): EventKit.Disposable;
  onDidRemoveDecoration(callback: (decoration: Decoration) => void): EventKit.Disposable;
  onDidChangePlaceholderText(callback: (placeholderText: string) => void): EventKit.Disposable;

  // File Details
  getTitle(): string;
  getLongTitle(): string;
  getPath(): string;
  isModified(): boolean;
  isEmpty(): boolean

  // Extended Methods
  getEncoding(): string;
  setEncoding(encoding): void;

  // File Operations
  save(): void;
  saveAs(filePath: string): void;

  // Reading Text
  getText(): string;
  getTextInBufferRange(range: TextBuffer.Range): string;
  getLineCount(): number;
  getScreenLineCount(): number;
  getLastBufferRow(): number;
  getLastScreenRow(): number;
  lineTextForBufferRow(bufferRow: number): string;
  lineTextForScreenRow(screenRow: number): string;
  getCurrentParagraphBufferRange(): TextBuffer.Range;

  // Mutating Text
  setText(text: string): void
  setTextInBufferRange(range: TextBuffer.Range, text: string, options?: {
    normalizeLineEndings?: boolean,
    undo?: 'skip'
  }): TextBuffer.Range;
  insertText(text: string, options?: {
    select: boolean;
    autoIndent: boolean;
    autoIndentNewLine: boolean;
    autoDecreaseIndent: boolean;
    normalizeLineEndings?: boolean;
    undo: 'skip'
  }): TextBuffer.Range | boolean;
  insertNewline(): void;
  delete(): void;
  backspace(): void;

  // Extended Methods
  mutateSelectedText(fn: (selection: Selection, index: number) => void): void;
  transpose(): void;
  upperCase(): void;
  lowerCase(): void;
  toggleLineCommentsInSelection(): void;
  insertNewlineBelow(): void;
  insertNewlineAbove(): void;
  deleteToBeginningOfWord(): void;
  deleteToPreviousWordBoundary(): void;
  deleteToNextWordBoundary(): void;
  deleteToBeginningOfSubword(): void;
  deleteToEndOfSubword(): void;
  deleteToBeginningOfLine(): void;
  deleteToEndOfLine(): void;
  deleteToEndOfWord(): void;
  deleteLine(): void;

  // History
  undo(): void;
  redo(): void;

  // Extended Methods
  transact(fn: Function): void;
  transact(groupingInterval: number, fn: Function): void;
  abortTransaction(): void;
  createCheckpoint(): any;
  revertToCheckpoint(): boolean;
  groupChangesSinceCheckpoint(): boolean;

  // TextEditor Coordinates
  screenPositionForBufferPosition(bufferPosition: TextBuffer.Point | number[], options?: ClipScreenPositionOption): TextBuffer.Point;
  bufferPositionForScreenPosition(bufferPosition: TextBuffer.Point | number[], options?: ClipScreenPositionOption): TextBuffer.Point;
  screenRangeForBufferRange(bufferRange: TextBuffer.Range): TextBuffer.Range;
  bufferRangeForScreenRange(screenRange: TextBuffer.Range): TextBuffer.Range;

  // Extended Methods
  clipBufferPosition(bufferPosition: TextBuffer.Point): TextBuffer.Point;
  clipBufferRange(range: TextBuffer.Range): TextBuffer.Range;
  clipScreenPosition(screenPosition: TextBuffer.Point, options?: ClipScreenPositionOption): TextBuffer.Point;
  clipScreenRange(range: TextBuffer.Range, options?: ClipScreenPositionOption): TextBuffer.Range;

  // Decorations
  decorateMarker(marker: TextEditorMarker, decorationParams: {
    type: 'line' | 'line-number' | 'highlight' | 'overlay' | 'gutter' | 'block',
    class: string,
    item?: HTMLElement | Object,
    onlyHead?: boolean,
    onlyEmpty?: boolean,
    onlyNonEmpty?: boolean,
    position?: 'head' | 'tail' | 'before' | 'after'
  }): Decoration;
  decorateMarkerLayer(markerLayer: TextEditorMarkerLayer | TextBuffer.MarkerLayer, decorationParams: {
    type: 'line' | 'line-number' | 'highlight' | 'block',
    class: string,
    item?: HTMLElement | Object,
    onlyHead?: boolean,
    onlyEmpty?: boolean,
    onlyNonEmpty?: boolean,
    position?: 'head' | 'tail' | 'before' | 'after'
  }): Decoration;

  // Extended Methods
  getDecorations(propertyFilter?: Object): Decoration[];
  getLineDecorations(propertyFilter?: Object): Decoration[];
  getLineNumberDecorations(propertyFilter?: Object): Decoration[];
  getHighlightDecorations(propertyFilter?: Object): Decoration[];
  getOverlayDecorations(propertyFilter?: Object): Decoration[];

  // Markers
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
  findMarkers(properties: {
    startBufferRow: number,
    endBufferRow: number,
    containsBufferRange: TextBuffer.Range | TextBuffer.Point[],
    containsBufferPosition: TextBuffer.Point | number[]
  }): TextEditorMarker[];
  getMarkerLayer(id: any): TextEditorMarkerLayer;
  getDefaultMarkerLayer(): TextEditorMarkerLayer;

  // Extended Methods
  getMarker(id: number): TextEditorMarker;
  getMarkers(): TextEditorMarker[];
  getMarkerCount(): number;
  addMarkerLayer(options: { maintainHistory?: boolean }): TextEditorMarkerLayer;

  // Cursors
  getCursorBufferPosition(): TextBuffer.Point;
  getCursorBufferPositions(): TextBuffer.Point[];
  setCursorBufferPosition(position: TextBuffer.Point | number[], options?: { autoscroll?: boolean }): void
  getCursorAtScreenPosition(position: TextBuffer.Point | number[]): Cursor;
  getCursorScreenPosition(): TextBuffer.Point;
  getCursorScreenPositions(): TextBuffer.Point[];
  setCursorScreenPosition(position: TextBuffer.Point | number[], options?: { autoscroll?: boolean }): void;
  addCursorAtBufferPosition(bufferPosition: TextBuffer.Point): Cursor;
  addCursorAtScreenPosition(screenPosition: TextBuffer.Point): Cursor;
  hasMultipleCursors(): boolean;
  moveUp(lineCount?: number): void;
  moveDown(lineCount?: number): void;
  moveLeft(columnCount?: number): void;
  moveRight(columnCount?: number): void;
  moveToBeginningOfLine(): void;
  moveToBeginningOfScreenLine(): void;
  moveToFirstCharacterOfLine(): void;
  moveToEndOfLine(): void;
  moveToEndOfScreenLine(): void;
  moveToBeginningOfWord(): void;
  moveToEndOfWord(): void;

  // Extended Methods
  moveToTop(): void;
  moveToBottom(): void;
  moveToBeginningOfNextWord(): void;
  moveToPreviousWordBoundary(): void;
  moveToNextWordBoundary(): void;
  moveToPreviousSubwordBoundary(): void;
  moveToNextSubwordBoundary(): void;
  moveToBeginningOfNextParagraph(): void;
  moveToBeginningOfPreviousParagraph(): void;
  getLastCursor(): Cursor;
  getWordUnderCursor(options?: { wordRegex?: RegExp, includeNonWordCharacters: boolean, allowPrevious: boolean }): string;
  getCursors(): Cursor[];
  getCursorsOrderedByBufferPosition(): Cursor[];

  // Selections
  getSelectedText(): string;
  getSelectedBufferRange(): TextBuffer.Range;
  getSelectedBufferRanges(): TextBuffer.Range[];
  setSelectedBufferRange(bufferRange: TextBuffer.Range | TextBuffer.Point[], options?: {
    reversed: boolean,
    preserveFolds: boolean
  }): void;
  setSelectedBufferRanges(bufferRanges: TextBuffer.Range[] | TextBuffer.Point[][], options?: {
    reversed: boolean,
    preserveFolds: boolean
  }): void;
  getSelectedScreenRange(): TextBuffer.Range;
  getSelectedScreenRanges(): TextBuffer.Range[];
  setSelectedScreenRange(screenRange: TextBuffer.Range | TextBuffer.Point[], options?: { reversed: boolean }): void;
  setSelectedScreenRanges(screenRangee: TextBuffer.Range[] | TextBuffer.Point[][], options?: { reversed: boolean }): void;
  addSelectionForBufferRange(bufferRange, options?: { reversed: boolean }): Selection;
  addSelectionForScreenRange(screenRange, options?: { reversed: boolean }): Selection;
  selectToBufferPosition(position: TextBuffer.Point): void;
  selectToScreenPosition(position: TextBuffer.Point): void;
  selectUp(rowCount: number): void;
  selectDown(rowCount: number): void;
  selectLeft(columnCount: number): void;
  selectRight(columnCount: number): void;
  selectToTop(): void;
  selectToBottom(): void;
  selectAll(): void;
  selectToBeginningOfLine(): void;
  selectToFirstCharacterOfLine(): void;
  selectToEndOfLine(): void;
  selectToBeginningOfWord(): void;
  selectToEndOfWord(): void;
  selectLinesContainingCursors(): void;
  selectWordsContainingCursors(): void;

  // Extended Methods
  selectToPreviousSubwordBoundary(): void;
  selectToNextSubwordBoundary(): void;
  selectToPreviousWordBoundary(): void;
  selectToNextWordBoundary(): void;
  selectToBeginningOfNextWord(): void;
  selectToBeginningOfNextParagraph(): void;
  selectToBeginningOfPreviousParagraph(): void;
  selectMarker(marker: TextEditorMarker): void;
  getLastSelection(): Selection;
  getSelections(): Selection[];
  getSelectionsOrderedByBufferPosition(): Selection[];
  selectionIntersectsBufferRange(bufferRange: TextBuffer.Range | TextBuffer.Point[]): boolean;

  // Searching and Replacing
  scan: TextBuffer.ScanFunction;
  scanInBufferRange: TextBuffer.ScanInRangeFunction;
  backwardsScanInBufferRange: TextBuffer.ScanInRangeFunction;

  // Tab Behavior
  getSoftTabs(): boolean;
  setSoftTabs(softTabs: boolean): void;
  toggleSoftTabs(): void;
  getTabLength(): number;
  setTabLength(tabLength: number): void;

  // Extended Methods
  usesSoftTabs(): boolean;
  getTabText(): string;

  // Soft Wrap Behavior
  isSoftWrapped(): boolean;
  setSoftWrapped(softWrapped: boolean): void;
  toggleSoftWrapped(): void;
  getSoftWrapColumn(): number;

  // Indentation
  indentationForBufferRow(bufferRow: number): number;
  setIndentationForBufferRow(bufferRow: number, newLevel: number, options?: { preserveLeadingWhitespace: boolean }): void;

  // Extended Methods
  indentSelectedRows(): void;
  outdentSelectedRows(): void;
  indentLevelForLine(line: string): number;
  autoIndentSelectedRows(): void;

  // Grammars
  getGrammar(): FirstMate.Grammar;
  setGrammar(grammar: FirstMate.Grammar): void;

  // Managing Syntax Scopes
  getRootScopeDescriptor(): ScopeDescriptor;
  scopeDescriptorForBufferPosition(bufferPosition: TextBuffer.Point | number[]): ScopeDescriptor;

  // Extended Methods
  bufferRangeForScopeAtCursor(scopeSelector: string): TextBuffer.Range;
  isBufferRowCommented(): boolean;

  // Clipboard Operations
  copySelectedText(): void;
  cutSelectedText(): void;
  pasteText(options?: {
    select: boolean;
    autoIndent: boolean;
    autoIndentNewLine: boolean;
    autoDecreaseIndent: boolean;
    normalizeLineEndings?: boolean;
    undo: 'skip'
  }): void;
  cutToEndOfLine(): void;
  cutToEndOfBufferLine(): void;

  // Folds
  foldCurrentRow(): void;
  unfoldCurrentRow(): void;
  foldBufferRow(bufferRow: number): void;
  unfoldBufferRow(bufferRow: number): void;

  //  Extended Methods
  foldSelectedLines(): void;
  foldAll(): void;
  unfoldAll(): void;
  foldAllAtIndentLevel(level: number): void;
  isFoldableAtBufferRow(bufferRow: number): boolean;
  isFoldableAtScreenRow(bufferRow: number): boolean;
  toggleFoldAtBufferRow(): void;
  isFoldedAtCursorRow(): boolean;
  isFoldedAtBufferRow(bufferRow: number): boolean;
  isFoldedAtScreenRow(screenRow: number): boolean;

  // Gutters
  addGutter(options: { name: string, priority?: number, visible?: boolean }): Gutter;
  getGutters(): Gutter[];
  gutterWithName(name: string): Gutter;

  // Scrolling the TextEditor
  scrollToCursorPosition(options?: { center?: boolean }): void;
  scrollToBufferPosition(bufferPosition: TextBuffer.Point | number[] | { row: number, column: number }, options?: { center?: boolean }): void;
  scrollToScreenPosition(screenPosition: TextBuffer.Point | number[] | { row: number, column: number }, options?: { center?: boolean }): void;

  // TextEditor Rendering
  getPlaceholderText(): string
  setPlaceholderText(placeholderText: string): void;
}


export = TextEditor;
