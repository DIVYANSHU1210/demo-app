import React from 'react';
import "./style.css";

function Playlist({ playlist , setActiveAudio, activeAudio}) {
    // console.log("my playlist =>", playlist)
    // console.log("active-audio =>",activeAudio)
  return (
    <div className='playlist'>
      {playlist.length !== 0 ? (
        playlist.map((song, index) => (
          <div key={index} className={`song-details ${song.audioFile === activeAudio? 'active-song': ""}`}>
            <div>
                <h1>{song.fileName}</h1>
                <p>{song.artist}</p>
            </div>
            {/* <audio src={song.audioFile} controls style={{width:"50%"}}></audio> */}
            <div style={{display:"flex", gap:"1rem"}}>
                <button onClick={()=>setActiveAudio(song.audioFile)}>Play</button>
                <button onClick={()=>setActiveAudio("")}>Pause</button>
            </div>
            
            
          </div>
        ))
      ) : (
        <p>No songs available</p>
      )}
    </div>
  );
}

export default Playlist;
