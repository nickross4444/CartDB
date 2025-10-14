/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 11:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(456);
__webpack_require__(410);
__webpack_require__(409);
__webpack_require__(878);
__webpack_require__(604);
__webpack_require__(639);
__webpack_require__(501);
__webpack_require__(425);
__exportStar(__webpack_require__(425), exports);
__webpack_require__(129);
__webpack_require__(380);
__webpack_require__(122);
__webpack_require__(152);
__exportStar(__webpack_require__(890), exports);


/***/ }),

/***/ 45:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const PostgrestFilterBuilder_1 = __importDefault(__webpack_require__(825));
class PostgrestQueryBuilder {
    constructor(url, { headers = {}, schema, fetch, }) {
        this.url = url;
        this.headers = new Headers(headers);
        this.schema = schema;
        this.fetch = fetch;
    }
    /**
     * Perform a SELECT query on the table or view.
     *
     * @param columns - The columns to retrieve, separated by commas. Columns can be renamed when returned with `customName:columnName`
     *
     * @param options - Named parameters
     *
     * @param options.head - When set to `true`, `data` will not be returned.
     * Useful if you only need the count.
     *
     * @param options.count - Count algorithm to use to count rows in the table or view.
     *
     * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
     * hood.
     *
     * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
     * statistics under the hood.
     *
     * `"estimated"`: Uses exact count for low numbers and planned count for high
     * numbers.
     */
    select(columns, { head = false, count, } = {}) {
        const method = head ? 'HEAD' : 'GET';
        // Remove whitespaces except when quoted
        let quoted = false;
        const cleanedColumns = (columns !== null && columns !== void 0 ? columns : '*')
            .split('')
            .map((c) => {
            if (/\s/.test(c) && !quoted) {
                return '';
            }
            if (c === '"') {
                quoted = !quoted;
            }
            return c;
        })
            .join('');
        this.url.searchParams.set('select', cleanedColumns);
        if (count) {
            this.headers.append('Prefer', `count=${count}`);
        }
        return new PostgrestFilterBuilder_1.default({
            method,
            url: this.url,
            headers: this.headers,
            schema: this.schema,
            fetch: this.fetch,
        });
    }
    /**
     * Perform an INSERT into the table or view.
     *
     * By default, inserted rows are not returned. To return it, chain the call
     * with `.select()`.
     *
     * @param values - The values to insert. Pass an object to insert a single row
     * or an array to insert multiple rows.
     *
     * @param options - Named parameters
     *
     * @param options.count - Count algorithm to use to count inserted rows.
     *
     * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
     * hood.
     *
     * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
     * statistics under the hood.
     *
     * `"estimated"`: Uses exact count for low numbers and planned count for high
     * numbers.
     *
     * @param options.defaultToNull - Make missing fields default to `null`.
     * Otherwise, use the default value for the column. Only applies for bulk
     * inserts.
     */
    insert(values, { count, defaultToNull = true, } = {}) {
        var _a;
        const method = 'POST';
        if (count) {
            this.headers.append('Prefer', `count=${count}`);
        }
        if (!defaultToNull) {
            this.headers.append('Prefer', `missing=default`);
        }
        if (Array.isArray(values)) {
            const columns = values.reduce((acc, x) => acc.concat(Object.keys(x)), []);
            if (columns.length > 0) {
                const uniqueColumns = [...new Set(columns)].map((column) => `"${column}"`);
                this.url.searchParams.set('columns', uniqueColumns.join(','));
            }
        }
        return new PostgrestFilterBuilder_1.default({
            method,
            url: this.url,
            headers: this.headers,
            schema: this.schema,
            body: values,
            fetch: (_a = this.fetch) !== null && _a !== void 0 ? _a : fetch,
        });
    }
    /**
     * Perform an UPSERT on the table or view. Depending on the column(s) passed
     * to `onConflict`, `.upsert()` allows you to perform the equivalent of
     * `.insert()` if a row with the corresponding `onConflict` columns doesn't
     * exist, or if it does exist, perform an alternative action depending on
     * `ignoreDuplicates`.
     *
     * By default, upserted rows are not returned. To return it, chain the call
     * with `.select()`.
     *
     * @param values - The values to upsert with. Pass an object to upsert a
     * single row or an array to upsert multiple rows.
     *
     * @param options - Named parameters
     *
     * @param options.onConflict - Comma-separated UNIQUE column(s) to specify how
     * duplicate rows are determined. Two rows are duplicates if all the
     * `onConflict` columns are equal.
     *
     * @param options.ignoreDuplicates - If `true`, duplicate rows are ignored. If
     * `false`, duplicate rows are merged with existing rows.
     *
     * @param options.count - Count algorithm to use to count upserted rows.
     *
     * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
     * hood.
     *
     * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
     * statistics under the hood.
     *
     * `"estimated"`: Uses exact count for low numbers and planned count for high
     * numbers.
     *
     * @param options.defaultToNull - Make missing fields default to `null`.
     * Otherwise, use the default value for the column. This only applies when
     * inserting new rows, not when merging with existing rows under
     * `ignoreDuplicates: false`. This also only applies when doing bulk upserts.
     */
    upsert(values, { onConflict, ignoreDuplicates = false, count, defaultToNull = true, } = {}) {
        var _a;
        const method = 'POST';
        this.headers.append('Prefer', `resolution=${ignoreDuplicates ? 'ignore' : 'merge'}-duplicates`);
        if (onConflict !== undefined)
            this.url.searchParams.set('on_conflict', onConflict);
        if (count) {
            this.headers.append('Prefer', `count=${count}`);
        }
        if (!defaultToNull) {
            this.headers.append('Prefer', 'missing=default');
        }
        if (Array.isArray(values)) {
            const columns = values.reduce((acc, x) => acc.concat(Object.keys(x)), []);
            if (columns.length > 0) {
                const uniqueColumns = [...new Set(columns)].map((column) => `"${column}"`);
                this.url.searchParams.set('columns', uniqueColumns.join(','));
            }
        }
        return new PostgrestFilterBuilder_1.default({
            method,
            url: this.url,
            headers: this.headers,
            schema: this.schema,
            body: values,
            fetch: (_a = this.fetch) !== null && _a !== void 0 ? _a : fetch,
        });
    }
    /**
     * Perform an UPDATE on the table or view.
     *
     * By default, updated rows are not returned. To return it, chain the call
     * with `.select()` after filters.
     *
     * @param values - The values to update with
     *
     * @param options - Named parameters
     *
     * @param options.count - Count algorithm to use to count updated rows.
     *
     * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
     * hood.
     *
     * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
     * statistics under the hood.
     *
     * `"estimated"`: Uses exact count for low numbers and planned count for high
     * numbers.
     */
    update(values, { count, } = {}) {
        var _a;
        const method = 'PATCH';
        if (count) {
            this.headers.append('Prefer', `count=${count}`);
        }
        return new PostgrestFilterBuilder_1.default({
            method,
            url: this.url,
            headers: this.headers,
            schema: this.schema,
            body: values,
            fetch: (_a = this.fetch) !== null && _a !== void 0 ? _a : fetch,
        });
    }
    /**
     * Perform a DELETE on the table or view.
     *
     * By default, deleted rows are not returned. To return it, chain the call
     * with `.select()` after filters.
     *
     * @param options - Named parameters
     *
     * @param options.count - Count algorithm to use to count deleted rows.
     *
     * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
     * hood.
     *
     * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
     * statistics under the hood.
     *
     * `"estimated"`: Uses exact count for low numbers and planned count for high
     * numbers.
     */
    delete({ count, } = {}) {
        var _a;
        const method = 'DELETE';
        if (count) {
            this.headers.append('Prefer', `count=${count}`);
        }
        return new PostgrestFilterBuilder_1.default({
            method,
            url: this.url,
            headers: this.headers,
            schema: this.schema,
            fetch: (_a = this.fetch) !== null && _a !== void 0 ? _a : fetch,
        });
    }
}
exports["default"] = PostgrestQueryBuilder;
//# sourceMappingURL=PostgrestQueryBuilder.js.map

/***/ }),

/***/ 79:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

const usm = __webpack_require__(484);
const urlencoded = __webpack_require__(252);
const URLSearchParams = __webpack_require__(682);

exports.implementation = class URLImpl {
  // Unlike the spec, we duplicate some code between the constructor and canParse, because we want to give useful error
  // messages in the constructor that distinguish between the different causes of failure.
  constructor(globalObject, [url, base]) {
    let parsedBase = null;
    if (base !== undefined) {
      parsedBase = usm.basicURLParse(base);
      if (parsedBase === null) {
        throw new TypeError(`Invalid base URL: ${base}`);
      }
    }

    const parsedURL = usm.basicURLParse(url, { baseURL: parsedBase });
    if (parsedURL === null) {
      throw new TypeError(`Invalid URL: ${url}`);
    }

    const query = parsedURL.query !== null ? parsedURL.query : "";

    this._url = parsedURL;

    // We cannot invoke the "new URLSearchParams object" algorithm without going through the constructor, which strips
    // question mark by default. Therefore the doNotStripQMark hack is used.
    this._query = URLSearchParams.createImpl(globalObject, [query], { doNotStripQMark: true });
    this._query._url = this;
  }

  static parse(globalObject, input, base) {
    try {
      return new URLImpl(globalObject, [input, base]);
    } catch {
      return null;
    }
  }

  static canParse(url, base) {
    let parsedBase = null;
    if (base !== undefined) {
      parsedBase = usm.basicURLParse(base);
      if (parsedBase === null) {
        return false;
      }
    }

    const parsedURL = usm.basicURLParse(url, { baseURL: parsedBase });
    if (parsedURL === null) {
      return false;
    }

    return true;
  }

  get href() {
    return usm.serializeURL(this._url);
  }

  set href(v) {
    const parsedURL = usm.basicURLParse(v);
    if (parsedURL === null) {
      throw new TypeError(`Invalid URL: ${v}`);
    }

    this._url = parsedURL;

    this._query._list.splice(0);
    const { query } = parsedURL;
    if (query !== null) {
      this._query._list = urlencoded.parseUrlencodedString(query);
    }
  }

  get origin() {
    return usm.serializeURLOrigin(this._url);
  }

  get protocol() {
    return `${this._url.scheme}:`;
  }

  set protocol(v) {
    usm.basicURLParse(`${v}:`, { url: this._url, stateOverride: "scheme start" });
  }

  get username() {
    return this._url.username;
  }

  set username(v) {
    if (usm.cannotHaveAUsernamePasswordPort(this._url)) {
      return;
    }

    usm.setTheUsername(this._url, v);
  }

  get password() {
    return this._url.password;
  }

  set password(v) {
    if (usm.cannotHaveAUsernamePasswordPort(this._url)) {
      return;
    }

    usm.setThePassword(this._url, v);
  }

  get host() {
    const url = this._url;

    if (url.host === null) {
      return "";
    }

    if (url.port === null) {
      return usm.serializeHost(url.host);
    }

    return `${usm.serializeHost(url.host)}:${usm.serializeInteger(url.port)}`;
  }

  set host(v) {
    if (usm.hasAnOpaquePath(this._url)) {
      return;
    }

    usm.basicURLParse(v, { url: this._url, stateOverride: "host" });
  }

  get hostname() {
    if (this._url.host === null) {
      return "";
    }

    return usm.serializeHost(this._url.host);
  }

  set hostname(v) {
    if (usm.hasAnOpaquePath(this._url)) {
      return;
    }

    usm.basicURLParse(v, { url: this._url, stateOverride: "hostname" });
  }

  get port() {
    if (this._url.port === null) {
      return "";
    }

    return usm.serializeInteger(this._url.port);
  }

  set port(v) {
    if (usm.cannotHaveAUsernamePasswordPort(this._url)) {
      return;
    }

    if (v === "") {
      this._url.port = null;
    } else {
      usm.basicURLParse(v, { url: this._url, stateOverride: "port" });
    }
  }

  get pathname() {
    return usm.serializePath(this._url);
  }

  set pathname(v) {
    if (usm.hasAnOpaquePath(this._url)) {
      return;
    }

    this._url.path = [];
    usm.basicURLParse(v, { url: this._url, stateOverride: "path start" });
  }

  get search() {
    if (this._url.query === null || this._url.query === "") {
      return "";
    }

    return `?${this._url.query}`;
  }

  set search(v) {
    const url = this._url;

    if (v === "") {
      url.query = null;
      this._query._list = [];
      return;
    }

    const input = v[0] === "?" ? v.substring(1) : v;
    url.query = "";
    usm.basicURLParse(input, { url, stateOverride: "query" });
    this._query._list = urlencoded.parseUrlencodedString(input);
  }

  get searchParams() {
    return this._query;
  }

  get hash() {
    if (this._url.fragment === null || this._url.fragment === "") {
      return "";
    }

    return `#${this._url.fragment}`;
  }

  set hash(v) {
    if (v === "") {
      this._url.fragment = null;
      return;
    }

    const input = v[0] === "#" ? v.substring(1) : v;
    this._url.fragment = "";
    usm.basicURLParse(input, { url: this._url, stateOverride: "fragment" });
  }

  toJSON() {
    return this.href;
  }
};


/***/ }),

/***/ 122:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
// URL polyfill for Lens Studio using whatwg-url
const whatwg_url_1 = __webpack_require__(833);
// Install the polyfill to globalThis
globalThis.URL = whatwg_url_1.URL;


/***/ }),

/***/ 129:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Base64 encoding/decoding polyfills for Lens Studio
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.btoaPolyfill = btoaPolyfill;
exports.atobPolyfill = atobPolyfill;
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
function btoaPolyfill(str) {
    let result = '';
    let i = 0;
    while (i < str.length) {
        const a = str.charCodeAt(i++);
        const b = i < str.length ? str.charCodeAt(i++) : 0;
        const c = i < str.length ? str.charCodeAt(i++) : 0;
        const bitmap = (a << 16) | (b << 8) | c;
        result += CHARS.charAt((bitmap >> 18) & 63) +
            CHARS.charAt((bitmap >> 12) & 63) +
            (i - 2 < str.length ? CHARS.charAt((bitmap >> 6) & 63) : '=') +
            (i - 1 < str.length ? CHARS.charAt(bitmap & 63) : '=');
    }
    return result;
}
function atobPolyfill(str) {
    str = str.replace(/[^A-Za-z0-9+/]/g, '');
    let result = '';
    let i = 0;
    while (i < str.length) {
        const encoded1 = CHARS.indexOf(str.charAt(i++));
        const encoded2 = CHARS.indexOf(str.charAt(i++));
        const encoded3 = CHARS.indexOf(str.charAt(i++));
        const encoded4 = CHARS.indexOf(str.charAt(i++));
        const bitmap = (encoded1 << 18) | (encoded2 << 12) | (encoded3 << 6) | encoded4;
        result += String.fromCharCode((bitmap >> 16) & 255);
        if (encoded3 !== 64)
            result += String.fromCharCode((bitmap >> 8) & 255);
        if (encoded4 !== 64)
            result += String.fromCharCode(bitmap & 255);
    }
    return result;
}
// Install the polyfills to globalThis
globalThis.btoa = btoaPolyfill;
globalThis.atob = atobPolyfill;


/***/ }),

/***/ 152:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.URLSearchParams = void 0;
class URLSearchParams {
    constructor(init) {
        this._params = {};
        if (typeof init === 'string') {
            // Parse query string
            let queryString = init;
            if (queryString.startsWith('?')) {
                queryString = queryString.slice(1);
            }
            if (queryString) {
                const pairs = queryString.split('&');
                for (let i = 0; i < pairs.length; i++) {
                    const pair = pairs[i];
                    const equalIndex = pair.indexOf('=');
                    if (equalIndex === -1) {
                        this._params[decodeURIComponent(pair)] = '';
                    }
                    else {
                        const key = decodeURIComponent(pair.slice(0, equalIndex));
                        const value = decodeURIComponent(pair.slice(equalIndex + 1));
                        this._params[key] = value;
                    }
                }
            }
        }
        else if (init && typeof init === 'object') {
            // Handle object or array initialization
            if (Array.isArray(init)) {
                for (let i = 0; i < init.length; i++) {
                    const pair = init[i];
                    if (Array.isArray(pair) && pair.length >= 2) {
                        this._params[String(pair[0])] = String(pair[1]);
                    }
                }
            }
            else {
                // Handle plain object
                for (const key in init) {
                    if (init.hasOwnProperty(key)) {
                        this._params[String(key)] = String(init[key]);
                    }
                }
            }
        }
    }
    append(name, value) {
        const key = String(name);
        const val = String(value);
        if (this._params.hasOwnProperty(key)) {
            // If key exists, we should handle multiple values, but for simplicity, we'll just update
            this._params[key] = val;
        }
        else {
            this._params[key] = val;
        }
    }
    delete(name) {
        const key = String(name);
        delete this._params[key];
    }
    get(name) {
        const key = String(name);
        return this._params.hasOwnProperty(key) ? this._params[key] : null;
    }
    getAll(name) {
        const key = String(name);
        return this._params.hasOwnProperty(key) ? [this._params[key]] : [];
    }
    has(name) {
        const key = String(name);
        return this._params.hasOwnProperty(key);
    }
    set(name, value) {
        const key = String(name);
        const val = String(value);
        this._params[key] = val;
    }
    toString() {
        const pairs = [];
        for (const key in this._params) {
            if (this._params.hasOwnProperty(key)) {
                pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(this._params[key]));
            }
        }
        return pairs.join('&');
    }
    forEach(callback, thisArg) {
        for (const key in this._params) {
            if (this._params.hasOwnProperty(key)) {
                callback.call(thisArg, this._params[key], key, this);
            }
        }
    }
    keys() {
        const keys = [];
        for (const key in this._params) {
            if (this._params.hasOwnProperty(key)) {
                keys.push(key);
            }
        }
        return keys[Symbol.iterator] ? keys[Symbol.iterator]() : keys;
    }
    values() {
        const values = [];
        for (const key in this._params) {
            if (this._params.hasOwnProperty(key)) {
                values.push(this._params[key]);
            }
        }
        return values[Symbol.iterator] ? values[Symbol.iterator]() : values;
    }
    entries() {
        const entries = [];
        for (const key in this._params) {
            if (this._params.hasOwnProperty(key)) {
                entries.push([key, this._params[key]]);
            }
        }
        return entries[Symbol.iterator] ? entries[Symbol.iterator]() : entries;
    }
}
exports.URLSearchParams = URLSearchParams;
if (typeof globalThis.URLSearchParams === 'undefined') {
    globalThis.URLSearchParams = URLSearchParams;
}


/***/ }),

/***/ 167:
/***/ ((module) => {

"use strict";


// Note that we take code points as JS numbers, not JS strings.

function isASCIIDigit(c) {
  return c >= 0x30 && c <= 0x39;
}

function isASCIIAlpha(c) {
  return (c >= 0x41 && c <= 0x5A) || (c >= 0x61 && c <= 0x7A);
}

function isASCIIAlphanumeric(c) {
  return isASCIIAlpha(c) || isASCIIDigit(c);
}

function isASCIIHex(c) {
  return isASCIIDigit(c) || (c >= 0x41 && c <= 0x46) || (c >= 0x61 && c <= 0x66);
}

module.exports = {
  isASCIIDigit,
  isASCIIAlpha,
  isASCIIAlphanumeric,
  isASCIIHex
};


/***/ }),

/***/ 181:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const URL = __webpack_require__(648);
const URLSearchParams = __webpack_require__(682);

exports.URL = URL;
exports.URLSearchParams = URLSearchParams;


/***/ }),

/***/ 252:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const { utf8Encode, utf8DecodeWithoutBOM } = __webpack_require__(408);
const { percentDecodeBytes, utf8PercentEncodeString, isURLEncodedPercentEncode } = __webpack_require__(656);

function p(char) {
  return char.codePointAt(0);
}

// https://url.spec.whatwg.org/#concept-urlencoded-parser
function parseUrlencoded(input) {
  const sequences = strictlySplitByteSequence(input, p("&"));
  const output = [];
  for (const bytes of sequences) {
    if (bytes.length === 0) {
      continue;
    }

    let name, value;
    const indexOfEqual = bytes.indexOf(p("="));

    if (indexOfEqual >= 0) {
      name = bytes.slice(0, indexOfEqual);
      value = bytes.slice(indexOfEqual + 1);
    } else {
      name = bytes;
      value = new Uint8Array(0);
    }

    name = replaceByteInByteSequence(name, 0x2B, 0x20);
    value = replaceByteInByteSequence(value, 0x2B, 0x20);

    const nameString = utf8DecodeWithoutBOM(percentDecodeBytes(name));
    const valueString = utf8DecodeWithoutBOM(percentDecodeBytes(value));

    output.push([nameString, valueString]);
  }
  return output;
}

// https://url.spec.whatwg.org/#concept-urlencoded-string-parser
function parseUrlencodedString(input) {
  return parseUrlencoded(utf8Encode(input));
}

// https://url.spec.whatwg.org/#concept-urlencoded-serializer
function serializeUrlencoded(tuples) {
  // TODO: accept and use encoding argument

  let output = "";
  for (const [i, tuple] of tuples.entries()) {
    const name = utf8PercentEncodeString(tuple[0], isURLEncodedPercentEncode, true);
    const value = utf8PercentEncodeString(tuple[1], isURLEncodedPercentEncode, true);

    if (i !== 0) {
      output += "&";
    }
    output += `${name}=${value}`;
  }
  return output;
}

function strictlySplitByteSequence(buf, cp) {
  const list = [];
  let last = 0;
  let i = buf.indexOf(cp);
  while (i >= 0) {
    list.push(buf.slice(last, i));
    last = i + 1;
    i = buf.indexOf(cp, last);
  }
  if (last !== buf.length) {
    list.push(buf.slice(last));
  }
  return list;
}

function replaceByteInByteSequence(buf, from, to) {
  let i = buf.indexOf(from);
  while (i >= 0) {
    buf[i] = to;
    i = buf.indexOf(from, i + 1);
  }
  return buf;
}

module.exports = {
  parseUrlencodedString,
  serializeUrlencoded
};


/***/ }),

/***/ 261:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const PostgrestBuilder_1 = __importDefault(__webpack_require__(660));
class PostgrestTransformBuilder extends PostgrestBuilder_1.default {
    /**
     * Perform a SELECT on the query result.
     *
     * By default, `.insert()`, `.update()`, `.upsert()`, and `.delete()` do not
     * return modified rows. By calling this method, modified rows are returned in
     * `data`.
     *
     * @param columns - The columns to retrieve, separated by commas
     */
    select(columns) {
        // Remove whitespaces except when quoted
        let quoted = false;
        const cleanedColumns = (columns !== null && columns !== void 0 ? columns : '*')
            .split('')
            .map((c) => {
            if (/\s/.test(c) && !quoted) {
                return '';
            }
            if (c === '"') {
                quoted = !quoted;
            }
            return c;
        })
            .join('');
        this.url.searchParams.set('select', cleanedColumns);
        this.headers.append('Prefer', 'return=representation');
        return this;
    }
    /**
     * Order the query result by `column`.
     *
     * You can call this method multiple times to order by multiple columns.
     *
     * You can order referenced tables, but it only affects the ordering of the
     * parent table if you use `!inner` in the query.
     *
     * @param column - The column to order by
     * @param options - Named parameters
     * @param options.ascending - If `true`, the result will be in ascending order
     * @param options.nullsFirst - If `true`, `null`s appear first. If `false`,
     * `null`s appear last.
     * @param options.referencedTable - Set this to order a referenced table by
     * its columns
     * @param options.foreignTable - Deprecated, use `options.referencedTable`
     * instead
     */
    order(column, { ascending = true, nullsFirst, foreignTable, referencedTable = foreignTable, } = {}) {
        const key = referencedTable ? `${referencedTable}.order` : 'order';
        const existingOrder = this.url.searchParams.get(key);
        this.url.searchParams.set(key, `${existingOrder ? `${existingOrder},` : ''}${column}.${ascending ? 'asc' : 'desc'}${nullsFirst === undefined ? '' : nullsFirst ? '.nullsfirst' : '.nullslast'}`);
        return this;
    }
    /**
     * Limit the query result by `count`.
     *
     * @param count - The maximum number of rows to return
     * @param options - Named parameters
     * @param options.referencedTable - Set this to limit rows of referenced
     * tables instead of the parent table
     * @param options.foreignTable - Deprecated, use `options.referencedTable`
     * instead
     */
    limit(count, { foreignTable, referencedTable = foreignTable, } = {}) {
        const key = typeof referencedTable === 'undefined' ? 'limit' : `${referencedTable}.limit`;
        this.url.searchParams.set(key, `${count}`);
        return this;
    }
    /**
     * Limit the query result by starting at an offset `from` and ending at the offset `to`.
     * Only records within this range are returned.
     * This respects the query order and if there is no order clause the range could behave unexpectedly.
     * The `from` and `to` values are 0-based and inclusive: `range(1, 3)` will include the second, third
     * and fourth rows of the query.
     *
     * @param from - The starting index from which to limit the result
     * @param to - The last index to which to limit the result
     * @param options - Named parameters
     * @param options.referencedTable - Set this to limit rows of referenced
     * tables instead of the parent table
     * @param options.foreignTable - Deprecated, use `options.referencedTable`
     * instead
     */
    range(from, to, { foreignTable, referencedTable = foreignTable, } = {}) {
        const keyOffset = typeof referencedTable === 'undefined' ? 'offset' : `${referencedTable}.offset`;
        const keyLimit = typeof referencedTable === 'undefined' ? 'limit' : `${referencedTable}.limit`;
        this.url.searchParams.set(keyOffset, `${from}`);
        // Range is inclusive, so add 1
        this.url.searchParams.set(keyLimit, `${to - from + 1}`);
        return this;
    }
    /**
     * Set the AbortSignal for the fetch request.
     *
     * @param signal - The AbortSignal to use for the fetch request
     */
    abortSignal(signal) {
        this.signal = signal;
        return this;
    }
    /**
     * Return `data` as a single object instead of an array of objects.
     *
     * Query result must be one row (e.g. using `.limit(1)`), otherwise this
     * returns an error.
     */
    single() {
        this.headers.set('Accept', 'application/vnd.pgrst.object+json');
        return this;
    }
    /**
     * Return `data` as a single object instead of an array of objects.
     *
     * Query result must be zero or one row (e.g. using `.limit(1)`), otherwise
     * this returns an error.
     */
    maybeSingle() {
        // Temporary partial fix for https://github.com/supabase/postgrest-js/issues/361
        // Issue persists e.g. for `.insert([...]).select().maybeSingle()`
        if (this.method === 'GET') {
            this.headers.set('Accept', 'application/json');
        }
        else {
            this.headers.set('Accept', 'application/vnd.pgrst.object+json');
        }
        this.isMaybeSingle = true;
        return this;
    }
    /**
     * Return `data` as a string in CSV format.
     */
    csv() {
        this.headers.set('Accept', 'text/csv');
        return this;
    }
    /**
     * Return `data` as an object in [GeoJSON](https://geojson.org) format.
     */
    geojson() {
        this.headers.set('Accept', 'application/geo+json');
        return this;
    }
    /**
     * Return `data` as the EXPLAIN plan for the query.
     *
     * You need to enable the
     * [db_plan_enabled](https://supabase.com/docs/guides/database/debugging-performance#enabling-explain)
     * setting before using this method.
     *
     * @param options - Named parameters
     *
     * @param options.analyze - If `true`, the query will be executed and the
     * actual run time will be returned
     *
     * @param options.verbose - If `true`, the query identifier will be returned
     * and `data` will include the output columns of the query
     *
     * @param options.settings - If `true`, include information on configuration
     * parameters that affect query planning
     *
     * @param options.buffers - If `true`, include information on buffer usage
     *
     * @param options.wal - If `true`, include information on WAL record generation
     *
     * @param options.format - The format of the output, can be `"text"` (default)
     * or `"json"`
     */
    explain({ analyze = false, verbose = false, settings = false, buffers = false, wal = false, format = 'text', } = {}) {
        var _a;
        const options = [
            analyze ? 'analyze' : null,
            verbose ? 'verbose' : null,
            settings ? 'settings' : null,
            buffers ? 'buffers' : null,
            wal ? 'wal' : null,
        ]
            .filter(Boolean)
            .join('|');
        // An Accept header can carry multiple media types but postgrest-js always sends one
        const forMediatype = (_a = this.headers.get('Accept')) !== null && _a !== void 0 ? _a : 'application/json';
        this.headers.set('Accept', `application/vnd.pgrst.plan+${format}; for="${forMediatype}"; options=${options};`);
        if (format === 'json') {
            return this;
        }
        else {
            return this;
        }
    }
    /**
     * Rollback the query.
     *
     * `data` will still be returned, but the query is not committed.
     */
    rollback() {
        this.headers.append('Prefer', 'tx=rollback');
        return this;
    }
    /**
     * Override the type of the returned `data`.
     *
     * @typeParam NewResult - The new result type to override with
     * @deprecated Use overrideTypes<yourType, { merge: false }>() method at the end of your call chain instead
     */
    returns() {
        return this;
    }
    /**
     * Set the maximum number of rows that can be affected by the query.
     * Only available in PostgREST v13+ and only works with PATCH and DELETE methods.
     *
     * @param value - The maximum number of rows that can be affected
     */
    maxAffected(value) {
        this.headers.append('Prefer', 'handling=strict');
        this.headers.append('Prefer', `max-affected=${value}`);
        return this;
    }
}
exports["default"] = PostgrestTransformBuilder;
//# sourceMappingURL=PostgrestTransformBuilder.js.map

/***/ }),

/***/ 279:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PostgrestError = exports.PostgrestBuilder = exports.PostgrestTransformBuilder = exports.PostgrestFilterBuilder = exports.PostgrestQueryBuilder = exports.PostgrestClient = void 0;
// Always update wrapper.mjs when updating this file.
const PostgrestClient_1 = __importDefault(__webpack_require__(961));
exports.PostgrestClient = PostgrestClient_1.default;
const PostgrestQueryBuilder_1 = __importDefault(__webpack_require__(45));
exports.PostgrestQueryBuilder = PostgrestQueryBuilder_1.default;
const PostgrestFilterBuilder_1 = __importDefault(__webpack_require__(825));
exports.PostgrestFilterBuilder = PostgrestFilterBuilder_1.default;
const PostgrestTransformBuilder_1 = __importDefault(__webpack_require__(261));
exports.PostgrestTransformBuilder = PostgrestTransformBuilder_1.default;
const PostgrestBuilder_1 = __importDefault(__webpack_require__(660));
exports.PostgrestBuilder = PostgrestBuilder_1.default;
const PostgrestError_1 = __importDefault(__webpack_require__(818));
exports.PostgrestError = PostgrestError_1.default;
exports["default"] = {
    PostgrestClient: PostgrestClient_1.default,
    PostgrestQueryBuilder: PostgrestQueryBuilder_1.default,
    PostgrestFilterBuilder: PostgrestFilterBuilder_1.default,
    PostgrestTransformBuilder: PostgrestTransformBuilder_1.default,
    PostgrestBuilder: PostgrestBuilder_1.default,
    PostgrestError: PostgrestError_1.default,
};
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 378:
/***/ ((module) => {

"use strict";


const combiningMarks = /[\u0300-\u036F\u0483-\u0489\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u0897-\u089F\u08CA-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u09FE\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0AFA-\u0AFF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B55-\u0B57\u0B62\u0B63\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0C00-\u0C04\u0C3C\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0CF3\u0D00-\u0D03\u0D3B\u0D3C\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D81-\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EBC\u0EC8-\u0ECE\u0F18\u0F19\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F\u109A-\u109D\u135D-\u135F\u1712-\u1715\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u180B-\u180D\u180F\u1885\u1886\u18A9\u1920-\u192B\u1930-\u193B\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F\u1AB0-\u1ACE\u1B00-\u1B04\u1B34-\u1B44\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BE6-\u1BF3\u1C24-\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF4\u1CF7-\u1CF9\u1DC0-\u1DFF\u20D0-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA66F-\uA672\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA82C\uA880\uA881\uA8B4-\uA8C5\uA8E0-\uA8F1\uA8FF\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9E5\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F\u{101FD}\u{102E0}\u{10376}-\u{1037A}\u{10A01}-\u{10A03}\u{10A05}\u{10A06}\u{10A0C}-\u{10A0F}\u{10A38}-\u{10A3A}\u{10A3F}\u{10AE5}\u{10AE6}\u{10D24}-\u{10D27}\u{10D69}-\u{10D6D}\u{10EAB}\u{10EAC}\u{10EFC}-\u{10EFF}\u{10F46}-\u{10F50}\u{10F82}-\u{10F85}\u{11000}-\u{11002}\u{11038}-\u{11046}\u{11070}\u{11073}\u{11074}\u{1107F}-\u{11082}\u{110B0}-\u{110BA}\u{110C2}\u{11100}-\u{11102}\u{11127}-\u{11134}\u{11145}\u{11146}\u{11173}\u{11180}-\u{11182}\u{111B3}-\u{111C0}\u{111C9}-\u{111CC}\u{111CE}\u{111CF}\u{1122C}-\u{11237}\u{1123E}\u{11241}\u{112DF}-\u{112EA}\u{11300}-\u{11303}\u{1133B}\u{1133C}\u{1133E}-\u{11344}\u{11347}\u{11348}\u{1134B}-\u{1134D}\u{11357}\u{11362}\u{11363}\u{11366}-\u{1136C}\u{11370}-\u{11374}\u{113B8}-\u{113C0}\u{113C2}\u{113C5}\u{113C7}-\u{113CA}\u{113CC}-\u{113D0}\u{113D2}\u{113E1}\u{113E2}\u{11435}-\u{11446}\u{1145E}\u{114B0}-\u{114C3}\u{115AF}-\u{115B5}\u{115B8}-\u{115C0}\u{115DC}\u{115DD}\u{11630}-\u{11640}\u{116AB}-\u{116B7}\u{1171D}-\u{1172B}\u{1182C}-\u{1183A}\u{11930}-\u{11935}\u{11937}\u{11938}\u{1193B}-\u{1193E}\u{11940}\u{11942}\u{11943}\u{119D1}-\u{119D7}\u{119DA}-\u{119E0}\u{119E4}\u{11A01}-\u{11A0A}\u{11A33}-\u{11A39}\u{11A3B}-\u{11A3E}\u{11A47}\u{11A51}-\u{11A5B}\u{11A8A}-\u{11A99}\u{11C2F}-\u{11C36}\u{11C38}-\u{11C3F}\u{11C92}-\u{11CA7}\u{11CA9}-\u{11CB6}\u{11D31}-\u{11D36}\u{11D3A}\u{11D3C}\u{11D3D}\u{11D3F}-\u{11D45}\u{11D47}\u{11D8A}-\u{11D8E}\u{11D90}\u{11D91}\u{11D93}-\u{11D97}\u{11EF3}-\u{11EF6}\u{11F00}\u{11F01}\u{11F03}\u{11F34}-\u{11F3A}\u{11F3E}-\u{11F42}\u{11F5A}\u{13440}\u{13447}-\u{13455}\u{1611E}-\u{1612F}\u{16AF0}-\u{16AF4}\u{16B30}-\u{16B36}\u{16F4F}\u{16F51}-\u{16F87}\u{16F8F}-\u{16F92}\u{16FE4}\u{16FF0}\u{16FF1}\u{1BC9D}\u{1BC9E}\u{1CF00}-\u{1CF2D}\u{1CF30}-\u{1CF46}\u{1D165}-\u{1D169}\u{1D16D}-\u{1D172}\u{1D17B}-\u{1D182}\u{1D185}-\u{1D18B}\u{1D1AA}-\u{1D1AD}\u{1D242}-\u{1D244}\u{1DA00}-\u{1DA36}\u{1DA3B}-\u{1DA6C}\u{1DA75}\u{1DA84}\u{1DA9B}-\u{1DA9F}\u{1DAA1}-\u{1DAAF}\u{1E000}-\u{1E006}\u{1E008}-\u{1E018}\u{1E01B}-\u{1E021}\u{1E023}\u{1E024}\u{1E026}-\u{1E02A}\u{1E08F}\u{1E130}-\u{1E136}\u{1E2AE}\u{1E2EC}-\u{1E2EF}\u{1E4EC}-\u{1E4EF}\u{1E5EE}\u{1E5EF}\u{1E8D0}-\u{1E8D6}\u{1E944}-\u{1E94A}\u{E0100}-\u{E01EF}]/u;
const combiningClassVirama = /[\u094D\u09CD\u0A4D\u0ACD\u0B4D\u0BCD\u0C4D\u0CCD\u0D3B\u0D3C\u0D4D\u0DCA\u0E3A\u0EBA\u0F84\u1039\u103A\u1714\u1715\u1734\u17D2\u1A60\u1B44\u1BAA\u1BAB\u1BF2\u1BF3\u2D7F\uA806\uA82C\uA8C4\uA953\uA9C0\uAAF6\uABED\u{10A3F}\u{11046}\u{11070}\u{1107F}\u{110B9}\u{11133}\u{11134}\u{111C0}\u{11235}\u{112EA}\u{1134D}\u{113CE}-\u{113D0}\u{11442}\u{114C2}\u{115BF}\u{1163F}\u{116B6}\u{1172B}\u{11839}\u{1193D}\u{1193E}\u{119E0}\u{11A34}\u{11A47}\u{11A99}\u{11C3F}\u{11D44}\u{11D45}\u{11D97}\u{11F41}\u{11F42}\u{1612F}]/u;
const validZWNJ = /[\u0620\u0626\u0628\u062A-\u062E\u0633-\u063F\u0641-\u0647\u0649\u064A\u066E\u066F\u0678-\u0687\u069A-\u06BF\u06C1\u06C2\u06CC\u06CE\u06D0\u06D1\u06FA-\u06FC\u06FF\u0712-\u0714\u071A-\u071D\u071F-\u0727\u0729\u072B\u072D\u072E\u074E-\u0758\u075C-\u076A\u076D-\u0770\u0772\u0775-\u0777\u077A-\u077F\u07CA-\u07EA\u0841-\u0845\u0848\u084A-\u0853\u0855\u0860\u0862-\u0865\u0868\u0886\u0889-\u088D\u08A0-\u08A9\u08AF\u08B0\u08B3-\u08B8\u08BA-\u08C8\u1807\u1820-\u1878\u1887-\u18A8\u18AA\uA840-\uA872\u{10AC0}-\u{10AC4}\u{10ACD}\u{10AD3}-\u{10ADC}\u{10ADE}-\u{10AE0}\u{10AEB}-\u{10AEE}\u{10B80}\u{10B82}\u{10B86}-\u{10B88}\u{10B8A}\u{10B8B}\u{10B8D}\u{10B90}\u{10BAD}\u{10BAE}\u{10D00}-\u{10D21}\u{10D23}\u{10EC3}\u{10EC4}\u{10F30}-\u{10F32}\u{10F34}-\u{10F44}\u{10F51}-\u{10F53}\u{10F70}-\u{10F73}\u{10F76}-\u{10F81}\u{10FB0}\u{10FB2}\u{10FB3}\u{10FB8}\u{10FBB}\u{10FBC}\u{10FBE}\u{10FBF}\u{10FC1}\u{10FC4}\u{10FCA}\u{10FCB}\u{1E900}-\u{1E943}][\xAD\u0300-\u036F\u0483-\u0489\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u061C\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u070F\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u0897-\u089F\u08CA-\u08E1\u08E3-\u0902\u093A\u093C\u0941-\u0948\u094D\u0951-\u0957\u0962\u0963\u0981\u09BC\u09C1-\u09C4\u09CD\u09E2\u09E3\u09FE\u0A01\u0A02\u0A3C\u0A41\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81\u0A82\u0ABC\u0AC1-\u0AC5\u0AC7\u0AC8\u0ACD\u0AE2\u0AE3\u0AFA-\u0AFF\u0B01\u0B3C\u0B3F\u0B41-\u0B44\u0B4D\u0B55\u0B56\u0B62\u0B63\u0B82\u0BC0\u0BCD\u0C00\u0C04\u0C3C\u0C3E-\u0C40\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C81\u0CBC\u0CBF\u0CC6\u0CCC\u0CCD\u0CE2\u0CE3\u0D00\u0D01\u0D3B\u0D3C\u0D41-\u0D44\u0D4D\u0D62\u0D63\u0D81\u0DCA\u0DD2-\u0DD4\u0DD6\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EBC\u0EC8-\u0ECE\u0F18\u0F19\u0F35\u0F37\u0F39\u0F71-\u0F7E\u0F80-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102D-\u1030\u1032-\u1037\u1039\u103A\u103D\u103E\u1058\u1059\u105E-\u1060\u1071-\u1074\u1082\u1085\u1086\u108D\u109D\u135D-\u135F\u1712-\u1714\u1732\u1733\u1752\u1753\u1772\u1773\u17B4\u17B5\u17B7-\u17BD\u17C6\u17C9-\u17D3\u17DD\u180B-\u180D\u180F\u1885\u1886\u18A9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193B\u1A17\u1A18\u1A1B\u1A56\u1A58-\u1A5E\u1A60\u1A62\u1A65-\u1A6C\u1A73-\u1A7C\u1A7F\u1AB0-\u1ACE\u1B00-\u1B03\u1B34\u1B36-\u1B3A\u1B3C\u1B42\u1B6B-\u1B73\u1B80\u1B81\u1BA2-\u1BA5\u1BA8\u1BA9\u1BAB-\u1BAD\u1BE6\u1BE8\u1BE9\u1BED\u1BEF-\u1BF1\u1C2C-\u1C33\u1C36\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE0\u1CE2-\u1CE8\u1CED\u1CF4\u1CF8\u1CF9\u1DC0-\u1DFF\u200B\u200E\u200F\u202A-\u202E\u2060-\u2064\u206A-\u206F\u20D0-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302D\u3099\u309A\uA66F-\uA672\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA825\uA826\uA82C\uA8C4\uA8C5\uA8E0-\uA8F1\uA8FF\uA926-\uA92D\uA947-\uA951\uA980-\uA982\uA9B3\uA9B6-\uA9B9\uA9BC\uA9BD\uA9E5\uAA29-\uAA2E\uAA31\uAA32\uAA35\uAA36\uAA43\uAA4C\uAA7C\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEC\uAAED\uAAF6\uABE5\uABE8\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F\uFEFF\uFFF9-\uFFFB\u{101FD}\u{102E0}\u{10376}-\u{1037A}\u{10A01}-\u{10A03}\u{10A05}\u{10A06}\u{10A0C}-\u{10A0F}\u{10A38}-\u{10A3A}\u{10A3F}\u{10AE5}\u{10AE6}\u{10D24}-\u{10D27}\u{10D69}-\u{10D6D}\u{10EAB}\u{10EAC}\u{10EFC}-\u{10EFF}\u{10F46}-\u{10F50}\u{10F82}-\u{10F85}\u{11001}\u{11038}-\u{11046}\u{11070}\u{11073}\u{11074}\u{1107F}-\u{11081}\u{110B3}-\u{110B6}\u{110B9}\u{110BA}\u{110C2}\u{11100}-\u{11102}\u{11127}-\u{1112B}\u{1112D}-\u{11134}\u{11173}\u{11180}\u{11181}\u{111B6}-\u{111BE}\u{111C9}-\u{111CC}\u{111CF}\u{1122F}-\u{11231}\u{11234}\u{11236}\u{11237}\u{1123E}\u{11241}\u{112DF}\u{112E3}-\u{112EA}\u{11300}\u{11301}\u{1133B}\u{1133C}\u{11340}\u{11366}-\u{1136C}\u{11370}-\u{11374}\u{113BB}-\u{113C0}\u{113CE}\u{113D0}\u{113D2}\u{113E1}\u{113E2}\u{11438}-\u{1143F}\u{11442}-\u{11444}\u{11446}\u{1145E}\u{114B3}-\u{114B8}\u{114BA}\u{114BF}\u{114C0}\u{114C2}\u{114C3}\u{115B2}-\u{115B5}\u{115BC}\u{115BD}\u{115BF}\u{115C0}\u{115DC}\u{115DD}\u{11633}-\u{1163A}\u{1163D}\u{1163F}\u{11640}\u{116AB}\u{116AD}\u{116B0}-\u{116B5}\u{116B7}\u{1171D}\u{1171F}\u{11722}-\u{11725}\u{11727}-\u{1172B}\u{1182F}-\u{11837}\u{11839}\u{1183A}\u{1193B}\u{1193C}\u{1193E}\u{11943}\u{119D4}-\u{119D7}\u{119DA}\u{119DB}\u{119E0}\u{11A01}-\u{11A0A}\u{11A33}-\u{11A38}\u{11A3B}-\u{11A3E}\u{11A47}\u{11A51}-\u{11A56}\u{11A59}-\u{11A5B}\u{11A8A}-\u{11A96}\u{11A98}\u{11A99}\u{11C30}-\u{11C36}\u{11C38}-\u{11C3D}\u{11C3F}\u{11C92}-\u{11CA7}\u{11CAA}-\u{11CB0}\u{11CB2}\u{11CB3}\u{11CB5}\u{11CB6}\u{11D31}-\u{11D36}\u{11D3A}\u{11D3C}\u{11D3D}\u{11D3F}-\u{11D45}\u{11D47}\u{11D90}\u{11D91}\u{11D95}\u{11D97}\u{11EF3}\u{11EF4}\u{11F00}\u{11F01}\u{11F36}-\u{11F3A}\u{11F40}\u{11F42}\u{11F5A}\u{13430}-\u{13440}\u{13447}-\u{13455}\u{1611E}-\u{16129}\u{1612D}-\u{1612F}\u{16AF0}-\u{16AF4}\u{16B30}-\u{16B36}\u{16F4F}\u{16F8F}-\u{16F92}\u{16FE4}\u{1BC9D}\u{1BC9E}\u{1BCA0}-\u{1BCA3}\u{1CF00}-\u{1CF2D}\u{1CF30}-\u{1CF46}\u{1D167}-\u{1D169}\u{1D173}-\u{1D182}\u{1D185}-\u{1D18B}\u{1D1AA}-\u{1D1AD}\u{1D242}-\u{1D244}\u{1DA00}-\u{1DA36}\u{1DA3B}-\u{1DA6C}\u{1DA75}\u{1DA84}\u{1DA9B}-\u{1DA9F}\u{1DAA1}-\u{1DAAF}\u{1E000}-\u{1E006}\u{1E008}-\u{1E018}\u{1E01B}-\u{1E021}\u{1E023}\u{1E024}\u{1E026}-\u{1E02A}\u{1E08F}\u{1E130}-\u{1E136}\u{1E2AE}\u{1E2EC}-\u{1E2EF}\u{1E4EC}-\u{1E4EF}\u{1E5EE}\u{1E5EF}\u{1E8D0}-\u{1E8D6}\u{1E944}-\u{1E94B}\u{E0001}\u{E0020}-\u{E007F}\u{E0100}-\u{E01EF}]*\u200C[\xAD\u0300-\u036F\u0483-\u0489\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u061C\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u070F\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u0897-\u089F\u08CA-\u08E1\u08E3-\u0902\u093A\u093C\u0941-\u0948\u094D\u0951-\u0957\u0962\u0963\u0981\u09BC\u09C1-\u09C4\u09CD\u09E2\u09E3\u09FE\u0A01\u0A02\u0A3C\u0A41\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81\u0A82\u0ABC\u0AC1-\u0AC5\u0AC7\u0AC8\u0ACD\u0AE2\u0AE3\u0AFA-\u0AFF\u0B01\u0B3C\u0B3F\u0B41-\u0B44\u0B4D\u0B55\u0B56\u0B62\u0B63\u0B82\u0BC0\u0BCD\u0C00\u0C04\u0C3C\u0C3E-\u0C40\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C81\u0CBC\u0CBF\u0CC6\u0CCC\u0CCD\u0CE2\u0CE3\u0D00\u0D01\u0D3B\u0D3C\u0D41-\u0D44\u0D4D\u0D62\u0D63\u0D81\u0DCA\u0DD2-\u0DD4\u0DD6\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EBC\u0EC8-\u0ECE\u0F18\u0F19\u0F35\u0F37\u0F39\u0F71-\u0F7E\u0F80-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102D-\u1030\u1032-\u1037\u1039\u103A\u103D\u103E\u1058\u1059\u105E-\u1060\u1071-\u1074\u1082\u1085\u1086\u108D\u109D\u135D-\u135F\u1712-\u1714\u1732\u1733\u1752\u1753\u1772\u1773\u17B4\u17B5\u17B7-\u17BD\u17C6\u17C9-\u17D3\u17DD\u180B-\u180D\u180F\u1885\u1886\u18A9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193B\u1A17\u1A18\u1A1B\u1A56\u1A58-\u1A5E\u1A60\u1A62\u1A65-\u1A6C\u1A73-\u1A7C\u1A7F\u1AB0-\u1ACE\u1B00-\u1B03\u1B34\u1B36-\u1B3A\u1B3C\u1B42\u1B6B-\u1B73\u1B80\u1B81\u1BA2-\u1BA5\u1BA8\u1BA9\u1BAB-\u1BAD\u1BE6\u1BE8\u1BE9\u1BED\u1BEF-\u1BF1\u1C2C-\u1C33\u1C36\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE0\u1CE2-\u1CE8\u1CED\u1CF4\u1CF8\u1CF9\u1DC0-\u1DFF\u200B\u200E\u200F\u202A-\u202E\u2060-\u2064\u206A-\u206F\u20D0-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302D\u3099\u309A\uA66F-\uA672\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA825\uA826\uA82C\uA8C4\uA8C5\uA8E0-\uA8F1\uA8FF\uA926-\uA92D\uA947-\uA951\uA980-\uA982\uA9B3\uA9B6-\uA9B9\uA9BC\uA9BD\uA9E5\uAA29-\uAA2E\uAA31\uAA32\uAA35\uAA36\uAA43\uAA4C\uAA7C\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEC\uAAED\uAAF6\uABE5\uABE8\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F\uFEFF\uFFF9-\uFFFB\u{101FD}\u{102E0}\u{10376}-\u{1037A}\u{10A01}-\u{10A03}\u{10A05}\u{10A06}\u{10A0C}-\u{10A0F}\u{10A38}-\u{10A3A}\u{10A3F}\u{10AE5}\u{10AE6}\u{10D24}-\u{10D27}\u{10D69}-\u{10D6D}\u{10EAB}\u{10EAC}\u{10EFC}-\u{10EFF}\u{10F46}-\u{10F50}\u{10F82}-\u{10F85}\u{11001}\u{11038}-\u{11046}\u{11070}\u{11073}\u{11074}\u{1107F}-\u{11081}\u{110B3}-\u{110B6}\u{110B9}\u{110BA}\u{110C2}\u{11100}-\u{11102}\u{11127}-\u{1112B}\u{1112D}-\u{11134}\u{11173}\u{11180}\u{11181}\u{111B6}-\u{111BE}\u{111C9}-\u{111CC}\u{111CF}\u{1122F}-\u{11231}\u{11234}\u{11236}\u{11237}\u{1123E}\u{11241}\u{112DF}\u{112E3}-\u{112EA}\u{11300}\u{11301}\u{1133B}\u{1133C}\u{11340}\u{11366}-\u{1136C}\u{11370}-\u{11374}\u{113BB}-\u{113C0}\u{113CE}\u{113D0}\u{113D2}\u{113E1}\u{113E2}\u{11438}-\u{1143F}\u{11442}-\u{11444}\u{11446}\u{1145E}\u{114B3}-\u{114B8}\u{114BA}\u{114BF}\u{114C0}\u{114C2}\u{114C3}\u{115B2}-\u{115B5}\u{115BC}\u{115BD}\u{115BF}\u{115C0}\u{115DC}\u{115DD}\u{11633}-\u{1163A}\u{1163D}\u{1163F}\u{11640}\u{116AB}\u{116AD}\u{116B0}-\u{116B5}\u{116B7}\u{1171D}\u{1171F}\u{11722}-\u{11725}\u{11727}-\u{1172B}\u{1182F}-\u{11837}\u{11839}\u{1183A}\u{1193B}\u{1193C}\u{1193E}\u{11943}\u{119D4}-\u{119D7}\u{119DA}\u{119DB}\u{119E0}\u{11A01}-\u{11A0A}\u{11A33}-\u{11A38}\u{11A3B}-\u{11A3E}\u{11A47}\u{11A51}-\u{11A56}\u{11A59}-\u{11A5B}\u{11A8A}-\u{11A96}\u{11A98}\u{11A99}\u{11C30}-\u{11C36}\u{11C38}-\u{11C3D}\u{11C3F}\u{11C92}-\u{11CA7}\u{11CAA}-\u{11CB0}\u{11CB2}\u{11CB3}\u{11CB5}\u{11CB6}\u{11D31}-\u{11D36}\u{11D3A}\u{11D3C}\u{11D3D}\u{11D3F}-\u{11D45}\u{11D47}\u{11D90}\u{11D91}\u{11D95}\u{11D97}\u{11EF3}\u{11EF4}\u{11F00}\u{11F01}\u{11F36}-\u{11F3A}\u{11F40}\u{11F42}\u{11F5A}\u{13430}-\u{13440}\u{13447}-\u{13455}\u{1611E}-\u{16129}\u{1612D}-\u{1612F}\u{16AF0}-\u{16AF4}\u{16B30}-\u{16B36}\u{16F4F}\u{16F8F}-\u{16F92}\u{16FE4}\u{1BC9D}\u{1BC9E}\u{1BCA0}-\u{1BCA3}\u{1CF00}-\u{1CF2D}\u{1CF30}-\u{1CF46}\u{1D167}-\u{1D169}\u{1D173}-\u{1D182}\u{1D185}-\u{1D18B}\u{1D1AA}-\u{1D1AD}\u{1D242}-\u{1D244}\u{1DA00}-\u{1DA36}\u{1DA3B}-\u{1DA6C}\u{1DA75}\u{1DA84}\u{1DA9B}-\u{1DA9F}\u{1DAA1}-\u{1DAAF}\u{1E000}-\u{1E006}\u{1E008}-\u{1E018}\u{1E01B}-\u{1E021}\u{1E023}\u{1E024}\u{1E026}-\u{1E02A}\u{1E08F}\u{1E130}-\u{1E136}\u{1E2AE}\u{1E2EC}-\u{1E2EF}\u{1E4EC}-\u{1E4EF}\u{1E5EE}\u{1E5EF}\u{1E8D0}-\u{1E8D6}\u{1E944}-\u{1E94B}\u{E0001}\u{E0020}-\u{E007F}\u{E0100}-\u{E01EF}]*[\u0620\u0622-\u063F\u0641-\u064A\u066E\u066F\u0671-\u0673\u0675-\u06D3\u06D5\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u077F\u07CA-\u07EA\u0840-\u0858\u0860\u0862-\u0865\u0867-\u086A\u0870-\u0882\u0886\u0889-\u088E\u08A0-\u08AC\u08AE-\u08C8\u1807\u1820-\u1878\u1887-\u18A8\u18AA\uA840-\uA871\u{10AC0}-\u{10AC5}\u{10AC7}\u{10AC9}\u{10ACA}\u{10ACE}-\u{10AD6}\u{10AD8}-\u{10AE1}\u{10AE4}\u{10AEB}-\u{10AEF}\u{10B80}-\u{10B91}\u{10BA9}-\u{10BAE}\u{10D01}-\u{10D23}\u{10EC2}-\u{10EC4}\u{10F30}-\u{10F44}\u{10F51}-\u{10F54}\u{10F70}-\u{10F81}\u{10FB0}\u{10FB2}-\u{10FB6}\u{10FB8}-\u{10FBF}\u{10FC1}-\u{10FC4}\u{10FC9}\u{10FCA}\u{1E900}-\u{1E943}]/u;
const bidiDomain = /[\u05BE\u05C0\u05C3\u05C6\u05D0-\u05EA\u05EF-\u05F4\u0600-\u0605\u0608\u060B\u060D\u061B-\u064A\u0660-\u0669\u066B-\u066F\u0671-\u06D5\u06DD\u06E5\u06E6\u06EE\u06EF\u06FA-\u070D\u070F\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07C0-\u07EA\u07F4\u07F5\u07FA\u07FE-\u0815\u081A\u0824\u0828\u0830-\u083E\u0840-\u0858\u085E\u0860-\u086A\u0870-\u088E\u0890\u0891\u08A0-\u08C9\u08E2\u200F\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBC2\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFC\uFE70-\uFE74\uFE76-\uFEFC\u{10800}-\u{10805}\u{10808}\u{1080A}-\u{10835}\u{10837}\u{10838}\u{1083C}\u{1083F}-\u{10855}\u{10857}-\u{1089E}\u{108A7}-\u{108AF}\u{108E0}-\u{108F2}\u{108F4}\u{108F5}\u{108FB}-\u{1091B}\u{10920}-\u{10939}\u{1093F}\u{10980}-\u{109B7}\u{109BC}-\u{109CF}\u{109D2}-\u{10A00}\u{10A10}-\u{10A13}\u{10A15}-\u{10A17}\u{10A19}-\u{10A35}\u{10A40}-\u{10A48}\u{10A50}-\u{10A58}\u{10A60}-\u{10A9F}\u{10AC0}-\u{10AE4}\u{10AEB}-\u{10AF6}\u{10B00}-\u{10B35}\u{10B40}-\u{10B55}\u{10B58}-\u{10B72}\u{10B78}-\u{10B91}\u{10B99}-\u{10B9C}\u{10BA9}-\u{10BAF}\u{10C00}-\u{10C48}\u{10C80}-\u{10CB2}\u{10CC0}-\u{10CF2}\u{10CFA}-\u{10D23}\u{10D30}-\u{10D39}\u{10D40}-\u{10D65}\u{10D6F}-\u{10D85}\u{10D8E}\u{10D8F}\u{10E60}-\u{10E7E}\u{10E80}-\u{10EA9}\u{10EAD}\u{10EB0}\u{10EB1}\u{10EC2}-\u{10EC4}\u{10F00}-\u{10F27}\u{10F30}-\u{10F45}\u{10F51}-\u{10F59}\u{10F70}-\u{10F81}\u{10F86}-\u{10F89}\u{10FB0}-\u{10FCB}\u{10FE0}-\u{10FF6}\u{1E800}-\u{1E8C4}\u{1E8C7}-\u{1E8CF}\u{1E900}-\u{1E943}\u{1E94B}\u{1E950}-\u{1E959}\u{1E95E}\u{1E95F}\u{1EC71}-\u{1ECB4}\u{1ED01}-\u{1ED3D}\u{1EE00}-\u{1EE03}\u{1EE05}-\u{1EE1F}\u{1EE21}\u{1EE22}\u{1EE24}\u{1EE27}\u{1EE29}-\u{1EE32}\u{1EE34}-\u{1EE37}\u{1EE39}\u{1EE3B}\u{1EE42}\u{1EE47}\u{1EE49}\u{1EE4B}\u{1EE4D}-\u{1EE4F}\u{1EE51}\u{1EE52}\u{1EE54}\u{1EE57}\u{1EE59}\u{1EE5B}\u{1EE5D}\u{1EE5F}\u{1EE61}\u{1EE62}\u{1EE64}\u{1EE67}-\u{1EE6A}\u{1EE6C}-\u{1EE72}\u{1EE74}-\u{1EE77}\u{1EE79}-\u{1EE7C}\u{1EE7E}\u{1EE80}-\u{1EE89}\u{1EE8B}-\u{1EE9B}\u{1EEA1}-\u{1EEA3}\u{1EEA5}-\u{1EEA9}\u{1EEAB}-\u{1EEBB}]/u;
const bidiS1LTR = /[A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02B8\u02BB-\u02C1\u02D0\u02D1\u02E0-\u02E4\u02EE\u0370-\u0373\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0482\u048A-\u052F\u0531-\u0556\u0559-\u0589\u0903-\u0939\u093B\u093D-\u0940\u0949-\u094C\u094E-\u0950\u0958-\u0961\u0964-\u0980\u0982\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD-\u09C0\u09C7\u09C8\u09CB\u09CC\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E1\u09E6-\u09F1\u09F4-\u09FA\u09FC\u09FD\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3E-\u0A40\u0A59-\u0A5C\u0A5E\u0A66-\u0A6F\u0A72-\u0A74\u0A76\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD-\u0AC0\u0AC9\u0ACB\u0ACC\u0AD0\u0AE0\u0AE1\u0AE6-\u0AF0\u0AF9\u0B02\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B3E\u0B40\u0B47\u0B48\u0B4B\u0B4C\u0B57\u0B5C\u0B5D\u0B5F-\u0B61\u0B66-\u0B77\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE\u0BBF\u0BC1\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCC\u0BD0\u0BD7\u0BE6-\u0BF2\u0C01-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C41-\u0C44\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C66-\u0C6F\u0C77\u0C7F\u0C80\u0C82-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD-\u0CC4\u0CC6-\u0CC8\u0CCA\u0CCB\u0CD5\u0CD6\u0CDD\u0CDE\u0CE0\u0CE1\u0CE6-\u0CEF\u0CF1-\u0CF3\u0D02-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D40\u0D46-\u0D48\u0D4A-\u0D4C\u0D4E\u0D4F\u0D54-\u0D61\u0D66-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCF-\u0DD1\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2-\u0DF4\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E4F-\u0E5B\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00-\u0F17\u0F1A-\u0F34\u0F36\u0F38\u0F3E-\u0F47\u0F49-\u0F6C\u0F7F\u0F85\u0F88-\u0F8C\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE-\u0FDA\u1000-\u102C\u1031\u1038\u103B\u103C\u103F-\u1057\u105A-\u105D\u1061-\u1070\u1075-\u1081\u1083\u1084\u1087-\u108C\u108E-\u109C\u109E-\u10C5\u10C7\u10CD\u10D0-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1360-\u137C\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u167F\u1681-\u169A\u16A0-\u16F8\u1700-\u1711\u1715\u171F-\u1731\u1734-\u1736\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17B6\u17BE-\u17C5\u17C7\u17C8\u17D4-\u17DA\u17DC\u17E0-\u17E9\u1810-\u1819\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1923-\u1926\u1929-\u192B\u1930\u1931\u1933-\u1938\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A16\u1A19\u1A1A\u1A1E-\u1A55\u1A57\u1A61\u1A63\u1A64\u1A6D-\u1A72\u1A80-\u1A89\u1A90-\u1A99\u1AA0-\u1AAD\u1B04-\u1B33\u1B35\u1B3B\u1B3D-\u1B41\u1B43-\u1B4C\u1B4E-\u1B6A\u1B74-\u1B7F\u1B82-\u1BA1\u1BA6\u1BA7\u1BAA\u1BAE-\u1BE5\u1BE7\u1BEA-\u1BEC\u1BEE\u1BF2\u1BF3\u1BFC-\u1C2B\u1C34\u1C35\u1C3B-\u1C49\u1C4D-\u1C8A\u1C90-\u1CBA\u1CBD-\u1CC7\u1CD3\u1CE1\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5-\u1CF7\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200E\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u214F\u2160-\u2188\u2336-\u237A\u2395\u249C-\u24E9\u26AC\u2800-\u28FF\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D70\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u302E\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u3190-\u31BF\u31F0-\u321C\u3220-\u324F\u3260-\u327B\u327F-\u32B0\u32C0-\u32CB\u32D0-\u3376\u337B-\u33DD\u33E0-\u33FE\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA60C\uA610-\uA62B\uA640-\uA66E\uA680-\uA69D\uA6A0-\uA6EF\uA6F2-\uA6F7\uA722-\uA787\uA789-\uA7CD\uA7D0\uA7D1\uA7D3\uA7D5-\uA7DC\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA824\uA827\uA830-\uA837\uA840-\uA873\uA880-\uA8C3\uA8CE-\uA8D9\uA8F2-\uA8FE\uA900-\uA925\uA92E-\uA946\uA952\uA953\uA95F-\uA97C\uA983-\uA9B2\uA9B4\uA9B5\uA9BA\uA9BB\uA9BE-\uA9CD\uA9CF-\uA9D9\uA9DE-\uA9E4\uA9E6-\uA9FE\uAA00-\uAA28\uAA2F\uAA30\uAA33\uAA34\uAA40-\uAA42\uAA44-\uAA4B\uAA4D\uAA50-\uAA59\uAA5C-\uAA7B\uAA7D-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAAEB\uAAEE-\uAAF5\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB69\uAB70-\uABE4\uABE6\uABE7\uABE9-\uABEC\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uD800-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC\u{10000}-\u{1000B}\u{1000D}-\u{10026}\u{10028}-\u{1003A}\u{1003C}\u{1003D}\u{1003F}-\u{1004D}\u{10050}-\u{1005D}\u{10080}-\u{100FA}\u{10100}\u{10102}\u{10107}-\u{10133}\u{10137}-\u{1013F}\u{1018D}\u{1018E}\u{101D0}-\u{101FC}\u{10280}-\u{1029C}\u{102A0}-\u{102D0}\u{10300}-\u{10323}\u{1032D}-\u{1034A}\u{10350}-\u{10375}\u{10380}-\u{1039D}\u{1039F}-\u{103C3}\u{103C8}-\u{103D5}\u{10400}-\u{1049D}\u{104A0}-\u{104A9}\u{104B0}-\u{104D3}\u{104D8}-\u{104FB}\u{10500}-\u{10527}\u{10530}-\u{10563}\u{1056F}-\u{1057A}\u{1057C}-\u{1058A}\u{1058C}-\u{10592}\u{10594}\u{10595}\u{10597}-\u{105A1}\u{105A3}-\u{105B1}\u{105B3}-\u{105B9}\u{105BB}\u{105BC}\u{105C0}-\u{105F3}\u{10600}-\u{10736}\u{10740}-\u{10755}\u{10760}-\u{10767}\u{10780}-\u{10785}\u{10787}-\u{107B0}\u{107B2}-\u{107BA}\u{11000}\u{11002}-\u{11037}\u{11047}-\u{1104D}\u{11066}-\u{1106F}\u{11071}\u{11072}\u{11075}\u{11082}-\u{110B2}\u{110B7}\u{110B8}\u{110BB}-\u{110C1}\u{110CD}\u{110D0}-\u{110E8}\u{110F0}-\u{110F9}\u{11103}-\u{11126}\u{1112C}\u{11136}-\u{11147}\u{11150}-\u{11172}\u{11174}-\u{11176}\u{11182}-\u{111B5}\u{111BF}-\u{111C8}\u{111CD}\u{111CE}\u{111D0}-\u{111DF}\u{111E1}-\u{111F4}\u{11200}-\u{11211}\u{11213}-\u{1122E}\u{11232}\u{11233}\u{11235}\u{11238}-\u{1123D}\u{1123F}\u{11240}\u{11280}-\u{11286}\u{11288}\u{1128A}-\u{1128D}\u{1128F}-\u{1129D}\u{1129F}-\u{112A9}\u{112B0}-\u{112DE}\u{112E0}-\u{112E2}\u{112F0}-\u{112F9}\u{11302}\u{11303}\u{11305}-\u{1130C}\u{1130F}\u{11310}\u{11313}-\u{11328}\u{1132A}-\u{11330}\u{11332}\u{11333}\u{11335}-\u{11339}\u{1133D}-\u{1133F}\u{11341}-\u{11344}\u{11347}\u{11348}\u{1134B}-\u{1134D}\u{11350}\u{11357}\u{1135D}-\u{11363}\u{11380}-\u{11389}\u{1138B}\u{1138E}\u{11390}-\u{113B5}\u{113B7}-\u{113BA}\u{113C2}\u{113C5}\u{113C7}-\u{113CA}\u{113CC}\u{113CD}\u{113CF}\u{113D1}\u{113D3}-\u{113D5}\u{113D7}\u{113D8}\u{11400}-\u{11437}\u{11440}\u{11441}\u{11445}\u{11447}-\u{1145B}\u{1145D}\u{1145F}-\u{11461}\u{11480}-\u{114B2}\u{114B9}\u{114BB}-\u{114BE}\u{114C1}\u{114C4}-\u{114C7}\u{114D0}-\u{114D9}\u{11580}-\u{115B1}\u{115B8}-\u{115BB}\u{115BE}\u{115C1}-\u{115DB}\u{11600}-\u{11632}\u{1163B}\u{1163C}\u{1163E}\u{11641}-\u{11644}\u{11650}-\u{11659}\u{11680}-\u{116AA}\u{116AC}\u{116AE}\u{116AF}\u{116B6}\u{116B8}\u{116B9}\u{116C0}-\u{116C9}\u{116D0}-\u{116E3}\u{11700}-\u{1171A}\u{1171E}\u{11720}\u{11721}\u{11726}\u{11730}-\u{11746}\u{11800}-\u{1182E}\u{11838}\u{1183B}\u{118A0}-\u{118F2}\u{118FF}-\u{11906}\u{11909}\u{1190C}-\u{11913}\u{11915}\u{11916}\u{11918}-\u{11935}\u{11937}\u{11938}\u{1193D}\u{1193F}-\u{11942}\u{11944}-\u{11946}\u{11950}-\u{11959}\u{119A0}-\u{119A7}\u{119AA}-\u{119D3}\u{119DC}-\u{119DF}\u{119E1}-\u{119E4}\u{11A00}\u{11A07}\u{11A08}\u{11A0B}-\u{11A32}\u{11A39}\u{11A3A}\u{11A3F}-\u{11A46}\u{11A50}\u{11A57}\u{11A58}\u{11A5C}-\u{11A89}\u{11A97}\u{11A9A}-\u{11AA2}\u{11AB0}-\u{11AF8}\u{11B00}-\u{11B09}\u{11BC0}-\u{11BE1}\u{11BF0}-\u{11BF9}\u{11C00}-\u{11C08}\u{11C0A}-\u{11C2F}\u{11C3E}-\u{11C45}\u{11C50}-\u{11C6C}\u{11C70}-\u{11C8F}\u{11CA9}\u{11CB1}\u{11CB4}\u{11D00}-\u{11D06}\u{11D08}\u{11D09}\u{11D0B}-\u{11D30}\u{11D46}\u{11D50}-\u{11D59}\u{11D60}-\u{11D65}\u{11D67}\u{11D68}\u{11D6A}-\u{11D8E}\u{11D93}\u{11D94}\u{11D96}\u{11D98}\u{11DA0}-\u{11DA9}\u{11EE0}-\u{11EF2}\u{11EF5}-\u{11EF8}\u{11F02}-\u{11F10}\u{11F12}-\u{11F35}\u{11F3E}\u{11F3F}\u{11F41}\u{11F43}-\u{11F59}\u{11FB0}\u{11FC0}-\u{11FD4}\u{11FFF}-\u{12399}\u{12400}-\u{1246E}\u{12470}-\u{12474}\u{12480}-\u{12543}\u{12F90}-\u{12FF2}\u{13000}-\u{1343F}\u{13441}-\u{13446}\u{13460}-\u{143FA}\u{14400}-\u{14646}\u{16100}-\u{1611D}\u{1612A}-\u{1612C}\u{16130}-\u{16139}\u{16800}-\u{16A38}\u{16A40}-\u{16A5E}\u{16A60}-\u{16A69}\u{16A6E}-\u{16ABE}\u{16AC0}-\u{16AC9}\u{16AD0}-\u{16AED}\u{16AF5}\u{16B00}-\u{16B2F}\u{16B37}-\u{16B45}\u{16B50}-\u{16B59}\u{16B5B}-\u{16B61}\u{16B63}-\u{16B77}\u{16B7D}-\u{16B8F}\u{16D40}-\u{16D79}\u{16E40}-\u{16E9A}\u{16F00}-\u{16F4A}\u{16F50}-\u{16F87}\u{16F93}-\u{16F9F}\u{16FE0}\u{16FE1}\u{16FE3}\u{16FF0}\u{16FF1}\u{17000}-\u{187F7}\u{18800}-\u{18CD5}\u{18CFF}-\u{18D08}\u{1AFF0}-\u{1AFF3}\u{1AFF5}-\u{1AFFB}\u{1AFFD}\u{1AFFE}\u{1B000}-\u{1B122}\u{1B132}\u{1B150}-\u{1B152}\u{1B155}\u{1B164}-\u{1B167}\u{1B170}-\u{1B2FB}\u{1BC00}-\u{1BC6A}\u{1BC70}-\u{1BC7C}\u{1BC80}-\u{1BC88}\u{1BC90}-\u{1BC99}\u{1BC9C}\u{1BC9F}\u{1CCD6}-\u{1CCEF}\u{1CF50}-\u{1CFC3}\u{1D000}-\u{1D0F5}\u{1D100}-\u{1D126}\u{1D129}-\u{1D166}\u{1D16A}-\u{1D172}\u{1D183}\u{1D184}\u{1D18C}-\u{1D1A9}\u{1D1AE}-\u{1D1E8}\u{1D2C0}-\u{1D2D3}\u{1D2E0}-\u{1D2F3}\u{1D360}-\u{1D378}\u{1D400}-\u{1D454}\u{1D456}-\u{1D49C}\u{1D49E}\u{1D49F}\u{1D4A2}\u{1D4A5}\u{1D4A6}\u{1D4A9}-\u{1D4AC}\u{1D4AE}-\u{1D4B9}\u{1D4BB}\u{1D4BD}-\u{1D4C3}\u{1D4C5}-\u{1D505}\u{1D507}-\u{1D50A}\u{1D50D}-\u{1D514}\u{1D516}-\u{1D51C}\u{1D51E}-\u{1D539}\u{1D53B}-\u{1D53E}\u{1D540}-\u{1D544}\u{1D546}\u{1D54A}-\u{1D550}\u{1D552}-\u{1D6A5}\u{1D6A8}-\u{1D6C0}\u{1D6C2}-\u{1D6DA}\u{1D6DC}-\u{1D6FA}\u{1D6FC}-\u{1D714}\u{1D716}-\u{1D734}\u{1D736}-\u{1D74E}\u{1D750}-\u{1D76E}\u{1D770}-\u{1D788}\u{1D78A}-\u{1D7A8}\u{1D7AA}-\u{1D7C2}\u{1D7C4}-\u{1D7CB}\u{1D800}-\u{1D9FF}\u{1DA37}-\u{1DA3A}\u{1DA6D}-\u{1DA74}\u{1DA76}-\u{1DA83}\u{1DA85}-\u{1DA8B}\u{1DF00}-\u{1DF1E}\u{1DF25}-\u{1DF2A}\u{1E030}-\u{1E06D}\u{1E100}-\u{1E12C}\u{1E137}-\u{1E13D}\u{1E140}-\u{1E149}\u{1E14E}\u{1E14F}\u{1E290}-\u{1E2AD}\u{1E2C0}-\u{1E2EB}\u{1E2F0}-\u{1E2F9}\u{1E4D0}-\u{1E4EB}\u{1E4F0}-\u{1E4F9}\u{1E5D0}-\u{1E5ED}\u{1E5F0}-\u{1E5FA}\u{1E5FF}\u{1E7E0}-\u{1E7E6}\u{1E7E8}-\u{1E7EB}\u{1E7ED}\u{1E7EE}\u{1E7F0}-\u{1E7FE}\u{1F110}-\u{1F12E}\u{1F130}-\u{1F169}\u{1F170}-\u{1F1AC}\u{1F1E6}-\u{1F202}\u{1F210}-\u{1F23B}\u{1F240}-\u{1F248}\u{1F250}\u{1F251}\u{20000}-\u{2A6DF}\u{2A700}-\u{2B739}\u{2B740}-\u{2B81D}\u{2B820}-\u{2CEA1}\u{2CEB0}-\u{2EBE0}\u{2EBF0}-\u{2EE5D}\u{2F800}-\u{2FA1D}\u{30000}-\u{3134A}\u{31350}-\u{323AF}\u{F0000}-\u{FFFFD}\u{100000}-\u{10FFFD}]/u;
const bidiS1RTL = /[\u05BE\u05C0\u05C3\u05C6\u05D0-\u05EA\u05EF-\u05F4\u0608\u060B\u060D\u061B-\u064A\u066D-\u066F\u0671-\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u070D\u070F\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07C0-\u07EA\u07F4\u07F5\u07FA\u07FE-\u0815\u081A\u0824\u0828\u0830-\u083E\u0840-\u0858\u085E\u0860-\u086A\u0870-\u088E\u08A0-\u08C9\u200F\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBC2\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFC\uFE70-\uFE74\uFE76-\uFEFC\u{10800}-\u{10805}\u{10808}\u{1080A}-\u{10835}\u{10837}\u{10838}\u{1083C}\u{1083F}-\u{10855}\u{10857}-\u{1089E}\u{108A7}-\u{108AF}\u{108E0}-\u{108F2}\u{108F4}\u{108F5}\u{108FB}-\u{1091B}\u{10920}-\u{10939}\u{1093F}\u{10980}-\u{109B7}\u{109BC}-\u{109CF}\u{109D2}-\u{10A00}\u{10A10}-\u{10A13}\u{10A15}-\u{10A17}\u{10A19}-\u{10A35}\u{10A40}-\u{10A48}\u{10A50}-\u{10A58}\u{10A60}-\u{10A9F}\u{10AC0}-\u{10AE4}\u{10AEB}-\u{10AF6}\u{10B00}-\u{10B35}\u{10B40}-\u{10B55}\u{10B58}-\u{10B72}\u{10B78}-\u{10B91}\u{10B99}-\u{10B9C}\u{10BA9}-\u{10BAF}\u{10C00}-\u{10C48}\u{10C80}-\u{10CB2}\u{10CC0}-\u{10CF2}\u{10CFA}-\u{10D23}\u{10D4A}-\u{10D65}\u{10D6F}-\u{10D85}\u{10D8E}\u{10D8F}\u{10E80}-\u{10EA9}\u{10EAD}\u{10EB0}\u{10EB1}\u{10EC2}-\u{10EC4}\u{10F00}-\u{10F27}\u{10F30}-\u{10F45}\u{10F51}-\u{10F59}\u{10F70}-\u{10F81}\u{10F86}-\u{10F89}\u{10FB0}-\u{10FCB}\u{10FE0}-\u{10FF6}\u{1E800}-\u{1E8C4}\u{1E8C7}-\u{1E8CF}\u{1E900}-\u{1E943}\u{1E94B}\u{1E950}-\u{1E959}\u{1E95E}\u{1E95F}\u{1EC71}-\u{1ECB4}\u{1ED01}-\u{1ED3D}\u{1EE00}-\u{1EE03}\u{1EE05}-\u{1EE1F}\u{1EE21}\u{1EE22}\u{1EE24}\u{1EE27}\u{1EE29}-\u{1EE32}\u{1EE34}-\u{1EE37}\u{1EE39}\u{1EE3B}\u{1EE42}\u{1EE47}\u{1EE49}\u{1EE4B}\u{1EE4D}-\u{1EE4F}\u{1EE51}\u{1EE52}\u{1EE54}\u{1EE57}\u{1EE59}\u{1EE5B}\u{1EE5D}\u{1EE5F}\u{1EE61}\u{1EE62}\u{1EE64}\u{1EE67}-\u{1EE6A}\u{1EE6C}-\u{1EE72}\u{1EE74}-\u{1EE77}\u{1EE79}-\u{1EE7C}\u{1EE7E}\u{1EE80}-\u{1EE89}\u{1EE8B}-\u{1EE9B}\u{1EEA1}-\u{1EEA3}\u{1EEA5}-\u{1EEA9}\u{1EEAB}-\u{1EEBB}]/u;
const bidiS2 = /^[\0-\x08\x0E-\x1B!-@\[-`\{-\x84\x86-\xA9\xAB-\xB4\xB6-\xB9\xBB-\xBF\xD7\xF7\u02B9\u02BA\u02C2-\u02CF\u02D2-\u02DF\u02E5-\u02ED\u02EF-\u036F\u0374\u0375\u037E\u0384\u0385\u0387\u03F6\u0483-\u0489\u058A\u058D-\u058F\u0591-\u05C7\u05D0-\u05EA\u05EF-\u05F4\u0600-\u070D\u070F-\u074A\u074D-\u07B1\u07C0-\u07FA\u07FD-\u082D\u0830-\u083E\u0840-\u085B\u085E\u0860-\u086A\u0870-\u088E\u0890\u0891\u0897-\u0902\u093A\u093C\u0941-\u0948\u094D\u0951-\u0957\u0962\u0963\u0981\u09BC\u09C1-\u09C4\u09CD\u09E2\u09E3\u09F2\u09F3\u09FB\u09FE\u0A01\u0A02\u0A3C\u0A41\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81\u0A82\u0ABC\u0AC1-\u0AC5\u0AC7\u0AC8\u0ACD\u0AE2\u0AE3\u0AF1\u0AFA-\u0AFF\u0B01\u0B3C\u0B3F\u0B41-\u0B44\u0B4D\u0B55\u0B56\u0B62\u0B63\u0B82\u0BC0\u0BCD\u0BF3-\u0BFA\u0C00\u0C04\u0C3C\u0C3E-\u0C40\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C78-\u0C7E\u0C81\u0CBC\u0CCC\u0CCD\u0CE2\u0CE3\u0D00\u0D01\u0D3B\u0D3C\u0D41-\u0D44\u0D4D\u0D62\u0D63\u0D81\u0DCA\u0DD2-\u0DD4\u0DD6\u0E31\u0E34-\u0E3A\u0E3F\u0E47-\u0E4E\u0EB1\u0EB4-\u0EBC\u0EC8-\u0ECE\u0F18\u0F19\u0F35\u0F37\u0F39-\u0F3D\u0F71-\u0F7E\u0F80-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102D-\u1030\u1032-\u1037\u1039\u103A\u103D\u103E\u1058\u1059\u105E-\u1060\u1071-\u1074\u1082\u1085\u1086\u108D\u109D\u135D-\u135F\u1390-\u1399\u1400\u169B\u169C\u1712-\u1714\u1732\u1733\u1752\u1753\u1772\u1773\u17B4\u17B5\u17B7-\u17BD\u17C6\u17C9-\u17D3\u17DB\u17DD\u17F0-\u17F9\u1800-\u180F\u1885\u1886\u18A9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193B\u1940\u1944\u1945\u19DE-\u19FF\u1A17\u1A18\u1A1B\u1A56\u1A58-\u1A5E\u1A60\u1A62\u1A65-\u1A6C\u1A73-\u1A7C\u1A7F\u1AB0-\u1ACE\u1B00-\u1B03\u1B34\u1B36-\u1B3A\u1B3C\u1B42\u1B6B-\u1B73\u1B80\u1B81\u1BA2-\u1BA5\u1BA8\u1BA9\u1BAB-\u1BAD\u1BE6\u1BE8\u1BE9\u1BED\u1BEF-\u1BF1\u1C2C-\u1C33\u1C36\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE0\u1CE2-\u1CE8\u1CED\u1CF4\u1CF8\u1CF9\u1DC0-\u1DFF\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u200B-\u200D\u200F-\u2027\u202F-\u205E\u2060-\u2064\u206A-\u2070\u2074-\u207E\u2080-\u208E\u20A0-\u20C0\u20D0-\u20F0\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u2150-\u215F\u2189-\u218B\u2190-\u2335\u237B-\u2394\u2396-\u2429\u2440-\u244A\u2460-\u249B\u24EA-\u26AB\u26AD-\u27FF\u2900-\u2B73\u2B76-\u2B95\u2B97-\u2BFF\u2CE5-\u2CEA\u2CEF-\u2CF1\u2CF9-\u2CFF\u2D7F\u2DE0-\u2E5D\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFF\u3001-\u3004\u3008-\u3020\u302A-\u302D\u3030\u3036\u3037\u303D-\u303F\u3099-\u309C\u30A0\u30FB\u31C0-\u31E5\u31EF\u321D\u321E\u3250-\u325F\u327C-\u327E\u32B1-\u32BF\u32CC-\u32CF\u3377-\u337A\u33DE\u33DF\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA60D-\uA60F\uA66F-\uA67F\uA69E\uA69F\uA6F0\uA6F1\uA700-\uA721\uA788\uA802\uA806\uA80B\uA825\uA826\uA828-\uA82C\uA838\uA839\uA874-\uA877\uA8C4\uA8C5\uA8E0-\uA8F1\uA8FF\uA926-\uA92D\uA947-\uA951\uA980-\uA982\uA9B3\uA9B6-\uA9B9\uA9BC\uA9BD\uA9E5\uAA29-\uAA2E\uAA31\uAA32\uAA35\uAA36\uAA43\uAA4C\uAA7C\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEC\uAAED\uAAF6\uAB6A\uAB6B\uABE5\uABE8\uABED\uFB1D-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBC2\uFBD3-\uFD8F\uFD92-\uFDC7\uFDCF\uFDF0-\uFE19\uFE20-\uFE52\uFE54-\uFE66\uFE68-\uFE6B\uFE70-\uFE74\uFE76-\uFEFC\uFEFF\uFF01-\uFF20\uFF3B-\uFF40\uFF5B-\uFF65\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFF9-\uFFFD\u{10101}\u{10140}-\u{1018C}\u{10190}-\u{1019C}\u{101A0}\u{101FD}\u{102E0}-\u{102FB}\u{10376}-\u{1037A}\u{10800}-\u{10805}\u{10808}\u{1080A}-\u{10835}\u{10837}\u{10838}\u{1083C}\u{1083F}-\u{10855}\u{10857}-\u{1089E}\u{108A7}-\u{108AF}\u{108E0}-\u{108F2}\u{108F4}\u{108F5}\u{108FB}-\u{1091B}\u{1091F}-\u{10939}\u{1093F}\u{10980}-\u{109B7}\u{109BC}-\u{109CF}\u{109D2}-\u{10A03}\u{10A05}\u{10A06}\u{10A0C}-\u{10A13}\u{10A15}-\u{10A17}\u{10A19}-\u{10A35}\u{10A38}-\u{10A3A}\u{10A3F}-\u{10A48}\u{10A50}-\u{10A58}\u{10A60}-\u{10A9F}\u{10AC0}-\u{10AE6}\u{10AEB}-\u{10AF6}\u{10B00}-\u{10B35}\u{10B39}-\u{10B55}\u{10B58}-\u{10B72}\u{10B78}-\u{10B91}\u{10B99}-\u{10B9C}\u{10BA9}-\u{10BAF}\u{10C00}-\u{10C48}\u{10C80}-\u{10CB2}\u{10CC0}-\u{10CF2}\u{10CFA}-\u{10D27}\u{10D30}-\u{10D39}\u{10D40}-\u{10D65}\u{10D69}-\u{10D85}\u{10D8E}\u{10D8F}\u{10E60}-\u{10E7E}\u{10E80}-\u{10EA9}\u{10EAB}-\u{10EAD}\u{10EB0}\u{10EB1}\u{10EC2}-\u{10EC4}\u{10EFC}-\u{10F27}\u{10F30}-\u{10F59}\u{10F70}-\u{10F89}\u{10FB0}-\u{10FCB}\u{10FE0}-\u{10FF6}\u{11001}\u{11038}-\u{11046}\u{11052}-\u{11065}\u{11070}\u{11073}\u{11074}\u{1107F}-\u{11081}\u{110B3}-\u{110B6}\u{110B9}\u{110BA}\u{110C2}\u{11100}-\u{11102}\u{11127}-\u{1112B}\u{1112D}-\u{11134}\u{11173}\u{11180}\u{11181}\u{111B6}-\u{111BE}\u{111C9}-\u{111CC}\u{111CF}\u{1122F}-\u{11231}\u{11234}\u{11236}\u{11237}\u{1123E}\u{11241}\u{112DF}\u{112E3}-\u{112EA}\u{11300}\u{11301}\u{1133B}\u{1133C}\u{11340}\u{11366}-\u{1136C}\u{11370}-\u{11374}\u{113BB}-\u{113C0}\u{113CE}\u{113D0}\u{113D2}\u{113E1}\u{113E2}\u{11438}-\u{1143F}\u{11442}-\u{11444}\u{11446}\u{1145E}\u{114B3}-\u{114B8}\u{114BA}\u{114BF}\u{114C0}\u{114C2}\u{114C3}\u{115B2}-\u{115B5}\u{115BC}\u{115BD}\u{115BF}\u{115C0}\u{115DC}\u{115DD}\u{11633}-\u{1163A}\u{1163D}\u{1163F}\u{11640}\u{11660}-\u{1166C}\u{116AB}\u{116AD}\u{116B0}-\u{116B5}\u{116B7}\u{1171D}\u{1171F}\u{11722}-\u{11725}\u{11727}-\u{1172B}\u{1182F}-\u{11837}\u{11839}\u{1183A}\u{1193B}\u{1193C}\u{1193E}\u{11943}\u{119D4}-\u{119D7}\u{119DA}\u{119DB}\u{119E0}\u{11A01}-\u{11A06}\u{11A09}\u{11A0A}\u{11A33}-\u{11A38}\u{11A3B}-\u{11A3E}\u{11A47}\u{11A51}-\u{11A56}\u{11A59}-\u{11A5B}\u{11A8A}-\u{11A96}\u{11A98}\u{11A99}\u{11C30}-\u{11C36}\u{11C38}-\u{11C3D}\u{11C92}-\u{11CA7}\u{11CAA}-\u{11CB0}\u{11CB2}\u{11CB3}\u{11CB5}\u{11CB6}\u{11D31}-\u{11D36}\u{11D3A}\u{11D3C}\u{11D3D}\u{11D3F}-\u{11D45}\u{11D47}\u{11D90}\u{11D91}\u{11D95}\u{11D97}\u{11EF3}\u{11EF4}\u{11F00}\u{11F01}\u{11F36}-\u{11F3A}\u{11F40}\u{11F42}\u{11F5A}\u{11FD5}-\u{11FF1}\u{13440}\u{13447}-\u{13455}\u{1611E}-\u{16129}\u{1612D}-\u{1612F}\u{16AF0}-\u{16AF4}\u{16B30}-\u{16B36}\u{16F4F}\u{16F8F}-\u{16F92}\u{16FE2}\u{16FE4}\u{1BC9D}\u{1BC9E}\u{1BCA0}-\u{1BCA3}\u{1CC00}-\u{1CCD5}\u{1CCF0}-\u{1CCF9}\u{1CD00}-\u{1CEB3}\u{1CF00}-\u{1CF2D}\u{1CF30}-\u{1CF46}\u{1D167}-\u{1D169}\u{1D173}-\u{1D182}\u{1D185}-\u{1D18B}\u{1D1AA}-\u{1D1AD}\u{1D1E9}\u{1D1EA}\u{1D200}-\u{1D245}\u{1D300}-\u{1D356}\u{1D6C1}\u{1D6DB}\u{1D6FB}\u{1D715}\u{1D735}\u{1D74F}\u{1D76F}\u{1D789}\u{1D7A9}\u{1D7C3}\u{1D7CE}-\u{1D7FF}\u{1DA00}-\u{1DA36}\u{1DA3B}-\u{1DA6C}\u{1DA75}\u{1DA84}\u{1DA9B}-\u{1DA9F}\u{1DAA1}-\u{1DAAF}\u{1E000}-\u{1E006}\u{1E008}-\u{1E018}\u{1E01B}-\u{1E021}\u{1E023}\u{1E024}\u{1E026}-\u{1E02A}\u{1E08F}\u{1E130}-\u{1E136}\u{1E2AE}\u{1E2EC}-\u{1E2EF}\u{1E2FF}\u{1E4EC}-\u{1E4EF}\u{1E5EE}\u{1E5EF}\u{1E800}-\u{1E8C4}\u{1E8C7}-\u{1E8D6}\u{1E900}-\u{1E94B}\u{1E950}-\u{1E959}\u{1E95E}\u{1E95F}\u{1EC71}-\u{1ECB4}\u{1ED01}-\u{1ED3D}\u{1EE00}-\u{1EE03}\u{1EE05}-\u{1EE1F}\u{1EE21}\u{1EE22}\u{1EE24}\u{1EE27}\u{1EE29}-\u{1EE32}\u{1EE34}-\u{1EE37}\u{1EE39}\u{1EE3B}\u{1EE42}\u{1EE47}\u{1EE49}\u{1EE4B}\u{1EE4D}-\u{1EE4F}\u{1EE51}\u{1EE52}\u{1EE54}\u{1EE57}\u{1EE59}\u{1EE5B}\u{1EE5D}\u{1EE5F}\u{1EE61}\u{1EE62}\u{1EE64}\u{1EE67}-\u{1EE6A}\u{1EE6C}-\u{1EE72}\u{1EE74}-\u{1EE77}\u{1EE79}-\u{1EE7C}\u{1EE7E}\u{1EE80}-\u{1EE89}\u{1EE8B}-\u{1EE9B}\u{1EEA1}-\u{1EEA3}\u{1EEA5}-\u{1EEA9}\u{1EEAB}-\u{1EEBB}\u{1EEF0}\u{1EEF1}\u{1F000}-\u{1F02B}\u{1F030}-\u{1F093}\u{1F0A0}-\u{1F0AE}\u{1F0B1}-\u{1F0BF}\u{1F0C1}-\u{1F0CF}\u{1F0D1}-\u{1F0F5}\u{1F100}-\u{1F10F}\u{1F12F}\u{1F16A}-\u{1F16F}\u{1F1AD}\u{1F260}-\u{1F265}\u{1F300}-\u{1F6D7}\u{1F6DC}-\u{1F6EC}\u{1F6F0}-\u{1F6FC}\u{1F700}-\u{1F776}\u{1F77B}-\u{1F7D9}\u{1F7E0}-\u{1F7EB}\u{1F7F0}\u{1F800}-\u{1F80B}\u{1F810}-\u{1F847}\u{1F850}-\u{1F859}\u{1F860}-\u{1F887}\u{1F890}-\u{1F8AD}\u{1F8B0}-\u{1F8BB}\u{1F8C0}\u{1F8C1}\u{1F900}-\u{1FA53}\u{1FA60}-\u{1FA6D}\u{1FA70}-\u{1FA7C}\u{1FA80}-\u{1FA89}\u{1FA8F}-\u{1FAC6}\u{1FACE}-\u{1FADC}\u{1FADF}-\u{1FAE9}\u{1FAF0}-\u{1FAF8}\u{1FB00}-\u{1FB92}\u{1FB94}-\u{1FBF9}\u{E0001}\u{E0020}-\u{E007F}\u{E0100}-\u{E01EF}]*$/u;
const bidiS3 = /[0-9\xB2\xB3\xB9\u05BE\u05C0\u05C3\u05C6\u05D0-\u05EA\u05EF-\u05F4\u0600-\u0605\u0608\u060B\u060D\u061B-\u064A\u0660-\u0669\u066B-\u066F\u0671-\u06D5\u06DD\u06E5\u06E6\u06EE-\u070D\u070F\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07C0-\u07EA\u07F4\u07F5\u07FA\u07FE-\u0815\u081A\u0824\u0828\u0830-\u083E\u0840-\u0858\u085E\u0860-\u086A\u0870-\u088E\u0890\u0891\u08A0-\u08C9\u08E2\u200F\u2070\u2074-\u2079\u2080-\u2089\u2488-\u249B\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBC2\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFC\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\u{102E1}-\u{102FB}\u{10800}-\u{10805}\u{10808}\u{1080A}-\u{10835}\u{10837}\u{10838}\u{1083C}\u{1083F}-\u{10855}\u{10857}-\u{1089E}\u{108A7}-\u{108AF}\u{108E0}-\u{108F2}\u{108F4}\u{108F5}\u{108FB}-\u{1091B}\u{10920}-\u{10939}\u{1093F}\u{10980}-\u{109B7}\u{109BC}-\u{109CF}\u{109D2}-\u{10A00}\u{10A10}-\u{10A13}\u{10A15}-\u{10A17}\u{10A19}-\u{10A35}\u{10A40}-\u{10A48}\u{10A50}-\u{10A58}\u{10A60}-\u{10A9F}\u{10AC0}-\u{10AE4}\u{10AEB}-\u{10AF6}\u{10B00}-\u{10B35}\u{10B40}-\u{10B55}\u{10B58}-\u{10B72}\u{10B78}-\u{10B91}\u{10B99}-\u{10B9C}\u{10BA9}-\u{10BAF}\u{10C00}-\u{10C48}\u{10C80}-\u{10CB2}\u{10CC0}-\u{10CF2}\u{10CFA}-\u{10D23}\u{10D30}-\u{10D39}\u{10D40}-\u{10D65}\u{10D6F}-\u{10D85}\u{10D8E}\u{10D8F}\u{10E60}-\u{10E7E}\u{10E80}-\u{10EA9}\u{10EAD}\u{10EB0}\u{10EB1}\u{10EC2}-\u{10EC4}\u{10F00}-\u{10F27}\u{10F30}-\u{10F45}\u{10F51}-\u{10F59}\u{10F70}-\u{10F81}\u{10F86}-\u{10F89}\u{10FB0}-\u{10FCB}\u{10FE0}-\u{10FF6}\u{1CCF0}-\u{1CCF9}\u{1D7CE}-\u{1D7FF}\u{1E800}-\u{1E8C4}\u{1E8C7}-\u{1E8CF}\u{1E900}-\u{1E943}\u{1E94B}\u{1E950}-\u{1E959}\u{1E95E}\u{1E95F}\u{1EC71}-\u{1ECB4}\u{1ED01}-\u{1ED3D}\u{1EE00}-\u{1EE03}\u{1EE05}-\u{1EE1F}\u{1EE21}\u{1EE22}\u{1EE24}\u{1EE27}\u{1EE29}-\u{1EE32}\u{1EE34}-\u{1EE37}\u{1EE39}\u{1EE3B}\u{1EE42}\u{1EE47}\u{1EE49}\u{1EE4B}\u{1EE4D}-\u{1EE4F}\u{1EE51}\u{1EE52}\u{1EE54}\u{1EE57}\u{1EE59}\u{1EE5B}\u{1EE5D}\u{1EE5F}\u{1EE61}\u{1EE62}\u{1EE64}\u{1EE67}-\u{1EE6A}\u{1EE6C}-\u{1EE72}\u{1EE74}-\u{1EE77}\u{1EE79}-\u{1EE7C}\u{1EE7E}\u{1EE80}-\u{1EE89}\u{1EE8B}-\u{1EE9B}\u{1EEA1}-\u{1EEA3}\u{1EEA5}-\u{1EEA9}\u{1EEAB}-\u{1EEBB}\u{1F100}-\u{1F10A}\u{1FBF0}-\u{1FBF9}][\u0300-\u036F\u0483-\u0489\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u0897-\u089F\u08CA-\u08E1\u08E3-\u0902\u093A\u093C\u0941-\u0948\u094D\u0951-\u0957\u0962\u0963\u0981\u09BC\u09C1-\u09C4\u09CD\u09E2\u09E3\u09FE\u0A01\u0A02\u0A3C\u0A41\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81\u0A82\u0ABC\u0AC1-\u0AC5\u0AC7\u0AC8\u0ACD\u0AE2\u0AE3\u0AFA-\u0AFF\u0B01\u0B3C\u0B3F\u0B41-\u0B44\u0B4D\u0B55\u0B56\u0B62\u0B63\u0B82\u0BC0\u0BCD\u0C00\u0C04\u0C3C\u0C3E-\u0C40\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C81\u0CBC\u0CCC\u0CCD\u0CE2\u0CE3\u0D00\u0D01\u0D3B\u0D3C\u0D41-\u0D44\u0D4D\u0D62\u0D63\u0D81\u0DCA\u0DD2-\u0DD4\u0DD6\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EBC\u0EC8-\u0ECE\u0F18\u0F19\u0F35\u0F37\u0F39\u0F71-\u0F7E\u0F80-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102D-\u1030\u1032-\u1037\u1039\u103A\u103D\u103E\u1058\u1059\u105E-\u1060\u1071-\u1074\u1082\u1085\u1086\u108D\u109D\u135D-\u135F\u1712-\u1714\u1732\u1733\u1752\u1753\u1772\u1773\u17B4\u17B5\u17B7-\u17BD\u17C6\u17C9-\u17D3\u17DD\u180B-\u180D\u180F\u1885\u1886\u18A9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193B\u1A17\u1A18\u1A1B\u1A56\u1A58-\u1A5E\u1A60\u1A62\u1A65-\u1A6C\u1A73-\u1A7C\u1A7F\u1AB0-\u1ACE\u1B00-\u1B03\u1B34\u1B36-\u1B3A\u1B3C\u1B42\u1B6B-\u1B73\u1B80\u1B81\u1BA2-\u1BA5\u1BA8\u1BA9\u1BAB-\u1BAD\u1BE6\u1BE8\u1BE9\u1BED\u1BEF-\u1BF1\u1C2C-\u1C33\u1C36\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE0\u1CE2-\u1CE8\u1CED\u1CF4\u1CF8\u1CF9\u1DC0-\u1DFF\u20D0-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302D\u3099\u309A\uA66F-\uA672\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA825\uA826\uA82C\uA8C4\uA8C5\uA8E0-\uA8F1\uA8FF\uA926-\uA92D\uA947-\uA951\uA980-\uA982\uA9B3\uA9B6-\uA9B9\uA9BC\uA9BD\uA9E5\uAA29-\uAA2E\uAA31\uAA32\uAA35\uAA36\uAA43\uAA4C\uAA7C\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEC\uAAED\uAAF6\uABE5\uABE8\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F\u{101FD}\u{102E0}\u{10376}-\u{1037A}\u{10A01}-\u{10A03}\u{10A05}\u{10A06}\u{10A0C}-\u{10A0F}\u{10A38}-\u{10A3A}\u{10A3F}\u{10AE5}\u{10AE6}\u{10D24}-\u{10D27}\u{10D69}-\u{10D6D}\u{10EAB}\u{10EAC}\u{10EFC}-\u{10EFF}\u{10F46}-\u{10F50}\u{10F82}-\u{10F85}\u{11001}\u{11038}-\u{11046}\u{11070}\u{11073}\u{11074}\u{1107F}-\u{11081}\u{110B3}-\u{110B6}\u{110B9}\u{110BA}\u{110C2}\u{11100}-\u{11102}\u{11127}-\u{1112B}\u{1112D}-\u{11134}\u{11173}\u{11180}\u{11181}\u{111B6}-\u{111BE}\u{111C9}-\u{111CC}\u{111CF}\u{1122F}-\u{11231}\u{11234}\u{11236}\u{11237}\u{1123E}\u{11241}\u{112DF}\u{112E3}-\u{112EA}\u{11300}\u{11301}\u{1133B}\u{1133C}\u{11340}\u{11366}-\u{1136C}\u{11370}-\u{11374}\u{113BB}-\u{113C0}\u{113CE}\u{113D0}\u{113D2}\u{113E1}\u{113E2}\u{11438}-\u{1143F}\u{11442}-\u{11444}\u{11446}\u{1145E}\u{114B3}-\u{114B8}\u{114BA}\u{114BF}\u{114C0}\u{114C2}\u{114C3}\u{115B2}-\u{115B5}\u{115BC}\u{115BD}\u{115BF}\u{115C0}\u{115DC}\u{115DD}\u{11633}-\u{1163A}\u{1163D}\u{1163F}\u{11640}\u{116AB}\u{116AD}\u{116B0}-\u{116B5}\u{116B7}\u{1171D}\u{1171F}\u{11722}-\u{11725}\u{11727}-\u{1172B}\u{1182F}-\u{11837}\u{11839}\u{1183A}\u{1193B}\u{1193C}\u{1193E}\u{11943}\u{119D4}-\u{119D7}\u{119DA}\u{119DB}\u{119E0}\u{11A01}-\u{11A06}\u{11A09}\u{11A0A}\u{11A33}-\u{11A38}\u{11A3B}-\u{11A3E}\u{11A47}\u{11A51}-\u{11A56}\u{11A59}-\u{11A5B}\u{11A8A}-\u{11A96}\u{11A98}\u{11A99}\u{11C30}-\u{11C36}\u{11C38}-\u{11C3D}\u{11C92}-\u{11CA7}\u{11CAA}-\u{11CB0}\u{11CB2}\u{11CB3}\u{11CB5}\u{11CB6}\u{11D31}-\u{11D36}\u{11D3A}\u{11D3C}\u{11D3D}\u{11D3F}-\u{11D45}\u{11D47}\u{11D90}\u{11D91}\u{11D95}\u{11D97}\u{11EF3}\u{11EF4}\u{11F00}\u{11F01}\u{11F36}-\u{11F3A}\u{11F40}\u{11F42}\u{11F5A}\u{13440}\u{13447}-\u{13455}\u{1611E}-\u{16129}\u{1612D}-\u{1612F}\u{16AF0}-\u{16AF4}\u{16B30}-\u{16B36}\u{16F4F}\u{16F8F}-\u{16F92}\u{16FE4}\u{1BC9D}\u{1BC9E}\u{1CF00}-\u{1CF2D}\u{1CF30}-\u{1CF46}\u{1D167}-\u{1D169}\u{1D17B}-\u{1D182}\u{1D185}-\u{1D18B}\u{1D1AA}-\u{1D1AD}\u{1D242}-\u{1D244}\u{1DA00}-\u{1DA36}\u{1DA3B}-\u{1DA6C}\u{1DA75}\u{1DA84}\u{1DA9B}-\u{1DA9F}\u{1DAA1}-\u{1DAAF}\u{1E000}-\u{1E006}\u{1E008}-\u{1E018}\u{1E01B}-\u{1E021}\u{1E023}\u{1E024}\u{1E026}-\u{1E02A}\u{1E08F}\u{1E130}-\u{1E136}\u{1E2AE}\u{1E2EC}-\u{1E2EF}\u{1E4EC}-\u{1E4EF}\u{1E5EE}\u{1E5EF}\u{1E8D0}-\u{1E8D6}\u{1E944}-\u{1E94A}\u{E0100}-\u{E01EF}]*$/u;
const bidiS4EN = /[0-9\xB2\xB3\xB9\u06F0-\u06F9\u2070\u2074-\u2079\u2080-\u2089\u2488-\u249B\uFF10-\uFF19\u{102E1}-\u{102FB}\u{1CCF0}-\u{1CCF9}\u{1D7CE}-\u{1D7FF}\u{1F100}-\u{1F10A}\u{1FBF0}-\u{1FBF9}]/u;
const bidiS4AN = /[\u0600-\u0605\u0660-\u0669\u066B\u066C\u06DD\u0890\u0891\u08E2\u{10D30}-\u{10D39}\u{10D40}-\u{10D49}\u{10E60}-\u{10E7E}]/u;
const bidiS5 = /^[\0-\x08\x0E-\x1B!-\x84\x86-\u0377\u037A-\u037F\u0384-\u038A\u038C\u038E-\u03A1\u03A3-\u052F\u0531-\u0556\u0559-\u058A\u058D-\u058F\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0606\u0607\u0609\u060A\u060C\u060E-\u061A\u064B-\u065F\u066A\u0670\u06D6-\u06DC\u06DE-\u06E4\u06E7-\u06ED\u06F0-\u06F9\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u07F6-\u07F9\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u0897-\u089F\u08CA-\u08E1\u08E3-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09FE\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A76\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AF1\u0AF9-\u0AFF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B55-\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B77\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BFA\u0C00-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3C-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C5D\u0C60-\u0C63\u0C66-\u0C6F\u0C77-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDD\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1-\u0CF3\u0D00-\u0D0C\u0D0E-\u0D10\u0D12-\u0D44\u0D46-\u0D48\u0D4A-\u0D4F\u0D54-\u0D63\u0D66-\u0D7F\u0D81-\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2-\u0DF4\u0E01-\u0E3A\u0E3F-\u0E5B\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECE\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00-\u0F47\u0F49-\u0F6C\u0F71-\u0F97\u0F99-\u0FBC\u0FBE-\u0FCC\u0FCE-\u0FDA\u1000-\u10C5\u10C7\u10CD\u10D0-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u137C\u1380-\u1399\u13A0-\u13F5\u13F8-\u13FD\u1400-\u167F\u1681-\u169C\u16A0-\u16F8\u1700-\u1715\u171F-\u1736\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17DD\u17E0-\u17E9\u17F0-\u17F9\u1800-\u1819\u1820-\u1878\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1940\u1944-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u19DE-\u1A1B\u1A1E-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA0-\u1AAD\u1AB0-\u1ACE\u1B00-\u1B4C\u1B4E-\u1BF3\u1BFC-\u1C37\u1C3B-\u1C49\u1C4D-\u1C8A\u1C90-\u1CBA\u1CBD-\u1CC7\u1CD0-\u1CFA\u1D00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FC4\u1FC6-\u1FD3\u1FD6-\u1FDB\u1FDD-\u1FEF\u1FF2-\u1FF4\u1FF6-\u1FFE\u200B-\u200E\u2010-\u2027\u202F-\u205E\u2060-\u2064\u206A-\u2071\u2074-\u208E\u2090-\u209C\u20A0-\u20C0\u20D0-\u20F0\u2100-\u218B\u2190-\u2429\u2440-\u244A\u2460-\u2B73\u2B76-\u2B95\u2B97-\u2CF3\u2CF9-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D70\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2E5D\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFF\u3001-\u303F\u3041-\u3096\u3099-\u30FF\u3105-\u312F\u3131-\u318E\u3190-\u31E5\u31EF-\u321E\u3220-\uA48C\uA490-\uA4C6\uA4D0-\uA62B\uA640-\uA6F7\uA700-\uA7CD\uA7D0\uA7D1\uA7D3\uA7D5-\uA7DC\uA7F2-\uA82C\uA830-\uA839\uA840-\uA877\uA880-\uA8C5\uA8CE-\uA8D9\uA8E0-\uA953\uA95F-\uA97C\uA980-\uA9CD\uA9CF-\uA9D9\uA9DE-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA5C-\uAAC2\uAADB-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB6B\uAB70-\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uD800-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1E\uFB29\uFD3E-\uFD4F\uFDCF\uFDFD-\uFE19\uFE20-\uFE52\uFE54-\uFE66\uFE68-\uFE6B\uFEFF\uFF01-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFF9-\uFFFD\u{10000}-\u{1000B}\u{1000D}-\u{10026}\u{10028}-\u{1003A}\u{1003C}\u{1003D}\u{1003F}-\u{1004D}\u{10050}-\u{1005D}\u{10080}-\u{100FA}\u{10100}-\u{10102}\u{10107}-\u{10133}\u{10137}-\u{1018E}\u{10190}-\u{1019C}\u{101A0}\u{101D0}-\u{101FD}\u{10280}-\u{1029C}\u{102A0}-\u{102D0}\u{102E0}-\u{102FB}\u{10300}-\u{10323}\u{1032D}-\u{1034A}\u{10350}-\u{1037A}\u{10380}-\u{1039D}\u{1039F}-\u{103C3}\u{103C8}-\u{103D5}\u{10400}-\u{1049D}\u{104A0}-\u{104A9}\u{104B0}-\u{104D3}\u{104D8}-\u{104FB}\u{10500}-\u{10527}\u{10530}-\u{10563}\u{1056F}-\u{1057A}\u{1057C}-\u{1058A}\u{1058C}-\u{10592}\u{10594}\u{10595}\u{10597}-\u{105A1}\u{105A3}-\u{105B1}\u{105B3}-\u{105B9}\u{105BB}\u{105BC}\u{105C0}-\u{105F3}\u{10600}-\u{10736}\u{10740}-\u{10755}\u{10760}-\u{10767}\u{10780}-\u{10785}\u{10787}-\u{107B0}\u{107B2}-\u{107BA}\u{1091F}\u{10A01}-\u{10A03}\u{10A05}\u{10A06}\u{10A0C}-\u{10A0F}\u{10A38}-\u{10A3A}\u{10A3F}\u{10AE5}\u{10AE6}\u{10B39}-\u{10B3F}\u{10D24}-\u{10D27}\u{10D69}-\u{10D6E}\u{10EAB}\u{10EAC}\u{10EFC}-\u{10EFF}\u{10F46}-\u{10F50}\u{10F82}-\u{10F85}\u{11000}-\u{1104D}\u{11052}-\u{11075}\u{1107F}-\u{110C2}\u{110CD}\u{110D0}-\u{110E8}\u{110F0}-\u{110F9}\u{11100}-\u{11134}\u{11136}-\u{11147}\u{11150}-\u{11176}\u{11180}-\u{111DF}\u{111E1}-\u{111F4}\u{11200}-\u{11211}\u{11213}-\u{11241}\u{11280}-\u{11286}\u{11288}\u{1128A}-\u{1128D}\u{1128F}-\u{1129D}\u{1129F}-\u{112A9}\u{112B0}-\u{112EA}\u{112F0}-\u{112F9}\u{11300}-\u{11303}\u{11305}-\u{1130C}\u{1130F}\u{11310}\u{11313}-\u{11328}\u{1132A}-\u{11330}\u{11332}\u{11333}\u{11335}-\u{11339}\u{1133B}-\u{11344}\u{11347}\u{11348}\u{1134B}-\u{1134D}\u{11350}\u{11357}\u{1135D}-\u{11363}\u{11366}-\u{1136C}\u{11370}-\u{11374}\u{11380}-\u{11389}\u{1138B}\u{1138E}\u{11390}-\u{113B5}\u{113B7}-\u{113C0}\u{113C2}\u{113C5}\u{113C7}-\u{113CA}\u{113CC}-\u{113D5}\u{113D7}\u{113D8}\u{113E1}\u{113E2}\u{11400}-\u{1145B}\u{1145D}-\u{11461}\u{11480}-\u{114C7}\u{114D0}-\u{114D9}\u{11580}-\u{115B5}\u{115B8}-\u{115DD}\u{11600}-\u{11644}\u{11650}-\u{11659}\u{11660}-\u{1166C}\u{11680}-\u{116B9}\u{116C0}-\u{116C9}\u{116D0}-\u{116E3}\u{11700}-\u{1171A}\u{1171D}-\u{1172B}\u{11730}-\u{11746}\u{11800}-\u{1183B}\u{118A0}-\u{118F2}\u{118FF}-\u{11906}\u{11909}\u{1190C}-\u{11913}\u{11915}\u{11916}\u{11918}-\u{11935}\u{11937}\u{11938}\u{1193B}-\u{11946}\u{11950}-\u{11959}\u{119A0}-\u{119A7}\u{119AA}-\u{119D7}\u{119DA}-\u{119E4}\u{11A00}-\u{11A47}\u{11A50}-\u{11AA2}\u{11AB0}-\u{11AF8}\u{11B00}-\u{11B09}\u{11BC0}-\u{11BE1}\u{11BF0}-\u{11BF9}\u{11C00}-\u{11C08}\u{11C0A}-\u{11C36}\u{11C38}-\u{11C45}\u{11C50}-\u{11C6C}\u{11C70}-\u{11C8F}\u{11C92}-\u{11CA7}\u{11CA9}-\u{11CB6}\u{11D00}-\u{11D06}\u{11D08}\u{11D09}\u{11D0B}-\u{11D36}\u{11D3A}\u{11D3C}\u{11D3D}\u{11D3F}-\u{11D47}\u{11D50}-\u{11D59}\u{11D60}-\u{11D65}\u{11D67}\u{11D68}\u{11D6A}-\u{11D8E}\u{11D90}\u{11D91}\u{11D93}-\u{11D98}\u{11DA0}-\u{11DA9}\u{11EE0}-\u{11EF8}\u{11F00}-\u{11F10}\u{11F12}-\u{11F3A}\u{11F3E}-\u{11F5A}\u{11FB0}\u{11FC0}-\u{11FF1}\u{11FFF}-\u{12399}\u{12400}-\u{1246E}\u{12470}-\u{12474}\u{12480}-\u{12543}\u{12F90}-\u{12FF2}\u{13000}-\u{13455}\u{13460}-\u{143FA}\u{14400}-\u{14646}\u{16100}-\u{16139}\u{16800}-\u{16A38}\u{16A40}-\u{16A5E}\u{16A60}-\u{16A69}\u{16A6E}-\u{16ABE}\u{16AC0}-\u{16AC9}\u{16AD0}-\u{16AED}\u{16AF0}-\u{16AF5}\u{16B00}-\u{16B45}\u{16B50}-\u{16B59}\u{16B5B}-\u{16B61}\u{16B63}-\u{16B77}\u{16B7D}-\u{16B8F}\u{16D40}-\u{16D79}\u{16E40}-\u{16E9A}\u{16F00}-\u{16F4A}\u{16F4F}-\u{16F87}\u{16F8F}-\u{16F9F}\u{16FE0}-\u{16FE4}\u{16FF0}\u{16FF1}\u{17000}-\u{187F7}\u{18800}-\u{18CD5}\u{18CFF}-\u{18D08}\u{1AFF0}-\u{1AFF3}\u{1AFF5}-\u{1AFFB}\u{1AFFD}\u{1AFFE}\u{1B000}-\u{1B122}\u{1B132}\u{1B150}-\u{1B152}\u{1B155}\u{1B164}-\u{1B167}\u{1B170}-\u{1B2FB}\u{1BC00}-\u{1BC6A}\u{1BC70}-\u{1BC7C}\u{1BC80}-\u{1BC88}\u{1BC90}-\u{1BC99}\u{1BC9C}-\u{1BCA3}\u{1CC00}-\u{1CCF9}\u{1CD00}-\u{1CEB3}\u{1CF00}-\u{1CF2D}\u{1CF30}-\u{1CF46}\u{1CF50}-\u{1CFC3}\u{1D000}-\u{1D0F5}\u{1D100}-\u{1D126}\u{1D129}-\u{1D1EA}\u{1D200}-\u{1D245}\u{1D2C0}-\u{1D2D3}\u{1D2E0}-\u{1D2F3}\u{1D300}-\u{1D356}\u{1D360}-\u{1D378}\u{1D400}-\u{1D454}\u{1D456}-\u{1D49C}\u{1D49E}\u{1D49F}\u{1D4A2}\u{1D4A5}\u{1D4A6}\u{1D4A9}-\u{1D4AC}\u{1D4AE}-\u{1D4B9}\u{1D4BB}\u{1D4BD}-\u{1D4C3}\u{1D4C5}-\u{1D505}\u{1D507}-\u{1D50A}\u{1D50D}-\u{1D514}\u{1D516}-\u{1D51C}\u{1D51E}-\u{1D539}\u{1D53B}-\u{1D53E}\u{1D540}-\u{1D544}\u{1D546}\u{1D54A}-\u{1D550}\u{1D552}-\u{1D6A5}\u{1D6A8}-\u{1D7CB}\u{1D7CE}-\u{1DA8B}\u{1DA9B}-\u{1DA9F}\u{1DAA1}-\u{1DAAF}\u{1DF00}-\u{1DF1E}\u{1DF25}-\u{1DF2A}\u{1E000}-\u{1E006}\u{1E008}-\u{1E018}\u{1E01B}-\u{1E021}\u{1E023}\u{1E024}\u{1E026}-\u{1E02A}\u{1E030}-\u{1E06D}\u{1E08F}\u{1E100}-\u{1E12C}\u{1E130}-\u{1E13D}\u{1E140}-\u{1E149}\u{1E14E}\u{1E14F}\u{1E290}-\u{1E2AE}\u{1E2C0}-\u{1E2F9}\u{1E2FF}\u{1E4D0}-\u{1E4F9}\u{1E5D0}-\u{1E5FA}\u{1E5FF}\u{1E7E0}-\u{1E7E6}\u{1E7E8}-\u{1E7EB}\u{1E7ED}\u{1E7EE}\u{1E7F0}-\u{1E7FE}\u{1E8D0}-\u{1E8D6}\u{1E944}-\u{1E94A}\u{1EEF0}\u{1EEF1}\u{1F000}-\u{1F02B}\u{1F030}-\u{1F093}\u{1F0A0}-\u{1F0AE}\u{1F0B1}-\u{1F0BF}\u{1F0C1}-\u{1F0CF}\u{1F0D1}-\u{1F0F5}\u{1F100}-\u{1F1AD}\u{1F1E6}-\u{1F202}\u{1F210}-\u{1F23B}\u{1F240}-\u{1F248}\u{1F250}\u{1F251}\u{1F260}-\u{1F265}\u{1F300}-\u{1F6D7}\u{1F6DC}-\u{1F6EC}\u{1F6F0}-\u{1F6FC}\u{1F700}-\u{1F776}\u{1F77B}-\u{1F7D9}\u{1F7E0}-\u{1F7EB}\u{1F7F0}\u{1F800}-\u{1F80B}\u{1F810}-\u{1F847}\u{1F850}-\u{1F859}\u{1F860}-\u{1F887}\u{1F890}-\u{1F8AD}\u{1F8B0}-\u{1F8BB}\u{1F8C0}\u{1F8C1}\u{1F900}-\u{1FA53}\u{1FA60}-\u{1FA6D}\u{1FA70}-\u{1FA7C}\u{1FA80}-\u{1FA89}\u{1FA8F}-\u{1FAC6}\u{1FACE}-\u{1FADC}\u{1FADF}-\u{1FAE9}\u{1FAF0}-\u{1FAF8}\u{1FB00}-\u{1FB92}\u{1FB94}-\u{1FBF9}\u{20000}-\u{2A6DF}\u{2A700}-\u{2B739}\u{2B740}-\u{2B81D}\u{2B820}-\u{2CEA1}\u{2CEB0}-\u{2EBE0}\u{2EBF0}-\u{2EE5D}\u{2F800}-\u{2FA1D}\u{30000}-\u{3134A}\u{31350}-\u{323AF}\u{E0001}\u{E0020}-\u{E007F}\u{E0100}-\u{E01EF}\u{F0000}-\u{FFFFD}\u{100000}-\u{10FFFD}]*$/u;
const bidiS6 = /[0-9A-Za-z\xAA\xB2\xB3\xB5\xB9\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02B8\u02BB-\u02C1\u02D0\u02D1\u02E0-\u02E4\u02EE\u0370-\u0373\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0482\u048A-\u052F\u0531-\u0556\u0559-\u0589\u06F0-\u06F9\u0903-\u0939\u093B\u093D-\u0940\u0949-\u094C\u094E-\u0950\u0958-\u0961\u0964-\u0980\u0982\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD-\u09C0\u09C7\u09C8\u09CB\u09CC\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E1\u09E6-\u09F1\u09F4-\u09FA\u09FC\u09FD\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3E-\u0A40\u0A59-\u0A5C\u0A5E\u0A66-\u0A6F\u0A72-\u0A74\u0A76\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD-\u0AC0\u0AC9\u0ACB\u0ACC\u0AD0\u0AE0\u0AE1\u0AE6-\u0AF0\u0AF9\u0B02\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B3E\u0B40\u0B47\u0B48\u0B4B\u0B4C\u0B57\u0B5C\u0B5D\u0B5F-\u0B61\u0B66-\u0B77\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE\u0BBF\u0BC1\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCC\u0BD0\u0BD7\u0BE6-\u0BF2\u0C01-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C41-\u0C44\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C66-\u0C6F\u0C77\u0C7F\u0C80\u0C82-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD-\u0CC4\u0CC6-\u0CC8\u0CCA\u0CCB\u0CD5\u0CD6\u0CDD\u0CDE\u0CE0\u0CE1\u0CE6-\u0CEF\u0CF1-\u0CF3\u0D02-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D40\u0D46-\u0D48\u0D4A-\u0D4C\u0D4E\u0D4F\u0D54-\u0D61\u0D66-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCF-\u0DD1\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2-\u0DF4\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E4F-\u0E5B\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00-\u0F17\u0F1A-\u0F34\u0F36\u0F38\u0F3E-\u0F47\u0F49-\u0F6C\u0F7F\u0F85\u0F88-\u0F8C\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE-\u0FDA\u1000-\u102C\u1031\u1038\u103B\u103C\u103F-\u1057\u105A-\u105D\u1061-\u1070\u1075-\u1081\u1083\u1084\u1087-\u108C\u108E-\u109C\u109E-\u10C5\u10C7\u10CD\u10D0-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1360-\u137C\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u167F\u1681-\u169A\u16A0-\u16F8\u1700-\u1711\u1715\u171F-\u1731\u1734-\u1736\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17B6\u17BE-\u17C5\u17C7\u17C8\u17D4-\u17DA\u17DC\u17E0-\u17E9\u1810-\u1819\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1923-\u1926\u1929-\u192B\u1930\u1931\u1933-\u1938\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A16\u1A19\u1A1A\u1A1E-\u1A55\u1A57\u1A61\u1A63\u1A64\u1A6D-\u1A72\u1A80-\u1A89\u1A90-\u1A99\u1AA0-\u1AAD\u1B04-\u1B33\u1B35\u1B3B\u1B3D-\u1B41\u1B43-\u1B4C\u1B4E-\u1B6A\u1B74-\u1B7F\u1B82-\u1BA1\u1BA6\u1BA7\u1BAA\u1BAE-\u1BE5\u1BE7\u1BEA-\u1BEC\u1BEE\u1BF2\u1BF3\u1BFC-\u1C2B\u1C34\u1C35\u1C3B-\u1C49\u1C4D-\u1C8A\u1C90-\u1CBA\u1CBD-\u1CC7\u1CD3\u1CE1\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5-\u1CF7\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200E\u2070\u2071\u2074-\u2079\u207F-\u2089\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u214F\u2160-\u2188\u2336-\u237A\u2395\u2488-\u24E9\u26AC\u2800-\u28FF\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D70\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u302E\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u3190-\u31BF\u31F0-\u321C\u3220-\u324F\u3260-\u327B\u327F-\u32B0\u32C0-\u32CB\u32D0-\u3376\u337B-\u33DD\u33E0-\u33FE\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA60C\uA610-\uA62B\uA640-\uA66E\uA680-\uA69D\uA6A0-\uA6EF\uA6F2-\uA6F7\uA722-\uA787\uA789-\uA7CD\uA7D0\uA7D1\uA7D3\uA7D5-\uA7DC\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA824\uA827\uA830-\uA837\uA840-\uA873\uA880-\uA8C3\uA8CE-\uA8D9\uA8F2-\uA8FE\uA900-\uA925\uA92E-\uA946\uA952\uA953\uA95F-\uA97C\uA983-\uA9B2\uA9B4\uA9B5\uA9BA\uA9BB\uA9BE-\uA9CD\uA9CF-\uA9D9\uA9DE-\uA9E4\uA9E6-\uA9FE\uAA00-\uAA28\uAA2F\uAA30\uAA33\uAA34\uAA40-\uAA42\uAA44-\uAA4B\uAA4D\uAA50-\uAA59\uAA5C-\uAA7B\uAA7D-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAAEB\uAAEE-\uAAF5\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB69\uAB70-\uABE4\uABE6\uABE7\uABE9-\uABEC\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uD800-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFF10-\uFF19\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC\u{10000}-\u{1000B}\u{1000D}-\u{10026}\u{10028}-\u{1003A}\u{1003C}\u{1003D}\u{1003F}-\u{1004D}\u{10050}-\u{1005D}\u{10080}-\u{100FA}\u{10100}\u{10102}\u{10107}-\u{10133}\u{10137}-\u{1013F}\u{1018D}\u{1018E}\u{101D0}-\u{101FC}\u{10280}-\u{1029C}\u{102A0}-\u{102D0}\u{102E1}-\u{102FB}\u{10300}-\u{10323}\u{1032D}-\u{1034A}\u{10350}-\u{10375}\u{10380}-\u{1039D}\u{1039F}-\u{103C3}\u{103C8}-\u{103D5}\u{10400}-\u{1049D}\u{104A0}-\u{104A9}\u{104B0}-\u{104D3}\u{104D8}-\u{104FB}\u{10500}-\u{10527}\u{10530}-\u{10563}\u{1056F}-\u{1057A}\u{1057C}-\u{1058A}\u{1058C}-\u{10592}\u{10594}\u{10595}\u{10597}-\u{105A1}\u{105A3}-\u{105B1}\u{105B3}-\u{105B9}\u{105BB}\u{105BC}\u{105C0}-\u{105F3}\u{10600}-\u{10736}\u{10740}-\u{10755}\u{10760}-\u{10767}\u{10780}-\u{10785}\u{10787}-\u{107B0}\u{107B2}-\u{107BA}\u{11000}\u{11002}-\u{11037}\u{11047}-\u{1104D}\u{11066}-\u{1106F}\u{11071}\u{11072}\u{11075}\u{11082}-\u{110B2}\u{110B7}\u{110B8}\u{110BB}-\u{110C1}\u{110CD}\u{110D0}-\u{110E8}\u{110F0}-\u{110F9}\u{11103}-\u{11126}\u{1112C}\u{11136}-\u{11147}\u{11150}-\u{11172}\u{11174}-\u{11176}\u{11182}-\u{111B5}\u{111BF}-\u{111C8}\u{111CD}\u{111CE}\u{111D0}-\u{111DF}\u{111E1}-\u{111F4}\u{11200}-\u{11211}\u{11213}-\u{1122E}\u{11232}\u{11233}\u{11235}\u{11238}-\u{1123D}\u{1123F}\u{11240}\u{11280}-\u{11286}\u{11288}\u{1128A}-\u{1128D}\u{1128F}-\u{1129D}\u{1129F}-\u{112A9}\u{112B0}-\u{112DE}\u{112E0}-\u{112E2}\u{112F0}-\u{112F9}\u{11302}\u{11303}\u{11305}-\u{1130C}\u{1130F}\u{11310}\u{11313}-\u{11328}\u{1132A}-\u{11330}\u{11332}\u{11333}\u{11335}-\u{11339}\u{1133D}-\u{1133F}\u{11341}-\u{11344}\u{11347}\u{11348}\u{1134B}-\u{1134D}\u{11350}\u{11357}\u{1135D}-\u{11363}\u{11380}-\u{11389}\u{1138B}\u{1138E}\u{11390}-\u{113B5}\u{113B7}-\u{113BA}\u{113C2}\u{113C5}\u{113C7}-\u{113CA}\u{113CC}\u{113CD}\u{113CF}\u{113D1}\u{113D3}-\u{113D5}\u{113D7}\u{113D8}\u{11400}-\u{11437}\u{11440}\u{11441}\u{11445}\u{11447}-\u{1145B}\u{1145D}\u{1145F}-\u{11461}\u{11480}-\u{114B2}\u{114B9}\u{114BB}-\u{114BE}\u{114C1}\u{114C4}-\u{114C7}\u{114D0}-\u{114D9}\u{11580}-\u{115B1}\u{115B8}-\u{115BB}\u{115BE}\u{115C1}-\u{115DB}\u{11600}-\u{11632}\u{1163B}\u{1163C}\u{1163E}\u{11641}-\u{11644}\u{11650}-\u{11659}\u{11680}-\u{116AA}\u{116AC}\u{116AE}\u{116AF}\u{116B6}\u{116B8}\u{116B9}\u{116C0}-\u{116C9}\u{116D0}-\u{116E3}\u{11700}-\u{1171A}\u{1171E}\u{11720}\u{11721}\u{11726}\u{11730}-\u{11746}\u{11800}-\u{1182E}\u{11838}\u{1183B}\u{118A0}-\u{118F2}\u{118FF}-\u{11906}\u{11909}\u{1190C}-\u{11913}\u{11915}\u{11916}\u{11918}-\u{11935}\u{11937}\u{11938}\u{1193D}\u{1193F}-\u{11942}\u{11944}-\u{11946}\u{11950}-\u{11959}\u{119A0}-\u{119A7}\u{119AA}-\u{119D3}\u{119DC}-\u{119DF}\u{119E1}-\u{119E4}\u{11A00}\u{11A07}\u{11A08}\u{11A0B}-\u{11A32}\u{11A39}\u{11A3A}\u{11A3F}-\u{11A46}\u{11A50}\u{11A57}\u{11A58}\u{11A5C}-\u{11A89}\u{11A97}\u{11A9A}-\u{11AA2}\u{11AB0}-\u{11AF8}\u{11B00}-\u{11B09}\u{11BC0}-\u{11BE1}\u{11BF0}-\u{11BF9}\u{11C00}-\u{11C08}\u{11C0A}-\u{11C2F}\u{11C3E}-\u{11C45}\u{11C50}-\u{11C6C}\u{11C70}-\u{11C8F}\u{11CA9}\u{11CB1}\u{11CB4}\u{11D00}-\u{11D06}\u{11D08}\u{11D09}\u{11D0B}-\u{11D30}\u{11D46}\u{11D50}-\u{11D59}\u{11D60}-\u{11D65}\u{11D67}\u{11D68}\u{11D6A}-\u{11D8E}\u{11D93}\u{11D94}\u{11D96}\u{11D98}\u{11DA0}-\u{11DA9}\u{11EE0}-\u{11EF2}\u{11EF5}-\u{11EF8}\u{11F02}-\u{11F10}\u{11F12}-\u{11F35}\u{11F3E}\u{11F3F}\u{11F41}\u{11F43}-\u{11F59}\u{11FB0}\u{11FC0}-\u{11FD4}\u{11FFF}-\u{12399}\u{12400}-\u{1246E}\u{12470}-\u{12474}\u{12480}-\u{12543}\u{12F90}-\u{12FF2}\u{13000}-\u{1343F}\u{13441}-\u{13446}\u{13460}-\u{143FA}\u{14400}-\u{14646}\u{16100}-\u{1611D}\u{1612A}-\u{1612C}\u{16130}-\u{16139}\u{16800}-\u{16A38}\u{16A40}-\u{16A5E}\u{16A60}-\u{16A69}\u{16A6E}-\u{16ABE}\u{16AC0}-\u{16AC9}\u{16AD0}-\u{16AED}\u{16AF5}\u{16B00}-\u{16B2F}\u{16B37}-\u{16B45}\u{16B50}-\u{16B59}\u{16B5B}-\u{16B61}\u{16B63}-\u{16B77}\u{16B7D}-\u{16B8F}\u{16D40}-\u{16D79}\u{16E40}-\u{16E9A}\u{16F00}-\u{16F4A}\u{16F50}-\u{16F87}\u{16F93}-\u{16F9F}\u{16FE0}\u{16FE1}\u{16FE3}\u{16FF0}\u{16FF1}\u{17000}-\u{187F7}\u{18800}-\u{18CD5}\u{18CFF}-\u{18D08}\u{1AFF0}-\u{1AFF3}\u{1AFF5}-\u{1AFFB}\u{1AFFD}\u{1AFFE}\u{1B000}-\u{1B122}\u{1B132}\u{1B150}-\u{1B152}\u{1B155}\u{1B164}-\u{1B167}\u{1B170}-\u{1B2FB}\u{1BC00}-\u{1BC6A}\u{1BC70}-\u{1BC7C}\u{1BC80}-\u{1BC88}\u{1BC90}-\u{1BC99}\u{1BC9C}\u{1BC9F}\u{1CCD6}-\u{1CCF9}\u{1CF50}-\u{1CFC3}\u{1D000}-\u{1D0F5}\u{1D100}-\u{1D126}\u{1D129}-\u{1D166}\u{1D16A}-\u{1D172}\u{1D183}\u{1D184}\u{1D18C}-\u{1D1A9}\u{1D1AE}-\u{1D1E8}\u{1D2C0}-\u{1D2D3}\u{1D2E0}-\u{1D2F3}\u{1D360}-\u{1D378}\u{1D400}-\u{1D454}\u{1D456}-\u{1D49C}\u{1D49E}\u{1D49F}\u{1D4A2}\u{1D4A5}\u{1D4A6}\u{1D4A9}-\u{1D4AC}\u{1D4AE}-\u{1D4B9}\u{1D4BB}\u{1D4BD}-\u{1D4C3}\u{1D4C5}-\u{1D505}\u{1D507}-\u{1D50A}\u{1D50D}-\u{1D514}\u{1D516}-\u{1D51C}\u{1D51E}-\u{1D539}\u{1D53B}-\u{1D53E}\u{1D540}-\u{1D544}\u{1D546}\u{1D54A}-\u{1D550}\u{1D552}-\u{1D6A5}\u{1D6A8}-\u{1D6C0}\u{1D6C2}-\u{1D6DA}\u{1D6DC}-\u{1D6FA}\u{1D6FC}-\u{1D714}\u{1D716}-\u{1D734}\u{1D736}-\u{1D74E}\u{1D750}-\u{1D76E}\u{1D770}-\u{1D788}\u{1D78A}-\u{1D7A8}\u{1D7AA}-\u{1D7C2}\u{1D7C4}-\u{1D7CB}\u{1D7CE}-\u{1D9FF}\u{1DA37}-\u{1DA3A}\u{1DA6D}-\u{1DA74}\u{1DA76}-\u{1DA83}\u{1DA85}-\u{1DA8B}\u{1DF00}-\u{1DF1E}\u{1DF25}-\u{1DF2A}\u{1E030}-\u{1E06D}\u{1E100}-\u{1E12C}\u{1E137}-\u{1E13D}\u{1E140}-\u{1E149}\u{1E14E}\u{1E14F}\u{1E290}-\u{1E2AD}\u{1E2C0}-\u{1E2EB}\u{1E2F0}-\u{1E2F9}\u{1E4D0}-\u{1E4EB}\u{1E4F0}-\u{1E4F9}\u{1E5D0}-\u{1E5ED}\u{1E5F0}-\u{1E5FA}\u{1E5FF}\u{1E7E0}-\u{1E7E6}\u{1E7E8}-\u{1E7EB}\u{1E7ED}\u{1E7EE}\u{1E7F0}-\u{1E7FE}\u{1F100}-\u{1F10A}\u{1F110}-\u{1F12E}\u{1F130}-\u{1F169}\u{1F170}-\u{1F1AC}\u{1F1E6}-\u{1F202}\u{1F210}-\u{1F23B}\u{1F240}-\u{1F248}\u{1F250}\u{1F251}\u{1FBF0}-\u{1FBF9}\u{20000}-\u{2A6DF}\u{2A700}-\u{2B739}\u{2B740}-\u{2B81D}\u{2B820}-\u{2CEA1}\u{2CEB0}-\u{2EBE0}\u{2EBF0}-\u{2EE5D}\u{2F800}-\u{2FA1D}\u{30000}-\u{3134A}\u{31350}-\u{323AF}\u{F0000}-\u{FFFFD}\u{100000}-\u{10FFFD}][\u0300-\u036F\u0483-\u0489\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u0897-\u089F\u08CA-\u08E1\u08E3-\u0902\u093A\u093C\u0941-\u0948\u094D\u0951-\u0957\u0962\u0963\u0981\u09BC\u09C1-\u09C4\u09CD\u09E2\u09E3\u09FE\u0A01\u0A02\u0A3C\u0A41\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81\u0A82\u0ABC\u0AC1-\u0AC5\u0AC7\u0AC8\u0ACD\u0AE2\u0AE3\u0AFA-\u0AFF\u0B01\u0B3C\u0B3F\u0B41-\u0B44\u0B4D\u0B55\u0B56\u0B62\u0B63\u0B82\u0BC0\u0BCD\u0C00\u0C04\u0C3C\u0C3E-\u0C40\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C81\u0CBC\u0CCC\u0CCD\u0CE2\u0CE3\u0D00\u0D01\u0D3B\u0D3C\u0D41-\u0D44\u0D4D\u0D62\u0D63\u0D81\u0DCA\u0DD2-\u0DD4\u0DD6\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EBC\u0EC8-\u0ECE\u0F18\u0F19\u0F35\u0F37\u0F39\u0F71-\u0F7E\u0F80-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102D-\u1030\u1032-\u1037\u1039\u103A\u103D\u103E\u1058\u1059\u105E-\u1060\u1071-\u1074\u1082\u1085\u1086\u108D\u109D\u135D-\u135F\u1712-\u1714\u1732\u1733\u1752\u1753\u1772\u1773\u17B4\u17B5\u17B7-\u17BD\u17C6\u17C9-\u17D3\u17DD\u180B-\u180D\u180F\u1885\u1886\u18A9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193B\u1A17\u1A18\u1A1B\u1A56\u1A58-\u1A5E\u1A60\u1A62\u1A65-\u1A6C\u1A73-\u1A7C\u1A7F\u1AB0-\u1ACE\u1B00-\u1B03\u1B34\u1B36-\u1B3A\u1B3C\u1B42\u1B6B-\u1B73\u1B80\u1B81\u1BA2-\u1BA5\u1BA8\u1BA9\u1BAB-\u1BAD\u1BE6\u1BE8\u1BE9\u1BED\u1BEF-\u1BF1\u1C2C-\u1C33\u1C36\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE0\u1CE2-\u1CE8\u1CED\u1CF4\u1CF8\u1CF9\u1DC0-\u1DFF\u20D0-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302D\u3099\u309A\uA66F-\uA672\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA825\uA826\uA82C\uA8C4\uA8C5\uA8E0-\uA8F1\uA8FF\uA926-\uA92D\uA947-\uA951\uA980-\uA982\uA9B3\uA9B6-\uA9B9\uA9BC\uA9BD\uA9E5\uAA29-\uAA2E\uAA31\uAA32\uAA35\uAA36\uAA43\uAA4C\uAA7C\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEC\uAAED\uAAF6\uABE5\uABE8\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F\u{101FD}\u{102E0}\u{10376}-\u{1037A}\u{10A01}-\u{10A03}\u{10A05}\u{10A06}\u{10A0C}-\u{10A0F}\u{10A38}-\u{10A3A}\u{10A3F}\u{10AE5}\u{10AE6}\u{10D24}-\u{10D27}\u{10D69}-\u{10D6D}\u{10EAB}\u{10EAC}\u{10EFC}-\u{10EFF}\u{10F46}-\u{10F50}\u{10F82}-\u{10F85}\u{11001}\u{11038}-\u{11046}\u{11070}\u{11073}\u{11074}\u{1107F}-\u{11081}\u{110B3}-\u{110B6}\u{110B9}\u{110BA}\u{110C2}\u{11100}-\u{11102}\u{11127}-\u{1112B}\u{1112D}-\u{11134}\u{11173}\u{11180}\u{11181}\u{111B6}-\u{111BE}\u{111C9}-\u{111CC}\u{111CF}\u{1122F}-\u{11231}\u{11234}\u{11236}\u{11237}\u{1123E}\u{11241}\u{112DF}\u{112E3}-\u{112EA}\u{11300}\u{11301}\u{1133B}\u{1133C}\u{11340}\u{11366}-\u{1136C}\u{11370}-\u{11374}\u{113BB}-\u{113C0}\u{113CE}\u{113D0}\u{113D2}\u{113E1}\u{113E2}\u{11438}-\u{1143F}\u{11442}-\u{11444}\u{11446}\u{1145E}\u{114B3}-\u{114B8}\u{114BA}\u{114BF}\u{114C0}\u{114C2}\u{114C3}\u{115B2}-\u{115B5}\u{115BC}\u{115BD}\u{115BF}\u{115C0}\u{115DC}\u{115DD}\u{11633}-\u{1163A}\u{1163D}\u{1163F}\u{11640}\u{116AB}\u{116AD}\u{116B0}-\u{116B5}\u{116B7}\u{1171D}\u{1171F}\u{11722}-\u{11725}\u{11727}-\u{1172B}\u{1182F}-\u{11837}\u{11839}\u{1183A}\u{1193B}\u{1193C}\u{1193E}\u{11943}\u{119D4}-\u{119D7}\u{119DA}\u{119DB}\u{119E0}\u{11A01}-\u{11A06}\u{11A09}\u{11A0A}\u{11A33}-\u{11A38}\u{11A3B}-\u{11A3E}\u{11A47}\u{11A51}-\u{11A56}\u{11A59}-\u{11A5B}\u{11A8A}-\u{11A96}\u{11A98}\u{11A99}\u{11C30}-\u{11C36}\u{11C38}-\u{11C3D}\u{11C92}-\u{11CA7}\u{11CAA}-\u{11CB0}\u{11CB2}\u{11CB3}\u{11CB5}\u{11CB6}\u{11D31}-\u{11D36}\u{11D3A}\u{11D3C}\u{11D3D}\u{11D3F}-\u{11D45}\u{11D47}\u{11D90}\u{11D91}\u{11D95}\u{11D97}\u{11EF3}\u{11EF4}\u{11F00}\u{11F01}\u{11F36}-\u{11F3A}\u{11F40}\u{11F42}\u{11F5A}\u{13440}\u{13447}-\u{13455}\u{1611E}-\u{16129}\u{1612D}-\u{1612F}\u{16AF0}-\u{16AF4}\u{16B30}-\u{16B36}\u{16F4F}\u{16F8F}-\u{16F92}\u{16FE4}\u{1BC9D}\u{1BC9E}\u{1CF00}-\u{1CF2D}\u{1CF30}-\u{1CF46}\u{1D167}-\u{1D169}\u{1D17B}-\u{1D182}\u{1D185}-\u{1D18B}\u{1D1AA}-\u{1D1AD}\u{1D242}-\u{1D244}\u{1DA00}-\u{1DA36}\u{1DA3B}-\u{1DA6C}\u{1DA75}\u{1DA84}\u{1DA9B}-\u{1DA9F}\u{1DAA1}-\u{1DAAF}\u{1E000}-\u{1E006}\u{1E008}-\u{1E018}\u{1E01B}-\u{1E021}\u{1E023}\u{1E024}\u{1E026}-\u{1E02A}\u{1E08F}\u{1E130}-\u{1E136}\u{1E2AE}\u{1E2EC}-\u{1E2EF}\u{1E4EC}-\u{1E4EF}\u{1E5EE}\u{1E5EF}\u{1E8D0}-\u{1E8D6}\u{1E944}-\u{1E94A}\u{E0100}-\u{E01EF}]*$/u;

module.exports = {
    combiningMarks,
  combiningClassVirama,
  validZWNJ,
  bidiDomain,
  bidiS1LTR,
  bidiS1RTL,
  bidiS2,
  bidiS3,
  bidiS4EN,
  bidiS4AN,
  bidiS5,
  bidiS6
  };


/***/ }),

/***/ 379:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   decode: () => (/* binding */ decode),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   encode: () => (/* binding */ encode),
/* harmony export */   toASCII: () => (/* binding */ toASCII),
/* harmony export */   toUnicode: () => (/* binding */ toUnicode),
/* harmony export */   ucs2decode: () => (/* binding */ ucs2decode),
/* harmony export */   ucs2encode: () => (/* binding */ ucs2encode)
/* harmony export */ });


/** Highest positive signed 32-bit float value */
const maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1

/** Bootstring parameters */
const base = 36;
const tMin = 1;
const tMax = 26;
const skew = 38;
const damp = 700;
const initialBias = 72;
const initialN = 128; // 0x80
const delimiter = '-'; // '\x2D'

/** Regular expressions */
const regexPunycode = /^xn--/;
const regexNonASCII = /[^\0-\x7F]/; // Note: U+007F DEL is excluded too.
const regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g; // RFC 3490 separators

/** Error messages */
const errors = {
	'overflow': 'Overflow: input needs wider integers to process',
	'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
	'invalid-input': 'Invalid input'
};

/** Convenience shortcuts */
const baseMinusTMin = base - tMin;
const floor = Math.floor;
const stringFromCharCode = String.fromCharCode;

/*--------------------------------------------------------------------------*/

/**
 * A generic error utility function.
 * @private
 * @param {String} type The error type.
 * @returns {Error} Throws a `RangeError` with the applicable error message.
 */
function error(type) {
	throw new RangeError(errors[type]);
}

/**
 * A generic `Array#map` utility function.
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} callback The function that gets called for every array
 * item.
 * @returns {Array} A new array of values returned by the callback function.
 */
function map(array, callback) {
	const result = [];
	let length = array.length;
	while (length--) {
		result[length] = callback(array[length]);
	}
	return result;
}

/**
 * A simple `Array#map`-like wrapper to work with domain name strings or email
 * addresses.
 * @private
 * @param {String} domain The domain name or email address.
 * @param {Function} callback The function that gets called for every
 * character.
 * @returns {String} A new string of characters returned by the callback
 * function.
 */
function mapDomain(domain, callback) {
	const parts = domain.split('@');
	let result = '';
	if (parts.length > 1) {
		// In email addresses, only the domain name should be punycoded. Leave
		// the local part (i.e. everything up to `@`) intact.
		result = parts[0] + '@';
		domain = parts[1];
	}
	// Avoid `split(regex)` for IE8 compatibility. See #17.
	domain = domain.replace(regexSeparators, '\x2E');
	const labels = domain.split('.');
	const encoded = map(labels, callback).join('.');
	return result + encoded;
}

/**
 * Creates an array containing the numeric code points of each Unicode
 * character in the string. While JavaScript uses UCS-2 internally,
 * this function will convert a pair of surrogate halves (each of which
 * UCS-2 exposes as separate characters) into a single code point,
 * matching UTF-16.
 * @see `punycode.ucs2.encode`
 * @see <https://mathiasbynens.be/notes/javascript-encoding>
 * @memberOf punycode.ucs2
 * @name decode
 * @param {String} string The Unicode input string (UCS-2).
 * @returns {Array} The new array of code points.
 */
function ucs2decode(string) {
	const output = [];
	let counter = 0;
	const length = string.length;
	while (counter < length) {
		const value = string.charCodeAt(counter++);
		if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
			// It's a high surrogate, and there is a next character.
			const extra = string.charCodeAt(counter++);
			if ((extra & 0xFC00) == 0xDC00) { // Low surrogate.
				output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
			} else {
				// It's an unmatched surrogate; only append this code unit, in case the
				// next code unit is the high surrogate of a surrogate pair.
				output.push(value);
				counter--;
			}
		} else {
			output.push(value);
		}
	}
	return output;
}

/**
 * Creates a string based on an array of numeric code points.
 * @see `punycode.ucs2.decode`
 * @memberOf punycode.ucs2
 * @name encode
 * @param {Array} codePoints The array of numeric code points.
 * @returns {String} The new Unicode string (UCS-2).
 */
const ucs2encode = codePoints => String.fromCodePoint(...codePoints);

/**
 * Converts a basic code point into a digit/integer.
 * @see `digitToBasic()`
 * @private
 * @param {Number} codePoint The basic numeric code point value.
 * @returns {Number} The numeric value of a basic code point (for use in
 * representing integers) in the range `0` to `base - 1`, or `base` if
 * the code point does not represent a value.
 */
const basicToDigit = function(codePoint) {
	if (codePoint >= 0x30 && codePoint < 0x3A) {
		return 26 + (codePoint - 0x30);
	}
	if (codePoint >= 0x41 && codePoint < 0x5B) {
		return codePoint - 0x41;
	}
	if (codePoint >= 0x61 && codePoint < 0x7B) {
		return codePoint - 0x61;
	}
	return base;
};

/**
 * Converts a digit/integer into a basic code point.
 * @see `basicToDigit()`
 * @private
 * @param {Number} digit The numeric value of a basic code point.
 * @returns {Number} The basic code point whose value (when used for
 * representing integers) is `digit`, which needs to be in the range
 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
 * used; else, the lowercase form is used. The behavior is undefined
 * if `flag` is non-zero and `digit` has no uppercase form.
 */
const digitToBasic = function(digit, flag) {
	//  0..25 map to ASCII a..z or A..Z
	// 26..35 map to ASCII 0..9
	return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
};

/**
 * Bias adaptation function as per section 3.4 of RFC 3492.
 * https://tools.ietf.org/html/rfc3492#section-3.4
 * @private
 */
const adapt = function(delta, numPoints, firstTime) {
	let k = 0;
	delta = firstTime ? floor(delta / damp) : delta >> 1;
	delta += floor(delta / numPoints);
	for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
		delta = floor(delta / baseMinusTMin);
	}
	return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
};

/**
 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
 * symbols.
 * @memberOf punycode
 * @param {String} input The Punycode string of ASCII-only symbols.
 * @returns {String} The resulting string of Unicode symbols.
 */
const decode = function(input) {
	// Don't use UCS-2.
	const output = [];
	const inputLength = input.length;
	let i = 0;
	let n = initialN;
	let bias = initialBias;

	// Handle the basic code points: let `basic` be the number of input code
	// points before the last delimiter, or `0` if there is none, then copy
	// the first basic code points to the output.

	let basic = input.lastIndexOf(delimiter);
	if (basic < 0) {
		basic = 0;
	}

	for (let j = 0; j < basic; ++j) {
		// if it's not a basic code point
		if (input.charCodeAt(j) >= 0x80) {
			error('not-basic');
		}
		output.push(input.charCodeAt(j));
	}

	// Main decoding loop: start just after the last delimiter if any basic code
	// points were copied; start at the beginning otherwise.

	for (let index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

		// `index` is the index of the next character to be consumed.
		// Decode a generalized variable-length integer into `delta`,
		// which gets added to `i`. The overflow checking is easier
		// if we increase `i` as we go, then subtract off its starting
		// value at the end to obtain `delta`.
		const oldi = i;
		for (let w = 1, k = base; /* no condition */; k += base) {

			if (index >= inputLength) {
				error('invalid-input');
			}

			const digit = basicToDigit(input.charCodeAt(index++));

			if (digit >= base) {
				error('invalid-input');
			}
			if (digit > floor((maxInt - i) / w)) {
				error('overflow');
			}

			i += digit * w;
			const t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

			if (digit < t) {
				break;
			}

			const baseMinusT = base - t;
			if (w > floor(maxInt / baseMinusT)) {
				error('overflow');
			}

			w *= baseMinusT;

		}

		const out = output.length + 1;
		bias = adapt(i - oldi, out, oldi == 0);

		// `i` was supposed to wrap around from `out` to `0`,
		// incrementing `n` each time, so we'll fix that now:
		if (floor(i / out) > maxInt - n) {
			error('overflow');
		}

		n += floor(i / out);
		i %= out;

		// Insert `n` at position `i` of the output.
		output.splice(i++, 0, n);

	}

	return String.fromCodePoint(...output);
};

/**
 * Converts a string of Unicode symbols (e.g. a domain name label) to a
 * Punycode string of ASCII-only symbols.
 * @memberOf punycode
 * @param {String} input The string of Unicode symbols.
 * @returns {String} The resulting Punycode string of ASCII-only symbols.
 */
const encode = function(input) {
	const output = [];

	// Convert the input in UCS-2 to an array of Unicode code points.
	input = ucs2decode(input);

	// Cache the length.
	const inputLength = input.length;

	// Initialize the state.
	let n = initialN;
	let delta = 0;
	let bias = initialBias;

	// Handle the basic code points.
	for (const currentValue of input) {
		if (currentValue < 0x80) {
			output.push(stringFromCharCode(currentValue));
		}
	}

	const basicLength = output.length;
	let handledCPCount = basicLength;

	// `handledCPCount` is the number of code points that have been handled;
	// `basicLength` is the number of basic code points.

	// Finish the basic string with a delimiter unless it's empty.
	if (basicLength) {
		output.push(delimiter);
	}

	// Main encoding loop:
	while (handledCPCount < inputLength) {

		// All non-basic code points < n have been handled already. Find the next
		// larger one:
		let m = maxInt;
		for (const currentValue of input) {
			if (currentValue >= n && currentValue < m) {
				m = currentValue;
			}
		}

		// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
		// but guard against overflow.
		const handledCPCountPlusOne = handledCPCount + 1;
		if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
			error('overflow');
		}

		delta += (m - n) * handledCPCountPlusOne;
		n = m;

		for (const currentValue of input) {
			if (currentValue < n && ++delta > maxInt) {
				error('overflow');
			}
			if (currentValue === n) {
				// Represent delta as a generalized variable-length integer.
				let q = delta;
				for (let k = base; /* no condition */; k += base) {
					const t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
					if (q < t) {
						break;
					}
					const qMinusT = q - t;
					const baseMinusT = base - t;
					output.push(
						stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
					);
					q = floor(qMinusT / baseMinusT);
				}

				output.push(stringFromCharCode(digitToBasic(q, 0)));
				bias = adapt(delta, handledCPCountPlusOne, handledCPCount === basicLength);
				delta = 0;
				++handledCPCount;
			}
		}

		++delta;
		++n;

	}
	return output.join('');
};

/**
 * Converts a Punycode string representing a domain name or an email address
 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
 * it doesn't matter if you call it on a string that has already been
 * converted to Unicode.
 * @memberOf punycode
 * @param {String} input The Punycoded domain name or email address to
 * convert to Unicode.
 * @returns {String} The Unicode representation of the given Punycode
 * string.
 */
const toUnicode = function(input) {
	return mapDomain(input, function(string) {
		return regexPunycode.test(string)
			? decode(string.slice(4).toLowerCase())
			: string;
	});
};

/**
 * Converts a Unicode string representing a domain name or an email address to
 * Punycode. Only the non-ASCII parts of the domain name will be converted,
 * i.e. it doesn't matter if you call it with a domain that's already in
 * ASCII.
 * @memberOf punycode
 * @param {String} input The domain name or email address to convert, as a
 * Unicode string.
 * @returns {String} The Punycode representation of the given domain name or
 * email address.
 */
const toASCII = function(input) {
	return mapDomain(input, function(string) {
		return regexNonASCII.test(string)
			? 'xn--' + encode(string)
			: string;
	});
};

/*--------------------------------------------------------------------------*/

/** Define the public API */
const punycode = {
	/**
	 * A string representing the current Punycode.js version number.
	 * @memberOf punycode
	 * @type String
	 */
	'version': '2.3.1',
	/**
	 * An object of methods to convert from JavaScript's internal character
	 * representation (UCS-2) to Unicode code points, and back.
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode
	 * @type Object
	 */
	'ucs2': {
		'decode': ucs2decode,
		'encode': ucs2encode
	},
	'decode': decode,
	'encode': encode,
	'toASCII': toASCII,
	'toUnicode': toUnicode
};


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (punycode);


/***/ }),

/***/ 380:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const timers_1 = __webpack_require__(425);
const internetModule = __webpack_require__(389);
class WebSocketPolyfill {
    constructor(url, protocols) {
        this.CONNECTING = 0;
        this.OPEN = 1;
        this.CLOSING = 2;
        this.CLOSED = 3;
        this.url = url;
        this.protocols = Array.isArray(protocols) ? protocols : (protocols ? [protocols] : []);
        this.readyState = WebSocketPolyfill.CONNECTING;
        this.bufferedAmount = 0;
        this.extensions = '';
        this.protocol = '';
        // Event handlers
        this.onopen = null;
        this.onclose = null;
        this.onmessage = null;
        this.onerror = null;
        // Internal Lens Studio WebSocket reference
        this._lensWebSocket = null;
        this._messageQueue = [];
        // Initialize WebSocket connection
        this._initializeConnection();
    }
    _initializeConnection() {
        try {
            this._lensWebSocket = internetModule.createWebSocket(this.url, this.protocols);
            if (!this._lensWebSocket) {
                throw new Error("Failed to create WebSocket instance from InternetModule");
            }
            this._setupEventHandlers();
        }
        catch (error) {
            this._triggerError(error);
        }
    }
    _setupEventHandlers() {
        const self = this;
        if (!this._lensWebSocket)
            return;
        this._lensWebSocket.onopen = function (event) {
            self.readyState = WebSocketPolyfill.OPEN;
            self._processMessageQueue();
            const openEvent = {
                type: 'open',
                target: self
            };
            if (self.onopen) {
                self.onopen(openEvent);
            }
        };
        this._lensWebSocket.onmessage = function (event) {
            const data = event ? event.data : null;
            const messageEvent = {
                type: 'message',
                data: data,
                target: self,
                origin: self.url,
                lastEventId: '',
                source: null,
                ports: []
            };
            if (self.onmessage) {
                self.onmessage(messageEvent);
            }
        };
        this._lensWebSocket.onerror = function (error) {
            self._triggerError(new Error(error || "WebSocket connection error"));
        };
        this._lensWebSocket.onclose = function (closeInfo) {
            self.readyState = WebSocketPolyfill.CLOSED;
            const wasClean = closeInfo && closeInfo.code && closeInfo.code === 1000;
            const closeEvent = {
                type: 'close',
                code: (closeInfo && closeInfo.code) ? closeInfo.code : 1006,
                reason: (closeInfo && closeInfo.reason) ? closeInfo.reason : 'Connection closed',
                wasClean: wasClean,
                target: self
            };
            if (self.onclose) {
                self.onclose(closeEvent);
            }
        };
        (0, timers_1.setTimeout)(() => {
            if (self.readyState === WebSocketPolyfill.CONNECTING) {
                self._triggerError(new Error("WebSocket connection timeout"));
            }
        }, 5000);
    }
    send(data) {
        if (this.readyState === WebSocketPolyfill.CONNECTING) {
            this._messageQueue.push(data);
            return;
        }
        if (this.readyState !== WebSocketPolyfill.OPEN) {
            throw new Error('WebSocket is not open. Current state: ' + this._getReadyStateString());
        }
        try {
            if (this._lensWebSocket) {
                const textEncode = new TextEncoder();
                const encodedData = textEncode.encode(data);
                this._lensWebSocket.send(encodedData);
            }
        }
        catch (error) {
            this._triggerError(error);
        }
    }
    close(code = 1000, reason = '') {
        if (this.readyState === WebSocketPolyfill.CLOSED ||
            this.readyState === WebSocketPolyfill.CLOSING) {
            return;
        }
        this.readyState = WebSocketPolyfill.CLOSING;
        try {
            if (this._lensWebSocket && this._lensWebSocket.close) {
                this._lensWebSocket.close();
            }
            else {
                this._triggerClose(code, reason, true);
            }
        }
        catch (error) {
            this._triggerClose(code, reason, false);
        }
    }
    addEventListener(type, listener) {
        if (type === 'open')
            this.onopen = listener;
        else if (type === 'close')
            this.onclose = listener;
        else if (type === 'message')
            this.onmessage = listener;
        else if (type === 'error')
            this.onerror = listener;
    }
    removeEventListener(type, listener) {
        if (type === 'open' && this.onopen === listener)
            this.onopen = null;
        else if (type === 'close' && this.onclose === listener)
            this.onclose = null;
        else if (type === 'message' && this.onmessage === listener)
            this.onmessage = null;
        else if (type === 'error' && this.onerror === listener)
            this.onerror = null;
    }
    _processMessageQueue() {
        while (this._messageQueue.length > 0) {
            const message = this._messageQueue.shift();
            if (message && this._lensWebSocket) {
                this._lensWebSocket.send(message);
            }
        }
    }
    _triggerError(error) {
        const errorEvent = {
            type: 'error',
            message: error.message,
            error: error,
            target: this
        };
        if (this.onerror) {
            this.onerror(errorEvent);
        }
        if (this.readyState !== WebSocketPolyfill.CLOSING && this.readyState !== WebSocketPolyfill.CLOSED) {
            this._triggerClose(1006, error.message, false);
        }
    }
    _triggerClose(code, reason, wasClean) {
        this.readyState = WebSocketPolyfill.CLOSED;
        const closeEvent = {
            type: 'close',
            code: code,
            reason: reason,
            wasClean: wasClean,
            target: this
        };
        if (this.onclose) {
            this.onclose(closeEvent);
        }
    }
    _getReadyStateString() {
        switch (this.readyState) {
            case WebSocketPolyfill.CONNECTING: return 'CONNECTING';
            case WebSocketPolyfill.OPEN: return 'OPEN';
            case WebSocketPolyfill.CLOSING: return 'CLOSING';
            case WebSocketPolyfill.CLOSED: return 'CLOSED';
            default: return 'UNKNOWN';
        }
    }
}
// Constants
WebSocketPolyfill.CONNECTING = 0;
WebSocketPolyfill.OPEN = 1;
WebSocketPolyfill.CLOSING = 2;
WebSocketPolyfill.CLOSED = 3;
globalThis.WebSocket = WebSocketPolyfill;


/***/ }),

/***/ 389:
/***/ ((module) => {

"use strict";
module.exports = require("LensStudio:InternetModule");

/***/ }),

/***/ 408:
/***/ ((module) => {

"use strict";

const utf8Encoder = new TextEncoder();
const utf8Decoder = new TextDecoder("utf-8", { ignoreBOM: true });

function utf8Encode(string) {
  return utf8Encoder.encode(string);
}

function utf8DecodeWithoutBOM(bytes) {
  return utf8Decoder.decode(bytes);
}

module.exports = {
  utf8Encode,
  utf8DecodeWithoutBOM
};


/***/ }),

/***/ 409:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Headers = void 0;
const OriginalHeaders = globalThis.Headers;
class Headers {
    constructor(init) {
        this.headersMap = new Map();
        if (init) {
            if (init instanceof Headers) {
                init.forEach((value, name) => {
                    this.append(name, value);
                });
            }
            else if (Array.isArray(init)) {
                for (const [name, value] of init) {
                    this.append(name, value);
                }
            }
            else {
                for (const [name, value] of Object.entries(init)) {
                    this.append(name, value);
                }
            }
        }
    }
    append(name, value) {
        this.validateHeaderName(name);
        this.validateHeaderValue(value);
        const normalizedName = this.normalizeName(name);
        const existingValue = this.headersMap.get(normalizedName);
        if (existingValue) {
            this.headersMap.set(normalizedName, `${existingValue}, ${value}`);
        }
        else {
            this.headersMap.set(normalizedName, value);
        }
    }
    delete(name) {
        this.validateHeaderName(name);
        this.headersMap.delete(this.normalizeName(name));
    }
    *entries() {
        for (const [name, value] of this.headersMap.entries()) {
            yield [name, value];
        }
    }
    forEach(callback, thisArg) {
        for (const [name, value] of this.headersMap.entries()) {
            callback.call(thisArg, value, name, this);
        }
    }
    get(name) {
        this.validateHeaderName(name);
        return this.headersMap.get(this.normalizeName(name)) || null;
    }
    has(name) {
        this.validateHeaderName(name);
        return this.headersMap.has(this.normalizeName(name));
    }
    *keys() {
        for (const name of this.headersMap.keys()) {
            yield name;
        }
    }
    set(name, value) {
        this.validateHeaderName(name);
        this.validateHeaderValue(value);
        this.headersMap.set(this.normalizeName(name), value);
    }
    *values() {
        for (const value of this.headersMap.values()) {
            yield value;
        }
    }
    [Symbol.iterator]() {
        return this.entries();
    }
    toLensStudioHeaders() {
        const headersObject = {};
        for (const [name, value] of this.headersMap.entries()) {
            headersObject[name] = value;
        }
        return headersObject;
    }
    static fromLensStudioHeaders(lsHeaders) {
        const headers = new Headers();
        if (lsHeaders && typeof lsHeaders.entries === 'function') {
            const entries = lsHeaders.entries();
            for (const [name, value] of entries) {
                headers.set(name, value);
            }
        }
        return headers;
    }
    normalizeName(name) {
        return name.toLowerCase();
    }
    validateHeaderName(name) {
        if (typeof name !== 'string') {
            throw new TypeError('Header name must be a string');
        }
        if (name === '') {
            throw new TypeError('Header name cannot be empty');
        }
    }
    validateHeaderValue(value) {
        if (typeof value !== 'string') {
            throw new TypeError('Header value must be a string');
        }
    }
}
exports.Headers = Headers;
if (typeof globalThis !== 'undefined') {
    globalThis.Headers = Headers;
}


/***/ }),

/***/ 410:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
if (typeof globalThis.TextDecoder !== 'undefined') {
    const OriginalTextDecoder = globalThis.TextDecoder;
    globalThis.TextDecoder = function (encoding, options) {
        this.encoding = encoding || 'utf-8';
        this.fatal = (options && options.fatal) || false;
        this.ignoreBOM = (options && options.ignoreBOM) || false;
        let nativeDecoder;
        try {
            nativeDecoder = new OriginalTextDecoder(this.encoding);
        }
        catch (e) {
            nativeDecoder = new OriginalTextDecoder();
        }
        this.decode = function (input, options) {
            if (nativeDecoder && nativeDecoder.decode) {
                try {
                    return nativeDecoder.decode(input);
                }
                catch (e) {
                    if (input && 'length' in input && typeof input.length === 'number') {
                        let result = '';
                        for (let i = 0; i < input.length; i++) {
                            result += String.fromCharCode(input[i]);
                        }
                        return result;
                    }
                    return '';
                }
            }
            return '';
        };
    };
}


/***/ }),

/***/ 425:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.setTimeout = setTimeout;
exports.clearTimeout = clearTimeout;
exports.setInterval = setInterval;
exports.clearInterval = clearInterval;
const sceneObject = __webpack_require__.g.scene.createSceneObject("TimerSceneManager");
const timerSceneManager = sceneObject.createComponent("ScriptComponent");
function setTimeout(callback, timeMs) {
    const cancelToken = { cancelled: false };
    const delayedEvent = timerSceneManager.createEvent("DelayedCallbackEvent");
    delayedEvent.reset(timeMs / 1000);
    delayedEvent.bind(() => {
        if (!cancelToken.cancelled) {
            callback();
        }
    });
    return cancelToken;
}
function clearTimeout(timerId) {
    if (timerId) {
        timerId.cancelled = true;
    }
}
function setInterval(callback, timeMs) {
    const intervalToken = {
        cancelled: false,
        delayedEvent: null
    };
    function scheduleNext() {
        if (intervalToken.cancelled) {
            return;
        }
        const delayedEvent = timerSceneManager.createEvent("DelayedCallbackEvent");
        intervalToken.delayedEvent = delayedEvent;
        delayedEvent.reset(timeMs / 1000);
        delayedEvent.bind(() => {
            if (!intervalToken.cancelled) {
                callback();
                scheduleNext();
            }
        });
    }
    scheduleNext();
    return intervalToken;
}
function clearInterval(intervalId) {
    if (intervalId && typeof intervalId === 'object') {
        intervalId.cancelled = true;
    }
}
if (typeof globalThis.setTimeout !== 'function') {
    globalThis.setTimeout = setTimeout;
}
if (typeof globalThis.clearTimeout !== 'function') {
    globalThis.clearTimeout = clearTimeout;
}
if (typeof globalThis.setInterval !== 'function') {
    globalThis.setInterval = setInterval;
}
if (typeof globalThis.clearInterval !== 'function') {
    globalThis.clearInterval = clearInterval;
}


/***/ }),

/***/ 445:
/***/ ((module) => {

"use strict";


module.exports.STATUS_MAPPING = {
  mapped: 1,
  valid: 2,
  disallowed: 3,
  deviation: 6,
  ignored: 7
};


/***/ }),

/***/ 456:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const originalGetPrototypeOf = Object.getPrototypeOf;
Object.getPrototypeOf = function (obj) {
    try {
        // Handle null/undefined - return null instead of throwing
        // Some libraries expect this behavior
        if (obj == null) {
            return null;
        }
        return originalGetPrototypeOf(obj);
    }
    catch (e) {
        console.error('Object.getPrototypeOf error with object:', typeof obj, obj);
        throw e;
    }
};


/***/ }),

/***/ 472:
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('[[[0,44],2],[[45,46],2],[47,2],[[48,57],2],[[58,64],2],[65,1,"a"],[66,1,"b"],[67,1,"c"],[68,1,"d"],[69,1,"e"],[70,1,"f"],[71,1,"g"],[72,1,"h"],[73,1,"i"],[74,1,"j"],[75,1,"k"],[76,1,"l"],[77,1,"m"],[78,1,"n"],[79,1,"o"],[80,1,"p"],[81,1,"q"],[82,1,"r"],[83,1,"s"],[84,1,"t"],[85,1,"u"],[86,1,"v"],[87,1,"w"],[88,1,"x"],[89,1,"y"],[90,1,"z"],[[91,96],2],[[97,122],2],[[123,127],2],[[128,159],3],[160,1," "],[[161,167],2],[168,1," ̈"],[169,2],[170,1,"a"],[[171,172],2],[173,7],[174,2],[175,1," ̄"],[[176,177],2],[178,1,"2"],[179,1,"3"],[180,1," ́"],[181,1,"μ"],[182,2],[183,2],[184,1," ̧"],[185,1,"1"],[186,1,"o"],[187,2],[188,1,"1⁄4"],[189,1,"1⁄2"],[190,1,"3⁄4"],[191,2],[192,1,"à"],[193,1,"á"],[194,1,"â"],[195,1,"ã"],[196,1,"ä"],[197,1,"å"],[198,1,"æ"],[199,1,"ç"],[200,1,"è"],[201,1,"é"],[202,1,"ê"],[203,1,"ë"],[204,1,"ì"],[205,1,"í"],[206,1,"î"],[207,1,"ï"],[208,1,"ð"],[209,1,"ñ"],[210,1,"ò"],[211,1,"ó"],[212,1,"ô"],[213,1,"õ"],[214,1,"ö"],[215,2],[216,1,"ø"],[217,1,"ù"],[218,1,"ú"],[219,1,"û"],[220,1,"ü"],[221,1,"ý"],[222,1,"þ"],[223,6,"ss"],[[224,246],2],[247,2],[[248,255],2],[256,1,"ā"],[257,2],[258,1,"ă"],[259,2],[260,1,"ą"],[261,2],[262,1,"ć"],[263,2],[264,1,"ĉ"],[265,2],[266,1,"ċ"],[267,2],[268,1,"č"],[269,2],[270,1,"ď"],[271,2],[272,1,"đ"],[273,2],[274,1,"ē"],[275,2],[276,1,"ĕ"],[277,2],[278,1,"ė"],[279,2],[280,1,"ę"],[281,2],[282,1,"ě"],[283,2],[284,1,"ĝ"],[285,2],[286,1,"ğ"],[287,2],[288,1,"ġ"],[289,2],[290,1,"ģ"],[291,2],[292,1,"ĥ"],[293,2],[294,1,"ħ"],[295,2],[296,1,"ĩ"],[297,2],[298,1,"ī"],[299,2],[300,1,"ĭ"],[301,2],[302,1,"į"],[303,2],[304,1,"i̇"],[305,2],[[306,307],1,"ij"],[308,1,"ĵ"],[309,2],[310,1,"ķ"],[[311,312],2],[313,1,"ĺ"],[314,2],[315,1,"ļ"],[316,2],[317,1,"ľ"],[318,2],[[319,320],1,"l·"],[321,1,"ł"],[322,2],[323,1,"ń"],[324,2],[325,1,"ņ"],[326,2],[327,1,"ň"],[328,2],[329,1,"ʼn"],[330,1,"ŋ"],[331,2],[332,1,"ō"],[333,2],[334,1,"ŏ"],[335,2],[336,1,"ő"],[337,2],[338,1,"œ"],[339,2],[340,1,"ŕ"],[341,2],[342,1,"ŗ"],[343,2],[344,1,"ř"],[345,2],[346,1,"ś"],[347,2],[348,1,"ŝ"],[349,2],[350,1,"ş"],[351,2],[352,1,"š"],[353,2],[354,1,"ţ"],[355,2],[356,1,"ť"],[357,2],[358,1,"ŧ"],[359,2],[360,1,"ũ"],[361,2],[362,1,"ū"],[363,2],[364,1,"ŭ"],[365,2],[366,1,"ů"],[367,2],[368,1,"ű"],[369,2],[370,1,"ų"],[371,2],[372,1,"ŵ"],[373,2],[374,1,"ŷ"],[375,2],[376,1,"ÿ"],[377,1,"ź"],[378,2],[379,1,"ż"],[380,2],[381,1,"ž"],[382,2],[383,1,"s"],[384,2],[385,1,"ɓ"],[386,1,"ƃ"],[387,2],[388,1,"ƅ"],[389,2],[390,1,"ɔ"],[391,1,"ƈ"],[392,2],[393,1,"ɖ"],[394,1,"ɗ"],[395,1,"ƌ"],[[396,397],2],[398,1,"ǝ"],[399,1,"ə"],[400,1,"ɛ"],[401,1,"ƒ"],[402,2],[403,1,"ɠ"],[404,1,"ɣ"],[405,2],[406,1,"ɩ"],[407,1,"ɨ"],[408,1,"ƙ"],[[409,411],2],[412,1,"ɯ"],[413,1,"ɲ"],[414,2],[415,1,"ɵ"],[416,1,"ơ"],[417,2],[418,1,"ƣ"],[419,2],[420,1,"ƥ"],[421,2],[422,1,"ʀ"],[423,1,"ƨ"],[424,2],[425,1,"ʃ"],[[426,427],2],[428,1,"ƭ"],[429,2],[430,1,"ʈ"],[431,1,"ư"],[432,2],[433,1,"ʊ"],[434,1,"ʋ"],[435,1,"ƴ"],[436,2],[437,1,"ƶ"],[438,2],[439,1,"ʒ"],[440,1,"ƹ"],[[441,443],2],[444,1,"ƽ"],[[445,451],2],[[452,454],1,"dž"],[[455,457],1,"lj"],[[458,460],1,"nj"],[461,1,"ǎ"],[462,2],[463,1,"ǐ"],[464,2],[465,1,"ǒ"],[466,2],[467,1,"ǔ"],[468,2],[469,1,"ǖ"],[470,2],[471,1,"ǘ"],[472,2],[473,1,"ǚ"],[474,2],[475,1,"ǜ"],[[476,477],2],[478,1,"ǟ"],[479,2],[480,1,"ǡ"],[481,2],[482,1,"ǣ"],[483,2],[484,1,"ǥ"],[485,2],[486,1,"ǧ"],[487,2],[488,1,"ǩ"],[489,2],[490,1,"ǫ"],[491,2],[492,1,"ǭ"],[493,2],[494,1,"ǯ"],[[495,496],2],[[497,499],1,"dz"],[500,1,"ǵ"],[501,2],[502,1,"ƕ"],[503,1,"ƿ"],[504,1,"ǹ"],[505,2],[506,1,"ǻ"],[507,2],[508,1,"ǽ"],[509,2],[510,1,"ǿ"],[511,2],[512,1,"ȁ"],[513,2],[514,1,"ȃ"],[515,2],[516,1,"ȅ"],[517,2],[518,1,"ȇ"],[519,2],[520,1,"ȉ"],[521,2],[522,1,"ȋ"],[523,2],[524,1,"ȍ"],[525,2],[526,1,"ȏ"],[527,2],[528,1,"ȑ"],[529,2],[530,1,"ȓ"],[531,2],[532,1,"ȕ"],[533,2],[534,1,"ȗ"],[535,2],[536,1,"ș"],[537,2],[538,1,"ț"],[539,2],[540,1,"ȝ"],[541,2],[542,1,"ȟ"],[543,2],[544,1,"ƞ"],[545,2],[546,1,"ȣ"],[547,2],[548,1,"ȥ"],[549,2],[550,1,"ȧ"],[551,2],[552,1,"ȩ"],[553,2],[554,1,"ȫ"],[555,2],[556,1,"ȭ"],[557,2],[558,1,"ȯ"],[559,2],[560,1,"ȱ"],[561,2],[562,1,"ȳ"],[563,2],[[564,566],2],[[567,569],2],[570,1,"ⱥ"],[571,1,"ȼ"],[572,2],[573,1,"ƚ"],[574,1,"ⱦ"],[[575,576],2],[577,1,"ɂ"],[578,2],[579,1,"ƀ"],[580,1,"ʉ"],[581,1,"ʌ"],[582,1,"ɇ"],[583,2],[584,1,"ɉ"],[585,2],[586,1,"ɋ"],[587,2],[588,1,"ɍ"],[589,2],[590,1,"ɏ"],[591,2],[[592,680],2],[[681,685],2],[[686,687],2],[688,1,"h"],[689,1,"ɦ"],[690,1,"j"],[691,1,"r"],[692,1,"ɹ"],[693,1,"ɻ"],[694,1,"ʁ"],[695,1,"w"],[696,1,"y"],[[697,705],2],[[706,709],2],[[710,721],2],[[722,727],2],[728,1," ̆"],[729,1," ̇"],[730,1," ̊"],[731,1," ̨"],[732,1," ̃"],[733,1," ̋"],[734,2],[735,2],[736,1,"ɣ"],[737,1,"l"],[738,1,"s"],[739,1,"x"],[740,1,"ʕ"],[[741,745],2],[[746,747],2],[748,2],[749,2],[750,2],[[751,767],2],[[768,831],2],[832,1,"̀"],[833,1,"́"],[834,2],[835,1,"̓"],[836,1,"̈́"],[837,1,"ι"],[[838,846],2],[847,7],[[848,855],2],[[856,860],2],[[861,863],2],[[864,865],2],[866,2],[[867,879],2],[880,1,"ͱ"],[881,2],[882,1,"ͳ"],[883,2],[884,1,"ʹ"],[885,2],[886,1,"ͷ"],[887,2],[[888,889],3],[890,1," ι"],[[891,893],2],[894,1,";"],[895,1,"ϳ"],[[896,899],3],[900,1," ́"],[901,1," ̈́"],[902,1,"ά"],[903,1,"·"],[904,1,"έ"],[905,1,"ή"],[906,1,"ί"],[907,3],[908,1,"ό"],[909,3],[910,1,"ύ"],[911,1,"ώ"],[912,2],[913,1,"α"],[914,1,"β"],[915,1,"γ"],[916,1,"δ"],[917,1,"ε"],[918,1,"ζ"],[919,1,"η"],[920,1,"θ"],[921,1,"ι"],[922,1,"κ"],[923,1,"λ"],[924,1,"μ"],[925,1,"ν"],[926,1,"ξ"],[927,1,"ο"],[928,1,"π"],[929,1,"ρ"],[930,3],[931,1,"σ"],[932,1,"τ"],[933,1,"υ"],[934,1,"φ"],[935,1,"χ"],[936,1,"ψ"],[937,1,"ω"],[938,1,"ϊ"],[939,1,"ϋ"],[[940,961],2],[962,6,"σ"],[[963,974],2],[975,1,"ϗ"],[976,1,"β"],[977,1,"θ"],[978,1,"υ"],[979,1,"ύ"],[980,1,"ϋ"],[981,1,"φ"],[982,1,"π"],[983,2],[984,1,"ϙ"],[985,2],[986,1,"ϛ"],[987,2],[988,1,"ϝ"],[989,2],[990,1,"ϟ"],[991,2],[992,1,"ϡ"],[993,2],[994,1,"ϣ"],[995,2],[996,1,"ϥ"],[997,2],[998,1,"ϧ"],[999,2],[1000,1,"ϩ"],[1001,2],[1002,1,"ϫ"],[1003,2],[1004,1,"ϭ"],[1005,2],[1006,1,"ϯ"],[1007,2],[1008,1,"κ"],[1009,1,"ρ"],[1010,1,"σ"],[1011,2],[1012,1,"θ"],[1013,1,"ε"],[1014,2],[1015,1,"ϸ"],[1016,2],[1017,1,"σ"],[1018,1,"ϻ"],[1019,2],[1020,2],[1021,1,"ͻ"],[1022,1,"ͼ"],[1023,1,"ͽ"],[1024,1,"ѐ"],[1025,1,"ё"],[1026,1,"ђ"],[1027,1,"ѓ"],[1028,1,"є"],[1029,1,"ѕ"],[1030,1,"і"],[1031,1,"ї"],[1032,1,"ј"],[1033,1,"љ"],[1034,1,"њ"],[1035,1,"ћ"],[1036,1,"ќ"],[1037,1,"ѝ"],[1038,1,"ў"],[1039,1,"џ"],[1040,1,"а"],[1041,1,"б"],[1042,1,"в"],[1043,1,"г"],[1044,1,"д"],[1045,1,"е"],[1046,1,"ж"],[1047,1,"з"],[1048,1,"и"],[1049,1,"й"],[1050,1,"к"],[1051,1,"л"],[1052,1,"м"],[1053,1,"н"],[1054,1,"о"],[1055,1,"п"],[1056,1,"р"],[1057,1,"с"],[1058,1,"т"],[1059,1,"у"],[1060,1,"ф"],[1061,1,"х"],[1062,1,"ц"],[1063,1,"ч"],[1064,1,"ш"],[1065,1,"щ"],[1066,1,"ъ"],[1067,1,"ы"],[1068,1,"ь"],[1069,1,"э"],[1070,1,"ю"],[1071,1,"я"],[[1072,1103],2],[1104,2],[[1105,1116],2],[1117,2],[[1118,1119],2],[1120,1,"ѡ"],[1121,2],[1122,1,"ѣ"],[1123,2],[1124,1,"ѥ"],[1125,2],[1126,1,"ѧ"],[1127,2],[1128,1,"ѩ"],[1129,2],[1130,1,"ѫ"],[1131,2],[1132,1,"ѭ"],[1133,2],[1134,1,"ѯ"],[1135,2],[1136,1,"ѱ"],[1137,2],[1138,1,"ѳ"],[1139,2],[1140,1,"ѵ"],[1141,2],[1142,1,"ѷ"],[1143,2],[1144,1,"ѹ"],[1145,2],[1146,1,"ѻ"],[1147,2],[1148,1,"ѽ"],[1149,2],[1150,1,"ѿ"],[1151,2],[1152,1,"ҁ"],[1153,2],[1154,2],[[1155,1158],2],[1159,2],[[1160,1161],2],[1162,1,"ҋ"],[1163,2],[1164,1,"ҍ"],[1165,2],[1166,1,"ҏ"],[1167,2],[1168,1,"ґ"],[1169,2],[1170,1,"ғ"],[1171,2],[1172,1,"ҕ"],[1173,2],[1174,1,"җ"],[1175,2],[1176,1,"ҙ"],[1177,2],[1178,1,"қ"],[1179,2],[1180,1,"ҝ"],[1181,2],[1182,1,"ҟ"],[1183,2],[1184,1,"ҡ"],[1185,2],[1186,1,"ң"],[1187,2],[1188,1,"ҥ"],[1189,2],[1190,1,"ҧ"],[1191,2],[1192,1,"ҩ"],[1193,2],[1194,1,"ҫ"],[1195,2],[1196,1,"ҭ"],[1197,2],[1198,1,"ү"],[1199,2],[1200,1,"ұ"],[1201,2],[1202,1,"ҳ"],[1203,2],[1204,1,"ҵ"],[1205,2],[1206,1,"ҷ"],[1207,2],[1208,1,"ҹ"],[1209,2],[1210,1,"һ"],[1211,2],[1212,1,"ҽ"],[1213,2],[1214,1,"ҿ"],[1215,2],[1216,1,"ӏ"],[1217,1,"ӂ"],[1218,2],[1219,1,"ӄ"],[1220,2],[1221,1,"ӆ"],[1222,2],[1223,1,"ӈ"],[1224,2],[1225,1,"ӊ"],[1226,2],[1227,1,"ӌ"],[1228,2],[1229,1,"ӎ"],[1230,2],[1231,2],[1232,1,"ӑ"],[1233,2],[1234,1,"ӓ"],[1235,2],[1236,1,"ӕ"],[1237,2],[1238,1,"ӗ"],[1239,2],[1240,1,"ә"],[1241,2],[1242,1,"ӛ"],[1243,2],[1244,1,"ӝ"],[1245,2],[1246,1,"ӟ"],[1247,2],[1248,1,"ӡ"],[1249,2],[1250,1,"ӣ"],[1251,2],[1252,1,"ӥ"],[1253,2],[1254,1,"ӧ"],[1255,2],[1256,1,"ө"],[1257,2],[1258,1,"ӫ"],[1259,2],[1260,1,"ӭ"],[1261,2],[1262,1,"ӯ"],[1263,2],[1264,1,"ӱ"],[1265,2],[1266,1,"ӳ"],[1267,2],[1268,1,"ӵ"],[1269,2],[1270,1,"ӷ"],[1271,2],[1272,1,"ӹ"],[1273,2],[1274,1,"ӻ"],[1275,2],[1276,1,"ӽ"],[1277,2],[1278,1,"ӿ"],[1279,2],[1280,1,"ԁ"],[1281,2],[1282,1,"ԃ"],[1283,2],[1284,1,"ԅ"],[1285,2],[1286,1,"ԇ"],[1287,2],[1288,1,"ԉ"],[1289,2],[1290,1,"ԋ"],[1291,2],[1292,1,"ԍ"],[1293,2],[1294,1,"ԏ"],[1295,2],[1296,1,"ԑ"],[1297,2],[1298,1,"ԓ"],[1299,2],[1300,1,"ԕ"],[1301,2],[1302,1,"ԗ"],[1303,2],[1304,1,"ԙ"],[1305,2],[1306,1,"ԛ"],[1307,2],[1308,1,"ԝ"],[1309,2],[1310,1,"ԟ"],[1311,2],[1312,1,"ԡ"],[1313,2],[1314,1,"ԣ"],[1315,2],[1316,1,"ԥ"],[1317,2],[1318,1,"ԧ"],[1319,2],[1320,1,"ԩ"],[1321,2],[1322,1,"ԫ"],[1323,2],[1324,1,"ԭ"],[1325,2],[1326,1,"ԯ"],[1327,2],[1328,3],[1329,1,"ա"],[1330,1,"բ"],[1331,1,"գ"],[1332,1,"դ"],[1333,1,"ե"],[1334,1,"զ"],[1335,1,"է"],[1336,1,"ը"],[1337,1,"թ"],[1338,1,"ժ"],[1339,1,"ի"],[1340,1,"լ"],[1341,1,"խ"],[1342,1,"ծ"],[1343,1,"կ"],[1344,1,"հ"],[1345,1,"ձ"],[1346,1,"ղ"],[1347,1,"ճ"],[1348,1,"մ"],[1349,1,"յ"],[1350,1,"ն"],[1351,1,"շ"],[1352,1,"ո"],[1353,1,"չ"],[1354,1,"պ"],[1355,1,"ջ"],[1356,1,"ռ"],[1357,1,"ս"],[1358,1,"վ"],[1359,1,"տ"],[1360,1,"ր"],[1361,1,"ց"],[1362,1,"ւ"],[1363,1,"փ"],[1364,1,"ք"],[1365,1,"օ"],[1366,1,"ֆ"],[[1367,1368],3],[1369,2],[[1370,1375],2],[1376,2],[[1377,1414],2],[1415,1,"եւ"],[1416,2],[1417,2],[1418,2],[[1419,1420],3],[[1421,1422],2],[1423,2],[1424,3],[[1425,1441],2],[1442,2],[[1443,1455],2],[[1456,1465],2],[1466,2],[[1467,1469],2],[1470,2],[1471,2],[1472,2],[[1473,1474],2],[1475,2],[1476,2],[1477,2],[1478,2],[1479,2],[[1480,1487],3],[[1488,1514],2],[[1515,1518],3],[1519,2],[[1520,1524],2],[[1525,1535],3],[[1536,1539],3],[1540,3],[1541,3],[[1542,1546],2],[1547,2],[1548,2],[[1549,1551],2],[[1552,1557],2],[[1558,1562],2],[1563,2],[1564,3],[1565,2],[1566,2],[1567,2],[1568,2],[[1569,1594],2],[[1595,1599],2],[1600,2],[[1601,1618],2],[[1619,1621],2],[[1622,1624],2],[[1625,1630],2],[1631,2],[[1632,1641],2],[[1642,1645],2],[[1646,1647],2],[[1648,1652],2],[1653,1,"اٴ"],[1654,1,"وٴ"],[1655,1,"ۇٴ"],[1656,1,"يٴ"],[[1657,1719],2],[[1720,1721],2],[[1722,1726],2],[1727,2],[[1728,1742],2],[1743,2],[[1744,1747],2],[1748,2],[[1749,1756],2],[1757,3],[1758,2],[[1759,1768],2],[1769,2],[[1770,1773],2],[[1774,1775],2],[[1776,1785],2],[[1786,1790],2],[1791,2],[[1792,1805],2],[1806,3],[1807,3],[[1808,1836],2],[[1837,1839],2],[[1840,1866],2],[[1867,1868],3],[[1869,1871],2],[[1872,1901],2],[[1902,1919],2],[[1920,1968],2],[1969,2],[[1970,1983],3],[[1984,2037],2],[[2038,2042],2],[[2043,2044],3],[2045,2],[[2046,2047],2],[[2048,2093],2],[[2094,2095],3],[[2096,2110],2],[2111,3],[[2112,2139],2],[[2140,2141],3],[2142,2],[2143,3],[[2144,2154],2],[[2155,2159],3],[[2160,2183],2],[2184,2],[[2185,2190],2],[2191,3],[[2192,2193],3],[[2194,2198],3],[2199,2],[[2200,2207],2],[2208,2],[2209,2],[[2210,2220],2],[[2221,2226],2],[[2227,2228],2],[2229,2],[[2230,2237],2],[[2238,2247],2],[[2248,2258],2],[2259,2],[[2260,2273],2],[2274,3],[2275,2],[[2276,2302],2],[2303,2],[2304,2],[[2305,2307],2],[2308,2],[[2309,2361],2],[[2362,2363],2],[[2364,2381],2],[2382,2],[2383,2],[[2384,2388],2],[2389,2],[[2390,2391],2],[2392,1,"क़"],[2393,1,"ख़"],[2394,1,"ग़"],[2395,1,"ज़"],[2396,1,"ड़"],[2397,1,"ढ़"],[2398,1,"फ़"],[2399,1,"य़"],[[2400,2403],2],[[2404,2405],2],[[2406,2415],2],[2416,2],[[2417,2418],2],[[2419,2423],2],[2424,2],[[2425,2426],2],[[2427,2428],2],[2429,2],[[2430,2431],2],[2432,2],[[2433,2435],2],[2436,3],[[2437,2444],2],[[2445,2446],3],[[2447,2448],2],[[2449,2450],3],[[2451,2472],2],[2473,3],[[2474,2480],2],[2481,3],[2482,2],[[2483,2485],3],[[2486,2489],2],[[2490,2491],3],[2492,2],[2493,2],[[2494,2500],2],[[2501,2502],3],[[2503,2504],2],[[2505,2506],3],[[2507,2509],2],[2510,2],[[2511,2518],3],[2519,2],[[2520,2523],3],[2524,1,"ড়"],[2525,1,"ঢ়"],[2526,3],[2527,1,"য়"],[[2528,2531],2],[[2532,2533],3],[[2534,2545],2],[[2546,2554],2],[2555,2],[2556,2],[2557,2],[2558,2],[[2559,2560],3],[2561,2],[2562,2],[2563,2],[2564,3],[[2565,2570],2],[[2571,2574],3],[[2575,2576],2],[[2577,2578],3],[[2579,2600],2],[2601,3],[[2602,2608],2],[2609,3],[2610,2],[2611,1,"ਲ਼"],[2612,3],[2613,2],[2614,1,"ਸ਼"],[2615,3],[[2616,2617],2],[[2618,2619],3],[2620,2],[2621,3],[[2622,2626],2],[[2627,2630],3],[[2631,2632],2],[[2633,2634],3],[[2635,2637],2],[[2638,2640],3],[2641,2],[[2642,2648],3],[2649,1,"ਖ਼"],[2650,1,"ਗ਼"],[2651,1,"ਜ਼"],[2652,2],[2653,3],[2654,1,"ਫ਼"],[[2655,2661],3],[[2662,2676],2],[2677,2],[2678,2],[[2679,2688],3],[[2689,2691],2],[2692,3],[[2693,2699],2],[2700,2],[2701,2],[2702,3],[[2703,2705],2],[2706,3],[[2707,2728],2],[2729,3],[[2730,2736],2],[2737,3],[[2738,2739],2],[2740,3],[[2741,2745],2],[[2746,2747],3],[[2748,2757],2],[2758,3],[[2759,2761],2],[2762,3],[[2763,2765],2],[[2766,2767],3],[2768,2],[[2769,2783],3],[2784,2],[[2785,2787],2],[[2788,2789],3],[[2790,2799],2],[2800,2],[2801,2],[[2802,2808],3],[2809,2],[[2810,2815],2],[2816,3],[[2817,2819],2],[2820,3],[[2821,2828],2],[[2829,2830],3],[[2831,2832],2],[[2833,2834],3],[[2835,2856],2],[2857,3],[[2858,2864],2],[2865,3],[[2866,2867],2],[2868,3],[2869,2],[[2870,2873],2],[[2874,2875],3],[[2876,2883],2],[2884,2],[[2885,2886],3],[[2887,2888],2],[[2889,2890],3],[[2891,2893],2],[[2894,2900],3],[2901,2],[[2902,2903],2],[[2904,2907],3],[2908,1,"ଡ଼"],[2909,1,"ଢ଼"],[2910,3],[[2911,2913],2],[[2914,2915],2],[[2916,2917],3],[[2918,2927],2],[2928,2],[2929,2],[[2930,2935],2],[[2936,2945],3],[[2946,2947],2],[2948,3],[[2949,2954],2],[[2955,2957],3],[[2958,2960],2],[2961,3],[[2962,2965],2],[[2966,2968],3],[[2969,2970],2],[2971,3],[2972,2],[2973,3],[[2974,2975],2],[[2976,2978],3],[[2979,2980],2],[[2981,2983],3],[[2984,2986],2],[[2987,2989],3],[[2990,2997],2],[2998,2],[[2999,3001],2],[[3002,3005],3],[[3006,3010],2],[[3011,3013],3],[[3014,3016],2],[3017,3],[[3018,3021],2],[[3022,3023],3],[3024,2],[[3025,3030],3],[3031,2],[[3032,3045],3],[3046,2],[[3047,3055],2],[[3056,3058],2],[[3059,3066],2],[[3067,3071],3],[3072,2],[[3073,3075],2],[3076,2],[[3077,3084],2],[3085,3],[[3086,3088],2],[3089,3],[[3090,3112],2],[3113,3],[[3114,3123],2],[3124,2],[[3125,3129],2],[[3130,3131],3],[3132,2],[3133,2],[[3134,3140],2],[3141,3],[[3142,3144],2],[3145,3],[[3146,3149],2],[[3150,3156],3],[[3157,3158],2],[3159,3],[[3160,3161],2],[3162,2],[[3163,3164],3],[3165,2],[[3166,3167],3],[[3168,3169],2],[[3170,3171],2],[[3172,3173],3],[[3174,3183],2],[[3184,3190],3],[3191,2],[[3192,3199],2],[3200,2],[3201,2],[[3202,3203],2],[3204,2],[[3205,3212],2],[3213,3],[[3214,3216],2],[3217,3],[[3218,3240],2],[3241,3],[[3242,3251],2],[3252,3],[[3253,3257],2],[[3258,3259],3],[[3260,3261],2],[[3262,3268],2],[3269,3],[[3270,3272],2],[3273,3],[[3274,3277],2],[[3278,3284],3],[[3285,3286],2],[[3287,3292],3],[3293,2],[3294,2],[3295,3],[[3296,3297],2],[[3298,3299],2],[[3300,3301],3],[[3302,3311],2],[3312,3],[[3313,3314],2],[3315,2],[[3316,3327],3],[3328,2],[3329,2],[[3330,3331],2],[3332,2],[[3333,3340],2],[3341,3],[[3342,3344],2],[3345,3],[[3346,3368],2],[3369,2],[[3370,3385],2],[3386,2],[[3387,3388],2],[3389,2],[[3390,3395],2],[3396,2],[3397,3],[[3398,3400],2],[3401,3],[[3402,3405],2],[3406,2],[3407,2],[[3408,3411],3],[[3412,3414],2],[3415,2],[[3416,3422],2],[3423,2],[[3424,3425],2],[[3426,3427],2],[[3428,3429],3],[[3430,3439],2],[[3440,3445],2],[[3446,3448],2],[3449,2],[[3450,3455],2],[3456,3],[3457,2],[[3458,3459],2],[3460,3],[[3461,3478],2],[[3479,3481],3],[[3482,3505],2],[3506,3],[[3507,3515],2],[3516,3],[3517,2],[[3518,3519],3],[[3520,3526],2],[[3527,3529],3],[3530,2],[[3531,3534],3],[[3535,3540],2],[3541,3],[3542,2],[3543,3],[[3544,3551],2],[[3552,3557],3],[[3558,3567],2],[[3568,3569],3],[[3570,3571],2],[3572,2],[[3573,3584],3],[[3585,3634],2],[3635,1,"ํา"],[[3636,3642],2],[[3643,3646],3],[3647,2],[[3648,3662],2],[3663,2],[[3664,3673],2],[[3674,3675],2],[[3676,3712],3],[[3713,3714],2],[3715,3],[3716,2],[3717,3],[3718,2],[[3719,3720],2],[3721,2],[3722,2],[3723,3],[3724,2],[3725,2],[[3726,3731],2],[[3732,3735],2],[3736,2],[[3737,3743],2],[3744,2],[[3745,3747],2],[3748,3],[3749,2],[3750,3],[3751,2],[[3752,3753],2],[[3754,3755],2],[3756,2],[[3757,3762],2],[3763,1,"ໍາ"],[[3764,3769],2],[3770,2],[[3771,3773],2],[[3774,3775],3],[[3776,3780],2],[3781,3],[3782,2],[3783,3],[[3784,3789],2],[3790,2],[3791,3],[[3792,3801],2],[[3802,3803],3],[3804,1,"ຫນ"],[3805,1,"ຫມ"],[[3806,3807],2],[[3808,3839],3],[3840,2],[[3841,3850],2],[3851,2],[3852,1,"་"],[[3853,3863],2],[[3864,3865],2],[[3866,3871],2],[[3872,3881],2],[[3882,3892],2],[3893,2],[3894,2],[3895,2],[3896,2],[3897,2],[[3898,3901],2],[[3902,3906],2],[3907,1,"གྷ"],[[3908,3911],2],[3912,3],[[3913,3916],2],[3917,1,"ཌྷ"],[[3918,3921],2],[3922,1,"དྷ"],[[3923,3926],2],[3927,1,"བྷ"],[[3928,3931],2],[3932,1,"ཛྷ"],[[3933,3944],2],[3945,1,"ཀྵ"],[3946,2],[[3947,3948],2],[[3949,3952],3],[[3953,3954],2],[3955,1,"ཱི"],[3956,2],[3957,1,"ཱུ"],[3958,1,"ྲྀ"],[3959,1,"ྲཱྀ"],[3960,1,"ླྀ"],[3961,1,"ླཱྀ"],[[3962,3968],2],[3969,1,"ཱྀ"],[[3970,3972],2],[3973,2],[[3974,3979],2],[[3980,3983],2],[[3984,3986],2],[3987,1,"ྒྷ"],[[3988,3989],2],[3990,2],[3991,2],[3992,3],[[3993,3996],2],[3997,1,"ྜྷ"],[[3998,4001],2],[4002,1,"ྡྷ"],[[4003,4006],2],[4007,1,"ྦྷ"],[[4008,4011],2],[4012,1,"ྫྷ"],[4013,2],[[4014,4016],2],[[4017,4023],2],[4024,2],[4025,1,"ྐྵ"],[[4026,4028],2],[4029,3],[[4030,4037],2],[4038,2],[[4039,4044],2],[4045,3],[4046,2],[4047,2],[[4048,4049],2],[[4050,4052],2],[[4053,4056],2],[[4057,4058],2],[[4059,4095],3],[[4096,4129],2],[4130,2],[[4131,4135],2],[4136,2],[[4137,4138],2],[4139,2],[[4140,4146],2],[[4147,4149],2],[[4150,4153],2],[[4154,4159],2],[[4160,4169],2],[[4170,4175],2],[[4176,4185],2],[[4186,4249],2],[[4250,4253],2],[[4254,4255],2],[4256,1,"ⴀ"],[4257,1,"ⴁ"],[4258,1,"ⴂ"],[4259,1,"ⴃ"],[4260,1,"ⴄ"],[4261,1,"ⴅ"],[4262,1,"ⴆ"],[4263,1,"ⴇ"],[4264,1,"ⴈ"],[4265,1,"ⴉ"],[4266,1,"ⴊ"],[4267,1,"ⴋ"],[4268,1,"ⴌ"],[4269,1,"ⴍ"],[4270,1,"ⴎ"],[4271,1,"ⴏ"],[4272,1,"ⴐ"],[4273,1,"ⴑ"],[4274,1,"ⴒ"],[4275,1,"ⴓ"],[4276,1,"ⴔ"],[4277,1,"ⴕ"],[4278,1,"ⴖ"],[4279,1,"ⴗ"],[4280,1,"ⴘ"],[4281,1,"ⴙ"],[4282,1,"ⴚ"],[4283,1,"ⴛ"],[4284,1,"ⴜ"],[4285,1,"ⴝ"],[4286,1,"ⴞ"],[4287,1,"ⴟ"],[4288,1,"ⴠ"],[4289,1,"ⴡ"],[4290,1,"ⴢ"],[4291,1,"ⴣ"],[4292,1,"ⴤ"],[4293,1,"ⴥ"],[4294,3],[4295,1,"ⴧ"],[[4296,4300],3],[4301,1,"ⴭ"],[[4302,4303],3],[[4304,4342],2],[[4343,4344],2],[[4345,4346],2],[4347,2],[4348,1,"ნ"],[[4349,4351],2],[[4352,4441],2],[[4442,4446],2],[[4447,4448],7],[[4449,4514],2],[[4515,4519],2],[[4520,4601],2],[[4602,4607],2],[[4608,4614],2],[4615,2],[[4616,4678],2],[4679,2],[4680,2],[4681,3],[[4682,4685],2],[[4686,4687],3],[[4688,4694],2],[4695,3],[4696,2],[4697,3],[[4698,4701],2],[[4702,4703],3],[[4704,4742],2],[4743,2],[4744,2],[4745,3],[[4746,4749],2],[[4750,4751],3],[[4752,4782],2],[4783,2],[4784,2],[4785,3],[[4786,4789],2],[[4790,4791],3],[[4792,4798],2],[4799,3],[4800,2],[4801,3],[[4802,4805],2],[[4806,4807],3],[[4808,4814],2],[4815,2],[[4816,4822],2],[4823,3],[[4824,4846],2],[4847,2],[[4848,4878],2],[4879,2],[4880,2],[4881,3],[[4882,4885],2],[[4886,4887],3],[[4888,4894],2],[4895,2],[[4896,4934],2],[4935,2],[[4936,4954],2],[[4955,4956],3],[[4957,4958],2],[4959,2],[4960,2],[[4961,4988],2],[[4989,4991],3],[[4992,5007],2],[[5008,5017],2],[[5018,5023],3],[[5024,5108],2],[5109,2],[[5110,5111],3],[5112,1,"Ᏸ"],[5113,1,"Ᏹ"],[5114,1,"Ᏺ"],[5115,1,"Ᏻ"],[5116,1,"Ᏼ"],[5117,1,"Ᏽ"],[[5118,5119],3],[5120,2],[[5121,5740],2],[[5741,5742],2],[[5743,5750],2],[[5751,5759],2],[5760,3],[[5761,5786],2],[[5787,5788],2],[[5789,5791],3],[[5792,5866],2],[[5867,5872],2],[[5873,5880],2],[[5881,5887],3],[[5888,5900],2],[5901,2],[[5902,5908],2],[5909,2],[[5910,5918],3],[5919,2],[[5920,5940],2],[[5941,5942],2],[[5943,5951],3],[[5952,5971],2],[[5972,5983],3],[[5984,5996],2],[5997,3],[[5998,6000],2],[6001,3],[[6002,6003],2],[[6004,6015],3],[[6016,6067],2],[[6068,6069],7],[[6070,6099],2],[[6100,6102],2],[6103,2],[[6104,6107],2],[6108,2],[6109,2],[[6110,6111],3],[[6112,6121],2],[[6122,6127],3],[[6128,6137],2],[[6138,6143],3],[[6144,6154],2],[[6155,6158],7],[6159,7],[[6160,6169],2],[[6170,6175],3],[[6176,6263],2],[6264,2],[[6265,6271],3],[[6272,6313],2],[6314,2],[[6315,6319],3],[[6320,6389],2],[[6390,6399],3],[[6400,6428],2],[[6429,6430],2],[6431,3],[[6432,6443],2],[[6444,6447],3],[[6448,6459],2],[[6460,6463],3],[6464,2],[[6465,6467],3],[[6468,6469],2],[[6470,6509],2],[[6510,6511],3],[[6512,6516],2],[[6517,6527],3],[[6528,6569],2],[[6570,6571],2],[[6572,6575],3],[[6576,6601],2],[[6602,6607],3],[[6608,6617],2],[6618,2],[[6619,6621],3],[[6622,6623],2],[[6624,6655],2],[[6656,6683],2],[[6684,6685],3],[[6686,6687],2],[[6688,6750],2],[6751,3],[[6752,6780],2],[[6781,6782],3],[[6783,6793],2],[[6794,6799],3],[[6800,6809],2],[[6810,6815],3],[[6816,6822],2],[6823,2],[[6824,6829],2],[[6830,6831],3],[[6832,6845],2],[6846,2],[[6847,6848],2],[[6849,6862],2],[[6863,6911],3],[[6912,6987],2],[6988,2],[6989,3],[[6990,6991],2],[[6992,7001],2],[[7002,7018],2],[[7019,7027],2],[[7028,7036],2],[[7037,7038],2],[7039,2],[[7040,7082],2],[[7083,7085],2],[[7086,7097],2],[[7098,7103],2],[[7104,7155],2],[[7156,7163],3],[[7164,7167],2],[[7168,7223],2],[[7224,7226],3],[[7227,7231],2],[[7232,7241],2],[[7242,7244],3],[[7245,7293],2],[[7294,7295],2],[7296,1,"в"],[7297,1,"д"],[7298,1,"о"],[7299,1,"с"],[[7300,7301],1,"т"],[7302,1,"ъ"],[7303,1,"ѣ"],[7304,1,"ꙋ"],[7305,1,"ᲊ"],[7306,2],[[7307,7311],3],[7312,1,"ა"],[7313,1,"ბ"],[7314,1,"გ"],[7315,1,"დ"],[7316,1,"ე"],[7317,1,"ვ"],[7318,1,"ზ"],[7319,1,"თ"],[7320,1,"ი"],[7321,1,"კ"],[7322,1,"ლ"],[7323,1,"მ"],[7324,1,"ნ"],[7325,1,"ო"],[7326,1,"პ"],[7327,1,"ჟ"],[7328,1,"რ"],[7329,1,"ს"],[7330,1,"ტ"],[7331,1,"უ"],[7332,1,"ფ"],[7333,1,"ქ"],[7334,1,"ღ"],[7335,1,"ყ"],[7336,1,"შ"],[7337,1,"ჩ"],[7338,1,"ც"],[7339,1,"ძ"],[7340,1,"წ"],[7341,1,"ჭ"],[7342,1,"ხ"],[7343,1,"ჯ"],[7344,1,"ჰ"],[7345,1,"ჱ"],[7346,1,"ჲ"],[7347,1,"ჳ"],[7348,1,"ჴ"],[7349,1,"ჵ"],[7350,1,"ჶ"],[7351,1,"ჷ"],[7352,1,"ჸ"],[7353,1,"ჹ"],[7354,1,"ჺ"],[[7355,7356],3],[7357,1,"ჽ"],[7358,1,"ჾ"],[7359,1,"ჿ"],[[7360,7367],2],[[7368,7375],3],[[7376,7378],2],[7379,2],[[7380,7410],2],[[7411,7414],2],[7415,2],[[7416,7417],2],[7418,2],[[7419,7423],3],[[7424,7467],2],[7468,1,"a"],[7469,1,"æ"],[7470,1,"b"],[7471,2],[7472,1,"d"],[7473,1,"e"],[7474,1,"ǝ"],[7475,1,"g"],[7476,1,"h"],[7477,1,"i"],[7478,1,"j"],[7479,1,"k"],[7480,1,"l"],[7481,1,"m"],[7482,1,"n"],[7483,2],[7484,1,"o"],[7485,1,"ȣ"],[7486,1,"p"],[7487,1,"r"],[7488,1,"t"],[7489,1,"u"],[7490,1,"w"],[7491,1,"a"],[7492,1,"ɐ"],[7493,1,"ɑ"],[7494,1,"ᴂ"],[7495,1,"b"],[7496,1,"d"],[7497,1,"e"],[7498,1,"ə"],[7499,1,"ɛ"],[7500,1,"ɜ"],[7501,1,"g"],[7502,2],[7503,1,"k"],[7504,1,"m"],[7505,1,"ŋ"],[7506,1,"o"],[7507,1,"ɔ"],[7508,1,"ᴖ"],[7509,1,"ᴗ"],[7510,1,"p"],[7511,1,"t"],[7512,1,"u"],[7513,1,"ᴝ"],[7514,1,"ɯ"],[7515,1,"v"],[7516,1,"ᴥ"],[7517,1,"β"],[7518,1,"γ"],[7519,1,"δ"],[7520,1,"φ"],[7521,1,"χ"],[7522,1,"i"],[7523,1,"r"],[7524,1,"u"],[7525,1,"v"],[7526,1,"β"],[7527,1,"γ"],[7528,1,"ρ"],[7529,1,"φ"],[7530,1,"χ"],[7531,2],[[7532,7543],2],[7544,1,"н"],[[7545,7578],2],[7579,1,"ɒ"],[7580,1,"c"],[7581,1,"ɕ"],[7582,1,"ð"],[7583,1,"ɜ"],[7584,1,"f"],[7585,1,"ɟ"],[7586,1,"ɡ"],[7587,1,"ɥ"],[7588,1,"ɨ"],[7589,1,"ɩ"],[7590,1,"ɪ"],[7591,1,"ᵻ"],[7592,1,"ʝ"],[7593,1,"ɭ"],[7594,1,"ᶅ"],[7595,1,"ʟ"],[7596,1,"ɱ"],[7597,1,"ɰ"],[7598,1,"ɲ"],[7599,1,"ɳ"],[7600,1,"ɴ"],[7601,1,"ɵ"],[7602,1,"ɸ"],[7603,1,"ʂ"],[7604,1,"ʃ"],[7605,1,"ƫ"],[7606,1,"ʉ"],[7607,1,"ʊ"],[7608,1,"ᴜ"],[7609,1,"ʋ"],[7610,1,"ʌ"],[7611,1,"z"],[7612,1,"ʐ"],[7613,1,"ʑ"],[7614,1,"ʒ"],[7615,1,"θ"],[[7616,7619],2],[[7620,7626],2],[[7627,7654],2],[[7655,7669],2],[[7670,7673],2],[7674,2],[7675,2],[7676,2],[7677,2],[[7678,7679],2],[7680,1,"ḁ"],[7681,2],[7682,1,"ḃ"],[7683,2],[7684,1,"ḅ"],[7685,2],[7686,1,"ḇ"],[7687,2],[7688,1,"ḉ"],[7689,2],[7690,1,"ḋ"],[7691,2],[7692,1,"ḍ"],[7693,2],[7694,1,"ḏ"],[7695,2],[7696,1,"ḑ"],[7697,2],[7698,1,"ḓ"],[7699,2],[7700,1,"ḕ"],[7701,2],[7702,1,"ḗ"],[7703,2],[7704,1,"ḙ"],[7705,2],[7706,1,"ḛ"],[7707,2],[7708,1,"ḝ"],[7709,2],[7710,1,"ḟ"],[7711,2],[7712,1,"ḡ"],[7713,2],[7714,1,"ḣ"],[7715,2],[7716,1,"ḥ"],[7717,2],[7718,1,"ḧ"],[7719,2],[7720,1,"ḩ"],[7721,2],[7722,1,"ḫ"],[7723,2],[7724,1,"ḭ"],[7725,2],[7726,1,"ḯ"],[7727,2],[7728,1,"ḱ"],[7729,2],[7730,1,"ḳ"],[7731,2],[7732,1,"ḵ"],[7733,2],[7734,1,"ḷ"],[7735,2],[7736,1,"ḹ"],[7737,2],[7738,1,"ḻ"],[7739,2],[7740,1,"ḽ"],[7741,2],[7742,1,"ḿ"],[7743,2],[7744,1,"ṁ"],[7745,2],[7746,1,"ṃ"],[7747,2],[7748,1,"ṅ"],[7749,2],[7750,1,"ṇ"],[7751,2],[7752,1,"ṉ"],[7753,2],[7754,1,"ṋ"],[7755,2],[7756,1,"ṍ"],[7757,2],[7758,1,"ṏ"],[7759,2],[7760,1,"ṑ"],[7761,2],[7762,1,"ṓ"],[7763,2],[7764,1,"ṕ"],[7765,2],[7766,1,"ṗ"],[7767,2],[7768,1,"ṙ"],[7769,2],[7770,1,"ṛ"],[7771,2],[7772,1,"ṝ"],[7773,2],[7774,1,"ṟ"],[7775,2],[7776,1,"ṡ"],[7777,2],[7778,1,"ṣ"],[7779,2],[7780,1,"ṥ"],[7781,2],[7782,1,"ṧ"],[7783,2],[7784,1,"ṩ"],[7785,2],[7786,1,"ṫ"],[7787,2],[7788,1,"ṭ"],[7789,2],[7790,1,"ṯ"],[7791,2],[7792,1,"ṱ"],[7793,2],[7794,1,"ṳ"],[7795,2],[7796,1,"ṵ"],[7797,2],[7798,1,"ṷ"],[7799,2],[7800,1,"ṹ"],[7801,2],[7802,1,"ṻ"],[7803,2],[7804,1,"ṽ"],[7805,2],[7806,1,"ṿ"],[7807,2],[7808,1,"ẁ"],[7809,2],[7810,1,"ẃ"],[7811,2],[7812,1,"ẅ"],[7813,2],[7814,1,"ẇ"],[7815,2],[7816,1,"ẉ"],[7817,2],[7818,1,"ẋ"],[7819,2],[7820,1,"ẍ"],[7821,2],[7822,1,"ẏ"],[7823,2],[7824,1,"ẑ"],[7825,2],[7826,1,"ẓ"],[7827,2],[7828,1,"ẕ"],[[7829,7833],2],[7834,1,"aʾ"],[7835,1,"ṡ"],[[7836,7837],2],[7838,1,"ß"],[7839,2],[7840,1,"ạ"],[7841,2],[7842,1,"ả"],[7843,2],[7844,1,"ấ"],[7845,2],[7846,1,"ầ"],[7847,2],[7848,1,"ẩ"],[7849,2],[7850,1,"ẫ"],[7851,2],[7852,1,"ậ"],[7853,2],[7854,1,"ắ"],[7855,2],[7856,1,"ằ"],[7857,2],[7858,1,"ẳ"],[7859,2],[7860,1,"ẵ"],[7861,2],[7862,1,"ặ"],[7863,2],[7864,1,"ẹ"],[7865,2],[7866,1,"ẻ"],[7867,2],[7868,1,"ẽ"],[7869,2],[7870,1,"ế"],[7871,2],[7872,1,"ề"],[7873,2],[7874,1,"ể"],[7875,2],[7876,1,"ễ"],[7877,2],[7878,1,"ệ"],[7879,2],[7880,1,"ỉ"],[7881,2],[7882,1,"ị"],[7883,2],[7884,1,"ọ"],[7885,2],[7886,1,"ỏ"],[7887,2],[7888,1,"ố"],[7889,2],[7890,1,"ồ"],[7891,2],[7892,1,"ổ"],[7893,2],[7894,1,"ỗ"],[7895,2],[7896,1,"ộ"],[7897,2],[7898,1,"ớ"],[7899,2],[7900,1,"ờ"],[7901,2],[7902,1,"ở"],[7903,2],[7904,1,"ỡ"],[7905,2],[7906,1,"ợ"],[7907,2],[7908,1,"ụ"],[7909,2],[7910,1,"ủ"],[7911,2],[7912,1,"ứ"],[7913,2],[7914,1,"ừ"],[7915,2],[7916,1,"ử"],[7917,2],[7918,1,"ữ"],[7919,2],[7920,1,"ự"],[7921,2],[7922,1,"ỳ"],[7923,2],[7924,1,"ỵ"],[7925,2],[7926,1,"ỷ"],[7927,2],[7928,1,"ỹ"],[7929,2],[7930,1,"ỻ"],[7931,2],[7932,1,"ỽ"],[7933,2],[7934,1,"ỿ"],[7935,2],[[7936,7943],2],[7944,1,"ἀ"],[7945,1,"ἁ"],[7946,1,"ἂ"],[7947,1,"ἃ"],[7948,1,"ἄ"],[7949,1,"ἅ"],[7950,1,"ἆ"],[7951,1,"ἇ"],[[7952,7957],2],[[7958,7959],3],[7960,1,"ἐ"],[7961,1,"ἑ"],[7962,1,"ἒ"],[7963,1,"ἓ"],[7964,1,"ἔ"],[7965,1,"ἕ"],[[7966,7967],3],[[7968,7975],2],[7976,1,"ἠ"],[7977,1,"ἡ"],[7978,1,"ἢ"],[7979,1,"ἣ"],[7980,1,"ἤ"],[7981,1,"ἥ"],[7982,1,"ἦ"],[7983,1,"ἧ"],[[7984,7991],2],[7992,1,"ἰ"],[7993,1,"ἱ"],[7994,1,"ἲ"],[7995,1,"ἳ"],[7996,1,"ἴ"],[7997,1,"ἵ"],[7998,1,"ἶ"],[7999,1,"ἷ"],[[8000,8005],2],[[8006,8007],3],[8008,1,"ὀ"],[8009,1,"ὁ"],[8010,1,"ὂ"],[8011,1,"ὃ"],[8012,1,"ὄ"],[8013,1,"ὅ"],[[8014,8015],3],[[8016,8023],2],[8024,3],[8025,1,"ὑ"],[8026,3],[8027,1,"ὓ"],[8028,3],[8029,1,"ὕ"],[8030,3],[8031,1,"ὗ"],[[8032,8039],2],[8040,1,"ὠ"],[8041,1,"ὡ"],[8042,1,"ὢ"],[8043,1,"ὣ"],[8044,1,"ὤ"],[8045,1,"ὥ"],[8046,1,"ὦ"],[8047,1,"ὧ"],[8048,2],[8049,1,"ά"],[8050,2],[8051,1,"έ"],[8052,2],[8053,1,"ή"],[8054,2],[8055,1,"ί"],[8056,2],[8057,1,"ό"],[8058,2],[8059,1,"ύ"],[8060,2],[8061,1,"ώ"],[[8062,8063],3],[8064,1,"ἀι"],[8065,1,"ἁι"],[8066,1,"ἂι"],[8067,1,"ἃι"],[8068,1,"ἄι"],[8069,1,"ἅι"],[8070,1,"ἆι"],[8071,1,"ἇι"],[8072,1,"ἀι"],[8073,1,"ἁι"],[8074,1,"ἂι"],[8075,1,"ἃι"],[8076,1,"ἄι"],[8077,1,"ἅι"],[8078,1,"ἆι"],[8079,1,"ἇι"],[8080,1,"ἠι"],[8081,1,"ἡι"],[8082,1,"ἢι"],[8083,1,"ἣι"],[8084,1,"ἤι"],[8085,1,"ἥι"],[8086,1,"ἦι"],[8087,1,"ἧι"],[8088,1,"ἠι"],[8089,1,"ἡι"],[8090,1,"ἢι"],[8091,1,"ἣι"],[8092,1,"ἤι"],[8093,1,"ἥι"],[8094,1,"ἦι"],[8095,1,"ἧι"],[8096,1,"ὠι"],[8097,1,"ὡι"],[8098,1,"ὢι"],[8099,1,"ὣι"],[8100,1,"ὤι"],[8101,1,"ὥι"],[8102,1,"ὦι"],[8103,1,"ὧι"],[8104,1,"ὠι"],[8105,1,"ὡι"],[8106,1,"ὢι"],[8107,1,"ὣι"],[8108,1,"ὤι"],[8109,1,"ὥι"],[8110,1,"ὦι"],[8111,1,"ὧι"],[[8112,8113],2],[8114,1,"ὰι"],[8115,1,"αι"],[8116,1,"άι"],[8117,3],[8118,2],[8119,1,"ᾶι"],[8120,1,"ᾰ"],[8121,1,"ᾱ"],[8122,1,"ὰ"],[8123,1,"ά"],[8124,1,"αι"],[8125,1," ̓"],[8126,1,"ι"],[8127,1," ̓"],[8128,1," ͂"],[8129,1," ̈͂"],[8130,1,"ὴι"],[8131,1,"ηι"],[8132,1,"ήι"],[8133,3],[8134,2],[8135,1,"ῆι"],[8136,1,"ὲ"],[8137,1,"έ"],[8138,1,"ὴ"],[8139,1,"ή"],[8140,1,"ηι"],[8141,1," ̓̀"],[8142,1," ̓́"],[8143,1," ̓͂"],[[8144,8146],2],[8147,1,"ΐ"],[[8148,8149],3],[[8150,8151],2],[8152,1,"ῐ"],[8153,1,"ῑ"],[8154,1,"ὶ"],[8155,1,"ί"],[8156,3],[8157,1," ̔̀"],[8158,1," ̔́"],[8159,1," ̔͂"],[[8160,8162],2],[8163,1,"ΰ"],[[8164,8167],2],[8168,1,"ῠ"],[8169,1,"ῡ"],[8170,1,"ὺ"],[8171,1,"ύ"],[8172,1,"ῥ"],[8173,1," ̈̀"],[8174,1," ̈́"],[8175,1,"`"],[[8176,8177],3],[8178,1,"ὼι"],[8179,1,"ωι"],[8180,1,"ώι"],[8181,3],[8182,2],[8183,1,"ῶι"],[8184,1,"ὸ"],[8185,1,"ό"],[8186,1,"ὼ"],[8187,1,"ώ"],[8188,1,"ωι"],[8189,1," ́"],[8190,1," ̔"],[8191,3],[[8192,8202],1," "],[8203,7],[[8204,8205],6,""],[[8206,8207],3],[8208,2],[8209,1,"‐"],[[8210,8214],2],[8215,1," ̳"],[[8216,8227],2],[[8228,8230],3],[8231,2],[[8232,8238],3],[8239,1," "],[[8240,8242],2],[8243,1,"′′"],[8244,1,"′′′"],[8245,2],[8246,1,"‵‵"],[8247,1,"‵‵‵"],[[8248,8251],2],[8252,1,"!!"],[8253,2],[8254,1," ̅"],[[8255,8262],2],[8263,1,"??"],[8264,1,"?!"],[8265,1,"!?"],[[8266,8269],2],[[8270,8274],2],[[8275,8276],2],[[8277,8278],2],[8279,1,"′′′′"],[[8280,8286],2],[8287,1," "],[[8288,8291],7],[8292,7],[8293,3],[[8294,8297],3],[[8298,8303],7],[8304,1,"0"],[8305,1,"i"],[[8306,8307],3],[8308,1,"4"],[8309,1,"5"],[8310,1,"6"],[8311,1,"7"],[8312,1,"8"],[8313,1,"9"],[8314,1,"+"],[8315,1,"−"],[8316,1,"="],[8317,1,"("],[8318,1,")"],[8319,1,"n"],[8320,1,"0"],[8321,1,"1"],[8322,1,"2"],[8323,1,"3"],[8324,1,"4"],[8325,1,"5"],[8326,1,"6"],[8327,1,"7"],[8328,1,"8"],[8329,1,"9"],[8330,1,"+"],[8331,1,"−"],[8332,1,"="],[8333,1,"("],[8334,1,")"],[8335,3],[8336,1,"a"],[8337,1,"e"],[8338,1,"o"],[8339,1,"x"],[8340,1,"ə"],[8341,1,"h"],[8342,1,"k"],[8343,1,"l"],[8344,1,"m"],[8345,1,"n"],[8346,1,"p"],[8347,1,"s"],[8348,1,"t"],[[8349,8351],3],[[8352,8359],2],[8360,1,"rs"],[[8361,8362],2],[8363,2],[8364,2],[[8365,8367],2],[[8368,8369],2],[[8370,8373],2],[[8374,8376],2],[8377,2],[8378,2],[[8379,8381],2],[8382,2],[8383,2],[8384,2],[[8385,8399],3],[[8400,8417],2],[[8418,8419],2],[[8420,8426],2],[8427,2],[[8428,8431],2],[8432,2],[[8433,8447],3],[8448,1,"a/c"],[8449,1,"a/s"],[8450,1,"c"],[8451,1,"°c"],[8452,2],[8453,1,"c/o"],[8454,1,"c/u"],[8455,1,"ɛ"],[8456,2],[8457,1,"°f"],[8458,1,"g"],[[8459,8462],1,"h"],[8463,1,"ħ"],[[8464,8465],1,"i"],[[8466,8467],1,"l"],[8468,2],[8469,1,"n"],[8470,1,"no"],[[8471,8472],2],[8473,1,"p"],[8474,1,"q"],[[8475,8477],1,"r"],[[8478,8479],2],[8480,1,"sm"],[8481,1,"tel"],[8482,1,"tm"],[8483,2],[8484,1,"z"],[8485,2],[8486,1,"ω"],[8487,2],[8488,1,"z"],[8489,2],[8490,1,"k"],[8491,1,"å"],[8492,1,"b"],[8493,1,"c"],[8494,2],[[8495,8496],1,"e"],[8497,1,"f"],[8498,1,"ⅎ"],[8499,1,"m"],[8500,1,"o"],[8501,1,"א"],[8502,1,"ב"],[8503,1,"ג"],[8504,1,"ד"],[8505,1,"i"],[8506,2],[8507,1,"fax"],[8508,1,"π"],[[8509,8510],1,"γ"],[8511,1,"π"],[8512,1,"∑"],[[8513,8516],2],[[8517,8518],1,"d"],[8519,1,"e"],[8520,1,"i"],[8521,1,"j"],[[8522,8523],2],[8524,2],[8525,2],[8526,2],[8527,2],[8528,1,"1⁄7"],[8529,1,"1⁄9"],[8530,1,"1⁄10"],[8531,1,"1⁄3"],[8532,1,"2⁄3"],[8533,1,"1⁄5"],[8534,1,"2⁄5"],[8535,1,"3⁄5"],[8536,1,"4⁄5"],[8537,1,"1⁄6"],[8538,1,"5⁄6"],[8539,1,"1⁄8"],[8540,1,"3⁄8"],[8541,1,"5⁄8"],[8542,1,"7⁄8"],[8543,1,"1⁄"],[8544,1,"i"],[8545,1,"ii"],[8546,1,"iii"],[8547,1,"iv"],[8548,1,"v"],[8549,1,"vi"],[8550,1,"vii"],[8551,1,"viii"],[8552,1,"ix"],[8553,1,"x"],[8554,1,"xi"],[8555,1,"xii"],[8556,1,"l"],[8557,1,"c"],[8558,1,"d"],[8559,1,"m"],[8560,1,"i"],[8561,1,"ii"],[8562,1,"iii"],[8563,1,"iv"],[8564,1,"v"],[8565,1,"vi"],[8566,1,"vii"],[8567,1,"viii"],[8568,1,"ix"],[8569,1,"x"],[8570,1,"xi"],[8571,1,"xii"],[8572,1,"l"],[8573,1,"c"],[8574,1,"d"],[8575,1,"m"],[[8576,8578],2],[8579,1,"ↄ"],[8580,2],[[8581,8584],2],[8585,1,"0⁄3"],[[8586,8587],2],[[8588,8591],3],[[8592,8682],2],[[8683,8691],2],[[8692,8703],2],[[8704,8747],2],[8748,1,"∫∫"],[8749,1,"∫∫∫"],[8750,2],[8751,1,"∮∮"],[8752,1,"∮∮∮"],[[8753,8945],2],[[8946,8959],2],[8960,2],[8961,2],[[8962,9000],2],[9001,1,"〈"],[9002,1,"〉"],[[9003,9082],2],[9083,2],[9084,2],[[9085,9114],2],[[9115,9166],2],[[9167,9168],2],[[9169,9179],2],[[9180,9191],2],[9192,2],[[9193,9203],2],[[9204,9210],2],[[9211,9214],2],[9215,2],[[9216,9252],2],[[9253,9254],2],[[9255,9257],2],[[9258,9279],3],[[9280,9290],2],[[9291,9311],3],[9312,1,"1"],[9313,1,"2"],[9314,1,"3"],[9315,1,"4"],[9316,1,"5"],[9317,1,"6"],[9318,1,"7"],[9319,1,"8"],[9320,1,"9"],[9321,1,"10"],[9322,1,"11"],[9323,1,"12"],[9324,1,"13"],[9325,1,"14"],[9326,1,"15"],[9327,1,"16"],[9328,1,"17"],[9329,1,"18"],[9330,1,"19"],[9331,1,"20"],[9332,1,"(1)"],[9333,1,"(2)"],[9334,1,"(3)"],[9335,1,"(4)"],[9336,1,"(5)"],[9337,1,"(6)"],[9338,1,"(7)"],[9339,1,"(8)"],[9340,1,"(9)"],[9341,1,"(10)"],[9342,1,"(11)"],[9343,1,"(12)"],[9344,1,"(13)"],[9345,1,"(14)"],[9346,1,"(15)"],[9347,1,"(16)"],[9348,1,"(17)"],[9349,1,"(18)"],[9350,1,"(19)"],[9351,1,"(20)"],[[9352,9371],3],[9372,1,"(a)"],[9373,1,"(b)"],[9374,1,"(c)"],[9375,1,"(d)"],[9376,1,"(e)"],[9377,1,"(f)"],[9378,1,"(g)"],[9379,1,"(h)"],[9380,1,"(i)"],[9381,1,"(j)"],[9382,1,"(k)"],[9383,1,"(l)"],[9384,1,"(m)"],[9385,1,"(n)"],[9386,1,"(o)"],[9387,1,"(p)"],[9388,1,"(q)"],[9389,1,"(r)"],[9390,1,"(s)"],[9391,1,"(t)"],[9392,1,"(u)"],[9393,1,"(v)"],[9394,1,"(w)"],[9395,1,"(x)"],[9396,1,"(y)"],[9397,1,"(z)"],[9398,1,"a"],[9399,1,"b"],[9400,1,"c"],[9401,1,"d"],[9402,1,"e"],[9403,1,"f"],[9404,1,"g"],[9405,1,"h"],[9406,1,"i"],[9407,1,"j"],[9408,1,"k"],[9409,1,"l"],[9410,1,"m"],[9411,1,"n"],[9412,1,"o"],[9413,1,"p"],[9414,1,"q"],[9415,1,"r"],[9416,1,"s"],[9417,1,"t"],[9418,1,"u"],[9419,1,"v"],[9420,1,"w"],[9421,1,"x"],[9422,1,"y"],[9423,1,"z"],[9424,1,"a"],[9425,1,"b"],[9426,1,"c"],[9427,1,"d"],[9428,1,"e"],[9429,1,"f"],[9430,1,"g"],[9431,1,"h"],[9432,1,"i"],[9433,1,"j"],[9434,1,"k"],[9435,1,"l"],[9436,1,"m"],[9437,1,"n"],[9438,1,"o"],[9439,1,"p"],[9440,1,"q"],[9441,1,"r"],[9442,1,"s"],[9443,1,"t"],[9444,1,"u"],[9445,1,"v"],[9446,1,"w"],[9447,1,"x"],[9448,1,"y"],[9449,1,"z"],[9450,1,"0"],[[9451,9470],2],[9471,2],[[9472,9621],2],[[9622,9631],2],[[9632,9711],2],[[9712,9719],2],[[9720,9727],2],[[9728,9747],2],[[9748,9749],2],[[9750,9751],2],[9752,2],[9753,2],[[9754,9839],2],[[9840,9841],2],[[9842,9853],2],[[9854,9855],2],[[9856,9865],2],[[9866,9873],2],[[9874,9884],2],[9885,2],[[9886,9887],2],[[9888,9889],2],[[9890,9905],2],[9906,2],[[9907,9916],2],[[9917,9919],2],[[9920,9923],2],[[9924,9933],2],[9934,2],[[9935,9953],2],[9954,2],[9955,2],[[9956,9959],2],[[9960,9983],2],[9984,2],[[9985,9988],2],[9989,2],[[9990,9993],2],[[9994,9995],2],[[9996,10023],2],[10024,2],[[10025,10059],2],[10060,2],[10061,2],[10062,2],[[10063,10066],2],[[10067,10069],2],[10070,2],[10071,2],[[10072,10078],2],[[10079,10080],2],[[10081,10087],2],[[10088,10101],2],[[10102,10132],2],[[10133,10135],2],[[10136,10159],2],[10160,2],[[10161,10174],2],[10175,2],[[10176,10182],2],[[10183,10186],2],[10187,2],[10188,2],[10189,2],[[10190,10191],2],[[10192,10219],2],[[10220,10223],2],[[10224,10239],2],[[10240,10495],2],[[10496,10763],2],[10764,1,"∫∫∫∫"],[[10765,10867],2],[10868,1,"::="],[10869,1,"=="],[10870,1,"==="],[[10871,10971],2],[10972,1,"⫝̸"],[[10973,11007],2],[[11008,11021],2],[[11022,11027],2],[[11028,11034],2],[[11035,11039],2],[[11040,11043],2],[[11044,11084],2],[[11085,11087],2],[[11088,11092],2],[[11093,11097],2],[[11098,11123],2],[[11124,11125],3],[[11126,11157],2],[11158,3],[11159,2],[[11160,11193],2],[[11194,11196],2],[[11197,11208],2],[11209,2],[[11210,11217],2],[11218,2],[[11219,11243],2],[[11244,11247],2],[[11248,11262],2],[11263,2],[11264,1,"ⰰ"],[11265,1,"ⰱ"],[11266,1,"ⰲ"],[11267,1,"ⰳ"],[11268,1,"ⰴ"],[11269,1,"ⰵ"],[11270,1,"ⰶ"],[11271,1,"ⰷ"],[11272,1,"ⰸ"],[11273,1,"ⰹ"],[11274,1,"ⰺ"],[11275,1,"ⰻ"],[11276,1,"ⰼ"],[11277,1,"ⰽ"],[11278,1,"ⰾ"],[11279,1,"ⰿ"],[11280,1,"ⱀ"],[11281,1,"ⱁ"],[11282,1,"ⱂ"],[11283,1,"ⱃ"],[11284,1,"ⱄ"],[11285,1,"ⱅ"],[11286,1,"ⱆ"],[11287,1,"ⱇ"],[11288,1,"ⱈ"],[11289,1,"ⱉ"],[11290,1,"ⱊ"],[11291,1,"ⱋ"],[11292,1,"ⱌ"],[11293,1,"ⱍ"],[11294,1,"ⱎ"],[11295,1,"ⱏ"],[11296,1,"ⱐ"],[11297,1,"ⱑ"],[11298,1,"ⱒ"],[11299,1,"ⱓ"],[11300,1,"ⱔ"],[11301,1,"ⱕ"],[11302,1,"ⱖ"],[11303,1,"ⱗ"],[11304,1,"ⱘ"],[11305,1,"ⱙ"],[11306,1,"ⱚ"],[11307,1,"ⱛ"],[11308,1,"ⱜ"],[11309,1,"ⱝ"],[11310,1,"ⱞ"],[11311,1,"ⱟ"],[[11312,11358],2],[11359,2],[11360,1,"ⱡ"],[11361,2],[11362,1,"ɫ"],[11363,1,"ᵽ"],[11364,1,"ɽ"],[[11365,11366],2],[11367,1,"ⱨ"],[11368,2],[11369,1,"ⱪ"],[11370,2],[11371,1,"ⱬ"],[11372,2],[11373,1,"ɑ"],[11374,1,"ɱ"],[11375,1,"ɐ"],[11376,1,"ɒ"],[11377,2],[11378,1,"ⱳ"],[11379,2],[11380,2],[11381,1,"ⱶ"],[[11382,11383],2],[[11384,11387],2],[11388,1,"j"],[11389,1,"v"],[11390,1,"ȿ"],[11391,1,"ɀ"],[11392,1,"ⲁ"],[11393,2],[11394,1,"ⲃ"],[11395,2],[11396,1,"ⲅ"],[11397,2],[11398,1,"ⲇ"],[11399,2],[11400,1,"ⲉ"],[11401,2],[11402,1,"ⲋ"],[11403,2],[11404,1,"ⲍ"],[11405,2],[11406,1,"ⲏ"],[11407,2],[11408,1,"ⲑ"],[11409,2],[11410,1,"ⲓ"],[11411,2],[11412,1,"ⲕ"],[11413,2],[11414,1,"ⲗ"],[11415,2],[11416,1,"ⲙ"],[11417,2],[11418,1,"ⲛ"],[11419,2],[11420,1,"ⲝ"],[11421,2],[11422,1,"ⲟ"],[11423,2],[11424,1,"ⲡ"],[11425,2],[11426,1,"ⲣ"],[11427,2],[11428,1,"ⲥ"],[11429,2],[11430,1,"ⲧ"],[11431,2],[11432,1,"ⲩ"],[11433,2],[11434,1,"ⲫ"],[11435,2],[11436,1,"ⲭ"],[11437,2],[11438,1,"ⲯ"],[11439,2],[11440,1,"ⲱ"],[11441,2],[11442,1,"ⲳ"],[11443,2],[11444,1,"ⲵ"],[11445,2],[11446,1,"ⲷ"],[11447,2],[11448,1,"ⲹ"],[11449,2],[11450,1,"ⲻ"],[11451,2],[11452,1,"ⲽ"],[11453,2],[11454,1,"ⲿ"],[11455,2],[11456,1,"ⳁ"],[11457,2],[11458,1,"ⳃ"],[11459,2],[11460,1,"ⳅ"],[11461,2],[11462,1,"ⳇ"],[11463,2],[11464,1,"ⳉ"],[11465,2],[11466,1,"ⳋ"],[11467,2],[11468,1,"ⳍ"],[11469,2],[11470,1,"ⳏ"],[11471,2],[11472,1,"ⳑ"],[11473,2],[11474,1,"ⳓ"],[11475,2],[11476,1,"ⳕ"],[11477,2],[11478,1,"ⳗ"],[11479,2],[11480,1,"ⳙ"],[11481,2],[11482,1,"ⳛ"],[11483,2],[11484,1,"ⳝ"],[11485,2],[11486,1,"ⳟ"],[11487,2],[11488,1,"ⳡ"],[11489,2],[11490,1,"ⳣ"],[[11491,11492],2],[[11493,11498],2],[11499,1,"ⳬ"],[11500,2],[11501,1,"ⳮ"],[[11502,11505],2],[11506,1,"ⳳ"],[11507,2],[[11508,11512],3],[[11513,11519],2],[[11520,11557],2],[11558,3],[11559,2],[[11560,11564],3],[11565,2],[[11566,11567],3],[[11568,11621],2],[[11622,11623],2],[[11624,11630],3],[11631,1,"ⵡ"],[11632,2],[[11633,11646],3],[11647,2],[[11648,11670],2],[[11671,11679],3],[[11680,11686],2],[11687,3],[[11688,11694],2],[11695,3],[[11696,11702],2],[11703,3],[[11704,11710],2],[11711,3],[[11712,11718],2],[11719,3],[[11720,11726],2],[11727,3],[[11728,11734],2],[11735,3],[[11736,11742],2],[11743,3],[[11744,11775],2],[[11776,11799],2],[[11800,11803],2],[[11804,11805],2],[[11806,11822],2],[11823,2],[11824,2],[11825,2],[[11826,11835],2],[[11836,11842],2],[[11843,11844],2],[[11845,11849],2],[[11850,11854],2],[11855,2],[[11856,11858],2],[[11859,11869],2],[[11870,11903],3],[[11904,11929],2],[11930,3],[[11931,11934],2],[11935,1,"母"],[[11936,12018],2],[12019,1,"龟"],[[12020,12031],3],[12032,1,"一"],[12033,1,"丨"],[12034,1,"丶"],[12035,1,"丿"],[12036,1,"乙"],[12037,1,"亅"],[12038,1,"二"],[12039,1,"亠"],[12040,1,"人"],[12041,1,"儿"],[12042,1,"入"],[12043,1,"八"],[12044,1,"冂"],[12045,1,"冖"],[12046,1,"冫"],[12047,1,"几"],[12048,1,"凵"],[12049,1,"刀"],[12050,1,"力"],[12051,1,"勹"],[12052,1,"匕"],[12053,1,"匚"],[12054,1,"匸"],[12055,1,"十"],[12056,1,"卜"],[12057,1,"卩"],[12058,1,"厂"],[12059,1,"厶"],[12060,1,"又"],[12061,1,"口"],[12062,1,"囗"],[12063,1,"土"],[12064,1,"士"],[12065,1,"夂"],[12066,1,"夊"],[12067,1,"夕"],[12068,1,"大"],[12069,1,"女"],[12070,1,"子"],[12071,1,"宀"],[12072,1,"寸"],[12073,1,"小"],[12074,1,"尢"],[12075,1,"尸"],[12076,1,"屮"],[12077,1,"山"],[12078,1,"巛"],[12079,1,"工"],[12080,1,"己"],[12081,1,"巾"],[12082,1,"干"],[12083,1,"幺"],[12084,1,"广"],[12085,1,"廴"],[12086,1,"廾"],[12087,1,"弋"],[12088,1,"弓"],[12089,1,"彐"],[12090,1,"彡"],[12091,1,"彳"],[12092,1,"心"],[12093,1,"戈"],[12094,1,"戶"],[12095,1,"手"],[12096,1,"支"],[12097,1,"攴"],[12098,1,"文"],[12099,1,"斗"],[12100,1,"斤"],[12101,1,"方"],[12102,1,"无"],[12103,1,"日"],[12104,1,"曰"],[12105,1,"月"],[12106,1,"木"],[12107,1,"欠"],[12108,1,"止"],[12109,1,"歹"],[12110,1,"殳"],[12111,1,"毋"],[12112,1,"比"],[12113,1,"毛"],[12114,1,"氏"],[12115,1,"气"],[12116,1,"水"],[12117,1,"火"],[12118,1,"爪"],[12119,1,"父"],[12120,1,"爻"],[12121,1,"爿"],[12122,1,"片"],[12123,1,"牙"],[12124,1,"牛"],[12125,1,"犬"],[12126,1,"玄"],[12127,1,"玉"],[12128,1,"瓜"],[12129,1,"瓦"],[12130,1,"甘"],[12131,1,"生"],[12132,1,"用"],[12133,1,"田"],[12134,1,"疋"],[12135,1,"疒"],[12136,1,"癶"],[12137,1,"白"],[12138,1,"皮"],[12139,1,"皿"],[12140,1,"目"],[12141,1,"矛"],[12142,1,"矢"],[12143,1,"石"],[12144,1,"示"],[12145,1,"禸"],[12146,1,"禾"],[12147,1,"穴"],[12148,1,"立"],[12149,1,"竹"],[12150,1,"米"],[12151,1,"糸"],[12152,1,"缶"],[12153,1,"网"],[12154,1,"羊"],[12155,1,"羽"],[12156,1,"老"],[12157,1,"而"],[12158,1,"耒"],[12159,1,"耳"],[12160,1,"聿"],[12161,1,"肉"],[12162,1,"臣"],[12163,1,"自"],[12164,1,"至"],[12165,1,"臼"],[12166,1,"舌"],[12167,1,"舛"],[12168,1,"舟"],[12169,1,"艮"],[12170,1,"色"],[12171,1,"艸"],[12172,1,"虍"],[12173,1,"虫"],[12174,1,"血"],[12175,1,"行"],[12176,1,"衣"],[12177,1,"襾"],[12178,1,"見"],[12179,1,"角"],[12180,1,"言"],[12181,1,"谷"],[12182,1,"豆"],[12183,1,"豕"],[12184,1,"豸"],[12185,1,"貝"],[12186,1,"赤"],[12187,1,"走"],[12188,1,"足"],[12189,1,"身"],[12190,1,"車"],[12191,1,"辛"],[12192,1,"辰"],[12193,1,"辵"],[12194,1,"邑"],[12195,1,"酉"],[12196,1,"釆"],[12197,1,"里"],[12198,1,"金"],[12199,1,"長"],[12200,1,"門"],[12201,1,"阜"],[12202,1,"隶"],[12203,1,"隹"],[12204,1,"雨"],[12205,1,"靑"],[12206,1,"非"],[12207,1,"面"],[12208,1,"革"],[12209,1,"韋"],[12210,1,"韭"],[12211,1,"音"],[12212,1,"頁"],[12213,1,"風"],[12214,1,"飛"],[12215,1,"食"],[12216,1,"首"],[12217,1,"香"],[12218,1,"馬"],[12219,1,"骨"],[12220,1,"高"],[12221,1,"髟"],[12222,1,"鬥"],[12223,1,"鬯"],[12224,1,"鬲"],[12225,1,"鬼"],[12226,1,"魚"],[12227,1,"鳥"],[12228,1,"鹵"],[12229,1,"鹿"],[12230,1,"麥"],[12231,1,"麻"],[12232,1,"黃"],[12233,1,"黍"],[12234,1,"黑"],[12235,1,"黹"],[12236,1,"黽"],[12237,1,"鼎"],[12238,1,"鼓"],[12239,1,"鼠"],[12240,1,"鼻"],[12241,1,"齊"],[12242,1,"齒"],[12243,1,"龍"],[12244,1,"龜"],[12245,1,"龠"],[[12246,12271],3],[[12272,12283],3],[[12284,12287],3],[12288,1," "],[12289,2],[12290,1,"."],[[12291,12292],2],[[12293,12295],2],[[12296,12329],2],[[12330,12333],2],[[12334,12341],2],[12342,1,"〒"],[12343,2],[12344,1,"十"],[12345,1,"卄"],[12346,1,"卅"],[12347,2],[12348,2],[12349,2],[12350,2],[12351,2],[12352,3],[[12353,12436],2],[[12437,12438],2],[[12439,12440],3],[[12441,12442],2],[12443,1," ゙"],[12444,1," ゚"],[[12445,12446],2],[12447,1,"より"],[12448,2],[[12449,12542],2],[12543,1,"コト"],[[12544,12548],3],[[12549,12588],2],[12589,2],[12590,2],[12591,2],[12592,3],[12593,1,"ᄀ"],[12594,1,"ᄁ"],[12595,1,"ᆪ"],[12596,1,"ᄂ"],[12597,1,"ᆬ"],[12598,1,"ᆭ"],[12599,1,"ᄃ"],[12600,1,"ᄄ"],[12601,1,"ᄅ"],[12602,1,"ᆰ"],[12603,1,"ᆱ"],[12604,1,"ᆲ"],[12605,1,"ᆳ"],[12606,1,"ᆴ"],[12607,1,"ᆵ"],[12608,1,"ᄚ"],[12609,1,"ᄆ"],[12610,1,"ᄇ"],[12611,1,"ᄈ"],[12612,1,"ᄡ"],[12613,1,"ᄉ"],[12614,1,"ᄊ"],[12615,1,"ᄋ"],[12616,1,"ᄌ"],[12617,1,"ᄍ"],[12618,1,"ᄎ"],[12619,1,"ᄏ"],[12620,1,"ᄐ"],[12621,1,"ᄑ"],[12622,1,"ᄒ"],[12623,1,"ᅡ"],[12624,1,"ᅢ"],[12625,1,"ᅣ"],[12626,1,"ᅤ"],[12627,1,"ᅥ"],[12628,1,"ᅦ"],[12629,1,"ᅧ"],[12630,1,"ᅨ"],[12631,1,"ᅩ"],[12632,1,"ᅪ"],[12633,1,"ᅫ"],[12634,1,"ᅬ"],[12635,1,"ᅭ"],[12636,1,"ᅮ"],[12637,1,"ᅯ"],[12638,1,"ᅰ"],[12639,1,"ᅱ"],[12640,1,"ᅲ"],[12641,1,"ᅳ"],[12642,1,"ᅴ"],[12643,1,"ᅵ"],[12644,7],[12645,1,"ᄔ"],[12646,1,"ᄕ"],[12647,1,"ᇇ"],[12648,1,"ᇈ"],[12649,1,"ᇌ"],[12650,1,"ᇎ"],[12651,1,"ᇓ"],[12652,1,"ᇗ"],[12653,1,"ᇙ"],[12654,1,"ᄜ"],[12655,1,"ᇝ"],[12656,1,"ᇟ"],[12657,1,"ᄝ"],[12658,1,"ᄞ"],[12659,1,"ᄠ"],[12660,1,"ᄢ"],[12661,1,"ᄣ"],[12662,1,"ᄧ"],[12663,1,"ᄩ"],[12664,1,"ᄫ"],[12665,1,"ᄬ"],[12666,1,"ᄭ"],[12667,1,"ᄮ"],[12668,1,"ᄯ"],[12669,1,"ᄲ"],[12670,1,"ᄶ"],[12671,1,"ᅀ"],[12672,1,"ᅇ"],[12673,1,"ᅌ"],[12674,1,"ᇱ"],[12675,1,"ᇲ"],[12676,1,"ᅗ"],[12677,1,"ᅘ"],[12678,1,"ᅙ"],[12679,1,"ᆄ"],[12680,1,"ᆅ"],[12681,1,"ᆈ"],[12682,1,"ᆑ"],[12683,1,"ᆒ"],[12684,1,"ᆔ"],[12685,1,"ᆞ"],[12686,1,"ᆡ"],[12687,3],[[12688,12689],2],[12690,1,"一"],[12691,1,"二"],[12692,1,"三"],[12693,1,"四"],[12694,1,"上"],[12695,1,"中"],[12696,1,"下"],[12697,1,"甲"],[12698,1,"乙"],[12699,1,"丙"],[12700,1,"丁"],[12701,1,"天"],[12702,1,"地"],[12703,1,"人"],[[12704,12727],2],[[12728,12730],2],[[12731,12735],2],[[12736,12751],2],[[12752,12771],2],[[12772,12773],2],[[12774,12782],3],[12783,3],[[12784,12799],2],[12800,1,"(ᄀ)"],[12801,1,"(ᄂ)"],[12802,1,"(ᄃ)"],[12803,1,"(ᄅ)"],[12804,1,"(ᄆ)"],[12805,1,"(ᄇ)"],[12806,1,"(ᄉ)"],[12807,1,"(ᄋ)"],[12808,1,"(ᄌ)"],[12809,1,"(ᄎ)"],[12810,1,"(ᄏ)"],[12811,1,"(ᄐ)"],[12812,1,"(ᄑ)"],[12813,1,"(ᄒ)"],[12814,1,"(가)"],[12815,1,"(나)"],[12816,1,"(다)"],[12817,1,"(라)"],[12818,1,"(마)"],[12819,1,"(바)"],[12820,1,"(사)"],[12821,1,"(아)"],[12822,1,"(자)"],[12823,1,"(차)"],[12824,1,"(카)"],[12825,1,"(타)"],[12826,1,"(파)"],[12827,1,"(하)"],[12828,1,"(주)"],[12829,1,"(오전)"],[12830,1,"(오후)"],[12831,3],[12832,1,"(一)"],[12833,1,"(二)"],[12834,1,"(三)"],[12835,1,"(四)"],[12836,1,"(五)"],[12837,1,"(六)"],[12838,1,"(七)"],[12839,1,"(八)"],[12840,1,"(九)"],[12841,1,"(十)"],[12842,1,"(月)"],[12843,1,"(火)"],[12844,1,"(水)"],[12845,1,"(木)"],[12846,1,"(金)"],[12847,1,"(土)"],[12848,1,"(日)"],[12849,1,"(株)"],[12850,1,"(有)"],[12851,1,"(社)"],[12852,1,"(名)"],[12853,1,"(特)"],[12854,1,"(財)"],[12855,1,"(祝)"],[12856,1,"(労)"],[12857,1,"(代)"],[12858,1,"(呼)"],[12859,1,"(学)"],[12860,1,"(監)"],[12861,1,"(企)"],[12862,1,"(資)"],[12863,1,"(協)"],[12864,1,"(祭)"],[12865,1,"(休)"],[12866,1,"(自)"],[12867,1,"(至)"],[12868,1,"問"],[12869,1,"幼"],[12870,1,"文"],[12871,1,"箏"],[[12872,12879],2],[12880,1,"pte"],[12881,1,"21"],[12882,1,"22"],[12883,1,"23"],[12884,1,"24"],[12885,1,"25"],[12886,1,"26"],[12887,1,"27"],[12888,1,"28"],[12889,1,"29"],[12890,1,"30"],[12891,1,"31"],[12892,1,"32"],[12893,1,"33"],[12894,1,"34"],[12895,1,"35"],[12896,1,"ᄀ"],[12897,1,"ᄂ"],[12898,1,"ᄃ"],[12899,1,"ᄅ"],[12900,1,"ᄆ"],[12901,1,"ᄇ"],[12902,1,"ᄉ"],[12903,1,"ᄋ"],[12904,1,"ᄌ"],[12905,1,"ᄎ"],[12906,1,"ᄏ"],[12907,1,"ᄐ"],[12908,1,"ᄑ"],[12909,1,"ᄒ"],[12910,1,"가"],[12911,1,"나"],[12912,1,"다"],[12913,1,"라"],[12914,1,"마"],[12915,1,"바"],[12916,1,"사"],[12917,1,"아"],[12918,1,"자"],[12919,1,"차"],[12920,1,"카"],[12921,1,"타"],[12922,1,"파"],[12923,1,"하"],[12924,1,"참고"],[12925,1,"주의"],[12926,1,"우"],[12927,2],[12928,1,"一"],[12929,1,"二"],[12930,1,"三"],[12931,1,"四"],[12932,1,"五"],[12933,1,"六"],[12934,1,"七"],[12935,1,"八"],[12936,1,"九"],[12937,1,"十"],[12938,1,"月"],[12939,1,"火"],[12940,1,"水"],[12941,1,"木"],[12942,1,"金"],[12943,1,"土"],[12944,1,"日"],[12945,1,"株"],[12946,1,"有"],[12947,1,"社"],[12948,1,"名"],[12949,1,"特"],[12950,1,"財"],[12951,1,"祝"],[12952,1,"労"],[12953,1,"秘"],[12954,1,"男"],[12955,1,"女"],[12956,1,"適"],[12957,1,"優"],[12958,1,"印"],[12959,1,"注"],[12960,1,"項"],[12961,1,"休"],[12962,1,"写"],[12963,1,"正"],[12964,1,"上"],[12965,1,"中"],[12966,1,"下"],[12967,1,"左"],[12968,1,"右"],[12969,1,"医"],[12970,1,"宗"],[12971,1,"学"],[12972,1,"監"],[12973,1,"企"],[12974,1,"資"],[12975,1,"協"],[12976,1,"夜"],[12977,1,"36"],[12978,1,"37"],[12979,1,"38"],[12980,1,"39"],[12981,1,"40"],[12982,1,"41"],[12983,1,"42"],[12984,1,"43"],[12985,1,"44"],[12986,1,"45"],[12987,1,"46"],[12988,1,"47"],[12989,1,"48"],[12990,1,"49"],[12991,1,"50"],[12992,1,"1月"],[12993,1,"2月"],[12994,1,"3月"],[12995,1,"4月"],[12996,1,"5月"],[12997,1,"6月"],[12998,1,"7月"],[12999,1,"8月"],[13000,1,"9月"],[13001,1,"10月"],[13002,1,"11月"],[13003,1,"12月"],[13004,1,"hg"],[13005,1,"erg"],[13006,1,"ev"],[13007,1,"ltd"],[13008,1,"ア"],[13009,1,"イ"],[13010,1,"ウ"],[13011,1,"エ"],[13012,1,"オ"],[13013,1,"カ"],[13014,1,"キ"],[13015,1,"ク"],[13016,1,"ケ"],[13017,1,"コ"],[13018,1,"サ"],[13019,1,"シ"],[13020,1,"ス"],[13021,1,"セ"],[13022,1,"ソ"],[13023,1,"タ"],[13024,1,"チ"],[13025,1,"ツ"],[13026,1,"テ"],[13027,1,"ト"],[13028,1,"ナ"],[13029,1,"ニ"],[13030,1,"ヌ"],[13031,1,"ネ"],[13032,1,"ノ"],[13033,1,"ハ"],[13034,1,"ヒ"],[13035,1,"フ"],[13036,1,"ヘ"],[13037,1,"ホ"],[13038,1,"マ"],[13039,1,"ミ"],[13040,1,"ム"],[13041,1,"メ"],[13042,1,"モ"],[13043,1,"ヤ"],[13044,1,"ユ"],[13045,1,"ヨ"],[13046,1,"ラ"],[13047,1,"リ"],[13048,1,"ル"],[13049,1,"レ"],[13050,1,"ロ"],[13051,1,"ワ"],[13052,1,"ヰ"],[13053,1,"ヱ"],[13054,1,"ヲ"],[13055,1,"令和"],[13056,1,"アパート"],[13057,1,"アルファ"],[13058,1,"アンペア"],[13059,1,"アール"],[13060,1,"イニング"],[13061,1,"インチ"],[13062,1,"ウォン"],[13063,1,"エスクード"],[13064,1,"エーカー"],[13065,1,"オンス"],[13066,1,"オーム"],[13067,1,"カイリ"],[13068,1,"カラット"],[13069,1,"カロリー"],[13070,1,"ガロン"],[13071,1,"ガンマ"],[13072,1,"ギガ"],[13073,1,"ギニー"],[13074,1,"キュリー"],[13075,1,"ギルダー"],[13076,1,"キロ"],[13077,1,"キログラム"],[13078,1,"キロメートル"],[13079,1,"キロワット"],[13080,1,"グラム"],[13081,1,"グラムトン"],[13082,1,"クルゼイロ"],[13083,1,"クローネ"],[13084,1,"ケース"],[13085,1,"コルナ"],[13086,1,"コーポ"],[13087,1,"サイクル"],[13088,1,"サンチーム"],[13089,1,"シリング"],[13090,1,"センチ"],[13091,1,"セント"],[13092,1,"ダース"],[13093,1,"デシ"],[13094,1,"ドル"],[13095,1,"トン"],[13096,1,"ナノ"],[13097,1,"ノット"],[13098,1,"ハイツ"],[13099,1,"パーセント"],[13100,1,"パーツ"],[13101,1,"バーレル"],[13102,1,"ピアストル"],[13103,1,"ピクル"],[13104,1,"ピコ"],[13105,1,"ビル"],[13106,1,"ファラッド"],[13107,1,"フィート"],[13108,1,"ブッシェル"],[13109,1,"フラン"],[13110,1,"ヘクタール"],[13111,1,"ペソ"],[13112,1,"ペニヒ"],[13113,1,"ヘルツ"],[13114,1,"ペンス"],[13115,1,"ページ"],[13116,1,"ベータ"],[13117,1,"ポイント"],[13118,1,"ボルト"],[13119,1,"ホン"],[13120,1,"ポンド"],[13121,1,"ホール"],[13122,1,"ホーン"],[13123,1,"マイクロ"],[13124,1,"マイル"],[13125,1,"マッハ"],[13126,1,"マルク"],[13127,1,"マンション"],[13128,1,"ミクロン"],[13129,1,"ミリ"],[13130,1,"ミリバール"],[13131,1,"メガ"],[13132,1,"メガトン"],[13133,1,"メートル"],[13134,1,"ヤード"],[13135,1,"ヤール"],[13136,1,"ユアン"],[13137,1,"リットル"],[13138,1,"リラ"],[13139,1,"ルピー"],[13140,1,"ルーブル"],[13141,1,"レム"],[13142,1,"レントゲン"],[13143,1,"ワット"],[13144,1,"0点"],[13145,1,"1点"],[13146,1,"2点"],[13147,1,"3点"],[13148,1,"4点"],[13149,1,"5点"],[13150,1,"6点"],[13151,1,"7点"],[13152,1,"8点"],[13153,1,"9点"],[13154,1,"10点"],[13155,1,"11点"],[13156,1,"12点"],[13157,1,"13点"],[13158,1,"14点"],[13159,1,"15点"],[13160,1,"16点"],[13161,1,"17点"],[13162,1,"18点"],[13163,1,"19点"],[13164,1,"20点"],[13165,1,"21点"],[13166,1,"22点"],[13167,1,"23点"],[13168,1,"24点"],[13169,1,"hpa"],[13170,1,"da"],[13171,1,"au"],[13172,1,"bar"],[13173,1,"ov"],[13174,1,"pc"],[13175,1,"dm"],[13176,1,"dm2"],[13177,1,"dm3"],[13178,1,"iu"],[13179,1,"平成"],[13180,1,"昭和"],[13181,1,"大正"],[13182,1,"明治"],[13183,1,"株式会社"],[13184,1,"pa"],[13185,1,"na"],[13186,1,"μa"],[13187,1,"ma"],[13188,1,"ka"],[13189,1,"kb"],[13190,1,"mb"],[13191,1,"gb"],[13192,1,"cal"],[13193,1,"kcal"],[13194,1,"pf"],[13195,1,"nf"],[13196,1,"μf"],[13197,1,"μg"],[13198,1,"mg"],[13199,1,"kg"],[13200,1,"hz"],[13201,1,"khz"],[13202,1,"mhz"],[13203,1,"ghz"],[13204,1,"thz"],[13205,1,"μl"],[13206,1,"ml"],[13207,1,"dl"],[13208,1,"kl"],[13209,1,"fm"],[13210,1,"nm"],[13211,1,"μm"],[13212,1,"mm"],[13213,1,"cm"],[13214,1,"km"],[13215,1,"mm2"],[13216,1,"cm2"],[13217,1,"m2"],[13218,1,"km2"],[13219,1,"mm3"],[13220,1,"cm3"],[13221,1,"m3"],[13222,1,"km3"],[13223,1,"m∕s"],[13224,1,"m∕s2"],[13225,1,"pa"],[13226,1,"kpa"],[13227,1,"mpa"],[13228,1,"gpa"],[13229,1,"rad"],[13230,1,"rad∕s"],[13231,1,"rad∕s2"],[13232,1,"ps"],[13233,1,"ns"],[13234,1,"μs"],[13235,1,"ms"],[13236,1,"pv"],[13237,1,"nv"],[13238,1,"μv"],[13239,1,"mv"],[13240,1,"kv"],[13241,1,"mv"],[13242,1,"pw"],[13243,1,"nw"],[13244,1,"μw"],[13245,1,"mw"],[13246,1,"kw"],[13247,1,"mw"],[13248,1,"kω"],[13249,1,"mω"],[13250,3],[13251,1,"bq"],[13252,1,"cc"],[13253,1,"cd"],[13254,1,"c∕kg"],[13255,3],[13256,1,"db"],[13257,1,"gy"],[13258,1,"ha"],[13259,1,"hp"],[13260,1,"in"],[13261,1,"kk"],[13262,1,"km"],[13263,1,"kt"],[13264,1,"lm"],[13265,1,"ln"],[13266,1,"log"],[13267,1,"lx"],[13268,1,"mb"],[13269,1,"mil"],[13270,1,"mol"],[13271,1,"ph"],[13272,3],[13273,1,"ppm"],[13274,1,"pr"],[13275,1,"sr"],[13276,1,"sv"],[13277,1,"wb"],[13278,1,"v∕m"],[13279,1,"a∕m"],[13280,1,"1日"],[13281,1,"2日"],[13282,1,"3日"],[13283,1,"4日"],[13284,1,"5日"],[13285,1,"6日"],[13286,1,"7日"],[13287,1,"8日"],[13288,1,"9日"],[13289,1,"10日"],[13290,1,"11日"],[13291,1,"12日"],[13292,1,"13日"],[13293,1,"14日"],[13294,1,"15日"],[13295,1,"16日"],[13296,1,"17日"],[13297,1,"18日"],[13298,1,"19日"],[13299,1,"20日"],[13300,1,"21日"],[13301,1,"22日"],[13302,1,"23日"],[13303,1,"24日"],[13304,1,"25日"],[13305,1,"26日"],[13306,1,"27日"],[13307,1,"28日"],[13308,1,"29日"],[13309,1,"30日"],[13310,1,"31日"],[13311,1,"gal"],[[13312,19893],2],[[19894,19903],2],[[19904,19967],2],[[19968,40869],2],[[40870,40891],2],[[40892,40899],2],[[40900,40907],2],[40908,2],[[40909,40917],2],[[40918,40938],2],[[40939,40943],2],[[40944,40956],2],[[40957,40959],2],[[40960,42124],2],[[42125,42127],3],[[42128,42145],2],[[42146,42147],2],[[42148,42163],2],[42164,2],[[42165,42176],2],[42177,2],[[42178,42180],2],[42181,2],[42182,2],[[42183,42191],3],[[42192,42237],2],[[42238,42239],2],[[42240,42508],2],[[42509,42511],2],[[42512,42539],2],[[42540,42559],3],[42560,1,"ꙁ"],[42561,2],[42562,1,"ꙃ"],[42563,2],[42564,1,"ꙅ"],[42565,2],[42566,1,"ꙇ"],[42567,2],[42568,1,"ꙉ"],[42569,2],[42570,1,"ꙋ"],[42571,2],[42572,1,"ꙍ"],[42573,2],[42574,1,"ꙏ"],[42575,2],[42576,1,"ꙑ"],[42577,2],[42578,1,"ꙓ"],[42579,2],[42580,1,"ꙕ"],[42581,2],[42582,1,"ꙗ"],[42583,2],[42584,1,"ꙙ"],[42585,2],[42586,1,"ꙛ"],[42587,2],[42588,1,"ꙝ"],[42589,2],[42590,1,"ꙟ"],[42591,2],[42592,1,"ꙡ"],[42593,2],[42594,1,"ꙣ"],[42595,2],[42596,1,"ꙥ"],[42597,2],[42598,1,"ꙧ"],[42599,2],[42600,1,"ꙩ"],[42601,2],[42602,1,"ꙫ"],[42603,2],[42604,1,"ꙭ"],[[42605,42607],2],[[42608,42611],2],[[42612,42619],2],[[42620,42621],2],[42622,2],[42623,2],[42624,1,"ꚁ"],[42625,2],[42626,1,"ꚃ"],[42627,2],[42628,1,"ꚅ"],[42629,2],[42630,1,"ꚇ"],[42631,2],[42632,1,"ꚉ"],[42633,2],[42634,1,"ꚋ"],[42635,2],[42636,1,"ꚍ"],[42637,2],[42638,1,"ꚏ"],[42639,2],[42640,1,"ꚑ"],[42641,2],[42642,1,"ꚓ"],[42643,2],[42644,1,"ꚕ"],[42645,2],[42646,1,"ꚗ"],[42647,2],[42648,1,"ꚙ"],[42649,2],[42650,1,"ꚛ"],[42651,2],[42652,1,"ъ"],[42653,1,"ь"],[42654,2],[42655,2],[[42656,42725],2],[[42726,42735],2],[[42736,42737],2],[[42738,42743],2],[[42744,42751],3],[[42752,42774],2],[[42775,42778],2],[[42779,42783],2],[[42784,42785],2],[42786,1,"ꜣ"],[42787,2],[42788,1,"ꜥ"],[42789,2],[42790,1,"ꜧ"],[42791,2],[42792,1,"ꜩ"],[42793,2],[42794,1,"ꜫ"],[42795,2],[42796,1,"ꜭ"],[42797,2],[42798,1,"ꜯ"],[[42799,42801],2],[42802,1,"ꜳ"],[42803,2],[42804,1,"ꜵ"],[42805,2],[42806,1,"ꜷ"],[42807,2],[42808,1,"ꜹ"],[42809,2],[42810,1,"ꜻ"],[42811,2],[42812,1,"ꜽ"],[42813,2],[42814,1,"ꜿ"],[42815,2],[42816,1,"ꝁ"],[42817,2],[42818,1,"ꝃ"],[42819,2],[42820,1,"ꝅ"],[42821,2],[42822,1,"ꝇ"],[42823,2],[42824,1,"ꝉ"],[42825,2],[42826,1,"ꝋ"],[42827,2],[42828,1,"ꝍ"],[42829,2],[42830,1,"ꝏ"],[42831,2],[42832,1,"ꝑ"],[42833,2],[42834,1,"ꝓ"],[42835,2],[42836,1,"ꝕ"],[42837,2],[42838,1,"ꝗ"],[42839,2],[42840,1,"ꝙ"],[42841,2],[42842,1,"ꝛ"],[42843,2],[42844,1,"ꝝ"],[42845,2],[42846,1,"ꝟ"],[42847,2],[42848,1,"ꝡ"],[42849,2],[42850,1,"ꝣ"],[42851,2],[42852,1,"ꝥ"],[42853,2],[42854,1,"ꝧ"],[42855,2],[42856,1,"ꝩ"],[42857,2],[42858,1,"ꝫ"],[42859,2],[42860,1,"ꝭ"],[42861,2],[42862,1,"ꝯ"],[42863,2],[42864,1,"ꝯ"],[[42865,42872],2],[42873,1,"ꝺ"],[42874,2],[42875,1,"ꝼ"],[42876,2],[42877,1,"ᵹ"],[42878,1,"ꝿ"],[42879,2],[42880,1,"ꞁ"],[42881,2],[42882,1,"ꞃ"],[42883,2],[42884,1,"ꞅ"],[42885,2],[42886,1,"ꞇ"],[[42887,42888],2],[[42889,42890],2],[42891,1,"ꞌ"],[42892,2],[42893,1,"ɥ"],[42894,2],[42895,2],[42896,1,"ꞑ"],[42897,2],[42898,1,"ꞓ"],[42899,2],[[42900,42901],2],[42902,1,"ꞗ"],[42903,2],[42904,1,"ꞙ"],[42905,2],[42906,1,"ꞛ"],[42907,2],[42908,1,"ꞝ"],[42909,2],[42910,1,"ꞟ"],[42911,2],[42912,1,"ꞡ"],[42913,2],[42914,1,"ꞣ"],[42915,2],[42916,1,"ꞥ"],[42917,2],[42918,1,"ꞧ"],[42919,2],[42920,1,"ꞩ"],[42921,2],[42922,1,"ɦ"],[42923,1,"ɜ"],[42924,1,"ɡ"],[42925,1,"ɬ"],[42926,1,"ɪ"],[42927,2],[42928,1,"ʞ"],[42929,1,"ʇ"],[42930,1,"ʝ"],[42931,1,"ꭓ"],[42932,1,"ꞵ"],[42933,2],[42934,1,"ꞷ"],[42935,2],[42936,1,"ꞹ"],[42937,2],[42938,1,"ꞻ"],[42939,2],[42940,1,"ꞽ"],[42941,2],[42942,1,"ꞿ"],[42943,2],[42944,1,"ꟁ"],[42945,2],[42946,1,"ꟃ"],[42947,2],[42948,1,"ꞔ"],[42949,1,"ʂ"],[42950,1,"ᶎ"],[42951,1,"ꟈ"],[42952,2],[42953,1,"ꟊ"],[42954,2],[42955,1,"ɤ"],[42956,1,"ꟍ"],[42957,2],[[42958,42959],3],[42960,1,"ꟑ"],[42961,2],[42962,3],[42963,2],[42964,3],[42965,2],[42966,1,"ꟗ"],[42967,2],[42968,1,"ꟙ"],[42969,2],[42970,1,"ꟛ"],[42971,2],[42972,1,"ƛ"],[[42973,42993],3],[42994,1,"c"],[42995,1,"f"],[42996,1,"q"],[42997,1,"ꟶ"],[42998,2],[42999,2],[43000,1,"ħ"],[43001,1,"œ"],[43002,2],[[43003,43007],2],[[43008,43047],2],[[43048,43051],2],[43052,2],[[43053,43055],3],[[43056,43065],2],[[43066,43071],3],[[43072,43123],2],[[43124,43127],2],[[43128,43135],3],[[43136,43204],2],[43205,2],[[43206,43213],3],[[43214,43215],2],[[43216,43225],2],[[43226,43231],3],[[43232,43255],2],[[43256,43258],2],[43259,2],[43260,2],[43261,2],[[43262,43263],2],[[43264,43309],2],[[43310,43311],2],[[43312,43347],2],[[43348,43358],3],[43359,2],[[43360,43388],2],[[43389,43391],3],[[43392,43456],2],[[43457,43469],2],[43470,3],[[43471,43481],2],[[43482,43485],3],[[43486,43487],2],[[43488,43518],2],[43519,3],[[43520,43574],2],[[43575,43583],3],[[43584,43597],2],[[43598,43599],3],[[43600,43609],2],[[43610,43611],3],[[43612,43615],2],[[43616,43638],2],[[43639,43641],2],[[43642,43643],2],[[43644,43647],2],[[43648,43714],2],[[43715,43738],3],[[43739,43741],2],[[43742,43743],2],[[43744,43759],2],[[43760,43761],2],[[43762,43766],2],[[43767,43776],3],[[43777,43782],2],[[43783,43784],3],[[43785,43790],2],[[43791,43792],3],[[43793,43798],2],[[43799,43807],3],[[43808,43814],2],[43815,3],[[43816,43822],2],[43823,3],[[43824,43866],2],[43867,2],[43868,1,"ꜧ"],[43869,1,"ꬷ"],[43870,1,"ɫ"],[43871,1,"ꭒ"],[[43872,43875],2],[[43876,43877],2],[[43878,43879],2],[43880,2],[43881,1,"ʍ"],[[43882,43883],2],[[43884,43887],3],[43888,1,"Ꭰ"],[43889,1,"Ꭱ"],[43890,1,"Ꭲ"],[43891,1,"Ꭳ"],[43892,1,"Ꭴ"],[43893,1,"Ꭵ"],[43894,1,"Ꭶ"],[43895,1,"Ꭷ"],[43896,1,"Ꭸ"],[43897,1,"Ꭹ"],[43898,1,"Ꭺ"],[43899,1,"Ꭻ"],[43900,1,"Ꭼ"],[43901,1,"Ꭽ"],[43902,1,"Ꭾ"],[43903,1,"Ꭿ"],[43904,1,"Ꮀ"],[43905,1,"Ꮁ"],[43906,1,"Ꮂ"],[43907,1,"Ꮃ"],[43908,1,"Ꮄ"],[43909,1,"Ꮅ"],[43910,1,"Ꮆ"],[43911,1,"Ꮇ"],[43912,1,"Ꮈ"],[43913,1,"Ꮉ"],[43914,1,"Ꮊ"],[43915,1,"Ꮋ"],[43916,1,"Ꮌ"],[43917,1,"Ꮍ"],[43918,1,"Ꮎ"],[43919,1,"Ꮏ"],[43920,1,"Ꮐ"],[43921,1,"Ꮑ"],[43922,1,"Ꮒ"],[43923,1,"Ꮓ"],[43924,1,"Ꮔ"],[43925,1,"Ꮕ"],[43926,1,"Ꮖ"],[43927,1,"Ꮗ"],[43928,1,"Ꮘ"],[43929,1,"Ꮙ"],[43930,1,"Ꮚ"],[43931,1,"Ꮛ"],[43932,1,"Ꮜ"],[43933,1,"Ꮝ"],[43934,1,"Ꮞ"],[43935,1,"Ꮟ"],[43936,1,"Ꮠ"],[43937,1,"Ꮡ"],[43938,1,"Ꮢ"],[43939,1,"Ꮣ"],[43940,1,"Ꮤ"],[43941,1,"Ꮥ"],[43942,1,"Ꮦ"],[43943,1,"Ꮧ"],[43944,1,"Ꮨ"],[43945,1,"Ꮩ"],[43946,1,"Ꮪ"],[43947,1,"Ꮫ"],[43948,1,"Ꮬ"],[43949,1,"Ꮭ"],[43950,1,"Ꮮ"],[43951,1,"Ꮯ"],[43952,1,"Ꮰ"],[43953,1,"Ꮱ"],[43954,1,"Ꮲ"],[43955,1,"Ꮳ"],[43956,1,"Ꮴ"],[43957,1,"Ꮵ"],[43958,1,"Ꮶ"],[43959,1,"Ꮷ"],[43960,1,"Ꮸ"],[43961,1,"Ꮹ"],[43962,1,"Ꮺ"],[43963,1,"Ꮻ"],[43964,1,"Ꮼ"],[43965,1,"Ꮽ"],[43966,1,"Ꮾ"],[43967,1,"Ꮿ"],[[43968,44010],2],[44011,2],[[44012,44013],2],[[44014,44015],3],[[44016,44025],2],[[44026,44031],3],[[44032,55203],2],[[55204,55215],3],[[55216,55238],2],[[55239,55242],3],[[55243,55291],2],[[55292,55295],3],[[55296,57343],3],[[57344,63743],3],[63744,1,"豈"],[63745,1,"更"],[63746,1,"車"],[63747,1,"賈"],[63748,1,"滑"],[63749,1,"串"],[63750,1,"句"],[[63751,63752],1,"龜"],[63753,1,"契"],[63754,1,"金"],[63755,1,"喇"],[63756,1,"奈"],[63757,1,"懶"],[63758,1,"癩"],[63759,1,"羅"],[63760,1,"蘿"],[63761,1,"螺"],[63762,1,"裸"],[63763,1,"邏"],[63764,1,"樂"],[63765,1,"洛"],[63766,1,"烙"],[63767,1,"珞"],[63768,1,"落"],[63769,1,"酪"],[63770,1,"駱"],[63771,1,"亂"],[63772,1,"卵"],[63773,1,"欄"],[63774,1,"爛"],[63775,1,"蘭"],[63776,1,"鸞"],[63777,1,"嵐"],[63778,1,"濫"],[63779,1,"藍"],[63780,1,"襤"],[63781,1,"拉"],[63782,1,"臘"],[63783,1,"蠟"],[63784,1,"廊"],[63785,1,"朗"],[63786,1,"浪"],[63787,1,"狼"],[63788,1,"郎"],[63789,1,"來"],[63790,1,"冷"],[63791,1,"勞"],[63792,1,"擄"],[63793,1,"櫓"],[63794,1,"爐"],[63795,1,"盧"],[63796,1,"老"],[63797,1,"蘆"],[63798,1,"虜"],[63799,1,"路"],[63800,1,"露"],[63801,1,"魯"],[63802,1,"鷺"],[63803,1,"碌"],[63804,1,"祿"],[63805,1,"綠"],[63806,1,"菉"],[63807,1,"錄"],[63808,1,"鹿"],[63809,1,"論"],[63810,1,"壟"],[63811,1,"弄"],[63812,1,"籠"],[63813,1,"聾"],[63814,1,"牢"],[63815,1,"磊"],[63816,1,"賂"],[63817,1,"雷"],[63818,1,"壘"],[63819,1,"屢"],[63820,1,"樓"],[63821,1,"淚"],[63822,1,"漏"],[63823,1,"累"],[63824,1,"縷"],[63825,1,"陋"],[63826,1,"勒"],[63827,1,"肋"],[63828,1,"凜"],[63829,1,"凌"],[63830,1,"稜"],[63831,1,"綾"],[63832,1,"菱"],[63833,1,"陵"],[63834,1,"讀"],[63835,1,"拏"],[63836,1,"樂"],[63837,1,"諾"],[63838,1,"丹"],[63839,1,"寧"],[63840,1,"怒"],[63841,1,"率"],[63842,1,"異"],[63843,1,"北"],[63844,1,"磻"],[63845,1,"便"],[63846,1,"復"],[63847,1,"不"],[63848,1,"泌"],[63849,1,"數"],[63850,1,"索"],[63851,1,"參"],[63852,1,"塞"],[63853,1,"省"],[63854,1,"葉"],[63855,1,"說"],[63856,1,"殺"],[63857,1,"辰"],[63858,1,"沈"],[63859,1,"拾"],[63860,1,"若"],[63861,1,"掠"],[63862,1,"略"],[63863,1,"亮"],[63864,1,"兩"],[63865,1,"凉"],[63866,1,"梁"],[63867,1,"糧"],[63868,1,"良"],[63869,1,"諒"],[63870,1,"量"],[63871,1,"勵"],[63872,1,"呂"],[63873,1,"女"],[63874,1,"廬"],[63875,1,"旅"],[63876,1,"濾"],[63877,1,"礪"],[63878,1,"閭"],[63879,1,"驪"],[63880,1,"麗"],[63881,1,"黎"],[63882,1,"力"],[63883,1,"曆"],[63884,1,"歷"],[63885,1,"轢"],[63886,1,"年"],[63887,1,"憐"],[63888,1,"戀"],[63889,1,"撚"],[63890,1,"漣"],[63891,1,"煉"],[63892,1,"璉"],[63893,1,"秊"],[63894,1,"練"],[63895,1,"聯"],[63896,1,"輦"],[63897,1,"蓮"],[63898,1,"連"],[63899,1,"鍊"],[63900,1,"列"],[63901,1,"劣"],[63902,1,"咽"],[63903,1,"烈"],[63904,1,"裂"],[63905,1,"說"],[63906,1,"廉"],[63907,1,"念"],[63908,1,"捻"],[63909,1,"殮"],[63910,1,"簾"],[63911,1,"獵"],[63912,1,"令"],[63913,1,"囹"],[63914,1,"寧"],[63915,1,"嶺"],[63916,1,"怜"],[63917,1,"玲"],[63918,1,"瑩"],[63919,1,"羚"],[63920,1,"聆"],[63921,1,"鈴"],[63922,1,"零"],[63923,1,"靈"],[63924,1,"領"],[63925,1,"例"],[63926,1,"禮"],[63927,1,"醴"],[63928,1,"隸"],[63929,1,"惡"],[63930,1,"了"],[63931,1,"僚"],[63932,1,"寮"],[63933,1,"尿"],[63934,1,"料"],[63935,1,"樂"],[63936,1,"燎"],[63937,1,"療"],[63938,1,"蓼"],[63939,1,"遼"],[63940,1,"龍"],[63941,1,"暈"],[63942,1,"阮"],[63943,1,"劉"],[63944,1,"杻"],[63945,1,"柳"],[63946,1,"流"],[63947,1,"溜"],[63948,1,"琉"],[63949,1,"留"],[63950,1,"硫"],[63951,1,"紐"],[63952,1,"類"],[63953,1,"六"],[63954,1,"戮"],[63955,1,"陸"],[63956,1,"倫"],[63957,1,"崙"],[63958,1,"淪"],[63959,1,"輪"],[63960,1,"律"],[63961,1,"慄"],[63962,1,"栗"],[63963,1,"率"],[63964,1,"隆"],[63965,1,"利"],[63966,1,"吏"],[63967,1,"履"],[63968,1,"易"],[63969,1,"李"],[63970,1,"梨"],[63971,1,"泥"],[63972,1,"理"],[63973,1,"痢"],[63974,1,"罹"],[63975,1,"裏"],[63976,1,"裡"],[63977,1,"里"],[63978,1,"離"],[63979,1,"匿"],[63980,1,"溺"],[63981,1,"吝"],[63982,1,"燐"],[63983,1,"璘"],[63984,1,"藺"],[63985,1,"隣"],[63986,1,"鱗"],[63987,1,"麟"],[63988,1,"林"],[63989,1,"淋"],[63990,1,"臨"],[63991,1,"立"],[63992,1,"笠"],[63993,1,"粒"],[63994,1,"狀"],[63995,1,"炙"],[63996,1,"識"],[63997,1,"什"],[63998,1,"茶"],[63999,1,"刺"],[64000,1,"切"],[64001,1,"度"],[64002,1,"拓"],[64003,1,"糖"],[64004,1,"宅"],[64005,1,"洞"],[64006,1,"暴"],[64007,1,"輻"],[64008,1,"行"],[64009,1,"降"],[64010,1,"見"],[64011,1,"廓"],[64012,1,"兀"],[64013,1,"嗀"],[[64014,64015],2],[64016,1,"塚"],[64017,2],[64018,1,"晴"],[[64019,64020],2],[64021,1,"凞"],[64022,1,"猪"],[64023,1,"益"],[64024,1,"礼"],[64025,1,"神"],[64026,1,"祥"],[64027,1,"福"],[64028,1,"靖"],[64029,1,"精"],[64030,1,"羽"],[64031,2],[64032,1,"蘒"],[64033,2],[64034,1,"諸"],[[64035,64036],2],[64037,1,"逸"],[64038,1,"都"],[[64039,64041],2],[64042,1,"飯"],[64043,1,"飼"],[64044,1,"館"],[64045,1,"鶴"],[64046,1,"郞"],[64047,1,"隷"],[64048,1,"侮"],[64049,1,"僧"],[64050,1,"免"],[64051,1,"勉"],[64052,1,"勤"],[64053,1,"卑"],[64054,1,"喝"],[64055,1,"嘆"],[64056,1,"器"],[64057,1,"塀"],[64058,1,"墨"],[64059,1,"層"],[64060,1,"屮"],[64061,1,"悔"],[64062,1,"慨"],[64063,1,"憎"],[64064,1,"懲"],[64065,1,"敏"],[64066,1,"既"],[64067,1,"暑"],[64068,1,"梅"],[64069,1,"海"],[64070,1,"渚"],[64071,1,"漢"],[64072,1,"煮"],[64073,1,"爫"],[64074,1,"琢"],[64075,1,"碑"],[64076,1,"社"],[64077,1,"祉"],[64078,1,"祈"],[64079,1,"祐"],[64080,1,"祖"],[64081,1,"祝"],[64082,1,"禍"],[64083,1,"禎"],[64084,1,"穀"],[64085,1,"突"],[64086,1,"節"],[64087,1,"練"],[64088,1,"縉"],[64089,1,"繁"],[64090,1,"署"],[64091,1,"者"],[64092,1,"臭"],[[64093,64094],1,"艹"],[64095,1,"著"],[64096,1,"褐"],[64097,1,"視"],[64098,1,"謁"],[64099,1,"謹"],[64100,1,"賓"],[64101,1,"贈"],[64102,1,"辶"],[64103,1,"逸"],[64104,1,"難"],[64105,1,"響"],[64106,1,"頻"],[64107,1,"恵"],[64108,1,"𤋮"],[64109,1,"舘"],[[64110,64111],3],[64112,1,"並"],[64113,1,"况"],[64114,1,"全"],[64115,1,"侀"],[64116,1,"充"],[64117,1,"冀"],[64118,1,"勇"],[64119,1,"勺"],[64120,1,"喝"],[64121,1,"啕"],[64122,1,"喙"],[64123,1,"嗢"],[64124,1,"塚"],[64125,1,"墳"],[64126,1,"奄"],[64127,1,"奔"],[64128,1,"婢"],[64129,1,"嬨"],[64130,1,"廒"],[64131,1,"廙"],[64132,1,"彩"],[64133,1,"徭"],[64134,1,"惘"],[64135,1,"慎"],[64136,1,"愈"],[64137,1,"憎"],[64138,1,"慠"],[64139,1,"懲"],[64140,1,"戴"],[64141,1,"揄"],[64142,1,"搜"],[64143,1,"摒"],[64144,1,"敖"],[64145,1,"晴"],[64146,1,"朗"],[64147,1,"望"],[64148,1,"杖"],[64149,1,"歹"],[64150,1,"殺"],[64151,1,"流"],[64152,1,"滛"],[64153,1,"滋"],[64154,1,"漢"],[64155,1,"瀞"],[64156,1,"煮"],[64157,1,"瞧"],[64158,1,"爵"],[64159,1,"犯"],[64160,1,"猪"],[64161,1,"瑱"],[64162,1,"甆"],[64163,1,"画"],[64164,1,"瘝"],[64165,1,"瘟"],[64166,1,"益"],[64167,1,"盛"],[64168,1,"直"],[64169,1,"睊"],[64170,1,"着"],[64171,1,"磌"],[64172,1,"窱"],[64173,1,"節"],[64174,1,"类"],[64175,1,"絛"],[64176,1,"練"],[64177,1,"缾"],[64178,1,"者"],[64179,1,"荒"],[64180,1,"華"],[64181,1,"蝹"],[64182,1,"襁"],[64183,1,"覆"],[64184,1,"視"],[64185,1,"調"],[64186,1,"諸"],[64187,1,"請"],[64188,1,"謁"],[64189,1,"諾"],[64190,1,"諭"],[64191,1,"謹"],[64192,1,"變"],[64193,1,"贈"],[64194,1,"輸"],[64195,1,"遲"],[64196,1,"醙"],[64197,1,"鉶"],[64198,1,"陼"],[64199,1,"難"],[64200,1,"靖"],[64201,1,"韛"],[64202,1,"響"],[64203,1,"頋"],[64204,1,"頻"],[64205,1,"鬒"],[64206,1,"龜"],[64207,1,"𢡊"],[64208,1,"𢡄"],[64209,1,"𣏕"],[64210,1,"㮝"],[64211,1,"䀘"],[64212,1,"䀹"],[64213,1,"𥉉"],[64214,1,"𥳐"],[64215,1,"𧻓"],[64216,1,"齃"],[64217,1,"龎"],[[64218,64255],3],[64256,1,"ff"],[64257,1,"fi"],[64258,1,"fl"],[64259,1,"ffi"],[64260,1,"ffl"],[[64261,64262],1,"st"],[[64263,64274],3],[64275,1,"մն"],[64276,1,"մե"],[64277,1,"մի"],[64278,1,"վն"],[64279,1,"մխ"],[[64280,64284],3],[64285,1,"יִ"],[64286,2],[64287,1,"ײַ"],[64288,1,"ע"],[64289,1,"א"],[64290,1,"ד"],[64291,1,"ה"],[64292,1,"כ"],[64293,1,"ל"],[64294,1,"ם"],[64295,1,"ר"],[64296,1,"ת"],[64297,1,"+"],[64298,1,"שׁ"],[64299,1,"שׂ"],[64300,1,"שּׁ"],[64301,1,"שּׂ"],[64302,1,"אַ"],[64303,1,"אָ"],[64304,1,"אּ"],[64305,1,"בּ"],[64306,1,"גּ"],[64307,1,"דּ"],[64308,1,"הּ"],[64309,1,"וּ"],[64310,1,"זּ"],[64311,3],[64312,1,"טּ"],[64313,1,"יּ"],[64314,1,"ךּ"],[64315,1,"כּ"],[64316,1,"לּ"],[64317,3],[64318,1,"מּ"],[64319,3],[64320,1,"נּ"],[64321,1,"סּ"],[64322,3],[64323,1,"ףּ"],[64324,1,"פּ"],[64325,3],[64326,1,"צּ"],[64327,1,"קּ"],[64328,1,"רּ"],[64329,1,"שּ"],[64330,1,"תּ"],[64331,1,"וֹ"],[64332,1,"בֿ"],[64333,1,"כֿ"],[64334,1,"פֿ"],[64335,1,"אל"],[[64336,64337],1,"ٱ"],[[64338,64341],1,"ٻ"],[[64342,64345],1,"پ"],[[64346,64349],1,"ڀ"],[[64350,64353],1,"ٺ"],[[64354,64357],1,"ٿ"],[[64358,64361],1,"ٹ"],[[64362,64365],1,"ڤ"],[[64366,64369],1,"ڦ"],[[64370,64373],1,"ڄ"],[[64374,64377],1,"ڃ"],[[64378,64381],1,"چ"],[[64382,64385],1,"ڇ"],[[64386,64387],1,"ڍ"],[[64388,64389],1,"ڌ"],[[64390,64391],1,"ڎ"],[[64392,64393],1,"ڈ"],[[64394,64395],1,"ژ"],[[64396,64397],1,"ڑ"],[[64398,64401],1,"ک"],[[64402,64405],1,"گ"],[[64406,64409],1,"ڳ"],[[64410,64413],1,"ڱ"],[[64414,64415],1,"ں"],[[64416,64419],1,"ڻ"],[[64420,64421],1,"ۀ"],[[64422,64425],1,"ہ"],[[64426,64429],1,"ھ"],[[64430,64431],1,"ے"],[[64432,64433],1,"ۓ"],[[64434,64449],2],[64450,2],[[64451,64466],3],[[64467,64470],1,"ڭ"],[[64471,64472],1,"ۇ"],[[64473,64474],1,"ۆ"],[[64475,64476],1,"ۈ"],[64477,1,"ۇٴ"],[[64478,64479],1,"ۋ"],[[64480,64481],1,"ۅ"],[[64482,64483],1,"ۉ"],[[64484,64487],1,"ې"],[[64488,64489],1,"ى"],[[64490,64491],1,"ئا"],[[64492,64493],1,"ئە"],[[64494,64495],1,"ئو"],[[64496,64497],1,"ئۇ"],[[64498,64499],1,"ئۆ"],[[64500,64501],1,"ئۈ"],[[64502,64504],1,"ئې"],[[64505,64507],1,"ئى"],[[64508,64511],1,"ی"],[64512,1,"ئج"],[64513,1,"ئح"],[64514,1,"ئم"],[64515,1,"ئى"],[64516,1,"ئي"],[64517,1,"بج"],[64518,1,"بح"],[64519,1,"بخ"],[64520,1,"بم"],[64521,1,"بى"],[64522,1,"بي"],[64523,1,"تج"],[64524,1,"تح"],[64525,1,"تخ"],[64526,1,"تم"],[64527,1,"تى"],[64528,1,"تي"],[64529,1,"ثج"],[64530,1,"ثم"],[64531,1,"ثى"],[64532,1,"ثي"],[64533,1,"جح"],[64534,1,"جم"],[64535,1,"حج"],[64536,1,"حم"],[64537,1,"خج"],[64538,1,"خح"],[64539,1,"خم"],[64540,1,"سج"],[64541,1,"سح"],[64542,1,"سخ"],[64543,1,"سم"],[64544,1,"صح"],[64545,1,"صم"],[64546,1,"ضج"],[64547,1,"ضح"],[64548,1,"ضخ"],[64549,1,"ضم"],[64550,1,"طح"],[64551,1,"طم"],[64552,1,"ظم"],[64553,1,"عج"],[64554,1,"عم"],[64555,1,"غج"],[64556,1,"غم"],[64557,1,"فج"],[64558,1,"فح"],[64559,1,"فخ"],[64560,1,"فم"],[64561,1,"فى"],[64562,1,"في"],[64563,1,"قح"],[64564,1,"قم"],[64565,1,"قى"],[64566,1,"قي"],[64567,1,"كا"],[64568,1,"كج"],[64569,1,"كح"],[64570,1,"كخ"],[64571,1,"كل"],[64572,1,"كم"],[64573,1,"كى"],[64574,1,"كي"],[64575,1,"لج"],[64576,1,"لح"],[64577,1,"لخ"],[64578,1,"لم"],[64579,1,"لى"],[64580,1,"لي"],[64581,1,"مج"],[64582,1,"مح"],[64583,1,"مخ"],[64584,1,"مم"],[64585,1,"مى"],[64586,1,"مي"],[64587,1,"نج"],[64588,1,"نح"],[64589,1,"نخ"],[64590,1,"نم"],[64591,1,"نى"],[64592,1,"ني"],[64593,1,"هج"],[64594,1,"هم"],[64595,1,"هى"],[64596,1,"هي"],[64597,1,"يج"],[64598,1,"يح"],[64599,1,"يخ"],[64600,1,"يم"],[64601,1,"يى"],[64602,1,"يي"],[64603,1,"ذٰ"],[64604,1,"رٰ"],[64605,1,"ىٰ"],[64606,1," ٌّ"],[64607,1," ٍّ"],[64608,1," َّ"],[64609,1," ُّ"],[64610,1," ِّ"],[64611,1," ّٰ"],[64612,1,"ئر"],[64613,1,"ئز"],[64614,1,"ئم"],[64615,1,"ئن"],[64616,1,"ئى"],[64617,1,"ئي"],[64618,1,"بر"],[64619,1,"بز"],[64620,1,"بم"],[64621,1,"بن"],[64622,1,"بى"],[64623,1,"بي"],[64624,1,"تر"],[64625,1,"تز"],[64626,1,"تم"],[64627,1,"تن"],[64628,1,"تى"],[64629,1,"تي"],[64630,1,"ثر"],[64631,1,"ثز"],[64632,1,"ثم"],[64633,1,"ثن"],[64634,1,"ثى"],[64635,1,"ثي"],[64636,1,"فى"],[64637,1,"في"],[64638,1,"قى"],[64639,1,"قي"],[64640,1,"كا"],[64641,1,"كل"],[64642,1,"كم"],[64643,1,"كى"],[64644,1,"كي"],[64645,1,"لم"],[64646,1,"لى"],[64647,1,"لي"],[64648,1,"ما"],[64649,1,"مم"],[64650,1,"نر"],[64651,1,"نز"],[64652,1,"نم"],[64653,1,"نن"],[64654,1,"نى"],[64655,1,"ني"],[64656,1,"ىٰ"],[64657,1,"ير"],[64658,1,"يز"],[64659,1,"يم"],[64660,1,"ين"],[64661,1,"يى"],[64662,1,"يي"],[64663,1,"ئج"],[64664,1,"ئح"],[64665,1,"ئخ"],[64666,1,"ئم"],[64667,1,"ئه"],[64668,1,"بج"],[64669,1,"بح"],[64670,1,"بخ"],[64671,1,"بم"],[64672,1,"به"],[64673,1,"تج"],[64674,1,"تح"],[64675,1,"تخ"],[64676,1,"تم"],[64677,1,"ته"],[64678,1,"ثم"],[64679,1,"جح"],[64680,1,"جم"],[64681,1,"حج"],[64682,1,"حم"],[64683,1,"خج"],[64684,1,"خم"],[64685,1,"سج"],[64686,1,"سح"],[64687,1,"سخ"],[64688,1,"سم"],[64689,1,"صح"],[64690,1,"صخ"],[64691,1,"صم"],[64692,1,"ضج"],[64693,1,"ضح"],[64694,1,"ضخ"],[64695,1,"ضم"],[64696,1,"طح"],[64697,1,"ظم"],[64698,1,"عج"],[64699,1,"عم"],[64700,1,"غج"],[64701,1,"غم"],[64702,1,"فج"],[64703,1,"فح"],[64704,1,"فخ"],[64705,1,"فم"],[64706,1,"قح"],[64707,1,"قم"],[64708,1,"كج"],[64709,1,"كح"],[64710,1,"كخ"],[64711,1,"كل"],[64712,1,"كم"],[64713,1,"لج"],[64714,1,"لح"],[64715,1,"لخ"],[64716,1,"لم"],[64717,1,"له"],[64718,1,"مج"],[64719,1,"مح"],[64720,1,"مخ"],[64721,1,"مم"],[64722,1,"نج"],[64723,1,"نح"],[64724,1,"نخ"],[64725,1,"نم"],[64726,1,"نه"],[64727,1,"هج"],[64728,1,"هم"],[64729,1,"هٰ"],[64730,1,"يج"],[64731,1,"يح"],[64732,1,"يخ"],[64733,1,"يم"],[64734,1,"يه"],[64735,1,"ئم"],[64736,1,"ئه"],[64737,1,"بم"],[64738,1,"به"],[64739,1,"تم"],[64740,1,"ته"],[64741,1,"ثم"],[64742,1,"ثه"],[64743,1,"سم"],[64744,1,"سه"],[64745,1,"شم"],[64746,1,"شه"],[64747,1,"كل"],[64748,1,"كم"],[64749,1,"لم"],[64750,1,"نم"],[64751,1,"نه"],[64752,1,"يم"],[64753,1,"يه"],[64754,1,"ـَّ"],[64755,1,"ـُّ"],[64756,1,"ـِّ"],[64757,1,"طى"],[64758,1,"طي"],[64759,1,"عى"],[64760,1,"عي"],[64761,1,"غى"],[64762,1,"غي"],[64763,1,"سى"],[64764,1,"سي"],[64765,1,"شى"],[64766,1,"شي"],[64767,1,"حى"],[64768,1,"حي"],[64769,1,"جى"],[64770,1,"جي"],[64771,1,"خى"],[64772,1,"خي"],[64773,1,"صى"],[64774,1,"صي"],[64775,1,"ضى"],[64776,1,"ضي"],[64777,1,"شج"],[64778,1,"شح"],[64779,1,"شخ"],[64780,1,"شم"],[64781,1,"شر"],[64782,1,"سر"],[64783,1,"صر"],[64784,1,"ضر"],[64785,1,"طى"],[64786,1,"طي"],[64787,1,"عى"],[64788,1,"عي"],[64789,1,"غى"],[64790,1,"غي"],[64791,1,"سى"],[64792,1,"سي"],[64793,1,"شى"],[64794,1,"شي"],[64795,1,"حى"],[64796,1,"حي"],[64797,1,"جى"],[64798,1,"جي"],[64799,1,"خى"],[64800,1,"خي"],[64801,1,"صى"],[64802,1,"صي"],[64803,1,"ضى"],[64804,1,"ضي"],[64805,1,"شج"],[64806,1,"شح"],[64807,1,"شخ"],[64808,1,"شم"],[64809,1,"شر"],[64810,1,"سر"],[64811,1,"صر"],[64812,1,"ضر"],[64813,1,"شج"],[64814,1,"شح"],[64815,1,"شخ"],[64816,1,"شم"],[64817,1,"سه"],[64818,1,"شه"],[64819,1,"طم"],[64820,1,"سج"],[64821,1,"سح"],[64822,1,"سخ"],[64823,1,"شج"],[64824,1,"شح"],[64825,1,"شخ"],[64826,1,"طم"],[64827,1,"ظم"],[[64828,64829],1,"اً"],[[64830,64831],2],[[64832,64847],2],[64848,1,"تجم"],[[64849,64850],1,"تحج"],[64851,1,"تحم"],[64852,1,"تخم"],[64853,1,"تمج"],[64854,1,"تمح"],[64855,1,"تمخ"],[[64856,64857],1,"جمح"],[64858,1,"حمي"],[64859,1,"حمى"],[64860,1,"سحج"],[64861,1,"سجح"],[64862,1,"سجى"],[[64863,64864],1,"سمح"],[64865,1,"سمج"],[[64866,64867],1,"سمم"],[[64868,64869],1,"صحح"],[64870,1,"صمم"],[[64871,64872],1,"شحم"],[64873,1,"شجي"],[[64874,64875],1,"شمخ"],[[64876,64877],1,"شمم"],[64878,1,"ضحى"],[[64879,64880],1,"ضخم"],[[64881,64882],1,"طمح"],[64883,1,"طمم"],[64884,1,"طمي"],[64885,1,"عجم"],[[64886,64887],1,"عمم"],[64888,1,"عمى"],[64889,1,"غمم"],[64890,1,"غمي"],[64891,1,"غمى"],[[64892,64893],1,"فخم"],[64894,1,"قمح"],[64895,1,"قمم"],[64896,1,"لحم"],[64897,1,"لحي"],[64898,1,"لحى"],[[64899,64900],1,"لجج"],[[64901,64902],1,"لخم"],[[64903,64904],1,"لمح"],[64905,1,"محج"],[64906,1,"محم"],[64907,1,"محي"],[64908,1,"مجح"],[64909,1,"مجم"],[64910,1,"مخج"],[64911,1,"مخم"],[[64912,64913],3],[64914,1,"مجخ"],[64915,1,"همج"],[64916,1,"همم"],[64917,1,"نحم"],[64918,1,"نحى"],[[64919,64920],1,"نجم"],[64921,1,"نجى"],[64922,1,"نمي"],[64923,1,"نمى"],[[64924,64925],1,"يمم"],[64926,1,"بخي"],[64927,1,"تجي"],[64928,1,"تجى"],[64929,1,"تخي"],[64930,1,"تخى"],[64931,1,"تمي"],[64932,1,"تمى"],[64933,1,"جمي"],[64934,1,"جحى"],[64935,1,"جمى"],[64936,1,"سخى"],[64937,1,"صحي"],[64938,1,"شحي"],[64939,1,"ضحي"],[64940,1,"لجي"],[64941,1,"لمي"],[64942,1,"يحي"],[64943,1,"يجي"],[64944,1,"يمي"],[64945,1,"ممي"],[64946,1,"قمي"],[64947,1,"نحي"],[64948,1,"قمح"],[64949,1,"لحم"],[64950,1,"عمي"],[64951,1,"كمي"],[64952,1,"نجح"],[64953,1,"مخي"],[64954,1,"لجم"],[64955,1,"كمم"],[64956,1,"لجم"],[64957,1,"نجح"],[64958,1,"جحي"],[64959,1,"حجي"],[64960,1,"مجي"],[64961,1,"فمي"],[64962,1,"بحي"],[64963,1,"كمم"],[64964,1,"عجم"],[64965,1,"صمم"],[64966,1,"سخي"],[64967,1,"نجي"],[[64968,64974],3],[64975,2],[[64976,65007],3],[65008,1,"صلے"],[65009,1,"قلے"],[65010,1,"الله"],[65011,1,"اكبر"],[65012,1,"محمد"],[65013,1,"صلعم"],[65014,1,"رسول"],[65015,1,"عليه"],[65016,1,"وسلم"],[65017,1,"صلى"],[65018,1,"صلى الله عليه وسلم"],[65019,1,"جل جلاله"],[65020,1,"ریال"],[65021,2],[[65022,65023],2],[[65024,65039],7],[65040,1,","],[65041,1,"、"],[65042,3],[65043,1,":"],[65044,1,";"],[65045,1,"!"],[65046,1,"?"],[65047,1,"〖"],[65048,1,"〗"],[65049,3],[[65050,65055],3],[[65056,65059],2],[[65060,65062],2],[[65063,65069],2],[[65070,65071],2],[65072,3],[65073,1,"—"],[65074,1,"–"],[[65075,65076],1,"_"],[65077,1,"("],[65078,1,")"],[65079,1,"{"],[65080,1,"}"],[65081,1,"〔"],[65082,1,"〕"],[65083,1,"【"],[65084,1,"】"],[65085,1,"《"],[65086,1,"》"],[65087,1,"〈"],[65088,1,"〉"],[65089,1,"「"],[65090,1,"」"],[65091,1,"『"],[65092,1,"』"],[[65093,65094],2],[65095,1,"["],[65096,1,"]"],[[65097,65100],1," ̅"],[[65101,65103],1,"_"],[65104,1,","],[65105,1,"、"],[65106,3],[65107,3],[65108,1,";"],[65109,1,":"],[65110,1,"?"],[65111,1,"!"],[65112,1,"—"],[65113,1,"("],[65114,1,")"],[65115,1,"{"],[65116,1,"}"],[65117,1,"〔"],[65118,1,"〕"],[65119,1,"#"],[65120,1,"&"],[65121,1,"*"],[65122,1,"+"],[65123,1,"-"],[65124,1,"<"],[65125,1,">"],[65126,1,"="],[65127,3],[65128,1,"\\\\"],[65129,1,"$"],[65130,1,"%"],[65131,1,"@"],[[65132,65135],3],[65136,1," ً"],[65137,1,"ـً"],[65138,1," ٌ"],[65139,2],[65140,1," ٍ"],[65141,3],[65142,1," َ"],[65143,1,"ـَ"],[65144,1," ُ"],[65145,1,"ـُ"],[65146,1," ِ"],[65147,1,"ـِ"],[65148,1," ّ"],[65149,1,"ـّ"],[65150,1," ْ"],[65151,1,"ـْ"],[65152,1,"ء"],[[65153,65154],1,"آ"],[[65155,65156],1,"أ"],[[65157,65158],1,"ؤ"],[[65159,65160],1,"إ"],[[65161,65164],1,"ئ"],[[65165,65166],1,"ا"],[[65167,65170],1,"ب"],[[65171,65172],1,"ة"],[[65173,65176],1,"ت"],[[65177,65180],1,"ث"],[[65181,65184],1,"ج"],[[65185,65188],1,"ح"],[[65189,65192],1,"خ"],[[65193,65194],1,"د"],[[65195,65196],1,"ذ"],[[65197,65198],1,"ر"],[[65199,65200],1,"ز"],[[65201,65204],1,"س"],[[65205,65208],1,"ش"],[[65209,65212],1,"ص"],[[65213,65216],1,"ض"],[[65217,65220],1,"ط"],[[65221,65224],1,"ظ"],[[65225,65228],1,"ع"],[[65229,65232],1,"غ"],[[65233,65236],1,"ف"],[[65237,65240],1,"ق"],[[65241,65244],1,"ك"],[[65245,65248],1,"ل"],[[65249,65252],1,"م"],[[65253,65256],1,"ن"],[[65257,65260],1,"ه"],[[65261,65262],1,"و"],[[65263,65264],1,"ى"],[[65265,65268],1,"ي"],[[65269,65270],1,"لآ"],[[65271,65272],1,"لأ"],[[65273,65274],1,"لإ"],[[65275,65276],1,"لا"],[[65277,65278],3],[65279,7],[65280,3],[65281,1,"!"],[65282,1,"\\""],[65283,1,"#"],[65284,1,"$"],[65285,1,"%"],[65286,1,"&"],[65287,1,"\'"],[65288,1,"("],[65289,1,")"],[65290,1,"*"],[65291,1,"+"],[65292,1,","],[65293,1,"-"],[65294,1,"."],[65295,1,"/"],[65296,1,"0"],[65297,1,"1"],[65298,1,"2"],[65299,1,"3"],[65300,1,"4"],[65301,1,"5"],[65302,1,"6"],[65303,1,"7"],[65304,1,"8"],[65305,1,"9"],[65306,1,":"],[65307,1,";"],[65308,1,"<"],[65309,1,"="],[65310,1,">"],[65311,1,"?"],[65312,1,"@"],[65313,1,"a"],[65314,1,"b"],[65315,1,"c"],[65316,1,"d"],[65317,1,"e"],[65318,1,"f"],[65319,1,"g"],[65320,1,"h"],[65321,1,"i"],[65322,1,"j"],[65323,1,"k"],[65324,1,"l"],[65325,1,"m"],[65326,1,"n"],[65327,1,"o"],[65328,1,"p"],[65329,1,"q"],[65330,1,"r"],[65331,1,"s"],[65332,1,"t"],[65333,1,"u"],[65334,1,"v"],[65335,1,"w"],[65336,1,"x"],[65337,1,"y"],[65338,1,"z"],[65339,1,"["],[65340,1,"\\\\"],[65341,1,"]"],[65342,1,"^"],[65343,1,"_"],[65344,1,"`"],[65345,1,"a"],[65346,1,"b"],[65347,1,"c"],[65348,1,"d"],[65349,1,"e"],[65350,1,"f"],[65351,1,"g"],[65352,1,"h"],[65353,1,"i"],[65354,1,"j"],[65355,1,"k"],[65356,1,"l"],[65357,1,"m"],[65358,1,"n"],[65359,1,"o"],[65360,1,"p"],[65361,1,"q"],[65362,1,"r"],[65363,1,"s"],[65364,1,"t"],[65365,1,"u"],[65366,1,"v"],[65367,1,"w"],[65368,1,"x"],[65369,1,"y"],[65370,1,"z"],[65371,1,"{"],[65372,1,"|"],[65373,1,"}"],[65374,1,"~"],[65375,1,"⦅"],[65376,1,"⦆"],[65377,1,"."],[65378,1,"「"],[65379,1,"」"],[65380,1,"、"],[65381,1,"・"],[65382,1,"ヲ"],[65383,1,"ァ"],[65384,1,"ィ"],[65385,1,"ゥ"],[65386,1,"ェ"],[65387,1,"ォ"],[65388,1,"ャ"],[65389,1,"ュ"],[65390,1,"ョ"],[65391,1,"ッ"],[65392,1,"ー"],[65393,1,"ア"],[65394,1,"イ"],[65395,1,"ウ"],[65396,1,"エ"],[65397,1,"オ"],[65398,1,"カ"],[65399,1,"キ"],[65400,1,"ク"],[65401,1,"ケ"],[65402,1,"コ"],[65403,1,"サ"],[65404,1,"シ"],[65405,1,"ス"],[65406,1,"セ"],[65407,1,"ソ"],[65408,1,"タ"],[65409,1,"チ"],[65410,1,"ツ"],[65411,1,"テ"],[65412,1,"ト"],[65413,1,"ナ"],[65414,1,"ニ"],[65415,1,"ヌ"],[65416,1,"ネ"],[65417,1,"ノ"],[65418,1,"ハ"],[65419,1,"ヒ"],[65420,1,"フ"],[65421,1,"ヘ"],[65422,1,"ホ"],[65423,1,"マ"],[65424,1,"ミ"],[65425,1,"ム"],[65426,1,"メ"],[65427,1,"モ"],[65428,1,"ヤ"],[65429,1,"ユ"],[65430,1,"ヨ"],[65431,1,"ラ"],[65432,1,"リ"],[65433,1,"ル"],[65434,1,"レ"],[65435,1,"ロ"],[65436,1,"ワ"],[65437,1,"ン"],[65438,1,"゙"],[65439,1,"゚"],[65440,7],[65441,1,"ᄀ"],[65442,1,"ᄁ"],[65443,1,"ᆪ"],[65444,1,"ᄂ"],[65445,1,"ᆬ"],[65446,1,"ᆭ"],[65447,1,"ᄃ"],[65448,1,"ᄄ"],[65449,1,"ᄅ"],[65450,1,"ᆰ"],[65451,1,"ᆱ"],[65452,1,"ᆲ"],[65453,1,"ᆳ"],[65454,1,"ᆴ"],[65455,1,"ᆵ"],[65456,1,"ᄚ"],[65457,1,"ᄆ"],[65458,1,"ᄇ"],[65459,1,"ᄈ"],[65460,1,"ᄡ"],[65461,1,"ᄉ"],[65462,1,"ᄊ"],[65463,1,"ᄋ"],[65464,1,"ᄌ"],[65465,1,"ᄍ"],[65466,1,"ᄎ"],[65467,1,"ᄏ"],[65468,1,"ᄐ"],[65469,1,"ᄑ"],[65470,1,"ᄒ"],[[65471,65473],3],[65474,1,"ᅡ"],[65475,1,"ᅢ"],[65476,1,"ᅣ"],[65477,1,"ᅤ"],[65478,1,"ᅥ"],[65479,1,"ᅦ"],[[65480,65481],3],[65482,1,"ᅧ"],[65483,1,"ᅨ"],[65484,1,"ᅩ"],[65485,1,"ᅪ"],[65486,1,"ᅫ"],[65487,1,"ᅬ"],[[65488,65489],3],[65490,1,"ᅭ"],[65491,1,"ᅮ"],[65492,1,"ᅯ"],[65493,1,"ᅰ"],[65494,1,"ᅱ"],[65495,1,"ᅲ"],[[65496,65497],3],[65498,1,"ᅳ"],[65499,1,"ᅴ"],[65500,1,"ᅵ"],[[65501,65503],3],[65504,1,"¢"],[65505,1,"£"],[65506,1,"¬"],[65507,1," ̄"],[65508,1,"¦"],[65509,1,"¥"],[65510,1,"₩"],[65511,3],[65512,1,"│"],[65513,1,"←"],[65514,1,"↑"],[65515,1,"→"],[65516,1,"↓"],[65517,1,"■"],[65518,1,"○"],[[65519,65528],3],[[65529,65531],3],[65532,3],[65533,3],[[65534,65535],3],[[65536,65547],2],[65548,3],[[65549,65574],2],[65575,3],[[65576,65594],2],[65595,3],[[65596,65597],2],[65598,3],[[65599,65613],2],[[65614,65615],3],[[65616,65629],2],[[65630,65663],3],[[65664,65786],2],[[65787,65791],3],[[65792,65794],2],[[65795,65798],3],[[65799,65843],2],[[65844,65846],3],[[65847,65855],2],[[65856,65930],2],[[65931,65932],2],[[65933,65934],2],[65935,3],[[65936,65947],2],[65948,2],[[65949,65951],3],[65952,2],[[65953,65999],3],[[66000,66044],2],[66045,2],[[66046,66175],3],[[66176,66204],2],[[66205,66207],3],[[66208,66256],2],[[66257,66271],3],[66272,2],[[66273,66299],2],[[66300,66303],3],[[66304,66334],2],[66335,2],[[66336,66339],2],[[66340,66348],3],[[66349,66351],2],[[66352,66368],2],[66369,2],[[66370,66377],2],[66378,2],[[66379,66383],3],[[66384,66426],2],[[66427,66431],3],[[66432,66461],2],[66462,3],[66463,2],[[66464,66499],2],[[66500,66503],3],[[66504,66511],2],[[66512,66517],2],[[66518,66559],3],[66560,1,"𐐨"],[66561,1,"𐐩"],[66562,1,"𐐪"],[66563,1,"𐐫"],[66564,1,"𐐬"],[66565,1,"𐐭"],[66566,1,"𐐮"],[66567,1,"𐐯"],[66568,1,"𐐰"],[66569,1,"𐐱"],[66570,1,"𐐲"],[66571,1,"𐐳"],[66572,1,"𐐴"],[66573,1,"𐐵"],[66574,1,"𐐶"],[66575,1,"𐐷"],[66576,1,"𐐸"],[66577,1,"𐐹"],[66578,1,"𐐺"],[66579,1,"𐐻"],[66580,1,"𐐼"],[66581,1,"𐐽"],[66582,1,"𐐾"],[66583,1,"𐐿"],[66584,1,"𐑀"],[66585,1,"𐑁"],[66586,1,"𐑂"],[66587,1,"𐑃"],[66588,1,"𐑄"],[66589,1,"𐑅"],[66590,1,"𐑆"],[66591,1,"𐑇"],[66592,1,"𐑈"],[66593,1,"𐑉"],[66594,1,"𐑊"],[66595,1,"𐑋"],[66596,1,"𐑌"],[66597,1,"𐑍"],[66598,1,"𐑎"],[66599,1,"𐑏"],[[66600,66637],2],[[66638,66717],2],[[66718,66719],3],[[66720,66729],2],[[66730,66735],3],[66736,1,"𐓘"],[66737,1,"𐓙"],[66738,1,"𐓚"],[66739,1,"𐓛"],[66740,1,"𐓜"],[66741,1,"𐓝"],[66742,1,"𐓞"],[66743,1,"𐓟"],[66744,1,"𐓠"],[66745,1,"𐓡"],[66746,1,"𐓢"],[66747,1,"𐓣"],[66748,1,"𐓤"],[66749,1,"𐓥"],[66750,1,"𐓦"],[66751,1,"𐓧"],[66752,1,"𐓨"],[66753,1,"𐓩"],[66754,1,"𐓪"],[66755,1,"𐓫"],[66756,1,"𐓬"],[66757,1,"𐓭"],[66758,1,"𐓮"],[66759,1,"𐓯"],[66760,1,"𐓰"],[66761,1,"𐓱"],[66762,1,"𐓲"],[66763,1,"𐓳"],[66764,1,"𐓴"],[66765,1,"𐓵"],[66766,1,"𐓶"],[66767,1,"𐓷"],[66768,1,"𐓸"],[66769,1,"𐓹"],[66770,1,"𐓺"],[66771,1,"𐓻"],[[66772,66775],3],[[66776,66811],2],[[66812,66815],3],[[66816,66855],2],[[66856,66863],3],[[66864,66915],2],[[66916,66926],3],[66927,2],[66928,1,"𐖗"],[66929,1,"𐖘"],[66930,1,"𐖙"],[66931,1,"𐖚"],[66932,1,"𐖛"],[66933,1,"𐖜"],[66934,1,"𐖝"],[66935,1,"𐖞"],[66936,1,"𐖟"],[66937,1,"𐖠"],[66938,1,"𐖡"],[66939,3],[66940,1,"𐖣"],[66941,1,"𐖤"],[66942,1,"𐖥"],[66943,1,"𐖦"],[66944,1,"𐖧"],[66945,1,"𐖨"],[66946,1,"𐖩"],[66947,1,"𐖪"],[66948,1,"𐖫"],[66949,1,"𐖬"],[66950,1,"𐖭"],[66951,1,"𐖮"],[66952,1,"𐖯"],[66953,1,"𐖰"],[66954,1,"𐖱"],[66955,3],[66956,1,"𐖳"],[66957,1,"𐖴"],[66958,1,"𐖵"],[66959,1,"𐖶"],[66960,1,"𐖷"],[66961,1,"𐖸"],[66962,1,"𐖹"],[66963,3],[66964,1,"𐖻"],[66965,1,"𐖼"],[66966,3],[[66967,66977],2],[66978,3],[[66979,66993],2],[66994,3],[[66995,67001],2],[67002,3],[[67003,67004],2],[[67005,67007],3],[[67008,67059],2],[[67060,67071],3],[[67072,67382],2],[[67383,67391],3],[[67392,67413],2],[[67414,67423],3],[[67424,67431],2],[[67432,67455],3],[67456,2],[67457,1,"ː"],[67458,1,"ˑ"],[67459,1,"æ"],[67460,1,"ʙ"],[67461,1,"ɓ"],[67462,3],[67463,1,"ʣ"],[67464,1,"ꭦ"],[67465,1,"ʥ"],[67466,1,"ʤ"],[67467,1,"ɖ"],[67468,1,"ɗ"],[67469,1,"ᶑ"],[67470,1,"ɘ"],[67471,1,"ɞ"],[67472,1,"ʩ"],[67473,1,"ɤ"],[67474,1,"ɢ"],[67475,1,"ɠ"],[67476,1,"ʛ"],[67477,1,"ħ"],[67478,1,"ʜ"],[67479,1,"ɧ"],[67480,1,"ʄ"],[67481,1,"ʪ"],[67482,1,"ʫ"],[67483,1,"ɬ"],[67484,1,"𝼄"],[67485,1,"ꞎ"],[67486,1,"ɮ"],[67487,1,"𝼅"],[67488,1,"ʎ"],[67489,1,"𝼆"],[67490,1,"ø"],[67491,1,"ɶ"],[67492,1,"ɷ"],[67493,1,"q"],[67494,1,"ɺ"],[67495,1,"𝼈"],[67496,1,"ɽ"],[67497,1,"ɾ"],[67498,1,"ʀ"],[67499,1,"ʨ"],[67500,1,"ʦ"],[67501,1,"ꭧ"],[67502,1,"ʧ"],[67503,1,"ʈ"],[67504,1,"ⱱ"],[67505,3],[67506,1,"ʏ"],[67507,1,"ʡ"],[67508,1,"ʢ"],[67509,1,"ʘ"],[67510,1,"ǀ"],[67511,1,"ǁ"],[67512,1,"ǂ"],[67513,1,"𝼊"],[67514,1,"𝼞"],[[67515,67583],3],[[67584,67589],2],[[67590,67591],3],[67592,2],[67593,3],[[67594,67637],2],[67638,3],[[67639,67640],2],[[67641,67643],3],[67644,2],[[67645,67646],3],[67647,2],[[67648,67669],2],[67670,3],[[67671,67679],2],[[67680,67702],2],[[67703,67711],2],[[67712,67742],2],[[67743,67750],3],[[67751,67759],2],[[67760,67807],3],[[67808,67826],2],[67827,3],[[67828,67829],2],[[67830,67834],3],[[67835,67839],2],[[67840,67861],2],[[67862,67865],2],[[67866,67867],2],[[67868,67870],3],[67871,2],[[67872,67897],2],[[67898,67902],3],[67903,2],[[67904,67967],3],[[67968,68023],2],[[68024,68027],3],[[68028,68029],2],[[68030,68031],2],[[68032,68047],2],[[68048,68049],3],[[68050,68095],2],[[68096,68099],2],[68100,3],[[68101,68102],2],[[68103,68107],3],[[68108,68115],2],[68116,3],[[68117,68119],2],[68120,3],[[68121,68147],2],[[68148,68149],2],[[68150,68151],3],[[68152,68154],2],[[68155,68158],3],[68159,2],[[68160,68167],2],[68168,2],[[68169,68175],3],[[68176,68184],2],[[68185,68191],3],[[68192,68220],2],[[68221,68223],2],[[68224,68252],2],[[68253,68255],2],[[68256,68287],3],[[68288,68295],2],[68296,2],[[68297,68326],2],[[68327,68330],3],[[68331,68342],2],[[68343,68351],3],[[68352,68405],2],[[68406,68408],3],[[68409,68415],2],[[68416,68437],2],[[68438,68439],3],[[68440,68447],2],[[68448,68466],2],[[68467,68471],3],[[68472,68479],2],[[68480,68497],2],[[68498,68504],3],[[68505,68508],2],[[68509,68520],3],[[68521,68527],2],[[68528,68607],3],[[68608,68680],2],[[68681,68735],3],[68736,1,"𐳀"],[68737,1,"𐳁"],[68738,1,"𐳂"],[68739,1,"𐳃"],[68740,1,"𐳄"],[68741,1,"𐳅"],[68742,1,"𐳆"],[68743,1,"𐳇"],[68744,1,"𐳈"],[68745,1,"𐳉"],[68746,1,"𐳊"],[68747,1,"𐳋"],[68748,1,"𐳌"],[68749,1,"𐳍"],[68750,1,"𐳎"],[68751,1,"𐳏"],[68752,1,"𐳐"],[68753,1,"𐳑"],[68754,1,"𐳒"],[68755,1,"𐳓"],[68756,1,"𐳔"],[68757,1,"𐳕"],[68758,1,"𐳖"],[68759,1,"𐳗"],[68760,1,"𐳘"],[68761,1,"𐳙"],[68762,1,"𐳚"],[68763,1,"𐳛"],[68764,1,"𐳜"],[68765,1,"𐳝"],[68766,1,"𐳞"],[68767,1,"𐳟"],[68768,1,"𐳠"],[68769,1,"𐳡"],[68770,1,"𐳢"],[68771,1,"𐳣"],[68772,1,"𐳤"],[68773,1,"𐳥"],[68774,1,"𐳦"],[68775,1,"𐳧"],[68776,1,"𐳨"],[68777,1,"𐳩"],[68778,1,"𐳪"],[68779,1,"𐳫"],[68780,1,"𐳬"],[68781,1,"𐳭"],[68782,1,"𐳮"],[68783,1,"𐳯"],[68784,1,"𐳰"],[68785,1,"𐳱"],[68786,1,"𐳲"],[[68787,68799],3],[[68800,68850],2],[[68851,68857],3],[[68858,68863],2],[[68864,68903],2],[[68904,68911],3],[[68912,68921],2],[[68922,68927],3],[[68928,68943],2],[68944,1,"𐵰"],[68945,1,"𐵱"],[68946,1,"𐵲"],[68947,1,"𐵳"],[68948,1,"𐵴"],[68949,1,"𐵵"],[68950,1,"𐵶"],[68951,1,"𐵷"],[68952,1,"𐵸"],[68953,1,"𐵹"],[68954,1,"𐵺"],[68955,1,"𐵻"],[68956,1,"𐵼"],[68957,1,"𐵽"],[68958,1,"𐵾"],[68959,1,"𐵿"],[68960,1,"𐶀"],[68961,1,"𐶁"],[68962,1,"𐶂"],[68963,1,"𐶃"],[68964,1,"𐶄"],[68965,1,"𐶅"],[[68966,68968],3],[[68969,68973],2],[68974,2],[[68975,68997],2],[[68998,69005],3],[[69006,69007],2],[[69008,69215],3],[[69216,69246],2],[69247,3],[[69248,69289],2],[69290,3],[[69291,69292],2],[69293,2],[[69294,69295],3],[[69296,69297],2],[[69298,69313],3],[[69314,69316],2],[[69317,69371],3],[69372,2],[[69373,69375],2],[[69376,69404],2],[[69405,69414],2],[69415,2],[[69416,69423],3],[[69424,69456],2],[[69457,69465],2],[[69466,69487],3],[[69488,69509],2],[[69510,69513],2],[[69514,69551],3],[[69552,69572],2],[[69573,69579],2],[[69580,69599],3],[[69600,69622],2],[[69623,69631],3],[[69632,69702],2],[[69703,69709],2],[[69710,69713],3],[[69714,69733],2],[[69734,69743],2],[[69744,69749],2],[[69750,69758],3],[69759,2],[[69760,69818],2],[[69819,69820],2],[69821,3],[[69822,69825],2],[69826,2],[[69827,69836],3],[69837,3],[[69838,69839],3],[[69840,69864],2],[[69865,69871],3],[[69872,69881],2],[[69882,69887],3],[[69888,69940],2],[69941,3],[[69942,69951],2],[[69952,69955],2],[[69956,69958],2],[69959,2],[[69960,69967],3],[[69968,70003],2],[[70004,70005],2],[70006,2],[[70007,70015],3],[[70016,70084],2],[[70085,70088],2],[[70089,70092],2],[70093,2],[[70094,70095],2],[[70096,70105],2],[70106,2],[70107,2],[70108,2],[[70109,70111],2],[70112,3],[[70113,70132],2],[[70133,70143],3],[[70144,70161],2],[70162,3],[[70163,70199],2],[[70200,70205],2],[70206,2],[[70207,70209],2],[[70210,70271],3],[[70272,70278],2],[70279,3],[70280,2],[70281,3],[[70282,70285],2],[70286,3],[[70287,70301],2],[70302,3],[[70303,70312],2],[70313,2],[[70314,70319],3],[[70320,70378],2],[[70379,70383],3],[[70384,70393],2],[[70394,70399],3],[70400,2],[[70401,70403],2],[70404,3],[[70405,70412],2],[[70413,70414],3],[[70415,70416],2],[[70417,70418],3],[[70419,70440],2],[70441,3],[[70442,70448],2],[70449,3],[[70450,70451],2],[70452,3],[[70453,70457],2],[70458,3],[70459,2],[[70460,70468],2],[[70469,70470],3],[[70471,70472],2],[[70473,70474],3],[[70475,70477],2],[[70478,70479],3],[70480,2],[[70481,70486],3],[70487,2],[[70488,70492],3],[[70493,70499],2],[[70500,70501],3],[[70502,70508],2],[[70509,70511],3],[[70512,70516],2],[[70517,70527],3],[[70528,70537],2],[70538,3],[70539,2],[[70540,70541],3],[70542,2],[70543,3],[[70544,70581],2],[70582,3],[[70583,70592],2],[70593,3],[70594,2],[[70595,70596],3],[70597,2],[70598,3],[[70599,70602],2],[70603,3],[[70604,70611],2],[[70612,70613],2],[70614,3],[[70615,70616],2],[[70617,70624],3],[[70625,70626],2],[[70627,70655],3],[[70656,70730],2],[[70731,70735],2],[[70736,70745],2],[70746,2],[70747,2],[70748,3],[70749,2],[70750,2],[70751,2],[[70752,70753],2],[[70754,70783],3],[[70784,70853],2],[70854,2],[70855,2],[[70856,70863],3],[[70864,70873],2],[[70874,71039],3],[[71040,71093],2],[[71094,71095],3],[[71096,71104],2],[[71105,71113],2],[[71114,71127],2],[[71128,71133],2],[[71134,71167],3],[[71168,71232],2],[[71233,71235],2],[71236,2],[[71237,71247],3],[[71248,71257],2],[[71258,71263],3],[[71264,71276],2],[[71277,71295],3],[[71296,71351],2],[71352,2],[71353,2],[[71354,71359],3],[[71360,71369],2],[[71370,71375],3],[[71376,71395],2],[[71396,71423],3],[[71424,71449],2],[71450,2],[[71451,71452],3],[[71453,71467],2],[[71468,71471],3],[[71472,71481],2],[[71482,71487],2],[[71488,71494],2],[[71495,71679],3],[[71680,71738],2],[71739,2],[[71740,71839],3],[71840,1,"𑣀"],[71841,1,"𑣁"],[71842,1,"𑣂"],[71843,1,"𑣃"],[71844,1,"𑣄"],[71845,1,"𑣅"],[71846,1,"𑣆"],[71847,1,"𑣇"],[71848,1,"𑣈"],[71849,1,"𑣉"],[71850,1,"𑣊"],[71851,1,"𑣋"],[71852,1,"𑣌"],[71853,1,"𑣍"],[71854,1,"𑣎"],[71855,1,"𑣏"],[71856,1,"𑣐"],[71857,1,"𑣑"],[71858,1,"𑣒"],[71859,1,"𑣓"],[71860,1,"𑣔"],[71861,1,"𑣕"],[71862,1,"𑣖"],[71863,1,"𑣗"],[71864,1,"𑣘"],[71865,1,"𑣙"],[71866,1,"𑣚"],[71867,1,"𑣛"],[71868,1,"𑣜"],[71869,1,"𑣝"],[71870,1,"𑣞"],[71871,1,"𑣟"],[[71872,71913],2],[[71914,71922],2],[[71923,71934],3],[71935,2],[[71936,71942],2],[[71943,71944],3],[71945,2],[[71946,71947],3],[[71948,71955],2],[71956,3],[[71957,71958],2],[71959,3],[[71960,71989],2],[71990,3],[[71991,71992],2],[[71993,71994],3],[[71995,72003],2],[[72004,72006],2],[[72007,72015],3],[[72016,72025],2],[[72026,72095],3],[[72096,72103],2],[[72104,72105],3],[[72106,72151],2],[[72152,72153],3],[[72154,72161],2],[72162,2],[[72163,72164],2],[[72165,72191],3],[[72192,72254],2],[[72255,72262],2],[72263,2],[[72264,72271],3],[[72272,72323],2],[[72324,72325],2],[[72326,72345],2],[[72346,72348],2],[72349,2],[[72350,72354],2],[[72355,72367],3],[[72368,72383],2],[[72384,72440],2],[[72441,72447],3],[[72448,72457],2],[[72458,72639],3],[[72640,72672],2],[72673,2],[[72674,72687],3],[[72688,72697],2],[[72698,72703],3],[[72704,72712],2],[72713,3],[[72714,72758],2],[72759,3],[[72760,72768],2],[[72769,72773],2],[[72774,72783],3],[[72784,72793],2],[[72794,72812],2],[[72813,72815],3],[[72816,72817],2],[[72818,72847],2],[[72848,72849],3],[[72850,72871],2],[72872,3],[[72873,72886],2],[[72887,72959],3],[[72960,72966],2],[72967,3],[[72968,72969],2],[72970,3],[[72971,73014],2],[[73015,73017],3],[73018,2],[73019,3],[[73020,73021],2],[73022,3],[[73023,73031],2],[[73032,73039],3],[[73040,73049],2],[[73050,73055],3],[[73056,73061],2],[73062,3],[[73063,73064],2],[73065,3],[[73066,73102],2],[73103,3],[[73104,73105],2],[73106,3],[[73107,73112],2],[[73113,73119],3],[[73120,73129],2],[[73130,73439],3],[[73440,73462],2],[[73463,73464],2],[[73465,73471],3],[[73472,73488],2],[73489,3],[[73490,73530],2],[[73531,73533],3],[[73534,73538],2],[[73539,73551],2],[[73552,73561],2],[73562,2],[[73563,73647],3],[73648,2],[[73649,73663],3],[[73664,73713],2],[[73714,73726],3],[73727,2],[[73728,74606],2],[[74607,74648],2],[74649,2],[[74650,74751],3],[[74752,74850],2],[[74851,74862],2],[74863,3],[[74864,74867],2],[74868,2],[[74869,74879],3],[[74880,75075],2],[[75076,77711],3],[[77712,77808],2],[[77809,77810],2],[[77811,77823],3],[[77824,78894],2],[78895,2],[[78896,78904],3],[[78905,78911],3],[[78912,78933],2],[[78934,78943],3],[[78944,82938],2],[[82939,82943],3],[[82944,83526],2],[[83527,90367],3],[[90368,90425],2],[[90426,92159],3],[[92160,92728],2],[[92729,92735],3],[[92736,92766],2],[92767,3],[[92768,92777],2],[[92778,92781],3],[[92782,92783],2],[[92784,92862],2],[92863,3],[[92864,92873],2],[[92874,92879],3],[[92880,92909],2],[[92910,92911],3],[[92912,92916],2],[92917,2],[[92918,92927],3],[[92928,92982],2],[[92983,92991],2],[[92992,92995],2],[[92996,92997],2],[[92998,93007],3],[[93008,93017],2],[93018,3],[[93019,93025],2],[93026,3],[[93027,93047],2],[[93048,93052],3],[[93053,93071],2],[[93072,93503],3],[[93504,93548],2],[[93549,93551],2],[[93552,93561],2],[[93562,93759],3],[93760,1,"𖹠"],[93761,1,"𖹡"],[93762,1,"𖹢"],[93763,1,"𖹣"],[93764,1,"𖹤"],[93765,1,"𖹥"],[93766,1,"𖹦"],[93767,1,"𖹧"],[93768,1,"𖹨"],[93769,1,"𖹩"],[93770,1,"𖹪"],[93771,1,"𖹫"],[93772,1,"𖹬"],[93773,1,"𖹭"],[93774,1,"𖹮"],[93775,1,"𖹯"],[93776,1,"𖹰"],[93777,1,"𖹱"],[93778,1,"𖹲"],[93779,1,"𖹳"],[93780,1,"𖹴"],[93781,1,"𖹵"],[93782,1,"𖹶"],[93783,1,"𖹷"],[93784,1,"𖹸"],[93785,1,"𖹹"],[93786,1,"𖹺"],[93787,1,"𖹻"],[93788,1,"𖹼"],[93789,1,"𖹽"],[93790,1,"𖹾"],[93791,1,"𖹿"],[[93792,93823],2],[[93824,93850],2],[[93851,93951],3],[[93952,94020],2],[[94021,94026],2],[[94027,94030],3],[94031,2],[[94032,94078],2],[[94079,94087],2],[[94088,94094],3],[[94095,94111],2],[[94112,94175],3],[94176,2],[94177,2],[94178,2],[94179,2],[94180,2],[[94181,94191],3],[[94192,94193],2],[[94194,94207],3],[[94208,100332],2],[[100333,100337],2],[[100338,100343],2],[[100344,100351],3],[[100352,101106],2],[[101107,101589],2],[[101590,101630],3],[101631,2],[[101632,101640],2],[[101641,110575],3],[[110576,110579],2],[110580,3],[[110581,110587],2],[110588,3],[[110589,110590],2],[110591,3],[[110592,110593],2],[[110594,110878],2],[[110879,110882],2],[[110883,110897],3],[110898,2],[[110899,110927],3],[[110928,110930],2],[[110931,110932],3],[110933,2],[[110934,110947],3],[[110948,110951],2],[[110952,110959],3],[[110960,111355],2],[[111356,113663],3],[[113664,113770],2],[[113771,113775],3],[[113776,113788],2],[[113789,113791],3],[[113792,113800],2],[[113801,113807],3],[[113808,113817],2],[[113818,113819],3],[113820,2],[[113821,113822],2],[113823,2],[[113824,113827],7],[[113828,117759],3],[[117760,117973],2],[117974,1,"a"],[117975,1,"b"],[117976,1,"c"],[117977,1,"d"],[117978,1,"e"],[117979,1,"f"],[117980,1,"g"],[117981,1,"h"],[117982,1,"i"],[117983,1,"j"],[117984,1,"k"],[117985,1,"l"],[117986,1,"m"],[117987,1,"n"],[117988,1,"o"],[117989,1,"p"],[117990,1,"q"],[117991,1,"r"],[117992,1,"s"],[117993,1,"t"],[117994,1,"u"],[117995,1,"v"],[117996,1,"w"],[117997,1,"x"],[117998,1,"y"],[117999,1,"z"],[118000,1,"0"],[118001,1,"1"],[118002,1,"2"],[118003,1,"3"],[118004,1,"4"],[118005,1,"5"],[118006,1,"6"],[118007,1,"7"],[118008,1,"8"],[118009,1,"9"],[[118010,118015],3],[[118016,118451],2],[[118452,118527],3],[[118528,118573],2],[[118574,118575],3],[[118576,118598],2],[[118599,118607],3],[[118608,118723],2],[[118724,118783],3],[[118784,119029],2],[[119030,119039],3],[[119040,119078],2],[[119079,119080],3],[119081,2],[[119082,119133],2],[119134,1,"𝅗𝅥"],[119135,1,"𝅘𝅥"],[119136,1,"𝅘𝅥𝅮"],[119137,1,"𝅘𝅥𝅯"],[119138,1,"𝅘𝅥𝅰"],[119139,1,"𝅘𝅥𝅱"],[119140,1,"𝅘𝅥𝅲"],[[119141,119154],2],[[119155,119162],7],[[119163,119226],2],[119227,1,"𝆹𝅥"],[119228,1,"𝆺𝅥"],[119229,1,"𝆹𝅥𝅮"],[119230,1,"𝆺𝅥𝅮"],[119231,1,"𝆹𝅥𝅯"],[119232,1,"𝆺𝅥𝅯"],[[119233,119261],2],[[119262,119272],2],[[119273,119274],2],[[119275,119295],3],[[119296,119365],2],[[119366,119487],3],[[119488,119507],2],[[119508,119519],3],[[119520,119539],2],[[119540,119551],3],[[119552,119638],2],[[119639,119647],3],[[119648,119665],2],[[119666,119672],2],[[119673,119807],3],[119808,1,"a"],[119809,1,"b"],[119810,1,"c"],[119811,1,"d"],[119812,1,"e"],[119813,1,"f"],[119814,1,"g"],[119815,1,"h"],[119816,1,"i"],[119817,1,"j"],[119818,1,"k"],[119819,1,"l"],[119820,1,"m"],[119821,1,"n"],[119822,1,"o"],[119823,1,"p"],[119824,1,"q"],[119825,1,"r"],[119826,1,"s"],[119827,1,"t"],[119828,1,"u"],[119829,1,"v"],[119830,1,"w"],[119831,1,"x"],[119832,1,"y"],[119833,1,"z"],[119834,1,"a"],[119835,1,"b"],[119836,1,"c"],[119837,1,"d"],[119838,1,"e"],[119839,1,"f"],[119840,1,"g"],[119841,1,"h"],[119842,1,"i"],[119843,1,"j"],[119844,1,"k"],[119845,1,"l"],[119846,1,"m"],[119847,1,"n"],[119848,1,"o"],[119849,1,"p"],[119850,1,"q"],[119851,1,"r"],[119852,1,"s"],[119853,1,"t"],[119854,1,"u"],[119855,1,"v"],[119856,1,"w"],[119857,1,"x"],[119858,1,"y"],[119859,1,"z"],[119860,1,"a"],[119861,1,"b"],[119862,1,"c"],[119863,1,"d"],[119864,1,"e"],[119865,1,"f"],[119866,1,"g"],[119867,1,"h"],[119868,1,"i"],[119869,1,"j"],[119870,1,"k"],[119871,1,"l"],[119872,1,"m"],[119873,1,"n"],[119874,1,"o"],[119875,1,"p"],[119876,1,"q"],[119877,1,"r"],[119878,1,"s"],[119879,1,"t"],[119880,1,"u"],[119881,1,"v"],[119882,1,"w"],[119883,1,"x"],[119884,1,"y"],[119885,1,"z"],[119886,1,"a"],[119887,1,"b"],[119888,1,"c"],[119889,1,"d"],[119890,1,"e"],[119891,1,"f"],[119892,1,"g"],[119893,3],[119894,1,"i"],[119895,1,"j"],[119896,1,"k"],[119897,1,"l"],[119898,1,"m"],[119899,1,"n"],[119900,1,"o"],[119901,1,"p"],[119902,1,"q"],[119903,1,"r"],[119904,1,"s"],[119905,1,"t"],[119906,1,"u"],[119907,1,"v"],[119908,1,"w"],[119909,1,"x"],[119910,1,"y"],[119911,1,"z"],[119912,1,"a"],[119913,1,"b"],[119914,1,"c"],[119915,1,"d"],[119916,1,"e"],[119917,1,"f"],[119918,1,"g"],[119919,1,"h"],[119920,1,"i"],[119921,1,"j"],[119922,1,"k"],[119923,1,"l"],[119924,1,"m"],[119925,1,"n"],[119926,1,"o"],[119927,1,"p"],[119928,1,"q"],[119929,1,"r"],[119930,1,"s"],[119931,1,"t"],[119932,1,"u"],[119933,1,"v"],[119934,1,"w"],[119935,1,"x"],[119936,1,"y"],[119937,1,"z"],[119938,1,"a"],[119939,1,"b"],[119940,1,"c"],[119941,1,"d"],[119942,1,"e"],[119943,1,"f"],[119944,1,"g"],[119945,1,"h"],[119946,1,"i"],[119947,1,"j"],[119948,1,"k"],[119949,1,"l"],[119950,1,"m"],[119951,1,"n"],[119952,1,"o"],[119953,1,"p"],[119954,1,"q"],[119955,1,"r"],[119956,1,"s"],[119957,1,"t"],[119958,1,"u"],[119959,1,"v"],[119960,1,"w"],[119961,1,"x"],[119962,1,"y"],[119963,1,"z"],[119964,1,"a"],[119965,3],[119966,1,"c"],[119967,1,"d"],[[119968,119969],3],[119970,1,"g"],[[119971,119972],3],[119973,1,"j"],[119974,1,"k"],[[119975,119976],3],[119977,1,"n"],[119978,1,"o"],[119979,1,"p"],[119980,1,"q"],[119981,3],[119982,1,"s"],[119983,1,"t"],[119984,1,"u"],[119985,1,"v"],[119986,1,"w"],[119987,1,"x"],[119988,1,"y"],[119989,1,"z"],[119990,1,"a"],[119991,1,"b"],[119992,1,"c"],[119993,1,"d"],[119994,3],[119995,1,"f"],[119996,3],[119997,1,"h"],[119998,1,"i"],[119999,1,"j"],[120000,1,"k"],[120001,1,"l"],[120002,1,"m"],[120003,1,"n"],[120004,3],[120005,1,"p"],[120006,1,"q"],[120007,1,"r"],[120008,1,"s"],[120009,1,"t"],[120010,1,"u"],[120011,1,"v"],[120012,1,"w"],[120013,1,"x"],[120014,1,"y"],[120015,1,"z"],[120016,1,"a"],[120017,1,"b"],[120018,1,"c"],[120019,1,"d"],[120020,1,"e"],[120021,1,"f"],[120022,1,"g"],[120023,1,"h"],[120024,1,"i"],[120025,1,"j"],[120026,1,"k"],[120027,1,"l"],[120028,1,"m"],[120029,1,"n"],[120030,1,"o"],[120031,1,"p"],[120032,1,"q"],[120033,1,"r"],[120034,1,"s"],[120035,1,"t"],[120036,1,"u"],[120037,1,"v"],[120038,1,"w"],[120039,1,"x"],[120040,1,"y"],[120041,1,"z"],[120042,1,"a"],[120043,1,"b"],[120044,1,"c"],[120045,1,"d"],[120046,1,"e"],[120047,1,"f"],[120048,1,"g"],[120049,1,"h"],[120050,1,"i"],[120051,1,"j"],[120052,1,"k"],[120053,1,"l"],[120054,1,"m"],[120055,1,"n"],[120056,1,"o"],[120057,1,"p"],[120058,1,"q"],[120059,1,"r"],[120060,1,"s"],[120061,1,"t"],[120062,1,"u"],[120063,1,"v"],[120064,1,"w"],[120065,1,"x"],[120066,1,"y"],[120067,1,"z"],[120068,1,"a"],[120069,1,"b"],[120070,3],[120071,1,"d"],[120072,1,"e"],[120073,1,"f"],[120074,1,"g"],[[120075,120076],3],[120077,1,"j"],[120078,1,"k"],[120079,1,"l"],[120080,1,"m"],[120081,1,"n"],[120082,1,"o"],[120083,1,"p"],[120084,1,"q"],[120085,3],[120086,1,"s"],[120087,1,"t"],[120088,1,"u"],[120089,1,"v"],[120090,1,"w"],[120091,1,"x"],[120092,1,"y"],[120093,3],[120094,1,"a"],[120095,1,"b"],[120096,1,"c"],[120097,1,"d"],[120098,1,"e"],[120099,1,"f"],[120100,1,"g"],[120101,1,"h"],[120102,1,"i"],[120103,1,"j"],[120104,1,"k"],[120105,1,"l"],[120106,1,"m"],[120107,1,"n"],[120108,1,"o"],[120109,1,"p"],[120110,1,"q"],[120111,1,"r"],[120112,1,"s"],[120113,1,"t"],[120114,1,"u"],[120115,1,"v"],[120116,1,"w"],[120117,1,"x"],[120118,1,"y"],[120119,1,"z"],[120120,1,"a"],[120121,1,"b"],[120122,3],[120123,1,"d"],[120124,1,"e"],[120125,1,"f"],[120126,1,"g"],[120127,3],[120128,1,"i"],[120129,1,"j"],[120130,1,"k"],[120131,1,"l"],[120132,1,"m"],[120133,3],[120134,1,"o"],[[120135,120137],3],[120138,1,"s"],[120139,1,"t"],[120140,1,"u"],[120141,1,"v"],[120142,1,"w"],[120143,1,"x"],[120144,1,"y"],[120145,3],[120146,1,"a"],[120147,1,"b"],[120148,1,"c"],[120149,1,"d"],[120150,1,"e"],[120151,1,"f"],[120152,1,"g"],[120153,1,"h"],[120154,1,"i"],[120155,1,"j"],[120156,1,"k"],[120157,1,"l"],[120158,1,"m"],[120159,1,"n"],[120160,1,"o"],[120161,1,"p"],[120162,1,"q"],[120163,1,"r"],[120164,1,"s"],[120165,1,"t"],[120166,1,"u"],[120167,1,"v"],[120168,1,"w"],[120169,1,"x"],[120170,1,"y"],[120171,1,"z"],[120172,1,"a"],[120173,1,"b"],[120174,1,"c"],[120175,1,"d"],[120176,1,"e"],[120177,1,"f"],[120178,1,"g"],[120179,1,"h"],[120180,1,"i"],[120181,1,"j"],[120182,1,"k"],[120183,1,"l"],[120184,1,"m"],[120185,1,"n"],[120186,1,"o"],[120187,1,"p"],[120188,1,"q"],[120189,1,"r"],[120190,1,"s"],[120191,1,"t"],[120192,1,"u"],[120193,1,"v"],[120194,1,"w"],[120195,1,"x"],[120196,1,"y"],[120197,1,"z"],[120198,1,"a"],[120199,1,"b"],[120200,1,"c"],[120201,1,"d"],[120202,1,"e"],[120203,1,"f"],[120204,1,"g"],[120205,1,"h"],[120206,1,"i"],[120207,1,"j"],[120208,1,"k"],[120209,1,"l"],[120210,1,"m"],[120211,1,"n"],[120212,1,"o"],[120213,1,"p"],[120214,1,"q"],[120215,1,"r"],[120216,1,"s"],[120217,1,"t"],[120218,1,"u"],[120219,1,"v"],[120220,1,"w"],[120221,1,"x"],[120222,1,"y"],[120223,1,"z"],[120224,1,"a"],[120225,1,"b"],[120226,1,"c"],[120227,1,"d"],[120228,1,"e"],[120229,1,"f"],[120230,1,"g"],[120231,1,"h"],[120232,1,"i"],[120233,1,"j"],[120234,1,"k"],[120235,1,"l"],[120236,1,"m"],[120237,1,"n"],[120238,1,"o"],[120239,1,"p"],[120240,1,"q"],[120241,1,"r"],[120242,1,"s"],[120243,1,"t"],[120244,1,"u"],[120245,1,"v"],[120246,1,"w"],[120247,1,"x"],[120248,1,"y"],[120249,1,"z"],[120250,1,"a"],[120251,1,"b"],[120252,1,"c"],[120253,1,"d"],[120254,1,"e"],[120255,1,"f"],[120256,1,"g"],[120257,1,"h"],[120258,1,"i"],[120259,1,"j"],[120260,1,"k"],[120261,1,"l"],[120262,1,"m"],[120263,1,"n"],[120264,1,"o"],[120265,1,"p"],[120266,1,"q"],[120267,1,"r"],[120268,1,"s"],[120269,1,"t"],[120270,1,"u"],[120271,1,"v"],[120272,1,"w"],[120273,1,"x"],[120274,1,"y"],[120275,1,"z"],[120276,1,"a"],[120277,1,"b"],[120278,1,"c"],[120279,1,"d"],[120280,1,"e"],[120281,1,"f"],[120282,1,"g"],[120283,1,"h"],[120284,1,"i"],[120285,1,"j"],[120286,1,"k"],[120287,1,"l"],[120288,1,"m"],[120289,1,"n"],[120290,1,"o"],[120291,1,"p"],[120292,1,"q"],[120293,1,"r"],[120294,1,"s"],[120295,1,"t"],[120296,1,"u"],[120297,1,"v"],[120298,1,"w"],[120299,1,"x"],[120300,1,"y"],[120301,1,"z"],[120302,1,"a"],[120303,1,"b"],[120304,1,"c"],[120305,1,"d"],[120306,1,"e"],[120307,1,"f"],[120308,1,"g"],[120309,1,"h"],[120310,1,"i"],[120311,1,"j"],[120312,1,"k"],[120313,1,"l"],[120314,1,"m"],[120315,1,"n"],[120316,1,"o"],[120317,1,"p"],[120318,1,"q"],[120319,1,"r"],[120320,1,"s"],[120321,1,"t"],[120322,1,"u"],[120323,1,"v"],[120324,1,"w"],[120325,1,"x"],[120326,1,"y"],[120327,1,"z"],[120328,1,"a"],[120329,1,"b"],[120330,1,"c"],[120331,1,"d"],[120332,1,"e"],[120333,1,"f"],[120334,1,"g"],[120335,1,"h"],[120336,1,"i"],[120337,1,"j"],[120338,1,"k"],[120339,1,"l"],[120340,1,"m"],[120341,1,"n"],[120342,1,"o"],[120343,1,"p"],[120344,1,"q"],[120345,1,"r"],[120346,1,"s"],[120347,1,"t"],[120348,1,"u"],[120349,1,"v"],[120350,1,"w"],[120351,1,"x"],[120352,1,"y"],[120353,1,"z"],[120354,1,"a"],[120355,1,"b"],[120356,1,"c"],[120357,1,"d"],[120358,1,"e"],[120359,1,"f"],[120360,1,"g"],[120361,1,"h"],[120362,1,"i"],[120363,1,"j"],[120364,1,"k"],[120365,1,"l"],[120366,1,"m"],[120367,1,"n"],[120368,1,"o"],[120369,1,"p"],[120370,1,"q"],[120371,1,"r"],[120372,1,"s"],[120373,1,"t"],[120374,1,"u"],[120375,1,"v"],[120376,1,"w"],[120377,1,"x"],[120378,1,"y"],[120379,1,"z"],[120380,1,"a"],[120381,1,"b"],[120382,1,"c"],[120383,1,"d"],[120384,1,"e"],[120385,1,"f"],[120386,1,"g"],[120387,1,"h"],[120388,1,"i"],[120389,1,"j"],[120390,1,"k"],[120391,1,"l"],[120392,1,"m"],[120393,1,"n"],[120394,1,"o"],[120395,1,"p"],[120396,1,"q"],[120397,1,"r"],[120398,1,"s"],[120399,1,"t"],[120400,1,"u"],[120401,1,"v"],[120402,1,"w"],[120403,1,"x"],[120404,1,"y"],[120405,1,"z"],[120406,1,"a"],[120407,1,"b"],[120408,1,"c"],[120409,1,"d"],[120410,1,"e"],[120411,1,"f"],[120412,1,"g"],[120413,1,"h"],[120414,1,"i"],[120415,1,"j"],[120416,1,"k"],[120417,1,"l"],[120418,1,"m"],[120419,1,"n"],[120420,1,"o"],[120421,1,"p"],[120422,1,"q"],[120423,1,"r"],[120424,1,"s"],[120425,1,"t"],[120426,1,"u"],[120427,1,"v"],[120428,1,"w"],[120429,1,"x"],[120430,1,"y"],[120431,1,"z"],[120432,1,"a"],[120433,1,"b"],[120434,1,"c"],[120435,1,"d"],[120436,1,"e"],[120437,1,"f"],[120438,1,"g"],[120439,1,"h"],[120440,1,"i"],[120441,1,"j"],[120442,1,"k"],[120443,1,"l"],[120444,1,"m"],[120445,1,"n"],[120446,1,"o"],[120447,1,"p"],[120448,1,"q"],[120449,1,"r"],[120450,1,"s"],[120451,1,"t"],[120452,1,"u"],[120453,1,"v"],[120454,1,"w"],[120455,1,"x"],[120456,1,"y"],[120457,1,"z"],[120458,1,"a"],[120459,1,"b"],[120460,1,"c"],[120461,1,"d"],[120462,1,"e"],[120463,1,"f"],[120464,1,"g"],[120465,1,"h"],[120466,1,"i"],[120467,1,"j"],[120468,1,"k"],[120469,1,"l"],[120470,1,"m"],[120471,1,"n"],[120472,1,"o"],[120473,1,"p"],[120474,1,"q"],[120475,1,"r"],[120476,1,"s"],[120477,1,"t"],[120478,1,"u"],[120479,1,"v"],[120480,1,"w"],[120481,1,"x"],[120482,1,"y"],[120483,1,"z"],[120484,1,"ı"],[120485,1,"ȷ"],[[120486,120487],3],[120488,1,"α"],[120489,1,"β"],[120490,1,"γ"],[120491,1,"δ"],[120492,1,"ε"],[120493,1,"ζ"],[120494,1,"η"],[120495,1,"θ"],[120496,1,"ι"],[120497,1,"κ"],[120498,1,"λ"],[120499,1,"μ"],[120500,1,"ν"],[120501,1,"ξ"],[120502,1,"ο"],[120503,1,"π"],[120504,1,"ρ"],[120505,1,"θ"],[120506,1,"σ"],[120507,1,"τ"],[120508,1,"υ"],[120509,1,"φ"],[120510,1,"χ"],[120511,1,"ψ"],[120512,1,"ω"],[120513,1,"∇"],[120514,1,"α"],[120515,1,"β"],[120516,1,"γ"],[120517,1,"δ"],[120518,1,"ε"],[120519,1,"ζ"],[120520,1,"η"],[120521,1,"θ"],[120522,1,"ι"],[120523,1,"κ"],[120524,1,"λ"],[120525,1,"μ"],[120526,1,"ν"],[120527,1,"ξ"],[120528,1,"ο"],[120529,1,"π"],[120530,1,"ρ"],[[120531,120532],1,"σ"],[120533,1,"τ"],[120534,1,"υ"],[120535,1,"φ"],[120536,1,"χ"],[120537,1,"ψ"],[120538,1,"ω"],[120539,1,"∂"],[120540,1,"ε"],[120541,1,"θ"],[120542,1,"κ"],[120543,1,"φ"],[120544,1,"ρ"],[120545,1,"π"],[120546,1,"α"],[120547,1,"β"],[120548,1,"γ"],[120549,1,"δ"],[120550,1,"ε"],[120551,1,"ζ"],[120552,1,"η"],[120553,1,"θ"],[120554,1,"ι"],[120555,1,"κ"],[120556,1,"λ"],[120557,1,"μ"],[120558,1,"ν"],[120559,1,"ξ"],[120560,1,"ο"],[120561,1,"π"],[120562,1,"ρ"],[120563,1,"θ"],[120564,1,"σ"],[120565,1,"τ"],[120566,1,"υ"],[120567,1,"φ"],[120568,1,"χ"],[120569,1,"ψ"],[120570,1,"ω"],[120571,1,"∇"],[120572,1,"α"],[120573,1,"β"],[120574,1,"γ"],[120575,1,"δ"],[120576,1,"ε"],[120577,1,"ζ"],[120578,1,"η"],[120579,1,"θ"],[120580,1,"ι"],[120581,1,"κ"],[120582,1,"λ"],[120583,1,"μ"],[120584,1,"ν"],[120585,1,"ξ"],[120586,1,"ο"],[120587,1,"π"],[120588,1,"ρ"],[[120589,120590],1,"σ"],[120591,1,"τ"],[120592,1,"υ"],[120593,1,"φ"],[120594,1,"χ"],[120595,1,"ψ"],[120596,1,"ω"],[120597,1,"∂"],[120598,1,"ε"],[120599,1,"θ"],[120600,1,"κ"],[120601,1,"φ"],[120602,1,"ρ"],[120603,1,"π"],[120604,1,"α"],[120605,1,"β"],[120606,1,"γ"],[120607,1,"δ"],[120608,1,"ε"],[120609,1,"ζ"],[120610,1,"η"],[120611,1,"θ"],[120612,1,"ι"],[120613,1,"κ"],[120614,1,"λ"],[120615,1,"μ"],[120616,1,"ν"],[120617,1,"ξ"],[120618,1,"ο"],[120619,1,"π"],[120620,1,"ρ"],[120621,1,"θ"],[120622,1,"σ"],[120623,1,"τ"],[120624,1,"υ"],[120625,1,"φ"],[120626,1,"χ"],[120627,1,"ψ"],[120628,1,"ω"],[120629,1,"∇"],[120630,1,"α"],[120631,1,"β"],[120632,1,"γ"],[120633,1,"δ"],[120634,1,"ε"],[120635,1,"ζ"],[120636,1,"η"],[120637,1,"θ"],[120638,1,"ι"],[120639,1,"κ"],[120640,1,"λ"],[120641,1,"μ"],[120642,1,"ν"],[120643,1,"ξ"],[120644,1,"ο"],[120645,1,"π"],[120646,1,"ρ"],[[120647,120648],1,"σ"],[120649,1,"τ"],[120650,1,"υ"],[120651,1,"φ"],[120652,1,"χ"],[120653,1,"ψ"],[120654,1,"ω"],[120655,1,"∂"],[120656,1,"ε"],[120657,1,"θ"],[120658,1,"κ"],[120659,1,"φ"],[120660,1,"ρ"],[120661,1,"π"],[120662,1,"α"],[120663,1,"β"],[120664,1,"γ"],[120665,1,"δ"],[120666,1,"ε"],[120667,1,"ζ"],[120668,1,"η"],[120669,1,"θ"],[120670,1,"ι"],[120671,1,"κ"],[120672,1,"λ"],[120673,1,"μ"],[120674,1,"ν"],[120675,1,"ξ"],[120676,1,"ο"],[120677,1,"π"],[120678,1,"ρ"],[120679,1,"θ"],[120680,1,"σ"],[120681,1,"τ"],[120682,1,"υ"],[120683,1,"φ"],[120684,1,"χ"],[120685,1,"ψ"],[120686,1,"ω"],[120687,1,"∇"],[120688,1,"α"],[120689,1,"β"],[120690,1,"γ"],[120691,1,"δ"],[120692,1,"ε"],[120693,1,"ζ"],[120694,1,"η"],[120695,1,"θ"],[120696,1,"ι"],[120697,1,"κ"],[120698,1,"λ"],[120699,1,"μ"],[120700,1,"ν"],[120701,1,"ξ"],[120702,1,"ο"],[120703,1,"π"],[120704,1,"ρ"],[[120705,120706],1,"σ"],[120707,1,"τ"],[120708,1,"υ"],[120709,1,"φ"],[120710,1,"χ"],[120711,1,"ψ"],[120712,1,"ω"],[120713,1,"∂"],[120714,1,"ε"],[120715,1,"θ"],[120716,1,"κ"],[120717,1,"φ"],[120718,1,"ρ"],[120719,1,"π"],[120720,1,"α"],[120721,1,"β"],[120722,1,"γ"],[120723,1,"δ"],[120724,1,"ε"],[120725,1,"ζ"],[120726,1,"η"],[120727,1,"θ"],[120728,1,"ι"],[120729,1,"κ"],[120730,1,"λ"],[120731,1,"μ"],[120732,1,"ν"],[120733,1,"ξ"],[120734,1,"ο"],[120735,1,"π"],[120736,1,"ρ"],[120737,1,"θ"],[120738,1,"σ"],[120739,1,"τ"],[120740,1,"υ"],[120741,1,"φ"],[120742,1,"χ"],[120743,1,"ψ"],[120744,1,"ω"],[120745,1,"∇"],[120746,1,"α"],[120747,1,"β"],[120748,1,"γ"],[120749,1,"δ"],[120750,1,"ε"],[120751,1,"ζ"],[120752,1,"η"],[120753,1,"θ"],[120754,1,"ι"],[120755,1,"κ"],[120756,1,"λ"],[120757,1,"μ"],[120758,1,"ν"],[120759,1,"ξ"],[120760,1,"ο"],[120761,1,"π"],[120762,1,"ρ"],[[120763,120764],1,"σ"],[120765,1,"τ"],[120766,1,"υ"],[120767,1,"φ"],[120768,1,"χ"],[120769,1,"ψ"],[120770,1,"ω"],[120771,1,"∂"],[120772,1,"ε"],[120773,1,"θ"],[120774,1,"κ"],[120775,1,"φ"],[120776,1,"ρ"],[120777,1,"π"],[[120778,120779],1,"ϝ"],[[120780,120781],3],[120782,1,"0"],[120783,1,"1"],[120784,1,"2"],[120785,1,"3"],[120786,1,"4"],[120787,1,"5"],[120788,1,"6"],[120789,1,"7"],[120790,1,"8"],[120791,1,"9"],[120792,1,"0"],[120793,1,"1"],[120794,1,"2"],[120795,1,"3"],[120796,1,"4"],[120797,1,"5"],[120798,1,"6"],[120799,1,"7"],[120800,1,"8"],[120801,1,"9"],[120802,1,"0"],[120803,1,"1"],[120804,1,"2"],[120805,1,"3"],[120806,1,"4"],[120807,1,"5"],[120808,1,"6"],[120809,1,"7"],[120810,1,"8"],[120811,1,"9"],[120812,1,"0"],[120813,1,"1"],[120814,1,"2"],[120815,1,"3"],[120816,1,"4"],[120817,1,"5"],[120818,1,"6"],[120819,1,"7"],[120820,1,"8"],[120821,1,"9"],[120822,1,"0"],[120823,1,"1"],[120824,1,"2"],[120825,1,"3"],[120826,1,"4"],[120827,1,"5"],[120828,1,"6"],[120829,1,"7"],[120830,1,"8"],[120831,1,"9"],[[120832,121343],2],[[121344,121398],2],[[121399,121402],2],[[121403,121452],2],[[121453,121460],2],[121461,2],[[121462,121475],2],[121476,2],[[121477,121483],2],[[121484,121498],3],[[121499,121503],2],[121504,3],[[121505,121519],2],[[121520,122623],3],[[122624,122654],2],[[122655,122660],3],[[122661,122666],2],[[122667,122879],3],[[122880,122886],2],[122887,3],[[122888,122904],2],[[122905,122906],3],[[122907,122913],2],[122914,3],[[122915,122916],2],[122917,3],[[122918,122922],2],[[122923,122927],3],[122928,1,"а"],[122929,1,"б"],[122930,1,"в"],[122931,1,"г"],[122932,1,"д"],[122933,1,"е"],[122934,1,"ж"],[122935,1,"з"],[122936,1,"и"],[122937,1,"к"],[122938,1,"л"],[122939,1,"м"],[122940,1,"о"],[122941,1,"п"],[122942,1,"р"],[122943,1,"с"],[122944,1,"т"],[122945,1,"у"],[122946,1,"ф"],[122947,1,"х"],[122948,1,"ц"],[122949,1,"ч"],[122950,1,"ш"],[122951,1,"ы"],[122952,1,"э"],[122953,1,"ю"],[122954,1,"ꚉ"],[122955,1,"ә"],[122956,1,"і"],[122957,1,"ј"],[122958,1,"ө"],[122959,1,"ү"],[122960,1,"ӏ"],[122961,1,"а"],[122962,1,"б"],[122963,1,"в"],[122964,1,"г"],[122965,1,"д"],[122966,1,"е"],[122967,1,"ж"],[122968,1,"з"],[122969,1,"и"],[122970,1,"к"],[122971,1,"л"],[122972,1,"о"],[122973,1,"п"],[122974,1,"с"],[122975,1,"у"],[122976,1,"ф"],[122977,1,"х"],[122978,1,"ц"],[122979,1,"ч"],[122980,1,"ш"],[122981,1,"ъ"],[122982,1,"ы"],[122983,1,"ґ"],[122984,1,"і"],[122985,1,"ѕ"],[122986,1,"џ"],[122987,1,"ҫ"],[122988,1,"ꙑ"],[122989,1,"ұ"],[[122990,123022],3],[123023,2],[[123024,123135],3],[[123136,123180],2],[[123181,123183],3],[[123184,123197],2],[[123198,123199],3],[[123200,123209],2],[[123210,123213],3],[123214,2],[123215,2],[[123216,123535],3],[[123536,123566],2],[[123567,123583],3],[[123584,123641],2],[[123642,123646],3],[123647,2],[[123648,124111],3],[[124112,124153],2],[[124154,124367],3],[[124368,124410],2],[[124411,124414],3],[124415,2],[[124416,124895],3],[[124896,124902],2],[124903,3],[[124904,124907],2],[124908,3],[[124909,124910],2],[124911,3],[[124912,124926],2],[124927,3],[[124928,125124],2],[[125125,125126],3],[[125127,125135],2],[[125136,125142],2],[[125143,125183],3],[125184,1,"𞤢"],[125185,1,"𞤣"],[125186,1,"𞤤"],[125187,1,"𞤥"],[125188,1,"𞤦"],[125189,1,"𞤧"],[125190,1,"𞤨"],[125191,1,"𞤩"],[125192,1,"𞤪"],[125193,1,"𞤫"],[125194,1,"𞤬"],[125195,1,"𞤭"],[125196,1,"𞤮"],[125197,1,"𞤯"],[125198,1,"𞤰"],[125199,1,"𞤱"],[125200,1,"𞤲"],[125201,1,"𞤳"],[125202,1,"𞤴"],[125203,1,"𞤵"],[125204,1,"𞤶"],[125205,1,"𞤷"],[125206,1,"𞤸"],[125207,1,"𞤹"],[125208,1,"𞤺"],[125209,1,"𞤻"],[125210,1,"𞤼"],[125211,1,"𞤽"],[125212,1,"𞤾"],[125213,1,"𞤿"],[125214,1,"𞥀"],[125215,1,"𞥁"],[125216,1,"𞥂"],[125217,1,"𞥃"],[[125218,125258],2],[125259,2],[[125260,125263],3],[[125264,125273],2],[[125274,125277],3],[[125278,125279],2],[[125280,126064],3],[[126065,126132],2],[[126133,126208],3],[[126209,126269],2],[[126270,126463],3],[126464,1,"ا"],[126465,1,"ب"],[126466,1,"ج"],[126467,1,"د"],[126468,3],[126469,1,"و"],[126470,1,"ز"],[126471,1,"ح"],[126472,1,"ط"],[126473,1,"ي"],[126474,1,"ك"],[126475,1,"ل"],[126476,1,"م"],[126477,1,"ن"],[126478,1,"س"],[126479,1,"ع"],[126480,1,"ف"],[126481,1,"ص"],[126482,1,"ق"],[126483,1,"ر"],[126484,1,"ش"],[126485,1,"ت"],[126486,1,"ث"],[126487,1,"خ"],[126488,1,"ذ"],[126489,1,"ض"],[126490,1,"ظ"],[126491,1,"غ"],[126492,1,"ٮ"],[126493,1,"ں"],[126494,1,"ڡ"],[126495,1,"ٯ"],[126496,3],[126497,1,"ب"],[126498,1,"ج"],[126499,3],[126500,1,"ه"],[[126501,126502],3],[126503,1,"ح"],[126504,3],[126505,1,"ي"],[126506,1,"ك"],[126507,1,"ل"],[126508,1,"م"],[126509,1,"ن"],[126510,1,"س"],[126511,1,"ع"],[126512,1,"ف"],[126513,1,"ص"],[126514,1,"ق"],[126515,3],[126516,1,"ش"],[126517,1,"ت"],[126518,1,"ث"],[126519,1,"خ"],[126520,3],[126521,1,"ض"],[126522,3],[126523,1,"غ"],[[126524,126529],3],[126530,1,"ج"],[[126531,126534],3],[126535,1,"ح"],[126536,3],[126537,1,"ي"],[126538,3],[126539,1,"ل"],[126540,3],[126541,1,"ن"],[126542,1,"س"],[126543,1,"ع"],[126544,3],[126545,1,"ص"],[126546,1,"ق"],[126547,3],[126548,1,"ش"],[[126549,126550],3],[126551,1,"خ"],[126552,3],[126553,1,"ض"],[126554,3],[126555,1,"غ"],[126556,3],[126557,1,"ں"],[126558,3],[126559,1,"ٯ"],[126560,3],[126561,1,"ب"],[126562,1,"ج"],[126563,3],[126564,1,"ه"],[[126565,126566],3],[126567,1,"ح"],[126568,1,"ط"],[126569,1,"ي"],[126570,1,"ك"],[126571,3],[126572,1,"م"],[126573,1,"ن"],[126574,1,"س"],[126575,1,"ع"],[126576,1,"ف"],[126577,1,"ص"],[126578,1,"ق"],[126579,3],[126580,1,"ش"],[126581,1,"ت"],[126582,1,"ث"],[126583,1,"خ"],[126584,3],[126585,1,"ض"],[126586,1,"ظ"],[126587,1,"غ"],[126588,1,"ٮ"],[126589,3],[126590,1,"ڡ"],[126591,3],[126592,1,"ا"],[126593,1,"ب"],[126594,1,"ج"],[126595,1,"د"],[126596,1,"ه"],[126597,1,"و"],[126598,1,"ز"],[126599,1,"ح"],[126600,1,"ط"],[126601,1,"ي"],[126602,3],[126603,1,"ل"],[126604,1,"م"],[126605,1,"ن"],[126606,1,"س"],[126607,1,"ع"],[126608,1,"ف"],[126609,1,"ص"],[126610,1,"ق"],[126611,1,"ر"],[126612,1,"ش"],[126613,1,"ت"],[126614,1,"ث"],[126615,1,"خ"],[126616,1,"ذ"],[126617,1,"ض"],[126618,1,"ظ"],[126619,1,"غ"],[[126620,126624],3],[126625,1,"ب"],[126626,1,"ج"],[126627,1,"د"],[126628,3],[126629,1,"و"],[126630,1,"ز"],[126631,1,"ح"],[126632,1,"ط"],[126633,1,"ي"],[126634,3],[126635,1,"ل"],[126636,1,"م"],[126637,1,"ن"],[126638,1,"س"],[126639,1,"ع"],[126640,1,"ف"],[126641,1,"ص"],[126642,1,"ق"],[126643,1,"ر"],[126644,1,"ش"],[126645,1,"ت"],[126646,1,"ث"],[126647,1,"خ"],[126648,1,"ذ"],[126649,1,"ض"],[126650,1,"ظ"],[126651,1,"غ"],[[126652,126703],3],[[126704,126705],2],[[126706,126975],3],[[126976,127019],2],[[127020,127023],3],[[127024,127123],2],[[127124,127135],3],[[127136,127150],2],[[127151,127152],3],[[127153,127166],2],[127167,2],[127168,3],[[127169,127183],2],[127184,3],[[127185,127199],2],[[127200,127221],2],[[127222,127231],3],[127232,3],[127233,1,"0,"],[127234,1,"1,"],[127235,1,"2,"],[127236,1,"3,"],[127237,1,"4,"],[127238,1,"5,"],[127239,1,"6,"],[127240,1,"7,"],[127241,1,"8,"],[127242,1,"9,"],[[127243,127244],2],[[127245,127247],2],[127248,1,"(a)"],[127249,1,"(b)"],[127250,1,"(c)"],[127251,1,"(d)"],[127252,1,"(e)"],[127253,1,"(f)"],[127254,1,"(g)"],[127255,1,"(h)"],[127256,1,"(i)"],[127257,1,"(j)"],[127258,1,"(k)"],[127259,1,"(l)"],[127260,1,"(m)"],[127261,1,"(n)"],[127262,1,"(o)"],[127263,1,"(p)"],[127264,1,"(q)"],[127265,1,"(r)"],[127266,1,"(s)"],[127267,1,"(t)"],[127268,1,"(u)"],[127269,1,"(v)"],[127270,1,"(w)"],[127271,1,"(x)"],[127272,1,"(y)"],[127273,1,"(z)"],[127274,1,"〔s〕"],[127275,1,"c"],[127276,1,"r"],[127277,1,"cd"],[127278,1,"wz"],[127279,2],[127280,1,"a"],[127281,1,"b"],[127282,1,"c"],[127283,1,"d"],[127284,1,"e"],[127285,1,"f"],[127286,1,"g"],[127287,1,"h"],[127288,1,"i"],[127289,1,"j"],[127290,1,"k"],[127291,1,"l"],[127292,1,"m"],[127293,1,"n"],[127294,1,"o"],[127295,1,"p"],[127296,1,"q"],[127297,1,"r"],[127298,1,"s"],[127299,1,"t"],[127300,1,"u"],[127301,1,"v"],[127302,1,"w"],[127303,1,"x"],[127304,1,"y"],[127305,1,"z"],[127306,1,"hv"],[127307,1,"mv"],[127308,1,"sd"],[127309,1,"ss"],[127310,1,"ppv"],[127311,1,"wc"],[[127312,127318],2],[127319,2],[[127320,127326],2],[127327,2],[[127328,127337],2],[127338,1,"mc"],[127339,1,"md"],[127340,1,"mr"],[[127341,127343],2],[[127344,127352],2],[127353,2],[127354,2],[[127355,127356],2],[[127357,127358],2],[127359,2],[[127360,127369],2],[[127370,127373],2],[[127374,127375],2],[127376,1,"dj"],[[127377,127386],2],[[127387,127404],2],[127405,2],[[127406,127461],3],[[127462,127487],2],[127488,1,"ほか"],[127489,1,"ココ"],[127490,1,"サ"],[[127491,127503],3],[127504,1,"手"],[127505,1,"字"],[127506,1,"双"],[127507,1,"デ"],[127508,1,"二"],[127509,1,"多"],[127510,1,"解"],[127511,1,"天"],[127512,1,"交"],[127513,1,"映"],[127514,1,"無"],[127515,1,"料"],[127516,1,"前"],[127517,1,"後"],[127518,1,"再"],[127519,1,"新"],[127520,1,"初"],[127521,1,"終"],[127522,1,"生"],[127523,1,"販"],[127524,1,"声"],[127525,1,"吹"],[127526,1,"演"],[127527,1,"投"],[127528,1,"捕"],[127529,1,"一"],[127530,1,"三"],[127531,1,"遊"],[127532,1,"左"],[127533,1,"中"],[127534,1,"右"],[127535,1,"指"],[127536,1,"走"],[127537,1,"打"],[127538,1,"禁"],[127539,1,"空"],[127540,1,"合"],[127541,1,"満"],[127542,1,"有"],[127543,1,"月"],[127544,1,"申"],[127545,1,"割"],[127546,1,"営"],[127547,1,"配"],[[127548,127551],3],[127552,1,"〔本〕"],[127553,1,"〔三〕"],[127554,1,"〔二〕"],[127555,1,"〔安〕"],[127556,1,"〔点〕"],[127557,1,"〔打〕"],[127558,1,"〔盗〕"],[127559,1,"〔勝〕"],[127560,1,"〔敗〕"],[[127561,127567],3],[127568,1,"得"],[127569,1,"可"],[[127570,127583],3],[[127584,127589],2],[[127590,127743],3],[[127744,127776],2],[[127777,127788],2],[[127789,127791],2],[[127792,127797],2],[127798,2],[[127799,127868],2],[127869,2],[[127870,127871],2],[[127872,127891],2],[[127892,127903],2],[[127904,127940],2],[127941,2],[[127942,127946],2],[[127947,127950],2],[[127951,127955],2],[[127956,127967],2],[[127968,127984],2],[[127985,127991],2],[[127992,127999],2],[[128000,128062],2],[128063,2],[128064,2],[128065,2],[[128066,128247],2],[128248,2],[[128249,128252],2],[[128253,128254],2],[128255,2],[[128256,128317],2],[[128318,128319],2],[[128320,128323],2],[[128324,128330],2],[[128331,128335],2],[[128336,128359],2],[[128360,128377],2],[128378,2],[[128379,128419],2],[128420,2],[[128421,128506],2],[[128507,128511],2],[128512,2],[[128513,128528],2],[128529,2],[[128530,128532],2],[128533,2],[128534,2],[128535,2],[128536,2],[128537,2],[128538,2],[128539,2],[[128540,128542],2],[128543,2],[[128544,128549],2],[[128550,128551],2],[[128552,128555],2],[128556,2],[128557,2],[[128558,128559],2],[[128560,128563],2],[128564,2],[[128565,128576],2],[[128577,128578],2],[[128579,128580],2],[[128581,128591],2],[[128592,128639],2],[[128640,128709],2],[[128710,128719],2],[128720,2],[[128721,128722],2],[[128723,128724],2],[128725,2],[[128726,128727],2],[[128728,128731],3],[128732,2],[[128733,128735],2],[[128736,128748],2],[[128749,128751],3],[[128752,128755],2],[[128756,128758],2],[[128759,128760],2],[128761,2],[128762,2],[[128763,128764],2],[[128765,128767],3],[[128768,128883],2],[[128884,128886],2],[[128887,128890],3],[[128891,128895],2],[[128896,128980],2],[[128981,128984],2],[128985,2],[[128986,128991],3],[[128992,129003],2],[[129004,129007],3],[129008,2],[[129009,129023],3],[[129024,129035],2],[[129036,129039],3],[[129040,129095],2],[[129096,129103],3],[[129104,129113],2],[[129114,129119],3],[[129120,129159],2],[[129160,129167],3],[[129168,129197],2],[[129198,129199],3],[[129200,129201],2],[[129202,129211],2],[[129212,129215],3],[[129216,129217],2],[[129218,129279],3],[[129280,129291],2],[129292,2],[[129293,129295],2],[[129296,129304],2],[[129305,129310],2],[129311,2],[[129312,129319],2],[[129320,129327],2],[129328,2],[[129329,129330],2],[[129331,129342],2],[129343,2],[[129344,129355],2],[129356,2],[[129357,129359],2],[[129360,129374],2],[[129375,129387],2],[[129388,129392],2],[129393,2],[129394,2],[[129395,129398],2],[[129399,129400],2],[129401,2],[129402,2],[129403,2],[[129404,129407],2],[[129408,129412],2],[[129413,129425],2],[[129426,129431],2],[[129432,129442],2],[[129443,129444],2],[[129445,129450],2],[[129451,129453],2],[[129454,129455],2],[[129456,129465],2],[[129466,129471],2],[129472,2],[[129473,129474],2],[[129475,129482],2],[129483,2],[129484,2],[[129485,129487],2],[[129488,129510],2],[[129511,129535],2],[[129536,129619],2],[[129620,129631],3],[[129632,129645],2],[[129646,129647],3],[[129648,129651],2],[129652,2],[[129653,129655],2],[[129656,129658],2],[[129659,129660],2],[[129661,129663],3],[[129664,129666],2],[[129667,129670],2],[[129671,129672],2],[129673,2],[[129674,129678],3],[129679,2],[[129680,129685],2],[[129686,129704],2],[[129705,129708],2],[[129709,129711],2],[[129712,129718],2],[[129719,129722],2],[[129723,129725],2],[129726,2],[129727,2],[[129728,129730],2],[[129731,129733],2],[129734,2],[[129735,129741],3],[[129742,129743],2],[[129744,129750],2],[[129751,129753],2],[[129754,129755],2],[129756,2],[[129757,129758],3],[129759,2],[[129760,129767],2],[129768,2],[129769,2],[[129770,129775],3],[[129776,129782],2],[[129783,129784],2],[[129785,129791],3],[[129792,129938],2],[129939,3],[[129940,129994],2],[[129995,130031],2],[130032,1,"0"],[130033,1,"1"],[130034,1,"2"],[130035,1,"3"],[130036,1,"4"],[130037,1,"5"],[130038,1,"6"],[130039,1,"7"],[130040,1,"8"],[130041,1,"9"],[[130042,131069],3],[[131070,131071],3],[[131072,173782],2],[[173783,173789],2],[[173790,173791],2],[[173792,173823],3],[[173824,177972],2],[[177973,177976],2],[177977,2],[[177978,177983],3],[[177984,178205],2],[[178206,178207],3],[[178208,183969],2],[[183970,183983],3],[[183984,191456],2],[[191457,191471],3],[[191472,192093],2],[[192094,194559],3],[194560,1,"丽"],[194561,1,"丸"],[194562,1,"乁"],[194563,1,"𠄢"],[194564,1,"你"],[194565,1,"侮"],[194566,1,"侻"],[194567,1,"倂"],[194568,1,"偺"],[194569,1,"備"],[194570,1,"僧"],[194571,1,"像"],[194572,1,"㒞"],[194573,1,"𠘺"],[194574,1,"免"],[194575,1,"兔"],[194576,1,"兤"],[194577,1,"具"],[194578,1,"𠔜"],[194579,1,"㒹"],[194580,1,"內"],[194581,1,"再"],[194582,1,"𠕋"],[194583,1,"冗"],[194584,1,"冤"],[194585,1,"仌"],[194586,1,"冬"],[194587,1,"况"],[194588,1,"𩇟"],[194589,1,"凵"],[194590,1,"刃"],[194591,1,"㓟"],[194592,1,"刻"],[194593,1,"剆"],[194594,1,"割"],[194595,1,"剷"],[194596,1,"㔕"],[194597,1,"勇"],[194598,1,"勉"],[194599,1,"勤"],[194600,1,"勺"],[194601,1,"包"],[194602,1,"匆"],[194603,1,"北"],[194604,1,"卉"],[194605,1,"卑"],[194606,1,"博"],[194607,1,"即"],[194608,1,"卽"],[[194609,194611],1,"卿"],[194612,1,"𠨬"],[194613,1,"灰"],[194614,1,"及"],[194615,1,"叟"],[194616,1,"𠭣"],[194617,1,"叫"],[194618,1,"叱"],[194619,1,"吆"],[194620,1,"咞"],[194621,1,"吸"],[194622,1,"呈"],[194623,1,"周"],[194624,1,"咢"],[194625,1,"哶"],[194626,1,"唐"],[194627,1,"啓"],[194628,1,"啣"],[[194629,194630],1,"善"],[194631,1,"喙"],[194632,1,"喫"],[194633,1,"喳"],[194634,1,"嗂"],[194635,1,"圖"],[194636,1,"嘆"],[194637,1,"圗"],[194638,1,"噑"],[194639,1,"噴"],[194640,1,"切"],[194641,1,"壮"],[194642,1,"城"],[194643,1,"埴"],[194644,1,"堍"],[194645,1,"型"],[194646,1,"堲"],[194647,1,"報"],[194648,1,"墬"],[194649,1,"𡓤"],[194650,1,"売"],[194651,1,"壷"],[194652,1,"夆"],[194653,1,"多"],[194654,1,"夢"],[194655,1,"奢"],[194656,1,"𡚨"],[194657,1,"𡛪"],[194658,1,"姬"],[194659,1,"娛"],[194660,1,"娧"],[194661,1,"姘"],[194662,1,"婦"],[194663,1,"㛮"],[194664,1,"㛼"],[194665,1,"嬈"],[[194666,194667],1,"嬾"],[194668,1,"𡧈"],[194669,1,"寃"],[194670,1,"寘"],[194671,1,"寧"],[194672,1,"寳"],[194673,1,"𡬘"],[194674,1,"寿"],[194675,1,"将"],[194676,1,"当"],[194677,1,"尢"],[194678,1,"㞁"],[194679,1,"屠"],[194680,1,"屮"],[194681,1,"峀"],[194682,1,"岍"],[194683,1,"𡷤"],[194684,1,"嵃"],[194685,1,"𡷦"],[194686,1,"嵮"],[194687,1,"嵫"],[194688,1,"嵼"],[194689,1,"巡"],[194690,1,"巢"],[194691,1,"㠯"],[194692,1,"巽"],[194693,1,"帨"],[194694,1,"帽"],[194695,1,"幩"],[194696,1,"㡢"],[194697,1,"𢆃"],[194698,1,"㡼"],[194699,1,"庰"],[194700,1,"庳"],[194701,1,"庶"],[194702,1,"廊"],[194703,1,"𪎒"],[194704,1,"廾"],[[194705,194706],1,"𢌱"],[194707,1,"舁"],[[194708,194709],1,"弢"],[194710,1,"㣇"],[194711,1,"𣊸"],[194712,1,"𦇚"],[194713,1,"形"],[194714,1,"彫"],[194715,1,"㣣"],[194716,1,"徚"],[194717,1,"忍"],[194718,1,"志"],[194719,1,"忹"],[194720,1,"悁"],[194721,1,"㤺"],[194722,1,"㤜"],[194723,1,"悔"],[194724,1,"𢛔"],[194725,1,"惇"],[194726,1,"慈"],[194727,1,"慌"],[194728,1,"慎"],[194729,1,"慌"],[194730,1,"慺"],[194731,1,"憎"],[194732,1,"憲"],[194733,1,"憤"],[194734,1,"憯"],[194735,1,"懞"],[194736,1,"懲"],[194737,1,"懶"],[194738,1,"成"],[194739,1,"戛"],[194740,1,"扝"],[194741,1,"抱"],[194742,1,"拔"],[194743,1,"捐"],[194744,1,"𢬌"],[194745,1,"挽"],[194746,1,"拼"],[194747,1,"捨"],[194748,1,"掃"],[194749,1,"揤"],[194750,1,"𢯱"],[194751,1,"搢"],[194752,1,"揅"],[194753,1,"掩"],[194754,1,"㨮"],[194755,1,"摩"],[194756,1,"摾"],[194757,1,"撝"],[194758,1,"摷"],[194759,1,"㩬"],[194760,1,"敏"],[194761,1,"敬"],[194762,1,"𣀊"],[194763,1,"旣"],[194764,1,"書"],[194765,1,"晉"],[194766,1,"㬙"],[194767,1,"暑"],[194768,1,"㬈"],[194769,1,"㫤"],[194770,1,"冒"],[194771,1,"冕"],[194772,1,"最"],[194773,1,"暜"],[194774,1,"肭"],[194775,1,"䏙"],[194776,1,"朗"],[194777,1,"望"],[194778,1,"朡"],[194779,1,"杞"],[194780,1,"杓"],[194781,1,"𣏃"],[194782,1,"㭉"],[194783,1,"柺"],[194784,1,"枅"],[194785,1,"桒"],[194786,1,"梅"],[194787,1,"𣑭"],[194788,1,"梎"],[194789,1,"栟"],[194790,1,"椔"],[194791,1,"㮝"],[194792,1,"楂"],[194793,1,"榣"],[194794,1,"槪"],[194795,1,"檨"],[194796,1,"𣚣"],[194797,1,"櫛"],[194798,1,"㰘"],[194799,1,"次"],[194800,1,"𣢧"],[194801,1,"歔"],[194802,1,"㱎"],[194803,1,"歲"],[194804,1,"殟"],[194805,1,"殺"],[194806,1,"殻"],[194807,1,"𣪍"],[194808,1,"𡴋"],[194809,1,"𣫺"],[194810,1,"汎"],[194811,1,"𣲼"],[194812,1,"沿"],[194813,1,"泍"],[194814,1,"汧"],[194815,1,"洖"],[194816,1,"派"],[194817,1,"海"],[194818,1,"流"],[194819,1,"浩"],[194820,1,"浸"],[194821,1,"涅"],[194822,1,"𣴞"],[194823,1,"洴"],[194824,1,"港"],[194825,1,"湮"],[194826,1,"㴳"],[194827,1,"滋"],[194828,1,"滇"],[194829,1,"𣻑"],[194830,1,"淹"],[194831,1,"潮"],[194832,1,"𣽞"],[194833,1,"𣾎"],[194834,1,"濆"],[194835,1,"瀹"],[194836,1,"瀞"],[194837,1,"瀛"],[194838,1,"㶖"],[194839,1,"灊"],[194840,1,"災"],[194841,1,"灷"],[194842,1,"炭"],[194843,1,"𠔥"],[194844,1,"煅"],[194845,1,"𤉣"],[194846,1,"熜"],[194847,1,"𤎫"],[194848,1,"爨"],[194849,1,"爵"],[194850,1,"牐"],[194851,1,"𤘈"],[194852,1,"犀"],[194853,1,"犕"],[194854,1,"𤜵"],[194855,1,"𤠔"],[194856,1,"獺"],[194857,1,"王"],[194858,1,"㺬"],[194859,1,"玥"],[[194860,194861],1,"㺸"],[194862,1,"瑇"],[194863,1,"瑜"],[194864,1,"瑱"],[194865,1,"璅"],[194866,1,"瓊"],[194867,1,"㼛"],[194868,1,"甤"],[194869,1,"𤰶"],[194870,1,"甾"],[194871,1,"𤲒"],[194872,1,"異"],[194873,1,"𢆟"],[194874,1,"瘐"],[194875,1,"𤾡"],[194876,1,"𤾸"],[194877,1,"𥁄"],[194878,1,"㿼"],[194879,1,"䀈"],[194880,1,"直"],[194881,1,"𥃳"],[194882,1,"𥃲"],[194883,1,"𥄙"],[194884,1,"𥄳"],[194885,1,"眞"],[[194886,194887],1,"真"],[194888,1,"睊"],[194889,1,"䀹"],[194890,1,"瞋"],[194891,1,"䁆"],[194892,1,"䂖"],[194893,1,"𥐝"],[194894,1,"硎"],[194895,1,"碌"],[194896,1,"磌"],[194897,1,"䃣"],[194898,1,"𥘦"],[194899,1,"祖"],[194900,1,"𥚚"],[194901,1,"𥛅"],[194902,1,"福"],[194903,1,"秫"],[194904,1,"䄯"],[194905,1,"穀"],[194906,1,"穊"],[194907,1,"穏"],[194908,1,"𥥼"],[[194909,194910],1,"𥪧"],[194911,1,"竮"],[194912,1,"䈂"],[194913,1,"𥮫"],[194914,1,"篆"],[194915,1,"築"],[194916,1,"䈧"],[194917,1,"𥲀"],[194918,1,"糒"],[194919,1,"䊠"],[194920,1,"糨"],[194921,1,"糣"],[194922,1,"紀"],[194923,1,"𥾆"],[194924,1,"絣"],[194925,1,"䌁"],[194926,1,"緇"],[194927,1,"縂"],[194928,1,"繅"],[194929,1,"䌴"],[194930,1,"𦈨"],[194931,1,"𦉇"],[194932,1,"䍙"],[194933,1,"𦋙"],[194934,1,"罺"],[194935,1,"𦌾"],[194936,1,"羕"],[194937,1,"翺"],[194938,1,"者"],[194939,1,"𦓚"],[194940,1,"𦔣"],[194941,1,"聠"],[194942,1,"𦖨"],[194943,1,"聰"],[194944,1,"𣍟"],[194945,1,"䏕"],[194946,1,"育"],[194947,1,"脃"],[194948,1,"䐋"],[194949,1,"脾"],[194950,1,"媵"],[194951,1,"𦞧"],[194952,1,"𦞵"],[194953,1,"𣎓"],[194954,1,"𣎜"],[194955,1,"舁"],[194956,1,"舄"],[194957,1,"辞"],[194958,1,"䑫"],[194959,1,"芑"],[194960,1,"芋"],[194961,1,"芝"],[194962,1,"劳"],[194963,1,"花"],[194964,1,"芳"],[194965,1,"芽"],[194966,1,"苦"],[194967,1,"𦬼"],[194968,1,"若"],[194969,1,"茝"],[194970,1,"荣"],[194971,1,"莭"],[194972,1,"茣"],[194973,1,"莽"],[194974,1,"菧"],[194975,1,"著"],[194976,1,"荓"],[194977,1,"菊"],[194978,1,"菌"],[194979,1,"菜"],[194980,1,"𦰶"],[194981,1,"𦵫"],[194982,1,"𦳕"],[194983,1,"䔫"],[194984,1,"蓱"],[194985,1,"蓳"],[194986,1,"蔖"],[194987,1,"𧏊"],[194988,1,"蕤"],[194989,1,"𦼬"],[194990,1,"䕝"],[194991,1,"䕡"],[194992,1,"𦾱"],[194993,1,"𧃒"],[194994,1,"䕫"],[194995,1,"虐"],[194996,1,"虜"],[194997,1,"虧"],[194998,1,"虩"],[194999,1,"蚩"],[195000,1,"蚈"],[195001,1,"蜎"],[195002,1,"蛢"],[195003,1,"蝹"],[195004,1,"蜨"],[195005,1,"蝫"],[195006,1,"螆"],[195007,1,"䗗"],[195008,1,"蟡"],[195009,1,"蠁"],[195010,1,"䗹"],[195011,1,"衠"],[195012,1,"衣"],[195013,1,"𧙧"],[195014,1,"裗"],[195015,1,"裞"],[195016,1,"䘵"],[195017,1,"裺"],[195018,1,"㒻"],[195019,1,"𧢮"],[195020,1,"𧥦"],[195021,1,"䚾"],[195022,1,"䛇"],[195023,1,"誠"],[195024,1,"諭"],[195025,1,"變"],[195026,1,"豕"],[195027,1,"𧲨"],[195028,1,"貫"],[195029,1,"賁"],[195030,1,"贛"],[195031,1,"起"],[195032,1,"𧼯"],[195033,1,"𠠄"],[195034,1,"跋"],[195035,1,"趼"],[195036,1,"跰"],[195037,1,"𠣞"],[195038,1,"軔"],[195039,1,"輸"],[195040,1,"𨗒"],[195041,1,"𨗭"],[195042,1,"邔"],[195043,1,"郱"],[195044,1,"鄑"],[195045,1,"𨜮"],[195046,1,"鄛"],[195047,1,"鈸"],[195048,1,"鋗"],[195049,1,"鋘"],[195050,1,"鉼"],[195051,1,"鏹"],[195052,1,"鐕"],[195053,1,"𨯺"],[195054,1,"開"],[195055,1,"䦕"],[195056,1,"閷"],[195057,1,"𨵷"],[195058,1,"䧦"],[195059,1,"雃"],[195060,1,"嶲"],[195061,1,"霣"],[195062,1,"𩅅"],[195063,1,"𩈚"],[195064,1,"䩮"],[195065,1,"䩶"],[195066,1,"韠"],[195067,1,"𩐊"],[195068,1,"䪲"],[195069,1,"𩒖"],[[195070,195071],1,"頋"],[195072,1,"頩"],[195073,1,"𩖶"],[195074,1,"飢"],[195075,1,"䬳"],[195076,1,"餩"],[195077,1,"馧"],[195078,1,"駂"],[195079,1,"駾"],[195080,1,"䯎"],[195081,1,"𩬰"],[195082,1,"鬒"],[195083,1,"鱀"],[195084,1,"鳽"],[195085,1,"䳎"],[195086,1,"䳭"],[195087,1,"鵧"],[195088,1,"𪃎"],[195089,1,"䳸"],[195090,1,"𪄅"],[195091,1,"𪈎"],[195092,1,"𪊑"],[195093,1,"麻"],[195094,1,"䵖"],[195095,1,"黹"],[195096,1,"黾"],[195097,1,"鼅"],[195098,1,"鼏"],[195099,1,"鼖"],[195100,1,"鼻"],[195101,1,"𪘀"],[[195102,196605],3],[[196606,196607],3],[[196608,201546],2],[[201547,201551],3],[[201552,205743],2],[[205744,262141],3],[[262142,262143],3],[[262144,327677],3],[[327678,327679],3],[[327680,393213],3],[[393214,393215],3],[[393216,458749],3],[[458750,458751],3],[[458752,524285],3],[[524286,524287],3],[[524288,589821],3],[[589822,589823],3],[[589824,655357],3],[[655358,655359],3],[[655360,720893],3],[[720894,720895],3],[[720896,786429],3],[[786430,786431],3],[[786432,851965],3],[[851966,851967],3],[[851968,917501],3],[[917502,917503],3],[917504,3],[917505,3],[[917506,917535],3],[[917536,917631],3],[[917632,917759],3],[[917760,917999],7],[[918000,983037],3],[[983038,983039],3],[[983040,1048573],3],[[1048574,1048575],3],[[1048576,1114109],3],[[1114110,1114111],3]]');

/***/ }),

/***/ 484:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const tr46 = __webpack_require__(673);

const infra = __webpack_require__(167);
const { utf8DecodeWithoutBOM } = __webpack_require__(408);
const { percentDecodeString, utf8PercentEncodeCodePoint, utf8PercentEncodeString, isC0ControlPercentEncode,
  isFragmentPercentEncode, isQueryPercentEncode, isSpecialQueryPercentEncode, isPathPercentEncode,
  isUserinfoPercentEncode } = __webpack_require__(656);

function p(char) {
  return char.codePointAt(0);
}

const specialSchemes = {
  ftp: 21,
  file: null,
  http: 80,
  https: 443,
  ws: 80,
  wss: 443
};

const failure = Symbol("failure");

function countSymbols(str) {
  return [...str].length;
}

function at(input, idx) {
  const c = input[idx];
  return isNaN(c) ? undefined : String.fromCodePoint(c);
}

function isSingleDot(buffer) {
  return buffer === "." || buffer.toLowerCase() === "%2e";
}

function isDoubleDot(buffer) {
  buffer = buffer.toLowerCase();
  return buffer === ".." || buffer === "%2e." || buffer === ".%2e" || buffer === "%2e%2e";
}

function isWindowsDriveLetterCodePoints(cp1, cp2) {
  return infra.isASCIIAlpha(cp1) && (cp2 === p(":") || cp2 === p("|"));
}

function isWindowsDriveLetterString(string) {
  return string.length === 2 && infra.isASCIIAlpha(string.codePointAt(0)) && (string[1] === ":" || string[1] === "|");
}

function isNormalizedWindowsDriveLetterString(string) {
  return string.length === 2 && infra.isASCIIAlpha(string.codePointAt(0)) && string[1] === ":";
}

function containsForbiddenHostCodePoint(string) {
  return string.search(/\u0000|\u0009|\u000A|\u000D|\u0020|#|\/|:|<|>|\?|@|\[|\\|\]|\^|\|/u) !== -1;
}

function containsForbiddenDomainCodePoint(string) {
  return containsForbiddenHostCodePoint(string) || string.search(/[\u0000-\u001F]|%|\u007F/u) !== -1;
}

function isSpecialScheme(scheme) {
  return specialSchemes[scheme] !== undefined;
}

function isSpecial(url) {
  return isSpecialScheme(url.scheme);
}

function isNotSpecial(url) {
  return !isSpecialScheme(url.scheme);
}

function defaultPort(scheme) {
  return specialSchemes[scheme];
}

function parseIPv4Number(input) {
  if (input === "") {
    return failure;
  }

  let R = 10;

  if (input.length >= 2 && input.charAt(0) === "0" && input.charAt(1).toLowerCase() === "x") {
    input = input.substring(2);
    R = 16;
  } else if (input.length >= 2 && input.charAt(0) === "0") {
    input = input.substring(1);
    R = 8;
  }

  if (input === "") {
    return 0;
  }

  let regex = /[^0-7]/u;
  if (R === 10) {
    regex = /[^0-9]/u;
  }
  if (R === 16) {
    regex = /[^0-9A-Fa-f]/u;
  }

  if (regex.test(input)) {
    return failure;
  }

  return parseInt(input, R);
}

function parseIPv4(input) {
  const parts = input.split(".");
  if (parts[parts.length - 1] === "") {
    if (parts.length > 1) {
      parts.pop();
    }
  }

  if (parts.length > 4) {
    return failure;
  }

  const numbers = [];
  for (const part of parts) {
    const n = parseIPv4Number(part);
    if (n === failure) {
      return failure;
    }

    numbers.push(n);
  }

  for (let i = 0; i < numbers.length - 1; ++i) {
    if (numbers[i] > 255) {
      return failure;
    }
  }
  if (numbers[numbers.length - 1] >= 256 ** (5 - numbers.length)) {
    return failure;
  }

  let ipv4 = numbers.pop();
  let counter = 0;

  for (const n of numbers) {
    ipv4 += n * 256 ** (3 - counter);
    ++counter;
  }

  return ipv4;
}

function serializeIPv4(address) {
  let output = "";
  let n = address;

  for (let i = 1; i <= 4; ++i) {
    output = String(n % 256) + output;
    if (i !== 4) {
      output = `.${output}`;
    }
    n = Math.floor(n / 256);
  }

  return output;
}

function parseIPv6(input) {
  const address = [0, 0, 0, 0, 0, 0, 0, 0];
  let pieceIndex = 0;
  let compress = null;
  let pointer = 0;

  input = Array.from(input, c => c.codePointAt(0));

  if (input[pointer] === p(":")) {
    if (input[pointer + 1] !== p(":")) {
      return failure;
    }

    pointer += 2;
    ++pieceIndex;
    compress = pieceIndex;
  }

  while (pointer < input.length) {
    if (pieceIndex === 8) {
      return failure;
    }

    if (input[pointer] === p(":")) {
      if (compress !== null) {
        return failure;
      }
      ++pointer;
      ++pieceIndex;
      compress = pieceIndex;
      continue;
    }

    let value = 0;
    let length = 0;

    while (length < 4 && infra.isASCIIHex(input[pointer])) {
      value = value * 0x10 + parseInt(at(input, pointer), 16);
      ++pointer;
      ++length;
    }

    if (input[pointer] === p(".")) {
      if (length === 0) {
        return failure;
      }

      pointer -= length;

      if (pieceIndex > 6) {
        return failure;
      }

      let numbersSeen = 0;

      while (input[pointer] !== undefined) {
        let ipv4Piece = null;

        if (numbersSeen > 0) {
          if (input[pointer] === p(".") && numbersSeen < 4) {
            ++pointer;
          } else {
            return failure;
          }
        }

        if (!infra.isASCIIDigit(input[pointer])) {
          return failure;
        }

        while (infra.isASCIIDigit(input[pointer])) {
          const number = parseInt(at(input, pointer));
          if (ipv4Piece === null) {
            ipv4Piece = number;
          } else if (ipv4Piece === 0) {
            return failure;
          } else {
            ipv4Piece = ipv4Piece * 10 + number;
          }
          if (ipv4Piece > 255) {
            return failure;
          }
          ++pointer;
        }

        address[pieceIndex] = address[pieceIndex] * 0x100 + ipv4Piece;

        ++numbersSeen;

        if (numbersSeen === 2 || numbersSeen === 4) {
          ++pieceIndex;
        }
      }

      if (numbersSeen !== 4) {
        return failure;
      }

      break;
    } else if (input[pointer] === p(":")) {
      ++pointer;
      if (input[pointer] === undefined) {
        return failure;
      }
    } else if (input[pointer] !== undefined) {
      return failure;
    }

    address[pieceIndex] = value;
    ++pieceIndex;
  }

  if (compress !== null) {
    let swaps = pieceIndex - compress;
    pieceIndex = 7;
    while (pieceIndex !== 0 && swaps > 0) {
      const temp = address[compress + swaps - 1];
      address[compress + swaps - 1] = address[pieceIndex];
      address[pieceIndex] = temp;
      --pieceIndex;
      --swaps;
    }
  } else if (compress === null && pieceIndex !== 8) {
    return failure;
  }

  return address;
}

function serializeIPv6(address) {
  let output = "";
  const compress = findTheIPv6AddressCompressedPieceIndex(address);
  let ignore0 = false;

  for (let pieceIndex = 0; pieceIndex <= 7; ++pieceIndex) {
    if (ignore0 && address[pieceIndex] === 0) {
      continue;
    } else if (ignore0) {
      ignore0 = false;
    }

    if (compress === pieceIndex) {
      const separator = pieceIndex === 0 ? "::" : ":";
      output += separator;
      ignore0 = true;
      continue;
    }

    output += address[pieceIndex].toString(16);

    if (pieceIndex !== 7) {
      output += ":";
    }
  }

  return output;
}

function parseHost(input, isOpaque = false) {
  if (input[0] === "[") {
    if (input[input.length - 1] !== "]") {
      return failure;
    }

    return parseIPv6(input.substring(1, input.length - 1));
  }

  if (isOpaque) {
    return parseOpaqueHost(input);
  }

  const domain = utf8DecodeWithoutBOM(percentDecodeString(input));
  const asciiDomain = domainToASCII(domain);
  if (asciiDomain === failure) {
    return failure;
  }

  if (endsInANumber(asciiDomain)) {
    return parseIPv4(asciiDomain);
  }

  return asciiDomain;
}

function endsInANumber(input) {
  const parts = input.split(".");
  if (parts[parts.length - 1] === "") {
    if (parts.length === 1) {
      return false;
    }
    parts.pop();
  }

  const last = parts[parts.length - 1];
  if (parseIPv4Number(last) !== failure) {
    return true;
  }

  if (/^[0-9]+$/u.test(last)) {
    return true;
  }

  return false;
}

function parseOpaqueHost(input) {
  if (containsForbiddenHostCodePoint(input)) {
    return failure;
  }

  return utf8PercentEncodeString(input, isC0ControlPercentEncode);
}

function findTheIPv6AddressCompressedPieceIndex(address) {
  let longestIndex = null;
  let longestSize = 1; // only find elements > 1
  let foundIndex = null;
  let foundSize = 0;

  for (let pieceIndex = 0; pieceIndex < address.length; ++pieceIndex) {
    if (address[pieceIndex] !== 0) {
      if (foundSize > longestSize) {
        longestIndex = foundIndex;
        longestSize = foundSize;
      }

      foundIndex = null;
      foundSize = 0;
    } else {
      if (foundIndex === null) {
        foundIndex = pieceIndex;
      }
      ++foundSize;
    }
  }

  if (foundSize > longestSize) {
    return foundIndex;
  }

  return longestIndex;
}

function serializeHost(host) {
  if (typeof host === "number") {
    return serializeIPv4(host);
  }

  // IPv6 serializer
  if (host instanceof Array) {
    return `[${serializeIPv6(host)}]`;
  }

  return host;
}

function domainToASCII(domain, beStrict = false) {
  const result = tr46.toASCII(domain, {
    checkHyphens: beStrict,
    checkBidi: true,
    checkJoiners: true,
    useSTD3ASCIIRules: beStrict,
    transitionalProcessing: false,
    verifyDNSLength: beStrict,
    ignoreInvalidPunycode: false
  });
  if (result === null) {
    return failure;
  }

  if (!beStrict) {
    if (result === "") {
      return failure;
    }
    if (containsForbiddenDomainCodePoint(result)) {
      return failure;
    }
  }
  return result;
}

function trimControlChars(string) {
  // Avoid using regexp because of this V8 bug: https://issues.chromium.org/issues/42204424

  let start = 0;
  let end = string.length;
  for (; start < end; ++start) {
    if (string.charCodeAt(start) > 0x20) {
      break;
    }
  }
  for (; end > start; --end) {
    if (string.charCodeAt(end - 1) > 0x20) {
      break;
    }
  }
  return string.substring(start, end);
}

function trimTabAndNewline(url) {
  return url.replace(/\u0009|\u000A|\u000D/ug, "");
}

function shortenPath(url) {
  const { path } = url;
  if (path.length === 0) {
    return;
  }
  if (url.scheme === "file" && path.length === 1 && isNormalizedWindowsDriveLetter(path[0])) {
    return;
  }

  path.pop();
}

function includesCredentials(url) {
  return url.username !== "" || url.password !== "";
}

function cannotHaveAUsernamePasswordPort(url) {
  return url.host === null || url.host === "" || url.scheme === "file";
}

function hasAnOpaquePath(url) {
  return typeof url.path === "string";
}

function isNormalizedWindowsDriveLetter(string) {
  return /^[A-Za-z]:$/u.test(string);
}

function URLStateMachine(input, base, encodingOverride, url, stateOverride) {
  this.pointer = 0;
  this.input = input;
  this.base = base || null;
  this.encodingOverride = encodingOverride || "utf-8";
  this.stateOverride = stateOverride;
  this.url = url;
  this.failure = false;
  this.parseError = false;

  if (!this.url) {
    this.url = {
      scheme: "",
      username: "",
      password: "",
      host: null,
      port: null,
      path: [],
      query: null,
      fragment: null
    };

    const res = trimControlChars(this.input);
    if (res !== this.input) {
      this.parseError = true;
    }
    this.input = res;
  }

  const res = trimTabAndNewline(this.input);
  if (res !== this.input) {
    this.parseError = true;
  }
  this.input = res;

  this.state = stateOverride || "scheme start";

  this.buffer = "";
  this.atFlag = false;
  this.arrFlag = false;
  this.passwordTokenSeenFlag = false;

  this.input = Array.from(this.input, c => c.codePointAt(0));

  for (; this.pointer <= this.input.length; ++this.pointer) {
    const c = this.input[this.pointer];
    const cStr = isNaN(c) ? undefined : String.fromCodePoint(c);

    // exec state machine
    const ret = this[`parse ${this.state}`](c, cStr);
    if (!ret) {
      break; // terminate algorithm
    } else if (ret === failure) {
      this.failure = true;
      break;
    }
  }
}

URLStateMachine.prototype["parse scheme start"] = function parseSchemeStart(c, cStr) {
  if (infra.isASCIIAlpha(c)) {
    this.buffer += cStr.toLowerCase();
    this.state = "scheme";
  } else if (!this.stateOverride) {
    this.state = "no scheme";
    --this.pointer;
  } else {
    this.parseError = true;
    return failure;
  }

  return true;
};

URLStateMachine.prototype["parse scheme"] = function parseScheme(c, cStr) {
  if (infra.isASCIIAlphanumeric(c) || c === p("+") || c === p("-") || c === p(".")) {
    this.buffer += cStr.toLowerCase();
  } else if (c === p(":")) {
    if (this.stateOverride) {
      if (isSpecial(this.url) && !isSpecialScheme(this.buffer)) {
        return false;
      }

      if (!isSpecial(this.url) && isSpecialScheme(this.buffer)) {
        return false;
      }

      if ((includesCredentials(this.url) || this.url.port !== null) && this.buffer === "file") {
        return false;
      }

      if (this.url.scheme === "file" && this.url.host === "") {
        return false;
      }
    }
    this.url.scheme = this.buffer;
    if (this.stateOverride) {
      if (this.url.port === defaultPort(this.url.scheme)) {
        this.url.port = null;
      }
      return false;
    }
    this.buffer = "";
    if (this.url.scheme === "file") {
      if (this.input[this.pointer + 1] !== p("/") || this.input[this.pointer + 2] !== p("/")) {
        this.parseError = true;
      }
      this.state = "file";
    } else if (isSpecial(this.url) && this.base !== null && this.base.scheme === this.url.scheme) {
      this.state = "special relative or authority";
    } else if (isSpecial(this.url)) {
      this.state = "special authority slashes";
    } else if (this.input[this.pointer + 1] === p("/")) {
      this.state = "path or authority";
      ++this.pointer;
    } else {
      this.url.path = "";
      this.state = "opaque path";
    }
  } else if (!this.stateOverride) {
    this.buffer = "";
    this.state = "no scheme";
    this.pointer = -1;
  } else {
    this.parseError = true;
    return failure;
  }

  return true;
};

URLStateMachine.prototype["parse no scheme"] = function parseNoScheme(c) {
  if (this.base === null || (hasAnOpaquePath(this.base) && c !== p("#"))) {
    return failure;
  } else if (hasAnOpaquePath(this.base) && c === p("#")) {
    this.url.scheme = this.base.scheme;
    this.url.path = this.base.path;
    this.url.query = this.base.query;
    this.url.fragment = "";
    this.state = "fragment";
  } else if (this.base.scheme === "file") {
    this.state = "file";
    --this.pointer;
  } else {
    this.state = "relative";
    --this.pointer;
  }

  return true;
};

URLStateMachine.prototype["parse special relative or authority"] = function parseSpecialRelativeOrAuthority(c) {
  if (c === p("/") && this.input[this.pointer + 1] === p("/")) {
    this.state = "special authority ignore slashes";
    ++this.pointer;
  } else {
    this.parseError = true;
    this.state = "relative";
    --this.pointer;
  }

  return true;
};

URLStateMachine.prototype["parse path or authority"] = function parsePathOrAuthority(c) {
  if (c === p("/")) {
    this.state = "authority";
  } else {
    this.state = "path";
    --this.pointer;
  }

  return true;
};

URLStateMachine.prototype["parse relative"] = function parseRelative(c) {
  this.url.scheme = this.base.scheme;
  if (c === p("/")) {
    this.state = "relative slash";
  } else if (isSpecial(this.url) && c === p("\\")) {
    this.parseError = true;
    this.state = "relative slash";
  } else {
    this.url.username = this.base.username;
    this.url.password = this.base.password;
    this.url.host = this.base.host;
    this.url.port = this.base.port;
    this.url.path = this.base.path.slice();
    this.url.query = this.base.query;
    if (c === p("?")) {
      this.url.query = "";
      this.state = "query";
    } else if (c === p("#")) {
      this.url.fragment = "";
      this.state = "fragment";
    } else if (!isNaN(c)) {
      this.url.query = null;
      this.url.path.pop();
      this.state = "path";
      --this.pointer;
    }
  }

  return true;
};

URLStateMachine.prototype["parse relative slash"] = function parseRelativeSlash(c) {
  if (isSpecial(this.url) && (c === p("/") || c === p("\\"))) {
    if (c === p("\\")) {
      this.parseError = true;
    }
    this.state = "special authority ignore slashes";
  } else if (c === p("/")) {
    this.state = "authority";
  } else {
    this.url.username = this.base.username;
    this.url.password = this.base.password;
    this.url.host = this.base.host;
    this.url.port = this.base.port;
    this.state = "path";
    --this.pointer;
  }

  return true;
};

URLStateMachine.prototype["parse special authority slashes"] = function parseSpecialAuthoritySlashes(c) {
  if (c === p("/") && this.input[this.pointer + 1] === p("/")) {
    this.state = "special authority ignore slashes";
    ++this.pointer;
  } else {
    this.parseError = true;
    this.state = "special authority ignore slashes";
    --this.pointer;
  }

  return true;
};

URLStateMachine.prototype["parse special authority ignore slashes"] = function parseSpecialAuthorityIgnoreSlashes(c) {
  if (c !== p("/") && c !== p("\\")) {
    this.state = "authority";
    --this.pointer;
  } else {
    this.parseError = true;
  }

  return true;
};

URLStateMachine.prototype["parse authority"] = function parseAuthority(c, cStr) {
  if (c === p("@")) {
    this.parseError = true;
    if (this.atFlag) {
      this.buffer = `%40${this.buffer}`;
    }
    this.atFlag = true;

    // careful, this is based on buffer and has its own pointer (this.pointer != pointer) and inner chars
    const len = countSymbols(this.buffer);
    for (let pointer = 0; pointer < len; ++pointer) {
      const codePoint = this.buffer.codePointAt(pointer);

      if (codePoint === p(":") && !this.passwordTokenSeenFlag) {
        this.passwordTokenSeenFlag = true;
        continue;
      }
      const encodedCodePoints = utf8PercentEncodeCodePoint(codePoint, isUserinfoPercentEncode);
      if (this.passwordTokenSeenFlag) {
        this.url.password += encodedCodePoints;
      } else {
        this.url.username += encodedCodePoints;
      }
    }
    this.buffer = "";
  } else if (isNaN(c) || c === p("/") || c === p("?") || c === p("#") ||
             (isSpecial(this.url) && c === p("\\"))) {
    if (this.atFlag && this.buffer === "") {
      this.parseError = true;
      return failure;
    }
    this.pointer -= countSymbols(this.buffer) + 1;
    this.buffer = "";
    this.state = "host";
  } else {
    this.buffer += cStr;
  }

  return true;
};

URLStateMachine.prototype["parse hostname"] =
URLStateMachine.prototype["parse host"] = function parseHostName(c, cStr) {
  if (this.stateOverride && this.url.scheme === "file") {
    --this.pointer;
    this.state = "file host";
  } else if (c === p(":") && !this.arrFlag) {
    if (this.buffer === "") {
      this.parseError = true;
      return failure;
    }

    if (this.stateOverride === "hostname") {
      return false;
    }

    const host = parseHost(this.buffer, isNotSpecial(this.url));
    if (host === failure) {
      return failure;
    }

    this.url.host = host;
    this.buffer = "";
    this.state = "port";
  } else if (isNaN(c) || c === p("/") || c === p("?") || c === p("#") ||
             (isSpecial(this.url) && c === p("\\"))) {
    --this.pointer;
    if (isSpecial(this.url) && this.buffer === "") {
      this.parseError = true;
      return failure;
    } else if (this.stateOverride && this.buffer === "" &&
               (includesCredentials(this.url) || this.url.port !== null)) {
      this.parseError = true;
      return false;
    }

    const host = parseHost(this.buffer, isNotSpecial(this.url));
    if (host === failure) {
      return failure;
    }

    this.url.host = host;
    this.buffer = "";
    this.state = "path start";
    if (this.stateOverride) {
      return false;
    }
  } else {
    if (c === p("[")) {
      this.arrFlag = true;
    } else if (c === p("]")) {
      this.arrFlag = false;
    }
    this.buffer += cStr;
  }

  return true;
};

URLStateMachine.prototype["parse port"] = function parsePort(c, cStr) {
  if (infra.isASCIIDigit(c)) {
    this.buffer += cStr;
  } else if (isNaN(c) || c === p("/") || c === p("?") || c === p("#") ||
             (isSpecial(this.url) && c === p("\\")) ||
             this.stateOverride) {
    if (this.buffer !== "") {
      const port = parseInt(this.buffer);
      if (port > 2 ** 16 - 1) {
        this.parseError = true;
        return failure;
      }
      this.url.port = port === defaultPort(this.url.scheme) ? null : port;
      this.buffer = "";
    }
    if (this.stateOverride) {
      return false;
    }
    this.state = "path start";
    --this.pointer;
  } else {
    this.parseError = true;
    return failure;
  }

  return true;
};

const fileOtherwiseCodePoints = new Set([p("/"), p("\\"), p("?"), p("#")]);

function startsWithWindowsDriveLetter(input, pointer) {
  const length = input.length - pointer;
  return length >= 2 &&
    isWindowsDriveLetterCodePoints(input[pointer], input[pointer + 1]) &&
    (length === 2 || fileOtherwiseCodePoints.has(input[pointer + 2]));
}

URLStateMachine.prototype["parse file"] = function parseFile(c) {
  this.url.scheme = "file";
  this.url.host = "";

  if (c === p("/") || c === p("\\")) {
    if (c === p("\\")) {
      this.parseError = true;
    }
    this.state = "file slash";
  } else if (this.base !== null && this.base.scheme === "file") {
    this.url.host = this.base.host;
    this.url.path = this.base.path.slice();
    this.url.query = this.base.query;
    if (c === p("?")) {
      this.url.query = "";
      this.state = "query";
    } else if (c === p("#")) {
      this.url.fragment = "";
      this.state = "fragment";
    } else if (!isNaN(c)) {
      this.url.query = null;
      if (!startsWithWindowsDriveLetter(this.input, this.pointer)) {
        shortenPath(this.url);
      } else {
        this.parseError = true;
        this.url.path = [];
      }

      this.state = "path";
      --this.pointer;
    }
  } else {
    this.state = "path";
    --this.pointer;
  }

  return true;
};

URLStateMachine.prototype["parse file slash"] = function parseFileSlash(c) {
  if (c === p("/") || c === p("\\")) {
    if (c === p("\\")) {
      this.parseError = true;
    }
    this.state = "file host";
  } else {
    if (this.base !== null && this.base.scheme === "file") {
      if (!startsWithWindowsDriveLetter(this.input, this.pointer) &&
          isNormalizedWindowsDriveLetterString(this.base.path[0])) {
        this.url.path.push(this.base.path[0]);
      }
      this.url.host = this.base.host;
    }
    this.state = "path";
    --this.pointer;
  }

  return true;
};

URLStateMachine.prototype["parse file host"] = function parseFileHost(c, cStr) {
  if (isNaN(c) || c === p("/") || c === p("\\") || c === p("?") || c === p("#")) {
    --this.pointer;
    if (!this.stateOverride && isWindowsDriveLetterString(this.buffer)) {
      this.parseError = true;
      this.state = "path";
    } else if (this.buffer === "") {
      this.url.host = "";
      if (this.stateOverride) {
        return false;
      }
      this.state = "path start";
    } else {
      let host = parseHost(this.buffer, isNotSpecial(this.url));
      if (host === failure) {
        return failure;
      }
      if (host === "localhost") {
        host = "";
      }
      this.url.host = host;

      if (this.stateOverride) {
        return false;
      }

      this.buffer = "";
      this.state = "path start";
    }
  } else {
    this.buffer += cStr;
  }

  return true;
};

URLStateMachine.prototype["parse path start"] = function parsePathStart(c) {
  if (isSpecial(this.url)) {
    if (c === p("\\")) {
      this.parseError = true;
    }
    this.state = "path";

    if (c !== p("/") && c !== p("\\")) {
      --this.pointer;
    }
  } else if (!this.stateOverride && c === p("?")) {
    this.url.query = "";
    this.state = "query";
  } else if (!this.stateOverride && c === p("#")) {
    this.url.fragment = "";
    this.state = "fragment";
  } else if (c !== undefined) {
    this.state = "path";
    if (c !== p("/")) {
      --this.pointer;
    }
  } else if (this.stateOverride && this.url.host === null) {
    this.url.path.push("");
  }

  return true;
};

URLStateMachine.prototype["parse path"] = function parsePath(c) {
  if (isNaN(c) || c === p("/") || (isSpecial(this.url) && c === p("\\")) ||
      (!this.stateOverride && (c === p("?") || c === p("#")))) {
    if (isSpecial(this.url) && c === p("\\")) {
      this.parseError = true;
    }

    if (isDoubleDot(this.buffer)) {
      shortenPath(this.url);
      if (c !== p("/") && !(isSpecial(this.url) && c === p("\\"))) {
        this.url.path.push("");
      }
    } else if (isSingleDot(this.buffer) && c !== p("/") &&
               !(isSpecial(this.url) && c === p("\\"))) {
      this.url.path.push("");
    } else if (!isSingleDot(this.buffer)) {
      if (this.url.scheme === "file" && this.url.path.length === 0 && isWindowsDriveLetterString(this.buffer)) {
        this.buffer = `${this.buffer[0]}:`;
      }
      this.url.path.push(this.buffer);
    }
    this.buffer = "";
    if (c === p("?")) {
      this.url.query = "";
      this.state = "query";
    }
    if (c === p("#")) {
      this.url.fragment = "";
      this.state = "fragment";
    }
  } else {
    // TODO: If c is not a URL code point and not "%", parse error.

    if (c === p("%") &&
      (!infra.isASCIIHex(this.input[this.pointer + 1]) ||
        !infra.isASCIIHex(this.input[this.pointer + 2]))) {
      this.parseError = true;
    }

    this.buffer += utf8PercentEncodeCodePoint(c, isPathPercentEncode);
  }

  return true;
};

URLStateMachine.prototype["parse opaque path"] = function parseOpaquePath(c) {
  if (c === p("?")) {
    this.url.query = "";
    this.state = "query";
  } else if (c === p("#")) {
    this.url.fragment = "";
    this.state = "fragment";
  } else if (c === p(" ")) {
    const remaining = this.input[this.pointer + 1];
    if (remaining === p("?") || remaining === p("#")) {
      this.url.path += "%20";
    } else {
      this.url.path += " ";
    }
  } else {
    // TODO: Add: not a URL code point
    if (!isNaN(c) && c !== p("%")) {
      this.parseError = true;
    }

    if (c === p("%") &&
        (!infra.isASCIIHex(this.input[this.pointer + 1]) ||
         !infra.isASCIIHex(this.input[this.pointer + 2]))) {
      this.parseError = true;
    }

    if (!isNaN(c)) {
      this.url.path += utf8PercentEncodeCodePoint(c, isC0ControlPercentEncode);
    }
  }

  return true;
};

URLStateMachine.prototype["parse query"] = function parseQuery(c, cStr) {
  if (!isSpecial(this.url) || this.url.scheme === "ws" || this.url.scheme === "wss") {
    this.encodingOverride = "utf-8";
  }

  if ((!this.stateOverride && c === p("#")) || isNaN(c)) {
    const queryPercentEncodePredicate = isSpecial(this.url) ? isSpecialQueryPercentEncode : isQueryPercentEncode;
    this.url.query += utf8PercentEncodeString(this.buffer, queryPercentEncodePredicate);

    this.buffer = "";

    if (c === p("#")) {
      this.url.fragment = "";
      this.state = "fragment";
    }
  } else if (!isNaN(c)) {
    // TODO: If c is not a URL code point and not "%", parse error.

    if (c === p("%") &&
      (!infra.isASCIIHex(this.input[this.pointer + 1]) ||
        !infra.isASCIIHex(this.input[this.pointer + 2]))) {
      this.parseError = true;
    }

    this.buffer += cStr;
  }

  return true;
};

URLStateMachine.prototype["parse fragment"] = function parseFragment(c) {
  if (!isNaN(c)) {
    // TODO: If c is not a URL code point and not "%", parse error.
    if (c === p("%") &&
      (!infra.isASCIIHex(this.input[this.pointer + 1]) ||
        !infra.isASCIIHex(this.input[this.pointer + 2]))) {
      this.parseError = true;
    }

    this.url.fragment += utf8PercentEncodeCodePoint(c, isFragmentPercentEncode);
  }

  return true;
};

function serializeURL(url, excludeFragment) {
  let output = `${url.scheme}:`;
  if (url.host !== null) {
    output += "//";

    if (url.username !== "" || url.password !== "") {
      output += url.username;
      if (url.password !== "") {
        output += `:${url.password}`;
      }
      output += "@";
    }

    output += serializeHost(url.host);

    if (url.port !== null) {
      output += `:${url.port}`;
    }
  }

  if (url.host === null && !hasAnOpaquePath(url) && url.path.length > 1 && url.path[0] === "") {
    output += "/.";
  }
  output += serializePath(url);

  if (url.query !== null) {
    output += `?${url.query}`;
  }

  if (!excludeFragment && url.fragment !== null) {
    output += `#${url.fragment}`;
  }

  return output;
}

function serializeOrigin(tuple) {
  let result = `${tuple.scheme}://`;
  result += serializeHost(tuple.host);

  if (tuple.port !== null) {
    result += `:${tuple.port}`;
  }

  return result;
}

function serializePath(url) {
  if (hasAnOpaquePath(url)) {
    return url.path;
  }

  let output = "";
  for (const segment of url.path) {
    output += `/${segment}`;
  }
  return output;
}

module.exports.serializeURL = serializeURL;

module.exports.serializePath = serializePath;

module.exports.serializeURLOrigin = function (url) {
  // https://url.spec.whatwg.org/#concept-url-origin
  switch (url.scheme) {
    case "blob": {
      const pathURL = module.exports.parseURL(serializePath(url));
      if (pathURL === null) {
        return "null";
      }
      if (pathURL.scheme !== "http" && pathURL.scheme !== "https") {
        return "null";
      }
      return module.exports.serializeURLOrigin(pathURL);
    }
    case "ftp":
    case "http":
    case "https":
    case "ws":
    case "wss":
      return serializeOrigin({
        scheme: url.scheme,
        host: url.host,
        port: url.port
      });
    case "file":
      // The spec says:
      // > Unfortunate as it is, this is left as an exercise to the reader. When in doubt, return a new opaque origin.
      // Browsers tested so far:
      // - Chrome says "file://", but treats file: URLs as cross-origin for most (all?) purposes; see e.g.
      //   https://bugs.chromium.org/p/chromium/issues/detail?id=37586
      // - Firefox says "null", but treats file: URLs as same-origin sometimes based on directory stuff; see
      //   https://developer.mozilla.org/en-US/docs/Archive/Misc_top_level/Same-origin_policy_for_file:_URIs
      return "null";
    default:
      // serializing an opaque origin returns "null"
      return "null";
  }
};

module.exports.basicURLParse = function (input, options) {
  if (options === undefined) {
    options = {};
  }

  const usm = new URLStateMachine(input, options.baseURL, options.encodingOverride, options.url, options.stateOverride);
  if (usm.failure) {
    return null;
  }

  return usm.url;
};

module.exports.setTheUsername = function (url, username) {
  url.username = utf8PercentEncodeString(username, isUserinfoPercentEncode);
};

module.exports.setThePassword = function (url, password) {
  url.password = utf8PercentEncodeString(password, isUserinfoPercentEncode);
};

module.exports.serializeHost = serializeHost;

module.exports.cannotHaveAUsernamePasswordPort = cannotHaveAUsernamePasswordPort;

module.exports.hasAnOpaquePath = hasAnOpaquePath;

module.exports.serializeInteger = function (integer) {
  return String(integer);
};

module.exports.parseURL = function (input, options) {
  if (options === undefined) {
    options = {};
  }

  // We don't handle blobs, so this just delegates:
  return module.exports.basicURLParse(input, { baseURL: options.baseURL, encodingOverride: options.encodingOverride });
};


/***/ }),

/***/ 501:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FormData = void 0;
class FormData {
    constructor(form) {
        this._entries = [];
        if (form) {
            this.initializeFromForm(form);
        }
    }
    initializeFromForm(form) {
        if (!form || !form.elements) {
            return;
        }
        for (let i = 0; i < form.elements.length; i++) {
            const element = form.elements[i];
            if (!element.name || element.disabled) {
                continue;
            }
            if (element.type === 'file') {
                if (element.files) {
                    for (let j = 0; j < element.files.length; j++) {
                        this.append(element.name, element.files[j]);
                    }
                }
            }
            else if (element.multiple && element.selectedOptions) {
                for (let j = 0; j < element.selectedOptions.length; j++) {
                    this.append(element.name, element.selectedOptions[j].value);
                }
            }
            else if ((element.type !== 'checkbox' && element.type !== 'radio') ||
                element.checked) {
                this.append(element.name, element.value);
            }
        }
    }
    append(name, value, filename) {
        this.validateName(name);
        let processedValue;
        if (isBlobLike(value)) {
            // In environments without File, we ignore filename and store the Blob as-is
            processedValue = value;
        }
        else {
            processedValue = String(value);
        }
        this._entries.push({ name, value: processedValue });
    }
    delete(name) {
        this.validateName(name);
        this._entries = this._entries.filter(entry => entry.name !== name);
    }
    get(name) {
        this.validateName(name);
        const entry = this._entries.find(entry => entry.name === name);
        return entry ? entry.value : null;
    }
    getAll(name) {
        this.validateName(name);
        return this._entries
            .filter(entry => entry.name === name)
            .map(entry => entry.value);
    }
    has(name) {
        this.validateName(name);
        return this._entries.some(entry => entry.name === name);
    }
    set(name, value, filename) {
        this.validateName(name);
        // Remove all existing entries with this name
        this.delete(name);
        // Add the new entry
        this.append(name, value, filename);
    }
    *entries() {
        for (const entry of this._entries) {
            yield [entry.name, entry.value];
        }
    }
    forEach(callback, thisArg) {
        for (const entry of this._entries) {
            callback.call(thisArg, entry.value, entry.name, this);
        }
    }
    *keys() {
        for (const entry of this._entries) {
            yield entry.name;
        }
    }
    *values() {
        for (const entry of this._entries) {
            yield entry.value;
        }
    }
    [Symbol.iterator]() {
        return this.entries();
    }
    validateName(name) {
        if (typeof name !== 'string') {
            throw new TypeError('FormData name must be a string');
        }
    }
}
exports.FormData = FormData;
function isBlobLike(value) {
    if (!value || typeof value !== 'object')
        return false;
    // Prefer native check when available
    if (typeof Blob !== 'undefined' && value instanceof Blob)
        return true;
    // Fallback: duck-typing for environments without native Blob detection
    const hasArrayBuffer = typeof value.arrayBuffer === 'function';
    const hasType = typeof value.type === 'string';
    const hasSize = typeof value.size === 'number';
    return hasArrayBuffer && hasType && hasSize;
}
// Install the polyfill globally
if (typeof globalThis !== 'undefined') {
    globalThis.FormData = FormData;
}


/***/ }),

/***/ 549:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

const urlencoded = __webpack_require__(252);

exports.implementation = class URLSearchParamsImpl {
  constructor(globalObject, constructorArgs, { doNotStripQMark = false }) {
    let init = constructorArgs[0];
    this._list = [];
    this._url = null;

    if (!doNotStripQMark && typeof init === "string" && init[0] === "?") {
      init = init.slice(1);
    }

    if (Array.isArray(init)) {
      for (const pair of init) {
        if (pair.length !== 2) {
          throw new TypeError("Failed to construct 'URLSearchParams': parameter 1 sequence's element does not " +
                              "contain exactly two elements.");
        }
        this._list.push([pair[0], pair[1]]);
      }
    } else if (typeof init === "object" && Object.getPrototypeOf(init) === null) {
      for (const name of Object.keys(init)) {
        const value = init[name];
        this._list.push([name, value]);
      }
    } else {
      this._list = urlencoded.parseUrlencodedString(init);
    }
  }

  _updateSteps() {
    if (this._url !== null) {
      let serializedQuery = urlencoded.serializeUrlencoded(this._list);
      if (serializedQuery === "") {
        serializedQuery = null;
      }

      this._url._url.query = serializedQuery;
    }
  }

  get size() {
    return this._list.length;
  }

  append(name, value) {
    this._list.push([name, value]);
    this._updateSteps();
  }

  delete(name, value) {
    let i = 0;
    while (i < this._list.length) {
      if (this._list[i][0] === name && (value === undefined || this._list[i][1] === value)) {
        this._list.splice(i, 1);
      } else {
        i++;
      }
    }
    this._updateSteps();
  }

  get(name) {
    for (const tuple of this._list) {
      if (tuple[0] === name) {
        return tuple[1];
      }
    }
    return null;
  }

  getAll(name) {
    const output = [];
    for (const tuple of this._list) {
      if (tuple[0] === name) {
        output.push(tuple[1]);
      }
    }
    return output;
  }

  has(name, value) {
    for (const tuple of this._list) {
      if (tuple[0] === name && (value === undefined || tuple[1] === value)) {
        return true;
      }
    }
    return false;
  }

  set(name, value) {
    let found = false;
    let i = 0;
    while (i < this._list.length) {
      if (this._list[i][0] === name) {
        if (found) {
          this._list.splice(i, 1);
        } else {
          found = true;
          this._list[i][1] = value;
          i++;
        }
      } else {
        i++;
      }
    }
    if (!found) {
      this._list.push([name, value]);
    }
    this._updateSteps();
  }

  sort() {
    this._list.sort((a, b) => {
      if (a[0] < b[0]) {
        return -1;
      }
      if (a[0] > b[0]) {
        return 1;
      }
      return 0;
    });

    this._updateSteps();
  }

  [Symbol.iterator]() {
    return this._list[Symbol.iterator]();
  }

  toString() {
    return urlencoded.serializeUrlencoded(this._list);
  }
};


/***/ }),

/***/ 578:
/***/ ((module) => {

"use strict";
module.exports = require("LensStudio:SupabaseModule");

/***/ }),

/***/ 604:
/***/ (() => {

// Response, like most (all?) LensCore types are not accessble as first-class values on globalThis.
// This causes silent failures in Supabase storage code.
// This is a temporary workaround to fix the situation.
// @ts-ignore
globalThis.Response = function () { };


/***/ }),

/***/ 616:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


function makeException(ErrorType, message, options) {
  if (options.globals) {
    ErrorType = options.globals[ErrorType.name];
  }
  return new ErrorType(`${options.context ? options.context : "Value"} ${message}.`);
}

function toNumber(value, options) {
  if (typeof value === "bigint") {
    throw makeException(TypeError, "is a BigInt which cannot be converted to a number", options);
  }
  if (!options.globals) {
    return Number(value);
  }
  return options.globals.Number(value);
}

// Round x to the nearest integer, choosing the even integer if it lies halfway between two.
function evenRound(x) {
  // There are four cases for numbers with fractional part being .5:
  //
  // case |     x     | floor(x) | round(x) | expected | x <> 0 | x % 1 | x & 1 |   example
  //   1  |  2n + 0.5 |  2n      |  2n + 1  |  2n      |   >    |  0.5  |   0   |  0.5 ->  0
  //   2  |  2n + 1.5 |  2n + 1  |  2n + 2  |  2n + 2  |   >    |  0.5  |   1   |  1.5 ->  2
  //   3  | -2n - 0.5 | -2n - 1  | -2n      | -2n      |   <    | -0.5  |   0   | -0.5 ->  0
  //   4  | -2n - 1.5 | -2n - 2  | -2n - 1  | -2n - 2  |   <    | -0.5  |   1   | -1.5 -> -2
  // (where n is a non-negative integer)
  //
  // Branch here for cases 1 and 4
  if ((x > 0 && (x % 1) === +0.5 && (x & 1) === 0) ||
        (x < 0 && (x % 1) === -0.5 && (x & 1) === 1)) {
    return censorNegativeZero(Math.floor(x));
  }

  return censorNegativeZero(Math.round(x));
}

function integerPart(n) {
  return censorNegativeZero(Math.trunc(n));
}

function sign(x) {
  return x < 0 ? -1 : 1;
}

function modulo(x, y) {
  // https://tc39.github.io/ecma262/#eqn-modulo
  // Note that http://stackoverflow.com/a/4467559/3191 does NOT work for large modulos
  const signMightNotMatch = x % y;
  if (sign(y) !== sign(signMightNotMatch)) {
    return signMightNotMatch + y;
  }
  return signMightNotMatch;
}

function censorNegativeZero(x) {
  return x === 0 ? 0 : x;
}

function createIntegerConversion(bitLength, { unsigned }) {
  let lowerBound, upperBound;
  if (unsigned) {
    lowerBound = 0;
    upperBound = 2 ** bitLength - 1;
  } else {
    lowerBound = -(2 ** (bitLength - 1));
    upperBound = 2 ** (bitLength - 1) - 1;
  }

  const twoToTheBitLength = 2 ** bitLength;
  const twoToOneLessThanTheBitLength = 2 ** (bitLength - 1);

  return (value, options = {}) => {
    let x = toNumber(value, options);
    x = censorNegativeZero(x);

    if (options.enforceRange) {
      if (!Number.isFinite(x)) {
        throw makeException(TypeError, "is not a finite number", options);
      }

      x = integerPart(x);

      if (x < lowerBound || x > upperBound) {
        throw makeException(
          TypeError,
          `is outside the accepted range of ${lowerBound} to ${upperBound}, inclusive`,
          options
        );
      }

      return x;
    }

    if (!Number.isNaN(x) && options.clamp) {
      x = Math.min(Math.max(x, lowerBound), upperBound);
      x = evenRound(x);
      return x;
    }

    if (!Number.isFinite(x) || x === 0) {
      return 0;
    }
    x = integerPart(x);

    // Math.pow(2, 64) is not accurately representable in JavaScript, so try to avoid these per-spec operations if
    // possible. Hopefully it's an optimization for the non-64-bitLength cases too.
    if (x >= lowerBound && x <= upperBound) {
      return x;
    }

    // These will not work great for bitLength of 64, but oh well. See the README for more details.
    x = modulo(x, twoToTheBitLength);
    if (!unsigned && x >= twoToOneLessThanTheBitLength) {
      return x - twoToTheBitLength;
    }
    return x;
  };
}

function createLongLongConversion(bitLength, { unsigned }) {
  const upperBound = Number.MAX_SAFE_INTEGER;
  const lowerBound = unsigned ? 0 : Number.MIN_SAFE_INTEGER;
  const asBigIntN = unsigned ? BigInt.asUintN : BigInt.asIntN;

  return (value, options = {}) => {
    let x = toNumber(value, options);
    x = censorNegativeZero(x);

    if (options.enforceRange) {
      if (!Number.isFinite(x)) {
        throw makeException(TypeError, "is not a finite number", options);
      }

      x = integerPart(x);

      if (x < lowerBound || x > upperBound) {
        throw makeException(
          TypeError,
          `is outside the accepted range of ${lowerBound} to ${upperBound}, inclusive`,
          options
        );
      }

      return x;
    }

    if (!Number.isNaN(x) && options.clamp) {
      x = Math.min(Math.max(x, lowerBound), upperBound);
      x = evenRound(x);
      return x;
    }

    if (!Number.isFinite(x) || x === 0) {
      return 0;
    }

    let xBigInt = BigInt(integerPart(x));
    xBigInt = asBigIntN(bitLength, xBigInt);
    return Number(xBigInt);
  };
}

exports.any = value => {
  return value;
};

exports.undefined = () => {
  return undefined;
};

exports.boolean = value => {
  return Boolean(value);
};

exports.byte = createIntegerConversion(8, { unsigned: false });
exports.octet = createIntegerConversion(8, { unsigned: true });

exports.short = createIntegerConversion(16, { unsigned: false });
exports["unsigned short"] = createIntegerConversion(16, { unsigned: true });

exports.long = createIntegerConversion(32, { unsigned: false });
exports["unsigned long"] = createIntegerConversion(32, { unsigned: true });

exports["long long"] = createLongLongConversion(64, { unsigned: false });
exports["unsigned long long"] = createLongLongConversion(64, { unsigned: true });

exports.double = (value, options = {}) => {
  const x = toNumber(value, options);

  if (!Number.isFinite(x)) {
    throw makeException(TypeError, "is not a finite floating-point value", options);
  }

  return x;
};

exports["unrestricted double"] = (value, options = {}) => {
  const x = toNumber(value, options);

  return x;
};

exports.float = (value, options = {}) => {
  const x = toNumber(value, options);

  if (!Number.isFinite(x)) {
    throw makeException(TypeError, "is not a finite floating-point value", options);
  }

  if (Object.is(x, -0)) {
    return x;
  }

  const y = Math.fround(x);

  if (!Number.isFinite(y)) {
    throw makeException(TypeError, "is outside the range of a single-precision floating-point value", options);
  }

  return y;
};

exports["unrestricted float"] = (value, options = {}) => {
  const x = toNumber(value, options);

  if (isNaN(x)) {
    return x;
  }

  if (Object.is(x, -0)) {
    return x;
  }

  return Math.fround(x);
};

exports.DOMString = (value, options = {}) => {
  if (options.treatNullAsEmptyString && value === null) {
    return "";
  }

  if (typeof value === "symbol") {
    throw makeException(TypeError, "is a symbol, which cannot be converted to a string", options);
  }

  const StringCtor = options.globals ? options.globals.String : String;
  return StringCtor(value);
};

exports.ByteString = (value, options = {}) => {
  const x = exports.DOMString(value, options);
  let c;
  for (let i = 0; (c = x.codePointAt(i)) !== undefined; ++i) {
    if (c > 255) {
      throw makeException(TypeError, "is not a valid ByteString", options);
    }
  }

  return x;
};

exports.USVString = (value, options = {}) => {
  const S = exports.DOMString(value, options);
  const n = S.length;
  const U = [];
  for (let i = 0; i < n; ++i) {
    const c = S.charCodeAt(i);
    if (c < 0xD800 || c > 0xDFFF) {
      U.push(String.fromCodePoint(c));
    } else if (0xDC00 <= c && c <= 0xDFFF) {
      U.push(String.fromCodePoint(0xFFFD));
    } else if (i === n - 1) {
      U.push(String.fromCodePoint(0xFFFD));
    } else {
      const d = S.charCodeAt(i + 1);
      if (0xDC00 <= d && d <= 0xDFFF) {
        const a = c & 0x3FF;
        const b = d & 0x3FF;
        U.push(String.fromCodePoint((2 << 15) + ((2 << 9) * a) + b));
        ++i;
      } else {
        U.push(String.fromCodePoint(0xFFFD));
      }
    }
  }

  return U.join("");
};

exports.object = (value, options = {}) => {
  if (value === null || (typeof value !== "object" && typeof value !== "function")) {
    throw makeException(TypeError, "is not an object", options);
  }

  return value;
};

const abByteLengthGetter =
    Object.getOwnPropertyDescriptor(ArrayBuffer.prototype, "byteLength").get;
const sabByteLengthGetter =
    typeof SharedArrayBuffer === "function" ?
      Object.getOwnPropertyDescriptor(SharedArrayBuffer.prototype, "byteLength").get :
      null;

function isNonSharedArrayBuffer(value) {
  try {
    // This will throw on SharedArrayBuffers, but not detached ArrayBuffers.
    // (The spec says it should throw, but the spec conflicts with implementations: https://github.com/tc39/ecma262/issues/678)
    abByteLengthGetter.call(value);

    return true;
  } catch {
    return false;
  }
}

function isSharedArrayBuffer(value) {
  try {
    sabByteLengthGetter.call(value);
    return true;
  } catch {
    return false;
  }
}

function isArrayBufferDetached(value) {
  try {
    // eslint-disable-next-line no-new
    new Uint8Array(value);
    return false;
  } catch {
    return true;
  }
}

exports.ArrayBuffer = (value, options = {}) => {
  if (!isNonSharedArrayBuffer(value)) {
    if (options.allowShared && !isSharedArrayBuffer(value)) {
      throw makeException(TypeError, "is not an ArrayBuffer or SharedArrayBuffer", options);
    }
    throw makeException(TypeError, "is not an ArrayBuffer", options);
  }
  if (isArrayBufferDetached(value)) {
    throw makeException(TypeError, "is a detached ArrayBuffer", options);
  }

  return value;
};

const dvByteLengthGetter =
    Object.getOwnPropertyDescriptor(DataView.prototype, "byteLength").get;
exports.DataView = (value, options = {}) => {
  try {
    dvByteLengthGetter.call(value);
  } catch (e) {
    throw makeException(TypeError, "is not a DataView", options);
  }

  if (!options.allowShared && isSharedArrayBuffer(value.buffer)) {
    throw makeException(TypeError, "is backed by a SharedArrayBuffer, which is not allowed", options);
  }
  if (isArrayBufferDetached(value.buffer)) {
    throw makeException(TypeError, "is backed by a detached ArrayBuffer", options);
  }

  return value;
};

// Returns the unforgeable `TypedArray` constructor name or `undefined`,
// if the `this` value isn't a valid `TypedArray` object.
//
// https://tc39.es/ecma262/#sec-get-%typedarray%.prototype-@@tostringtag
const typedArrayNameGetter = Object.getOwnPropertyDescriptor(
  Object.getPrototypeOf(Uint8Array).prototype,
  Symbol.toStringTag
).get;
[
  Int8Array,
  Int16Array,
  Int32Array,
  Uint8Array,
  Uint16Array,
  Uint32Array,
  Uint8ClampedArray,
  Float32Array,
  Float64Array
].forEach(func => {
  const { name } = func;
  const article = /^[AEIOU]/u.test(name) ? "an" : "a";
  exports[name] = (value, options = {}) => {
    if (!ArrayBuffer.isView(value) || typedArrayNameGetter.call(value) !== name) {
      throw makeException(TypeError, `is not ${article} ${name} object`, options);
    }
    if (!options.allowShared && isSharedArrayBuffer(value.buffer)) {
      throw makeException(TypeError, "is a view on a SharedArrayBuffer, which is not allowed", options);
    }
    if (isArrayBufferDetached(value.buffer)) {
      throw makeException(TypeError, "is a view on a detached ArrayBuffer", options);
    }

    return value;
  };
});

// Common definitions

exports.ArrayBufferView = (value, options = {}) => {
  if (!ArrayBuffer.isView(value)) {
    throw makeException(TypeError, "is not a view on an ArrayBuffer or SharedArrayBuffer", options);
  }

  if (!options.allowShared && isSharedArrayBuffer(value.buffer)) {
    throw makeException(TypeError, "is a view on a SharedArrayBuffer, which is not allowed", options);
  }

  if (isArrayBufferDetached(value.buffer)) {
    throw makeException(TypeError, "is a view on a detached ArrayBuffer", options);
  }
  return value;
};

exports.BufferSource = (value, options = {}) => {
  if (ArrayBuffer.isView(value)) {
    if (!options.allowShared && isSharedArrayBuffer(value.buffer)) {
      throw makeException(TypeError, "is a view on a SharedArrayBuffer, which is not allowed", options);
    }

    if (isArrayBufferDetached(value.buffer)) {
      throw makeException(TypeError, "is a view on a detached ArrayBuffer", options);
    }
    return value;
  }

  if (!options.allowShared && !isNonSharedArrayBuffer(value)) {
    throw makeException(TypeError, "is not an ArrayBuffer or a view on one", options);
  }
  if (options.allowShared && !isSharedArrayBuffer(value) && !isNonSharedArrayBuffer(value)) {
    throw makeException(TypeError, "is not an ArrayBuffer, SharedArrayBuffer, or a view on one", options);
  }
  if (isArrayBufferDetached(value)) {
    throw makeException(TypeError, "is a detached ArrayBuffer", options);
  }

  return value;
};

exports.DOMTimeStamp = exports["unsigned long long"];


/***/ }),

/***/ 639:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.fetch = fetch;
const Request_1 = __webpack_require__(878);
const FormData_1 = __webpack_require__(501);
const supabaseModule = __webpack_require__(578);
if (!supabaseModule) {
    throw new Error("SupabaseModule not available.");
}
async function fetch(input, init) {
    let webApiRequest;
    if (init && init.body && init.body instanceof FormData_1.FormData) {
        // We only use FormData when uploading Blobs to Supabase Storage.
        // There is no first-class support for FormData in LensCore.
        // So we're converting the FormData to a Blob and then to a Uint8Array.
        // There is a convention in Supabase that the Blob is set to an empty string '' as the key in the FormData.
        const blob = init.body.get('');
        if (blob instanceof Blob) {
            init.body = await blob.bytes();
            if (init.headers instanceof Headers) {
                init.headers.set('content-type', blob.type);
            }
            else {
                init.headers['content-type'] = blob.type;
            }
        }
    }
    if (typeof input === 'string') {
        webApiRequest = new Request_1.Request(input, init);
        // @ts-ignore
    }
    else if (input instanceof URL) {
        webApiRequest = new Request_1.Request(input.toString(), init);
    }
    else if (input instanceof Request_1.Request) {
        if (init) {
            const mergedInit = {
                method: init.method || input.method,
                headers: init.headers || input.headers,
                body: init.body || undefined,
                cache: init.cache || input.cache,
                credentials: init.credentials || input.credentials,
                integrity: init.integrity || input.integrity,
                keepalive: init.keepalive !== undefined ? init.keepalive : input.keepalive,
                mode: init.mode || input.mode,
                redirect: init.redirect || input.redirect,
                referrer: init.referrer || input.referrer,
                referrerPolicy: init.referrerPolicy || input.referrerPolicy,
                signal: init.signal || input.signal
            };
            webApiRequest = new Request_1.Request(input.url, mergedInit);
        }
        else {
            webApiRequest = input.clone();
        }
    }
    else {
        throw new TypeError('Invalid input type for fetch');
    }
    webApiRequest.headers.set('X-Client-Info', 'supabase-snapcloud/0.0.10');
    let lensStudioRequest;
    try {
        lensStudioRequest = webApiRequest.toLensStudioRequest();
    }
    catch (error) {
        throw new Error(`Failed to convert Request for Lens Studio: ${error}`);
    }
    return await supabaseModule.performSupabaseRequest(lensStudioRequest);
}
if (typeof globalThis.fetch === 'undefined') {
    globalThis.fetch = fetch;
}


/***/ }),

/***/ 648:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const conversions = __webpack_require__(616);
const utils = __webpack_require__(892);

const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;

const interfaceName = "URL";

exports.is = value => {
  return utils.isObject(value) && utils.hasOwn(value, implSymbol) && value[implSymbol] instanceof Impl.implementation;
};
exports.isImpl = value => {
  return utils.isObject(value) && value instanceof Impl.implementation;
};
exports.convert = (globalObject, value, { context = "The provided value" } = {}) => {
  if (exports.is(value)) {
    return utils.implForWrapper(value);
  }
  throw new globalObject.TypeError(`${context} is not of type 'URL'.`);
};

function makeWrapper(globalObject, newTarget) {
  let proto;
  if (newTarget !== undefined) {
    proto = newTarget.prototype;
  }

  if (!utils.isObject(proto)) {
    proto = globalObject[ctorRegistrySymbol]["URL"].prototype;
  }

  return Object.create(proto);
}

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = makeWrapper(globalObject);
  return exports.setup(wrapper, globalObject, constructorArgs, privateData);
};

exports.createImpl = (globalObject, constructorArgs, privateData) => {
  const wrapper = exports.create(globalObject, constructorArgs, privateData);
  return utils.implForWrapper(wrapper);
};

exports._internalSetup = (wrapper, globalObject) => {};

exports.setup = (wrapper, globalObject, constructorArgs = [], privateData = {}) => {
  privateData.wrapper = wrapper;

  exports._internalSetup(wrapper, globalObject);
  Object.defineProperty(wrapper, implSymbol, {
    value: new Impl.implementation(globalObject, constructorArgs, privateData),
    configurable: true
  });

  wrapper[implSymbol][utils.wrapperSymbol] = wrapper;
  if (Impl.init) {
    Impl.init(wrapper[implSymbol]);
  }
  return wrapper;
};

exports["new"] = (globalObject, newTarget) => {
  const wrapper = makeWrapper(globalObject, newTarget);

  exports._internalSetup(wrapper, globalObject);
  Object.defineProperty(wrapper, implSymbol, {
    value: Object.create(Impl.implementation.prototype),
    configurable: true
  });

  wrapper[implSymbol][utils.wrapperSymbol] = wrapper;
  if (Impl.init) {
    Impl.init(wrapper[implSymbol]);
  }
  return wrapper[implSymbol];
};

const exposed = new Set(["Window", "Worker"]);

exports.install = (globalObject, globalNames) => {
  if (!globalNames.some(globalName => exposed.has(globalName))) {
    return;
  }

  const ctorRegistry = utils.initCtorRegistry(globalObject);
  class URL {
    constructor(url) {
      if (arguments.length < 1) {
        throw new globalObject.TypeError(
          `Failed to construct 'URL': 1 argument required, but only ${arguments.length} present.`
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        curArg = conversions["USVString"](curArg, {
          context: "Failed to construct 'URL': parameter 1",
          globals: globalObject
        });
        args.push(curArg);
      }
      {
        let curArg = arguments[1];
        if (curArg !== undefined) {
          curArg = conversions["USVString"](curArg, {
            context: "Failed to construct 'URL': parameter 2",
            globals: globalObject
          });
        }
        args.push(curArg);
      }
      return exports.setup(Object.create(new.target.prototype), globalObject, args);
    }

    toJSON() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new globalObject.TypeError("'toJSON' called on an object that is not a valid instance of URL.");
      }

      return esValue[implSymbol].toJSON();
    }

    get href() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError("'get href' called on an object that is not a valid instance of URL.");
      }

      return esValue[implSymbol]["href"];
    }

    set href(V) {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError("'set href' called on an object that is not a valid instance of URL.");
      }

      V = conversions["USVString"](V, {
        context: "Failed to set the 'href' property on 'URL': The provided value",
        globals: globalObject
      });

      esValue[implSymbol]["href"] = V;
    }

    toString() {
      const esValue = this;
      if (!exports.is(esValue)) {
        throw new globalObject.TypeError("'toString' called on an object that is not a valid instance of URL.");
      }

      return esValue[implSymbol]["href"];
    }

    get origin() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError("'get origin' called on an object that is not a valid instance of URL.");
      }

      return esValue[implSymbol]["origin"];
    }

    get protocol() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError("'get protocol' called on an object that is not a valid instance of URL.");
      }

      return esValue[implSymbol]["protocol"];
    }

    set protocol(V) {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError("'set protocol' called on an object that is not a valid instance of URL.");
      }

      V = conversions["USVString"](V, {
        context: "Failed to set the 'protocol' property on 'URL': The provided value",
        globals: globalObject
      });

      esValue[implSymbol]["protocol"] = V;
    }

    get username() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError("'get username' called on an object that is not a valid instance of URL.");
      }

      return esValue[implSymbol]["username"];
    }

    set username(V) {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError("'set username' called on an object that is not a valid instance of URL.");
      }

      V = conversions["USVString"](V, {
        context: "Failed to set the 'username' property on 'URL': The provided value",
        globals: globalObject
      });

      esValue[implSymbol]["username"] = V;
    }

    get password() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError("'get password' called on an object that is not a valid instance of URL.");
      }

      return esValue[implSymbol]["password"];
    }

    set password(V) {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError("'set password' called on an object that is not a valid instance of URL.");
      }

      V = conversions["USVString"](V, {
        context: "Failed to set the 'password' property on 'URL': The provided value",
        globals: globalObject
      });

      esValue[implSymbol]["password"] = V;
    }

    get host() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError("'get host' called on an object that is not a valid instance of URL.");
      }

      return esValue[implSymbol]["host"];
    }

    set host(V) {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError("'set host' called on an object that is not a valid instance of URL.");
      }

      V = conversions["USVString"](V, {
        context: "Failed to set the 'host' property on 'URL': The provided value",
        globals: globalObject
      });

      esValue[implSymbol]["host"] = V;
    }

    get hostname() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError("'get hostname' called on an object that is not a valid instance of URL.");
      }

      return esValue[implSymbol]["hostname"];
    }

    set hostname(V) {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError("'set hostname' called on an object that is not a valid instance of URL.");
      }

      V = conversions["USVString"](V, {
        context: "Failed to set the 'hostname' property on 'URL': The provided value",
        globals: globalObject
      });

      esValue[implSymbol]["hostname"] = V;
    }

    get port() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError("'get port' called on an object that is not a valid instance of URL.");
      }

      return esValue[implSymbol]["port"];
    }

    set port(V) {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError("'set port' called on an object that is not a valid instance of URL.");
      }

      V = conversions["USVString"](V, {
        context: "Failed to set the 'port' property on 'URL': The provided value",
        globals: globalObject
      });

      esValue[implSymbol]["port"] = V;
    }

    get pathname() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError("'get pathname' called on an object that is not a valid instance of URL.");
      }

      return esValue[implSymbol]["pathname"];
    }

    set pathname(V) {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError("'set pathname' called on an object that is not a valid instance of URL.");
      }

      V = conversions["USVString"](V, {
        context: "Failed to set the 'pathname' property on 'URL': The provided value",
        globals: globalObject
      });

      esValue[implSymbol]["pathname"] = V;
    }

    get search() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError("'get search' called on an object that is not a valid instance of URL.");
      }

      return esValue[implSymbol]["search"];
    }

    set search(V) {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError("'set search' called on an object that is not a valid instance of URL.");
      }

      V = conversions["USVString"](V, {
        context: "Failed to set the 'search' property on 'URL': The provided value",
        globals: globalObject
      });

      esValue[implSymbol]["search"] = V;
    }

    get searchParams() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError("'get searchParams' called on an object that is not a valid instance of URL.");
      }

      return utils.getSameObject(this, "searchParams", () => {
        return utils.tryWrapperForImpl(esValue[implSymbol]["searchParams"]);
      });
    }

    get hash() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError("'get hash' called on an object that is not a valid instance of URL.");
      }

      return esValue[implSymbol]["hash"];
    }

    set hash(V) {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError("'set hash' called on an object that is not a valid instance of URL.");
      }

      V = conversions["USVString"](V, {
        context: "Failed to set the 'hash' property on 'URL': The provided value",
        globals: globalObject
      });

      esValue[implSymbol]["hash"] = V;
    }

    static parse(url) {
      if (arguments.length < 1) {
        throw new globalObject.TypeError(
          `Failed to execute 'parse' on 'URL': 1 argument required, but only ${arguments.length} present.`
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        curArg = conversions["USVString"](curArg, {
          context: "Failed to execute 'parse' on 'URL': parameter 1",
          globals: globalObject
        });
        args.push(curArg);
      }
      {
        let curArg = arguments[1];
        if (curArg !== undefined) {
          curArg = conversions["USVString"](curArg, {
            context: "Failed to execute 'parse' on 'URL': parameter 2",
            globals: globalObject
          });
        }
        args.push(curArg);
      }
      return utils.tryWrapperForImpl(Impl.implementation.parse(globalObject, ...args));
    }

    static canParse(url) {
      if (arguments.length < 1) {
        throw new globalObject.TypeError(
          `Failed to execute 'canParse' on 'URL': 1 argument required, but only ${arguments.length} present.`
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        curArg = conversions["USVString"](curArg, {
          context: "Failed to execute 'canParse' on 'URL': parameter 1",
          globals: globalObject
        });
        args.push(curArg);
      }
      {
        let curArg = arguments[1];
        if (curArg !== undefined) {
          curArg = conversions["USVString"](curArg, {
            context: "Failed to execute 'canParse' on 'URL': parameter 2",
            globals: globalObject
          });
        }
        args.push(curArg);
      }
      return Impl.implementation.canParse(...args);
    }
  }
  Object.defineProperties(URL.prototype, {
    toJSON: { enumerable: true },
    href: { enumerable: true },
    toString: { enumerable: true },
    origin: { enumerable: true },
    protocol: { enumerable: true },
    username: { enumerable: true },
    password: { enumerable: true },
    host: { enumerable: true },
    hostname: { enumerable: true },
    port: { enumerable: true },
    pathname: { enumerable: true },
    search: { enumerable: true },
    searchParams: { enumerable: true },
    hash: { enumerable: true },
    [Symbol.toStringTag]: { value: "URL", configurable: true }
  });
  Object.defineProperties(URL, { parse: { enumerable: true }, canParse: { enumerable: true } });
  ctorRegistry[interfaceName] = URL;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: URL
  });

  if (globalNames.includes("Window")) {
    Object.defineProperty(globalObject, "webkitURL", {
      configurable: true,
      writable: true,
      value: URL
    });
  }
};

const Impl = __webpack_require__(79);


/***/ }),

/***/ 656:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const { isASCIIHex } = __webpack_require__(167);
const { utf8Encode } = __webpack_require__(408);

function p(char) {
  return char.codePointAt(0);
}

// https://url.spec.whatwg.org/#percent-encode
function percentEncode(c) {
  let hex = c.toString(16).toUpperCase();
  if (hex.length === 1) {
    hex = `0${hex}`;
  }

  return `%${hex}`;
}

// https://url.spec.whatwg.org/#percent-decode
function percentDecodeBytes(input) {
  const output = new Uint8Array(input.byteLength);
  let outputIndex = 0;
  for (let i = 0; i < input.byteLength; ++i) {
    const byte = input[i];
    if (byte !== 0x25) {
      output[outputIndex++] = byte;
    } else if (byte === 0x25 && (!isASCIIHex(input[i + 1]) || !isASCIIHex(input[i + 2]))) {
      output[outputIndex++] = byte;
    } else {
      const bytePoint = parseInt(String.fromCodePoint(input[i + 1], input[i + 2]), 16);
      output[outputIndex++] = bytePoint;
      i += 2;
    }
  }

  return output.slice(0, outputIndex);
}

// https://url.spec.whatwg.org/#string-percent-decode
function percentDecodeString(input) {
  const bytes = utf8Encode(input);
  return percentDecodeBytes(bytes);
}

// https://url.spec.whatwg.org/#c0-control-percent-encode-set
function isC0ControlPercentEncode(c) {
  return c <= 0x1F || c > 0x7E;
}

// https://url.spec.whatwg.org/#fragment-percent-encode-set
const extraFragmentPercentEncodeSet = new Set([p(" "), p("\""), p("<"), p(">"), p("`")]);
function isFragmentPercentEncode(c) {
  return isC0ControlPercentEncode(c) || extraFragmentPercentEncodeSet.has(c);
}

// https://url.spec.whatwg.org/#query-percent-encode-set
const extraQueryPercentEncodeSet = new Set([p(" "), p("\""), p("#"), p("<"), p(">")]);
function isQueryPercentEncode(c) {
  return isC0ControlPercentEncode(c) || extraQueryPercentEncodeSet.has(c);
}

// https://url.spec.whatwg.org/#special-query-percent-encode-set
function isSpecialQueryPercentEncode(c) {
  return isQueryPercentEncode(c) || c === p("'");
}

// https://url.spec.whatwg.org/#path-percent-encode-set
const extraPathPercentEncodeSet = new Set([p("?"), p("`"), p("{"), p("}"), p("^")]);
function isPathPercentEncode(c) {
  return isQueryPercentEncode(c) || extraPathPercentEncodeSet.has(c);
}

// https://url.spec.whatwg.org/#userinfo-percent-encode-set
const extraUserinfoPercentEncodeSet =
  new Set([p("/"), p(":"), p(";"), p("="), p("@"), p("["), p("\\"), p("]"), p("|")]);
function isUserinfoPercentEncode(c) {
  return isPathPercentEncode(c) || extraUserinfoPercentEncodeSet.has(c);
}

// https://url.spec.whatwg.org/#component-percent-encode-set
const extraComponentPercentEncodeSet = new Set([p("$"), p("%"), p("&"), p("+"), p(",")]);
function isComponentPercentEncode(c) {
  return isUserinfoPercentEncode(c) || extraComponentPercentEncodeSet.has(c);
}

// https://url.spec.whatwg.org/#application-x-www-form-urlencoded-percent-encode-set
const extraURLEncodedPercentEncodeSet = new Set([p("!"), p("'"), p("("), p(")"), p("~")]);
function isURLEncodedPercentEncode(c) {
  return isComponentPercentEncode(c) || extraURLEncodedPercentEncodeSet.has(c);
}

// https://url.spec.whatwg.org/#code-point-percent-encode-after-encoding
// https://url.spec.whatwg.org/#utf-8-percent-encode
// Assuming encoding is always utf-8 allows us to trim one of the logic branches. TODO: support encoding.
// The "-Internal" variant here has code points as JS strings. The external version used by other files has code points
// as JS numbers, like the rest of the codebase.
function utf8PercentEncodeCodePointInternal(codePoint, percentEncodePredicate) {
  const bytes = utf8Encode(codePoint);
  let output = "";
  for (const byte of bytes) {
    // Our percentEncodePredicate operates on bytes, not code points, so this is slightly different from the spec.
    if (!percentEncodePredicate(byte)) {
      output += String.fromCharCode(byte);
    } else {
      output += percentEncode(byte);
    }
  }

  return output;
}

function utf8PercentEncodeCodePoint(codePoint, percentEncodePredicate) {
  return utf8PercentEncodeCodePointInternal(String.fromCodePoint(codePoint), percentEncodePredicate);
}

// https://url.spec.whatwg.org/#string-percent-encode-after-encoding
// https://url.spec.whatwg.org/#string-utf-8-percent-encode
function utf8PercentEncodeString(input, percentEncodePredicate, spaceAsPlus = false) {
  let output = "";
  for (const codePoint of input) {
    if (spaceAsPlus && codePoint === " ") {
      output += "+";
    } else {
      output += utf8PercentEncodeCodePointInternal(codePoint, percentEncodePredicate);
    }
  }
  return output;
}

module.exports = {
  isC0ControlPercentEncode,
  isFragmentPercentEncode,
  isQueryPercentEncode,
  isSpecialQueryPercentEncode,
  isPathPercentEncode,
  isUserinfoPercentEncode,
  isURLEncodedPercentEncode,
  percentDecodeString,
  percentDecodeBytes,
  utf8PercentEncodeString,
  utf8PercentEncodeCodePoint
};


/***/ }),

/***/ 660:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
// @ts-ignore
const node_fetch_1 = __importDefault(__webpack_require__(907));
const PostgrestError_1 = __importDefault(__webpack_require__(818));
class PostgrestBuilder {
    constructor(builder) {
        var _a, _b;
        this.shouldThrowOnError = false;
        this.method = builder.method;
        this.url = builder.url;
        this.headers = new Headers(builder.headers);
        this.schema = builder.schema;
        this.body = builder.body;
        this.shouldThrowOnError = (_a = builder.shouldThrowOnError) !== null && _a !== void 0 ? _a : false;
        this.signal = builder.signal;
        this.isMaybeSingle = (_b = builder.isMaybeSingle) !== null && _b !== void 0 ? _b : false;
        if (builder.fetch) {
            this.fetch = builder.fetch;
        }
        else if (typeof fetch === 'undefined') {
            this.fetch = node_fetch_1.default;
        }
        else {
            this.fetch = fetch;
        }
    }
    /**
     * If there's an error with the query, throwOnError will reject the promise by
     * throwing the error instead of returning it as part of a successful response.
     *
     * {@link https://github.com/supabase/supabase-js/issues/92}
     */
    throwOnError() {
        this.shouldThrowOnError = true;
        return this;
    }
    /**
     * Set an HTTP header for the request.
     */
    setHeader(name, value) {
        this.headers = new Headers(this.headers);
        this.headers.set(name, value);
        return this;
    }
    then(onfulfilled, onrejected) {
        // https://postgrest.org/en/stable/api.html#switching-schemas
        if (this.schema === undefined) {
            // skip
        }
        else if (['GET', 'HEAD'].includes(this.method)) {
            this.headers.set('Accept-Profile', this.schema);
        }
        else {
            this.headers.set('Content-Profile', this.schema);
        }
        if (this.method !== 'GET' && this.method !== 'HEAD') {
            this.headers.set('Content-Type', 'application/json');
        }
        // NOTE: Invoke w/o `this` to avoid illegal invocation error.
        // https://github.com/supabase/postgrest-js/pull/247
        const _fetch = this.fetch;
        let res = _fetch(this.url.toString(), {
            method: this.method,
            headers: this.headers,
            body: JSON.stringify(this.body),
            signal: this.signal,
        }).then(async (res) => {
            var _a, _b, _c, _d;
            let error = null;
            let data = null;
            let count = null;
            let status = res.status;
            let statusText = res.statusText;
            if (res.ok) {
                if (this.method !== 'HEAD') {
                    const body = await res.text();
                    if (body === '') {
                        // Prefer: return=minimal
                    }
                    else if (this.headers.get('Accept') === 'text/csv') {
                        data = body;
                    }
                    else if (this.headers.get('Accept') &&
                        ((_a = this.headers.get('Accept')) === null || _a === void 0 ? void 0 : _a.includes('application/vnd.pgrst.plan+text'))) {
                        data = body;
                    }
                    else {
                        data = JSON.parse(body);
                    }
                }
                const countHeader = (_b = this.headers.get('Prefer')) === null || _b === void 0 ? void 0 : _b.match(/count=(exact|planned|estimated)/);
                const contentRange = (_c = res.headers.get('content-range')) === null || _c === void 0 ? void 0 : _c.split('/');
                if (countHeader && contentRange && contentRange.length > 1) {
                    count = parseInt(contentRange[1]);
                }
                // Temporary partial fix for https://github.com/supabase/postgrest-js/issues/361
                // Issue persists e.g. for `.insert([...]).select().maybeSingle()`
                if (this.isMaybeSingle && this.method === 'GET' && Array.isArray(data)) {
                    if (data.length > 1) {
                        error = {
                            // https://github.com/PostgREST/postgrest/blob/a867d79c42419af16c18c3fb019eba8df992626f/src/PostgREST/Error.hs#L553
                            code: 'PGRST116',
                            details: `Results contain ${data.length} rows, application/vnd.pgrst.object+json requires 1 row`,
                            hint: null,
                            message: 'JSON object requested, multiple (or no) rows returned',
                        };
                        data = null;
                        count = null;
                        status = 406;
                        statusText = 'Not Acceptable';
                    }
                    else if (data.length === 1) {
                        data = data[0];
                    }
                    else {
                        data = null;
                    }
                }
            }
            else {
                const body = await res.text();
                try {
                    error = JSON.parse(body);
                    // Workaround for https://github.com/supabase/postgrest-js/issues/295
                    if (Array.isArray(error) && res.status === 404) {
                        data = [];
                        error = null;
                        status = 200;
                        statusText = 'OK';
                    }
                }
                catch (_e) {
                    // Workaround for https://github.com/supabase/postgrest-js/issues/295
                    if (res.status === 404 && body === '') {
                        status = 204;
                        statusText = 'No Content';
                    }
                    else {
                        error = {
                            message: body,
                        };
                    }
                }
                if (error && this.isMaybeSingle && ((_d = error === null || error === void 0 ? void 0 : error.details) === null || _d === void 0 ? void 0 : _d.includes('0 rows'))) {
                    error = null;
                    status = 200;
                    statusText = 'OK';
                }
                if (error && this.shouldThrowOnError) {
                    throw new PostgrestError_1.default(error);
                }
            }
            const postgrestResponse = {
                error,
                data,
                count,
                status,
                statusText,
            };
            return postgrestResponse;
        });
        if (!this.shouldThrowOnError) {
            res = res.catch((fetchError) => {
                var _a, _b, _c;
                return ({
                    error: {
                        message: `${(_a = fetchError === null || fetchError === void 0 ? void 0 : fetchError.name) !== null && _a !== void 0 ? _a : 'FetchError'}: ${fetchError === null || fetchError === void 0 ? void 0 : fetchError.message}`,
                        details: `${(_b = fetchError === null || fetchError === void 0 ? void 0 : fetchError.stack) !== null && _b !== void 0 ? _b : ''}`,
                        hint: '',
                        code: `${(_c = fetchError === null || fetchError === void 0 ? void 0 : fetchError.code) !== null && _c !== void 0 ? _c : ''}`,
                    },
                    data: null,
                    count: null,
                    status: 0,
                    statusText: '',
                });
            });
        }
        return res.then(onfulfilled, onrejected);
    }
    /**
     * Override the type of the returned `data`.
     *
     * @typeParam NewResult - The new result type to override with
     * @deprecated Use overrideTypes<yourType, { merge: false }>() method at the end of your call chain instead
     */
    returns() {
        /* istanbul ignore next */
        return this;
    }
    /**
     * Override the type of the returned `data` field in the response.
     *
     * @typeParam NewResult - The new type to cast the response data to
     * @typeParam Options - Optional type configuration (defaults to { merge: true })
     * @typeParam Options.merge - When true, merges the new type with existing return type. When false, replaces the existing types entirely (defaults to true)
     * @example
     * ```typescript
     * // Merge with existing types (default behavior)
     * const query = supabase
     *   .from('users')
     *   .select()
     *   .overrideTypes<{ custom_field: string }>()
     *
     * // Replace existing types completely
     * const replaceQuery = supabase
     *   .from('users')
     *   .select()
     *   .overrideTypes<{ id: number; name: string }, { merge: false }>()
     * ```
     * @returns A PostgrestBuilder instance with the new type
     */
    overrideTypes() {
        return this;
    }
}
exports["default"] = PostgrestBuilder;
//# sourceMappingURL=PostgrestBuilder.js.map

/***/ }),

/***/ 673:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const punycode = __webpack_require__(379);
const regexes = __webpack_require__(378);
const mappingTable = __webpack_require__(472);
const { STATUS_MAPPING } = __webpack_require__(445);

function containsNonASCII(str) {
  return /[^\x00-\x7F]/u.test(str);
}

function findStatus(val) {
  let start = 0;
  let end = mappingTable.length - 1;

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);

    const target = mappingTable[mid];
    const min = Array.isArray(target[0]) ? target[0][0] : target[0];
    const max = Array.isArray(target[0]) ? target[0][1] : target[0];

    if (min <= val && max >= val) {
      return target.slice(1);
    } else if (min > val) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }

  return null;
}

function mapChars(domainName, { transitionalProcessing }) {
  let processed = "";

  for (const ch of domainName) {
    const [status, mapping] = findStatus(ch.codePointAt(0));

    switch (status) {
      case STATUS_MAPPING.disallowed:
        processed += ch;
        break;
      case STATUS_MAPPING.ignored:
        break;
      case STATUS_MAPPING.mapped:
        if (transitionalProcessing && ch === "ẞ") {
          processed += "ss";
        } else {
          processed += mapping;
        }
        break;
      case STATUS_MAPPING.deviation:
        if (transitionalProcessing) {
          processed += mapping;
        } else {
          processed += ch;
        }
        break;
      case STATUS_MAPPING.valid:
        processed += ch;
        break;
    }
  }

  return processed;
}

function validateLabel(label, {
  checkHyphens,
  checkBidi,
  checkJoiners,
  transitionalProcessing,
  useSTD3ASCIIRules,
  isBidi
}) {
  // "must be satisfied for a non-empty label"
  if (label.length === 0) {
    return true;
  }

  // "1. The label must be in Unicode Normalization Form NFC."
  if (label.normalize("NFC") !== label) {
    return false;
  }

  const codePoints = Array.from(label);

  // "2. If CheckHyphens, the label must not contain a U+002D HYPHEN-MINUS character in both the
  // third and fourth positions."
  //
  // "3. If CheckHyphens, the label must neither begin nor end with a U+002D HYPHEN-MINUS character."
  if (checkHyphens) {
    if ((codePoints[2] === "-" && codePoints[3] === "-") ||
        (label.startsWith("-") || label.endsWith("-"))) {
      return false;
    }
  }

  // "4. If not CheckHyphens, the label must not begin with “xn--”."
  if (!checkHyphens) {
    if (label.startsWith("xn--")) {
      return false;
    }
  }

  // "5. The label must not contain a U+002E ( . ) FULL STOP."
  if (label.includes(".")) {
    return false;
  }

  // "6. The label must not begin with a combining mark, that is: General_Category=Mark."
  if (regexes.combiningMarks.test(codePoints[0])) {
    return false;
  }

  // "7. Each code point in the label must only have certain Status values according to Section 5"
  for (const ch of codePoints) {
    const codePoint = ch.codePointAt(0);
    const [status] = findStatus(codePoint);
    if (transitionalProcessing) {
      // "For Transitional Processing (deprecated), each value must be valid."
      if (status !== STATUS_MAPPING.valid) {
        return false;
      }
    } else if (status !== STATUS_MAPPING.valid && status !== STATUS_MAPPING.deviation) {
      // "For Nontransitional Processing, each value must be either valid or deviation."
      return false;
    }
    // "In addition, if UseSTD3ASCIIRules=true and the code point is an ASCII code point (U+0000..U+007F), then it must
    // be a lowercase letter (a-z), a digit (0-9), or a hyphen-minus (U+002D). (Note: This excludes uppercase ASCII
    // A-Z which are mapped in UTS #46 and disallowed in IDNA2008.)"
    if (useSTD3ASCIIRules && codePoint <= 0x7F) {
      if (!/^(?:[a-z]|[0-9]|-)$/u.test(ch)) {
        return false;
      }
    }
  }

  // "8. If CheckJoiners, the label must satisify the ContextJ rules"
  // https://tools.ietf.org/html/rfc5892#appendix-A
  if (checkJoiners) {
    let last = 0;
    for (const [i, ch] of codePoints.entries()) {
      if (ch === "\u200C" || ch === "\u200D") {
        if (i > 0) {
          if (regexes.combiningClassVirama.test(codePoints[i - 1])) {
            continue;
          }
          if (ch === "\u200C") {
            // TODO: make this more efficient
            const next = codePoints.indexOf("\u200C", i + 1);
            const test = next < 0 ? codePoints.slice(last) : codePoints.slice(last, next);
            if (regexes.validZWNJ.test(test.join(""))) {
              last = i + 1;
              continue;
            }
          }
        }
        return false;
      }
    }
  }

  // "9. If CheckBidi, and if the domain name is a Bidi domain name, then the label must satisfy..."
  // https://tools.ietf.org/html/rfc5893#section-2
  if (checkBidi && isBidi) {
    let rtl;

    // 1
    if (regexes.bidiS1LTR.test(codePoints[0])) {
      rtl = false;
    } else if (regexes.bidiS1RTL.test(codePoints[0])) {
      rtl = true;
    } else {
      return false;
    }

    if (rtl) {
      // 2-4
      if (!regexes.bidiS2.test(label) ||
          !regexes.bidiS3.test(label) ||
          (regexes.bidiS4EN.test(label) && regexes.bidiS4AN.test(label))) {
        return false;
      }
    } else if (!regexes.bidiS5.test(label) ||
               !regexes.bidiS6.test(label)) { // 5-6
      return false;
    }
  }

  return true;
}

function isBidiDomain(labels) {
  const domain = labels.map(label => {
    if (label.startsWith("xn--")) {
      try {
        return punycode.decode(label.substring(4));
      } catch {
        return "";
      }
    }
    return label;
  }).join(".");
  return regexes.bidiDomain.test(domain);
}

function processing(domainName, options) {
  // 1. Map.
  let string = mapChars(domainName, options);

  // 2. Normalize.
  string = string.normalize("NFC");

  // 3. Break.
  const labels = string.split(".");
  const isBidi = isBidiDomain(labels);

  // 4. Convert/Validate.
  let error = false;
  for (const [i, origLabel] of labels.entries()) {
    let label = origLabel;
    let transitionalProcessingForThisLabel = options.transitionalProcessing;
    if (label.startsWith("xn--")) {
      if (containsNonASCII(label)) {
        error = true;
        continue;
      }

      try {
        label = punycode.decode(label.substring(4));
      } catch {
        if (!options.ignoreInvalidPunycode) {
          error = true;
          continue;
        }
      }
      labels[i] = label;

      if (label === "" || !containsNonASCII(label)) {
        error = true;
      }

      transitionalProcessingForThisLabel = false;
    }

    // No need to validate if we already know there is an error.
    if (error) {
      continue;
    }
    const validation = validateLabel(label, {
      ...options,
      transitionalProcessing: transitionalProcessingForThisLabel,
      isBidi
    });
    if (!validation) {
      error = true;
    }
  }

  return {
    string: labels.join("."),
    error
  };
}

function toASCII(domainName, {
  checkHyphens = false,
  checkBidi = false,
  checkJoiners = false,
  useSTD3ASCIIRules = false,
  verifyDNSLength = false,
  transitionalProcessing = false,
  ignoreInvalidPunycode = false
} = {}) {
  const result = processing(domainName, {
    checkHyphens,
    checkBidi,
    checkJoiners,
    useSTD3ASCIIRules,
    transitionalProcessing,
    ignoreInvalidPunycode
  });
  let labels = result.string.split(".");
  labels = labels.map(l => {
    if (containsNonASCII(l)) {
      try {
        return `xn--${punycode.encode(l)}`;
      } catch {
        result.error = true;
      }
    }
    return l;
  });

  if (verifyDNSLength) {
    const total = labels.join(".").length;
    if (total > 253 || total === 0) {
      result.error = true;
    }

    for (let i = 0; i < labels.length; ++i) {
      if (labels[i].length > 63 || labels[i].length === 0) {
        result.error = true;
        break;
      }
    }
  }

  if (result.error) {
    return null;
  }
  return labels.join(".");
}

function toUnicode(domainName, {
  checkHyphens = false,
  checkBidi = false,
  checkJoiners = false,
  useSTD3ASCIIRules = false,
  transitionalProcessing = false,
  ignoreInvalidPunycode = false
} = {}) {
  const result = processing(domainName, {
    checkHyphens,
    checkBidi,
    checkJoiners,
    useSTD3ASCIIRules,
    transitionalProcessing,
    ignoreInvalidPunycode
  });

  return {
    domain: result.string,
    error: result.error
  };
}

module.exports = {
  toASCII,
  toUnicode
};


/***/ }),

/***/ 682:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const conversions = __webpack_require__(616);
const utils = __webpack_require__(892);

const Function = __webpack_require__(817);
const newObjectInRealm = utils.newObjectInRealm;
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;

const interfaceName = "URLSearchParams";

exports.is = value => {
  return utils.isObject(value) && utils.hasOwn(value, implSymbol) && value[implSymbol] instanceof Impl.implementation;
};
exports.isImpl = value => {
  return utils.isObject(value) && value instanceof Impl.implementation;
};
exports.convert = (globalObject, value, { context = "The provided value" } = {}) => {
  if (exports.is(value)) {
    return utils.implForWrapper(value);
  }
  throw new globalObject.TypeError(`${context} is not of type 'URLSearchParams'.`);
};

exports.createDefaultIterator = (globalObject, target, kind) => {
  const ctorRegistry = globalObject[ctorRegistrySymbol];
  const iteratorPrototype = ctorRegistry["URLSearchParams Iterator"];
  const iterator = Object.create(iteratorPrototype);
  Object.defineProperty(iterator, utils.iterInternalSymbol, {
    value: { target, kind, index: 0 },
    configurable: true
  });
  return iterator;
};

function makeWrapper(globalObject, newTarget) {
  let proto;
  if (newTarget !== undefined) {
    proto = newTarget.prototype;
  }

  if (!utils.isObject(proto)) {
    proto = globalObject[ctorRegistrySymbol]["URLSearchParams"].prototype;
  }

  return Object.create(proto);
}

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = makeWrapper(globalObject);
  return exports.setup(wrapper, globalObject, constructorArgs, privateData);
};

exports.createImpl = (globalObject, constructorArgs, privateData) => {
  const wrapper = exports.create(globalObject, constructorArgs, privateData);
  return utils.implForWrapper(wrapper);
};

exports._internalSetup = (wrapper, globalObject) => {};

exports.setup = (wrapper, globalObject, constructorArgs = [], privateData = {}) => {
  privateData.wrapper = wrapper;

  exports._internalSetup(wrapper, globalObject);
  Object.defineProperty(wrapper, implSymbol, {
    value: new Impl.implementation(globalObject, constructorArgs, privateData),
    configurable: true
  });

  wrapper[implSymbol][utils.wrapperSymbol] = wrapper;
  if (Impl.init) {
    Impl.init(wrapper[implSymbol]);
  }
  return wrapper;
};

exports["new"] = (globalObject, newTarget) => {
  const wrapper = makeWrapper(globalObject, newTarget);

  exports._internalSetup(wrapper, globalObject);
  Object.defineProperty(wrapper, implSymbol, {
    value: Object.create(Impl.implementation.prototype),
    configurable: true
  });

  wrapper[implSymbol][utils.wrapperSymbol] = wrapper;
  if (Impl.init) {
    Impl.init(wrapper[implSymbol]);
  }
  return wrapper[implSymbol];
};

const exposed = new Set(["Window", "Worker"]);

exports.install = (globalObject, globalNames) => {
  if (!globalNames.some(globalName => exposed.has(globalName))) {
    return;
  }

  const ctorRegistry = utils.initCtorRegistry(globalObject);
  class URLSearchParams {
    constructor() {
      const args = [];
      {
        let curArg = arguments[0];
        if (curArg !== undefined) {
          if (utils.isObject(curArg)) {
            if (curArg[Symbol.iterator] !== undefined) {
              if (!utils.isObject(curArg)) {
                throw new globalObject.TypeError(
                  "Failed to construct 'URLSearchParams': parameter 1" + " sequence" + " is not an iterable object."
                );
              } else {
                const V = [];
                const tmp = curArg;
                for (let nextItem of tmp) {
                  if (!utils.isObject(nextItem)) {
                    throw new globalObject.TypeError(
                      "Failed to construct 'URLSearchParams': parameter 1" +
                        " sequence" +
                        "'s element" +
                        " is not an iterable object."
                    );
                  } else {
                    const V = [];
                    const tmp = nextItem;
                    for (let nextItem of tmp) {
                      nextItem = conversions["USVString"](nextItem, {
                        context:
                          "Failed to construct 'URLSearchParams': parameter 1" +
                          " sequence" +
                          "'s element" +
                          "'s element",
                        globals: globalObject
                      });

                      V.push(nextItem);
                    }
                    nextItem = V;
                  }

                  V.push(nextItem);
                }
                curArg = V;
              }
            } else {
              if (!utils.isObject(curArg)) {
                throw new globalObject.TypeError(
                  "Failed to construct 'URLSearchParams': parameter 1" + " record" + " is not an object."
                );
              } else {
                const result = Object.create(null);
                for (const key of Reflect.ownKeys(curArg)) {
                  const desc = Object.getOwnPropertyDescriptor(curArg, key);
                  if (desc && desc.enumerable) {
                    let typedKey = key;

                    typedKey = conversions["USVString"](typedKey, {
                      context: "Failed to construct 'URLSearchParams': parameter 1" + " record" + "'s key",
                      globals: globalObject
                    });

                    let typedValue = curArg[key];

                    typedValue = conversions["USVString"](typedValue, {
                      context: "Failed to construct 'URLSearchParams': parameter 1" + " record" + "'s value",
                      globals: globalObject
                    });

                    result[typedKey] = typedValue;
                  }
                }
                curArg = result;
              }
            }
          } else {
            curArg = conversions["USVString"](curArg, {
              context: "Failed to construct 'URLSearchParams': parameter 1",
              globals: globalObject
            });
          }
        } else {
          curArg = "";
        }
        args.push(curArg);
      }
      return exports.setup(Object.create(new.target.prototype), globalObject, args);
    }

    append(name, value) {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new globalObject.TypeError(
          "'append' called on an object that is not a valid instance of URLSearchParams."
        );
      }

      if (arguments.length < 2) {
        throw new globalObject.TypeError(
          `Failed to execute 'append' on 'URLSearchParams': 2 arguments required, but only ${arguments.length} present.`
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        curArg = conversions["USVString"](curArg, {
          context: "Failed to execute 'append' on 'URLSearchParams': parameter 1",
          globals: globalObject
        });
        args.push(curArg);
      }
      {
        let curArg = arguments[1];
        curArg = conversions["USVString"](curArg, {
          context: "Failed to execute 'append' on 'URLSearchParams': parameter 2",
          globals: globalObject
        });
        args.push(curArg);
      }
      return utils.tryWrapperForImpl(esValue[implSymbol].append(...args));
    }

    delete(name) {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new globalObject.TypeError(
          "'delete' called on an object that is not a valid instance of URLSearchParams."
        );
      }

      if (arguments.length < 1) {
        throw new globalObject.TypeError(
          `Failed to execute 'delete' on 'URLSearchParams': 1 argument required, but only ${arguments.length} present.`
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        curArg = conversions["USVString"](curArg, {
          context: "Failed to execute 'delete' on 'URLSearchParams': parameter 1",
          globals: globalObject
        });
        args.push(curArg);
      }
      {
        let curArg = arguments[1];
        if (curArg !== undefined) {
          curArg = conversions["USVString"](curArg, {
            context: "Failed to execute 'delete' on 'URLSearchParams': parameter 2",
            globals: globalObject
          });
        }
        args.push(curArg);
      }
      return utils.tryWrapperForImpl(esValue[implSymbol].delete(...args));
    }

    get(name) {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new globalObject.TypeError("'get' called on an object that is not a valid instance of URLSearchParams.");
      }

      if (arguments.length < 1) {
        throw new globalObject.TypeError(
          `Failed to execute 'get' on 'URLSearchParams': 1 argument required, but only ${arguments.length} present.`
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        curArg = conversions["USVString"](curArg, {
          context: "Failed to execute 'get' on 'URLSearchParams': parameter 1",
          globals: globalObject
        });
        args.push(curArg);
      }
      return esValue[implSymbol].get(...args);
    }

    getAll(name) {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new globalObject.TypeError(
          "'getAll' called on an object that is not a valid instance of URLSearchParams."
        );
      }

      if (arguments.length < 1) {
        throw new globalObject.TypeError(
          `Failed to execute 'getAll' on 'URLSearchParams': 1 argument required, but only ${arguments.length} present.`
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        curArg = conversions["USVString"](curArg, {
          context: "Failed to execute 'getAll' on 'URLSearchParams': parameter 1",
          globals: globalObject
        });
        args.push(curArg);
      }
      return utils.tryWrapperForImpl(esValue[implSymbol].getAll(...args));
    }

    has(name) {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new globalObject.TypeError("'has' called on an object that is not a valid instance of URLSearchParams.");
      }

      if (arguments.length < 1) {
        throw new globalObject.TypeError(
          `Failed to execute 'has' on 'URLSearchParams': 1 argument required, but only ${arguments.length} present.`
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        curArg = conversions["USVString"](curArg, {
          context: "Failed to execute 'has' on 'URLSearchParams': parameter 1",
          globals: globalObject
        });
        args.push(curArg);
      }
      {
        let curArg = arguments[1];
        if (curArg !== undefined) {
          curArg = conversions["USVString"](curArg, {
            context: "Failed to execute 'has' on 'URLSearchParams': parameter 2",
            globals: globalObject
          });
        }
        args.push(curArg);
      }
      return esValue[implSymbol].has(...args);
    }

    set(name, value) {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new globalObject.TypeError("'set' called on an object that is not a valid instance of URLSearchParams.");
      }

      if (arguments.length < 2) {
        throw new globalObject.TypeError(
          `Failed to execute 'set' on 'URLSearchParams': 2 arguments required, but only ${arguments.length} present.`
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        curArg = conversions["USVString"](curArg, {
          context: "Failed to execute 'set' on 'URLSearchParams': parameter 1",
          globals: globalObject
        });
        args.push(curArg);
      }
      {
        let curArg = arguments[1];
        curArg = conversions["USVString"](curArg, {
          context: "Failed to execute 'set' on 'URLSearchParams': parameter 2",
          globals: globalObject
        });
        args.push(curArg);
      }
      return utils.tryWrapperForImpl(esValue[implSymbol].set(...args));
    }

    sort() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new globalObject.TypeError("'sort' called on an object that is not a valid instance of URLSearchParams.");
      }

      return utils.tryWrapperForImpl(esValue[implSymbol].sort());
    }

    toString() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new globalObject.TypeError(
          "'toString' called on an object that is not a valid instance of URLSearchParams."
        );
      }

      return esValue[implSymbol].toString();
    }

    keys() {
      if (!exports.is(this)) {
        throw new globalObject.TypeError("'keys' called on an object that is not a valid instance of URLSearchParams.");
      }
      return exports.createDefaultIterator(globalObject, this, "key");
    }

    values() {
      if (!exports.is(this)) {
        throw new globalObject.TypeError(
          "'values' called on an object that is not a valid instance of URLSearchParams."
        );
      }
      return exports.createDefaultIterator(globalObject, this, "value");
    }

    entries() {
      if (!exports.is(this)) {
        throw new globalObject.TypeError(
          "'entries' called on an object that is not a valid instance of URLSearchParams."
        );
      }
      return exports.createDefaultIterator(globalObject, this, "key+value");
    }

    forEach(callback) {
      if (!exports.is(this)) {
        throw new globalObject.TypeError(
          "'forEach' called on an object that is not a valid instance of URLSearchParams."
        );
      }
      if (arguments.length < 1) {
        throw new globalObject.TypeError(
          "Failed to execute 'forEach' on 'iterable': 1 argument required, but only 0 present."
        );
      }
      callback = Function.convert(globalObject, callback, {
        context: "Failed to execute 'forEach' on 'iterable': The callback provided as parameter 1"
      });
      const thisArg = arguments[1];
      let pairs = Array.from(this[implSymbol]);
      let i = 0;
      while (i < pairs.length) {
        const [key, value] = pairs[i].map(utils.tryWrapperForImpl);
        callback.call(thisArg, value, key, this);
        pairs = Array.from(this[implSymbol]);
        i++;
      }
    }

    get size() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError(
          "'get size' called on an object that is not a valid instance of URLSearchParams."
        );
      }

      return esValue[implSymbol]["size"];
    }
  }
  Object.defineProperties(URLSearchParams.prototype, {
    append: { enumerable: true },
    delete: { enumerable: true },
    get: { enumerable: true },
    getAll: { enumerable: true },
    has: { enumerable: true },
    set: { enumerable: true },
    sort: { enumerable: true },
    toString: { enumerable: true },
    keys: { enumerable: true },
    values: { enumerable: true },
    entries: { enumerable: true },
    forEach: { enumerable: true },
    size: { enumerable: true },
    [Symbol.toStringTag]: { value: "URLSearchParams", configurable: true },
    [Symbol.iterator]: { value: URLSearchParams.prototype.entries, configurable: true, writable: true }
  });
  ctorRegistry[interfaceName] = URLSearchParams;

  ctorRegistry["URLSearchParams Iterator"] = Object.create(ctorRegistry["%IteratorPrototype%"], {
    [Symbol.toStringTag]: {
      configurable: true,
      value: "URLSearchParams Iterator"
    }
  });
  utils.define(ctorRegistry["URLSearchParams Iterator"], {
    next() {
      const internal = this && this[utils.iterInternalSymbol];
      if (!internal) {
        throw new globalObject.TypeError("next() called on a value that is not a URLSearchParams iterator object");
      }

      const { target, kind, index } = internal;
      const values = Array.from(target[implSymbol]);
      const len = values.length;
      if (index >= len) {
        return newObjectInRealm(globalObject, { value: undefined, done: true });
      }

      const pair = values[index];
      internal.index = index + 1;
      return newObjectInRealm(globalObject, utils.iteratorResult(pair.map(utils.tryWrapperForImpl), kind));
    }
  });

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: URLSearchParams
  });
};

const Impl = __webpack_require__(549);


/***/ }),

/***/ 817:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const conversions = __webpack_require__(616);
const utils = __webpack_require__(892);

exports.convert = (globalObject, value, { context = "The provided value" } = {}) => {
  if (typeof value !== "function") {
    throw new globalObject.TypeError(context + " is not a function");
  }

  function invokeTheCallbackFunction(...args) {
    const thisArg = utils.tryWrapperForImpl(this);
    let callResult;

    for (let i = 0; i < args.length; i++) {
      args[i] = utils.tryWrapperForImpl(args[i]);
    }

    callResult = Reflect.apply(value, thisArg, args);

    callResult = conversions["any"](callResult, { context: context, globals: globalObject });

    return callResult;
  }

  invokeTheCallbackFunction.construct = (...args) => {
    for (let i = 0; i < args.length; i++) {
      args[i] = utils.tryWrapperForImpl(args[i]);
    }

    let callResult = Reflect.construct(value, args);

    callResult = conversions["any"](callResult, { context: context, globals: globalObject });

    return callResult;
  };

  invokeTheCallbackFunction[utils.wrapperSymbol] = value;
  invokeTheCallbackFunction.objectReference = value;

  return invokeTheCallbackFunction;
};


/***/ }),

/***/ 818:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 * Error format
 *
 * {@link https://postgrest.org/en/stable/api.html?highlight=options#errors-and-http-status-codes}
 */
class PostgrestError extends Error {
    constructor(context) {
        super(context.message);
        this.name = 'PostgrestError';
        this.details = context.details;
        this.hint = context.hint;
        this.code = context.code;
    }
}
exports["default"] = PostgrestError;
//# sourceMappingURL=PostgrestError.js.map

/***/ }),

/***/ 825:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const PostgrestTransformBuilder_1 = __importDefault(__webpack_require__(261));
class PostgrestFilterBuilder extends PostgrestTransformBuilder_1.default {
    /**
     * Match only rows where `column` is equal to `value`.
     *
     * To check if the value of `column` is NULL, you should use `.is()` instead.
     *
     * @param column - The column to filter on
     * @param value - The value to filter with
     */
    eq(column, value) {
        this.url.searchParams.append(column, `eq.${value}`);
        return this;
    }
    /**
     * Match only rows where `column` is not equal to `value`.
     *
     * @param column - The column to filter on
     * @param value - The value to filter with
     */
    neq(column, value) {
        this.url.searchParams.append(column, `neq.${value}`);
        return this;
    }
    /**
     * Match only rows where `column` is greater than `value`.
     *
     * @param column - The column to filter on
     * @param value - The value to filter with
     */
    gt(column, value) {
        this.url.searchParams.append(column, `gt.${value}`);
        return this;
    }
    /**
     * Match only rows where `column` is greater than or equal to `value`.
     *
     * @param column - The column to filter on
     * @param value - The value to filter with
     */
    gte(column, value) {
        this.url.searchParams.append(column, `gte.${value}`);
        return this;
    }
    /**
     * Match only rows where `column` is less than `value`.
     *
     * @param column - The column to filter on
     * @param value - The value to filter with
     */
    lt(column, value) {
        this.url.searchParams.append(column, `lt.${value}`);
        return this;
    }
    /**
     * Match only rows where `column` is less than or equal to `value`.
     *
     * @param column - The column to filter on
     * @param value - The value to filter with
     */
    lte(column, value) {
        this.url.searchParams.append(column, `lte.${value}`);
        return this;
    }
    /**
     * Match only rows where `column` matches `pattern` case-sensitively.
     *
     * @param column - The column to filter on
     * @param pattern - The pattern to match with
     */
    like(column, pattern) {
        this.url.searchParams.append(column, `like.${pattern}`);
        return this;
    }
    /**
     * Match only rows where `column` matches all of `patterns` case-sensitively.
     *
     * @param column - The column to filter on
     * @param patterns - The patterns to match with
     */
    likeAllOf(column, patterns) {
        this.url.searchParams.append(column, `like(all).{${patterns.join(',')}}`);
        return this;
    }
    /**
     * Match only rows where `column` matches any of `patterns` case-sensitively.
     *
     * @param column - The column to filter on
     * @param patterns - The patterns to match with
     */
    likeAnyOf(column, patterns) {
        this.url.searchParams.append(column, `like(any).{${patterns.join(',')}}`);
        return this;
    }
    /**
     * Match only rows where `column` matches `pattern` case-insensitively.
     *
     * @param column - The column to filter on
     * @param pattern - The pattern to match with
     */
    ilike(column, pattern) {
        this.url.searchParams.append(column, `ilike.${pattern}`);
        return this;
    }
    /**
     * Match only rows where `column` matches all of `patterns` case-insensitively.
     *
     * @param column - The column to filter on
     * @param patterns - The patterns to match with
     */
    ilikeAllOf(column, patterns) {
        this.url.searchParams.append(column, `ilike(all).{${patterns.join(',')}}`);
        return this;
    }
    /**
     * Match only rows where `column` matches any of `patterns` case-insensitively.
     *
     * @param column - The column to filter on
     * @param patterns - The patterns to match with
     */
    ilikeAnyOf(column, patterns) {
        this.url.searchParams.append(column, `ilike(any).{${patterns.join(',')}}`);
        return this;
    }
    /**
     * Match only rows where `column` IS `value`.
     *
     * For non-boolean columns, this is only relevant for checking if the value of
     * `column` is NULL by setting `value` to `null`.
     *
     * For boolean columns, you can also set `value` to `true` or `false` and it
     * will behave the same way as `.eq()`.
     *
     * @param column - The column to filter on
     * @param value - The value to filter with
     */
    is(column, value) {
        this.url.searchParams.append(column, `is.${value}`);
        return this;
    }
    /**
     * Match only rows where `column` is included in the `values` array.
     *
     * @param column - The column to filter on
     * @param values - The values array to filter with
     */
    in(column, values) {
        const cleanedValues = Array.from(new Set(values))
            .map((s) => {
            // handle postgrest reserved characters
            // https://postgrest.org/en/v7.0.0/api.html#reserved-characters
            if (typeof s === 'string' && new RegExp('[,()]').test(s))
                return `"${s}"`;
            else
                return `${s}`;
        })
            .join(',');
        this.url.searchParams.append(column, `in.(${cleanedValues})`);
        return this;
    }
    /**
     * Only relevant for jsonb, array, and range columns. Match only rows where
     * `column` contains every element appearing in `value`.
     *
     * @param column - The jsonb, array, or range column to filter on
     * @param value - The jsonb, array, or range value to filter with
     */
    contains(column, value) {
        if (typeof value === 'string') {
            // range types can be inclusive '[', ']' or exclusive '(', ')' so just
            // keep it simple and accept a string
            this.url.searchParams.append(column, `cs.${value}`);
        }
        else if (Array.isArray(value)) {
            // array
            this.url.searchParams.append(column, `cs.{${value.join(',')}}`);
        }
        else {
            // json
            this.url.searchParams.append(column, `cs.${JSON.stringify(value)}`);
        }
        return this;
    }
    /**
     * Only relevant for jsonb, array, and range columns. Match only rows where
     * every element appearing in `column` is contained by `value`.
     *
     * @param column - The jsonb, array, or range column to filter on
     * @param value - The jsonb, array, or range value to filter with
     */
    containedBy(column, value) {
        if (typeof value === 'string') {
            // range
            this.url.searchParams.append(column, `cd.${value}`);
        }
        else if (Array.isArray(value)) {
            // array
            this.url.searchParams.append(column, `cd.{${value.join(',')}}`);
        }
        else {
            // json
            this.url.searchParams.append(column, `cd.${JSON.stringify(value)}`);
        }
        return this;
    }
    /**
     * Only relevant for range columns. Match only rows where every element in
     * `column` is greater than any element in `range`.
     *
     * @param column - The range column to filter on
     * @param range - The range to filter with
     */
    rangeGt(column, range) {
        this.url.searchParams.append(column, `sr.${range}`);
        return this;
    }
    /**
     * Only relevant for range columns. Match only rows where every element in
     * `column` is either contained in `range` or greater than any element in
     * `range`.
     *
     * @param column - The range column to filter on
     * @param range - The range to filter with
     */
    rangeGte(column, range) {
        this.url.searchParams.append(column, `nxl.${range}`);
        return this;
    }
    /**
     * Only relevant for range columns. Match only rows where every element in
     * `column` is less than any element in `range`.
     *
     * @param column - The range column to filter on
     * @param range - The range to filter with
     */
    rangeLt(column, range) {
        this.url.searchParams.append(column, `sl.${range}`);
        return this;
    }
    /**
     * Only relevant for range columns. Match only rows where every element in
     * `column` is either contained in `range` or less than any element in
     * `range`.
     *
     * @param column - The range column to filter on
     * @param range - The range to filter with
     */
    rangeLte(column, range) {
        this.url.searchParams.append(column, `nxr.${range}`);
        return this;
    }
    /**
     * Only relevant for range columns. Match only rows where `column` is
     * mutually exclusive to `range` and there can be no element between the two
     * ranges.
     *
     * @param column - The range column to filter on
     * @param range - The range to filter with
     */
    rangeAdjacent(column, range) {
        this.url.searchParams.append(column, `adj.${range}`);
        return this;
    }
    /**
     * Only relevant for array and range columns. Match only rows where
     * `column` and `value` have an element in common.
     *
     * @param column - The array or range column to filter on
     * @param value - The array or range value to filter with
     */
    overlaps(column, value) {
        if (typeof value === 'string') {
            // range
            this.url.searchParams.append(column, `ov.${value}`);
        }
        else {
            // array
            this.url.searchParams.append(column, `ov.{${value.join(',')}}`);
        }
        return this;
    }
    /**
     * Only relevant for text and tsvector columns. Match only rows where
     * `column` matches the query string in `query`.
     *
     * @param column - The text or tsvector column to filter on
     * @param query - The query text to match with
     * @param options - Named parameters
     * @param options.config - The text search configuration to use
     * @param options.type - Change how the `query` text is interpreted
     */
    textSearch(column, query, { config, type } = {}) {
        let typePart = '';
        if (type === 'plain') {
            typePart = 'pl';
        }
        else if (type === 'phrase') {
            typePart = 'ph';
        }
        else if (type === 'websearch') {
            typePart = 'w';
        }
        const configPart = config === undefined ? '' : `(${config})`;
        this.url.searchParams.append(column, `${typePart}fts${configPart}.${query}`);
        return this;
    }
    /**
     * Match only rows where each column in `query` keys is equal to its
     * associated value. Shorthand for multiple `.eq()`s.
     *
     * @param query - The object to filter with, with column names as keys mapped
     * to their filter values
     */
    match(query) {
        Object.entries(query).forEach(([column, value]) => {
            this.url.searchParams.append(column, `eq.${value}`);
        });
        return this;
    }
    /**
     * Match only rows which doesn't satisfy the filter.
     *
     * Unlike most filters, `opearator` and `value` are used as-is and need to
     * follow [PostgREST
     * syntax](https://postgrest.org/en/stable/api.html#operators). You also need
     * to make sure they are properly sanitized.
     *
     * @param column - The column to filter on
     * @param operator - The operator to be negated to filter with, following
     * PostgREST syntax
     * @param value - The value to filter with, following PostgREST syntax
     */
    not(column, operator, value) {
        this.url.searchParams.append(column, `not.${operator}.${value}`);
        return this;
    }
    /**
     * Match only rows which satisfy at least one of the filters.
     *
     * Unlike most filters, `filters` is used as-is and needs to follow [PostgREST
     * syntax](https://postgrest.org/en/stable/api.html#operators). You also need
     * to make sure it's properly sanitized.
     *
     * It's currently not possible to do an `.or()` filter across multiple tables.
     *
     * @param filters - The filters to use, following PostgREST syntax
     * @param options - Named parameters
     * @param options.referencedTable - Set this to filter on referenced tables
     * instead of the parent table
     * @param options.foreignTable - Deprecated, use `referencedTable` instead
     */
    or(filters, { foreignTable, referencedTable = foreignTable, } = {}) {
        const key = referencedTable ? `${referencedTable}.or` : 'or';
        this.url.searchParams.append(key, `(${filters})`);
        return this;
    }
    /**
     * Match only rows which satisfy the filter. This is an escape hatch - you
     * should use the specific filter methods wherever possible.
     *
     * Unlike most filters, `opearator` and `value` are used as-is and need to
     * follow [PostgREST
     * syntax](https://postgrest.org/en/stable/api.html#operators). You also need
     * to make sure they are properly sanitized.
     *
     * @param column - The column to filter on
     * @param operator - The operator to filter with, following PostgREST syntax
     * @param value - The value to filter with, following PostgREST syntax
     */
    filter(column, operator, value) {
        this.url.searchParams.append(column, `${operator}.${value}`);
        return this;
    }
}
exports["default"] = PostgrestFilterBuilder;
//# sourceMappingURL=PostgrestFilterBuilder.js.map

/***/ }),

/***/ 833:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const { URL, URLSearchParams } = __webpack_require__(181);
const urlStateMachine = __webpack_require__(484);
const percentEncoding = __webpack_require__(656);

const sharedGlobalObject = { Array, Object, Promise, String, TypeError };
URL.install(sharedGlobalObject, ["Window"]);
URLSearchParams.install(sharedGlobalObject, ["Window"]);

exports.URL = sharedGlobalObject.URL;
exports.URLSearchParams = sharedGlobalObject.URLSearchParams;

exports.parseURL = urlStateMachine.parseURL;
exports.basicURLParse = urlStateMachine.basicURLParse;
exports.serializeURL = urlStateMachine.serializeURL;
exports.serializePath = urlStateMachine.serializePath;
exports.serializeHost = urlStateMachine.serializeHost;
exports.serializeInteger = urlStateMachine.serializeInteger;
exports.serializeURLOrigin = urlStateMachine.serializeURLOrigin;
exports.setTheUsername = urlStateMachine.setTheUsername;
exports.setThePassword = urlStateMachine.setThePassword;
exports.cannotHaveAUsernamePasswordPort = urlStateMachine.cannotHaveAUsernamePasswordPort;
exports.hasAnOpaquePath = urlStateMachine.hasAnOpaquePath;

exports.percentDecodeString = percentEncoding.percentDecodeString;
exports.percentDecodeBytes = percentEncoding.percentDecodeBytes;


/***/ }),

/***/ 878:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Request = void 0;
const Headers_1 = __webpack_require__(409);
const OriginalRequest = globalThis.Request;
class Request {
    constructor(input, init) {
        this._bodyUsed = false;
        if (typeof input === 'string') {
            this._url = input;
        }
        else if (input instanceof Request) {
            this._url = input.url;
            this._method = input.method;
            this._headers = new Headers_1.Headers(input.headers);
            this._body = input._body;
            this._cache = input.cache;
            this._credentials = input.credentials;
            this._destination = input.destination;
            this._integrity = input.integrity;
            this._keepalive = input.keepalive;
            this._mode = input.mode;
            this._redirect = input.redirect;
            this._referrer = input.referrer;
            this._referrerPolicy = input.referrerPolicy;
            this._signal = input.signal;
        }
        else {
            throw new TypeError('Invalid input type for Request constructor');
        }
        if (init) {
            if (init.method !== undefined) {
                this._method = init.method.toUpperCase();
            }
            if (init.headers !== undefined) {
                this._headers = new Headers_1.Headers(init.headers);
            }
            if (init.body !== undefined) {
                this._body = init.body;
            }
            if (init.cache !== undefined) {
                this._cache = init.cache;
            }
            if (init.credentials !== undefined) {
                this._credentials = init.credentials;
            }
            if (init.integrity !== undefined) {
                this._integrity = init.integrity;
            }
            if (init.keepalive !== undefined) {
                this._keepalive = init.keepalive;
            }
            if (init.mode !== undefined) {
                this._mode = init.mode;
            }
            if (init.redirect !== undefined) {
                this._redirect = init.redirect;
            }
            if (init.referrer !== undefined) {
                this._referrer = init.referrer;
            }
            if (init.referrerPolicy !== undefined) {
                this._referrerPolicy = init.referrerPolicy;
            }
            if (init.signal !== undefined) {
                this._signal = init.signal;
            }
        }
        if (!input || typeof input === 'string') {
            this._method = this._method || 'GET';
            this._headers = this._headers || new Headers_1.Headers();
            this._body = this._body || null;
            this._cache = this._cache || 'default';
            this._credentials = this._credentials || 'same-origin';
            this._destination = this._destination || '';
            this._integrity = this._integrity || '';
            this._keepalive = this._keepalive || false;
            this._mode = this._mode || 'cors';
            this._redirect = this._redirect || 'follow';
            this._referrer = this._referrer || 'about:client';
            this._referrerPolicy = this._referrerPolicy || '';
            this._signal = this._signal || null;
        }
        if (!['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'CONNECT', 'OPTIONS', 'TRACE', 'PATCH'].includes(this._method)) {
            throw new TypeError(`Invalid request method: ${this._method}`);
        }
        if ((this._method === 'GET' || this._method === 'HEAD') && this._body !== null) {
            throw new TypeError('Request with GET/HEAD method cannot have body');
        }
    }
    get url() {
        return this._url;
    }
    get method() {
        return this._method;
    }
    get headers() {
        return this._headers;
    }
    get body() {
        return null;
    }
    get bodyUsed() {
        return this._bodyUsed;
    }
    get cache() {
        return this._cache;
    }
    get credentials() {
        return this._credentials;
    }
    get destination() {
        return this._destination;
    }
    get integrity() {
        return this._integrity;
    }
    get keepalive() {
        return this._keepalive;
    }
    get mode() {
        return this._mode;
    }
    get redirect() {
        return this._redirect;
    }
    get referrer() {
        return this._referrer;
    }
    get referrerPolicy() {
        return this._referrerPolicy;
    }
    get signal() {
        return this._signal;
    }
    async arrayBuffer() {
        if (this._bodyUsed) {
            throw new TypeError('Body has already been consumed');
        }
        this._bodyUsed = true;
        if (this._body === null) {
            return new ArrayBuffer(0);
        }
        if (typeof this._body === 'string') {
            const encoder = new TextEncoder();
            return encoder.encode(this._body).buffer;
        }
        if (this._body instanceof ArrayBuffer) {
            return this._body;
        }
        if (this._body instanceof Uint8Array) {
            return this._body.buffer;
        }
        const text = String(this._body);
        const encoder = new TextEncoder();
        return encoder.encode(text).buffer;
    }
    async blob() {
        if (this._bodyUsed) {
            throw new TypeError('Body has already been consumed');
        }
        this._bodyUsed = true;
        if (this._body === null) {
            return new globalThis.Blob([]);
        }
        if (this._body instanceof Blob) {
            return this._body;
        }
        const arrayBuffer = await this.arrayBuffer();
        this._bodyUsed = false;
        this._bodyUsed = true;
        return new globalThis.Blob([arrayBuffer]);
    }
    async bytes() {
        const arrayBuffer = await this.arrayBuffer();
        return new Uint8Array(arrayBuffer);
    }
    async formData() {
        if (this._bodyUsed) {
            throw new TypeError('Body has already been consumed');
        }
        this._bodyUsed = true;
        // @ts-ignore
        if (this._body instanceof FormData) {
            return this._body;
        }
        throw new TypeError('FormData parsing not supported in this environment');
    }
    async json() {
        const text = await this.text();
        return JSON.parse(text);
    }
    async text() {
        if (this._bodyUsed) {
            throw new TypeError('Body has already been consumed');
        }
        this._bodyUsed = true;
        if (this._body === null) {
            return '';
        }
        if (typeof this._body === 'string') {
            return this._body;
        }
        if (this._body instanceof ArrayBuffer) {
            const decoder = new TextDecoder();
            return decoder.decode(new Uint8Array(this._body));
        }
        if (this._body instanceof Uint8Array) {
            const decoder = new TextDecoder();
            return decoder.decode(this._body);
        }
        return String(this._body);
    }
    clone() {
        if (this._bodyUsed) {
            throw new TypeError('Cannot clone a Request whose body has been used');
        }
        const cloned = new Request(this._url);
        cloned._method = this._method;
        cloned._headers = new Headers_1.Headers(this._headers);
        cloned._body = this._body;
        cloned._cache = this._cache;
        cloned._credentials = this._credentials;
        cloned._destination = this._destination;
        cloned._integrity = this._integrity;
        cloned._keepalive = this._keepalive;
        cloned._mode = this._mode;
        cloned._redirect = this._redirect;
        cloned._referrer = this._referrer;
        cloned._referrerPolicy = this._referrerPolicy;
        cloned._signal = this._signal;
        return cloned;
    }
    toLensStudioRequest() {
        if (!OriginalRequest) {
            throw new Error('Lens Studio Request class is not available');
        }
        const lsHeaders = this._headers.toLensStudioHeaders();
        const options = {
            method: this._method,
            headers: lsHeaders
        };
        if (this._body !== null && this._method !== 'GET' && this._method !== 'HEAD') {
            if (typeof this._body === 'string') {
                options.body = this._body;
            }
            else if (this._body instanceof ArrayBuffer) {
                const decoder = new TextDecoder();
                options.body = decoder.decode(new Uint8Array(this._body));
            }
            else if (this._body instanceof Uint8Array) {
                options.body = this._body;
            }
            else {
                options.body = String(this._body);
            }
        }
        if (this._redirect !== 'follow') {
            options.redirect = this._redirect;
        }
        if (this._keepalive) {
            options.keepalive = this._keepalive;
        }
        return new OriginalRequest(this._url, options);
    }
    static fromLensStudioRequest(lsRequest) {
        if (!lsRequest) {
            throw new TypeError('Invalid Lens Studio Request object');
        }
        const init = {
            method: lsRequest.method || 'GET',
            headers: Headers_1.Headers.fromLensStudioHeaders(lsRequest.headers),
            redirect: lsRequest.redirect || 'follow'
        };
        return new Request(lsRequest.url, init);
    }
}
exports.Request = Request;
if (typeof globalThis !== 'undefined') {
    globalThis.Request = Request;
}


/***/ }),

/***/ 890:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  AuthAdminApi: () => (/* reexport */ module_AuthAdminApi),
  AuthApiError: () => (/* reexport */ AuthApiError),
  AuthClient: () => (/* reexport */ module_AuthClient),
  AuthError: () => (/* reexport */ AuthError),
  AuthImplicitGrantRedirectError: () => (/* reexport */ AuthImplicitGrantRedirectError),
  AuthInvalidCredentialsError: () => (/* reexport */ AuthInvalidCredentialsError),
  AuthInvalidJwtError: () => (/* reexport */ AuthInvalidJwtError),
  AuthInvalidTokenResponseError: () => (/* reexport */ AuthInvalidTokenResponseError),
  AuthPKCEGrantCodeExchangeError: () => (/* reexport */ AuthPKCEGrantCodeExchangeError),
  AuthRetryableFetchError: () => (/* reexport */ AuthRetryableFetchError),
  AuthSessionMissingError: () => (/* reexport */ AuthSessionMissingError),
  AuthUnknownError: () => (/* reexport */ AuthUnknownError),
  AuthWeakPasswordError: () => (/* reexport */ AuthWeakPasswordError),
  CustomAuthError: () => (/* reexport */ CustomAuthError),
  FunctionRegion: () => (/* reexport */ FunctionRegion),
  FunctionsError: () => (/* reexport */ FunctionsError),
  FunctionsFetchError: () => (/* reexport */ FunctionsFetchError),
  FunctionsHttpError: () => (/* reexport */ FunctionsHttpError),
  FunctionsRelayError: () => (/* reexport */ FunctionsRelayError),
  GoTrueAdminApi: () => (/* reexport */ GoTrueAdminApi),
  GoTrueClient: () => (/* reexport */ GoTrueClient),
  NavigatorLockAcquireTimeoutError: () => (/* reexport */ NavigatorLockAcquireTimeoutError),
  PostgrestError: () => (/* reexport */ PostgrestError),
  REALTIME_CHANNEL_STATES: () => (/* reexport */ REALTIME_CHANNEL_STATES),
  REALTIME_LISTEN_TYPES: () => (/* reexport */ REALTIME_LISTEN_TYPES),
  REALTIME_POSTGRES_CHANGES_LISTEN_EVENT: () => (/* reexport */ REALTIME_POSTGRES_CHANGES_LISTEN_EVENT),
  REALTIME_PRESENCE_LISTEN_EVENTS: () => (/* reexport */ REALTIME_PRESENCE_LISTEN_EVENTS),
  REALTIME_SUBSCRIBE_STATES: () => (/* reexport */ REALTIME_SUBSCRIBE_STATES),
  RealtimeChannel: () => (/* reexport */ RealtimeChannel),
  RealtimeClient: () => (/* reexport */ RealtimeClient),
  RealtimePresence: () => (/* reexport */ RealtimePresence),
  SIGN_OUT_SCOPES: () => (/* reexport */ SIGN_OUT_SCOPES),
  SupabaseClient: () => (/* reexport */ SupabaseClient),
  WebSocketFactory: () => (/* reexport */ websocket_factory),
  createClient: () => (/* binding */ createClient),
  isAuthApiError: () => (/* reexport */ isAuthApiError),
  isAuthError: () => (/* reexport */ isAuthError),
  isAuthImplicitGrantRedirectError: () => (/* reexport */ isAuthImplicitGrantRedirectError),
  isAuthRetryableFetchError: () => (/* reexport */ isAuthRetryableFetchError),
  isAuthSessionMissingError: () => (/* reexport */ isAuthSessionMissingError),
  isAuthWeakPasswordError: () => (/* reexport */ isAuthWeakPasswordError),
  lockInternals: () => (/* reexport */ internals),
  navigatorLock: () => (/* reexport */ navigatorLock),
  processLock: () => (/* reexport */ processLock)
});

;// ./node_modules/@supabase/functions-js/dist/module/helper.js
const resolveFetch = (customFetch) => {
    let _fetch;
    if (customFetch) {
        _fetch = customFetch;
    }
    else if (typeof fetch === 'undefined') {
        _fetch = (...args) => Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 907)).then(({ default: fetch }) => fetch(...args));
    }
    else {
        _fetch = fetch;
    }
    return (...args) => _fetch(...args);
};
//# sourceMappingURL=helper.js.map
;// ./node_modules/@supabase/functions-js/dist/module/types.js
class FunctionsError extends Error {
    constructor(message, name = 'FunctionsError', context) {
        super(message);
        this.name = name;
        this.context = context;
    }
}
class FunctionsFetchError extends FunctionsError {
    constructor(context) {
        super('Failed to send a request to the Edge Function', 'FunctionsFetchError', context);
    }
}
class FunctionsRelayError extends FunctionsError {
    constructor(context) {
        super('Relay Error invoking the Edge Function', 'FunctionsRelayError', context);
    }
}
class FunctionsHttpError extends FunctionsError {
    constructor(context) {
        super('Edge Function returned a non-2xx status code', 'FunctionsHttpError', context);
    }
}
// Define the enum for the 'region' property
var FunctionRegion;
(function (FunctionRegion) {
    FunctionRegion["Any"] = "any";
    FunctionRegion["ApNortheast1"] = "ap-northeast-1";
    FunctionRegion["ApNortheast2"] = "ap-northeast-2";
    FunctionRegion["ApSouth1"] = "ap-south-1";
    FunctionRegion["ApSoutheast1"] = "ap-southeast-1";
    FunctionRegion["ApSoutheast2"] = "ap-southeast-2";
    FunctionRegion["CaCentral1"] = "ca-central-1";
    FunctionRegion["EuCentral1"] = "eu-central-1";
    FunctionRegion["EuWest1"] = "eu-west-1";
    FunctionRegion["EuWest2"] = "eu-west-2";
    FunctionRegion["EuWest3"] = "eu-west-3";
    FunctionRegion["SaEast1"] = "sa-east-1";
    FunctionRegion["UsEast1"] = "us-east-1";
    FunctionRegion["UsWest1"] = "us-west-1";
    FunctionRegion["UsWest2"] = "us-west-2";
})(FunctionRegion || (FunctionRegion = {}));
//# sourceMappingURL=types.js.map
;// ./node_modules/@supabase/functions-js/dist/module/FunctionsClient.js
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


class FunctionsClient {
    constructor(url, { headers = {}, customFetch, region = FunctionRegion.Any, } = {}) {
        this.url = url;
        this.headers = headers;
        this.region = region;
        this.fetch = resolveFetch(customFetch);
    }
    /**
     * Updates the authorization header
     * @param token - the new jwt token sent in the authorisation header
     */
    setAuth(token) {
        this.headers.Authorization = `Bearer ${token}`;
    }
    /**
     * Invokes a function
     * @param functionName - The name of the Function to invoke.
     * @param options - Options for invoking the Function.
     */
    invoke(functionName, options = {}) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { headers, method, body: functionArgs, signal } = options;
                let _headers = {};
                let { region } = options;
                if (!region) {
                    region = this.region;
                }
                // Add region as query parameter using URL API
                const url = new URL(`${this.url}/${functionName}`);
                if (region && region !== 'any') {
                    _headers['x-region'] = region;
                    url.searchParams.set('forceFunctionRegion', region);
                }
                let body;
                if (functionArgs &&
                    ((headers && !Object.prototype.hasOwnProperty.call(headers, 'Content-Type')) || !headers)) {
                    if ((typeof Blob !== 'undefined' && functionArgs instanceof Blob) ||
                        functionArgs instanceof ArrayBuffer) {
                        // will work for File as File inherits Blob
                        // also works for ArrayBuffer as it is the same underlying structure as a Blob
                        _headers['Content-Type'] = 'application/octet-stream';
                        body = functionArgs;
                    }
                    else if (typeof functionArgs === 'string') {
                        // plain string
                        _headers['Content-Type'] = 'text/plain';
                        body = functionArgs;
                    }
                    else if (typeof FormData !== 'undefined' && functionArgs instanceof FormData) {
                        // don't set content-type headers
                        // Request will automatically add the right boundary value
                        body = functionArgs;
                    }
                    else {
                        // default, assume this is JSON
                        _headers['Content-Type'] = 'application/json';
                        body = JSON.stringify(functionArgs);
                    }
                }
                const response = yield this.fetch(url.toString(), {
                    method: method || 'POST',
                    // headers priority is (high to low):
                    // 1. invoke-level headers
                    // 2. client-level headers
                    // 3. default Content-Type header
                    headers: Object.assign(Object.assign(Object.assign({}, _headers), this.headers), headers),
                    body,
                    signal,
                }).catch((fetchError) => {
                    if (fetchError.name === 'AbortError') {
                        throw fetchError;
                    }
                    throw new FunctionsFetchError(fetchError);
                });
                const isRelayError = response.headers.get('x-relay-error');
                if (isRelayError && isRelayError === 'true') {
                    throw new FunctionsRelayError(response);
                }
                if (!response.ok) {
                    throw new FunctionsHttpError(response);
                }
                let responseType = ((_a = response.headers.get('Content-Type')) !== null && _a !== void 0 ? _a : 'text/plain').split(';')[0].trim();
                let data;
                if (responseType === 'application/json') {
                    data = yield response.json();
                }
                else if (responseType === 'application/octet-stream') {
                    data = yield response.blob();
                }
                else if (responseType === 'text/event-stream') {
                    data = response;
                }
                else if (responseType === 'multipart/form-data') {
                    data = yield response.formData();
                }
                else {
                    // default to text
                    data = yield response.text();
                }
                return { data, error: null, response };
            }
            catch (error) {
                if (error instanceof Error && error.name === 'AbortError') {
                    return { data: null, error: new FunctionsFetchError(error) };
                }
                return {
                    data: null,
                    error,
                    response: error instanceof FunctionsHttpError || error instanceof FunctionsRelayError
                        ? error.context
                        : undefined,
                };
            }
        });
    }
}
//# sourceMappingURL=FunctionsClient.js.map
// EXTERNAL MODULE: ./node_modules/@supabase/postgrest-js/dist/cjs/index.js
var cjs = __webpack_require__(279);
;// ./node_modules/@supabase/postgrest-js/dist/esm/wrapper.mjs

const {
  PostgrestClient,
  PostgrestQueryBuilder,
  PostgrestFilterBuilder,
  PostgrestTransformBuilder,
  PostgrestBuilder,
  PostgrestError,
} = cjs



// compatibility with CJS output
/* harmony default export */ const wrapper = ({
  PostgrestClient,
  PostgrestQueryBuilder,
  PostgrestFilterBuilder,
  PostgrestTransformBuilder,
  PostgrestBuilder,
  PostgrestError,
});

;// ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
class WebSocketFactory {
    static detectEnvironment() {
        var _a;
        if (typeof WebSocket !== 'undefined') {
            return { type: 'native', constructor: WebSocket };
        }
        if (typeof globalThis !== 'undefined' &&
            typeof globalThis.WebSocket !== 'undefined') {
            return { type: 'native', constructor: globalThis.WebSocket };
        }
        if (typeof __webpack_require__.g !== 'undefined' &&
            typeof __webpack_require__.g.WebSocket !== 'undefined') {
            return { type: 'native', constructor: __webpack_require__.g.WebSocket };
        }
        if (typeof globalThis !== 'undefined' &&
            typeof globalThis.WebSocketPair !== 'undefined' &&
            typeof globalThis.WebSocket === 'undefined') {
            return {
                type: 'cloudflare',
                error: 'Cloudflare Workers detected. WebSocket clients are not supported in Cloudflare Workers.',
                workaround: 'Use Cloudflare Workers WebSocket API for server-side WebSocket handling, or deploy to a different runtime.',
            };
        }
        if ((typeof globalThis !== 'undefined' && globalThis.EdgeRuntime) ||
            (typeof navigator !== 'undefined' &&
                ((_a = navigator.userAgent) === null || _a === void 0 ? void 0 : _a.includes('Vercel-Edge')))) {
            return {
                type: 'unsupported',
                error: 'Edge runtime detected (Vercel Edge/Netlify Edge). WebSockets are not supported in edge functions.',
                workaround: 'Use serverless functions or a different deployment target for WebSocket functionality.',
            };
        }
        if (typeof process !== 'undefined') {
            // Use dynamic property access to avoid Next.js Edge Runtime static analysis warnings
            const processVersions = process['versions'];
            if (processVersions && processVersions['node']) {
                // Remove 'v' prefix if present and parse the major version
                const versionString = processVersions['node'];
                const nodeVersion = parseInt(versionString.replace(/^v/, '').split('.')[0]);
                // Node.js 22+ should have native WebSocket
                if (nodeVersion >= 22) {
                    // Check if native WebSocket is available (should be in Node.js 22+)
                    if (typeof globalThis.WebSocket !== 'undefined') {
                        return { type: 'native', constructor: globalThis.WebSocket };
                    }
                    // If not available, user needs to provide it
                    return {
                        type: 'unsupported',
                        error: `Node.js ${nodeVersion} detected but native WebSocket not found.`,
                        workaround: 'Provide a WebSocket implementation via the transport option.',
                    };
                }
                // Node.js < 22 doesn't have native WebSocket
                return {
                    type: 'unsupported',
                    error: `Node.js ${nodeVersion} detected without native WebSocket support.`,
                    workaround: 'For Node.js < 22, install "ws" package and provide it via the transport option:\n' +
                        'import ws from "ws"\n' +
                        'new RealtimeClient(url, { transport: ws })',
                };
            }
        }
        return {
            type: 'unsupported',
            error: 'Unknown JavaScript runtime without WebSocket support.',
            workaround: "Ensure you're running in a supported environment (browser, Node.js, Deno) or provide a custom WebSocket implementation.",
        };
    }
    static getWebSocketConstructor() {
        const env = this.detectEnvironment();
        if (env.constructor) {
            return env.constructor;
        }
        let errorMessage = env.error || 'WebSocket not supported in this environment.';
        if (env.workaround) {
            errorMessage += `\n\nSuggested solution: ${env.workaround}`;
        }
        throw new Error(errorMessage);
    }
    static createWebSocket(url, protocols) {
        const WS = this.getWebSocketConstructor();
        return new WS(url, protocols);
    }
    static isWebSocketSupported() {
        try {
            const env = this.detectEnvironment();
            return env.type === 'native' || env.type === 'ws';
        }
        catch (_a) {
            return false;
        }
    }
}
/* harmony default export */ const websocket_factory = (WebSocketFactory);
//# sourceMappingURL=websocket-factory.js.map
;// ./node_modules/@supabase/realtime-js/dist/module/lib/version.js
const version_version = '2.15.5';
//# sourceMappingURL=version.js.map
;// ./node_modules/@supabase/realtime-js/dist/module/lib/constants.js

const DEFAULT_VERSION = `realtime-js/${version_version}`;
const VSN = '1.0.0';
const VERSION = (/* unused pure expression or super */ null && (version));
const DEFAULT_TIMEOUT = 10000;
const WS_CLOSE_NORMAL = 1000;
const MAX_PUSH_BUFFER_SIZE = 100;
var SOCKET_STATES;
(function (SOCKET_STATES) {
    SOCKET_STATES[SOCKET_STATES["connecting"] = 0] = "connecting";
    SOCKET_STATES[SOCKET_STATES["open"] = 1] = "open";
    SOCKET_STATES[SOCKET_STATES["closing"] = 2] = "closing";
    SOCKET_STATES[SOCKET_STATES["closed"] = 3] = "closed";
})(SOCKET_STATES || (SOCKET_STATES = {}));
var CHANNEL_STATES;
(function (CHANNEL_STATES) {
    CHANNEL_STATES["closed"] = "closed";
    CHANNEL_STATES["errored"] = "errored";
    CHANNEL_STATES["joined"] = "joined";
    CHANNEL_STATES["joining"] = "joining";
    CHANNEL_STATES["leaving"] = "leaving";
})(CHANNEL_STATES || (CHANNEL_STATES = {}));
var CHANNEL_EVENTS;
(function (CHANNEL_EVENTS) {
    CHANNEL_EVENTS["close"] = "phx_close";
    CHANNEL_EVENTS["error"] = "phx_error";
    CHANNEL_EVENTS["join"] = "phx_join";
    CHANNEL_EVENTS["reply"] = "phx_reply";
    CHANNEL_EVENTS["leave"] = "phx_leave";
    CHANNEL_EVENTS["access_token"] = "access_token";
})(CHANNEL_EVENTS || (CHANNEL_EVENTS = {}));
var TRANSPORTS;
(function (TRANSPORTS) {
    TRANSPORTS["websocket"] = "websocket";
})(TRANSPORTS || (TRANSPORTS = {}));
var CONNECTION_STATE;
(function (CONNECTION_STATE) {
    CONNECTION_STATE["Connecting"] = "connecting";
    CONNECTION_STATE["Open"] = "open";
    CONNECTION_STATE["Closing"] = "closing";
    CONNECTION_STATE["Closed"] = "closed";
})(CONNECTION_STATE || (CONNECTION_STATE = {}));
//# sourceMappingURL=constants.js.map
;// ./node_modules/@supabase/realtime-js/dist/module/lib/serializer.js
// This file draws heavily from https://github.com/phoenixframework/phoenix/commit/cf098e9cf7a44ee6479d31d911a97d3c7430c6fe
// License: https://github.com/phoenixframework/phoenix/blob/master/LICENSE.md
class Serializer {
    constructor() {
        this.HEADER_LENGTH = 1;
    }
    decode(rawPayload, callback) {
        if (rawPayload.constructor === ArrayBuffer) {
            return callback(this._binaryDecode(rawPayload));
        }
        if (typeof rawPayload === 'string') {
            return callback(JSON.parse(rawPayload));
        }
        return callback({});
    }
    _binaryDecode(buffer) {
        const view = new DataView(buffer);
        const decoder = new TextDecoder();
        return this._decodeBroadcast(buffer, view, decoder);
    }
    _decodeBroadcast(buffer, view, decoder) {
        const topicSize = view.getUint8(1);
        const eventSize = view.getUint8(2);
        let offset = this.HEADER_LENGTH + 2;
        const topic = decoder.decode(buffer.slice(offset, offset + topicSize));
        offset = offset + topicSize;
        const event = decoder.decode(buffer.slice(offset, offset + eventSize));
        offset = offset + eventSize;
        const data = JSON.parse(decoder.decode(buffer.slice(offset, buffer.byteLength)));
        return { ref: null, topic: topic, event: event, payload: data };
    }
}
//# sourceMappingURL=serializer.js.map
;// ./node_modules/@supabase/realtime-js/dist/module/lib/timer.js
/**
 * Creates a timer that accepts a `timerCalc` function to perform calculated timeout retries, such as exponential backoff.
 *
 * @example
 *    let reconnectTimer = new Timer(() => this.connect(), function(tries){
 *      return [1000, 5000, 10000][tries - 1] || 10000
 *    })
 *    reconnectTimer.scheduleTimeout() // fires after 1000
 *    reconnectTimer.scheduleTimeout() // fires after 5000
 *    reconnectTimer.reset()
 *    reconnectTimer.scheduleTimeout() // fires after 1000
 */
class Timer {
    constructor(callback, timerCalc) {
        this.callback = callback;
        this.timerCalc = timerCalc;
        this.timer = undefined;
        this.tries = 0;
        this.callback = callback;
        this.timerCalc = timerCalc;
    }
    reset() {
        this.tries = 0;
        clearTimeout(this.timer);
        this.timer = undefined;
    }
    // Cancels any previous scheduleTimeout and schedules callback
    scheduleTimeout() {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.tries = this.tries + 1;
            this.callback();
        }, this.timerCalc(this.tries + 1));
    }
}
//# sourceMappingURL=timer.js.map
;// ./node_modules/@supabase/realtime-js/dist/module/lib/transformers.js
/**
 * Helpers to convert the change Payload into native JS types.
 */
// Adapted from epgsql (src/epgsql_binary.erl), this module licensed under
// 3-clause BSD found here: https://raw.githubusercontent.com/epgsql/epgsql/devel/LICENSE
var PostgresTypes;
(function (PostgresTypes) {
    PostgresTypes["abstime"] = "abstime";
    PostgresTypes["bool"] = "bool";
    PostgresTypes["date"] = "date";
    PostgresTypes["daterange"] = "daterange";
    PostgresTypes["float4"] = "float4";
    PostgresTypes["float8"] = "float8";
    PostgresTypes["int2"] = "int2";
    PostgresTypes["int4"] = "int4";
    PostgresTypes["int4range"] = "int4range";
    PostgresTypes["int8"] = "int8";
    PostgresTypes["int8range"] = "int8range";
    PostgresTypes["json"] = "json";
    PostgresTypes["jsonb"] = "jsonb";
    PostgresTypes["money"] = "money";
    PostgresTypes["numeric"] = "numeric";
    PostgresTypes["oid"] = "oid";
    PostgresTypes["reltime"] = "reltime";
    PostgresTypes["text"] = "text";
    PostgresTypes["time"] = "time";
    PostgresTypes["timestamp"] = "timestamp";
    PostgresTypes["timestamptz"] = "timestamptz";
    PostgresTypes["timetz"] = "timetz";
    PostgresTypes["tsrange"] = "tsrange";
    PostgresTypes["tstzrange"] = "tstzrange";
})(PostgresTypes || (PostgresTypes = {}));
/**
 * Takes an array of columns and an object of string values then converts each string value
 * to its mapped type.
 *
 * @param {{name: String, type: String}[]} columns
 * @param {Object} record
 * @param {Object} options The map of various options that can be applied to the mapper
 * @param {Array} options.skipTypes The array of types that should not be converted
 *
 * @example convertChangeData([{name: 'first_name', type: 'text'}, {name: 'age', type: 'int4'}], {first_name: 'Paul', age:'33'}, {})
 * //=>{ first_name: 'Paul', age: 33 }
 */
const convertChangeData = (columns, record, options = {}) => {
    var _a;
    const skipTypes = (_a = options.skipTypes) !== null && _a !== void 0 ? _a : [];
    return Object.keys(record).reduce((acc, rec_key) => {
        acc[rec_key] = convertColumn(rec_key, columns, record, skipTypes);
        return acc;
    }, {});
};
/**
 * Converts the value of an individual column.
 *
 * @param {String} columnName The column that you want to convert
 * @param {{name: String, type: String}[]} columns All of the columns
 * @param {Object} record The map of string values
 * @param {Array} skipTypes An array of types that should not be converted
 * @return {object} Useless information
 *
 * @example convertColumn('age', [{name: 'first_name', type: 'text'}, {name: 'age', type: 'int4'}], {first_name: 'Paul', age: '33'}, [])
 * //=> 33
 * @example convertColumn('age', [{name: 'first_name', type: 'text'}, {name: 'age', type: 'int4'}], {first_name: 'Paul', age: '33'}, ['int4'])
 * //=> "33"
 */
const convertColumn = (columnName, columns, record, skipTypes) => {
    const column = columns.find((x) => x.name === columnName);
    const colType = column === null || column === void 0 ? void 0 : column.type;
    const value = record[columnName];
    if (colType && !skipTypes.includes(colType)) {
        return convertCell(colType, value);
    }
    return noop(value);
};
/**
 * If the value of the cell is `null`, returns null.
 * Otherwise converts the string value to the correct type.
 * @param {String} type A postgres column type
 * @param {String} value The cell value
 *
 * @example convertCell('bool', 't')
 * //=> true
 * @example convertCell('int8', '10')
 * //=> 10
 * @example convertCell('_int4', '{1,2,3,4}')
 * //=> [1,2,3,4]
 */
const convertCell = (type, value) => {
    // if data type is an array
    if (type.charAt(0) === '_') {
        const dataType = type.slice(1, type.length);
        return toArray(value, dataType);
    }
    // If not null, convert to correct type.
    switch (type) {
        case PostgresTypes.bool:
            return toBoolean(value);
        case PostgresTypes.float4:
        case PostgresTypes.float8:
        case PostgresTypes.int2:
        case PostgresTypes.int4:
        case PostgresTypes.int8:
        case PostgresTypes.numeric:
        case PostgresTypes.oid:
            return toNumber(value);
        case PostgresTypes.json:
        case PostgresTypes.jsonb:
            return toJson(value);
        case PostgresTypes.timestamp:
            return toTimestampString(value); // Format to be consistent with PostgREST
        case PostgresTypes.abstime: // To allow users to cast it based on Timezone
        case PostgresTypes.date: // To allow users to cast it based on Timezone
        case PostgresTypes.daterange:
        case PostgresTypes.int4range:
        case PostgresTypes.int8range:
        case PostgresTypes.money:
        case PostgresTypes.reltime: // To allow users to cast it based on Timezone
        case PostgresTypes.text:
        case PostgresTypes.time: // To allow users to cast it based on Timezone
        case PostgresTypes.timestamptz: // To allow users to cast it based on Timezone
        case PostgresTypes.timetz: // To allow users to cast it based on Timezone
        case PostgresTypes.tsrange:
        case PostgresTypes.tstzrange:
            return noop(value);
        default:
            // Return the value for remaining types
            return noop(value);
    }
};
const noop = (value) => {
    return value;
};
const toBoolean = (value) => {
    switch (value) {
        case 't':
            return true;
        case 'f':
            return false;
        default:
            return value;
    }
};
const toNumber = (value) => {
    if (typeof value === 'string') {
        const parsedValue = parseFloat(value);
        if (!Number.isNaN(parsedValue)) {
            return parsedValue;
        }
    }
    return value;
};
const toJson = (value) => {
    if (typeof value === 'string') {
        try {
            return JSON.parse(value);
        }
        catch (error) {
            console.log(`JSON parse error: ${error}`);
            return value;
        }
    }
    return value;
};
/**
 * Converts a Postgres Array into a native JS array
 *
 * @example toArray('{}', 'int4')
 * //=> []
 * @example toArray('{"[2021-01-01,2021-12-31)","(2021-01-01,2021-12-32]"}', 'daterange')
 * //=> ['[2021-01-01,2021-12-31)', '(2021-01-01,2021-12-32]']
 * @example toArray([1,2,3,4], 'int4')
 * //=> [1,2,3,4]
 */
const toArray = (value, type) => {
    if (typeof value !== 'string') {
        return value;
    }
    const lastIdx = value.length - 1;
    const closeBrace = value[lastIdx];
    const openBrace = value[0];
    // Confirm value is a Postgres array by checking curly brackets
    if (openBrace === '{' && closeBrace === '}') {
        let arr;
        const valTrim = value.slice(1, lastIdx);
        // TODO: find a better solution to separate Postgres array data
        try {
            arr = JSON.parse('[' + valTrim + ']');
        }
        catch (_) {
            // WARNING: splitting on comma does not cover all edge cases
            arr = valTrim ? valTrim.split(',') : [];
        }
        return arr.map((val) => convertCell(type, val));
    }
    return value;
};
/**
 * Fixes timestamp to be ISO-8601. Swaps the space between the date and time for a 'T'
 * See https://github.com/supabase/supabase/issues/18
 *
 * @example toTimestampString('2019-09-10 00:00:00')
 * //=> '2019-09-10T00:00:00'
 */
const toTimestampString = (value) => {
    if (typeof value === 'string') {
        return value.replace(' ', 'T');
    }
    return value;
};
const httpEndpointURL = (socketUrl) => {
    let url = socketUrl;
    url = url.replace(/^ws/i, 'http');
    url = url.replace(/(\/socket\/websocket|\/socket|\/websocket)\/?$/i, '');
    return url.replace(/\/+$/, '') + '/api/broadcast';
};
//# sourceMappingURL=transformers.js.map
;// ./node_modules/@supabase/realtime-js/dist/module/lib/push.js

class Push {
    /**
     * Initializes the Push
     *
     * @param channel The Channel
     * @param event The event, for example `"phx_join"`
     * @param payload The payload, for example `{user_id: 123}`
     * @param timeout The push timeout in milliseconds
     */
    constructor(channel, event, payload = {}, timeout = DEFAULT_TIMEOUT) {
        this.channel = channel;
        this.event = event;
        this.payload = payload;
        this.timeout = timeout;
        this.sent = false;
        this.timeoutTimer = undefined;
        this.ref = '';
        this.receivedResp = null;
        this.recHooks = [];
        this.refEvent = null;
    }
    resend(timeout) {
        this.timeout = timeout;
        this._cancelRefEvent();
        this.ref = '';
        this.refEvent = null;
        this.receivedResp = null;
        this.sent = false;
        this.send();
    }
    send() {
        if (this._hasReceived('timeout')) {
            return;
        }
        this.startTimeout();
        this.sent = true;
        this.channel.socket.push({
            topic: this.channel.topic,
            event: this.event,
            payload: this.payload,
            ref: this.ref,
            join_ref: this.channel._joinRef(),
        });
    }
    updatePayload(payload) {
        this.payload = Object.assign(Object.assign({}, this.payload), payload);
    }
    receive(status, callback) {
        var _a;
        if (this._hasReceived(status)) {
            callback((_a = this.receivedResp) === null || _a === void 0 ? void 0 : _a.response);
        }
        this.recHooks.push({ status, callback });
        return this;
    }
    startTimeout() {
        if (this.timeoutTimer) {
            return;
        }
        this.ref = this.channel.socket._makeRef();
        this.refEvent = this.channel._replyEventName(this.ref);
        const callback = (payload) => {
            this._cancelRefEvent();
            this._cancelTimeout();
            this.receivedResp = payload;
            this._matchReceive(payload);
        };
        this.channel._on(this.refEvent, {}, callback);
        this.timeoutTimer = setTimeout(() => {
            this.trigger('timeout', {});
        }, this.timeout);
    }
    trigger(status, response) {
        if (this.refEvent)
            this.channel._trigger(this.refEvent, { status, response });
    }
    destroy() {
        this._cancelRefEvent();
        this._cancelTimeout();
    }
    _cancelRefEvent() {
        if (!this.refEvent) {
            return;
        }
        this.channel._off(this.refEvent, {});
    }
    _cancelTimeout() {
        clearTimeout(this.timeoutTimer);
        this.timeoutTimer = undefined;
    }
    _matchReceive({ status, response, }) {
        this.recHooks
            .filter((h) => h.status === status)
            .forEach((h) => h.callback(response));
    }
    _hasReceived(status) {
        return this.receivedResp && this.receivedResp.status === status;
    }
}
//# sourceMappingURL=push.js.map
;// ./node_modules/@supabase/realtime-js/dist/module/RealtimePresence.js
/*
  This file draws heavily from https://github.com/phoenixframework/phoenix/blob/d344ec0a732ab4ee204215b31de69cf4be72e3bf/assets/js/phoenix/presence.js
  License: https://github.com/phoenixframework/phoenix/blob/d344ec0a732ab4ee204215b31de69cf4be72e3bf/LICENSE.md
*/
var REALTIME_PRESENCE_LISTEN_EVENTS;
(function (REALTIME_PRESENCE_LISTEN_EVENTS) {
    REALTIME_PRESENCE_LISTEN_EVENTS["SYNC"] = "sync";
    REALTIME_PRESENCE_LISTEN_EVENTS["JOIN"] = "join";
    REALTIME_PRESENCE_LISTEN_EVENTS["LEAVE"] = "leave";
})(REALTIME_PRESENCE_LISTEN_EVENTS || (REALTIME_PRESENCE_LISTEN_EVENTS = {}));
class RealtimePresence {
    /**
     * Initializes the Presence.
     *
     * @param channel - The RealtimeChannel
     * @param opts - The options,
     *        for example `{events: {state: 'state', diff: 'diff'}}`
     */
    constructor(channel, opts) {
        this.channel = channel;
        this.state = {};
        this.pendingDiffs = [];
        this.joinRef = null;
        this.enabled = false;
        this.caller = {
            onJoin: () => { },
            onLeave: () => { },
            onSync: () => { },
        };
        const events = (opts === null || opts === void 0 ? void 0 : opts.events) || {
            state: 'presence_state',
            diff: 'presence_diff',
        };
        this.channel._on(events.state, {}, (newState) => {
            const { onJoin, onLeave, onSync } = this.caller;
            this.joinRef = this.channel._joinRef();
            this.state = RealtimePresence.syncState(this.state, newState, onJoin, onLeave);
            this.pendingDiffs.forEach((diff) => {
                this.state = RealtimePresence.syncDiff(this.state, diff, onJoin, onLeave);
            });
            this.pendingDiffs = [];
            onSync();
        });
        this.channel._on(events.diff, {}, (diff) => {
            const { onJoin, onLeave, onSync } = this.caller;
            if (this.inPendingSyncState()) {
                this.pendingDiffs.push(diff);
            }
            else {
                this.state = RealtimePresence.syncDiff(this.state, diff, onJoin, onLeave);
                onSync();
            }
        });
        this.onJoin((key, currentPresences, newPresences) => {
            this.channel._trigger('presence', {
                event: 'join',
                key,
                currentPresences,
                newPresences,
            });
        });
        this.onLeave((key, currentPresences, leftPresences) => {
            this.channel._trigger('presence', {
                event: 'leave',
                key,
                currentPresences,
                leftPresences,
            });
        });
        this.onSync(() => {
            this.channel._trigger('presence', { event: 'sync' });
        });
    }
    /**
     * Used to sync the list of presences on the server with the
     * client's state.
     *
     * An optional `onJoin` and `onLeave` callback can be provided to
     * react to changes in the client's local presences across
     * disconnects and reconnects with the server.
     *
     * @internal
     */
    static syncState(currentState, newState, onJoin, onLeave) {
        const state = this.cloneDeep(currentState);
        const transformedState = this.transformState(newState);
        const joins = {};
        const leaves = {};
        this.map(state, (key, presences) => {
            if (!transformedState[key]) {
                leaves[key] = presences;
            }
        });
        this.map(transformedState, (key, newPresences) => {
            const currentPresences = state[key];
            if (currentPresences) {
                const newPresenceRefs = newPresences.map((m) => m.presence_ref);
                const curPresenceRefs = currentPresences.map((m) => m.presence_ref);
                const joinedPresences = newPresences.filter((m) => curPresenceRefs.indexOf(m.presence_ref) < 0);
                const leftPresences = currentPresences.filter((m) => newPresenceRefs.indexOf(m.presence_ref) < 0);
                if (joinedPresences.length > 0) {
                    joins[key] = joinedPresences;
                }
                if (leftPresences.length > 0) {
                    leaves[key] = leftPresences;
                }
            }
            else {
                joins[key] = newPresences;
            }
        });
        return this.syncDiff(state, { joins, leaves }, onJoin, onLeave);
    }
    /**
     * Used to sync a diff of presence join and leave events from the
     * server, as they happen.
     *
     * Like `syncState`, `syncDiff` accepts optional `onJoin` and
     * `onLeave` callbacks to react to a user joining or leaving from a
     * device.
     *
     * @internal
     */
    static syncDiff(state, diff, onJoin, onLeave) {
        const { joins, leaves } = {
            joins: this.transformState(diff.joins),
            leaves: this.transformState(diff.leaves),
        };
        if (!onJoin) {
            onJoin = () => { };
        }
        if (!onLeave) {
            onLeave = () => { };
        }
        this.map(joins, (key, newPresences) => {
            var _a;
            const currentPresences = (_a = state[key]) !== null && _a !== void 0 ? _a : [];
            state[key] = this.cloneDeep(newPresences);
            if (currentPresences.length > 0) {
                const joinedPresenceRefs = state[key].map((m) => m.presence_ref);
                const curPresences = currentPresences.filter((m) => joinedPresenceRefs.indexOf(m.presence_ref) < 0);
                state[key].unshift(...curPresences);
            }
            onJoin(key, currentPresences, newPresences);
        });
        this.map(leaves, (key, leftPresences) => {
            let currentPresences = state[key];
            if (!currentPresences)
                return;
            const presenceRefsToRemove = leftPresences.map((m) => m.presence_ref);
            currentPresences = currentPresences.filter((m) => presenceRefsToRemove.indexOf(m.presence_ref) < 0);
            state[key] = currentPresences;
            onLeave(key, currentPresences, leftPresences);
            if (currentPresences.length === 0)
                delete state[key];
        });
        return state;
    }
    /** @internal */
    static map(obj, func) {
        return Object.getOwnPropertyNames(obj).map((key) => func(key, obj[key]));
    }
    /**
     * Remove 'metas' key
     * Change 'phx_ref' to 'presence_ref'
     * Remove 'phx_ref' and 'phx_ref_prev'
     *
     * @example
     * // returns {
     *  abc123: [
     *    { presence_ref: '2', user_id: 1 },
     *    { presence_ref: '3', user_id: 2 }
     *  ]
     * }
     * RealtimePresence.transformState({
     *  abc123: {
     *    metas: [
     *      { phx_ref: '2', phx_ref_prev: '1' user_id: 1 },
     *      { phx_ref: '3', user_id: 2 }
     *    ]
     *  }
     * })
     *
     * @internal
     */
    static transformState(state) {
        state = this.cloneDeep(state);
        return Object.getOwnPropertyNames(state).reduce((newState, key) => {
            const presences = state[key];
            if ('metas' in presences) {
                newState[key] = presences.metas.map((presence) => {
                    presence['presence_ref'] = presence['phx_ref'];
                    delete presence['phx_ref'];
                    delete presence['phx_ref_prev'];
                    return presence;
                });
            }
            else {
                newState[key] = presences;
            }
            return newState;
        }, {});
    }
    /** @internal */
    static cloneDeep(obj) {
        return JSON.parse(JSON.stringify(obj));
    }
    /** @internal */
    onJoin(callback) {
        this.caller.onJoin = callback;
    }
    /** @internal */
    onLeave(callback) {
        this.caller.onLeave = callback;
    }
    /** @internal */
    onSync(callback) {
        this.caller.onSync = callback;
    }
    /** @internal */
    inPendingSyncState() {
        return !this.joinRef || this.joinRef !== this.channel._joinRef();
    }
}
//# sourceMappingURL=RealtimePresence.js.map
;// ./node_modules/@supabase/realtime-js/dist/module/RealtimeChannel.js






var REALTIME_POSTGRES_CHANGES_LISTEN_EVENT;
(function (REALTIME_POSTGRES_CHANGES_LISTEN_EVENT) {
    REALTIME_POSTGRES_CHANGES_LISTEN_EVENT["ALL"] = "*";
    REALTIME_POSTGRES_CHANGES_LISTEN_EVENT["INSERT"] = "INSERT";
    REALTIME_POSTGRES_CHANGES_LISTEN_EVENT["UPDATE"] = "UPDATE";
    REALTIME_POSTGRES_CHANGES_LISTEN_EVENT["DELETE"] = "DELETE";
})(REALTIME_POSTGRES_CHANGES_LISTEN_EVENT || (REALTIME_POSTGRES_CHANGES_LISTEN_EVENT = {}));
var REALTIME_LISTEN_TYPES;
(function (REALTIME_LISTEN_TYPES) {
    REALTIME_LISTEN_TYPES["BROADCAST"] = "broadcast";
    REALTIME_LISTEN_TYPES["PRESENCE"] = "presence";
    REALTIME_LISTEN_TYPES["POSTGRES_CHANGES"] = "postgres_changes";
    REALTIME_LISTEN_TYPES["SYSTEM"] = "system";
})(REALTIME_LISTEN_TYPES || (REALTIME_LISTEN_TYPES = {}));
var REALTIME_SUBSCRIBE_STATES;
(function (REALTIME_SUBSCRIBE_STATES) {
    REALTIME_SUBSCRIBE_STATES["SUBSCRIBED"] = "SUBSCRIBED";
    REALTIME_SUBSCRIBE_STATES["TIMED_OUT"] = "TIMED_OUT";
    REALTIME_SUBSCRIBE_STATES["CLOSED"] = "CLOSED";
    REALTIME_SUBSCRIBE_STATES["CHANNEL_ERROR"] = "CHANNEL_ERROR";
})(REALTIME_SUBSCRIBE_STATES || (REALTIME_SUBSCRIBE_STATES = {}));
const REALTIME_CHANNEL_STATES = CHANNEL_STATES;
/** A channel is the basic building block of Realtime
 * and narrows the scope of data flow to subscribed clients.
 * You can think of a channel as a chatroom where participants are able to see who's online
 * and send and receive messages.
 */
class RealtimeChannel {
    constructor(
    /** Topic name can be any string. */
    topic, params = { config: {} }, socket) {
        this.topic = topic;
        this.params = params;
        this.socket = socket;
        this.bindings = {};
        this.state = CHANNEL_STATES.closed;
        this.joinedOnce = false;
        this.pushBuffer = [];
        this.subTopic = topic.replace(/^realtime:/i, '');
        this.params.config = Object.assign({
            broadcast: { ack: false, self: false },
            presence: { key: '', enabled: false },
            private: false,
        }, params.config);
        this.timeout = this.socket.timeout;
        this.joinPush = new Push(this, CHANNEL_EVENTS.join, this.params, this.timeout);
        this.rejoinTimer = new Timer(() => this._rejoinUntilConnected(), this.socket.reconnectAfterMs);
        this.joinPush.receive('ok', () => {
            this.state = CHANNEL_STATES.joined;
            this.rejoinTimer.reset();
            this.pushBuffer.forEach((pushEvent) => pushEvent.send());
            this.pushBuffer = [];
        });
        this._onClose(() => {
            this.rejoinTimer.reset();
            this.socket.log('channel', `close ${this.topic} ${this._joinRef()}`);
            this.state = CHANNEL_STATES.closed;
            this.socket._remove(this);
        });
        this._onError((reason) => {
            if (this._isLeaving() || this._isClosed()) {
                return;
            }
            this.socket.log('channel', `error ${this.topic}`, reason);
            this.state = CHANNEL_STATES.errored;
            this.rejoinTimer.scheduleTimeout();
        });
        this.joinPush.receive('timeout', () => {
            if (!this._isJoining()) {
                return;
            }
            this.socket.log('channel', `timeout ${this.topic}`, this.joinPush.timeout);
            this.state = CHANNEL_STATES.errored;
            this.rejoinTimer.scheduleTimeout();
        });
        this.joinPush.receive('error', (reason) => {
            if (this._isLeaving() || this._isClosed()) {
                return;
            }
            this.socket.log('channel', `error ${this.topic}`, reason);
            this.state = CHANNEL_STATES.errored;
            this.rejoinTimer.scheduleTimeout();
        });
        this._on(CHANNEL_EVENTS.reply, {}, (payload, ref) => {
            this._trigger(this._replyEventName(ref), payload);
        });
        this.presence = new RealtimePresence(this);
        this.broadcastEndpointURL = httpEndpointURL(this.socket.endPoint);
        this.private = this.params.config.private || false;
    }
    /** Subscribe registers your client with the server */
    subscribe(callback, timeout = this.timeout) {
        var _a, _b, _c;
        if (!this.socket.isConnected()) {
            this.socket.connect();
        }
        if (this.state == CHANNEL_STATES.closed) {
            const { config: { broadcast, presence, private: isPrivate }, } = this.params;
            const postgres_changes = (_b = (_a = this.bindings.postgres_changes) === null || _a === void 0 ? void 0 : _a.map((r) => r.filter)) !== null && _b !== void 0 ? _b : [];
            const presence_enabled = (!!this.bindings[REALTIME_LISTEN_TYPES.PRESENCE] &&
                this.bindings[REALTIME_LISTEN_TYPES.PRESENCE].length > 0) ||
                ((_c = this.params.config.presence) === null || _c === void 0 ? void 0 : _c.enabled) === true;
            const accessTokenPayload = {};
            const config = {
                broadcast,
                presence: Object.assign(Object.assign({}, presence), { enabled: presence_enabled }),
                postgres_changes,
                private: isPrivate,
            };
            if (this.socket.accessTokenValue) {
                accessTokenPayload.access_token = this.socket.accessTokenValue;
            }
            this._onError((e) => callback === null || callback === void 0 ? void 0 : callback(REALTIME_SUBSCRIBE_STATES.CHANNEL_ERROR, e));
            this._onClose(() => callback === null || callback === void 0 ? void 0 : callback(REALTIME_SUBSCRIBE_STATES.CLOSED));
            this.updateJoinPayload(Object.assign({ config }, accessTokenPayload));
            this.joinedOnce = true;
            this._rejoin(timeout);
            this.joinPush
                .receive('ok', async ({ postgres_changes }) => {
                var _a;
                this.socket.setAuth();
                if (postgres_changes === undefined) {
                    callback === null || callback === void 0 ? void 0 : callback(REALTIME_SUBSCRIBE_STATES.SUBSCRIBED);
                    return;
                }
                else {
                    const clientPostgresBindings = this.bindings.postgres_changes;
                    const bindingsLen = (_a = clientPostgresBindings === null || clientPostgresBindings === void 0 ? void 0 : clientPostgresBindings.length) !== null && _a !== void 0 ? _a : 0;
                    const newPostgresBindings = [];
                    for (let i = 0; i < bindingsLen; i++) {
                        const clientPostgresBinding = clientPostgresBindings[i];
                        const { filter: { event, schema, table, filter }, } = clientPostgresBinding;
                        const serverPostgresFilter = postgres_changes && postgres_changes[i];
                        if (serverPostgresFilter &&
                            serverPostgresFilter.event === event &&
                            serverPostgresFilter.schema === schema &&
                            serverPostgresFilter.table === table &&
                            serverPostgresFilter.filter === filter) {
                            newPostgresBindings.push(Object.assign(Object.assign({}, clientPostgresBinding), { id: serverPostgresFilter.id }));
                        }
                        else {
                            this.unsubscribe();
                            this.state = CHANNEL_STATES.errored;
                            callback === null || callback === void 0 ? void 0 : callback(REALTIME_SUBSCRIBE_STATES.CHANNEL_ERROR, new Error('mismatch between server and client bindings for postgres changes'));
                            return;
                        }
                    }
                    this.bindings.postgres_changes = newPostgresBindings;
                    callback && callback(REALTIME_SUBSCRIBE_STATES.SUBSCRIBED);
                    return;
                }
            })
                .receive('error', (error) => {
                this.state = CHANNEL_STATES.errored;
                callback === null || callback === void 0 ? void 0 : callback(REALTIME_SUBSCRIBE_STATES.CHANNEL_ERROR, new Error(JSON.stringify(Object.values(error).join(', ') || 'error')));
                return;
            })
                .receive('timeout', () => {
                callback === null || callback === void 0 ? void 0 : callback(REALTIME_SUBSCRIBE_STATES.TIMED_OUT);
                return;
            });
        }
        return this;
    }
    presenceState() {
        return this.presence.state;
    }
    async track(payload, opts = {}) {
        return await this.send({
            type: 'presence',
            event: 'track',
            payload,
        }, opts.timeout || this.timeout);
    }
    async untrack(opts = {}) {
        return await this.send({
            type: 'presence',
            event: 'untrack',
        }, opts);
    }
    on(type, filter, callback) {
        if (this.state === CHANNEL_STATES.joined &&
            type === REALTIME_LISTEN_TYPES.PRESENCE) {
            this.socket.log('channel', `resubscribe to ${this.topic} due to change in presence callbacks on joined channel`);
            this.unsubscribe().then(() => this.subscribe());
        }
        return this._on(type, filter, callback);
    }
    /**
     * Sends a message into the channel.
     *
     * @param args Arguments to send to channel
     * @param args.type The type of event to send
     * @param args.event The name of the event being sent
     * @param args.payload Payload to be sent
     * @param opts Options to be used during the send process
     */
    async send(args, opts = {}) {
        var _a, _b;
        if (!this._canPush() && args.type === 'broadcast') {
            const { event, payload: endpoint_payload } = args;
            const authorization = this.socket.accessTokenValue
                ? `Bearer ${this.socket.accessTokenValue}`
                : '';
            const options = {
                method: 'POST',
                headers: {
                    Authorization: authorization,
                    apikey: this.socket.apiKey ? this.socket.apiKey : '',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: [
                        {
                            topic: this.subTopic,
                            event,
                            payload: endpoint_payload,
                            private: this.private,
                        },
                    ],
                }),
            };
            try {
                const response = await this._fetchWithTimeout(this.broadcastEndpointURL, options, (_a = opts.timeout) !== null && _a !== void 0 ? _a : this.timeout);
                await ((_b = response.body) === null || _b === void 0 ? void 0 : _b.cancel());
                return response.ok ? 'ok' : 'error';
            }
            catch (error) {
                if (error.name === 'AbortError') {
                    return 'timed out';
                }
                else {
                    return 'error';
                }
            }
        }
        else {
            return new Promise((resolve) => {
                var _a, _b, _c;
                const push = this._push(args.type, args, opts.timeout || this.timeout);
                if (args.type === 'broadcast' && !((_c = (_b = (_a = this.params) === null || _a === void 0 ? void 0 : _a.config) === null || _b === void 0 ? void 0 : _b.broadcast) === null || _c === void 0 ? void 0 : _c.ack)) {
                    resolve('ok');
                }
                push.receive('ok', () => resolve('ok'));
                push.receive('error', () => resolve('error'));
                push.receive('timeout', () => resolve('timed out'));
            });
        }
    }
    updateJoinPayload(payload) {
        this.joinPush.updatePayload(payload);
    }
    /**
     * Leaves the channel.
     *
     * Unsubscribes from server events, and instructs channel to terminate on server.
     * Triggers onClose() hooks.
     *
     * To receive leave acknowledgements, use the a `receive` hook to bind to the server ack, ie:
     * channel.unsubscribe().receive("ok", () => alert("left!") )
     */
    unsubscribe(timeout = this.timeout) {
        this.state = CHANNEL_STATES.leaving;
        const onClose = () => {
            this.socket.log('channel', `leave ${this.topic}`);
            this._trigger(CHANNEL_EVENTS.close, 'leave', this._joinRef());
        };
        this.joinPush.destroy();
        let leavePush = null;
        return new Promise((resolve) => {
            leavePush = new Push(this, CHANNEL_EVENTS.leave, {}, timeout);
            leavePush
                .receive('ok', () => {
                onClose();
                resolve('ok');
            })
                .receive('timeout', () => {
                onClose();
                resolve('timed out');
            })
                .receive('error', () => {
                resolve('error');
            });
            leavePush.send();
            if (!this._canPush()) {
                leavePush.trigger('ok', {});
            }
        }).finally(() => {
            leavePush === null || leavePush === void 0 ? void 0 : leavePush.destroy();
        });
    }
    /**
     * Teardown the channel.
     *
     * Destroys and stops related timers.
     */
    teardown() {
        this.pushBuffer.forEach((push) => push.destroy());
        this.pushBuffer = [];
        this.rejoinTimer.reset();
        this.joinPush.destroy();
        this.state = CHANNEL_STATES.closed;
        this.bindings = {};
    }
    /** @internal */
    async _fetchWithTimeout(url, options, timeout) {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);
        const response = await this.socket.fetch(url, Object.assign(Object.assign({}, options), { signal: controller.signal }));
        clearTimeout(id);
        return response;
    }
    /** @internal */
    _push(event, payload, timeout = this.timeout) {
        if (!this.joinedOnce) {
            throw `tried to push '${event}' to '${this.topic}' before joining. Use channel.subscribe() before pushing events`;
        }
        let pushEvent = new Push(this, event, payload, timeout);
        if (this._canPush()) {
            pushEvent.send();
        }
        else {
            this._addToPushBuffer(pushEvent);
        }
        return pushEvent;
    }
    /** @internal */
    _addToPushBuffer(pushEvent) {
        pushEvent.startTimeout();
        this.pushBuffer.push(pushEvent);
        // Enforce buffer size limit
        if (this.pushBuffer.length > MAX_PUSH_BUFFER_SIZE) {
            const removedPush = this.pushBuffer.shift();
            if (removedPush) {
                removedPush.destroy();
                this.socket.log('channel', `discarded push due to buffer overflow: ${removedPush.event}`, removedPush.payload);
            }
        }
    }
    /**
     * Overridable message hook
     *
     * Receives all events for specialized message handling before dispatching to the channel callbacks.
     * Must return the payload, modified or unmodified.
     *
     * @internal
     */
    _onMessage(_event, payload, _ref) {
        return payload;
    }
    /** @internal */
    _isMember(topic) {
        return this.topic === topic;
    }
    /** @internal */
    _joinRef() {
        return this.joinPush.ref;
    }
    /** @internal */
    _trigger(type, payload, ref) {
        var _a, _b;
        const typeLower = type.toLocaleLowerCase();
        const { close, error, leave, join } = CHANNEL_EVENTS;
        const events = [close, error, leave, join];
        if (ref && events.indexOf(typeLower) >= 0 && ref !== this._joinRef()) {
            return;
        }
        let handledPayload = this._onMessage(typeLower, payload, ref);
        if (payload && !handledPayload) {
            throw 'channel onMessage callbacks must return the payload, modified or unmodified';
        }
        if (['insert', 'update', 'delete'].includes(typeLower)) {
            (_a = this.bindings.postgres_changes) === null || _a === void 0 ? void 0 : _a.filter((bind) => {
                var _a, _b, _c;
                return (((_a = bind.filter) === null || _a === void 0 ? void 0 : _a.event) === '*' ||
                    ((_c = (_b = bind.filter) === null || _b === void 0 ? void 0 : _b.event) === null || _c === void 0 ? void 0 : _c.toLocaleLowerCase()) === typeLower);
            }).map((bind) => bind.callback(handledPayload, ref));
        }
        else {
            (_b = this.bindings[typeLower]) === null || _b === void 0 ? void 0 : _b.filter((bind) => {
                var _a, _b, _c, _d, _e, _f;
                if (['broadcast', 'presence', 'postgres_changes'].includes(typeLower)) {
                    if ('id' in bind) {
                        const bindId = bind.id;
                        const bindEvent = (_a = bind.filter) === null || _a === void 0 ? void 0 : _a.event;
                        return (bindId &&
                            ((_b = payload.ids) === null || _b === void 0 ? void 0 : _b.includes(bindId)) &&
                            (bindEvent === '*' ||
                                (bindEvent === null || bindEvent === void 0 ? void 0 : bindEvent.toLocaleLowerCase()) ===
                                    ((_c = payload.data) === null || _c === void 0 ? void 0 : _c.type.toLocaleLowerCase())));
                    }
                    else {
                        const bindEvent = (_e = (_d = bind === null || bind === void 0 ? void 0 : bind.filter) === null || _d === void 0 ? void 0 : _d.event) === null || _e === void 0 ? void 0 : _e.toLocaleLowerCase();
                        return (bindEvent === '*' ||
                            bindEvent === ((_f = payload === null || payload === void 0 ? void 0 : payload.event) === null || _f === void 0 ? void 0 : _f.toLocaleLowerCase()));
                    }
                }
                else {
                    return bind.type.toLocaleLowerCase() === typeLower;
                }
            }).map((bind) => {
                if (typeof handledPayload === 'object' && 'ids' in handledPayload) {
                    const postgresChanges = handledPayload.data;
                    const { schema, table, commit_timestamp, type, errors } = postgresChanges;
                    const enrichedPayload = {
                        schema: schema,
                        table: table,
                        commit_timestamp: commit_timestamp,
                        eventType: type,
                        new: {},
                        old: {},
                        errors: errors,
                    };
                    handledPayload = Object.assign(Object.assign({}, enrichedPayload), this._getPayloadRecords(postgresChanges));
                }
                bind.callback(handledPayload, ref);
            });
        }
    }
    /** @internal */
    _isClosed() {
        return this.state === CHANNEL_STATES.closed;
    }
    /** @internal */
    _isJoined() {
        return this.state === CHANNEL_STATES.joined;
    }
    /** @internal */
    _isJoining() {
        return this.state === CHANNEL_STATES.joining;
    }
    /** @internal */
    _isLeaving() {
        return this.state === CHANNEL_STATES.leaving;
    }
    /** @internal */
    _replyEventName(ref) {
        return `chan_reply_${ref}`;
    }
    /** @internal */
    _on(type, filter, callback) {
        const typeLower = type.toLocaleLowerCase();
        const binding = {
            type: typeLower,
            filter: filter,
            callback: callback,
        };
        if (this.bindings[typeLower]) {
            this.bindings[typeLower].push(binding);
        }
        else {
            this.bindings[typeLower] = [binding];
        }
        return this;
    }
    /** @internal */
    _off(type, filter) {
        const typeLower = type.toLocaleLowerCase();
        if (this.bindings[typeLower]) {
            this.bindings[typeLower] = this.bindings[typeLower].filter((bind) => {
                var _a;
                return !(((_a = bind.type) === null || _a === void 0 ? void 0 : _a.toLocaleLowerCase()) === typeLower &&
                    RealtimeChannel.isEqual(bind.filter, filter));
            });
        }
        return this;
    }
    /** @internal */
    static isEqual(obj1, obj2) {
        if (Object.keys(obj1).length !== Object.keys(obj2).length) {
            return false;
        }
        for (const k in obj1) {
            if (obj1[k] !== obj2[k]) {
                return false;
            }
        }
        return true;
    }
    /** @internal */
    _rejoinUntilConnected() {
        this.rejoinTimer.scheduleTimeout();
        if (this.socket.isConnected()) {
            this._rejoin();
        }
    }
    /**
     * Registers a callback that will be executed when the channel closes.
     *
     * @internal
     */
    _onClose(callback) {
        this._on(CHANNEL_EVENTS.close, {}, callback);
    }
    /**
     * Registers a callback that will be executed when the channel encounteres an error.
     *
     * @internal
     */
    _onError(callback) {
        this._on(CHANNEL_EVENTS.error, {}, (reason) => callback(reason));
    }
    /**
     * Returns `true` if the socket is connected and the channel has been joined.
     *
     * @internal
     */
    _canPush() {
        return this.socket.isConnected() && this._isJoined();
    }
    /** @internal */
    _rejoin(timeout = this.timeout) {
        if (this._isLeaving()) {
            return;
        }
        this.socket._leaveOpenTopic(this.topic);
        this.state = CHANNEL_STATES.joining;
        this.joinPush.resend(timeout);
    }
    /** @internal */
    _getPayloadRecords(payload) {
        const records = {
            new: {},
            old: {},
        };
        if (payload.type === 'INSERT' || payload.type === 'UPDATE') {
            records.new = convertChangeData(payload.columns, payload.record);
        }
        if (payload.type === 'UPDATE' || payload.type === 'DELETE') {
            records.old = convertChangeData(payload.columns, payload.old_record);
        }
        return records;
    }
}
//# sourceMappingURL=RealtimeChannel.js.map
;// ./node_modules/@supabase/realtime-js/dist/module/RealtimeClient.js






const RealtimeClient_noop = () => { };
// Connection-related constants
const CONNECTION_TIMEOUTS = {
    HEARTBEAT_INTERVAL: 25000,
    RECONNECT_DELAY: 10,
    HEARTBEAT_TIMEOUT_FALLBACK: 100,
};
const RECONNECT_INTERVALS = [1000, 2000, 5000, 10000];
const DEFAULT_RECONNECT_FALLBACK = 10000;
const WORKER_SCRIPT = `
  addEventListener("message", (e) => {
    if (e.data.event === "start") {
      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);
    }
  });`;
class RealtimeClient {
    /**
     * Initializes the Socket.
     *
     * @param endPoint The string WebSocket endpoint, ie, "ws://example.com/socket", "wss://example.com", "/socket" (inherited host & protocol)
     * @param httpEndpoint The string HTTP endpoint, ie, "https://example.com", "/" (inherited host & protocol)
     * @param options.transport The Websocket Transport, for example WebSocket. This can be a custom implementation
     * @param options.timeout The default timeout in milliseconds to trigger push timeouts.
     * @param options.params The optional params to pass when connecting.
     * @param options.headers Deprecated: headers cannot be set on websocket connections and this option will be removed in the future.
     * @param options.heartbeatIntervalMs The millisec interval to send a heartbeat message.
     * @param options.heartbeatCallback The optional function to handle heartbeat status.
     * @param options.logger The optional function for specialized logging, ie: logger: (kind, msg, data) => { console.log(`${kind}: ${msg}`, data) }
     * @param options.logLevel Sets the log level for Realtime
     * @param options.encode The function to encode outgoing messages. Defaults to JSON: (payload, callback) => callback(JSON.stringify(payload))
     * @param options.decode The function to decode incoming messages. Defaults to Serializer's decode.
     * @param options.reconnectAfterMs he optional function that returns the millsec reconnect interval. Defaults to stepped backoff off.
     * @param options.worker Use Web Worker to set a side flow. Defaults to false.
     * @param options.workerUrl The URL of the worker script. Defaults to https://realtime.supabase.com/worker.js that includes a heartbeat event call to keep the connection alive.
     */
    constructor(endPoint, options) {
        var _a;
        this.accessTokenValue = null;
        this.apiKey = null;
        this.channels = new Array();
        this.endPoint = '';
        this.httpEndpoint = '';
        /** @deprecated headers cannot be set on websocket connections */
        this.headers = {};
        this.params = {};
        this.timeout = DEFAULT_TIMEOUT;
        this.transport = null;
        this.heartbeatIntervalMs = CONNECTION_TIMEOUTS.HEARTBEAT_INTERVAL;
        this.heartbeatTimer = undefined;
        this.pendingHeartbeatRef = null;
        this.heartbeatCallback = RealtimeClient_noop;
        this.ref = 0;
        this.reconnectTimer = null;
        this.logger = RealtimeClient_noop;
        this.conn = null;
        this.sendBuffer = [];
        this.serializer = new Serializer();
        this.stateChangeCallbacks = {
            open: [],
            close: [],
            error: [],
            message: [],
        };
        this.accessToken = null;
        this._connectionState = 'disconnected';
        this._wasManualDisconnect = false;
        this._authPromise = null;
        /**
         * Use either custom fetch, if provided, or default fetch to make HTTP requests
         *
         * @internal
         */
        this._resolveFetch = (customFetch) => {
            let _fetch;
            if (customFetch) {
                _fetch = customFetch;
            }
            else if (typeof fetch === 'undefined') {
                // Node.js environment without native fetch
                _fetch = (...args) => Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 907))
                    .then(({ default: fetch }) => fetch(...args))
                    .catch((error) => {
                    throw new Error(`Failed to load @supabase/node-fetch: ${error.message}. ` +
                        `This is required for HTTP requests in Node.js environments without native fetch.`);
                });
            }
            else {
                _fetch = fetch;
            }
            return (...args) => _fetch(...args);
        };
        // Validate required parameters
        if (!((_a = options === null || options === void 0 ? void 0 : options.params) === null || _a === void 0 ? void 0 : _a.apikey)) {
            throw new Error('API key is required to connect to Realtime');
        }
        this.apiKey = options.params.apikey;
        // Initialize endpoint URLs
        this.endPoint = `${endPoint}/${TRANSPORTS.websocket}`;
        this.httpEndpoint = httpEndpointURL(endPoint);
        this._initializeOptions(options);
        this._setupReconnectionTimer();
        this.fetch = this._resolveFetch(options === null || options === void 0 ? void 0 : options.fetch);
    }
    /**
     * Connects the socket, unless already connected.
     */
    connect() {
        // Skip if already connecting, disconnecting, or connected
        if (this.isConnecting() ||
            this.isDisconnecting() ||
            (this.conn !== null && this.isConnected())) {
            return;
        }
        this._setConnectionState('connecting');
        this._setAuthSafely('connect');
        // Establish WebSocket connection
        if (this.transport) {
            // Use custom transport if provided
            this.conn = new this.transport(this.endpointURL());
        }
        else {
            // Try to use native WebSocket
            try {
                this.conn = websocket_factory.createWebSocket(this.endpointURL());
            }
            catch (error) {
                this._setConnectionState('disconnected');
                const errorMessage = error.message;
                // Provide helpful error message based on environment
                if (errorMessage.includes('Node.js')) {
                    throw new Error(`${errorMessage}\n\n` +
                        'To use Realtime in Node.js, you need to provide a WebSocket implementation:\n\n' +
                        'Option 1: Use Node.js 22+ which has native WebSocket support\n' +
                        'Option 2: Install and provide the "ws" package:\n\n' +
                        '  npm install ws\n\n' +
                        '  import ws from "ws"\n' +
                        '  const client = new RealtimeClient(url, {\n' +
                        '    ...options,\n' +
                        '    transport: ws\n' +
                        '  })');
                }
                throw new Error(`WebSocket not available: ${errorMessage}`);
            }
        }
        this._setupConnectionHandlers();
    }
    /**
     * Returns the URL of the websocket.
     * @returns string The URL of the websocket.
     */
    endpointURL() {
        return this._appendParams(this.endPoint, Object.assign({}, this.params, { vsn: VSN }));
    }
    /**
     * Disconnects the socket.
     *
     * @param code A numeric status code to send on disconnect.
     * @param reason A custom reason for the disconnect.
     */
    disconnect(code, reason) {
        if (this.isDisconnecting()) {
            return;
        }
        this._setConnectionState('disconnecting', true);
        if (this.conn) {
            // Setup fallback timer to prevent hanging in disconnecting state
            const fallbackTimer = setTimeout(() => {
                this._setConnectionState('disconnected');
            }, 100);
            this.conn.onclose = () => {
                clearTimeout(fallbackTimer);
                this._setConnectionState('disconnected');
            };
            // Close the WebSocket connection
            if (code) {
                this.conn.close(code, reason !== null && reason !== void 0 ? reason : '');
            }
            else {
                this.conn.close();
            }
            this._teardownConnection();
        }
        else {
            this._setConnectionState('disconnected');
        }
    }
    /**
     * Returns all created channels
     */
    getChannels() {
        return this.channels;
    }
    /**
     * Unsubscribes and removes a single channel
     * @param channel A RealtimeChannel instance
     */
    async removeChannel(channel) {
        const status = await channel.unsubscribe();
        if (this.channels.length === 0) {
            this.disconnect();
        }
        return status;
    }
    /**
     * Unsubscribes and removes all channels
     */
    async removeAllChannels() {
        const values_1 = await Promise.all(this.channels.map((channel) => channel.unsubscribe()));
        this.channels = [];
        this.disconnect();
        return values_1;
    }
    /**
     * Logs the message.
     *
     * For customized logging, `this.logger` can be overridden.
     */
    log(kind, msg, data) {
        this.logger(kind, msg, data);
    }
    /**
     * Returns the current state of the socket.
     */
    connectionState() {
        switch (this.conn && this.conn.readyState) {
            case SOCKET_STATES.connecting:
                return CONNECTION_STATE.Connecting;
            case SOCKET_STATES.open:
                return CONNECTION_STATE.Open;
            case SOCKET_STATES.closing:
                return CONNECTION_STATE.Closing;
            default:
                return CONNECTION_STATE.Closed;
        }
    }
    /**
     * Returns `true` is the connection is open.
     */
    isConnected() {
        return this.connectionState() === CONNECTION_STATE.Open;
    }
    /**
     * Returns `true` if the connection is currently connecting.
     */
    isConnecting() {
        return this._connectionState === 'connecting';
    }
    /**
     * Returns `true` if the connection is currently disconnecting.
     */
    isDisconnecting() {
        return this._connectionState === 'disconnecting';
    }
    channel(topic, params = { config: {} }) {
        const realtimeTopic = `realtime:${topic}`;
        const exists = this.getChannels().find((c) => c.topic === realtimeTopic);
        if (!exists) {
            const chan = new RealtimeChannel(`realtime:${topic}`, params, this);
            this.channels.push(chan);
            return chan;
        }
        else {
            return exists;
        }
    }
    /**
     * Push out a message if the socket is connected.
     *
     * If the socket is not connected, the message gets enqueued within a local buffer, and sent out when a connection is next established.
     */
    push(data) {
        const { topic, event, payload, ref } = data;
        const callback = () => {
            this.encode(data, (result) => {
                var _a;
                (_a = this.conn) === null || _a === void 0 ? void 0 : _a.send(result);
            });
        };
        this.log('push', `${topic} ${event} (${ref})`, payload);
        if (this.isConnected()) {
            callback();
        }
        else {
            this.sendBuffer.push(callback);
        }
    }
    /**
     * Sets the JWT access token used for channel subscription authorization and Realtime RLS.
     *
     * If param is null it will use the `accessToken` callback function or the token set on the client.
     *
     * On callback used, it will set the value of the token internal to the client.
     *
     * @param token A JWT string to override the token set on the client.
     */
    async setAuth(token = null) {
        this._authPromise = this._performAuth(token);
        try {
            await this._authPromise;
        }
        finally {
            this._authPromise = null;
        }
    }
    /**
     * Sends a heartbeat message if the socket is connected.
     */
    async sendHeartbeat() {
        var _a;
        if (!this.isConnected()) {
            try {
                this.heartbeatCallback('disconnected');
            }
            catch (e) {
                this.log('error', 'error in heartbeat callback', e);
            }
            return;
        }
        // Handle heartbeat timeout and force reconnection if needed
        if (this.pendingHeartbeatRef) {
            this.pendingHeartbeatRef = null;
            this.log('transport', 'heartbeat timeout. Attempting to re-establish connection');
            try {
                this.heartbeatCallback('timeout');
            }
            catch (e) {
                this.log('error', 'error in heartbeat callback', e);
            }
            // Force reconnection after heartbeat timeout
            this._wasManualDisconnect = false;
            (_a = this.conn) === null || _a === void 0 ? void 0 : _a.close(WS_CLOSE_NORMAL, 'heartbeat timeout');
            setTimeout(() => {
                var _a;
                if (!this.isConnected()) {
                    (_a = this.reconnectTimer) === null || _a === void 0 ? void 0 : _a.scheduleTimeout();
                }
            }, CONNECTION_TIMEOUTS.HEARTBEAT_TIMEOUT_FALLBACK);
            return;
        }
        // Send heartbeat message to server
        this.pendingHeartbeatRef = this._makeRef();
        this.push({
            topic: 'phoenix',
            event: 'heartbeat',
            payload: {},
            ref: this.pendingHeartbeatRef,
        });
        try {
            this.heartbeatCallback('sent');
        }
        catch (e) {
            this.log('error', 'error in heartbeat callback', e);
        }
        this._setAuthSafely('heartbeat');
    }
    onHeartbeat(callback) {
        this.heartbeatCallback = callback;
    }
    /**
     * Flushes send buffer
     */
    flushSendBuffer() {
        if (this.isConnected() && this.sendBuffer.length > 0) {
            this.sendBuffer.forEach((callback) => callback());
            this.sendBuffer = [];
        }
    }
    /**
     * Return the next message ref, accounting for overflows
     *
     * @internal
     */
    _makeRef() {
        let newRef = this.ref + 1;
        if (newRef === this.ref) {
            this.ref = 0;
        }
        else {
            this.ref = newRef;
        }
        return this.ref.toString();
    }
    /**
     * Unsubscribe from channels with the specified topic.
     *
     * @internal
     */
    _leaveOpenTopic(topic) {
        let dupChannel = this.channels.find((c) => c.topic === topic && (c._isJoined() || c._isJoining()));
        if (dupChannel) {
            this.log('transport', `leaving duplicate topic "${topic}"`);
            dupChannel.unsubscribe();
        }
    }
    /**
     * Removes a subscription from the socket.
     *
     * @param channel An open subscription.
     *
     * @internal
     */
    _remove(channel) {
        this.channels = this.channels.filter((c) => c.topic !== channel.topic);
    }
    /** @internal */
    _onConnMessage(rawMessage) {
        this.decode(rawMessage.data, (msg) => {
            // Handle heartbeat responses
            if (msg.topic === 'phoenix' && msg.event === 'phx_reply') {
                try {
                    this.heartbeatCallback(msg.payload.status === 'ok' ? 'ok' : 'error');
                }
                catch (e) {
                    this.log('error', 'error in heartbeat callback', e);
                }
            }
            // Handle pending heartbeat reference cleanup
            if (msg.ref && msg.ref === this.pendingHeartbeatRef) {
                this.pendingHeartbeatRef = null;
            }
            // Log incoming message
            const { topic, event, payload, ref } = msg;
            const refString = ref ? `(${ref})` : '';
            const status = payload.status || '';
            this.log('receive', `${status} ${topic} ${event} ${refString}`.trim(), payload);
            // Route message to appropriate channels
            this.channels
                .filter((channel) => channel._isMember(topic))
                .forEach((channel) => channel._trigger(event, payload, ref));
            this._triggerStateCallbacks('message', msg);
        });
    }
    /**
     * Clear specific timer
     * @internal
     */
    _clearTimer(timer) {
        var _a;
        if (timer === 'heartbeat' && this.heartbeatTimer) {
            clearInterval(this.heartbeatTimer);
            this.heartbeatTimer = undefined;
        }
        else if (timer === 'reconnect') {
            (_a = this.reconnectTimer) === null || _a === void 0 ? void 0 : _a.reset();
        }
    }
    /**
     * Clear all timers
     * @internal
     */
    _clearAllTimers() {
        this._clearTimer('heartbeat');
        this._clearTimer('reconnect');
    }
    /**
     * Setup connection handlers for WebSocket events
     * @internal
     */
    _setupConnectionHandlers() {
        if (!this.conn)
            return;
        // Set binary type if supported (browsers and most WebSocket implementations)
        if ('binaryType' in this.conn) {
            ;
            this.conn.binaryType = 'arraybuffer';
        }
        this.conn.onopen = () => this._onConnOpen();
        this.conn.onerror = (error) => this._onConnError(error);
        this.conn.onmessage = (event) => this._onConnMessage(event);
        this.conn.onclose = (event) => this._onConnClose(event);
    }
    /**
     * Teardown connection and cleanup resources
     * @internal
     */
    _teardownConnection() {
        if (this.conn) {
            this.conn.onopen = null;
            this.conn.onerror = null;
            this.conn.onmessage = null;
            this.conn.onclose = null;
            this.conn = null;
        }
        this._clearAllTimers();
        this.channels.forEach((channel) => channel.teardown());
    }
    /** @internal */
    _onConnOpen() {
        this._setConnectionState('connected');
        this.log('transport', `connected to ${this.endpointURL()}`);
        this.flushSendBuffer();
        this._clearTimer('reconnect');
        if (!this.worker) {
            this._startHeartbeat();
        }
        else {
            if (!this.workerRef) {
                this._startWorkerHeartbeat();
            }
        }
        this._triggerStateCallbacks('open');
    }
    /** @internal */
    _startHeartbeat() {
        this.heartbeatTimer && clearInterval(this.heartbeatTimer);
        this.heartbeatTimer = setInterval(() => this.sendHeartbeat(), this.heartbeatIntervalMs);
    }
    /** @internal */
    _startWorkerHeartbeat() {
        if (this.workerUrl) {
            this.log('worker', `starting worker for from ${this.workerUrl}`);
        }
        else {
            this.log('worker', `starting default worker`);
        }
        const objectUrl = this._workerObjectUrl(this.workerUrl);
        this.workerRef = new Worker(objectUrl);
        this.workerRef.onerror = (error) => {
            this.log('worker', 'worker error', error.message);
            this.workerRef.terminate();
        };
        this.workerRef.onmessage = (event) => {
            if (event.data.event === 'keepAlive') {
                this.sendHeartbeat();
            }
        };
        this.workerRef.postMessage({
            event: 'start',
            interval: this.heartbeatIntervalMs,
        });
    }
    /** @internal */
    _onConnClose(event) {
        var _a;
        this._setConnectionState('disconnected');
        this.log('transport', 'close', event);
        this._triggerChanError();
        this._clearTimer('heartbeat');
        // Only schedule reconnection if it wasn't a manual disconnect
        if (!this._wasManualDisconnect) {
            (_a = this.reconnectTimer) === null || _a === void 0 ? void 0 : _a.scheduleTimeout();
        }
        this._triggerStateCallbacks('close', event);
    }
    /** @internal */
    _onConnError(error) {
        this._setConnectionState('disconnected');
        this.log('transport', `${error}`);
        this._triggerChanError();
        this._triggerStateCallbacks('error', error);
    }
    /** @internal */
    _triggerChanError() {
        this.channels.forEach((channel) => channel._trigger(CHANNEL_EVENTS.error));
    }
    /** @internal */
    _appendParams(url, params) {
        if (Object.keys(params).length === 0) {
            return url;
        }
        const prefix = url.match(/\?/) ? '&' : '?';
        const query = new URLSearchParams(params);
        return `${url}${prefix}${query}`;
    }
    _workerObjectUrl(url) {
        let result_url;
        if (url) {
            result_url = url;
        }
        else {
            const blob = new Blob([WORKER_SCRIPT], { type: 'application/javascript' });
            result_url = URL.createObjectURL(blob);
        }
        return result_url;
    }
    /**
     * Set connection state with proper state management
     * @internal
     */
    _setConnectionState(state, manual = false) {
        this._connectionState = state;
        if (state === 'connecting') {
            this._wasManualDisconnect = false;
        }
        else if (state === 'disconnecting') {
            this._wasManualDisconnect = manual;
        }
    }
    /**
     * Perform the actual auth operation
     * @internal
     */
    async _performAuth(token = null) {
        let tokenToSend;
        if (token) {
            tokenToSend = token;
        }
        else if (this.accessToken) {
            // Always call the accessToken callback to get fresh token
            tokenToSend = await this.accessToken();
        }
        else {
            tokenToSend = this.accessTokenValue;
        }
        if (this.accessTokenValue != tokenToSend) {
            this.accessTokenValue = tokenToSend;
            this.channels.forEach((channel) => {
                const payload = {
                    access_token: tokenToSend,
                    version: DEFAULT_VERSION,
                };
                tokenToSend && channel.updateJoinPayload(payload);
                if (channel.joinedOnce && channel._isJoined()) {
                    channel._push(CHANNEL_EVENTS.access_token, {
                        access_token: tokenToSend,
                    });
                }
            });
        }
    }
    /**
     * Wait for any in-flight auth operations to complete
     * @internal
     */
    async _waitForAuthIfNeeded() {
        if (this._authPromise) {
            await this._authPromise;
        }
    }
    /**
     * Safely call setAuth with standardized error handling
     * @internal
     */
    _setAuthSafely(context = 'general') {
        this.setAuth().catch((e) => {
            this.log('error', `error setting auth in ${context}`, e);
        });
    }
    /**
     * Trigger state change callbacks with proper error handling
     * @internal
     */
    _triggerStateCallbacks(event, data) {
        try {
            this.stateChangeCallbacks[event].forEach((callback) => {
                try {
                    callback(data);
                }
                catch (e) {
                    this.log('error', `error in ${event} callback`, e);
                }
            });
        }
        catch (e) {
            this.log('error', `error triggering ${event} callbacks`, e);
        }
    }
    /**
     * Setup reconnection timer with proper configuration
     * @internal
     */
    _setupReconnectionTimer() {
        this.reconnectTimer = new Timer(async () => {
            setTimeout(async () => {
                await this._waitForAuthIfNeeded();
                if (!this.isConnected()) {
                    this.connect();
                }
            }, CONNECTION_TIMEOUTS.RECONNECT_DELAY);
        }, this.reconnectAfterMs);
    }
    /**
     * Initialize client options with defaults
     * @internal
     */
    _initializeOptions(options) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        // Set defaults
        this.transport = (_a = options === null || options === void 0 ? void 0 : options.transport) !== null && _a !== void 0 ? _a : null;
        this.timeout = (_b = options === null || options === void 0 ? void 0 : options.timeout) !== null && _b !== void 0 ? _b : DEFAULT_TIMEOUT;
        this.heartbeatIntervalMs =
            (_c = options === null || options === void 0 ? void 0 : options.heartbeatIntervalMs) !== null && _c !== void 0 ? _c : CONNECTION_TIMEOUTS.HEARTBEAT_INTERVAL;
        this.worker = (_d = options === null || options === void 0 ? void 0 : options.worker) !== null && _d !== void 0 ? _d : false;
        this.accessToken = (_e = options === null || options === void 0 ? void 0 : options.accessToken) !== null && _e !== void 0 ? _e : null;
        this.heartbeatCallback = (_f = options === null || options === void 0 ? void 0 : options.heartbeatCallback) !== null && _f !== void 0 ? _f : RealtimeClient_noop;
        // Handle special cases
        if (options === null || options === void 0 ? void 0 : options.params)
            this.params = options.params;
        if (options === null || options === void 0 ? void 0 : options.logger)
            this.logger = options.logger;
        if ((options === null || options === void 0 ? void 0 : options.logLevel) || (options === null || options === void 0 ? void 0 : options.log_level)) {
            this.logLevel = options.logLevel || options.log_level;
            this.params = Object.assign(Object.assign({}, this.params), { log_level: this.logLevel });
        }
        // Set up functions with defaults
        this.reconnectAfterMs =
            (_g = options === null || options === void 0 ? void 0 : options.reconnectAfterMs) !== null && _g !== void 0 ? _g : ((tries) => {
                return RECONNECT_INTERVALS[tries - 1] || DEFAULT_RECONNECT_FALLBACK;
            });
        this.encode =
            (_h = options === null || options === void 0 ? void 0 : options.encode) !== null && _h !== void 0 ? _h : ((payload, callback) => {
                return callback(JSON.stringify(payload));
            });
        this.decode =
            (_j = options === null || options === void 0 ? void 0 : options.decode) !== null && _j !== void 0 ? _j : this.serializer.decode.bind(this.serializer);
        // Handle worker setup
        if (this.worker) {
            if (typeof window !== 'undefined' && !window.Worker) {
                throw new Error('Web Worker is not supported');
            }
            this.workerUrl = options === null || options === void 0 ? void 0 : options.workerUrl;
        }
    }
}
//# sourceMappingURL=RealtimeClient.js.map
;// ./node_modules/@supabase/realtime-js/dist/module/index.js





//# sourceMappingURL=index.js.map
;// ./node_modules/@supabase/storage-js/dist/module/lib/errors.js
class StorageError extends Error {
    constructor(message) {
        super(message);
        this.__isStorageError = true;
        this.name = 'StorageError';
    }
}
function isStorageError(error) {
    return typeof error === 'object' && error !== null && '__isStorageError' in error;
}
class StorageApiError extends StorageError {
    constructor(message, status, statusCode) {
        super(message);
        this.name = 'StorageApiError';
        this.status = status;
        this.statusCode = statusCode;
    }
    toJSON() {
        return {
            name: this.name,
            message: this.message,
            status: this.status,
            statusCode: this.statusCode,
        };
    }
}
class StorageUnknownError extends StorageError {
    constructor(message, originalError) {
        super(message);
        this.name = 'StorageUnknownError';
        this.originalError = originalError;
    }
}
//# sourceMappingURL=errors.js.map
;// ./node_modules/@supabase/storage-js/dist/module/lib/helpers.js
var helpers_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const helpers_resolveFetch = (customFetch) => {
    let _fetch;
    if (customFetch) {
        _fetch = customFetch;
    }
    else if (typeof fetch === 'undefined') {
        _fetch = (...args) => Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 907)).then(({ default: fetch }) => fetch(...args));
    }
    else {
        _fetch = fetch;
    }
    return (...args) => _fetch(...args);
};
const resolveResponse = () => helpers_awaiter(void 0, void 0, void 0, function* () {
    if (typeof Response === 'undefined') {
        // @ts-ignore
        return (yield Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 907))).Response;
    }
    return Response;
});
const recursiveToCamel = (item) => {
    if (Array.isArray(item)) {
        return item.map((el) => recursiveToCamel(el));
    }
    else if (typeof item === 'function' || item !== Object(item)) {
        return item;
    }
    const result = {};
    Object.entries(item).forEach(([key, value]) => {
        const newKey = key.replace(/([-_][a-z])/gi, (c) => c.toUpperCase().replace(/[-_]/g, ''));
        result[newKey] = recursiveToCamel(value);
    });
    return result;
};
/**
 * Determine if input is a plain object
 * An object is plain if it's created by either {}, new Object(), or Object.create(null)
 * source: https://github.com/sindresorhus/is-plain-obj
 */
const isPlainObject = (value) => {
    if (typeof value !== 'object' || value === null) {
        return false;
    }
    const prototype = Object.getPrototypeOf(value);
    return ((prototype === null ||
        prototype === Object.prototype ||
        Object.getPrototypeOf(prototype) === null) &&
        !(Symbol.toStringTag in value) &&
        !(Symbol.iterator in value));
};
//# sourceMappingURL=helpers.js.map
;// ./node_modules/@supabase/storage-js/dist/module/lib/fetch.js
var fetch_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


const _getErrorMessage = (err) => err.msg || err.message || err.error_description || err.error || JSON.stringify(err);
const handleError = (error, reject, options) => fetch_awaiter(void 0, void 0, void 0, function* () {
    const Res = yield resolveResponse();
    if (error instanceof Res && !(options === null || options === void 0 ? void 0 : options.noResolveJson)) {
        error
            .json()
            .then((err) => {
            const status = error.status || 500;
            const statusCode = (err === null || err === void 0 ? void 0 : err.statusCode) || status + '';
            reject(new StorageApiError(_getErrorMessage(err), status, statusCode));
        })
            .catch((err) => {
            reject(new StorageUnknownError(_getErrorMessage(err), err));
        });
    }
    else {
        reject(new StorageUnknownError(_getErrorMessage(error), error));
    }
});
const _getRequestParams = (method, options, parameters, body) => {
    const params = { method, headers: (options === null || options === void 0 ? void 0 : options.headers) || {} };
    if (method === 'GET' || !body) {
        return params;
    }
    if (isPlainObject(body)) {
        params.headers = Object.assign({ 'Content-Type': 'application/json' }, options === null || options === void 0 ? void 0 : options.headers);
        params.body = JSON.stringify(body);
    }
    else {
        params.body = body;
    }
    if (options === null || options === void 0 ? void 0 : options.duplex) {
        params.duplex = options.duplex;
    }
    return Object.assign(Object.assign({}, params), parameters);
};
function _handleRequest(fetcher, method, url, options, parameters, body) {
    return fetch_awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            fetcher(url, _getRequestParams(method, options, parameters, body))
                .then((result) => {
                if (!result.ok)
                    throw result;
                if (options === null || options === void 0 ? void 0 : options.noResolveJson)
                    return result;
                return result.json();
            })
                .then((data) => resolve(data))
                .catch((error) => handleError(error, reject, options));
        });
    });
}
function get(fetcher, url, options, parameters) {
    return fetch_awaiter(this, void 0, void 0, function* () {
        return _handleRequest(fetcher, 'GET', url, options, parameters);
    });
}
function post(fetcher, url, body, options, parameters) {
    return fetch_awaiter(this, void 0, void 0, function* () {
        return _handleRequest(fetcher, 'POST', url, options, parameters, body);
    });
}
function put(fetcher, url, body, options, parameters) {
    return fetch_awaiter(this, void 0, void 0, function* () {
        return _handleRequest(fetcher, 'PUT', url, options, parameters, body);
    });
}
function head(fetcher, url, options, parameters) {
    return fetch_awaiter(this, void 0, void 0, function* () {
        return _handleRequest(fetcher, 'HEAD', url, Object.assign(Object.assign({}, options), { noResolveJson: true }), parameters);
    });
}
function remove(fetcher, url, body, options, parameters) {
    return fetch_awaiter(this, void 0, void 0, function* () {
        return _handleRequest(fetcher, 'DELETE', url, options, parameters, body);
    });
}
//# sourceMappingURL=fetch.js.map
;// ./node_modules/@supabase/storage-js/dist/module/packages/StreamDownloadBuilder.js
var StreamDownloadBuilder_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

class StreamDownloadBuilder {
    constructor(downloadFn, shouldThrowOnError) {
        this.downloadFn = downloadFn;
        this.shouldThrowOnError = shouldThrowOnError;
    }
    then(onfulfilled, onrejected) {
        return this.execute().then(onfulfilled, onrejected);
    }
    execute() {
        return StreamDownloadBuilder_awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.downloadFn();
                return {
                    data: result.body,
                    error: null,
                };
            }
            catch (error) {
                if (this.shouldThrowOnError) {
                    throw error;
                }
                if (isStorageError(error)) {
                    return { data: null, error };
                }
                throw error;
            }
        });
    }
}
//# sourceMappingURL=StreamDownloadBuilder.js.map
;// ./node_modules/@supabase/storage-js/dist/module/packages/BlobDownloadBuilder.js
var BlobDownloadBuilder_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


class BlobDownloadBuilder {
    constructor(downloadFn, shouldThrowOnError) {
        this.downloadFn = downloadFn;
        this.shouldThrowOnError = shouldThrowOnError;
    }
    asStream() {
        return new StreamDownloadBuilder(this.downloadFn, this.shouldThrowOnError);
    }
    then(onfulfilled, onrejected) {
        return this.execute().then(onfulfilled, onrejected);
    }
    execute() {
        return BlobDownloadBuilder_awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.downloadFn();
                return {
                    data: yield result.blob(),
                    error: null,
                };
            }
            catch (error) {
                if (this.shouldThrowOnError) {
                    throw error;
                }
                if (isStorageError(error)) {
                    return { data: null, error };
                }
                throw error;
            }
        });
    }
}
//# sourceMappingURL=BlobDownloadBuilder.js.map
;// ./node_modules/@supabase/storage-js/dist/module/packages/StorageFileApi.js
var StorageFileApi_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




const DEFAULT_SEARCH_OPTIONS = {
    limit: 100,
    offset: 0,
    sortBy: {
        column: 'name',
        order: 'asc',
    },
};
const DEFAULT_FILE_OPTIONS = {
    cacheControl: '3600',
    contentType: 'text/plain;charset=UTF-8',
    upsert: false,
};
class StorageFileApi {
    constructor(url, headers = {}, bucketId, fetch) {
        this.shouldThrowOnError = false;
        this.url = url;
        this.headers = headers;
        this.bucketId = bucketId;
        this.fetch = helpers_resolveFetch(fetch);
    }
    /**
     * Enable throwing errors instead of returning them.
     */
    throwOnError() {
        this.shouldThrowOnError = true;
        return this;
    }
    /**
     * Uploads a file to an existing bucket or replaces an existing file at the specified path with a new one.
     *
     * @param method HTTP method.
     * @param path The relative file path. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
     * @param fileBody The body of the file to be stored in the bucket.
     */
    uploadOrUpdate(method, path, fileBody, fileOptions) {
        return StorageFileApi_awaiter(this, void 0, void 0, function* () {
            try {
                let body;
                const options = Object.assign(Object.assign({}, DEFAULT_FILE_OPTIONS), fileOptions);
                let headers = Object.assign(Object.assign({}, this.headers), (method === 'POST' && { 'x-upsert': String(options.upsert) }));
                const metadata = options.metadata;
                if (typeof Blob !== 'undefined' && fileBody instanceof Blob) {
                    body = new FormData();
                    body.append('cacheControl', options.cacheControl);
                    if (metadata) {
                        body.append('metadata', this.encodeMetadata(metadata));
                    }
                    body.append('', fileBody);
                }
                else if (typeof FormData !== 'undefined' && fileBody instanceof FormData) {
                    body = fileBody;
                    body.append('cacheControl', options.cacheControl);
                    if (metadata) {
                        body.append('metadata', this.encodeMetadata(metadata));
                    }
                }
                else {
                    body = fileBody;
                    headers['cache-control'] = `max-age=${options.cacheControl}`;
                    headers['content-type'] = options.contentType;
                    if (metadata) {
                        headers['x-metadata'] = this.toBase64(this.encodeMetadata(metadata));
                    }
                }
                if (fileOptions === null || fileOptions === void 0 ? void 0 : fileOptions.headers) {
                    headers = Object.assign(Object.assign({}, headers), fileOptions.headers);
                }
                const cleanPath = this._removeEmptyFolders(path);
                const _path = this._getFinalPath(cleanPath);
                const data = yield (method == 'PUT' ? put : post)(this.fetch, `${this.url}/object/${_path}`, body, Object.assign({ headers }, ((options === null || options === void 0 ? void 0 : options.duplex) ? { duplex: options.duplex } : {})));
                return {
                    data: { path: cleanPath, id: data.Id, fullPath: data.Key },
                    error: null,
                };
            }
            catch (error) {
                if (this.shouldThrowOnError) {
                    throw error;
                }
                if (isStorageError(error)) {
                    return { data: null, error };
                }
                throw error;
            }
        });
    }
    /**
     * Uploads a file to an existing bucket.
     *
     * @param path The file path, including the file name. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
     * @param fileBody The body of the file to be stored in the bucket.
     */
    upload(path, fileBody, fileOptions) {
        return StorageFileApi_awaiter(this, void 0, void 0, function* () {
            return this.uploadOrUpdate('POST', path, fileBody, fileOptions);
        });
    }
    /**
     * Upload a file with a token generated from `createSignedUploadUrl`.
     * @param path The file path, including the file name. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
     * @param token The token generated from `createSignedUploadUrl`
     * @param fileBody The body of the file to be stored in the bucket.
     */
    uploadToSignedUrl(path, token, fileBody, fileOptions) {
        return StorageFileApi_awaiter(this, void 0, void 0, function* () {
            const cleanPath = this._removeEmptyFolders(path);
            const _path = this._getFinalPath(cleanPath);
            const url = new URL(this.url + `/object/upload/sign/${_path}`);
            url.searchParams.set('token', token);
            try {
                let body;
                const options = Object.assign({ upsert: DEFAULT_FILE_OPTIONS.upsert }, fileOptions);
                const headers = Object.assign(Object.assign({}, this.headers), { 'x-upsert': String(options.upsert) });
                if (typeof Blob !== 'undefined' && fileBody instanceof Blob) {
                    body = new FormData();
                    body.append('cacheControl', options.cacheControl);
                    body.append('', fileBody);
                }
                else if (typeof FormData !== 'undefined' && fileBody instanceof FormData) {
                    body = fileBody;
                    body.append('cacheControl', options.cacheControl);
                }
                else {
                    body = fileBody;
                    headers['cache-control'] = `max-age=${options.cacheControl}`;
                    headers['content-type'] = options.contentType;
                }
                const data = yield put(this.fetch, url.toString(), body, { headers });
                return {
                    data: { path: cleanPath, fullPath: data.Key },
                    error: null,
                };
            }
            catch (error) {
                if (this.shouldThrowOnError) {
                    throw error;
                }
                if (isStorageError(error)) {
                    return { data: null, error };
                }
                throw error;
            }
        });
    }
    /**
     * Creates a signed upload URL.
     * Signed upload URLs can be used to upload files to the bucket without further authentication.
     * They are valid for 2 hours.
     * @param path The file path, including the current file name. For example `folder/image.png`.
     * @param options.upsert If set to true, allows the file to be overwritten if it already exists.
     */
    createSignedUploadUrl(path, options) {
        return StorageFileApi_awaiter(this, void 0, void 0, function* () {
            try {
                let _path = this._getFinalPath(path);
                const headers = Object.assign({}, this.headers);
                if (options === null || options === void 0 ? void 0 : options.upsert) {
                    headers['x-upsert'] = 'true';
                }
                const data = yield post(this.fetch, `${this.url}/object/upload/sign/${_path}`, {}, { headers });
                const url = new URL(this.url + data.url);
                const token = url.searchParams.get('token');
                if (!token) {
                    throw new StorageError('No token returned by API');
                }
                return { data: { signedUrl: url.toString(), path, token }, error: null };
            }
            catch (error) {
                if (this.shouldThrowOnError) {
                    throw error;
                }
                if (isStorageError(error)) {
                    return { data: null, error };
                }
                throw error;
            }
        });
    }
    /**
     * Replaces an existing file at the specified path with a new one.
     *
     * @param path The relative file path. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to update.
     * @param fileBody The body of the file to be stored in the bucket.
     */
    update(path, fileBody, fileOptions) {
        return StorageFileApi_awaiter(this, void 0, void 0, function* () {
            return this.uploadOrUpdate('PUT', path, fileBody, fileOptions);
        });
    }
    /**
     * Moves an existing file to a new path in the same bucket.
     *
     * @param fromPath The original file path, including the current file name. For example `folder/image.png`.
     * @param toPath The new file path, including the new file name. For example `folder/image-new.png`.
     * @param options The destination options.
     */
    move(fromPath, toPath, options) {
        return StorageFileApi_awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield post(this.fetch, `${this.url}/object/move`, {
                    bucketId: this.bucketId,
                    sourceKey: fromPath,
                    destinationKey: toPath,
                    destinationBucket: options === null || options === void 0 ? void 0 : options.destinationBucket,
                }, { headers: this.headers });
                return { data, error: null };
            }
            catch (error) {
                if (this.shouldThrowOnError) {
                    throw error;
                }
                if (isStorageError(error)) {
                    return { data: null, error };
                }
                throw error;
            }
        });
    }
    /**
     * Copies an existing file to a new path in the same bucket.
     *
     * @param fromPath The original file path, including the current file name. For example `folder/image.png`.
     * @param toPath The new file path, including the new file name. For example `folder/image-copy.png`.
     * @param options The destination options.
     */
    copy(fromPath, toPath, options) {
        return StorageFileApi_awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield post(this.fetch, `${this.url}/object/copy`, {
                    bucketId: this.bucketId,
                    sourceKey: fromPath,
                    destinationKey: toPath,
                    destinationBucket: options === null || options === void 0 ? void 0 : options.destinationBucket,
                }, { headers: this.headers });
                return { data: { path: data.Key }, error: null };
            }
            catch (error) {
                if (this.shouldThrowOnError) {
                    throw error;
                }
                if (isStorageError(error)) {
                    return { data: null, error };
                }
                throw error;
            }
        });
    }
    /**
     * Creates a signed URL. Use a signed URL to share a file for a fixed amount of time.
     *
     * @param path The file path, including the current file name. For example `folder/image.png`.
     * @param expiresIn The number of seconds until the signed URL expires. For example, `60` for a URL which is valid for one minute.
     * @param options.download triggers the file as a download if set to true. Set this parameter as the name of the file if you want to trigger the download with a different filename.
     * @param options.transform Transform the asset before serving it to the client.
     */
    createSignedUrl(path, expiresIn, options) {
        return StorageFileApi_awaiter(this, void 0, void 0, function* () {
            try {
                let _path = this._getFinalPath(path);
                let data = yield post(this.fetch, `${this.url}/object/sign/${_path}`, Object.assign({ expiresIn }, ((options === null || options === void 0 ? void 0 : options.transform) ? { transform: options.transform } : {})), { headers: this.headers });
                const downloadQueryParam = (options === null || options === void 0 ? void 0 : options.download)
                    ? `&download=${options.download === true ? '' : options.download}`
                    : '';
                const signedUrl = encodeURI(`${this.url}${data.signedURL}${downloadQueryParam}`);
                data = { signedUrl };
                return { data, error: null };
            }
            catch (error) {
                if (this.shouldThrowOnError) {
                    throw error;
                }
                if (isStorageError(error)) {
                    return { data: null, error };
                }
                throw error;
            }
        });
    }
    /**
     * Creates multiple signed URLs. Use a signed URL to share a file for a fixed amount of time.
     *
     * @param paths The file paths to be downloaded, including the current file names. For example `['folder/image.png', 'folder2/image2.png']`.
     * @param expiresIn The number of seconds until the signed URLs expire. For example, `60` for URLs which are valid for one minute.
     * @param options.download triggers the file as a download if set to true. Set this parameter as the name of the file if you want to trigger the download with a different filename.
     */
    createSignedUrls(paths, expiresIn, options) {
        return StorageFileApi_awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield post(this.fetch, `${this.url}/object/sign/${this.bucketId}`, { expiresIn, paths }, { headers: this.headers });
                const downloadQueryParam = (options === null || options === void 0 ? void 0 : options.download)
                    ? `&download=${options.download === true ? '' : options.download}`
                    : '';
                return {
                    data: data.map((datum) => (Object.assign(Object.assign({}, datum), { signedUrl: datum.signedURL
                            ? encodeURI(`${this.url}${datum.signedURL}${downloadQueryParam}`)
                            : null }))),
                    error: null,
                };
            }
            catch (error) {
                if (this.shouldThrowOnError) {
                    throw error;
                }
                if (isStorageError(error)) {
                    return { data: null, error };
                }
                throw error;
            }
        });
    }
    /**
     * Downloads a file from a private bucket. For public buckets, make a request to the URL returned from `getPublicUrl` instead.
     *
     * @param path The full path and file name of the file to be downloaded. For example `folder/image.png`.
     * @param options.transform Transform the asset before serving it to the client.
     */
    download(path, options) {
        const wantsTransformation = typeof (options === null || options === void 0 ? void 0 : options.transform) !== 'undefined';
        const renderPath = wantsTransformation ? 'render/image/authenticated' : 'object';
        const transformationQuery = this.transformOptsToQueryString((options === null || options === void 0 ? void 0 : options.transform) || {});
        const queryString = transformationQuery ? `?${transformationQuery}` : '';
        const _path = this._getFinalPath(path);
        const downloadFn = () => get(this.fetch, `${this.url}/${renderPath}/${_path}${queryString}`, {
            headers: this.headers,
            noResolveJson: true,
        });
        return new BlobDownloadBuilder(downloadFn, this.shouldThrowOnError);
    }
    /**
     * Retrieves the details of an existing file.
     * @param path
     */
    info(path) {
        return StorageFileApi_awaiter(this, void 0, void 0, function* () {
            const _path = this._getFinalPath(path);
            try {
                const data = yield get(this.fetch, `${this.url}/object/info/${_path}`, {
                    headers: this.headers,
                });
                return { data: recursiveToCamel(data), error: null };
            }
            catch (error) {
                if (this.shouldThrowOnError) {
                    throw error;
                }
                if (isStorageError(error)) {
                    return { data: null, error };
                }
                throw error;
            }
        });
    }
    /**
     * Checks the existence of a file.
     * @param path
     */
    exists(path) {
        return StorageFileApi_awaiter(this, void 0, void 0, function* () {
            const _path = this._getFinalPath(path);
            try {
                yield head(this.fetch, `${this.url}/object/${_path}`, {
                    headers: this.headers,
                });
                return { data: true, error: null };
            }
            catch (error) {
                if (this.shouldThrowOnError) {
                    throw error;
                }
                if (isStorageError(error) && error instanceof StorageUnknownError) {
                    const originalError = error.originalError;
                    if ([400, 404].includes(originalError === null || originalError === void 0 ? void 0 : originalError.status)) {
                        return { data: false, error };
                    }
                }
                throw error;
            }
        });
    }
    /**
     * A simple convenience function to get the URL for an asset in a public bucket. If you do not want to use this function, you can construct the public URL by concatenating the bucket URL with the path to the asset.
     * This function does not verify if the bucket is public. If a public URL is created for a bucket which is not public, you will not be able to download the asset.
     *
     * @param path The path and name of the file to generate the public URL for. For example `folder/image.png`.
     * @param options.download Triggers the file as a download if set to true. Set this parameter as the name of the file if you want to trigger the download with a different filename.
     * @param options.transform Transform the asset before serving it to the client.
     */
    getPublicUrl(path, options) {
        const _path = this._getFinalPath(path);
        const _queryString = [];
        const downloadQueryParam = (options === null || options === void 0 ? void 0 : options.download)
            ? `download=${options.download === true ? '' : options.download}`
            : '';
        if (downloadQueryParam !== '') {
            _queryString.push(downloadQueryParam);
        }
        const wantsTransformation = typeof (options === null || options === void 0 ? void 0 : options.transform) !== 'undefined';
        const renderPath = wantsTransformation ? 'render/image' : 'object';
        const transformationQuery = this.transformOptsToQueryString((options === null || options === void 0 ? void 0 : options.transform) || {});
        if (transformationQuery !== '') {
            _queryString.push(transformationQuery);
        }
        let queryString = _queryString.join('&');
        if (queryString !== '') {
            queryString = `?${queryString}`;
        }
        return {
            data: { publicUrl: encodeURI(`${this.url}/${renderPath}/public/${_path}${queryString}`) },
        };
    }
    /**
     * Deletes files within the same bucket
     *
     * @param paths An array of files to delete, including the path and file name. For example [`'folder/image.png'`].
     */
    remove(paths) {
        return StorageFileApi_awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield remove(this.fetch, `${this.url}/object/${this.bucketId}`, { prefixes: paths }, { headers: this.headers });
                return { data, error: null };
            }
            catch (error) {
                if (this.shouldThrowOnError) {
                    throw error;
                }
                if (isStorageError(error)) {
                    return { data: null, error };
                }
                throw error;
            }
        });
    }
    /**
     * Get file metadata
     * @param id the file id to retrieve metadata
     */
    // async getMetadata(
    //   id: string
    // ): Promise<
    //   | {
    //       data: Metadata
    //       error: null
    //     }
    //   | {
    //       data: null
    //       error: StorageError
    //     }
    // > {
    //   try {
    //     const data = await get(this.fetch, `${this.url}/metadata/${id}`, { headers: this.headers })
    //     return { data, error: null }
    //   } catch (error) {
    //     if (isStorageError(error)) {
    //       return { data: null, error }
    //     }
    //     throw error
    //   }
    // }
    /**
     * Update file metadata
     * @param id the file id to update metadata
     * @param meta the new file metadata
     */
    // async updateMetadata(
    //   id: string,
    //   meta: Metadata
    // ): Promise<
    //   | {
    //       data: Metadata
    //       error: null
    //     }
    //   | {
    //       data: null
    //       error: StorageError
    //     }
    // > {
    //   try {
    //     const data = await post(
    //       this.fetch,
    //       `${this.url}/metadata/${id}`,
    //       { ...meta },
    //       { headers: this.headers }
    //     )
    //     return { data, error: null }
    //   } catch (error) {
    //     if (isStorageError(error)) {
    //       return { data: null, error }
    //     }
    //     throw error
    //   }
    // }
    /**
     * Lists all the files and folders within a path of the bucket.
     * @param path The folder path.
     * @param options Search options including limit (defaults to 100), offset, sortBy, and search
     */
    list(path, options, parameters) {
        return StorageFileApi_awaiter(this, void 0, void 0, function* () {
            try {
                const body = Object.assign(Object.assign(Object.assign({}, DEFAULT_SEARCH_OPTIONS), options), { prefix: path || '' });
                const data = yield post(this.fetch, `${this.url}/object/list/${this.bucketId}`, body, { headers: this.headers }, parameters);
                return { data, error: null };
            }
            catch (error) {
                if (this.shouldThrowOnError) {
                    throw error;
                }
                if (isStorageError(error)) {
                    return { data: null, error };
                }
                throw error;
            }
        });
    }
    /**
     * @experimental this method signature might change in the future
     * @param options search options
     * @param parameters
     */
    listV2(options, parameters) {
        return StorageFileApi_awaiter(this, void 0, void 0, function* () {
            try {
                const body = Object.assign({}, options);
                const data = yield post(this.fetch, `${this.url}/object/list-v2/${this.bucketId}`, body, { headers: this.headers }, parameters);
                return { data, error: null };
            }
            catch (error) {
                if (this.shouldThrowOnError) {
                    throw error;
                }
                if (isStorageError(error)) {
                    return { data: null, error };
                }
                throw error;
            }
        });
    }
    encodeMetadata(metadata) {
        return JSON.stringify(metadata);
    }
    toBase64(data) {
        if (typeof Buffer !== 'undefined') {
            return Buffer.from(data).toString('base64');
        }
        return btoa(data);
    }
    _getFinalPath(path) {
        return `${this.bucketId}/${path.replace(/^\/+/, '')}`;
    }
    _removeEmptyFolders(path) {
        return path.replace(/^\/|\/$/g, '').replace(/\/+/g, '/');
    }
    transformOptsToQueryString(transform) {
        const params = [];
        if (transform.width) {
            params.push(`width=${transform.width}`);
        }
        if (transform.height) {
            params.push(`height=${transform.height}`);
        }
        if (transform.resize) {
            params.push(`resize=${transform.resize}`);
        }
        if (transform.format) {
            params.push(`format=${transform.format}`);
        }
        if (transform.quality) {
            params.push(`quality=${transform.quality}`);
        }
        return params.join('&');
    }
}
//# sourceMappingURL=StorageFileApi.js.map
;// ./node_modules/@supabase/storage-js/dist/module/lib/version.js
// generated by genversion
const lib_version_version = '2.12.2';
//# sourceMappingURL=version.js.map
;// ./node_modules/@supabase/storage-js/dist/module/lib/constants.js

const DEFAULT_HEADERS = { 'X-Client-Info': `storage-js/${lib_version_version}` };
//# sourceMappingURL=constants.js.map
;// ./node_modules/@supabase/storage-js/dist/module/packages/StorageBucketApi.js
var StorageBucketApi_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




class StorageBucketApi {
    constructor(url, headers = {}, fetch, opts) {
        this.shouldThrowOnError = false;
        const baseUrl = new URL(url);
        // if legacy uri is used, replace with new storage host (disables request buffering to allow > 50GB uploads)
        // "project-ref.supabase.co" becomes "project-ref.storage.supabase.co"
        if (opts === null || opts === void 0 ? void 0 : opts.useNewHostname) {
            const isSupabaseHost = /supabase\.(co|in|red)$/.test(baseUrl.hostname);
            if (isSupabaseHost && !baseUrl.hostname.includes('storage.supabase.')) {
                baseUrl.hostname = baseUrl.hostname.replace('supabase.', 'storage.supabase.');
            }
        }
        this.url = baseUrl.href;
        this.headers = Object.assign(Object.assign({}, DEFAULT_HEADERS), headers);
        this.fetch = helpers_resolveFetch(fetch);
    }
    /**
     * Enable throwing errors instead of returning them.
     */
    throwOnError() {
        this.shouldThrowOnError = true;
        return this;
    }
    /**
     * Retrieves the details of all Storage buckets within an existing project.
     */
    listBuckets() {
        return StorageBucketApi_awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield get(this.fetch, `${this.url}/bucket`, { headers: this.headers });
                return { data, error: null };
            }
            catch (error) {
                if (this.shouldThrowOnError) {
                    throw error;
                }
                if (isStorageError(error)) {
                    return { data: null, error };
                }
                throw error;
            }
        });
    }
    /**
     * Retrieves the details of an existing Storage bucket.
     *
     * @param id The unique identifier of the bucket you would like to retrieve.
     */
    getBucket(id) {
        return StorageBucketApi_awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield get(this.fetch, `${this.url}/bucket/${id}`, { headers: this.headers });
                return { data, error: null };
            }
            catch (error) {
                if (this.shouldThrowOnError) {
                    throw error;
                }
                if (isStorageError(error)) {
                    return { data: null, error };
                }
                throw error;
            }
        });
    }
    /**
     * Creates a new Storage bucket
     *
     * @param id A unique identifier for the bucket you are creating.
     * @param options.public The visibility of the bucket. Public buckets don't require an authorization token to download objects, but still require a valid token for all other operations. By default, buckets are private.
     * @param options.fileSizeLimit specifies the max file size in bytes that can be uploaded to this bucket.
     * The global file size limit takes precedence over this value.
     * The default value is null, which doesn't set a per bucket file size limit.
     * @param options.allowedMimeTypes specifies the allowed mime types that this bucket can accept during upload.
     * The default value is null, which allows files with all mime types to be uploaded.
     * Each mime type specified can be a wildcard, e.g. image/*, or a specific mime type, e.g. image/png.
     * @returns newly created bucket id
     * @param options.type (private-beta) specifies the bucket type. see `BucketType` for more details.
     *   - default bucket type is `STANDARD`
     */
    createBucket(id, options = {
        public: false,
    }) {
        return StorageBucketApi_awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield post(this.fetch, `${this.url}/bucket`, {
                    id,
                    name: id,
                    type: options.type,
                    public: options.public,
                    file_size_limit: options.fileSizeLimit,
                    allowed_mime_types: options.allowedMimeTypes,
                }, { headers: this.headers });
                return { data, error: null };
            }
            catch (error) {
                if (this.shouldThrowOnError) {
                    throw error;
                }
                if (isStorageError(error)) {
                    return { data: null, error };
                }
                throw error;
            }
        });
    }
    /**
     * Updates a Storage bucket
     *
     * @param id A unique identifier for the bucket you are updating.
     * @param options.public The visibility of the bucket. Public buckets don't require an authorization token to download objects, but still require a valid token for all other operations.
     * @param options.fileSizeLimit specifies the max file size in bytes that can be uploaded to this bucket.
     * The global file size limit takes precedence over this value.
     * The default value is null, which doesn't set a per bucket file size limit.
     * @param options.allowedMimeTypes specifies the allowed mime types that this bucket can accept during upload.
     * The default value is null, which allows files with all mime types to be uploaded.
     * Each mime type specified can be a wildcard, e.g. image/*, or a specific mime type, e.g. image/png.
     */
    updateBucket(id, options) {
        return StorageBucketApi_awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield put(this.fetch, `${this.url}/bucket/${id}`, {
                    id,
                    name: id,
                    public: options.public,
                    file_size_limit: options.fileSizeLimit,
                    allowed_mime_types: options.allowedMimeTypes,
                }, { headers: this.headers });
                return { data, error: null };
            }
            catch (error) {
                if (this.shouldThrowOnError) {
                    throw error;
                }
                if (isStorageError(error)) {
                    return { data: null, error };
                }
                throw error;
            }
        });
    }
    /**
     * Removes all objects inside a single bucket.
     *
     * @param id The unique identifier of the bucket you would like to empty.
     */
    emptyBucket(id) {
        return StorageBucketApi_awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield post(this.fetch, `${this.url}/bucket/${id}/empty`, {}, { headers: this.headers });
                return { data, error: null };
            }
            catch (error) {
                if (this.shouldThrowOnError) {
                    throw error;
                }
                if (isStorageError(error)) {
                    return { data: null, error };
                }
                throw error;
            }
        });
    }
    /**
     * Deletes an existing bucket. A bucket can't be deleted with existing objects inside it.
     * You must first `empty()` the bucket.
     *
     * @param id The unique identifier of the bucket you would like to delete.
     */
    deleteBucket(id) {
        return StorageBucketApi_awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield remove(this.fetch, `${this.url}/bucket/${id}`, {}, { headers: this.headers });
                return { data, error: null };
            }
            catch (error) {
                if (this.shouldThrowOnError) {
                    throw error;
                }
                if (isStorageError(error)) {
                    return { data: null, error };
                }
                throw error;
            }
        });
    }
}
//# sourceMappingURL=StorageBucketApi.js.map
;// ./node_modules/@supabase/storage-js/dist/module/StorageClient.js


class StorageClient extends StorageBucketApi {
    constructor(url, headers = {}, fetch, opts) {
        super(url, headers, fetch, opts);
    }
    /**
     * Perform file operation in a bucket.
     *
     * @param id The bucket id to operate on.
     */
    from(id) {
        return new StorageFileApi(this.url, this.headers, id, this.fetch);
    }
}
//# sourceMappingURL=StorageClient.js.map
;// ./node_modules/@supabase/supabase-js/dist/module/lib/version.js
const module_lib_version_version = '2.58.0';
//# sourceMappingURL=version.js.map
;// ./node_modules/@supabase/supabase-js/dist/module/lib/constants.js

let JS_ENV = '';
// @ts-ignore
if (typeof Deno !== 'undefined') {
    JS_ENV = 'deno';
}
else if (typeof document !== 'undefined') {
    JS_ENV = 'web';
}
else if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    JS_ENV = 'react-native';
}
else {
    JS_ENV = 'node';
}
const constants_DEFAULT_HEADERS = { 'X-Client-Info': `supabase-js-${JS_ENV}/${module_lib_version_version}` };
const DEFAULT_GLOBAL_OPTIONS = {
    headers: constants_DEFAULT_HEADERS,
};
const DEFAULT_DB_OPTIONS = {
    schema: 'public',
};
const DEFAULT_AUTH_OPTIONS = {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'implicit',
};
const DEFAULT_REALTIME_OPTIONS = {};
//# sourceMappingURL=constants.js.map
// EXTERNAL MODULE: ./node_modules/@supabase/node-fetch/browser.js
var browser = __webpack_require__(907);
;// ./node_modules/@supabase/supabase-js/dist/module/lib/fetch.js
var lib_fetch_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// @ts-ignore

const fetch_resolveFetch = (customFetch) => {
    let _fetch;
    if (customFetch) {
        _fetch = customFetch;
    }
    else if (typeof fetch === 'undefined') {
        _fetch = browser["default"];
    }
    else {
        _fetch = fetch;
    }
    return (...args) => _fetch(...args);
};
const resolveHeadersConstructor = () => {
    if (typeof Headers === 'undefined') {
        return browser.Headers;
    }
    return Headers;
};
const fetchWithAuth = (supabaseKey, getAccessToken, customFetch) => {
    const fetch = fetch_resolveFetch(customFetch);
    const HeadersConstructor = resolveHeadersConstructor();
    return (input, init) => lib_fetch_awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const accessToken = (_a = (yield getAccessToken())) !== null && _a !== void 0 ? _a : supabaseKey;
        let headers = new HeadersConstructor(init === null || init === void 0 ? void 0 : init.headers);
        if (!headers.has('apikey')) {
            headers.set('apikey', supabaseKey);
        }
        if (!headers.has('Authorization')) {
            headers.set('Authorization', `Bearer ${accessToken}`);
        }
        return fetch(input, Object.assign(Object.assign({}, init), { headers }));
    });
};
//# sourceMappingURL=fetch.js.map
;// ./node_modules/@supabase/supabase-js/dist/module/lib/helpers.js
var lib_helpers_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0, v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
function ensureTrailingSlash(url) {
    return url.endsWith('/') ? url : url + '/';
}
const isBrowser = () => typeof window !== 'undefined';
function applySettingDefaults(options, defaults) {
    var _a, _b;
    const { db: dbOptions, auth: authOptions, realtime: realtimeOptions, global: globalOptions, } = options;
    const { db: DEFAULT_DB_OPTIONS, auth: DEFAULT_AUTH_OPTIONS, realtime: DEFAULT_REALTIME_OPTIONS, global: DEFAULT_GLOBAL_OPTIONS, } = defaults;
    const result = {
        db: Object.assign(Object.assign({}, DEFAULT_DB_OPTIONS), dbOptions),
        auth: Object.assign(Object.assign({}, DEFAULT_AUTH_OPTIONS), authOptions),
        realtime: Object.assign(Object.assign({}, DEFAULT_REALTIME_OPTIONS), realtimeOptions),
        storage: {},
        global: Object.assign(Object.assign(Object.assign({}, DEFAULT_GLOBAL_OPTIONS), globalOptions), { headers: Object.assign(Object.assign({}, ((_a = DEFAULT_GLOBAL_OPTIONS === null || DEFAULT_GLOBAL_OPTIONS === void 0 ? void 0 : DEFAULT_GLOBAL_OPTIONS.headers) !== null && _a !== void 0 ? _a : {})), ((_b = globalOptions === null || globalOptions === void 0 ? void 0 : globalOptions.headers) !== null && _b !== void 0 ? _b : {})) }),
        accessToken: () => lib_helpers_awaiter(this, void 0, void 0, function* () { return ''; }),
    };
    if (options.accessToken) {
        result.accessToken = options.accessToken;
    }
    else {
        // hack around Required<>
        delete result.accessToken;
    }
    return result;
}
/**
 * Validates a Supabase client URL
 *
 * @param {string} supabaseUrl - The Supabase client URL string.
 * @returns {URL} - The validated base URL.
 * @throws {Error}
 */
function validateSupabaseUrl(supabaseUrl) {
    const trimmedUrl = supabaseUrl === null || supabaseUrl === void 0 ? void 0 : supabaseUrl.trim();
    if (!trimmedUrl) {
        throw new Error('supabaseUrl is required.');
    }
    if (!trimmedUrl.match(/^https?:\/\//i)) {
        throw new Error('Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.');
    }
    try {
        return new URL(ensureTrailingSlash(trimmedUrl));
    }
    catch (_a) {
        throw Error('Invalid supabaseUrl: Provided URL is malformed.');
    }
}
//# sourceMappingURL=helpers.js.map
;// ./node_modules/@supabase/auth-js/dist/module/lib/version.js
const dist_module_lib_version_version = '2.72.0';
//# sourceMappingURL=version.js.map
;// ./node_modules/@supabase/auth-js/dist/module/lib/constants.js

/** Current session will be checked for refresh at this interval. */
const AUTO_REFRESH_TICK_DURATION_MS = 30 * 1000;
/**
 * A token refresh will be attempted this many ticks before the current session expires. */
const AUTO_REFRESH_TICK_THRESHOLD = 3;
/*
 * Earliest time before an access token expires that the session should be refreshed.
 */
const EXPIRY_MARGIN_MS = AUTO_REFRESH_TICK_THRESHOLD * AUTO_REFRESH_TICK_DURATION_MS;
const GOTRUE_URL = 'http://localhost:9999';
const STORAGE_KEY = 'supabase.auth.token';
const AUDIENCE = '';
const lib_constants_DEFAULT_HEADERS = { 'X-Client-Info': `gotrue-js/${dist_module_lib_version_version}` };
const NETWORK_FAILURE = {
    MAX_RETRIES: 10,
    RETRY_INTERVAL: 2, // in deciseconds
};
const API_VERSION_HEADER_NAME = 'X-Supabase-Api-Version';
const API_VERSIONS = {
    '2024-01-01': {
        timestamp: Date.parse('2024-01-01T00:00:00.0Z'),
        name: '2024-01-01',
    },
};
const BASE64URL_REGEX = /^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}$|[a-z0-9_-]{2}$)$/i;
const JWKS_TTL = 10 * 60 * 1000; // 10 minutes
//# sourceMappingURL=constants.js.map
;// ./node_modules/@supabase/auth-js/dist/module/lib/errors.js
class AuthError extends Error {
    constructor(message, status, code) {
        super(message);
        this.__isAuthError = true;
        this.name = 'AuthError';
        this.status = status;
        this.code = code;
    }
}
function isAuthError(error) {
    return typeof error === 'object' && error !== null && '__isAuthError' in error;
}
class AuthApiError extends AuthError {
    constructor(message, status, code) {
        super(message, status, code);
        this.name = 'AuthApiError';
        this.status = status;
        this.code = code;
    }
}
function isAuthApiError(error) {
    return isAuthError(error) && error.name === 'AuthApiError';
}
class AuthUnknownError extends AuthError {
    constructor(message, originalError) {
        super(message);
        this.name = 'AuthUnknownError';
        this.originalError = originalError;
    }
}
class CustomAuthError extends AuthError {
    constructor(message, name, status, code) {
        super(message, status, code);
        this.name = name;
        this.status = status;
    }
}
class AuthSessionMissingError extends CustomAuthError {
    constructor() {
        super('Auth session missing!', 'AuthSessionMissingError', 400, undefined);
    }
}
function isAuthSessionMissingError(error) {
    return isAuthError(error) && error.name === 'AuthSessionMissingError';
}
class AuthInvalidTokenResponseError extends CustomAuthError {
    constructor() {
        super('Auth session or user missing', 'AuthInvalidTokenResponseError', 500, undefined);
    }
}
class AuthInvalidCredentialsError extends CustomAuthError {
    constructor(message) {
        super(message, 'AuthInvalidCredentialsError', 400, undefined);
    }
}
class AuthImplicitGrantRedirectError extends CustomAuthError {
    constructor(message, details = null) {
        super(message, 'AuthImplicitGrantRedirectError', 500, undefined);
        this.details = null;
        this.details = details;
    }
    toJSON() {
        return {
            name: this.name,
            message: this.message,
            status: this.status,
            details: this.details,
        };
    }
}
function isAuthImplicitGrantRedirectError(error) {
    return isAuthError(error) && error.name === 'AuthImplicitGrantRedirectError';
}
class AuthPKCEGrantCodeExchangeError extends CustomAuthError {
    constructor(message, details = null) {
        super(message, 'AuthPKCEGrantCodeExchangeError', 500, undefined);
        this.details = null;
        this.details = details;
    }
    toJSON() {
        return {
            name: this.name,
            message: this.message,
            status: this.status,
            details: this.details,
        };
    }
}
class AuthRetryableFetchError extends CustomAuthError {
    constructor(message, status) {
        super(message, 'AuthRetryableFetchError', status, undefined);
    }
}
function isAuthRetryableFetchError(error) {
    return isAuthError(error) && error.name === 'AuthRetryableFetchError';
}
/**
 * This error is thrown on certain methods when the password used is deemed
 * weak. Inspect the reasons to identify what password strength rules are
 * inadequate.
 */
class AuthWeakPasswordError extends CustomAuthError {
    constructor(message, status, reasons) {
        super(message, 'AuthWeakPasswordError', status, 'weak_password');
        this.reasons = reasons;
    }
}
function isAuthWeakPasswordError(error) {
    return isAuthError(error) && error.name === 'AuthWeakPasswordError';
}
class AuthInvalidJwtError extends CustomAuthError {
    constructor(message) {
        super(message, 'AuthInvalidJwtError', 400, 'invalid_jwt');
    }
}
//# sourceMappingURL=errors.js.map
;// ./node_modules/@supabase/auth-js/dist/module/lib/base64url.js
/**
 * Avoid modifying this file. It's part of
 * https://github.com/supabase-community/base64url-js.  Submit all fixes on
 * that repo!
 */
/**
 * An array of characters that encode 6 bits into a Base64-URL alphabet
 * character.
 */
const TO_BASE64URL = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'.split('');
/**
 * An array of characters that can appear in a Base64-URL encoded string but
 * should be ignored.
 */
const IGNORE_BASE64URL = ' \t\n\r='.split('');
/**
 * An array of 128 numbers that map a Base64-URL character to 6 bits, or if -2
 * used to skip the character, or if -1 used to error out.
 */
const FROM_BASE64URL = (() => {
    const charMap = new Array(128);
    for (let i = 0; i < charMap.length; i += 1) {
        charMap[i] = -1;
    }
    for (let i = 0; i < IGNORE_BASE64URL.length; i += 1) {
        charMap[IGNORE_BASE64URL[i].charCodeAt(0)] = -2;
    }
    for (let i = 0; i < TO_BASE64URL.length; i += 1) {
        charMap[TO_BASE64URL[i].charCodeAt(0)] = i;
    }
    return charMap;
})();
/**
 * Converts a byte to a Base64-URL string.
 *
 * @param byte The byte to convert, or null to flush at the end of the byte sequence.
 * @param state The Base64 conversion state. Pass an initial value of `{ queue: 0, queuedBits: 0 }`.
 * @param emit A function called with the next Base64 character when ready.
 */
function byteToBase64URL(byte, state, emit) {
    if (byte !== null) {
        state.queue = (state.queue << 8) | byte;
        state.queuedBits += 8;
        while (state.queuedBits >= 6) {
            const pos = (state.queue >> (state.queuedBits - 6)) & 63;
            emit(TO_BASE64URL[pos]);
            state.queuedBits -= 6;
        }
    }
    else if (state.queuedBits > 0) {
        state.queue = state.queue << (6 - state.queuedBits);
        state.queuedBits = 6;
        while (state.queuedBits >= 6) {
            const pos = (state.queue >> (state.queuedBits - 6)) & 63;
            emit(TO_BASE64URL[pos]);
            state.queuedBits -= 6;
        }
    }
}
/**
 * Converts a String char code (extracted using `string.charCodeAt(position)`) to a sequence of Base64-URL characters.
 *
 * @param charCode The char code of the JavaScript string.
 * @param state The Base64 state. Pass an initial value of `{ queue: 0, queuedBits: 0 }`.
 * @param emit A function called with the next byte.
 */
function byteFromBase64URL(charCode, state, emit) {
    const bits = FROM_BASE64URL[charCode];
    if (bits > -1) {
        // valid Base64-URL character
        state.queue = (state.queue << 6) | bits;
        state.queuedBits += 6;
        while (state.queuedBits >= 8) {
            emit((state.queue >> (state.queuedBits - 8)) & 0xff);
            state.queuedBits -= 8;
        }
    }
    else if (bits === -2) {
        // ignore spaces, tabs, newlines, =
        return;
    }
    else {
        throw new Error(`Invalid Base64-URL character "${String.fromCharCode(charCode)}"`);
    }
}
/**
 * Converts a JavaScript string (which may include any valid character) into a
 * Base64-URL encoded string. The string is first encoded in UTF-8 which is
 * then encoded as Base64-URL.
 *
 * @param str The string to convert.
 */
function stringToBase64URL(str) {
    const base64 = [];
    const emitter = (char) => {
        base64.push(char);
    };
    const state = { queue: 0, queuedBits: 0 };
    stringToUTF8(str, (byte) => {
        byteToBase64URL(byte, state, emitter);
    });
    byteToBase64URL(null, state, emitter);
    return base64.join('');
}
/**
 * Converts a Base64-URL encoded string into a JavaScript string. It is assumed
 * that the underlying string has been encoded as UTF-8.
 *
 * @param str The Base64-URL encoded string.
 */
function stringFromBase64URL(str) {
    const conv = [];
    const utf8Emit = (codepoint) => {
        conv.push(String.fromCodePoint(codepoint));
    };
    const utf8State = {
        utf8seq: 0,
        codepoint: 0,
    };
    const b64State = { queue: 0, queuedBits: 0 };
    const byteEmit = (byte) => {
        stringFromUTF8(byte, utf8State, utf8Emit);
    };
    for (let i = 0; i < str.length; i += 1) {
        byteFromBase64URL(str.charCodeAt(i), b64State, byteEmit);
    }
    return conv.join('');
}
/**
 * Converts a Unicode codepoint to a multi-byte UTF-8 sequence.
 *
 * @param codepoint The Unicode codepoint.
 * @param emit      Function which will be called for each UTF-8 byte that represents the codepoint.
 */
function codepointToUTF8(codepoint, emit) {
    if (codepoint <= 0x7f) {
        emit(codepoint);
        return;
    }
    else if (codepoint <= 0x7ff) {
        emit(0xc0 | (codepoint >> 6));
        emit(0x80 | (codepoint & 0x3f));
        return;
    }
    else if (codepoint <= 0xffff) {
        emit(0xe0 | (codepoint >> 12));
        emit(0x80 | ((codepoint >> 6) & 0x3f));
        emit(0x80 | (codepoint & 0x3f));
        return;
    }
    else if (codepoint <= 0x10ffff) {
        emit(0xf0 | (codepoint >> 18));
        emit(0x80 | ((codepoint >> 12) & 0x3f));
        emit(0x80 | ((codepoint >> 6) & 0x3f));
        emit(0x80 | (codepoint & 0x3f));
        return;
    }
    throw new Error(`Unrecognized Unicode codepoint: ${codepoint.toString(16)}`);
}
/**
 * Converts a JavaScript string to a sequence of UTF-8 bytes.
 *
 * @param str  The string to convert to UTF-8.
 * @param emit Function which will be called for each UTF-8 byte of the string.
 */
function stringToUTF8(str, emit) {
    for (let i = 0; i < str.length; i += 1) {
        let codepoint = str.charCodeAt(i);
        if (codepoint > 0xd7ff && codepoint <= 0xdbff) {
            // most UTF-16 codepoints are Unicode codepoints, except values in this
            // range where the next UTF-16 codepoint needs to be combined with the
            // current one to get the Unicode codepoint
            const highSurrogate = ((codepoint - 0xd800) * 0x400) & 0xffff;
            const lowSurrogate = (str.charCodeAt(i + 1) - 0xdc00) & 0xffff;
            codepoint = (lowSurrogate | highSurrogate) + 0x10000;
            i += 1;
        }
        codepointToUTF8(codepoint, emit);
    }
}
/**
 * Converts a UTF-8 byte to a Unicode codepoint.
 *
 * @param byte  The UTF-8 byte next in the sequence.
 * @param state The shared state between consecutive UTF-8 bytes in the
 *              sequence, an object with the shape `{ utf8seq: 0, codepoint: 0 }`.
 * @param emit  Function which will be called for each codepoint.
 */
function stringFromUTF8(byte, state, emit) {
    if (state.utf8seq === 0) {
        if (byte <= 0x7f) {
            emit(byte);
            return;
        }
        // count the number of 1 leading bits until you reach 0
        for (let leadingBit = 1; leadingBit < 6; leadingBit += 1) {
            if (((byte >> (7 - leadingBit)) & 1) === 0) {
                state.utf8seq = leadingBit;
                break;
            }
        }
        if (state.utf8seq === 2) {
            state.codepoint = byte & 31;
        }
        else if (state.utf8seq === 3) {
            state.codepoint = byte & 15;
        }
        else if (state.utf8seq === 4) {
            state.codepoint = byte & 7;
        }
        else {
            throw new Error('Invalid UTF-8 sequence');
        }
        state.utf8seq -= 1;
    }
    else if (state.utf8seq > 0) {
        if (byte <= 0x7f) {
            throw new Error('Invalid UTF-8 sequence');
        }
        state.codepoint = (state.codepoint << 6) | (byte & 63);
        state.utf8seq -= 1;
        if (state.utf8seq === 0) {
            emit(state.codepoint);
        }
    }
}
/**
 * Helper functions to convert different types of strings to Uint8Array
 */
function base64UrlToUint8Array(str) {
    const result = [];
    const state = { queue: 0, queuedBits: 0 };
    const onByte = (byte) => {
        result.push(byte);
    };
    for (let i = 0; i < str.length; i += 1) {
        byteFromBase64URL(str.charCodeAt(i), state, onByte);
    }
    return new Uint8Array(result);
}
function stringToUint8Array(str) {
    const result = [];
    stringToUTF8(str, (byte) => result.push(byte));
    return new Uint8Array(result);
}
function bytesToBase64URL(bytes) {
    const result = [];
    const state = { queue: 0, queuedBits: 0 };
    const onChar = (char) => {
        result.push(char);
    };
    bytes.forEach((byte) => byteToBase64URL(byte, state, onChar));
    // always call with `null` after processing all bytes
    byteToBase64URL(null, state, onChar);
    return result.join('');
}
//# sourceMappingURL=base64url.js.map
;// ./node_modules/@supabase/auth-js/dist/module/lib/helpers.js



function expiresAt(expiresIn) {
    const timeNow = Math.round(Date.now() / 1000);
    return timeNow + expiresIn;
}
function helpers_uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0, v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
const helpers_isBrowser = () => typeof window !== 'undefined' && typeof document !== 'undefined';
const localStorageWriteTests = {
    tested: false,
    writable: false,
};
/**
 * Checks whether localStorage is supported on this browser.
 */
const supportsLocalStorage = () => {
    if (!helpers_isBrowser()) {
        return false;
    }
    try {
        if (typeof globalThis.localStorage !== 'object') {
            return false;
        }
    }
    catch (e) {
        // DOM exception when accessing `localStorage`
        return false;
    }
    if (localStorageWriteTests.tested) {
        return localStorageWriteTests.writable;
    }
    const randomKey = `lswt-${Math.random()}${Math.random()}`;
    try {
        globalThis.localStorage.setItem(randomKey, randomKey);
        globalThis.localStorage.removeItem(randomKey);
        localStorageWriteTests.tested = true;
        localStorageWriteTests.writable = true;
    }
    catch (e) {
        // localStorage can't be written to
        // https://www.chromium.org/for-testers/bug-reporting-guidelines/uncaught-securityerror-failed-to-read-the-localstorage-property-from-window-access-is-denied-for-this-document
        localStorageWriteTests.tested = true;
        localStorageWriteTests.writable = false;
    }
    return localStorageWriteTests.writable;
};
/**
 * Extracts parameters encoded in the URL both in the query and fragment.
 */
function parseParametersFromURL(href) {
    const result = {};
    const url = new URL(href);
    if (url.hash && url.hash[0] === '#') {
        try {
            const hashSearchParams = new URLSearchParams(url.hash.substring(1));
            hashSearchParams.forEach((value, key) => {
                result[key] = value;
            });
        }
        catch (e) {
            // hash is not a query string
        }
    }
    // search parameters take precedence over hash parameters
    url.searchParams.forEach((value, key) => {
        result[key] = value;
    });
    return result;
}
const lib_helpers_resolveFetch = (customFetch) => {
    let _fetch;
    if (customFetch) {
        _fetch = customFetch;
    }
    else if (typeof fetch === 'undefined') {
        _fetch = (...args) => Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 907)).then(({ default: fetch }) => fetch(...args));
    }
    else {
        _fetch = fetch;
    }
    return (...args) => _fetch(...args);
};
const looksLikeFetchResponse = (maybeResponse) => {
    return (typeof maybeResponse === 'object' &&
        maybeResponse !== null &&
        'status' in maybeResponse &&
        'ok' in maybeResponse &&
        'json' in maybeResponse &&
        typeof maybeResponse.json === 'function');
};
// Storage helpers
const setItemAsync = async (storage, key, data) => {
    await storage.setItem(key, JSON.stringify(data));
};
const getItemAsync = async (storage, key) => {
    const value = await storage.getItem(key);
    if (!value) {
        return null;
    }
    try {
        return JSON.parse(value);
    }
    catch (_a) {
        return value;
    }
};
const removeItemAsync = async (storage, key) => {
    await storage.removeItem(key);
};
/**
 * A deferred represents some asynchronous work that is not yet finished, which
 * may or may not culminate in a value.
 * Taken from: https://github.com/mike-north/types/blob/master/src/async.ts
 */
class Deferred {
    constructor() {
        // eslint-disable-next-line @typescript-eslint/no-extra-semi
        ;
        this.promise = new Deferred.promiseConstructor((res, rej) => {
            // eslint-disable-next-line @typescript-eslint/no-extra-semi
            ;
            this.resolve = res;
            this.reject = rej;
        });
    }
}
Deferred.promiseConstructor = Promise;
function decodeJWT(token) {
    const parts = token.split('.');
    if (parts.length !== 3) {
        throw new AuthInvalidJwtError('Invalid JWT structure');
    }
    // Regex checks for base64url format
    for (let i = 0; i < parts.length; i++) {
        if (!BASE64URL_REGEX.test(parts[i])) {
            throw new AuthInvalidJwtError('JWT not in base64url format');
        }
    }
    const data = {
        // using base64url lib
        header: JSON.parse(stringFromBase64URL(parts[0])),
        payload: JSON.parse(stringFromBase64URL(parts[1])),
        signature: base64UrlToUint8Array(parts[2]),
        raw: {
            header: parts[0],
            payload: parts[1],
        },
    };
    return data;
}
/**
 * Creates a promise that resolves to null after some time.
 */
async function sleep(time) {
    return await new Promise((accept) => {
        setTimeout(() => accept(null), time);
    });
}
/**
 * Converts the provided async function into a retryable function. Each result
 * or thrown error is sent to the isRetryable function which should return true
 * if the function should run again.
 */
function retryable(fn, isRetryable) {
    const promise = new Promise((accept, reject) => {
        // eslint-disable-next-line @typescript-eslint/no-extra-semi
        ;
        (async () => {
            for (let attempt = 0; attempt < Infinity; attempt++) {
                try {
                    const result = await fn(attempt);
                    if (!isRetryable(attempt, null, result)) {
                        accept(result);
                        return;
                    }
                }
                catch (e) {
                    if (!isRetryable(attempt, e)) {
                        reject(e);
                        return;
                    }
                }
            }
        })();
    });
    return promise;
}
function dec2hex(dec) {
    return ('0' + dec.toString(16)).substr(-2);
}
// Functions below taken from: https://stackoverflow.com/questions/63309409/creating-a-code-verifier-and-challenge-for-pkce-auth-on-spotify-api-in-reactjs
function generatePKCEVerifier() {
    const verifierLength = 56;
    const array = new Uint32Array(verifierLength);
    if (typeof crypto === 'undefined') {
        const charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
        const charSetLen = charSet.length;
        let verifier = '';
        for (let i = 0; i < verifierLength; i++) {
            verifier += charSet.charAt(Math.floor(Math.random() * charSetLen));
        }
        return verifier;
    }
    crypto.getRandomValues(array);
    return Array.from(array, dec2hex).join('');
}
async function sha256(randomString) {
    const encoder = new TextEncoder();
    const encodedData = encoder.encode(randomString);
    const hash = await crypto.subtle.digest('SHA-256', encodedData);
    const bytes = new Uint8Array(hash);
    return Array.from(bytes)
        .map((c) => String.fromCharCode(c))
        .join('');
}
async function generatePKCEChallenge(verifier) {
    const hasCryptoSupport = typeof crypto !== 'undefined' &&
        typeof crypto.subtle !== 'undefined' &&
        typeof TextEncoder !== 'undefined';
    if (!hasCryptoSupport) {
        console.warn('WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256.');
        return verifier;
    }
    const hashed = await sha256(verifier);
    return btoa(hashed).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
async function getCodeChallengeAndMethod(storage, storageKey, isPasswordRecovery = false) {
    const codeVerifier = generatePKCEVerifier();
    let storedCodeVerifier = codeVerifier;
    if (isPasswordRecovery) {
        storedCodeVerifier += '/PASSWORD_RECOVERY';
    }
    await setItemAsync(storage, `${storageKey}-code-verifier`, storedCodeVerifier);
    const codeChallenge = await generatePKCEChallenge(codeVerifier);
    const codeChallengeMethod = codeVerifier === codeChallenge ? 'plain' : 's256';
    return [codeChallenge, codeChallengeMethod];
}
/** Parses the API version which is 2YYY-MM-DD. */
const API_VERSION_REGEX = /^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;
function parseResponseAPIVersion(response) {
    const apiVersion = response.headers.get(API_VERSION_HEADER_NAME);
    if (!apiVersion) {
        return null;
    }
    if (!apiVersion.match(API_VERSION_REGEX)) {
        return null;
    }
    try {
        const date = new Date(`${apiVersion}T00:00:00.0Z`);
        return date;
    }
    catch (e) {
        return null;
    }
}
function validateExp(exp) {
    if (!exp) {
        throw new Error('Missing exp claim');
    }
    const timeNow = Math.floor(Date.now() / 1000);
    if (exp <= timeNow) {
        throw new Error('JWT has expired');
    }
}
function getAlgorithm(alg) {
    switch (alg) {
        case 'RS256':
            return {
                name: 'RSASSA-PKCS1-v1_5',
                hash: { name: 'SHA-256' },
            };
        case 'ES256':
            return {
                name: 'ECDSA',
                namedCurve: 'P-256',
                hash: { name: 'SHA-256' },
            };
        default:
            throw new Error('Invalid alg claim');
    }
}
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
function validateUUID(str) {
    if (!UUID_REGEX.test(str)) {
        throw new Error('@supabase/auth-js: Expected parameter to be UUID but is not');
    }
}
function userNotAvailableProxy() {
    const proxyTarget = {};
    return new Proxy(proxyTarget, {
        get: (target, prop) => {
            if (prop === '__isUserNotAvailableProxy') {
                return true;
            }
            // Preventative check for common problematic symbols during cloning/inspection
            // These symbols might be accessed by structuredClone or other internal mechanisms.
            if (typeof prop === 'symbol') {
                const sProp = prop.toString();
                if (sProp === 'Symbol(Symbol.toPrimitive)' ||
                    sProp === 'Symbol(Symbol.toStringTag)' ||
                    sProp === 'Symbol(util.inspect.custom)') {
                    // Node.js util.inspect
                    return undefined;
                }
            }
            throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Accessing the "${prop}" property of the session object is not supported. Please use getUser() instead.`);
        },
        set: (_target, prop) => {
            throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Setting the "${prop}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`);
        },
        deleteProperty: (_target, prop) => {
            throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Deleting the "${prop}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`);
        },
    });
}
/**
 * Deep clones a JSON-serializable object using JSON.parse(JSON.stringify(obj)).
 * Note: Only works for JSON-safe data.
 */
function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}
//# sourceMappingURL=helpers.js.map
;// ./node_modules/@supabase/auth-js/dist/module/lib/fetch.js
var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};



const fetch_getErrorMessage = (err) => err.msg || err.message || err.error_description || err.error || JSON.stringify(err);
const NETWORK_ERROR_CODES = [502, 503, 504];
async function fetch_handleError(error) {
    var _a;
    if (!looksLikeFetchResponse(error)) {
        throw new AuthRetryableFetchError(fetch_getErrorMessage(error), 0);
    }
    if (NETWORK_ERROR_CODES.includes(error.status)) {
        // status in 500...599 range - server had an error, request might be retryed.
        throw new AuthRetryableFetchError(fetch_getErrorMessage(error), error.status);
    }
    let data;
    try {
        data = await error.json();
    }
    catch (e) {
        throw new AuthUnknownError(fetch_getErrorMessage(e), e);
    }
    let errorCode = undefined;
    const responseAPIVersion = parseResponseAPIVersion(error);
    if (responseAPIVersion &&
        responseAPIVersion.getTime() >= API_VERSIONS['2024-01-01'].timestamp &&
        typeof data === 'object' &&
        data &&
        typeof data.code === 'string') {
        errorCode = data.code;
    }
    else if (typeof data === 'object' && data && typeof data.error_code === 'string') {
        errorCode = data.error_code;
    }
    if (!errorCode) {
        // Legacy support for weak password errors, when there were no error codes
        if (typeof data === 'object' &&
            data &&
            typeof data.weak_password === 'object' &&
            data.weak_password &&
            Array.isArray(data.weak_password.reasons) &&
            data.weak_password.reasons.length &&
            data.weak_password.reasons.reduce((a, i) => a && typeof i === 'string', true)) {
            throw new AuthWeakPasswordError(fetch_getErrorMessage(data), error.status, data.weak_password.reasons);
        }
    }
    else if (errorCode === 'weak_password') {
        throw new AuthWeakPasswordError(fetch_getErrorMessage(data), error.status, ((_a = data.weak_password) === null || _a === void 0 ? void 0 : _a.reasons) || []);
    }
    else if (errorCode === 'session_not_found') {
        // The `session_id` inside the JWT does not correspond to a row in the
        // `sessions` table. This usually means the user has signed out, has been
        // deleted, or their session has somehow been terminated.
        throw new AuthSessionMissingError();
    }
    throw new AuthApiError(fetch_getErrorMessage(data), error.status || 500, errorCode);
}
const fetch_getRequestParams = (method, options, parameters, body) => {
    const params = { method, headers: (options === null || options === void 0 ? void 0 : options.headers) || {} };
    if (method === 'GET') {
        return params;
    }
    params.headers = Object.assign({ 'Content-Type': 'application/json;charset=UTF-8' }, options === null || options === void 0 ? void 0 : options.headers);
    params.body = JSON.stringify(body);
    return Object.assign(Object.assign({}, params), parameters);
};
async function _request(fetcher, method, url, options) {
    var _a;
    const headers = Object.assign({}, options === null || options === void 0 ? void 0 : options.headers);
    if (!headers[API_VERSION_HEADER_NAME]) {
        headers[API_VERSION_HEADER_NAME] = API_VERSIONS['2024-01-01'].name;
    }
    if (options === null || options === void 0 ? void 0 : options.jwt) {
        headers['Authorization'] = `Bearer ${options.jwt}`;
    }
    const qs = (_a = options === null || options === void 0 ? void 0 : options.query) !== null && _a !== void 0 ? _a : {};
    if (options === null || options === void 0 ? void 0 : options.redirectTo) {
        qs['redirect_to'] = options.redirectTo;
    }
    const queryString = Object.keys(qs).length ? '?' + new URLSearchParams(qs).toString() : '';
    const data = await fetch_handleRequest(fetcher, method, url + queryString, {
        headers,
        noResolveJson: options === null || options === void 0 ? void 0 : options.noResolveJson,
    }, {}, options === null || options === void 0 ? void 0 : options.body);
    return (options === null || options === void 0 ? void 0 : options.xform) ? options === null || options === void 0 ? void 0 : options.xform(data) : { data: Object.assign({}, data), error: null };
}
async function fetch_handleRequest(fetcher, method, url, options, parameters, body) {
    const requestParams = fetch_getRequestParams(method, options, parameters, body);
    let result;
    try {
        result = await fetcher(url, Object.assign({}, requestParams));
    }
    catch (e) {
        console.error(e);
        // fetch failed, likely due to a network or CORS error
        throw new AuthRetryableFetchError(fetch_getErrorMessage(e), 0);
    }
    if (!result.ok) {
        await fetch_handleError(result);
    }
    if (options === null || options === void 0 ? void 0 : options.noResolveJson) {
        return result;
    }
    try {
        return await result.json();
    }
    catch (e) {
        await fetch_handleError(e);
    }
}
function _sessionResponse(data) {
    var _a;
    let session = null;
    if (hasSession(data)) {
        session = Object.assign({}, data);
        if (!data.expires_at) {
            session.expires_at = expiresAt(data.expires_in);
        }
    }
    const user = (_a = data.user) !== null && _a !== void 0 ? _a : data;
    return { data: { session, user }, error: null };
}
function _sessionResponsePassword(data) {
    const response = _sessionResponse(data);
    if (!response.error &&
        data.weak_password &&
        typeof data.weak_password === 'object' &&
        Array.isArray(data.weak_password.reasons) &&
        data.weak_password.reasons.length &&
        data.weak_password.message &&
        typeof data.weak_password.message === 'string' &&
        data.weak_password.reasons.reduce((a, i) => a && typeof i === 'string', true)) {
        response.data.weak_password = data.weak_password;
    }
    return response;
}
function _userResponse(data) {
    var _a;
    const user = (_a = data.user) !== null && _a !== void 0 ? _a : data;
    return { data: { user }, error: null };
}
function _ssoResponse(data) {
    return { data, error: null };
}
function _generateLinkResponse(data) {
    const { action_link, email_otp, hashed_token, redirect_to, verification_type } = data, rest = __rest(data, ["action_link", "email_otp", "hashed_token", "redirect_to", "verification_type"]);
    const properties = {
        action_link,
        email_otp,
        hashed_token,
        redirect_to,
        verification_type,
    };
    const user = Object.assign({}, rest);
    return {
        data: {
            properties,
            user,
        },
        error: null,
    };
}
function _noResolveJsonResponse(data) {
    return data;
}
/**
 * hasSession checks if the response object contains a valid session
 * @param data A response object
 * @returns true if a session is in the response
 */
function hasSession(data) {
    return data.access_token && data.refresh_token && data.expires_in;
}
//# sourceMappingURL=fetch.js.map
;// ./node_modules/@supabase/auth-js/dist/module/lib/types.js
const SIGN_OUT_SCOPES = ['global', 'local', 'others'];
//# sourceMappingURL=types.js.map
;// ./node_modules/@supabase/auth-js/dist/module/GoTrueAdminApi.js
var GoTrueAdminApi_rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};




class GoTrueAdminApi {
    constructor({ url = '', headers = {}, fetch, }) {
        this.url = url;
        this.headers = headers;
        this.fetch = lib_helpers_resolveFetch(fetch);
        this.mfa = {
            listFactors: this._listFactors.bind(this),
            deleteFactor: this._deleteFactor.bind(this),
        };
    }
    /**
     * Removes a logged-in session.
     * @param jwt A valid, logged-in JWT.
     * @param scope The logout sope.
     */
    async signOut(jwt, scope = SIGN_OUT_SCOPES[0]) {
        if (SIGN_OUT_SCOPES.indexOf(scope) < 0) {
            throw new Error(`@supabase/auth-js: Parameter scope must be one of ${SIGN_OUT_SCOPES.join(', ')}`);
        }
        try {
            await _request(this.fetch, 'POST', `${this.url}/logout?scope=${scope}`, {
                headers: this.headers,
                jwt,
                noResolveJson: true,
            });
            return { data: null, error: null };
        }
        catch (error) {
            if (isAuthError(error)) {
                return { data: null, error };
            }
            throw error;
        }
    }
    /**
     * Sends an invite link to an email address.
     * @param email The email address of the user.
     * @param options Additional options to be included when inviting.
     */
    async inviteUserByEmail(email, options = {}) {
        try {
            return await _request(this.fetch, 'POST', `${this.url}/invite`, {
                body: { email, data: options.data },
                headers: this.headers,
                redirectTo: options.redirectTo,
                xform: _userResponse,
            });
        }
        catch (error) {
            if (isAuthError(error)) {
                return { data: { user: null }, error };
            }
            throw error;
        }
    }
    /**
     * Generates email links and OTPs to be sent via a custom email provider.
     * @param email The user's email.
     * @param options.password User password. For signup only.
     * @param options.data Optional user metadata. For signup only.
     * @param options.redirectTo The redirect url which should be appended to the generated link
     */
    async generateLink(params) {
        try {
            const { options } = params, rest = GoTrueAdminApi_rest(params, ["options"]);
            const body = Object.assign(Object.assign({}, rest), options);
            if ('newEmail' in rest) {
                // replace newEmail with new_email in request body
                body.new_email = rest === null || rest === void 0 ? void 0 : rest.newEmail;
                delete body['newEmail'];
            }
            return await _request(this.fetch, 'POST', `${this.url}/admin/generate_link`, {
                body: body,
                headers: this.headers,
                xform: _generateLinkResponse,
                redirectTo: options === null || options === void 0 ? void 0 : options.redirectTo,
            });
        }
        catch (error) {
            if (isAuthError(error)) {
                return {
                    data: {
                        properties: null,
                        user: null,
                    },
                    error,
                };
            }
            throw error;
        }
    }
    // User Admin API
    /**
     * Creates a new user.
     * This function should only be called on a server. Never expose your `service_role` key in the browser.
     */
    async createUser(attributes) {
        try {
            return await _request(this.fetch, 'POST', `${this.url}/admin/users`, {
                body: attributes,
                headers: this.headers,
                xform: _userResponse,
            });
        }
        catch (error) {
            if (isAuthError(error)) {
                return { data: { user: null }, error };
            }
            throw error;
        }
    }
    /**
     * Get a list of users.
     *
     * This function should only be called on a server. Never expose your `service_role` key in the browser.
     * @param params An object which supports `page` and `perPage` as numbers, to alter the paginated results.
     */
    async listUsers(params) {
        var _a, _b, _c, _d, _e, _f, _g;
        try {
            const pagination = { nextPage: null, lastPage: 0, total: 0 };
            const response = await _request(this.fetch, 'GET', `${this.url}/admin/users`, {
                headers: this.headers,
                noResolveJson: true,
                query: {
                    page: (_b = (_a = params === null || params === void 0 ? void 0 : params.page) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : '',
                    per_page: (_d = (_c = params === null || params === void 0 ? void 0 : params.perPage) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : '',
                },
                xform: _noResolveJsonResponse,
            });
            if (response.error)
                throw response.error;
            const users = await response.json();
            const total = (_e = response.headers.get('x-total-count')) !== null && _e !== void 0 ? _e : 0;
            const links = (_g = (_f = response.headers.get('link')) === null || _f === void 0 ? void 0 : _f.split(',')) !== null && _g !== void 0 ? _g : [];
            if (links.length > 0) {
                links.forEach((link) => {
                    const page = parseInt(link.split(';')[0].split('=')[1].substring(0, 1));
                    const rel = JSON.parse(link.split(';')[1].split('=')[1]);
                    pagination[`${rel}Page`] = page;
                });
                pagination.total = parseInt(total);
            }
            return { data: Object.assign(Object.assign({}, users), pagination), error: null };
        }
        catch (error) {
            if (isAuthError(error)) {
                return { data: { users: [] }, error };
            }
            throw error;
        }
    }
    /**
     * Get user by id.
     *
     * @param uid The user's unique identifier
     *
     * This function should only be called on a server. Never expose your `service_role` key in the browser.
     */
    async getUserById(uid) {
        validateUUID(uid);
        try {
            return await _request(this.fetch, 'GET', `${this.url}/admin/users/${uid}`, {
                headers: this.headers,
                xform: _userResponse,
            });
        }
        catch (error) {
            if (isAuthError(error)) {
                return { data: { user: null }, error };
            }
            throw error;
        }
    }
    /**
     * Updates the user data.
     *
     * @param attributes The data you want to update.
     *
     * This function should only be called on a server. Never expose your `service_role` key in the browser.
     */
    async updateUserById(uid, attributes) {
        validateUUID(uid);
        try {
            return await _request(this.fetch, 'PUT', `${this.url}/admin/users/${uid}`, {
                body: attributes,
                headers: this.headers,
                xform: _userResponse,
            });
        }
        catch (error) {
            if (isAuthError(error)) {
                return { data: { user: null }, error };
            }
            throw error;
        }
    }
    /**
     * Delete a user. Requires a `service_role` key.
     *
     * @param id The user id you want to remove.
     * @param shouldSoftDelete If true, then the user will be soft-deleted from the auth schema. Soft deletion allows user identification from the hashed user ID but is not reversible.
     * Defaults to false for backward compatibility.
     *
     * This function should only be called on a server. Never expose your `service_role` key in the browser.
     */
    async deleteUser(id, shouldSoftDelete = false) {
        validateUUID(id);
        try {
            return await _request(this.fetch, 'DELETE', `${this.url}/admin/users/${id}`, {
                headers: this.headers,
                body: {
                    should_soft_delete: shouldSoftDelete,
                },
                xform: _userResponse,
            });
        }
        catch (error) {
            if (isAuthError(error)) {
                return { data: { user: null }, error };
            }
            throw error;
        }
    }
    async _listFactors(params) {
        validateUUID(params.userId);
        try {
            const { data, error } = await _request(this.fetch, 'GET', `${this.url}/admin/users/${params.userId}/factors`, {
                headers: this.headers,
                xform: (factors) => {
                    return { data: { factors }, error: null };
                },
            });
            return { data, error };
        }
        catch (error) {
            if (isAuthError(error)) {
                return { data: null, error };
            }
            throw error;
        }
    }
    async _deleteFactor(params) {
        validateUUID(params.userId);
        validateUUID(params.id);
        try {
            const data = await _request(this.fetch, 'DELETE', `${this.url}/admin/users/${params.userId}/factors/${params.id}`, {
                headers: this.headers,
            });
            return { data, error: null };
        }
        catch (error) {
            if (isAuthError(error)) {
                return { data: null, error };
            }
            throw error;
        }
    }
}
//# sourceMappingURL=GoTrueAdminApi.js.map
;// ./node_modules/@supabase/auth-js/dist/module/lib/local-storage.js
/**
 * Returns a localStorage-like object that stores the key-value pairs in
 * memory.
 */
function memoryLocalStorageAdapter(store = {}) {
    return {
        getItem: (key) => {
            return store[key] || null;
        },
        setItem: (key, value) => {
            store[key] = value;
        },
        removeItem: (key) => {
            delete store[key];
        },
    };
}
//# sourceMappingURL=local-storage.js.map
;// ./node_modules/@supabase/auth-js/dist/module/lib/polyfills.js
/**
 * https://mathiasbynens.be/notes/globalthis
 */
function polyfillGlobalThis() {
    if (typeof globalThis === 'object')
        return;
    try {
        Object.defineProperty(Object.prototype, '__magic__', {
            get: function () {
                return this;
            },
            configurable: true,
        });
        // @ts-expect-error 'Allow access to magic'
        __magic__.globalThis = __magic__;
        // @ts-expect-error 'Allow access to magic'
        delete Object.prototype.__magic__;
    }
    catch (e) {
        if (typeof self !== 'undefined') {
            // @ts-expect-error 'Allow access to globals'
            self.globalThis = self;
        }
    }
}
//# sourceMappingURL=polyfills.js.map
;// ./node_modules/@supabase/auth-js/dist/module/lib/locks.js

/**
 * @experimental
 */
const internals = {
    /**
     * @experimental
     */
    debug: !!(globalThis &&
        supportsLocalStorage() &&
        globalThis.localStorage &&
        globalThis.localStorage.getItem('supabase.gotrue-js.locks.debug') === 'true'),
};
/**
 * An error thrown when a lock cannot be acquired after some amount of time.
 *
 * Use the {@link #isAcquireTimeout} property instead of checking with `instanceof`.
 */
class LockAcquireTimeoutError extends Error {
    constructor(message) {
        super(message);
        this.isAcquireTimeout = true;
    }
}
class NavigatorLockAcquireTimeoutError extends LockAcquireTimeoutError {
}
class ProcessLockAcquireTimeoutError extends LockAcquireTimeoutError {
}
/**
 * Implements a global exclusive lock using the Navigator LockManager API. It
 * is available on all browsers released after 2022-03-15 with Safari being the
 * last one to release support. If the API is not available, this function will
 * throw. Make sure you check availablility before configuring {@link
 * GoTrueClient}.
 *
 * You can turn on debugging by setting the `supabase.gotrue-js.locks.debug`
 * local storage item to `true`.
 *
 * Internals:
 *
 * Since the LockManager API does not preserve stack traces for the async
 * function passed in the `request` method, a trick is used where acquiring the
 * lock releases a previously started promise to run the operation in the `fn`
 * function. The lock waits for that promise to finish (with or without error),
 * while the function will finally wait for the result anyway.
 *
 * @param name Name of the lock to be acquired.
 * @param acquireTimeout If negative, no timeout. If 0 an error is thrown if
 *                       the lock can't be acquired without waiting. If positive, the lock acquire
 *                       will time out after so many milliseconds. An error is
 *                       a timeout if it has `isAcquireTimeout` set to true.
 * @param fn The operation to run once the lock is acquired.
 */
async function navigatorLock(name, acquireTimeout, fn) {
    if (internals.debug) {
        console.log('@supabase/gotrue-js: navigatorLock: acquire lock', name, acquireTimeout);
    }
    const abortController = new globalThis.AbortController();
    if (acquireTimeout > 0) {
        setTimeout(() => {
            abortController.abort();
            if (internals.debug) {
                console.log('@supabase/gotrue-js: navigatorLock acquire timed out', name);
            }
        }, acquireTimeout);
    }
    // MDN article: https://developer.mozilla.org/en-US/docs/Web/API/LockManager/request
    // Wrapping navigator.locks.request() with a plain Promise is done as some
    // libraries like zone.js patch the Promise object to track the execution
    // context. However, it appears that most browsers use an internal promise
    // implementation when using the navigator.locks.request() API causing them
    // to lose context and emit confusing log messages or break certain features.
    // This wrapping is believed to help zone.js track the execution context
    // better.
    return await Promise.resolve().then(() => globalThis.navigator.locks.request(name, acquireTimeout === 0
        ? {
            mode: 'exclusive',
            ifAvailable: true,
        }
        : {
            mode: 'exclusive',
            signal: abortController.signal,
        }, async (lock) => {
        if (lock) {
            if (internals.debug) {
                console.log('@supabase/gotrue-js: navigatorLock: acquired', name, lock.name);
            }
            try {
                return await fn();
            }
            finally {
                if (internals.debug) {
                    console.log('@supabase/gotrue-js: navigatorLock: released', name, lock.name);
                }
            }
        }
        else {
            if (acquireTimeout === 0) {
                if (internals.debug) {
                    console.log('@supabase/gotrue-js: navigatorLock: not immediately available', name);
                }
                throw new NavigatorLockAcquireTimeoutError(`Acquiring an exclusive Navigator LockManager lock "${name}" immediately failed`);
            }
            else {
                if (internals.debug) {
                    try {
                        const result = await globalThis.navigator.locks.query();
                        console.log('@supabase/gotrue-js: Navigator LockManager state', JSON.stringify(result, null, '  '));
                    }
                    catch (e) {
                        console.warn('@supabase/gotrue-js: Error when querying Navigator LockManager state', e);
                    }
                }
                // Browser is not following the Navigator LockManager spec, it
                // returned a null lock when we didn't use ifAvailable. So we can
                // pretend the lock is acquired in the name of backward compatibility
                // and user experience and just run the function.
                console.warn('@supabase/gotrue-js: Navigator LockManager returned a null lock when using #request without ifAvailable set to true, it appears this browser is not following the LockManager spec https://developer.mozilla.org/en-US/docs/Web/API/LockManager/request');
                return await fn();
            }
        }
    }));
}
const PROCESS_LOCKS = {};
/**
 * Implements a global exclusive lock that works only in the current process.
 * Useful for environments like React Native or other non-browser
 * single-process (i.e. no concept of "tabs") environments.
 *
 * Use {@link #navigatorLock} in browser environments.
 *
 * @param name Name of the lock to be acquired.
 * @param acquireTimeout If negative, no timeout. If 0 an error is thrown if
 *                       the lock can't be acquired without waiting. If positive, the lock acquire
 *                       will time out after so many milliseconds. An error is
 *                       a timeout if it has `isAcquireTimeout` set to true.
 * @param fn The operation to run once the lock is acquired.
 */
async function processLock(name, acquireTimeout, fn) {
    var _a;
    const previousOperation = (_a = PROCESS_LOCKS[name]) !== null && _a !== void 0 ? _a : Promise.resolve();
    const currentOperation = Promise.race([
        previousOperation.catch(() => {
            // ignore error of previous operation that we're waiting to finish
            return null;
        }),
        acquireTimeout >= 0
            ? new Promise((_, reject) => {
                setTimeout(() => {
                    reject(new ProcessLockAcquireTimeoutError(`Acquring process lock with name "${name}" timed out`));
                }, acquireTimeout);
            })
            : null,
    ].filter((x) => x))
        .catch((e) => {
        if (e && e.isAcquireTimeout) {
            throw e;
        }
        return null;
    })
        .then(async () => {
        // previous operations finished and we didn't get a race on the acquire
        // timeout, so the current operation can finally start
        return await fn();
    });
    PROCESS_LOCKS[name] = currentOperation.catch(async (e) => {
        if (e && e.isAcquireTimeout) {
            // if the current operation timed out, it doesn't mean that the previous
            // operation finished, so we need contnue waiting for it to finish
            await previousOperation;
            return null;
        }
        throw e;
    });
    // finally wait for the current operation to finish successfully, with an
    // error or with an acquire timeout error
    return await currentOperation;
}
//# sourceMappingURL=locks.js.map
;// ./node_modules/@supabase/auth-js/dist/module/lib/web3/ethereum.js
// types and functions copied over from viem so this library doesn't depend on it
function getAddress(address) {
    if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
        throw new Error(`@supabase/auth-js: Address "${address}" is invalid.`);
    }
    return address.toLowerCase();
}
function fromHex(hex) {
    return parseInt(hex, 16);
}
function toHex(value) {
    const bytes = new TextEncoder().encode(value);
    const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
    return ('0x' + hex);
}
/**
 * Creates EIP-4361 formatted message.
 */
function createSiweMessage(parameters) {
    var _a;
    const { chainId, domain, expirationTime, issuedAt = new Date(), nonce, notBefore, requestId, resources, scheme, uri, version, } = parameters;
    // Validate fields
    {
        if (!Number.isInteger(chainId))
            throw new Error(`@supabase/auth-js: Invalid SIWE message field "chainId". Chain ID must be a EIP-155 chain ID. Provided value: ${chainId}`);
        if (!domain)
            throw new Error(`@supabase/auth-js: Invalid SIWE message field "domain". Domain must be provided.`);
        if (nonce && nonce.length < 8)
            throw new Error(`@supabase/auth-js: Invalid SIWE message field "nonce". Nonce must be at least 8 characters. Provided value: ${nonce}`);
        if (!uri)
            throw new Error(`@supabase/auth-js: Invalid SIWE message field "uri". URI must be provided.`);
        if (version !== '1')
            throw new Error(`@supabase/auth-js: Invalid SIWE message field "version". Version must be '1'. Provided value: ${version}`);
        if ((_a = parameters.statement) === null || _a === void 0 ? void 0 : _a.includes('\n'))
            throw new Error(`@supabase/auth-js: Invalid SIWE message field "statement". Statement must not include '\\n'. Provided value: ${parameters.statement}`);
    }
    // Construct message
    const address = getAddress(parameters.address);
    const origin = scheme ? `${scheme}://${domain}` : domain;
    const statement = parameters.statement ? `${parameters.statement}\n` : '';
    const prefix = `${origin} wants you to sign in with your Ethereum account:\n${address}\n\n${statement}`;
    let suffix = `URI: ${uri}\nVersion: ${version}\nChain ID: ${chainId}${nonce ? `\nNonce: ${nonce}` : ''}\nIssued At: ${issuedAt.toISOString()}`;
    if (expirationTime)
        suffix += `\nExpiration Time: ${expirationTime.toISOString()}`;
    if (notBefore)
        suffix += `\nNot Before: ${notBefore.toISOString()}`;
    if (requestId)
        suffix += `\nRequest ID: ${requestId}`;
    if (resources) {
        let content = '\nResources:';
        for (const resource of resources) {
            if (!resource || typeof resource !== 'string')
                throw new Error(`@supabase/auth-js: Invalid SIWE message field "resources". Every resource must be a valid string. Provided value: ${resource}`);
            content += `\n- ${resource}`;
        }
        suffix += content;
    }
    return `${prefix}\n${suffix}`;
}
//# sourceMappingURL=ethereum.js.map
;// ./node_modules/@supabase/auth-js/dist/module/GoTrueClient.js











polyfillGlobalThis(); // Make "globalThis" available
const DEFAULT_OPTIONS = {
    url: GOTRUE_URL,
    storageKey: STORAGE_KEY,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    headers: lib_constants_DEFAULT_HEADERS,
    flowType: 'implicit',
    debug: false,
    hasCustomAuthorizationHeader: false,
};
async function lockNoOp(name, acquireTimeout, fn) {
    return await fn();
}
/**
 * Caches JWKS values for all clients created in the same environment. This is
 * especially useful for shared-memory execution environments such as Vercel's
 * Fluid Compute, AWS Lambda or Supabase's Edge Functions. Regardless of how
 * many clients are created, if they share the same storage key they will use
 * the same JWKS cache, significantly speeding up getClaims() with asymmetric
 * JWTs.
 */
const GLOBAL_JWKS = {};
class GoTrueClient {
    /**
     * Create a new client for use in the browser.
     */
    constructor(options) {
        var _a, _b;
        /**
         * @experimental
         */
        this.userStorage = null;
        this.memoryStorage = null;
        this.stateChangeEmitters = new Map();
        this.autoRefreshTicker = null;
        this.visibilityChangedCallback = null;
        this.refreshingDeferred = null;
        /**
         * Keeps track of the async client initialization.
         * When null or not yet resolved the auth state is `unknown`
         * Once resolved the auth state is known and it's safe to call any further client methods.
         * Keep extra care to never reject or throw uncaught errors
         */
        this.initializePromise = null;
        this.detectSessionInUrl = true;
        this.hasCustomAuthorizationHeader = false;
        this.suppressGetSessionWarning = false;
        this.lockAcquired = false;
        this.pendingInLock = [];
        /**
         * Used to broadcast state change events to other tabs listening.
         */
        this.broadcastChannel = null;
        this.logger = console.log;
        this.instanceID = GoTrueClient.nextInstanceID;
        GoTrueClient.nextInstanceID += 1;
        if (this.instanceID > 0 && helpers_isBrowser()) {
            console.warn('Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.');
        }
        const settings = Object.assign(Object.assign({}, DEFAULT_OPTIONS), options);
        this.logDebugMessages = !!settings.debug;
        if (typeof settings.debug === 'function') {
            this.logger = settings.debug;
        }
        this.persistSession = settings.persistSession;
        this.storageKey = settings.storageKey;
        this.autoRefreshToken = settings.autoRefreshToken;
        this.admin = new GoTrueAdminApi({
            url: settings.url,
            headers: settings.headers,
            fetch: settings.fetch,
        });
        this.url = settings.url;
        this.headers = settings.headers;
        this.fetch = lib_helpers_resolveFetch(settings.fetch);
        this.lock = settings.lock || lockNoOp;
        this.detectSessionInUrl = settings.detectSessionInUrl;
        this.flowType = settings.flowType;
        this.hasCustomAuthorizationHeader = settings.hasCustomAuthorizationHeader;
        if (settings.lock) {
            this.lock = settings.lock;
        }
        else if (helpers_isBrowser() && ((_a = globalThis === null || globalThis === void 0 ? void 0 : globalThis.navigator) === null || _a === void 0 ? void 0 : _a.locks)) {
            this.lock = navigatorLock;
        }
        else {
            this.lock = lockNoOp;
        }
        if (!this.jwks) {
            this.jwks = { keys: [] };
            this.jwks_cached_at = Number.MIN_SAFE_INTEGER;
        }
        this.mfa = {
            verify: this._verify.bind(this),
            enroll: this._enroll.bind(this),
            unenroll: this._unenroll.bind(this),
            challenge: this._challenge.bind(this),
            listFactors: this._listFactors.bind(this),
            challengeAndVerify: this._challengeAndVerify.bind(this),
            getAuthenticatorAssuranceLevel: this._getAuthenticatorAssuranceLevel.bind(this),
        };
        if (this.persistSession) {
            if (settings.storage) {
                this.storage = settings.storage;
            }
            else {
                if (supportsLocalStorage()) {
                    this.storage = globalThis.localStorage;
                }
                else {
                    this.memoryStorage = {};
                    this.storage = memoryLocalStorageAdapter(this.memoryStorage);
                }
            }
            if (settings.userStorage) {
                this.userStorage = settings.userStorage;
            }
        }
        else {
            this.memoryStorage = {};
            this.storage = memoryLocalStorageAdapter(this.memoryStorage);
        }
        if (helpers_isBrowser() && globalThis.BroadcastChannel && this.persistSession && this.storageKey) {
            try {
                this.broadcastChannel = new globalThis.BroadcastChannel(this.storageKey);
            }
            catch (e) {
                console.error('Failed to create a new BroadcastChannel, multi-tab state changes will not be available', e);
            }
            (_b = this.broadcastChannel) === null || _b === void 0 ? void 0 : _b.addEventListener('message', async (event) => {
                this._debug('received broadcast notification from other tab or client', event);
                await this._notifyAllSubscribers(event.data.event, event.data.session, false); // broadcast = false so we don't get an endless loop of messages
            });
        }
        this.initialize();
    }
    /**
     * The JWKS used for verifying asymmetric JWTs
     */
    get jwks() {
        var _a, _b;
        return (_b = (_a = GLOBAL_JWKS[this.storageKey]) === null || _a === void 0 ? void 0 : _a.jwks) !== null && _b !== void 0 ? _b : { keys: [] };
    }
    set jwks(value) {
        GLOBAL_JWKS[this.storageKey] = Object.assign(Object.assign({}, GLOBAL_JWKS[this.storageKey]), { jwks: value });
    }
    get jwks_cached_at() {
        var _a, _b;
        return (_b = (_a = GLOBAL_JWKS[this.storageKey]) === null || _a === void 0 ? void 0 : _a.cachedAt) !== null && _b !== void 0 ? _b : Number.MIN_SAFE_INTEGER;
    }
    set jwks_cached_at(value) {
        GLOBAL_JWKS[this.storageKey] = Object.assign(Object.assign({}, GLOBAL_JWKS[this.storageKey]), { cachedAt: value });
    }
    _debug(...args) {
        if (this.logDebugMessages) {
            this.logger(`GoTrueClient@${this.instanceID} (${dist_module_lib_version_version}) ${new Date().toISOString()}`, ...args);
        }
        return this;
    }
    /**
     * Initializes the client session either from the url or from storage.
     * This method is automatically called when instantiating the client, but should also be called
     * manually when checking for an error from an auth redirect (oauth, magiclink, password recovery, etc).
     */
    async initialize() {
        if (this.initializePromise) {
            return await this.initializePromise;
        }
        this.initializePromise = (async () => {
            return await this._acquireLock(-1, async () => {
                return await this._initialize();
            });
        })();
        return await this.initializePromise;
    }
    /**
     * IMPORTANT:
     * 1. Never throw in this method, as it is called from the constructor
     * 2. Never return a session from this method as it would be cached over
     *    the whole lifetime of the client
     */
    async _initialize() {
        var _a;
        try {
            const params = parseParametersFromURL(window.location.href);
            let callbackUrlType = 'none';
            if (this._isImplicitGrantCallback(params)) {
                callbackUrlType = 'implicit';
            }
            else if (await this._isPKCECallback(params)) {
                callbackUrlType = 'pkce';
            }
            /**
             * Attempt to get the session from the URL only if these conditions are fulfilled
             *
             * Note: If the URL isn't one of the callback url types (implicit or pkce),
             * then there could be an existing session so we don't want to prematurely remove it
             */
            if (helpers_isBrowser() && this.detectSessionInUrl && callbackUrlType !== 'none') {
                const { data, error } = await this._getSessionFromURL(params, callbackUrlType);
                if (error) {
                    this._debug('#_initialize()', 'error detecting session from URL', error);
                    if (isAuthImplicitGrantRedirectError(error)) {
                        const errorCode = (_a = error.details) === null || _a === void 0 ? void 0 : _a.code;
                        if (errorCode === 'identity_already_exists' ||
                            errorCode === 'identity_not_found' ||
                            errorCode === 'single_identity_not_deletable') {
                            return { error };
                        }
                    }
                    // failed login attempt via url,
                    // remove old session as in verifyOtp, signUp and signInWith*
                    await this._removeSession();
                    return { error };
                }
                const { session, redirectType } = data;
                this._debug('#_initialize()', 'detected session in URL', session, 'redirect type', redirectType);
                await this._saveSession(session);
                setTimeout(async () => {
                    if (redirectType === 'recovery') {
                        await this._notifyAllSubscribers('PASSWORD_RECOVERY', session);
                    }
                    else {
                        await this._notifyAllSubscribers('SIGNED_IN', session);
                    }
                }, 0);
                return { error: null };
            }
            // no login attempt via callback url try to recover session from storage
            await this._recoverAndRefresh();
            return { error: null };
        }
        catch (error) {
            if (isAuthError(error)) {
                return { error };
            }
            return {
                error: new AuthUnknownError('Unexpected error during initialization', error),
            };
        }
        finally {
            await this._handleVisibilityChange();
            this._debug('#_initialize()', 'end');
        }
    }
    /**
     * Creates a new anonymous user.
     *
     * @returns A session where the is_anonymous claim in the access token JWT set to true
     */
    async signInAnonymously(credentials) {
        var _a, _b, _c;
        try {
            const res = await _request(this.fetch, 'POST', `${this.url}/signup`, {
                headers: this.headers,
                body: {
                    data: (_b = (_a = credentials === null || credentials === void 0 ? void 0 : credentials.options) === null || _a === void 0 ? void 0 : _a.data) !== null && _b !== void 0 ? _b : {},
                    gotrue_meta_security: { captcha_token: (_c = credentials === null || credentials === void 0 ? void 0 : credentials.options) === null || _c === void 0 ? void 0 : _c.captchaToken },
                },
                xform: _sessionResponse,
            });
            const { data, error } = res;
            if (error || !data) {
                return { data: { user: null, session: null }, error: error };
            }
            const session = data.session;
            const user = data.user;
            if (data.session) {
                await this._saveSession(data.session);
                await this._notifyAllSubscribers('SIGNED_IN', session);
            }
            return { data: { user, session }, error: null };
        }
        catch (error) {
            if (isAuthError(error)) {
                return { data: { user: null, session: null }, error };
            }
            throw error;
        }
    }
    /**
     * Creates a new user.
     *
     * Be aware that if a user account exists in the system you may get back an
     * error message that attempts to hide this information from the user.
     * This method has support for PKCE via email signups. The PKCE flow cannot be used when autoconfirm is enabled.
     *
     * @returns A logged-in session if the server has "autoconfirm" ON
     * @returns A user if the server has "autoconfirm" OFF
     */
    async signUp(credentials) {
        var _a, _b, _c;
        try {
            let res;
            if ('email' in credentials) {
                const { email, password, options } = credentials;
                let codeChallenge = null;
                let codeChallengeMethod = null;
                if (this.flowType === 'pkce') {
                    ;
                    [codeChallenge, codeChallengeMethod] = await getCodeChallengeAndMethod(this.storage, this.storageKey);
                }
                res = await _request(this.fetch, 'POST', `${this.url}/signup`, {
                    headers: this.headers,
                    redirectTo: options === null || options === void 0 ? void 0 : options.emailRedirectTo,
                    body: {
                        email,
                        password,
                        data: (_a = options === null || options === void 0 ? void 0 : options.data) !== null && _a !== void 0 ? _a : {},
                        gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken },
                        code_challenge: codeChallenge,
                        code_challenge_method: codeChallengeMethod,
                    },
                    xform: _sessionResponse,
                });
            }
            else if ('phone' in credentials) {
                const { phone, password, options } = credentials;
                res = await _request(this.fetch, 'POST', `${this.url}/signup`, {
                    headers: this.headers,
                    body: {
                        phone,
                        password,
                        data: (_b = options === null || options === void 0 ? void 0 : options.data) !== null && _b !== void 0 ? _b : {},
                        channel: (_c = options === null || options === void 0 ? void 0 : options.channel) !== null && _c !== void 0 ? _c : 'sms',
                        gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken },
                    },
                    xform: _sessionResponse,
                });
            }
            else {
                throw new AuthInvalidCredentialsError('You must provide either an email or phone number and a password');
            }
            const { data, error } = res;
            if (error || !data) {
                return { data: { user: null, session: null }, error: error };
            }
            const session = data.session;
            const user = data.user;
            if (data.session) {
                await this._saveSession(data.session);
                await this._notifyAllSubscribers('SIGNED_IN', session);
            }
            return { data: { user, session }, error: null };
        }
        catch (error) {
            if (isAuthError(error)) {
                return { data: { user: null, session: null }, error };
            }
            throw error;
        }
    }
    /**
     * Log in an existing user with an email and password or phone and password.
     *
     * Be aware that you may get back an error message that will not distinguish
     * between the cases where the account does not exist or that the
     * email/phone and password combination is wrong or that the account can only
     * be accessed via social login.
     */
    async signInWithPassword(credentials) {
        try {
            let res;
            if ('email' in credentials) {
                const { email, password, options } = credentials;
                res = await _request(this.fetch, 'POST', `${this.url}/token?grant_type=password`, {
                    headers: this.headers,
                    body: {
                        email,
                        password,
                        gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken },
                    },
                    xform: _sessionResponsePassword,
                });
            }
            else if ('phone' in credentials) {
                const { phone, password, options } = credentials;
                res = await _request(this.fetch, 'POST', `${this.url}/token?grant_type=password`, {
                    headers: this.headers,
                    body: {
                        phone,
                        password,
                        gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken },
                    },
                    xform: _sessionResponsePassword,
                });
            }
            else {
                throw new AuthInvalidCredentialsError('You must provide either an email or phone number and a password');
            }
            const { data, error } = res;
            if (error) {
                return { data: { user: null, session: null }, error };
            }
            else if (!data || !data.session || !data.user) {
                return { data: { user: null, session: null }, error: new AuthInvalidTokenResponseError() };
            }
            if (data.session) {
                await this._saveSession(data.session);
                await this._notifyAllSubscribers('SIGNED_IN', data.session);
            }
            return {
                data: Object.assign({ user: data.user, session: data.session }, (data.weak_password ? { weakPassword: data.weak_password } : null)),
                error,
            };
        }
        catch (error) {
            if (isAuthError(error)) {
                return { data: { user: null, session: null }, error };
            }
            throw error;
        }
    }
    /**
     * Log in an existing user via a third-party provider.
     * This method supports the PKCE flow.
     */
    async signInWithOAuth(credentials) {
        var _a, _b, _c, _d;
        return await this._handleProviderSignIn(credentials.provider, {
            redirectTo: (_a = credentials.options) === null || _a === void 0 ? void 0 : _a.redirectTo,
            scopes: (_b = credentials.options) === null || _b === void 0 ? void 0 : _b.scopes,
            queryParams: (_c = credentials.options) === null || _c === void 0 ? void 0 : _c.queryParams,
            skipBrowserRedirect: (_d = credentials.options) === null || _d === void 0 ? void 0 : _d.skipBrowserRedirect,
        });
    }
    /**
     * Log in an existing user by exchanging an Auth Code issued during the PKCE flow.
     */
    async exchangeCodeForSession(authCode) {
        await this.initializePromise;
        return this._acquireLock(-1, async () => {
            return this._exchangeCodeForSession(authCode);
        });
    }
    /**
     * Signs in a user by verifying a message signed by the user's private key.
     * Supports Ethereum (via Sign-In-With-Ethereum) & Solana (Sign-In-With-Solana) standards,
     * both of which derive from the EIP-4361 standard
     * With slight variation on Solana's side.
     * @reference https://eips.ethereum.org/EIPS/eip-4361
     */
    async signInWithWeb3(credentials) {
        const { chain } = credentials;
        switch (chain) {
            case 'ethereum':
                return await this.signInWithEthereum(credentials);
            case 'solana':
                return await this.signInWithSolana(credentials);
            default:
                throw new Error(`@supabase/auth-js: Unsupported chain "${chain}"`);
        }
    }
    async signInWithEthereum(credentials) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        // TODO: flatten type
        let message;
        let signature;
        if ('message' in credentials) {
            message = credentials.message;
            signature = credentials.signature;
        }
        else {
            const { chain, wallet, statement, options } = credentials;
            let resolvedWallet;
            if (!helpers_isBrowser()) {
                if (typeof wallet !== 'object' || !(options === null || options === void 0 ? void 0 : options.url)) {
                    throw new Error('@supabase/auth-js: Both wallet and url must be specified in non-browser environments.');
                }
                resolvedWallet = wallet;
            }
            else if (typeof wallet === 'object') {
                resolvedWallet = wallet;
            }
            else {
                const windowAny = window;
                if ('ethereum' in windowAny &&
                    typeof windowAny.ethereum === 'object' &&
                    'request' in windowAny.ethereum &&
                    typeof windowAny.ethereum.request === 'function') {
                    resolvedWallet = windowAny.ethereum;
                }
                else {
                    throw new Error(`@supabase/auth-js: No compatible Ethereum wallet interface on the window object (window.ethereum) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'ethereum', wallet: resolvedUserWallet }) instead.`);
                }
            }
            const url = new URL((_a = options === null || options === void 0 ? void 0 : options.url) !== null && _a !== void 0 ? _a : window.location.href);
            const accounts = await resolvedWallet
                .request({
                method: 'eth_requestAccounts',
            })
                .then((accs) => accs)
                .catch(() => {
                throw new Error(`@supabase/auth-js: Wallet method eth_requestAccounts is missing or invalid`);
            });
            if (!accounts || accounts.length === 0) {
                throw new Error(`@supabase/auth-js: No accounts available. Please ensure the wallet is connected.`);
            }
            const address = getAddress(accounts[0]);
            let chainId = (_b = options === null || options === void 0 ? void 0 : options.signInWithEthereum) === null || _b === void 0 ? void 0 : _b.chainId;
            if (!chainId) {
                const chainIdHex = await resolvedWallet.request({
                    method: 'eth_chainId',
                });
                chainId = fromHex(chainIdHex);
            }
            const siweMessage = {
                domain: url.host,
                address: address,
                statement: statement,
                uri: url.href,
                version: '1',
                chainId: chainId,
                nonce: (_c = options === null || options === void 0 ? void 0 : options.signInWithEthereum) === null || _c === void 0 ? void 0 : _c.nonce,
                issuedAt: (_e = (_d = options === null || options === void 0 ? void 0 : options.signInWithEthereum) === null || _d === void 0 ? void 0 : _d.issuedAt) !== null && _e !== void 0 ? _e : new Date(),
                expirationTime: (_f = options === null || options === void 0 ? void 0 : options.signInWithEthereum) === null || _f === void 0 ? void 0 : _f.expirationTime,
                notBefore: (_g = options === null || options === void 0 ? void 0 : options.signInWithEthereum) === null || _g === void 0 ? void 0 : _g.notBefore,
                requestId: (_h = options === null || options === void 0 ? void 0 : options.signInWithEthereum) === null || _h === void 0 ? void 0 : _h.requestId,
                resources: (_j = options === null || options === void 0 ? void 0 : options.signInWithEthereum) === null || _j === void 0 ? void 0 : _j.resources,
            };
            message = createSiweMessage(siweMessage);
            // Sign message
            signature = (await resolvedWallet.request({
                method: 'personal_sign',
                params: [toHex(message), address],
            }));
        }
        try {
            const { data, error } = await _request(this.fetch, 'POST', `${this.url}/token?grant_type=web3`, {
                headers: this.headers,
                body: Object.assign({ chain: 'ethereum', message,
                    signature }, (((_k = credentials.options) === null || _k === void 0 ? void 0 : _k.captchaToken)
                    ? { gotrue_meta_security: { captcha_token: (_l = credentials.options) === null || _l === void 0 ? void 0 : _l.captchaToken } }
                    : null)),
                xform: _sessionResponse,
            });
            if (error) {
                throw error;
            }
            if (!data || !data.session || !data.user) {
                return {
                    data: { user: null, session: null },
                    error: new AuthInvalidTokenResponseError(),
                };
            }
            if (data.session) {
                await this._saveSession(data.session);
                await this._notifyAllSubscribers('SIGNED_IN', data.session);
            }
            return { data: Object.assign({}, data), error };
        }
        catch (error) {
            if (isAuthError(error)) {
                return { data: { user: null, session: null }, error };
            }
            throw error;
        }
    }
    async signInWithSolana(credentials) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        let message;
        let signature;
        if ('message' in credentials) {
            message = credentials.message;
            signature = credentials.signature;
        }
        else {
            const { chain, wallet, statement, options } = credentials;
            let resolvedWallet;
            if (!helpers_isBrowser()) {
                if (typeof wallet !== 'object' || !(options === null || options === void 0 ? void 0 : options.url)) {
                    throw new Error('@supabase/auth-js: Both wallet and url must be specified in non-browser environments.');
                }
                resolvedWallet = wallet;
            }
            else if (typeof wallet === 'object') {
                resolvedWallet = wallet;
            }
            else {
                const windowAny = window;
                if ('solana' in windowAny &&
                    typeof windowAny.solana === 'object' &&
                    (('signIn' in windowAny.solana && typeof windowAny.solana.signIn === 'function') ||
                        ('signMessage' in windowAny.solana &&
                            typeof windowAny.solana.signMessage === 'function'))) {
                    resolvedWallet = windowAny.solana;
                }
                else {
                    throw new Error(`@supabase/auth-js: No compatible Solana wallet interface on the window object (window.solana) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'solana', wallet: resolvedUserWallet }) instead.`);
                }
            }
            const url = new URL((_a = options === null || options === void 0 ? void 0 : options.url) !== null && _a !== void 0 ? _a : window.location.href);
            if ('signIn' in resolvedWallet && resolvedWallet.signIn) {
                const output = await resolvedWallet.signIn(Object.assign(Object.assign(Object.assign({ issuedAt: new Date().toISOString() }, options === null || options === void 0 ? void 0 : options.signInWithSolana), { 
                    // non-overridable properties
                    version: '1', domain: url.host, uri: url.href }), (statement ? { statement } : null)));
                let outputToProcess;
                if (Array.isArray(output) && output[0] && typeof output[0] === 'object') {
                    outputToProcess = output[0];
                }
                else if (output &&
                    typeof output === 'object' &&
                    'signedMessage' in output &&
                    'signature' in output) {
                    outputToProcess = output;
                }
                else {
                    throw new Error('@supabase/auth-js: Wallet method signIn() returned unrecognized value');
                }
                if ('signedMessage' in outputToProcess &&
                    'signature' in outputToProcess &&
                    (typeof outputToProcess.signedMessage === 'string' ||
                        outputToProcess.signedMessage instanceof Uint8Array) &&
                    outputToProcess.signature instanceof Uint8Array) {
                    message =
                        typeof outputToProcess.signedMessage === 'string'
                            ? outputToProcess.signedMessage
                            : new TextDecoder().decode(outputToProcess.signedMessage);
                    signature = outputToProcess.signature;
                }
                else {
                    throw new Error('@supabase/auth-js: Wallet method signIn() API returned object without signedMessage and signature fields');
                }
            }
            else {
                if (!('signMessage' in resolvedWallet) ||
                    typeof resolvedWallet.signMessage !== 'function' ||
                    !('publicKey' in resolvedWallet) ||
                    typeof resolvedWallet !== 'object' ||
                    !resolvedWallet.publicKey ||
                    !('toBase58' in resolvedWallet.publicKey) ||
                    typeof resolvedWallet.publicKey.toBase58 !== 'function') {
                    throw new Error('@supabase/auth-js: Wallet does not have a compatible signMessage() and publicKey.toBase58() API');
                }
                message = [
                    `${url.host} wants you to sign in with your Solana account:`,
                    resolvedWallet.publicKey.toBase58(),
                    ...(statement ? ['', statement, ''] : ['']),
                    'Version: 1',
                    `URI: ${url.href}`,
                    `Issued At: ${(_c = (_b = options === null || options === void 0 ? void 0 : options.signInWithSolana) === null || _b === void 0 ? void 0 : _b.issuedAt) !== null && _c !== void 0 ? _c : new Date().toISOString()}`,
                    ...(((_d = options === null || options === void 0 ? void 0 : options.signInWithSolana) === null || _d === void 0 ? void 0 : _d.notBefore)
                        ? [`Not Before: ${options.signInWithSolana.notBefore}`]
                        : []),
                    ...(((_e = options === null || options === void 0 ? void 0 : options.signInWithSolana) === null || _e === void 0 ? void 0 : _e.expirationTime)
                        ? [`Expiration Time: ${options.signInWithSolana.expirationTime}`]
                        : []),
                    ...(((_f = options === null || options === void 0 ? void 0 : options.signInWithSolana) === null || _f === void 0 ? void 0 : _f.chainId)
                        ? [`Chain ID: ${options.signInWithSolana.chainId}`]
                        : []),
                    ...(((_g = options === null || options === void 0 ? void 0 : options.signInWithSolana) === null || _g === void 0 ? void 0 : _g.nonce) ? [`Nonce: ${options.signInWithSolana.nonce}`] : []),
                    ...(((_h = options === null || options === void 0 ? void 0 : options.signInWithSolana) === null || _h === void 0 ? void 0 : _h.requestId)
                        ? [`Request ID: ${options.signInWithSolana.requestId}`]
                        : []),
                    ...(((_k = (_j = options === null || options === void 0 ? void 0 : options.signInWithSolana) === null || _j === void 0 ? void 0 : _j.resources) === null || _k === void 0 ? void 0 : _k.length)
                        ? [
                            'Resources',
                            ...options.signInWithSolana.resources.map((resource) => `- ${resource}`),
                        ]
                        : []),
                ].join('\n');
                const maybeSignature = await resolvedWallet.signMessage(new TextEncoder().encode(message), 'utf8');
                if (!maybeSignature || !(maybeSignature instanceof Uint8Array)) {
                    throw new Error('@supabase/auth-js: Wallet signMessage() API returned an recognized value');
                }
                signature = maybeSignature;
            }
        }
        try {
            const { data, error } = await _request(this.fetch, 'POST', `${this.url}/token?grant_type=web3`, {
                headers: this.headers,
                body: Object.assign({ chain: 'solana', message, signature: bytesToBase64URL(signature) }, (((_l = credentials.options) === null || _l === void 0 ? void 0 : _l.captchaToken)
                    ? { gotrue_meta_security: { captcha_token: (_m = credentials.options) === null || _m === void 0 ? void 0 : _m.captchaToken } }
                    : null)),
                xform: _sessionResponse,
            });
            if (error) {
                throw error;
            }
            if (!data || !data.session || !data.user) {
                return {
                    data: { user: null, session: null },
                    error: new AuthInvalidTokenResponseError(),
                };
            }
            if (data.session) {
                await this._saveSession(data.session);
                await this._notifyAllSubscribers('SIGNED_IN', data.session);
            }
            return { data: Object.assign({}, data), error };
        }
        catch (error) {
            if (isAuthError(error)) {
                return { data: { user: null, session: null }, error };
            }
            throw error;
        }
    }
    async _exchangeCodeForSession(authCode) {
        const storageItem = await getItemAsync(this.storage, `${this.storageKey}-code-verifier`);
        const [codeVerifier, redirectType] = (storageItem !== null && storageItem !== void 0 ? storageItem : '').split('/');
        try {
            const { data, error } = await _request(this.fetch, 'POST', `${this.url}/token?grant_type=pkce`, {
                headers: this.headers,
                body: {
                    auth_code: authCode,
                    code_verifier: codeVerifier,
                },
                xform: _sessionResponse,
            });
            await removeItemAsync(this.storage, `${this.storageKey}-code-verifier`);
            if (error) {
                throw error;
            }
            if (!data || !data.session || !data.user) {
                return {
                    data: { user: null, session: null, redirectType: null },
                    error: new AuthInvalidTokenResponseError(),
                };
            }
            if (data.session) {
                await this._saveSession(data.session);
                await this._notifyAllSubscribers('SIGNED_IN', data.session);
            }
            return { data: Object.assign(Object.assign({}, data), { redirectType: redirectType !== null && redirectType !== void 0 ? redirectType : null }), error };
        }
        catch (error) {
            if (isAuthError(error)) {
                return { data: { user: null, session: null, redirectType: null }, error };
            }
            throw error;
        }
    }
    /**
     * Allows signing in with an OIDC ID token. The authentication provider used
     * should be enabled and configured.
     */
    async signInWithIdToken(credentials) {
        try {
            const { options, provider, token, access_token, nonce } = credentials;
            const res = await _request(this.fetch, 'POST', `${this.url}/token?grant_type=id_token`, {
                headers: this.headers,
                body: {
                    provider,
                    id_token: token,
                    access_token,
                    nonce,
                    gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken },
                },
                xform: _sessionResponse,
            });
            const { data, error } = res;
            if (error) {
                return { data: { user: null, session: null }, error };
            }
            else if (!data || !data.session || !data.user) {
                return {
                    data: { user: null, session: null },
                    error: new AuthInvalidTokenResponseError(),
                };
            }
            if (data.session) {
                await this._saveSession(data.session);
                await this._notifyAllSubscribers('SIGNED_IN', data.session);
            }
            return { data, error };
        }
        catch (error) {
            if (isAuthError(error)) {
                return { data: { user: null, session: null }, error };
            }
            throw error;
        }
    }
    /**
     * Log in a user using magiclink or a one-time password (OTP).
     *
     * If the `{{ .ConfirmationURL }}` variable is specified in the email template, a magiclink will be sent.
     * If the `{{ .Token }}` variable is specified in the email template, an OTP will be sent.
     * If you're using phone sign-ins, only an OTP will be sent. You won't be able to send a magiclink for phone sign-ins.
     *
     * Be aware that you may get back an error message that will not distinguish
     * between the cases where the account does not exist or, that the account
     * can only be accessed via social login.
     *
     * Do note that you will need to configure a Whatsapp sender on Twilio
     * if you are using phone sign in with the 'whatsapp' channel. The whatsapp
     * channel is not supported on other providers
     * at this time.
     * This method supports PKCE when an email is passed.
     */
    async signInWithOtp(credentials) {
        var _a, _b, _c, _d, _e;
        try {
            if ('email' in credentials) {
                const { email, options } = credentials;
                let codeChallenge = null;
                let codeChallengeMethod = null;
                if (this.flowType === 'pkce') {
                    ;
                    [codeChallenge, codeChallengeMethod] = await getCodeChallengeAndMethod(this.storage, this.storageKey);
                }
                const { error } = await _request(this.fetch, 'POST', `${this.url}/otp`, {
                    headers: this.headers,
                    body: {
                        email,
                        data: (_a = options === null || options === void 0 ? void 0 : options.data) !== null && _a !== void 0 ? _a : {},
                        create_user: (_b = options === null || options === void 0 ? void 0 : options.shouldCreateUser) !== null && _b !== void 0 ? _b : true,
                        gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken },
                        code_challenge: codeChallenge,
                        code_challenge_method: codeChallengeMethod,
                    },
                    redirectTo: options === null || options === void 0 ? void 0 : options.emailRedirectTo,
                });
                return { data: { user: null, session: null }, error };
            }
            if ('phone' in credentials) {
                const { phone, options } = credentials;
                const { data, error } = await _request(this.fetch, 'POST', `${this.url}/otp`, {
                    headers: this.headers,
                    body: {
                        phone,
                        data: (_c = options === null || options === void 0 ? void 0 : options.data) !== null && _c !== void 0 ? _c : {},
                        create_user: (_d = options === null || options === void 0 ? void 0 : options.shouldCreateUser) !== null && _d !== void 0 ? _d : true,
                        gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken },
                        channel: (_e = options === null || options === void 0 ? void 0 : options.channel) !== null && _e !== void 0 ? _e : 'sms',
                    },
                });
                return { data: { user: null, session: null, messageId: data === null || data === void 0 ? void 0 : data.message_id }, error };
            }
            throw new AuthInvalidCredentialsError('You must provide either an email or phone number.');
        }
        catch (error) {
            if (isAuthError(error)) {
                return { data: { user: null, session: null }, error };
            }
            throw error;
        }
    }
    /**
     * Log in a user given a User supplied OTP or TokenHash received through mobile or email.
     */
    async verifyOtp(params) {
        var _a, _b;
        try {
            let redirectTo = undefined;
            let captchaToken = undefined;
            if ('options' in params) {
                redirectTo = (_a = params.options) === null || _a === void 0 ? void 0 : _a.redirectTo;
                captchaToken = (_b = params.options) === null || _b === void 0 ? void 0 : _b.captchaToken;
            }
            const { data, error } = await _request(this.fetch, 'POST', `${this.url}/verify`, {
                headers: this.headers,
                body: Object.assign(Object.assign({}, params), { gotrue_meta_security: { captcha_token: captchaToken } }),
                redirectTo,
                xform: _sessionResponse,
            });
            if (error) {
                throw error;
            }
            if (!data) {
                throw new Error('An error occurred on token verification.');
            }
            const session = data.session;
            const user = data.user;
            if (session === null || session === void 0 ? void 0 : session.access_token) {
                await this._saveSession(session);
                await this._notifyAllSubscribers(params.type == 'recovery' ? 'PASSWORD_RECOVERY' : 'SIGNED_IN', session);
            }
            return { data: { user, session }, error: null };
        }
        catch (error) {
            if (isAuthError(error)) {
                return { data: { user: null, session: null }, error };
            }
            throw error;
        }
    }
    /**
     * Attempts a single-sign on using an enterprise Identity Provider. A
     * successful SSO attempt will redirect the current page to the identity
     * provider authorization page. The redirect URL is implementation and SSO
     * protocol specific.
     *
     * You can use it by providing a SSO domain. Typically you can extract this
     * domain by asking users for their email address. If this domain is
     * registered on the Auth instance the redirect will use that organization's
     * currently active SSO Identity Provider for the login.
     *
     * If you have built an organization-specific login page, you can use the
     * organization's SSO Identity Provider UUID directly instead.
     */
    async signInWithSSO(params) {
        var _a, _b, _c;
        try {
            let codeChallenge = null;
            let codeChallengeMethod = null;
            if (this.flowType === 'pkce') {
                ;
                [codeChallenge, codeChallengeMethod] = await getCodeChallengeAndMethod(this.storage, this.storageKey);
            }
            return await _request(this.fetch, 'POST', `${this.url}/sso`, {
                body: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, ('providerId' in params ? { provider_id: params.providerId } : null)), ('domain' in params ? { domain: params.domain } : null)), { redirect_to: (_b = (_a = params.options) === null || _a === void 0 ? void 0 : _a.redirectTo) !== null && _b !== void 0 ? _b : undefined }), (((_c = params === null || params === void 0 ? void 0 : params.options) === null || _c === void 0 ? void 0 : _c.captchaToken)
                    ? { gotrue_meta_security: { captcha_token: params.options.captchaToken } }
                    : null)), { skip_http_redirect: true, code_challenge: codeChallenge, code_challenge_method: codeChallengeMethod }),
                headers: this.headers,
                xform: _ssoResponse,
            });
        }
        catch (error) {
            if (isAuthError(error)) {
                return { data: null, error };
            }
            throw error;
        }
    }
    /**
     * Sends a reauthentication OTP to the user's email or phone number.
     * Requires the user to be signed-in.
     */
    async reauthenticate() {
        await this.initializePromise;
        return await this._acquireLock(-1, async () => {
            return await this._reauthenticate();
        });
    }
    async _reauthenticate() {
        try {
            return await this._useSession(async (result) => {
                const { data: { session }, error: sessionError, } = result;
                if (sessionError)
                    throw sessionError;
                if (!session)
                    throw new AuthSessionMissingError();
                const { error } = await _request(this.fetch, 'GET', `${this.url}/reauthenticate`, {
                    headers: this.headers,
                    jwt: session.access_token,
                });
                return { data: { user: null, session: null }, error };
            });
        }
        catch (error) {
            if (isAuthError(error)) {
                return { data: { user: null, session: null }, error };
            }
            throw error;
        }
    }
    /**
     * Resends an existing signup confirmation email, email change email, SMS OTP or phone change OTP.
     */
    async resend(credentials) {
        try {
            const endpoint = `${this.url}/resend`;
            if ('email' in credentials) {
                const { email, type, options } = credentials;
                const { error } = await _request(this.fetch, 'POST', endpoint, {
                    headers: this.headers,
                    body: {
                        email,
                        type,
                        gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken },
                    },
                    redirectTo: options === null || options === void 0 ? void 0 : options.emailRedirectTo,
                });
                return { data: { user: null, session: null }, error };
            }
            else if ('phone' in credentials) {
                const { phone, type, options } = credentials;
                const { data, error } = await _request(this.fetch, 'POST', endpoint, {
                    headers: this.headers,
                    body: {
                        phone,
                        type,
                        gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken },
                    },
                });
                return { data: { user: null, session: null, messageId: data === null || data === void 0 ? void 0 : data.message_id }, error };
            }
            throw new AuthInvalidCredentialsError('You must provide either an email or phone number and a type');
        }
        catch (error) {
            if (isAuthError(error)) {
                return { data: { user: null, session: null }, error };
            }
            throw error;
        }
    }
    /**
     * Returns the session, refreshing it if necessary.
     *
     * The session returned can be null if the session is not detected which can happen in the event a user is not signed-in or has logged out.
     *
     * **IMPORTANT:** This method loads values directly from the storage attached
     * to the client. If that storage is based on request cookies for example,
     * the values in it may not be authentic and therefore it's strongly advised
     * against using this method and its results in such circumstances. A warning
     * will be emitted if this is detected. Use {@link #getUser()} instead.
     */
    async getSession() {
        await this.initializePromise;
        const result = await this._acquireLock(-1, async () => {
            return this._useSession(async (result) => {
                return result;
            });
        });
        return result;
    }
    /**
     * Acquires a global lock based on the storage key.
     */
    async _acquireLock(acquireTimeout, fn) {
        this._debug('#_acquireLock', 'begin', acquireTimeout);
        try {
            if (this.lockAcquired) {
                const last = this.pendingInLock.length
                    ? this.pendingInLock[this.pendingInLock.length - 1]
                    : Promise.resolve();
                const result = (async () => {
                    await last;
                    return await fn();
                })();
                this.pendingInLock.push((async () => {
                    try {
                        await result;
                    }
                    catch (e) {
                        // we just care if it finished
                    }
                })());
                return result;
            }
            return await this.lock(`lock:${this.storageKey}`, acquireTimeout, async () => {
                this._debug('#_acquireLock', 'lock acquired for storage key', this.storageKey);
                try {
                    this.lockAcquired = true;
                    const result = fn();
                    this.pendingInLock.push((async () => {
                        try {
                            await result;
                        }
                        catch (e) {
                            // we just care if it finished
                        }
                    })());
                    await result;
                    // keep draining the queue until there's nothing to wait on
                    while (this.pendingInLock.length) {
                        const waitOn = [...this.pendingInLock];
                        await Promise.all(waitOn);
                        this.pendingInLock.splice(0, waitOn.length);
                    }
                    return await result;
                }
                finally {
                    this._debug('#_acquireLock', 'lock released for storage key', this.storageKey);
                    this.lockAcquired = false;
                }
            });
        }
        finally {
            this._debug('#_acquireLock', 'end');
        }
    }
    /**
     * Use instead of {@link #getSession} inside the library. It is
     * semantically usually what you want, as getting a session involves some
     * processing afterwards that requires only one client operating on the
     * session at once across multiple tabs or processes.
     */
    async _useSession(fn) {
        this._debug('#_useSession', 'begin');
        try {
            // the use of __loadSession here is the only correct use of the function!
            const result = await this.__loadSession();
            return await fn(result);
        }
        finally {
            this._debug('#_useSession', 'end');
        }
    }
    /**
     * NEVER USE DIRECTLY!
     *
     * Always use {@link #_useSession}.
     */
    async __loadSession() {
        this._debug('#__loadSession()', 'begin');
        if (!this.lockAcquired) {
            this._debug('#__loadSession()', 'used outside of an acquired lock!', new Error().stack);
        }
        try {
            let currentSession = null;
            const maybeSession = await getItemAsync(this.storage, this.storageKey);
            this._debug('#getSession()', 'session from storage', maybeSession);
            if (maybeSession !== null) {
                if (this._isValidSession(maybeSession)) {
                    currentSession = maybeSession;
                }
                else {
                    this._debug('#getSession()', 'session from storage is not valid');
                    await this._removeSession();
                }
            }
            if (!currentSession) {
                return { data: { session: null }, error: null };
            }
            // A session is considered expired before the access token _actually_
            // expires. When the autoRefreshToken option is off (or when the tab is
            // in the background), very eager users of getSession() -- like
            // realtime-js -- might send a valid JWT which will expire by the time it
            // reaches the server.
            const hasExpired = currentSession.expires_at
                ? currentSession.expires_at * 1000 - Date.now() < EXPIRY_MARGIN_MS
                : false;
            this._debug('#__loadSession()', `session has${hasExpired ? '' : ' not'} expired`, 'expires_at', currentSession.expires_at);
            if (!hasExpired) {
                if (this.userStorage) {
                    const maybeUser = (await getItemAsync(this.userStorage, this.storageKey + '-user'));
                    if (maybeUser === null || maybeUser === void 0 ? void 0 : maybeUser.user) {
                        currentSession.user = maybeUser.user;
                    }
                    else {
                        currentSession.user = userNotAvailableProxy();
                    }
                }
                if (this.storage.isServer && currentSession.user) {
                    let suppressWarning = this.suppressGetSessionWarning;
                    const proxySession = new Proxy(currentSession, {
                        get: (target, prop, receiver) => {
                            if (!suppressWarning && prop === 'user') {
                                // only show warning when the user object is being accessed from the server
                                console.warn('Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and may not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server.');
                                suppressWarning = true; // keeps this proxy instance from logging additional warnings
                                this.suppressGetSessionWarning = true; // keeps this client's future proxy instances from warning
                            }
                            return Reflect.get(target, prop, receiver);
                        },
                    });
                    currentSession = proxySession;
                }
                return { data: { session: currentSession }, error: null };
            }
            const { session, error } = await this._callRefreshToken(currentSession.refresh_token);
            if (error) {
                return { data: { session: null }, error };
            }
            return { data: { session }, error: null };
        }
        finally {
            this._debug('#__loadSession()', 'end');
        }
    }
    /**
     * Gets the current user details if there is an existing session. This method
     * performs a network request to the Supabase Auth server, so the returned
     * value is authentic and can be used to base authorization rules on.
     *
     * @param jwt Takes in an optional access token JWT. If no JWT is provided, the JWT from the current session is used.
     */
    async getUser(jwt) {
        if (jwt) {
            return await this._getUser(jwt);
        }
        await this.initializePromise;
        const result = await this._acquireLock(-1, async () => {
            return await this._getUser();
        });
        return result;
    }
    async _getUser(jwt) {
        try {
            if (jwt) {
                return await _request(this.fetch, 'GET', `${this.url}/user`, {
                    headers: this.headers,
                    jwt: jwt,
                    xform: _userResponse,
                });
            }
            return await this._useSession(async (result) => {
                var _a, _b, _c;
                const { data, error } = result;
                if (error) {
                    throw error;
                }
                // returns an error if there is no access_token or custom authorization header
                if (!((_a = data.session) === null || _a === void 0 ? void 0 : _a.access_token) && !this.hasCustomAuthorizationHeader) {
                    return { data: { user: null }, error: new AuthSessionMissingError() };
                }
                return await _request(this.fetch, 'GET', `${this.url}/user`, {
                    headers: this.headers,
                    jwt: (_c = (_b = data.session) === null || _b === void 0 ? void 0 : _b.access_token) !== null && _c !== void 0 ? _c : undefined,
                    xform: _userResponse,
                });
            });
        }
        catch (error) {
            if (isAuthError(error)) {
                if (isAuthSessionMissingError(error)) {
                    // JWT contains a `session_id` which does not correspond to an active
                    // session in the database, indicating the user is signed out.
                    await this._removeSession();
                    await removeItemAsync(this.storage, `${this.storageKey}-code-verifier`);
                }
                return { data: { user: null }, error };
            }
            throw error;
        }
    }
    /**
     * Updates user data for a logged in user.
     */
    async updateUser(attributes, options = {}) {
        await this.initializePromise;
        return await this._acquireLock(-1, async () => {
            return await this._updateUser(attributes, options);
        });
    }
    async _updateUser(attributes, options = {}) {
        try {
            return await this._useSession(async (result) => {
                const { data: sessionData, error: sessionError } = result;
                if (sessionError) {
                    throw sessionError;
                }
                if (!sessionData.session) {
                    throw new AuthSessionMissingError();
                }
                const session = sessionData.session;
                let codeChallenge = null;
                let codeChallengeMethod = null;
                if (this.flowType === 'pkce' && attributes.email != null) {
                    ;
                    [codeChallenge, codeChallengeMethod] = await getCodeChallengeAndMethod(this.storage, this.storageKey);
                }
                const { data, error: userError } = await _request(this.fetch, 'PUT', `${this.url}/user`, {
                    headers: this.headers,
                    redirectTo: options === null || options === void 0 ? void 0 : options.emailRedirectTo,
                    body: Object.assign(Object.assign({}, attributes), { code_challenge: codeChallenge, code_challenge_method: codeChallengeMethod }),
                    jwt: session.access_token,
                    xform: _userResponse,
                });
                if (userError)
                    throw userError;
                session.user = data.user;
                await this._saveSession(session);
                await this._notifyAllSubscribers('USER_UPDATED', session);
                return { data: { user: session.user }, error: null };
            });
        }
        catch (error) {
            if (isAuthError(error)) {
                return { data: { user: null }, error };
            }
            throw error;
        }
    }
    /**
     * Sets the session data from the current session. If the current session is expired, setSession will take care of refreshing it to obtain a new session.
     * If the refresh token or access token in the current session is invalid, an error will be thrown.
     * @param currentSession The current session that minimally contains an access token and refresh token.
     */
    async setSession(currentSession) {
        await this.initializePromise;
        return await this._acquireLock(-1, async () => {
            return await this._setSession(currentSession);
        });
    }
    async _setSession(currentSession) {
        try {
            if (!currentSession.access_token || !currentSession.refresh_token) {
                throw new AuthSessionMissingError();
            }
            const timeNow = Date.now() / 1000;
            let expiresAt = timeNow;
            let hasExpired = true;
            let session = null;
            const { payload } = decodeJWT(currentSession.access_token);
            if (payload.exp) {
                expiresAt = payload.exp;
                hasExpired = expiresAt <= timeNow;
            }
            if (hasExpired) {
                const { session: refreshedSession, error } = await this._callRefreshToken(currentSession.refresh_token);
                if (error) {
                    return { data: { user: null, session: null }, error: error };
                }
                if (!refreshedSession) {
                    return { data: { user: null, session: null }, error: null };
                }
                session = refreshedSession;
            }
            else {
                const { data, error } = await this._getUser(currentSession.access_token);
                if (error) {
                    throw error;
                }
                session = {
                    access_token: currentSession.access_token,
                    refresh_token: currentSession.refresh_token,
                    user: data.user,
                    token_type: 'bearer',
                    expires_in: expiresAt - timeNow,
                    expires_at: expiresAt,
                };
                await this._saveSession(session);
                await this._notifyAllSubscribers('SIGNED_IN', session);
            }
            return { data: { user: session.user, session }, error: null };
        }
        catch (error) {
            if (isAuthError(error)) {
                return { data: { session: null, user: null }, error };
            }
            throw error;
        }
    }
    /**
     * Returns a new session, regardless of expiry status.
     * Takes in an optional current session. If not passed in, then refreshSession() will attempt to retrieve it from getSession().
     * If the current session's refresh token is invalid, an error will be thrown.
     * @param currentSession The current session. If passed in, it must contain a refresh token.
     */
    async refreshSession(currentSession) {
        await this.initializePromise;
        return await this._acquireLock(-1, async () => {
            return await this._refreshSession(currentSession);
        });
    }
    async _refreshSession(currentSession) {
        try {
            return await this._useSession(async (result) => {
                var _a;
                if (!currentSession) {
                    const { data, error } = result;
                    if (error) {
                        throw error;
                    }
                    currentSession = (_a = data.session) !== null && _a !== void 0 ? _a : undefined;
                }
                if (!(currentSession === null || currentSession === void 0 ? void 0 : currentSession.refresh_token)) {
                    throw new AuthSessionMissingError();
                }
                const { session, error } = await this._callRefreshToken(currentSession.refresh_token);
                if (error) {
                    return { data: { user: null, session: null }, error: error };
                }
                if (!session) {
                    return { data: { user: null, session: null }, error: null };
                }
                return { data: { user: session.user, session }, error: null };
            });
        }
        catch (error) {
            if (isAuthError(error)) {
                return { data: { user: null, session: null }, error };
            }
            throw error;
        }
    }
    /**
     * Gets the session data from a URL string
     */
    async _getSessionFromURL(params, callbackUrlType) {
        try {
            if (!helpers_isBrowser())
                throw new AuthImplicitGrantRedirectError('No browser detected.');
            // If there's an error in the URL, it doesn't matter what flow it is, we just return the error.
            if (params.error || params.error_description || params.error_code) {
                // The error class returned implies that the redirect is from an implicit grant flow
                // but it could also be from a redirect error from a PKCE flow.
                throw new AuthImplicitGrantRedirectError(params.error_description || 'Error in URL with unspecified error_description', {
                    error: params.error || 'unspecified_error',
                    code: params.error_code || 'unspecified_code',
                });
            }
            // Checks for mismatches between the flowType initialised in the client and the URL parameters
            switch (callbackUrlType) {
                case 'implicit':
                    if (this.flowType === 'pkce') {
                        throw new AuthPKCEGrantCodeExchangeError('Not a valid PKCE flow url.');
                    }
                    break;
                case 'pkce':
                    if (this.flowType === 'implicit') {
                        throw new AuthImplicitGrantRedirectError('Not a valid implicit grant flow url.');
                    }
                    break;
                default:
                // there's no mismatch so we continue
            }
            // Since this is a redirect for PKCE, we attempt to retrieve the code from the URL for the code exchange
            if (callbackUrlType === 'pkce') {
                this._debug('#_initialize()', 'begin', 'is PKCE flow', true);
                if (!params.code)
                    throw new AuthPKCEGrantCodeExchangeError('No code detected.');
                const { data, error } = await this._exchangeCodeForSession(params.code);
                if (error)
                    throw error;
                const url = new URL(window.location.href);
                url.searchParams.delete('code');
                window.history.replaceState(window.history.state, '', url.toString());
                return { data: { session: data.session, redirectType: null }, error: null };
            }
            const { provider_token, provider_refresh_token, access_token, refresh_token, expires_in, expires_at, token_type, } = params;
            if (!access_token || !expires_in || !refresh_token || !token_type) {
                throw new AuthImplicitGrantRedirectError('No session defined in URL');
            }
            const timeNow = Math.round(Date.now() / 1000);
            const expiresIn = parseInt(expires_in);
            let expiresAt = timeNow + expiresIn;
            if (expires_at) {
                expiresAt = parseInt(expires_at);
            }
            const actuallyExpiresIn = expiresAt - timeNow;
            if (actuallyExpiresIn * 1000 <= AUTO_REFRESH_TICK_DURATION_MS) {
                console.warn(`@supabase/gotrue-js: Session as retrieved from URL expires in ${actuallyExpiresIn}s, should have been closer to ${expiresIn}s`);
            }
            const issuedAt = expiresAt - expiresIn;
            if (timeNow - issuedAt >= 120) {
                console.warn('@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale', issuedAt, expiresAt, timeNow);
            }
            else if (timeNow - issuedAt < 0) {
                console.warn('@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew', issuedAt, expiresAt, timeNow);
            }
            const { data, error } = await this._getUser(access_token);
            if (error)
                throw error;
            const session = {
                provider_token,
                provider_refresh_token,
                access_token,
                expires_in: expiresIn,
                expires_at: expiresAt,
                refresh_token,
                token_type,
                user: data.user,
            };
            // Remove tokens from URL
            window.location.hash = '';
            this._debug('#_getSessionFromURL()', 'clearing window.location.hash');
            return { data: { session, redirectType: params.type }, error: null };
        }
        catch (error) {
            if (isAuthError(error)) {
                return { data: { session: null, redirectType: null }, error };
            }
            throw error;
        }
    }
    /**
     * Checks if the current URL contains parameters given by an implicit oauth grant flow (https://www.rfc-editor.org/rfc/rfc6749.html#section-4.2)
     */
    _isImplicitGrantCallback(params) {
        return Boolean(params.access_token || params.error_description);
    }
    /**
     * Checks if the current URL and backing storage contain parameters given by a PKCE flow
     */
    async _isPKCECallback(params) {
        const currentStorageContent = await getItemAsync(this.storage, `${this.storageKey}-code-verifier`);
        return !!(params.code && currentStorageContent);
    }
    /**
     * Inside a browser context, `signOut()` will remove the logged in user from the browser session and log them out - removing all items from localstorage and then trigger a `"SIGNED_OUT"` event.
     *
     * For server-side management, you can revoke all refresh tokens for a user by passing a user's JWT through to `auth.api.signOut(JWT: string)`.
     * There is no way to revoke a user's access token jwt until it expires. It is recommended to set a shorter expiry on the jwt for this reason.
     *
     * If using `others` scope, no `SIGNED_OUT` event is fired!
     */
    async signOut(options = { scope: 'global' }) {
        await this.initializePromise;
        return await this._acquireLock(-1, async () => {
            return await this._signOut(options);
        });
    }
    async _signOut({ scope } = { scope: 'global' }) {
        return await this._useSession(async (result) => {
            var _a;
            const { data, error: sessionError } = result;
            if (sessionError) {
                return { error: sessionError };
            }
            const accessToken = (_a = data.session) === null || _a === void 0 ? void 0 : _a.access_token;
            if (accessToken) {
                const { error } = await this.admin.signOut(accessToken, scope);
                if (error) {
                    // ignore 404s since user might not exist anymore
                    // ignore 401s since an invalid or expired JWT should sign out the current session
                    if (!(isAuthApiError(error) &&
                        (error.status === 404 || error.status === 401 || error.status === 403))) {
                        return { error };
                    }
                }
            }
            if (scope !== 'others') {
                await this._removeSession();
                await removeItemAsync(this.storage, `${this.storageKey}-code-verifier`);
            }
            return { error: null };
        });
    }
    /**
     * Receive a notification every time an auth event happens.
     * @param callback A callback function to be invoked when an auth event happens.
     */
    onAuthStateChange(callback) {
        const id = helpers_uuid();
        const subscription = {
            id,
            callback,
            unsubscribe: () => {
                this._debug('#unsubscribe()', 'state change callback with id removed', id);
                this.stateChangeEmitters.delete(id);
            },
        };
        this._debug('#onAuthStateChange()', 'registered callback with id', id);
        this.stateChangeEmitters.set(id, subscription);
        (async () => {
            await this.initializePromise;
            await this._acquireLock(-1, async () => {
                this._emitInitialSession(id);
            });
        })();
        return { data: { subscription } };
    }
    async _emitInitialSession(id) {
        return await this._useSession(async (result) => {
            var _a, _b;
            try {
                const { data: { session }, error, } = result;
                if (error)
                    throw error;
                await ((_a = this.stateChangeEmitters.get(id)) === null || _a === void 0 ? void 0 : _a.callback('INITIAL_SESSION', session));
                this._debug('INITIAL_SESSION', 'callback id', id, 'session', session);
            }
            catch (err) {
                await ((_b = this.stateChangeEmitters.get(id)) === null || _b === void 0 ? void 0 : _b.callback('INITIAL_SESSION', null));
                this._debug('INITIAL_SESSION', 'callback id', id, 'error', err);
                console.error(err);
            }
        });
    }
    /**
     * Sends a password reset request to an email address. This method supports the PKCE flow.
     *
     * @param email The email address of the user.
     * @param options.redirectTo The URL to send the user to after they click the password reset link.
     * @param options.captchaToken Verification token received when the user completes the captcha on the site.
     */
    async resetPasswordForEmail(email, options = {}) {
        let codeChallenge = null;
        let codeChallengeMethod = null;
        if (this.flowType === 'pkce') {
            ;
            [codeChallenge, codeChallengeMethod] = await getCodeChallengeAndMethod(this.storage, this.storageKey, true // isPasswordRecovery
            );
        }
        try {
            return await _request(this.fetch, 'POST', `${this.url}/recover`, {
                body: {
                    email,
                    code_challenge: codeChallenge,
                    code_challenge_method: codeChallengeMethod,
                    gotrue_meta_security: { captcha_token: options.captchaToken },
                },
                headers: this.headers,
                redirectTo: options.redirectTo,
            });
        }
        catch (error) {
            if (isAuthError(error)) {
                return { data: null, error };
            }
            throw error;
        }
    }
    /**
     * Gets all the identities linked to a user.
     */
    async getUserIdentities() {
        var _a;
        try {
            const { data, error } = await this.getUser();
            if (error)
                throw error;
            return { data: { identities: (_a = data.user.identities) !== null && _a !== void 0 ? _a : [] }, error: null };
        }
        catch (error) {
            if (isAuthError(error)) {
                return { data: null, error };
            }
            throw error;
        }
    }
    /**
     * Links an oauth identity to an existing user.
     * This method supports the PKCE flow.
     */
    async linkIdentity(credentials) {
        var _a;
        try {
            const { data, error } = await this._useSession(async (result) => {
                var _a, _b, _c, _d, _e;
                const { data, error } = result;
                if (error)
                    throw error;
                const url = await this._getUrlForProvider(`${this.url}/user/identities/authorize`, credentials.provider, {
                    redirectTo: (_a = credentials.options) === null || _a === void 0 ? void 0 : _a.redirectTo,
                    scopes: (_b = credentials.options) === null || _b === void 0 ? void 0 : _b.scopes,
                    queryParams: (_c = credentials.options) === null || _c === void 0 ? void 0 : _c.queryParams,
                    skipBrowserRedirect: true,
                });
                return await _request(this.fetch, 'GET', url, {
                    headers: this.headers,
                    jwt: (_e = (_d = data.session) === null || _d === void 0 ? void 0 : _d.access_token) !== null && _e !== void 0 ? _e : undefined,
                });
            });
            if (error)
                throw error;
            if (helpers_isBrowser() && !((_a = credentials.options) === null || _a === void 0 ? void 0 : _a.skipBrowserRedirect)) {
                window.location.assign(data === null || data === void 0 ? void 0 : data.url);
            }
            return { data: { provider: credentials.provider, url: data === null || data === void 0 ? void 0 : data.url }, error: null };
        }
        catch (error) {
            if (isAuthError(error)) {
                return { data: { provider: credentials.provider, url: null }, error };
            }
            throw error;
        }
    }
    /**
     * Unlinks an identity from a user by deleting it. The user will no longer be able to sign in with that identity once it's unlinked.
     */
    async unlinkIdentity(identity) {
        try {
            return await this._useSession(async (result) => {
                var _a, _b;
                const { data, error } = result;
                if (error) {
                    throw error;
                }
                return await _request(this.fetch, 'DELETE', `${this.url}/user/identities/${identity.identity_id}`, {
                    headers: this.headers,
                    jwt: (_b = (_a = data.session) === null || _a === void 0 ? void 0 : _a.access_token) !== null && _b !== void 0 ? _b : undefined,
                });
            });
        }
        catch (error) {
            if (isAuthError(error)) {
                return { data: null, error };
            }
            throw error;
        }
    }
    /**
     * Generates a new JWT.
     * @param refreshToken A valid refresh token that was returned on login.
     */
    async _refreshAccessToken(refreshToken) {
        const debugName = `#_refreshAccessToken(${refreshToken.substring(0, 5)}...)`;
        this._debug(debugName, 'begin');
        try {
            const startedAt = Date.now();
            // will attempt to refresh the token with exponential backoff
            return await retryable(async (attempt) => {
                if (attempt > 0) {
                    await sleep(200 * Math.pow(2, attempt - 1)); // 200, 400, 800, ...
                }
                this._debug(debugName, 'refreshing attempt', attempt);
                return await _request(this.fetch, 'POST', `${this.url}/token?grant_type=refresh_token`, {
                    body: { refresh_token: refreshToken },
                    headers: this.headers,
                    xform: _sessionResponse,
                });
            }, (attempt, error) => {
                const nextBackOffInterval = 200 * Math.pow(2, attempt);
                return (error &&
                    isAuthRetryableFetchError(error) &&
                    // retryable only if the request can be sent before the backoff overflows the tick duration
                    Date.now() + nextBackOffInterval - startedAt < AUTO_REFRESH_TICK_DURATION_MS);
            });
        }
        catch (error) {
            this._debug(debugName, 'error', error);
            if (isAuthError(error)) {
                return { data: { session: null, user: null }, error };
            }
            throw error;
        }
        finally {
            this._debug(debugName, 'end');
        }
    }
    _isValidSession(maybeSession) {
        const isValidSession = typeof maybeSession === 'object' &&
            maybeSession !== null &&
            'access_token' in maybeSession &&
            'refresh_token' in maybeSession &&
            'expires_at' in maybeSession;
        return isValidSession;
    }
    async _handleProviderSignIn(provider, options) {
        const url = await this._getUrlForProvider(`${this.url}/authorize`, provider, {
            redirectTo: options.redirectTo,
            scopes: options.scopes,
            queryParams: options.queryParams,
        });
        this._debug('#_handleProviderSignIn()', 'provider', provider, 'options', options, 'url', url);
        // try to open on the browser
        if (helpers_isBrowser() && !options.skipBrowserRedirect) {
            window.location.assign(url);
        }
        return { data: { provider, url }, error: null };
    }
    /**
     * Recovers the session from LocalStorage and refreshes the token
     * Note: this method is async to accommodate for AsyncStorage e.g. in React native.
     */
    async _recoverAndRefresh() {
        var _a, _b;
        const debugName = '#_recoverAndRefresh()';
        this._debug(debugName, 'begin');
        try {
            const currentSession = (await getItemAsync(this.storage, this.storageKey));
            if (currentSession && this.userStorage) {
                let maybeUser = (await getItemAsync(this.userStorage, this.storageKey + '-user'));
                if (!this.storage.isServer && Object.is(this.storage, this.userStorage) && !maybeUser) {
                    // storage and userStorage are the same storage medium, for example
                    // window.localStorage if userStorage does not have the user from
                    // storage stored, store it first thereby migrating the user object
                    // from storage -> userStorage
                    maybeUser = { user: currentSession.user };
                    await setItemAsync(this.userStorage, this.storageKey + '-user', maybeUser);
                }
                currentSession.user = (_a = maybeUser === null || maybeUser === void 0 ? void 0 : maybeUser.user) !== null && _a !== void 0 ? _a : userNotAvailableProxy();
            }
            else if (currentSession && !currentSession.user) {
                // user storage is not set, let's check if it was previously enabled so
                // we bring back the storage as it should be
                if (!currentSession.user) {
                    // test if userStorage was previously enabled and the storage medium was the same, to move the user back under the same key
                    const separateUser = (await getItemAsync(this.storage, this.storageKey + '-user'));
                    if (separateUser && (separateUser === null || separateUser === void 0 ? void 0 : separateUser.user)) {
                        currentSession.user = separateUser.user;
                        await removeItemAsync(this.storage, this.storageKey + '-user');
                        await setItemAsync(this.storage, this.storageKey, currentSession);
                    }
                    else {
                        currentSession.user = userNotAvailableProxy();
                    }
                }
            }
            this._debug(debugName, 'session from storage', currentSession);
            if (!this._isValidSession(currentSession)) {
                this._debug(debugName, 'session is not valid');
                if (currentSession !== null) {
                    await this._removeSession();
                }
                return;
            }
            const expiresWithMargin = ((_b = currentSession.expires_at) !== null && _b !== void 0 ? _b : Infinity) * 1000 - Date.now() < EXPIRY_MARGIN_MS;
            this._debug(debugName, `session has${expiresWithMargin ? '' : ' not'} expired with margin of ${EXPIRY_MARGIN_MS}s`);
            if (expiresWithMargin) {
                if (this.autoRefreshToken && currentSession.refresh_token) {
                    const { error } = await this._callRefreshToken(currentSession.refresh_token);
                    if (error) {
                        console.error(error);
                        if (!isAuthRetryableFetchError(error)) {
                            this._debug(debugName, 'refresh failed with a non-retryable error, removing the session', error);
                            await this._removeSession();
                        }
                    }
                }
            }
            else if (currentSession.user &&
                currentSession.user.__isUserNotAvailableProxy === true) {
                // If we have a proxy user, try to get the real user data
                try {
                    const { data, error: userError } = await this._getUser(currentSession.access_token);
                    if (!userError && (data === null || data === void 0 ? void 0 : data.user)) {
                        currentSession.user = data.user;
                        await this._saveSession(currentSession);
                        await this._notifyAllSubscribers('SIGNED_IN', currentSession);
                    }
                    else {
                        this._debug(debugName, 'could not get user data, skipping SIGNED_IN notification');
                    }
                }
                catch (getUserError) {
                    console.error('Error getting user data:', getUserError);
                    this._debug(debugName, 'error getting user data, skipping SIGNED_IN notification', getUserError);
                }
            }
            else {
                // no need to persist currentSession again, as we just loaded it from
                // local storage; persisting it again may overwrite a value saved by
                // another client with access to the same local storage
                await this._notifyAllSubscribers('SIGNED_IN', currentSession);
            }
        }
        catch (err) {
            this._debug(debugName, 'error', err);
            console.error(err);
            return;
        }
        finally {
            this._debug(debugName, 'end');
        }
    }
    async _callRefreshToken(refreshToken) {
        var _a, _b;
        if (!refreshToken) {
            throw new AuthSessionMissingError();
        }
        // refreshing is already in progress
        if (this.refreshingDeferred) {
            return this.refreshingDeferred.promise;
        }
        const debugName = `#_callRefreshToken(${refreshToken.substring(0, 5)}...)`;
        this._debug(debugName, 'begin');
        try {
            this.refreshingDeferred = new Deferred();
            const { data, error } = await this._refreshAccessToken(refreshToken);
            if (error)
                throw error;
            if (!data.session)
                throw new AuthSessionMissingError();
            await this._saveSession(data.session);
            await this._notifyAllSubscribers('TOKEN_REFRESHED', data.session);
            const result = { session: data.session, error: null };
            this.refreshingDeferred.resolve(result);
            return result;
        }
        catch (error) {
            this._debug(debugName, 'error', error);
            if (isAuthError(error)) {
                const result = { session: null, error };
                if (!isAuthRetryableFetchError(error)) {
                    await this._removeSession();
                }
                (_a = this.refreshingDeferred) === null || _a === void 0 ? void 0 : _a.resolve(result);
                return result;
            }
            (_b = this.refreshingDeferred) === null || _b === void 0 ? void 0 : _b.reject(error);
            throw error;
        }
        finally {
            this.refreshingDeferred = null;
            this._debug(debugName, 'end');
        }
    }
    async _notifyAllSubscribers(event, session, broadcast = true) {
        const debugName = `#_notifyAllSubscribers(${event})`;
        this._debug(debugName, 'begin', session, `broadcast = ${broadcast}`);
        try {
            if (this.broadcastChannel && broadcast) {
                this.broadcastChannel.postMessage({ event, session });
            }
            const errors = [];
            const promises = Array.from(this.stateChangeEmitters.values()).map(async (x) => {
                try {
                    await x.callback(event, session);
                }
                catch (e) {
                    errors.push(e);
                }
            });
            await Promise.all(promises);
            if (errors.length > 0) {
                for (let i = 0; i < errors.length; i += 1) {
                    console.error(errors[i]);
                }
                throw errors[0];
            }
        }
        finally {
            this._debug(debugName, 'end');
        }
    }
    /**
     * set currentSession and currentUser
     * process to _startAutoRefreshToken if possible
     */
    async _saveSession(session) {
        this._debug('#_saveSession()', session);
        // _saveSession is always called whenever a new session has been acquired
        // so we can safely suppress the warning returned by future getSession calls
        this.suppressGetSessionWarning = true;
        // Create a shallow copy to work with, to avoid mutating the original session object if it's used elsewhere
        const sessionToProcess = Object.assign({}, session);
        const userIsProxy = sessionToProcess.user && sessionToProcess.user.__isUserNotAvailableProxy === true;
        if (this.userStorage) {
            if (!userIsProxy && sessionToProcess.user) {
                // If it's a real user object, save it to userStorage.
                await setItemAsync(this.userStorage, this.storageKey + '-user', {
                    user: sessionToProcess.user,
                });
            }
            else if (userIsProxy) {
                // If it's the proxy, it means user was not found in userStorage.
                // We should ensure no stale user data for this key exists in userStorage if we were to save null,
                // or simply not save the proxy. For now, we don't save the proxy here.
                // If there's a need to clear userStorage if user becomes proxy, that logic would go here.
            }
            // Prepare the main session data for primary storage: remove the user property before cloning
            // This is important because the original session.user might be the proxy
            const mainSessionData = Object.assign({}, sessionToProcess);
            delete mainSessionData.user; // Remove user (real or proxy) before cloning for main storage
            const clonedMainSessionData = deepClone(mainSessionData);
            await setItemAsync(this.storage, this.storageKey, clonedMainSessionData);
        }
        else {
            // No userStorage is configured.
            // In this case, session.user should ideally not be a proxy.
            // If it were, structuredClone would fail. This implies an issue elsewhere if user is a proxy here
            const clonedSession = deepClone(sessionToProcess); // sessionToProcess still has its original user property
            await setItemAsync(this.storage, this.storageKey, clonedSession);
        }
    }
    async _removeSession() {
        this._debug('#_removeSession()');
        await removeItemAsync(this.storage, this.storageKey);
        await removeItemAsync(this.storage, this.storageKey + '-code-verifier');
        await removeItemAsync(this.storage, this.storageKey + '-user');
        if (this.userStorage) {
            await removeItemAsync(this.userStorage, this.storageKey + '-user');
        }
        await this._notifyAllSubscribers('SIGNED_OUT', null);
    }
    /**
     * Removes any registered visibilitychange callback.
     *
     * {@see #startAutoRefresh}
     * {@see #stopAutoRefresh}
     */
    _removeVisibilityChangedCallback() {
        this._debug('#_removeVisibilityChangedCallback()');
        const callback = this.visibilityChangedCallback;
        this.visibilityChangedCallback = null;
        try {
            if (callback && helpers_isBrowser() && (window === null || window === void 0 ? void 0 : window.removeEventListener)) {
                window.removeEventListener('visibilitychange', callback);
            }
        }
        catch (e) {
            console.error('removing visibilitychange callback failed', e);
        }
    }
    /**
     * This is the private implementation of {@link #startAutoRefresh}. Use this
     * within the library.
     */
    async _startAutoRefresh() {
        await this._stopAutoRefresh();
        this._debug('#_startAutoRefresh()');
        const ticker = setInterval(() => this._autoRefreshTokenTick(), AUTO_REFRESH_TICK_DURATION_MS);
        this.autoRefreshTicker = ticker;
        if (ticker && typeof ticker === 'object' && typeof ticker.unref === 'function') {
            // ticker is a NodeJS Timeout object that has an `unref` method
            // https://nodejs.org/api/timers.html#timeoutunref
            // When auto refresh is used in NodeJS (like for testing) the
            // `setInterval` is preventing the process from being marked as
            // finished and tests run endlessly. This can be prevented by calling
            // `unref()` on the returned object.
            ticker.unref();
            // @ts-expect-error TS has no context of Deno
        }
        else if (typeof Deno !== 'undefined' && typeof Deno.unrefTimer === 'function') {
            // similar like for NodeJS, but with the Deno API
            // https://deno.land/api@latest?unstable&s=Deno.unrefTimer
            // @ts-expect-error TS has no context of Deno
            Deno.unrefTimer(ticker);
        }
        // run the tick immediately, but in the next pass of the event loop so that
        // #_initialize can be allowed to complete without recursively waiting on
        // itself
        setTimeout(async () => {
            await this.initializePromise;
            await this._autoRefreshTokenTick();
        }, 0);
    }
    /**
     * This is the private implementation of {@link #stopAutoRefresh}. Use this
     * within the library.
     */
    async _stopAutoRefresh() {
        this._debug('#_stopAutoRefresh()');
        const ticker = this.autoRefreshTicker;
        this.autoRefreshTicker = null;
        if (ticker) {
            clearInterval(ticker);
        }
    }
    /**
     * Starts an auto-refresh process in the background. The session is checked
     * every few seconds. Close to the time of expiration a process is started to
     * refresh the session. If refreshing fails it will be retried for as long as
     * necessary.
     *
     * If you set the {@link GoTrueClientOptions#autoRefreshToken} you don't need
     * to call this function, it will be called for you.
     *
     * On browsers the refresh process works only when the tab/window is in the
     * foreground to conserve resources as well as prevent race conditions and
     * flooding auth with requests. If you call this method any managed
     * visibility change callback will be removed and you must manage visibility
     * changes on your own.
     *
     * On non-browser platforms the refresh process works *continuously* in the
     * background, which may not be desirable. You should hook into your
     * platform's foreground indication mechanism and call these methods
     * appropriately to conserve resources.
     *
     * {@see #stopAutoRefresh}
     */
    async startAutoRefresh() {
        this._removeVisibilityChangedCallback();
        await this._startAutoRefresh();
    }
    /**
     * Stops an active auto refresh process running in the background (if any).
     *
     * If you call this method any managed visibility change callback will be
     * removed and you must manage visibility changes on your own.
     *
     * See {@link #startAutoRefresh} for more details.
     */
    async stopAutoRefresh() {
        this._removeVisibilityChangedCallback();
        await this._stopAutoRefresh();
    }
    /**
     * Runs the auto refresh token tick.
     */
    async _autoRefreshTokenTick() {
        this._debug('#_autoRefreshTokenTick()', 'begin');
        try {
            await this._acquireLock(0, async () => {
                try {
                    const now = Date.now();
                    try {
                        return await this._useSession(async (result) => {
                            const { data: { session }, } = result;
                            if (!session || !session.refresh_token || !session.expires_at) {
                                this._debug('#_autoRefreshTokenTick()', 'no session');
                                return;
                            }
                            // session will expire in this many ticks (or has already expired if <= 0)
                            const expiresInTicks = Math.floor((session.expires_at * 1000 - now) / AUTO_REFRESH_TICK_DURATION_MS);
                            this._debug('#_autoRefreshTokenTick()', `access token expires in ${expiresInTicks} ticks, a tick lasts ${AUTO_REFRESH_TICK_DURATION_MS}ms, refresh threshold is ${AUTO_REFRESH_TICK_THRESHOLD} ticks`);
                            if (expiresInTicks <= AUTO_REFRESH_TICK_THRESHOLD) {
                                await this._callRefreshToken(session.refresh_token);
                            }
                        });
                    }
                    catch (e) {
                        console.error('Auto refresh tick failed with error. This is likely a transient error.', e);
                    }
                }
                finally {
                    this._debug('#_autoRefreshTokenTick()', 'end');
                }
            });
        }
        catch (e) {
            if (e.isAcquireTimeout || e instanceof LockAcquireTimeoutError) {
                this._debug('auto refresh token tick lock not available');
            }
            else {
                throw e;
            }
        }
    }
    /**
     * Registers callbacks on the browser / platform, which in-turn run
     * algorithms when the browser window/tab are in foreground. On non-browser
     * platforms it assumes always foreground.
     */
    async _handleVisibilityChange() {
        this._debug('#_handleVisibilityChange()');
        if (!helpers_isBrowser() || !(window === null || window === void 0 ? void 0 : window.addEventListener)) {
            if (this.autoRefreshToken) {
                // in non-browser environments the refresh token ticker runs always
                this.startAutoRefresh();
            }
            return false;
        }
        try {
            this.visibilityChangedCallback = async () => await this._onVisibilityChanged(false);
            window === null || window === void 0 ? void 0 : window.addEventListener('visibilitychange', this.visibilityChangedCallback);
            // now immediately call the visbility changed callback to setup with the
            // current visbility state
            await this._onVisibilityChanged(true); // initial call
        }
        catch (error) {
            console.error('_handleVisibilityChange', error);
        }
    }
    /**
     * Callback registered with `window.addEventListener('visibilitychange')`.
     */
    async _onVisibilityChanged(calledFromInitialize) {
        const methodName = `#_onVisibilityChanged(${calledFromInitialize})`;
        this._debug(methodName, 'visibilityState', document.visibilityState);
        if (document.visibilityState === 'visible') {
            if (this.autoRefreshToken) {
                // in browser environments the refresh token ticker runs only on focused tabs
                // which prevents race conditions
                this._startAutoRefresh();
            }
            if (!calledFromInitialize) {
                // called when the visibility has changed, i.e. the browser
                // transitioned from hidden -> visible so we need to see if the session
                // should be recovered immediately... but to do that we need to acquire
                // the lock first asynchronously
                await this.initializePromise;
                await this._acquireLock(-1, async () => {
                    if (document.visibilityState !== 'visible') {
                        this._debug(methodName, 'acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting');
                        // visibility has changed while waiting for the lock, abort
                        return;
                    }
                    // recover the session
                    await this._recoverAndRefresh();
                });
            }
        }
        else if (document.visibilityState === 'hidden') {
            if (this.autoRefreshToken) {
                this._stopAutoRefresh();
            }
        }
    }
    /**
     * Generates the relevant login URL for a third-party provider.
     * @param options.redirectTo A URL or mobile address to send the user to after they are confirmed.
     * @param options.scopes A space-separated list of scopes granted to the OAuth application.
     * @param options.queryParams An object of key-value pairs containing query parameters granted to the OAuth application.
     */
    async _getUrlForProvider(url, provider, options) {
        const urlParams = [`provider=${encodeURIComponent(provider)}`];
        if (options === null || options === void 0 ? void 0 : options.redirectTo) {
            urlParams.push(`redirect_to=${encodeURIComponent(options.redirectTo)}`);
        }
        if (options === null || options === void 0 ? void 0 : options.scopes) {
            urlParams.push(`scopes=${encodeURIComponent(options.scopes)}`);
        }
        if (this.flowType === 'pkce') {
            const [codeChallenge, codeChallengeMethod] = await getCodeChallengeAndMethod(this.storage, this.storageKey);
            const flowParams = new URLSearchParams({
                code_challenge: `${encodeURIComponent(codeChallenge)}`,
                code_challenge_method: `${encodeURIComponent(codeChallengeMethod)}`,
            });
            urlParams.push(flowParams.toString());
        }
        if (options === null || options === void 0 ? void 0 : options.queryParams) {
            const query = new URLSearchParams(options.queryParams);
            urlParams.push(query.toString());
        }
        if (options === null || options === void 0 ? void 0 : options.skipBrowserRedirect) {
            urlParams.push(`skip_http_redirect=${options.skipBrowserRedirect}`);
        }
        return `${url}?${urlParams.join('&')}`;
    }
    async _unenroll(params) {
        try {
            return await this._useSession(async (result) => {
                var _a;
                const { data: sessionData, error: sessionError } = result;
                if (sessionError) {
                    return { data: null, error: sessionError };
                }
                return await _request(this.fetch, 'DELETE', `${this.url}/factors/${params.factorId}`, {
                    headers: this.headers,
                    jwt: (_a = sessionData === null || sessionData === void 0 ? void 0 : sessionData.session) === null || _a === void 0 ? void 0 : _a.access_token,
                });
            });
        }
        catch (error) {
            if (isAuthError(error)) {
                return { data: null, error };
            }
            throw error;
        }
    }
    async _enroll(params) {
        try {
            return await this._useSession(async (result) => {
                var _a, _b;
                const { data: sessionData, error: sessionError } = result;
                if (sessionError) {
                    return { data: null, error: sessionError };
                }
                const body = Object.assign({ friendly_name: params.friendlyName, factor_type: params.factorType }, (params.factorType === 'phone' ? { phone: params.phone } : { issuer: params.issuer }));
                const { data, error } = await _request(this.fetch, 'POST', `${this.url}/factors`, {
                    body,
                    headers: this.headers,
                    jwt: (_a = sessionData === null || sessionData === void 0 ? void 0 : sessionData.session) === null || _a === void 0 ? void 0 : _a.access_token,
                });
                if (error) {
                    return { data: null, error };
                }
                if (params.factorType === 'totp' && ((_b = data === null || data === void 0 ? void 0 : data.totp) === null || _b === void 0 ? void 0 : _b.qr_code)) {
                    data.totp.qr_code = `data:image/svg+xml;utf-8,${data.totp.qr_code}`;
                }
                return { data, error: null };
            });
        }
        catch (error) {
            if (isAuthError(error)) {
                return { data: null, error };
            }
            throw error;
        }
    }
    /**
     * {@see GoTrueMFAApi#verify}
     */
    async _verify(params) {
        return this._acquireLock(-1, async () => {
            try {
                return await this._useSession(async (result) => {
                    var _a;
                    const { data: sessionData, error: sessionError } = result;
                    if (sessionError) {
                        return { data: null, error: sessionError };
                    }
                    const { data, error } = await _request(this.fetch, 'POST', `${this.url}/factors/${params.factorId}/verify`, {
                        body: { code: params.code, challenge_id: params.challengeId },
                        headers: this.headers,
                        jwt: (_a = sessionData === null || sessionData === void 0 ? void 0 : sessionData.session) === null || _a === void 0 ? void 0 : _a.access_token,
                    });
                    if (error) {
                        return { data: null, error };
                    }
                    await this._saveSession(Object.assign({ expires_at: Math.round(Date.now() / 1000) + data.expires_in }, data));
                    await this._notifyAllSubscribers('MFA_CHALLENGE_VERIFIED', data);
                    return { data, error };
                });
            }
            catch (error) {
                if (isAuthError(error)) {
                    return { data: null, error };
                }
                throw error;
            }
        });
    }
    /**
     * {@see GoTrueMFAApi#challenge}
     */
    async _challenge(params) {
        return this._acquireLock(-1, async () => {
            try {
                return await this._useSession(async (result) => {
                    var _a;
                    const { data: sessionData, error: sessionError } = result;
                    if (sessionError) {
                        return { data: null, error: sessionError };
                    }
                    return await _request(this.fetch, 'POST', `${this.url}/factors/${params.factorId}/challenge`, {
                        body: { channel: params.channel },
                        headers: this.headers,
                        jwt: (_a = sessionData === null || sessionData === void 0 ? void 0 : sessionData.session) === null || _a === void 0 ? void 0 : _a.access_token,
                    });
                });
            }
            catch (error) {
                if (isAuthError(error)) {
                    return { data: null, error };
                }
                throw error;
            }
        });
    }
    /**
     * {@see GoTrueMFAApi#challengeAndVerify}
     */
    async _challengeAndVerify(params) {
        // both _challenge and _verify independently acquire the lock, so no need
        // to acquire it here
        const { data: challengeData, error: challengeError } = await this._challenge({
            factorId: params.factorId,
        });
        if (challengeError) {
            return { data: null, error: challengeError };
        }
        return await this._verify({
            factorId: params.factorId,
            challengeId: challengeData.id,
            code: params.code,
        });
    }
    /**
     * {@see GoTrueMFAApi#listFactors}
     */
    async _listFactors() {
        // use #getUser instead of #_getUser as the former acquires a lock
        const { data: { user }, error: userError, } = await this.getUser();
        if (userError) {
            return { data: null, error: userError };
        }
        const factors = (user === null || user === void 0 ? void 0 : user.factors) || [];
        const totp = factors.filter((factor) => factor.factor_type === 'totp' && factor.status === 'verified');
        const phone = factors.filter((factor) => factor.factor_type === 'phone' && factor.status === 'verified');
        return {
            data: {
                all: factors,
                totp,
                phone,
            },
            error: null,
        };
    }
    /**
     * {@see GoTrueMFAApi#getAuthenticatorAssuranceLevel}
     */
    async _getAuthenticatorAssuranceLevel() {
        return this._acquireLock(-1, async () => {
            return await this._useSession(async (result) => {
                var _a, _b;
                const { data: { session }, error: sessionError, } = result;
                if (sessionError) {
                    return { data: null, error: sessionError };
                }
                if (!session) {
                    return {
                        data: { currentLevel: null, nextLevel: null, currentAuthenticationMethods: [] },
                        error: null,
                    };
                }
                const { payload } = decodeJWT(session.access_token);
                let currentLevel = null;
                if (payload.aal) {
                    currentLevel = payload.aal;
                }
                let nextLevel = currentLevel;
                const verifiedFactors = (_b = (_a = session.user.factors) === null || _a === void 0 ? void 0 : _a.filter((factor) => factor.status === 'verified')) !== null && _b !== void 0 ? _b : [];
                if (verifiedFactors.length > 0) {
                    nextLevel = 'aal2';
                }
                const currentAuthenticationMethods = payload.amr || [];
                return { data: { currentLevel, nextLevel, currentAuthenticationMethods }, error: null };
            });
        });
    }
    async fetchJwk(kid, jwks = { keys: [] }) {
        // try fetching from the supplied jwks
        let jwk = jwks.keys.find((key) => key.kid === kid);
        if (jwk) {
            return jwk;
        }
        const now = Date.now();
        // try fetching from cache
        jwk = this.jwks.keys.find((key) => key.kid === kid);
        // jwk exists and jwks isn't stale
        if (jwk && this.jwks_cached_at + JWKS_TTL > now) {
            return jwk;
        }
        // jwk isn't cached in memory so we need to fetch it from the well-known endpoint
        const { data, error } = await _request(this.fetch, 'GET', `${this.url}/.well-known/jwks.json`, {
            headers: this.headers,
        });
        if (error) {
            throw error;
        }
        if (!data.keys || data.keys.length === 0) {
            return null;
        }
        this.jwks = data;
        this.jwks_cached_at = now;
        // Find the signing key
        jwk = data.keys.find((key) => key.kid === kid);
        if (!jwk) {
            return null;
        }
        return jwk;
    }
    /**
     * Extracts the JWT claims present in the access token by first verifying the
     * JWT against the server's JSON Web Key Set endpoint
     * `/.well-known/jwks.json` which is often cached, resulting in significantly
     * faster responses. Prefer this method over {@link #getUser} which always
     * sends a request to the Auth server for each JWT.
     *
     * If the project is not using an asymmetric JWT signing key (like ECC or
     * RSA) it always sends a request to the Auth server (similar to {@link
     * #getUser}) to verify the JWT.
     *
     * @param jwt An optional specific JWT you wish to verify, not the one you
     *            can obtain from {@link #getSession}.
     * @param options Various additional options that allow you to customize the
     *                behavior of this method.
     */
    async getClaims(jwt, options = {}) {
        try {
            let token = jwt;
            if (!token) {
                const { data, error } = await this.getSession();
                if (error || !data.session) {
                    return { data: null, error };
                }
                token = data.session.access_token;
            }
            const { header, payload, signature, raw: { header: rawHeader, payload: rawPayload }, } = decodeJWT(token);
            if (!(options === null || options === void 0 ? void 0 : options.allowExpired)) {
                // Reject expired JWTs should only happen if jwt argument was passed
                validateExp(payload.exp);
            }
            const signingKey = !header.alg ||
                header.alg.startsWith('HS') ||
                !header.kid ||
                !('crypto' in globalThis && 'subtle' in globalThis.crypto)
                ? null
                : await this.fetchJwk(header.kid, (options === null || options === void 0 ? void 0 : options.keys) ? { keys: options.keys } : options === null || options === void 0 ? void 0 : options.jwks);
            // If symmetric algorithm or WebCrypto API is unavailable, fallback to getUser()
            if (!signingKey) {
                const { error } = await this.getUser(token);
                if (error) {
                    throw error;
                }
                // getUser succeeds so the claims in the JWT can be trusted
                return {
                    data: {
                        claims: payload,
                        header,
                        signature,
                    },
                    error: null,
                };
            }
            const algorithm = getAlgorithm(header.alg);
            // Convert JWK to CryptoKey
            const publicKey = await crypto.subtle.importKey('jwk', signingKey, algorithm, true, [
                'verify',
            ]);
            // Verify the signature
            const isValid = await crypto.subtle.verify(algorithm, publicKey, signature, stringToUint8Array(`${rawHeader}.${rawPayload}`));
            if (!isValid) {
                throw new AuthInvalidJwtError('Invalid JWT signature');
            }
            // If verification succeeds, decode and return claims
            return {
                data: {
                    claims: payload,
                    header,
                    signature,
                },
                error: null,
            };
        }
        catch (error) {
            if (isAuthError(error)) {
                return { data: null, error };
            }
            throw error;
        }
    }
}
GoTrueClient.nextInstanceID = 0;
//# sourceMappingURL=GoTrueClient.js.map
;// ./node_modules/@supabase/auth-js/dist/module/AuthAdminApi.js

const AuthAdminApi = GoTrueAdminApi;
/* harmony default export */ const module_AuthAdminApi = (AuthAdminApi);
//# sourceMappingURL=AuthAdminApi.js.map
;// ./node_modules/@supabase/auth-js/dist/module/AuthClient.js

const AuthClient = GoTrueClient;
/* harmony default export */ const module_AuthClient = (AuthClient);
//# sourceMappingURL=AuthClient.js.map
;// ./node_modules/@supabase/auth-js/dist/module/index.js








//# sourceMappingURL=index.js.map
;// ./node_modules/@supabase/supabase-js/dist/module/lib/SupabaseAuthClient.js

class SupabaseAuthClient extends module_AuthClient {
    constructor(options) {
        super(options);
    }
}
//# sourceMappingURL=SupabaseAuthClient.js.map
;// ./node_modules/@supabase/supabase-js/dist/module/SupabaseClient.js
var SupabaseClient_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};








/**
 * Supabase Client.
 *
 * An isomorphic Javascript client for interacting with Postgres.
 */
class SupabaseClient {
    /**
     * Create a new client for use in the browser.
     * @param supabaseUrl The unique Supabase URL which is supplied when you create a new project in your project dashboard.
     * @param supabaseKey The unique Supabase Key which is supplied when you create a new project in your project dashboard.
     * @param options.db.schema You can switch in between schemas. The schema needs to be on the list of exposed schemas inside Supabase.
     * @param options.auth.autoRefreshToken Set to "true" if you want to automatically refresh the token before expiring.
     * @param options.auth.persistSession Set to "true" if you want to automatically save the user session into local storage.
     * @param options.auth.detectSessionInUrl Set to "true" if you want to automatically detects OAuth grants in the URL and signs in the user.
     * @param options.realtime Options passed along to realtime-js constructor.
     * @param options.storage Options passed along to the storage-js constructor.
     * @param options.global.fetch A custom fetch implementation.
     * @param options.global.headers Any additional headers to send with each network request.
     */
    constructor(supabaseUrl, supabaseKey, options) {
        var _a, _b, _c;
        this.supabaseUrl = supabaseUrl;
        this.supabaseKey = supabaseKey;
        const baseUrl = validateSupabaseUrl(supabaseUrl);
        if (!supabaseKey)
            throw new Error('supabaseKey is required.');
        this.realtimeUrl = new URL('realtime/v1', baseUrl);
        this.realtimeUrl.protocol = this.realtimeUrl.protocol.replace('http', 'ws');
        this.authUrl = new URL('auth/v1', baseUrl);
        this.storageUrl = new URL('storage/v1', baseUrl);
        this.functionsUrl = new URL('functions/v1', baseUrl);
        // default storage key uses the supabase project ref as a namespace
        const defaultStorageKey = `sb-${baseUrl.hostname.split('.')[0]}-auth-token`;
        const DEFAULTS = {
            db: DEFAULT_DB_OPTIONS,
            realtime: DEFAULT_REALTIME_OPTIONS,
            auth: Object.assign(Object.assign({}, DEFAULT_AUTH_OPTIONS), { storageKey: defaultStorageKey }),
            global: DEFAULT_GLOBAL_OPTIONS,
        };
        const settings = applySettingDefaults(options !== null && options !== void 0 ? options : {}, DEFAULTS);
        this.storageKey = (_a = settings.auth.storageKey) !== null && _a !== void 0 ? _a : '';
        this.headers = (_b = settings.global.headers) !== null && _b !== void 0 ? _b : {};
        if (!settings.accessToken) {
            this.auth = this._initSupabaseAuthClient((_c = settings.auth) !== null && _c !== void 0 ? _c : {}, this.headers, settings.global.fetch);
        }
        else {
            this.accessToken = settings.accessToken;
            this.auth = new Proxy({}, {
                get: (_, prop) => {
                    throw new Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(prop)} is not possible`);
                },
            });
        }
        this.fetch = fetchWithAuth(supabaseKey, this._getAccessToken.bind(this), settings.global.fetch);
        this.realtime = this._initRealtimeClient(Object.assign({ headers: this.headers, accessToken: this._getAccessToken.bind(this) }, settings.realtime));
        this.rest = new PostgrestClient(new URL('rest/v1', baseUrl).href, {
            headers: this.headers,
            schema: settings.db.schema,
            fetch: this.fetch,
        });
        this.storage = new StorageClient(this.storageUrl.href, this.headers, this.fetch, options === null || options === void 0 ? void 0 : options.storage);
        if (!settings.accessToken) {
            this._listenForAuthEvents();
        }
    }
    /**
     * Supabase Functions allows you to deploy and invoke edge functions.
     */
    get functions() {
        return new FunctionsClient(this.functionsUrl.href, {
            headers: this.headers,
            customFetch: this.fetch,
        });
    }
    /**
     * Perform a query on a table or a view.
     *
     * @param relation - The table or view name to query
     */
    from(relation) {
        return this.rest.from(relation);
    }
    // NOTE: signatures must be kept in sync with PostgrestClient.schema
    /**
     * Select a schema to query or perform an function (rpc) call.
     *
     * The schema needs to be on the list of exposed schemas inside Supabase.
     *
     * @param schema - The schema to query
     */
    schema(schema) {
        return this.rest.schema(schema);
    }
    // NOTE: signatures must be kept in sync with PostgrestClient.rpc
    /**
     * Perform a function call.
     *
     * @param fn - The function name to call
     * @param args - The arguments to pass to the function call
     * @param options - Named parameters
     * @param options.head - When set to `true`, `data` will not be returned.
     * Useful if you only need the count.
     * @param options.get - When set to `true`, the function will be called with
     * read-only access mode.
     * @param options.count - Count algorithm to use to count rows returned by the
     * function. Only applicable for [set-returning
     * functions](https://www.postgresql.org/docs/current/functions-srf.html).
     *
     * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
     * hood.
     *
     * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
     * statistics under the hood.
     *
     * `"estimated"`: Uses exact count for low numbers and planned count for high
     * numbers.
     */
    rpc(fn, args = {}, options = {}) {
        return this.rest.rpc(fn, args, options);
    }
    /**
     * Creates a Realtime channel with Broadcast, Presence, and Postgres Changes.
     *
     * @param {string} name - The name of the Realtime channel.
     * @param {Object} opts - The options to pass to the Realtime channel.
     *
     */
    channel(name, opts = { config: {} }) {
        return this.realtime.channel(name, opts);
    }
    /**
     * Returns all Realtime channels.
     */
    getChannels() {
        return this.realtime.getChannels();
    }
    /**
     * Unsubscribes and removes Realtime channel from Realtime client.
     *
     * @param {RealtimeChannel} channel - The name of the Realtime channel.
     *
     */
    removeChannel(channel) {
        return this.realtime.removeChannel(channel);
    }
    /**
     * Unsubscribes and removes all Realtime channels from Realtime client.
     */
    removeAllChannels() {
        return this.realtime.removeAllChannels();
    }
    _getAccessToken() {
        var _a, _b;
        return SupabaseClient_awaiter(this, void 0, void 0, function* () {
            if (this.accessToken) {
                return yield this.accessToken();
            }
            const { data } = yield this.auth.getSession();
            return (_b = (_a = data.session) === null || _a === void 0 ? void 0 : _a.access_token) !== null && _b !== void 0 ? _b : this.supabaseKey;
        });
    }
    _initSupabaseAuthClient({ autoRefreshToken, persistSession, detectSessionInUrl, storage, userStorage, storageKey, flowType, lock, debug, }, headers, fetch) {
        const authHeaders = {
            Authorization: `Bearer ${this.supabaseKey}`,
            apikey: `${this.supabaseKey}`,
        };
        return new SupabaseAuthClient({
            url: this.authUrl.href,
            headers: Object.assign(Object.assign({}, authHeaders), headers),
            storageKey: storageKey,
            autoRefreshToken,
            persistSession,
            detectSessionInUrl,
            storage,
            userStorage,
            flowType,
            lock,
            debug,
            fetch,
            // auth checks if there is a custom authorizaiton header using this flag
            // so it knows whether to return an error when getUser is called with no session
            hasCustomAuthorizationHeader: Object.keys(this.headers).some((key) => key.toLowerCase() === 'authorization'),
        });
    }
    _initRealtimeClient(options) {
        return new RealtimeClient(this.realtimeUrl.href, Object.assign(Object.assign({}, options), { params: Object.assign({ apikey: this.supabaseKey }, options === null || options === void 0 ? void 0 : options.params) }));
    }
    _listenForAuthEvents() {
        let data = this.auth.onAuthStateChange((event, session) => {
            this._handleTokenChanged(event, 'CLIENT', session === null || session === void 0 ? void 0 : session.access_token);
        });
        return data;
    }
    _handleTokenChanged(event, source, token) {
        if ((event === 'TOKEN_REFRESHED' || event === 'SIGNED_IN') &&
            this.changedAccessToken !== token) {
            this.changedAccessToken = token;
            this.realtime.setAuth(token);
        }
        else if (event === 'SIGNED_OUT') {
            this.realtime.setAuth();
            if (source == 'STORAGE')
                this.auth.signOut();
            this.changedAccessToken = undefined;
        }
    }
}
//# sourceMappingURL=SupabaseClient.js.map
;// ./node_modules/@supabase/supabase-js/dist/module/index.js






/**
 * Creates a new Supabase Client.
 */
const createClient = (supabaseUrl, supabaseKey, options) => {
    return new SupabaseClient(supabaseUrl, supabaseKey, options);
};
// Check for Node.js <= 18 deprecation
function shouldShowDeprecationWarning() {
    // Skip in browser environments
    if (typeof window !== 'undefined') {
        return false;
    }
    // Skip if process is not available (e.g., Edge Runtime)
    if (typeof process === 'undefined') {
        return false;
    }
    // Use dynamic property access to avoid Next.js Edge Runtime static analysis warnings
    const processVersion = process['version'];
    if (processVersion === undefined || processVersion === null) {
        return false;
    }
    const versionMatch = processVersion.match(/^v(\d+)\./);
    if (!versionMatch) {
        return false;
    }
    const majorVersion = parseInt(versionMatch[1], 10);
    return majorVersion <= 18;
}
if (shouldShowDeprecationWarning()) {
    console.warn(`⚠️  Node.js 18 and below are deprecated and will no longer be supported in future versions of @supabase/supabase-js. ` +
        `Please upgrade to Node.js 20 or later. ` +
        `For more information, visit: https://github.com/orgs/supabase/discussions/37217`);
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 892:
/***/ ((module, exports) => {

"use strict";


// Returns "Type(value) is Object" in ES terminology.
function isObject(value) {
  return (typeof value === "object" && value !== null) || typeof value === "function";
}

const hasOwn = Function.prototype.call.bind(Object.prototype.hasOwnProperty);

// Like `Object.assign`, but using `[[GetOwnProperty]]` and `[[DefineOwnProperty]]`
// instead of `[[Get]]` and `[[Set]]` and only allowing objects
function define(target, source) {
  for (const key of Reflect.ownKeys(source)) {
    const descriptor = Reflect.getOwnPropertyDescriptor(source, key);
    if (descriptor && !Reflect.defineProperty(target, key, descriptor)) {
      throw new TypeError(`Cannot redefine property: ${String(key)}`);
    }
  }
}

function newObjectInRealm(globalObject, object) {
  const ctorRegistry = initCtorRegistry(globalObject);
  return Object.defineProperties(
    Object.create(ctorRegistry["%Object.prototype%"]),
    Object.getOwnPropertyDescriptors(object)
  );
}

const wrapperSymbol = Symbol("wrapper");
const implSymbol = Symbol("impl");
const sameObjectCaches = Symbol("SameObject caches");
const ctorRegistrySymbol = Symbol.for("[webidl2js] constructor registry");

const AsyncIteratorPrototype = Object.getPrototypeOf(Object.getPrototypeOf(async function* () {}).prototype);

function initCtorRegistry(globalObject) {
  if (hasOwn(globalObject, ctorRegistrySymbol)) {
    return globalObject[ctorRegistrySymbol];
  }

  const ctorRegistry = Object.create(null);

  // In addition to registering all the WebIDL2JS-generated types in the constructor registry,
  // we also register a few intrinsics that we make use of in generated code, since they are not
  // easy to grab from the globalObject variable.
  ctorRegistry["%Object.prototype%"] = globalObject.Object.prototype;
  ctorRegistry["%IteratorPrototype%"] = Object.getPrototypeOf(
    Object.getPrototypeOf(new globalObject.Array()[Symbol.iterator]())
  );

  try {
    ctorRegistry["%AsyncIteratorPrototype%"] = Object.getPrototypeOf(
      Object.getPrototypeOf(
        globalObject.eval("(async function* () {})").prototype
      )
    );
  } catch {
    ctorRegistry["%AsyncIteratorPrototype%"] = AsyncIteratorPrototype;
  }

  globalObject[ctorRegistrySymbol] = ctorRegistry;
  return ctorRegistry;
}

function getSameObject(wrapper, prop, creator) {
  if (!wrapper[sameObjectCaches]) {
    wrapper[sameObjectCaches] = Object.create(null);
  }

  if (prop in wrapper[sameObjectCaches]) {
    return wrapper[sameObjectCaches][prop];
  }

  wrapper[sameObjectCaches][prop] = creator();
  return wrapper[sameObjectCaches][prop];
}

function wrapperForImpl(impl) {
  return impl ? impl[wrapperSymbol] : null;
}

function implForWrapper(wrapper) {
  return wrapper ? wrapper[implSymbol] : null;
}

function tryWrapperForImpl(impl) {
  const wrapper = wrapperForImpl(impl);
  return wrapper ? wrapper : impl;
}

function tryImplForWrapper(wrapper) {
  const impl = implForWrapper(wrapper);
  return impl ? impl : wrapper;
}

const iterInternalSymbol = Symbol("internal");

function isArrayIndexPropName(P) {
  if (typeof P !== "string") {
    return false;
  }
  const i = P >>> 0;
  if (i === 2 ** 32 - 1) {
    return false;
  }
  const s = `${i}`;
  if (P !== s) {
    return false;
  }
  return true;
}

const byteLengthGetter =
    Object.getOwnPropertyDescriptor(ArrayBuffer.prototype, "byteLength").get;
function isArrayBuffer(value) {
  try {
    byteLengthGetter.call(value);
    return true;
  } catch (e) {
    return false;
  }
}

function iteratorResult([key, value], kind) {
  let result;
  switch (kind) {
    case "key":
      result = key;
      break;
    case "value":
      result = value;
      break;
    case "key+value":
      result = [key, value];
      break;
  }
  return { value: result, done: false };
}

const supportsPropertyIndex = Symbol("supports property index");
const supportedPropertyIndices = Symbol("supported property indices");
const supportsPropertyName = Symbol("supports property name");
const supportedPropertyNames = Symbol("supported property names");
const indexedGet = Symbol("indexed property get");
const indexedSetNew = Symbol("indexed property set new");
const indexedSetExisting = Symbol("indexed property set existing");
const namedGet = Symbol("named property get");
const namedSetNew = Symbol("named property set new");
const namedSetExisting = Symbol("named property set existing");
const namedDelete = Symbol("named property delete");

const asyncIteratorNext = Symbol("async iterator get the next iteration result");
const asyncIteratorReturn = Symbol("async iterator return steps");
const asyncIteratorInit = Symbol("async iterator initialization steps");
const asyncIteratorEOI = Symbol("async iterator end of iteration");

module.exports = exports = {
  isObject,
  hasOwn,
  define,
  newObjectInRealm,
  wrapperSymbol,
  implSymbol,
  getSameObject,
  ctorRegistrySymbol,
  initCtorRegistry,
  wrapperForImpl,
  implForWrapper,
  tryWrapperForImpl,
  tryImplForWrapper,
  iterInternalSymbol,
  isArrayBuffer,
  isArrayIndexPropName,
  supportsPropertyIndex,
  supportedPropertyIndices,
  supportsPropertyName,
  supportedPropertyNames,
  indexedGet,
  indexedSetNew,
  indexedSetExisting,
  namedGet,
  namedSetNew,
  namedSetExisting,
  namedDelete,
  asyncIteratorNext,
  asyncIteratorReturn,
  asyncIteratorInit,
  asyncIteratorEOI,
  iteratorResult
};


/***/ }),

/***/ 907:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Headers: () => (/* binding */ Headers),
/* harmony export */   Request: () => (/* binding */ Request),
/* harmony export */   Response: () => (/* binding */ Response),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   fetch: () => (/* binding */ fetch)
/* harmony export */ });


// ref: https://github.com/tc39/proposal-global
var getGlobal = function() {
    // the only reliable means to get the global object is
    // `Function('return this')()`
    // However, this causes CSP violations in Chrome apps.
    if (typeof self !== 'undefined') { return self; }
    if (typeof window !== 'undefined') { return window; }
    if (typeof __webpack_require__.g !== 'undefined') { return __webpack_require__.g; }
    throw new Error('unable to locate global object');
}

var globalObject = getGlobal();

const fetch = globalObject.fetch;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (globalObject.fetch.bind(globalObject));

const Headers = globalObject.Headers;
const Request = globalObject.Request;
const Response = globalObject.Response;


/***/ }),

/***/ 961:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const PostgrestQueryBuilder_1 = __importDefault(__webpack_require__(45));
const PostgrestFilterBuilder_1 = __importDefault(__webpack_require__(825));
/**
 * PostgREST client.
 *
 * @typeParam Database - Types for the schema from the [type
 * generator](https://supabase.com/docs/reference/javascript/next/typescript-support)
 *
 * @typeParam SchemaName - Postgres schema to switch to. Must be a string
 * literal, the same one passed to the constructor. If the schema is not
 * `"public"`, this must be supplied manually.
 */
class PostgrestClient {
    // TODO: Add back shouldThrowOnError once we figure out the typings
    /**
     * Creates a PostgREST client.
     *
     * @param url - URL of the PostgREST endpoint
     * @param options - Named parameters
     * @param options.headers - Custom headers
     * @param options.schema - Postgres schema to switch to
     * @param options.fetch - Custom fetch
     */
    constructor(url, { headers = {}, schema, fetch, } = {}) {
        this.url = url;
        this.headers = new Headers(headers);
        this.schemaName = schema;
        this.fetch = fetch;
    }
    /**
     * Perform a query on a table or a view.
     *
     * @param relation - The table or view name to query
     */
    from(relation) {
        const url = new URL(`${this.url}/${relation}`);
        return new PostgrestQueryBuilder_1.default(url, {
            headers: new Headers(this.headers),
            schema: this.schemaName,
            fetch: this.fetch,
        });
    }
    /**
     * Select a schema to query or perform an function (rpc) call.
     *
     * The schema needs to be on the list of exposed schemas inside Supabase.
     *
     * @param schema - The schema to query
     */
    schema(schema) {
        return new PostgrestClient(this.url, {
            headers: this.headers,
            schema,
            fetch: this.fetch,
        });
    }
    /**
     * Perform a function call.
     *
     * @param fn - The function name to call
     * @param args - The arguments to pass to the function call
     * @param options - Named parameters
     * @param options.head - When set to `true`, `data` will not be returned.
     * Useful if you only need the count.
     * @param options.get - When set to `true`, the function will be called with
     * read-only access mode.
     * @param options.count - Count algorithm to use to count rows returned by the
     * function. Only applicable for [set-returning
     * functions](https://www.postgresql.org/docs/current/functions-srf.html).
     *
     * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
     * hood.
     *
     * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
     * statistics under the hood.
     *
     * `"estimated"`: Uses exact count for low numbers and planned count for high
     * numbers.
     */
    rpc(fn, args = {}, { head = false, get = false, count, } = {}) {
        var _a;
        let method;
        const url = new URL(`${this.url}/rpc/${fn}`);
        let body;
        if (head || get) {
            method = head ? 'HEAD' : 'GET';
            Object.entries(args)
                // params with undefined value needs to be filtered out, otherwise it'll
                // show up as `?param=undefined`
                .filter(([_, value]) => value !== undefined)
                // array values need special syntax
                .map(([name, value]) => [name, Array.isArray(value) ? `{${value.join(',')}}` : `${value}`])
                .forEach(([name, value]) => {
                url.searchParams.append(name, value);
            });
        }
        else {
            method = 'POST';
            body = args;
        }
        const headers = new Headers(this.headers);
        if (count) {
            headers.set('Prefer', `count=${count}`);
        }
        return new PostgrestFilterBuilder_1.default({
            method,
            url,
            headers,
            schema: this.schemaName,
            body,
            fetch: (_a = this.fetch) !== null && _a !== void 0 ? _a : fetch,
        });
    }
}
exports["default"] = PostgrestClient;
//# sourceMappingURL=PostgrestClient.js.map

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(11);
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var __webpack_i__ in __webpack_exports__) __webpack_export_target__[__webpack_i__] = __webpack_exports__[__webpack_i__];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;