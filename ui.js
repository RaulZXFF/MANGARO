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
    <h3>MENIU</h3>
  <ul>
  <li><a href="../../index.html">PAGINA PRINCIPALA</a></li>
  <li><a href="../CA-1/CA-1.html">#001 - Misiunea</a></li>
  <li><a href="../CA-2/CA-2.html">#002 - Gramezi</a></li>
  <li><a href="../CA-3/CA-3.html">#003 - Martor ocular</a></li>
  <li><a href="../CA-4/CA-4.html">#004 - Sabia ascunsă</a></li>
  <li><a href="../CA-5/CA-5.html">#005 - Ucigașul</a></li>
  <li><a href="../CA-6/CA-6.html">#006 - Începutul</a></li>
  <li><a href="../CA-7/CA-7.html">#007 - Răzbunare</a></li>
  <li><a href="../CA-8/CA-8.html">#008 - Umbra</a></li>
  <li><a href="../CA-9/CA-9.html">#009 - Tăcerea</a></li>
  <li><a href="../CA-10/CA-10.html">#010 - Flacăra</a></li>
  <li><a href="../CA-11/CA-11.html">#011 - Duelul</a></li>
  <li><a href="../CA-12/CA-12.html">#012 - Trezirea</a></li>
  <li><a href="../CA-13/CA-13.html">#013 - Secretul</a></li>
  <li><a href="../CA-14/CA-14.html">#014 - Aliatul</a></li>
  <li><a href="../CA-15/CA-15.html">#015 - Vânzarea</a></li>
  <li><a href="../CA-16/CA-16.html">#016 - Vânzătorul</a></li>
  <li><a href="../CA-17/CA-17.html">#017 - Prețul</a></li>
  <li><a href="../CA-18/CA-18.html">#018 - Următorul pas</a></li>
  <li><a href="../CA-19/CA-19.html">#019 - Întâlnirea</a></li>
  <li><a href="../CA-20/CA-20.html">#020 - Provocarea</a></li>
  <li><a href="../CA-21/CA-21.html">#021 - Lupta</a></li>
  <li><a href="../CA-22/CA-22.html">#022 - Victoria</a></li>
  <li><a href="../CA-23/CA-23.html">#023 - Consecințele</a></li>
  <li><a href="../CA-24/CA-24.html">#024 - Planul</a></li>
  <li><a href="../CA-25/CA-25.html">#025 - Pregătirea</a></li>
  <li><a href="../CA-26/CA-26.html">#026 - Infiltrarea</a></li>
  <li><a href="../CA-27/CA-27.html">#027 - Descoperirea</a></li>
  <li><a href="../CA-28/CA-28.html">#028 - Confruntarea</a></li>
  <li><a href="../CA-29/CA-29.html">#029 - Adevărul</a></li>
  <li><a href="../CA-30/CA-30.html">#030 - Trădarea</a></li>
  <li><a href="../CA-31/CA-31.html">#031 - Fuga</a></li>
  <li><a href="../CA-32/CA-32.html">#032 - Refugiul</a></li>
  <li><a href="../CA-33/CA-33.html">#033 - Antrenamentul</a></li>
  <li><a href="../CA-34/CA-34.html">#034 - Maestrul</a></li>
  <li><a href="../CA-35/CA-35.html">#035 - Lecția</a></li>
  <li><a href="../CA-36/CA-36.html">#036 - Progresul</a></li>
  <li><a href="../CA-37/CA-37.html">#037 - Testul</a></li>
  <li><a href="../CA-38/CA-38.html">#038 - Eșecul</a></li>
  <li><a href="../CA-39/CA-39.html">#039 - Revenirea</a></li>
  <li><a href="../CA-40/CA-40.html">#040 - Decizia</a></li>
  <li><a href="../CA-41/CA-41.html">#041 - Drumul</a></li>
  <li><a href="../CA-42/CA-42.html">#042 - Destinația</a></li>
  <li><a href="../CA-43/CA-43.html">#043 - Bătălia</a></li>
  <li><a href="../CA-44/CA-44.html">#044 - Sacrificiul</a></li>
  <li><a href="../CA-45/CA-45.html">#045 - Durerea</a></li>
  <li><a href="../CA-46/CA-46.html">#046 - Vindecarea</a></li>
  <li><a href="../CA-47/CA-47.html">#047 - Puterea</a></li>
  <li><a href="../CA-48/CA-48.html">#048 - Ascensiunea</a></li>
  <li><a href="../CA-49/CA-49.html">#049 - Amenințarea</a></li>
  <li><a href="../CA-50/CA-50.html">#050 - Pregătirea finală</a></li>
  <li><a href="../CA-51/CA-51.html">#051 - Asaltul</a></li>
  <li><a href="../CA-52/CA-52.html">#052 - Inamicul</a></li>
  <li><a href="../CA-53/CA-53.html">#053 - Lupta supremă</a></li>
  <li><a href="../CA-54/CA-54.html">#054 - Dezvăluirea</a></li>
  <li><a href="../CA-55/CA-55.html">#055 - Moștenirea</a></li>
  <li><a href="../CA-56/CA-56.html">#056 - Trecutul</a></li>
  <li><a href="../CA-57/CA-57.html">#057 - Originea</a></li>
  <li><a href="../CA-58/CA-58.html">#058 - Legenda</a></li>
  <li><a href="../CA-59/CA-59.html">#059 - Chemarea</a></li>
  <li><a href="../CA-60/CA-60.html">#060 - Răspunsul</a></li>
  <li><a href="../CA-61/CA-61.html">#061 - Alianța</a></li>
  <li><a href="../CA-62/CA-62.html">#062 - Strategia</a></li>
  <li><a href="../CA-63/CA-63.html">#063 - Execuția</a></li>
  <li><a href="../CA-64/CA-64.html">#064 - Haosul</a></li>
  <li><a href="../CA-65/CA-65.html">#065 - Salvarea</a></li>
  <li><a href="../CA-66/CA-66.html">#066 - Reuniunea</a></li>
  <li><a href="../CA-67/CA-67.html">#067 - Jurământul</a></li>
  <li><a href="../CA-68/CA-68.html">#068 - Pregătirea războiului</a></li>
  <li><a href="../CA-69/CA-69.html">#069 - Armata</a></li>
  <li><a href="../CA-70/CA-70.html">#070 - Invazia</a></li>
  <li><a href="../CA-71/CA-71.html">#071 - Frontul</a></li>
  <li><a href="../CA-72/CA-72.html">#072 - Pierderile</a></li>
  <li><a href="../CA-73/CA-73.html">#073 - Contraatacul</a></li>
  <li><a href="../CA-74/CA-74.html">#074 - Speranța</a></li>
  <li><a href="../CA-75/CA-75.html">#075 - Ultima șansă</a></li>
  <li><a href="../CA-76/CA-76.html">#076 - Decizia finală</a></li>
  <li><a href="../CA-77/CA-77.html">#077 - Confruntarea supremă</a></li>
  <li><a href="../CA-78/CA-78.html">#078 - Tăierea</a></li>
  <li><a href="../CA-79/CA-79.html">#079 - Victoria amară</a></li>
  <li><a href="../CA-80/CA-80.html">#080 - Pace temporară</a></li>
  <li><a href="../CA-81/CA-81.html">#081 - Noua amenințare</a></li>
  <li><a href="../CA-82/CA-82.html">#082 - Umbra din adâncuri</a></li>
  <li><a href="../CA-83/CA-83.html">#083 - Trezirea antică</a></li>
  <li><a href="../CA-84/CA-84.html">#084 - Sabia blestemată</a></li>
  <li><a href="../CA-85/CA-85.html">#085 - Călătoria interzisă</a></li>
  <li><a href="../CA-86/CA-86.html">#086 - Templul uitat</a></li>
  <li><a href="../CA-87/CA-87.html">#087 - Gardianul</a></li>
  <li><a href="../CA-88/CA-88.html">#088 - Proba</a></li>
  <li><a href="../CA-89/CA-89.html">#089 - Adevărata putere</a></li>
  <li><a href="../CA-90/CA-90.html">#090 - Moartea și renașterea</a></li>
  <li><a href="../CA-91/CA-91.html">#091 - Ultimul dușman</a></li>
  <li><a href="../CA-92/CA-92.html">#092 - Bătălia finală</a></li>
  <li><a href="../CA-93/CA-93.html">#093 - Sacrificiul suprem</a></li>
  <li><a href="../CA-94/CA-94.html">#094 - Moștenitorul</a></li>
  <li><a href="../CA-95/CA-95.html">#095 - Noua eră</a></li>
  <li><a href="../CA-96/CA-96.html">#096 - Legământul</a></li>
  <li><a href="../CA-97/CA-97.html">#097 - Viitorul</a></li>
  <li><a href="../CA-98/CA-98.html">#098 - Kagurabachi</a></li>
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
