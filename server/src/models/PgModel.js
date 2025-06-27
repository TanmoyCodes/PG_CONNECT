// server/models/pgModel.js
const mongoose = require('mongoose');

const pgSchema = new mongoose.Schema({
  id_room: Number,
  name: String,
  images: [String],
  area: String,
  location: String,
  rent: Number,
  seater: String,
  gender: String,
  isFeatured: Boolean,
  soldOut: Boolean,
  amenities: Object,
  whatsIncluded: Object,
  floor: Number,
  roomNo: Number,
  distanceFromAuto: Number,
  distanceFromCollege: Number,
  electricityPerUnit: Number,
  isCoupleFriendly: Boolean,
  isInternationalFriendly: Boolean,
  isPetFriendly: Boolean,
  ownerName: String,
  ownerNumber: String,
  caretakerName: String,
  caretakerNumber: String,
  description: String,
  note: String,
  isPublished: Boolean,
  houseRules: Object,
  listingDate: Date,
  listedBy: String,
  commission: Number
});

module.exports = mongoose.model('PG', pgSchema);
