import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const AddSongModal = ({ onClose, selectedSongId }) => {
  const [availableSongs, setAvailableSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:8080/songs')
      .then((response) => {
        setAvailableSongs(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  const handleAddToPlaylist = (songId) => {
    axios
      .post(`http://localhost:8080/playlists/${selectedSongId}/add-song`, {
        songId,
      })
      .then(() => {
        onClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className='modal'>
      <div className='modal-content'>
        <button onClick={onClose} className='close-button'>
          Close
        </button>
        <h2>Add Songs to Playlist</h2>
        {isLoading ? (
          <p>Loading available songs...</p>
        ) : (
          <ul>
            {availableSongs.map((song) => (
              <li key={song._id}>
                {song.title} - {song.artist}
                <button onClick={() => handleAddToPlaylist(song._id)}>Add to Playlist</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

AddSongModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  selectedSongId: PropTypes.string.isRequired,
};

export default AddSongModal;
