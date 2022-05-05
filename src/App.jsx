import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import TweetSubmit from './TweetSubmit';
import Password from './Password';
import Leaderboard from './Leaderboard';

function App() {
	const theme = createTheme({
		palette: {
			mode: 'dark',
			resize: {
				fontSize: '30px',
			},
			primary: {
				light: '#fff',
				main: '#fff',
				dark: '#002884',
				contrastText: '#fff',
			},
			secondary: {
				light: '#ff7961',
				main: '#f44336',
				dark: '#ba000d',
				contrastText: '#000',
			},
		},
	});

	return (
		<div className="App">
			<ThemeProvider theme={theme}>
				<Router>
					<Routes>
						<Route path="/new-giveaway" element={<TweetSubmit />} />
						<Route path="/" element={<Password />} />
						<Route path="/leaderboard" element={<Leaderboard />} />
					</Routes>
				</Router>
			</ThemeProvider>
		</div>
	);
}

export default App;
