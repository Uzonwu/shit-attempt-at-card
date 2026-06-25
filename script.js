// gatekeeper flow 
function show(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = document.getElementById(id);
  if (el) el.classList.add('active');
  window.scrollTo(0, 0);
}

// nay page
const sadGifs = [
  'sad/cat1.jpg', 'sad/cat2.jpg', 'sad/cat3.jpg', 'sad/cat4.jpg', 'sad/cat5.jpg',
  'sad/cat6.jpg', 'sad/cat7.jpg', 'sad/cat8.jpg', 'sad/cat9.jpg', 'sad/cat10.jpg',
  'sad/cat11.jpg', 'sad/cat12.jpg', 'sad/cat13.jpg', 'sad/cat14.jpg', 'sad/cat15.jpg',
  'sad/other1.jpg', 'sad/other2.jpg', 'sad/other3.jpg', 'sad/other4.jpg', 'sad/other5.jpg',
  'sad/other6.jpg', 'sad/other7.jpg', 'sad/other8.jpg', 'sad/other9.jpg', 'sad/other10.jpg',
  'sad/other11.jpg', 'sad/other12.jpeg', 'sad/other13.jpeg', 'sad/other14.jpg', 'sad/other15.jpg',
  'sad/other16.jpg', 'sad/other17.jpg', 'sad/other18.jpg', 'sad/other19.jpg', 'sad/other20.jpg',
  'sad/gif1.gif', 'sad/gif2.gif', 'sad/gif3.gif', 'sad/gif4.gif', 'sad/gif5.gif',
];
let gifTimer = null;
let gifQueue = [];

const positions = [
  {top:"15%", left:"70%"},
  {top:"70%", left:"15%"},
  {top:"10%", left:"45%"},
  {top:"65%", left:"70%"},
  {top:"30%", left:"15%"},
  {top:"40%", left:"75%"}
];
let positionQueue = [];

function startGifCycle() {
  const img = document.getElementById('sad-gif');
  if (!img) return;
  clearTimeout(gifTimer);

  function shuffleQueue() {
    gifQueue = [...sadGifs].sort(() => Math.random() - 0.5);
  }
  function shufflePositions() {
    positionQueue = [...positions].sort(() => Math.random() - 0.5);
  }
  function showRandomGif() {
    if (gifQueue.length === 0) shuffleQueue();
    const nextGif = gifQueue.pop();
    img.src = nextGif;
    if (positionQueue.length === 0) shufflePositions();
    const pos = positionQueue.pop();
    img.style.top = pos.top;
    img.style.left = pos.left;
    img.classList.add("visible");
    const isGif = nextGif.toLowerCase().endsWith('.gif');
    gifTimer = setTimeout(() => {
      img.classList.remove("visible");
      setTimeout(showRandomGif, 500);
    }, isGif ? 4000 : 1500);
  }

  shuffleQueue();
  shufflePositions();
  showRandomGif();
}

// quiz page
let wrongCount = 0;
let quizPaused = false;

const susImages = [
  'sus/sus1.jpg', 'sus/sus2.jpg', 'sus/sus3.jpg', 'sus/sus4.jpg', 'sus/sus5.jpg',
  'sus/sus6.jpg', 'sus/sus7.jpg', 'sus/sus8.jpg', 'sus/sus9.jpg', 'sus/sus10.jpg',
  'sus/sus11.jpg', 'sus/sus12.jpg', 'sus/sus13.jpg', 'sus/sus14.jpg', 'sus/sus15.jpg',
  'sus/sus16.jpg', 'sus/sus17.jpg', 'sus/sus18.jpg', 'sus/sus19.jpg', 'sus/sus20.jpg',
  'sus/sus21.jpg', 'sus/sus22.jpg', 'sus/sus23.jpg', 'sus/sus24.jpg', 'sus/sus25.jpg',
  'sus/sus26.jpg', 'sus/sus27.jpg', 'sus/sus28.jpg', 'sus/sus29.jpg', 'sus/sus30.jpg',
  'sus/sus31.jpg', 'sus/sus32.jpg', 'sus/sus33.jpg', 'sus/sus34.jpg', 'sus/sus35.jpg',
  'sus/sus36.jpg', 'sus/sus37.jpg', 'sus/sus38.jpg', 'sus/sus39.jpg', 'sus/sus40.jpg',
  'sus/sus41.jpg', 'sus/sus42.jpg', 'sus/sus43.jpg', 'sus/sus44.jpg', 'sus/sus45.jpg',
  'sus/sus46.jpg', 'sus/sus47.jpg', 'sus/sus48.jpg', 'sus/sus49.jpg', 'sus/sus50.jpg',
  'sus/sus51.jpg', 'sus/sus52.jpg', 'sus/sus53.jpg', 'sus/sus54.jpg', 'sus/sus55.jpg', 'sus/sus56.jpg'
];

let susDeck = [];
function refillSusDeck() { susDeck = [...susImages].sort(() => Math.random() - 0.5); }
function getNextSusImage() { if (susDeck.length === 0) refillSusDeck(); return susDeck.shift(); }

const quizPositions = [
  {top:"5%", left:"5%"}, {top:"5%", left:"45%"}, {top:"5%", left:"80%"},
  {top:"25%", left:"10%"}, {top:"25%", left:"75%"},
  {top:"45%", left:"5%"}, {top:"45%", left:"80%"},
  {top:"70%", left:"10%"}, {top:"75%", left:"45%"}, {top:"70%", left:"75%"}
];
let availablePositions = [];

function getSusDuration() {
  const min = 500, max = 3000;
  return Math.max(min, Math.floor(max - ((wrongCount - 1) * (max - min) / 9)));
}

function spawnSus() {
  if (availablePositions.length === 0) {
    availablePositions = [...quizPositions].sort(() => Math.random() - 0.5);
  }
  const img = document.createElement("img");
  img.src = getNextSusImage();
  img.className = "quiz-sus";
  const pos = availablePositions.pop();
  img.style.top = pos.top;
  img.style.left = pos.left;
  document.getElementById("quiz-pictures").appendChild(img);
  setTimeout(() => img.classList.add("show"), 30);
  const duration = getSusDuration();
  setTimeout(() => {
    img.classList.remove("show");
    setTimeout(() => img.remove(), 300);
  }, duration);
}

let susInterval = null;
function startSusAttack() {
  clearInterval(susInterval);
  const amount = Math.min(1 + Math.floor(wrongCount / 3), 3);
  for (let i = 0; i < amount; i++) spawnSus();
  susInterval = setInterval(() => {
    const amt = Math.min(1 + Math.floor(wrongCount / 3), 3);
    for (let i = 0; i < amt; i++) spawnSus();
  }, Math.max(800, 4000 - wrongCount * 300));
}

function checkMeme() {
  if (quizPaused) return;
  const answer = document.getElementById("meme-answer").value.trim().toLowerCase();
  const correct = "ne...dare na no?! (STAY_WAKE)".toLowerCase();

  if (answer === correct) {
    window.location.href = "home.html";
    return;
  }

  wrongCount++;
  if (wrongCount < 10) startSusAttack();
  if (wrongCount === 5) showHintPrompt();
  if (wrongCount >= 10) {
    clearInterval(susInterval);
    show("screen-imposter");
    setTimeout(resetQuiz, 300);
  }
}

function showHintPrompt() {
  quizPaused = true;
  document.getElementById("quiz-main").style.display = "none";
  document.getElementById("hint-prompt").style.display = "flex";
}

function showHint() {
  document.getElementById("hint-prompt").style.display = "none";
  document.getElementById("hint-content").style.display = "flex";
}

function continueQuiz() {
  quizPaused = false;
  document.getElementById("hint-prompt").style.display = "none";
  document.getElementById("hint-content").style.display = "none";
  document.getElementById("quiz-main").style.display = "flex";
  const input = document.getElementById("meme-answer");
  if (input) { input.value = ""; input.focus(); }
}

function resetQuiz() {
  wrongCount = 0;
  quizPaused = false;
  susDeck = [];
  availablePositions = [];
  clearInterval(susInterval);
  const pile = document.getElementById("quiz-pictures");
  if (pile) pile.innerHTML = "";
}

// playlist (only runs on playlist.html) 
const songs = [
  { title:"Plastic Love",    artist:"Mariya Takeuchi", audio:"playlist/song1.mp4", image:"playlist/song1.gif" },
  { title:"Telephone Number",artist:"Junko Ohashi",    audio:"playlist/song2.mp4", image:"playlist/song2.gif" },
  { title:"Stay With Me",    artist:"Miki Matsubara",  audio:"playlist/song4.mp4", image:"playlist/song4.gif" },
  { title:"Bay City",        artist:"Junko Yagami",    audio:"playlist/song3.mp4", image:"playlist/song3.gif" },
  { title:"You're Beautiful?",artist:"who tf even knows",audio:"playlist/song5.mp4",image:"playlist/song5.2.gif"}
];

const audio = document.getElementById("audio");

if (audio) {
  const titleEl  = document.getElementById("current-title");
  const artistEl = document.getElementById("current-artist");
  const cover    = document.getElementById("current-cover");
  const playBtn  = document.getElementById("play");
  const progress = document.getElementById("progress");
  let current = 0;

  function loadSong(index) {
    current = index;
    const song = songs[index];
    audio.src = song.audio;
    audio.load();
    progress.style.width = "0%";
    titleEl.textContent  = song.title;
    artistEl.textContent = song.artist;
    cover.src            = song.image;
    document.querySelectorAll(".song-row").forEach(row => row.classList.remove("active"));
    document.querySelector(`[data-index="${index}"]`).classList.add("active");
  }

  function playSong() {
    audio.play().then(() => { playBtn.textContent = "⏸"; }).catch(e => console.log("Audio error:", e));
  }

  function pauseSong() {
    audio.pause();
    playBtn.textContent = "▶";
  }

  loadSong(0);
  progress.style.width = "0%";
  playBtn.textContent  = "▶";

  playBtn.onclick = () => { audio.paused ? playSong() : pauseSong(); };

  document.querySelectorAll(".song-row").forEach(row => {
    row.onclick = () => { loadSong(Number(row.dataset.index)); playSong(); };
  });

  document.getElementById("next").onclick = () => {
    current = (current + 1) % songs.length;
    loadSong(current); playSong();
  };

  document.getElementById("prev").onclick = () => {
    current = (current - 1 + songs.length) % songs.length;
    loadSong(current); playSong();
  };

  audio.addEventListener("timeupdate", () => {
    if (!audio.duration) return;
    progress.style.width = ((audio.currentTime / audio.duration) * 100) + "%";
  });

  audio.addEventListener("ended", () => { document.getElementById("next").click(); });
}

// init (runs on every page
document.addEventListener('DOMContentLoaded', () => {
  const intro = document.getElementById('screen-intro');
  if (intro) intro.classList.add('active');
});
