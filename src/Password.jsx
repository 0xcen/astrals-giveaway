import { LoadingButton } from '@mui/lab';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Password = () => {
	const [val, setVal] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const nav = useNavigate();
	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const res = await axios.post('https://astrals-raid.herokuapp.com/login', {
				password: val,
			});

			sessionStorage.setItem('jwt', res.data);
			nav('/new-giveaway');
		} catch (error) {
			setIsLoading(false);
			if (error.response.status === 401) return setError('Wrong password');
			else setError('Something weng wrong!');
		}
	};

	return (
		<div className="card">
			<form onSubmit={handleSubmit} className="login-form">
				<h1>Enter your password to access the tool</h1>
				<TextField
					className="login-input"
					fullWidth
					value={val}
					onChange={(e) => setVal(e.target.value)}
				/>
				{error && <span className="error">{error}</span>}
				<div className="box">
					<LoadingButton type="submit" variant="outlined" loading={isLoading}>
						Submit
					</LoadingButton>
				</div>
			</form>
		</div>
	);
};

export default Password;
