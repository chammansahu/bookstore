import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema(
    {
      name: { type: String },
      mobile: { type: String},
      address: { type: String },
      city: { type: String},
      state: { type: String },
      pincode: { type: Number },
      landmark: { type: String},
      place: { type: String },
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
