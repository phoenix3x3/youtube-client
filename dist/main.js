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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _search__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./search */ "./src/search.js");


window.onload = function drawPage() {
  // add input bar + search button
  document.body.insertAdjacentHTML('afterbegin', '<section id="search" class="search">\n' + '<div class="search">\n' + '<input type="text" class="search_bar" id="search_bar" placeholder="Search...">\n' + '<button type="submit" id="subm_btn" onclick="Search()">Search</button>\n' + '</div>\n' + '</section>\n' + '<section id="videoSlider" class="videoSlider">\n' + '</section>\n');
};

/***/ }),

/***/ "./src/sass/style.sass":
/*!*****************************!*\
  !*** ./src/sass/style.sass ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./src/search.js":
/*!***********************!*\
  !*** ./src/search.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var uploadedVideo = 0;
var uploadVideoList = [];
var previosVal;
var currentSlidPos = 0;
var eventSlideBtn = false;
var videoPageCount;

if (window.innerWidth > 1300) {
  videoPageCount = 4;
} else if (window.innerWidth > 500) {
  videoPageCount = 2;
} else videoPageCount = 1;

var KEY = 'AIzaSyBOMEO9XF99hOFZSX2VwrCHa8gj0SdRBdo';

function keywordCheck() {
  var KEYWORD = document.querySelector('#search_bar').value;
  if (KEYWORD === previosVal) return false;

  if (typeof previosVal !== 'undefined') {
    document.querySelector('#videoSlider').innerHTML = '';
  }

  previosVal = KEYWORD;
  uploadVideoList = [];
  uploadedVideo = 0;
  currentSlidPos = 0;
  document.querySelector('.videoSlider').style = '';

  if (window.innerWidth > 1300) {
    videoPageCount = 4;
  } else if (window.innerWidth > 500) {
    videoPageCount = 2;
  } else videoPageCount = 1;

  document.querySelector('.videoSlider').style.setProperty('--n', videoPageCount);
  document.querySelector('.videoSlider').style.setProperty('--i', 0);
  return true;
}

function createURL(Params) {
  var KEYWORD = document.querySelector('#search_bar').value;
  var URL;

  switch (Params) {
    case 'std':
      {
        if (uploadedVideo + 15 === 45) uploadedVideo -= 1;
        URL = "https://www.googleapis.com/youtube/v3/search?key=".concat(KEY, "&type=video&part=snippet&maxResults=").concat(uploadedVideo + 15, "&q=").concat(KEYWORD);
        break;
      }

    case 'stat':
      {
        var videoId = [];

        for (var index = uploadedVideo; index < uploadedVideo + 15; index += 1) {
          videoId[index] = uploadVideoList[index].id;
        }

        var videoIdString = videoId.join();
        URL = "https://www.googleapis.com/youtube/v3/videos?id=".concat(videoIdString, "&key=").concat(KEY, "&fields=items(id,snippet(channelId,title,categoryId),statistics)&part=snippet,statistics");
        break;
      }

    default:
      {
        Error("URL parameter is set incorrectly: ".concat(Params, "."));
        break;
      }
  }

  return URL;
}

function ReqLoad(URLParam) {
  var URL = createURL(URLParam);
  return new Promise(function (resolve, reject) {
    // start XHR request
    var request = new XMLHttpRequest();
    request.open('GET', URL);
    request.responseType = 'json'; // successful

    request.onload = function () {
      if (request.status === 200) {
        resolve(request.response);
      } else {
        reject(Error("Your request is failed, pleasre try to correct your search personal request, error code: ".concat(request.statusText)));
      }
    };

    request.onerror = function () {
      reject(Error('There was network error, please check your enternet connection'));
    }; // send the request


    request.send();
  });
}

function transcriptReaquest() {
  keywordCheck();
  ReqLoad('std').then(function (response) {
    var REQUEST_RES = response.items;

    for (var index = uploadedVideo; index < uploadedVideo + 15; index += 1) {
      var video = {};
      video.title = REQUEST_RES[index].snippet.title;
      video.clip_preview = REQUEST_RES[index].snippet.thumbnails.medium.url;
      video.description = REQUEST_RES[index].snippet.description;
      video.auther = REQUEST_RES[index].snippet.channelTitle;
      video.publicateDate = REQUEST_RES[index].snippet.publishedAt;
      video.id = REQUEST_RES[index].id.videoId;
      video.rate = '';
      uploadVideoList[index] = video;
    }

    return uploadVideoList;
  }).then(function () {
    ReqLoad('stat').then(function (responseText) {
      var STAT_REQ = responseText.items;

      for (var index = uploadedVideo; index < uploadedVideo + 15; index += 1) {
        uploadVideoList[index].rate = STAT_REQ[index - uploadedVideo].statistics.viewCount;
      }

      uploadedVideo += 15;
      renderContent();
    });
  });
}

function addSwithers() {
  var LIST = document.querySelector('#videoSlider');
  var inputNum = document.querySelector('.videoSlider').children.length;

  if (document.querySelector('#switcher')) {
    document.querySelector('#switcher').remove();
  }

  var navPanel = '<section class="navBtns" id="switcher">';

  for (var i = 0; i < inputNum; i += 1) {
    navPanel += "<input type=\"radio\" id=\"card-".concat(i + 1, "\">");
  }

  navPanel += '<div class="menu">';

  for (var _i = 0; _i < inputNum; _i += 1) {
    navPanel += "<label for=\"card-".concat(_i + 1, "\" id=\"label_").concat(_i + 1, "\" onclick=\"moveToSlide(").concat(_i, ")\">").concat(_i + 1, "</label>");
  }

  navPanel += '</div>';
  navPanel += '</section>';
  LIST.insertAdjacentHTML('afterend', navPanel);
}

function moveToSlide() {
  var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  document.querySelector('.videoSlider').style.setProperty('--i', position);
  currentSlidPos = position;
  eventSlideBtn = true;
}

window.moveToSlide = moveToSlide;

function sliderSet() {
  var slider = document.querySelector('.videoSlider');
  var N = slider.children.length;
  var i = currentSlidPos;
  var x0 = null;

  function unify(e) {
    return e.changedTouches ? e.changedTouches[0] : e;
  }

  function lock(e) {
    x0 = unify(e).clientX;
  }

  function move(e) {
    var n = slider.children.length;

    if (x0 || x0 === 0) {
      var dx = unify(e).clientX - x0;
      var s = Math.sign(dx);

      if (eventSlideBtn) {
        s -= currentSlidPos;
        eventSlideBtn = false;
      }

      if ((i > 0 || s < 0) && (i < N - 1 || s > 0)) {
        slider.style.setProperty('--i', i -= s);

        if (i === n - 2 && uploadedVideo + 15 < 50) {
          currentSlidPos = i;
          transcriptReaquest();
        }

        currentSlidPos = i;
      }

      x0 = null;
    }
  }

  slider.style.setProperty('--n', N);
  slider.addEventListener('mousedown', lock, false);
  slider.addEventListener('touchstart', lock, false);
  slider.addEventListener('touchmove', function (e) {
    e.preventDefault();
  }, false);
  slider.addEventListener('mouseup', move, false);
  slider.addEventListener('touchend', move, false);
}

function renderContent() {
  var LIST = document.querySelector('#videoSlider');
  var card = '';
  uploadVideoList.forEach(function (element, index) {
    if (index % videoPageCount === 0) {
      card += '<div class="cardPage">';
    }

    card += "\n    <div class=\"videoCard\">\n      <div class=\"preview\">\n        <img src=\"".concat(element.clip_preview, "\" alt=\"preview\" width=\"290\">\n      </div>\n      <div class=\"title\">").concat(element.title, "</div>\n      <div class=\"auther\">").concat(element.auther, "</div>\n      <div class=\"release\">").concat(element.publicateDate, "</div>\n      <div class=\"rate\">").concat(element.rate, "</div>\n      <div class=\"description\">").concat(element.description, "</div>\n    </div>");

    if ((index + 1) % videoPageCount === 0) {
      card += '</div>';
    }
  });
  LIST.innerHTML = card;
  sliderSet();
  addSwithers();
}

function Search() {
  transcriptReaquest();
}

window.Search = Search;
/* harmony default export */ __webpack_exports__["default"] = (Search);

/***/ }),

/***/ 0:
/*!**************************************************!*\
  !*** multi ./src/index.js ./src/sass/style.sass ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./src/index.js */"./src/index.js");
module.exports = __webpack_require__(/*! ./src/sass/style.sass */"./src/sass/style.sass");


/***/ })

/******/ });
//# sourceMappingURL=main.js.map