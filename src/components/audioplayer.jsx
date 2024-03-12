// import React from 'react'

// function Audioplayer({playlist, setActiveAudio, activeAudio}) {
//   return (
//     <div className='audio-player'>
//         <audio src={activeAudio} autoPlay controls style={{width:"50%"}}></audio>
//     </div>
//   )
// }

// export default Audioplayer

import React, { useEffect , useState} from "react";
import "./style.css";



function Audioplayer({ playlist, activeAudio, setActiveAudio }) {
    const [currentTime, setCurrentTime] = useState(0);
  
    // Function to handle the onEnded event of the audio player
    const handleAudioEnded = () => {
      // Find the index of the currently playing song in the playlist
      const currentIndex = playlist.findIndex(
        (song) => song.audioFile === activeAudio
      );
  
      // Check if the current song is not the last song in the playlist
      if (currentIndex < playlist.length - 1) {
        // Set the active audio to the next song in the playlist
        setActiveAudio(playlist[currentIndex + 1].audioFile);
      }
    };
  
    // Effect to handle changes in the active audio
    useEffect(() => {
      // Add event listener for the audio player's onEnded event
      const audioElement = document.getElementById("audio-element");
      if (audioElement) {
        audioElement.addEventListener("ended", handleAudioEnded);
        audioElement.addEventListener('timeupdate', updateTime);
      }
  
      // Remove event listeners when component unmounts
      return () => {
        if (audioElement) {
          audioElement.removeEventListener("ended", handleAudioEnded);
          audioElement.removeEventListener('timeupdate', updateTime);
        }
      };
    }, [activeAudio, playlist, setActiveAudio]);
  
    useEffect(() => {
      const savedCurrentTime = localStorage.getItem('currentAudioTime');
      if (savedCurrentTime !== null) {
        setCurrentTime(parseFloat(savedCurrentTime));
      }
    }, []);
  
    const updateTime = () => {
      const audioElement = document.getElementById('audio-element');
      if (audioElement) {
        setCurrentTime(audioElement.currentTime);
        localStorage.setItem('currentAudioTime', audioElement.currentTime.toString());
      }
    };
  
    // Render the audio player
    return (
      <div className="audio-player">
        {activeAudio && (
          <audio
            id='audio-element'
            src={activeAudio}
            controls
            autoPlay
            onLoadedMetadata={updateTime}
            style={{ width: "70%" }}
          ></audio>
        )}
      </div>
    );
  }
  
  export default Audioplayer;
  
