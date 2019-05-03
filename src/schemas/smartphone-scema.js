import mongoose  from 'mongoose';
const Schema = mongoose.Schema;

const SmartphoneSchema = new Schema({
    brand: {
        type: mongoose.Schema.ObjectId,
        ref: "Brand",
        // autopopulate: true
    },
    model: {
        type: mongoose.Schema.ObjectId,
        ref: "Model",
        // autopopulate: true
    },
    price: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    operatingSystem: {
        type: String,
        required: true
    }
});

SmartphoneSchema.plugin(require('mongoose-autopopulate'));

const Smartphone  = mongoose.model('Smartphone', SmartphoneSchema);

export { SmartphoneSchema, Smartphone };