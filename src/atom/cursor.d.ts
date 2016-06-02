import EventKit = require('event-kit');
import TextBuffer = require('text-buffer');
import TextEditorMarker = require('./text-editor-marker');
import CursorChangeEventHandler = require('./cursor-change-event-handler');
import ScopeDescriptor = require('./scope-descriptor');

declare interface Cursor {
  onDidChangePosition: CursorChangeEventHandler;
  onDidDestroy: (callback: () => void) => EventKit.Disposable;
  onDidChangeVisibility(callback: (visibility: boolean) => void): EventKit.Disposable;
  setScreenPosition(screenPosition: number[], options?: { autoscroll: boolean }): void;
  getScreenPosition(): TextBuffer.Point;
  setBufferPosition(bufferPosition: number[], options?: { autoscroll: boolean }): void;
  getBufferPosition(): TextBuffer.Point;
  getScreenRow(): number;
  getScreenColumn(): number;
  getBufferRow(): number;
  getBufferColumn(): number;
  getCurrentBufferLine(): number;
  isAtBeginningOfLine(): boolean;
  isAtEndOfLine(): boolean;
  getMarker(): TextEditorMarker;
  isSurroundedByWhitespace(): boolean;
  isBetweenWOrdAndNonWord(): boolean;
  isInsideWord(option?: { wordRegex: RegExp }): boolean;
  getIndentLevel(): number;
  getScopeDescriptor(): ScopeDescriptor;
  hasPrecedingCharactersOnLine(): boolean;
  isLastCursor(): boolean;
  moveUp(rowCount?: number, options?: { moveToEndOfSelection }): void;
  moveDown(rowCount?: number, options?: { moveToEndOfSelection }): void;
  moveLeft(columnCount?: number, options?: { moveToEndOfSelection }): void;
  moveRight(columnCount?: number, options?: { moveToEndOfSelection }): void;
  moveToTop(): void;
  moveToBottom(): void;
  moveToBeginningOfScreenLine(): void;
  moveToBeginningOfLine(): void;
  moveToFirstCharacterOfLine(): void;
  moveToEndOfScreenLine(): void;
  moveToEndOfLine(): void;
  moveToBeginningOfWord(): void;
  moveToEndOfWord(): void;
  moveToBeginningOfNextWord(): void;
  moveToPreviousWordBoundary(): void;
  moveToNextWordBoundary(): void;
  moveToPreviousSubwordBoundary(): void;
  moveToNextSubwordBoundary(): void;
  skipLeadingWhitespace(): void;
  moveToBeginningOfNextParagraph(): void;
  moveToBeginningOfPreviousParagraph(): void;
  getPreviousWordBoundaryBufferPosition(options?: { wordRegex: RegExp }): any;
  getNextWordBoundaryBufferPosition(options?: { wordRegex: RegExp }): any;
  getBeginningOfCurrentWordBufferPosition(options?: {
    wordRegex: RegExp,
    includeNonWordCharacters: boolean,
    allowPrevious: boolean
  }): Range;
  getEndOfCurrentWordBufferPosition(options?: {
    wordRegex: RegExp,
    includeNonWordCharacters: boolean
  }): Range;
  getBeginningOfNextWordBufferPosition(options?: { wordRegex: RegExp }): Range;
  getCurrentWordBufferRange(options?: { wordRegex: RegExp }): Range;
  getCurrentLineBufferRange(options?: { includeNewLine: boolean }): Range;
  getCurrentParagraphBufferRange(): Range;
  getCurrentWordPrefix(): string;
  setVisible(): void;
  isVisible(): boolean;
  compare(otherCursor: Cursor): number;
  clearAutoscroll(): void;
  clearSelection(): void;
  wordRegExp(options?: { includeNonWordCharacters?: boolean }): RegExp;
  subwordRegExp(options?: { backwards?: boolean }): RegExp;
}
export = Cursor;
