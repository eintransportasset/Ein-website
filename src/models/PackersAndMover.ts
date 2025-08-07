import mongoose from 'mongoose';

const packersAndMoversSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  fromAddress: {
    type: String,
    required: true,
  },
  toAddress: {
    type: String,
    required: true,
  },
  dateTime: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  shiftingThings: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const PackersAndMovers = mongoose.models.PackersAndMovers || mongoose.model("PackersAndMovers", packersAndMoversSchema);
export default PackersAndMovers;