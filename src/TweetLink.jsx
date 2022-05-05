import React, { useState } from 'react';
import { TextField } from '@mui/material';

import twitterIcon from './twitter-white.svg';

const TweetLink = ({ remove, index }) => {
	const [val, setVal] = useState('');

	return (
		<li className="tweet-link">
			<img src={twitterIcon} alt="" className="twitter-logo" />
			<TextField
				name={`tweet-${index}`}
				label="Tweet"
				placeholder="https://twitter.com/SolanaEthan/status/1521628520073596928"
				color="primary"
				inputProps={{
					style: {
						fontSize: '1.8rem',
					},
				}}
				InputLabelProps={{
					style: {
						fontSize: '1.8rem',
					},
				}}
				fullWidth
				value={val}
				onChange={(e) => setVal(e.target.value)}
			/>
			<svg
				onClick={() => remove(index)}
				xmlns="http://www.w3.org/2000/svg"
				className="close"
				viewBox="0 0 20 20"
				fill="currentColor"
			>
				<path
					fillRule="evenodd"
					d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
					clipRule="evenodd"
				/>
			</svg>
		</li>
	);
};

export default TweetLink;
