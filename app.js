const express = require("express");
const logger = require("morgan")
const path = require('path');
const { Stream } = require("stream");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs")

app.use(express.static(path.join(__dirname, "public")))

const PORT = process.env.PORT || 3000;  // process.env node environment variable, if env doesnt exist it will run on specified prort

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({extended : false}))

let teamArray = [
    {id:1, teamName: 'tsm'},
    {id:2, teamName: 'nrg'},
    {id:3, teamName: 'cloud9'},
    {id:5, teamName: 'liquid'}];

app.get('/', function  (req, res){
    res.render('index')
})

app.get('/get-team-by-id/:id', function(req, res){
    // return res.json(teamArray[req.params.id])
    // for(let team in teamArray){
    //     if (teamArray[team].id === req.params.id){
    //         return res.json(teamArray[team])
    //     }
    // }
    let foundTeam;

    teamArray.forEach((team) => {
        if(team.id === +req.params.id){
            foundTeam = team
        }
        else{
            foundTeam = 'no team'
            return res.send(
                'no  team'
            )
        }
    })
    res.json(foundTeam)
})

app.get('/get-team-by-name/:name', function(req, res){
    for(let team in teamArray){
        if (teamArray[team].teamName === req.params.name){
            return res.json(teamArray[team])
        }
    }
    res.send(`no team ${req.params.name}`)
})

app.post('/', function  (req, res){
    console.log(req.body)
    teamArray.push(req.body)
    // res.send('Post Path')
    res.json({team: teamArray})
})

app.listen(PORT, function(){
    console.log(`Server is now running on ${PORT}`);
})
