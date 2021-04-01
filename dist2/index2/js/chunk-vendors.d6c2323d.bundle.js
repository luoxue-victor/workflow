(self["webpackChunkbox"] = self["webpackChunkbox"] || []).push([["chunk-vendors"],{

/***/ "./node_modules/@sentry/browser/esm/backend.js":
/*!*****************************************************!*\
  !*** ./node_modules/@sentry/browser/esm/backend.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BrowserBackend": () => /* binding */ BrowserBackend
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @sentry/core */ "./node_modules/@sentry/core/esm/basebackend.js");
/* harmony import */ var _sentry_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @sentry/types */ "./node_modules/@sentry/types/esm/severity.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/supports.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/misc.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/syncpromise.js");
/* harmony import */ var _eventbuilder__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./eventbuilder */ "./node_modules/@sentry/browser/esm/eventbuilder.js");
/* harmony import */ var _transports__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./transports */ "./node_modules/@sentry/browser/esm/transports/fetch.js");
/* harmony import */ var _transports__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./transports */ "./node_modules/@sentry/browser/esm/transports/xhr.js");






/**
 * The Sentry Browser SDK Backend.
 * @hidden
 */

var BrowserBackend =
/** @class */
function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__.__extends(BrowserBackend, _super);

  function BrowserBackend() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  /**
   * @inheritDoc
   */


  BrowserBackend.prototype._setupTransport = function () {
    if (!this._options.dsn) {
      // We return the noop transport here in case there is no Dsn.
      return _super.prototype._setupTransport.call(this);
    }

    var transportOptions = tslib__WEBPACK_IMPORTED_MODULE_0__.__assign({}, this._options.transportOptions, {
      dsn: this._options.dsn
    });

    if (this._options.transport) {
      return new this._options.transport(transportOptions);
    }

    if ((0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.supportsFetch)()) {
      return new _transports__WEBPACK_IMPORTED_MODULE_2__.FetchTransport(transportOptions);
    }

    return new _transports__WEBPACK_IMPORTED_MODULE_3__.XHRTransport(transportOptions);
  };
  /**
   * @inheritDoc
   */


  BrowserBackend.prototype.eventFromException = function (exception, hint) {
    var syntheticException = hint && hint.syntheticException || undefined;
    var event = (0,_eventbuilder__WEBPACK_IMPORTED_MODULE_4__.eventFromUnknownInput)(exception, syntheticException, {
      attachStacktrace: this._options.attachStacktrace
    });
    (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_5__.addExceptionMechanism)(event, {
      handled: true,
      type: 'generic'
    });
    event.level = _sentry_types__WEBPACK_IMPORTED_MODULE_6__.Severity.Error;

    if (hint && hint.event_id) {
      event.event_id = hint.event_id;
    }

    return _sentry_utils__WEBPACK_IMPORTED_MODULE_7__.SyncPromise.resolve(event);
  };
  /**
   * @inheritDoc
   */


  BrowserBackend.prototype.eventFromMessage = function (message, level, hint) {
    if (level === void 0) {
      level = _sentry_types__WEBPACK_IMPORTED_MODULE_6__.Severity.Info;
    }

    var syntheticException = hint && hint.syntheticException || undefined;
    var event = (0,_eventbuilder__WEBPACK_IMPORTED_MODULE_4__.eventFromString)(message, syntheticException, {
      attachStacktrace: this._options.attachStacktrace
    });
    event.level = level;

    if (hint && hint.event_id) {
      event.event_id = hint.event_id;
    }

    return _sentry_utils__WEBPACK_IMPORTED_MODULE_7__.SyncPromise.resolve(event);
  };

  return BrowserBackend;
}(_sentry_core__WEBPACK_IMPORTED_MODULE_8__.BaseBackend);



/***/ }),

/***/ "./node_modules/@sentry/browser/esm/client.js":
/*!****************************************************!*\
  !*** ./node_modules/@sentry/browser/esm/client.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BrowserClient": () => /* binding */ BrowserClient
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @sentry/core */ "./node_modules/@sentry/core/esm/api.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @sentry/core */ "./node_modules/@sentry/core/esm/baseclient.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/misc.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/logger.js");
/* harmony import */ var _backend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./backend */ "./node_modules/@sentry/browser/esm/backend.js");
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./version */ "./node_modules/@sentry/browser/esm/version.js");





/**
 * The Sentry Browser SDK Client.
 *
 * @see BrowserOptions for documentation on configuration options.
 * @see SentryClient for usage documentation.
 */

var BrowserClient =
/** @class */
function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__.__extends(BrowserClient, _super);
  /**
   * Creates a new Browser SDK instance.
   *
   * @param options Configuration options for this SDK.
   */


  function BrowserClient(options) {
    if (options === void 0) {
      options = {};
    }

    return _super.call(this, _backend__WEBPACK_IMPORTED_MODULE_1__.BrowserBackend, options) || this;
  }
  /**
   * @inheritDoc
   */


  BrowserClient.prototype._prepareEvent = function (event, scope, hint) {
    event.platform = event.platform || 'javascript';
    event.sdk = tslib__WEBPACK_IMPORTED_MODULE_0__.__assign({}, event.sdk, {
      name: _version__WEBPACK_IMPORTED_MODULE_2__.SDK_NAME,
      packages: tslib__WEBPACK_IMPORTED_MODULE_0__.__spread(event.sdk && event.sdk.packages || [], [{
        name: 'npm:@sentry/browser',
        version: _version__WEBPACK_IMPORTED_MODULE_2__.SDK_VERSION
      }]),
      version: _version__WEBPACK_IMPORTED_MODULE_2__.SDK_VERSION
    });
    return _super.prototype._prepareEvent.call(this, event, scope, hint);
  };
  /**
   * Show a report dialog to the user to send feedback to a specific event.
   *
   * @param options Set individual options for the dialog
   */


  BrowserClient.prototype.showReportDialog = function (options) {
    if (options === void 0) {
      options = {};
    } // doesn't work without a document (React Native)


    var document = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_3__.getGlobalObject)().document;

    if (!document) {
      return;
    }

    if (!this._isEnabled()) {
      _sentry_utils__WEBPACK_IMPORTED_MODULE_4__.logger.error('Trying to call showReportDialog with Sentry Client is disabled');
      return;
    }

    var dsn = options.dsn || this.getDsn();

    if (!options.eventId) {
      _sentry_utils__WEBPACK_IMPORTED_MODULE_4__.logger.error('Missing `eventId` option in showReportDialog call');
      return;
    }

    if (!dsn) {
      _sentry_utils__WEBPACK_IMPORTED_MODULE_4__.logger.error('Missing `Dsn` option in showReportDialog call');
      return;
    }

    var script = document.createElement('script');
    script.async = true;
    script.src = new _sentry_core__WEBPACK_IMPORTED_MODULE_5__.API(dsn).getReportDialogEndpoint(options);

    if (options.onLoad) {
      script.onload = options.onLoad;
    }

    (document.head || document.body).appendChild(script);
  };

  return BrowserClient;
}(_sentry_core__WEBPACK_IMPORTED_MODULE_6__.BaseClient);



/***/ }),

/***/ "./node_modules/@sentry/browser/esm/eventbuilder.js":
/*!**********************************************************!*\
  !*** ./node_modules/@sentry/browser/esm/eventbuilder.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "eventFromUnknownInput": () => /* binding */ eventFromUnknownInput,
/* harmony export */   "eventFromString": () => /* binding */ eventFromString
/* harmony export */ });
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/is.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/misc.js");
/* harmony import */ var _parsers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parsers */ "./node_modules/@sentry/browser/esm/parsers.js");
/* harmony import */ var _tracekit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tracekit */ "./node_modules/@sentry/browser/esm/tracekit.js");



/** JSDoc */

function eventFromUnknownInput(exception, syntheticException, options) {
  if (options === void 0) {
    options = {};
  }

  var event;

  if ((0,_sentry_utils__WEBPACK_IMPORTED_MODULE_0__.isErrorEvent)(exception) && exception.error) {
    // If it is an ErrorEvent with `error` property, extract it to get actual Error
    var errorEvent = exception;
    exception = errorEvent.error; // tslint:disable-line:no-parameter-reassignment

    event = (0,_parsers__WEBPACK_IMPORTED_MODULE_1__.eventFromStacktrace)((0,_tracekit__WEBPACK_IMPORTED_MODULE_2__.computeStackTrace)(exception));
    return event;
  }

  if ((0,_sentry_utils__WEBPACK_IMPORTED_MODULE_0__.isDOMError)(exception) || (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_0__.isDOMException)(exception)) {
    // If it is a DOMError or DOMException (which are legacy APIs, but still supported in some browsers)
    // then we just extract the name and message, as they don't provide anything else
    // https://developer.mozilla.org/en-US/docs/Web/API/DOMError
    // https://developer.mozilla.org/en-US/docs/Web/API/DOMException
    var domException = exception;
    var name_1 = domException.name || ((0,_sentry_utils__WEBPACK_IMPORTED_MODULE_0__.isDOMError)(domException) ? 'DOMError' : 'DOMException');
    var message = domException.message ? name_1 + ": " + domException.message : name_1;
    event = eventFromString(message, syntheticException, options);
    (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_3__.addExceptionTypeValue)(event, message);
    return event;
  }

  if ((0,_sentry_utils__WEBPACK_IMPORTED_MODULE_0__.isError)(exception)) {
    // we have a real Error object, do nothing
    event = (0,_parsers__WEBPACK_IMPORTED_MODULE_1__.eventFromStacktrace)((0,_tracekit__WEBPACK_IMPORTED_MODULE_2__.computeStackTrace)(exception));
    return event;
  }

  if ((0,_sentry_utils__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(exception) || (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_0__.isEvent)(exception)) {
    // If it is plain Object or Event, serialize it manually and extract options
    // This will allow us to group events based on top-level keys
    // which is much better than creating new group when any key/value change
    var objectException = exception;
    event = (0,_parsers__WEBPACK_IMPORTED_MODULE_1__.eventFromPlainObject)(objectException, syntheticException, options.rejection);
    (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_3__.addExceptionMechanism)(event, {
      synthetic: true
    });
    return event;
  } // If none of previous checks were valid, then it means that it's not:
  // - an instance of DOMError
  // - an instance of DOMException
  // - an instance of Event
  // - an instance of Error
  // - a valid ErrorEvent (one with an error property)
  // - a plain Object
  //
  // So bail out and capture it as a simple message:


  event = eventFromString(exception, syntheticException, options);
  (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_3__.addExceptionTypeValue)(event, "" + exception, undefined);
  (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_3__.addExceptionMechanism)(event, {
    synthetic: true
  });
  return event;
} // this._options.attachStacktrace

/** JSDoc */

function eventFromString(input, syntheticException, options) {
  if (options === void 0) {
    options = {};
  }

  var event = {
    message: input
  };

  if (options.attachStacktrace && syntheticException) {
    var stacktrace = (0,_tracekit__WEBPACK_IMPORTED_MODULE_2__.computeStackTrace)(syntheticException);
    var frames_1 = (0,_parsers__WEBPACK_IMPORTED_MODULE_1__.prepareFramesForEvent)(stacktrace.stack);
    event.stacktrace = {
      frames: frames_1
    };
  }

  return event;
}

/***/ }),

/***/ "./node_modules/@sentry/browser/esm/helpers.js":
/*!*****************************************************!*\
  !*** ./node_modules/@sentry/browser/esm/helpers.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "shouldIgnoreOnError": () => /* binding */ shouldIgnoreOnError,
/* harmony export */   "wrap": () => /* binding */ wrap
/* harmony export */ });
/* unused harmony export ignoreNextOnError */
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/core */ "./node_modules/@sentry/minimal/esm/index.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/misc.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/object.js");



var ignoreOnError = 0;
/**
 * @hidden
 */

function shouldIgnoreOnError() {
  return ignoreOnError > 0;
}
/**
 * @hidden
 */

function ignoreNextOnError() {
  // onerror should trigger before setTimeout
  ignoreOnError += 1;
  setTimeout(function () {
    ignoreOnError -= 1;
  });
}
/**
 * Instruments the given function and sends an event to Sentry every time the
 * function throws an exception.
 *
 * @param fn A function to wrap.
 * @returns The wrapped function.
 * @hidden
 */

function wrap(fn, options, before) {
  if (options === void 0) {
    options = {};
  } // tslint:disable-next-line:strict-type-predicates


  if (typeof fn !== 'function') {
    return fn;
  }

  try {
    // We don't wanna wrap it twice
    if (fn.__sentry__) {
      return fn;
    } // If this has already been wrapped in the past, return that wrapped function


    if (fn.__sentry_wrapped__) {
      return fn.__sentry_wrapped__;
    }
  } catch (e) {
    // Just accessing custom props in some Selenium environments
    // can cause a "Permission denied" exception (see raven-js#495).
    // Bail on wrapping and return the function as-is (defers to window.onerror).
    return fn;
  }

  var sentryWrapped = function sentryWrapped() {
    var args = Array.prototype.slice.call(arguments); // tslint:disable:no-unsafe-any

    try {
      // tslint:disable-next-line:strict-type-predicates
      if (before && typeof before === 'function') {
        before.apply(this, arguments);
      }

      var wrappedArguments = args.map(function (arg) {
        return wrap(arg, options);
      });

      if (fn.handleEvent) {
        // Attempt to invoke user-land function
        // NOTE: If you are a Sentry user, and you are seeing this stack frame, it
        //       means the sentry.javascript SDK caught an error invoking your application code. This
        //       is expected behavior and NOT indicative of a bug with sentry.javascript.
        return fn.handleEvent.apply(this, wrappedArguments);
      } // Attempt to invoke user-land function
      // NOTE: If you are a Sentry user, and you are seeing this stack frame, it
      //       means the sentry.javascript SDK caught an error invoking your application code. This
      //       is expected behavior and NOT indicative of a bug with sentry.javascript.


      return fn.apply(this, wrappedArguments); // tslint:enable:no-unsafe-any
    } catch (ex) {
      ignoreNextOnError();
      (0,_sentry_core__WEBPACK_IMPORTED_MODULE_1__.withScope)(function (scope) {
        scope.addEventProcessor(function (event) {
          var processedEvent = tslib__WEBPACK_IMPORTED_MODULE_0__.__assign({}, event);

          if (options.mechanism) {
            (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_2__.addExceptionTypeValue)(processedEvent, undefined, undefined);
            (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_2__.addExceptionMechanism)(processedEvent, options.mechanism);
          }

          processedEvent.extra = tslib__WEBPACK_IMPORTED_MODULE_0__.__assign({}, processedEvent.extra, {
            arguments: (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_3__.normalize)(args, 3)
          });
          return processedEvent;
        });
        (0,_sentry_core__WEBPACK_IMPORTED_MODULE_1__.captureException)(ex);
      });
      throw ex;
    }
  }; // Accessing some objects may throw
  // ref: https://github.com/getsentry/sentry-javascript/issues/1168


  try {
    for (var property in fn) {
      if (Object.prototype.hasOwnProperty.call(fn, property)) {
        sentryWrapped[property] = fn[property];
      }
    }
  } catch (_oO) {} // tslint:disable-line:no-empty


  fn.prototype = fn.prototype || {};
  sentryWrapped.prototype = fn.prototype;
  Object.defineProperty(fn, '__sentry_wrapped__', {
    enumerable: false,
    value: sentryWrapped
  }); // Signal that this function has been wrapped/filled already
  // for both debugging and to prevent it to being wrapped/filled twice

  Object.defineProperties(sentryWrapped, {
    __sentry__: {
      enumerable: false,
      value: true
    },
    __sentry_original__: {
      enumerable: false,
      value: fn
    }
  }); // Restore original function name (not all browsers allow that)

  try {
    var descriptor = Object.getOwnPropertyDescriptor(sentryWrapped, 'name');

    if (descriptor.configurable) {
      Object.defineProperty(sentryWrapped, 'name', {
        get: function get() {
          return fn.name;
        }
      });
    }
  } catch (_oO) {
    /*no-empty*/
  }

  return sentryWrapped;
}

/***/ }),

/***/ "./node_modules/@sentry/browser/esm/integrations/breadcrumbs.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@sentry/browser/esm/integrations/breadcrumbs.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Breadcrumbs": () => /* binding */ Breadcrumbs
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sentry/core */ "./node_modules/@sentry/hub/esm/hub.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @sentry/core */ "./node_modules/@sentry/core/esm/api.js");
/* harmony import */ var _sentry_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sentry/types */ "./node_modules/@sentry/types/esm/severity.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/object.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/string.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/misc.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/instrument.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/logger.js");




/**
 * Default Breadcrumbs instrumentations
 * TODO: Deprecated - with v6, this will be renamed to `Instrument`
 */

var Breadcrumbs =
/** @class */
function () {
  /**
   * @inheritDoc
   */
  function Breadcrumbs(options) {
    /**
     * @inheritDoc
     */
    this.name = Breadcrumbs.id;
    this._options = tslib__WEBPACK_IMPORTED_MODULE_0__.__assign({
      console: true,
      dom: true,
      fetch: true,
      history: true,
      sentry: true,
      xhr: true
    }, options);
  }
  /**
   * Creates breadcrumbs from console API calls
   */


  Breadcrumbs.prototype._consoleBreadcrumb = function (handlerData) {
    var breadcrumb = {
      category: 'console',
      data: {
        extra: {
          arguments: (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.normalize)(handlerData.args, 3)
        },
        logger: 'console'
      },
      level: _sentry_types__WEBPACK_IMPORTED_MODULE_2__.Severity.fromString(handlerData.level),
      message: (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_3__.safeJoin)(handlerData.args, ' ')
    };

    if (handlerData.level === 'assert') {
      if (handlerData.args[0] === false) {
        breadcrumb.message = "Assertion failed: " + ((0,_sentry_utils__WEBPACK_IMPORTED_MODULE_3__.safeJoin)(handlerData.args.slice(1), ' ') || 'console.assert');
        breadcrumb.data.extra.arguments = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.normalize)(handlerData.args.slice(1), 3);
      } else {
        // Don't capture a breadcrumb for passed assertions
        return;
      }
    }

    (0,_sentry_core__WEBPACK_IMPORTED_MODULE_4__.getCurrentHub)().addBreadcrumb(breadcrumb, {
      input: handlerData.args,
      level: handlerData.level
    });
  };
  /**
   * Creates breadcrumbs from DOM API calls
   */


  Breadcrumbs.prototype._domBreadcrumb = function (handlerData) {
    var target; // Accessing event.target can throw (see getsentry/raven-js#838, #768)

    try {
      target = handlerData.event.target ? (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_5__.htmlTreeAsString)(handlerData.event.target) : (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_5__.htmlTreeAsString)(handlerData.event);
    } catch (e) {
      target = '<unknown>';
    }

    if (target.length === 0) {
      return;
    }

    (0,_sentry_core__WEBPACK_IMPORTED_MODULE_4__.getCurrentHub)().addBreadcrumb({
      category: "ui." + handlerData.name,
      message: target
    }, {
      event: event,
      name: handlerData.name
    });
  };
  /**
   * Creates breadcrumbs from XHR API calls
   */


  Breadcrumbs.prototype._xhrBreadcrumb = function (handlerData) {
    if (handlerData.endTimestamp) {
      // We only capture complete, non-sentry requests
      if (handlerData.xhr.__sentry_own_request__) {
        return;
      }

      (0,_sentry_core__WEBPACK_IMPORTED_MODULE_4__.getCurrentHub)().addBreadcrumb({
        category: 'xhr',
        data: handlerData.xhr.__sentry_xhr__,
        type: 'http'
      }, {
        xhr: handlerData.xhr
      });
      return;
    } // We only capture issued sentry requests


    if (handlerData.xhr.__sentry_own_request__) {
      addSentryBreadcrumb(handlerData.args[0]);
    }
  };
  /**
   * Creates breadcrumbs from fetch API calls
   */


  Breadcrumbs.prototype._fetchBreadcrumb = function (handlerData) {
    // We only capture complete fetch requests
    if (!handlerData.endTimestamp) {
      return;
    }

    var client = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_4__.getCurrentHub)().getClient();
    var dsn = client && client.getDsn();

    if (dsn) {
      var filterUrl = new _sentry_core__WEBPACK_IMPORTED_MODULE_6__.API(dsn).getStoreEndpoint(); // if Sentry key appears in URL, don't capture it as a request
      // but rather as our own 'sentry' type breadcrumb

      if (filterUrl && handlerData.fetchData.url.indexOf(filterUrl) !== -1 && handlerData.fetchData.method === 'POST' && handlerData.args[1] && handlerData.args[1].body) {
        addSentryBreadcrumb(handlerData.args[1].body);
        return;
      }
    }

    if (handlerData.error) {
      (0,_sentry_core__WEBPACK_IMPORTED_MODULE_4__.getCurrentHub)().addBreadcrumb({
        category: 'fetch',
        data: tslib__WEBPACK_IMPORTED_MODULE_0__.__assign({}, handlerData.fetchData, {
          status_code: handlerData.response.status
        }),
        level: _sentry_types__WEBPACK_IMPORTED_MODULE_2__.Severity.Error,
        type: 'http'
      }, {
        data: handlerData.error,
        input: handlerData.args
      });
    } else {
      (0,_sentry_core__WEBPACK_IMPORTED_MODULE_4__.getCurrentHub)().addBreadcrumb({
        category: 'fetch',
        data: tslib__WEBPACK_IMPORTED_MODULE_0__.__assign({}, handlerData.fetchData, {
          status_code: handlerData.response.status
        }),
        type: 'http'
      }, {
        input: handlerData.args,
        response: handlerData.response
      });
    }
  };
  /**
   * Creates breadcrumbs from history API calls
   */


  Breadcrumbs.prototype._historyBreadcrumb = function (handlerData) {
    var global = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_5__.getGlobalObject)();
    var from = handlerData.from;
    var to = handlerData.to;
    var parsedLoc = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_5__.parseUrl)(global.location.href);
    var parsedFrom = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_5__.parseUrl)(from);
    var parsedTo = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_5__.parseUrl)(to); // Initial pushState doesn't provide `from` information

    if (!parsedFrom.path) {
      parsedFrom = parsedLoc;
    } // Use only the path component of the URL if the URL matches the current
    // document (almost all the time when using pushState)


    if (parsedLoc.protocol === parsedTo.protocol && parsedLoc.host === parsedTo.host) {
      // tslint:disable-next-line:no-parameter-reassignment
      to = parsedTo.relative;
    }

    if (parsedLoc.protocol === parsedFrom.protocol && parsedLoc.host === parsedFrom.host) {
      // tslint:disable-next-line:no-parameter-reassignment
      from = parsedFrom.relative;
    }

    (0,_sentry_core__WEBPACK_IMPORTED_MODULE_4__.getCurrentHub)().addBreadcrumb({
      category: 'navigation',
      data: {
        from: from,
        to: to
      }
    });
  };
  /**
   * Instrument browser built-ins w/ breadcrumb capturing
   *  - Console API
   *  - DOM API (click/typing)
   *  - XMLHttpRequest API
   *  - Fetch API
   *  - History API
   */


  Breadcrumbs.prototype.setupOnce = function () {
    var _this = this;

    if (this._options.console) {
      (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_7__.addInstrumentationHandler)({
        callback: function callback() {
          var args = [];

          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }

          _this._consoleBreadcrumb.apply(_this, tslib__WEBPACK_IMPORTED_MODULE_0__.__spread(args));
        },
        type: 'console'
      });
    }

    if (this._options.dom) {
      (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_7__.addInstrumentationHandler)({
        callback: function callback() {
          var args = [];

          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }

          _this._domBreadcrumb.apply(_this, tslib__WEBPACK_IMPORTED_MODULE_0__.__spread(args));
        },
        type: 'dom'
      });
    }

    if (this._options.xhr) {
      (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_7__.addInstrumentationHandler)({
        callback: function callback() {
          var args = [];

          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }

          _this._xhrBreadcrumb.apply(_this, tslib__WEBPACK_IMPORTED_MODULE_0__.__spread(args));
        },
        type: 'xhr'
      });
    }

    if (this._options.fetch) {
      (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_7__.addInstrumentationHandler)({
        callback: function callback() {
          var args = [];

          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }

          _this._fetchBreadcrumb.apply(_this, tslib__WEBPACK_IMPORTED_MODULE_0__.__spread(args));
        },
        type: 'fetch'
      });
    }

    if (this._options.history) {
      (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_7__.addInstrumentationHandler)({
        callback: function callback() {
          var args = [];

          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }

          _this._historyBreadcrumb.apply(_this, tslib__WEBPACK_IMPORTED_MODULE_0__.__spread(args));
        },
        type: 'history'
      });
    }
  };
  /**
   * @inheritDoc
   */


  Breadcrumbs.id = 'Breadcrumbs';
  return Breadcrumbs;
}();


/**
 * Create a breadcrumb of `sentry` from the events themselves
 */

function addSentryBreadcrumb(serializedData) {
  // There's always something that can go wrong with deserialization...
  try {
    var event_1 = JSON.parse(serializedData);
    (0,_sentry_core__WEBPACK_IMPORTED_MODULE_4__.getCurrentHub)().addBreadcrumb({
      category: 'sentry',
      event_id: event_1.event_id,
      level: event_1.level || _sentry_types__WEBPACK_IMPORTED_MODULE_2__.Severity.fromString('error'),
      message: (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_5__.getEventDescription)(event_1)
    }, {
      event: event_1
    });
  } catch (_oO) {
    _sentry_utils__WEBPACK_IMPORTED_MODULE_8__.logger.error('Error while adding sentry type breadcrumb');
  }
}

/***/ }),

/***/ "./node_modules/@sentry/browser/esm/integrations/globalhandlers.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@sentry/browser/esm/integrations/globalhandlers.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GlobalHandlers": () => /* binding */ GlobalHandlers
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sentry/core */ "./node_modules/@sentry/hub/esm/hub.js");
/* harmony import */ var _sentry_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @sentry/types */ "./node_modules/@sentry/types/esm/severity.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/misc.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/logger.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/is.js");
/* harmony import */ var _eventbuilder__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../eventbuilder */ "./node_modules/@sentry/browser/esm/eventbuilder.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../helpers */ "./node_modules/@sentry/browser/esm/helpers.js");






/** Global handlers */

var GlobalHandlers =
/** @class */
function () {
  /** JSDoc */
  function GlobalHandlers(options) {
    /**
     * @inheritDoc
     */
    this.name = GlobalHandlers.id;
    /** JSDoc */

    this._global = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.getGlobalObject)();
    /** JSDoc */

    this._oldOnErrorHandler = null;
    /** JSDoc */

    this._oldOnUnhandledRejectionHandler = null;
    /** JSDoc */

    this._onErrorHandlerInstalled = false;
    /** JSDoc */

    this._onUnhandledRejectionHandlerInstalled = false;
    this._options = tslib__WEBPACK_IMPORTED_MODULE_0__.__assign({
      onerror: true,
      onunhandledrejection: true
    }, options);
  }
  /**
   * @inheritDoc
   */


  GlobalHandlers.prototype.setupOnce = function () {
    Error.stackTraceLimit = 50;

    if (this._options.onerror) {
      _sentry_utils__WEBPACK_IMPORTED_MODULE_2__.logger.log('Global Handler attached: onerror');

      this._installGlobalOnErrorHandler();
    }

    if (this._options.onunhandledrejection) {
      _sentry_utils__WEBPACK_IMPORTED_MODULE_2__.logger.log('Global Handler attached: onunhandledrejection');

      this._installGlobalOnUnhandledRejectionHandler();
    }
  };
  /** JSDoc */


  GlobalHandlers.prototype._installGlobalOnErrorHandler = function () {
    if (this._onErrorHandlerInstalled) {
      return;
    }

    var self = this; // tslint:disable-line:no-this-assignment

    this._oldOnErrorHandler = this._global.onerror;

    this._global.onerror = function (msg, url, line, column, error) {
      var currentHub = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_3__.getCurrentHub)();
      var hasIntegration = currentHub.getIntegration(GlobalHandlers);
      var isFailedOwnDelivery = error && error.__sentry_own_request__ === true;

      if (!hasIntegration || (0,_helpers__WEBPACK_IMPORTED_MODULE_4__.shouldIgnoreOnError)() || isFailedOwnDelivery) {
        if (self._oldOnErrorHandler) {
          return self._oldOnErrorHandler.apply(this, arguments);
        }

        return false;
      }

      var client = currentHub.getClient();
      var event = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_5__.isPrimitive)(error) ? self._eventFromIncompleteOnError(msg, url, line, column) : self._enhanceEventWithInitialFrame((0,_eventbuilder__WEBPACK_IMPORTED_MODULE_6__.eventFromUnknownInput)(error, undefined, {
        attachStacktrace: client && client.getOptions().attachStacktrace,
        rejection: false
      }), url, line, column);
      (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.addExceptionMechanism)(event, {
        handled: false,
        type: 'onerror'
      });
      currentHub.captureEvent(event, {
        originalException: error
      });

      if (self._oldOnErrorHandler) {
        return self._oldOnErrorHandler.apply(this, arguments);
      }

      return false;
    };

    this._onErrorHandlerInstalled = true;
  };
  /** JSDoc */


  GlobalHandlers.prototype._installGlobalOnUnhandledRejectionHandler = function () {
    if (this._onUnhandledRejectionHandlerInstalled) {
      return;
    }

    var self = this; // tslint:disable-line:no-this-assignment

    this._oldOnUnhandledRejectionHandler = this._global.onunhandledrejection;

    this._global.onunhandledrejection = function (e) {
      var error = e;

      try {
        error = e && 'reason' in e ? e.reason : e;
      } catch (_oO) {// no-empty
      }

      var currentHub = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_3__.getCurrentHub)();
      var hasIntegration = currentHub.getIntegration(GlobalHandlers);
      var isFailedOwnDelivery = error && error.__sentry_own_request__ === true;

      if (!hasIntegration || (0,_helpers__WEBPACK_IMPORTED_MODULE_4__.shouldIgnoreOnError)() || isFailedOwnDelivery) {
        if (self._oldOnUnhandledRejectionHandler) {
          return self._oldOnUnhandledRejectionHandler.apply(this, arguments);
        }

        return true;
      }

      var client = currentHub.getClient();
      var event = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_5__.isPrimitive)(error) ? self._eventFromIncompleteRejection(error) : (0,_eventbuilder__WEBPACK_IMPORTED_MODULE_6__.eventFromUnknownInput)(error, undefined, {
        attachStacktrace: client && client.getOptions().attachStacktrace,
        rejection: true
      });
      event.level = _sentry_types__WEBPACK_IMPORTED_MODULE_7__.Severity.Error;
      (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.addExceptionMechanism)(event, {
        handled: false,
        type: 'onunhandledrejection'
      });
      currentHub.captureEvent(event, {
        originalException: error
      });

      if (self._oldOnUnhandledRejectionHandler) {
        return self._oldOnUnhandledRejectionHandler.apply(this, arguments);
      }

      return true;
    };

    this._onUnhandledRejectionHandlerInstalled = true;
  };
  /**
   * This function creates a stack from an old, error-less onerror handler.
   */


  GlobalHandlers.prototype._eventFromIncompleteOnError = function (msg, url, line, column) {
    var ERROR_TYPES_RE = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/i; // If 'message' is ErrorEvent, get real message from inside

    var message = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_5__.isErrorEvent)(msg) ? msg.message : msg;
    var name;

    if ((0,_sentry_utils__WEBPACK_IMPORTED_MODULE_5__.isString)(message)) {
      var groups = message.match(ERROR_TYPES_RE);

      if (groups) {
        name = groups[1];
        message = groups[2];
      }
    }

    var event = {
      exception: {
        values: [{
          type: name || 'Error',
          value: message
        }]
      }
    };
    return this._enhanceEventWithInitialFrame(event, url, line, column);
  };
  /**
   * This function creates an Event from an TraceKitStackTrace that has part of it missing.
   */


  GlobalHandlers.prototype._eventFromIncompleteRejection = function (error) {
    return {
      exception: {
        values: [{
          type: 'UnhandledRejection',
          value: "Non-Error promise rejection captured with value: " + error
        }]
      }
    };
  };
  /** JSDoc */


  GlobalHandlers.prototype._enhanceEventWithInitialFrame = function (event, url, line, column) {
    event.exception = event.exception || {};
    event.exception.values = event.exception.values || [];
    event.exception.values[0] = event.exception.values[0] || {};
    event.exception.values[0].stacktrace = event.exception.values[0].stacktrace || {};
    event.exception.values[0].stacktrace.frames = event.exception.values[0].stacktrace.frames || [];
    var colno = isNaN(parseInt(column, 10)) ? undefined : column;
    var lineno = isNaN(parseInt(line, 10)) ? undefined : line;
    var filename = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_5__.isString)(url) && url.length > 0 ? url : (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.getLocationHref)();

    if (event.exception.values[0].stacktrace.frames.length === 0) {
      event.exception.values[0].stacktrace.frames.push({
        colno: colno,
        filename: filename,
        function: '?',
        in_app: true,
        lineno: lineno
      });
    }

    return event;
  };
  /**
   * @inheritDoc
   */


  GlobalHandlers.id = 'GlobalHandlers';
  return GlobalHandlers;
}();



/***/ }),

/***/ "./node_modules/@sentry/browser/esm/integrations/linkederrors.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@sentry/browser/esm/integrations/linkederrors.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LinkedErrors": () => /* binding */ LinkedErrors
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/core */ "./node_modules/@sentry/hub/esm/scope.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sentry/core */ "./node_modules/@sentry/hub/esm/hub.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/is.js");
/* harmony import */ var _parsers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../parsers */ "./node_modules/@sentry/browser/esm/parsers.js");
/* harmony import */ var _tracekit__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../tracekit */ "./node_modules/@sentry/browser/esm/tracekit.js");





var DEFAULT_KEY = 'cause';
var DEFAULT_LIMIT = 5;
/** Adds SDK info to an event. */

var LinkedErrors =
/** @class */
function () {
  /**
   * @inheritDoc
   */
  function LinkedErrors(options) {
    if (options === void 0) {
      options = {};
    }
    /**
     * @inheritDoc
     */


    this.name = LinkedErrors.id;
    this._key = options.key || DEFAULT_KEY;
    this._limit = options.limit || DEFAULT_LIMIT;
  }
  /**
   * @inheritDoc
   */


  LinkedErrors.prototype.setupOnce = function () {
    (0,_sentry_core__WEBPACK_IMPORTED_MODULE_1__.addGlobalEventProcessor)(function (event, hint) {
      var self = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_2__.getCurrentHub)().getIntegration(LinkedErrors);

      if (self) {
        return self._handler(event, hint);
      }

      return event;
    });
  };
  /**
   * @inheritDoc
   */


  LinkedErrors.prototype._handler = function (event, hint) {
    if (!event.exception || !event.exception.values || !hint || !(0,_sentry_utils__WEBPACK_IMPORTED_MODULE_3__.isInstanceOf)(hint.originalException, Error)) {
      return event;
    }

    var linkedErrors = this._walkErrorTree(hint.originalException, this._key);

    event.exception.values = tslib__WEBPACK_IMPORTED_MODULE_0__.__spread(linkedErrors, event.exception.values);
    return event;
  };
  /**
   * @inheritDoc
   */


  LinkedErrors.prototype._walkErrorTree = function (error, key, stack) {
    if (stack === void 0) {
      stack = [];
    }

    if (!(0,_sentry_utils__WEBPACK_IMPORTED_MODULE_3__.isInstanceOf)(error[key], Error) || stack.length + 1 >= this._limit) {
      return stack;
    }

    var stacktrace = (0,_tracekit__WEBPACK_IMPORTED_MODULE_4__.computeStackTrace)(error[key]);
    var exception = (0,_parsers__WEBPACK_IMPORTED_MODULE_5__.exceptionFromStacktrace)(stacktrace);
    return this._walkErrorTree(error[key], key, tslib__WEBPACK_IMPORTED_MODULE_0__.__spread([exception], stack));
  };
  /**
   * @inheritDoc
   */


  LinkedErrors.id = 'LinkedErrors';
  return LinkedErrors;
}();



/***/ }),

/***/ "./node_modules/@sentry/browser/esm/integrations/trycatch.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@sentry/browser/esm/integrations/trycatch.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TryCatch": () => /* binding */ TryCatch
/* harmony export */ });
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/misc.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/object.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers */ "./node_modules/@sentry/browser/esm/helpers.js");


/** Wrap timer functions and event targets to catch errors and provide better meta data */

var TryCatch =
/** @class */
function () {
  function TryCatch() {
    /** JSDoc */
    this._ignoreOnError = 0;
    /**
     * @inheritDoc
     */

    this.name = TryCatch.id;
  }
  /** JSDoc */


  TryCatch.prototype._wrapTimeFunction = function (original) {
    return function () {
      var args = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }

      var originalCallback = args[0];
      args[0] = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.wrap)(originalCallback, {
        mechanism: {
          data: {
            function: (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.getFunctionName)(original)
          },
          handled: true,
          type: 'instrument'
        }
      });
      return original.apply(this, args);
    };
  };
  /** JSDoc */


  TryCatch.prototype._wrapRAF = function (original) {
    return function (callback) {
      return original((0,_helpers__WEBPACK_IMPORTED_MODULE_0__.wrap)(callback, {
        mechanism: {
          data: {
            function: 'requestAnimationFrame',
            handler: (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.getFunctionName)(original)
          },
          handled: true,
          type: 'instrument'
        }
      }));
    };
  };
  /** JSDoc */


  TryCatch.prototype._wrapEventTarget = function (target) {
    var global = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.getGlobalObject)();
    var proto = global[target] && global[target].prototype;

    if (!proto || !proto.hasOwnProperty || !proto.hasOwnProperty('addEventListener')) {
      return;
    }

    (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_2__.fill)(proto, 'addEventListener', function (original) {
      return function (eventName, fn, options) {
        try {
          // tslint:disable-next-line:no-unbound-method strict-type-predicates
          if (typeof fn.handleEvent === 'function') {
            fn.handleEvent = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.wrap)(fn.handleEvent.bind(fn), {
              mechanism: {
                data: {
                  function: 'handleEvent',
                  handler: (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.getFunctionName)(fn),
                  target: target
                },
                handled: true,
                type: 'instrument'
              }
            });
          }
        } catch (err) {// can sometimes get 'Permission denied to access property "handle Event'
        }

        return original.call(this, eventName, (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.wrap)(fn, {
          mechanism: {
            data: {
              function: 'addEventListener',
              handler: (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.getFunctionName)(fn),
              target: target
            },
            handled: true,
            type: 'instrument'
          }
        }), options);
      };
    });
    (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_2__.fill)(proto, 'removeEventListener', function (original) {
      return function (eventName, fn, options) {
        var callback = fn;

        try {
          callback = callback && (callback.__sentry_wrapped__ || callback);
        } catch (e) {// ignore, accessing __sentry_wrapped__ will throw in some Selenium environments
        }

        return original.call(this, eventName, callback, options);
      };
    });
  };
  /** JSDoc */


  TryCatch.prototype._wrapXHR = function (originalSend) {
    return function () {
      var _this = this;

      var args = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }

      var xhr = this; // tslint:disable-line:no-this-assignment

      var xmlHttpRequestProps = ['onload', 'onerror', 'onprogress'];
      xmlHttpRequestProps.forEach(function (prop) {
        if (prop in _this && typeof _this[prop] === 'function') {
          (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_2__.fill)(_this, prop, function (original) {
            return (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.wrap)(original, {
              mechanism: {
                data: {
                  function: prop,
                  handler: (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.getFunctionName)(original)
                },
                handled: true,
                type: 'instrument'
              }
            });
          });
        }
      });

      if ('onreadystatechange' in xhr && typeof xhr.onreadystatechange === 'function') {
        (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_2__.fill)(xhr, 'onreadystatechange', function (original) {
          var wrapOptions = {
            mechanism: {
              data: {
                function: 'onreadystatechange',
                handler: (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.getFunctionName)(original)
              },
              handled: true,
              type: 'instrument'
            }
          }; // If Instrument integration has been called before TryCatch, get the name of original function

          if (original.__sentry_original__) {
            wrapOptions.mechanism.data.handler = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.getFunctionName)(original.__sentry_original__);
          } // Otherwise wrap directly


          return (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.wrap)(original, wrapOptions);
        });
      }

      return originalSend.apply(this, args);
    };
  };
  /**
   * Wrap timer functions and event targets to catch errors
   * and provide better metadata.
   */


  TryCatch.prototype.setupOnce = function () {
    this._ignoreOnError = this._ignoreOnError;
    var global = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.getGlobalObject)();
    (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_2__.fill)(global, 'setTimeout', this._wrapTimeFunction.bind(this));
    (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_2__.fill)(global, 'setInterval', this._wrapTimeFunction.bind(this));
    (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_2__.fill)(global, 'requestAnimationFrame', this._wrapRAF.bind(this));

    if ('XMLHttpRequest' in global) {
      (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_2__.fill)(XMLHttpRequest.prototype, 'send', this._wrapXHR.bind(this));
    }

    ['EventTarget', 'Window', 'Node', 'ApplicationCache', 'AudioTrackList', 'ChannelMergerNode', 'CryptoOperation', 'EventSource', 'FileReader', 'HTMLUnknownElement', 'IDBDatabase', 'IDBRequest', 'IDBTransaction', 'KeyOperation', 'MediaController', 'MessagePort', 'ModalWindow', 'Notification', 'SVGElementInstance', 'Screen', 'TextTrack', 'TextTrackCue', 'TextTrackList', 'WebSocket', 'WebSocketWorker', 'Worker', 'XMLHttpRequest', 'XMLHttpRequestEventTarget', 'XMLHttpRequestUpload'].forEach(this._wrapEventTarget.bind(this));
  };
  /**
   * @inheritDoc
   */


  TryCatch.id = 'TryCatch';
  return TryCatch;
}();



/***/ }),

/***/ "./node_modules/@sentry/browser/esm/integrations/useragent.js":
/*!********************************************************************!*\
  !*** ./node_modules/@sentry/browser/esm/integrations/useragent.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserAgent": () => /* binding */ UserAgent
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sentry/core */ "./node_modules/@sentry/hub/esm/scope.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sentry/core */ "./node_modules/@sentry/hub/esm/hub.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/misc.js");



var global = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.getGlobalObject)();
/** UserAgent */

var UserAgent =
/** @class */
function () {
  function UserAgent() {
    /**
     * @inheritDoc
     */
    this.name = UserAgent.id;
  }
  /**
   * @inheritDoc
   */


  UserAgent.prototype.setupOnce = function () {
    (0,_sentry_core__WEBPACK_IMPORTED_MODULE_2__.addGlobalEventProcessor)(function (event) {
      if ((0,_sentry_core__WEBPACK_IMPORTED_MODULE_3__.getCurrentHub)().getIntegration(UserAgent)) {
        if (!global.navigator || !global.location) {
          return event;
        } // Request Interface: https://docs.sentry.io/development/sdk-dev/event-payloads/request/


        var request = event.request || {};
        request.url = request.url || global.location.href;
        request.headers = request.headers || {};
        request.headers['User-Agent'] = global.navigator.userAgent;
        return tslib__WEBPACK_IMPORTED_MODULE_0__.__assign({}, event, {
          request: request
        });
      }

      return event;
    });
  };
  /**
   * @inheritDoc
   */


  UserAgent.id = 'UserAgent';
  return UserAgent;
}();



/***/ }),

/***/ "./node_modules/@sentry/browser/esm/parsers.js":
/*!*****************************************************!*\
  !*** ./node_modules/@sentry/browser/esm/parsers.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "exceptionFromStacktrace": () => /* binding */ exceptionFromStacktrace,
/* harmony export */   "eventFromPlainObject": () => /* binding */ eventFromPlainObject,
/* harmony export */   "eventFromStacktrace": () => /* binding */ eventFromStacktrace,
/* harmony export */   "prepareFramesForEvent": () => /* binding */ prepareFramesForEvent
/* harmony export */ });
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/is.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/object.js");
/* harmony import */ var _tracekit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tracekit */ "./node_modules/@sentry/browser/esm/tracekit.js");


var STACKTRACE_LIMIT = 50;
/**
 * This function creates an exception from an TraceKitStackTrace
 * @param stacktrace TraceKitStackTrace that will be converted to an exception
 * @hidden
 */

function exceptionFromStacktrace(stacktrace) {
  var frames = prepareFramesForEvent(stacktrace.stack);
  var exception = {
    type: stacktrace.name,
    value: stacktrace.message
  };

  if (frames && frames.length) {
    exception.stacktrace = {
      frames: frames
    };
  } // tslint:disable-next-line:strict-type-predicates


  if (exception.type === undefined && exception.value === '') {
    exception.value = 'Unrecoverable error caught';
  }

  return exception;
}
/**
 * @hidden
 */

function eventFromPlainObject(exception, syntheticException, rejection) {
  var event = {
    exception: {
      values: [{
        type: (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_0__.isEvent)(exception) ? exception.constructor.name : rejection ? 'UnhandledRejection' : 'Error',
        value: "Non-Error " + (rejection ? 'promise rejection' : 'exception') + " captured with keys: " + (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.extractExceptionKeysForMessage)(exception)
      }]
    },
    extra: {
      __serialized__: (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.normalizeToSize)(exception)
    }
  };

  if (syntheticException) {
    var stacktrace = (0,_tracekit__WEBPACK_IMPORTED_MODULE_2__.computeStackTrace)(syntheticException);
    var frames_1 = prepareFramesForEvent(stacktrace.stack);
    event.stacktrace = {
      frames: frames_1
    };
  }

  return event;
}
/**
 * @hidden
 */

function eventFromStacktrace(stacktrace) {
  var exception = exceptionFromStacktrace(stacktrace);
  return {
    exception: {
      values: [exception]
    }
  };
}
/**
 * @hidden
 */

function prepareFramesForEvent(stack) {
  if (!stack || !stack.length) {
    return [];
  }

  var localStack = stack;
  var firstFrameFunction = localStack[0].func || '';
  var lastFrameFunction = localStack[localStack.length - 1].func || ''; // If stack starts with one of our API calls, remove it (starts, meaning it's the top of the stack - aka last call)

  if (firstFrameFunction.indexOf('captureMessage') !== -1 || firstFrameFunction.indexOf('captureException') !== -1) {
    localStack = localStack.slice(1);
  } // If stack ends with one of our internal API calls, remove it (ends, meaning it's the bottom of the stack - aka top-most call)


  if (lastFrameFunction.indexOf('sentryWrapped') !== -1) {
    localStack = localStack.slice(0, -1);
  } // The frame where the crash happened, should be the last entry in the array


  return localStack.map(function (frame) {
    return {
      colno: frame.column === null ? undefined : frame.column,
      filename: frame.url || localStack[0].url,
      function: frame.func || '?',
      in_app: true,
      lineno: frame.line === null ? undefined : frame.line
    };
  }).slice(0, STACKTRACE_LIMIT).reverse();
}

/***/ }),

/***/ "./node_modules/@sentry/browser/esm/sdk.js":
/*!*************************************************!*\
  !*** ./node_modules/@sentry/browser/esm/sdk.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "init": () => /* binding */ init
/* harmony export */ });
/* unused harmony exports defaultIntegrations, showReportDialog, lastEventId, forceLoad, onLoad, flush, close, wrap */
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/core */ "./node_modules/@sentry/core/esm/integrations/inboundfilters.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/core */ "./node_modules/@sentry/core/esm/integrations/functiontostring.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @sentry/core */ "./node_modules/@sentry/core/esm/sdk.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @sentry/core */ "./node_modules/@sentry/hub/esm/hub.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/misc.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/syncpromise.js");
/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./client */ "./node_modules/@sentry/browser/esm/client.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./helpers */ "./node_modules/@sentry/browser/esm/helpers.js");
/* harmony import */ var _integrations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./integrations */ "./node_modules/@sentry/browser/esm/integrations/trycatch.js");
/* harmony import */ var _integrations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./integrations */ "./node_modules/@sentry/browser/esm/integrations/breadcrumbs.js");
/* harmony import */ var _integrations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./integrations */ "./node_modules/@sentry/browser/esm/integrations/globalhandlers.js");
/* harmony import */ var _integrations__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./integrations */ "./node_modules/@sentry/browser/esm/integrations/linkederrors.js");
/* harmony import */ var _integrations__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./integrations */ "./node_modules/@sentry/browser/esm/integrations/useragent.js");





var defaultIntegrations = [new _sentry_core__WEBPACK_IMPORTED_MODULE_0__.InboundFilters(), new _sentry_core__WEBPACK_IMPORTED_MODULE_1__.FunctionToString(), new _integrations__WEBPACK_IMPORTED_MODULE_2__.TryCatch(), new _integrations__WEBPACK_IMPORTED_MODULE_3__.Breadcrumbs(), new _integrations__WEBPACK_IMPORTED_MODULE_4__.GlobalHandlers(), new _integrations__WEBPACK_IMPORTED_MODULE_5__.LinkedErrors(), new _integrations__WEBPACK_IMPORTED_MODULE_6__.UserAgent()];
/**
 * The Sentry Browser SDK Client.
 *
 * To use this SDK, call the {@link init} function as early as possible when
 * loading the web page. To set context information or send manual events, use
 * the provided methods.
 *
 * @example
 *
 * ```
 *
 * import { init } from '@sentry/browser';
 *
 * init({
 *   dsn: '__DSN__',
 *   // ...
 * });
 * ```
 *
 * @example
 * ```
 *
 * import { configureScope } from '@sentry/browser';
 * configureScope((scope: Scope) => {
 *   scope.setExtra({ battery: 0.7 });
 *   scope.setTag({ user_mode: 'admin' });
 *   scope.setUser({ id: '4711' });
 * });
 * ```
 *
 * @example
 * ```
 *
 * import { addBreadcrumb } from '@sentry/browser';
 * addBreadcrumb({
 *   message: 'My Breadcrumb',
 *   // ...
 * });
 * ```
 *
 * @example
 *
 * ```
 *
 * import * as Sentry from '@sentry/browser';
 * Sentry.captureMessage('Hello, world!');
 * Sentry.captureException(new Error('Good bye'));
 * Sentry.captureEvent({
 *   message: 'Manual',
 *   stacktrace: [
 *     // ...
 *   ],
 * });
 * ```
 *
 * @see {@link BrowserOptions} for documentation on configuration options.
 */

function init(options) {
  if (options === void 0) {
    options = {};
  }

  if (options.defaultIntegrations === undefined) {
    options.defaultIntegrations = defaultIntegrations;
  }

  if (options.release === undefined) {
    var window_1 = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_7__.getGlobalObject)(); // This supports the variable that sentry-webpack-plugin injects

    if (window_1.SENTRY_RELEASE && window_1.SENTRY_RELEASE.id) {
      options.release = window_1.SENTRY_RELEASE.id;
    }
  }

  (0,_sentry_core__WEBPACK_IMPORTED_MODULE_8__.initAndBind)(_client__WEBPACK_IMPORTED_MODULE_9__.BrowserClient, options);
}
/**
 * Present the user with a report dialog.
 *
 * @param options Everything is optional, we try to fetch all info need from the global scope.
 */

function showReportDialog(options) {
  if (options === void 0) {
    options = {};
  }

  if (!options.eventId) {
    options.eventId = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_10__.getCurrentHub)().lastEventId();
  }

  var client = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_10__.getCurrentHub)().getClient();

  if (client) {
    client.showReportDialog(options);
  }
}
/**
 * This is the getter for lastEventId.
 *
 * @returns The last event id of a captured event.
 */

function lastEventId() {
  return (0,_sentry_core__WEBPACK_IMPORTED_MODULE_10__.getCurrentHub)().lastEventId();
}
/**
 * This function is here to be API compatible with the loader.
 * @hidden
 */

function forceLoad() {} // Noop

/**
 * This function is here to be API compatible with the loader.
 * @hidden
 */

function onLoad(callback) {
  callback();
}
/**
 * A promise that resolves when all current events have been sent.
 * If you provide a timeout and the queue takes longer to drain the promise returns false.
 *
 * @param timeout Maximum time in ms the client should wait.
 */

function flush(timeout) {
  var client = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_10__.getCurrentHub)().getClient();

  if (client) {
    return client.flush(timeout);
  }

  return _sentry_utils__WEBPACK_IMPORTED_MODULE_11__.SyncPromise.reject(false);
}
/**
 * A promise that resolves when all current events have been sent.
 * If you provide a timeout and the queue takes longer to drain the promise returns false.
 *
 * @param timeout Maximum time in ms the client should wait.
 */

function close(timeout) {
  var client = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_10__.getCurrentHub)().getClient();

  if (client) {
    return client.close(timeout);
  }

  return _sentry_utils__WEBPACK_IMPORTED_MODULE_11__.SyncPromise.reject(false);
}
/**
 * Wrap code within a try/catch block so the SDK is able to capture errors.
 *
 * @param fn A function to wrap.
 *
 * @returns The result of wrapped function call.
 */

function wrap(fn) {
  return (0,_helpers__WEBPACK_IMPORTED_MODULE_12__.wrap)(fn)(); // tslint:disable-line:no-unsafe-any
}

/***/ }),

/***/ "./node_modules/@sentry/browser/esm/tracekit.js":
/*!******************************************************!*\
  !*** ./node_modules/@sentry/browser/esm/tracekit.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "computeStackTrace": () => /* binding */ computeStackTrace
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
// tslint:disable:object-literal-sort-keys
 // global reference to slice

var UNKNOWN_FUNCTION = '?'; // Chromium based browsers: Chrome, Brave, new Opera, new Edge

var chrome = /^\s*at (?:(.*?) ?\()?((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|[-a-z]+:|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i; // gecko regex: `(?:bundle|\d+\.js)`: `bundle` is for react native, `\d+\.js` also but specifically for ram bundles because it
// generates filenames without a prefix like `file://` the filenames in the stacktrace are just 42.js
// We need this specific case for now because we want no other regex to match.

var gecko = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:file|https?|blob|chrome|webpack|resource|moz-extension).*?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js))(?::(\d+))?(?::(\d+))?\s*$/i;
var winjs = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i;
var geckoEval = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i;
var chromeEval = /\((\S*)(?::(\d+))(?::(\d+))\)/;
/** JSDoc */

function computeStackTrace(ex) {
  // tslint:disable:no-unsafe-any
  var stack = null;
  var popSize = ex && ex.framesToPop;

  try {
    // This must be tried first because Opera 10 *destroys*
    // its stacktrace property if you try to access the stack
    // property first!!
    stack = computeStackTraceFromStacktraceProp(ex);

    if (stack) {
      return popFrames(stack, popSize);
    }
  } catch (e) {// no-empty
  }

  try {
    stack = computeStackTraceFromStackProp(ex);

    if (stack) {
      return popFrames(stack, popSize);
    }
  } catch (e) {// no-empty
  }

  return {
    message: extractMessage(ex),
    name: ex && ex.name,
    stack: [],
    failed: true
  };
}
/** JSDoc */
// tslint:disable-next-line:cyclomatic-complexity

function computeStackTraceFromStackProp(ex) {
  // tslint:disable:no-conditional-assignment
  if (!ex || !ex.stack) {
    return null;
  }

  var stack = [];
  var lines = ex.stack.split('\n');
  var isEval;
  var submatch;
  var parts;
  var element;

  for (var i = 0; i < lines.length; ++i) {
    if (parts = chrome.exec(lines[i])) {
      var isNative = parts[2] && parts[2].indexOf('native') === 0; // start of line

      isEval = parts[2] && parts[2].indexOf('eval') === 0; // start of line

      if (isEval && (submatch = chromeEval.exec(parts[2]))) {
        // throw out eval line/column and use top-most line/column number
        parts[2] = submatch[1]; // url

        parts[3] = submatch[2]; // line

        parts[4] = submatch[3]; // column
      }

      element = {
        url: parts[2],
        func: parts[1] || UNKNOWN_FUNCTION,
        args: isNative ? [parts[2]] : [],
        line: parts[3] ? +parts[3] : null,
        column: parts[4] ? +parts[4] : null
      };
    } else if (parts = winjs.exec(lines[i])) {
      element = {
        url: parts[2],
        func: parts[1] || UNKNOWN_FUNCTION,
        args: [],
        line: +parts[3],
        column: parts[4] ? +parts[4] : null
      };
    } else if (parts = gecko.exec(lines[i])) {
      isEval = parts[3] && parts[3].indexOf(' > eval') > -1;

      if (isEval && (submatch = geckoEval.exec(parts[3]))) {
        // throw out eval line/column and use top-most line number
        parts[1] = parts[1] || "eval";
        parts[3] = submatch[1];
        parts[4] = submatch[2];
        parts[5] = ''; // no column when eval
      } else if (i === 0 && !parts[5] && ex.columnNumber !== void 0) {
        // FireFox uses this awesome columnNumber property for its top frame
        // Also note, Firefox's column number is 0-based and everything else expects 1-based,
        // so adding 1
        // NOTE: this hack doesn't work if top-most frame is eval
        stack[0].column = ex.columnNumber + 1;
      }

      element = {
        url: parts[3],
        func: parts[1] || UNKNOWN_FUNCTION,
        args: parts[2] ? parts[2].split(',') : [],
        line: parts[4] ? +parts[4] : null,
        column: parts[5] ? +parts[5] : null
      };
    } else {
      continue;
    }

    if (!element.func && element.line) {
      element.func = UNKNOWN_FUNCTION;
    }

    stack.push(element);
  }

  if (!stack.length) {
    return null;
  }

  return {
    message: extractMessage(ex),
    name: ex.name,
    stack: stack
  };
}
/** JSDoc */


function computeStackTraceFromStacktraceProp(ex) {
  if (!ex || !ex.stacktrace) {
    return null;
  } // Access and store the stacktrace property before doing ANYTHING
  // else to it because Opera is not very good at providing it
  // reliably in other circumstances.


  var stacktrace = ex.stacktrace;
  var opera10Regex = / line (\d+).*script (?:in )?(\S+)(?:: in function (\S+))?$/i;
  var opera11Regex = / line (\d+), column (\d+)\s*(?:in (?:<anonymous function: ([^>]+)>|([^\)]+))\((.*)\))? in (.*):\s*$/i;
  var lines = stacktrace.split('\n');
  var stack = [];
  var parts;

  for (var line = 0; line < lines.length; line += 2) {
    // tslint:disable:no-conditional-assignment
    var element = null;

    if (parts = opera10Regex.exec(lines[line])) {
      element = {
        url: parts[2],
        func: parts[3],
        args: [],
        line: +parts[1],
        column: null
      };
    } else if (parts = opera11Regex.exec(lines[line])) {
      element = {
        url: parts[6],
        func: parts[3] || parts[4],
        args: parts[5] ? parts[5].split(',') : [],
        line: +parts[1],
        column: +parts[2]
      };
    }

    if (element) {
      if (!element.func && element.line) {
        element.func = UNKNOWN_FUNCTION;
      }

      stack.push(element);
    }
  }

  if (!stack.length) {
    return null;
  }

  return {
    message: extractMessage(ex),
    name: ex.name,
    stack: stack
  };
}
/** Remove N number of frames from the stack */


function popFrames(stacktrace, popSize) {
  try {
    return tslib__WEBPACK_IMPORTED_MODULE_0__.__assign({}, stacktrace, {
      stack: stacktrace.stack.slice(popSize)
    });
  } catch (e) {
    return stacktrace;
  }
}
/**
 * There are cases where stacktrace.message is an Event object
 * https://github.com/getsentry/sentry-javascript/issues/1949
 * In this specific case we try to extract stacktrace.message.error.message
 */


function extractMessage(ex) {
  var message = ex && ex.message;

  if (!message) {
    return 'No error message';
  }

  if (message.error && typeof message.error.message === 'string') {
    return message.error.message;
  }

  return message;
}

/***/ }),

/***/ "./node_modules/@sentry/browser/esm/transports/base.js":
/*!*************************************************************!*\
  !*** ./node_modules/@sentry/browser/esm/transports/base.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BaseTransport": () => /* binding */ BaseTransport
/* harmony export */ });
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/core */ "./node_modules/@sentry/core/esm/api.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/promisebuffer.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/error.js");


/** Base Transport class implementation */

var BaseTransport =
/** @class */
function () {
  function BaseTransport(options) {
    this.options = options;
    /** A simple buffer holding all requests. */

    this._buffer = new _sentry_utils__WEBPACK_IMPORTED_MODULE_0__.PromiseBuffer(30);
    this.url = new _sentry_core__WEBPACK_IMPORTED_MODULE_1__.API(this.options.dsn).getStoreEndpointWithUrlEncodedAuth();
  }
  /**
   * @inheritDoc
   */


  BaseTransport.prototype.sendEvent = function (_) {
    throw new _sentry_utils__WEBPACK_IMPORTED_MODULE_2__.SentryError('Transport Class has to implement `sendEvent` method');
  };
  /**
   * @inheritDoc
   */


  BaseTransport.prototype.close = function (timeout) {
    return this._buffer.drain(timeout);
  };

  return BaseTransport;
}();



/***/ }),

/***/ "./node_modules/@sentry/browser/esm/transports/fetch.js":
/*!**************************************************************!*\
  !*** ./node_modules/@sentry/browser/esm/transports/fetch.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FetchTransport": () => /* binding */ FetchTransport
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _sentry_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sentry/types */ "./node_modules/@sentry/types/esm/status.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/misc.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/supports.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/syncpromise.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/logger.js");
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./base */ "./node_modules/@sentry/browser/esm/transports/base.js");




var global = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.getGlobalObject)();
/** `fetch` based transport */

var FetchTransport =
/** @class */
function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__.__extends(FetchTransport, _super);

  function FetchTransport() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    /** Locks transport after receiving 429 response */


    _this._disabledUntil = new Date(Date.now());
    return _this;
  }
  /**
   * @inheritDoc
   */


  FetchTransport.prototype.sendEvent = function (event) {
    var _this = this;

    if (new Date(Date.now()) < this._disabledUntil) {
      return Promise.reject({
        event: event,
        reason: "Transport locked till " + this._disabledUntil + " due to too many requests.",
        status: 429
      });
    }

    var defaultOptions = {
      body: JSON.stringify(event),
      method: 'POST',
      // Despite all stars in the sky saying that Edge supports old draft syntax, aka 'never', 'always', 'origin' and 'default
      // https://caniuse.com/#feat=referrer-policy
      // It doesn't. And it throw exception instead of ignoring this parameter...
      // REF: https://github.com/getsentry/raven-js/issues/1233
      referrerPolicy: (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_2__.supportsReferrerPolicy)() ? 'origin' : ''
    };

    if (this.options.headers !== undefined) {
      defaultOptions.headers = this.options.headers;
    }

    return this._buffer.add(new _sentry_utils__WEBPACK_IMPORTED_MODULE_3__.SyncPromise(function (resolve, reject) {
      global.fetch(_this.url, defaultOptions).then(function (response) {
        var status = _sentry_types__WEBPACK_IMPORTED_MODULE_4__.Status.fromHttpCode(response.status);

        if (status === _sentry_types__WEBPACK_IMPORTED_MODULE_4__.Status.Success) {
          resolve({
            status: status
          });
          return;
        }

        if (status === _sentry_types__WEBPACK_IMPORTED_MODULE_4__.Status.RateLimit) {
          var now = Date.now();
          _this._disabledUntil = new Date(now + (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.parseRetryAfterHeader)(now, response.headers.get('Retry-After')));
          _sentry_utils__WEBPACK_IMPORTED_MODULE_5__.logger.warn("Too many requests, backing off till: " + _this._disabledUntil);
        }

        reject(response);
      }).catch(reject);
    }));
  };

  return FetchTransport;
}(_base__WEBPACK_IMPORTED_MODULE_6__.BaseTransport);



/***/ }),

/***/ "./node_modules/@sentry/browser/esm/transports/xhr.js":
/*!************************************************************!*\
  !*** ./node_modules/@sentry/browser/esm/transports/xhr.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "XHRTransport": () => /* binding */ XHRTransport
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _sentry_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sentry/types */ "./node_modules/@sentry/types/esm/status.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/syncpromise.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/misc.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/logger.js");
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./base */ "./node_modules/@sentry/browser/esm/transports/base.js");




/** `XHR` based transport */

var XHRTransport =
/** @class */
function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__.__extends(XHRTransport, _super);

  function XHRTransport() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    /** Locks transport after receiving 429 response */


    _this._disabledUntil = new Date(Date.now());
    return _this;
  }
  /**
   * @inheritDoc
   */


  XHRTransport.prototype.sendEvent = function (event) {
    var _this = this;

    if (new Date(Date.now()) < this._disabledUntil) {
      return Promise.reject({
        event: event,
        reason: "Transport locked till " + this._disabledUntil + " due to too many requests.",
        status: 429
      });
    }

    return this._buffer.add(new _sentry_utils__WEBPACK_IMPORTED_MODULE_1__.SyncPromise(function (resolve, reject) {
      var request = new XMLHttpRequest();

      request.onreadystatechange = function () {
        if (request.readyState !== 4) {
          return;
        }

        var status = _sentry_types__WEBPACK_IMPORTED_MODULE_2__.Status.fromHttpCode(request.status);

        if (status === _sentry_types__WEBPACK_IMPORTED_MODULE_2__.Status.Success) {
          resolve({
            status: status
          });
          return;
        }

        if (status === _sentry_types__WEBPACK_IMPORTED_MODULE_2__.Status.RateLimit) {
          var now = Date.now();
          _this._disabledUntil = new Date(now + (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_3__.parseRetryAfterHeader)(now, request.getResponseHeader('Retry-After')));
          _sentry_utils__WEBPACK_IMPORTED_MODULE_4__.logger.warn("Too many requests, backing off till: " + _this._disabledUntil);
        }

        reject(request);
      };

      request.open('POST', _this.url);

      for (var header in _this.options.headers) {
        if (_this.options.headers.hasOwnProperty(header)) {
          request.setRequestHeader(header, _this.options.headers[header]);
        }
      }

      request.send(JSON.stringify(event));
    }));
  };

  return XHRTransport;
}(_base__WEBPACK_IMPORTED_MODULE_5__.BaseTransport);



/***/ }),

/***/ "./node_modules/@sentry/browser/esm/version.js":
/*!*****************************************************!*\
  !*** ./node_modules/@sentry/browser/esm/version.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SDK_NAME": () => /* binding */ SDK_NAME,
/* harmony export */   "SDK_VERSION": () => /* binding */ SDK_VERSION
/* harmony export */ });
var SDK_NAME = 'sentry.javascript.browser';
var SDK_VERSION = '5.11.0';

/***/ }),

/***/ "./node_modules/@sentry/core/esm/api.js":
/*!**********************************************!*\
  !*** ./node_modules/@sentry/core/esm/api.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "API": () => /* binding */ API
/* harmony export */ });
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/dsn.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/object.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/misc.js");

var SENTRY_API_VERSION = '7';
/** Helper class to provide urls to different Sentry endpoints. */

var API =
/** @class */
function () {
  /** Create a new instance of API */
  function API(dsn) {
    this.dsn = dsn;
    this._dsnObject = new _sentry_utils__WEBPACK_IMPORTED_MODULE_0__.Dsn(dsn);
  }
  /** Returns the Dsn object. */


  API.prototype.getDsn = function () {
    return this._dsnObject;
  };
  /** Returns a string with auth headers in the url to the store endpoint. */


  API.prototype.getStoreEndpoint = function () {
    return "" + this._getBaseUrl() + this.getStoreEndpointPath();
  };
  /** Returns the store endpoint with auth added in url encoded. */


  API.prototype.getStoreEndpointWithUrlEncodedAuth = function () {
    var dsn = this._dsnObject;
    var auth = {
      sentry_key: dsn.user,
      sentry_version: SENTRY_API_VERSION
    }; // Auth is intentionally sent as part of query string (NOT as custom HTTP header)
    // to avoid preflight CORS requests

    return this.getStoreEndpoint() + "?" + (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.urlEncode)(auth);
  };
  /** Returns the base path of the url including the port. */


  API.prototype._getBaseUrl = function () {
    var dsn = this._dsnObject;
    var protocol = dsn.protocol ? dsn.protocol + ":" : '';
    var port = dsn.port ? ":" + dsn.port : '';
    return protocol + "//" + dsn.host + port;
  };
  /** Returns only the path component for the store endpoint. */


  API.prototype.getStoreEndpointPath = function () {
    var dsn = this._dsnObject;
    return (dsn.path ? "/" + dsn.path : '') + "/api/" + dsn.projectId + "/store/";
  };
  /** Returns an object that can be used in request headers. */


  API.prototype.getRequestHeaders = function (clientName, clientVersion) {
    var dsn = this._dsnObject;
    var header = ["Sentry sentry_version=" + SENTRY_API_VERSION];
    header.push("sentry_timestamp=" + (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_2__.timestampWithMs)()); // TODO: This can be removed

    header.push("sentry_client=" + clientName + "/" + clientVersion);
    header.push("sentry_key=" + dsn.user);

    if (dsn.pass) {
      header.push("sentry_secret=" + dsn.pass);
    }

    return {
      'Content-Type': 'application/json',
      'X-Sentry-Auth': header.join(', ')
    };
  };
  /** Returns the url to the report dialog endpoint. */


  API.prototype.getReportDialogEndpoint = function (dialogOptions) {
    if (dialogOptions === void 0) {
      dialogOptions = {};
    }

    var dsn = this._dsnObject;
    var endpoint = "" + this._getBaseUrl() + (dsn.path ? "/" + dsn.path : '') + "/api/embed/error-page/";
    var encodedOptions = [];
    encodedOptions.push("dsn=" + dsn.toString());

    for (var key in dialogOptions) {
      if (key === 'user') {
        if (!dialogOptions.user) {
          continue;
        }

        if (dialogOptions.user.name) {
          encodedOptions.push("name=" + encodeURIComponent(dialogOptions.user.name));
        }

        if (dialogOptions.user.email) {
          encodedOptions.push("email=" + encodeURIComponent(dialogOptions.user.email));
        }
      } else {
        encodedOptions.push(encodeURIComponent(key) + "=" + encodeURIComponent(dialogOptions[key]));
      }
    }

    if (encodedOptions.length) {
      return endpoint + "?" + encodedOptions.join('&');
    }

    return endpoint;
  };

  return API;
}();



/***/ }),

/***/ "./node_modules/@sentry/core/esm/basebackend.js":
/*!******************************************************!*\
  !*** ./node_modules/@sentry/core/esm/basebackend.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BaseBackend": () => /* binding */ BaseBackend
/* harmony export */ });
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/logger.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/error.js");
/* harmony import */ var _transports_noop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./transports/noop */ "./node_modules/@sentry/core/esm/transports/noop.js");


/**
 * This is the base implemention of a Backend.
 * @hidden
 */

var BaseBackend =
/** @class */
function () {
  /** Creates a new backend instance. */
  function BaseBackend(options) {
    this._options = options;

    if (!this._options.dsn) {
      _sentry_utils__WEBPACK_IMPORTED_MODULE_0__.logger.warn('No DSN provided, backend will not do anything.');
    }

    this._transport = this._setupTransport();
  }
  /**
   * Sets up the transport so it can be used later to send requests.
   */


  BaseBackend.prototype._setupTransport = function () {
    return new _transports_noop__WEBPACK_IMPORTED_MODULE_1__.NoopTransport();
  };
  /**
   * @inheritDoc
   */


  BaseBackend.prototype.eventFromException = function (_exception, _hint) {
    throw new _sentry_utils__WEBPACK_IMPORTED_MODULE_2__.SentryError('Backend has to implement `eventFromException` method');
  };
  /**
   * @inheritDoc
   */


  BaseBackend.prototype.eventFromMessage = function (_message, _level, _hint) {
    throw new _sentry_utils__WEBPACK_IMPORTED_MODULE_2__.SentryError('Backend has to implement `eventFromMessage` method');
  };
  /**
   * @inheritDoc
   */


  BaseBackend.prototype.sendEvent = function (event) {
    this._transport.sendEvent(event).then(null, function (reason) {
      _sentry_utils__WEBPACK_IMPORTED_MODULE_0__.logger.error("Error while sending event: " + reason);
    });
  };
  /**
   * @inheritDoc
   */


  BaseBackend.prototype.getTransport = function () {
    return this._transport;
  };

  return BaseBackend;
}();



/***/ }),

/***/ "./node_modules/@sentry/core/esm/baseclient.js":
/*!*****************************************************!*\
  !*** ./node_modules/@sentry/core/esm/baseclient.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BaseClient": () => /* binding */ BaseClient
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/dsn.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/logger.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/is.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/syncpromise.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/string.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/misc.js");
/* harmony import */ var _integration__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./integration */ "./node_modules/@sentry/core/esm/integration.js");



/**
 * Base implementation for all JavaScript SDK clients.
 *
 * Call the constructor with the corresponding backend constructor and options
 * specific to the client subclass. To access these options later, use
 * {@link Client.getOptions}. Also, the Backend instance is available via
 * {@link Client.getBackend}.
 *
 * If a Dsn is specified in the options, it will be parsed and stored. Use
 * {@link Client.getDsn} to retrieve the Dsn at any moment. In case the Dsn is
 * invalid, the constructor will throw a {@link SentryException}. Note that
 * without a valid Dsn, the SDK will not send any events to Sentry.
 *
 * Before sending an event via the backend, it is passed through
 * {@link BaseClient.prepareEvent} to add SDK information and scope data
 * (breadcrumbs and context). To add more custom information, override this
 * method and extend the resulting prepared event.
 *
 * To issue automatically created events (e.g. via instrumentation), use
 * {@link Client.captureEvent}. It will prepare the event and pass it through
 * the callback lifecycle. To issue auto-breadcrumbs, use
 * {@link Client.addBreadcrumb}.
 *
 * @example
 * class NodeClient extends BaseClient<NodeBackend, NodeOptions> {
 *   public constructor(options: NodeOptions) {
 *     super(NodeBackend, options);
 *   }
 *
 *   // ...
 * }
 */

var BaseClient =
/** @class */
function () {
  /**
   * Initializes this client instance.
   *
   * @param backendClass A constructor function to create the backend.
   * @param options Options for the client.
   */
  function BaseClient(backendClass, options) {
    /** Array of used integrations. */
    this._integrations = {};
    /** Is the client still processing a call? */

    this._processing = false;
    this._backend = new backendClass(options);
    this._options = options;

    if (options.dsn) {
      this._dsn = new _sentry_utils__WEBPACK_IMPORTED_MODULE_1__.Dsn(options.dsn);
    }

    if (this._isEnabled()) {
      this._integrations = (0,_integration__WEBPACK_IMPORTED_MODULE_2__.setupIntegrations)(this._options);
    }
  }
  /**
   * @inheritDoc
   */


  BaseClient.prototype.captureException = function (exception, hint, scope) {
    var _this = this;

    var eventId = hint && hint.event_id;
    this._processing = true;

    this._getBackend().eventFromException(exception, hint).then(function (event) {
      return _this._processEvent(event, hint, scope);
    }).then(function (finalEvent) {
      // We need to check for finalEvent in case beforeSend returned null
      eventId = finalEvent && finalEvent.event_id;
      _this._processing = false;
    }).then(null, function (reason) {
      _sentry_utils__WEBPACK_IMPORTED_MODULE_3__.logger.error(reason);
      _this._processing = false;
    });

    return eventId;
  };
  /**
   * @inheritDoc
   */


  BaseClient.prototype.captureMessage = function (message, level, hint, scope) {
    var _this = this;

    var eventId = hint && hint.event_id;
    this._processing = true;
    var promisedEvent = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_4__.isPrimitive)(message) ? this._getBackend().eventFromMessage("" + message, level, hint) : this._getBackend().eventFromException(message, hint);
    promisedEvent.then(function (event) {
      return _this._processEvent(event, hint, scope);
    }).then(function (finalEvent) {
      // We need to check for finalEvent in case beforeSend returned null
      eventId = finalEvent && finalEvent.event_id;
      _this._processing = false;
    }).then(null, function (reason) {
      _sentry_utils__WEBPACK_IMPORTED_MODULE_3__.logger.error(reason);
      _this._processing = false;
    });
    return eventId;
  };
  /**
   * @inheritDoc
   */


  BaseClient.prototype.captureEvent = function (event, hint, scope) {
    var _this = this;

    var eventId = hint && hint.event_id;
    this._processing = true;

    this._processEvent(event, hint, scope).then(function (finalEvent) {
      // We need to check for finalEvent in case beforeSend returned null
      eventId = finalEvent && finalEvent.event_id;
      _this._processing = false;
    }).then(null, function (reason) {
      _sentry_utils__WEBPACK_IMPORTED_MODULE_3__.logger.error(reason);
      _this._processing = false;
    });

    return eventId;
  };
  /**
   * @inheritDoc
   */


  BaseClient.prototype.getDsn = function () {
    return this._dsn;
  };
  /**
   * @inheritDoc
   */


  BaseClient.prototype.getOptions = function () {
    return this._options;
  };
  /**
   * @inheritDoc
   */


  BaseClient.prototype.flush = function (timeout) {
    var _this = this;

    return this._isClientProcessing(timeout).then(function (status) {
      clearInterval(status.interval);
      return _this._getBackend().getTransport().close(timeout).then(function (transportFlushed) {
        return status.ready && transportFlushed;
      });
    });
  };
  /**
   * @inheritDoc
   */


  BaseClient.prototype.close = function (timeout) {
    var _this = this;

    return this.flush(timeout).then(function (result) {
      _this.getOptions().enabled = false;
      return result;
    });
  };
  /**
   * @inheritDoc
   */


  BaseClient.prototype.getIntegrations = function () {
    return this._integrations || {};
  };
  /**
   * @inheritDoc
   */


  BaseClient.prototype.getIntegration = function (integration) {
    try {
      return this._integrations[integration.id] || null;
    } catch (_oO) {
      _sentry_utils__WEBPACK_IMPORTED_MODULE_3__.logger.warn("Cannot retrieve integration " + integration.id + " from the current Client");
      return null;
    }
  };
  /** Waits for the client to be done with processing. */


  BaseClient.prototype._isClientProcessing = function (timeout) {
    var _this = this;

    return new _sentry_utils__WEBPACK_IMPORTED_MODULE_5__.SyncPromise(function (resolve) {
      var ticked = 0;
      var tick = 1;
      var interval = 0;
      clearInterval(interval);
      interval = setInterval(function () {
        if (!_this._processing) {
          resolve({
            interval: interval,
            ready: true
          });
        } else {
          ticked += tick;

          if (timeout && ticked >= timeout) {
            resolve({
              interval: interval,
              ready: false
            });
          }
        }
      }, tick);
    });
  };
  /** Returns the current backend. */


  BaseClient.prototype._getBackend = function () {
    return this._backend;
  };
  /** Determines whether this SDK is enabled and a valid Dsn is present. */


  BaseClient.prototype._isEnabled = function () {
    return this.getOptions().enabled !== false && this._dsn !== undefined;
  };
  /**
   * Adds common information to events.
   *
   * The information includes release and environment from `options`,
   * breadcrumbs and context (extra, tags and user) from the scope.
   *
   * Information that is already present in the event is never overwritten. For
   * nested objects, such as the context, keys are merged.
   *
   * @param event The original event.
   * @param hint May contain additional informartion about the original exception.
   * @param scope A scope containing event metadata.
   * @returns A new event with more information.
   */


  BaseClient.prototype._prepareEvent = function (event, scope, hint) {
    var _a = this.getOptions(),
        environment = _a.environment,
        release = _a.release,
        dist = _a.dist,
        _b = _a.maxValueLength,
        maxValueLength = _b === void 0 ? 250 : _b;

    var prepared = tslib__WEBPACK_IMPORTED_MODULE_0__.__assign({}, event);

    if (prepared.environment === undefined && environment !== undefined) {
      prepared.environment = environment;
    }

    if (prepared.release === undefined && release !== undefined) {
      prepared.release = release;
    }

    if (prepared.dist === undefined && dist !== undefined) {
      prepared.dist = dist;
    }

    if (prepared.message) {
      prepared.message = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_6__.truncate)(prepared.message, maxValueLength);
    }

    var exception = prepared.exception && prepared.exception.values && prepared.exception.values[0];

    if (exception && exception.value) {
      exception.value = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_6__.truncate)(exception.value, maxValueLength);
    }

    var request = prepared.request;

    if (request && request.url) {
      request.url = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_6__.truncate)(request.url, maxValueLength);
    }

    if (prepared.event_id === undefined) {
      prepared.event_id = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_7__.uuid4)();
    }

    this._addIntegrations(prepared.sdk); // We prepare the result here with a resolved Event.


    var result = _sentry_utils__WEBPACK_IMPORTED_MODULE_5__.SyncPromise.resolve(prepared); // This should be the last thing called, since we want that
    // {@link Hub.addEventProcessor} gets the finished prepared event.

    if (scope) {
      // In case we have a hub we reassign it.
      result = scope.applyToEvent(prepared, hint);
    }

    return result;
  };
  /**
   * This function adds all used integrations to the SDK info in the event.
   * @param sdkInfo The sdkInfo of the event that will be filled with all integrations.
   */


  BaseClient.prototype._addIntegrations = function (sdkInfo) {
    var integrationsArray = Object.keys(this._integrations);

    if (sdkInfo && integrationsArray.length > 0) {
      sdkInfo.integrations = integrationsArray;
    }
  };
  /**
   * Processes an event (either error or message) and sends it to Sentry.
   *
   * This also adds breadcrumbs and context information to the event. However,
   * platform specific meta data (such as the User's IP address) must be added
   * by the SDK implementor.
   *
   *
   * @param event The event to send to Sentry.
   * @param hint May contain additional informartion about the original exception.
   * @param scope A scope containing event metadata.
   * @returns A SyncPromise that resolves with the event or rejects in case event was/will not be send.
   */


  BaseClient.prototype._processEvent = function (event, hint, scope) {
    var _this = this;

    var _a = this.getOptions(),
        beforeSend = _a.beforeSend,
        sampleRate = _a.sampleRate;

    if (!this._isEnabled()) {
      return _sentry_utils__WEBPACK_IMPORTED_MODULE_5__.SyncPromise.reject('SDK not enabled, will not send event.');
    } // 1.0 === 100% events are sent
    // 0.0 === 0% events are sent


    if (typeof sampleRate === 'number' && Math.random() > sampleRate) {
      return _sentry_utils__WEBPACK_IMPORTED_MODULE_5__.SyncPromise.reject('This event has been sampled, will not send event.');
    }

    return new _sentry_utils__WEBPACK_IMPORTED_MODULE_5__.SyncPromise(function (resolve, reject) {
      _this._prepareEvent(event, scope, hint).then(function (prepared) {
        if (prepared === null) {
          reject('An event processor returned null, will not send event.');
          return;
        }

        var finalEvent = prepared;

        try {
          var isInternalException = hint && hint.data && hint.data.__sentry__ === true;

          if (isInternalException || !beforeSend) {
            _this._getBackend().sendEvent(finalEvent);

            resolve(finalEvent);
            return;
          }

          var beforeSendResult = beforeSend(prepared, hint); // tslint:disable-next-line:strict-type-predicates

          if (typeof beforeSendResult === 'undefined') {
            _sentry_utils__WEBPACK_IMPORTED_MODULE_3__.logger.error('`beforeSend` method has to return `null` or a valid event.');
          } else if ((0,_sentry_utils__WEBPACK_IMPORTED_MODULE_4__.isThenable)(beforeSendResult)) {
            _this._handleAsyncBeforeSend(beforeSendResult, resolve, reject);
          } else {
            finalEvent = beforeSendResult;

            if (finalEvent === null) {
              _sentry_utils__WEBPACK_IMPORTED_MODULE_3__.logger.log('`beforeSend` returned `null`, will not send event.');
              resolve(null);
              return;
            } // From here on we are really async


            _this._getBackend().sendEvent(finalEvent);

            resolve(finalEvent);
          }
        } catch (exception) {
          _this.captureException(exception, {
            data: {
              __sentry__: true
            },
            originalException: exception
          });

          reject('`beforeSend` threw an error, will not send event.');
        }
      }).then(null, function () {
        reject('`beforeSend` threw an error, will not send event.');
      });
    });
  };
  /**
   * Resolves before send Promise and calls resolve/reject on parent SyncPromise.
   */


  BaseClient.prototype._handleAsyncBeforeSend = function (beforeSend, resolve, reject) {
    var _this = this;

    beforeSend.then(function (processedEvent) {
      if (processedEvent === null) {
        reject('`beforeSend` returned `null`, will not send event.');
        return;
      } // From here on we are really async


      _this._getBackend().sendEvent(processedEvent);

      resolve(processedEvent);
    }).then(null, function (e) {
      reject("beforeSend rejected with " + e);
    });
  };

  return BaseClient;
}();



/***/ }),

/***/ "./node_modules/@sentry/core/esm/integration.js":
/*!******************************************************!*\
  !*** ./node_modules/@sentry/core/esm/integration.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setupIntegrations": () => /* binding */ setupIntegrations
/* harmony export */ });
/* unused harmony exports installedIntegrations, getIntegrationsToSetup, setupIntegration */
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _sentry_hub__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/hub */ "./node_modules/@sentry/hub/esm/scope.js");
/* harmony import */ var _sentry_hub__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sentry/hub */ "./node_modules/@sentry/hub/esm/hub.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/logger.js");



var installedIntegrations = [];
/** Gets integration to install */

function getIntegrationsToSetup(options) {
  var defaultIntegrations = options.defaultIntegrations && tslib__WEBPACK_IMPORTED_MODULE_0__.__spread(options.defaultIntegrations) || [];
  var userIntegrations = options.integrations;
  var integrations = [];

  if (Array.isArray(userIntegrations)) {
    var userIntegrationsNames_1 = userIntegrations.map(function (i) {
      return i.name;
    });
    var pickedIntegrationsNames_1 = []; // Leave only unique default integrations, that were not overridden with provided user integrations

    defaultIntegrations.forEach(function (defaultIntegration) {
      if (userIntegrationsNames_1.indexOf(defaultIntegration.name) === -1 && pickedIntegrationsNames_1.indexOf(defaultIntegration.name) === -1) {
        integrations.push(defaultIntegration);
        pickedIntegrationsNames_1.push(defaultIntegration.name);
      }
    }); // Don't add same user integration twice

    userIntegrations.forEach(function (userIntegration) {
      if (pickedIntegrationsNames_1.indexOf(userIntegration.name) === -1) {
        integrations.push(userIntegration);
        pickedIntegrationsNames_1.push(userIntegration.name);
      }
    });
  } else if (typeof userIntegrations === 'function') {
    integrations = userIntegrations(defaultIntegrations);
    integrations = Array.isArray(integrations) ? integrations : [integrations];
  } else {
    integrations = tslib__WEBPACK_IMPORTED_MODULE_0__.__spread(defaultIntegrations);
  } // Make sure that if present, `Debug` integration will always run last


  var integrationsNames = integrations.map(function (i) {
    return i.name;
  });
  var alwaysLastToRun = 'Debug';

  if (integrationsNames.indexOf(alwaysLastToRun) !== -1) {
    integrations.push.apply(integrations, tslib__WEBPACK_IMPORTED_MODULE_0__.__spread(integrations.splice(integrationsNames.indexOf(alwaysLastToRun), 1)));
  }

  return integrations;
}
/** Setup given integration */

function setupIntegration(integration) {
  if (installedIntegrations.indexOf(integration.name) !== -1) {
    return;
  }

  integration.setupOnce(_sentry_hub__WEBPACK_IMPORTED_MODULE_1__.addGlobalEventProcessor, _sentry_hub__WEBPACK_IMPORTED_MODULE_2__.getCurrentHub);
  installedIntegrations.push(integration.name);
  _sentry_utils__WEBPACK_IMPORTED_MODULE_3__.logger.log("Integration installed: " + integration.name);
}
/**
 * Given a list of integration instances this installs them all. When `withDefaults` is set to `true` then all default
 * integrations are added unless they were already provided before.
 * @param integrations array of integration instances
 * @param withDefault should enable default integrations
 */

function setupIntegrations(options) {
  var integrations = {};
  getIntegrationsToSetup(options).forEach(function (integration) {
    integrations[integration.name] = integration;
    setupIntegration(integration);
  });
  return integrations;
}

/***/ }),

/***/ "./node_modules/@sentry/core/esm/integrations/functiontostring.js":
/*!************************************************************************!*\
  !*** ./node_modules/@sentry/core/esm/integrations/functiontostring.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FunctionToString": () => /* binding */ FunctionToString
/* harmony export */ });
var originalFunctionToString;
/** Patch toString calls to return proper name for wrapped functions */

var FunctionToString =
/** @class */
function () {
  function FunctionToString() {
    /**
     * @inheritDoc
     */
    this.name = FunctionToString.id;
  }
  /**
   * @inheritDoc
   */


  FunctionToString.prototype.setupOnce = function () {
    originalFunctionToString = Function.prototype.toString;

    Function.prototype.toString = function () {
      var args = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }

      var context = this.__sentry_original__ || this; // tslint:disable-next-line:no-unsafe-any

      return originalFunctionToString.apply(context, args);
    };
  };
  /**
   * @inheritDoc
   */


  FunctionToString.id = 'FunctionToString';
  return FunctionToString;
}();



/***/ }),

/***/ "./node_modules/@sentry/core/esm/integrations/inboundfilters.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@sentry/core/esm/integrations/inboundfilters.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InboundFilters": () => /* binding */ InboundFilters
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _sentry_hub__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/hub */ "./node_modules/@sentry/hub/esm/scope.js");
/* harmony import */ var _sentry_hub__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sentry/hub */ "./node_modules/@sentry/hub/esm/hub.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/logger.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/misc.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/string.js");


 // "Script error." is hard coded into browsers for errors that it can't read.
// this is the result of a script being pulled in from an external domain and CORS.

var DEFAULT_IGNORE_ERRORS = [/^Script error\.?$/, /^Javascript error: Script error\.? on line 0$/];
/** Inbound filters configurable by the user */

var InboundFilters =
/** @class */
function () {
  function InboundFilters(_options) {
    if (_options === void 0) {
      _options = {};
    }

    this._options = _options;
    /**
     * @inheritDoc
     */

    this.name = InboundFilters.id;
  }
  /**
   * @inheritDoc
   */


  InboundFilters.prototype.setupOnce = function () {
    (0,_sentry_hub__WEBPACK_IMPORTED_MODULE_1__.addGlobalEventProcessor)(function (event) {
      var hub = (0,_sentry_hub__WEBPACK_IMPORTED_MODULE_2__.getCurrentHub)();

      if (!hub) {
        return event;
      }

      var self = hub.getIntegration(InboundFilters);

      if (self) {
        var client = hub.getClient();
        var clientOptions = client ? client.getOptions() : {};

        var options = self._mergeOptions(clientOptions);

        if (self._shouldDropEvent(event, options)) {
          return null;
        }
      }

      return event;
    });
  };
  /** JSDoc */


  InboundFilters.prototype._shouldDropEvent = function (event, options) {
    if (this._isSentryError(event, options)) {
      _sentry_utils__WEBPACK_IMPORTED_MODULE_3__.logger.warn("Event dropped due to being internal Sentry Error.\nEvent: " + (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_4__.getEventDescription)(event));
      return true;
    }

    if (this._isIgnoredError(event, options)) {
      _sentry_utils__WEBPACK_IMPORTED_MODULE_3__.logger.warn("Event dropped due to being matched by `ignoreErrors` option.\nEvent: " + (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_4__.getEventDescription)(event));
      return true;
    }

    if (this._isBlacklistedUrl(event, options)) {
      _sentry_utils__WEBPACK_IMPORTED_MODULE_3__.logger.warn("Event dropped due to being matched by `blacklistUrls` option.\nEvent: " + (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_4__.getEventDescription)(event) + ".\nUrl: " + this._getEventFilterUrl(event));
      return true;
    }

    if (!this._isWhitelistedUrl(event, options)) {
      _sentry_utils__WEBPACK_IMPORTED_MODULE_3__.logger.warn("Event dropped due to not being matched by `whitelistUrls` option.\nEvent: " + (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_4__.getEventDescription)(event) + ".\nUrl: " + this._getEventFilterUrl(event));
      return true;
    }

    return false;
  };
  /** JSDoc */


  InboundFilters.prototype._isSentryError = function (event, options) {
    if (options === void 0) {
      options = {};
    }

    if (!options.ignoreInternal) {
      return false;
    }

    try {
      return event && event.exception && event.exception.values && event.exception.values[0] && event.exception.values[0].type === 'SentryError' || false;
    } catch (_oO) {
      return false;
    }
  };
  /** JSDoc */


  InboundFilters.prototype._isIgnoredError = function (event, options) {
    if (options === void 0) {
      options = {};
    }

    if (!options.ignoreErrors || !options.ignoreErrors.length) {
      return false;
    }

    return this._getPossibleEventMessages(event).some(function (message) {
      // Not sure why TypeScript complains here...
      return options.ignoreErrors.some(function (pattern) {
        return (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_5__.isMatchingPattern)(message, pattern);
      });
    });
  };
  /** JSDoc */


  InboundFilters.prototype._isBlacklistedUrl = function (event, options) {
    if (options === void 0) {
      options = {};
    } // TODO: Use Glob instead?


    if (!options.blacklistUrls || !options.blacklistUrls.length) {
      return false;
    }

    var url = this._getEventFilterUrl(event);

    return !url ? false : options.blacklistUrls.some(function (pattern) {
      return (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_5__.isMatchingPattern)(url, pattern);
    });
  };
  /** JSDoc */


  InboundFilters.prototype._isWhitelistedUrl = function (event, options) {
    if (options === void 0) {
      options = {};
    } // TODO: Use Glob instead?


    if (!options.whitelistUrls || !options.whitelistUrls.length) {
      return true;
    }

    var url = this._getEventFilterUrl(event);

    return !url ? true : options.whitelistUrls.some(function (pattern) {
      return (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_5__.isMatchingPattern)(url, pattern);
    });
  };
  /** JSDoc */


  InboundFilters.prototype._mergeOptions = function (clientOptions) {
    if (clientOptions === void 0) {
      clientOptions = {};
    }

    return {
      blacklistUrls: tslib__WEBPACK_IMPORTED_MODULE_0__.__spread(this._options.blacklistUrls || [], clientOptions.blacklistUrls || []),
      ignoreErrors: tslib__WEBPACK_IMPORTED_MODULE_0__.__spread(this._options.ignoreErrors || [], clientOptions.ignoreErrors || [], DEFAULT_IGNORE_ERRORS),
      ignoreInternal: typeof this._options.ignoreInternal !== 'undefined' ? this._options.ignoreInternal : true,
      whitelistUrls: tslib__WEBPACK_IMPORTED_MODULE_0__.__spread(this._options.whitelistUrls || [], clientOptions.whitelistUrls || [])
    };
  };
  /** JSDoc */


  InboundFilters.prototype._getPossibleEventMessages = function (event) {
    if (event.message) {
      return [event.message];
    }

    if (event.exception) {
      try {
        var _a = event.exception.values && event.exception.values[0] || {},
            _b = _a.type,
            type = _b === void 0 ? '' : _b,
            _c = _a.value,
            value = _c === void 0 ? '' : _c;

        return ["" + value, type + ": " + value];
      } catch (oO) {
        _sentry_utils__WEBPACK_IMPORTED_MODULE_3__.logger.error("Cannot extract message for event " + (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_4__.getEventDescription)(event));
        return [];
      }
    }

    return [];
  };
  /** JSDoc */


  InboundFilters.prototype._getEventFilterUrl = function (event) {
    try {
      if (event.stacktrace) {
        var frames_1 = event.stacktrace.frames;
        return frames_1 && frames_1[frames_1.length - 1].filename || null;
      }

      if (event.exception) {
        var frames_2 = event.exception.values && event.exception.values[0].stacktrace && event.exception.values[0].stacktrace.frames;
        return frames_2 && frames_2[frames_2.length - 1].filename || null;
      }

      return null;
    } catch (oO) {
      _sentry_utils__WEBPACK_IMPORTED_MODULE_3__.logger.error("Cannot extract url for event " + (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_4__.getEventDescription)(event));
      return null;
    }
  };
  /**
   * @inheritDoc
   */


  InboundFilters.id = 'InboundFilters';
  return InboundFilters;
}();



/***/ }),

/***/ "./node_modules/@sentry/core/esm/sdk.js":
/*!**********************************************!*\
  !*** ./node_modules/@sentry/core/esm/sdk.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "initAndBind": () => /* binding */ initAndBind
/* harmony export */ });
/* harmony import */ var _sentry_hub__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/hub */ "./node_modules/@sentry/hub/esm/hub.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/logger.js");


/**
 * Internal function to create a new SDK client instance. The client is
 * installed and then bound to the current scope.
 *
 * @param clientClass The client class to instanciate.
 * @param options Options to pass to the client.
 */

function initAndBind(clientClass, options) {
  if (options.debug === true) {
    _sentry_utils__WEBPACK_IMPORTED_MODULE_0__.logger.enable();
  }

  (0,_sentry_hub__WEBPACK_IMPORTED_MODULE_1__.getCurrentHub)().bindClient(new clientClass(options));
}

/***/ }),

/***/ "./node_modules/@sentry/core/esm/transports/noop.js":
/*!**********************************************************!*\
  !*** ./node_modules/@sentry/core/esm/transports/noop.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NoopTransport": () => /* binding */ NoopTransport
/* harmony export */ });
/* harmony import */ var _sentry_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/types */ "./node_modules/@sentry/types/esm/status.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/syncpromise.js");


/** Noop transport */

var NoopTransport =
/** @class */
function () {
  function NoopTransport() {}
  /**
   * @inheritDoc
   */


  NoopTransport.prototype.sendEvent = function (_) {
    return _sentry_utils__WEBPACK_IMPORTED_MODULE_0__.SyncPromise.resolve({
      reason: "NoopTransport: Event has been skipped because no Dsn is configured.",
      status: _sentry_types__WEBPACK_IMPORTED_MODULE_1__.Status.Skipped
    });
  };
  /**
   * @inheritDoc
   */


  NoopTransport.prototype.close = function (_) {
    return _sentry_utils__WEBPACK_IMPORTED_MODULE_0__.SyncPromise.resolve(true);
  };

  return NoopTransport;
}();



/***/ }),

/***/ "./node_modules/@sentry/hub/esm/hub.js":
/*!*********************************************!*\
  !*** ./node_modules/@sentry/hub/esm/hub.js ***!
  \*********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getCurrentHub": () => /* binding */ getCurrentHub
/* harmony export */ });
/* unused harmony exports API_VERSION, Hub, getMainCarrier, makeMain, getHubFromCarrier, setHubOnCarrier */
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/misc.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/logger.js");
/* harmony import */ var _scope__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scope */ "./node_modules/@sentry/hub/esm/scope.js");
/* module decorator */ module = __webpack_require__.hmd(module);



/**
 * API compatibility version of this hub.
 *
 * WARNING: This number should only be incresed when the global interface
 * changes a and new methods are introduced.
 *
 * @hidden
 */

var API_VERSION = 3;
/**
 * Default maximum number of breadcrumbs added to an event. Can be overwritten
 * with {@link Options.maxBreadcrumbs}.
 */

var DEFAULT_BREADCRUMBS = 100;
/**
 * Absolute maximum number of breadcrumbs added to an event. The
 * `maxBreadcrumbs` option cannot be higher than this value.
 */

var MAX_BREADCRUMBS = 100;
/**
 * @inheritDoc
 */

var Hub =
/** @class */
function () {
  /**
   * Creates a new instance of the hub, will push one {@link Layer} into the
   * internal stack on creation.
   *
   * @param client bound to the hub.
   * @param scope bound to the hub.
   * @param version number, higher number means higher priority.
   */
  function Hub(client, scope, _version) {
    if (scope === void 0) {
      scope = new _scope__WEBPACK_IMPORTED_MODULE_1__.Scope();
    }

    if (_version === void 0) {
      _version = API_VERSION;
    }

    this._version = _version;
    /** Is a {@link Layer}[] containing the client and scope */

    this._stack = [];

    this._stack.push({
      client: client,
      scope: scope
    });
  }
  /**
   * Internal helper function to call a method on the top client if it exists.
   *
   * @param method The method to call on the client.
   * @param args Arguments to pass to the client function.
   */


  Hub.prototype._invokeClient = function (method) {
    var _a;

    var args = [];

    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }

    var top = this.getStackTop();

    if (top && top.client && top.client[method]) {
      (_a = top.client)[method].apply(_a, tslib__WEBPACK_IMPORTED_MODULE_0__.__spread(args, [top.scope]));
    }
  };
  /**
   * @inheritDoc
   */


  Hub.prototype.isOlderThan = function (version) {
    return this._version < version;
  };
  /**
   * @inheritDoc
   */


  Hub.prototype.bindClient = function (client) {
    var top = this.getStackTop();
    top.client = client;
  };
  /**
   * @inheritDoc
   */


  Hub.prototype.pushScope = function () {
    // We want to clone the content of prev scope
    var stack = this.getStack();
    var parentScope = stack.length > 0 ? stack[stack.length - 1].scope : undefined;
    var scope = _scope__WEBPACK_IMPORTED_MODULE_1__.Scope.clone(parentScope);
    this.getStack().push({
      client: this.getClient(),
      scope: scope
    });
    return scope;
  };
  /**
   * @inheritDoc
   */


  Hub.prototype.popScope = function () {
    return this.getStack().pop() !== undefined;
  };
  /**
   * @inheritDoc
   */


  Hub.prototype.withScope = function (callback) {
    var scope = this.pushScope();

    try {
      callback(scope);
    } finally {
      this.popScope();
    }
  };
  /**
   * @inheritDoc
   */


  Hub.prototype.getClient = function () {
    return this.getStackTop().client;
  };
  /** Returns the scope of the top stack. */


  Hub.prototype.getScope = function () {
    return this.getStackTop().scope;
  };
  /** Returns the scope stack for domains or the process. */


  Hub.prototype.getStack = function () {
    return this._stack;
  };
  /** Returns the topmost scope layer in the order domain > local > process. */


  Hub.prototype.getStackTop = function () {
    return this._stack[this._stack.length - 1];
  };
  /**
   * @inheritDoc
   */


  Hub.prototype.captureException = function (exception, hint) {
    var eventId = this._lastEventId = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_2__.uuid4)();
    var finalHint = hint; // If there's no explicit hint provided, mimick the same thing that would happen
    // in the minimal itself to create a consistent behavior.
    // We don't do this in the client, as it's the lowest level API, and doing this,
    // would prevent user from having full control over direct calls.

    if (!hint) {
      var syntheticException = void 0;

      try {
        throw new Error('Sentry syntheticException');
      } catch (exception) {
        syntheticException = exception;
      }

      finalHint = {
        originalException: exception,
        syntheticException: syntheticException
      };
    }

    this._invokeClient('captureException', exception, tslib__WEBPACK_IMPORTED_MODULE_0__.__assign({}, finalHint, {
      event_id: eventId
    }));

    return eventId;
  };
  /**
   * @inheritDoc
   */


  Hub.prototype.captureMessage = function (message, level, hint) {
    var eventId = this._lastEventId = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_2__.uuid4)();
    var finalHint = hint; // If there's no explicit hint provided, mimick the same thing that would happen
    // in the minimal itself to create a consistent behavior.
    // We don't do this in the client, as it's the lowest level API, and doing this,
    // would prevent user from having full control over direct calls.

    if (!hint) {
      var syntheticException = void 0;

      try {
        throw new Error(message);
      } catch (exception) {
        syntheticException = exception;
      }

      finalHint = {
        originalException: message,
        syntheticException: syntheticException
      };
    }

    this._invokeClient('captureMessage', message, level, tslib__WEBPACK_IMPORTED_MODULE_0__.__assign({}, finalHint, {
      event_id: eventId
    }));

    return eventId;
  };
  /**
   * @inheritDoc
   */


  Hub.prototype.captureEvent = function (event, hint) {
    var eventId = this._lastEventId = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_2__.uuid4)();

    this._invokeClient('captureEvent', event, tslib__WEBPACK_IMPORTED_MODULE_0__.__assign({}, hint, {
      event_id: eventId
    }));

    return eventId;
  };
  /**
   * @inheritDoc
   */


  Hub.prototype.lastEventId = function () {
    return this._lastEventId;
  };
  /**
   * @inheritDoc
   */


  Hub.prototype.addBreadcrumb = function (breadcrumb, hint) {
    var top = this.getStackTop();

    if (!top.scope || !top.client) {
      return;
    }

    var _a = top.client.getOptions && top.client.getOptions() || {},
        _b = _a.beforeBreadcrumb,
        beforeBreadcrumb = _b === void 0 ? null : _b,
        _c = _a.maxBreadcrumbs,
        maxBreadcrumbs = _c === void 0 ? DEFAULT_BREADCRUMBS : _c;

    if (maxBreadcrumbs <= 0) {
      return;
    }

    var timestamp = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_2__.timestampWithMs)();

    var mergedBreadcrumb = tslib__WEBPACK_IMPORTED_MODULE_0__.__assign({
      timestamp: timestamp
    }, breadcrumb);

    var finalBreadcrumb = beforeBreadcrumb ? (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_2__.consoleSandbox)(function () {
      return beforeBreadcrumb(mergedBreadcrumb, hint);
    }) : mergedBreadcrumb;

    if (finalBreadcrumb === null) {
      return;
    }

    top.scope.addBreadcrumb(finalBreadcrumb, Math.min(maxBreadcrumbs, MAX_BREADCRUMBS));
  };
  /**
   * @inheritDoc
   */


  Hub.prototype.setUser = function (user) {
    var top = this.getStackTop();

    if (!top.scope) {
      return;
    }

    top.scope.setUser(user);
  };
  /**
   * @inheritDoc
   */


  Hub.prototype.setTags = function (tags) {
    var top = this.getStackTop();

    if (!top.scope) {
      return;
    }

    top.scope.setTags(tags);
  };
  /**
   * @inheritDoc
   */


  Hub.prototype.setExtras = function (extras) {
    var top = this.getStackTop();

    if (!top.scope) {
      return;
    }

    top.scope.setExtras(extras);
  };
  /**
   * @inheritDoc
   */


  Hub.prototype.setTag = function (key, value) {
    var top = this.getStackTop();

    if (!top.scope) {
      return;
    }

    top.scope.setTag(key, value);
  };
  /**
   * @inheritDoc
   */


  Hub.prototype.setExtra = function (key, extra) {
    var top = this.getStackTop();

    if (!top.scope) {
      return;
    }

    top.scope.setExtra(key, extra);
  };
  /**
   * @inheritDoc
   */


  Hub.prototype.setContext = function (name, context) {
    var top = this.getStackTop();

    if (!top.scope) {
      return;
    }

    top.scope.setContext(name, context);
  };
  /**
   * @inheritDoc
   */


  Hub.prototype.configureScope = function (callback) {
    var top = this.getStackTop();

    if (top.scope && top.client) {
      callback(top.scope);
    }
  };
  /**
   * @inheritDoc
   */


  Hub.prototype.run = function (callback) {
    var oldHub = makeMain(this);

    try {
      callback(this);
    } finally {
      makeMain(oldHub);
    }
  };
  /**
   * @inheritDoc
   */


  Hub.prototype.getIntegration = function (integration) {
    var client = this.getClient();

    if (!client) {
      return null;
    }

    try {
      return client.getIntegration(integration);
    } catch (_oO) {
      _sentry_utils__WEBPACK_IMPORTED_MODULE_3__.logger.warn("Cannot retrieve integration " + integration.id + " from the current Hub");
      return null;
    }
  };
  /**
   * @inheritDoc
   */


  Hub.prototype.startSpan = function (spanOrSpanContext, forceNoChild) {
    if (forceNoChild === void 0) {
      forceNoChild = false;
    }

    return this._callExtensionMethod('startSpan', spanOrSpanContext, forceNoChild);
  };
  /**
   * @inheritDoc
   */


  Hub.prototype.traceHeaders = function () {
    return this._callExtensionMethod('traceHeaders');
  };
  /**
   * Calls global extension method and binding current instance to the function call
   */
  // @ts-ignore


  Hub.prototype._callExtensionMethod = function (method) {
    var args = [];

    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }

    var carrier = getMainCarrier();
    var sentry = carrier.__SENTRY__; // tslint:disable-next-line: strict-type-predicates

    if (sentry && sentry.extensions && typeof sentry.extensions[method] === 'function') {
      return sentry.extensions[method].apply(this, args);
    }

    _sentry_utils__WEBPACK_IMPORTED_MODULE_3__.logger.warn("Extension method " + method + " couldn't be found, doing nothing.");
  };

  return Hub;
}();


/** Returns the global shim registry. */

function getMainCarrier() {
  var carrier = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_2__.getGlobalObject)();
  carrier.__SENTRY__ = carrier.__SENTRY__ || {
    extensions: {},
    hub: undefined
  };
  return carrier;
}
/**
 * Replaces the current main hub with the passed one on the global object
 *
 * @returns The old replaced hub
 */

function makeMain(hub) {
  var registry = getMainCarrier();
  var oldHub = getHubFromCarrier(registry);
  setHubOnCarrier(registry, hub);
  return oldHub;
}
/**
 * Returns the default hub instance.
 *
 * If a hub is already registered in the global carrier but this module
 * contains a more recent version, it replaces the registered version.
 * Otherwise, the currently registered hub will be returned.
 */

function getCurrentHub() {
  // Get main carrier (global for every environment)
  var registry = getMainCarrier(); // If there's no hub, or its an old API, assign a new one

  if (!hasHubOnCarrier(registry) || getHubFromCarrier(registry).isOlderThan(API_VERSION)) {
    setHubOnCarrier(registry, new Hub());
  } // Prefer domains over global if they are there (applicable only to Node environment)


  if ((0,_sentry_utils__WEBPACK_IMPORTED_MODULE_2__.isNodeEnv)()) {
    return getHubFromActiveDomain(registry);
  } // Return hub that lives on a global object


  return getHubFromCarrier(registry);
}
/**
 * Try to read the hub from an active domain, fallback to the registry if one doesnt exist
 * @returns discovered hub
 */

function getHubFromActiveDomain(registry) {
  try {
    // We need to use `dynamicRequire` because `require` on it's own will be optimized by webpack.
    // We do not want this to happen, we need to try to `require` the domain node module and fail if we are in browser
    // for example so we do not have to shim it and use `getCurrentHub` universally.
    var domain = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_2__.dynamicRequire)(module, 'domain');
    var activeDomain = domain.active; // If there no active domain, just return global hub

    if (!activeDomain) {
      return getHubFromCarrier(registry);
    } // If there's no hub on current domain, or its an old API, assign a new one


    if (!hasHubOnCarrier(activeDomain) || getHubFromCarrier(activeDomain).isOlderThan(API_VERSION)) {
      var registryHubTopStack = getHubFromCarrier(registry).getStackTop();
      setHubOnCarrier(activeDomain, new Hub(registryHubTopStack.client, _scope__WEBPACK_IMPORTED_MODULE_1__.Scope.clone(registryHubTopStack.scope)));
    } // Return hub that lives on a domain


    return getHubFromCarrier(activeDomain);
  } catch (_Oo) {
    // Return hub that lives on a global object
    return getHubFromCarrier(registry);
  }
}
/**
 * This will tell whether a carrier has a hub on it or not
 * @param carrier object
 */


function hasHubOnCarrier(carrier) {
  if (carrier && carrier.__SENTRY__ && carrier.__SENTRY__.hub) {
    return true;
  }

  return false;
}
/**
 * This will create a new {@link Hub} and add to the passed object on
 * __SENTRY__.hub.
 * @param carrier object
 * @hidden
 */


function getHubFromCarrier(carrier) {
  if (carrier && carrier.__SENTRY__ && carrier.__SENTRY__.hub) {
    return carrier.__SENTRY__.hub;
  }

  carrier.__SENTRY__ = carrier.__SENTRY__ || {};
  carrier.__SENTRY__.hub = new Hub();
  return carrier.__SENTRY__.hub;
}
/**
 * This will set passed {@link Hub} on the passed object's __SENTRY__.hub attribute
 * @param carrier object
 * @param hub Hub
 */

function setHubOnCarrier(carrier, hub) {
  if (!carrier) {
    return false;
  }

  carrier.__SENTRY__ = carrier.__SENTRY__ || {};
  carrier.__SENTRY__.hub = hub;
  return true;
}

/***/ }),

/***/ "./node_modules/@sentry/hub/esm/scope.js":
/*!***********************************************!*\
  !*** ./node_modules/@sentry/hub/esm/scope.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Scope": () => /* binding */ Scope,
/* harmony export */   "addGlobalEventProcessor": () => /* binding */ addGlobalEventProcessor
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/syncpromise.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/is.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/object.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/misc.js");


/**
 * Holds additional event information. {@link Scope.applyToEvent} will be
 * called by the client before an event will be sent.
 */

var Scope =
/** @class */
function () {
  function Scope() {
    /** Flag if notifiying is happening. */
    this._notifyingListeners = false;
    /** Callback for client to receive scope changes. */

    this._scopeListeners = [];
    /** Callback list that will be called after {@link applyToEvent}. */

    this._eventProcessors = [];
    /** Array of breadcrumbs. */

    this._breadcrumbs = [];
    /** User */

    this._user = {};
    /** Tags */

    this._tags = {};
    /** Extra */

    this._extra = {};
    /** Contexts */

    this._context = {};
  }
  /**
   * Add internal on change listener. Used for sub SDKs that need to store the scope.
   * @hidden
   */


  Scope.prototype.addScopeListener = function (callback) {
    this._scopeListeners.push(callback);
  };
  /**
   * @inheritDoc
   */


  Scope.prototype.addEventProcessor = function (callback) {
    this._eventProcessors.push(callback);

    return this;
  };
  /**
   * This will be called on every set call.
   */


  Scope.prototype._notifyScopeListeners = function () {
    var _this = this;

    if (!this._notifyingListeners) {
      this._notifyingListeners = true;
      setTimeout(function () {
        _this._scopeListeners.forEach(function (callback) {
          callback(_this);
        });

        _this._notifyingListeners = false;
      });
    }
  };
  /**
   * This will be called after {@link applyToEvent} is finished.
   */


  Scope.prototype._notifyEventProcessors = function (processors, event, hint, index) {
    var _this = this;

    if (index === void 0) {
      index = 0;
    }

    return new _sentry_utils__WEBPACK_IMPORTED_MODULE_1__.SyncPromise(function (resolve, reject) {
      var processor = processors[index]; // tslint:disable-next-line:strict-type-predicates

      if (event === null || typeof processor !== 'function') {
        resolve(event);
      } else {
        var result = processor(tslib__WEBPACK_IMPORTED_MODULE_0__.__assign({}, event), hint);

        if ((0,_sentry_utils__WEBPACK_IMPORTED_MODULE_2__.isThenable)(result)) {
          result.then(function (final) {
            return _this._notifyEventProcessors(processors, final, hint, index + 1).then(resolve);
          }).then(null, reject);
        } else {
          _this._notifyEventProcessors(processors, result, hint, index + 1).then(resolve).then(null, reject);
        }
      }
    });
  };
  /**
   * @inheritDoc
   */


  Scope.prototype.setUser = function (user) {
    this._user = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_3__.normalize)(user);

    this._notifyScopeListeners();

    return this;
  };
  /**
   * @inheritDoc
   */


  Scope.prototype.setTags = function (tags) {
    this._tags = tslib__WEBPACK_IMPORTED_MODULE_0__.__assign({}, this._tags, (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_3__.normalize)(tags));

    this._notifyScopeListeners();

    return this;
  };
  /**
   * @inheritDoc
   */


  Scope.prototype.setTag = function (key, value) {
    var _a;

    this._tags = tslib__WEBPACK_IMPORTED_MODULE_0__.__assign({}, this._tags, (_a = {}, _a[key] = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_3__.normalize)(value), _a));

    this._notifyScopeListeners();

    return this;
  };
  /**
   * @inheritDoc
   */


  Scope.prototype.setExtras = function (extra) {
    this._extra = tslib__WEBPACK_IMPORTED_MODULE_0__.__assign({}, this._extra, (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_3__.normalize)(extra));

    this._notifyScopeListeners();

    return this;
  };
  /**
   * @inheritDoc
   */


  Scope.prototype.setExtra = function (key, extra) {
    var _a;

    this._extra = tslib__WEBPACK_IMPORTED_MODULE_0__.__assign({}, this._extra, (_a = {}, _a[key] = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_3__.normalize)(extra), _a));

    this._notifyScopeListeners();

    return this;
  };
  /**
   * @inheritDoc
   */


  Scope.prototype.setFingerprint = function (fingerprint) {
    this._fingerprint = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_3__.normalize)(fingerprint);

    this._notifyScopeListeners();

    return this;
  };
  /**
   * @inheritDoc
   */


  Scope.prototype.setLevel = function (level) {
    this._level = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_3__.normalize)(level);

    this._notifyScopeListeners();

    return this;
  };
  /**
   * @inheritDoc
   */


  Scope.prototype.setTransaction = function (transaction) {
    this._transaction = transaction;

    this._notifyScopeListeners();

    return this;
  };
  /**
   * @inheritDoc
   */


  Scope.prototype.setContext = function (name, context) {
    this._context[name] = context ? (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_3__.normalize)(context) : undefined;

    this._notifyScopeListeners();

    return this;
  };
  /**
   * @inheritDoc
   */


  Scope.prototype.setSpan = function (span) {
    this._span = span;

    this._notifyScopeListeners();

    return this;
  };
  /**
   * Internal getter for Span, used in Hub.
   * @hidden
   */


  Scope.prototype.getSpan = function () {
    return this._span;
  };
  /**
   * Inherit values from the parent scope.
   * @param scope to clone.
   */


  Scope.clone = function (scope) {
    var newScope = new Scope();

    if (scope) {
      newScope._breadcrumbs = tslib__WEBPACK_IMPORTED_MODULE_0__.__spread(scope._breadcrumbs);
      newScope._tags = tslib__WEBPACK_IMPORTED_MODULE_0__.__assign({}, scope._tags);
      newScope._extra = tslib__WEBPACK_IMPORTED_MODULE_0__.__assign({}, scope._extra);
      newScope._context = tslib__WEBPACK_IMPORTED_MODULE_0__.__assign({}, scope._context);
      newScope._user = scope._user;
      newScope._level = scope._level;
      newScope._span = scope._span;
      newScope._transaction = scope._transaction;
      newScope._fingerprint = scope._fingerprint;
      newScope._eventProcessors = tslib__WEBPACK_IMPORTED_MODULE_0__.__spread(scope._eventProcessors);
    }

    return newScope;
  };
  /**
   * @inheritDoc
   */


  Scope.prototype.clear = function () {
    this._breadcrumbs = [];
    this._tags = {};
    this._extra = {};
    this._user = {};
    this._context = {};
    this._level = undefined;
    this._transaction = undefined;
    this._fingerprint = undefined;
    this._span = undefined;

    this._notifyScopeListeners();

    return this;
  };
  /**
   * @inheritDoc
   */


  Scope.prototype.addBreadcrumb = function (breadcrumb, maxBreadcrumbs) {
    var timestamp = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_4__.timestampWithMs)();

    var mergedBreadcrumb = tslib__WEBPACK_IMPORTED_MODULE_0__.__assign({
      timestamp: timestamp
    }, breadcrumb);

    this._breadcrumbs = maxBreadcrumbs !== undefined && maxBreadcrumbs >= 0 ? tslib__WEBPACK_IMPORTED_MODULE_0__.__spread(this._breadcrumbs, [(0,_sentry_utils__WEBPACK_IMPORTED_MODULE_3__.normalize)(mergedBreadcrumb)]).slice(-maxBreadcrumbs) : tslib__WEBPACK_IMPORTED_MODULE_0__.__spread(this._breadcrumbs, [(0,_sentry_utils__WEBPACK_IMPORTED_MODULE_3__.normalize)(mergedBreadcrumb)]);

    this._notifyScopeListeners();

    return this;
  };
  /**
   * @inheritDoc
   */


  Scope.prototype.clearBreadcrumbs = function () {
    this._breadcrumbs = [];

    this._notifyScopeListeners();

    return this;
  };
  /**
   * Applies fingerprint from the scope to the event if there's one,
   * uses message if there's one instead or get rid of empty fingerprint
   */


  Scope.prototype._applyFingerprint = function (event) {
    // Make sure it's an array first and we actually have something in place
    event.fingerprint = event.fingerprint ? Array.isArray(event.fingerprint) ? event.fingerprint : [event.fingerprint] : []; // If we have something on the scope, then merge it with event

    if (this._fingerprint) {
      event.fingerprint = event.fingerprint.concat(this._fingerprint);
    } // If we have no data at all, remove empty array default


    if (event.fingerprint && !event.fingerprint.length) {
      delete event.fingerprint;
    }
  };
  /**
   * Applies the current context and fingerprint to the event.
   * Note that breadcrumbs will be added by the client.
   * Also if the event has already breadcrumbs on it, we do not merge them.
   * @param event Event
   * @param hint May contain additional informartion about the original exception.
   * @hidden
   */


  Scope.prototype.applyToEvent = function (event, hint) {
    if (this._extra && Object.keys(this._extra).length) {
      event.extra = tslib__WEBPACK_IMPORTED_MODULE_0__.__assign({}, this._extra, event.extra);
    }

    if (this._tags && Object.keys(this._tags).length) {
      event.tags = tslib__WEBPACK_IMPORTED_MODULE_0__.__assign({}, this._tags, event.tags);
    }

    if (this._user && Object.keys(this._user).length) {
      event.user = tslib__WEBPACK_IMPORTED_MODULE_0__.__assign({}, this._user, event.user);
    }

    if (this._context && Object.keys(this._context).length) {
      event.contexts = tslib__WEBPACK_IMPORTED_MODULE_0__.__assign({}, this._context, event.contexts);
    }

    if (this._level) {
      event.level = this._level;
    }

    if (this._transaction) {
      event.transaction = this._transaction;
    }

    this._applyFingerprint(event);

    event.breadcrumbs = tslib__WEBPACK_IMPORTED_MODULE_0__.__spread(event.breadcrumbs || [], this._breadcrumbs);
    event.breadcrumbs = event.breadcrumbs.length > 0 ? event.breadcrumbs : undefined;
    return this._notifyEventProcessors(tslib__WEBPACK_IMPORTED_MODULE_0__.__spread(getGlobalEventProcessors(), this._eventProcessors), event, hint);
  };

  return Scope;
}();


/**
 * Retruns the global event processors.
 */

function getGlobalEventProcessors() {
  var global = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_4__.getGlobalObject)();
  global.__SENTRY__ = global.__SENTRY__ || {};
  global.__SENTRY__.globalEventProcessors = global.__SENTRY__.globalEventProcessors || [];
  return global.__SENTRY__.globalEventProcessors;
}
/**
 * Add a EventProcessor to be kept globally.
 * @param callback EventProcessor to add
 */


function addGlobalEventProcessor(callback) {
  getGlobalEventProcessors().push(callback);
}

/***/ }),

/***/ "./node_modules/@sentry/minimal/esm/index.js":
/*!***************************************************!*\
  !*** ./node_modules/@sentry/minimal/esm/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "captureException": () => /* binding */ captureException,
/* harmony export */   "withScope": () => /* binding */ withScope
/* harmony export */ });
/* unused harmony exports captureMessage, captureEvent, configureScope, addBreadcrumb, setContext, setExtras, setTags, setExtra, setTag, setUser, _callOnClient */
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _sentry_hub__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/hub */ "./node_modules/@sentry/hub/esm/hub.js");


/**
 * This calls a function on the current hub.
 * @param method function to call on hub.
 * @param args to pass to function.
 */

function callOnHub(method) {
  var args = [];

  for (var _i = 1; _i < arguments.length; _i++) {
    args[_i - 1] = arguments[_i];
  }

  var hub = (0,_sentry_hub__WEBPACK_IMPORTED_MODULE_1__.getCurrentHub)();

  if (hub && hub[method]) {
    // tslint:disable-next-line:no-unsafe-any
    return hub[method].apply(hub, tslib__WEBPACK_IMPORTED_MODULE_0__.__spread(args));
  }

  throw new Error("No hub defined or " + method + " was not found on the hub, please open a bug report.");
}
/**
 * Captures an exception event and sends it to Sentry.
 *
 * @param exception An exception-like object.
 * @returns The generated eventId.
 */


function captureException(exception) {
  var syntheticException;

  try {
    throw new Error('Sentry syntheticException');
  } catch (exception) {
    syntheticException = exception;
  }

  return callOnHub('captureException', exception, {
    originalException: exception,
    syntheticException: syntheticException
  });
}
/**
 * Captures a message event and sends it to Sentry.
 *
 * @param message The message to send to Sentry.
 * @param level Define the level of the message.
 * @returns The generated eventId.
 */

function captureMessage(message, level) {
  var syntheticException;

  try {
    throw new Error(message);
  } catch (exception) {
    syntheticException = exception;
  }

  return callOnHub('captureMessage', message, level, {
    originalException: message,
    syntheticException: syntheticException
  });
}
/**
 * Captures a manually created event and sends it to Sentry.
 *
 * @param event The event to send to Sentry.
 * @returns The generated eventId.
 */

function captureEvent(event) {
  return callOnHub('captureEvent', event);
}
/**
 * Callback to set context information onto the scope.
 * @param callback Callback function that receives Scope.
 */

function configureScope(callback) {
  callOnHub('configureScope', callback);
}
/**
 * Records a new breadcrumb which will be attached to future events.
 *
 * Breadcrumbs will be added to subsequent events to provide more context on
 * user's actions prior to an error or crash.
 *
 * @param breadcrumb The breadcrumb to record.
 */

function addBreadcrumb(breadcrumb) {
  callOnHub('addBreadcrumb', breadcrumb);
}
/**
 * Sets context data with the given name.
 * @param name of the context
 * @param context Any kind of data. This data will be normailzed.
 */

function setContext(name, context) {
  callOnHub('setContext', name, context);
}
/**
 * Set an object that will be merged sent as extra data with the event.
 * @param extras Extras object to merge into current context.
 */

function setExtras(extras) {
  callOnHub('setExtras', extras);
}
/**
 * Set an object that will be merged sent as tags data with the event.
 * @param tags Tags context object to merge into current context.
 */

function setTags(tags) {
  callOnHub('setTags', tags);
}
/**
 * Set key:value that will be sent as extra data with the event.
 * @param key String of extra
 * @param extra Any kind of data. This data will be normailzed.
 */

function setExtra(key, extra) {
  callOnHub('setExtra', key, extra);
}
/**
 * Set key:value that will be sent as tags data with the event.
 * @param key String key of tag
 * @param value String value of tag
 */

function setTag(key, value) {
  callOnHub('setTag', key, value);
}
/**
 * Updates user context information for future events.
 *
 * @param user User context object to be set in the current context. Pass `null` to unset the user.
 */

function setUser(user) {
  callOnHub('setUser', user);
}
/**
 * Creates a new scope with and executes the given operation within.
 * The scope is automatically removed once the operation
 * finishes or throws.
 *
 * This is essentially a convenience function for:
 *
 *     pushScope();
 *     callback();
 *     popScope();
 *
 * @param callback that will be enclosed into push/popScope.
 */

function withScope(callback) {
  callOnHub('withScope', callback);
}
/**
 * Calls a function on the latest client. Use this with caution, it's meant as
 * in "internal" helper so we don't need to expose every possible function in
 * the shim. It is not guaranteed that the client actually implements the
 * function.
 *
 * @param method The method to call on the client/client.
 * @param args Arguments to pass to the client/fontend.
 * @hidden
 */

function _callOnClient(method) {
  var args = [];

  for (var _i = 1; _i < arguments.length; _i++) {
    args[_i - 1] = arguments[_i];
  }

  callOnHub.apply(void 0, tslib__WEBPACK_IMPORTED_MODULE_0__.__spread(['_invokeClient', method], args));
}

/***/ }),

/***/ "./node_modules/@sentry/types/esm/severity.js":
/*!****************************************************!*\
  !*** ./node_modules/@sentry/types/esm/severity.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Severity": () => /* binding */ Severity
/* harmony export */ });
/** JSDoc */
var Severity;

(function (Severity) {
  /** JSDoc */
  Severity["Fatal"] = "fatal";
  /** JSDoc */

  Severity["Error"] = "error";
  /** JSDoc */

  Severity["Warning"] = "warning";
  /** JSDoc */

  Severity["Log"] = "log";
  /** JSDoc */

  Severity["Info"] = "info";
  /** JSDoc */

  Severity["Debug"] = "debug";
  /** JSDoc */

  Severity["Critical"] = "critical";
})(Severity || (Severity = {})); // tslint:disable:completed-docs
// tslint:disable:no-unnecessary-qualifier no-namespace


(function (Severity) {
  /**
   * Converts a string-based level into a {@link Severity}.
   *
   * @param level string representation of Severity
   * @returns Severity
   */
  function fromString(level) {
    switch (level) {
      case 'debug':
        return Severity.Debug;

      case 'info':
        return Severity.Info;

      case 'warn':
      case 'warning':
        return Severity.Warning;

      case 'error':
        return Severity.Error;

      case 'fatal':
        return Severity.Fatal;

      case 'critical':
        return Severity.Critical;

      case 'log':
      default:
        return Severity.Log;
    }
  }

  Severity.fromString = fromString;
})(Severity || (Severity = {}));

/***/ }),

/***/ "./node_modules/@sentry/types/esm/status.js":
/*!**************************************************!*\
  !*** ./node_modules/@sentry/types/esm/status.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Status": () => /* binding */ Status
/* harmony export */ });
/** The status of an event. */
var Status;

(function (Status) {
  /** The status could not be determined. */
  Status["Unknown"] = "unknown";
  /** The event was skipped due to configuration or callbacks. */

  Status["Skipped"] = "skipped";
  /** The event was sent to Sentry successfully. */

  Status["Success"] = "success";
  /** The client is currently rate limited and will try again later. */

  Status["RateLimit"] = "rate_limit";
  /** The event could not be processed. */

  Status["Invalid"] = "invalid";
  /** A server-side error ocurred during submission. */

  Status["Failed"] = "failed";
})(Status || (Status = {})); // tslint:disable:completed-docs
// tslint:disable:no-unnecessary-qualifier no-namespace


(function (Status) {
  /**
   * Converts a HTTP status code into a {@link Status}.
   *
   * @param code The HTTP response status code.
   * @returns The send status or {@link Status.Unknown}.
   */
  function fromHttpCode(code) {
    if (code >= 200 && code < 300) {
      return Status.Success;
    }

    if (code === 429) {
      return Status.RateLimit;
    }

    if (code >= 400 && code < 500) {
      return Status.Invalid;
    }

    if (code >= 500) {
      return Status.Failed;
    }

    return Status.Unknown;
  }

  Status.fromHttpCode = fromHttpCode;
})(Status || (Status = {}));

/***/ }),

/***/ "./node_modules/@sentry/utils/esm/dsn.js":
/*!***********************************************!*\
  !*** ./node_modules/@sentry/utils/esm/dsn.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Dsn": () => /* binding */ Dsn
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./error */ "./node_modules/@sentry/utils/esm/error.js");


/** Regular expression used to parse a Dsn. */

var DSN_REGEX = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+))?@)([\w\.-]+)(?::(\d+))?\/(.+)/;
/** Error message */

var ERROR_MESSAGE = 'Invalid Dsn';
/** The Sentry Dsn, identifying a Sentry instance and project. */

var Dsn =
/** @class */
function () {
  /** Creates a new Dsn component */
  function Dsn(from) {
    if (typeof from === 'string') {
      this._fromString(from);
    } else {
      this._fromComponents(from);
    }

    this._validate();
  }
  /**
   * Renders the string representation of this Dsn.
   *
   * By default, this will render the public representation without the password
   * component. To get the deprecated private _representation, set `withPassword`
   * to true.
   *
   * @param withPassword When set to true, the password will be included.
   */


  Dsn.prototype.toString = function (withPassword) {
    if (withPassword === void 0) {
      withPassword = false;
    } // tslint:disable-next-line:no-this-assignment


    var _a = this,
        host = _a.host,
        path = _a.path,
        pass = _a.pass,
        port = _a.port,
        projectId = _a.projectId,
        protocol = _a.protocol,
        user = _a.user;

    return protocol + "://" + user + (withPassword && pass ? ":" + pass : '') + ("@" + host + (port ? ":" + port : '') + "/" + (path ? path + "/" : path) + projectId);
  };
  /** Parses a string into this Dsn. */


  Dsn.prototype._fromString = function (str) {
    var match = DSN_REGEX.exec(str);

    if (!match) {
      throw new _error__WEBPACK_IMPORTED_MODULE_1__.SentryError(ERROR_MESSAGE);
    }

    var _a = tslib__WEBPACK_IMPORTED_MODULE_0__.__read(match.slice(1), 6),
        protocol = _a[0],
        user = _a[1],
        _b = _a[2],
        pass = _b === void 0 ? '' : _b,
        host = _a[3],
        _c = _a[4],
        port = _c === void 0 ? '' : _c,
        lastPath = _a[5];

    var path = '';
    var projectId = lastPath;
    var split = projectId.split('/');

    if (split.length > 1) {
      path = split.slice(0, -1).join('/');
      projectId = split.pop();
    }

    this._fromComponents({
      host: host,
      pass: pass,
      path: path,
      projectId: projectId,
      port: port,
      protocol: protocol,
      user: user
    });
  };
  /** Maps Dsn components into this instance. */


  Dsn.prototype._fromComponents = function (components) {
    this.protocol = components.protocol;
    this.user = components.user;
    this.pass = components.pass || '';
    this.host = components.host;
    this.port = components.port || '';
    this.path = components.path || '';
    this.projectId = components.projectId;
  };
  /** Validates this Dsn and throws on error. */


  Dsn.prototype._validate = function () {
    var _this = this;

    ['protocol', 'user', 'host', 'projectId'].forEach(function (component) {
      if (!_this[component]) {
        throw new _error__WEBPACK_IMPORTED_MODULE_1__.SentryError(ERROR_MESSAGE);
      }
    });

    if (this.protocol !== 'http' && this.protocol !== 'https') {
      throw new _error__WEBPACK_IMPORTED_MODULE_1__.SentryError(ERROR_MESSAGE);
    }

    if (this.port && isNaN(parseInt(this.port, 10))) {
      throw new _error__WEBPACK_IMPORTED_MODULE_1__.SentryError(ERROR_MESSAGE);
    }
  };

  return Dsn;
}();



/***/ }),

/***/ "./node_modules/@sentry/utils/esm/error.js":
/*!*************************************************!*\
  !*** ./node_modules/@sentry/utils/esm/error.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SentryError": () => /* binding */ SentryError
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _polyfill__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./polyfill */ "./node_modules/@sentry/utils/esm/polyfill.js");


/** An error emitted by Sentry SDKs and related utilities. */

var SentryError =
/** @class */
function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__.__extends(SentryError, _super);

  function SentryError(message) {
    var _newTarget = this.constructor;

    var _this = _super.call(this, message) || this;

    _this.message = message; // tslint:disable:no-unsafe-any

    _this.name = _newTarget.prototype.constructor.name;
    (0,_polyfill__WEBPACK_IMPORTED_MODULE_1__.setPrototypeOf)(_this, _newTarget.prototype);
    return _this;
  }

  return SentryError;
}(Error);



/***/ }),

/***/ "./node_modules/@sentry/utils/esm/instrument.js":
/*!******************************************************!*\
  !*** ./node_modules/@sentry/utils/esm/instrument.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addInstrumentationHandler": () => /* binding */ addInstrumentationHandler
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _is__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./is */ "./node_modules/@sentry/utils/esm/is.js");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./logger */ "./node_modules/@sentry/utils/esm/logger.js");
/* harmony import */ var _misc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./misc */ "./node_modules/@sentry/utils/esm/misc.js");
/* harmony import */ var _object__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./object */ "./node_modules/@sentry/utils/esm/object.js");
/* harmony import */ var _supports__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./supports */ "./node_modules/@sentry/utils/esm/supports.js");
/* tslint:disable:only-arrow-functions no-unsafe-any */






var global = (0,_misc__WEBPACK_IMPORTED_MODULE_1__.getGlobalObject)();
/**
 * Instrument native APIs to call handlers that can be used to create breadcrumbs, APM spans etc.
 *  - Console API
 *  - Fetch API
 *  - XHR API
 *  - History API
 *  - DOM API (click/typing)
 */

var handlers = {};
var instrumented = {};
/** Instruments given API */

function instrument(type) {
  if (instrumented[type]) {
    return;
  }

  instrumented[type] = true;

  switch (type) {
    case 'console':
      instrumentConsole();
      break;

    case 'dom':
      instrumentDOM();
      break;

    case 'xhr':
      instrumentXHR();
      break;

    case 'fetch':
      instrumentFetch();
      break;

    case 'history':
      instrumentHistory();
      break;

    default:
      _logger__WEBPACK_IMPORTED_MODULE_2__.logger.warn('unknown instrumentation type:', type);
  }
}
/**
 * Add handler that will be called when given type of instrumentation triggers.
 * Use at your own risk, this might break without changelog notice, only used internally.
 * @hidden
 */


function addInstrumentationHandler(handler) {
  // tslint:disable-next-line:strict-type-predicates
  if (!handler || typeof handler.type !== 'string' || typeof handler.callback !== 'function') {
    return;
  }

  handlers[handler.type] = handlers[handler.type] || [];
  handlers[handler.type].push(handler.callback);
  instrument(handler.type);
}
/** JSDoc */

function triggerHandlers(type, data) {
  var e_1, _a;

  if (!type || !handlers[type]) {
    return;
  }

  try {
    for (var _b = tslib__WEBPACK_IMPORTED_MODULE_0__.__values(handlers[type] || []), _c = _b.next(); !_c.done; _c = _b.next()) {
      var handler = _c.value;

      try {
        handler(data);
      } catch (e) {
        _logger__WEBPACK_IMPORTED_MODULE_2__.logger.error("Error while triggering instrumentation handler.\nType: " + type + "\nName: " + (0,_misc__WEBPACK_IMPORTED_MODULE_1__.getFunctionName)(handler) + "\nError: " + e);
      }
    }
  } catch (e_1_1) {
    e_1 = {
      error: e_1_1
    };
  } finally {
    try {
      if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
    } finally {
      if (e_1) throw e_1.error;
    }
  }
}
/** JSDoc */


function instrumentConsole() {
  if (!('console' in global)) {
    return;
  }

  ['debug', 'info', 'warn', 'error', 'log', 'assert'].forEach(function (level) {
    if (!(level in global.console)) {
      return;
    }

    (0,_object__WEBPACK_IMPORTED_MODULE_3__.fill)(global.console, level, function (originalConsoleLevel) {
      return function () {
        var args = [];

        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }

        triggerHandlers('console', {
          args: args,
          level: level
        }); // this fails for some browsers. :(

        if (originalConsoleLevel) {
          Function.prototype.apply.call(originalConsoleLevel, global.console, args);
        }
      };
    });
  });
}
/** JSDoc */


function instrumentFetch() {
  if (!(0,_supports__WEBPACK_IMPORTED_MODULE_4__.supportsNativeFetch)()) {
    return;
  }

  (0,_object__WEBPACK_IMPORTED_MODULE_3__.fill)(global, 'fetch', function (originalFetch) {
    return function () {
      var args = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }

      var commonHandlerData = {
        args: args,
        fetchData: {
          method: getFetchMethod(args),
          url: getFetchUrl(args)
        },
        startTimestamp: Date.now()
      };
      triggerHandlers('fetch', tslib__WEBPACK_IMPORTED_MODULE_0__.__assign({}, commonHandlerData));
      return originalFetch.apply(global, args).then(function (response) {
        triggerHandlers('fetch', tslib__WEBPACK_IMPORTED_MODULE_0__.__assign({}, commonHandlerData, {
          endTimestamp: Date.now(),
          response: response
        }));
        return response;
      }, function (error) {
        triggerHandlers('fetch', tslib__WEBPACK_IMPORTED_MODULE_0__.__assign({}, commonHandlerData, {
          endTimestamp: Date.now(),
          error: error
        }));
        throw error;
      });
    };
  });
}
/** Extract `method` from fetch call arguments */


function getFetchMethod(fetchArgs) {
  if (fetchArgs === void 0) {
    fetchArgs = [];
  }

  if ('Request' in global && (0,_is__WEBPACK_IMPORTED_MODULE_5__.isInstanceOf)(fetchArgs[0], Request) && fetchArgs[0].method) {
    return String(fetchArgs[0].method).toUpperCase();
  }

  if (fetchArgs[1] && fetchArgs[1].method) {
    return String(fetchArgs[1].method).toUpperCase();
  }

  return 'GET';
}
/** Extract `url` from fetch call arguments */


function getFetchUrl(fetchArgs) {
  if (fetchArgs === void 0) {
    fetchArgs = [];
  }

  if (typeof fetchArgs[0] === 'string') {
    return fetchArgs[0];
  }

  if ('Request' in global && (0,_is__WEBPACK_IMPORTED_MODULE_5__.isInstanceOf)(fetchArgs[0], Request)) {
    return fetchArgs[0].url;
  }

  return String(fetchArgs[0]);
}
/** JSDoc */


function instrumentXHR() {
  if (!('XMLHttpRequest' in global)) {
    return;
  }

  var xhrproto = XMLHttpRequest.prototype;
  (0,_object__WEBPACK_IMPORTED_MODULE_3__.fill)(xhrproto, 'open', function (originalOpen) {
    return function () {
      var args = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }

      var url = args[1];
      this.__sentry_xhr__ = {
        method: (0,_is__WEBPACK_IMPORTED_MODULE_5__.isString)(args[0]) ? args[0].toUpperCase() : args[0],
        url: args[1]
      }; // if Sentry key appears in URL, don't capture it as a request

      if ((0,_is__WEBPACK_IMPORTED_MODULE_5__.isString)(url) && this.__sentry_xhr__.method === 'POST' && url.match(/sentry_key/)) {
        this.__sentry_own_request__ = true;
      }

      return originalOpen.apply(this, args);
    };
  });
  (0,_object__WEBPACK_IMPORTED_MODULE_3__.fill)(xhrproto, 'send', function (originalSend) {
    return function () {
      var args = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }

      var xhr = this; // tslint:disable-line:no-this-assignment

      var commonHandlerData = {
        args: args,
        startTimestamp: Date.now(),
        xhr: xhr
      };
      triggerHandlers('xhr', tslib__WEBPACK_IMPORTED_MODULE_0__.__assign({}, commonHandlerData));
      /**
       * @hidden
       */

      function onreadystatechangeHandler() {
        if (xhr.readyState === 4) {
          try {
            // touching statusCode in some platforms throws
            // an exception
            if (xhr.__sentry_xhr__) {
              xhr.__sentry_xhr__.status_code = xhr.status;
            }
          } catch (e) {
            /* do nothing */
          }

          triggerHandlers('xhr', tslib__WEBPACK_IMPORTED_MODULE_0__.__assign({}, commonHandlerData, {
            endTimestamp: Date.now()
          }));
        }
      }

      if ('onreadystatechange' in xhr && typeof xhr.onreadystatechange === 'function') {
        (0,_object__WEBPACK_IMPORTED_MODULE_3__.fill)(xhr, 'onreadystatechange', function (original) {
          return function () {
            var readyStateArgs = [];

            for (var _i = 0; _i < arguments.length; _i++) {
              readyStateArgs[_i] = arguments[_i];
            }

            onreadystatechangeHandler();
            return original.apply(xhr, readyStateArgs);
          };
        });
      } else {
        // if onreadystatechange wasn't actually set by the page on this xhr, we
        // are free to set our own and capture the breadcrumb
        xhr.onreadystatechange = onreadystatechangeHandler;
      }

      return originalSend.apply(this, args);
    };
  });
}

var lastHref;
/** JSDoc */

function instrumentHistory() {
  if (!(0,_supports__WEBPACK_IMPORTED_MODULE_4__.supportsHistory)()) {
    return;
  }

  var oldOnPopState = global.onpopstate;

  global.onpopstate = function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    var to = global.location.href; // keep track of the current URL state, as we always receive only the updated state

    var from = lastHref;
    lastHref = to;
    triggerHandlers('history', {
      from: from,
      to: to
    });

    if (oldOnPopState) {
      return oldOnPopState.apply(this, args);
    }
  };
  /** @hidden */


  function historyReplacementFunction(originalHistoryFunction) {
    return function () {
      var args = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }

      var url = args.length > 2 ? args[2] : undefined;

      if (url) {
        // coerce to string (this is what pushState does)
        var from = lastHref;
        var to = String(url); // keep track of the current URL state, as we always receive only the updated state

        lastHref = to;
        triggerHandlers('history', {
          from: from,
          to: to
        });
      }

      return originalHistoryFunction.apply(this, args);
    };
  }

  (0,_object__WEBPACK_IMPORTED_MODULE_3__.fill)(global.history, 'pushState', historyReplacementFunction);
  (0,_object__WEBPACK_IMPORTED_MODULE_3__.fill)(global.history, 'replaceState', historyReplacementFunction);
}
/** JSDoc */


function instrumentDOM() {
  if (!('document' in global)) {
    return;
  } // Capture breadcrumbs from any click that is unhandled / bubbled up all the way
  // to the document. Do this before we instrument addEventListener.


  global.document.addEventListener('click', domEventHandler('click', triggerHandlers.bind(null, 'dom')), false);
  global.document.addEventListener('keypress', keypressEventHandler(triggerHandlers.bind(null, 'dom')), false); // After hooking into document bubbled up click and keypresses events, we also hook into user handled click & keypresses.

  ['EventTarget', 'Node'].forEach(function (target) {
    var proto = global[target] && global[target].prototype;

    if (!proto || !proto.hasOwnProperty || !proto.hasOwnProperty('addEventListener')) {
      return;
    }

    (0,_object__WEBPACK_IMPORTED_MODULE_3__.fill)(proto, 'addEventListener', function (original) {
      return function (eventName, fn, options) {
        if (fn && fn.handleEvent) {
          if (eventName === 'click') {
            (0,_object__WEBPACK_IMPORTED_MODULE_3__.fill)(fn, 'handleEvent', function (innerOriginal) {
              return function (event) {
                domEventHandler('click', triggerHandlers.bind(null, 'dom'))(event);
                return innerOriginal.call(this, event);
              };
            });
          }

          if (eventName === 'keypress') {
            (0,_object__WEBPACK_IMPORTED_MODULE_3__.fill)(fn, 'handleEvent', function (innerOriginal) {
              return function (event) {
                keypressEventHandler(triggerHandlers.bind(null, 'dom'))(event);
                return innerOriginal.call(this, event);
              };
            });
          }
        } else {
          if (eventName === 'click') {
            domEventHandler('click', triggerHandlers.bind(null, 'dom'), true)(this);
          }

          if (eventName === 'keypress') {
            keypressEventHandler(triggerHandlers.bind(null, 'dom'))(this);
          }
        }

        return original.call(this, eventName, fn, options);
      };
    });
    (0,_object__WEBPACK_IMPORTED_MODULE_3__.fill)(proto, 'removeEventListener', function (original) {
      return function (eventName, fn, options) {
        var callback = fn;

        try {
          callback = callback && (callback.__sentry_wrapped__ || callback);
        } catch (e) {// ignore, accessing __sentry_wrapped__ will throw in some Selenium environments
        }

        return original.call(this, eventName, callback, options);
      };
    });
  });
}

var debounceDuration = 1000;
var debounceTimer = 0;
var keypressTimeout;
var lastCapturedEvent;
/**
 * Wraps addEventListener to capture UI breadcrumbs
 * @param name the event name (e.g. "click")
 * @param handler function that will be triggered
 * @param debounce decides whether it should wait till another event loop
 * @returns wrapped breadcrumb events handler
 * @hidden
 */

function domEventHandler(name, handler, debounce) {
  if (debounce === void 0) {
    debounce = false;
  }

  return function (event) {
    // reset keypress timeout; e.g. triggering a 'click' after
    // a 'keypress' will reset the keypress debounce so that a new
    // set of keypresses can be recorded
    keypressTimeout = undefined; // It's possible this handler might trigger multiple times for the same
    // event (e.g. event propagation through node ancestors). Ignore if we've
    // already captured the event.

    if (!event || lastCapturedEvent === event) {
      return;
    }

    lastCapturedEvent = event;

    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    if (debounce) {
      debounceTimer = setTimeout(function () {
        handler({
          event: event,
          name: name
        });
      });
    } else {
      handler({
        event: event,
        name: name
      });
    }
  };
}
/**
 * Wraps addEventListener to capture keypress UI events
 * @param handler function that will be triggered
 * @returns wrapped keypress events handler
 * @hidden
 */


function keypressEventHandler(handler) {
  // TODO: if somehow user switches keypress target before
  //       debounce timeout is triggered, we will only capture
  //       a single breadcrumb from the FIRST target (acceptable?)
  return function (event) {
    var target;

    try {
      target = event.target;
    } catch (e) {
      // just accessing event properties can throw an exception in some rare circumstances
      // see: https://github.com/getsentry/raven-js/issues/838
      return;
    }

    var tagName = target && target.tagName; // only consider keypress events on actual input elements
    // this will disregard keypresses targeting body (e.g. tabbing
    // through elements, hotkeys, etc)

    if (!tagName || tagName !== 'INPUT' && tagName !== 'TEXTAREA' && !target.isContentEditable) {
      return;
    } // record first keypress in a series, but ignore subsequent
    // keypresses until debounce clears


    if (!keypressTimeout) {
      domEventHandler('input', handler)(event);
    }

    clearTimeout(keypressTimeout);
    keypressTimeout = setTimeout(function () {
      keypressTimeout = undefined;
    }, debounceDuration);
  };
}

/***/ }),

/***/ "./node_modules/@sentry/utils/esm/is.js":
/*!**********************************************!*\
  !*** ./node_modules/@sentry/utils/esm/is.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isError": () => /* binding */ isError,
/* harmony export */   "isErrorEvent": () => /* binding */ isErrorEvent,
/* harmony export */   "isDOMError": () => /* binding */ isDOMError,
/* harmony export */   "isDOMException": () => /* binding */ isDOMException,
/* harmony export */   "isString": () => /* binding */ isString,
/* harmony export */   "isPrimitive": () => /* binding */ isPrimitive,
/* harmony export */   "isPlainObject": () => /* binding */ isPlainObject,
/* harmony export */   "isEvent": () => /* binding */ isEvent,
/* harmony export */   "isElement": () => /* binding */ isElement,
/* harmony export */   "isRegExp": () => /* binding */ isRegExp,
/* harmony export */   "isThenable": () => /* binding */ isThenable,
/* harmony export */   "isSyntheticEvent": () => /* binding */ isSyntheticEvent,
/* harmony export */   "isInstanceOf": () => /* binding */ isInstanceOf
/* harmony export */ });
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Checks whether given value's type is one of a few Error or Error-like
 * {@link isError}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */
function isError(wat) {
  switch (Object.prototype.toString.call(wat)) {
    case '[object Error]':
      return true;

    case '[object Exception]':
      return true;

    case '[object DOMException]':
      return true;

    default:
      return isInstanceOf(wat, Error);
  }
}
/**
 * Checks whether given value's type is ErrorEvent
 * {@link isErrorEvent}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */

function isErrorEvent(wat) {
  return Object.prototype.toString.call(wat) === '[object ErrorEvent]';
}
/**
 * Checks whether given value's type is DOMError
 * {@link isDOMError}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */

function isDOMError(wat) {
  return Object.prototype.toString.call(wat) === '[object DOMError]';
}
/**
 * Checks whether given value's type is DOMException
 * {@link isDOMException}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */

function isDOMException(wat) {
  return Object.prototype.toString.call(wat) === '[object DOMException]';
}
/**
 * Checks whether given value's type is a string
 * {@link isString}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */

function isString(wat) {
  return Object.prototype.toString.call(wat) === '[object String]';
}
/**
 * Checks whether given value's is a primitive (undefined, null, number, boolean, string)
 * {@link isPrimitive}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */

function isPrimitive(wat) {
  return wat === null || _typeof(wat) !== 'object' && typeof wat !== 'function';
}
/**
 * Checks whether given value's type is an object literal
 * {@link isPlainObject}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */

function isPlainObject(wat) {
  return Object.prototype.toString.call(wat) === '[object Object]';
}
/**
 * Checks whether given value's type is an Event instance
 * {@link isEvent}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */

function isEvent(wat) {
  // tslint:disable-next-line:strict-type-predicates
  return typeof Event !== 'undefined' && isInstanceOf(wat, Event);
}
/**
 * Checks whether given value's type is an Element instance
 * {@link isElement}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */

function isElement(wat) {
  // tslint:disable-next-line:strict-type-predicates
  return typeof Element !== 'undefined' && isInstanceOf(wat, Element);
}
/**
 * Checks whether given value's type is an regexp
 * {@link isRegExp}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */

function isRegExp(wat) {
  return Object.prototype.toString.call(wat) === '[object RegExp]';
}
/**
 * Checks whether given value has a then function.
 * @param wat A value to be checked.
 */

function isThenable(wat) {
  // tslint:disable:no-unsafe-any
  return Boolean(wat && wat.then && typeof wat.then === 'function'); // tslint:enable:no-unsafe-any
}
/**
 * Checks whether given value's type is a SyntheticEvent
 * {@link isSyntheticEvent}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */

function isSyntheticEvent(wat) {
  // tslint:disable-next-line:no-unsafe-any
  return isPlainObject(wat) && 'nativeEvent' in wat && 'preventDefault' in wat && 'stopPropagation' in wat;
}
/**
 * Checks whether given value's type is an instance of provided constructor.
 * {@link isInstanceOf}.
 *
 * @param wat A value to be checked.
 * @param base A constructor to be used in a check.
 * @returns A boolean representing the result.
 */

function isInstanceOf(wat, base) {
  try {
    // tslint:disable-next-line:no-unsafe-any
    return wat instanceof base;
  } catch (_e) {
    return false;
  }
}

/***/ }),

/***/ "./node_modules/@sentry/utils/esm/logger.js":
/*!**************************************************!*\
  !*** ./node_modules/@sentry/utils/esm/logger.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "logger": () => /* binding */ logger
/* harmony export */ });
/* harmony import */ var _misc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./misc */ "./node_modules/@sentry/utils/esm/misc.js");
 // TODO: Implement different loggers for different environments

var global = (0,_misc__WEBPACK_IMPORTED_MODULE_0__.getGlobalObject)();
/** Prefix for logging strings */

var PREFIX = 'Sentry Logger ';
/** JSDoc */

var Logger =
/** @class */
function () {
  /** JSDoc */
  function Logger() {
    this._enabled = false;
  }
  /** JSDoc */


  Logger.prototype.disable = function () {
    this._enabled = false;
  };
  /** JSDoc */


  Logger.prototype.enable = function () {
    this._enabled = true;
  };
  /** JSDoc */


  Logger.prototype.log = function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    if (!this._enabled) {
      return;
    }

    (0,_misc__WEBPACK_IMPORTED_MODULE_0__.consoleSandbox)(function () {
      global.console.log(PREFIX + "[Log]: " + args.join(' ')); // tslint:disable-line:no-console
    });
  };
  /** JSDoc */


  Logger.prototype.warn = function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    if (!this._enabled) {
      return;
    }

    (0,_misc__WEBPACK_IMPORTED_MODULE_0__.consoleSandbox)(function () {
      global.console.warn(PREFIX + "[Warn]: " + args.join(' ')); // tslint:disable-line:no-console
    });
  };
  /** JSDoc */


  Logger.prototype.error = function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    if (!this._enabled) {
      return;
    }

    (0,_misc__WEBPACK_IMPORTED_MODULE_0__.consoleSandbox)(function () {
      global.console.error(PREFIX + "[Error]: " + args.join(' ')); // tslint:disable-line:no-console
    });
  };

  return Logger;
}(); // Ensure we only have a single logger instance, even if multiple versions of @sentry/utils are being used


global.__SENTRY__ = global.__SENTRY__ || {};
var logger = global.__SENTRY__.logger || (global.__SENTRY__.logger = new Logger());


/***/ }),

/***/ "./node_modules/@sentry/utils/esm/memo.js":
/*!************************************************!*\
  !*** ./node_modules/@sentry/utils/esm/memo.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Memo": () => /* binding */ Memo
/* harmony export */ });
// tslint:disable:no-unsafe-any

/**
 * Memo class used for decycle json objects. Uses WeakSet if available otherwise array.
 */
var Memo =
/** @class */
function () {
  function Memo() {
    // tslint:disable-next-line
    this._hasWeakSet = typeof WeakSet === 'function';
    this._inner = this._hasWeakSet ? new WeakSet() : [];
  }
  /**
   * Sets obj to remember.
   * @param obj Object to remember
   */


  Memo.prototype.memoize = function (obj) {
    if (this._hasWeakSet) {
      if (this._inner.has(obj)) {
        return true;
      }

      this._inner.add(obj);

      return false;
    } // tslint:disable-next-line:prefer-for-of


    for (var i = 0; i < this._inner.length; i++) {
      var value = this._inner[i];

      if (value === obj) {
        return true;
      }
    }

    this._inner.push(obj);

    return false;
  };
  /**
   * Removes object from internal storage.
   * @param obj Object to forget
   */


  Memo.prototype.unmemoize = function (obj) {
    if (this._hasWeakSet) {
      this._inner.delete(obj);
    } else {
      for (var i = 0; i < this._inner.length; i++) {
        if (this._inner[i] === obj) {
          this._inner.splice(i, 1);

          break;
        }
      }
    }
  };

  return Memo;
}();



/***/ }),

/***/ "./node_modules/@sentry/utils/esm/misc.js":
/*!************************************************!*\
  !*** ./node_modules/@sentry/utils/esm/misc.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dynamicRequire": () => /* binding */ dynamicRequire,
/* harmony export */   "isNodeEnv": () => /* binding */ isNodeEnv,
/* harmony export */   "getGlobalObject": () => /* binding */ getGlobalObject,
/* harmony export */   "uuid4": () => /* binding */ uuid4,
/* harmony export */   "parseUrl": () => /* binding */ parseUrl,
/* harmony export */   "getEventDescription": () => /* binding */ getEventDescription,
/* harmony export */   "consoleSandbox": () => /* binding */ consoleSandbox,
/* harmony export */   "addExceptionTypeValue": () => /* binding */ addExceptionTypeValue,
/* harmony export */   "addExceptionMechanism": () => /* binding */ addExceptionMechanism,
/* harmony export */   "getLocationHref": () => /* binding */ getLocationHref,
/* harmony export */   "htmlTreeAsString": () => /* binding */ htmlTreeAsString,
/* harmony export */   "timestampWithMs": () => /* binding */ timestampWithMs,
/* harmony export */   "parseRetryAfterHeader": () => /* binding */ parseRetryAfterHeader,
/* harmony export */   "getFunctionName": () => /* binding */ getFunctionName
/* harmony export */ });
/* unused harmony export parseSemver */
/* harmony import */ var _is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./is */ "./node_modules/@sentry/utils/esm/is.js");

/**
 * Requires a module which is protected _against bundler minification.
 *
 * @param request The module path to resolve
 */

function dynamicRequire(mod, request) {
  // tslint:disable-next-line: no-unsafe-any
  return mod.require(request);
}
/**
 * Checks whether we're in the Node.js or Browser environment
 *
 * @returns Answer to given question
 */

function isNodeEnv() {
  // tslint:disable:strict-type-predicates
  return Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]';
}
var fallbackGlobalObject = {};
/**
 * Safely get global scope object
 *
 * @returns Global scope object
 */

function getGlobalObject() {
  return isNodeEnv() ? __webpack_require__.g : typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : fallbackGlobalObject;
}
/**
 * UUID4 generator
 *
 * @returns string Generated UUID4.
 */

function uuid4() {
  var global = getGlobalObject();
  var crypto = global.crypto || global.msCrypto;

  if (!(crypto === void 0) && crypto.getRandomValues) {
    // Use window.crypto API if available
    var arr = new Uint16Array(8);
    crypto.getRandomValues(arr); // set 4 in byte 7
    // tslint:disable-next-line:no-bitwise

    arr[3] = arr[3] & 0xfff | 0x4000; // set 2 most significant bits of byte 9 to '10'
    // tslint:disable-next-line:no-bitwise

    arr[4] = arr[4] & 0x3fff | 0x8000;

    var pad = function pad(num) {
      var v = num.toString(16);

      while (v.length < 4) {
        v = "0" + v;
      }

      return v;
    };

    return pad(arr[0]) + pad(arr[1]) + pad(arr[2]) + pad(arr[3]) + pad(arr[4]) + pad(arr[5]) + pad(arr[6]) + pad(arr[7]);
  } // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/2117523#2117523


  return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    // tslint:disable-next-line:no-bitwise
    var r = Math.random() * 16 | 0; // tslint:disable-next-line:no-bitwise

    var v = c === 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
}
/**
 * Parses string form of URL into an object
 * // borrowed from https://tools.ietf.org/html/rfc3986#appendix-B
 * // intentionally using regex and not <a/> href parsing trick because React Native and other
 * // environments where DOM might not be available
 * @returns parsed URL object
 */

function parseUrl(url) {
  if (!url) {
    return {};
  }

  var match = url.match(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);

  if (!match) {
    return {};
  } // coerce to undefined values to empty string so we don't get 'undefined'


  var query = match[6] || '';
  var fragment = match[8] || '';
  return {
    host: match[4],
    path: match[5],
    protocol: match[2],
    relative: match[5] + query + fragment
  };
}
/**
 * Extracts either message or type+value from an event that can be used for user-facing logs
 * @returns event's description
 */

function getEventDescription(event) {
  if (event.message) {
    return event.message;
  }

  if (event.exception && event.exception.values && event.exception.values[0]) {
    var exception = event.exception.values[0];

    if (exception.type && exception.value) {
      return exception.type + ": " + exception.value;
    }

    return exception.type || exception.value || event.event_id || '<unknown>';
  }

  return event.event_id || '<unknown>';
}
/** JSDoc */

function consoleSandbox(callback) {
  var global = getGlobalObject();
  var levels = ['debug', 'info', 'warn', 'error', 'log', 'assert'];

  if (!('console' in global)) {
    return callback();
  }

  var originalConsole = global.console;
  var wrappedLevels = {}; // Restore all wrapped console methods

  levels.forEach(function (level) {
    if (level in global.console && originalConsole[level].__sentry_original__) {
      wrappedLevels[level] = originalConsole[level];
      originalConsole[level] = originalConsole[level].__sentry_original__;
    }
  }); // Perform callback manipulations

  var result = callback(); // Revert restoration to wrapped state

  Object.keys(wrappedLevels).forEach(function (level) {
    originalConsole[level] = wrappedLevels[level];
  });
  return result;
}
/**
 * Adds exception values, type and value to an synthetic Exception.
 * @param event The event to modify.
 * @param value Value of the exception.
 * @param type Type of the exception.
 * @hidden
 */

function addExceptionTypeValue(event, value, type) {
  event.exception = event.exception || {};
  event.exception.values = event.exception.values || [];
  event.exception.values[0] = event.exception.values[0] || {};
  event.exception.values[0].value = event.exception.values[0].value || value || '';
  event.exception.values[0].type = event.exception.values[0].type || type || 'Error';
}
/**
 * Adds exception mechanism to a given event.
 * @param event The event to modify.
 * @param mechanism Mechanism of the mechanism.
 * @hidden
 */

function addExceptionMechanism(event, mechanism) {
  if (mechanism === void 0) {
    mechanism = {};
  } // TODO: Use real type with `keyof Mechanism` thingy and maybe make it better?


  try {
    // @ts-ignore
    // tslint:disable:no-non-null-assertion
    event.exception.values[0].mechanism = event.exception.values[0].mechanism || {};
    Object.keys(mechanism).forEach(function (key) {
      // @ts-ignore
      event.exception.values[0].mechanism[key] = mechanism[key];
    });
  } catch (_oO) {// no-empty
  }
}
/**
 * A safe form of location.href
 */

function getLocationHref() {
  try {
    return document.location.href;
  } catch (oO) {
    return '';
  }
}
/**
 * Given a child DOM element, returns a query-selector statement describing that
 * and its ancestors
 * e.g. [HTMLElement] => body > div > input#foo.btn[name=baz]
 * @returns generated DOM path
 */

function htmlTreeAsString(elem) {
  // try/catch both:
  // - accessing event.target (see getsentry/raven-js#838, #768)
  // - `htmlTreeAsString` because it's complex, and just accessing the DOM incorrectly
  // - can throw an exception in some circumstances.
  try {
    var currentElem = elem;
    var MAX_TRAVERSE_HEIGHT = 5;
    var MAX_OUTPUT_LEN = 80;
    var out = [];
    var height = 0;
    var len = 0;
    var separator = ' > ';
    var sepLength = separator.length;
    var nextStr = void 0;

    while (currentElem && height++ < MAX_TRAVERSE_HEIGHT) {
      nextStr = _htmlElementAsString(currentElem); // bail out if
      // - nextStr is the 'html' element
      // - the length of the string that would be created exceeds MAX_OUTPUT_LEN
      //   (ignore this limit if we are on the first iteration)

      if (nextStr === 'html' || height > 1 && len + out.length * sepLength + nextStr.length >= MAX_OUTPUT_LEN) {
        break;
      }

      out.push(nextStr);
      len += nextStr.length;
      currentElem = currentElem.parentNode;
    }

    return out.reverse().join(separator);
  } catch (_oO) {
    return '<unknown>';
  }
}
/**
 * Returns a simple, query-selector representation of a DOM element
 * e.g. [HTMLElement] => input#foo.btn[name=baz]
 * @returns generated DOM path
 */

function _htmlElementAsString(el) {
  var elem = el;
  var out = [];
  var className;
  var classes;
  var key;
  var attr;
  var i;

  if (!elem || !elem.tagName) {
    return '';
  }

  out.push(elem.tagName.toLowerCase());

  if (elem.id) {
    out.push("#" + elem.id);
  }

  className = elem.className;

  if (className && (0,_is__WEBPACK_IMPORTED_MODULE_0__.isString)(className)) {
    classes = className.split(/\s+/);

    for (i = 0; i < classes.length; i++) {
      out.push("." + classes[i]);
    }
  }

  var attrWhitelist = ['type', 'name', 'title', 'alt'];

  for (i = 0; i < attrWhitelist.length; i++) {
    key = attrWhitelist[i];
    attr = elem.getAttribute(key);

    if (attr) {
      out.push("[" + key + "=\"" + attr + "\"]");
    }
  }

  return out.join('');
}
/**
 * Returns a timestamp in seconds with milliseconds precision.
 */


function timestampWithMs() {
  return new Date().getTime() / 1000;
} // https://semver.org/#is-there-a-suggested-regular-expression-regex-to-check-a-semver-string

var SEMVER_REGEXP = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;
/**
 * Parses input into a SemVer interface
 * @param input string representation of a semver version
 */

function parseSemver(input) {
  var match = input.match(SEMVER_REGEXP) || [];
  var major = parseInt(match[1], 10);
  var minor = parseInt(match[2], 10);
  var patch = parseInt(match[3], 10);
  return {
    buildmetadata: match[5],
    major: isNaN(major) ? undefined : major,
    minor: isNaN(minor) ? undefined : minor,
    patch: isNaN(patch) ? undefined : patch,
    prerelease: match[4]
  };
}
var defaultRetryAfter = 60 * 1000; // 60 seconds

/**
 * Extracts Retry-After value from the request header or returns default value
 * @param now current unix timestamp
 * @param header string representation of 'Retry-After' header
 */

function parseRetryAfterHeader(now, header) {
  if (!header) {
    return defaultRetryAfter;
  }

  var headerDelay = parseInt("" + header, 10);

  if (!isNaN(headerDelay)) {
    return headerDelay * 1000;
  }

  var headerDate = Date.parse("" + header);

  if (!isNaN(headerDate)) {
    return headerDate - now;
  }

  return defaultRetryAfter;
}
var defaultFunctionName = '<anonymous>';
/**
 * Safely extract function name from itself
 */

function getFunctionName(fn) {
  try {
    if (!fn || typeof fn !== 'function') {
      return defaultFunctionName;
    }

    return fn.name || defaultFunctionName;
  } catch (e) {
    // Just accessing custom props in some Selenium environments
    // can cause a "Permission denied" exception (see raven-js#495).
    return defaultFunctionName;
  }
}

/***/ }),

/***/ "./node_modules/@sentry/utils/esm/object.js":
/*!**************************************************!*\
  !*** ./node_modules/@sentry/utils/esm/object.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fill": () => /* binding */ fill,
/* harmony export */   "urlEncode": () => /* binding */ urlEncode,
/* harmony export */   "normalizeToSize": () => /* binding */ normalizeToSize,
/* harmony export */   "normalize": () => /* binding */ normalize,
/* harmony export */   "extractExceptionKeysForMessage": () => /* binding */ extractExceptionKeysForMessage
/* harmony export */ });
/* unused harmony export walk */
/* harmony import */ var _is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./is */ "./node_modules/@sentry/utils/esm/is.js");
/* harmony import */ var _memo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./memo */ "./node_modules/@sentry/utils/esm/memo.js");
/* harmony import */ var _misc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./misc */ "./node_modules/@sentry/utils/esm/misc.js");
/* harmony import */ var _string__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./string */ "./node_modules/@sentry/utils/esm/string.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }





/**
 * Wrap a given object method with a higher-order function
 *
 * @param source An object that contains a method to be wrapped.
 * @param name A name of method to be wrapped.
 * @param replacement A function that should be used to wrap a given method.
 * @returns void
 */

function fill(source, name, replacement) {
  if (!(name in source)) {
    return;
  }

  var original = source[name];
  var wrapped = replacement(original); // Make sure it's a function first, as we need to attach an empty prototype for `defineProperties` to work
  // otherwise it'll throw "TypeError: Object.defineProperties called on non-object"
  // tslint:disable-next-line:strict-type-predicates

  if (typeof wrapped === 'function') {
    try {
      wrapped.prototype = wrapped.prototype || {};
      Object.defineProperties(wrapped, {
        __sentry_original__: {
          enumerable: false,
          value: original
        }
      });
    } catch (_Oo) {// This can throw if multiple fill happens on a global object like XMLHttpRequest
      // Fixes https://github.com/getsentry/sentry-javascript/issues/2043
    }
  }

  source[name] = wrapped;
}
/**
 * Encodes given object into url-friendly format
 *
 * @param object An object that contains serializable values
 * @returns string Encoded
 */

function urlEncode(object) {
  return Object.keys(object).map( // tslint:disable-next-line:no-unsafe-any
  function (key) {
    return encodeURIComponent(key) + "=" + encodeURIComponent(object[key]);
  }).join('&');
}
/**
 * Transforms any object into an object literal with all it's attributes
 * attached to it.
 *
 * @param value Initial source that we have to transform in order to be usable by the serializer
 */

function getWalkSource(value) {
  if ((0,_is__WEBPACK_IMPORTED_MODULE_0__.isError)(value)) {
    var error = value;
    var err = {
      message: error.message,
      name: error.name,
      stack: error.stack
    };

    for (var i in error) {
      if (Object.prototype.hasOwnProperty.call(error, i)) {
        err[i] = error[i];
      }
    }

    return err;
  }

  if ((0,_is__WEBPACK_IMPORTED_MODULE_0__.isEvent)(value)) {
    var event_1 = value;
    var source = {};
    source.type = event_1.type; // Accessing event.target can throw (see getsentry/raven-js#838, #768)

    try {
      source.target = (0,_is__WEBPACK_IMPORTED_MODULE_0__.isElement)(event_1.target) ? (0,_misc__WEBPACK_IMPORTED_MODULE_1__.htmlTreeAsString)(event_1.target) : Object.prototype.toString.call(event_1.target);
    } catch (_oO) {
      source.target = '<unknown>';
    }

    try {
      source.currentTarget = (0,_is__WEBPACK_IMPORTED_MODULE_0__.isElement)(event_1.currentTarget) ? (0,_misc__WEBPACK_IMPORTED_MODULE_1__.htmlTreeAsString)(event_1.currentTarget) : Object.prototype.toString.call(event_1.currentTarget);
    } catch (_oO) {
      source.currentTarget = '<unknown>';
    } // tslint:disable-next-line:strict-type-predicates


    if (typeof CustomEvent !== 'undefined' && (0,_is__WEBPACK_IMPORTED_MODULE_0__.isInstanceOf)(value, CustomEvent)) {
      source.detail = event_1.detail;
    }

    for (var i in event_1) {
      if (Object.prototype.hasOwnProperty.call(event_1, i)) {
        source[i] = event_1;
      }
    }

    return source;
  }

  return value;
}
/** Calculates bytes size of input string */


function utf8Length(value) {
  // tslint:disable-next-line:no-bitwise
  return ~-encodeURI(value).split(/%..|./).length;
}
/** Calculates bytes size of input object */


function jsonSize(value) {
  return utf8Length(JSON.stringify(value));
}
/** JSDoc */


function normalizeToSize(object, // Default Node.js REPL depth
depth, // 100kB, as 200kB is max payload size, so half sounds reasonable
maxSize) {
  if (depth === void 0) {
    depth = 3;
  }

  if (maxSize === void 0) {
    maxSize = 100 * 1024;
  }

  var serialized = normalize(object, depth);

  if (jsonSize(serialized) > maxSize) {
    return normalizeToSize(object, depth - 1, maxSize);
  }

  return serialized;
}
/** Transforms any input value into a string form, either primitive value or a type of the input */

function serializeValue(value) {
  var type = Object.prototype.toString.call(value); // Node.js REPL notation

  if (typeof value === 'string') {
    return value;
  }

  if (type === '[object Object]') {
    return '[Object]';
  }

  if (type === '[object Array]') {
    return '[Array]';
  }

  var normalized = normalizeValue(value);
  return (0,_is__WEBPACK_IMPORTED_MODULE_0__.isPrimitive)(normalized) ? normalized : type;
}
/**
 * normalizeValue()
 *
 * Takes unserializable input and make it serializable friendly
 *
 * - translates undefined/NaN values to "[undefined]"/"[NaN]" respectively,
 * - serializes Error objects
 * - filter global objects
 */
// tslint:disable-next-line:cyclomatic-complexity


function normalizeValue(value, key) {
  if (key === 'domain' && value && _typeof(value) === 'object' && value._events) {
    return '[Domain]';
  }

  if (key === 'domainEmitter') {
    return '[DomainEmitter]';
  }

  if (typeof __webpack_require__.g !== 'undefined' && value === __webpack_require__.g) {
    return '[Global]';
  }

  if (typeof window !== 'undefined' && value === window) {
    return '[Window]';
  }

  if (typeof document !== 'undefined' && value === document) {
    return '[Document]';
  } // React's SyntheticEvent thingy


  if ((0,_is__WEBPACK_IMPORTED_MODULE_0__.isSyntheticEvent)(value)) {
    return '[SyntheticEvent]';
  } // tslint:disable-next-line:no-tautology-expression


  if (typeof value === 'number' && value !== value) {
    return '[NaN]';
  }

  if (value === void 0) {
    return '[undefined]';
  }

  if (typeof value === 'function') {
    return "[Function: " + (0,_misc__WEBPACK_IMPORTED_MODULE_1__.getFunctionName)(value) + "]";
  }

  return value;
}
/**
 * Walks an object to perform a normalization on it
 *
 * @param key of object that's walked in current iteration
 * @param value object to be walked
 * @param depth Optional number indicating how deep should walking be performed
 * @param memo Optional Memo class handling decycling
 */


function walk(key, value, depth, memo) {
  if (depth === void 0) {
    depth = +Infinity;
  }

  if (memo === void 0) {
    memo = new _memo__WEBPACK_IMPORTED_MODULE_2__.Memo();
  } // If we reach the maximum depth, serialize whatever has left


  if (depth === 0) {
    return serializeValue(value);
  } // If value implements `toJSON` method, call it and return early
  // tslint:disable:no-unsafe-any


  if (value !== null && value !== undefined && typeof value.toJSON === 'function') {
    return value.toJSON();
  } // tslint:enable:no-unsafe-any
  // If normalized value is a primitive, there are no branches left to walk, so we can just bail out, as theres no point in going down that branch any further


  var normalized = normalizeValue(value, key);

  if ((0,_is__WEBPACK_IMPORTED_MODULE_0__.isPrimitive)(normalized)) {
    return normalized;
  } // Create source that we will use for next itterations, either objectified error object (Error type with extracted keys:value pairs) or the input itself


  var source = getWalkSource(value); // Create an accumulator that will act as a parent for all future itterations of that branch

  var acc = Array.isArray(value) ? [] : {}; // If we already walked that branch, bail out, as it's circular reference

  if (memo.memoize(value)) {
    return '[Circular ~]';
  } // Walk all keys of the source


  for (var innerKey in source) {
    // Avoid iterating over fields in the prototype if they've somehow been exposed to enumeration.
    if (!Object.prototype.hasOwnProperty.call(source, innerKey)) {
      continue;
    } // Recursively walk through all the child nodes


    acc[innerKey] = walk(innerKey, source[innerKey], depth - 1, memo);
  } // Once walked through all the branches, remove the parent from memo storage


  memo.unmemoize(value); // Return accumulated values

  return acc;
}
/**
 * normalize()
 *
 * - Creates a copy to prevent original input mutation
 * - Skip non-enumerablers
 * - Calls `toJSON` if implemented
 * - Removes circular references
 * - Translates non-serializeable values (undefined/NaN/Functions) to serializable format
 * - Translates known global objects/Classes to a string representations
 * - Takes care of Error objects serialization
 * - Optionally limit depth of final output
 */

function normalize(input, depth) {
  try {
    // tslint:disable-next-line:no-unsafe-any
    return JSON.parse(JSON.stringify(input, function (key, value) {
      return walk(key, value, depth);
    }));
  } catch (_oO) {
    return '**non-serializable**';
  }
}
/**
 * Given any captured exception, extract its keys and create a sorted
 * and truncated list that will be used inside the event message.
 * eg. `Non-error exception captured with keys: foo, bar, baz`
 */

function extractExceptionKeysForMessage(exception, maxLength) {
  if (maxLength === void 0) {
    maxLength = 40;
  } // tslint:disable:strict-type-predicates


  var keys = Object.keys(getWalkSource(exception));
  keys.sort();

  if (!keys.length) {
    return '[object has no keys]';
  }

  if (keys[0].length >= maxLength) {
    return (0,_string__WEBPACK_IMPORTED_MODULE_3__.truncate)(keys[0], maxLength);
  }

  for (var includedKeys = keys.length; includedKeys > 0; includedKeys--) {
    var serialized = keys.slice(0, includedKeys).join(', ');

    if (serialized.length > maxLength) {
      continue;
    }

    if (includedKeys === keys.length) {
      return serialized;
    }

    return (0,_string__WEBPACK_IMPORTED_MODULE_3__.truncate)(serialized, maxLength);
  }

  return '';
}

/***/ }),

/***/ "./node_modules/@sentry/utils/esm/polyfill.js":
/*!****************************************************!*\
  !*** ./node_modules/@sentry/utils/esm/polyfill.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setPrototypeOf": () => /* binding */ setPrototypeOf
/* harmony export */ });
var setPrototypeOf = Object.setPrototypeOf || ({
  __proto__: []
} instanceof Array ? setProtoOf : mixinProperties); // tslint:disable-line:no-unbound-method

/**
 * setPrototypeOf polyfill using __proto__
 */

function setProtoOf(obj, proto) {
  // @ts-ignore
  obj.__proto__ = proto;
  return obj;
}
/**
 * setPrototypeOf polyfill using mixin
 */


function mixinProperties(obj, proto) {
  for (var prop in proto) {
    if (!obj.hasOwnProperty(prop)) {
      // @ts-ignore
      obj[prop] = proto[prop];
    }
  }

  return obj;
}

/***/ }),

/***/ "./node_modules/@sentry/utils/esm/promisebuffer.js":
/*!*********************************************************!*\
  !*** ./node_modules/@sentry/utils/esm/promisebuffer.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PromiseBuffer": () => /* binding */ PromiseBuffer
/* harmony export */ });
/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./error */ "./node_modules/@sentry/utils/esm/error.js");
/* harmony import */ var _syncpromise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./syncpromise */ "./node_modules/@sentry/utils/esm/syncpromise.js");


/** A simple queue that holds promises. */

var PromiseBuffer =
/** @class */
function () {
  function PromiseBuffer(_limit) {
    this._limit = _limit;
    /** Internal set of queued Promises */

    this._buffer = [];
  }
  /**
   * Says if the buffer is ready to take more requests
   */


  PromiseBuffer.prototype.isReady = function () {
    return this._limit === undefined || this.length() < this._limit;
  };
  /**
   * Add a promise to the queue.
   *
   * @param task Can be any PromiseLike<T>
   * @returns The original promise.
   */


  PromiseBuffer.prototype.add = function (task) {
    var _this = this;

    if (!this.isReady()) {
      return _syncpromise__WEBPACK_IMPORTED_MODULE_0__.SyncPromise.reject(new _error__WEBPACK_IMPORTED_MODULE_1__.SentryError('Not adding Promise due to buffer limit reached.'));
    }

    if (this._buffer.indexOf(task) === -1) {
      this._buffer.push(task);
    }

    task.then(function () {
      return _this.remove(task);
    }).then(null, function () {
      return _this.remove(task).then(null, function () {// We have to add this catch here otherwise we have an unhandledPromiseRejection
        // because it's a new Promise chain.
      });
    });
    return task;
  };
  /**
   * Remove a promise to the queue.
   *
   * @param task Can be any PromiseLike<T>
   * @returns Removed promise.
   */


  PromiseBuffer.prototype.remove = function (task) {
    var removedTask = this._buffer.splice(this._buffer.indexOf(task), 1)[0];

    return removedTask;
  };
  /**
   * This function returns the number of unresolved promises in the queue.
   */


  PromiseBuffer.prototype.length = function () {
    return this._buffer.length;
  };
  /**
   * This will drain the whole queue, returns true if queue is empty or drained.
   * If timeout is provided and the queue takes longer to drain, the promise still resolves but with false.
   *
   * @param timeout Number in ms to wait until it resolves with false.
   */


  PromiseBuffer.prototype.drain = function (timeout) {
    var _this = this;

    return new _syncpromise__WEBPACK_IMPORTED_MODULE_0__.SyncPromise(function (resolve) {
      var capturedSetTimeout = setTimeout(function () {
        if (timeout && timeout > 0) {
          resolve(false);
        }
      }, timeout);
      _syncpromise__WEBPACK_IMPORTED_MODULE_0__.SyncPromise.all(_this._buffer).then(function () {
        clearTimeout(capturedSetTimeout);
        resolve(true);
      }).then(null, function () {
        resolve(true);
      });
    });
  };

  return PromiseBuffer;
}();



/***/ }),

/***/ "./node_modules/@sentry/utils/esm/string.js":
/*!**************************************************!*\
  !*** ./node_modules/@sentry/utils/esm/string.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "truncate": () => /* binding */ truncate,
/* harmony export */   "safeJoin": () => /* binding */ safeJoin,
/* harmony export */   "isMatchingPattern": () => /* binding */ isMatchingPattern
/* harmony export */ });
/* unused harmony export snipLine */
/* harmony import */ var _is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./is */ "./node_modules/@sentry/utils/esm/is.js");

/**
 * Truncates given string to the maximum characters count
 *
 * @param str An object that contains serializable values
 * @param max Maximum number of characters in truncated string
 * @returns string Encoded
 */

function truncate(str, max) {
  if (max === void 0) {
    max = 0;
  } // tslint:disable-next-line:strict-type-predicates


  if (typeof str !== 'string' || max === 0) {
    return str;
  }

  return str.length <= max ? str : str.substr(0, max) + "...";
}
/**
 * This is basically just `trim_line` from
 * https://github.com/getsentry/sentry/blob/master/src/sentry/lang/javascript/processor.py#L67
 *
 * @param str An object that contains serializable values
 * @param max Maximum number of characters in truncated string
 * @returns string Encoded
 */

function snipLine(line, colno) {
  var newLine = line;
  var ll = newLine.length;

  if (ll <= 150) {
    return newLine;
  }

  if (colno > ll) {
    colno = ll; // tslint:disable-line:no-parameter-reassignment
  }

  var start = Math.max(colno - 60, 0);

  if (start < 5) {
    start = 0;
  }

  var end = Math.min(start + 140, ll);

  if (end > ll - 5) {
    end = ll;
  }

  if (end === ll) {
    start = Math.max(end - 140, 0);
  }

  newLine = newLine.slice(start, end);

  if (start > 0) {
    newLine = "'{snip} " + newLine;
  }

  if (end < ll) {
    newLine += ' {snip}';
  }

  return newLine;
}
/**
 * Join values in array
 * @param input array of values to be joined together
 * @param delimiter string to be placed in-between values
 * @returns Joined values
 */

function safeJoin(input, delimiter) {
  if (!Array.isArray(input)) {
    return '';
  }

  var output = []; // tslint:disable-next-line:prefer-for-of

  for (var i = 0; i < input.length; i++) {
    var value = input[i];

    try {
      output.push(String(value));
    } catch (e) {
      output.push('[value cannot be serialized]');
    }
  }

  return output.join(delimiter);
}
/**
 * Checks if the value matches a regex or includes the string
 * @param value The string value to be checked against
 * @param pattern Either a regex or a string that must be contained in value
 */

function isMatchingPattern(value, pattern) {
  if ((0,_is__WEBPACK_IMPORTED_MODULE_0__.isRegExp)(pattern)) {
    return pattern.test(value);
  }

  if (typeof pattern === 'string') {
    return value.indexOf(pattern) !== -1;
  }

  return false;
}

/***/ }),

/***/ "./node_modules/@sentry/utils/esm/supports.js":
/*!****************************************************!*\
  !*** ./node_modules/@sentry/utils/esm/supports.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "supportsFetch": () => /* binding */ supportsFetch,
/* harmony export */   "supportsNativeFetch": () => /* binding */ supportsNativeFetch,
/* harmony export */   "supportsReferrerPolicy": () => /* binding */ supportsReferrerPolicy,
/* harmony export */   "supportsHistory": () => /* binding */ supportsHistory
/* harmony export */ });
/* unused harmony exports supportsErrorEvent, supportsDOMError, supportsDOMException, supportsReportingObserver */
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./logger */ "./node_modules/@sentry/utils/esm/logger.js");
/* harmony import */ var _misc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./misc */ "./node_modules/@sentry/utils/esm/misc.js");


/**
 * Tells whether current environment supports ErrorEvent objects
 * {@link supportsErrorEvent}.
 *
 * @returns Answer to the given question.
 */

function supportsErrorEvent() {
  try {
    // tslint:disable:no-unused-expression
    new ErrorEvent('');
    return true;
  } catch (e) {
    return false;
  }
}
/**
 * Tells whether current environment supports DOMError objects
 * {@link supportsDOMError}.
 *
 * @returns Answer to the given question.
 */

function supportsDOMError() {
  try {
    // It really needs 1 argument, not 0.
    // Chrome: VM89:1 Uncaught TypeError: Failed to construct 'DOMError':
    // 1 argument required, but only 0 present.
    // @ts-ignore
    // tslint:disable:no-unused-expression
    new DOMError('');
    return true;
  } catch (e) {
    return false;
  }
}
/**
 * Tells whether current environment supports DOMException objects
 * {@link supportsDOMException}.
 *
 * @returns Answer to the given question.
 */

function supportsDOMException() {
  try {
    // tslint:disable:no-unused-expression
    new DOMException('');
    return true;
  } catch (e) {
    return false;
  }
}
/**
 * Tells whether current environment supports Fetch API
 * {@link supportsFetch}.
 *
 * @returns Answer to the given question.
 */

function supportsFetch() {
  if (!('fetch' in (0,_misc__WEBPACK_IMPORTED_MODULE_0__.getGlobalObject)())) {
    return false;
  }

  try {
    // tslint:disable-next-line:no-unused-expression
    new Headers(); // tslint:disable-next-line:no-unused-expression

    new Request(''); // tslint:disable-next-line:no-unused-expression

    new Response();
    return true;
  } catch (e) {
    return false;
  }
}
/**
 * isNativeFetch checks if the given function is a native implementation of fetch()
 */

function isNativeFetch(func) {
  return func && /^function fetch\(\)\s+\{\s+\[native code\]\s+\}$/.test(func.toString());
}
/**
 * Tells whether current environment supports Fetch API natively
 * {@link supportsNativeFetch}.
 *
 * @returns true if `window.fetch` is natively implemented, false otherwise
 */


function supportsNativeFetch() {
  if (!supportsFetch()) {
    return false;
  }

  var global = (0,_misc__WEBPACK_IMPORTED_MODULE_0__.getGlobalObject)(); // Fast path to avoid DOM I/O
  // tslint:disable-next-line:no-unbound-method

  if (isNativeFetch(global.fetch)) {
    return true;
  } // window.fetch is implemented, but is polyfilled or already wrapped (e.g: by a chrome extension)
  // so create a "pure" iframe to see if that has native fetch


  var result = false;
  var doc = global.document;

  if (doc) {
    var sandbox = doc.createElement('iframe');
    sandbox.hidden = true;

    try {
      doc.head.appendChild(sandbox);

      if (sandbox.contentWindow && sandbox.contentWindow.fetch) {
        // tslint:disable-next-line:no-unbound-method
        result = isNativeFetch(sandbox.contentWindow.fetch);
      }

      doc.head.removeChild(sandbox);
    } catch (err) {
      _logger__WEBPACK_IMPORTED_MODULE_1__.logger.warn('Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ', err);
    }
  }

  return result;
}
/**
 * Tells whether current environment supports ReportingObserver API
 * {@link supportsReportingObserver}.
 *
 * @returns Answer to the given question.
 */

function supportsReportingObserver() {
  // tslint:disable-next-line: no-unsafe-any
  return 'ReportingObserver' in (0,_misc__WEBPACK_IMPORTED_MODULE_0__.getGlobalObject)();
}
/**
 * Tells whether current environment supports Referrer Policy API
 * {@link supportsReferrerPolicy}.
 *
 * @returns Answer to the given question.
 */

function supportsReferrerPolicy() {
  // Despite all stars in the sky saying that Edge supports old draft syntax, aka 'never', 'always', 'origin' and 'default
  // https://caniuse.com/#feat=referrer-policy
  // It doesn't. And it throw exception instead of ignoring this parameter...
  // REF: https://github.com/getsentry/raven-js/issues/1233
  if (!supportsFetch()) {
    return false;
  }

  try {
    // tslint:disable:no-unused-expression
    new Request('_', {
      referrerPolicy: 'origin'
    });
    return true;
  } catch (e) {
    return false;
  }
}
/**
 * Tells whether current environment supports History API
 * {@link supportsHistory}.
 *
 * @returns Answer to the given question.
 */

function supportsHistory() {
  // NOTE: in Chrome App environment, touching history.pushState, *even inside
  //       a try/catch block*, will cause Chrome to output an error to console.error
  // borrowed from: https://github.com/angular/angular.js/pull/13945/files
  var global = (0,_misc__WEBPACK_IMPORTED_MODULE_0__.getGlobalObject)();
  var chrome = global.chrome; // tslint:disable-next-line:no-unsafe-any

  var isChromePackagedApp = chrome && chrome.app && chrome.app.runtime;
  var hasHistoryApi = 'history' in global && !!global.history.pushState && !!global.history.replaceState;
  return !isChromePackagedApp && hasHistoryApi;
}

/***/ }),

/***/ "./node_modules/@sentry/utils/esm/syncpromise.js":
/*!*******************************************************!*\
  !*** ./node_modules/@sentry/utils/esm/syncpromise.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SyncPromise": () => /* binding */ SyncPromise
/* harmony export */ });
/* harmony import */ var _is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./is */ "./node_modules/@sentry/utils/esm/is.js");

/** SyncPromise internal states */

var States;

(function (States) {
  /** Pending */
  States["PENDING"] = "PENDING";
  /** Resolved / OK */

  States["RESOLVED"] = "RESOLVED";
  /** Rejected / Error */

  States["REJECTED"] = "REJECTED";
})(States || (States = {}));
/**
 * Thenable class that behaves like a Promise and follows it's interface
 * but is not async internally
 */


var SyncPromise =
/** @class */
function () {
  function SyncPromise(executor) {
    var _this = this;

    this._state = States.PENDING;
    this._handlers = [];
    /** JSDoc */

    this._resolve = function (value) {
      _this._setResult(States.RESOLVED, value);
    };
    /** JSDoc */


    this._reject = function (reason) {
      _this._setResult(States.REJECTED, reason);
    };
    /** JSDoc */


    this._setResult = function (state, value) {
      if (_this._state !== States.PENDING) {
        return;
      }

      if ((0,_is__WEBPACK_IMPORTED_MODULE_0__.isThenable)(value)) {
        value.then(_this._resolve, _this._reject);
        return;
      }

      _this._state = state;
      _this._value = value;

      _this._executeHandlers();
    }; // TODO: FIXME

    /** JSDoc */


    this._attachHandler = function (handler) {
      _this._handlers = _this._handlers.concat(handler);

      _this._executeHandlers();
    };
    /** JSDoc */


    this._executeHandlers = function () {
      if (_this._state === States.PENDING) {
        return;
      }

      if (_this._state === States.REJECTED) {
        _this._handlers.forEach(function (handler) {
          if (handler.onrejected) {
            handler.onrejected(_this._value);
          }
        });
      } else {
        _this._handlers.forEach(function (handler) {
          if (handler.onfulfilled) {
            // tslint:disable-next-line:no-unsafe-any
            handler.onfulfilled(_this._value);
          }
        });
      }

      _this._handlers = [];
    };

    try {
      executor(this._resolve, this._reject);
    } catch (e) {
      this._reject(e);
    }
  }
  /** JSDoc */


  SyncPromise.prototype.toString = function () {
    return '[object SyncPromise]';
  };
  /** JSDoc */


  SyncPromise.resolve = function (value) {
    return new SyncPromise(function (resolve) {
      resolve(value);
    });
  };
  /** JSDoc */


  SyncPromise.reject = function (reason) {
    return new SyncPromise(function (_, reject) {
      reject(reason);
    });
  };
  /** JSDoc */


  SyncPromise.all = function (collection) {
    return new SyncPromise(function (resolve, reject) {
      if (!Array.isArray(collection)) {
        reject(new TypeError("Promise.all requires an array as input."));
        return;
      }

      if (collection.length === 0) {
        resolve([]);
        return;
      }

      var counter = collection.length;
      var resolvedCollection = [];
      collection.forEach(function (item, index) {
        SyncPromise.resolve(item).then(function (value) {
          resolvedCollection[index] = value;
          counter -= 1;

          if (counter !== 0) {
            return;
          }

          resolve(resolvedCollection);
        }).then(null, reject);
      });
    });
  };
  /** JSDoc */


  SyncPromise.prototype.then = function (_onfulfilled, _onrejected) {
    var _this = this;

    return new SyncPromise(function (resolve, reject) {
      _this._attachHandler({
        onfulfilled: function onfulfilled(result) {
          if (!_onfulfilled) {
            // TODO: ¯\_(ツ)_/¯
            // TODO: FIXME
            resolve(result);
            return;
          }

          try {
            resolve(_onfulfilled(result));
            return;
          } catch (e) {
            reject(e);
            return;
          }
        },
        onrejected: function onrejected(reason) {
          if (!_onrejected) {
            reject(reason);
            return;
          }

          try {
            resolve(_onrejected(reason));
            return;
          } catch (e) {
            reject(e);
            return;
          }
        }
      });
    });
  };
  /** JSDoc */


  SyncPromise.prototype.catch = function (onrejected) {
    return this.then(function (val) {
      return val;
    }, onrejected);
  };
  /** JSDoc */


  SyncPromise.prototype.finally = function (onfinally) {
    var _this = this;

    return new SyncPromise(function (resolve, reject) {
      var val;
      var isRejected;
      return _this.then(function (value) {
        isRejected = false;
        val = value;

        if (onfinally) {
          onfinally();
        }
      }, function (reason) {
        isRejected = true;
        val = reason;

        if (onfinally) {
          onfinally();
        }
      }).then(function () {
        if (isRejected) {
          reject(val);
          return;
        } // tslint:disable-next-line:no-unsafe-any


        resolve(val);
      });
    });
  };

  return SyncPromise;
}();



/***/ }),

/***/ "./node_modules/object-assign/index.js":
/*!*********************************************!*\
  !*** ./node_modules/object-assign/index.js ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

/* eslint-disable no-unused-vars */

var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
  if (val === null || val === undefined) {
    throw new TypeError('Object.assign cannot be called with null or undefined');
  }

  return Object(val);
}

function shouldUseNative() {
  try {
    if (!Object.assign) {
      return false;
    } // Detect buggy property enumeration order in older V8 versions.
    // https://bugs.chromium.org/p/v8/issues/detail?id=4118


    var test1 = new String('abc'); // eslint-disable-line no-new-wrappers

    test1[5] = 'de';

    if (Object.getOwnPropertyNames(test1)[0] === '5') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test2 = {};

    for (var i = 0; i < 10; i++) {
      test2['_' + String.fromCharCode(i)] = i;
    }

    var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
      return test2[n];
    });

    if (order2.join('') !== '0123456789') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test3 = {};
    'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
      test3[letter] = letter;
    });

    if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
      return false;
    }

    return true;
  } catch (err) {
    // We don't expect any of the above to throw, but better to be safe.
    return false;
  }
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
  var from;
  var to = toObject(target);
  var symbols;

  for (var s = 1; s < arguments.length; s++) {
    from = Object(arguments[s]);

    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }

    if (getOwnPropertySymbols) {
      symbols = getOwnPropertySymbols(from);

      for (var i = 0; i < symbols.length; i++) {
        if (propIsEnumerable.call(from, symbols[i])) {
          to[symbols[i]] = from[symbols[i]];
        }
      }
    }
  }

  return to;
};

/***/ }),

/***/ "./node_modules/react-dom/cjs/react-dom.production.min.js":
/*!****************************************************************!*\
  !*** ./node_modules/react-dom/cjs/react-dom.production.min.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;
/** @license React v16.14.0
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/*
 Modernizr 3.0.0pre (Custom Build) | MIT
*/


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var aa = __webpack_require__(/*! react */ "./node_modules/react/index.js"),
    n = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js"),
    r = __webpack_require__(/*! scheduler */ "./node_modules/react-dom/node_modules/scheduler/index.js");

function u(a) {
  for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++) {
    b += "&args[]=" + encodeURIComponent(arguments[c]);
  }

  return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}

if (!aa) throw Error(u(227));

function ba(a, b, c, d, e, f, g, h, k) {
  var l = Array.prototype.slice.call(arguments, 3);

  try {
    b.apply(c, l);
  } catch (m) {
    this.onError(m);
  }
}

var da = !1,
    ea = null,
    fa = !1,
    ha = null,
    ia = {
  onError: function onError(a) {
    da = !0;
    ea = a;
  }
};

function ja(a, b, c, d, e, f, g, h, k) {
  da = !1;
  ea = null;
  ba.apply(ia, arguments);
}

function ka(a, b, c, d, e, f, g, h, k) {
  ja.apply(this, arguments);

  if (da) {
    if (da) {
      var l = ea;
      da = !1;
      ea = null;
    } else throw Error(u(198));

    fa || (fa = !0, ha = l);
  }
}

var la = null,
    ma = null,
    na = null;

function oa(a, b, c) {
  var d = a.type || "unknown-event";
  a.currentTarget = na(c);
  ka(d, b, void 0, a);
  a.currentTarget = null;
}

var pa = null,
    qa = {};

function ra() {
  if (pa) for (var a in qa) {
    var b = qa[a],
        c = pa.indexOf(a);
    if (!(-1 < c)) throw Error(u(96, a));

    if (!sa[c]) {
      if (!b.extractEvents) throw Error(u(97, a));
      sa[c] = b;
      c = b.eventTypes;

      for (var d in c) {
        var e = void 0;
        var f = c[d],
            g = b,
            h = d;
        if (ta.hasOwnProperty(h)) throw Error(u(99, h));
        ta[h] = f;
        var k = f.phasedRegistrationNames;

        if (k) {
          for (e in k) {
            k.hasOwnProperty(e) && ua(k[e], g, h);
          }

          e = !0;
        } else f.registrationName ? (ua(f.registrationName, g, h), e = !0) : e = !1;

        if (!e) throw Error(u(98, d, a));
      }
    }
  }
}

function ua(a, b, c) {
  if (va[a]) throw Error(u(100, a));
  va[a] = b;
  wa[a] = b.eventTypes[c].dependencies;
}

var sa = [],
    ta = {},
    va = {},
    wa = {};

function xa(a) {
  var b = !1,
      c;

  for (c in a) {
    if (a.hasOwnProperty(c)) {
      var d = a[c];

      if (!qa.hasOwnProperty(c) || qa[c] !== d) {
        if (qa[c]) throw Error(u(102, c));
        qa[c] = d;
        b = !0;
      }
    }
  }

  b && ra();
}

var ya = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement),
    za = null,
    Aa = null,
    Ba = null;

function Ca(a) {
  if (a = ma(a)) {
    if ("function" !== typeof za) throw Error(u(280));
    var b = a.stateNode;
    b && (b = la(b), za(a.stateNode, a.type, b));
  }
}

function Da(a) {
  Aa ? Ba ? Ba.push(a) : Ba = [a] : Aa = a;
}

function Ea() {
  if (Aa) {
    var a = Aa,
        b = Ba;
    Ba = Aa = null;
    Ca(a);
    if (b) for (a = 0; a < b.length; a++) {
      Ca(b[a]);
    }
  }
}

function Fa(a, b) {
  return a(b);
}

function Ga(a, b, c, d, e) {
  return a(b, c, d, e);
}

function Ha() {}

var Ia = Fa,
    Ja = !1,
    Ka = !1;

function La() {
  if (null !== Aa || null !== Ba) Ha(), Ea();
}

function Ma(a, b, c) {
  if (Ka) return a(b, c);
  Ka = !0;

  try {
    return Ia(a, b, c);
  } finally {
    Ka = !1, La();
  }
}

var Na = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
    Oa = Object.prototype.hasOwnProperty,
    Pa = {},
    Qa = {};

function Ra(a) {
  if (Oa.call(Qa, a)) return !0;
  if (Oa.call(Pa, a)) return !1;
  if (Na.test(a)) return Qa[a] = !0;
  Pa[a] = !0;
  return !1;
}

function Sa(a, b, c, d) {
  if (null !== c && 0 === c.type) return !1;

  switch (_typeof(b)) {
    case "function":
    case "symbol":
      return !0;

    case "boolean":
      if (d) return !1;
      if (null !== c) return !c.acceptsBooleans;
      a = a.toLowerCase().slice(0, 5);
      return "data-" !== a && "aria-" !== a;

    default:
      return !1;
  }
}

function Ta(a, b, c, d) {
  if (null === b || "undefined" === typeof b || Sa(a, b, c, d)) return !0;
  if (d) return !1;
  if (null !== c) switch (c.type) {
    case 3:
      return !b;

    case 4:
      return !1 === b;

    case 5:
      return isNaN(b);

    case 6:
      return isNaN(b) || 1 > b;
  }
  return !1;
}

function v(a, b, c, d, e, f) {
  this.acceptsBooleans = 2 === b || 3 === b || 4 === b;
  this.attributeName = d;
  this.attributeNamespace = e;
  this.mustUseProperty = c;
  this.propertyName = a;
  this.type = b;
  this.sanitizeURL = f;
}

var C = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function (a) {
  C[a] = new v(a, 0, !1, a, null, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function (a) {
  var b = a[0];
  C[b] = new v(b, 1, !1, a[1], null, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (a) {
  C[a] = new v(a, 2, !1, a.toLowerCase(), null, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function (a) {
  C[a] = new v(a, 2, !1, a, null, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function (a) {
  C[a] = new v(a, 3, !1, a.toLowerCase(), null, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function (a) {
  C[a] = new v(a, 3, !0, a, null, !1);
});
["capture", "download"].forEach(function (a) {
  C[a] = new v(a, 4, !1, a, null, !1);
});
["cols", "rows", "size", "span"].forEach(function (a) {
  C[a] = new v(a, 6, !1, a, null, !1);
});
["rowSpan", "start"].forEach(function (a) {
  C[a] = new v(a, 5, !1, a.toLowerCase(), null, !1);
});
var Ua = /[\-:]([a-z])/g;

function Va(a) {
  return a[1].toUpperCase();
}

"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function (a) {
  var b = a.replace(Ua, Va);
  C[b] = new v(b, 1, !1, a, null, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function (a) {
  var b = a.replace(Ua, Va);
  C[b] = new v(b, 1, !1, a, "http://www.w3.org/1999/xlink", !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function (a) {
  var b = a.replace(Ua, Va);
  C[b] = new v(b, 1, !1, a, "http://www.w3.org/XML/1998/namespace", !1);
});
["tabIndex", "crossOrigin"].forEach(function (a) {
  C[a] = new v(a, 1, !1, a.toLowerCase(), null, !1);
});
C.xlinkHref = new v("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0);
["src", "href", "action", "formAction"].forEach(function (a) {
  C[a] = new v(a, 1, !1, a.toLowerCase(), null, !0);
});
var Wa = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
Wa.hasOwnProperty("ReactCurrentDispatcher") || (Wa.ReactCurrentDispatcher = {
  current: null
});
Wa.hasOwnProperty("ReactCurrentBatchConfig") || (Wa.ReactCurrentBatchConfig = {
  suspense: null
});

function Xa(a, b, c, d) {
  var e = C.hasOwnProperty(b) ? C[b] : null;
  var f = null !== e ? 0 === e.type : d ? !1 : !(2 < b.length) || "o" !== b[0] && "O" !== b[0] || "n" !== b[1] && "N" !== b[1] ? !1 : !0;
  f || (Ta(b, c, e, d) && (c = null), d || null === e ? Ra(b) && (null === c ? a.removeAttribute(b) : a.setAttribute(b, "" + c)) : e.mustUseProperty ? a[e.propertyName] = null === c ? 3 === e.type ? !1 : "" : c : (b = e.attributeName, d = e.attributeNamespace, null === c ? a.removeAttribute(b) : (e = e.type, c = 3 === e || 4 === e && !0 === c ? "" : "" + c, d ? a.setAttributeNS(d, b, c) : a.setAttribute(b, c))));
}

var Ya = /^(.*)[\\\/]/,
    E = "function" === typeof Symbol && Symbol.for,
    Za = E ? Symbol.for("react.element") : 60103,
    $a = E ? Symbol.for("react.portal") : 60106,
    ab = E ? Symbol.for("react.fragment") : 60107,
    bb = E ? Symbol.for("react.strict_mode") : 60108,
    cb = E ? Symbol.for("react.profiler") : 60114,
    db = E ? Symbol.for("react.provider") : 60109,
    eb = E ? Symbol.for("react.context") : 60110,
    fb = E ? Symbol.for("react.concurrent_mode") : 60111,
    gb = E ? Symbol.for("react.forward_ref") : 60112,
    hb = E ? Symbol.for("react.suspense") : 60113,
    ib = E ? Symbol.for("react.suspense_list") : 60120,
    jb = E ? Symbol.for("react.memo") : 60115,
    kb = E ? Symbol.for("react.lazy") : 60116,
    lb = E ? Symbol.for("react.block") : 60121,
    mb = "function" === typeof Symbol && Symbol.iterator;

function nb(a) {
  if (null === a || "object" !== _typeof(a)) return null;
  a = mb && a[mb] || a["@@iterator"];
  return "function" === typeof a ? a : null;
}

function ob(a) {
  if (-1 === a._status) {
    a._status = 0;
    var b = a._ctor;
    b = b();
    a._result = b;
    b.then(function (b) {
      0 === a._status && (b = b.default, a._status = 1, a._result = b);
    }, function (b) {
      0 === a._status && (a._status = 2, a._result = b);
    });
  }
}

function pb(a) {
  if (null == a) return null;
  if ("function" === typeof a) return a.displayName || a.name || null;
  if ("string" === typeof a) return a;

  switch (a) {
    case ab:
      return "Fragment";

    case $a:
      return "Portal";

    case cb:
      return "Profiler";

    case bb:
      return "StrictMode";

    case hb:
      return "Suspense";

    case ib:
      return "SuspenseList";
  }

  if ("object" === _typeof(a)) switch (a.$$typeof) {
    case eb:
      return "Context.Consumer";

    case db:
      return "Context.Provider";

    case gb:
      var b = a.render;
      b = b.displayName || b.name || "";
      return a.displayName || ("" !== b ? "ForwardRef(" + b + ")" : "ForwardRef");

    case jb:
      return pb(a.type);

    case lb:
      return pb(a.render);

    case kb:
      if (a = 1 === a._status ? a._result : null) return pb(a);
  }
  return null;
}

function qb(a) {
  var b = "";

  do {
    a: switch (a.tag) {
      case 3:
      case 4:
      case 6:
      case 7:
      case 10:
      case 9:
        var c = "";
        break a;

      default:
        var d = a._debugOwner,
            e = a._debugSource,
            f = pb(a.type);
        c = null;
        d && (c = pb(d.type));
        d = f;
        f = "";
        e ? f = " (at " + e.fileName.replace(Ya, "") + ":" + e.lineNumber + ")" : c && (f = " (created by " + c + ")");
        c = "\n    in " + (d || "Unknown") + f;
    }

    b += c;
    a = a.return;
  } while (a);

  return b;
}

function rb(a) {
  switch (_typeof(a)) {
    case "boolean":
    case "number":
    case "object":
    case "string":
    case "undefined":
      return a;

    default:
      return "";
  }
}

function sb(a) {
  var b = a.type;
  return (a = a.nodeName) && "input" === a.toLowerCase() && ("checkbox" === b || "radio" === b);
}

function tb(a) {
  var b = sb(a) ? "checked" : "value",
      c = Object.getOwnPropertyDescriptor(a.constructor.prototype, b),
      d = "" + a[b];

  if (!a.hasOwnProperty(b) && "undefined" !== typeof c && "function" === typeof c.get && "function" === typeof c.set) {
    var e = c.get,
        f = c.set;
    Object.defineProperty(a, b, {
      configurable: !0,
      get: function get() {
        return e.call(this);
      },
      set: function set(a) {
        d = "" + a;
        f.call(this, a);
      }
    });
    Object.defineProperty(a, b, {
      enumerable: c.enumerable
    });
    return {
      getValue: function getValue() {
        return d;
      },
      setValue: function setValue(a) {
        d = "" + a;
      },
      stopTracking: function stopTracking() {
        a._valueTracker = null;
        delete a[b];
      }
    };
  }
}

function xb(a) {
  a._valueTracker || (a._valueTracker = tb(a));
}

function yb(a) {
  if (!a) return !1;
  var b = a._valueTracker;
  if (!b) return !0;
  var c = b.getValue();
  var d = "";
  a && (d = sb(a) ? a.checked ? "true" : "false" : a.value);
  a = d;
  return a !== c ? (b.setValue(a), !0) : !1;
}

function zb(a, b) {
  var c = b.checked;
  return n({}, b, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: null != c ? c : a._wrapperState.initialChecked
  });
}

function Ab(a, b) {
  var c = null == b.defaultValue ? "" : b.defaultValue,
      d = null != b.checked ? b.checked : b.defaultChecked;
  c = rb(null != b.value ? b.value : c);
  a._wrapperState = {
    initialChecked: d,
    initialValue: c,
    controlled: "checkbox" === b.type || "radio" === b.type ? null != b.checked : null != b.value
  };
}

function Bb(a, b) {
  b = b.checked;
  null != b && Xa(a, "checked", b, !1);
}

function Cb(a, b) {
  Bb(a, b);
  var c = rb(b.value),
      d = b.type;
  if (null != c) {
    if ("number" === d) {
      if (0 === c && "" === a.value || a.value != c) a.value = "" + c;
    } else a.value !== "" + c && (a.value = "" + c);
  } else if ("submit" === d || "reset" === d) {
    a.removeAttribute("value");
    return;
  }
  b.hasOwnProperty("value") ? Db(a, b.type, c) : b.hasOwnProperty("defaultValue") && Db(a, b.type, rb(b.defaultValue));
  null == b.checked && null != b.defaultChecked && (a.defaultChecked = !!b.defaultChecked);
}

function Eb(a, b, c) {
  if (b.hasOwnProperty("value") || b.hasOwnProperty("defaultValue")) {
    var d = b.type;
    if (!("submit" !== d && "reset" !== d || void 0 !== b.value && null !== b.value)) return;
    b = "" + a._wrapperState.initialValue;
    c || b === a.value || (a.value = b);
    a.defaultValue = b;
  }

  c = a.name;
  "" !== c && (a.name = "");
  a.defaultChecked = !!a._wrapperState.initialChecked;
  "" !== c && (a.name = c);
}

function Db(a, b, c) {
  if ("number" !== b || a.ownerDocument.activeElement !== a) null == c ? a.defaultValue = "" + a._wrapperState.initialValue : a.defaultValue !== "" + c && (a.defaultValue = "" + c);
}

function Fb(a) {
  var b = "";
  aa.Children.forEach(a, function (a) {
    null != a && (b += a);
  });
  return b;
}

function Gb(a, b) {
  a = n({
    children: void 0
  }, b);
  if (b = Fb(b.children)) a.children = b;
  return a;
}

function Hb(a, b, c, d) {
  a = a.options;

  if (b) {
    b = {};

    for (var e = 0; e < c.length; e++) {
      b["$" + c[e]] = !0;
    }

    for (c = 0; c < a.length; c++) {
      e = b.hasOwnProperty("$" + a[c].value), a[c].selected !== e && (a[c].selected = e), e && d && (a[c].defaultSelected = !0);
    }
  } else {
    c = "" + rb(c);
    b = null;

    for (e = 0; e < a.length; e++) {
      if (a[e].value === c) {
        a[e].selected = !0;
        d && (a[e].defaultSelected = !0);
        return;
      }

      null !== b || a[e].disabled || (b = a[e]);
    }

    null !== b && (b.selected = !0);
  }
}

function Ib(a, b) {
  if (null != b.dangerouslySetInnerHTML) throw Error(u(91));
  return n({}, b, {
    value: void 0,
    defaultValue: void 0,
    children: "" + a._wrapperState.initialValue
  });
}

function Jb(a, b) {
  var c = b.value;

  if (null == c) {
    c = b.children;
    b = b.defaultValue;

    if (null != c) {
      if (null != b) throw Error(u(92));

      if (Array.isArray(c)) {
        if (!(1 >= c.length)) throw Error(u(93));
        c = c[0];
      }

      b = c;
    }

    null == b && (b = "");
    c = b;
  }

  a._wrapperState = {
    initialValue: rb(c)
  };
}

function Kb(a, b) {
  var c = rb(b.value),
      d = rb(b.defaultValue);
  null != c && (c = "" + c, c !== a.value && (a.value = c), null == b.defaultValue && a.defaultValue !== c && (a.defaultValue = c));
  null != d && (a.defaultValue = "" + d);
}

function Lb(a) {
  var b = a.textContent;
  b === a._wrapperState.initialValue && "" !== b && null !== b && (a.value = b);
}

var Mb = {
  html: "http://www.w3.org/1999/xhtml",
  mathml: "http://www.w3.org/1998/Math/MathML",
  svg: "http://www.w3.org/2000/svg"
};

function Nb(a) {
  switch (a) {
    case "svg":
      return "http://www.w3.org/2000/svg";

    case "math":
      return "http://www.w3.org/1998/Math/MathML";

    default:
      return "http://www.w3.org/1999/xhtml";
  }
}

function Ob(a, b) {
  return null == a || "http://www.w3.org/1999/xhtml" === a ? Nb(b) : "http://www.w3.org/2000/svg" === a && "foreignObject" === b ? "http://www.w3.org/1999/xhtml" : a;
}

var Pb,
    Qb = function (a) {
  return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function (b, c, d, e) {
    MSApp.execUnsafeLocalFunction(function () {
      return a(b, c, d, e);
    });
  } : a;
}(function (a, b) {
  if (a.namespaceURI !== Mb.svg || "innerHTML" in a) a.innerHTML = b;else {
    Pb = Pb || document.createElement("div");
    Pb.innerHTML = "<svg>" + b.valueOf().toString() + "</svg>";

    for (b = Pb.firstChild; a.firstChild;) {
      a.removeChild(a.firstChild);
    }

    for (; b.firstChild;) {
      a.appendChild(b.firstChild);
    }
  }
});

function Rb(a, b) {
  if (b) {
    var c = a.firstChild;

    if (c && c === a.lastChild && 3 === c.nodeType) {
      c.nodeValue = b;
      return;
    }
  }

  a.textContent = b;
}

function Sb(a, b) {
  var c = {};
  c[a.toLowerCase()] = b.toLowerCase();
  c["Webkit" + a] = "webkit" + b;
  c["Moz" + a] = "moz" + b;
  return c;
}

var Tb = {
  animationend: Sb("Animation", "AnimationEnd"),
  animationiteration: Sb("Animation", "AnimationIteration"),
  animationstart: Sb("Animation", "AnimationStart"),
  transitionend: Sb("Transition", "TransitionEnd")
},
    Ub = {},
    Vb = {};
ya && (Vb = document.createElement("div").style, "AnimationEvent" in window || (delete Tb.animationend.animation, delete Tb.animationiteration.animation, delete Tb.animationstart.animation), "TransitionEvent" in window || delete Tb.transitionend.transition);

function Wb(a) {
  if (Ub[a]) return Ub[a];
  if (!Tb[a]) return a;
  var b = Tb[a],
      c;

  for (c in b) {
    if (b.hasOwnProperty(c) && c in Vb) return Ub[a] = b[c];
  }

  return a;
}

var Xb = Wb("animationend"),
    Yb = Wb("animationiteration"),
    Zb = Wb("animationstart"),
    $b = Wb("transitionend"),
    ac = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),
    bc = new ("function" === typeof WeakMap ? WeakMap : Map)();

function cc(a) {
  var b = bc.get(a);
  void 0 === b && (b = new Map(), bc.set(a, b));
  return b;
}

function dc(a) {
  var b = a,
      c = a;
  if (a.alternate) for (; b.return;) {
    b = b.return;
  } else {
    a = b;

    do {
      b = a, 0 !== (b.effectTag & 1026) && (c = b.return), a = b.return;
    } while (a);
  }
  return 3 === b.tag ? c : null;
}

function ec(a) {
  if (13 === a.tag) {
    var b = a.memoizedState;
    null === b && (a = a.alternate, null !== a && (b = a.memoizedState));
    if (null !== b) return b.dehydrated;
  }

  return null;
}

function fc(a) {
  if (dc(a) !== a) throw Error(u(188));
}

function gc(a) {
  var b = a.alternate;

  if (!b) {
    b = dc(a);
    if (null === b) throw Error(u(188));
    return b !== a ? null : a;
  }

  for (var c = a, d = b;;) {
    var e = c.return;
    if (null === e) break;
    var f = e.alternate;

    if (null === f) {
      d = e.return;

      if (null !== d) {
        c = d;
        continue;
      }

      break;
    }

    if (e.child === f.child) {
      for (f = e.child; f;) {
        if (f === c) return fc(e), a;
        if (f === d) return fc(e), b;
        f = f.sibling;
      }

      throw Error(u(188));
    }

    if (c.return !== d.return) c = e, d = f;else {
      for (var g = !1, h = e.child; h;) {
        if (h === c) {
          g = !0;
          c = e;
          d = f;
          break;
        }

        if (h === d) {
          g = !0;
          d = e;
          c = f;
          break;
        }

        h = h.sibling;
      }

      if (!g) {
        for (h = f.child; h;) {
          if (h === c) {
            g = !0;
            c = f;
            d = e;
            break;
          }

          if (h === d) {
            g = !0;
            d = f;
            c = e;
            break;
          }

          h = h.sibling;
        }

        if (!g) throw Error(u(189));
      }
    }
    if (c.alternate !== d) throw Error(u(190));
  }

  if (3 !== c.tag) throw Error(u(188));
  return c.stateNode.current === c ? a : b;
}

function hc(a) {
  a = gc(a);
  if (!a) return null;

  for (var b = a;;) {
    if (5 === b.tag || 6 === b.tag) return b;
    if (b.child) b.child.return = b, b = b.child;else {
      if (b === a) break;

      for (; !b.sibling;) {
        if (!b.return || b.return === a) return null;
        b = b.return;
      }

      b.sibling.return = b.return;
      b = b.sibling;
    }
  }

  return null;
}

function ic(a, b) {
  if (null == b) throw Error(u(30));
  if (null == a) return b;

  if (Array.isArray(a)) {
    if (Array.isArray(b)) return a.push.apply(a, b), a;
    a.push(b);
    return a;
  }

  return Array.isArray(b) ? [a].concat(b) : [a, b];
}

function jc(a, b, c) {
  Array.isArray(a) ? a.forEach(b, c) : a && b.call(c, a);
}

var kc = null;

function lc(a) {
  if (a) {
    var b = a._dispatchListeners,
        c = a._dispatchInstances;
    if (Array.isArray(b)) for (var d = 0; d < b.length && !a.isPropagationStopped(); d++) {
      oa(a, b[d], c[d]);
    } else b && oa(a, b, c);
    a._dispatchListeners = null;
    a._dispatchInstances = null;
    a.isPersistent() || a.constructor.release(a);
  }
}

function mc(a) {
  null !== a && (kc = ic(kc, a));
  a = kc;
  kc = null;

  if (a) {
    jc(a, lc);
    if (kc) throw Error(u(95));
    if (fa) throw a = ha, fa = !1, ha = null, a;
  }
}

function nc(a) {
  a = a.target || a.srcElement || window;
  a.correspondingUseElement && (a = a.correspondingUseElement);
  return 3 === a.nodeType ? a.parentNode : a;
}

function oc(a) {
  if (!ya) return !1;
  a = "on" + a;
  var b = a in document;
  b || (b = document.createElement("div"), b.setAttribute(a, "return;"), b = "function" === typeof b[a]);
  return b;
}

var pc = [];

function qc(a) {
  a.topLevelType = null;
  a.nativeEvent = null;
  a.targetInst = null;
  a.ancestors.length = 0;
  10 > pc.length && pc.push(a);
}

function rc(a, b, c, d) {
  if (pc.length) {
    var e = pc.pop();
    e.topLevelType = a;
    e.eventSystemFlags = d;
    e.nativeEvent = b;
    e.targetInst = c;
    return e;
  }

  return {
    topLevelType: a,
    eventSystemFlags: d,
    nativeEvent: b,
    targetInst: c,
    ancestors: []
  };
}

function sc(a) {
  var b = a.targetInst,
      c = b;

  do {
    if (!c) {
      a.ancestors.push(c);
      break;
    }

    var d = c;
    if (3 === d.tag) d = d.stateNode.containerInfo;else {
      for (; d.return;) {
        d = d.return;
      }

      d = 3 !== d.tag ? null : d.stateNode.containerInfo;
    }
    if (!d) break;
    b = c.tag;
    5 !== b && 6 !== b || a.ancestors.push(c);
    c = tc(d);
  } while (c);

  for (c = 0; c < a.ancestors.length; c++) {
    b = a.ancestors[c];
    var e = nc(a.nativeEvent);
    d = a.topLevelType;
    var f = a.nativeEvent,
        g = a.eventSystemFlags;
    0 === c && (g |= 64);

    for (var h = null, k = 0; k < sa.length; k++) {
      var l = sa[k];
      l && (l = l.extractEvents(d, b, f, e, g)) && (h = ic(h, l));
    }

    mc(h);
  }
}

function uc(a, b, c) {
  if (!c.has(a)) {
    switch (a) {
      case "scroll":
        vc(b, "scroll", !0);
        break;

      case "focus":
      case "blur":
        vc(b, "focus", !0);
        vc(b, "blur", !0);
        c.set("blur", null);
        c.set("focus", null);
        break;

      case "cancel":
      case "close":
        oc(a) && vc(b, a, !0);
        break;

      case "invalid":
      case "submit":
      case "reset":
        break;

      default:
        -1 === ac.indexOf(a) && F(a, b);
    }

    c.set(a, null);
  }
}

var wc,
    xc,
    yc,
    zc = !1,
    Ac = [],
    Bc = null,
    Cc = null,
    Dc = null,
    Ec = new Map(),
    Fc = new Map(),
    Gc = [],
    Hc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput close cancel copy cut paste click change contextmenu reset submit".split(" "),
    Ic = "focus blur dragenter dragleave mouseover mouseout pointerover pointerout gotpointercapture lostpointercapture".split(" ");

function Jc(a, b) {
  var c = cc(b);
  Hc.forEach(function (a) {
    uc(a, b, c);
  });
  Ic.forEach(function (a) {
    uc(a, b, c);
  });
}

function Kc(a, b, c, d, e) {
  return {
    blockedOn: a,
    topLevelType: b,
    eventSystemFlags: c | 32,
    nativeEvent: e,
    container: d
  };
}

function Lc(a, b) {
  switch (a) {
    case "focus":
    case "blur":
      Bc = null;
      break;

    case "dragenter":
    case "dragleave":
      Cc = null;
      break;

    case "mouseover":
    case "mouseout":
      Dc = null;
      break;

    case "pointerover":
    case "pointerout":
      Ec.delete(b.pointerId);
      break;

    case "gotpointercapture":
    case "lostpointercapture":
      Fc.delete(b.pointerId);
  }
}

function Mc(a, b, c, d, e, f) {
  if (null === a || a.nativeEvent !== f) return a = Kc(b, c, d, e, f), null !== b && (b = Nc(b), null !== b && xc(b)), a;
  a.eventSystemFlags |= d;
  return a;
}

function Oc(a, b, c, d, e) {
  switch (b) {
    case "focus":
      return Bc = Mc(Bc, a, b, c, d, e), !0;

    case "dragenter":
      return Cc = Mc(Cc, a, b, c, d, e), !0;

    case "mouseover":
      return Dc = Mc(Dc, a, b, c, d, e), !0;

    case "pointerover":
      var f = e.pointerId;
      Ec.set(f, Mc(Ec.get(f) || null, a, b, c, d, e));
      return !0;

    case "gotpointercapture":
      return f = e.pointerId, Fc.set(f, Mc(Fc.get(f) || null, a, b, c, d, e)), !0;
  }

  return !1;
}

function Pc(a) {
  var b = tc(a.target);

  if (null !== b) {
    var c = dc(b);
    if (null !== c) if (b = c.tag, 13 === b) {
      if (b = ec(c), null !== b) {
        a.blockedOn = b;
        r.unstable_runWithPriority(a.priority, function () {
          yc(c);
        });
        return;
      }
    } else if (3 === b && c.stateNode.hydrate) {
      a.blockedOn = 3 === c.tag ? c.stateNode.containerInfo : null;
      return;
    }
  }

  a.blockedOn = null;
}

function Qc(a) {
  if (null !== a.blockedOn) return !1;
  var b = Rc(a.topLevelType, a.eventSystemFlags, a.container, a.nativeEvent);

  if (null !== b) {
    var c = Nc(b);
    null !== c && xc(c);
    a.blockedOn = b;
    return !1;
  }

  return !0;
}

function Sc(a, b, c) {
  Qc(a) && c.delete(b);
}

function Tc() {
  for (zc = !1; 0 < Ac.length;) {
    var a = Ac[0];

    if (null !== a.blockedOn) {
      a = Nc(a.blockedOn);
      null !== a && wc(a);
      break;
    }

    var b = Rc(a.topLevelType, a.eventSystemFlags, a.container, a.nativeEvent);
    null !== b ? a.blockedOn = b : Ac.shift();
  }

  null !== Bc && Qc(Bc) && (Bc = null);
  null !== Cc && Qc(Cc) && (Cc = null);
  null !== Dc && Qc(Dc) && (Dc = null);
  Ec.forEach(Sc);
  Fc.forEach(Sc);
}

function Uc(a, b) {
  a.blockedOn === b && (a.blockedOn = null, zc || (zc = !0, r.unstable_scheduleCallback(r.unstable_NormalPriority, Tc)));
}

function Vc(a) {
  function b(b) {
    return Uc(b, a);
  }

  if (0 < Ac.length) {
    Uc(Ac[0], a);

    for (var c = 1; c < Ac.length; c++) {
      var d = Ac[c];
      d.blockedOn === a && (d.blockedOn = null);
    }
  }

  null !== Bc && Uc(Bc, a);
  null !== Cc && Uc(Cc, a);
  null !== Dc && Uc(Dc, a);
  Ec.forEach(b);
  Fc.forEach(b);

  for (c = 0; c < Gc.length; c++) {
    d = Gc[c], d.blockedOn === a && (d.blockedOn = null);
  }

  for (; 0 < Gc.length && (c = Gc[0], null === c.blockedOn);) {
    Pc(c), null === c.blockedOn && Gc.shift();
  }
}

var Wc = {},
    Yc = new Map(),
    Zc = new Map(),
    $c = ["abort", "abort", Xb, "animationEnd", Yb, "animationIteration", Zb, "animationStart", "canplay", "canPlay", "canplaythrough", "canPlayThrough", "durationchange", "durationChange", "emptied", "emptied", "encrypted", "encrypted", "ended", "ended", "error", "error", "gotpointercapture", "gotPointerCapture", "load", "load", "loadeddata", "loadedData", "loadedmetadata", "loadedMetadata", "loadstart", "loadStart", "lostpointercapture", "lostPointerCapture", "playing", "playing", "progress", "progress", "seeking", "seeking", "stalled", "stalled", "suspend", "suspend", "timeupdate", "timeUpdate", $b, "transitionEnd", "waiting", "waiting"];

function ad(a, b) {
  for (var c = 0; c < a.length; c += 2) {
    var d = a[c],
        e = a[c + 1],
        f = "on" + (e[0].toUpperCase() + e.slice(1));
    f = {
      phasedRegistrationNames: {
        bubbled: f,
        captured: f + "Capture"
      },
      dependencies: [d],
      eventPriority: b
    };
    Zc.set(d, b);
    Yc.set(d, f);
    Wc[e] = f;
  }
}

ad("blur blur cancel cancel click click close close contextmenu contextMenu copy copy cut cut auxclick auxClick dblclick doubleClick dragend dragEnd dragstart dragStart drop drop focus focus input input invalid invalid keydown keyDown keypress keyPress keyup keyUp mousedown mouseDown mouseup mouseUp paste paste pause pause play play pointercancel pointerCancel pointerdown pointerDown pointerup pointerUp ratechange rateChange reset reset seeked seeked submit submit touchcancel touchCancel touchend touchEnd touchstart touchStart volumechange volumeChange".split(" "), 0);
ad("drag drag dragenter dragEnter dragexit dragExit dragleave dragLeave dragover dragOver mousemove mouseMove mouseout mouseOut mouseover mouseOver pointermove pointerMove pointerout pointerOut pointerover pointerOver scroll scroll toggle toggle touchmove touchMove wheel wheel".split(" "), 1);
ad($c, 2);

for (var bd = "change selectionchange textInput compositionstart compositionend compositionupdate".split(" "), cd = 0; cd < bd.length; cd++) {
  Zc.set(bd[cd], 0);
}

var dd = r.unstable_UserBlockingPriority,
    ed = r.unstable_runWithPriority,
    fd = !0;

function F(a, b) {
  vc(b, a, !1);
}

function vc(a, b, c) {
  var d = Zc.get(b);

  switch (void 0 === d ? 2 : d) {
    case 0:
      d = gd.bind(null, b, 1, a);
      break;

    case 1:
      d = hd.bind(null, b, 1, a);
      break;

    default:
      d = id.bind(null, b, 1, a);
  }

  c ? a.addEventListener(b, d, !0) : a.addEventListener(b, d, !1);
}

function gd(a, b, c, d) {
  Ja || Ha();
  var e = id,
      f = Ja;
  Ja = !0;

  try {
    Ga(e, a, b, c, d);
  } finally {
    (Ja = f) || La();
  }
}

function hd(a, b, c, d) {
  ed(dd, id.bind(null, a, b, c, d));
}

function id(a, b, c, d) {
  if (fd) if (0 < Ac.length && -1 < Hc.indexOf(a)) a = Kc(null, a, b, c, d), Ac.push(a);else {
    var e = Rc(a, b, c, d);
    if (null === e) Lc(a, d);else if (-1 < Hc.indexOf(a)) a = Kc(e, a, b, c, d), Ac.push(a);else if (!Oc(e, a, b, c, d)) {
      Lc(a, d);
      a = rc(a, d, null, b);

      try {
        Ma(sc, a);
      } finally {
        qc(a);
      }
    }
  }
}

function Rc(a, b, c, d) {
  c = nc(d);
  c = tc(c);

  if (null !== c) {
    var e = dc(c);
    if (null === e) c = null;else {
      var f = e.tag;

      if (13 === f) {
        c = ec(e);
        if (null !== c) return c;
        c = null;
      } else if (3 === f) {
        if (e.stateNode.hydrate) return 3 === e.tag ? e.stateNode.containerInfo : null;
        c = null;
      } else e !== c && (c = null);
    }
  }

  a = rc(a, d, c, b);

  try {
    Ma(sc, a);
  } finally {
    qc(a);
  }

  return null;
}

var jd = {
  animationIterationCount: !0,
  borderImageOutset: !0,
  borderImageSlice: !0,
  borderImageWidth: !0,
  boxFlex: !0,
  boxFlexGroup: !0,
  boxOrdinalGroup: !0,
  columnCount: !0,
  columns: !0,
  flex: !0,
  flexGrow: !0,
  flexPositive: !0,
  flexShrink: !0,
  flexNegative: !0,
  flexOrder: !0,
  gridArea: !0,
  gridRow: !0,
  gridRowEnd: !0,
  gridRowSpan: !0,
  gridRowStart: !0,
  gridColumn: !0,
  gridColumnEnd: !0,
  gridColumnSpan: !0,
  gridColumnStart: !0,
  fontWeight: !0,
  lineClamp: !0,
  lineHeight: !0,
  opacity: !0,
  order: !0,
  orphans: !0,
  tabSize: !0,
  widows: !0,
  zIndex: !0,
  zoom: !0,
  fillOpacity: !0,
  floodOpacity: !0,
  stopOpacity: !0,
  strokeDasharray: !0,
  strokeDashoffset: !0,
  strokeMiterlimit: !0,
  strokeOpacity: !0,
  strokeWidth: !0
},
    kd = ["Webkit", "ms", "Moz", "O"];
Object.keys(jd).forEach(function (a) {
  kd.forEach(function (b) {
    b = b + a.charAt(0).toUpperCase() + a.substring(1);
    jd[b] = jd[a];
  });
});

function ld(a, b, c) {
  return null == b || "boolean" === typeof b || "" === b ? "" : c || "number" !== typeof b || 0 === b || jd.hasOwnProperty(a) && jd[a] ? ("" + b).trim() : b + "px";
}

function md(a, b) {
  a = a.style;

  for (var c in b) {
    if (b.hasOwnProperty(c)) {
      var d = 0 === c.indexOf("--"),
          e = ld(c, b[c], d);
      "float" === c && (c = "cssFloat");
      d ? a.setProperty(c, e) : a[c] = e;
    }
  }
}

var nd = n({
  menuitem: !0
}, {
  area: !0,
  base: !0,
  br: !0,
  col: !0,
  embed: !0,
  hr: !0,
  img: !0,
  input: !0,
  keygen: !0,
  link: !0,
  meta: !0,
  param: !0,
  source: !0,
  track: !0,
  wbr: !0
});

function od(a, b) {
  if (b) {
    if (nd[a] && (null != b.children || null != b.dangerouslySetInnerHTML)) throw Error(u(137, a, ""));

    if (null != b.dangerouslySetInnerHTML) {
      if (null != b.children) throw Error(u(60));
      if (!("object" === _typeof(b.dangerouslySetInnerHTML) && "__html" in b.dangerouslySetInnerHTML)) throw Error(u(61));
    }

    if (null != b.style && "object" !== _typeof(b.style)) throw Error(u(62, ""));
  }
}

function pd(a, b) {
  if (-1 === a.indexOf("-")) return "string" === typeof b.is;

  switch (a) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;

    default:
      return !0;
  }
}

var qd = Mb.html;

function rd(a, b) {
  a = 9 === a.nodeType || 11 === a.nodeType ? a : a.ownerDocument;
  var c = cc(a);
  b = wa[b];

  for (var d = 0; d < b.length; d++) {
    uc(b[d], a, c);
  }
}

function sd() {}

function td(a) {
  a = a || ("undefined" !== typeof document ? document : void 0);
  if ("undefined" === typeof a) return null;

  try {
    return a.activeElement || a.body;
  } catch (b) {
    return a.body;
  }
}

function ud(a) {
  for (; a && a.firstChild;) {
    a = a.firstChild;
  }

  return a;
}

function vd(a, b) {
  var c = ud(a);
  a = 0;

  for (var d; c;) {
    if (3 === c.nodeType) {
      d = a + c.textContent.length;
      if (a <= b && d >= b) return {
        node: c,
        offset: b - a
      };
      a = d;
    }

    a: {
      for (; c;) {
        if (c.nextSibling) {
          c = c.nextSibling;
          break a;
        }

        c = c.parentNode;
      }

      c = void 0;
    }

    c = ud(c);
  }
}

function wd(a, b) {
  return a && b ? a === b ? !0 : a && 3 === a.nodeType ? !1 : b && 3 === b.nodeType ? wd(a, b.parentNode) : "contains" in a ? a.contains(b) : a.compareDocumentPosition ? !!(a.compareDocumentPosition(b) & 16) : !1 : !1;
}

function xd() {
  for (var a = window, b = td(); b instanceof a.HTMLIFrameElement;) {
    try {
      var c = "string" === typeof b.contentWindow.location.href;
    } catch (d) {
      c = !1;
    }

    if (c) a = b.contentWindow;else break;
    b = td(a.document);
  }

  return b;
}

function yd(a) {
  var b = a && a.nodeName && a.nodeName.toLowerCase();
  return b && ("input" === b && ("text" === a.type || "search" === a.type || "tel" === a.type || "url" === a.type || "password" === a.type) || "textarea" === b || "true" === a.contentEditable);
}

var zd = "$",
    Ad = "/$",
    Bd = "$?",
    Cd = "$!",
    Dd = null,
    Ed = null;

function Fd(a, b) {
  switch (a) {
    case "button":
    case "input":
    case "select":
    case "textarea":
      return !!b.autoFocus;
  }

  return !1;
}

function Gd(a, b) {
  return "textarea" === a || "option" === a || "noscript" === a || "string" === typeof b.children || "number" === typeof b.children || "object" === _typeof(b.dangerouslySetInnerHTML) && null !== b.dangerouslySetInnerHTML && null != b.dangerouslySetInnerHTML.__html;
}

var Hd = "function" === typeof setTimeout ? setTimeout : void 0,
    Id = "function" === typeof clearTimeout ? clearTimeout : void 0;

function Jd(a) {
  for (; null != a; a = a.nextSibling) {
    var b = a.nodeType;
    if (1 === b || 3 === b) break;
  }

  return a;
}

function Kd(a) {
  a = a.previousSibling;

  for (var b = 0; a;) {
    if (8 === a.nodeType) {
      var c = a.data;

      if (c === zd || c === Cd || c === Bd) {
        if (0 === b) return a;
        b--;
      } else c === Ad && b++;
    }

    a = a.previousSibling;
  }

  return null;
}

var Ld = Math.random().toString(36).slice(2),
    Md = "__reactInternalInstance$" + Ld,
    Nd = "__reactEventHandlers$" + Ld,
    Od = "__reactContainere$" + Ld;

function tc(a) {
  var b = a[Md];
  if (b) return b;

  for (var c = a.parentNode; c;) {
    if (b = c[Od] || c[Md]) {
      c = b.alternate;
      if (null !== b.child || null !== c && null !== c.child) for (a = Kd(a); null !== a;) {
        if (c = a[Md]) return c;
        a = Kd(a);
      }
      return b;
    }

    a = c;
    c = a.parentNode;
  }

  return null;
}

function Nc(a) {
  a = a[Md] || a[Od];
  return !a || 5 !== a.tag && 6 !== a.tag && 13 !== a.tag && 3 !== a.tag ? null : a;
}

function Pd(a) {
  if (5 === a.tag || 6 === a.tag) return a.stateNode;
  throw Error(u(33));
}

function Qd(a) {
  return a[Nd] || null;
}

function Rd(a) {
  do {
    a = a.return;
  } while (a && 5 !== a.tag);

  return a ? a : null;
}

function Sd(a, b) {
  var c = a.stateNode;
  if (!c) return null;
  var d = la(c);
  if (!d) return null;
  c = d[b];

  a: switch (b) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (d = !d.disabled) || (a = a.type, d = !("button" === a || "input" === a || "select" === a || "textarea" === a));
      a = !d;
      break a;

    default:
      a = !1;
  }

  if (a) return null;
  if (c && "function" !== typeof c) throw Error(u(231, b, _typeof(c)));
  return c;
}

function Td(a, b, c) {
  if (b = Sd(a, c.dispatchConfig.phasedRegistrationNames[b])) c._dispatchListeners = ic(c._dispatchListeners, b), c._dispatchInstances = ic(c._dispatchInstances, a);
}

function Ud(a) {
  if (a && a.dispatchConfig.phasedRegistrationNames) {
    for (var b = a._targetInst, c = []; b;) {
      c.push(b), b = Rd(b);
    }

    for (b = c.length; 0 < b--;) {
      Td(c[b], "captured", a);
    }

    for (b = 0; b < c.length; b++) {
      Td(c[b], "bubbled", a);
    }
  }
}

function Vd(a, b, c) {
  a && c && c.dispatchConfig.registrationName && (b = Sd(a, c.dispatchConfig.registrationName)) && (c._dispatchListeners = ic(c._dispatchListeners, b), c._dispatchInstances = ic(c._dispatchInstances, a));
}

function Wd(a) {
  a && a.dispatchConfig.registrationName && Vd(a._targetInst, null, a);
}

function Xd(a) {
  jc(a, Ud);
}

var Yd = null,
    Zd = null,
    $d = null;

function ae() {
  if ($d) return $d;
  var a,
      b = Zd,
      c = b.length,
      d,
      e = "value" in Yd ? Yd.value : Yd.textContent,
      f = e.length;

  for (a = 0; a < c && b[a] === e[a]; a++) {
    ;
  }

  var g = c - a;

  for (d = 1; d <= g && b[c - d] === e[f - d]; d++) {
    ;
  }

  return $d = e.slice(a, 1 < d ? 1 - d : void 0);
}

function be() {
  return !0;
}

function ce() {
  return !1;
}

function G(a, b, c, d) {
  this.dispatchConfig = a;
  this._targetInst = b;
  this.nativeEvent = c;
  a = this.constructor.Interface;

  for (var e in a) {
    a.hasOwnProperty(e) && ((b = a[e]) ? this[e] = b(c) : "target" === e ? this.target = d : this[e] = c[e]);
  }

  this.isDefaultPrevented = (null != c.defaultPrevented ? c.defaultPrevented : !1 === c.returnValue) ? be : ce;
  this.isPropagationStopped = ce;
  return this;
}

n(G.prototype, {
  preventDefault: function preventDefault() {
    this.defaultPrevented = !0;
    var a = this.nativeEvent;
    a && (a.preventDefault ? a.preventDefault() : "unknown" !== typeof a.returnValue && (a.returnValue = !1), this.isDefaultPrevented = be);
  },
  stopPropagation: function stopPropagation() {
    var a = this.nativeEvent;
    a && (a.stopPropagation ? a.stopPropagation() : "unknown" !== typeof a.cancelBubble && (a.cancelBubble = !0), this.isPropagationStopped = be);
  },
  persist: function persist() {
    this.isPersistent = be;
  },
  isPersistent: ce,
  destructor: function destructor() {
    var a = this.constructor.Interface,
        b;

    for (b in a) {
      this[b] = null;
    }

    this.nativeEvent = this._targetInst = this.dispatchConfig = null;
    this.isPropagationStopped = this.isDefaultPrevented = ce;
    this._dispatchInstances = this._dispatchListeners = null;
  }
});
G.Interface = {
  type: null,
  target: null,
  currentTarget: function currentTarget() {
    return null;
  },
  eventPhase: null,
  bubbles: null,
  cancelable: null,
  timeStamp: function timeStamp(a) {
    return a.timeStamp || Date.now();
  },
  defaultPrevented: null,
  isTrusted: null
};

G.extend = function (a) {
  function b() {}

  function c() {
    return d.apply(this, arguments);
  }

  var d = this;
  b.prototype = d.prototype;
  var e = new b();
  n(e, c.prototype);
  c.prototype = e;
  c.prototype.constructor = c;
  c.Interface = n({}, d.Interface, a);
  c.extend = d.extend;
  de(c);
  return c;
};

de(G);

function ee(a, b, c, d) {
  if (this.eventPool.length) {
    var e = this.eventPool.pop();
    this.call(e, a, b, c, d);
    return e;
  }

  return new this(a, b, c, d);
}

function fe(a) {
  if (!(a instanceof this)) throw Error(u(279));
  a.destructor();
  10 > this.eventPool.length && this.eventPool.push(a);
}

function de(a) {
  a.eventPool = [];
  a.getPooled = ee;
  a.release = fe;
}

var ge = G.extend({
  data: null
}),
    he = G.extend({
  data: null
}),
    ie = [9, 13, 27, 32],
    je = ya && "CompositionEvent" in window,
    ke = null;
ya && "documentMode" in document && (ke = document.documentMode);
var le = ya && "TextEvent" in window && !ke,
    me = ya && (!je || ke && 8 < ke && 11 >= ke),
    ne = String.fromCharCode(32),
    oe = {
  beforeInput: {
    phasedRegistrationNames: {
      bubbled: "onBeforeInput",
      captured: "onBeforeInputCapture"
    },
    dependencies: ["compositionend", "keypress", "textInput", "paste"]
  },
  compositionEnd: {
    phasedRegistrationNames: {
      bubbled: "onCompositionEnd",
      captured: "onCompositionEndCapture"
    },
    dependencies: "blur compositionend keydown keypress keyup mousedown".split(" ")
  },
  compositionStart: {
    phasedRegistrationNames: {
      bubbled: "onCompositionStart",
      captured: "onCompositionStartCapture"
    },
    dependencies: "blur compositionstart keydown keypress keyup mousedown".split(" ")
  },
  compositionUpdate: {
    phasedRegistrationNames: {
      bubbled: "onCompositionUpdate",
      captured: "onCompositionUpdateCapture"
    },
    dependencies: "blur compositionupdate keydown keypress keyup mousedown".split(" ")
  }
},
    pe = !1;

function qe(a, b) {
  switch (a) {
    case "keyup":
      return -1 !== ie.indexOf(b.keyCode);

    case "keydown":
      return 229 !== b.keyCode;

    case "keypress":
    case "mousedown":
    case "blur":
      return !0;

    default:
      return !1;
  }
}

function re(a) {
  a = a.detail;
  return "object" === _typeof(a) && "data" in a ? a.data : null;
}

var se = !1;

function te(a, b) {
  switch (a) {
    case "compositionend":
      return re(b);

    case "keypress":
      if (32 !== b.which) return null;
      pe = !0;
      return ne;

    case "textInput":
      return a = b.data, a === ne && pe ? null : a;

    default:
      return null;
  }
}

function ue(a, b) {
  if (se) return "compositionend" === a || !je && qe(a, b) ? (a = ae(), $d = Zd = Yd = null, se = !1, a) : null;

  switch (a) {
    case "paste":
      return null;

    case "keypress":
      if (!(b.ctrlKey || b.altKey || b.metaKey) || b.ctrlKey && b.altKey) {
        if (b.char && 1 < b.char.length) return b.char;
        if (b.which) return String.fromCharCode(b.which);
      }

      return null;

    case "compositionend":
      return me && "ko" !== b.locale ? null : b.data;

    default:
      return null;
  }
}

var ve = {
  eventTypes: oe,
  extractEvents: function extractEvents(a, b, c, d) {
    var e;
    if (je) b: {
      switch (a) {
        case "compositionstart":
          var f = oe.compositionStart;
          break b;

        case "compositionend":
          f = oe.compositionEnd;
          break b;

        case "compositionupdate":
          f = oe.compositionUpdate;
          break b;
      }

      f = void 0;
    } else se ? qe(a, c) && (f = oe.compositionEnd) : "keydown" === a && 229 === c.keyCode && (f = oe.compositionStart);
    f ? (me && "ko" !== c.locale && (se || f !== oe.compositionStart ? f === oe.compositionEnd && se && (e = ae()) : (Yd = d, Zd = "value" in Yd ? Yd.value : Yd.textContent, se = !0)), f = ge.getPooled(f, b, c, d), e ? f.data = e : (e = re(c), null !== e && (f.data = e)), Xd(f), e = f) : e = null;
    (a = le ? te(a, c) : ue(a, c)) ? (b = he.getPooled(oe.beforeInput, b, c, d), b.data = a, Xd(b)) : b = null;
    return null === e ? b : null === b ? e : [e, b];
  }
},
    we = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0
};

function xe(a) {
  var b = a && a.nodeName && a.nodeName.toLowerCase();
  return "input" === b ? !!we[a.type] : "textarea" === b ? !0 : !1;
}

var ye = {
  change: {
    phasedRegistrationNames: {
      bubbled: "onChange",
      captured: "onChangeCapture"
    },
    dependencies: "blur change click focus input keydown keyup selectionchange".split(" ")
  }
};

function ze(a, b, c) {
  a = G.getPooled(ye.change, a, b, c);
  a.type = "change";
  Da(c);
  Xd(a);
  return a;
}

var Ae = null,
    Be = null;

function Ce(a) {
  mc(a);
}

function De(a) {
  var b = Pd(a);
  if (yb(b)) return a;
}

function Ee(a, b) {
  if ("change" === a) return b;
}

var Fe = !1;
ya && (Fe = oc("input") && (!document.documentMode || 9 < document.documentMode));

function Ge() {
  Ae && (Ae.detachEvent("onpropertychange", He), Be = Ae = null);
}

function He(a) {
  if ("value" === a.propertyName && De(Be)) if (a = ze(Be, a, nc(a)), Ja) mc(a);else {
    Ja = !0;

    try {
      Fa(Ce, a);
    } finally {
      Ja = !1, La();
    }
  }
}

function Ie(a, b, c) {
  "focus" === a ? (Ge(), Ae = b, Be = c, Ae.attachEvent("onpropertychange", He)) : "blur" === a && Ge();
}

function Je(a) {
  if ("selectionchange" === a || "keyup" === a || "keydown" === a) return De(Be);
}

function Ke(a, b) {
  if ("click" === a) return De(b);
}

function Le(a, b) {
  if ("input" === a || "change" === a) return De(b);
}

var Me = {
  eventTypes: ye,
  _isInputEventSupported: Fe,
  extractEvents: function extractEvents(a, b, c, d) {
    var e = b ? Pd(b) : window,
        f = e.nodeName && e.nodeName.toLowerCase();
    if ("select" === f || "input" === f && "file" === e.type) var g = Ee;else if (xe(e)) {
      if (Fe) g = Le;else {
        g = Je;
        var h = Ie;
      }
    } else (f = e.nodeName) && "input" === f.toLowerCase() && ("checkbox" === e.type || "radio" === e.type) && (g = Ke);
    if (g && (g = g(a, b))) return ze(g, c, d);
    h && h(a, e, b);
    "blur" === a && (a = e._wrapperState) && a.controlled && "number" === e.type && Db(e, "number", e.value);
  }
},
    Ne = G.extend({
  view: null,
  detail: null
}),
    Oe = {
  Alt: "altKey",
  Control: "ctrlKey",
  Meta: "metaKey",
  Shift: "shiftKey"
};

function Pe(a) {
  var b = this.nativeEvent;
  return b.getModifierState ? b.getModifierState(a) : (a = Oe[a]) ? !!b[a] : !1;
}

function Qe() {
  return Pe;
}

var Re = 0,
    Se = 0,
    Te = !1,
    Ue = !1,
    Ve = Ne.extend({
  screenX: null,
  screenY: null,
  clientX: null,
  clientY: null,
  pageX: null,
  pageY: null,
  ctrlKey: null,
  shiftKey: null,
  altKey: null,
  metaKey: null,
  getModifierState: Qe,
  button: null,
  buttons: null,
  relatedTarget: function relatedTarget(a) {
    return a.relatedTarget || (a.fromElement === a.srcElement ? a.toElement : a.fromElement);
  },
  movementX: function movementX(a) {
    if ("movementX" in a) return a.movementX;
    var b = Re;
    Re = a.screenX;
    return Te ? "mousemove" === a.type ? a.screenX - b : 0 : (Te = !0, 0);
  },
  movementY: function movementY(a) {
    if ("movementY" in a) return a.movementY;
    var b = Se;
    Se = a.screenY;
    return Ue ? "mousemove" === a.type ? a.screenY - b : 0 : (Ue = !0, 0);
  }
}),
    We = Ve.extend({
  pointerId: null,
  width: null,
  height: null,
  pressure: null,
  tangentialPressure: null,
  tiltX: null,
  tiltY: null,
  twist: null,
  pointerType: null,
  isPrimary: null
}),
    Xe = {
  mouseEnter: {
    registrationName: "onMouseEnter",
    dependencies: ["mouseout", "mouseover"]
  },
  mouseLeave: {
    registrationName: "onMouseLeave",
    dependencies: ["mouseout", "mouseover"]
  },
  pointerEnter: {
    registrationName: "onPointerEnter",
    dependencies: ["pointerout", "pointerover"]
  },
  pointerLeave: {
    registrationName: "onPointerLeave",
    dependencies: ["pointerout", "pointerover"]
  }
},
    Ye = {
  eventTypes: Xe,
  extractEvents: function extractEvents(a, b, c, d, e) {
    var f = "mouseover" === a || "pointerover" === a,
        g = "mouseout" === a || "pointerout" === a;
    if (f && 0 === (e & 32) && (c.relatedTarget || c.fromElement) || !g && !f) return null;
    f = d.window === d ? d : (f = d.ownerDocument) ? f.defaultView || f.parentWindow : window;

    if (g) {
      if (g = b, b = (b = c.relatedTarget || c.toElement) ? tc(b) : null, null !== b) {
        var h = dc(b);
        if (b !== h || 5 !== b.tag && 6 !== b.tag) b = null;
      }
    } else g = null;

    if (g === b) return null;

    if ("mouseout" === a || "mouseover" === a) {
      var k = Ve;
      var l = Xe.mouseLeave;
      var m = Xe.mouseEnter;
      var p = "mouse";
    } else if ("pointerout" === a || "pointerover" === a) k = We, l = Xe.pointerLeave, m = Xe.pointerEnter, p = "pointer";

    a = null == g ? f : Pd(g);
    f = null == b ? f : Pd(b);
    l = k.getPooled(l, g, c, d);
    l.type = p + "leave";
    l.target = a;
    l.relatedTarget = f;
    c = k.getPooled(m, b, c, d);
    c.type = p + "enter";
    c.target = f;
    c.relatedTarget = a;
    d = g;
    p = b;
    if (d && p) a: {
      k = d;
      m = p;
      g = 0;

      for (a = k; a; a = Rd(a)) {
        g++;
      }

      a = 0;

      for (b = m; b; b = Rd(b)) {
        a++;
      }

      for (; 0 < g - a;) {
        k = Rd(k), g--;
      }

      for (; 0 < a - g;) {
        m = Rd(m), a--;
      }

      for (; g--;) {
        if (k === m || k === m.alternate) break a;
        k = Rd(k);
        m = Rd(m);
      }

      k = null;
    } else k = null;
    m = k;

    for (k = []; d && d !== m;) {
      g = d.alternate;
      if (null !== g && g === m) break;
      k.push(d);
      d = Rd(d);
    }

    for (d = []; p && p !== m;) {
      g = p.alternate;
      if (null !== g && g === m) break;
      d.push(p);
      p = Rd(p);
    }

    for (p = 0; p < k.length; p++) {
      Vd(k[p], "bubbled", l);
    }

    for (p = d.length; 0 < p--;) {
      Vd(d[p], "captured", c);
    }

    return 0 === (e & 64) ? [l] : [l, c];
  }
};

function Ze(a, b) {
  return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
}

var $e = "function" === typeof Object.is ? Object.is : Ze,
    af = Object.prototype.hasOwnProperty;

function bf(a, b) {
  if ($e(a, b)) return !0;
  if ("object" !== _typeof(a) || null === a || "object" !== _typeof(b) || null === b) return !1;
  var c = Object.keys(a),
      d = Object.keys(b);
  if (c.length !== d.length) return !1;

  for (d = 0; d < c.length; d++) {
    if (!af.call(b, c[d]) || !$e(a[c[d]], b[c[d]])) return !1;
  }

  return !0;
}

var cf = ya && "documentMode" in document && 11 >= document.documentMode,
    df = {
  select: {
    phasedRegistrationNames: {
      bubbled: "onSelect",
      captured: "onSelectCapture"
    },
    dependencies: "blur contextmenu dragend focus keydown keyup mousedown mouseup selectionchange".split(" ")
  }
},
    ef = null,
    ff = null,
    gf = null,
    hf = !1;

function jf(a, b) {
  var c = b.window === b ? b.document : 9 === b.nodeType ? b : b.ownerDocument;
  if (hf || null == ef || ef !== td(c)) return null;
  c = ef;
  "selectionStart" in c && yd(c) ? c = {
    start: c.selectionStart,
    end: c.selectionEnd
  } : (c = (c.ownerDocument && c.ownerDocument.defaultView || window).getSelection(), c = {
    anchorNode: c.anchorNode,
    anchorOffset: c.anchorOffset,
    focusNode: c.focusNode,
    focusOffset: c.focusOffset
  });
  return gf && bf(gf, c) ? null : (gf = c, a = G.getPooled(df.select, ff, a, b), a.type = "select", a.target = ef, Xd(a), a);
}

var kf = {
  eventTypes: df,
  extractEvents: function extractEvents(a, b, c, d, e, f) {
    e = f || (d.window === d ? d.document : 9 === d.nodeType ? d : d.ownerDocument);

    if (!(f = !e)) {
      a: {
        e = cc(e);
        f = wa.onSelect;

        for (var g = 0; g < f.length; g++) {
          if (!e.has(f[g])) {
            e = !1;
            break a;
          }
        }

        e = !0;
      }

      f = !e;
    }

    if (f) return null;
    e = b ? Pd(b) : window;

    switch (a) {
      case "focus":
        if (xe(e) || "true" === e.contentEditable) ef = e, ff = b, gf = null;
        break;

      case "blur":
        gf = ff = ef = null;
        break;

      case "mousedown":
        hf = !0;
        break;

      case "contextmenu":
      case "mouseup":
      case "dragend":
        return hf = !1, jf(c, d);

      case "selectionchange":
        if (cf) break;

      case "keydown":
      case "keyup":
        return jf(c, d);
    }

    return null;
  }
},
    lf = G.extend({
  animationName: null,
  elapsedTime: null,
  pseudoElement: null
}),
    mf = G.extend({
  clipboardData: function clipboardData(a) {
    return "clipboardData" in a ? a.clipboardData : window.clipboardData;
  }
}),
    nf = Ne.extend({
  relatedTarget: null
});

function of(a) {
  var b = a.keyCode;
  "charCode" in a ? (a = a.charCode, 0 === a && 13 === b && (a = 13)) : a = b;
  10 === a && (a = 13);
  return 32 <= a || 13 === a ? a : 0;
}

var pf = {
  Esc: "Escape",
  Spacebar: " ",
  Left: "ArrowLeft",
  Up: "ArrowUp",
  Right: "ArrowRight",
  Down: "ArrowDown",
  Del: "Delete",
  Win: "OS",
  Menu: "ContextMenu",
  Apps: "ContextMenu",
  Scroll: "ScrollLock",
  MozPrintableKey: "Unidentified"
},
    qf = {
  8: "Backspace",
  9: "Tab",
  12: "Clear",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  19: "Pause",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  45: "Insert",
  46: "Delete",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  144: "NumLock",
  145: "ScrollLock",
  224: "Meta"
},
    rf = Ne.extend({
  key: function key(a) {
    if (a.key) {
      var b = pf[a.key] || a.key;
      if ("Unidentified" !== b) return b;
    }

    return "keypress" === a.type ? (a = of(a), 13 === a ? "Enter" : String.fromCharCode(a)) : "keydown" === a.type || "keyup" === a.type ? qf[a.keyCode] || "Unidentified" : "";
  },
  location: null,
  ctrlKey: null,
  shiftKey: null,
  altKey: null,
  metaKey: null,
  repeat: null,
  locale: null,
  getModifierState: Qe,
  charCode: function charCode(a) {
    return "keypress" === a.type ? of(a) : 0;
  },
  keyCode: function keyCode(a) {
    return "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
  },
  which: function which(a) {
    return "keypress" === a.type ? of(a) : "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
  }
}),
    sf = Ve.extend({
  dataTransfer: null
}),
    tf = Ne.extend({
  touches: null,
  targetTouches: null,
  changedTouches: null,
  altKey: null,
  metaKey: null,
  ctrlKey: null,
  shiftKey: null,
  getModifierState: Qe
}),
    uf = G.extend({
  propertyName: null,
  elapsedTime: null,
  pseudoElement: null
}),
    vf = Ve.extend({
  deltaX: function deltaX(a) {
    return "deltaX" in a ? a.deltaX : "wheelDeltaX" in a ? -a.wheelDeltaX : 0;
  },
  deltaY: function deltaY(a) {
    return "deltaY" in a ? a.deltaY : "wheelDeltaY" in a ? -a.wheelDeltaY : "wheelDelta" in a ? -a.wheelDelta : 0;
  },
  deltaZ: null,
  deltaMode: null
}),
    wf = {
  eventTypes: Wc,
  extractEvents: function extractEvents(a, b, c, d) {
    var e = Yc.get(a);
    if (!e) return null;

    switch (a) {
      case "keypress":
        if (0 === of(c)) return null;

      case "keydown":
      case "keyup":
        a = rf;
        break;

      case "blur":
      case "focus":
        a = nf;
        break;

      case "click":
        if (2 === c.button) return null;

      case "auxclick":
      case "dblclick":
      case "mousedown":
      case "mousemove":
      case "mouseup":
      case "mouseout":
      case "mouseover":
      case "contextmenu":
        a = Ve;
        break;

      case "drag":
      case "dragend":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "dragstart":
      case "drop":
        a = sf;
        break;

      case "touchcancel":
      case "touchend":
      case "touchmove":
      case "touchstart":
        a = tf;
        break;

      case Xb:
      case Yb:
      case Zb:
        a = lf;
        break;

      case $b:
        a = uf;
        break;

      case "scroll":
        a = Ne;
        break;

      case "wheel":
        a = vf;
        break;

      case "copy":
      case "cut":
      case "paste":
        a = mf;
        break;

      case "gotpointercapture":
      case "lostpointercapture":
      case "pointercancel":
      case "pointerdown":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "pointerup":
        a = We;
        break;

      default:
        a = G;
    }

    b = a.getPooled(e, b, c, d);
    Xd(b);
    return b;
  }
};
if (pa) throw Error(u(101));
pa = Array.prototype.slice.call("ResponderEventPlugin SimpleEventPlugin EnterLeaveEventPlugin ChangeEventPlugin SelectEventPlugin BeforeInputEventPlugin".split(" "));
ra();
var xf = Nc;
la = Qd;
ma = xf;
na = Pd;
xa({
  SimpleEventPlugin: wf,
  EnterLeaveEventPlugin: Ye,
  ChangeEventPlugin: Me,
  SelectEventPlugin: kf,
  BeforeInputEventPlugin: ve
});
var yf = [],
    zf = -1;

function H(a) {
  0 > zf || (a.current = yf[zf], yf[zf] = null, zf--);
}

function I(a, b) {
  zf++;
  yf[zf] = a.current;
  a.current = b;
}

var Af = {},
    J = {
  current: Af
},
    K = {
  current: !1
},
    Bf = Af;

function Cf(a, b) {
  var c = a.type.contextTypes;
  if (!c) return Af;
  var d = a.stateNode;
  if (d && d.__reactInternalMemoizedUnmaskedChildContext === b) return d.__reactInternalMemoizedMaskedChildContext;
  var e = {},
      f;

  for (f in c) {
    e[f] = b[f];
  }

  d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = b, a.__reactInternalMemoizedMaskedChildContext = e);
  return e;
}

function L(a) {
  a = a.childContextTypes;
  return null !== a && void 0 !== a;
}

function Df() {
  H(K);
  H(J);
}

function Ef(a, b, c) {
  if (J.current !== Af) throw Error(u(168));
  I(J, b);
  I(K, c);
}

function Ff(a, b, c) {
  var d = a.stateNode;
  a = b.childContextTypes;
  if ("function" !== typeof d.getChildContext) return c;
  d = d.getChildContext();

  for (var e in d) {
    if (!(e in a)) throw Error(u(108, pb(b) || "Unknown", e));
  }

  return n({}, c, {}, d);
}

function Gf(a) {
  a = (a = a.stateNode) && a.__reactInternalMemoizedMergedChildContext || Af;
  Bf = J.current;
  I(J, a);
  I(K, K.current);
  return !0;
}

function Hf(a, b, c) {
  var d = a.stateNode;
  if (!d) throw Error(u(169));
  c ? (a = Ff(a, b, Bf), d.__reactInternalMemoizedMergedChildContext = a, H(K), H(J), I(J, a)) : H(K);
  I(K, c);
}

var If = r.unstable_runWithPriority,
    Jf = r.unstable_scheduleCallback,
    Kf = r.unstable_cancelCallback,
    Lf = r.unstable_requestPaint,
    Mf = r.unstable_now,
    Nf = r.unstable_getCurrentPriorityLevel,
    Of = r.unstable_ImmediatePriority,
    Pf = r.unstable_UserBlockingPriority,
    Qf = r.unstable_NormalPriority,
    Rf = r.unstable_LowPriority,
    Sf = r.unstable_IdlePriority,
    Tf = {},
    Uf = r.unstable_shouldYield,
    Vf = void 0 !== Lf ? Lf : function () {},
    Wf = null,
    Xf = null,
    Yf = !1,
    Zf = Mf(),
    $f = 1E4 > Zf ? Mf : function () {
  return Mf() - Zf;
};

function ag() {
  switch (Nf()) {
    case Of:
      return 99;

    case Pf:
      return 98;

    case Qf:
      return 97;

    case Rf:
      return 96;

    case Sf:
      return 95;

    default:
      throw Error(u(332));
  }
}

function bg(a) {
  switch (a) {
    case 99:
      return Of;

    case 98:
      return Pf;

    case 97:
      return Qf;

    case 96:
      return Rf;

    case 95:
      return Sf;

    default:
      throw Error(u(332));
  }
}

function cg(a, b) {
  a = bg(a);
  return If(a, b);
}

function dg(a, b, c) {
  a = bg(a);
  return Jf(a, b, c);
}

function eg(a) {
  null === Wf ? (Wf = [a], Xf = Jf(Of, fg)) : Wf.push(a);
  return Tf;
}

function gg() {
  if (null !== Xf) {
    var a = Xf;
    Xf = null;
    Kf(a);
  }

  fg();
}

function fg() {
  if (!Yf && null !== Wf) {
    Yf = !0;
    var a = 0;

    try {
      var b = Wf;
      cg(99, function () {
        for (; a < b.length; a++) {
          var c = b[a];

          do {
            c = c(!0);
          } while (null !== c);
        }
      });
      Wf = null;
    } catch (c) {
      throw null !== Wf && (Wf = Wf.slice(a + 1)), Jf(Of, gg), c;
    } finally {
      Yf = !1;
    }
  }
}

function hg(a, b, c) {
  c /= 10;
  return 1073741821 - (((1073741821 - a + b / 10) / c | 0) + 1) * c;
}

function ig(a, b) {
  if (a && a.defaultProps) {
    b = n({}, b);
    a = a.defaultProps;

    for (var c in a) {
      void 0 === b[c] && (b[c] = a[c]);
    }
  }

  return b;
}

var jg = {
  current: null
},
    kg = null,
    lg = null,
    mg = null;

function ng() {
  mg = lg = kg = null;
}

function og(a) {
  var b = jg.current;
  H(jg);
  a.type._context._currentValue = b;
}

function pg(a, b) {
  for (; null !== a;) {
    var c = a.alternate;
    if (a.childExpirationTime < b) a.childExpirationTime = b, null !== c && c.childExpirationTime < b && (c.childExpirationTime = b);else if (null !== c && c.childExpirationTime < b) c.childExpirationTime = b;else break;
    a = a.return;
  }
}

function qg(a, b) {
  kg = a;
  mg = lg = null;
  a = a.dependencies;
  null !== a && null !== a.firstContext && (a.expirationTime >= b && (rg = !0), a.firstContext = null);
}

function sg(a, b) {
  if (mg !== a && !1 !== b && 0 !== b) {
    if ("number" !== typeof b || 1073741823 === b) mg = a, b = 1073741823;
    b = {
      context: a,
      observedBits: b,
      next: null
    };

    if (null === lg) {
      if (null === kg) throw Error(u(308));
      lg = b;
      kg.dependencies = {
        expirationTime: 0,
        firstContext: b,
        responders: null
      };
    } else lg = lg.next = b;
  }

  return a._currentValue;
}

var tg = !1;

function ug(a) {
  a.updateQueue = {
    baseState: a.memoizedState,
    baseQueue: null,
    shared: {
      pending: null
    },
    effects: null
  };
}

function vg(a, b) {
  a = a.updateQueue;
  b.updateQueue === a && (b.updateQueue = {
    baseState: a.baseState,
    baseQueue: a.baseQueue,
    shared: a.shared,
    effects: a.effects
  });
}

function wg(a, b) {
  a = {
    expirationTime: a,
    suspenseConfig: b,
    tag: 0,
    payload: null,
    callback: null,
    next: null
  };
  return a.next = a;
}

function xg(a, b) {
  a = a.updateQueue;

  if (null !== a) {
    a = a.shared;
    var c = a.pending;
    null === c ? b.next = b : (b.next = c.next, c.next = b);
    a.pending = b;
  }
}

function yg(a, b) {
  var c = a.alternate;
  null !== c && vg(c, a);
  a = a.updateQueue;
  c = a.baseQueue;
  null === c ? (a.baseQueue = b.next = b, b.next = b) : (b.next = c.next, c.next = b);
}

function zg(a, b, c, d) {
  var e = a.updateQueue;
  tg = !1;
  var f = e.baseQueue,
      g = e.shared.pending;

  if (null !== g) {
    if (null !== f) {
      var h = f.next;
      f.next = g.next;
      g.next = h;
    }

    f = g;
    e.shared.pending = null;
    h = a.alternate;
    null !== h && (h = h.updateQueue, null !== h && (h.baseQueue = g));
  }

  if (null !== f) {
    h = f.next;
    var k = e.baseState,
        l = 0,
        m = null,
        p = null,
        x = null;

    if (null !== h) {
      var z = h;

      do {
        g = z.expirationTime;

        if (g < d) {
          var ca = {
            expirationTime: z.expirationTime,
            suspenseConfig: z.suspenseConfig,
            tag: z.tag,
            payload: z.payload,
            callback: z.callback,
            next: null
          };
          null === x ? (p = x = ca, m = k) : x = x.next = ca;
          g > l && (l = g);
        } else {
          null !== x && (x = x.next = {
            expirationTime: 1073741823,
            suspenseConfig: z.suspenseConfig,
            tag: z.tag,
            payload: z.payload,
            callback: z.callback,
            next: null
          });
          Ag(g, z.suspenseConfig);

          a: {
            var D = a,
                t = z;
            g = b;
            ca = c;

            switch (t.tag) {
              case 1:
                D = t.payload;

                if ("function" === typeof D) {
                  k = D.call(ca, k, g);
                  break a;
                }

                k = D;
                break a;

              case 3:
                D.effectTag = D.effectTag & -4097 | 64;

              case 0:
                D = t.payload;
                g = "function" === typeof D ? D.call(ca, k, g) : D;
                if (null === g || void 0 === g) break a;
                k = n({}, k, g);
                break a;

              case 2:
                tg = !0;
            }
          }

          null !== z.callback && (a.effectTag |= 32, g = e.effects, null === g ? e.effects = [z] : g.push(z));
        }

        z = z.next;
        if (null === z || z === h) if (g = e.shared.pending, null === g) break;else z = f.next = g.next, g.next = h, e.baseQueue = f = g, e.shared.pending = null;
      } while (1);
    }

    null === x ? m = k : x.next = p;
    e.baseState = m;
    e.baseQueue = x;
    Bg(l);
    a.expirationTime = l;
    a.memoizedState = k;
  }
}

function Cg(a, b, c) {
  a = b.effects;
  b.effects = null;
  if (null !== a) for (b = 0; b < a.length; b++) {
    var d = a[b],
        e = d.callback;

    if (null !== e) {
      d.callback = null;
      d = e;
      e = c;
      if ("function" !== typeof d) throw Error(u(191, d));
      d.call(e);
    }
  }
}

var Dg = Wa.ReactCurrentBatchConfig,
    Eg = new aa.Component().refs;

function Fg(a, b, c, d) {
  b = a.memoizedState;
  c = c(d, b);
  c = null === c || void 0 === c ? b : n({}, b, c);
  a.memoizedState = c;
  0 === a.expirationTime && (a.updateQueue.baseState = c);
}

var Jg = {
  isMounted: function isMounted(a) {
    return (a = a._reactInternalFiber) ? dc(a) === a : !1;
  },
  enqueueSetState: function enqueueSetState(a, b, c) {
    a = a._reactInternalFiber;
    var d = Gg(),
        e = Dg.suspense;
    d = Hg(d, a, e);
    e = wg(d, e);
    e.payload = b;
    void 0 !== c && null !== c && (e.callback = c);
    xg(a, e);
    Ig(a, d);
  },
  enqueueReplaceState: function enqueueReplaceState(a, b, c) {
    a = a._reactInternalFiber;
    var d = Gg(),
        e = Dg.suspense;
    d = Hg(d, a, e);
    e = wg(d, e);
    e.tag = 1;
    e.payload = b;
    void 0 !== c && null !== c && (e.callback = c);
    xg(a, e);
    Ig(a, d);
  },
  enqueueForceUpdate: function enqueueForceUpdate(a, b) {
    a = a._reactInternalFiber;
    var c = Gg(),
        d = Dg.suspense;
    c = Hg(c, a, d);
    d = wg(c, d);
    d.tag = 2;
    void 0 !== b && null !== b && (d.callback = b);
    xg(a, d);
    Ig(a, c);
  }
};

function Kg(a, b, c, d, e, f, g) {
  a = a.stateNode;
  return "function" === typeof a.shouldComponentUpdate ? a.shouldComponentUpdate(d, f, g) : b.prototype && b.prototype.isPureReactComponent ? !bf(c, d) || !bf(e, f) : !0;
}

function Lg(a, b, c) {
  var d = !1,
      e = Af;
  var f = b.contextType;
  "object" === _typeof(f) && null !== f ? f = sg(f) : (e = L(b) ? Bf : J.current, d = b.contextTypes, f = (d = null !== d && void 0 !== d) ? Cf(a, e) : Af);
  b = new b(c, f);
  a.memoizedState = null !== b.state && void 0 !== b.state ? b.state : null;
  b.updater = Jg;
  a.stateNode = b;
  b._reactInternalFiber = a;
  d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = e, a.__reactInternalMemoizedMaskedChildContext = f);
  return b;
}

function Mg(a, b, c, d) {
  a = b.state;
  "function" === typeof b.componentWillReceiveProps && b.componentWillReceiveProps(c, d);
  "function" === typeof b.UNSAFE_componentWillReceiveProps && b.UNSAFE_componentWillReceiveProps(c, d);
  b.state !== a && Jg.enqueueReplaceState(b, b.state, null);
}

function Ng(a, b, c, d) {
  var e = a.stateNode;
  e.props = c;
  e.state = a.memoizedState;
  e.refs = Eg;
  ug(a);
  var f = b.contextType;
  "object" === _typeof(f) && null !== f ? e.context = sg(f) : (f = L(b) ? Bf : J.current, e.context = Cf(a, f));
  zg(a, c, e, d);
  e.state = a.memoizedState;
  f = b.getDerivedStateFromProps;
  "function" === typeof f && (Fg(a, b, f, c), e.state = a.memoizedState);
  "function" === typeof b.getDerivedStateFromProps || "function" === typeof e.getSnapshotBeforeUpdate || "function" !== typeof e.UNSAFE_componentWillMount && "function" !== typeof e.componentWillMount || (b = e.state, "function" === typeof e.componentWillMount && e.componentWillMount(), "function" === typeof e.UNSAFE_componentWillMount && e.UNSAFE_componentWillMount(), b !== e.state && Jg.enqueueReplaceState(e, e.state, null), zg(a, c, e, d), e.state = a.memoizedState);
  "function" === typeof e.componentDidMount && (a.effectTag |= 4);
}

var Og = Array.isArray;

function Pg(a, b, c) {
  a = c.ref;

  if (null !== a && "function" !== typeof a && "object" !== _typeof(a)) {
    if (c._owner) {
      c = c._owner;

      if (c) {
        if (1 !== c.tag) throw Error(u(309));
        var d = c.stateNode;
      }

      if (!d) throw Error(u(147, a));
      var e = "" + a;
      if (null !== b && null !== b.ref && "function" === typeof b.ref && b.ref._stringRef === e) return b.ref;

      b = function b(a) {
        var b = d.refs;
        b === Eg && (b = d.refs = {});
        null === a ? delete b[e] : b[e] = a;
      };

      b._stringRef = e;
      return b;
    }

    if ("string" !== typeof a) throw Error(u(284));
    if (!c._owner) throw Error(u(290, a));
  }

  return a;
}

function Qg(a, b) {
  if ("textarea" !== a.type) throw Error(u(31, "[object Object]" === Object.prototype.toString.call(b) ? "object with keys {" + Object.keys(b).join(", ") + "}" : b, ""));
}

function Rg(a) {
  function b(b, c) {
    if (a) {
      var d = b.lastEffect;
      null !== d ? (d.nextEffect = c, b.lastEffect = c) : b.firstEffect = b.lastEffect = c;
      c.nextEffect = null;
      c.effectTag = 8;
    }
  }

  function c(c, d) {
    if (!a) return null;

    for (; null !== d;) {
      b(c, d), d = d.sibling;
    }

    return null;
  }

  function d(a, b) {
    for (a = new Map(); null !== b;) {
      null !== b.key ? a.set(b.key, b) : a.set(b.index, b), b = b.sibling;
    }

    return a;
  }

  function e(a, b) {
    a = Sg(a, b);
    a.index = 0;
    a.sibling = null;
    return a;
  }

  function f(b, c, d) {
    b.index = d;
    if (!a) return c;
    d = b.alternate;
    if (null !== d) return d = d.index, d < c ? (b.effectTag = 2, c) : d;
    b.effectTag = 2;
    return c;
  }

  function g(b) {
    a && null === b.alternate && (b.effectTag = 2);
    return b;
  }

  function h(a, b, c, d) {
    if (null === b || 6 !== b.tag) return b = Tg(c, a.mode, d), b.return = a, b;
    b = e(b, c);
    b.return = a;
    return b;
  }

  function k(a, b, c, d) {
    if (null !== b && b.elementType === c.type) return d = e(b, c.props), d.ref = Pg(a, b, c), d.return = a, d;
    d = Ug(c.type, c.key, c.props, null, a.mode, d);
    d.ref = Pg(a, b, c);
    d.return = a;
    return d;
  }

  function l(a, b, c, d) {
    if (null === b || 4 !== b.tag || b.stateNode.containerInfo !== c.containerInfo || b.stateNode.implementation !== c.implementation) return b = Vg(c, a.mode, d), b.return = a, b;
    b = e(b, c.children || []);
    b.return = a;
    return b;
  }

  function m(a, b, c, d, f) {
    if (null === b || 7 !== b.tag) return b = Wg(c, a.mode, d, f), b.return = a, b;
    b = e(b, c);
    b.return = a;
    return b;
  }

  function p(a, b, c) {
    if ("string" === typeof b || "number" === typeof b) return b = Tg("" + b, a.mode, c), b.return = a, b;

    if ("object" === _typeof(b) && null !== b) {
      switch (b.$$typeof) {
        case Za:
          return c = Ug(b.type, b.key, b.props, null, a.mode, c), c.ref = Pg(a, null, b), c.return = a, c;

        case $a:
          return b = Vg(b, a.mode, c), b.return = a, b;
      }

      if (Og(b) || nb(b)) return b = Wg(b, a.mode, c, null), b.return = a, b;
      Qg(a, b);
    }

    return null;
  }

  function x(a, b, c, d) {
    var e = null !== b ? b.key : null;
    if ("string" === typeof c || "number" === typeof c) return null !== e ? null : h(a, b, "" + c, d);

    if ("object" === _typeof(c) && null !== c) {
      switch (c.$$typeof) {
        case Za:
          return c.key === e ? c.type === ab ? m(a, b, c.props.children, d, e) : k(a, b, c, d) : null;

        case $a:
          return c.key === e ? l(a, b, c, d) : null;
      }

      if (Og(c) || nb(c)) return null !== e ? null : m(a, b, c, d, null);
      Qg(a, c);
    }

    return null;
  }

  function z(a, b, c, d, e) {
    if ("string" === typeof d || "number" === typeof d) return a = a.get(c) || null, h(b, a, "" + d, e);

    if ("object" === _typeof(d) && null !== d) {
      switch (d.$$typeof) {
        case Za:
          return a = a.get(null === d.key ? c : d.key) || null, d.type === ab ? m(b, a, d.props.children, e, d.key) : k(b, a, d, e);

        case $a:
          return a = a.get(null === d.key ? c : d.key) || null, l(b, a, d, e);
      }

      if (Og(d) || nb(d)) return a = a.get(c) || null, m(b, a, d, e, null);
      Qg(b, d);
    }

    return null;
  }

  function ca(e, g, h, k) {
    for (var l = null, t = null, m = g, y = g = 0, A = null; null !== m && y < h.length; y++) {
      m.index > y ? (A = m, m = null) : A = m.sibling;
      var q = x(e, m, h[y], k);

      if (null === q) {
        null === m && (m = A);
        break;
      }

      a && m && null === q.alternate && b(e, m);
      g = f(q, g, y);
      null === t ? l = q : t.sibling = q;
      t = q;
      m = A;
    }

    if (y === h.length) return c(e, m), l;

    if (null === m) {
      for (; y < h.length; y++) {
        m = p(e, h[y], k), null !== m && (g = f(m, g, y), null === t ? l = m : t.sibling = m, t = m);
      }

      return l;
    }

    for (m = d(e, m); y < h.length; y++) {
      A = z(m, e, y, h[y], k), null !== A && (a && null !== A.alternate && m.delete(null === A.key ? y : A.key), g = f(A, g, y), null === t ? l = A : t.sibling = A, t = A);
    }

    a && m.forEach(function (a) {
      return b(e, a);
    });
    return l;
  }

  function D(e, g, h, l) {
    var k = nb(h);
    if ("function" !== typeof k) throw Error(u(150));
    h = k.call(h);
    if (null == h) throw Error(u(151));

    for (var m = k = null, t = g, y = g = 0, A = null, q = h.next(); null !== t && !q.done; y++, q = h.next()) {
      t.index > y ? (A = t, t = null) : A = t.sibling;
      var D = x(e, t, q.value, l);

      if (null === D) {
        null === t && (t = A);
        break;
      }

      a && t && null === D.alternate && b(e, t);
      g = f(D, g, y);
      null === m ? k = D : m.sibling = D;
      m = D;
      t = A;
    }

    if (q.done) return c(e, t), k;

    if (null === t) {
      for (; !q.done; y++, q = h.next()) {
        q = p(e, q.value, l), null !== q && (g = f(q, g, y), null === m ? k = q : m.sibling = q, m = q);
      }

      return k;
    }

    for (t = d(e, t); !q.done; y++, q = h.next()) {
      q = z(t, e, y, q.value, l), null !== q && (a && null !== q.alternate && t.delete(null === q.key ? y : q.key), g = f(q, g, y), null === m ? k = q : m.sibling = q, m = q);
    }

    a && t.forEach(function (a) {
      return b(e, a);
    });
    return k;
  }

  return function (a, d, f, h) {
    var k = "object" === _typeof(f) && null !== f && f.type === ab && null === f.key;
    k && (f = f.props.children);
    var l = "object" === _typeof(f) && null !== f;
    if (l) switch (f.$$typeof) {
      case Za:
        a: {
          l = f.key;

          for (k = d; null !== k;) {
            if (k.key === l) {
              switch (k.tag) {
                case 7:
                  if (f.type === ab) {
                    c(a, k.sibling);
                    d = e(k, f.props.children);
                    d.return = a;
                    a = d;
                    break a;
                  }

                  break;

                default:
                  if (k.elementType === f.type) {
                    c(a, k.sibling);
                    d = e(k, f.props);
                    d.ref = Pg(a, k, f);
                    d.return = a;
                    a = d;
                    break a;
                  }

              }

              c(a, k);
              break;
            } else b(a, k);

            k = k.sibling;
          }

          f.type === ab ? (d = Wg(f.props.children, a.mode, h, f.key), d.return = a, a = d) : (h = Ug(f.type, f.key, f.props, null, a.mode, h), h.ref = Pg(a, d, f), h.return = a, a = h);
        }

        return g(a);

      case $a:
        a: {
          for (k = f.key; null !== d;) {
            if (d.key === k) {
              if (4 === d.tag && d.stateNode.containerInfo === f.containerInfo && d.stateNode.implementation === f.implementation) {
                c(a, d.sibling);
                d = e(d, f.children || []);
                d.return = a;
                a = d;
                break a;
              } else {
                c(a, d);
                break;
              }
            } else b(a, d);
            d = d.sibling;
          }

          d = Vg(f, a.mode, h);
          d.return = a;
          a = d;
        }

        return g(a);
    }
    if ("string" === typeof f || "number" === typeof f) return f = "" + f, null !== d && 6 === d.tag ? (c(a, d.sibling), d = e(d, f), d.return = a, a = d) : (c(a, d), d = Tg(f, a.mode, h), d.return = a, a = d), g(a);
    if (Og(f)) return ca(a, d, f, h);
    if (nb(f)) return D(a, d, f, h);
    l && Qg(a, f);
    if ("undefined" === typeof f && !k) switch (a.tag) {
      case 1:
      case 0:
        throw a = a.type, Error(u(152, a.displayName || a.name || "Component"));
    }
    return c(a, d);
  };
}

var Xg = Rg(!0),
    Yg = Rg(!1),
    Zg = {},
    $g = {
  current: Zg
},
    ah = {
  current: Zg
},
    bh = {
  current: Zg
};

function ch(a) {
  if (a === Zg) throw Error(u(174));
  return a;
}

function dh(a, b) {
  I(bh, b);
  I(ah, a);
  I($g, Zg);
  a = b.nodeType;

  switch (a) {
    case 9:
    case 11:
      b = (b = b.documentElement) ? b.namespaceURI : Ob(null, "");
      break;

    default:
      a = 8 === a ? b.parentNode : b, b = a.namespaceURI || null, a = a.tagName, b = Ob(b, a);
  }

  H($g);
  I($g, b);
}

function eh() {
  H($g);
  H(ah);
  H(bh);
}

function fh(a) {
  ch(bh.current);
  var b = ch($g.current);
  var c = Ob(b, a.type);
  b !== c && (I(ah, a), I($g, c));
}

function gh(a) {
  ah.current === a && (H($g), H(ah));
}

var M = {
  current: 0
};

function hh(a) {
  for (var b = a; null !== b;) {
    if (13 === b.tag) {
      var c = b.memoizedState;
      if (null !== c && (c = c.dehydrated, null === c || c.data === Bd || c.data === Cd)) return b;
    } else if (19 === b.tag && void 0 !== b.memoizedProps.revealOrder) {
      if (0 !== (b.effectTag & 64)) return b;
    } else if (null !== b.child) {
      b.child.return = b;
      b = b.child;
      continue;
    }

    if (b === a) break;

    for (; null === b.sibling;) {
      if (null === b.return || b.return === a) return null;
      b = b.return;
    }

    b.sibling.return = b.return;
    b = b.sibling;
  }

  return null;
}

function ih(a, b) {
  return {
    responder: a,
    props: b
  };
}

var jh = Wa.ReactCurrentDispatcher,
    kh = Wa.ReactCurrentBatchConfig,
    lh = 0,
    N = null,
    O = null,
    P = null,
    mh = !1;

function Q() {
  throw Error(u(321));
}

function nh(a, b) {
  if (null === b) return !1;

  for (var c = 0; c < b.length && c < a.length; c++) {
    if (!$e(a[c], b[c])) return !1;
  }

  return !0;
}

function oh(a, b, c, d, e, f) {
  lh = f;
  N = b;
  b.memoizedState = null;
  b.updateQueue = null;
  b.expirationTime = 0;
  jh.current = null === a || null === a.memoizedState ? ph : qh;
  a = c(d, e);

  if (b.expirationTime === lh) {
    f = 0;

    do {
      b.expirationTime = 0;
      if (!(25 > f)) throw Error(u(301));
      f += 1;
      P = O = null;
      b.updateQueue = null;
      jh.current = rh;
      a = c(d, e);
    } while (b.expirationTime === lh);
  }

  jh.current = sh;
  b = null !== O && null !== O.next;
  lh = 0;
  P = O = N = null;
  mh = !1;
  if (b) throw Error(u(300));
  return a;
}

function th() {
  var a = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null
  };
  null === P ? N.memoizedState = P = a : P = P.next = a;
  return P;
}

function uh() {
  if (null === O) {
    var a = N.alternate;
    a = null !== a ? a.memoizedState : null;
  } else a = O.next;

  var b = null === P ? N.memoizedState : P.next;
  if (null !== b) P = b, O = a;else {
    if (null === a) throw Error(u(310));
    O = a;
    a = {
      memoizedState: O.memoizedState,
      baseState: O.baseState,
      baseQueue: O.baseQueue,
      queue: O.queue,
      next: null
    };
    null === P ? N.memoizedState = P = a : P = P.next = a;
  }
  return P;
}

function vh(a, b) {
  return "function" === typeof b ? b(a) : b;
}

function wh(a) {
  var b = uh(),
      c = b.queue;
  if (null === c) throw Error(u(311));
  c.lastRenderedReducer = a;
  var d = O,
      e = d.baseQueue,
      f = c.pending;

  if (null !== f) {
    if (null !== e) {
      var g = e.next;
      e.next = f.next;
      f.next = g;
    }

    d.baseQueue = e = f;
    c.pending = null;
  }

  if (null !== e) {
    e = e.next;
    d = d.baseState;
    var h = g = f = null,
        k = e;

    do {
      var l = k.expirationTime;

      if (l < lh) {
        var m = {
          expirationTime: k.expirationTime,
          suspenseConfig: k.suspenseConfig,
          action: k.action,
          eagerReducer: k.eagerReducer,
          eagerState: k.eagerState,
          next: null
        };
        null === h ? (g = h = m, f = d) : h = h.next = m;
        l > N.expirationTime && (N.expirationTime = l, Bg(l));
      } else null !== h && (h = h.next = {
        expirationTime: 1073741823,
        suspenseConfig: k.suspenseConfig,
        action: k.action,
        eagerReducer: k.eagerReducer,
        eagerState: k.eagerState,
        next: null
      }), Ag(l, k.suspenseConfig), d = k.eagerReducer === a ? k.eagerState : a(d, k.action);

      k = k.next;
    } while (null !== k && k !== e);

    null === h ? f = d : h.next = g;
    $e(d, b.memoizedState) || (rg = !0);
    b.memoizedState = d;
    b.baseState = f;
    b.baseQueue = h;
    c.lastRenderedState = d;
  }

  return [b.memoizedState, c.dispatch];
}

function xh(a) {
  var b = uh(),
      c = b.queue;
  if (null === c) throw Error(u(311));
  c.lastRenderedReducer = a;
  var d = c.dispatch,
      e = c.pending,
      f = b.memoizedState;

  if (null !== e) {
    c.pending = null;
    var g = e = e.next;

    do {
      f = a(f, g.action), g = g.next;
    } while (g !== e);

    $e(f, b.memoizedState) || (rg = !0);
    b.memoizedState = f;
    null === b.baseQueue && (b.baseState = f);
    c.lastRenderedState = f;
  }

  return [f, d];
}

function yh(a) {
  var b = th();
  "function" === typeof a && (a = a());
  b.memoizedState = b.baseState = a;
  a = b.queue = {
    pending: null,
    dispatch: null,
    lastRenderedReducer: vh,
    lastRenderedState: a
  };
  a = a.dispatch = zh.bind(null, N, a);
  return [b.memoizedState, a];
}

function Ah(a, b, c, d) {
  a = {
    tag: a,
    create: b,
    destroy: c,
    deps: d,
    next: null
  };
  b = N.updateQueue;
  null === b ? (b = {
    lastEffect: null
  }, N.updateQueue = b, b.lastEffect = a.next = a) : (c = b.lastEffect, null === c ? b.lastEffect = a.next = a : (d = c.next, c.next = a, a.next = d, b.lastEffect = a));
  return a;
}

function Bh() {
  return uh().memoizedState;
}

function Ch(a, b, c, d) {
  var e = th();
  N.effectTag |= a;
  e.memoizedState = Ah(1 | b, c, void 0, void 0 === d ? null : d);
}

function Dh(a, b, c, d) {
  var e = uh();
  d = void 0 === d ? null : d;
  var f = void 0;

  if (null !== O) {
    var g = O.memoizedState;
    f = g.destroy;

    if (null !== d && nh(d, g.deps)) {
      Ah(b, c, f, d);
      return;
    }
  }

  N.effectTag |= a;
  e.memoizedState = Ah(1 | b, c, f, d);
}

function Eh(a, b) {
  return Ch(516, 4, a, b);
}

function Fh(a, b) {
  return Dh(516, 4, a, b);
}

function Gh(a, b) {
  return Dh(4, 2, a, b);
}

function Hh(a, b) {
  if ("function" === typeof b) return a = a(), b(a), function () {
    b(null);
  };
  if (null !== b && void 0 !== b) return a = a(), b.current = a, function () {
    b.current = null;
  };
}

function Ih(a, b, c) {
  c = null !== c && void 0 !== c ? c.concat([a]) : null;
  return Dh(4, 2, Hh.bind(null, b, a), c);
}

function Jh() {}

function Kh(a, b) {
  th().memoizedState = [a, void 0 === b ? null : b];
  return a;
}

function Lh(a, b) {
  var c = uh();
  b = void 0 === b ? null : b;
  var d = c.memoizedState;
  if (null !== d && null !== b && nh(b, d[1])) return d[0];
  c.memoizedState = [a, b];
  return a;
}

function Mh(a, b) {
  var c = uh();
  b = void 0 === b ? null : b;
  var d = c.memoizedState;
  if (null !== d && null !== b && nh(b, d[1])) return d[0];
  a = a();
  c.memoizedState = [a, b];
  return a;
}

function Nh(a, b, c) {
  var d = ag();
  cg(98 > d ? 98 : d, function () {
    a(!0);
  });
  cg(97 < d ? 97 : d, function () {
    var d = kh.suspense;
    kh.suspense = void 0 === b ? null : b;

    try {
      a(!1), c();
    } finally {
      kh.suspense = d;
    }
  });
}

function zh(a, b, c) {
  var d = Gg(),
      e = Dg.suspense;
  d = Hg(d, a, e);
  e = {
    expirationTime: d,
    suspenseConfig: e,
    action: c,
    eagerReducer: null,
    eagerState: null,
    next: null
  };
  var f = b.pending;
  null === f ? e.next = e : (e.next = f.next, f.next = e);
  b.pending = e;
  f = a.alternate;
  if (a === N || null !== f && f === N) mh = !0, e.expirationTime = lh, N.expirationTime = lh;else {
    if (0 === a.expirationTime && (null === f || 0 === f.expirationTime) && (f = b.lastRenderedReducer, null !== f)) try {
      var g = b.lastRenderedState,
          h = f(g, c);
      e.eagerReducer = f;
      e.eagerState = h;
      if ($e(h, g)) return;
    } catch (k) {} finally {}
    Ig(a, d);
  }
}

var sh = {
  readContext: sg,
  useCallback: Q,
  useContext: Q,
  useEffect: Q,
  useImperativeHandle: Q,
  useLayoutEffect: Q,
  useMemo: Q,
  useReducer: Q,
  useRef: Q,
  useState: Q,
  useDebugValue: Q,
  useResponder: Q,
  useDeferredValue: Q,
  useTransition: Q
},
    ph = {
  readContext: sg,
  useCallback: Kh,
  useContext: sg,
  useEffect: Eh,
  useImperativeHandle: function useImperativeHandle(a, b, c) {
    c = null !== c && void 0 !== c ? c.concat([a]) : null;
    return Ch(4, 2, Hh.bind(null, b, a), c);
  },
  useLayoutEffect: function useLayoutEffect(a, b) {
    return Ch(4, 2, a, b);
  },
  useMemo: function useMemo(a, b) {
    var c = th();
    b = void 0 === b ? null : b;
    a = a();
    c.memoizedState = [a, b];
    return a;
  },
  useReducer: function useReducer(a, b, c) {
    var d = th();
    b = void 0 !== c ? c(b) : b;
    d.memoizedState = d.baseState = b;
    a = d.queue = {
      pending: null,
      dispatch: null,
      lastRenderedReducer: a,
      lastRenderedState: b
    };
    a = a.dispatch = zh.bind(null, N, a);
    return [d.memoizedState, a];
  },
  useRef: function useRef(a) {
    var b = th();
    a = {
      current: a
    };
    return b.memoizedState = a;
  },
  useState: yh,
  useDebugValue: Jh,
  useResponder: ih,
  useDeferredValue: function useDeferredValue(a, b) {
    var c = yh(a),
        d = c[0],
        e = c[1];
    Eh(function () {
      var c = kh.suspense;
      kh.suspense = void 0 === b ? null : b;

      try {
        e(a);
      } finally {
        kh.suspense = c;
      }
    }, [a, b]);
    return d;
  },
  useTransition: function useTransition(a) {
    var b = yh(!1),
        c = b[0];
    b = b[1];
    return [Kh(Nh.bind(null, b, a), [b, a]), c];
  }
},
    qh = {
  readContext: sg,
  useCallback: Lh,
  useContext: sg,
  useEffect: Fh,
  useImperativeHandle: Ih,
  useLayoutEffect: Gh,
  useMemo: Mh,
  useReducer: wh,
  useRef: Bh,
  useState: function useState() {
    return wh(vh);
  },
  useDebugValue: Jh,
  useResponder: ih,
  useDeferredValue: function useDeferredValue(a, b) {
    var c = wh(vh),
        d = c[0],
        e = c[1];
    Fh(function () {
      var c = kh.suspense;
      kh.suspense = void 0 === b ? null : b;

      try {
        e(a);
      } finally {
        kh.suspense = c;
      }
    }, [a, b]);
    return d;
  },
  useTransition: function useTransition(a) {
    var b = wh(vh),
        c = b[0];
    b = b[1];
    return [Lh(Nh.bind(null, b, a), [b, a]), c];
  }
},
    rh = {
  readContext: sg,
  useCallback: Lh,
  useContext: sg,
  useEffect: Fh,
  useImperativeHandle: Ih,
  useLayoutEffect: Gh,
  useMemo: Mh,
  useReducer: xh,
  useRef: Bh,
  useState: function useState() {
    return xh(vh);
  },
  useDebugValue: Jh,
  useResponder: ih,
  useDeferredValue: function useDeferredValue(a, b) {
    var c = xh(vh),
        d = c[0],
        e = c[1];
    Fh(function () {
      var c = kh.suspense;
      kh.suspense = void 0 === b ? null : b;

      try {
        e(a);
      } finally {
        kh.suspense = c;
      }
    }, [a, b]);
    return d;
  },
  useTransition: function useTransition(a) {
    var b = xh(vh),
        c = b[0];
    b = b[1];
    return [Lh(Nh.bind(null, b, a), [b, a]), c];
  }
},
    Oh = null,
    Ph = null,
    Qh = !1;

function Rh(a, b) {
  var c = Sh(5, null, null, 0);
  c.elementType = "DELETED";
  c.type = "DELETED";
  c.stateNode = b;
  c.return = a;
  c.effectTag = 8;
  null !== a.lastEffect ? (a.lastEffect.nextEffect = c, a.lastEffect = c) : a.firstEffect = a.lastEffect = c;
}

function Th(a, b) {
  switch (a.tag) {
    case 5:
      var c = a.type;
      b = 1 !== b.nodeType || c.toLowerCase() !== b.nodeName.toLowerCase() ? null : b;
      return null !== b ? (a.stateNode = b, !0) : !1;

    case 6:
      return b = "" === a.pendingProps || 3 !== b.nodeType ? null : b, null !== b ? (a.stateNode = b, !0) : !1;

    case 13:
      return !1;

    default:
      return !1;
  }
}

function Uh(a) {
  if (Qh) {
    var b = Ph;

    if (b) {
      var c = b;

      if (!Th(a, b)) {
        b = Jd(c.nextSibling);

        if (!b || !Th(a, b)) {
          a.effectTag = a.effectTag & -1025 | 2;
          Qh = !1;
          Oh = a;
          return;
        }

        Rh(Oh, c);
      }

      Oh = a;
      Ph = Jd(b.firstChild);
    } else a.effectTag = a.effectTag & -1025 | 2, Qh = !1, Oh = a;
  }
}

function Vh(a) {
  for (a = a.return; null !== a && 5 !== a.tag && 3 !== a.tag && 13 !== a.tag;) {
    a = a.return;
  }

  Oh = a;
}

function Wh(a) {
  if (a !== Oh) return !1;
  if (!Qh) return Vh(a), Qh = !0, !1;
  var b = a.type;
  if (5 !== a.tag || "head" !== b && "body" !== b && !Gd(b, a.memoizedProps)) for (b = Ph; b;) {
    Rh(a, b), b = Jd(b.nextSibling);
  }
  Vh(a);

  if (13 === a.tag) {
    a = a.memoizedState;
    a = null !== a ? a.dehydrated : null;
    if (!a) throw Error(u(317));

    a: {
      a = a.nextSibling;

      for (b = 0; a;) {
        if (8 === a.nodeType) {
          var c = a.data;

          if (c === Ad) {
            if (0 === b) {
              Ph = Jd(a.nextSibling);
              break a;
            }

            b--;
          } else c !== zd && c !== Cd && c !== Bd || b++;
        }

        a = a.nextSibling;
      }

      Ph = null;
    }
  } else Ph = Oh ? Jd(a.stateNode.nextSibling) : null;

  return !0;
}

function Xh() {
  Ph = Oh = null;
  Qh = !1;
}

var Yh = Wa.ReactCurrentOwner,
    rg = !1;

function R(a, b, c, d) {
  b.child = null === a ? Yg(b, null, c, d) : Xg(b, a.child, c, d);
}

function Zh(a, b, c, d, e) {
  c = c.render;
  var f = b.ref;
  qg(b, e);
  d = oh(a, b, c, d, f, e);
  if (null !== a && !rg) return b.updateQueue = a.updateQueue, b.effectTag &= -517, a.expirationTime <= e && (a.expirationTime = 0), $h(a, b, e);
  b.effectTag |= 1;
  R(a, b, d, e);
  return b.child;
}

function ai(a, b, c, d, e, f) {
  if (null === a) {
    var g = c.type;
    if ("function" === typeof g && !bi(g) && void 0 === g.defaultProps && null === c.compare && void 0 === c.defaultProps) return b.tag = 15, b.type = g, ci(a, b, g, d, e, f);
    a = Ug(c.type, null, d, null, b.mode, f);
    a.ref = b.ref;
    a.return = b;
    return b.child = a;
  }

  g = a.child;
  if (e < f && (e = g.memoizedProps, c = c.compare, c = null !== c ? c : bf, c(e, d) && a.ref === b.ref)) return $h(a, b, f);
  b.effectTag |= 1;
  a = Sg(g, d);
  a.ref = b.ref;
  a.return = b;
  return b.child = a;
}

function ci(a, b, c, d, e, f) {
  return null !== a && bf(a.memoizedProps, d) && a.ref === b.ref && (rg = !1, e < f) ? (b.expirationTime = a.expirationTime, $h(a, b, f)) : di(a, b, c, d, f);
}

function ei(a, b) {
  var c = b.ref;
  if (null === a && null !== c || null !== a && a.ref !== c) b.effectTag |= 128;
}

function di(a, b, c, d, e) {
  var f = L(c) ? Bf : J.current;
  f = Cf(b, f);
  qg(b, e);
  c = oh(a, b, c, d, f, e);
  if (null !== a && !rg) return b.updateQueue = a.updateQueue, b.effectTag &= -517, a.expirationTime <= e && (a.expirationTime = 0), $h(a, b, e);
  b.effectTag |= 1;
  R(a, b, c, e);
  return b.child;
}

function fi(a, b, c, d, e) {
  if (L(c)) {
    var f = !0;
    Gf(b);
  } else f = !1;

  qg(b, e);
  if (null === b.stateNode) null !== a && (a.alternate = null, b.alternate = null, b.effectTag |= 2), Lg(b, c, d), Ng(b, c, d, e), d = !0;else if (null === a) {
    var g = b.stateNode,
        h = b.memoizedProps;
    g.props = h;
    var k = g.context,
        l = c.contextType;
    "object" === _typeof(l) && null !== l ? l = sg(l) : (l = L(c) ? Bf : J.current, l = Cf(b, l));
    var m = c.getDerivedStateFromProps,
        p = "function" === typeof m || "function" === typeof g.getSnapshotBeforeUpdate;
    p || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== d || k !== l) && Mg(b, g, d, l);
    tg = !1;
    var x = b.memoizedState;
    g.state = x;
    zg(b, d, g, e);
    k = b.memoizedState;
    h !== d || x !== k || K.current || tg ? ("function" === typeof m && (Fg(b, c, m, d), k = b.memoizedState), (h = tg || Kg(b, c, h, d, x, k, l)) ? (p || "function" !== typeof g.UNSAFE_componentWillMount && "function" !== typeof g.componentWillMount || ("function" === typeof g.componentWillMount && g.componentWillMount(), "function" === typeof g.UNSAFE_componentWillMount && g.UNSAFE_componentWillMount()), "function" === typeof g.componentDidMount && (b.effectTag |= 4)) : ("function" === typeof g.componentDidMount && (b.effectTag |= 4), b.memoizedProps = d, b.memoizedState = k), g.props = d, g.state = k, g.context = l, d = h) : ("function" === typeof g.componentDidMount && (b.effectTag |= 4), d = !1);
  } else g = b.stateNode, vg(a, b), h = b.memoizedProps, g.props = b.type === b.elementType ? h : ig(b.type, h), k = g.context, l = c.contextType, "object" === _typeof(l) && null !== l ? l = sg(l) : (l = L(c) ? Bf : J.current, l = Cf(b, l)), m = c.getDerivedStateFromProps, (p = "function" === typeof m || "function" === typeof g.getSnapshotBeforeUpdate) || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== d || k !== l) && Mg(b, g, d, l), tg = !1, k = b.memoizedState, g.state = k, zg(b, d, g, e), x = b.memoizedState, h !== d || k !== x || K.current || tg ? ("function" === typeof m && (Fg(b, c, m, d), x = b.memoizedState), (m = tg || Kg(b, c, h, d, k, x, l)) ? (p || "function" !== typeof g.UNSAFE_componentWillUpdate && "function" !== typeof g.componentWillUpdate || ("function" === typeof g.componentWillUpdate && g.componentWillUpdate(d, x, l), "function" === typeof g.UNSAFE_componentWillUpdate && g.UNSAFE_componentWillUpdate(d, x, l)), "function" === typeof g.componentDidUpdate && (b.effectTag |= 4), "function" === typeof g.getSnapshotBeforeUpdate && (b.effectTag |= 256)) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && k === a.memoizedState || (b.effectTag |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && k === a.memoizedState || (b.effectTag |= 256), b.memoizedProps = d, b.memoizedState = x), g.props = d, g.state = x, g.context = l, d = m) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && k === a.memoizedState || (b.effectTag |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && k === a.memoizedState || (b.effectTag |= 256), d = !1);
  return gi(a, b, c, d, f, e);
}

function gi(a, b, c, d, e, f) {
  ei(a, b);
  var g = 0 !== (b.effectTag & 64);
  if (!d && !g) return e && Hf(b, c, !1), $h(a, b, f);
  d = b.stateNode;
  Yh.current = b;
  var h = g && "function" !== typeof c.getDerivedStateFromError ? null : d.render();
  b.effectTag |= 1;
  null !== a && g ? (b.child = Xg(b, a.child, null, f), b.child = Xg(b, null, h, f)) : R(a, b, h, f);
  b.memoizedState = d.state;
  e && Hf(b, c, !0);
  return b.child;
}

function hi(a) {
  var b = a.stateNode;
  b.pendingContext ? Ef(a, b.pendingContext, b.pendingContext !== b.context) : b.context && Ef(a, b.context, !1);
  dh(a, b.containerInfo);
}

var ii = {
  dehydrated: null,
  retryTime: 0
};

function ji(a, b, c) {
  var d = b.mode,
      e = b.pendingProps,
      f = M.current,
      g = !1,
      h;
  (h = 0 !== (b.effectTag & 64)) || (h = 0 !== (f & 2) && (null === a || null !== a.memoizedState));
  h ? (g = !0, b.effectTag &= -65) : null !== a && null === a.memoizedState || void 0 === e.fallback || !0 === e.unstable_avoidThisFallback || (f |= 1);
  I(M, f & 1);

  if (null === a) {
    void 0 !== e.fallback && Uh(b);

    if (g) {
      g = e.fallback;
      e = Wg(null, d, 0, null);
      e.return = b;
      if (0 === (b.mode & 2)) for (a = null !== b.memoizedState ? b.child.child : b.child, e.child = a; null !== a;) {
        a.return = e, a = a.sibling;
      }
      c = Wg(g, d, c, null);
      c.return = b;
      e.sibling = c;
      b.memoizedState = ii;
      b.child = e;
      return c;
    }

    d = e.children;
    b.memoizedState = null;
    return b.child = Yg(b, null, d, c);
  }

  if (null !== a.memoizedState) {
    a = a.child;
    d = a.sibling;

    if (g) {
      e = e.fallback;
      c = Sg(a, a.pendingProps);
      c.return = b;
      if (0 === (b.mode & 2) && (g = null !== b.memoizedState ? b.child.child : b.child, g !== a.child)) for (c.child = g; null !== g;) {
        g.return = c, g = g.sibling;
      }
      d = Sg(d, e);
      d.return = b;
      c.sibling = d;
      c.childExpirationTime = 0;
      b.memoizedState = ii;
      b.child = c;
      return d;
    }

    c = Xg(b, a.child, e.children, c);
    b.memoizedState = null;
    return b.child = c;
  }

  a = a.child;

  if (g) {
    g = e.fallback;
    e = Wg(null, d, 0, null);
    e.return = b;
    e.child = a;
    null !== a && (a.return = e);
    if (0 === (b.mode & 2)) for (a = null !== b.memoizedState ? b.child.child : b.child, e.child = a; null !== a;) {
      a.return = e, a = a.sibling;
    }
    c = Wg(g, d, c, null);
    c.return = b;
    e.sibling = c;
    c.effectTag |= 2;
    e.childExpirationTime = 0;
    b.memoizedState = ii;
    b.child = e;
    return c;
  }

  b.memoizedState = null;
  return b.child = Xg(b, a, e.children, c);
}

function ki(a, b) {
  a.expirationTime < b && (a.expirationTime = b);
  var c = a.alternate;
  null !== c && c.expirationTime < b && (c.expirationTime = b);
  pg(a.return, b);
}

function li(a, b, c, d, e, f) {
  var g = a.memoizedState;
  null === g ? a.memoizedState = {
    isBackwards: b,
    rendering: null,
    renderingStartTime: 0,
    last: d,
    tail: c,
    tailExpiration: 0,
    tailMode: e,
    lastEffect: f
  } : (g.isBackwards = b, g.rendering = null, g.renderingStartTime = 0, g.last = d, g.tail = c, g.tailExpiration = 0, g.tailMode = e, g.lastEffect = f);
}

function mi(a, b, c) {
  var d = b.pendingProps,
      e = d.revealOrder,
      f = d.tail;
  R(a, b, d.children, c);
  d = M.current;
  if (0 !== (d & 2)) d = d & 1 | 2, b.effectTag |= 64;else {
    if (null !== a && 0 !== (a.effectTag & 64)) a: for (a = b.child; null !== a;) {
      if (13 === a.tag) null !== a.memoizedState && ki(a, c);else if (19 === a.tag) ki(a, c);else if (null !== a.child) {
        a.child.return = a;
        a = a.child;
        continue;
      }
      if (a === b) break a;

      for (; null === a.sibling;) {
        if (null === a.return || a.return === b) break a;
        a = a.return;
      }

      a.sibling.return = a.return;
      a = a.sibling;
    }
    d &= 1;
  }
  I(M, d);
  if (0 === (b.mode & 2)) b.memoizedState = null;else switch (e) {
    case "forwards":
      c = b.child;

      for (e = null; null !== c;) {
        a = c.alternate, null !== a && null === hh(a) && (e = c), c = c.sibling;
      }

      c = e;
      null === c ? (e = b.child, b.child = null) : (e = c.sibling, c.sibling = null);
      li(b, !1, e, c, f, b.lastEffect);
      break;

    case "backwards":
      c = null;
      e = b.child;

      for (b.child = null; null !== e;) {
        a = e.alternate;

        if (null !== a && null === hh(a)) {
          b.child = e;
          break;
        }

        a = e.sibling;
        e.sibling = c;
        c = e;
        e = a;
      }

      li(b, !0, c, null, f, b.lastEffect);
      break;

    case "together":
      li(b, !1, null, null, void 0, b.lastEffect);
      break;

    default:
      b.memoizedState = null;
  }
  return b.child;
}

function $h(a, b, c) {
  null !== a && (b.dependencies = a.dependencies);
  var d = b.expirationTime;
  0 !== d && Bg(d);
  if (b.childExpirationTime < c) return null;
  if (null !== a && b.child !== a.child) throw Error(u(153));

  if (null !== b.child) {
    a = b.child;
    c = Sg(a, a.pendingProps);
    b.child = c;

    for (c.return = b; null !== a.sibling;) {
      a = a.sibling, c = c.sibling = Sg(a, a.pendingProps), c.return = b;
    }

    c.sibling = null;
  }

  return b.child;
}

var ni, oi, pi, qi;

ni = function ni(a, b) {
  for (var c = b.child; null !== c;) {
    if (5 === c.tag || 6 === c.tag) a.appendChild(c.stateNode);else if (4 !== c.tag && null !== c.child) {
      c.child.return = c;
      c = c.child;
      continue;
    }
    if (c === b) break;

    for (; null === c.sibling;) {
      if (null === c.return || c.return === b) return;
      c = c.return;
    }

    c.sibling.return = c.return;
    c = c.sibling;
  }
};

oi = function oi() {};

pi = function pi(a, b, c, d, e) {
  var f = a.memoizedProps;

  if (f !== d) {
    var g = b.stateNode;
    ch($g.current);
    a = null;

    switch (c) {
      case "input":
        f = zb(g, f);
        d = zb(g, d);
        a = [];
        break;

      case "option":
        f = Gb(g, f);
        d = Gb(g, d);
        a = [];
        break;

      case "select":
        f = n({}, f, {
          value: void 0
        });
        d = n({}, d, {
          value: void 0
        });
        a = [];
        break;

      case "textarea":
        f = Ib(g, f);
        d = Ib(g, d);
        a = [];
        break;

      default:
        "function" !== typeof f.onClick && "function" === typeof d.onClick && (g.onclick = sd);
    }

    od(c, d);
    var h, k;
    c = null;

    for (h in f) {
      if (!d.hasOwnProperty(h) && f.hasOwnProperty(h) && null != f[h]) if ("style" === h) for (k in g = f[h], g) {
        g.hasOwnProperty(k) && (c || (c = {}), c[k] = "");
      } else "dangerouslySetInnerHTML" !== h && "children" !== h && "suppressContentEditableWarning" !== h && "suppressHydrationWarning" !== h && "autoFocus" !== h && (va.hasOwnProperty(h) ? a || (a = []) : (a = a || []).push(h, null));
    }

    for (h in d) {
      var l = d[h];
      g = null != f ? f[h] : void 0;
      if (d.hasOwnProperty(h) && l !== g && (null != l || null != g)) if ("style" === h) {
        if (g) {
          for (k in g) {
            !g.hasOwnProperty(k) || l && l.hasOwnProperty(k) || (c || (c = {}), c[k] = "");
          }

          for (k in l) {
            l.hasOwnProperty(k) && g[k] !== l[k] && (c || (c = {}), c[k] = l[k]);
          }
        } else c || (a || (a = []), a.push(h, c)), c = l;
      } else "dangerouslySetInnerHTML" === h ? (l = l ? l.__html : void 0, g = g ? g.__html : void 0, null != l && g !== l && (a = a || []).push(h, l)) : "children" === h ? g === l || "string" !== typeof l && "number" !== typeof l || (a = a || []).push(h, "" + l) : "suppressContentEditableWarning" !== h && "suppressHydrationWarning" !== h && (va.hasOwnProperty(h) ? (null != l && rd(e, h), a || g === l || (a = [])) : (a = a || []).push(h, l));
    }

    c && (a = a || []).push("style", c);
    e = a;
    if (b.updateQueue = e) b.effectTag |= 4;
  }
};

qi = function qi(a, b, c, d) {
  c !== d && (b.effectTag |= 4);
};

function ri(a, b) {
  switch (a.tailMode) {
    case "hidden":
      b = a.tail;

      for (var c = null; null !== b;) {
        null !== b.alternate && (c = b), b = b.sibling;
      }

      null === c ? a.tail = null : c.sibling = null;
      break;

    case "collapsed":
      c = a.tail;

      for (var d = null; null !== c;) {
        null !== c.alternate && (d = c), c = c.sibling;
      }

      null === d ? b || null === a.tail ? a.tail = null : a.tail.sibling = null : d.sibling = null;
  }
}

function si(a, b, c) {
  var d = b.pendingProps;

  switch (b.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return null;

    case 1:
      return L(b.type) && Df(), null;

    case 3:
      return eh(), H(K), H(J), c = b.stateNode, c.pendingContext && (c.context = c.pendingContext, c.pendingContext = null), null !== a && null !== a.child || !Wh(b) || (b.effectTag |= 4), oi(b), null;

    case 5:
      gh(b);
      c = ch(bh.current);
      var e = b.type;
      if (null !== a && null != b.stateNode) pi(a, b, e, d, c), a.ref !== b.ref && (b.effectTag |= 128);else {
        if (!d) {
          if (null === b.stateNode) throw Error(u(166));
          return null;
        }

        a = ch($g.current);

        if (Wh(b)) {
          d = b.stateNode;
          e = b.type;
          var f = b.memoizedProps;
          d[Md] = b;
          d[Nd] = f;

          switch (e) {
            case "iframe":
            case "object":
            case "embed":
              F("load", d);
              break;

            case "video":
            case "audio":
              for (a = 0; a < ac.length; a++) {
                F(ac[a], d);
              }

              break;

            case "source":
              F("error", d);
              break;

            case "img":
            case "image":
            case "link":
              F("error", d);
              F("load", d);
              break;

            case "form":
              F("reset", d);
              F("submit", d);
              break;

            case "details":
              F("toggle", d);
              break;

            case "input":
              Ab(d, f);
              F("invalid", d);
              rd(c, "onChange");
              break;

            case "select":
              d._wrapperState = {
                wasMultiple: !!f.multiple
              };
              F("invalid", d);
              rd(c, "onChange");
              break;

            case "textarea":
              Jb(d, f), F("invalid", d), rd(c, "onChange");
          }

          od(e, f);
          a = null;

          for (var g in f) {
            if (f.hasOwnProperty(g)) {
              var h = f[g];
              "children" === g ? "string" === typeof h ? d.textContent !== h && (a = ["children", h]) : "number" === typeof h && d.textContent !== "" + h && (a = ["children", "" + h]) : va.hasOwnProperty(g) && null != h && rd(c, g);
            }
          }

          switch (e) {
            case "input":
              xb(d);
              Eb(d, f, !0);
              break;

            case "textarea":
              xb(d);
              Lb(d);
              break;

            case "select":
            case "option":
              break;

            default:
              "function" === typeof f.onClick && (d.onclick = sd);
          }

          c = a;
          b.updateQueue = c;
          null !== c && (b.effectTag |= 4);
        } else {
          g = 9 === c.nodeType ? c : c.ownerDocument;
          a === qd && (a = Nb(e));
          a === qd ? "script" === e ? (a = g.createElement("div"), a.innerHTML = "<script>\x3c/script>", a = a.removeChild(a.firstChild)) : "string" === typeof d.is ? a = g.createElement(e, {
            is: d.is
          }) : (a = g.createElement(e), "select" === e && (g = a, d.multiple ? g.multiple = !0 : d.size && (g.size = d.size))) : a = g.createElementNS(a, e);
          a[Md] = b;
          a[Nd] = d;
          ni(a, b, !1, !1);
          b.stateNode = a;
          g = pd(e, d);

          switch (e) {
            case "iframe":
            case "object":
            case "embed":
              F("load", a);
              h = d;
              break;

            case "video":
            case "audio":
              for (h = 0; h < ac.length; h++) {
                F(ac[h], a);
              }

              h = d;
              break;

            case "source":
              F("error", a);
              h = d;
              break;

            case "img":
            case "image":
            case "link":
              F("error", a);
              F("load", a);
              h = d;
              break;

            case "form":
              F("reset", a);
              F("submit", a);
              h = d;
              break;

            case "details":
              F("toggle", a);
              h = d;
              break;

            case "input":
              Ab(a, d);
              h = zb(a, d);
              F("invalid", a);
              rd(c, "onChange");
              break;

            case "option":
              h = Gb(a, d);
              break;

            case "select":
              a._wrapperState = {
                wasMultiple: !!d.multiple
              };
              h = n({}, d, {
                value: void 0
              });
              F("invalid", a);
              rd(c, "onChange");
              break;

            case "textarea":
              Jb(a, d);
              h = Ib(a, d);
              F("invalid", a);
              rd(c, "onChange");
              break;

            default:
              h = d;
          }

          od(e, h);
          var k = h;

          for (f in k) {
            if (k.hasOwnProperty(f)) {
              var l = k[f];
              "style" === f ? md(a, l) : "dangerouslySetInnerHTML" === f ? (l = l ? l.__html : void 0, null != l && Qb(a, l)) : "children" === f ? "string" === typeof l ? ("textarea" !== e || "" !== l) && Rb(a, l) : "number" === typeof l && Rb(a, "" + l) : "suppressContentEditableWarning" !== f && "suppressHydrationWarning" !== f && "autoFocus" !== f && (va.hasOwnProperty(f) ? null != l && rd(c, f) : null != l && Xa(a, f, l, g));
            }
          }

          switch (e) {
            case "input":
              xb(a);
              Eb(a, d, !1);
              break;

            case "textarea":
              xb(a);
              Lb(a);
              break;

            case "option":
              null != d.value && a.setAttribute("value", "" + rb(d.value));
              break;

            case "select":
              a.multiple = !!d.multiple;
              c = d.value;
              null != c ? Hb(a, !!d.multiple, c, !1) : null != d.defaultValue && Hb(a, !!d.multiple, d.defaultValue, !0);
              break;

            default:
              "function" === typeof h.onClick && (a.onclick = sd);
          }

          Fd(e, d) && (b.effectTag |= 4);
        }

        null !== b.ref && (b.effectTag |= 128);
      }
      return null;

    case 6:
      if (a && null != b.stateNode) qi(a, b, a.memoizedProps, d);else {
        if ("string" !== typeof d && null === b.stateNode) throw Error(u(166));
        c = ch(bh.current);
        ch($g.current);
        Wh(b) ? (c = b.stateNode, d = b.memoizedProps, c[Md] = b, c.nodeValue !== d && (b.effectTag |= 4)) : (c = (9 === c.nodeType ? c : c.ownerDocument).createTextNode(d), c[Md] = b, b.stateNode = c);
      }
      return null;

    case 13:
      H(M);
      d = b.memoizedState;
      if (0 !== (b.effectTag & 64)) return b.expirationTime = c, b;
      c = null !== d;
      d = !1;
      null === a ? void 0 !== b.memoizedProps.fallback && Wh(b) : (e = a.memoizedState, d = null !== e, c || null === e || (e = a.child.sibling, null !== e && (f = b.firstEffect, null !== f ? (b.firstEffect = e, e.nextEffect = f) : (b.firstEffect = b.lastEffect = e, e.nextEffect = null), e.effectTag = 8)));
      if (c && !d && 0 !== (b.mode & 2)) if (null === a && !0 !== b.memoizedProps.unstable_avoidThisFallback || 0 !== (M.current & 1)) S === ti && (S = ui);else {
        if (S === ti || S === ui) S = vi;
        0 !== wi && null !== T && (xi(T, U), yi(T, wi));
      }
      if (c || d) b.effectTag |= 4;
      return null;

    case 4:
      return eh(), oi(b), null;

    case 10:
      return og(b), null;

    case 17:
      return L(b.type) && Df(), null;

    case 19:
      H(M);
      d = b.memoizedState;
      if (null === d) return null;
      e = 0 !== (b.effectTag & 64);
      f = d.rendering;
      if (null === f) {
        if (e) ri(d, !1);else {
          if (S !== ti || null !== a && 0 !== (a.effectTag & 64)) for (f = b.child; null !== f;) {
            a = hh(f);

            if (null !== a) {
              b.effectTag |= 64;
              ri(d, !1);
              e = a.updateQueue;
              null !== e && (b.updateQueue = e, b.effectTag |= 4);
              null === d.lastEffect && (b.firstEffect = null);
              b.lastEffect = d.lastEffect;

              for (d = b.child; null !== d;) {
                e = d, f = c, e.effectTag &= 2, e.nextEffect = null, e.firstEffect = null, e.lastEffect = null, a = e.alternate, null === a ? (e.childExpirationTime = 0, e.expirationTime = f, e.child = null, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null) : (e.childExpirationTime = a.childExpirationTime, e.expirationTime = a.expirationTime, e.child = a.child, e.memoizedProps = a.memoizedProps, e.memoizedState = a.memoizedState, e.updateQueue = a.updateQueue, f = a.dependencies, e.dependencies = null === f ? null : {
                  expirationTime: f.expirationTime,
                  firstContext: f.firstContext,
                  responders: f.responders
                }), d = d.sibling;
              }

              I(M, M.current & 1 | 2);
              return b.child;
            }

            f = f.sibling;
          }
        }
      } else {
        if (!e) if (a = hh(f), null !== a) {
          if (b.effectTag |= 64, e = !0, c = a.updateQueue, null !== c && (b.updateQueue = c, b.effectTag |= 4), ri(d, !0), null === d.tail && "hidden" === d.tailMode && !f.alternate) return b = b.lastEffect = d.lastEffect, null !== b && (b.nextEffect = null), null;
        } else 2 * $f() - d.renderingStartTime > d.tailExpiration && 1 < c && (b.effectTag |= 64, e = !0, ri(d, !1), b.expirationTime = b.childExpirationTime = c - 1);
        d.isBackwards ? (f.sibling = b.child, b.child = f) : (c = d.last, null !== c ? c.sibling = f : b.child = f, d.last = f);
      }
      return null !== d.tail ? (0 === d.tailExpiration && (d.tailExpiration = $f() + 500), c = d.tail, d.rendering = c, d.tail = c.sibling, d.lastEffect = b.lastEffect, d.renderingStartTime = $f(), c.sibling = null, b = M.current, I(M, e ? b & 1 | 2 : b & 1), c) : null;
  }

  throw Error(u(156, b.tag));
}

function zi(a) {
  switch (a.tag) {
    case 1:
      L(a.type) && Df();
      var b = a.effectTag;
      return b & 4096 ? (a.effectTag = b & -4097 | 64, a) : null;

    case 3:
      eh();
      H(K);
      H(J);
      b = a.effectTag;
      if (0 !== (b & 64)) throw Error(u(285));
      a.effectTag = b & -4097 | 64;
      return a;

    case 5:
      return gh(a), null;

    case 13:
      return H(M), b = a.effectTag, b & 4096 ? (a.effectTag = b & -4097 | 64, a) : null;

    case 19:
      return H(M), null;

    case 4:
      return eh(), null;

    case 10:
      return og(a), null;

    default:
      return null;
  }
}

function Ai(a, b) {
  return {
    value: a,
    source: b,
    stack: qb(b)
  };
}

var Bi = "function" === typeof WeakSet ? WeakSet : Set;

function Ci(a, b) {
  var c = b.source,
      d = b.stack;
  null === d && null !== c && (d = qb(c));
  null !== c && pb(c.type);
  b = b.value;
  null !== a && 1 === a.tag && pb(a.type);

  try {
    console.error(b);
  } catch (e) {
    setTimeout(function () {
      throw e;
    });
  }
}

function Di(a, b) {
  try {
    b.props = a.memoizedProps, b.state = a.memoizedState, b.componentWillUnmount();
  } catch (c) {
    Ei(a, c);
  }
}

function Fi(a) {
  var b = a.ref;
  if (null !== b) if ("function" === typeof b) try {
    b(null);
  } catch (c) {
    Ei(a, c);
  } else b.current = null;
}

function Gi(a, b) {
  switch (b.tag) {
    case 0:
    case 11:
    case 15:
    case 22:
      return;

    case 1:
      if (b.effectTag & 256 && null !== a) {
        var c = a.memoizedProps,
            d = a.memoizedState;
        a = b.stateNode;
        b = a.getSnapshotBeforeUpdate(b.elementType === b.type ? c : ig(b.type, c), d);
        a.__reactInternalSnapshotBeforeUpdate = b;
      }

      return;

    case 3:
    case 5:
    case 6:
    case 4:
    case 17:
      return;
  }

  throw Error(u(163));
}

function Hi(a, b) {
  b = b.updateQueue;
  b = null !== b ? b.lastEffect : null;

  if (null !== b) {
    var c = b = b.next;

    do {
      if ((c.tag & a) === a) {
        var d = c.destroy;
        c.destroy = void 0;
        void 0 !== d && d();
      }

      c = c.next;
    } while (c !== b);
  }
}

function Ii(a, b) {
  b = b.updateQueue;
  b = null !== b ? b.lastEffect : null;

  if (null !== b) {
    var c = b = b.next;

    do {
      if ((c.tag & a) === a) {
        var d = c.create;
        c.destroy = d();
      }

      c = c.next;
    } while (c !== b);
  }
}

function Ji(a, b, c) {
  switch (c.tag) {
    case 0:
    case 11:
    case 15:
    case 22:
      Ii(3, c);
      return;

    case 1:
      a = c.stateNode;
      if (c.effectTag & 4) if (null === b) a.componentDidMount();else {
        var d = c.elementType === c.type ? b.memoizedProps : ig(c.type, b.memoizedProps);
        a.componentDidUpdate(d, b.memoizedState, a.__reactInternalSnapshotBeforeUpdate);
      }
      b = c.updateQueue;
      null !== b && Cg(c, b, a);
      return;

    case 3:
      b = c.updateQueue;

      if (null !== b) {
        a = null;
        if (null !== c.child) switch (c.child.tag) {
          case 5:
            a = c.child.stateNode;
            break;

          case 1:
            a = c.child.stateNode;
        }
        Cg(c, b, a);
      }

      return;

    case 5:
      a = c.stateNode;
      null === b && c.effectTag & 4 && Fd(c.type, c.memoizedProps) && a.focus();
      return;

    case 6:
      return;

    case 4:
      return;

    case 12:
      return;

    case 13:
      null === c.memoizedState && (c = c.alternate, null !== c && (c = c.memoizedState, null !== c && (c = c.dehydrated, null !== c && Vc(c))));
      return;

    case 19:
    case 17:
    case 20:
    case 21:
      return;
  }

  throw Error(u(163));
}

function Ki(a, b, c) {
  "function" === typeof Li && Li(b);

  switch (b.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
    case 22:
      a = b.updateQueue;

      if (null !== a && (a = a.lastEffect, null !== a)) {
        var d = a.next;
        cg(97 < c ? 97 : c, function () {
          var a = d;

          do {
            var c = a.destroy;

            if (void 0 !== c) {
              var g = b;

              try {
                c();
              } catch (h) {
                Ei(g, h);
              }
            }

            a = a.next;
          } while (a !== d);
        });
      }

      break;

    case 1:
      Fi(b);
      c = b.stateNode;
      "function" === typeof c.componentWillUnmount && Di(b, c);
      break;

    case 5:
      Fi(b);
      break;

    case 4:
      Mi(a, b, c);
  }
}

function Ni(a) {
  var b = a.alternate;
  a.return = null;
  a.child = null;
  a.memoizedState = null;
  a.updateQueue = null;
  a.dependencies = null;
  a.alternate = null;
  a.firstEffect = null;
  a.lastEffect = null;
  a.pendingProps = null;
  a.memoizedProps = null;
  a.stateNode = null;
  null !== b && Ni(b);
}

function Oi(a) {
  return 5 === a.tag || 3 === a.tag || 4 === a.tag;
}

function Pi(a) {
  a: {
    for (var b = a.return; null !== b;) {
      if (Oi(b)) {
        var c = b;
        break a;
      }

      b = b.return;
    }

    throw Error(u(160));
  }

  b = c.stateNode;

  switch (c.tag) {
    case 5:
      var d = !1;
      break;

    case 3:
      b = b.containerInfo;
      d = !0;
      break;

    case 4:
      b = b.containerInfo;
      d = !0;
      break;

    default:
      throw Error(u(161));
  }

  c.effectTag & 16 && (Rb(b, ""), c.effectTag &= -17);

  a: b: for (c = a;;) {
    for (; null === c.sibling;) {
      if (null === c.return || Oi(c.return)) {
        c = null;
        break a;
      }

      c = c.return;
    }

    c.sibling.return = c.return;

    for (c = c.sibling; 5 !== c.tag && 6 !== c.tag && 18 !== c.tag;) {
      if (c.effectTag & 2) continue b;
      if (null === c.child || 4 === c.tag) continue b;else c.child.return = c, c = c.child;
    }

    if (!(c.effectTag & 2)) {
      c = c.stateNode;
      break a;
    }
  }

  d ? Qi(a, c, b) : Ri(a, c, b);
}

function Qi(a, b, c) {
  var d = a.tag,
      e = 5 === d || 6 === d;
  if (e) a = e ? a.stateNode : a.stateNode.instance, b ? 8 === c.nodeType ? c.parentNode.insertBefore(a, b) : c.insertBefore(a, b) : (8 === c.nodeType ? (b = c.parentNode, b.insertBefore(a, c)) : (b = c, b.appendChild(a)), c = c._reactRootContainer, null !== c && void 0 !== c || null !== b.onclick || (b.onclick = sd));else if (4 !== d && (a = a.child, null !== a)) for (Qi(a, b, c), a = a.sibling; null !== a;) {
    Qi(a, b, c), a = a.sibling;
  }
}

function Ri(a, b, c) {
  var d = a.tag,
      e = 5 === d || 6 === d;
  if (e) a = e ? a.stateNode : a.stateNode.instance, b ? c.insertBefore(a, b) : c.appendChild(a);else if (4 !== d && (a = a.child, null !== a)) for (Ri(a, b, c), a = a.sibling; null !== a;) {
    Ri(a, b, c), a = a.sibling;
  }
}

function Mi(a, b, c) {
  for (var d = b, e = !1, f, g;;) {
    if (!e) {
      e = d.return;

      a: for (;;) {
        if (null === e) throw Error(u(160));
        f = e.stateNode;

        switch (e.tag) {
          case 5:
            g = !1;
            break a;

          case 3:
            f = f.containerInfo;
            g = !0;
            break a;

          case 4:
            f = f.containerInfo;
            g = !0;
            break a;
        }

        e = e.return;
      }

      e = !0;
    }

    if (5 === d.tag || 6 === d.tag) {
      a: for (var h = a, k = d, l = c, m = k;;) {
        if (Ki(h, m, l), null !== m.child && 4 !== m.tag) m.child.return = m, m = m.child;else {
          if (m === k) break a;

          for (; null === m.sibling;) {
            if (null === m.return || m.return === k) break a;
            m = m.return;
          }

          m.sibling.return = m.return;
          m = m.sibling;
        }
      }

      g ? (h = f, k = d.stateNode, 8 === h.nodeType ? h.parentNode.removeChild(k) : h.removeChild(k)) : f.removeChild(d.stateNode);
    } else if (4 === d.tag) {
      if (null !== d.child) {
        f = d.stateNode.containerInfo;
        g = !0;
        d.child.return = d;
        d = d.child;
        continue;
      }
    } else if (Ki(a, d, c), null !== d.child) {
      d.child.return = d;
      d = d.child;
      continue;
    }

    if (d === b) break;

    for (; null === d.sibling;) {
      if (null === d.return || d.return === b) return;
      d = d.return;
      4 === d.tag && (e = !1);
    }

    d.sibling.return = d.return;
    d = d.sibling;
  }
}

function Si(a, b) {
  switch (b.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
    case 22:
      Hi(3, b);
      return;

    case 1:
      return;

    case 5:
      var c = b.stateNode;

      if (null != c) {
        var d = b.memoizedProps,
            e = null !== a ? a.memoizedProps : d;
        a = b.type;
        var f = b.updateQueue;
        b.updateQueue = null;

        if (null !== f) {
          c[Nd] = d;
          "input" === a && "radio" === d.type && null != d.name && Bb(c, d);
          pd(a, e);
          b = pd(a, d);

          for (e = 0; e < f.length; e += 2) {
            var g = f[e],
                h = f[e + 1];
            "style" === g ? md(c, h) : "dangerouslySetInnerHTML" === g ? Qb(c, h) : "children" === g ? Rb(c, h) : Xa(c, g, h, b);
          }

          switch (a) {
            case "input":
              Cb(c, d);
              break;

            case "textarea":
              Kb(c, d);
              break;

            case "select":
              b = c._wrapperState.wasMultiple, c._wrapperState.wasMultiple = !!d.multiple, a = d.value, null != a ? Hb(c, !!d.multiple, a, !1) : b !== !!d.multiple && (null != d.defaultValue ? Hb(c, !!d.multiple, d.defaultValue, !0) : Hb(c, !!d.multiple, d.multiple ? [] : "", !1));
          }
        }
      }

      return;

    case 6:
      if (null === b.stateNode) throw Error(u(162));
      b.stateNode.nodeValue = b.memoizedProps;
      return;

    case 3:
      b = b.stateNode;
      b.hydrate && (b.hydrate = !1, Vc(b.containerInfo));
      return;

    case 12:
      return;

    case 13:
      c = b;
      null === b.memoizedState ? d = !1 : (d = !0, c = b.child, Ti = $f());
      if (null !== c) a: for (a = c;;) {
        if (5 === a.tag) f = a.stateNode, d ? (f = f.style, "function" === typeof f.setProperty ? f.setProperty("display", "none", "important") : f.display = "none") : (f = a.stateNode, e = a.memoizedProps.style, e = void 0 !== e && null !== e && e.hasOwnProperty("display") ? e.display : null, f.style.display = ld("display", e));else if (6 === a.tag) a.stateNode.nodeValue = d ? "" : a.memoizedProps;else if (13 === a.tag && null !== a.memoizedState && null === a.memoizedState.dehydrated) {
          f = a.child.sibling;
          f.return = a;
          a = f;
          continue;
        } else if (null !== a.child) {
          a.child.return = a;
          a = a.child;
          continue;
        }
        if (a === c) break;

        for (; null === a.sibling;) {
          if (null === a.return || a.return === c) break a;
          a = a.return;
        }

        a.sibling.return = a.return;
        a = a.sibling;
      }
      Ui(b);
      return;

    case 19:
      Ui(b);
      return;

    case 17:
      return;
  }

  throw Error(u(163));
}

function Ui(a) {
  var b = a.updateQueue;

  if (null !== b) {
    a.updateQueue = null;
    var c = a.stateNode;
    null === c && (c = a.stateNode = new Bi());
    b.forEach(function (b) {
      var d = Vi.bind(null, a, b);
      c.has(b) || (c.add(b), b.then(d, d));
    });
  }
}

var Wi = "function" === typeof WeakMap ? WeakMap : Map;

function Xi(a, b, c) {
  c = wg(c, null);
  c.tag = 3;
  c.payload = {
    element: null
  };
  var d = b.value;

  c.callback = function () {
    Yi || (Yi = !0, Zi = d);
    Ci(a, b);
  };

  return c;
}

function $i(a, b, c) {
  c = wg(c, null);
  c.tag = 3;
  var d = a.type.getDerivedStateFromError;

  if ("function" === typeof d) {
    var e = b.value;

    c.payload = function () {
      Ci(a, b);
      return d(e);
    };
  }

  var f = a.stateNode;
  null !== f && "function" === typeof f.componentDidCatch && (c.callback = function () {
    "function" !== typeof d && (null === aj ? aj = new Set([this]) : aj.add(this), Ci(a, b));
    var c = b.stack;
    this.componentDidCatch(b.value, {
      componentStack: null !== c ? c : ""
    });
  });
  return c;
}

var bj = Math.ceil,
    cj = Wa.ReactCurrentDispatcher,
    dj = Wa.ReactCurrentOwner,
    V = 0,
    ej = 8,
    fj = 16,
    gj = 32,
    ti = 0,
    hj = 1,
    ij = 2,
    ui = 3,
    vi = 4,
    jj = 5,
    W = V,
    T = null,
    X = null,
    U = 0,
    S = ti,
    kj = null,
    lj = 1073741823,
    mj = 1073741823,
    nj = null,
    wi = 0,
    oj = !1,
    Ti = 0,
    pj = 500,
    Y = null,
    Yi = !1,
    Zi = null,
    aj = null,
    qj = !1,
    rj = null,
    sj = 90,
    tj = null,
    uj = 0,
    vj = null,
    wj = 0;

function Gg() {
  return (W & (fj | gj)) !== V ? 1073741821 - ($f() / 10 | 0) : 0 !== wj ? wj : wj = 1073741821 - ($f() / 10 | 0);
}

function Hg(a, b, c) {
  b = b.mode;
  if (0 === (b & 2)) return 1073741823;
  var d = ag();
  if (0 === (b & 4)) return 99 === d ? 1073741823 : 1073741822;
  if ((W & fj) !== V) return U;
  if (null !== c) a = hg(a, c.timeoutMs | 0 || 5E3, 250);else switch (d) {
    case 99:
      a = 1073741823;
      break;

    case 98:
      a = hg(a, 150, 100);
      break;

    case 97:
    case 96:
      a = hg(a, 5E3, 250);
      break;

    case 95:
      a = 2;
      break;

    default:
      throw Error(u(326));
  }
  null !== T && a === U && --a;
  return a;
}

function Ig(a, b) {
  if (50 < uj) throw uj = 0, vj = null, Error(u(185));
  a = xj(a, b);

  if (null !== a) {
    var c = ag();
    1073741823 === b ? (W & ej) !== V && (W & (fj | gj)) === V ? yj(a) : (Z(a), W === V && gg()) : Z(a);
    (W & 4) === V || 98 !== c && 99 !== c || (null === tj ? tj = new Map([[a, b]]) : (c = tj.get(a), (void 0 === c || c > b) && tj.set(a, b)));
  }
}

function xj(a, b) {
  a.expirationTime < b && (a.expirationTime = b);
  var c = a.alternate;
  null !== c && c.expirationTime < b && (c.expirationTime = b);
  var d = a.return,
      e = null;
  if (null === d && 3 === a.tag) e = a.stateNode;else for (; null !== d;) {
    c = d.alternate;
    d.childExpirationTime < b && (d.childExpirationTime = b);
    null !== c && c.childExpirationTime < b && (c.childExpirationTime = b);

    if (null === d.return && 3 === d.tag) {
      e = d.stateNode;
      break;
    }

    d = d.return;
  }
  null !== e && (T === e && (Bg(b), S === vi && xi(e, U)), yi(e, b));
  return e;
}

function zj(a) {
  var b = a.lastExpiredTime;
  if (0 !== b) return b;
  b = a.firstPendingTime;
  if (!Aj(a, b)) return b;
  var c = a.lastPingedTime;
  a = a.nextKnownPendingLevel;
  a = c > a ? c : a;
  return 2 >= a && b !== a ? 0 : a;
}

function Z(a) {
  if (0 !== a.lastExpiredTime) a.callbackExpirationTime = 1073741823, a.callbackPriority = 99, a.callbackNode = eg(yj.bind(null, a));else {
    var b = zj(a),
        c = a.callbackNode;
    if (0 === b) null !== c && (a.callbackNode = null, a.callbackExpirationTime = 0, a.callbackPriority = 90);else {
      var d = Gg();
      1073741823 === b ? d = 99 : 1 === b || 2 === b ? d = 95 : (d = 10 * (1073741821 - b) - 10 * (1073741821 - d), d = 0 >= d ? 99 : 250 >= d ? 98 : 5250 >= d ? 97 : 95);

      if (null !== c) {
        var e = a.callbackPriority;
        if (a.callbackExpirationTime === b && e >= d) return;
        c !== Tf && Kf(c);
      }

      a.callbackExpirationTime = b;
      a.callbackPriority = d;
      b = 1073741823 === b ? eg(yj.bind(null, a)) : dg(d, Bj.bind(null, a), {
        timeout: 10 * (1073741821 - b) - $f()
      });
      a.callbackNode = b;
    }
  }
}

function Bj(a, b) {
  wj = 0;
  if (b) return b = Gg(), Cj(a, b), Z(a), null;
  var c = zj(a);

  if (0 !== c) {
    b = a.callbackNode;
    if ((W & (fj | gj)) !== V) throw Error(u(327));
    Dj();
    a === T && c === U || Ej(a, c);

    if (null !== X) {
      var d = W;
      W |= fj;
      var e = Fj();

      do {
        try {
          Gj();
          break;
        } catch (h) {
          Hj(a, h);
        }
      } while (1);

      ng();
      W = d;
      cj.current = e;
      if (S === hj) throw b = kj, Ej(a, c), xi(a, c), Z(a), b;
      if (null === X) switch (e = a.finishedWork = a.current.alternate, a.finishedExpirationTime = c, d = S, T = null, d) {
        case ti:
        case hj:
          throw Error(u(345));

        case ij:
          Cj(a, 2 < c ? 2 : c);
          break;

        case ui:
          xi(a, c);
          d = a.lastSuspendedTime;
          c === d && (a.nextKnownPendingLevel = Ij(e));

          if (1073741823 === lj && (e = Ti + pj - $f(), 10 < e)) {
            if (oj) {
              var f = a.lastPingedTime;

              if (0 === f || f >= c) {
                a.lastPingedTime = c;
                Ej(a, c);
                break;
              }
            }

            f = zj(a);
            if (0 !== f && f !== c) break;

            if (0 !== d && d !== c) {
              a.lastPingedTime = d;
              break;
            }

            a.timeoutHandle = Hd(Jj.bind(null, a), e);
            break;
          }

          Jj(a);
          break;

        case vi:
          xi(a, c);
          d = a.lastSuspendedTime;
          c === d && (a.nextKnownPendingLevel = Ij(e));

          if (oj && (e = a.lastPingedTime, 0 === e || e >= c)) {
            a.lastPingedTime = c;
            Ej(a, c);
            break;
          }

          e = zj(a);
          if (0 !== e && e !== c) break;

          if (0 !== d && d !== c) {
            a.lastPingedTime = d;
            break;
          }

          1073741823 !== mj ? d = 10 * (1073741821 - mj) - $f() : 1073741823 === lj ? d = 0 : (d = 10 * (1073741821 - lj) - 5E3, e = $f(), c = 10 * (1073741821 - c) - e, d = e - d, 0 > d && (d = 0), d = (120 > d ? 120 : 480 > d ? 480 : 1080 > d ? 1080 : 1920 > d ? 1920 : 3E3 > d ? 3E3 : 4320 > d ? 4320 : 1960 * bj(d / 1960)) - d, c < d && (d = c));

          if (10 < d) {
            a.timeoutHandle = Hd(Jj.bind(null, a), d);
            break;
          }

          Jj(a);
          break;

        case jj:
          if (1073741823 !== lj && null !== nj) {
            f = lj;
            var g = nj;
            d = g.busyMinDurationMs | 0;
            0 >= d ? d = 0 : (e = g.busyDelayMs | 0, f = $f() - (10 * (1073741821 - f) - (g.timeoutMs | 0 || 5E3)), d = f <= e ? 0 : e + d - f);

            if (10 < d) {
              xi(a, c);
              a.timeoutHandle = Hd(Jj.bind(null, a), d);
              break;
            }
          }

          Jj(a);
          break;

        default:
          throw Error(u(329));
      }
      Z(a);
      if (a.callbackNode === b) return Bj.bind(null, a);
    }
  }

  return null;
}

function yj(a) {
  var b = a.lastExpiredTime;
  b = 0 !== b ? b : 1073741823;
  if ((W & (fj | gj)) !== V) throw Error(u(327));
  Dj();
  a === T && b === U || Ej(a, b);

  if (null !== X) {
    var c = W;
    W |= fj;
    var d = Fj();

    do {
      try {
        Kj();
        break;
      } catch (e) {
        Hj(a, e);
      }
    } while (1);

    ng();
    W = c;
    cj.current = d;
    if (S === hj) throw c = kj, Ej(a, b), xi(a, b), Z(a), c;
    if (null !== X) throw Error(u(261));
    a.finishedWork = a.current.alternate;
    a.finishedExpirationTime = b;
    T = null;
    Jj(a);
    Z(a);
  }

  return null;
}

function Lj() {
  if (null !== tj) {
    var a = tj;
    tj = null;
    a.forEach(function (a, c) {
      Cj(c, a);
      Z(c);
    });
    gg();
  }
}

function Mj(a, b) {
  var c = W;
  W |= 1;

  try {
    return a(b);
  } finally {
    W = c, W === V && gg();
  }
}

function Nj(a, b) {
  var c = W;
  W &= -2;
  W |= ej;

  try {
    return a(b);
  } finally {
    W = c, W === V && gg();
  }
}

function Ej(a, b) {
  a.finishedWork = null;
  a.finishedExpirationTime = 0;
  var c = a.timeoutHandle;
  -1 !== c && (a.timeoutHandle = -1, Id(c));
  if (null !== X) for (c = X.return; null !== c;) {
    var d = c;

    switch (d.tag) {
      case 1:
        d = d.type.childContextTypes;
        null !== d && void 0 !== d && Df();
        break;

      case 3:
        eh();
        H(K);
        H(J);
        break;

      case 5:
        gh(d);
        break;

      case 4:
        eh();
        break;

      case 13:
        H(M);
        break;

      case 19:
        H(M);
        break;

      case 10:
        og(d);
    }

    c = c.return;
  }
  T = a;
  X = Sg(a.current, null);
  U = b;
  S = ti;
  kj = null;
  mj = lj = 1073741823;
  nj = null;
  wi = 0;
  oj = !1;
}

function Hj(a, b) {
  do {
    try {
      ng();
      jh.current = sh;
      if (mh) for (var c = N.memoizedState; null !== c;) {
        var d = c.queue;
        null !== d && (d.pending = null);
        c = c.next;
      }
      lh = 0;
      P = O = N = null;
      mh = !1;
      if (null === X || null === X.return) return S = hj, kj = b, X = null;

      a: {
        var e = a,
            f = X.return,
            g = X,
            h = b;
        b = U;
        g.effectTag |= 2048;
        g.firstEffect = g.lastEffect = null;

        if (null !== h && "object" === _typeof(h) && "function" === typeof h.then) {
          var k = h;

          if (0 === (g.mode & 2)) {
            var l = g.alternate;
            l ? (g.updateQueue = l.updateQueue, g.memoizedState = l.memoizedState, g.expirationTime = l.expirationTime) : (g.updateQueue = null, g.memoizedState = null);
          }

          var m = 0 !== (M.current & 1),
              p = f;

          do {
            var x;

            if (x = 13 === p.tag) {
              var z = p.memoizedState;
              if (null !== z) x = null !== z.dehydrated ? !0 : !1;else {
                var ca = p.memoizedProps;
                x = void 0 === ca.fallback ? !1 : !0 !== ca.unstable_avoidThisFallback ? !0 : m ? !1 : !0;
              }
            }

            if (x) {
              var D = p.updateQueue;

              if (null === D) {
                var t = new Set();
                t.add(k);
                p.updateQueue = t;
              } else D.add(k);

              if (0 === (p.mode & 2)) {
                p.effectTag |= 64;
                g.effectTag &= -2981;
                if (1 === g.tag) if (null === g.alternate) g.tag = 17;else {
                  var y = wg(1073741823, null);
                  y.tag = 2;
                  xg(g, y);
                }
                g.expirationTime = 1073741823;
                break a;
              }

              h = void 0;
              g = b;
              var A = e.pingCache;
              null === A ? (A = e.pingCache = new Wi(), h = new Set(), A.set(k, h)) : (h = A.get(k), void 0 === h && (h = new Set(), A.set(k, h)));

              if (!h.has(g)) {
                h.add(g);
                var q = Oj.bind(null, e, k, g);
                k.then(q, q);
              }

              p.effectTag |= 4096;
              p.expirationTime = b;
              break a;
            }

            p = p.return;
          } while (null !== p);

          h = Error((pb(g.type) || "A React component") + " suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display." + qb(g));
        }

        S !== jj && (S = ij);
        h = Ai(h, g);
        p = f;

        do {
          switch (p.tag) {
            case 3:
              k = h;
              p.effectTag |= 4096;
              p.expirationTime = b;
              var B = Xi(p, k, b);
              yg(p, B);
              break a;

            case 1:
              k = h;
              var w = p.type,
                  ub = p.stateNode;

              if (0 === (p.effectTag & 64) && ("function" === typeof w.getDerivedStateFromError || null !== ub && "function" === typeof ub.componentDidCatch && (null === aj || !aj.has(ub)))) {
                p.effectTag |= 4096;
                p.expirationTime = b;
                var vb = $i(p, k, b);
                yg(p, vb);
                break a;
              }

          }

          p = p.return;
        } while (null !== p);
      }

      X = Pj(X);
    } catch (Xc) {
      b = Xc;
      continue;
    }

    break;
  } while (1);
}

function Fj() {
  var a = cj.current;
  cj.current = sh;
  return null === a ? sh : a;
}

function Ag(a, b) {
  a < lj && 2 < a && (lj = a);
  null !== b && a < mj && 2 < a && (mj = a, nj = b);
}

function Bg(a) {
  a > wi && (wi = a);
}

function Kj() {
  for (; null !== X;) {
    X = Qj(X);
  }
}

function Gj() {
  for (; null !== X && !Uf();) {
    X = Qj(X);
  }
}

function Qj(a) {
  var b = Rj(a.alternate, a, U);
  a.memoizedProps = a.pendingProps;
  null === b && (b = Pj(a));
  dj.current = null;
  return b;
}

function Pj(a) {
  X = a;

  do {
    var b = X.alternate;
    a = X.return;

    if (0 === (X.effectTag & 2048)) {
      b = si(b, X, U);

      if (1 === U || 1 !== X.childExpirationTime) {
        for (var c = 0, d = X.child; null !== d;) {
          var e = d.expirationTime,
              f = d.childExpirationTime;
          e > c && (c = e);
          f > c && (c = f);
          d = d.sibling;
        }

        X.childExpirationTime = c;
      }

      if (null !== b) return b;
      null !== a && 0 === (a.effectTag & 2048) && (null === a.firstEffect && (a.firstEffect = X.firstEffect), null !== X.lastEffect && (null !== a.lastEffect && (a.lastEffect.nextEffect = X.firstEffect), a.lastEffect = X.lastEffect), 1 < X.effectTag && (null !== a.lastEffect ? a.lastEffect.nextEffect = X : a.firstEffect = X, a.lastEffect = X));
    } else {
      b = zi(X);
      if (null !== b) return b.effectTag &= 2047, b;
      null !== a && (a.firstEffect = a.lastEffect = null, a.effectTag |= 2048);
    }

    b = X.sibling;
    if (null !== b) return b;
    X = a;
  } while (null !== X);

  S === ti && (S = jj);
  return null;
}

function Ij(a) {
  var b = a.expirationTime;
  a = a.childExpirationTime;
  return b > a ? b : a;
}

function Jj(a) {
  var b = ag();
  cg(99, Sj.bind(null, a, b));
  return null;
}

function Sj(a, b) {
  do {
    Dj();
  } while (null !== rj);

  if ((W & (fj | gj)) !== V) throw Error(u(327));
  var c = a.finishedWork,
      d = a.finishedExpirationTime;
  if (null === c) return null;
  a.finishedWork = null;
  a.finishedExpirationTime = 0;
  if (c === a.current) throw Error(u(177));
  a.callbackNode = null;
  a.callbackExpirationTime = 0;
  a.callbackPriority = 90;
  a.nextKnownPendingLevel = 0;
  var e = Ij(c);
  a.firstPendingTime = e;
  d <= a.lastSuspendedTime ? a.firstSuspendedTime = a.lastSuspendedTime = a.nextKnownPendingLevel = 0 : d <= a.firstSuspendedTime && (a.firstSuspendedTime = d - 1);
  d <= a.lastPingedTime && (a.lastPingedTime = 0);
  d <= a.lastExpiredTime && (a.lastExpiredTime = 0);
  a === T && (X = T = null, U = 0);
  1 < c.effectTag ? null !== c.lastEffect ? (c.lastEffect.nextEffect = c, e = c.firstEffect) : e = c : e = c.firstEffect;

  if (null !== e) {
    var f = W;
    W |= gj;
    dj.current = null;
    Dd = fd;
    var g = xd();

    if (yd(g)) {
      if ("selectionStart" in g) var h = {
        start: g.selectionStart,
        end: g.selectionEnd
      };else a: {
        h = (h = g.ownerDocument) && h.defaultView || window;
        var k = h.getSelection && h.getSelection();

        if (k && 0 !== k.rangeCount) {
          h = k.anchorNode;
          var l = k.anchorOffset,
              m = k.focusNode;
          k = k.focusOffset;

          try {
            h.nodeType, m.nodeType;
          } catch (wb) {
            h = null;
            break a;
          }

          var p = 0,
              x = -1,
              z = -1,
              ca = 0,
              D = 0,
              t = g,
              y = null;

          b: for (;;) {
            for (var A;;) {
              t !== h || 0 !== l && 3 !== t.nodeType || (x = p + l);
              t !== m || 0 !== k && 3 !== t.nodeType || (z = p + k);
              3 === t.nodeType && (p += t.nodeValue.length);
              if (null === (A = t.firstChild)) break;
              y = t;
              t = A;
            }

            for (;;) {
              if (t === g) break b;
              y === h && ++ca === l && (x = p);
              y === m && ++D === k && (z = p);
              if (null !== (A = t.nextSibling)) break;
              t = y;
              y = t.parentNode;
            }

            t = A;
          }

          h = -1 === x || -1 === z ? null : {
            start: x,
            end: z
          };
        } else h = null;
      }
      h = h || {
        start: 0,
        end: 0
      };
    } else h = null;

    Ed = {
      activeElementDetached: null,
      focusedElem: g,
      selectionRange: h
    };
    fd = !1;
    Y = e;

    do {
      try {
        Tj();
      } catch (wb) {
        if (null === Y) throw Error(u(330));
        Ei(Y, wb);
        Y = Y.nextEffect;
      }
    } while (null !== Y);

    Y = e;

    do {
      try {
        for (g = a, h = b; null !== Y;) {
          var q = Y.effectTag;
          q & 16 && Rb(Y.stateNode, "");

          if (q & 128) {
            var B = Y.alternate;

            if (null !== B) {
              var w = B.ref;
              null !== w && ("function" === typeof w ? w(null) : w.current = null);
            }
          }

          switch (q & 1038) {
            case 2:
              Pi(Y);
              Y.effectTag &= -3;
              break;

            case 6:
              Pi(Y);
              Y.effectTag &= -3;
              Si(Y.alternate, Y);
              break;

            case 1024:
              Y.effectTag &= -1025;
              break;

            case 1028:
              Y.effectTag &= -1025;
              Si(Y.alternate, Y);
              break;

            case 4:
              Si(Y.alternate, Y);
              break;

            case 8:
              l = Y, Mi(g, l, h), Ni(l);
          }

          Y = Y.nextEffect;
        }
      } catch (wb) {
        if (null === Y) throw Error(u(330));
        Ei(Y, wb);
        Y = Y.nextEffect;
      }
    } while (null !== Y);

    w = Ed;
    B = xd();
    q = w.focusedElem;
    h = w.selectionRange;

    if (B !== q && q && q.ownerDocument && wd(q.ownerDocument.documentElement, q)) {
      null !== h && yd(q) && (B = h.start, w = h.end, void 0 === w && (w = B), "selectionStart" in q ? (q.selectionStart = B, q.selectionEnd = Math.min(w, q.value.length)) : (w = (B = q.ownerDocument || document) && B.defaultView || window, w.getSelection && (w = w.getSelection(), l = q.textContent.length, g = Math.min(h.start, l), h = void 0 === h.end ? g : Math.min(h.end, l), !w.extend && g > h && (l = h, h = g, g = l), l = vd(q, g), m = vd(q, h), l && m && (1 !== w.rangeCount || w.anchorNode !== l.node || w.anchorOffset !== l.offset || w.focusNode !== m.node || w.focusOffset !== m.offset) && (B = B.createRange(), B.setStart(l.node, l.offset), w.removeAllRanges(), g > h ? (w.addRange(B), w.extend(m.node, m.offset)) : (B.setEnd(m.node, m.offset), w.addRange(B))))));
      B = [];

      for (w = q; w = w.parentNode;) {
        1 === w.nodeType && B.push({
          element: w,
          left: w.scrollLeft,
          top: w.scrollTop
        });
      }

      "function" === typeof q.focus && q.focus();

      for (q = 0; q < B.length; q++) {
        w = B[q], w.element.scrollLeft = w.left, w.element.scrollTop = w.top;
      }
    }

    fd = !!Dd;
    Ed = Dd = null;
    a.current = c;
    Y = e;

    do {
      try {
        for (q = a; null !== Y;) {
          var ub = Y.effectTag;
          ub & 36 && Ji(q, Y.alternate, Y);

          if (ub & 128) {
            B = void 0;
            var vb = Y.ref;

            if (null !== vb) {
              var Xc = Y.stateNode;

              switch (Y.tag) {
                case 5:
                  B = Xc;
                  break;

                default:
                  B = Xc;
              }

              "function" === typeof vb ? vb(B) : vb.current = B;
            }
          }

          Y = Y.nextEffect;
        }
      } catch (wb) {
        if (null === Y) throw Error(u(330));
        Ei(Y, wb);
        Y = Y.nextEffect;
      }
    } while (null !== Y);

    Y = null;
    Vf();
    W = f;
  } else a.current = c;

  if (qj) qj = !1, rj = a, sj = b;else for (Y = e; null !== Y;) {
    b = Y.nextEffect, Y.nextEffect = null, Y = b;
  }
  b = a.firstPendingTime;
  0 === b && (aj = null);
  1073741823 === b ? a === vj ? uj++ : (uj = 0, vj = a) : uj = 0;
  "function" === typeof Uj && Uj(c.stateNode, d);
  Z(a);
  if (Yi) throw Yi = !1, a = Zi, Zi = null, a;
  if ((W & ej) !== V) return null;
  gg();
  return null;
}

function Tj() {
  for (; null !== Y;) {
    var a = Y.effectTag;
    0 !== (a & 256) && Gi(Y.alternate, Y);
    0 === (a & 512) || qj || (qj = !0, dg(97, function () {
      Dj();
      return null;
    }));
    Y = Y.nextEffect;
  }
}

function Dj() {
  if (90 !== sj) {
    var a = 97 < sj ? 97 : sj;
    sj = 90;
    return cg(a, Vj);
  }
}

function Vj() {
  if (null === rj) return !1;
  var a = rj;
  rj = null;
  if ((W & (fj | gj)) !== V) throw Error(u(331));
  var b = W;
  W |= gj;

  for (a = a.current.firstEffect; null !== a;) {
    try {
      var c = a;
      if (0 !== (c.effectTag & 512)) switch (c.tag) {
        case 0:
        case 11:
        case 15:
        case 22:
          Hi(5, c), Ii(5, c);
      }
    } catch (d) {
      if (null === a) throw Error(u(330));
      Ei(a, d);
    }

    c = a.nextEffect;
    a.nextEffect = null;
    a = c;
  }

  W = b;
  gg();
  return !0;
}

function Wj(a, b, c) {
  b = Ai(c, b);
  b = Xi(a, b, 1073741823);
  xg(a, b);
  a = xj(a, 1073741823);
  null !== a && Z(a);
}

function Ei(a, b) {
  if (3 === a.tag) Wj(a, a, b);else for (var c = a.return; null !== c;) {
    if (3 === c.tag) {
      Wj(c, a, b);
      break;
    } else if (1 === c.tag) {
      var d = c.stateNode;

      if ("function" === typeof c.type.getDerivedStateFromError || "function" === typeof d.componentDidCatch && (null === aj || !aj.has(d))) {
        a = Ai(b, a);
        a = $i(c, a, 1073741823);
        xg(c, a);
        c = xj(c, 1073741823);
        null !== c && Z(c);
        break;
      }
    }

    c = c.return;
  }
}

function Oj(a, b, c) {
  var d = a.pingCache;
  null !== d && d.delete(b);
  T === a && U === c ? S === vi || S === ui && 1073741823 === lj && $f() - Ti < pj ? Ej(a, U) : oj = !0 : Aj(a, c) && (b = a.lastPingedTime, 0 !== b && b < c || (a.lastPingedTime = c, Z(a)));
}

function Vi(a, b) {
  var c = a.stateNode;
  null !== c && c.delete(b);
  b = 0;
  0 === b && (b = Gg(), b = Hg(b, a, null));
  a = xj(a, b);
  null !== a && Z(a);
}

var Rj;

Rj = function Rj(a, b, c) {
  var d = b.expirationTime;

  if (null !== a) {
    var e = b.pendingProps;
    if (a.memoizedProps !== e || K.current) rg = !0;else {
      if (d < c) {
        rg = !1;

        switch (b.tag) {
          case 3:
            hi(b);
            Xh();
            break;

          case 5:
            fh(b);
            if (b.mode & 4 && 1 !== c && e.hidden) return b.expirationTime = b.childExpirationTime = 1, null;
            break;

          case 1:
            L(b.type) && Gf(b);
            break;

          case 4:
            dh(b, b.stateNode.containerInfo);
            break;

          case 10:
            d = b.memoizedProps.value;
            e = b.type._context;
            I(jg, e._currentValue);
            e._currentValue = d;
            break;

          case 13:
            if (null !== b.memoizedState) {
              d = b.child.childExpirationTime;
              if (0 !== d && d >= c) return ji(a, b, c);
              I(M, M.current & 1);
              b = $h(a, b, c);
              return null !== b ? b.sibling : null;
            }

            I(M, M.current & 1);
            break;

          case 19:
            d = b.childExpirationTime >= c;

            if (0 !== (a.effectTag & 64)) {
              if (d) return mi(a, b, c);
              b.effectTag |= 64;
            }

            e = b.memoizedState;
            null !== e && (e.rendering = null, e.tail = null);
            I(M, M.current);
            if (!d) return null;
        }

        return $h(a, b, c);
      }

      rg = !1;
    }
  } else rg = !1;

  b.expirationTime = 0;

  switch (b.tag) {
    case 2:
      d = b.type;
      null !== a && (a.alternate = null, b.alternate = null, b.effectTag |= 2);
      a = b.pendingProps;
      e = Cf(b, J.current);
      qg(b, c);
      e = oh(null, b, d, a, e, c);
      b.effectTag |= 1;

      if ("object" === _typeof(e) && null !== e && "function" === typeof e.render && void 0 === e.$$typeof) {
        b.tag = 1;
        b.memoizedState = null;
        b.updateQueue = null;

        if (L(d)) {
          var f = !0;
          Gf(b);
        } else f = !1;

        b.memoizedState = null !== e.state && void 0 !== e.state ? e.state : null;
        ug(b);
        var g = d.getDerivedStateFromProps;
        "function" === typeof g && Fg(b, d, g, a);
        e.updater = Jg;
        b.stateNode = e;
        e._reactInternalFiber = b;
        Ng(b, d, a, c);
        b = gi(null, b, d, !0, f, c);
      } else b.tag = 0, R(null, b, e, c), b = b.child;

      return b;

    case 16:
      a: {
        e = b.elementType;
        null !== a && (a.alternate = null, b.alternate = null, b.effectTag |= 2);
        a = b.pendingProps;
        ob(e);
        if (1 !== e._status) throw e._result;
        e = e._result;
        b.type = e;
        f = b.tag = Xj(e);
        a = ig(e, a);

        switch (f) {
          case 0:
            b = di(null, b, e, a, c);
            break a;

          case 1:
            b = fi(null, b, e, a, c);
            break a;

          case 11:
            b = Zh(null, b, e, a, c);
            break a;

          case 14:
            b = ai(null, b, e, ig(e.type, a), d, c);
            break a;
        }

        throw Error(u(306, e, ""));
      }

      return b;

    case 0:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : ig(d, e), di(a, b, d, e, c);

    case 1:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : ig(d, e), fi(a, b, d, e, c);

    case 3:
      hi(b);
      d = b.updateQueue;
      if (null === a || null === d) throw Error(u(282));
      d = b.pendingProps;
      e = b.memoizedState;
      e = null !== e ? e.element : null;
      vg(a, b);
      zg(b, d, null, c);
      d = b.memoizedState.element;
      if (d === e) Xh(), b = $h(a, b, c);else {
        if (e = b.stateNode.hydrate) Ph = Jd(b.stateNode.containerInfo.firstChild), Oh = b, e = Qh = !0;
        if (e) for (c = Yg(b, null, d, c), b.child = c; c;) {
          c.effectTag = c.effectTag & -3 | 1024, c = c.sibling;
        } else R(a, b, d, c), Xh();
        b = b.child;
      }
      return b;

    case 5:
      return fh(b), null === a && Uh(b), d = b.type, e = b.pendingProps, f = null !== a ? a.memoizedProps : null, g = e.children, Gd(d, e) ? g = null : null !== f && Gd(d, f) && (b.effectTag |= 16), ei(a, b), b.mode & 4 && 1 !== c && e.hidden ? (b.expirationTime = b.childExpirationTime = 1, b = null) : (R(a, b, g, c), b = b.child), b;

    case 6:
      return null === a && Uh(b), null;

    case 13:
      return ji(a, b, c);

    case 4:
      return dh(b, b.stateNode.containerInfo), d = b.pendingProps, null === a ? b.child = Xg(b, null, d, c) : R(a, b, d, c), b.child;

    case 11:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : ig(d, e), Zh(a, b, d, e, c);

    case 7:
      return R(a, b, b.pendingProps, c), b.child;

    case 8:
      return R(a, b, b.pendingProps.children, c), b.child;

    case 12:
      return R(a, b, b.pendingProps.children, c), b.child;

    case 10:
      a: {
        d = b.type._context;
        e = b.pendingProps;
        g = b.memoizedProps;
        f = e.value;
        var h = b.type._context;
        I(jg, h._currentValue);
        h._currentValue = f;
        if (null !== g) if (h = g.value, f = $e(h, f) ? 0 : ("function" === typeof d._calculateChangedBits ? d._calculateChangedBits(h, f) : 1073741823) | 0, 0 === f) {
          if (g.children === e.children && !K.current) {
            b = $h(a, b, c);
            break a;
          }
        } else for (h = b.child, null !== h && (h.return = b); null !== h;) {
          var k = h.dependencies;

          if (null !== k) {
            g = h.child;

            for (var l = k.firstContext; null !== l;) {
              if (l.context === d && 0 !== (l.observedBits & f)) {
                1 === h.tag && (l = wg(c, null), l.tag = 2, xg(h, l));
                h.expirationTime < c && (h.expirationTime = c);
                l = h.alternate;
                null !== l && l.expirationTime < c && (l.expirationTime = c);
                pg(h.return, c);
                k.expirationTime < c && (k.expirationTime = c);
                break;
              }

              l = l.next;
            }
          } else g = 10 === h.tag ? h.type === b.type ? null : h.child : h.child;

          if (null !== g) g.return = h;else for (g = h; null !== g;) {
            if (g === b) {
              g = null;
              break;
            }

            h = g.sibling;

            if (null !== h) {
              h.return = g.return;
              g = h;
              break;
            }

            g = g.return;
          }
          h = g;
        }
        R(a, b, e.children, c);
        b = b.child;
      }

      return b;

    case 9:
      return e = b.type, f = b.pendingProps, d = f.children, qg(b, c), e = sg(e, f.unstable_observedBits), d = d(e), b.effectTag |= 1, R(a, b, d, c), b.child;

    case 14:
      return e = b.type, f = ig(e, b.pendingProps), f = ig(e.type, f), ai(a, b, e, f, d, c);

    case 15:
      return ci(a, b, b.type, b.pendingProps, d, c);

    case 17:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : ig(d, e), null !== a && (a.alternate = null, b.alternate = null, b.effectTag |= 2), b.tag = 1, L(d) ? (a = !0, Gf(b)) : a = !1, qg(b, c), Lg(b, d, e), Ng(b, d, e, c), gi(null, b, d, !0, a, c);

    case 19:
      return mi(a, b, c);
  }

  throw Error(u(156, b.tag));
};

var Uj = null,
    Li = null;

function Yj(a) {
  if ("undefined" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) return !1;
  var b = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (b.isDisabled || !b.supportsFiber) return !0;

  try {
    var c = b.inject(a);

    Uj = function Uj(a) {
      try {
        b.onCommitFiberRoot(c, a, void 0, 64 === (a.current.effectTag & 64));
      } catch (e) {}
    };

    Li = function Li(a) {
      try {
        b.onCommitFiberUnmount(c, a);
      } catch (e) {}
    };
  } catch (d) {}

  return !0;
}

function Zj(a, b, c, d) {
  this.tag = a;
  this.key = c;
  this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
  this.index = 0;
  this.ref = null;
  this.pendingProps = b;
  this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
  this.mode = d;
  this.effectTag = 0;
  this.lastEffect = this.firstEffect = this.nextEffect = null;
  this.childExpirationTime = this.expirationTime = 0;
  this.alternate = null;
}

function Sh(a, b, c, d) {
  return new Zj(a, b, c, d);
}

function bi(a) {
  a = a.prototype;
  return !(!a || !a.isReactComponent);
}

function Xj(a) {
  if ("function" === typeof a) return bi(a) ? 1 : 0;

  if (void 0 !== a && null !== a) {
    a = a.$$typeof;
    if (a === gb) return 11;
    if (a === jb) return 14;
  }

  return 2;
}

function Sg(a, b) {
  var c = a.alternate;
  null === c ? (c = Sh(a.tag, b, a.key, a.mode), c.elementType = a.elementType, c.type = a.type, c.stateNode = a.stateNode, c.alternate = a, a.alternate = c) : (c.pendingProps = b, c.effectTag = 0, c.nextEffect = null, c.firstEffect = null, c.lastEffect = null);
  c.childExpirationTime = a.childExpirationTime;
  c.expirationTime = a.expirationTime;
  c.child = a.child;
  c.memoizedProps = a.memoizedProps;
  c.memoizedState = a.memoizedState;
  c.updateQueue = a.updateQueue;
  b = a.dependencies;
  c.dependencies = null === b ? null : {
    expirationTime: b.expirationTime,
    firstContext: b.firstContext,
    responders: b.responders
  };
  c.sibling = a.sibling;
  c.index = a.index;
  c.ref = a.ref;
  return c;
}

function Ug(a, b, c, d, e, f) {
  var g = 2;
  d = a;
  if ("function" === typeof a) bi(a) && (g = 1);else if ("string" === typeof a) g = 5;else a: switch (a) {
    case ab:
      return Wg(c.children, e, f, b);

    case fb:
      g = 8;
      e |= 7;
      break;

    case bb:
      g = 8;
      e |= 1;
      break;

    case cb:
      return a = Sh(12, c, b, e | 8), a.elementType = cb, a.type = cb, a.expirationTime = f, a;

    case hb:
      return a = Sh(13, c, b, e), a.type = hb, a.elementType = hb, a.expirationTime = f, a;

    case ib:
      return a = Sh(19, c, b, e), a.elementType = ib, a.expirationTime = f, a;

    default:
      if ("object" === _typeof(a) && null !== a) switch (a.$$typeof) {
        case db:
          g = 10;
          break a;

        case eb:
          g = 9;
          break a;

        case gb:
          g = 11;
          break a;

        case jb:
          g = 14;
          break a;

        case kb:
          g = 16;
          d = null;
          break a;

        case lb:
          g = 22;
          break a;
      }
      throw Error(u(130, null == a ? a : _typeof(a), ""));
  }
  b = Sh(g, c, b, e);
  b.elementType = a;
  b.type = d;
  b.expirationTime = f;
  return b;
}

function Wg(a, b, c, d) {
  a = Sh(7, a, d, b);
  a.expirationTime = c;
  return a;
}

function Tg(a, b, c) {
  a = Sh(6, a, null, b);
  a.expirationTime = c;
  return a;
}

function Vg(a, b, c) {
  b = Sh(4, null !== a.children ? a.children : [], a.key, b);
  b.expirationTime = c;
  b.stateNode = {
    containerInfo: a.containerInfo,
    pendingChildren: null,
    implementation: a.implementation
  };
  return b;
}

function ak(a, b, c) {
  this.tag = b;
  this.current = null;
  this.containerInfo = a;
  this.pingCache = this.pendingChildren = null;
  this.finishedExpirationTime = 0;
  this.finishedWork = null;
  this.timeoutHandle = -1;
  this.pendingContext = this.context = null;
  this.hydrate = c;
  this.callbackNode = null;
  this.callbackPriority = 90;
  this.lastExpiredTime = this.lastPingedTime = this.nextKnownPendingLevel = this.lastSuspendedTime = this.firstSuspendedTime = this.firstPendingTime = 0;
}

function Aj(a, b) {
  var c = a.firstSuspendedTime;
  a = a.lastSuspendedTime;
  return 0 !== c && c >= b && a <= b;
}

function xi(a, b) {
  var c = a.firstSuspendedTime,
      d = a.lastSuspendedTime;
  c < b && (a.firstSuspendedTime = b);
  if (d > b || 0 === c) a.lastSuspendedTime = b;
  b <= a.lastPingedTime && (a.lastPingedTime = 0);
  b <= a.lastExpiredTime && (a.lastExpiredTime = 0);
}

function yi(a, b) {
  b > a.firstPendingTime && (a.firstPendingTime = b);
  var c = a.firstSuspendedTime;
  0 !== c && (b >= c ? a.firstSuspendedTime = a.lastSuspendedTime = a.nextKnownPendingLevel = 0 : b >= a.lastSuspendedTime && (a.lastSuspendedTime = b + 1), b > a.nextKnownPendingLevel && (a.nextKnownPendingLevel = b));
}

function Cj(a, b) {
  var c = a.lastExpiredTime;
  if (0 === c || c > b) a.lastExpiredTime = b;
}

function bk(a, b, c, d) {
  var e = b.current,
      f = Gg(),
      g = Dg.suspense;
  f = Hg(f, e, g);

  a: if (c) {
    c = c._reactInternalFiber;

    b: {
      if (dc(c) !== c || 1 !== c.tag) throw Error(u(170));
      var h = c;

      do {
        switch (h.tag) {
          case 3:
            h = h.stateNode.context;
            break b;

          case 1:
            if (L(h.type)) {
              h = h.stateNode.__reactInternalMemoizedMergedChildContext;
              break b;
            }

        }

        h = h.return;
      } while (null !== h);

      throw Error(u(171));
    }

    if (1 === c.tag) {
      var k = c.type;

      if (L(k)) {
        c = Ff(c, k, h);
        break a;
      }
    }

    c = h;
  } else c = Af;

  null === b.context ? b.context = c : b.pendingContext = c;
  b = wg(f, g);
  b.payload = {
    element: a
  };
  d = void 0 === d ? null : d;
  null !== d && (b.callback = d);
  xg(e, b);
  Ig(e, f);
  return f;
}

function ck(a) {
  a = a.current;
  if (!a.child) return null;

  switch (a.child.tag) {
    case 5:
      return a.child.stateNode;

    default:
      return a.child.stateNode;
  }
}

function dk(a, b) {
  a = a.memoizedState;
  null !== a && null !== a.dehydrated && a.retryTime < b && (a.retryTime = b);
}

function ek(a, b) {
  dk(a, b);
  (a = a.alternate) && dk(a, b);
}

function fk(a, b, c) {
  c = null != c && !0 === c.hydrate;
  var d = new ak(a, b, c),
      e = Sh(3, null, null, 2 === b ? 7 : 1 === b ? 3 : 0);
  d.current = e;
  e.stateNode = d;
  ug(e);
  a[Od] = d.current;
  c && 0 !== b && Jc(a, 9 === a.nodeType ? a : a.ownerDocument);
  this._internalRoot = d;
}

fk.prototype.render = function (a) {
  bk(a, this._internalRoot, null, null);
};

fk.prototype.unmount = function () {
  var a = this._internalRoot,
      b = a.containerInfo;
  bk(null, a, null, function () {
    b[Od] = null;
  });
};

function gk(a) {
  return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType && (8 !== a.nodeType || " react-mount-point-unstable " !== a.nodeValue));
}

function hk(a, b) {
  b || (b = a ? 9 === a.nodeType ? a.documentElement : a.firstChild : null, b = !(!b || 1 !== b.nodeType || !b.hasAttribute("data-reactroot")));
  if (!b) for (var c; c = a.lastChild;) {
    a.removeChild(c);
  }
  return new fk(a, 0, b ? {
    hydrate: !0
  } : void 0);
}

function ik(a, b, c, d, e) {
  var f = c._reactRootContainer;

  if (f) {
    var g = f._internalRoot;

    if ("function" === typeof e) {
      var h = e;

      e = function e() {
        var a = ck(g);
        h.call(a);
      };
    }

    bk(b, g, a, e);
  } else {
    f = c._reactRootContainer = hk(c, d);
    g = f._internalRoot;

    if ("function" === typeof e) {
      var k = e;

      e = function e() {
        var a = ck(g);
        k.call(a);
      };
    }

    Nj(function () {
      bk(b, g, a, e);
    });
  }

  return ck(g);
}

function jk(a, b, c) {
  var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
  return {
    $$typeof: $a,
    key: null == d ? null : "" + d,
    children: a,
    containerInfo: b,
    implementation: c
  };
}

wc = function wc(a) {
  if (13 === a.tag) {
    var b = hg(Gg(), 150, 100);
    Ig(a, b);
    ek(a, b);
  }
};

xc = function xc(a) {
  13 === a.tag && (Ig(a, 3), ek(a, 3));
};

yc = function yc(a) {
  if (13 === a.tag) {
    var b = Gg();
    b = Hg(b, a, null);
    Ig(a, b);
    ek(a, b);
  }
};

za = function za(a, b, c) {
  switch (b) {
    case "input":
      Cb(a, c);
      b = c.name;

      if ("radio" === c.type && null != b) {
        for (c = a; c.parentNode;) {
          c = c.parentNode;
        }

        c = c.querySelectorAll("input[name=" + JSON.stringify("" + b) + '][type="radio"]');

        for (b = 0; b < c.length; b++) {
          var d = c[b];

          if (d !== a && d.form === a.form) {
            var e = Qd(d);
            if (!e) throw Error(u(90));
            yb(d);
            Cb(d, e);
          }
        }
      }

      break;

    case "textarea":
      Kb(a, c);
      break;

    case "select":
      b = c.value, null != b && Hb(a, !!c.multiple, b, !1);
  }
};

Fa = Mj;

Ga = function Ga(a, b, c, d, e) {
  var f = W;
  W |= 4;

  try {
    return cg(98, a.bind(null, b, c, d, e));
  } finally {
    W = f, W === V && gg();
  }
};

Ha = function Ha() {
  (W & (1 | fj | gj)) === V && (Lj(), Dj());
};

Ia = function Ia(a, b) {
  var c = W;
  W |= 2;

  try {
    return a(b);
  } finally {
    W = c, W === V && gg();
  }
};

function kk(a, b) {
  var c = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
  if (!gk(b)) throw Error(u(200));
  return jk(a, b, null, c);
}

var lk = {
  Events: [Nc, Pd, Qd, xa, ta, Xd, function (a) {
    jc(a, Wd);
  }, Da, Ea, id, mc, Dj, {
    current: !1
  }]
};

(function (a) {
  var b = a.findFiberByHostInstance;
  return Yj(n({}, a, {
    overrideHookState: null,
    overrideProps: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: Wa.ReactCurrentDispatcher,
    findHostInstanceByFiber: function findHostInstanceByFiber(a) {
      a = hc(a);
      return null === a ? null : a.stateNode;
    },
    findFiberByHostInstance: function findFiberByHostInstance(a) {
      return b ? b(a) : null;
    },
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null
  }));
})({
  findFiberByHostInstance: tc,
  bundleType: 0,
  version: "16.14.0",
  rendererPackageName: "react-dom"
});

__webpack_unused_export__ = lk;
__webpack_unused_export__ = kk;

__webpack_unused_export__ = function (a) {
  if (null == a) return null;
  if (1 === a.nodeType) return a;
  var b = a._reactInternalFiber;

  if (void 0 === b) {
    if ("function" === typeof a.render) throw Error(u(188));
    throw Error(u(268, Object.keys(a)));
  }

  a = hc(b);
  a = null === a ? null : a.stateNode;
  return a;
};

__webpack_unused_export__ = function (a, b) {
  if ((W & (fj | gj)) !== V) throw Error(u(187));
  var c = W;
  W |= 1;

  try {
    return cg(99, a.bind(null, b));
  } finally {
    W = c, gg();
  }
};

__webpack_unused_export__ = function (a, b, c) {
  if (!gk(b)) throw Error(u(200));
  return ik(null, a, b, !0, c);
};

exports.render = function (a, b, c) {
  if (!gk(b)) throw Error(u(200));
  return ik(null, a, b, !1, c);
};

__webpack_unused_export__ = function (a) {
  if (!gk(a)) throw Error(u(40));
  return a._reactRootContainer ? (Nj(function () {
    ik(null, null, a, !1, function () {
      a._reactRootContainer = null;
      a[Od] = null;
    });
  }), !0) : !1;
};

__webpack_unused_export__ = Mj;

__webpack_unused_export__ = function (a, b) {
  return kk(a, b, 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null);
};

__webpack_unused_export__ = function (a, b, c, d) {
  if (!gk(c)) throw Error(u(200));
  if (null == a || void 0 === a._reactInternalFiber) throw Error(u(38));
  return ik(a, b, c, !1, d);
};

__webpack_unused_export__ = "16.14.0";

/***/ }),

/***/ "./node_modules/react-dom/index.js":
/*!*****************************************!*\
  !*** ./node_modules/react-dom/index.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function checkDCE() {
  /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined' || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== 'function') {
    return;
  }

  if (false) {}

  try {
    // Verify that the code above has been dead code eliminated (DCE'd).
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    // DevTools shouldn't crash React, no matter what.
    // We should still report in case we break this code.
    console.error(err);
  }
}

if (true) {
  // DCE check should happen before ReactDOM bundle executes so that
  // DevTools can report bad minification during injection.
  checkDCE();
  module.exports = __webpack_require__(/*! ./cjs/react-dom.production.min.js */ "./node_modules/react-dom/cjs/react-dom.production.min.js");
} else {}

/***/ }),

/***/ "./node_modules/react-dom/node_modules/scheduler/cjs/scheduler.production.min.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/react-dom/node_modules/scheduler/cjs/scheduler.production.min.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/** @license React v0.19.1
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _f, g, h, k, l;

if ("undefined" === typeof window || "function" !== typeof MessageChannel) {
  var p = null,
      q = null,
      t = function t() {
    if (null !== p) try {
      var a = exports.unstable_now();
      p(!0, a);
      p = null;
    } catch (b) {
      throw setTimeout(t, 0), b;
    }
  },
      u = Date.now();

  exports.unstable_now = function () {
    return Date.now() - u;
  };

  _f = function f(a) {
    null !== p ? setTimeout(_f, 0, a) : (p = a, setTimeout(t, 0));
  };

  g = function g(a, b) {
    q = setTimeout(a, b);
  };

  h = function h() {
    clearTimeout(q);
  };

  k = function k() {
    return !1;
  };

  l = exports.unstable_forceFrameRate = function () {};
} else {
  var w = window.performance,
      x = window.Date,
      y = window.setTimeout,
      z = window.clearTimeout;

  if ("undefined" !== typeof console) {
    var A = window.cancelAnimationFrame;
    "function" !== typeof window.requestAnimationFrame && console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills");
    "function" !== typeof A && console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills");
  }

  if ("object" === _typeof(w) && "function" === typeof w.now) exports.unstable_now = function () {
    return w.now();
  };else {
    var B = x.now();

    exports.unstable_now = function () {
      return x.now() - B;
    };
  }
  var C = !1,
      D = null,
      E = -1,
      F = 5,
      G = 0;

  k = function k() {
    return exports.unstable_now() >= G;
  };

  l = function l() {};

  exports.unstable_forceFrameRate = function (a) {
    0 > a || 125 < a ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing framerates higher than 125 fps is not unsupported") : F = 0 < a ? Math.floor(1E3 / a) : 5;
  };

  var H = new MessageChannel(),
      I = H.port2;

  H.port1.onmessage = function () {
    if (null !== D) {
      var a = exports.unstable_now();
      G = a + F;

      try {
        D(!0, a) ? I.postMessage(null) : (C = !1, D = null);
      } catch (b) {
        throw I.postMessage(null), b;
      }
    } else C = !1;
  };

  _f = function _f(a) {
    D = a;
    C || (C = !0, I.postMessage(null));
  };

  g = function g(a, b) {
    E = y(function () {
      a(exports.unstable_now());
    }, b);
  };

  h = function h() {
    z(E);
    E = -1;
  };
}

function J(a, b) {
  var c = a.length;
  a.push(b);

  a: for (;;) {
    var d = c - 1 >>> 1,
        e = a[d];
    if (void 0 !== e && 0 < K(e, b)) a[d] = b, a[c] = e, c = d;else break a;
  }
}

function L(a) {
  a = a[0];
  return void 0 === a ? null : a;
}

function M(a) {
  var b = a[0];

  if (void 0 !== b) {
    var c = a.pop();

    if (c !== b) {
      a[0] = c;

      a: for (var d = 0, e = a.length; d < e;) {
        var m = 2 * (d + 1) - 1,
            n = a[m],
            v = m + 1,
            r = a[v];
        if (void 0 !== n && 0 > K(n, c)) void 0 !== r && 0 > K(r, n) ? (a[d] = r, a[v] = c, d = v) : (a[d] = n, a[m] = c, d = m);else if (void 0 !== r && 0 > K(r, c)) a[d] = r, a[v] = c, d = v;else break a;
      }
    }

    return b;
  }

  return null;
}

function K(a, b) {
  var c = a.sortIndex - b.sortIndex;
  return 0 !== c ? c : a.id - b.id;
}

var N = [],
    O = [],
    P = 1,
    Q = null,
    R = 3,
    S = !1,
    T = !1,
    U = !1;

function V(a) {
  for (var b = L(O); null !== b;) {
    if (null === b.callback) M(O);else if (b.startTime <= a) M(O), b.sortIndex = b.expirationTime, J(N, b);else break;
    b = L(O);
  }
}

function W(a) {
  U = !1;
  V(a);
  if (!T) if (null !== L(N)) T = !0, _f(X);else {
    var b = L(O);
    null !== b && g(W, b.startTime - a);
  }
}

function X(a, b) {
  T = !1;
  U && (U = !1, h());
  S = !0;
  var c = R;

  try {
    V(b);

    for (Q = L(N); null !== Q && (!(Q.expirationTime > b) || a && !k());) {
      var d = Q.callback;

      if (null !== d) {
        Q.callback = null;
        R = Q.priorityLevel;
        var e = d(Q.expirationTime <= b);
        b = exports.unstable_now();
        "function" === typeof e ? Q.callback = e : Q === L(N) && M(N);
        V(b);
      } else M(N);

      Q = L(N);
    }

    if (null !== Q) var m = !0;else {
      var n = L(O);
      null !== n && g(W, n.startTime - b);
      m = !1;
    }
    return m;
  } finally {
    Q = null, R = c, S = !1;
  }
}

function Y(a) {
  switch (a) {
    case 1:
      return -1;

    case 2:
      return 250;

    case 5:
      return 1073741823;

    case 4:
      return 1E4;

    default:
      return 5E3;
  }
}

var Z = l;
exports.unstable_IdlePriority = 5;
exports.unstable_ImmediatePriority = 1;
exports.unstable_LowPriority = 4;
exports.unstable_NormalPriority = 3;
exports.unstable_Profiling = null;
exports.unstable_UserBlockingPriority = 2;

exports.unstable_cancelCallback = function (a) {
  a.callback = null;
};

exports.unstable_continueExecution = function () {
  T || S || (T = !0, _f(X));
};

exports.unstable_getCurrentPriorityLevel = function () {
  return R;
};

exports.unstable_getFirstCallbackNode = function () {
  return L(N);
};

exports.unstable_next = function (a) {
  switch (R) {
    case 1:
    case 2:
    case 3:
      var b = 3;
      break;

    default:
      b = R;
  }

  var c = R;
  R = b;

  try {
    return a();
  } finally {
    R = c;
  }
};

exports.unstable_pauseExecution = function () {};

exports.unstable_requestPaint = Z;

exports.unstable_runWithPriority = function (a, b) {
  switch (a) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      break;

    default:
      a = 3;
  }

  var c = R;
  R = a;

  try {
    return b();
  } finally {
    R = c;
  }
};

exports.unstable_scheduleCallback = function (a, b, c) {
  var d = exports.unstable_now();

  if ("object" === _typeof(c) && null !== c) {
    var e = c.delay;
    e = "number" === typeof e && 0 < e ? d + e : d;
    c = "number" === typeof c.timeout ? c.timeout : Y(a);
  } else c = Y(a), e = d;

  c = e + c;
  a = {
    id: P++,
    callback: b,
    priorityLevel: a,
    startTime: e,
    expirationTime: c,
    sortIndex: -1
  };
  e > d ? (a.sortIndex = e, J(O, a), null === L(N) && a === L(O) && (U ? h() : U = !0, g(W, e - d))) : (a.sortIndex = c, J(N, a), T || S || (T = !0, _f(X)));
  return a;
};

exports.unstable_shouldYield = function () {
  var a = exports.unstable_now();
  V(a);
  var b = L(N);
  return b !== Q && null !== Q && null !== b && null !== b.callback && b.startTime <= a && b.expirationTime < Q.expirationTime || k();
};

exports.unstable_wrapCallback = function (a) {
  var b = R;
  return function () {
    var c = R;
    R = b;

    try {
      return a.apply(this, arguments);
    } finally {
      R = c;
    }
  };
};

/***/ }),

/***/ "./node_modules/react-dom/node_modules/scheduler/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/react-dom/node_modules/scheduler/index.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(/*! ./cjs/scheduler.production.min.js */ "./node_modules/react-dom/node_modules/scheduler/cjs/scheduler.production.min.js");
} else {}

/***/ }),

/***/ "./node_modules/react/cjs/react.production.min.js":
/*!********************************************************!*\
  !*** ./node_modules/react/cjs/react.production.min.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/** @license React v16.14.0
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var l = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js"),
    n = "function" === typeof Symbol && Symbol.for,
    p = n ? Symbol.for("react.element") : 60103,
    q = n ? Symbol.for("react.portal") : 60106,
    r = n ? Symbol.for("react.fragment") : 60107,
    t = n ? Symbol.for("react.strict_mode") : 60108,
    u = n ? Symbol.for("react.profiler") : 60114,
    v = n ? Symbol.for("react.provider") : 60109,
    w = n ? Symbol.for("react.context") : 60110,
    x = n ? Symbol.for("react.forward_ref") : 60112,
    y = n ? Symbol.for("react.suspense") : 60113,
    z = n ? Symbol.for("react.memo") : 60115,
    A = n ? Symbol.for("react.lazy") : 60116,
    B = "function" === typeof Symbol && Symbol.iterator;

function C(a) {
  for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++) {
    b += "&args[]=" + encodeURIComponent(arguments[c]);
  }

  return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}

var D = {
  isMounted: function isMounted() {
    return !1;
  },
  enqueueForceUpdate: function enqueueForceUpdate() {},
  enqueueReplaceState: function enqueueReplaceState() {},
  enqueueSetState: function enqueueSetState() {}
},
    E = {};

function F(a, b, c) {
  this.props = a;
  this.context = b;
  this.refs = E;
  this.updater = c || D;
}

F.prototype.isReactComponent = {};

F.prototype.setState = function (a, b) {
  if ("object" !== _typeof(a) && "function" !== typeof a && null != a) throw Error(C(85));
  this.updater.enqueueSetState(this, a, b, "setState");
};

F.prototype.forceUpdate = function (a) {
  this.updater.enqueueForceUpdate(this, a, "forceUpdate");
};

function G() {}

G.prototype = F.prototype;

function H(a, b, c) {
  this.props = a;
  this.context = b;
  this.refs = E;
  this.updater = c || D;
}

var I = H.prototype = new G();
I.constructor = H;
l(I, F.prototype);
I.isPureReactComponent = !0;
var J = {
  current: null
},
    K = Object.prototype.hasOwnProperty,
    L = {
  key: !0,
  ref: !0,
  __self: !0,
  __source: !0
};

function M(a, b, c) {
  var e,
      d = {},
      g = null,
      k = null;
  if (null != b) for (e in void 0 !== b.ref && (k = b.ref), void 0 !== b.key && (g = "" + b.key), b) {
    K.call(b, e) && !L.hasOwnProperty(e) && (d[e] = b[e]);
  }
  var f = arguments.length - 2;
  if (1 === f) d.children = c;else if (1 < f) {
    for (var h = Array(f), m = 0; m < f; m++) {
      h[m] = arguments[m + 2];
    }

    d.children = h;
  }
  if (a && a.defaultProps) for (e in f = a.defaultProps, f) {
    void 0 === d[e] && (d[e] = f[e]);
  }
  return {
    $$typeof: p,
    type: a,
    key: g,
    ref: k,
    props: d,
    _owner: J.current
  };
}

function N(a, b) {
  return {
    $$typeof: p,
    type: a.type,
    key: b,
    ref: a.ref,
    props: a.props,
    _owner: a._owner
  };
}

function O(a) {
  return "object" === _typeof(a) && null !== a && a.$$typeof === p;
}

function escape(a) {
  var b = {
    "=": "=0",
    ":": "=2"
  };
  return "$" + ("" + a).replace(/[=:]/g, function (a) {
    return b[a];
  });
}

var P = /\/+/g,
    Q = [];

function R(a, b, c, e) {
  if (Q.length) {
    var d = Q.pop();
    d.result = a;
    d.keyPrefix = b;
    d.func = c;
    d.context = e;
    d.count = 0;
    return d;
  }

  return {
    result: a,
    keyPrefix: b,
    func: c,
    context: e,
    count: 0
  };
}

function S(a) {
  a.result = null;
  a.keyPrefix = null;
  a.func = null;
  a.context = null;
  a.count = 0;
  10 > Q.length && Q.push(a);
}

function T(a, b, c, e) {
  var d = _typeof(a);

  if ("undefined" === d || "boolean" === d) a = null;
  var g = !1;
  if (null === a) g = !0;else switch (d) {
    case "string":
    case "number":
      g = !0;
      break;

    case "object":
      switch (a.$$typeof) {
        case p:
        case q:
          g = !0;
      }

  }
  if (g) return c(e, a, "" === b ? "." + U(a, 0) : b), 1;
  g = 0;
  b = "" === b ? "." : b + ":";
  if (Array.isArray(a)) for (var k = 0; k < a.length; k++) {
    d = a[k];
    var f = b + U(d, k);
    g += T(d, f, c, e);
  } else if (null === a || "object" !== _typeof(a) ? f = null : (f = B && a[B] || a["@@iterator"], f = "function" === typeof f ? f : null), "function" === typeof f) for (a = f.call(a), k = 0; !(d = a.next()).done;) {
    d = d.value, f = b + U(d, k++), g += T(d, f, c, e);
  } else if ("object" === d) throw c = "" + a, Error(C(31, "[object Object]" === c ? "object with keys {" + Object.keys(a).join(", ") + "}" : c, ""));
  return g;
}

function V(a, b, c) {
  return null == a ? 0 : T(a, "", b, c);
}

function U(a, b) {
  return "object" === _typeof(a) && null !== a && null != a.key ? escape(a.key) : b.toString(36);
}

function W(a, b) {
  a.func.call(a.context, b, a.count++);
}

function aa(a, b, c) {
  var e = a.result,
      d = a.keyPrefix;
  a = a.func.call(a.context, b, a.count++);
  Array.isArray(a) ? X(a, e, c, function (a) {
    return a;
  }) : null != a && (O(a) && (a = N(a, d + (!a.key || b && b.key === a.key ? "" : ("" + a.key).replace(P, "$&/") + "/") + c)), e.push(a));
}

function X(a, b, c, e, d) {
  var g = "";
  null != c && (g = ("" + c).replace(P, "$&/") + "/");
  b = R(b, g, e, d);
  V(a, aa, b);
  S(b);
}

var Y = {
  current: null
};

function Z() {
  var a = Y.current;
  if (null === a) throw Error(C(321));
  return a;
}

var ba = {
  ReactCurrentDispatcher: Y,
  ReactCurrentBatchConfig: {
    suspense: null
  },
  ReactCurrentOwner: J,
  IsSomeRendererActing: {
    current: !1
  },
  assign: l
};
exports.Children = {
  map: function map(a, b, c) {
    if (null == a) return a;
    var e = [];
    X(a, e, null, b, c);
    return e;
  },
  forEach: function forEach(a, b, c) {
    if (null == a) return a;
    b = R(null, null, b, c);
    V(a, W, b);
    S(b);
  },
  count: function count(a) {
    return V(a, function () {
      return null;
    }, null);
  },
  toArray: function toArray(a) {
    var b = [];
    X(a, b, null, function (a) {
      return a;
    });
    return b;
  },
  only: function only(a) {
    if (!O(a)) throw Error(C(143));
    return a;
  }
};
exports.Component = F;
exports.Fragment = r;
exports.Profiler = u;
exports.PureComponent = H;
exports.StrictMode = t;
exports.Suspense = y;
exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ba;

exports.cloneElement = function (a, b, c) {
  if (null === a || void 0 === a) throw Error(C(267, a));
  var e = l({}, a.props),
      d = a.key,
      g = a.ref,
      k = a._owner;

  if (null != b) {
    void 0 !== b.ref && (g = b.ref, k = J.current);
    void 0 !== b.key && (d = "" + b.key);
    if (a.type && a.type.defaultProps) var f = a.type.defaultProps;

    for (h in b) {
      K.call(b, h) && !L.hasOwnProperty(h) && (e[h] = void 0 === b[h] && void 0 !== f ? f[h] : b[h]);
    }
  }

  var h = arguments.length - 2;
  if (1 === h) e.children = c;else if (1 < h) {
    f = Array(h);

    for (var m = 0; m < h; m++) {
      f[m] = arguments[m + 2];
    }

    e.children = f;
  }
  return {
    $$typeof: p,
    type: a.type,
    key: d,
    ref: g,
    props: e,
    _owner: k
  };
};

exports.createContext = function (a, b) {
  void 0 === b && (b = null);
  a = {
    $$typeof: w,
    _calculateChangedBits: b,
    _currentValue: a,
    _currentValue2: a,
    _threadCount: 0,
    Provider: null,
    Consumer: null
  };
  a.Provider = {
    $$typeof: v,
    _context: a
  };
  return a.Consumer = a;
};

exports.createElement = M;

exports.createFactory = function (a) {
  var b = M.bind(null, a);
  b.type = a;
  return b;
};

exports.createRef = function () {
  return {
    current: null
  };
};

exports.forwardRef = function (a) {
  return {
    $$typeof: x,
    render: a
  };
};

exports.isValidElement = O;

exports.lazy = function (a) {
  return {
    $$typeof: A,
    _ctor: a,
    _status: -1,
    _result: null
  };
};

exports.memo = function (a, b) {
  return {
    $$typeof: z,
    type: a,
    compare: void 0 === b ? null : b
  };
};

exports.useCallback = function (a, b) {
  return Z().useCallback(a, b);
};

exports.useContext = function (a, b) {
  return Z().useContext(a, b);
};

exports.useDebugValue = function () {};

exports.useEffect = function (a, b) {
  return Z().useEffect(a, b);
};

exports.useImperativeHandle = function (a, b, c) {
  return Z().useImperativeHandle(a, b, c);
};

exports.useLayoutEffect = function (a, b) {
  return Z().useLayoutEffect(a, b);
};

exports.useMemo = function (a, b) {
  return Z().useMemo(a, b);
};

exports.useReducer = function (a, b, c) {
  return Z().useReducer(a, b, c);
};

exports.useRef = function (a) {
  return Z().useRef(a);
};

exports.useState = function (a) {
  return Z().useState(a);
};

exports.version = "16.14.0";

/***/ }),

/***/ "./node_modules/react/index.js":
/*!*************************************!*\
  !*** ./node_modules/react/index.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(/*! ./cjs/react.production.min.js */ "./node_modules/react/cjs/react.production.min.js");
} else {}

/***/ }),

/***/ "./node_modules/tslib/tslib.es6.js":
/*!*****************************************!*\
  !*** ./node_modules/tslib/tslib.es6.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "__extends": () => /* binding */ __extends,
/* harmony export */   "__assign": () => /* binding */ _assign,
/* harmony export */   "__values": () => /* binding */ __values,
/* harmony export */   "__read": () => /* binding */ __read,
/* harmony export */   "__spread": () => /* binding */ __spread
/* harmony export */ });
/* unused harmony exports __rest, __decorate, __param, __metadata, __awaiter, __generator, __exportStar, __spreadArrays, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault */
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

/* global Reflect, Promise */
var _extendStatics = function extendStatics(d, b) {
  _extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) {
      if (b.hasOwnProperty(p)) d[p] = b[p];
    }
  };

  return _extendStatics(d, b);
};

function __extends(d, b) {
  _extendStatics(d, b);

  function __() {
    this.constructor = d;
  }

  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var _assign = function __assign() {
  _assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return _assign.apply(this, arguments);
};


function __rest(s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
}
function __decorate(decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function __param(paramIndex, decorator) {
  return function (target, key) {
    decorator(target, key, paramIndex);
  };
}
function __metadata(metadataKey, metadataValue) {
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}
function __awaiter(thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __generator(thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
}
function __exportStar(m, exports) {
  for (var p in m) {
    if (!exports.hasOwnProperty(p)) exports[p] = m[p];
  }
}
function __values(o) {
  var m = typeof Symbol === "function" && o[Symbol.iterator],
      i = 0;
  if (m) return m.call(o);
  return {
    next: function next() {
      if (o && i >= o.length) o = void 0;
      return {
        value: o && o[i++],
        done: !o
      };
    }
  };
}
function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
      r,
      ar = [],
      e;

  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
      ar.push(r.value);
    }
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }

  return ar;
}
function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++) {
    ar = ar.concat(__read(arguments[i]));
  }

  return ar;
}
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
}
;
function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []),
      i,
      q = [];
  return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
    return this;
  }, i;

  function verb(n) {
    if (g[n]) i[n] = function (v) {
      return new Promise(function (a, b) {
        q.push([n, v, a, b]) > 1 || resume(n, v);
      });
    };
  }

  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }

  function step(r) {
    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }

  function fulfill(value) {
    resume("next", value);
  }

  function reject(value) {
    resume("throw", value);
  }

  function settle(f, v) {
    if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
  }
}
function __asyncDelegator(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function (e) {
    throw e;
  }), verb("return"), i[Symbol.iterator] = function () {
    return this;
  }, i;

  function verb(n, f) {
    i[n] = o[n] ? function (v) {
      return (p = !p) ? {
        value: __await(o[n](v)),
        done: n === "return"
      } : f ? f(v) : v;
    } : f;
  }
}
function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator],
      i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
    return this;
  }, i);

  function verb(n) {
    i[n] = o[n] && function (v) {
      return new Promise(function (resolve, reject) {
        v = o[n](v), settle(resolve, reject, v.done, v.value);
      });
    };
  }

  function settle(resolve, reject, d, v) {
    Promise.resolve(v).then(function (v) {
      resolve({
        value: v,
        done: d
      });
    }, reject);
  }
}
function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", {
      value: raw
    });
  } else {
    cooked.raw = raw;
  }

  return cooked;
}
;
function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
  }
  result.default = mod;
  return result;
}
function __importDefault(mod) {
  return mod && mod.__esModule ? mod : {
    default: mod
  };
}

/***/ })

}]);
//# sourceMappingURL=chunk-vendors.d6c2323d.bundle.js.map