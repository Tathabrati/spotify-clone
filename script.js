console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let searchInput = document.getElementById('searchInput');
let shuffle = document.getElementById('shuffle');
let isShuffle = false;

let songs = [
     { songName: "Aasa Kooda - from [Think Indie]", filePath: "https://github.com/Tathabrati/spotify-clone/releases/download/v1.0/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Illuminati - sushin shyam", filePath: "https://github.com/Tathabrati/spotify-clone/releases/download/v1.0/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "Play Date - Melanie Martinez", filePath: "https://github.com/Tathabrati/spotify-clone/releases/download/v1.0/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Tomake - Shreya Ghoshal", filePath: "https://github.com/Tathabrati/spotify-clone/releases/download/v1.0/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Heart Attack - Demi Lovato", filePath: "https://github.com/Tathabrati/spotify-clone/releases/download/v1.0/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Katchi Sera - from [Think Indie]", filePath: "https://github.com/Tathabrati/spotify-clone/releases/download/v1.0/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "Ailo Uma barite - Antara Mitra", filePath: "https://github.com/Tathabrati/spotify-clone/releases/download/v1.0/7.mp3", coverPath: "covers/7.jpg" },
    { songName: "Teri Baaton Me Aisa Uljha Jiya", filePath: "https://github.com/Tathabrati/spotify-clone/releases/download/v1.0/8.mp3", coverPath: "covers/8.jpg" },
    { songName: "Kaavaalaa - Anirudh Ravichander", filePath: "https://github.com/Tathabrati/spotify-clone/releases/download/v1.0/9.mp3", coverPath: "covers/9.jpg" },
    { songName: "Arabic Kuthu - Halamithi Habibo", filePath: "https://github.com/Tathabrati/spotify-clone/releases/download/v1.0/10.mp3", coverPath: "covers/10.jpg" },
    { songName: "Jiya Tui Chara - Arijit Singh", filePath: "https://github.com/Tathabrati/spotify-clone/releases/download/v1.0/11.mp3", coverPath: "covers/11.jpg" }
];

// Update song items with the song details
songItems.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
    element.getElementsByClassName('songItemPlay')[0].id = i;
});

// Function to play the current song
const playSong = () => {
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    console.log("Playing:", masterSongName.innerText);
};

// Function to pause the current song
const pauseSong = () => {
    audioElement.pause();
    gif.style.opacity = 0;
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
    console.log("Paused:", masterSongName.innerText);
};

// Handle master play/pause button click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        playSong();
    } else {
        pauseSong();
    }
});

// Update the progress bar as the audio plays
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
    console.log("Progress:", progress);
});

// Update audio currentTime based on progress bar input
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
    console.log("Progress Bar Changed:", myProgressBar.value);
});

// Function to make all play buttons show play icon
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

// Handle song item play/pause button click
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        if (audioElement.paused || songIndex !== parseInt(e.target.id)) {
            makeAllPlays();
            songIndex = parseInt(e.target.id);
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            playSong();
        } else {
            pauseSong();
            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-play-circle');
        }
    });
});

// Handle next button click
document.getElementById('next').addEventListener('click', () => {
    if (isShuffle) {
        songIndex = Math.floor(Math.random() * songs.length);
    } else {
        songIndex = (songIndex + 1) % songs.length;
    }
    playSong();
});

// Handle previous button click
document.getElementById('previous').addEventListener('click', () => {
    if (isShuffle) {
        songIndex = Math.floor(Math.random() * songs.length);
    } else {
        songIndex = (songIndex - 1 + songs.length) % songs.length;
    }
    playSong();
});

// Handle shuffle button click
shuffle.addEventListener('click', () => {
    isShuffle = !isShuffle;
    shuffle.classList.toggle('active');
    console.log("Shuffle Mode:", isShuffle);
});

// Handle search input
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    songItems.forEach((item) => {
        const songName = item.getElementsByClassName('songName')[0].innerText.toLowerCase();
        if (songName.includes(searchTerm)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
    console.log("Search Query:", searchTerm);
});

