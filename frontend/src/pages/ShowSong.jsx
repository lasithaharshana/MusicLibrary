import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

import background from '../image/background-image.jpg';

const ShowSong = () => {
	const [song, setSong] = useState({});
	const [loading, setLoading] = useState(false);
	const { id } = useParams();

	useEffect(() => {
		setLoading(true);
		axios
			.get(`http://localhost:8000/songs/${id}`)
			.then((response) => {
				setSong(response.data);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
			});
	}, []);

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
			<div className="p-4 bg-gray-800 text-white bg-opacity-80 rounded-lg">
				<BackButton />
				<h1 className="text-3xl my-4">Show Song</h1>
				{loading ? (
					<Spinner />
				) : (
					<div className="flex flex-col border-2 border-sky-400 rounded-xl p-4">
						<div className="my-4">
							<span className="text-xl mr-4 text-gray-300">Id</span>
							<span>{song._id}</span>
						</div>
						<div className="my-4">
							<span className="text-xl mr-4 text-gray-300">Title</span>
							<span>{song.title}</span>
						</div>
						<div className="my-4">
							<span className="text-xl mr-4 text-gray-300">Artist</span>
							<span>{song.artist}</span>
						</div>
						<div className="my-4">
							<span className="text-xl mr-4 text-gray-300">Album</span>
							<span>{song.album}</span>
						</div>
						<div className="my-4">
							<span className="text-xl mr-4 text-gray-300">Publish Year</span>
							<span>{song.publishYear}</span>
						</div>
						<div className="my-4">
							<span className="text-xl mr-4 text-gray-300">Create Time</span>
							<span>{new Date(song.createdAt).toString()}</span>
						</div>
						<div className="my-4">
							<span className="text-xl mr-4 text-gray-300">
								Last Update Time
							</span>
							<span>{new Date(song.updatedAt).toString()}</span>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default ShowSong;
