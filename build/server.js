"use strict";

var _http = _interopRequireDefault(require("http"));

var _socket = require("socket.io");

var _adminUi = require("@socket.io/admin-ui");

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var cons = require('consolidate'); // App router


var app = (0, _express["default"])(); //app.set('view engine', 'pug');

app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', process.cwd() + '/src/views');
app.use('/public', _express["default"]["static"](process.cwd() + '/src/public'));
app.get('/', function (req, res) {
  return res.render('index');
});
app.get('/*', function (req, res) {
  return res.redirect('/');
}); // Port

var LOCAL_PORT = 61122;
var PORT = process.env.PORT || LOCAL_PORT; // WebSockets server

var httpServer = _http["default"].createServer(app);

var wsServer = new _socket.Server(httpServer, {
  cors: {
    origin: ['https://admin.socket.io'],
    credentials: true
  }
});
(0, _adminUi.instrument)(wsServer, {
  auth: false
});
httpServer.listen(PORT, function () {
  if (PORT === LOCAL_PORT) {
    console.log("Listening on http://localhost:".concat(PORT));
  }
}); // WebSockets

wsServer.on('connection', function (socket) {
  socket['partnerNickname'] = 'Anonymous';
  socket['nickname'] = 'Anonymous';
  wsServer.sockets.emit('update_rooms', getPublicRooms());
  socket.on('check_room', function (nickname, roomName) {
    if (isUserInRoom(socket.id)) {
      socket.emit('already_in_room');
    } else {
      var cnt = countUserInRoom(roomName) ? countUserInRoom(roomName) + 1 : 1;

      if (cnt > 2) {
        socket.emit('is_full', nickname, roomName);
      } else {
        socket.emit('is_available', nickname, roomName);
      }
    }
  });
  socket.on('join_room', function (nickname, roomName) {
    socket.nickname = nickname;
    socket.join(roomName);
    socket.to(roomName).emit('set_header', nickname);
    socket.to(roomName).emit('start_chat', nickname);
    socket.to(roomName).emit('send_offer');
    wsServer.sockets.emit('update_rooms', getPublicRooms());
  });
  socket.on('header', function (nickname, partnerNickname, roomName) {
    socket.partnerNickname = partnerNickname;
    socket.to(roomName).emit('header', nickname);
  });
  socket.on('partner_nickname', function (partnerNickname) {
    socket.partnerNickname = partnerNickname;
  });
  socket.on('join_chat', function (nickname, roomName) {
    socket.to(roomName).emit('join_chat', nickname);
  });
  socket.on('offer', function (offer, roomName) {
    socket.to(roomName).emit('offer', offer);
  });
  socket.on('answer', function (answer, roomName) {
    socket.to(roomName).emit('answer', answer);
  });
  socket.on('ice', function (ice, roomName) {
    socket.to(roomName).emit('ice', ice);
  });
  socket.on('disconnecting', function () {
    socket.rooms.forEach(function (room) {
      socket.to(room).emit('leave_chat', socket.nickname);
      socket.to(room).emit('leave_call');
    });
  });
  socket.on('disconnect', function () {
    wsServer.sockets.emit('update_rooms', getPublicRooms());
  });
}); // function

function getPublicRooms() {
  var _wsServer$sockets$ada = wsServer.sockets.adapter,
      sids = _wsServer$sockets$ada.sids,
      rooms = _wsServer$sockets$ada.rooms;
  var publicRooms = {};
  rooms.forEach(function (_, key) {
    if (sids.get(key) === undefined) {
      publicRooms[key] = countUserInRoom(key);
    }
  });
  return publicRooms;
}

function countUserInRoom(roomName) {
  var _wsServer$sockets$ada2;

  return (_wsServer$sockets$ada2 = wsServer.sockets.adapter.rooms.get(roomName)) === null || _wsServer$sockets$ada2 === void 0 ? void 0 : _wsServer$sockets$ada2.size;
} // Return If the user is "already" in the room.


function isUserInRoom(userId) {
  var rooms = wsServer.sockets.adapter.rooms;
  var publicRooms = Object.keys(getPublicRooms());
  var exist = false;
  publicRooms.forEach(function (roomName) {
    var users = rooms.get(roomName);

    if (users.has(userId)) {
      exist = true;
      return;
    }
  });
  return exist;
}