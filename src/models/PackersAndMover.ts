import mongoose from 'mongoose';

const packersAndMoversSchema = new mongoose.Schema({
   userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
   },
    from: {
      type: String,
      required: true,
    },
    to: {
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
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const PackersAndMovers = mongoose.models.PackersAndMovers || mongoose.model("PackersAndMovers", packersAndMoversSchema);
export default PackersAndMovers;