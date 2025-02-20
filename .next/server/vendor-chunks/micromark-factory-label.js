"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/micromark-factory-label";
exports.ids = ["vendor-chunks/micromark-factory-label"];
exports.modules = {

/***/ "(ssr)/./node_modules/micromark-factory-label/dev/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/micromark-factory-label/dev/index.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   factoryLabel: () => (/* binding */ factoryLabel)\n/* harmony export */ });\n/* harmony import */ var devlop__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! devlop */ \"(ssr)/./node_modules/devlop/lib/development.js\");\n/* harmony import */ var micromark_util_character__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! micromark-util-character */ \"(ssr)/./node_modules/micromark-util-character/dev/index.js\");\n/* harmony import */ var micromark_util_symbol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! micromark-util-symbol */ \"(ssr)/./node_modules/micromark-util-symbol/lib/codes.js\");\n/* harmony import */ var micromark_util_symbol__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! micromark-util-symbol */ \"(ssr)/./node_modules/micromark-util-symbol/lib/constants.js\");\n/* harmony import */ var micromark_util_symbol__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! micromark-util-symbol */ \"(ssr)/./node_modules/micromark-util-symbol/lib/types.js\");\n/**\n * @import {\n *   Effects,\n *   State,\n *   TokenizeContext,\n *   TokenType\n * } from 'micromark-util-types'\n */\n\n\n\n\n\n/**\n * Parse labels.\n *\n * > 👉 **Note**: labels in markdown are capped at 999 characters in the string.\n *\n * ###### Examples\n *\n * ```markdown\n * [a]\n * [a\n * b]\n * [a\\]b]\n * ```\n *\n * @this {TokenizeContext}\n *   Tokenize context.\n * @param {Effects} effects\n *   Context.\n * @param {State} ok\n *   State switched to when successful.\n * @param {State} nok\n *   State switched to when unsuccessful.\n * @param {TokenType} type\n *   Type of the whole label (`[a]`).\n * @param {TokenType} markerType\n *   Type for the markers (`[` and `]`).\n * @param {TokenType} stringType\n *   Type for the identifier (`a`).\n * @returns {State}\n *   Start state.\n */\nfunction factoryLabel(effects, ok, nok, type, markerType, stringType) {\n  const self = this\n  let size = 0\n  /** @type {boolean} */\n  let seen\n\n  return start\n\n  /**\n   * Start of label.\n   *\n   * ```markdown\n   * > | [a]\n   *     ^\n   * ```\n   *\n   * @type {State}\n   */\n  function start(code) {\n    ;(0,devlop__WEBPACK_IMPORTED_MODULE_0__.ok)(code === micromark_util_symbol__WEBPACK_IMPORTED_MODULE_1__.codes.leftSquareBracket, 'expected `[`')\n    effects.enter(type)\n    effects.enter(markerType)\n    effects.consume(code)\n    effects.exit(markerType)\n    effects.enter(stringType)\n    return atBreak\n  }\n\n  /**\n   * In label, at something, before something else.\n   *\n   * ```markdown\n   * > | [a]\n   *      ^\n   * ```\n   *\n   * @type {State}\n   */\n  function atBreak(code) {\n    if (\n      size > micromark_util_symbol__WEBPACK_IMPORTED_MODULE_2__.constants.linkReferenceSizeMax ||\n      code === micromark_util_symbol__WEBPACK_IMPORTED_MODULE_1__.codes.eof ||\n      code === micromark_util_symbol__WEBPACK_IMPORTED_MODULE_1__.codes.leftSquareBracket ||\n      (code === micromark_util_symbol__WEBPACK_IMPORTED_MODULE_1__.codes.rightSquareBracket && !seen) ||\n      // To do: remove in the future once we’ve switched from\n      // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,\n      // which doesn’t need this.\n      // Hidden footnotes hook.\n      /* c8 ignore next 3 */\n      (code === micromark_util_symbol__WEBPACK_IMPORTED_MODULE_1__.codes.caret &&\n        !size &&\n        '_hiddenFootnoteSupport' in self.parser.constructs)\n    ) {\n      return nok(code)\n    }\n\n    if (code === micromark_util_symbol__WEBPACK_IMPORTED_MODULE_1__.codes.rightSquareBracket) {\n      effects.exit(stringType)\n      effects.enter(markerType)\n      effects.consume(code)\n      effects.exit(markerType)\n      effects.exit(type)\n      return ok\n    }\n\n    // To do: indent? Link chunks and EOLs together?\n    if ((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_3__.markdownLineEnding)(code)) {\n      effects.enter(micromark_util_symbol__WEBPACK_IMPORTED_MODULE_4__.types.lineEnding)\n      effects.consume(code)\n      effects.exit(micromark_util_symbol__WEBPACK_IMPORTED_MODULE_4__.types.lineEnding)\n      return atBreak\n    }\n\n    effects.enter(micromark_util_symbol__WEBPACK_IMPORTED_MODULE_4__.types.chunkString, {contentType: micromark_util_symbol__WEBPACK_IMPORTED_MODULE_2__.constants.contentTypeString})\n    return labelInside(code)\n  }\n\n  /**\n   * In label, in text.\n   *\n   * ```markdown\n   * > | [a]\n   *      ^\n   * ```\n   *\n   * @type {State}\n   */\n  function labelInside(code) {\n    if (\n      code === micromark_util_symbol__WEBPACK_IMPORTED_MODULE_1__.codes.eof ||\n      code === micromark_util_symbol__WEBPACK_IMPORTED_MODULE_1__.codes.leftSquareBracket ||\n      code === micromark_util_symbol__WEBPACK_IMPORTED_MODULE_1__.codes.rightSquareBracket ||\n      (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_3__.markdownLineEnding)(code) ||\n      size++ > micromark_util_symbol__WEBPACK_IMPORTED_MODULE_2__.constants.linkReferenceSizeMax\n    ) {\n      effects.exit(micromark_util_symbol__WEBPACK_IMPORTED_MODULE_4__.types.chunkString)\n      return atBreak(code)\n    }\n\n    effects.consume(code)\n    if (!seen) seen = !(0,micromark_util_character__WEBPACK_IMPORTED_MODULE_3__.markdownSpace)(code)\n    return code === micromark_util_symbol__WEBPACK_IMPORTED_MODULE_1__.codes.backslash ? labelEscape : labelInside\n  }\n\n  /**\n   * After `\\`, at a special character.\n   *\n   * ```markdown\n   * > | [a\\*a]\n   *        ^\n   * ```\n   *\n   * @type {State}\n   */\n  function labelEscape(code) {\n    if (\n      code === micromark_util_symbol__WEBPACK_IMPORTED_MODULE_1__.codes.leftSquareBracket ||\n      code === micromark_util_symbol__WEBPACK_IMPORTED_MODULE_1__.codes.backslash ||\n      code === micromark_util_symbol__WEBPACK_IMPORTED_MODULE_1__.codes.rightSquareBracket\n    ) {\n      effects.consume(code)\n      size++\n      return labelInside\n    }\n\n    return labelInside(code)\n  }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvbWljcm9tYXJrLWZhY3RvcnktbGFiZWwvZGV2L2luZGV4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFbUM7QUFDdUM7QUFDYjs7QUFFN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBLFdBQVcsU0FBUztBQUNwQjtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBLFdBQVcsV0FBVztBQUN0QjtBQUNBLFdBQVcsV0FBVztBQUN0QjtBQUNBLFdBQVcsV0FBVztBQUN0QjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBLElBQUksMkNBQU0sVUFBVSx3REFBSztBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBLGFBQWEsNERBQVM7QUFDdEIsZUFBZSx3REFBSztBQUNwQixlQUFlLHdEQUFLO0FBQ3BCLGdCQUFnQix3REFBSztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLHdEQUFLO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCLHdEQUFLO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsUUFBUSw0RUFBa0I7QUFDMUIsb0JBQW9CLHdEQUFLO0FBQ3pCO0FBQ0EsbUJBQW1CLHdEQUFLO0FBQ3hCO0FBQ0E7O0FBRUEsa0JBQWtCLHdEQUFLLGVBQWUsYUFBYSw0REFBUyxtQkFBbUI7QUFDL0U7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBLGVBQWUsd0RBQUs7QUFDcEIsZUFBZSx3REFBSztBQUNwQixlQUFlLHdEQUFLO0FBQ3BCLE1BQU0sNEVBQWtCO0FBQ3hCLGVBQWUsNERBQVM7QUFDeEI7QUFDQSxtQkFBbUIsd0RBQUs7QUFDeEI7QUFDQTs7QUFFQTtBQUNBLHVCQUF1Qix1RUFBYTtBQUNwQyxvQkFBb0Isd0RBQUs7QUFDekI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQSxlQUFlLHdEQUFLO0FBQ3BCLGVBQWUsd0RBQUs7QUFDcEIsZUFBZSx3REFBSztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL252aWRpYS1haS12ZXJjZWwvLi9ub2RlX21vZHVsZXMvbWljcm9tYXJrLWZhY3RvcnktbGFiZWwvZGV2L2luZGV4LmpzP2IzOTgiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAaW1wb3J0IHtcbiAqICAgRWZmZWN0cyxcbiAqICAgU3RhdGUsXG4gKiAgIFRva2VuaXplQ29udGV4dCxcbiAqICAgVG9rZW5UeXBlXG4gKiB9IGZyb20gJ21pY3JvbWFyay11dGlsLXR5cGVzJ1xuICovXG5cbmltcG9ydCB7b2sgYXMgYXNzZXJ0fSBmcm9tICdkZXZsb3AnXG5pbXBvcnQge21hcmtkb3duTGluZUVuZGluZywgbWFya2Rvd25TcGFjZX0gZnJvbSAnbWljcm9tYXJrLXV0aWwtY2hhcmFjdGVyJ1xuaW1wb3J0IHtjb2RlcywgY29uc3RhbnRzLCB0eXBlc30gZnJvbSAnbWljcm9tYXJrLXV0aWwtc3ltYm9sJ1xuXG4vKipcbiAqIFBhcnNlIGxhYmVscy5cbiAqXG4gKiA+IPCfkYkgKipOb3RlKio6IGxhYmVscyBpbiBtYXJrZG93biBhcmUgY2FwcGVkIGF0IDk5OSBjaGFyYWN0ZXJzIGluIHRoZSBzdHJpbmcuXG4gKlxuICogIyMjIyMjIEV4YW1wbGVzXG4gKlxuICogYGBgbWFya2Rvd25cbiAqIFthXVxuICogW2FcbiAqIGJdXG4gKiBbYVxcXWJdXG4gKiBgYGBcbiAqXG4gKiBAdGhpcyB7VG9rZW5pemVDb250ZXh0fVxuICogICBUb2tlbml6ZSBjb250ZXh0LlxuICogQHBhcmFtIHtFZmZlY3RzfSBlZmZlY3RzXG4gKiAgIENvbnRleHQuXG4gKiBAcGFyYW0ge1N0YXRlfSBva1xuICogICBTdGF0ZSBzd2l0Y2hlZCB0byB3aGVuIHN1Y2Nlc3NmdWwuXG4gKiBAcGFyYW0ge1N0YXRlfSBub2tcbiAqICAgU3RhdGUgc3dpdGNoZWQgdG8gd2hlbiB1bnN1Y2Nlc3NmdWwuXG4gKiBAcGFyYW0ge1Rva2VuVHlwZX0gdHlwZVxuICogICBUeXBlIG9mIHRoZSB3aG9sZSBsYWJlbCAoYFthXWApLlxuICogQHBhcmFtIHtUb2tlblR5cGV9IG1hcmtlclR5cGVcbiAqICAgVHlwZSBmb3IgdGhlIG1hcmtlcnMgKGBbYCBhbmQgYF1gKS5cbiAqIEBwYXJhbSB7VG9rZW5UeXBlfSBzdHJpbmdUeXBlXG4gKiAgIFR5cGUgZm9yIHRoZSBpZGVudGlmaWVyIChgYWApLlxuICogQHJldHVybnMge1N0YXRlfVxuICogICBTdGFydCBzdGF0ZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZhY3RvcnlMYWJlbChlZmZlY3RzLCBvaywgbm9rLCB0eXBlLCBtYXJrZXJUeXBlLCBzdHJpbmdUeXBlKSB7XG4gIGNvbnN0IHNlbGYgPSB0aGlzXG4gIGxldCBzaXplID0gMFxuICAvKiogQHR5cGUge2Jvb2xlYW59ICovXG4gIGxldCBzZWVuXG5cbiAgcmV0dXJuIHN0YXJ0XG5cbiAgLyoqXG4gICAqIFN0YXJ0IG9mIGxhYmVsLlxuICAgKlxuICAgKiBgYGBtYXJrZG93blxuICAgKiA+IHwgW2FdXG4gICAqICAgICBeXG4gICAqIGBgYFxuICAgKlxuICAgKiBAdHlwZSB7U3RhdGV9XG4gICAqL1xuICBmdW5jdGlvbiBzdGFydChjb2RlKSB7XG4gICAgYXNzZXJ0KGNvZGUgPT09IGNvZGVzLmxlZnRTcXVhcmVCcmFja2V0LCAnZXhwZWN0ZWQgYFtgJylcbiAgICBlZmZlY3RzLmVudGVyKHR5cGUpXG4gICAgZWZmZWN0cy5lbnRlcihtYXJrZXJUeXBlKVxuICAgIGVmZmVjdHMuY29uc3VtZShjb2RlKVxuICAgIGVmZmVjdHMuZXhpdChtYXJrZXJUeXBlKVxuICAgIGVmZmVjdHMuZW50ZXIoc3RyaW5nVHlwZSlcbiAgICByZXR1cm4gYXRCcmVha1xuICB9XG5cbiAgLyoqXG4gICAqIEluIGxhYmVsLCBhdCBzb21ldGhpbmcsIGJlZm9yZSBzb21ldGhpbmcgZWxzZS5cbiAgICpcbiAgICogYGBgbWFya2Rvd25cbiAgICogPiB8IFthXVxuICAgKiAgICAgIF5cbiAgICogYGBgXG4gICAqXG4gICAqIEB0eXBlIHtTdGF0ZX1cbiAgICovXG4gIGZ1bmN0aW9uIGF0QnJlYWsoY29kZSkge1xuICAgIGlmIChcbiAgICAgIHNpemUgPiBjb25zdGFudHMubGlua1JlZmVyZW5jZVNpemVNYXggfHxcbiAgICAgIGNvZGUgPT09IGNvZGVzLmVvZiB8fFxuICAgICAgY29kZSA9PT0gY29kZXMubGVmdFNxdWFyZUJyYWNrZXQgfHxcbiAgICAgIChjb2RlID09PSBjb2Rlcy5yaWdodFNxdWFyZUJyYWNrZXQgJiYgIXNlZW4pIHx8XG4gICAgICAvLyBUbyBkbzogcmVtb3ZlIGluIHRoZSBmdXR1cmUgb25jZSB3ZeKAmXZlIHN3aXRjaGVkIGZyb21cbiAgICAgIC8vIGBtaWNyb21hcmstZXh0ZW5zaW9uLWZvb3Rub3RlYCB0byBgbWljcm9tYXJrLWV4dGVuc2lvbi1nZm0tZm9vdG5vdGVgLFxuICAgICAgLy8gd2hpY2ggZG9lc27igJl0IG5lZWQgdGhpcy5cbiAgICAgIC8vIEhpZGRlbiBmb290bm90ZXMgaG9vay5cbiAgICAgIC8qIGM4IGlnbm9yZSBuZXh0IDMgKi9cbiAgICAgIChjb2RlID09PSBjb2Rlcy5jYXJldCAmJlxuICAgICAgICAhc2l6ZSAmJlxuICAgICAgICAnX2hpZGRlbkZvb3Rub3RlU3VwcG9ydCcgaW4gc2VsZi5wYXJzZXIuY29uc3RydWN0cylcbiAgICApIHtcbiAgICAgIHJldHVybiBub2soY29kZSlcbiAgICB9XG5cbiAgICBpZiAoY29kZSA9PT0gY29kZXMucmlnaHRTcXVhcmVCcmFja2V0KSB7XG4gICAgICBlZmZlY3RzLmV4aXQoc3RyaW5nVHlwZSlcbiAgICAgIGVmZmVjdHMuZW50ZXIobWFya2VyVHlwZSlcbiAgICAgIGVmZmVjdHMuY29uc3VtZShjb2RlKVxuICAgICAgZWZmZWN0cy5leGl0KG1hcmtlclR5cGUpXG4gICAgICBlZmZlY3RzLmV4aXQodHlwZSlcbiAgICAgIHJldHVybiBva1xuICAgIH1cblxuICAgIC8vIFRvIGRvOiBpbmRlbnQ/IExpbmsgY2h1bmtzIGFuZCBFT0xzIHRvZ2V0aGVyP1xuICAgIGlmIChtYXJrZG93bkxpbmVFbmRpbmcoY29kZSkpIHtcbiAgICAgIGVmZmVjdHMuZW50ZXIodHlwZXMubGluZUVuZGluZylcbiAgICAgIGVmZmVjdHMuY29uc3VtZShjb2RlKVxuICAgICAgZWZmZWN0cy5leGl0KHR5cGVzLmxpbmVFbmRpbmcpXG4gICAgICByZXR1cm4gYXRCcmVha1xuICAgIH1cblxuICAgIGVmZmVjdHMuZW50ZXIodHlwZXMuY2h1bmtTdHJpbmcsIHtjb250ZW50VHlwZTogY29uc3RhbnRzLmNvbnRlbnRUeXBlU3RyaW5nfSlcbiAgICByZXR1cm4gbGFiZWxJbnNpZGUoY29kZSlcbiAgfVxuXG4gIC8qKlxuICAgKiBJbiBsYWJlbCwgaW4gdGV4dC5cbiAgICpcbiAgICogYGBgbWFya2Rvd25cbiAgICogPiB8IFthXVxuICAgKiAgICAgIF5cbiAgICogYGBgXG4gICAqXG4gICAqIEB0eXBlIHtTdGF0ZX1cbiAgICovXG4gIGZ1bmN0aW9uIGxhYmVsSW5zaWRlKGNvZGUpIHtcbiAgICBpZiAoXG4gICAgICBjb2RlID09PSBjb2Rlcy5lb2YgfHxcbiAgICAgIGNvZGUgPT09IGNvZGVzLmxlZnRTcXVhcmVCcmFja2V0IHx8XG4gICAgICBjb2RlID09PSBjb2Rlcy5yaWdodFNxdWFyZUJyYWNrZXQgfHxcbiAgICAgIG1hcmtkb3duTGluZUVuZGluZyhjb2RlKSB8fFxuICAgICAgc2l6ZSsrID4gY29uc3RhbnRzLmxpbmtSZWZlcmVuY2VTaXplTWF4XG4gICAgKSB7XG4gICAgICBlZmZlY3RzLmV4aXQodHlwZXMuY2h1bmtTdHJpbmcpXG4gICAgICByZXR1cm4gYXRCcmVhayhjb2RlKVxuICAgIH1cblxuICAgIGVmZmVjdHMuY29uc3VtZShjb2RlKVxuICAgIGlmICghc2Vlbikgc2VlbiA9ICFtYXJrZG93blNwYWNlKGNvZGUpXG4gICAgcmV0dXJuIGNvZGUgPT09IGNvZGVzLmJhY2tzbGFzaCA/IGxhYmVsRXNjYXBlIDogbGFiZWxJbnNpZGVcbiAgfVxuXG4gIC8qKlxuICAgKiBBZnRlciBgXFxgLCBhdCBhIHNwZWNpYWwgY2hhcmFjdGVyLlxuICAgKlxuICAgKiBgYGBtYXJrZG93blxuICAgKiA+IHwgW2FcXCphXVxuICAgKiAgICAgICAgXlxuICAgKiBgYGBcbiAgICpcbiAgICogQHR5cGUge1N0YXRlfVxuICAgKi9cbiAgZnVuY3Rpb24gbGFiZWxFc2NhcGUoY29kZSkge1xuICAgIGlmIChcbiAgICAgIGNvZGUgPT09IGNvZGVzLmxlZnRTcXVhcmVCcmFja2V0IHx8XG4gICAgICBjb2RlID09PSBjb2Rlcy5iYWNrc2xhc2ggfHxcbiAgICAgIGNvZGUgPT09IGNvZGVzLnJpZ2h0U3F1YXJlQnJhY2tldFxuICAgICkge1xuICAgICAgZWZmZWN0cy5jb25zdW1lKGNvZGUpXG4gICAgICBzaXplKytcbiAgICAgIHJldHVybiBsYWJlbEluc2lkZVxuICAgIH1cblxuICAgIHJldHVybiBsYWJlbEluc2lkZShjb2RlKVxuICB9XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/micromark-factory-label/dev/index.js\n");

/***/ })

};
;