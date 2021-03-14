const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Teams = new Schema({
  team_name: {
    type: String,
  },
  team_league_rank: {
    type: String,
  },
  team_ep_rank: {
    type: Number,
  },
  team_win: {
    type: String,
  },
  team_loss: {
    type: String,
  },
  team_streak: {
    type: String,
  },
});

module.exports = mongoose.model("Teams", Teams);
