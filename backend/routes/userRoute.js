import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs'
import User from '../models/userModel.js';
import { generateToken, isAuth } from '../util.js';
//import data from '../data.js';


const router=express.Router();

//User Data Seed


router.get(
  '/islogin',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    console.log(req.user)
   res.send(req.user)
   return req.user;
  })
);
// router.get("/islogin", async(isAuth, req, res)=>{
// console.log(req.user)
//  })
 

router.get("/gettranscams", function (req, res) {
 // console.log("77 i  dddd bbbbbb",req);
  var model = mongoose.model('trans_cams', transcams, 'trans_cams');
  model.find({}, function (err, data) {
      if (err) {
          res.send(err);
      }
      else {
          console.log("data="+data);
          res.send(data);
      }
  });
})


router.get("/getscheme", function (req, res) {
  console.log("717 i  dddd bbbbbb",req.query);


  // let user =  User.findById('60046c56176b640004a99db9');
  // if (user) {
  //   res.send(user);
  //   console.log("7ss17 i  dddd bbbbbb",user);
  // } else {
  //   res.status(404).send({ message: 'User Not Found' });
  // }

  // console.log("717 i  dddd bbbbbb",user);

  
    //ar transc = mongoose.model('trans_cams', UserSchema, 'trans_cams');             
    //var transk = mongoose.model('trans_karvy', transkarvy, 'trans_karvy');               
    User.find({"_id":req.query.id}).distinct("addresss", function (err, data) {  
    //    transk.find({"TD_ACNO":req.query.folio}).distinct("FUNDDESC", function (err, data1) {
          if (err) {
              res.send(err);
          }
          else {
            //   res.send(data);
            //   return data;
                       // var datacon = data1.concat(data)
                       // var removeduplicates = Array.from(new Set(datacon));
                        //console.log("nn=",removeduplicates)
                        res.send(data);
                        console.log("7ss17 i  dddd bbbbbb",data);
                        return data;
          }
    //  });
    });
 
})



router.get("/", async(req, res)=>{
 const users= await User.find({});
   //console.log("33 i  dddd bbbbbbbbbbb inside of get request",users)
  res.send(users);
})




//UserProfile

router.get(
  '/newapi',
  expressAsyncHandler(async (req, res) => {

    //console.lod("55 i  dddd bbbbbb",req.params.id)
    const user = await User.findById(req.params.idd);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);
//////





// data based on email id
router.get("/getemail", async(req, res)=>{
 const getemail=  await User.find({"email":req.query.email})
   let kaddr=getdata[0].addresss;
  //let tadrs =  kaddr.filter((tadrs) => tadrs._id == req.body.code);

   res.send(kaddr);
   // return users;           
 })












// data based on email id
router.post("/getdata", async(req, res)=>{
 // const getdata=  await User.find({"email":req.body.email,"lname":req.body.adrsid}) 
// const getdata=  await User.find({"email":req.body.email},{"addresss":[{"_id":req.body.code},{"pincode":""}]}) 
//  getdata
const getdata=  await User.find({"email":req.body.email})
//db.inventory.find( { "instock": { qty: 5, warehouse: "A" } } )
//https://docs.mongodb.com/manual/tutorial/query-array-of-documents/

//api for Delete data from database  
// router.post("/Removedata",function(req,res){   
//   User.remove({ _id: req.body.id }, function(err) {  
//              if(err){  
//                  res.send(err);  
//              }  
//              else{    
//                console.log("errroorrrrrrrr");
//                     // res.send({data:"Record has been Deleted..!!"});             
//                 }  
//          });  
//  })  

  let kaddr=getdata[0].addresss;
 // let user = users.filter((user) => user.id === 2);
 //let addrss =  addrsss.filter((addrss) => addrss.pincode === 226003);

 //let tadrs =  kaddr.filter((tadrs) => tadrs.pincode === 226003);
 //let tadrs =  kaddr.filter((tadrs) => tadrs.pincode === req.body.code);
 let tadrs =  kaddr.filter((tadrs) => tadrs._id == req.body.code);


//console.log(user);

  res.send(tadrs);
  // return users;           
})


// delete address

router.post('/Removedata', async (req, res) => {
  //console.log("errrorrrrrrr")
  const deletedProduct = await User.findById(req.body.id);
  if (deletedProduct) {
    await deletedProduct.remove();
    res.send({ message: 'Product Deleted' });
  } else {
    res.send('Error in Deletion.');
  }
});

router.get("/getaddress", async(req, res)=>{

  MongoClient.connect("mongodb://localhost:27017/bookstore", function(err, db) {
    if(err) { return console.dir(err); }


  var collection = bookstore.collection('user_address');

  console.log(collection);


  // const users= await User.find({});
 //  console.log("i ambbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb inside of get request")
  //  res.send(users);
 })

})

router.get('/seed', expressAsyncHandler( async(req, res)=>{
   // await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    res.send({createdUsers})
}) )

//SignIN

router.post(
    '/signin',
    expressAsyncHandler(async (req, res) => {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            mobile: user.mobile,
            isAdmin: user.isAdmin,
            address:user.addresss,
            token: generateToken(user),
          });
          return;
        }
      }
      res.status(401).send({ message: 'Invalid email or password' });
    })
  );

//Register

router.post('/register', expressAsyncHandler( async(req, res)=>{
    const user=new User({
        name:req.body.name,
        lname:req.body.lname,
        email:req.body.email,
        mobile:req.body.mobile,
        password:bcrypt.hashSync(req.body.password, 8),
    });

    const newUser= await user.save();

    if (newUser) {
        res.send({
          _id: newUser.id,
          name: newUser.name,
          lname:newUser.lname,
          email: newUser.email,
          mobile:newUser.mobile,
          isAdmin: newUser.isAdmin,
          token: generateToken(newUser),
        });
      }
    else{
        res.status(401).send({msg:'Invalid User Data'});
    }

}))

router.get("/createadmin", async(req, res) => {
        try{
            const user= new User({
                name:"Agam Bhai34",
                email:"agamsahudd01ww80@gmail.com",
                password:"1234",
                isAdmin:true
            });
            const newUser= await user.save();
                res.send(newUser);
        } catch(error){
            res.send({msg: error.message});
        }
})

//UserProfile

router.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);
//////




router.put(
  '/profile',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.lname = req.body.lname || user.lname;
      user.email = req.body.email || user.email;
      user.mobile= req.body.mobile || user.mobile;

      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        lname: updatedUser.lname,
        mobile: updatedUser.mobile,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser),
      });
    }
  })
);


//Add Address

router.post('/addaddress', expressAsyncHandler( async(req, res)=>{


  console.log("i am inside user route node.js");

const id= req.body.userId;
  const user2 = await User.findById(id);
  if (user2) {

    const add = {
      name: req.body.name,
      mobile:req.body.mobile,
      address: req.body.address,
      city:req.body.city,
      state:req.body.state,
      pincode:req.body.pincode,
      landmark:req.body.landmark,
      place:req.body.place,
    };

    user2.addresss.push(add);

    const updatedProduct = await user2.save();
 
    // const updatedUser2 = await user2.save();
    // console.log("the updated data ", updatedUser2)

    // res.send({
    //   _id: updatedUser._id,
    //   name: updatedUser.name,
    //   email: updatedUser.email,
    //   lname: updatedUser.lname,
    //   mobile: updatedUser.mobile,
    //   isAdmin: updatedUser.isAdmin,
    //   token: generateToken(updatedUser),
    // });
  }


  // const user=new User({
  //     name:req.body.name,
  //     lname:req.body.lname,
  //     email:req.body.email,
  //     mobile:req.body.mobile,
  //     password:bcrypt.hashSync(req.body.password, 8),
  // });

  // const newUser= await user.save();

  // if (newUser) {
  //     res.send({
  //       _id: newUser.id,
  //       name: newUser.name,
  //       lname:newUser.lname,
  //       email: newUser.email,
  //       mobile:newUser.mobile,
  //       isAdmin: newUser.isAdmin,
  //       token: generateToken(newUser),
  //     });
  //   }
  // else{
  //     res.status(401).send({msg:'Invalid User Data'});
  // }

}))

export default router;
