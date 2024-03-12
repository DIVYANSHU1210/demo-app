import React, { useState } from "react";
import "./style.css";

function Uploadsection({ setPlaylist}) {
  // console.log(playlist);
  const [audioFiles, setAudioFiles] = useState("");
  // const [fileName, setFileName] = useState("");
  const [artist, setArtist] = useState("");



  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setAudioFiles(files);
  };

  // const handleUpload = () => {
  //   console.log("original audiofile-->", audioFile);
  //   const newSong = {
  //     audioFile: {
  //       lastModified: audioFile.lastModified,
  //       lastModifiedDate: audioFile.lastModifiedDate,
  //       name: audioFile.name,
  //       size: audioFile.size,
  //       type: audioFile.type,
  //       webkitRelativePath: audioFile.webkitRelativePath,
  //     },
  //     fileName: fileName,
  //     artist: artist,
  //   };
  //   const updatedPlaylist = [...playlist, newSong];

  //   setPlaylist(updatedPlaylist);
  //   localStorage.setItem("myPlaylist", JSON.stringify(updatedPlaylist));
  //   console.log(
  //     "file saved in local storage:",
  //     JSON.parse(localStorage.getItem("myPlaylist"))
  //   );
  // setFileName("");
  //   setArtist("");
  //   setAudioFile("");

  //   // Reset file input field value
  //   const input = document.getElementById("audio-input");
  //   input.value = "";
  // };

    const handleUpload = () => {
    const reader = new FileReader();

    // Define a function to handle the FileReader's onload event
    reader.onload = (event) => {
      // Read the file content as a base64-encoded string
      const fileContent = event.target.result;

      // Add the new song to the playlist with the file content as data URL
      setPlaylist((prevPlaylist) => [
        ...prevPlaylist,
        {
          audioFile: fileContent,
          fileName: audioFiles[0].name,
          artist: artist,
        },
      ]);

      // Clear the input fields
      setAudioFiles([]);
      setArtist('');
    };

    // Read the contents of the selected audio file
    reader.readAsDataURL(audioFiles[0]);

    // Reset file input field value
    const input = document.getElementById("audio-input");
    input.value = "";
  };
    

  return (
    <div className="upload-section">
      <div className="upload-Audio">
        <label htmlFor="audio-input">
          {!audioFiles.length ? "add audio" : audioFiles[0].name}
        </label>
        <input
          type="file"
          id="audio-input"
          accept="audio/*"
          onChange={handleFileChange}
          placeholder="please add audio"
          style={{ display: "none" }}
        ></input>
      </div>
      <input
        className="audio-input"
        type="text"
        value={artist}
        placeholder="artist Name"
        onChange={(e) => setArtist(e.target.value)}
      />

      <button onClick={handleUpload}>upload</button>
    </div>
  );
}

export default Uploadsection;
