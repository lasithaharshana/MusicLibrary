import { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';

import logo from '../../image/logo.png'; 

const Home = () => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:8080/playlists')
      .then((response) => {
        setPlaylists(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const logoStyle = {
    position: 'absolute',
    bottom: '30px',
    left: '50%', 
    transform: 'translateX(-50%)',
    width: '400px',
  };

  return (
    <div className="p-4 bg-gray-600 h-full">
      <div className="flex flex-col items-center">
        <img src={logo} alt="Logo" style={logoStyle} />
        <h1 className="text-4xl uppercase font-bold text-indigo-500 text-uppercase mb-4">Playlists</h1>
        <Link to="/login" className="text-white text-lg absolute top-4 right-4">
          Log Out
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="overflow-x-auto">
          <div className="flex flex-nowrap items-start">
            {playlists.map((playlist, index) => (
              <div
                key={playlist._id}
                className={`w-80 h-80 border border-gray-500 rounded-lg p-4 hover:shadow-xl flex-shrink-0 mr-4 mt-4 ${
                  index % 2 === 0 ? 'bg-pink-700' : 'bg-gray-800'
                }`}
              >
                <div className="flex flex-col justify-end items-center h-full text-center">
                  <div className="mb-4">
                    <h1 className="text-2xl text-white font-bold uppercase">{playlist.category}</h1>
                  </div>
                  <div className="flex justify-between items-center w-3/4 mx-auto">
                    <Link to={`/playlists/details/${playlist._id}`}>
                      <BsInfoCircle className="text-2xl text-green-400 hover:text-black" />
                    </Link>
                    <Link to={`/playlists/edit/${playlist._id}`}>
                      <AiOutlineEdit className="text-2xl text-yellow-600 hover:text-black" />
                    </Link>
                    <Link to={`/playlists/delete/${playlist._id}`}>
                      <MdOutlineDelete className="text-2xl text-red-600 hover:text-black" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="flex justify-center items-center my-4">
        <Link to="/playlists/create" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          Add Playlist
        </Link>
      </div>
    </div>
  );
};

export default Home;
