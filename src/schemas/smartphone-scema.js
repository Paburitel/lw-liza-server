import mongoose  from 'mongoose';

const Schema = mongoose.Schema;
const SmartphoneSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    manufacturer: {
        type: String,
        required: true
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

const Smartphone  = mongoose.model('Smartphone', SmartphoneSchema);

export { SmartphoneSchema, Smartphone };