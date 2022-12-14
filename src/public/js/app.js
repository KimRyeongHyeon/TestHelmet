const socket = io();

// Sections
const header = document.querySelector('header');
const main = document.querySelector('main');
const home = document.getElementById('home');
const call = document.getElementById('call');

// Global variables
let myStream;
let muted = true;
let cameraOff = true;
let nickname;
let roomName;
let myPeerConnection;
let myDataChannel;

// If you work on the home screen, call 'initScreen'.
// Or for initiating, call 'initScreen'.
initScreen();

// If you work on the call screen, call 'switchScreen'.
// switchScreen();

function initScreen() {
  call.style.display = 'none';
}
function switchScreen() {
  call.style.display = 'flex';
  home.style.display = 'none';
  header.style.display = 'none';
}

// Select mike & camera
const camerasSelect = document.getElementById('cameras');
const mikesSelect = document.getElementById('mikes');
const myFace = document.getElementById('myFace');
const peerFace = document.getElementById('peerFace');

async function getDevices() {
  await getCameras();
  await getMikes();
}

async function getCameras() {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const cameras = devices.filter((device) => device.kind === 'videoinput');
    const currentCamera = myStream.getVideoTracks()[0];

    cameras.forEach((camera) => {
      const option = document.createElement('option');
      option.value = camera.deviceId;
      option.innerText = camera.label;
      if (currentCamera.label === camera.label) {
        option.selected = true;
      }
      camerasSelect.appendChild(option);
    });
  } catch (e) {
    console.log(e);
  }
}

async function getMikes() {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const mikes = devices.filter((device) => device.kind === 'audioinput');
    const currentMike = myStream.getAudioTracks()[0];

    mikes.forEach((mike) => {
      const option = document.createElement('option');
      option.value = mike.deviceId;
      option.innerText = mike.label;
      if (currentMike.label === mike.label) {
        option.selected = true;
      }
      mikesSelect.appendChild(option);
    });
  } catch (e) {
    console.log(e);
  }
}

async function getMedia(deviceId) {
  const devices = await navigator.mediaDevices.enumerateDevices();
  const cameras = devices
    .filter((device) => device.kind === 'videoinput')
    .map((device) => device.deviceId);
  const mikes = devices
    .filter((device) => device.kind === 'audioinput')
    .map((device) => device.deviceId);
  const initialConstrains = {
    audio: true,
    video: { facingMode: 'user' },
  };
  const userConstrains = {
    audio: mikes.includes(deviceId) ? { deviceId: { exact: deviceId } } : true,
    video: cameras.includes(deviceId)
      ? { deviceId: { exact: deviceId } }
      : { facingMode: 'user' },
  };

  try {
    myStream = await navigator.mediaDevices.getUserMedia(
      deviceId ? userConstrains : initialConstrains
    );
    myFace.srcObject = myStream;
    myStream.getAudioTracks()[0].enabled = !muted;
    myStream.getVideoTracks()[0].enabled = !cameraOff;
    await myPeerConnection.addStream(myStream);
    if (!deviceId) {
      await getDevices();
    }
  } catch (e) {
    console.log(e);
  }
}

// Change mike & camera
async function handleCameraChange() {
  await getMedia(camerasSelect.value);
  if (myPeerConnection) {
    const videoTrack = myStream.getVideoTracks()[0];
    const videoSender = myPeerConnection
      .getSenders()
      .find((sender) => sender.track.kind === 'video');
    videoSender.replaceTrack(videoTrack);
  }
}

async function handleMikeChange() {
  await getMedia(mikesSelect.value);
  if (myPeerConnection) {
    const audioTrack = myStream.getAudioTracks()[0];
    const audioSender = myPeerConnection
      .getSenders()
      .find((sender) => sender.track.kind === 'audio');
    audioSender.replaceTrack(audioTrack);
  }
}

// mike & camera on/off
const muteBtn = document.getElementById('muteBtn');
const cameraBtn = document.getElementById('cameraBtn');

function handleMuteClick() {
  const curState = myStream.getAudioTracks()[0].enabled;
  myStream.getAudioTracks()[0].enabled = !curState;
  muteBtn.innerText = muted ? 'Mute' : 'Unmute';
  muted = !muted;
}

function handleCameraClick() {
  const curState = myStream.getVideoTracks()[0].enabled;
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
mikesSelect.addEventListener('input', handleMikeChange);

// Save nickname & mike and camera on/off

const saveNickname = document.getElementById('saveNickname');
const saveNicknameForm = saveNickname.querySelector('form');
const enterRoom = document.getElementById('enterRoom');

function handleSaveSubmit(event) {
  event.preventDefault();
  const nicknameInput = document.getElementById('nickname');
  nickname = nicknameInput.value;
  const enterRoomBtn = enterRoom.querySelector('button');
  setNickname(nickname);
  enterRoomBtn.disabled = false;
  setDevices();
  initButton();
}

function setNickname(nickname) {
  const greeting = enterRoom.querySelector('span');
  greeting.innerText = `${nickname}, Welcome.`;
}

function setDevices() {
  const mikeOffCheck = document.getElementById('mikeOff');
  const cameraOffCheck = document.getElementById('cameraOff');
  muted = mikeOffCheck.checked;
  cameraOff = cameraOffCheck.checked;
}

saveNicknameForm.addEventListener('submit', handleSaveSubmit);

// Enter room (join a room)

const enterRoomForm = enterRoom.querySelector('form');
const callHeader = document.getElementById('callHeader');

async function initCall() {
  switchScreen();
  makeConnection();
  await getMedia();
}

function setCallHeader() {
  const title = callHeader.querySelectorAll('span');
  title[0].innerText = `${roomName}`;
  title[1].innerText = 'Waiting for a call partner...';
}

function setCallPartner(partnerNickname) {
  const title = callHeader.querySelectorAll('span');
  title[1].innerText = `Call with ${partnerNickname}`;
}

function handleEnterRoomSubmit(event) {
  event.preventDefault();
  const roomNameInput = document.getElementById('roomName');
  roomName = roomNameInput.value;
  if (nickname) {
    socket.emit('check_room', nickname, roomName);
    roomNameInput.value = '';
  } else {
    alert('You have to save your nickname first.');
  }
}

enterRoomForm.addEventListener('submit', handleEnterRoomSubmit);

// Chat
const chat = document.getElementById('chat');
const messageForm = document.getElementById('message');
const messageInput = messageForm.querySelector('textarea');
const messageSendBtn = messageForm.querySelector('button');
const ALIGN_LEFT = 'left';
const ALIGN_RIGHT = 'right';
messageSendBtn.disabled = true;

function addMessage(message, alignment, sender) {
  const ul = chat.querySelector('ul');
  const li = document.createElement('li');
  const messageSpan = document.createElement('span');

  message = message.trim();

  if (message) {
    if (sender && alignment === 'left') {
      const nicknameSpan = document.createElement('span');
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
  const message = messageInput.value;
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
  const { keyCode } = event;
  const { shiftKey: SHIFT } = event;
  const ENTER = 13;
  if (keyCode === ENTER && !SHIFT) {
    event.preventDefault();
    messageSendBtn.click();
  }
  if (keyCode === ENTER && SHIFT) {
    event.preventDefault();
    messageInput.value += '\n';
  }
}

messageInput.addEventListener('input', () => {
  messageSendBtn.disabled = messageInput.value.trim() === '' ? true : false;
});
messageForm.addEventListener('focusin', () => (messageInput.placeholder = ''));
messageForm.addEventListener(
  'focusout',
  () => (messageInput.placeholder = 'message')
);
messageForm.addEventListener('submit', handleMessageSubmit);
messageForm.addEventListener('keydown', handleMessageEnterKeydown);

// Toggle header
const toggleHeaderBtn = document.querySelector('.toggle-header');
toggleHeaderBtn.addEventListener('click', () => {
  const callHeader = document.querySelector('.call__header');
  callHeader.classList.toggle('visible');
});

// Toggle device
const deviceAndChatContainer = document.querySelector('.device-chat');
const deviceSelector = document.getElementById('device');
const toggleDeviceBtn = document.querySelector('.toggle-device');
const toggleChatBtn = document.querySelector('.toggle-chat');

function toggleAnimation(element) {
  element.classList.add('anim');
  setTimeout(() => {
    element.classList.remove('anim');
  }, 300);
}

toggleDeviceBtn.addEventListener('click', () => {
  toggleAnimation(deviceAndChatContainer);
  if (chat.classList.contains('visible')) {
    toggleChatBtn.click();
  }
  deviceAndChatContainer.classList.toggle('visible');
  chat.style.display = 'none';
  deviceSelector.style.display = 'flex';
  deviceSelector.classList.toggle('visible');
});

// Toggle chat
toggleChatBtn.addEventListener('click', () => {
  toggleAnimation(deviceAndChatContainer);
  if (deviceSelector.classList.contains('visible')) {
    toggleDeviceBtn.click();
  }
  deviceAndChatContainer.classList.toggle('visible');
  deviceSelector.style.display = 'none';
  chat.style.display = 'flex';
  chat.classList.toggle('visible');
});

// Resize screen and remove visible class
window.addEventListener('resize', () => {
  const width = window.innerWidth;
  if (width >= 768) {
    deviceAndChatContainer.classList.remove('visible');
    deviceSelector.classList.remove('visible');
    chat.classList.remove('visible');
    deviceSelector.style.display = 'flex';
    chat.style.display = 'flex';
  }
});

// Web Sockets
socket.on('update_rooms', (rooms) => {
  const roomList = document.getElementById('roomList');
  roomList.innerText = '';
  if (!Object.keys(rooms).length) {
    const li = document.createElement('li');
    li.innerText = 'There is no room.';
    roomList.append(li);
  } else {
    for (const room in rooms) {
      const button = document.createElement('button');
      button.innerText = `${room}\n(${rooms[room]} / 2)`;
      if (rooms[room] > 1) {
        button.setAttribute('disabled', 'true');
      }
      roomList.append(button);
      button.addEventListener('click', () => {
        if (nickname) {
          roomName = room;
          socket.emit('check_room', nickname, roomName);
        } else {
          alert('You have to save your nickname first.');
        }
      });
    }
  }
});

socket.on('already_in_room', () =>
  alert(`You are already in the other room.\nYou can enter only one room.`)
);

socket.on('is_full', (nickname, roomName) => alert(`${roomName} is full.`));

socket.on('is_available', async (nickname, roomName) => {
  await initCall();
  setCallHeader();
  socket.emit('join_room', nickname, roomName);
});

socket.on('set_header', (partnerNickname) => {
  setCallPartner(partnerNickname);
  socket.emit('header', nickname, partnerNickname, roomName);
});

socket.on('header', (myNickname) => {
  setCallPartner(myNickname);
  socket.emit('partner_nickname', myNickname);
});

socket.on('start_chat', (partnerNickname) => {
  myDataChannel = myPeerConnection.createDataChannel('chat');
  addMessage(`${partnerNickname} arrived!`);
  myDataChannel.addEventListener('message', (event) => {
    addMessage(event.data, ALIGN_LEFT, partnerNickname);
  });
  socket.emit('join_chat', nickname, roomName);
});

socket.on('join_chat', (partnerNickname) => {
  myPeerConnection.addEventListener('datachannel', (event) => {
    myDataChannel = event.channel;
    addMessage(`${partnerNickname} arrived!`);
    myDataChannel.addEventListener('message', (event) => {
      addMessage(event.data, ALIGN_LEFT, partnerNickname);
    });
  });
});

socket.on('send_offer', async () => {
  const offer = await myPeerConnection.createOffer({
    offerToReceiveAudio: true,
    offerToReceiveVideo: true,
  });
  myPeerConnection.setLocalDescription(offer);
  socket.emit('offer', offer, roomName);
});

socket.on('offer', async (offer) => {
  myPeerConnection.setRemoteDescription(offer);
  const answer = await myPeerConnection.createAnswer();
  myPeerConnection.setLocalDescription(answer);
  socket.emit('answer', answer, roomName);
});

socket.on('answer', (answer) => myPeerConnection.setRemoteDescription(answer));

socket.on('ice', (ice) => myPeerConnection.addIceCandidate(ice));

socket.on('leave_chat', (partnerNickname) =>
  addMessage(`${partnerNickname} left`)
);

socket.on('leave_call', async () => {
  try {
    peerFace.srcObject.getVideoTracks().forEach((track) => {
      track.stop();
      peerFace.srcObject.removeTrack(track);
    });
  } catch (e) {
    console.log(e);
  }
  await restartCall();
});

async function restartCall() {
  setCallHeader();
  makeConnection();
  await getMedia();
  socket.emit('join_room', nickname, roomName);
}

// WebRTC
function makeConnection() {
  myPeerConnection = new RTCPeerConnection({
    iceServers: [{
        urls: [
            'stun:stun.l.google.com:19302',
            'stun:stun1.l.google.com:19302',
            'stun:stun2.l.google.com:19302',
            'stun:stun3.l.google.com:19302',
            'stun:stun4.l.google.com:19302',
        ]
     },{
        username: "myuser",
        credential: "mypassword",
        urls: [
            "turn:54.227.182.145:3478?transport=udp",
            "turn:54.227.182.145:3478?transport=tcp",
        ]
     }],
  });
  myPeerConnection.addEventListener('icecandidate', (data) =>
    socket.emit('ice', data.candidate, roomName)
  );
  myPeerConnection.addEventListener(
    'addstream',
    (data) => (peerFace.srcObject = data.stream)
  );
}
