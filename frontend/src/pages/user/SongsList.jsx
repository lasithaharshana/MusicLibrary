import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../../components/Spinner';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack'; // Import useSnackbar

import backgroundImage from '../../image/background-image.jpg';
import logo from '../../image/logo.png';

const SongsList = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar(); // Initialize enqueueSnackbar

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:8080/songs')
      .then((response) => {
        setSongs(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const backgroundImageStyle = {
    backgroundImage: `url(${backgroundImage}), linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)`,
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
    position: 'relative',
    top: '-20px',
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

  const handleAddSongToPlaylist = (songId) => {
    const data = {
      songId: songId,
    };

    axios
      .post(`http://localhost:8080/playlists/${id}/add-song`, data)
      .then(() => {
        enqueueSnackbar('Song added to playlist successfully', { variant: 'success' });
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar('Already exists', { variant: 'info' });
      });
  };

  return (
    <div style={backgroundImageStyle}>
      <img src={logo} alt="Logo" style={logoStyle} />
      <h1 className="text-6xl font-bold text-white mb-4" style={{ marginBottom: '40px' }}>
        Songs List
      </h1>
      {loading ? (
        <Spinner />
      ) : (
        <table style={tableStyle}>
          <thead style={headerStyle}>
            <tr className="text-white">
              <th className="px-4 py-2 text-center">No</th>
              <th className="px-4 py-2 text-center">Title</th>
              <th className="px-4 py-2 text-center hidden md:table-cell">Artist</th>
              <th className="px-4 py-2 text-center hidden md:table-cell">Album</th>
              <th className="px-4 py-2 text-center hidden md:table-cell">Publish Year</th>
              <th className="px-4 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {songs.map((song, index) => (
              <tr key={song._id} className="border-t">
                <td className="px-4 py-2 text-center">{index + 1}</td>
                <td className="px-4 py-2 text-center">{song.title}</td>
                <td className="px-4 py-2 text-center hidden md:table-cell">{song.artist}</td>
                <td className="px-4 py-2 text-center hidden md:table-cell">{song.album}</td>
                <td className="px-4 py-2 text-center hidden md:table-cell">{song.publishYear}</td>
                <td className="px-4 py-2 text-center">
                  <button className="text-green-600 underline" onClick={() => handleAddSongToPlaylist(song._id)}>
                    Add
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SongsList;
