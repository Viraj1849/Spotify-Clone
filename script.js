
const songs = [
  {
    title: "Tum Hi Ho",
    artist: "Arijit Singh",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // Replace with actual song URL
    cover: "https://i.imgur.com/KDh8cKl.jpeg"
  },
  {
    title: "Raataan Lambiyan",
    artist: "Jubin Nautiyal",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    cover: "https://i.imgur.com/2T4Z6KS.jpeg"
  },
  // Add more songs here similarly
];

let currentSongIndex = 0;
let isPlaying = false;
const audio = new Audio();

// Initialize player
function initPlayer() {
  loadSong(currentSongIndex);
  renderPlaylist();
}

// Load song
function loadSong(index) {
  const song = songs[index];
  audio.src = song.src;
  document.getElementById('title').textContent = song.title;
  document.getElementById('artist').textContent = song.artist;
  document.getElementById('cover').src = song.cover;
}

// Play/Pause
document.getElementById('play').addEventListener('click', () => {
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

function playSong() {
  audio.play();
  isPlaying = true;
  document.getElementById('play').innerHTML = '<i class="fas fa-pause"></i>';
}

function pauseSong() {
  audio.pause();
  isPlaying = false;
  document.getElementById('play').innerHTML = '<i class="fas fa-play"></i>';
}

// Previous song
document.getElementById('prev').addEventListener('click', () => {
  currentSongIndex--;
  if (currentSongIndex < 0) {
    currentSongIndex = songs.length - 1;
  }
  loadSong(currentSongIndex);
  if (isPlaying) playSong();
});

// Next song
document.getElementById('next').addEventListener('click', () => {
  currentSongIndex++;
  if (currentSongIndex >= songs.length) {
    currentSongIndex = 0;
  }
  loadSong(currentSongIndex);
  if (isPlaying) playSong();
});

// Update progress bar
audio.addEventListener('timeupdate', () => {
  const progress = (audio.currentTime / audio.duration) * 100;
  document.getElementById('progress').value = progress;
  
  // Update time displays
  document.getElementById('current-time').textContent = formatTime(audio.currentTime);
  document.getElementById('duration').textContent = formatTime(audio.duration);
});

// Format time
function formatTime(seconds) {
  if (isNaN(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Render playlist
function renderPlaylist() {
  const playlist = document.querySelector('.playlist');
  playlist.innerHTML = songs.map((song, index) => `
    <div class="song-item ${index === currentSongIndex ? 'active' : ''}" onclick="playSongFromPlaylist(${index})">
      <img src="${song.cover}" alt="${song.title}">
      <div>
        <h3>${song.title}</h3>
        <p>${song.artist}</p>
      </div>
    </div>
  `).join('');
}

// Play song from playlist
function playSongFromPlaylist(index) {
  currentSongIndex = index;
  loadSong(currentSongIndex);
  playSong();
  renderPlaylist();
}

// Initialize the player
initPlayer();
