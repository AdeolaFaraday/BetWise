//project is subjected towards future code refactoring, other current external helper function will be moved here.

export const prediction = (arr, teamSelectA) => {
  const drawRecord = arr.filter(
    (a) => a.match_hometeam_score == a.match_awayteam_score
  );
  const homeMatches = arr.filter(
    (a) => a.match_hometeam_name.toLowerCase() == teamSelectA.toLowerCase()
  );
  const homeRecordWin = arr.filter(
    (a) =>
      a.match_awayteam_name.toLowerCase() == teamSelectA.toLowerCase() &&
      a.match_awayteam_score > a.match_hometeam_score
  );
  const awayRecordWin = arr.filter(
    (a) =>
      a.match_hometeam_name.toLowerCase() == teamSelectA.toLowerCase() &&
      a.match_hometeam_score > a.match_awayteam_score
  );
  const newArr = [...homeRecordWin, ...awayRecordWin];
  const lostRecord = (arr.length - (newArr.length + drawRecord.length)) * 10
  const percentTotalWin = (newArr.length / arr.length).toFixed(2) * 100;
  const percentHomeWin =
    (awayRecordWin.length / homeMatches.length).toFixed(2) * 100;
  return `${teamSelectA} has won ${percentTotalWin}% i.e ${newArr.length} of the last ${arr.length} matches & lost ${lostRecord}% overall, also won
  ${percentHomeWin}% i.e ${awayRecordWin.length} of their last ${homeMatches.length} home matches, also drew ${drawRecord.length} of their last ${arr.length} matches
  `;
};
