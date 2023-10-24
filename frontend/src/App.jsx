import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import CreateSongs from './pages/CreateSongs';
import ShowSong from './pages/ShowSong';
import EditSong from './pages/EditSong';
import DeleteSong from './pages/DeleteSong';

import PlaylistHome from './pages/user/PlaylistHome';
import CreatePlaylists from './pages/user/CreatePlaylists';
import ShowPlaylist from './pages/user/ShowPlaylist';
import EditPlaylist from './pages/user/EditPlaylist';
import DeletePlaylist from './pages/user/DeletePlaylist';
import SongsList from './pages/user/SongsList';

import Signup from "./components/Singup";
import Login from "./components/Login";

function App() {
	const user = localStorage.getItem("token");

	return (
		<Routes>
			{user && <Route path="/" exact element={<Login/>} />}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Navigate replace to="/login" />} />

      <Route path='/songhome' element={<Home />} />
      <Route path='/songs/create' element={<CreateSongs />} />
      <Route path='/songs/details/:id' element={<ShowSong />} />
      <Route path='/songs/edit/:id' element={<EditSong />} />
      <Route path='/songs/delete/:id' element={<DeleteSong />} />

      <Route path='/playlisthome' element={<PlaylistHome />} />
      <Route path='/playlists/create' element={<CreatePlaylists />} />
      <Route path='/playlists/details/:id' element={<ShowPlaylist />} />
      <Route path='/playlists/edit/:id' element={<EditPlaylist />} />
      <Route path='/playlists/delete/:id' element={<DeletePlaylist />} />

      <Route path='/playlists/addsong/:id' element={<SongsList />} />
		</Routes>
	);
}

export default App;
