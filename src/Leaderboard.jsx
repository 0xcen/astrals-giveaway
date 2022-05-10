import React, { useRef, useState, useEffect } from 'react';
// import data from '../testData';
import * as htmlToImage from 'html-to-image';

import astralsLogo from '../img/astrals-white.png';
import astralsA from '../img/astrals-a.png';

import LeaderboardItem from './LeaderboardItem';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Leaderboard = () => {
	const myNode = useRef(null);
	const nav = useNavigate();
	const [data, setData] = useState([]);

	const download = (source) => {
		const fileName = Date.now() + ' Leaderboard.jpg';
		var el = document.createElement('a');
		el.setAttribute('href', source);
		el.setAttribute('download', fileName);
		document.body.appendChild(el);
		el.click();
		el.remove();
	};

	const handleDownload = () => {
		if (!myNode.current) return;
		htmlToImage
			.toPng(myNode.current)
			.then(function (dataUrl) {
				const img = new Image();
				img.src = dataUrl;
				download(img.src);
			})
			.catch(function (error) {
				console.error('oops, something went wrong!', error);
			});
	};

	useEffect(() => {
		if (!localStorage.getItem('data')) return nav('/');
		setData(JSON.parse(localStorage.getItem('data')));
	}, []);
	return (
		<div className="leaderboard-container">
			<div className="leaderboard" ref={myNode}>
				<div className="bg"></div>
				<div className="card">
					<img src={astralsLogo} className="logo" alt="" />
					<h1>TWITTER RAID LEADERBOARD</h1>
					<ul className="leaderboard-list">
						{data.length > 0 &&
							data.map((e, i) => {
								return <LeaderboardItem {...e} i={i + 1} />;
							})}
					</ul>
					<img src={astralsA} className="fav" alt="" />
				</div>
			</div>
			<div className="box">
				<Button
					variant="outlined"
					style={{ marginRight: '3rem' }}
					onClick={() => nav('/new-giveaway')}
				>
					{' '}
					Back{' '}
				</Button>{' '}
				<Button variant="outlined" onClick={handleDownload}>
					{' '}
					Save{' '}
				</Button>{' '}
			</div>
		</div>
	);
};

export default Leaderboard;
