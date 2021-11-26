(function () {
  var nope = function () { };
  var _forceStop = nope;
  var maxHandleTimer = null;
  var output = {
    version: "1.0.0",
    listeners: [],
    on: function (fn) {
      if (this.listeners.indexOf(fn) === -1) {
        this.listeners.push(fn)
      }
    },
    un: function (fn) {
      if (fn) {
        var i = this.listeners.indexOf(fn);
        this.listeners.splice(i, 1)
      }
    },
    forceStop: function () {
      _forceStop()
    },
    _fn: function (cost, bestTime, domSize) {
      var fn;
      for (var index in this.listeners) {
        fn = this.listeners[index];
        fn(cost, bestTime, domSize)
      }
      this.listeners = []
    },
    lazy: function () {
      if (!maxHandleTimer) {
        init()
      }
    }
  };
  if (typeof window === "undefined" || typeof performance === "undefined" || typeof MutationObserver === "undefined") {
    if (typeof module !== "undefined") {
      module.exports = {
        on: nope,
        un: nope,
        forceStop: nope
      }
    }
  } else {
    var isMyTime = false;
    if (window._jsFSP) {
      output.listeners = window._jsFSP.listeners
    } else {
      window._jsFSP = output;
      isMyTime = true
    }
    var frames = [];
    var vSize = screen.width * screen.height;
    var MAX_RUNNING_LIMIT = 30 * 1000;
    var maxRenderIdle = 3000;
    var limitContinuousFrameIdle = 200;
    var loggerDev = 1;
    var idleTimer = null;
    var isStop = false;
    var stoping = false;
    var NOT_DEEP_IN = ["SCRIPT", "LINK", "SVG", "IMG", "VIDEO"];
    var ignoreBucket = [];

    function callback(records) {
      var addDoms = [];
      var remDoms = [];
      forEach(records, function (record) {
        forEach(record.addedNodes, function (node) {
          if (node.nodeType !== 1 && node.nodeType !== 9) {
            return
          }
          addDoms.push(node)
        })
      });
      addDoms.length + remDoms.length > 0 && makeFrames(addDoms.concat(remDoms))
    }
    var mutationObserver = new MutationObserver(callback);
    var options = {
      "childList": true,
      "subtree": true
    };

    function isLazy() {
      var mm = document.querySelector("meta[name=js-lazy-sfsp]");
      return mm && mm.getAttribute("content") === "true"
    }
    if (document) {
      isLazy() || init()
    }

    function isIgnore(node) {
      var n = ignoreBucket.length;
      var t = null;
      for (var i = 0; i < n; i++) {
        t = ignoreBucket[i];
        if (t && t.contains && t.contains(node)) {
          return true
        }
      }
      if (node.hasAttribute("ignoreFspCollection")) {
        ignoreBucket.push(node);
        return true
      }
      return false
    }

    function init() {
      if (!isMyTime) {
        return
      }
      mutationObserver.observe(document.firstElementChild, options);
      ignoreBucket = [];
      forEach(document.querySelectorAll("[ignoreFspCollection]"), function (one) {
        ignoreBucket.push(one)
      });
      makeFrames(document.querySelectorAll("BODY > *"));
      maxHandleTimer = setTimeout(function () {
        removeListener(true)
      }, MAX_RUNNING_LIMIT)
    }

    function removeListener(isMaxTimeout) {
      if (isStop) {
        return
      }
      stoping = true;
      idleTimer && clearTimeout(idleTimer);
      mutationObserver.disconnect();
      mutationObserver.takeRecords();
      ignoreBucket = [];
      setTimeout(function () {
        isStop = true;
        decision(isMaxTimeout)
      }, 1000)
    }

    function isInnerBox(list, b) {
      var a = null;
      for (var i in list) {
        a = list[i];
        if (b.top >= a.top && b.left >= a.left && b.top + b.height <= a.top + a.height && b.left + b.width <= a.left + a.width) {
          return true
        }
      }
      return false
    }

    function collapseBox(list) {
      return list
    }

    function inFirstScreenBox(b, isImgLoaded) {
      var isFirstBatch = frames.length === 0;
      var sw = screen.width;
      var sh = screen.height;
      var right = b.left + b.width;
      var bottom = b.top + b.height;
      var ignoreMini = Math.round(Math.min(screen.width, screen.height) * 0.02);
      var bottomIgnore = Math.round(sh * 0.05);
      if (isFirstBatch) {
        ignoreMini = Math.min(sw, sh) * 0.02;
        return b.width >= isImgLoaded ? ignoreMini : 1 && b.height >= isImgLoaded ? ignoreMini : 1 && right >= ignoreMini && sw - b.left >= ignoreMini && bottom >= bottomIgnore && sh - b.top >= bottomIgnore
      } else {
        return b.width >= ignoreMini && b.height >= ignoreMini && right >= bottomIgnore && sw - b.left >= bottomIgnore && bottom >= bottomIgnore && sh - b.top > bottomIgnore * 2
      }
    }

    function countVal(list, fn, initVal) {
      var v = initVal || 0;
      forEach(list, function (one) {
        v = fn(one, v)
      });
      return v
    }

    function updateLastTime(fInfo) {
      var f = function () {
        fInfo.lastTime = Math.max(now(), fInfo.lastTime);
        fInfo.c = document.getElementsByTagName("*").length;
        hit()
      };
      if (window.requestAnimationFrame) {
        requestAnimationFrame(f)
      } else {
        setTimeout(f, 0)
      }
    }

    function mergeBox(fInfo, node, _mainBox) {
      var boxs = fInfo.piece;
      var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body && document.body.scrollTop || 0;
      var scrollLeft = document.documentElement.scrollLeft || window.pageXOffset || document.body && document.body.scrollLeft || 0;
      var rect = _mainBox ? null : node.getBoundingClientRect();
      var mainBox = _mainBox || {
        type: 0,
        className: takePath(node),
        top: rect.top + scrollTop,
        left: rect.left + scrollLeft,
        width: rect.width,
        height: rect.height
      };
      var p = node.offsetParent;
      if (p && p.offsetWidth < p.scrollWidth) {
        mainBox.width = Math.min(p.offsetWidth, mainBox.width)
      }
      if (p && p.offsetHeight < p.scrollHeight) {
        mainBox.height = Math.min(p.offsetHeight, mainBox.height)
      }
      var deepIn = true;
      var tagName = node.tagName;
      if (NOT_DEEP_IN.indexOf(tagName.toUpperCase()) !== -1) {
        deepIn = false;
        if (tagName === "IMG") {
          var loadCount = 0;
          mainBox.width = Math.max(mainBox.width, 1);
          mainBox.height = Math.max(mainBox.height, 1);
          mainBox.type = 1;
          if (inFirstScreenBox(mainBox)) {
            fInfo.wait += 1;

            function handleLoadEvent() {
              if (isStop) {
                node.removeEventListener("load", handleLoadEvent, true);
                return
              }
              loadCount++;
              fInfo.wait -= 1;
              var r = node.getBoundingClientRect();
              var t = now();
              if (inFirstScreenBox(mainBox, true) && (loadCount <= 1 || t <= 1000)) {
                mainBox.width = r.width;
                mainBox.height = r.height;
                fInfo.lastTime = Math.max(t, fInfo.lastTime);
                mainBox.size = r.width * r.height;
                mainBox.v = mainBox.size / vSize;
                loggerDev && console.log("detect image loaded", /^data:/i.test(event.target.src) ? "Base64_Image" : event.target.src);
                fInfo.v = countVal(fInfo.piece, function (one, val) {
                  return one.v + val
                }, 0);
                updateLastTime(fInfo)
              } else {
                hit()
              }
            }

            function handleLoadError() {
              if (isStop) {
                node.removeEventListener("error", handleLoadError, true);
                return
              }
              fInfo.wait -= 1;
              if (inFirstScreenBox(mainBox)) {
                fInfo.lastTime = Math.max(now(), fInfo.lastTime);
                if (fInfo.wait === 0) {
                  fInfo.v = countVal(fInfo.piece, function (one, val) {
                    return one.v + val
                  }, 0);
                  updateLastTime(fInfo)
                }
              } else {
                hit()
              }
            }
            node.addEventListener("load", handleLoadEvent, true);
            node.addEventListener("error", handleLoadError, true)
          } else { }
        }
      }
      var domNodeCssStyle = {};
      if (window.getComputedStyle) {
        domNodeCssStyle = window.getComputedStyle(node, null);
        if (domNodeCssStyle.display === "none" || domNodeCssStyle.position === "fixed") {
          deepIn = false;
          return collapseBox(boxs)
        }
      }
      if (inFirstScreenBox(mainBox)) {
        var bgImgUrl = domNodeCssStyle.backgroundImage || "";
        var regTestUrl = /url\(['"]?(.*?)['"]?\)/i;
        if (regTestUrl.test(bgImgUrl)) {
          bgImgUrl = bgImgUrl.replace(regTestUrl, "$1");
          if (!/^data:/i.test(bgImgUrl)) {
            fInfo.wait += 1;
            var tmpImg = document.createElement("img");
            tmpImg.onload = function () {
              fInfo.wait -= 1;
              fInfo.lastTime = Math.max(now(), fInfo.lastTime);
              if (fInfo.wait === 0) {
                updateLastTime(fInfo)
              }
            };
            tmpImg.src = bgImgUrl
          }
        }
        if (!isInnerBox(boxs, mainBox)) {
          mainBox.size = mainBox.width * mainBox.height;
          mainBox.v = mainBox.size / vSize;
          fInfo.v += mainBox.v;
          mainBox.size ? boxs.push(mainBox) : deepIn = false
        }
      }
      return collapseBox(boxs)
    }

    function makeFrames(list) {
      var t = now();
      var out = {
        createTime: t,
        lastTime: t,
        wait: 0,
        piece: [],
        v: 0,
        c: document.getElementsByTagName("*").length
      };
      forEach(list, function (one) {
        isIgnore(one) || mergeBox(out, one)
      });
      if (out.piece.length > 0) {
        frames.push(out);
        updateLastTime(out)
      }
    }

    function takePath(n) {
      if (!loggerDev) {
        return ""
      }
      var out = [];
      var p = n;
      do {
        out.push(p.tagName + "." + p.className);
        p = p.parentElement
      } while (p && p !== document.body);
      return out.reverse().join(" > ")
    }

    function hit() {
      if (stoping || isStop) {
        return
      }
      idleTimer && clearTimeout(idleTimer);
      idleTimer = setTimeout(function () {
        loggerDev && console.log("stop By Idle");
        removeListener()
      }, maxRenderIdle);
      var a = null,
        b = null,
        c = 0,
        v = 0,
        sumV = 0,
        av = 0,
        bv = 0;
      for (var fLen = frames.length - 1; fLen > 1; fLen--) {
        a = frames[fLen];
        b = frames[fLen - 1];
        av = Math.floor(a.v * 100) / 100;
        bv = Math.floor(b.v * 100) / 100;
        v = bv ? Math.abs(av - bv) / bv : 0;
        sumV += Math.min(a.v, 1);
        if (sumV > 10) {
          loggerDev && console.log("stop By sum area 4", sumV);
          removeListener();
          break
        }
        if (v < 0.5) {
          c++;
          if (c > 6) {
            loggerDev && console.log("stop By stable tail");
            removeListener();
            break
          }
        } else if (c > 0) {
          c = 0
        }
      }
    }

    function stabilityCheck(data, r = 0.1, minK = 3) {
      let n = data.length - 1;
      let v = 0;
      do {
        const a = data[n];
        const b = data[n - 1];
        if (Math.abs(a - b) / a < r) {
          v++;
          n--;
          continue
        }
        break
      } while (n > 0);
      if (v >= minK && n > 0) {
        return Math.min(n, data.length - 1)
      }
      return data.length - 1
    }
    var ignoreMinRender = 0;

    function decision() {
      var fLen = frames.length;
      if (fLen === 0) {
        return
      }
      var bestTime = [];
      var waitDetection = [];
      var rest = [];
      var fft = -1;
      var domLen = 0;
      var v = 0;
      var c = 0;
      c = stabilityCheck(frames.map(function (a) {
        return Math.floor(a.v * 100) / 100
      }));
      waitDetection = c > 0 ? frames.slice(0, c + 1) : frames;
      while (waitDetection.length > 0) {
        fft = waitDetection[0].lastTime;
        domLen = waitDetection[0].c;
        rest = [];
        v = 0;
        c = 0;
        forEach(waitDetection, function (one) {
          v += one.v;
          c++;
          if (one.createTime <= fft + limitContinuousFrameIdle) {
            fft = Math.max(fft, one.lastTime);
            domLen = Math.max(domLen, one.c)
          }
          if (one.lastTime > fft) {
            rest.push(one)
          }
        });
        waitDetection = rest;
        if (v < 0.02 || v / c < 0.01) {
          loggerDev && console.log("ignore min render");
          ignoreMinRender++
        } else {
          ignoreMinRender = 0
        }
        bestTime.push([fft, domLen]);
        if (ignoreMinRender >= 3) {
          loggerDev && console.log("stop By keep min render 3");
          bestTime.splice(bestTime.length - 3);
          removeListener();
          break
        }
      }
      var t2 = bestTime.length - 1;
      if (ignoreMinRender !== 0) {
        t2 = Math.max(t2 - ignoreMinRender, 0)
      }
      var possible = t2 === bestTime.length ? -3 : t2 - 1;
      if (possible <= 0) {
        possible = 0
      }
      bestTime[t2] ? output._fn(bestTime[t2][0], bestTime.slice(possible, possible + 3), bestTime[t2][1]) : output._fn(null, null, null)
    };
    _forceStop = decision;

    function now() {
      return performance.now()
    }

    function forEach(list, cb) {
      if (Array.prototype.forEach) {
        Array.prototype.forEach.call(list, cb)
      } else {
        var len = list.length;
        for (var i = 0; i < len; i++) {
          cb(list[i], i)
        }
      }
    };
    if (typeof module !== "undefined") {
      module.exports = output
    }
  }
})();