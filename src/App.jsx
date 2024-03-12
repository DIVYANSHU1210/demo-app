import { useState , useEffect} from 'react'
import Uploadsection from './components/uploadSection'
import Playlist from './components/playlist'
import Audioplayer from './components/audioplayer';

function App() {
  const [playlist, setPlaylist] = useState([]);

  const [activeAudio, setActiveAudio] = useState("");

  useEffect(()=>{
    // Retrieve playlist data from localStorage
    // localStorage.clear();
    const storedPlaylist = localStorage.getItem("playlist");
    if (storedPlaylist) {
      setPlaylist(JSON.parse(storedPlaylist));
    }

    const storedActiveAudio = localStorage.getItem("active-audio");
    if(storedActiveAudio){
      setActiveAudio(JSON.parse(storedActiveAudio));
    }
    
 }, [])

 useEffect(() => {
  // Update local storage when playlist changes
  localStorage.setItem('playlist', JSON.stringify(playlist));
}, [playlist]);

useEffect(()=>{
  localStorage.setItem('active-audio', JSON.stringify(activeAudio));
},[activeAudio]);



  return (
    <div className='app'>
      <Uploadsection setPlaylist={setPlaylist}/>
      <Playlist playlist={playlist} setActiveAudio = {setActiveAudio} activeAudio= {activeAudio}/>
      <Audioplayer playlist={playlist} setActiveAudio = {setActiveAudio} activeAudio= {activeAudio}/>
    </div>
  )
}

export default App
