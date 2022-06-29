import mongoose from 'mongoose';

const FirmsSchema = mongoose.Schema({
    category: {type: String, required: true, unique: true, allowNull: false},
    img: {type: String, required: true}
})

const Firms = mongoose.model('firms', FirmsSchema);

export default Firms