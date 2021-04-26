import React from 'react';

const AutoCompleteSearch = ({ autoSuggest, teamNames }) => {
	return (
		<div className="overflow-auto bg-light">
			{teamNames.map((teamName) => {
				return <li onClick={(e) => autoSuggest(e.target.textContent)}>{teamName}</li>;
			})}
		</div>
	);
};

export default AutoCompleteSearch;
