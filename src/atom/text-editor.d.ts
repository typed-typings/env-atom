import Disposable = require('../event-kit/disposable');
import TextBuffer = require('../text-buffer/text-buffer');
import Point = require('../text-buffer/point');
import Cursor = require('./cursor');
import TextEditorMarker = require('./text-editor-marker');
import Gutter = require('./gutter');
import Decoration = require('./decoration');

import CursorChangeEventHandler from './cursor-change-event-handler';
import SelectionChangeEventHandler from './selection-change-event-handler';
import GrammarEventHandler from '../first-mate/grammar-event-handler';

declare class TextEditor {
  onDidChangeTitle: (callback: () => void) => Disposable;
  onDidChangePath: (callback: () => void) => Disposable;
  onDidChange: (callback: () => void) => Disposable;
  onDidStopChanging: (callback: () => void) => Disposable;
  onDidChangeCursorPosition: CursorChangeEventHandler;
  onDidChangeSelectionRange: SelectionChangeEventHandler;
  onDidSave(callback: (event: { path: string }) => void): Disposable;
  onDidDestroy: (callback: () => void) => Disposable;
  getBuffer(): TextBuffer;
  observeGutters(callback: (gutter: Gutter) => void): Disposable;
  onDidAddGutter(callback: (gutter: Gutter) => void): Disposable;
  onDidRemoveGutter(callback: (name: string) => void): Disposable;

  // Extended Methods
  onDidChangeSoftWrapped: (callback: () => void) => Disposable;
  onDidChangeEncoding: (callback: () => void) => Disposable;
  observeGrammar: GrammarEventHandler;
  onDidChangeGrammar: GrammarEventHandler;
  onDidChangeModified: (callback: () => void) => Disposable;
  onDidConflict: (callback: () => void) => Disposable;
  onWillInsertText(callback: (event: { text: string, cancel(): void }) => void): Disposable;
  onDidInsertText(callback: (event: { text: string }) => void): Disposable;
  observeCursors(callback: (cursor: Cursor) => void): Disposable;
  onDidAddCursor(callback: (cursor: Cursor) => void): Disposable;
  onDidRemoveCursor(callback: (cursor: Cursor) => void): Disposable;
  observeSelections(callback: (selection: Selection) => void): Disposable;
  onDidAddSelection(callback: (selection: Selection) => void): Disposable;
  onDidRemoveSelection(callback: (selection: Selection) => void): Disposable;
  observeDecorations(callback: (decoration: Decoration) => void): Disposable;
  onDidAddDecoration(callback: (decoration: Decoration) => void): Disposable;
  onDidRemoveDecoration(callback: (decoration: Decoration) => void): Disposable;
  onDidChangePlaceholderText(callback: (placeholderText: string) => void): Disposable;

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
  getTextInBufferRange(range: Range): string;
  getLineCount(): number;
  getScreenLineCount(): number;
  getLastBufferRow(): number;
  getLastScreenRow(): number;
  lineTextForBufferRow(bufferRow: number): string;
  lineTextForScreenRow(screenRow: number): string;
  getCurrentParagraphBufferRange(): Range;

  // Mutating Text
  setText(text: string): void
  setTextInBufferRange(range: Range, text: string, options?: {
    normalizeLineEndings?: boolean,
    undo?: 'skip'
  }): Range;
  insertText(text: string, options?: {
    select: boolean;
    autoIndent: boolean;
    autoIndentNewLine: boolean;
    autoDecreaseIndent: boolean;
    normalizeLineEndings?: boolean;
    undo: 'skip'
  }): Range | boolean;
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
  screenPositionForBufferPosition(bufferPosition: Point | number[], options?: ClipScreenPositionOption): Point;
  bufferPositionForScreenPosition(bufferPosition: Point | number[], options?: ClipScreenPositionOption): Point;
  screenRangeForBufferRange(bufferRange: Range): Range;
  bufferRangeForScreenRange(screenRange: Range): Range;

  // Extended Methods
  clipBufferPosition(bufferPosition: Point): Point;
  clipBufferRange(range: Range): Range;
  clipScreenPosition(screenPosition: Point, options?: ClipScreenPositionOption): Point;
  clipScreenRange(range: Range, options?: ClipScreenPositionOption): Range;

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
  decorateMarkerLayer(markerLayer: TextEditorMarkerLayer | MarkerLayer, decorationParams: {
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
  findMarkers(properties: {
    startBufferRow: number,
    endBufferRow: number,
    containsBufferRange: Range | Point[],
    containsBufferPosition: Point | number[]
  }): TextEditorMarker[];
  getMarkerLayer(id: any): TextEditorMarkerLayer;
  getDefaultMarkerLayer(): TextEditorMarkerLayer;

  // Extended Methods
  getMarker(id: number): TextEditorMarker;
  getMarkers(): TextEditorMarker[];
  getMarkerCount(): number;
  addMarkerLayer(options: { maintainHistory?: boolean }): TextEditorMarkerLayer;

  // Cursors
  getCursorBufferPosition(): Point;
  getCursorBufferPositions(): Point[];
  setCursorBufferPosition(position: Point | number[], options?: { autoscroll?: boolean }): void
  getCursorAtScreenPosition(position: Point | number[]): Cursor;
  getCursorScreenPosition(): Point;
  getCursorScreenPositions(): Point[];
  setCursorScreenPosition(position: Point | number[], options?: { autoscroll?: boolean }): void;
  addCursorAtBufferPosition(bufferPosition: Point): Cursor;
  addCursorAtScreenPosition(screenPosition: Point): Cursor;
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
  getSelectedBufferRange(): Range;
  getSelectedBufferRanges(): Range[];
  setSelectedBufferRange(bufferRange: Range | Point[], options?: {
    reversed: boolean,
    preserveFolds: boolean
  }): void;
  setSelectedBufferRanges(bufferRanges: Range[] | Point[][], options?: {
    reversed: boolean,
    preserveFolds: boolean
  }): void;
  getSelectedScreenRange(): Range;
  getSelectedScreenRanges(): Range[];
  setSelectedScreenRange(screenRange: Range | Point[], options?: { reversed: boolean }): void;
  setSelectedScreenRanges(screenRangee: Range[] | Point[][], options?: { reversed: boolean }): void;
  addSelectionForBufferRange(bufferRange, options?: { reversed: boolean }): Selection;
  addSelectionForScreenRange(screenRange, options?: { reversed: boolean }): Selection;
  selectToBufferPosition(position: Point): void;
  selectToScreenPosition(position: Point): void;
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
  selectionIntersectsBufferRange(bufferRange: Range | Point[]): boolean;

  // Searching and Replacing
  scan: ScanFunction;
  scanInBufferRange: ScanInRangeFunction;
  backwardsScanInBufferRange: ScanInRangeFunction;

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
  getGrammar(): Grammar;
  setGrammar(grammar: Grammar): void;

  // Managing Syntax Scopes
  getRootScopeDescriptor(): ScopeDescriptor;
  scopeDescriptorForBufferPosition(bufferPosition: Point | number[]): ScopeDescriptor;

  // Extended Methods
  bufferRangeForScopeAtCursor(scopeSelector: string): Range;
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
  scrollToBufferPosition(bufferPosition: Point | number[] | { row: number, column: number }, options?: { center?: boolean }): void;
  scrollToScreenPosition(screenPosition: Point | number[] | { row: number, column: number }, options?: { center?: boolean }): void;

  // TextEditor Rendering
  getPlaceholderText(): string
  setPlaceholderText(placeholderText: string): void;
}


export = TextEditor;
