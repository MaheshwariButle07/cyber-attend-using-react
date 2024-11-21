import { Schema, model, } from "mongoose";

const fetchDataSch  = new Schema({
    userId:{ type:Schema.Types.ObjectId, required: true},
    fullName: {type:String},
    email: {type:String},
    age: {type:String},
    dob :{type:Date},
    date_of_joining:{type:Date},
    experience: { type :String},
    position: {type: String},
    profilePhoto: {type: String}

})

const FetchData = model('FetchData',fetchDataSch)

export default FetchData;