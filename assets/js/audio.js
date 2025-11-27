// bg music functionality with autoplay handling
const bgMusic = document.getElementById("bg-music");
const musicToggle = document.getElementById("music-toggle");

// set volume (adjust 0.0 to 1.0)
bgMusic.volume = 0.5;

// update toggle button appearance based on audio state
function updateToggleButton() {
  if (bgMusic.paused) {
    musicToggle.textContent = "▷";
    musicToggle.setAttribute("aria-pressed", "false");
    musicToggle.title = "Play music";
  } else {
    musicToggle.textContent = "❚❚";
    musicToggle.setAttribute("aria-pressed", "true");
    musicToggle.title = "Pause music";
  }
}

// toggle music on/off
function toggleMusic(e) {
  e.stopPropagation();

  if (bgMusic.paused) {
    bgMusic.play().catch((error) => {
      console.error("Failed to play audio:", error);
    });
  } else {
    bgMusic.pause();
  }
}

// listen to audio events to keep btn in sync
bgMusic.addEventListener("play", updateToggleButton);
bgMusic.addEventListener("pause", updateToggleButton);
bgMusic.addEventListener("playing", updateToggleButton);

// event listener for toggle btn
musicToggle.addEventListener("click", toggleMusic);

// try to autoplay when page loads
function attemptAutoplay() {
  const playPromise = bgMusic.play();

  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        console.log("Autoplay started successfully");
      })
      .catch((error) => {
        console.log("Autoplay blocked. Click anywhere to start music.");
        // add click-to-play listener for the entire page
        addClickToPlayListener();
      });
  }
}

// add click-to-play listener for the entire page
function addClickToPlayListener() {
  function startMusicOnInteraction(e) {
    // don't trigger if clicking the toggle btn (it has its own handler)
    if (e.target !== musicToggle) {
      bgMusic
        .play()
        .then(() => {
          console.log("Music started after user interaction");
        })
        .catch((error) => {
          console.error("Failed to play audio:", error);
        });
    }
  }

  // listen for any click or keypress (once)
  document.addEventListener("click", startMusicOnInteraction, { once: true });
  document.addEventListener("keydown", startMusicOnInteraction, { once: true });
}

// attempt autoplay when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", attemptAutoplay);
} else {
  attemptAutoplay();
}
