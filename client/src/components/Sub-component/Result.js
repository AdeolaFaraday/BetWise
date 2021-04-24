import React from 'react';

const Result = ({ results }) => {
	const resultColorA = (a, b) => {
		if (a > b) {
			return 'green';
		} else if (a < b) {
			return 'red';
		} else {
			return;
		}
	};

	const resultColorB = (a, b) => {
		if (b > a) {
			return 'green';
		} else if (a > b) {
			return 'red';
		} else {
			return;
		}
	};

	return (
		<section>
			<div>
				{results.map((a, i) => (
					<div class="result">
						<p style={{ color: resultColorA(a.match_hometeam_score, a.match_awayteam_score) }} class="team">
							{a.match_hometeam_name}
						</p>
						<p>{a.match_hometeam_score}</p>-<p>{a.match_awayteam_score}</p>
						<p style={{ color: resultColorB(a.match_hometeam_score, a.match_awayteam_score) }} class="team">
							{a.match_awayteam_name}
						</p>
					</div>
				))}
			</div>
		</section>
	);
};

export default Result;
