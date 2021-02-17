//project is subjected towards future code refactoring, other current external helper function will be moved here.


export const prediction = (arr, teamSelectA) => {
    const toUpper = teamName => teamName.charAt(0).toUpperCase() + teamName.substr(1).toLowerCase()

    const drawRecord = arr.filter((a) => a.match_hometeam_score == a.match_awayteam_score)
    const homeMatches = arr.filter((a) => a.match_hometeam_name == toUpper(teamSelectA))
    const homeRecordWin = arr.filter((a) => a.match_awayteam_name == toUpper(teamSelectA) && a.match_awayteam_score > a.match_hometeam_score)
    const awayRecordWin = arr.filter((a) => a.match_hometeam_name == toUpper(teamSelectA) && a.match_hometeam_score > a.match_awayteam_score)
    const newArr = [...homeRecordWin, ...awayRecordWin]
    const percentTotalWin = (newArr.length / arr.length).toFixed(2) * 100
    const percentHomeWin = awayRecordWin.length / homeMatches.length * 100
    return `${teamSelectA} has won ${percentTotalWin}% i.e ${newArr.length} of the last ${arr.length} matches &
    ${percentHomeWin}% i.e ${awayRecordWin.length} of their last ${homeMatches.length} home matches, also drew ${drawRecord.length} of their last ${arr.length} matches
    `
  }