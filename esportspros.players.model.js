const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Players = new Schema({
  player_ep_rank: {
    type: Number,
  },
  player_name: {
    type: String,
  },
  player_position: {
    type: String,
  },
  player_team: {
    type: String,
  },
  player_elims: {
    type: Number,
  },
  player_healing: {
    type: Number,
  },
  player_deaths: {
    type: Number,
  },
  player_risk: {
    type: String,
  },
});

module.exports = mongoose.model("Players", Players);
