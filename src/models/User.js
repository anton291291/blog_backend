import mongoose,{Schema} from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    required:true
  },
  password: {
    typw: String,
    required: true
  }
});


export default const User = mongoose.model('User',UserSchema);
