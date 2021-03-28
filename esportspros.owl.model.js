const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let Owl2020 = new Schema({
  start_time: {
    type: String,
  },
  esports_match_id: {
    type: Number,
  },
  tournament_title: {
    type: String,
  },
  map_type: {
    type: String,
  },
  map_name: {
    type: String,
  },
  player_name: {
    type: String,
  },
  team_name: {
    type: String,
  },
  stat_name: {
    type: String,
  },
  hero_name: {
    type: String,
  },
  stat_amount: {
    type: Number,
  },
});

module.exports = mongoose.model("Owl2020", Owl2020);
