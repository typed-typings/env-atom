import EventKit = require('event-kit');
import TextBuffer = require('text-buffer');

declare class Selection {
  onDidChangeRange(callback: (event: {
    oldBufferRange: TextBuffer.Range;
    oldScreenRange: TextBuffer.Range;
    newBufferRange: TextBuffer.Range;
    newScreenRange: TextBuffer.Range;
    selection: Selection
  }) => void): EventKit.Disposable;
  onDidDestroy: EventKit.EventHandler;
  getScreenRange(): TextBuffer.Range;
  setScreenRange(screenRange: Range, options?: {
    preserveFolds?: boolean,
    autoScroll?: boolean
  }): void;
  getbufferRange(): TextBuffer.Range;
  setbufferRange(bufferRange: Range, options?: {
    preserveFolds?: boolean,
    autoScroll?: boolean
  }): void;
  getBufferRowRange(): any;
  isEmpty(): boolean;
  isReversed(): boolean;
  isSingleScreenLine(): boolean;
  getText(): string;
  intersectsBufferRange(bufferRange: Range): boolean;
  intersectsWith(otherSelection: Selection): boolean;
  clear(options?: { autoScroll: boolean }): void;
  selectToScreenPosition(position: TextBuffer.Point): void;
  selectToBufferPosition(position: TextBuffer.Point): void;
  selectRight(columnCount?: number): void;
  selectLeft(columnCount?: number): void;
  selectUp(rowCount?: number): void;
  selectDown(rowCount?: number): void;
  selectToTop(): void;
  selectToBottom(): void;
  selectAll(): void;
  selectToBeginningOfLine(): void;
  selectToFirstCharactorOfLine(): void;
  selectToEndOfLine(): void;
  selectToEndOfBufferLine(): void;
  selectToBeginningOfWord(): void;
  selectToEndOfWord(): void;
  selectToBeginningOfNextWord(): void;
  selectToPreviousWordBoundary(): void;
  selectToNextWordBoundary(): void;
  selectToPreviousSubwordBoundary(): void;
  selectToNextSubwordBoundary(): void;
  selectToBeginningOfNextParagraph(): void;
  selectToBeginningOfPreviousParagraph(): void;
  selectWord(): void;
  expandOverWord(): void;
  selectLine(row: number): void;
  expandOverLine(): void;
  insertText(text: string, options?: {
    select: boolean;
    autoIndent: boolean;
    autoIndentNewLine: boolean;
    autoDecreaseIndent: boolean;
    normalizeLineEndings?: boolean;
    undo: 'skip'
  }): void;
  backspace(): void;
  deleteToPreviousWordBoundary(): void;
  deleteToNextWordBoundary(): void;
  deleteToBeginningOfWord(): void;
  deleteToBeginningOfLine(): void;
  delete(): void;
  deleteToEndOfLine(): void;
  deleteToEndOfWord(): void;
  deleteToBeginningOfSubword(): void;
  deleteToEndOfSubword(): void;
  deleteLine(): void;
  joinLines(): void;
  outdentSelectedRows(): void;
  autoIndentSelectedRows(): void;
  toggleLineComments(): void;
  cutToEndOfLine(): void;
  cutToEndOfBufferLine(): void;
  cut(maintainClipboard: boolean, fullLine: boolean): void;
  copy(maintainClipboard: boolean, fullLine: boolean): void;
  fold(): void;
  indentSelectedRows(): void;
  addSelectionBelow(): void;
  addSelectionAbove(): void;
  merge(otherSelection: Selection, options?: {
    preserveFolds?: boolean,
    autoScroll?: boolean
  }): void;
  compare(otherSelection: Selection): number;
}
export = Selection;
