import { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import background from '../image/background-image.jpg';

const CreateSongs = () => {
	const [title, setTitle] = useState('');
	const [artist, setArtist] = useState('');
	const [album, setAlbum] = useState('');
	const [publishYear, setPublishYear] = useState('');
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();

	const handleSaveSong = () => {
		const data = {
			title,
			artist,
			album,
			publishYear,
		};
		setLoading(true);
		axios
			.post('http://localhost:8000/Songs', data)
			.then(() => {
				setLoading(false);
				enqueueSnackbar('Song Created successfully', { variant: 'success' });
				navigate('/songhome');
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
				<BackButton />
				<h1 className="text-3xl my-4">Create Song</h1>
				{loading ? <Spinner /> : ''}
				<div className="flex flex-col border-2 border-sky-400 rounded-xl p-4 w-[400px]">
					<div className="my-4">
						<label className="text-xl mr-4 text-gray-300">Title</label>
						<input
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className="border-2 border-gray-500 px-4 py-2 w-full"
							style={inputTextStyle}
						/>
					</div>
					<div className="my-4">
						<label className="text-xl mr-4 text-gray-300">Artist</label>
						<input
							type="text"
							value={artist}
							onChange={(e) => setArtist(e.target.value)}
							className="border-2 border-gray-500 px-4 py-2 w-full"
							style={inputTextStyle}
						/>
					</div>
					<div className="my-4">
						<label className="text-xl mr-4 text-gray-300">Album</label>
						<input
							type="text"
							value={album}
							onChange={(e) => setAlbum(e.target.value)}
							className="border-2 border-gray-500 px-4 py-2 w-full"
							style={inputTextStyle}
						/>
					</div>
					<div className="my-4">
						<label className="text-xl mr-4 text-gray-300">Publish Year</label>
						<input
							type="number"
							value={publishYear}
							onChange={(e) => setPublishYear(e.target.value)}
							className="border-2 border-gray-500 px-4 py-2 w-full"
							style={inputTextStyle}
						/>
					</div>
					<button
						className="p-2 m-8"
						onClick={handleSaveSong}
						style={saveButtonStyle}
					>
						Save
					</button>
				</div>
			</div>
		</div>
	);
};

export default CreateSongs;
