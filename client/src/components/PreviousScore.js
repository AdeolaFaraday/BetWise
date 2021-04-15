import React, { useState, useEffect } from 'react';
import { getH2hResult } from '../apiMethods';
import { prediction } from '../util/utilFunction';
import Layout from './Layout';
import Result from './Sub-component/Result';
import AutoCompleteSearch from './Sub-component/AutoCompleteSearch';

const PreviousScore = () => {
	const [values, setValues] = useState({
		teamName: '',
		result: [],
		error: '',
		loading: false,
	});

	const { teamName, result, error, loading } = values;

	const handleChange = (event) => {
		setValues({
			...values,
			teamName: event.target.value,
			result: [],
			error: '',
		});
	};

	const handleSubmit = (e) => {
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

	const Previous = () => {
		return (
			<div>
				{isLoading()}
				{errorMsg()}
				{predictionMsg()}
				<section class="main-section">
					<form className="main-div">
						<div className="input-div">
							<input
								type="text"
								className="browser-default custom-select league-select"
								autoFocus
								onChange={handleChange}
								placeholder="Search for teams last results"
								value={teamName}
							/>
							<button
								class="btn btn-outline-success responsive"
								onClick={handleSubmit}
								type="submit"
								name="button"
							>
								Submit
							</button>
							<AutoCompleteSearch teamNames={[]} />
						</div>
					</form>
				</section>

				<section class="result-section">
					<Result results={result} />
				</section>
			</div>
		);
	};

	return <Layout>{Previous()}</Layout>;
};

export default PreviousScore;
