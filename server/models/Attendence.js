import { Schema, model, } from "mongoose";

const attendanceSchema = new Schema({
  userId:{ type:Schema.Types.ObjectId, ref: 'User', required: true},
  status: { type: String, required: true },
  date:{type:Date, default:Date.now}
}
  ,
  {
    timestamps:true
  }
);
  

const Attendance = model('Attendence',attendanceSchema)

export default Attendance;