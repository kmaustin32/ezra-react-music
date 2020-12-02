import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay, faAngleLeft, faAngleRight, faPause} from "@fortawesome/free-solid-svg-icons";


document.addEventListener("keydown", (event) => {
    if(event.key === " ") {
        //playSongHan();
        console.log("Space Key");
    } else if(event.key === "ArrowLeft") {
        //skipTrackHan("back");
        console.log("Left Arrow");
    } else if(event.key === "ArrowRight") {
        //skipTrackHan("forward");
        console.log("Right arrow");
    };
});

const Player = ({currentSong, isPlaying, setIsPlaying, audioRef, songInfo, setSongInfo, songs, setCurrentSong, setSongs}) => {

    //event handlers
    const playSongHan = () => {
        if(isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play();
            setIsPlaying(true);
        };
    };

    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);

    const skipTrackHan = async (direction) => {
        if(direction === 'forward') {
            await setCurrentSong(songs[(currentIndex + 1) % songs.length])
            activeLibraryHan(songs[(currentIndex + 1) % songs.length])
        } 
        
        if(direction === 'back') {
            if((currentIndex - 1) % songs.length === -1) {
                await setCurrentSong(songs[songs.length - 1]);
                activeLibraryHan(songs[songs.length - 1])
                if(isPlaying) audioRef.current.play();
                return;
            } 
            await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
            activeLibraryHan(songs[(currentIndex - 1) % songs.length]);
        }
        if(isPlaying) audioRef.current.play()
    };

    const dragHan = (event) => {
        setSongInfo({...songInfo, currentTime: event.target.value});
        audioRef.current.currentTime = event.target.value;
    };

    const getTime = (time) => {
        return (
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        )
    }

    const activeLibraryHan = (nextPrev) => {
        const newSongs = songs.map((song) => {
            if(song.id === nextPrev.id) {
                return {
                    ...song,
                    active: true
                }
            } else {
                return {
                    ...song,
                    active: false
                }
            }
        })
        setSongs(newSongs);
    }


    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <input 
                onChange={dragHan}
                min={0} 
                max={songInfo.duration || 0} 
                value={songInfo.currentTime} 
                type="range"/>
                <p>{songInfo.duration ? getTime(songInfo.duration) : "00:00"}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon onClick={() => skipTrackHan('back')} className="skip-back" size="2x" icon={faAngleLeft}/>
                <FontAwesomeIcon onClick={playSongHan} className="play" size="2x" icon={isPlaying ? faPause : faPlay}/>
                <FontAwesomeIcon onClick={() => skipTrackHan('forward')}className="skip-forward" size="2x" icon={faAngleRight}/>               
            </div>
        </div>
    )
}

export default Player;