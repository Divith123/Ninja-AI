"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/micromark-util-sanitize-uri";
exports.ids = ["vendor-chunks/micromark-util-sanitize-uri"];
exports.modules = {

/***/ "(ssr)/./node_modules/micromark-util-sanitize-uri/dev/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/micromark-util-sanitize-uri/dev/index.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   normalizeUri: () => (/* binding */ normalizeUri),\n/* harmony export */   sanitizeUri: () => (/* binding */ sanitizeUri)\n/* harmony export */ });\n/* harmony import */ var micromark_util_character__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! micromark-util-character */ \"(ssr)/./node_modules/micromark-util-character/dev/index.js\");\n/* harmony import */ var micromark_util_encode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! micromark-util-encode */ \"(ssr)/./node_modules/micromark-util-encode/index.js\");\n/* harmony import */ var micromark_util_symbol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! micromark-util-symbol */ \"(ssr)/./node_modules/micromark-util-symbol/lib/codes.js\");\n/* harmony import */ var micromark_util_symbol__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! micromark-util-symbol */ \"(ssr)/./node_modules/micromark-util-symbol/lib/values.js\");\n\n\n\n\n/**\n * Make a value safe for injection as a URL.\n *\n * This encodes unsafe characters with percent-encoding and skips already\n * encoded sequences (see `normalizeUri`).\n * Further unsafe characters are encoded as character references (see\n * `micromark-util-encode`).\n *\n * A regex of allowed protocols can be given, in which case the URL is\n * sanitized.\n * For example, `/^(https?|ircs?|mailto|xmpp)$/i` can be used for `a[href]`, or\n * `/^https?$/i` for `img[src]` (this is what `github.com` allows).\n * If the URL includes an unknown protocol (one not matched by `protocol`, such\n * as a dangerous example, `javascript:`), the value is ignored.\n *\n * @param {string | null | undefined} url\n *   URI to sanitize.\n * @param {RegExp | null | undefined} [protocol]\n *   Allowed protocols.\n * @returns {string}\n *   Sanitized URI.\n */\nfunction sanitizeUri(url, protocol) {\n  const value = (0,micromark_util_encode__WEBPACK_IMPORTED_MODULE_0__.encode)(normalizeUri(url || ''))\n\n  if (!protocol) {\n    return value\n  }\n\n  const colon = value.indexOf(':')\n  const questionMark = value.indexOf('?')\n  const numberSign = value.indexOf('#')\n  const slash = value.indexOf('/')\n\n  if (\n    // If there is no protocol, it’s relative.\n    colon < 0 ||\n    // If the first colon is after a `?`, `#`, or `/`, it’s not a protocol.\n    (slash > -1 && colon > slash) ||\n    (questionMark > -1 && colon > questionMark) ||\n    (numberSign > -1 && colon > numberSign) ||\n    // It is a protocol, it should be allowed.\n    protocol.test(value.slice(0, colon))\n  ) {\n    return value\n  }\n\n  return ''\n}\n\n/**\n * Normalize a URL.\n *\n * Encode unsafe characters with percent-encoding, skipping already encoded\n * sequences.\n *\n * @param {string} value\n *   URI to normalize.\n * @returns {string}\n *   Normalized URI.\n */\nfunction normalizeUri(value) {\n  /** @type {Array<string>} */\n  const result = []\n  let index = -1\n  let start = 0\n  let skip = 0\n\n  while (++index < value.length) {\n    const code = value.charCodeAt(index)\n    /** @type {string} */\n    let replace = ''\n\n    // A correct percent encoded value.\n    if (\n      code === micromark_util_symbol__WEBPACK_IMPORTED_MODULE_1__.codes.percentSign &&\n      (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_2__.asciiAlphanumeric)(value.charCodeAt(index + 1)) &&\n      (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_2__.asciiAlphanumeric)(value.charCodeAt(index + 2))\n    ) {\n      skip = 2\n    }\n    // ASCII.\n    else if (code < 128) {\n      if (!/[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(code))) {\n        replace = String.fromCharCode(code)\n      }\n    }\n    // Astral.\n    else if (code > 55_295 && code < 57_344) {\n      const next = value.charCodeAt(index + 1)\n\n      // A correct surrogate pair.\n      if (code < 56_320 && next > 56_319 && next < 57_344) {\n        replace = String.fromCharCode(code, next)\n        skip = 1\n      }\n      // Lone surrogate.\n      else {\n        replace = micromark_util_symbol__WEBPACK_IMPORTED_MODULE_3__.values.replacementCharacter\n      }\n    }\n    // Unicode.\n    else {\n      replace = String.fromCharCode(code)\n    }\n\n    if (replace) {\n      result.push(value.slice(start, index), encodeURIComponent(replace))\n      start = index + skip + 1\n      replace = ''\n    }\n\n    if (skip) {\n      index += skip\n      skip = 0\n    }\n  }\n\n  return result.join('') + value.slice(start)\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvbWljcm9tYXJrLXV0aWwtc2FuaXRpemUtdXJpL2Rldi9pbmRleC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBMEQ7QUFDZDtBQUNPOztBQUVuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLDJCQUEyQjtBQUN0QztBQUNBLFdBQVcsMkJBQTJCO0FBQ3RDO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDTztBQUNQLGdCQUFnQiw2REFBTTs7QUFFdEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ087QUFDUCxhQUFhLGVBQWU7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsUUFBUTtBQUN2Qjs7QUFFQTtBQUNBO0FBQ0EsZUFBZSx3REFBSztBQUNwQixNQUFNLDJFQUFpQjtBQUN2QixNQUFNLDJFQUFpQjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQix5REFBTTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9udmlkaWEtYWktdmVyY2VsLy4vbm9kZV9tb2R1bGVzL21pY3JvbWFyay11dGlsLXNhbml0aXplLXVyaS9kZXYvaW5kZXguanM/ZTRmOCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2FzY2lpQWxwaGFudW1lcmljfSBmcm9tICdtaWNyb21hcmstdXRpbC1jaGFyYWN0ZXInXG5pbXBvcnQge2VuY29kZX0gZnJvbSAnbWljcm9tYXJrLXV0aWwtZW5jb2RlJ1xuaW1wb3J0IHtjb2RlcywgdmFsdWVzfSBmcm9tICdtaWNyb21hcmstdXRpbC1zeW1ib2wnXG5cbi8qKlxuICogTWFrZSBhIHZhbHVlIHNhZmUgZm9yIGluamVjdGlvbiBhcyBhIFVSTC5cbiAqXG4gKiBUaGlzIGVuY29kZXMgdW5zYWZlIGNoYXJhY3RlcnMgd2l0aCBwZXJjZW50LWVuY29kaW5nIGFuZCBza2lwcyBhbHJlYWR5XG4gKiBlbmNvZGVkIHNlcXVlbmNlcyAoc2VlIGBub3JtYWxpemVVcmlgKS5cbiAqIEZ1cnRoZXIgdW5zYWZlIGNoYXJhY3RlcnMgYXJlIGVuY29kZWQgYXMgY2hhcmFjdGVyIHJlZmVyZW5jZXMgKHNlZVxuICogYG1pY3JvbWFyay11dGlsLWVuY29kZWApLlxuICpcbiAqIEEgcmVnZXggb2YgYWxsb3dlZCBwcm90b2NvbHMgY2FuIGJlIGdpdmVuLCBpbiB3aGljaCBjYXNlIHRoZSBVUkwgaXNcbiAqIHNhbml0aXplZC5cbiAqIEZvciBleGFtcGxlLCBgL14oaHR0cHM/fGlyY3M/fG1haWx0b3x4bXBwKSQvaWAgY2FuIGJlIHVzZWQgZm9yIGBhW2hyZWZdYCwgb3JcbiAqIGAvXmh0dHBzPyQvaWAgZm9yIGBpbWdbc3JjXWAgKHRoaXMgaXMgd2hhdCBgZ2l0aHViLmNvbWAgYWxsb3dzKS5cbiAqIElmIHRoZSBVUkwgaW5jbHVkZXMgYW4gdW5rbm93biBwcm90b2NvbCAob25lIG5vdCBtYXRjaGVkIGJ5IGBwcm90b2NvbGAsIHN1Y2hcbiAqIGFzIGEgZGFuZ2Vyb3VzIGV4YW1wbGUsIGBqYXZhc2NyaXB0OmApLCB0aGUgdmFsdWUgaXMgaWdub3JlZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZyB8IG51bGwgfCB1bmRlZmluZWR9IHVybFxuICogICBVUkkgdG8gc2FuaXRpemUuXG4gKiBAcGFyYW0ge1JlZ0V4cCB8IG51bGwgfCB1bmRlZmluZWR9IFtwcm90b2NvbF1cbiAqICAgQWxsb3dlZCBwcm90b2NvbHMuXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICogICBTYW5pdGl6ZWQgVVJJLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2FuaXRpemVVcmkodXJsLCBwcm90b2NvbCkge1xuICBjb25zdCB2YWx1ZSA9IGVuY29kZShub3JtYWxpemVVcmkodXJsIHx8ICcnKSlcblxuICBpZiAoIXByb3RvY29sKSB7XG4gICAgcmV0dXJuIHZhbHVlXG4gIH1cblxuICBjb25zdCBjb2xvbiA9IHZhbHVlLmluZGV4T2YoJzonKVxuICBjb25zdCBxdWVzdGlvbk1hcmsgPSB2YWx1ZS5pbmRleE9mKCc/JylcbiAgY29uc3QgbnVtYmVyU2lnbiA9IHZhbHVlLmluZGV4T2YoJyMnKVxuICBjb25zdCBzbGFzaCA9IHZhbHVlLmluZGV4T2YoJy8nKVxuXG4gIGlmIChcbiAgICAvLyBJZiB0aGVyZSBpcyBubyBwcm90b2NvbCwgaXTigJlzIHJlbGF0aXZlLlxuICAgIGNvbG9uIDwgMCB8fFxuICAgIC8vIElmIHRoZSBmaXJzdCBjb2xvbiBpcyBhZnRlciBhIGA/YCwgYCNgLCBvciBgL2AsIGl04oCZcyBub3QgYSBwcm90b2NvbC5cbiAgICAoc2xhc2ggPiAtMSAmJiBjb2xvbiA+IHNsYXNoKSB8fFxuICAgIChxdWVzdGlvbk1hcmsgPiAtMSAmJiBjb2xvbiA+IHF1ZXN0aW9uTWFyaykgfHxcbiAgICAobnVtYmVyU2lnbiA+IC0xICYmIGNvbG9uID4gbnVtYmVyU2lnbikgfHxcbiAgICAvLyBJdCBpcyBhIHByb3RvY29sLCBpdCBzaG91bGQgYmUgYWxsb3dlZC5cbiAgICBwcm90b2NvbC50ZXN0KHZhbHVlLnNsaWNlKDAsIGNvbG9uKSlcbiAgKSB7XG4gICAgcmV0dXJuIHZhbHVlXG4gIH1cblxuICByZXR1cm4gJydcbn1cblxuLyoqXG4gKiBOb3JtYWxpemUgYSBVUkwuXG4gKlxuICogRW5jb2RlIHVuc2FmZSBjaGFyYWN0ZXJzIHdpdGggcGVyY2VudC1lbmNvZGluZywgc2tpcHBpbmcgYWxyZWFkeSBlbmNvZGVkXG4gKiBzZXF1ZW5jZXMuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gKiAgIFVSSSB0byBub3JtYWxpemUuXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICogICBOb3JtYWxpemVkIFVSSS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZVVyaSh2YWx1ZSkge1xuICAvKiogQHR5cGUge0FycmF5PHN0cmluZz59ICovXG4gIGNvbnN0IHJlc3VsdCA9IFtdXG4gIGxldCBpbmRleCA9IC0xXG4gIGxldCBzdGFydCA9IDBcbiAgbGV0IHNraXAgPSAwXG5cbiAgd2hpbGUgKCsraW5kZXggPCB2YWx1ZS5sZW5ndGgpIHtcbiAgICBjb25zdCBjb2RlID0gdmFsdWUuY2hhckNvZGVBdChpbmRleClcbiAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICBsZXQgcmVwbGFjZSA9ICcnXG5cbiAgICAvLyBBIGNvcnJlY3QgcGVyY2VudCBlbmNvZGVkIHZhbHVlLlxuICAgIGlmIChcbiAgICAgIGNvZGUgPT09IGNvZGVzLnBlcmNlbnRTaWduICYmXG4gICAgICBhc2NpaUFscGhhbnVtZXJpYyh2YWx1ZS5jaGFyQ29kZUF0KGluZGV4ICsgMSkpICYmXG4gICAgICBhc2NpaUFscGhhbnVtZXJpYyh2YWx1ZS5jaGFyQ29kZUF0KGluZGV4ICsgMikpXG4gICAgKSB7XG4gICAgICBza2lwID0gMlxuICAgIH1cbiAgICAvLyBBU0NJSS5cbiAgICBlbHNlIGlmIChjb2RlIDwgMTI4KSB7XG4gICAgICBpZiAoIS9bISMkJi07PT8tWl9hLXp+XS8udGVzdChTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUpKSkge1xuICAgICAgICByZXBsYWNlID0gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlKVxuICAgICAgfVxuICAgIH1cbiAgICAvLyBBc3RyYWwuXG4gICAgZWxzZSBpZiAoY29kZSA+IDU1XzI5NSAmJiBjb2RlIDwgNTdfMzQ0KSB7XG4gICAgICBjb25zdCBuZXh0ID0gdmFsdWUuY2hhckNvZGVBdChpbmRleCArIDEpXG5cbiAgICAgIC8vIEEgY29ycmVjdCBzdXJyb2dhdGUgcGFpci5cbiAgICAgIGlmIChjb2RlIDwgNTZfMzIwICYmIG5leHQgPiA1Nl8zMTkgJiYgbmV4dCA8IDU3XzM0NCkge1xuICAgICAgICByZXBsYWNlID0gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlLCBuZXh0KVxuICAgICAgICBza2lwID0gMVxuICAgICAgfVxuICAgICAgLy8gTG9uZSBzdXJyb2dhdGUuXG4gICAgICBlbHNlIHtcbiAgICAgICAgcmVwbGFjZSA9IHZhbHVlcy5yZXBsYWNlbWVudENoYXJhY3RlclxuICAgICAgfVxuICAgIH1cbiAgICAvLyBVbmljb2RlLlxuICAgIGVsc2Uge1xuICAgICAgcmVwbGFjZSA9IFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZSlcbiAgICB9XG5cbiAgICBpZiAocmVwbGFjZSkge1xuICAgICAgcmVzdWx0LnB1c2godmFsdWUuc2xpY2Uoc3RhcnQsIGluZGV4KSwgZW5jb2RlVVJJQ29tcG9uZW50KHJlcGxhY2UpKVxuICAgICAgc3RhcnQgPSBpbmRleCArIHNraXAgKyAxXG4gICAgICByZXBsYWNlID0gJydcbiAgICB9XG5cbiAgICBpZiAoc2tpcCkge1xuICAgICAgaW5kZXggKz0gc2tpcFxuICAgICAgc2tpcCA9IDBcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0LmpvaW4oJycpICsgdmFsdWUuc2xpY2Uoc3RhcnQpXG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/micromark-util-sanitize-uri/dev/index.js\n");

/***/ })

};
;