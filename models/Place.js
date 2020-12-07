import mongoose from 'mongoose'

const placeSchema=mongoose.Schema({
    name: String,
    address:String,
    phones:Array,
    email:String,
    workHours: Object,
    numberOfHalls: Number,
    coordinates:Array,
    webSite: String,
    photos: Object,
    placeCategory: String,
    categoryUrl: String,
    owner: [{type: mongoose.Types.ObjectId, ref: 'placeCategory'}]
});

export default mongoose.model('place',placeSchema)