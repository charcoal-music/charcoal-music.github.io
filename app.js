const API_KEY = 'AIzaSyDXtWbgXpuwXOuRLu4mFyn0lMmhtD4Npzg';
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const songsContainer = document.getElementById('songs-container');

searchButton.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (query) {
    fetchSongs(query);
  }
});

async function fetchSongs(query) {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=10&q=${encodeURIComponent(query)}&key=${API_KEY}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    displaySongs(data.items);
  } catch (error) {
    console.error('Error fetching songs:', error);
  }
}

function displaySongs(songs) {
  songsContainer.innerHTML = '';
  songs.forEach(song => {
    const songCard = document.createElement('div');
    songCard.classList.add('song-card');
    
    songCard.innerHTML = `
      <img src="${song.snippet.thumbnails.high.url}" alt="${song.snippet.title}" />
      <h3>${song.snippet.title}</h3>
      <button onclick="playSong('${song.id.videoId}')">Play</button>
    `;
    
    songsContainer.appendChild(songCard);
  });
}

function playSong(videoId) {
  const playerWindow = window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  playerWindow.focus();
}
