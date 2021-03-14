const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Players = new Schema({
  player_name: {
    type: String,
  },
  player_position: {
    type: String,
  },
  player_age: {
    type: Number,
  },
  player_team: {
    type: String,
  },
  player_ep_rank: {
    type: Number,
  },
  player_in_game_rank: {
    type: Number,
  },
  player_consistency_rating: {
    type: Number,
  },
  player_risk: {
    type: String,
  },
});

module.exports = mongoose.model("Players", Players);
