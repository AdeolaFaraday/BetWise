//project is subjected towards future code refactoring, other current external helper function will be moved here.


export const prediction = (arr, teamSelectA) => {
    let drawArr = arr.filter((a) => a.match_hometeam_score == a.match_awayteam_score)
    let homeArr = arr.filter((a) => a.match_hometeam_name == teamSelectA)
    let fArr = arr.filter((a) => a.match_awayteam_name == teamSelectA && a.match_awayteam_score > a.match_hometeam_score)
    let sArr = arr.filter((a) => a.match_hometeam_name == teamSelectA && a.match_hometeam_score > a.match_awayteam_score)
    let newArr = [...fArr, ...sArr]
    return `${teamSelectA} has won ${newArr.length / arr.length * 100}% i.e ${newArr.length} of the last ${arr.length} matches &
    ${sArr.length / homeArr.length * 100}% i.e ${sArr.length} of their last ${homeArr.length} home matches, also drew ${drawArr.length} of their last ${arr.length} matches
    `
  }