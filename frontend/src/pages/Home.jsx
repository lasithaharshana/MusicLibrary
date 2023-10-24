import { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';

import backgroundImage from '../image/background-image.jpg'; 
import logo from '../image/logo.png'; 

const Home = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);

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
    backgroundImage: `url(${backgroundImage}), linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))`, 
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

  const addSongButtonStyle = {
    backgroundColor: '#FF007F', 
    color: 'white', 
    padding: '8px 16px',
    borderRadius: '8px',
    margin: '30px 0', 
  };

  const logoStyle = {
    position: 'absolute',
    top: '10px', 
    left: '20px', 
    width: '200px', 
  };

  return (
    <div style={backgroundImageStyle}>
      <img src={logo} alt="Logo" style={logoStyle} /> 
      <Link to="/login" className="text-white text-lg absolute top-4 right-4">
        Log Out
      </Link>
      <h1 className="text-6xl font-bold text-white mb-4" style={{ marginBottom: '40px' }}>Song List</h1> 
      {loading ? (
        <Spinner />
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr className="bg-gray-700 text-white"> 
              <th className="px-4 py-2 text-center">No</th>
              <th className="px-4 py-2 text-center">Title</th>
              <th className="px-4 py-2 text-center hidden md:table-cell">Artist</th>
              <th className="px-4 py-2 text-center hidden md:table-cell">Album</th>
              <th className="px-4 py-2 text-center hidden md:table-cell">Publish Year</th>
              <th className="px-4 py-2 text-center">Operations</th>
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
                  <div className="flex justify-center space-x-4">
                    <Link to={`/songs/details/${song._id}`}>
                      <BsInfoCircle className="text-2xl text-blue-600" />
                    </Link>
                    <Link to={`/songs/edit/${song._id}`}>
                      <AiOutlineEdit className="text-2xl text-yellow-600" />
                    </Link>
                    <Link to={`/songs/delete/${song._id}`}>
                      <MdOutlineDelete className="text-2xl text-red-600" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Link to="/songs/create" style={addSongButtonStyle}>
        Add Song
      </Link>
    </div>
  );
};

export default Home;
