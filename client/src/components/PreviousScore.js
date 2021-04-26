import React, { useState, useEffect } from 'react';
import { getH2hResult } from '../apiMethods';
import { prediction } from '../util/utilFunction';
import Layout from './Layout';
import Result from './Sub-component/Result';
import { exportedTeamsArray } from './Sub-component/teamArray';
import AutoCompleteSearch from './Sub-component/AutoCompleteSearch';

const PreviousScore = () => {
	const [values, setValues] = useState({
		teamName: '',
		teamsArr: exportedTeamsArray,
		result: [],
		error: '',
		loading: false,
		isModal: true,
	});

	const [suggestedTeams, setSuggestedTeams] = useState([]);

	const { teamName, teamsArr, result, error, loading, isModal } = values;

	const handleChange = (event) => {
		setValues({
			...values,
			teamName: event.target.value,
			result: [],
			error: '',
		});
		getAutoSuggestNames(event.target.value);
	};

	const handleSubmit = (e) => {
		console.log(e.target.value);
		e.preventDefault();
		setValues({ ...values, loading: true, error: '' });
		getH2hResult({
			teamSelectA: teamName,
			teamSelectB: 'Liverpool',
		}).then((data) => {
			console.log(data);
			if (data.error) {
				setValues({
					...values,
					error: data.message,
					loading: false,
				});
			} else {
				setValues({
					...values,
					loading: false,
					result: data.firstTeam_lastResults,
					isModal: false,
				});
			}
		});
	};

	const getAutoSuggestNames = (teamName) => {
		const matchedTeamNames = teamsArr.filter((t) => {
			return t == t.match(new RegExp(`^${teamName}.*`, 'i'));
		});
		setSuggestedTeams(matchedTeamNames);
	};

	const errorMsg = () =>
		error && (
			<div className="msg">
				<div className="alert alert-danger error">
					{' '}
					<p> {error} </p>
				</div>
			</div>
		);

	const predictionMsg = () =>
		result.length > 1 && (
			<div className="msg">
				<div className="alert alert-warning error">
					<p>
						<i style={{ marginRight: '3px' }} class="fas fa-exclamation-triangle"></i>
						{prediction(result, teamName)}
					</p>
				</div>
			</div>
		);

	const isLoading = () =>
		loading && (
			<div className="msg">
				<div className="loading">
					<button class="btn btn-primary" type="button" disabled>
						<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
						<span class="sr-only">Loading...</span>
					</button>
					<button class="btn btn-primary" type="button" disabled>
						<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
						Loading...
					</button>
				</div>
			</div>
		);

	const passAutoSuggest = (teamName) => {
		console.log(teamName);
		setValues({
			...values,
			teamName,
			result: [],
			error: '',
		});
	};

	const Previous = () => {
		return (
			<div>
				{isLoading()}
				{errorMsg()}
				{predictionMsg()}
				{isModal && (
					<form onSubmit={handleSubmit}>
						<div class="wrapper">
							<div class="search-input">
								{/* <a href="" target="_blank" hidden></a> */}
								<input
									type="text"
									autoFocus
									onChange={handleChange}
									placeholder="Search for teams last results"
									value={teamName}
								/>
								<div class="autocom-box">
									{suggestedTeams.length > 0 && teamName != '' && (
										<AutoCompleteSearch autoSuggest={passAutoSuggest} teamNames={suggestedTeams} />
									)}
								</div>
								<div class="icon">
									<button class="btn btn-outline-success btn-sm" type="submit">
										Search
									</button>
								</div>
							</div>
						</div>
					</form>
				)}

				<section class="result-section">
					{result.length > 0 && (
						<div
							className="msg error"
							style={{ fontWeight: 'bold' }}
							onClick={() =>
								setValues({ ...values, isModal: true, loading: false, error: '', result: [] })
							}
						>
							Retry
						</div>
					)}
					<Result results={result} />
				</section>
			</div>
		);
	};

	return <Layout>{Previous()}</Layout>;
};

export default PreviousScore;
