import mongoose from 'mongoose';

const SliderSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String, 
        required: true
    }
})

const Slider = mongoose.model('slider', SliderSchema);

export default Slider