import React from 'react';

const AutoCompleteSearch = ({ teamNames }) => {
	return (
		<div  className="overflow-auto bg-light">
			{teamNames.map((teamName) => {
				return (<div  className="result">{teamName}</div>)
			})}
		</div>
	);
};

export default AutoCompleteSearch;
