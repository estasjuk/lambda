const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../helpers/handleMongooseError');

const shortUrlSchema = new Schema({
  full: {
    type: String,
    required: true
  },
  short: {
    type: String,
    required: true,
  },
})

shortUrlSchema.post('save', handleMongooseError);
const ShortUrl = model('shorturl', shortUrlSchema);

module.exports = {
    ShortUrl,
};