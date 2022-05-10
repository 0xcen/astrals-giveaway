import React, { useState, createContext, useEffect } from 'react';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();
export const UpdateUserContext = createContext();

const UserProvider = ({ children }) => {
	const [user, setUser] = useState('');
	const [isLoading, setIsLoading] = useState(true);

	const updateUser = (next) => {
		setUser(next);
	};

	const getUser = async () => {
		if (!sessionStorage.getItem('jwt') && window.location.pathname === '/') {
			return;
		}

		if (window.location.pathname === '/leaderboard') return;
		const res = await axios.get('https://astrals-raid.herokuapp.com/check', {
			validateStatus: false,
			headers: {
				Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
			},
		});

		if (res.status === 200) {
			return res.data.user;
		} else {
			sessionStorage.clear();
			// return location.assign('/');
		}
	};

	useEffect(() => {
		if (!user) {
			if (window.location.pathname === '/leaderboard') {
				return setIsLoading(false);
			}
			(async () => {
				setUser(await getUser());
				setIsLoading(false);
			})();
		}
	}, []);

	return (
		<UserContext.Provider value={user}>
			<UpdateUserContext.Provider value={updateUser}>
				{isLoading ? (
					<CircularProgress
						style={{ display: 'block', margin: '20vh auto', color: '#fff' }}
						color="inherit"
					/>
				) : (
					children
				)}
			</UpdateUserContext.Provider>
		</UserContext.Provider>
	);
};

export default UserProvider;
