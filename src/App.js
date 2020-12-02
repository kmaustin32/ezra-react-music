import React, {useState, useRef} from "react";
import './styles/app.scss';
//There are our components
import Player from "./Components/Player";
import Song from "./Components/Song"
import Data from "./data";
import Library from "./Components/Library";
import Nav from "./Components/Nav"

function App() {
  //state
    const [songs, setSongs] = useState(Data());
    const [currentSong, setCurrentSong] = useState(songs[0]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0
    });
    const [libraryStatus, setLibraryStatus] = useState(false);

    const audioRef = useRef(null);

    const timeUpdateHan = (event) => {
        const current = event.target.currentTime;
        const duration = event.target.duration;
        setSongInfo({...songInfo, currentTime: current, duration})
    };

    const songEndHan = async () => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);

        await setCurrentSong(songs[(currentIndex + 1) % songs.length]);

        if(isPlaying) audioRef.current.play();
    };

    return (
        <div className={`App ${libraryStatus ? 'library-active' : ''}`}>
            <Nav 
            libraryStatus={libraryStatus}
            setLibraryStatus={setLibraryStatus}/>
            <Song 
            currentSong={currentSong}
            isPlaying={isPlaying}/>
            <Player 
            audioRef={audioRef}
            currentSong={currentSong}
            setCurrentSong={setCurrentSong}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            songInfo={songInfo}
            setSongInfo={setSongInfo}
            songs={songs}
            setSongs={setSongs}/>
            <Library 
            songs={songs}
            setCurrentSong={setCurrentSong}
            audioRef={audioRef}
            isPlaying={isPlaying}
            setSongs={setSongs}
            libraryStatus={libraryStatus}/>
            <audio 
                onTimeUpdate={timeUpdateHan} 
                ref={audioRef} 
                src={currentSong.audio}
                onLoadedMetadata={timeUpdateHan}
                onEnded={songEndHan}
            ></audio>
        </div>
    );
}

export default App;
