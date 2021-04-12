import React, { useState, useEffect } from 'react';
import { getResults, getLeagues, getTeams, getH2hResult } from '../apiMethods';
import { prediction } from '../util/utilFunction';
import Result from './Sub-component/Result';
import Layout from './Layout';

const H2H = () => {
	const [values, setValues] = useState({
		country: [],
		leagues: [],
		teamA: [],
		teamB: [],
		teamConst: [],
		result: [],
		countryId: '',
		leagueSelect: '',
		teamSelectA: '',
		teamSelectB: '',
		error: '',
		loading: false,
	});

	const {
		country,
		countryId,
		leagues,
		teamA,
		teamB,
		error,
		loading,
		leagueSelect,
		teamSelectA,
		teamSelectB,
		teamConst,
		result,
	} = values;

	const loadResults = () => {
		getResults().then((data) => {
			console.log(data);
			if (data.error) {
				setValues({
					...values,
					error: data.error,
				});
			} else {
				setValues({
					...values,
					country: data,
				});
				console.log(data.league);
			}
		});
	};

	useEffect(() => {
		loadResults();
	}, []);

	// spliceFunction set a new array with teams not including the teams selected in either inputs
	const spliceFunction = (spliceN, name) => {
		let newArr = teamA.map((a) => a.team_name);
		let newArr2 = teamB.map((a) => a.team_name);
		if (newArr.includes(spliceN) && name === 'teamSelectA') {
			let newTeamB = teamConst.filter((a) => a.team_name !== spliceN);
			setValues({
				...values,
				teamB: newTeamB,
				result: [],
				teamSelectA: spliceN,
				error: '',
			});
		} else if (newArr2.includes(spliceN) && name === 'teamSelectB') {
			let newTeamA = teamConst.filter((a) => a.team_name !== spliceN);
			setValues({
				...values,
				teamA: newTeamA,
				result: [],
				teamSelectB: spliceN,
				error: '',
			});
		}
	};

	const handleCountry = (e) => {
		setValues({ ...values, loading: true, error: '' });
		getLeagues({
			countryId: e.target.value,
		}).then((data) => {
			console.log(data);
			if (data.error) {
				setValues({
					...values,
					loading: false,
					error: data.error,
				});
			} else {
				setValues({
					...values,
					countryId: e.target.value,
					error: '',
					loading: false,
					leagues: data,
				});
			}
		});
	};

	const handleLeague = (e) => {
		setValues({ ...values, loading: true, error: '' });
		getTeams({
			leagueSelect: e.target.value,
		}).then((data) => {
			console.log(data);
			if (data.error) {
				setValues({
					...values,
					loading: false,
					error: data.error,
				});
			} else {
				setValues({
					...values,
					loading: false,
					leagueSelect: e.target.value,
					error: '',
					teamA: data,
					teamB: data,
					teamConst: data,
				});
			}
		});
	};

	const handleTeams = (name) => (event) => {
		setValues({
			...values,
			[name]: event.target.value,
			result: [],
			error: '',
		});
		spliceFunction(event.target.value, name);
	};

	const handleSubmit = (e) => {
		setValues({ ...values, loading: true, error: '' });
		getH2hResult({
			teamSelectA,
			teamSelectB,
		}).then((data) => {
			if (data.error) {
				setValues({
					...values,
					loading: false,
					error: data.message,
				});
			} else {
				setValues({
					...values,
					loading: false,
					result: data.firstTeam_lastResults,
				});
			}
		});
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

	const predictionMsg = () =>
		result.length > 1 && (
			<div className="msg">
				<div className="alert alert-warning error">
					<p>
						<i style={{ marginRight: '3px' }} class="fas fa-exclamation-triangle"></i>
						{prediction(result, teamSelectA)}
					</p>
				</div>
			</div>
		);

	const H2H = () => {
		return (
			<div>
				{isLoading()}
				{errorMsg()}
				{predictionMsg()}
				<section class="main-section">
					<form className="main-div" onSubmit={handleSubmit}>
						<div class="select-league">
							<select class="browser-default custom-select country-select" onChange={handleCountry}>
								<option>Select Country</option>
								{country &&
									country.map((a, i) => (
										<option
											selected={a.country_id === countryId ? true : false}
											key={i}
											value={a.country_id}
										>
											{a.country_name}
										</option>
									))}
							</select>
							<select class="browser-default custom-select league-select" onChange={handleLeague}>
								<option>Select League</option>
								{leagues.map((a, i) => (
									<option
										selected={a.league_id === leagueSelect ? true : false}
										key={i}
										value={a.league_id}
									>
										{a.league_name}
									</option>
								))}
							</select>
						</div>

						<div class="input-area">
							<select class="browser-default custom-select select-league-name" onChange={handleTeams('teamSelectA')}>
								<option>Select Team</option>
								{teamA.map((a, i) => (
									<option
										selected={a.team_name === teamSelectA ? true : false}
										key={i}
										value={a.team_name}
									>
										{a.team_name}
									</option>
								))}
							</select>
							<select class="browser-default custom-select select-league-name" onChange={handleTeams('teamSelectB')}>
								<option>Select Team</option>
								{teamB.map((a, i) => (
									<option
										selected={a.team_name === teamSelectB ? true : false}
										key={i}
										value={a.team_name}
									>
										{a.team_name}
									</option>
								))}
							</select>
							<button class="btn btn-outline-success" type="submit" name="button">
								Submit
							</button>
						</div>
					</form>

					<section class="result-section">
						<Result results={result} />
					</section>
				</section>
			</div>
		);
	};

	return (
		<Layout>
			<H2H />
		</Layout>
	);
};

export default H2H;
