import mongoose from 'mongoose';

const goodsTransportSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    fromAddress: {
        type: String,
        required: true,
    },
    fromLat: {
        type: Number,
        required: true,
    },
    fromLng: {
        type: Number,
        required: true,
    },
    fromDistrict: {
        type: String,
    },
    toAddress: {
        type: String,
        required: true,
    },
    toLat: {
        type: Number,
        required: true,
    },
    toLng: {
        type: Number,
        required: true,
    },
    toDistrict: {
        type: String,
    },
    dateTime: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
        default: '',
    },
    materials: {
        type: String,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    vehicleRequired: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const GoodsTransport = mongoose.models.GoodsTransport || mongoose.model("GoodsTransport", goodsTransportSchema);
export default GoodsTransport;