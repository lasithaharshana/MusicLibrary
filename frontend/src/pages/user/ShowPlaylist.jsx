import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import PlaylistBackButton from '../../components/PlaylistBackButton';
import Spinner from '../../components/Spinner';
import { Link } from 'react-router-dom';

import backgroundImage from '../../image/background-image.jpg'; 
import logo from '../../image/logo.png'; 

const ShowPlaylist = () => {
  const [playlist, setPlaylist] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [songIds, setSongIds] = useState([]);
  const [songs, setSongs] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const loadPlaylist = () => {
    setLoading(true);
    axios
      .get(`http://localhost:8080/playlists/${id}`)
      .then((response) => {
        setPlaylist(response.data);
        setSongIds(response.data.songs);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const loadSongs = () => {
    const songDetailsPromises = songIds.map((songId) =>
      axios.get(`http://localhost:8080/songs/${songId}`)
    );

    Promise.all(songDetailsPromises)
      .then((responses) => {
        const songDetails = responses.map((response) => response.data);
        setSongs(songDetails);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    loadPlaylist();
  }, [id]);

  useEffect(() => {
    loadSongs();
  }, [songIds]);

  const handleDeleteSong = (songId) => {
    axios
      .delete(`http://localhost:8080/playlists/${id}/delete-song/${songId}`)
      .then(() => {
        loadPlaylist();
        enqueueSnackbar('Song Deleted successfully', { variant: 'success' });
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar('Error deleting song', { variant: 'error' });
      });
  };

  const backgroundImageStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${backgroundImage})`, 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    height: '100vh', 
    color: 'white', 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  };

  const tableStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.8)', 
    borderRadius: '12px', 
    padding: '20px',
    width: '100%',
    maxWidth: '800px', 
    color: 'white', 
  };

  const headerStyle = {
    backgroundColor: 'rgba(64, 64, 64, 0.7)', 
  };

  const logoStyle = {
    position: 'absolute',
    top: '10px', 
    left: '20px', 
    width: '200px', 
  };

  const playlistTitleStyle = {
    color: 'white', 
    textTransform: 'uppercase', 
    fontSize: '2.5rem',
    marginBottom: '20px', 
    textAlign: 'center',
  };

  return (
    <div style={backgroundImageStyle} className='w-full h-full'>
      <img src={logo} alt='Logo' style={logoStyle} /> 
      <PlaylistBackButton  />
      {loading ? (
        <Spinner />
      ) : (
        <div className='p-4'>
          <h1 style={playlistTitleStyle}>{playlist.category}</h1>
          <Link to={`/playlists/addsong/${id}`}>
            <button className='bg-red-500 text-white py-2 px-4 rounded mb-4'>
              Add Song
            </button>
          </Link>
          <table style={tableStyle}>
            <thead style={headerStyle}>
              <tr className='text-white'> 
                <th className='border border-gray-300 px-4 py-2'>Title</th>
                <th className='border border-gray-300 px-4 py-2'>Artist</th>
                <th className='border border-gray-300 px-4 py-2'>Album</th>
                <th className='border border-gray-300 px-4 py-2'>Publish Year</th>
                <th className='border border-gray-300 px-4 py-2 text-center'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {songs.map((song) => (
                <tr key={song._id}>
                  <td className='border border-gray-300 px-4 py-2'>{song.title}</td>
                  <td className='border border-gray-300 px-4 py-2'>{song.artist}</td>
                  <td className='border border-gray-300 px-4 py-2'>{song.album}</td>
                  <td className='border border-gray-300 px-4 py-2'>{song.publishYear}</td>
                  <td className='border border-gray-300 px-4 py-2 text-center'>
                    <button
                      onClick={() => handleDeleteSong(song._id)}
                      className='text-red-600'
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ShowPlaylist;
