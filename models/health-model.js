const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const healthSchema  = new Schema({
  question: Number,
  score: Number,
  owner: {type: Schema.Types.ObjectId, ref: 'User'}
});

const Health  = mongoose.model('Health', healthSchema);

module.exports  = Health;