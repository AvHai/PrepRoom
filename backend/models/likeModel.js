import mongoose from "mongoose";
const Schema = mongoose.Schema;

const likeSchema = new Schema({
    userid: { type: Schema.Types.ObjectId, ref: "User", required: true },
    interviewid: { type: Schema.Types.ObjectId, ref: "Interview", required: true }
});

export default mongoose.model("Like", likeSchema);