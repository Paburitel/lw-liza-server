import mongoose  from 'mongoose';

const Schema = mongoose.Schema;
const ModelSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    brand:
        {
            type: Schema.Types.ObjectId,
            ref: 'Brand',
            // autopopulate: true
        }
});

ModelSchema.plugin(require('mongoose-autopopulate'));

const Model  = mongoose.model('Model', ModelSchema);

export { Model, ModelSchema };
