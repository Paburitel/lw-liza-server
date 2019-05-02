import mongoose  from 'mongoose';

const Schema = mongoose.Schema;
const BrandSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
});

BrandSchema.virtual('brandId')
    .get(function () {
        return this.id;
    });

const Brand  = mongoose.model('Brand', BrandSchema);

export { Brand, BrandSchema };