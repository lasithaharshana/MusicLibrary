import { useState } from 'react';
import PlaylistBackButton from '../../components/PlaylistBackButton';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import background from '../../image/background-image.jpg';

const CreatePlaylists = () => {
	const [category, setCategory] = useState('');
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();

	const handleSavePlaylist = () => {
		const data = {
			category,
		};
		setLoading(true);
		axios
			.post('http://localhost:8000/Playlists', data)
			.then(() => {
				setLoading(false);
				enqueueSnackbar('Playlist Created successfully', {
					variant: 'success',
				});
				navigate('/playlisthome');
			})
			.catch((error) => {
				setLoading(false);
				enqueueSnackbar('Error', { variant: 'error' });
				console.log(error);
			});
	};

	const inputTextStyle = {
		color: 'black',
	};

	const saveButtonStyle = {
		backgroundColor: 'blue',
		color: 'white',
	};

	const backgroundImageStyle = {
		backgroundImage: `url(${background})`,
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		backgroundAttachment: 'fixed',
		height: '100vh',
	};

	return (
		<div
			style={backgroundImageStyle}
			className="container mx-auto flex justify-center items-center h-screen"
		>
			<div className="p-4 bg-black bg-opacity-80 text-white rounded-lg">
				<PlaylistBackButton />
				<h1 className="text-3xl my-4">Create Playlist</h1>
				{loading ? <Spinner /> : ''}
				<div className="flex flex-col border-2 border-sky-400 rounded-xl p-4 w-[400px]">
					<div className="my-4">
						<label className="text-xl mr-4 text-gray-300">Category</label>
						<input
							type="text"
							value={category}
							onChange={(e) => setCategory(e.target.value)}
							className="border-2 border-gray-500 px-4 py-2 w-full"
							style={inputTextStyle}
						/>
					</div>
					<button
						className="p-2 m-8"
						onClick={handleSavePlaylist}
						style={saveButtonStyle}
					>
						Save
					</button>
				</div>
			</div>
		</div>
	);
};

export default CreatePlaylists;
