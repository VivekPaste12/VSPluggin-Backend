import mongoose from 'mongoose';

const userSchema=new mongoose.Schema({
    email:{ type: String, required: true, unique: true },
    apiKey:{type: String, required:true},
    promptCount:{type: Number, default: 0},
    createdAt: { type: Date, default: Date.now }

})

export default mongoose.model('User', userSchema);
