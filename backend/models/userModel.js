import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema(
  {
    name: { type: String, default: "user name" },
    mobile: { type: String, default: "1234567890" },
    address: { type: String, default: "street line1,street lin2 2" },
    city: { type: String, default: "cityname" },
    state: { type: String, default: "state name" },
    pincode: { type: Number, default: 493441 },
    landmark: { type: String, default: "landmark" },
    place: { type: String, default: "place name" },
  },
  {
    timestamps: true,
  }
);

const UserSchema= new mongoose.Schema({
    name: { type:String},
    lname: { type:String, required:true},
    email:{ type:String, required:true, unique:true, dropDups: true},
    mobile: { type:Number, required:true},
    password: { type:String, required:true},
    isAdmin:{ type:Boolean, required:true, default:false},
    addresss: [addressSchema],
},
{
    timestamps: true,
}
);

const User= mongoose.model("User", UserSchema);

export default User;
