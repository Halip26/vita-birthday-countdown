// Background music functionality with autoplay handling
const bgMusic = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');
let isPlaying = false;

// Try to autoplay when page loads
function attemptAutoplay() {
  const playPromise = bgMusic.play();
  
  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        // Autoplay started successfully
        isPlaying = true;
        updateToggleButton();
      })
      .catch((error) => {
        // Autoplay blocked by browser, wait for user interaction
        console.log('Autoplay blocked. Waiting for user interaction.');
        isPlaying = false;
        updateToggleButton();
        addClickToPlayListener();
      });
  }
}

// Add click-to-play listener for the entire page
function addClickToPlayListener() {
  function startMusicOnInteraction() {
    if (!isPlaying) {
      bgMusic.play()
        .then(() => {
          isPlaying = true;
          updateToggleButton();
          // Remove listeners after successful play
          document.removeEventListener('click', startMusicOnInteraction);
          document.removeEventListener('keydown', startMusicOnInteraction);
        })
        .catch((error) => {
          console.error('Failed to play audio:', error);
        });
    }
  }
  
  // Listen for any click or keypress
  document.addEventListener('click', startMusicOnInteraction, { once: true });
  document.addEventListener('keydown', startMusicOnInteraction, { once: true });
}

// Toggle music on/off
function toggleMusic() {
  if (isPlaying) {
    bgMusic.pause();
    isPlaying = false;
  } else {
    bgMusic.play()
      .then(() => {
        isPlaying = true;
      })
      .catch((error) => {
        console.error('Failed to play audio:', error);
      });
  }
  updateToggleButton();
}

// Update toggle button appearance
function updateToggleButton() {
  if (isPlaying) {
    musicToggle.textContent = '❚❚';
    musicToggle.setAttribute('aria-pressed', 'true');
    musicToggle.title = 'Pause music';
  } else {
    musicToggle.textContent = '▷';
    musicToggle.setAttribute('aria-pressed', 'false');
    musicToggle.title = 'Play music';
  }
}

// Event listeners
musicToggle.addEventListener('click', toggleMusic);

// Set volume (optional, adjust 0.0 to 1.0)
bgMusic.volume = 0.5;

// Attempt autoplay when page loads
window.addEventListener('load', attemptAutoplay);

// Also try when DOM is ready (in case load event already fired)
if (document.readyState === 'complete') {
  attemptAutoplay();
}
