import mongoose  from 'mongoose';
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    customer: {
        type: String,
        required: true
    },
    manager: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    executor: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    address: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    deliveryTime: {
        type: Date,
        required: true
    },
    sum: {
        type: Number,
        required: true
    },
    status: {
        type: Number,
        required: true,
        default: 1
    },
    smartphones: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Smartphone'
        }
    ],
    holders: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Holder'
        }
    ]
});

const Order  = mongoose.model('Order', OrderSchema);

export { OrderSchema, Order };
