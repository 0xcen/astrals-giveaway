import React from 'react';
import comment from '../img/comment.svg';
import heart from '../img/heart.svg';
import tag from '../img/tag.svg';
import options from '../img/options.svg';

const LeaderboardItem = ({
	liked,
	quoted,
	retweeted,
	tagged,
	username,
	points,
	commented,
	i,
}) => {
	return (
		<li className="leaderboard-item" key={i}>
			<span className="number">{i}</span>
			<span className="handle">{username}</span>
			<div className="points-wrapper">
				<div className="points-breakdown">
					<img src={comment} alt="" />
					<span>{commented.count}</span>
				</div>
				<div className="points-breakdown">
					<div className="tag">
						<img src={tag} alt="" />
					</div>
					<span>{tagged}</span>
				</div>
				<div className="points-breakdown">
					<img src={heart} alt="" />
					<span>{liked}</span>
				</div>
				<div className="points-breakdown">
					<img src={options} alt="" />
					<span>{quoted + retweeted}</span>
				</div>
				<div className="points-breakdown">
					<span>→</span>
					<span>{points}</span>
				</div>
			</div>
		</li>
	);
};

export default LeaderboardItem;
