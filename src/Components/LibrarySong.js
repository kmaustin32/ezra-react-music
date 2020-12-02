import React from "react";

const LibrarySong = ({song, songs, setCurrentSong, id, key, audioRef, isPlaying, setSongs}) => {
    
    const songSelectHan = async () => {
        await setCurrentSong(song);
        
        const newSongs = songs.map((song) => {
            if(song.id === id) {
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

        if(isPlaying) audioRef.current.play();
        
    }
    
    return (
        <div onClick={songSelectHan} className={`library-song ${song.active ? 'selected' : ""}`}>
            <img src={song.cover} alt={song.name}/>
            <div className="songInfoContainer">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>

    )
}

export default LibrarySong;