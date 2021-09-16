const express = require("express");
const logger = require("morgan")
const path = require('path');
const { Stream } = require("stream");
const teamRouter = require("./routes/teamRouter")

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs")

app.use(express.static(path.join(__dirname, "public")))

const PORT = process.env.PORT || 3000;  // process.env node environment variable, if env doesnt exist it will run on specified prort

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.use("/api/team", teamRouter)

app.listen(PORT, function(){
    console.log(`Server is now running on ${PORT}`);
})
