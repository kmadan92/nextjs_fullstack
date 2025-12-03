import mongoose, { Schema, models, model } from "mongoose";

const UserSchema = new Schema({
  email: { 
    type: String, 
    unique: [true,"Email already exist"],
    required: [true, "Please provide email"]
  },
  password: { 
    type: String ,
    select: false
  },
  role: {
    type: String,
    default: "other",
  },
  accesstoken: {
    type: String
  },
  refreshtoken: {
    type: String
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
},
  {
  timestamps:true
  }
);

// Use 'models.User' if it exists (prevents overwrite error), otherwise create it
const User = models.User || model("User", UserSchema);

export default User;