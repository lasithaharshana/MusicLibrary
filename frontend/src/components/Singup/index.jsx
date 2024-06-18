import background from '../../image/background-image.jpg'; // Replace with your background image
import logo from '../../image/logo.png'; // Replace with your logo image

import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
	const [data, setData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
	});
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = 'http://localhost:8000/api/users';
			const { data: res } = await axios.post(url, data);
			navigate('/login');
			console.log(res.message);
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	const backgroundImageStyle = {
		backgroundImage: `url(${background})`, // Full-screen background image
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		backgroundAttachment: 'fixed',
		height: '100vh', // Set the height to 100% of the viewport height
	};

	const logoStyle = {
		position: 'absolute',
		top: '10px',
		left: '50%',
		transform: 'translateX(-50%)',
		width: '200px',
		zIndex: 1,
	};

	const signupBoxStyle = {
		background: 'rgba(0, 0, 0, 0.7)', // Dark faded background
		borderRadius: '8px', // Rounded corners
		padding: '20px',
		textAlign: 'center',
	};

	return (
		<div
			style={backgroundImageStyle}
			className="container mx-auto flex justify-center items-center h-screen relative"
		>
			<img src={logo} alt="Logo" style={logoStyle} />
			<div className="w-full md:w-1/2 lg:w-1/3 px-4" style={signupBoxStyle}>
				<form onSubmit={handleSubmit} className="mt-4">
					<h1 className="text-2xl font-bold text-center mb-4 text-white">
						Create Account
					</h1>
					<input
						type="text"
						placeholder="First Name"
						name="firstName"
						onChange={handleChange}
						value={data.firstName}
						required
						className="w-full p-2 border rounded bg-gray-100"
					/>
					<input
						type="text"
						placeholder="Last Name"
						name="lastName"
						onChange={handleChange}
						value={data.lastName}
						required
						className="w-full p-2 border rounded bg-gray-100 mt-2"
					/>
					<input
						type="email"
						placeholder="Email"
						name="email"
						onChange={handleChange}
						value={data.email}
						required
						className="w-full p-2 border rounded bg-gray-100 mt-2"
					/>
					<input
						type="password"
						placeholder="Password"
						name="password"
						onChange={handleChange}
						value={data.password}
						required
						className="w-full p-2 border rounded bg-gray-100 mt-2"
					/>
					{error && (
						<div className="text-red-500 mt-2 text-center">{error}</div>
					)}
					<button
						type="submit"
						className="w-full bg-green-500 text-white p-2 rounded mt-4 hover:bg-green-600"
						style={{ width: '70%' }}
					>
						Sign Up
					</button>
					<Link to="/login">
						<button
							type="button"
							className="w-full bg-blue-500 text-white p-2 rounded mt-2 hover:bg-blue-600"
							style={{ width: '70%' }}
						>
							Sign In
						</button>
					</Link>
				</form>
			</div>
		</div>
	);
};

export default Signup;
