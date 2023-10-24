import { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import background from '../image/background-image.jpg'; 

const EditSong = () => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8080/songs/${id}`)
      .then((response) => {
        setArtist(response.data.artist);
        setAlbum(response.data.album);
        setPublishYear(response.data.publishYear);
        setTitle(response.data.title);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert('An error happened. Please check the console');
        console.log(error);
      });
  }, []);

  const handleEditSong = () => {
    const data = {
      title,
      artist,
      album,
      publishYear,
    };
    setLoading(true);
    axios
      .put(`http://localhost:8080/songs/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Song Edited successfully', { variant: 'success' });
        navigate('/songhome');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  const backgroundImageStyle = {
    backgroundImage: `url(${background})`, 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    height: '100vh', 
  };

  return (
    <div style={backgroundImageStyle} className="container mx-auto flex justify-center items-center h-screen">
      <div className="p-4 bg-black bg-opacity-80 text-white rounded-lg">
        <BackButton />
        <h1 className="text-3xl my-4">Edit Song</h1>
        {loading ? <Spinner /> : ''}
        <div className="flex flex-col border-2 border-sky-400 rounded-xl p-4 w-[400px]">
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-300">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-2 border-gray-500 text-gray-900 px-4 py-2 w-full"
            />
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-300">Artist</label>
            <input
              type="text"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              className="border-2 border-gray-500 text-gray-900 px-4 py-2 w-full"
            />
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-300">Album</label>
            <input
              type="text"
              value={album}
              onChange={(e) => setAlbum(e.target.value)}
              className="border-2 border-gray-500 text-gray-900 px-4 py-2 w-full"
            />
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-300">Publish Year</label>
            <input
              type="number"
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
              className="border-2 border-gray-500 text-gray-900 px-4 py-2 w-full"
            />
          </div>
          <button className="p-2 bg-blue-400 text-white m-8" onClick={handleEditSong}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditSong;
