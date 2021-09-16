const express = require("express");
const router = express.Router();

let teamArray = [
    {id:1, teamName: 'tsm'},
    {id:2, teamName: 'nrg'},
    {id:3, teamName: 'cloud9'},
    {id:5, teamName: 'liquid'}];

router.get('/', function  (req, res){
    // res.render('index')
    // teamArray.forEach((team) =>{
    //     if(team.teamName === req.query.team){
    //         return res.json(team)
    //     }
    // })
    // // res.json(teamArray)
    // res.send('No team! Check yourself highspeed.')
    let foundTeam = null;
    if(Object.keys(req.query).length === 0){
        res.json(teamArray)
    }
    else{
        teamArray.forEach((team) =>{
            if(team.teamName === req.query.team){
                foundTeam = team
            }
        });
        if(foundTeam){
            return res.json({foundTeam})
        }
        res.send("check your input!")
    }
})

router.get('/get-team-by-id/:id', function(req, res){
    // return res.json(teamArray[req.params.id])
    // for(let team in teamArray){
    //     if (teamArray[team].id === req.params.id){
    //         return res.json(teamArray[team])
    //     }
    // }
    let foundTeam;

    teamArray.forEach((team) => {
        if(team.id === Number(req.params.id)){
            foundTeam = team
            return res.json(foundTeam)
        }
    })
    if(!foundTeam){
        res.send('no  team')
    }
})

router.get('/get-team-by-name/:name', function(req, res){
    for(let team in teamArray){
        if (teamArray[team].teamName === req.params.name.toLocaleLowerCase()){
            return res.json(teamArray[team])
        }
    }
    res.send(`no team ${req.params.name}`)
})

router.put('/edit-team-by-name/:team',function(req, res){
    let foundTeam;
    teamArray.forEach((team) =>{
        if(team.teamName === req.params.team){
            team.teamName = req.query.name
            foundTeam = team
            return res.json({updatedTeam: team, allTeams: teamArray})
        }
    })
    if(!foundTeam){
        res.send('check you input!')
    }
    
})

router.delete('/delete-by-name/:name', function(req, res){
    let foundTeam;
    teamArray.forEach((team) =>{
        if(team.teamName === req.params.name){
            foundTeam = team
            teamArray.splice(teamArray.indexOf(team),1)
            return res.json(teamArray)
        }
    })
    if(!foundTeam){
        res.send('check you input!')
    }
})

router.post('/', function  (req, res){
    console.log(req.body)
    teamArray.push(req.body)
    // res.send('Post Path')
    res.json({team: teamArray})
})

module.exports = router;