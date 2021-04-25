function getTeamsList(filedata) {
    const dummyTeam1 = []
    const dummyTeam2 = []

    filedata.innings[0]['1st innings'].deliveries.forEach((ball, index) => {
        let value = Object.values(ball)
        dummyTeam1.push(value[0].batsman)
        dummyTeam1.push(value[0].non_striker)
        dummyTeam2.push(value[0].bowler)
    })

    filedata.innings[1]['2nd innings'].deliveries.forEach((ball, index) => {
        let value = Object.values(ball)
        dummyTeam2.push(value[0].batsman)
        dummyTeam2.push(value[0].non_striker)
        dummyTeam1.push(value[0].bowler)
    })

    const team1 = [...new Set(dummyTeam1)];
    const team2 = [...new Set(dummyTeam2)]

    return { team1, team2 }

}

module.exports = { getTeamsList }