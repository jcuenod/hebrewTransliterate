// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/hebrew-transliteration/dist/sequence.js":[function(require,module,exports) {
"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var consonants = /[\u{05D0}-\u{05F2}]/u;
var ligature = /[\u{05C1}-\u{05C2}]/u;
var dagesh = /[\u{05BC},\u{05BF}]/u; // includes rafe
var vowels = /[\u{05B0}-\u{05BB},\u{05C7}]/u;
var accents = /[\u{0590}-\u{05AF},\u{05BD}-\u{05BE},\u{05C0},\u{05C3}]/u;
var Char = /** @class */ (function () {
    function Char(char) {
        this.char = char;
        this.posIndex = this.findPos(this.char);
    }
    Char.prototype.findPos = function (char) {
        if (consonants.test(char)) {
            return 0;
        }
        if (ligature.test(char)) {
            return 1;
        }
        if (dagesh.test(char)) {
            return 2;
        }
        if (vowels.test(char)) {
            return 3;
        }
        if (accents.test(char)) {
            return 4;
        }
        return 10;
    };
    return Char;
}());
exports.Sequence = function (text) {
    var splits = /(?=[\u{05D0}-\u{05F2}])/u;
    var charClusters = text.split(splits);
    var mapClusters = charClusters.map(function (cluster) { return __spread(cluster).map(function (char) { return new Char(char); }); });
    var sortClusters = mapClusters.map(function (cluster) { return cluster.sort(function (a, b) { return a.posIndex - b.posIndex; }); });
    var redClusters = sortClusters.map(function (cluster) { return cluster.reduce(function (a, c) { return a + c.char; }, ""); });
    var seqText = redClusters.reduce(function (a, c) { return a + c; });
    return seqText;
};

},{}],"node_modules/hebrew-transliteration/dist/remove.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cantillation = /[\u{0591}-\u{05AF}\u{05BF}\u{05C0}\u{05C1}\u{05C3}-\u{05C6}\u{05F3}\u{05F4}]/gu;
var vowels = /[\u{05B0}-\u{05BD}\u{05BF}\u{05C7}]/gu;
var remCant = function (text) { return text.replace(cantillation, ""); };
var remVow = function (text) { return remCant(text).replace(vowels, ""); };
exports.Remove = function (text, _a) {
    var _b = (_a === void 0 ? {} : _a).removeVowels, removeVowels = _b === void 0 ? false : _b;
    return removeVowels ? remVow(text) : remCant(text);
};

},{}],"node_modules/hebrew-transliteration/dist/qametsQatan.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var qQsnippets = [
    "ʾāzǝn",
    "ʾākǝl",
    "ʾākǝl",
    "ʾāniyּ",
    "ʾāpǝn",
    "ʾārǝḥ",
    "ʾārǝkּ",
    "ʾāšǝr",
    "bāʾǝš",
    "bāšǝtּ",
    "bּāšǝtּ",
    "gābǝh",
    "gּābǝh",
    "gādǝl",
    "gּādǝl",
    "gārǝn",
    "gּārǝn",
    "ḥādǝš",
    "ḥākǝm",
    "ḥālǝyֽwō",
    "ḥālǝyōw",
    "ḥānּēniy",
    "ḥāpǝn",
    "ḥāpǝniy",
    "ḥāpǝšiy",
    "ḥāpǝšiyt",
    "ḥāq-",
    "ḥārǝb",
    "ḥārǝneper",
    "ḥārǝpּ",
    "ḥāšǝkּ",
    "yāpǝy",
    "yāšǝr",
    "kāl-",
    "kּāl-",
    "mār-",
    "mārǝdּǝkay",
    "mātǝn",
    "sālǝtּ",
    "ʿāzּ",
    "ʿāmǝriy",
    "ʿānǝy",
    "ʿāpǝr",
    "ʿārǝl",
    "ʿārǝpּ",
    "ʿāšǝr",
    "ṣārǝkּ",
    "qādǝq",
    "qādǝš",
    "qārǝbּ",
    "qārǝḥ",
    "rāb-",
    "rāgǝz",
    "rāḥǝbּ",
    "šārǝš",
    "šārāš",
    "šּārāš",
    "tּākǝniyt",
    "tām-",
    "tּām-"
];
var qQRgx = qQsnippets.map(function (snippet) { return new RegExp(snippet, "m"); });
var qametsQatanDict = {
    // for certain inflected and contextual occurences
    bּǝʾābǝdan: "bǝʾobdan",
    hāʾābǝnāyim: "hāʾobnāyim",
    ḥāqǝkā: "ḥoqkā",
    ḥāqǝkem: "ḥoqkem",
    hadּārǝbāֽn: "haddorbān",
    lǝʾākǝlāֽh: "lǝʾoklāh",
    haqּārǝbāֽn: "haqqorbān",
    ḥāpǝraʿ: "ḥopraʿ",
    wayּāmāt: "wayּāmot",
    wayּānās: "wayּānos",
    wayּāqām: "wayּāqom",
    wayּārām: "wayּārām",
    wayּāšׁāb: "wayּāšׁob",
    watּāmāt: "watּāmot",
    watּāqām: "watּāqom",
    watּāšׁāb: "watּāšׁob",
    wǝhāֽʿāpǝniy: "wǝhāʿopniy",
    tּākǝniֽyt: "tokniyt" // with silluq
};
exports.qametsQ = function (text) {
    return text.map(function (word) {
        //   if there is no qamets char, return
        if (!/ā/.test(word)) {
            return word;
        }
        if (qametsQatanDict[word]) {
            return qametsQatanDict[word];
        }
        if (/ŏ/.test(word)) {
            var pos = word.indexOf("ŏ");
            if (word.charAt(pos - 2) === "ā") {
                return word.substring(pos - 2) + "o" + word.substring(pos - 1);
            }
        }
        for (var index = 0; index < qQRgx.length; index++) {
            var rgx = qQRgx[index];
            if (rgx.test(word)) {
                var newRgx = rgx.source.split("ā").join("o");
                var matches = rgx.source.match(/ā/g);
                // checks for qQ forms w/ two ā's
                if (matches && matches.length >= 2) {
                    var parts = rgx.source.split("ā");
                    var firstMatch = [parts.shift(), parts.join("ā")];
                    newRgx = firstMatch.join("o");
                }
                return word.split(rgx).join(newRgx);
            }
        }
        return word;
    });
};

},{}],"node_modules/hebrew-transliteration/dist/hebCharsTrans.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transliterateMap = {
    //   niqqud
    "\u05B0": "ǝ",
    "\u05B1": "ĕ",
    "\u05B2": "ă",
    "\u05B3": "ŏ",
    "\u05B4": "i",
    "\u05B5": "ē",
    "\u05B6": "e",
    "\u05B7": "a",
    "\u05B8": "ā",
    "\u05B9": "ō",
    "\u05BA": "ō",
    "\u05BB": "u",
    //  "\u{05BC}": "", // HEBREW POINT DAGESH OR MAPIQ (U+05BC)
    //  "\u{05BD}": "", // HEBREW POINT METEG (U+05BD)
    "\u05BE": "-",
    "\u05C7": "ο",
    //   consonants
    א: "ʾ",
    ב: "b",
    ג: "g",
    ד: "d",
    ה: "h",
    ו: "w",
    ז: "z",
    ח: "ḥ",
    ט: "ṭ",
    י: "y",
    ך: "k",
    כ: "k",
    ל: "l",
    ם: "m",
    מ: "m",
    ן: "n",
    נ: "n",
    ס: "s",
    ע: "ʿ",
    ף: "p",
    פ: "p",
    ץ: "ṣ",
    צ: "ṣ",
    ק: "q",
    ר: "r",
    ש: "š",
    ת: "t",
    "\u05EF": "",
    װ: "",
    ױ: "",
    ײ: "" // HEBREW LIGATURE YIDDISH DOUBLE YOD (U+05F2)
};

},{}],"node_modules/hebrew-transliteration/dist/titForTat.js":[function(require,module,exports) {
"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var hebCharsTrans_1 = require("./hebCharsTrans");
exports.titForTat = function (text) {
    return __spread(text).map(function (char) { return (char in hebCharsTrans_1.transliterateMap ? hebCharsTrans_1.transliterateMap[char] : char); })
        .reduce(function (a, c) { return a + c; }, "");
};

},{"./hebCharsTrans":"node_modules/hebrew-transliteration/dist/hebCharsTrans.js"}],"node_modules/hebrew-transliteration/dist/testEach.js":[function(require,module,exports) {
"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var changeElementSplit = function (input, split, join) { return input.split(split).join(join); };
var changeElementSubstr = function (input, index, join) {
    return input.substring(0, index) + join + input.substring(index + 1);
};
var academicRules = function (array, _a) {
    var _b = (_a === void 0 ? {} : _a).isSimple, isSimple = _b === void 0 ? false : _b;
    return array.map(function (element) {
        if (element === " " || !element) {
            return element;
        }
        // Tests for shin non-ligatures
        // if (/\u{05C1}/u.test(element)) {
        //   element = changeElementSplit(element, /\u{05C1}/u, "");
        // }
        // Tests for sin non-ligatures
        if (/š\u{05C2}/u.test(element)) {
            element = changeElementSplit(element, /š\u{05C2}/u, "ś");
        }
        // remove metheg that is left in for checking qamets qatan vs gadol
        if (/\u{05BD}/u.test(element)) {
            element = changeElementSplit(element, /\u{05BD}/u, "");
        }
        // Tests for hiriq-yod mater
        if (/iy(?!ǝ|ĕ|ă|ŏ|i|ē|e|a|ā|ō|u|\u{05BC})/u.test(element)) {
            element = changeElementSplit(element, /iy(?!ǝ|ĕ|ă|ŏ|i|ē|e|a|ā|ō|u|\u05BC)/, "î");
        }
        // Tests for tsere-yod mater
        if (/ēy(?!ǝ|ĕ|ă|ŏ|i|ē|e|a|ā|ō|u|\u{05BC})/u.test(element)) {
            element = changeElementSplit(element, /ēy(?!ǝ|ĕ|ă|ŏ|i|ē|e|a|ā|ō|u|\u05BC)/, "ê");
        }
        // Tests for seghol-yod mater
        if (/ey(?!ǝ|ĕ|ă|ŏ|i|ē|e|a|ā|ō|u|\u{05BC})/u.test(element)) {
            element = changeElementSplit(element, /ey(?!ǝ|ĕ|ă|ŏ|i|ē|e|a|ā|ō|u|\u05BC)/, "ê");
        }
        // Tests for waw as a holem-mater
        if (/wō/.test(element)) {
            // this is a workaround for lack of lookbehind support
            var rev = __spread(element).reverse().reduce(function (a, c) { return a + c; });
            if (/ōw(?!ǝ|ĕ|ă|ŏ|i|ē|e|a|ā|u)/.test(rev)) {
                rev = changeElementSplit(rev, /ōw(?!ǝ|ĕ|ă|ŏ|i|ē|e|a|ā|u)/, "ô");
            }
            element = __spread(rev).reverse().reduce(function (a, c) { return a + c; });
        }
        // Tests for waw as a holem-mater
        // this will catch a waw as a consonant like - C+ō+w+V+C > CōwVC
        if (/ōw(?!ǝ|ĕ|ă|ŏ|i|ē|e|a|ā|u|\u{05BC})/u.test(element)) {
            element = changeElementSplit(element, /ōw(?!ǝ|ĕ|ă|ŏ|i|ē|e|a|ā|u|\u05BC)/, "ô");
        }
        // Tests for waw as a shureq-mater
        if (/w\u{05BC}(?!ǝ|ĕ|ă|ŏ|i|ē|e|a|ā|â|o|ô|u|û)/u.test(element)) {
            element = changeElementSplit(element, /w\u05BC(?!ǝ|ĕ|ă|ŏ|i|ē|e|a|ā|â|o|ô|u|û)/, "û");
        }
        // Tests for He as a final mater
        /* if using simple version, ēh remains so that it is passed into simpleRules
        if not, then there would be now way to distinguish between ê from tsere-yod vs he-mater */
        if (!isSimple) {
            if (/āh(?=$|-)/m.test(element)) {
                element = changeElementSplit(element, /āh(?=$|-)/m, "â");
            }
            else if (/ēh(?=$|-)/m.test(element)) {
                element = changeElementSplit(element, /ēh(?=$|-)/m, "ê");
            }
            else if (/eh(?=$|-)/m.test(element)) {
                element = changeElementSplit(element, /eh(?=$|-)/m, "ê");
            }
        }
        // tests for he with mappiq or furtive patach
        if (/h\u{05BC}$/mu.test(element)) {
            element = changeElementSplit(element, /h\u{05BC}$/mu, "h");
        }
        else if (/h\u{05BC}a$/mu.test(element)) {
            element = changeElementSplit(element, /h\u{05BC}a$/mu, "ah");
        }
        else if (/ḥa$/m.test(element)) {
            element = changeElementSplit(element, /ḥa$/m, "aḥ");
        }
        else if (/ʿa$/m.test(element)) {
            element = changeElementSplit(element, /ʿa$/m, "aʿ");
        }
        // Tests if a shewa exists in the element
        if (/ǝ/.test(element)) {
            var pos = element.indexOf("ǝ");
            while (pos !== -1) {
                // shewa at the end of a word
                if (element.charAt(element.length - 1) === "ǝ") {
                    element = changeElementSubstr(element, element.length - 1, "");
                }
                // if the shewa is preceded by a short vowel
                if (/ǝ|a|e|i|u|o/.test(element.charAt(pos - 2))) {
                    // if it SQeNeM LeVY letters in wayyiqtol forms
                    if (/s|ṣ|š|ś|q|n|m|l|w|y/.test(element.charAt(pos - 1)) && /w/.test(element.charAt(pos - 3))) {
                        element;
                    }
                    else {
                        element = changeElementSubstr(element, pos, "");
                    }
                }
                pos = element.indexOf("ǝ", pos + 1);
            }
            element = element;
        }
        // tests for a doubling dagesh
        if (/\u{05BC}/u.test(element)) {
            var elArray_1 = element.split("");
            elArray_1.forEach(function (e, i) {
                if (e === "\u05BC" && /a|ā|e|ē|i|î|u|û|o|ō|ô/.test(elArray_1[i - 2]) && Boolean(elArray_1[i - 2])) {
                    elArray_1[i] = elArray_1[i - 1];
                }
            });
            element = elArray_1.join("");
        }
        //  tests for yhwh
        if (element === "yǝhwâ") {
            element = "yhwh";
        }
        else if (element.includes("yǝhwâ")) {
            element = changeElementSplit(element, /yǝhwâ/, "yhwh");
        }
        else if (element.includes("yhwâ")) {
            element = changeElementSplit(element, /yhwâ/, "yhwh");
        }
        // removes any remaining dageshes
        if (/\u{05BC}/u.test(element)) {
            element = changeElementSplit(element, /\u{05BC}/u, "");
        }
        return element;
    }); // map
};
var simpleRules = function (array) {
    return array.map(function (element) {
        if (element === " " || !element) {
            return element;
        }
        // remove aleph half-ring
        if (/ʾ/.test(element)) {
            element = changeElementSplit(element, /ʾ/, "");
        }
        // remove ayin half-ring
        if (/ʿ/.test(element)) {
            element = changeElementSplit(element, /ʿ/, "");
        }
        // simplify he-mater
        if (/āh$/m.test(element)) {
            element = changeElementSplit(element, /āh$/m, "ah");
        }
        else if (/ēh$/.test(element)) {
            element = changeElementSplit(element, /ēh$/m, "eh");
        }
        // simplify hiriq-yod
        if (/î/.test(element)) {
            element = changeElementSplit(element, /î/, "i");
        }
        // simplify tsere-yod / seghol-yod
        if (/ê/.test(element)) {
            element = changeElementSplit(element, /ê/, "e");
        }
        // simplify holem-waw
        if (/ô/.test(element)) {
            element = changeElementSplit(element, /ô/, "o");
        }
        // simplify shureq
        if (/û/.test(element)) {
            element = changeElementSplit(element, /û/, "u");
        }
        // remove doubling of shin
        if (/šš/.test(element)) {
            element = changeElementSplit(element, /šš/, "š");
        }
        // remove doubling of tsade
        if (/ṣṣ/.test(element)) {
            element = changeElementSplit(element, /ṣṣ/, "ṣ");
        }
        // simplify long-a
        if (/ā/.test(element)) {
            element = changeElementSplit(element, /ā/, "a");
        }
        // simplify short-a
        if (/ă/.test(element)) {
            element = changeElementSplit(element, /ă/, "a");
        }
        // simplify long-e
        if (/ē/.test(element)) {
            element = changeElementSplit(element, /ē/, "e");
        }
        // simplify short-e
        if (/ĕ/.test(element)) {
            element = changeElementSplit(element, /ĕ/, "e");
        }
        // simplify long-i
        if (/ī/.test(element)) {
            element = changeElementSplit(element, /ī/, "i");
        }
        // simplify long-o
        if (/ō/.test(element)) {
            element = changeElementSplit(element, /ō/, "o");
        }
        // simplify short-o
        if (/ŏ/.test(element)) {
            element = changeElementSplit(element, /ŏ/, "o");
        }
        // simplify long-u
        if (/ū/.test(element)) {
            element = changeElementSplit(element, /ū/, "u");
        }
        // simplify shewa
        if (/ǝ/.test(element)) {
            element = changeElementSplit(element, /ǝ/, "e");
        }
        // spirantized cons
        /* Since the negative lookbehind regex is not well supported,
        the string is reversed and then the regex searches the pattern of
        the consonant that is followed by a vowel (which preceded it in the original direction)
        */
        var rev = __spread(element).reverse().reduce(function (a, c) { return a + c; }, "");
        // change b > v
        if (/b/.test(element) && !/bb/.test(element)) {
            if (/b(?=[aeiou])/.test(rev)) {
                rev = changeElementSplit(rev, /b(?=[aeiou])/, "v");
            }
        }
        // change p > f
        if (/p/.test(element) && !/pp/.test(element)) {
            if (/p(?=[aeiou])/.test(rev)) {
                rev = changeElementSplit(rev, /p(?=[aeiou])/, "f");
            }
        }
        // change k > kh
        if (/k/.test(element) && !/kk/.test(element)) {
            if (/k(?=[aeiou])/.test(rev)) {
                //   when the string is reversed back 'hk' > 'kh'
                rev = changeElementSplit(rev, /k(?=[aeiou])/, "hk");
            }
        }
        element = __spread(rev).reverse().reduce(function (a, c) { return a + c; }, "");
        // simplify ṭet
        if (/ṭ/.test(element)) {
            element = changeElementSplit(element, /ṭ/, "t");
        }
        // simplify tsade
        if (/ṣ/.test(element)) {
            element = changeElementSplit(element, /ṣ/, "ts");
        }
        // simplify shin
        if (/š/.test(element)) {
            element = changeElementSplit(element, /š/, "sh");
        }
        // simplify sin
        if (/ś/.test(element)) {
            element = changeElementSplit(element, /ś/, "s");
        }
        // simplify ḥet
        if (/ḥ/.test(element)) {
            element = changeElementSplit(element, /ḥ/, "kh");
        }
        // simplify waw
        if (/w/.test(element)) {
            element = changeElementSplit(element, /w/, "v");
        }
        return element;
    }); // map
};
exports.testEach = function (array, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.qametsQatan, qametsQatan = _c === void 0 ? false : _c, _d = _b.isSimple, isSimple = _d === void 0 ? false : _d;
    var academic = academicRules(array, { qametsQatan: qametsQatan, isSimple: isSimple });
    return !isSimple ? academic : simpleRules(academic);
};

},{}],"node_modules/hebrew-transliteration/dist/transliterate.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequence_1 = require("./sequence");
var remove_1 = require("./remove");
var qametsQatan_1 = require("./qametsQatan");
var titForTat_1 = require("./titForTat");
var testEach_1 = require("./testEach");
exports.Transliterate = function (text, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.isSequenced, isSequenced = _c === void 0 ? true : _c, _d = _b.qametsQatan, qametsQatan = _d === void 0 ? false : _d, _e = _b.isSimple, isSimple = _e === void 0 ? false : _e;
    var newSeq = isSequenced ? sequence_1.Sequence(text) : text;
    var rmvCantillation = remove_1.Remove(newSeq);
    var titTat = titForTat_1.titForTat(rmvCantillation);
    var array = titTat.split(/(\s|\S*\-)/);
    var sanitized = qametsQatan ? qametsQatan_1.qametsQ(array) : array;
    var modArray = testEach_1.testEach(sanitized, { isSimple: isSimple });
    var transliteration = modArray.reduce(function (a, c) { return a + c; }, "");
    return transliteration;
};

},{"./sequence":"node_modules/hebrew-transliteration/dist/sequence.js","./remove":"node_modules/hebrew-transliteration/dist/remove.js","./qametsQatan":"node_modules/hebrew-transliteration/dist/qametsQatan.js","./titForTat":"node_modules/hebrew-transliteration/dist/titForTat.js","./testEach":"node_modules/hebrew-transliteration/dist/testEach.js"}],"node_modules/hebrew-transliteration/dist/index.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var transliterate_1 = require("./transliterate");
var sequence_1 = require("./sequence");
var remove_1 = require("./remove");
exports.transliterate = function (text, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.isSequenced, isSequenced = _c === void 0 ? true : _c, _d = _b.qametsQatan, qametsQatan = _d === void 0 ? false : _d, _e = _b.isSimple, isSimple = _e === void 0 ? false : _e;
    var normalized = text.normalize("NFKD");
    return transliterate_1.Transliterate(normalized, { isSequenced: isSequenced, qametsQatan: qametsQatan, isSimple: isSimple });
};
exports.remove = function (text, _a) {
    var _b = (_a === void 0 ? {} : _a).removeVowels, removeVowels = _b === void 0 ? false : _b;
    var normalized = text.normalize("NFKD");
    return remove_1.Remove(normalized, { removeVowels: removeVowels });
};
exports.sequence = function (text) {
    var normalized = text.normalize("NFKD");
    return sequence_1.Sequence(normalized);
};

},{"./transliterate":"node_modules/hebrew-transliteration/dist/transliterate.js","./sequence":"node_modules/hebrew-transliteration/dist/sequence.js","./remove":"node_modules/hebrew-transliteration/dist/remove.js"}],"main.js":[function(require,module,exports) {
var ht = require("hebrew-transliteration");

var transliterate = ht.transliterate;
var $input = document.querySelector("#input");
var $output = document.querySelector("#output");
$input.addEventListener("keyup", function (e) {
  $output.textContent = transliterate(e.target.value);

  if (!$output.textContent) {
    $output.innerHTML = "<i>Transliteration</i>";
  }
});
},{"hebrew-transliteration":"node_modules/hebrew-transliteration/dist/index.js"}],"../../.nvm/versions/node/v14.2.0/lib/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "39987" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../.nvm/versions/node/v14.2.0/lib/node_modules/parcel/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map