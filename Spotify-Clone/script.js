let currentSong = new Audio()
let songs
let currFolder
function convertSecondsToMinutesSeconds(seconds) {
    // Ensure the input is a number
    if (typeof seconds !== 'number' || isNaN(seconds) || seconds < 0) {
        throw new Error('Invalid input: Please provide a non-negative number.');
    }

    // Calculate minutes and seconds
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    // Format minutes and seconds as two digits
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = remainingSeconds.toString().padStart(2, '0');

    // Return formatted time string
    return `${formattedMinutes}:${formattedSeconds}`;
}


async function getSongs(folder) {
    // console.log("get songs")
    currFolder = folder
    let a = await fetch(`http://127.0.0.1:3000/${currFolder}/`)
    let response = await a.text()
    // console.log(response)
    let div = document.createElement("div")
    div.innerHTML = response
    let as = div.getElementsByTagName("a")
    // console.log(as)
    songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split(`/${currFolder}/`)[1])
        }
    }
    let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0]
    songUL.innerHTML = ""
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li>
                            <img class="invert" src="music.svg" alt="">
                            <div class="info">
                                <div class="songname">
                                ${song.replaceAll("%20", " ")}
                                </div>
                                <div class="artist">
                                    Haris
                                </div>
                            </div>
                            <div class="playnow">
                                <span>Play Now</span>
                                <img class="invert" src="newplayinlib.svg" alt="">
                            </div>
     </li>`
    }
    //selecting specific track to play on click
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            // console.log(e.querySelector(".info").firstElementChild.innerHTML)
            playSong(e.querySelector(".info").firstElementChild.innerHTML.trim())
        })
    });
    const playSong = (track) => {
        // let audio = new Audio("/songs/"+ track)
        currentSong.src = `/${currFolder}/` + track
        currentSong.play()
        play.src = "pause.svg"
        document.querySelector(".songinfo").innerHTML = track.replaceAll("%20", " ")
        document.querySelector(".songduration").innerHTML = "00:00/00:00"
    }
    
    
}
async function displayArtists() {
    console.log("starting artists")
    let a = await fetch(`http://127.0.0.1:3000/songs/`)
    let response = await a.text()
    let div = document.createElement("div")
    div.innerHTML = response
    let anchors = div.getElementsByTagName("a")
    let cardContainer = document.querySelector(".cardContainer")
    cardContainer.innerHTML = "" 
    let array = Array.from(anchors)
    for (let index = 0; index < array.length; index++) {
        const e = array[index];
        if (e.href.includes("/songs")) {
            let folder = e.href.split("/").slice(-2)[0]
        
        //api for fetching metadata
        let a = await fetch(`http://127.0.0.1:3000/songs/${folder}/info.json`)
        let response = await a.json()
        cardContainer.innerHTML =  cardContainer.innerHTML + `<div data-folder="${folder}" class="cards">
                    <div class="play">
                        <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="m424.4 214.7-352-208.1c-28.6-16.9-72.4-.5-72.4 41.3v416.1c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z" />
                        </svg>

                    </div>
                    <img src="/songs/${folder}/cover.jfif" alt="">
                    <h2>${response.title}</h2>
                    <p>${response.description}</p>
                </div>`
        }
        
    }
    //dynamic album functionality


    Array.from(document.getElementsByClassName("cards")).forEach(element => {
        element.addEventListener("click", async item => {
            console.log("hello click")
             console.log(item.currentTarget.dataset)
            songs = await getSongs(`songs/${item.currentTarget.dataset.folder}`)
        })
    });
   

}

async function main() {
    //adding songs to library
    let songs = await getSongs("songs/")
    // console.log(songs)
    displayArtists()
    //functionality of playbar
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play()
            play.src = "pause.svg"
        }
        else {
            currentSong.pause()
            play.src = "playbtn.svg"
        }
    })
    
    
    // time update playbar
    currentSong.addEventListener("timeupdate", () => {
        // console.log(currentSong.currentTime, currentSong.duration)
        document.querySelector(".songduration").innerHTML = `${convertSecondsToMinutesSeconds(currentSong.currentTime)}/${convertSecondsToMinutesSeconds(currentSong.duration)}`
        document.querySelector(".circle").style.left = (((currentSong.currentTime) / (currentSong.duration)) * 100) + "%"
    })
    // setting seekbar
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100
        document.querySelector(".circle").style.left = percent + "%"
        // console.log(e.target.getBoundingClientRect().width)
        currentSong.currentTime = ((currentSong.duration * percent) / 100)
    })
    //hamburger functionality
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0"
    })
    //close functionality
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120%"
    })
    // Function to get the index of the current song in the playlist
    function getCurrentSongIndex() {
        const currentSongName = currentSong.src.split("/").pop();
        return songs.indexOf(currentSongName);
    }

    // Function to handle playing a song by index
    function playSongAtIndex(index) {
        if (index >= 0 && index < songs.length) {
            playSong(songs[index]);
        }
    }

    // Event listener for the previous button
    previous.addEventListener("click", () => {
        const currentIndex = getCurrentSongIndex();
        const previousIndex = currentIndex - 1;
        playSongAtIndex(previousIndex);
    });

    // Event listener for the next button
    next.addEventListener("click", () => {
        const currentIndex = getCurrentSongIndex();
        const nextIndex = currentIndex + 1;
        playSongAtIndex(nextIndex);
    });
    
    

}
main()         
