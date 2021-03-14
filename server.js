const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
var session = require("express-session");
var flash = require("connect-flash");
const mongoose = require("mongoose");
const playersRoutes = express.Router();
const teamsRoutes = express.Router();
const PORT = 4000;

let Players = require("./esportspros.players.model");
let Teams = require("./esportspros.teams.model");

app.use(cors());
app.use(bodyParser.json());
app.use(
  session({
    cookie: { maxAge: 60000 },

    secret: "secret",

    resave: false,

    saveUninitialized: false,
  })
);

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://127.0.0.1:27017/esportspros", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;

connection.once("open", function () {
  console.log("MongoDB batabase connection established successfully!");
});

//End Points for Players
playersRoutes.route("/").get(function (req, res) {
  Players.find(function (err, players) {
    if (err) {
      console.log(err);
    } else {
      res.json(players);
    }
  });
});

playersRoutes.route("/:id").get(function (req, res) {
  let id = req.params.id;
  Players.findById(id, function (err, players) {
    res.json(players);
  });
});

playersRoutes.route("/add").post(function (req, res) {
  let player = new Players(req.body);
  player
    .save()
    .then((player) => {
      res.status(200).json({ player: "Player added successfully" });
    })
    .catch((err) => {
      res.status(400).send("Adding new player failed!");
    });
});

playersRoutes.route("/update/:id").post(function (req, res) {
  Players.findById(req.params.id, function (err, player) {
    if (!player) res.status(404).send("data is not found");
    else player.player_name = req.body.player_name;
    player.player_position = req.body.player_position;
    player.player_age = req.body.player_age;
    player.player_team = req.body.player_team;
    player.player_ep_rank = req.body.player_ep_rank;
    player.player_in_game_rank = req.body.player_in_game_rank;
    player.player_consistency_rating = req.body.player_consistency_rating;
    player.player_risk = req.body.player_risk;

    player
      .save()
      .then((player) => {
        res.json("Player updated.");
      })
      .catch((err) => {
        res.status(400).send("Update not possilbe");
      });
  });
});

//End Points for Teams
teamsRoutes.route("/").get(function (req, res) {
  Teams.find(function (err, teams) {
    if (err) {
      console.log(err);
    } else {
      res.json(teams);
    }
  });
});

teamsRoutes.route("/:id").get(function (req, res) {
  let id = req.params.id;
  Teams.findById(id, function (err, teams) {
    res.json(teams);
  });
});

teamsRoutes.route("/add").post(function (req, res) {
  let team = new Teams(req.body);
  team
    .save()
    .then((team) => {
      res.status(200).json({ team: "Team added successfully" });
    })
    .catch((err) => {
      res.status(400).send("Adding new team failed!");
    });
});

teamsRoutes.route("/update/:id").post(function (req, res) {
  Teams.findById(req.params.id, function (err, team) {
    if (!team) res.status(404).send("data is not found");
    else team.team_name = req.body.team_name;
    team.team_league_rank = req.body.team_league_rank;
    team.team_ep_rank = req.body.team_ep_rank;
    team.team_win_loss = req.body.team_win_loss;

    team
      .save()
      .then((team) => {
        res.json("Team updated.");
      })
      .catch((err) => {
        res.status(400).send("Update not possilbe");
      });
  });
});

app.use("/Players", playersRoutes);
app.use("/Teams", teamsRoutes);

app.listen(PORT, function () {
  console.log("Server is runnng on Port " + PORT);
});
