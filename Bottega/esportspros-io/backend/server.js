const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const playersRoutes = express.Router();
const PORT = 4000;

let Players = require('./esportspros.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/esportspros', { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB batabase connection established successfully!");
})

playersRoutes.route('/').get(function(req, res) {
    Players.find(function(err, players) {
        if (err) {
            console.log(err);
        } else {
            res.json(players);
        }
    });
});

playersRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Players.findById(id, function(err, players) {
        res.json(players);
    });
});

playersRoutes.route('/add').post(function(req, res) {
    let player = new Players(req.body);
    player.save()
           .then(player => {
               res.status(200).json({ player: 'Player added successfully'});
           })
           .catch(err => {
               res.status(400).send('Adding new player failed!');
           });
});

playersRoutes.route('/update/:id').post(function(req, res) {
    Players.findById(req.params.id, function(err, player) {
        if (!player)
            res.status(404).send('data is not found');
        else
            player.player_name = req.body.player_name;
            player.player_position = req.body.player_position;
            player.player_age = req.body.player_age;
            player.player_team = req.body.player_team;
            player.player_ep_rank = req.body.player_ep_rank;
            player.player_in_game_rank = req.body.player_in_game_rank;
            player.player_consistency_rating = req.body.player_consistency_rating;
            player.player_risk = req.body.player_risk;

            player.save().then(player => {
                res.json('Player updated.');
            })
            .catch(err => {
                res.status(400).send("Update not possilbe");
            });
            
    });
});

app.use('/Players', playersRoutes);

app.listen(PORT, function() {
    console.log("Server is runnng on Port " + PORT);
});