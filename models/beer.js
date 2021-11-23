import mongoose from 'mongoose';

const beerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  origin: {
    type: String,
    required: true,
  },
  alcoholContent: {
    type: String,
    required: true,
  },
  fermentationType: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  malts: {
    type: [String],
    required: true,
  },
  hops: {
    type: [String],
    required: true,
  },
  ibu: {
    type: Number,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
});

beerSchema.path('website').validate((val) => {
  const urlRegex =
    /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
  return urlRegex.test(val);
}, 'Invalid URL.');

export default mongoose.model('Beer', beerSchema);
