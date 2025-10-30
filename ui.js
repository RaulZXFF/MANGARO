// ui.js - meniul și playerul global
(function () {
  // --- MENIU GLISANT ---
  const menuToggle = document.createElement("div");
  menuToggle.className = "menu-toggle";
  menuToggle.innerHTML = "&lt;";
  document.body.appendChild(menuToggle);

  const slideMenu = document.createElement("div");
  slideMenu.className = "slide-menu";
  slideMenu.innerHTML = `
    <h3>Meniu</h3>
    <ul>
      <li><a href="../../index.html">Acasă</a></li>
      <li><a href="../CA-1/CA-1.html">Capitolul 1</a></li>
      <li><a href="../CA-2/CA-2.html">Capitolul 2</a></li>
      <li><a href="../CA-3/CA-3.html">Capitolul 3</a></li>
    </ul>
  `;
  document.body.appendChild(slideMenu);

  // Efect glisant
  menuToggle.addEventListener("mouseenter", () => {
    slideMenu.style.right = "0";
  });
  slideMenu.addEventListener("mouseleave", () => {
    slideMenu.style.right = "-260px";
  });

  // --- PLAYER AUDIO GLOBAL ---
  const musicPlayer = document.createElement("div");
  musicPlayer.className = "music-player";
  musicPlayer.innerHTML = `
    <select id="musicSelect">
      <option value="../../audio/Chill LO-Fi.mp3">Chill LO-Fi</option>
    </select>
    <audio id="audioPlayer" controls></audio>
  `;
  document.body.appendChild(musicPlayer);

  const audioPlayer = document.getElementById("audioPlayer");
  const musicSelect = document.getElementById("musicSelect");

  // Schimbare melodie
  musicSelect.addEventListener("change", () => {
    const isPlaying = !audioPlayer.paused;
    audioPlayer.src = musicSelect.value;
    if (isPlaying) audioPlayer.play();
  });

  // Reține starea între pagini
  window.addEventListener("beforeunload", () => {
    localStorage.setItem("musicSrc", audioPlayer.src);
    localStorage.setItem("musicTime", audioPlayer.currentTime);
    localStorage.setItem("musicPlaying", !audioPlayer.paused);
  });

  window.addEventListener("load", () => {
    const savedSrc = localStorage.getItem("musicSrc");
    const savedTime = localStorage.getItem("musicTime");
    const savedPlaying = localStorage.getItem("musicPlaying") === "true";
    if (savedSrc) {
      audioPlayer.src = savedSrc;
      musicSelect.value = savedSrc;
      audioPlayer.currentTime = parseFloat(savedTime) || 0;
      if (savedPlaying) audioPlayer.play();
    }
  });
})();
