import { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import background from '../image/background-image.jpg'; 

const DeleteSong = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteSong = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:8080/Songs/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Song Deleted successfully', { variant: 'success' });
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
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    height: "100vh", 
  };

  return (
    <div style={backgroundImageStyle} className="container mx-auto flex justify-center items-center h-screen">
      <div className="p-4 bg-gray-800 text-white bg-opacity-80 rounded-lg">
        <BackButton />
        <h1 className="text-3xl my-4">Delete Song</h1>
        {loading ? <Spinner /> : ''}
        <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl p-4 mx-auto w-80">
          <h3 className="text-2xl text-gray-300 mb-4">Are You Sure You want to delete this Song?</h3>

          <button
            className="p-2 bg-red-600 text-white m-4 w-full hover:bg-red-700"
            onClick={handleDeleteSong}
          >
            Yes, Delete it
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteSong;
