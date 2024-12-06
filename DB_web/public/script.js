
const socket = io(`https://${window.location.hostname}:3000`);
const videoGrid = document.getElementById('video-grid');

const myPeer = new Peer(undefined, {
  host: '192.168.0.104',
  port: '3001', // PeerJS port
  path: '/peerjs',
  secure: true // Use secure connection
});


const myVideo = document.createElement('video');
myVideo.muted = true;
const peers = {};

navigator.mediaDevices.getUserMedia({
  video: true,
  audio: {
    echoCancellation: true,
    noiseSuppression: true,
    autoGainControl: true,
    // Consider simplifying audio settings
  }
}).then(stream => {
  addVideoStream(myVideo, stream);

  myPeer.on('call', call => {
    call.answer(stream);
    const video = document.createElement('video');
    call.on('stream', userVideoStream => {
      addVideoStream(video, userVideoStream);
    });
  });

  socket.on('user-connected', userId => {
    setTimeout(() => {
      connectToNewUser(userId, stream);
    }, 1000);
  });
}).catch(error => {
  console.error('Error accessing media devices:', error);
});

socket.on('user-disconnected', userId => {
  if (peers[userId]) peers[userId].close();
});

myPeer.on('open', id => {
  socket.emit('join-room', ROOM_ID, id);
});

function connectToNewUser(userId, stream) {
  const call = myPeer.call(userId, stream);
  const video = document.createElement('video');
  call.on('stream', userVideoStream => {
    addVideoStream(video, userVideoStream);
  });
  call.on('close', () => {
    video.remove();
  });

  peers[userId] = call;
}

function addVideoStream(video, stream) {
  video.srcObject = stream;
  video.addEventListener('loadedmetadata', () => {
    video.play();
  });
  videoGrid.append(video);
}


function toggleVideo() {
  const enabled = myVideo.srcObject.getVideoTracks()[0].enabled;
  myVideo.srcObject.getVideoTracks()[0].enabled = !enabled;
  alert(`Video ${enabled ? 'disabled' : 'enabled'}`);
}

function toggleAudio() {
  const enabled = myVideo.srcObject.getAudioTracks()[0].enabled;
  myVideo.srcObject.getAudioTracks()[0].enabled = !enabled;
  alert(`Audio ${enabled ? 'muted' : 'unmuted'}`);
}

function leaveRoom() {
  window.location.href = '/';
}


// Set the full room URL dynamically
document.getElementById('room-url').innerText = window.location.href;
document.getElementById('room-link').href = window.location.href;


