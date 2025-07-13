const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const pgSchema = new mongoose.Schema({
  id_room: Number, // Auto-incremented
  name: { type: String, required: true },
  images: { type: [String], default: [] },
  securityAmount:Number,
  area: String,
  location: String,
  rent: Number,
  seater: String,
  gender: String,
  isFeatured: { type: Boolean, default: false },
  soldOut: { type: Boolean, default: false },

  // ✅ Use Mixed or Map instead of generic Object
  amenities: { type: mongoose.Schema.Types.Mixed, default: {} },
  whatsIncluded: { type: mongoose.Schema.Types.Mixed, default: {} },
  houseRules: { type: mongoose.Schema.Types.Mixed, default: {} },

  floor: Number,
  roomNo: Number,
  distanceFromAuto: Number,
  distanceFromCollege: Number,
  electricityPerUnit: Number,

  isInternationalFriendly: { type: Boolean, default: false },
  isPetFriendly: { type: Boolean, default: false },

  ownerName: String,
  ownerNumber: String,
  caretakerName: String,
  caretakerNumber: String,

  description: String,
  note: String,
  isPublished: { type: Boolean, default: false },

  listingDate: { type: Date, default: Date.now },
  listedBy: String,
  commission: Number,
});

// 🔁 Auto-increment id_room
pgSchema.plugin(AutoIncrement, { inc_field: 'id_room' });

module.exports = mongoose.model('PG', pgSchema);




// ----------------------schema with validation------------------------------------

// server/models/pgModel.js
// const mongoose = require('mongoose');
// const AutoIncrement = require('mongoose-sequence')(mongoose);

// const pgSchema = new mongoose.Schema({
//   id_room: {
//     type: Number,
//     unique: true
//     // Auto-incremented using plugin
//   },
//   name: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   images: {
//     type: [String],
//     required: true,
//     validate: [array => array.length > 0, 'At least one image is required.']
//   },
//   area: {
//     type: String,
//     required: true
//   },
//   location: {
//     type: String,
//     required: true
//   },
//   rent: {
//     type: Number,
//     required: true,
//     min: [0, 'Rent must be a positive number']
//   },
//   seater: {
//     type: String,
//     required: true,
//     enum: ['Single', 'Double', 'Triple', 'Other']
//   },
//   gender: {
//     type: String,
//     required: true,
//     enum: ['Male', 'Female', 'Any']
//   },
//   isFeatured: {
//     type: Boolean,
//     default: false
//   },
//   soldOut: {
//     type: Boolean,
//     default: false
//   },
//   amenities: {
//     type: Object,
//     required: true
//   },
//   whatsIncluded: {
//     type: Object,
//     required: true
//   },
//   floor: {
//     type: Number,
//     required: true,
//     min: 0
//   },
//   roomNo: {
//     type: Number,
//     required: true,
//     min: 1
//   },
//   distanceFromAuto: {
//     type: Number,
//     required: true,
//     min: 0
//   },
//   distanceFromCollege: {
//     type: Number,
//     required: true,
//     min: 0
//   },
//   electricityPerUnit: {
//     type: Number,
//     required: true,
//     min: 0
//   },
//   isCoupleFriendly: {
//     type: Boolean,
//     default: false
//   },
//   isInternationalFriendly: {
//     type: Boolean,
//     default: false
//   },
//   isPetFriendly: {
//     type: Boolean,
//     default: false
//   },
//   ownerName: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   ownerNumber: {
//     type: String,
//     required: true,
//     match: [/^[0-9]{10}$/, 'Enter a valid 10-digit number']
//   },
//   caretakerName: {
//     type: String,
//     trim: true
//   },
//   caretakerNumber: {
//     type: String,
//     match: [/^[0-9]{10}$/, 'Enter a valid 10-digit number']
//   },
//   description: {
//     type: String,
//     maxlength: 1000
//   },
//   note: {
//     type: String,
//     maxlength: 500
//   },
//   isPublished: {
//     type: Boolean,
//     default: true
//   },
//   houseRules: {
//     type: Object,
//     required: true
//   },
//   listingDate: {
//     type: Date,
//     default: Date.now
//   },
//   listedBy: {
//     type: String,
//     required: true
//   },
//   commission: {
//     type: Number,
//     min: 0,
//     default: 0
//   }
// });

// // 👇 Apply auto-increment plugin to id_room
// pgSchema.plugin(AutoIncrement, { inc_field: 'id_room' });

// module.exports = mongoose.model('PG', pgSchema);
