"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var socket = io(); // Sections

var header = document.querySelector('header');
var main = document.querySelector('main');
var home = document.getElementById('home');
var call = document.getElementById('call'); // Global variables

var myStream;
var muted = true;
var cameraOff = true;
var nickname;
var roomName;
var myPeerConnection;
var myDataChannel; // If you work on the home screen, call 'initScreen'.
// Or for initiating, call 'initScreen'.

initScreen(); // If you work on the call screen, call 'switchScreen'.
// switchScreen();

function initScreen() {
  call.style.display = 'none';
}

function switchScreen() {
  call.style.display = 'flex';
  home.style.display = 'none';
  header.style.display = 'none';
} // Select mike & camera


var camerasSelect = document.getElementById('cameras');
var mikesSelect = document.getElementById('mikes');
var myFace = document.getElementById('myFace');
var peerFace = document.getElementById('peerFace');

function getDevices() {
  return _getDevices.apply(this, arguments);
}

function _getDevices() {
  _getDevices = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return getCameras();

          case 2:
            _context5.next = 4;
            return getMikes();

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _getDevices.apply(this, arguments);
}

function getCameras() {
  return _getCameras.apply(this, arguments);
}

function _getCameras() {
  _getCameras = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
    var devices, cameras, currentCamera;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return navigator.mediaDevices.enumerateDevices();

          case 3:
            devices = _context6.sent;
            cameras = devices.filter(function (device) {
              return device.kind === 'videoinput';
            });
            currentCamera = myStream.getVideoTracks()[0];
            cameras.forEach(function (camera) {
              var option = document.createElement('option');
              option.value = camera.deviceId;
              option.innerText = camera.label;

              if (currentCamera.label === camera.label) {
                option.selected = true;
              }

              camerasSelect.appendChild(option);
            });
            _context6.next = 12;
            break;

          case 9:
            _context6.prev = 9;
            _context6.t0 = _context6["catch"](0);
            console.log(_context6.t0);

          case 12:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 9]]);
  }));
  return _getCameras.apply(this, arguments);
}

function getMikes() {
  return _getMikes.apply(this, arguments);
}

function _getMikes() {
  _getMikes = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
    var devices, mikes, currentMike;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return navigator.mediaDevices.enumerateDevices();

          case 3:
            devices = _context7.sent;
            mikes = devices.filter(function (device) {
              return device.kind === 'audioinput';
            });
            currentMike = myStream.getAudioTracks()[0];
            mikes.forEach(function (mike) {
              var option = document.createElement('option');
              option.value = mike.deviceId;
              option.innerText = mike.label;

              if (currentMike.label === mike.label) {
                option.selected = true;
              }

              mikesSelect.appendChild(option);
            });
            _context7.next = 12;
            break;

          case 9:
            _context7.prev = 9;
            _context7.t0 = _context7["catch"](0);
            console.log(_context7.t0);

          case 12:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 9]]);
  }));
  return _getMikes.apply(this, arguments);
}

function getMedia(_x) {
  return _getMedia.apply(this, arguments);
} // Change mike & camera


function _getMedia() {
  _getMedia = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(deviceId) {
    var devices, cameras, mikes, initialConstrains, userConstrains;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return navigator.mediaDevices.enumerateDevices();

          case 2:
            devices = _context8.sent;
            cameras = devices.filter(function (device) {
              return device.kind === 'videoinput';
            }).map(function (device) {
              return device.deviceId;
            });
            mikes = devices.filter(function (device) {
              return device.kind === 'audioinput';
            }).map(function (device) {
              return device.deviceId;
            });
            initialConstrains = {
              audio: true,
              video: {
                facingMode: 'user'
              }
            };
            userConstrains = {
              audio: mikes.includes(deviceId) ? {
                deviceId: {
                  exact: deviceId
                }
              } : true,
              video: cameras.includes(deviceId) ? {
                deviceId: {
                  exact: deviceId
                }
              } : {
                facingMode: 'user'
              }
            };
            _context8.prev = 7;
            _context8.next = 10;
            return navigator.mediaDevices.getUserMedia(deviceId ? userConstrains : initialConstrains);

          case 10:
            myStream = _context8.sent;
            myFace.srcObject = myStream;
            myStream.getAudioTracks()[0].enabled = !muted;
            myStream.getVideoTracks()[0].enabled = !cameraOff;
            _context8.next = 16;
            return myPeerConnection.addStream(myStream);

          case 16:
            if (deviceId) {
              _context8.next = 19;
              break;
            }

            _context8.next = 19;
            return getDevices();

          case 19:
            _context8.next = 24;
            break;

          case 21:
            _context8.prev = 21;
            _context8.t0 = _context8["catch"](7);
            console.log(_context8.t0);

          case 24:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[7, 21]]);
  }));
  return _getMedia.apply(this, arguments);
}

function handleCameraChange() {
  return _handleCameraChange.apply(this, arguments);
}

function _handleCameraChange() {
  _handleCameraChange = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
    var videoTrack, videoSender;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return getMedia(camerasSelect.value);

          case 2:
            if (myPeerConnection) {
              videoTrack = myStream.getVideoTracks()[0];
              videoSender = myPeerConnection.getSenders().find(function (sender) {
                return sender.track.kind === 'video';
              });
              videoSender.replaceTrack(videoTrack);
            }

          case 3:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));
  return _handleCameraChange.apply(this, arguments);
}

function handleMikeChange() {
  return _handleMikeChange.apply(this, arguments);
} // mike & camera on/off


function _handleMikeChange() {
  _handleMikeChange = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
    var audioTrack, audioSender;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return getMedia(mikesSelect.value);

          case 2:
            if (myPeerConnection) {
              audioTrack = myStream.getAudioTracks()[0];
              audioSender = myPeerConnection.getSenders().find(function (sender) {
                return sender.track.kind === 'audio';
              });
              audioSender.replaceTrack(audioTrack);
            }

          case 3:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));
  return _handleMikeChange.apply(this, arguments);
}

var muteBtn = document.getElementById('muteBtn');
var cameraBtn = document.getElementById('cameraBtn');

function handleMuteClick() {
  var curState = myStream.getAudioTracks()[0].enabled;
  myStream.getAudioTracks()[0].enabled = !curState;
  muteBtn.innerText = muted ? 'Mute' : 'Unmute';
  muted = !muted;
}

function handleCameraClick() {
  var curState = myStream.getVideoTracks()[0].enabled;
  myStream.getVideoTracks()[0].enabled = !curState;
  cameraBtn.innerText = cameraOff ? 'Cam Off' : 'Cam On';
  cameraOff = !cameraOff;
}

function initButton() {
  muteBtn.innerText = muted ? 'Unmute' : 'Mute';
  cameraBtn.innerText = cameraOff ? 'Cam On' : 'Cam Off';
}

muteBtn.addEventListener('click', handleMuteClick);
cameraBtn.addEventListener('click', handleCameraClick);
camerasSelect.addEventListener('input', handleCameraChange);
mikesSelect.addEventListener('input', handleMikeChange); // Save nickname & mike and camera on/off

var saveNickname = document.getElementById('saveNickname');
var saveNicknameForm = saveNickname.querySelector('form');
var enterRoom = document.getElementById('enterRoom');

function handleSaveSubmit(event) {
  event.preventDefault();
  var nicknameInput = document.getElementById('nickname');
  nickname = nicknameInput.value;
  var enterRoomBtn = enterRoom.querySelector('button');
  setNickname(nickname);
  enterRoomBtn.disabled = false;
  setDevices();
  initButton();
}

function setNickname(nickname) {
  var greeting = enterRoom.querySelector('span');
  greeting.innerText = "".concat(nickname, ", Welcome.");
}

function setDevices() {
  var mikeOffCheck = document.getElementById('mikeOff');
  var cameraOffCheck = document.getElementById('cameraOff');
  muted = mikeOffCheck.checked;
  cameraOff = cameraOffCheck.checked;
}

saveNicknameForm.addEventListener('submit', handleSaveSubmit); // Enter room (join a room)

var enterRoomForm = enterRoom.querySelector('form');
var callHeader = document.getElementById('callHeader');

function initCall() {
  return _initCall.apply(this, arguments);
}

function _initCall() {
  _initCall = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11() {
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            switchScreen();
            makeConnection();
            _context11.next = 4;
            return getMedia();

          case 4:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }));
  return _initCall.apply(this, arguments);
}

function setCallHeader() {
  var title = callHeader.querySelectorAll('span');
  title[0].innerText = "".concat(roomName);
  title[1].innerText = 'Waiting for a call partner...';
}

function setCallPartner(partnerNickname) {
  var title = callHeader.querySelectorAll('span');
  title[1].innerText = "Call with ".concat(partnerNickname);
}

function handleEnterRoomSubmit(event) {
  event.preventDefault();
  var roomNameInput = document.getElementById('roomName');
  roomName = roomNameInput.value;

  if (nickname) {
    socket.emit('check_room', nickname, roomName);
    roomNameInput.value = '';
  } else {
    alert('You have to save your nickname first.');
  }
}

enterRoomForm.addEventListener('submit', handleEnterRoomSubmit); // Chat

var chat = document.getElementById('chat');
var messageForm = document.getElementById('message');
var messageInput = messageForm.querySelector('textarea');
var messageSendBtn = messageForm.querySelector('button');
var ALIGN_LEFT = 'left';
var ALIGN_RIGHT = 'right';
messageSendBtn.disabled = true;

function addMessage(message, alignment, sender) {
  var ul = chat.querySelector('ul');
  var li = document.createElement('li');
  var messageSpan = document.createElement('span');
  message = message.trim();

  if (message) {
    if (sender && alignment === 'left') {
      var nicknameSpan = document.createElement('span');
      nicknameSpan.classList.add('chat__nickname');
      nicknameSpan.innerText = sender;
      li.appendChild(nicknameSpan);
    }

    messageSpan.innerText = message;
    messageSpan.classList.add('chat__message');
    li.appendChild(messageSpan);

    switch (alignment) {
      case 'left':
        li.classList.add('chat--align-left');
        break;

      case 'right':
        li.classList.add('chat--align-right');
        break;

      default:
        li.classList.add('chat--align-center');
        break;
    }

    ul.appendChild(li);
    ul.scrollTop = ul.scrollHeight;
  }
}

function handleMessageSubmit(event) {
  event.preventDefault();
  var message = messageInput.value;
  messageInput.value = '';
  addMessage(message, ALIGN_RIGHT, nickname);

  try {
    myDataChannel.send(message);
  } catch (e) {
    console.log(e);
  }

  messageSendBtn.disabled = true;
}

function handleMessageEnterKeydown(event) {
  var keyCode = event.keyCode;
  var SHIFT = event.shiftKey;
  var ENTER = 13;

  if (keyCode === ENTER && !SHIFT) {
    event.preventDefault();
    messageSendBtn.click();
  }

  if (keyCode === ENTER && SHIFT) {
    event.preventDefault();
    messageInput.value += '\n';
  }
}

messageInput.addEventListener('input', function () {
  messageSendBtn.disabled = messageInput.value.trim() === '' ? true : false;
});
messageForm.addEventListener('focusin', function () {
  return messageInput.placeholder = '';
});
messageForm.addEventListener('focusout', function () {
  return messageInput.placeholder = 'message';
});
messageForm.addEventListener('submit', handleMessageSubmit);
messageForm.addEventListener('keydown', handleMessageEnterKeydown); // Toggle header

var toggleHeaderBtn = document.querySelector('.toggle-header');
toggleHeaderBtn.addEventListener('click', function () {
  var callHeader = document.querySelector('.call__header');
  callHeader.classList.toggle('visible');
}); // Toggle device

var deviceAndChatContainer = document.querySelector('.device-chat');
var deviceSelector = document.getElementById('device');
var toggleDeviceBtn = document.querySelector('.toggle-device');
var toggleChatBtn = document.querySelector('.toggle-chat');

function toggleAnimation(element) {
  element.classList.add('anim');
  setTimeout(function () {
    element.classList.remove('anim');
  }, 300);
}

toggleDeviceBtn.addEventListener('click', function () {
  toggleAnimation(deviceAndChatContainer);

  if (chat.classList.contains('visible')) {
    toggleChatBtn.click();
  }

  deviceAndChatContainer.classList.toggle('visible');
  chat.style.display = 'none';
  deviceSelector.style.display = 'flex';
  deviceSelector.classList.toggle('visible');
}); // Toggle chat

toggleChatBtn.addEventListener('click', function () {
  toggleAnimation(deviceAndChatContainer);

  if (deviceSelector.classList.contains('visible')) {
    toggleDeviceBtn.click();
  }

  deviceAndChatContainer.classList.toggle('visible');
  deviceSelector.style.display = 'none';
  chat.style.display = 'flex';
  chat.classList.toggle('visible');
}); // Resize screen and remove visible class

window.addEventListener('resize', function () {
  var width = window.innerWidth;

  if (width >= 768) {
    deviceAndChatContainer.classList.remove('visible');
    deviceSelector.classList.remove('visible');
    chat.classList.remove('visible');
    deviceSelector.style.display = 'flex';
    chat.style.display = 'flex';
  }
}); // Web Sockets

socket.on('update_rooms', function (rooms) {
  var roomList = document.getElementById('roomList');
  roomList.innerText = '';

  if (!Object.keys(rooms).length) {
    var li = document.createElement('li');
    li.innerText = 'There is no room.';
    roomList.append(li);
  } else {
    var _loop = function _loop(room) {
      var button = document.createElement('button');
      button.innerText = "".concat(room, "\n(").concat(rooms[room], " / 2)");

      if (rooms[room] > 1) {
        button.setAttribute('disabled', 'true');
      }

      roomList.append(button);
      button.addEventListener('click', function () {
        if (nickname) {
          roomName = room;
          socket.emit('check_room', nickname, roomName);
        } else {
          alert('You have to save your nickname first.');
        }
      });
    };

    for (var room in rooms) {
      _loop(room);
    }
  }
});
socket.on('already_in_room', function () {
  return alert("You are already in the other room.\nYou can enter only one room.");
});
socket.on('is_full', function (nickname, roomName) {
  return alert("".concat(roomName, " is full."));
});
socket.on('is_available', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(nickname, roomName) {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return initCall();

          case 2:
            setCallHeader();
            socket.emit('join_room', nickname, roomName);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
socket.on('set_header', function (partnerNickname) {
  setCallPartner(partnerNickname);
  socket.emit('header', nickname, partnerNickname, roomName);
});
socket.on('header', function (myNickname) {
  setCallPartner(myNickname);
  socket.emit('partner_nickname', myNickname);
});
socket.on('start_chat', function (partnerNickname) {
  myDataChannel = myPeerConnection.createDataChannel('chat');
  addMessage("".concat(partnerNickname, " arrived!"));
  myDataChannel.addEventListener('message', function (event) {
    addMessage(event.data, ALIGN_LEFT, partnerNickname);
  });
  socket.emit('join_chat', nickname, roomName);
});
socket.on('join_chat', function (partnerNickname) {
  myPeerConnection.addEventListener('datachannel', function (event) {
    myDataChannel = event.channel;
    addMessage("".concat(partnerNickname, " arrived!"));
    myDataChannel.addEventListener('message', function (event) {
      addMessage(event.data, ALIGN_LEFT, partnerNickname);
    });
  });
});
socket.on('send_offer', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
  var offer;
  return _regeneratorRuntime().wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return myPeerConnection.createOffer({
            offerToReceiveAudio: true,
            offerToReceiveVideo: true
          });

        case 2:
          offer = _context2.sent;
          myPeerConnection.setLocalDescription(offer);
          socket.emit('offer', offer, roomName);

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2);
})));
socket.on('offer', /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(offer) {
    var answer;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            myPeerConnection.setRemoteDescription(offer);
            _context3.next = 3;
            return myPeerConnection.createAnswer();

          case 3:
            answer = _context3.sent;
            myPeerConnection.setLocalDescription(answer);
            socket.emit('answer', answer, roomName);

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x4) {
    return _ref3.apply(this, arguments);
  };
}());
socket.on('answer', function (answer) {
  return myPeerConnection.setRemoteDescription(answer);
});
socket.on('ice', function (ice) {
  return myPeerConnection.addIceCandidate(ice);
});
socket.on('leave_chat', function (partnerNickname) {
  return addMessage("".concat(partnerNickname, " left"));
});
socket.on('leave_call', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
  return _regeneratorRuntime().wrap(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          try {
            peerFace.srcObject.getVideoTracks().forEach(function (track) {
              track.stop();
              peerFace.srcObject.removeTrack(track);
            });
          } catch (e) {
            console.log(e);
          }

          _context4.next = 3;
          return restartCall();

        case 3:
        case "end":
          return _context4.stop();
      }
    }
  }, _callee4);
})));

function restartCall() {
  return _restartCall.apply(this, arguments);
} // WebRTC


function _restartCall() {
  _restartCall = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12() {
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            setCallHeader();
            makeConnection();
            _context12.next = 4;
            return getMedia();

          case 4:
            socket.emit('join_room', nickname, roomName);

          case 5:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  }));
  return _restartCall.apply(this, arguments);
}

function makeConnection() {
  myPeerConnection = new RTCPeerConnection({
    iceServers: [{
      urls: ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302', 'stun:stun3.l.google.com:19302', 'stun:stun4.l.google.com:19302']
    }, {
      username: "myuser",
      credential: "mypassword",
      urls: ["turn:54.227.182.145:3478?transport=udp", "turn:54.227.182.145:3478?transport=tcp"]
    }]
  });
  myPeerConnection.addEventListener('icecandidate', function (data) {
    return socket.emit('ice', data.candidate, roomName);
  });
  myPeerConnection.addEventListener('addstream', function (data) {
    return peerFace.srcObject = data.stream;
  });
}