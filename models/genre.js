const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GenreSchema = new Schema({
  name: { type: String, required: true, minLength: 2, maxLength: 100 },
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
})

GenreSchema.virtual('url').get(function () {
  return `/catalog/genre/${this._id}`
})

module.exports = mongoose.model('Genre', GenreSchema);