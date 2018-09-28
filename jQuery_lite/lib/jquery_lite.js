/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/dom_node_collection.js":
/*!************************************!*\
  !*** ./lib/dom_node_collection.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class DOMNodeCollection {\n  constructor(array){\n    this.htmlElements = array;\n  }\n\n  html(str){\n    // str = str || this.htmlElements[0];\n    if(!str) return this.htmlElements[0];\n    this.htmlElements.forEach( (el) => {\n      el.innerHTML = str;\n    });\n  }\n\n  empty() {\n    this.htmlElements.forEach( (el) => {\n      el.innerHTML = \"\";\n    });\n  }\n\n  append(object) {\n    if (object instanceof DOMNodeCollection){\n        object.htmlElements.forEach((outer_el) => {\n          this.htmlElements.forEach( (inner_el) => {\n            inner_el.innerHTML += outer_el.outerHTML;\n          });\n        });\n    } else if (object instanceof HTMLElement) {\n        this.htmlElements.forEach( (el) => {\n          el.innerHTML += object.outerHTML;\n        });\n    } else {\n      this.htmlElements.forEach( (el) => {\n        el.innerHTML += `${object}`;\n      });\n    }\n  }\n\n  attr(attribute, value){\n    let attrs = [];\n    this.htmlElements.forEach( (el) => {\n      if (!value) {\n        attrs.push(el.getAttribute(attribute));\n        // attrs.push(attrs[attribute]); gets all attributes. not what we want\n      } else {\n        el.setAttribute(attribute, value);\n        attrs.push(el.getAttribute(attribute));\n        // attrs[attribute] = value;\n      }\n    });\n    return attrs;\n  }\n\n  addClass(cl){\n    this.htmlElements.forEach( (el) => {\n      el.classList.add(cl);\n    });\n  }\n\n  removeClass(cl){\n    this.htmlElements.forEach( (el) => {\n      el.classList.remove(cl);\n    });\n  }\n\n  children(){\n    return this.htmlElements.map(el => {\n      return new DOMNodeCollection(Array.from(el.children));\n    });\n  }\n\n  parent(){\n    return this.htmlElements.map(el => {\n      return new DOMNodeCollection(el.parentNode);\n    });\n  }\n\n  find(selector){\n    let res = [];\n    this.htmlElements.forEach((el) => {\n      res.push(el.querySelectorAll(selector));\n    });\n    return new DOMNodeCollection(res);\n  }\n\n  remove(){\n    this.empty();\n    this.htmlElements = [];\n  }\n\n}\n\n\n\nmodule.exports = DOMNodeCollection;\n\n\n//# sourceURL=webpack:///./lib/dom_node_collection.js?");

/***/ }),

/***/ "./lib/main.js":
/*!*********************!*\
  !*** ./lib/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const DOMNodeCollection = __webpack_require__(/*! ./dom_node_collection.js */ \"./lib/dom_node_collection.js\");\n\nconsole.log(\"OH MAI GAWD IT'S WEBPACK!!!11\");\n\nfunction $l(selector){\n  let cssSelector = document.querySelectorAll(selector);\n  let selectArray = Array.from(cssSelector);\n  return new DOMNodeCollection(selectArray);\n}\n\nwindow.$l = $l;\n\n\n//# sourceURL=webpack:///./lib/main.js?");

/***/ })

/******/ });