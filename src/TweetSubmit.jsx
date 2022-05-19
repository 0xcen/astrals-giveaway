import React, { useState } from 'react';

import axios from 'axios';
import TweetLink from './TweetLink.jsx';
import LoadingButton from '@mui/lab/LoadingButton';
import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom';

const TweetSubmit = () => {
	const nav = useNavigate();
	const [giveawayTweets, setGiveawayTweets] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	const addTweet = () => {
		setGiveawayTweets([...giveawayTweets, { index: uuid() }]);
	};

	const remove = (i) => {
		const next = giveawayTweets.filter((t) => t.index !== i);
		setGiveawayTweets(next);
	};

	const submitForm = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		const formData = new FormData(e.currentTarget);
		const formFile = new FormData(e.currentTarget).get('prev-scores');

		if (!sessionStorage.getItem('jwt')) return alert('no valid session found');
		if (formFile.size > 0 && formFile.type !== 'application/json') {
			setIsLoading(false);
			return setError('Attachment must be a json file.');
		}

		try {
			const res = await axios.post(
				'https://astrals-raid.herokuapp.com/submit',
				formData,
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
					},
				}
			);

			localStorage.setItem('data', JSON.stringify(res.data));
			nav('/leaderboard');
		} catch (e) {
			// setError(res.message);
			setError(e.response.data.message);
			setIsLoading(false);
		}
	};
	return (
		<div className="card">
			<h1>Astrals Twitter Giveaway Tool</h1>
			<div className="content">
				<p>
					Add tweet links to include them in the giveaway. Keep in mind the
					tweets should not be more than a week old.
				</p>
				<h2>Add tweets</h2>
				<form
					name="giveaway-tweets"
					encType="multipart/form-data"
					onSubmit={submitForm}
				>
					<ul className="tweet-list">
						{giveawayTweets.map((t, i) => (
							<TweetLink
								name={`tweet-${t.index}`}
								remove={remove}
								key={t.index}
								index={t.index}
							/>
						))}
						{giveawayTweets.length <= 6 && (
							<li className="more">
								<svg
									onClick={() => addTweet()}
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth={2}
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							</li>
						)}
					</ul>
					<h2>Attach your previous scores</h2>
					<input type="file" name="prev-scores" />
					{error && (
						<span style={{ display: 'block', marginTop: '8px', color: '#F00' }}>
							{error}
						</span>
					)}
					{isLoading && (
						<span>
							Estimated total time {giveawayTweets.length * 3 + 3} seconds
						</span>
					)}
					<div className="box">
						<LoadingButton
							size="large"
							variant="outlined"
							type="submit"
							loading={isLoading}
						>
							Lets Go!
						</LoadingButton>
					</div>
				</form>
			</div>
		</div>
	);
};

export default TweetSubmit;
