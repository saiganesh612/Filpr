const express = require("express");
const router = express.Router();
const fse = require("fs-extra");
const path = require("path");
const { getExcelData } = require("../utils/excelData")
const { getTeamsList } = require("../utils/teams");

// Will get the path of json files directory
const filesPath = path.join(path.dirname(__dirname), 'utils', 'JsonFiles');

const excelData = getExcelData()

router.get("/fantasy-match", (req, res) => {

    fse.readdir(filesPath, (err, files) => {
        if (err) return console.log(`Unable to scan directory ${err}`);
        let randIndex = Math.floor(Math.random() * (files.length + 1));
        let randomFile = files[randIndex]

        res.render("details/match", { matchId: randomFile.replace('.json', '')})
    })
})

router.get("/fantasy-match/:id", (req, res) => {
    const {id} = req.params;

    let randomFilePath = path.join(filesPath, `${id}.json`);

    let rawdata = fse.readFileSync(randomFilePath)
    let filedata = JSON.parse(rawdata)

    const { team1, team2 } = getTeamsList(filedata)
    res.render("details/fantasy", { team1, team2, teams: filedata.info.teams, credits: excelData })
})

module.exports = router
