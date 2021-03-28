const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Teams = new Schema({
  team_ep_rank: {
    type: Number,
  },
  team_league_rank: {
    type: Number,
  },
  team_name: {
    type: String,
  },
  team_win: {
    type: Number,
  },
  team_loss: {
    type: Number,
  },
  team_streak: {
    type: String,
  },
});

module.exports = mongoose.model("Teams", Teams);
