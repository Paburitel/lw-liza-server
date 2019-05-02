import mongoose  from 'mongoose';

const Schema = mongoose.Schema;
const HolderSchema = new Schema({
    name: {
        type: String,
        unique: true,
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
    description: {
        type: String,
        required: true
    },
    useModel: {
        type: String,
        required: true
    },
    useManufacturer: {
        type: String,
        required: true
    }
});

const Holder  = mongoose.model('Holder', HolderSchema);

export { Holder, HolderSchema };