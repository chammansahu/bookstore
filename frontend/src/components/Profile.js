
import img1 from "../../src/images/img1.jpg"

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listOrderMine } from '../actions/orderActions';
import { detailsUser, updateUserProfile } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';
import { Link } from "react-router-dom";


const Profile = ()=>{
    const [name, setName]=useState('');
    const [lname, setLname]=useState('');
    const [email, setEmail]=useState('');
    const [mobile, setMobile]=useState('');
    //const [password, setPassword]=useState('');
   // const [confirmPassword, setConfirmPassword] = useState('');



  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;


  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;

  console.log("the user details profile page ", userDetails)
  console.log("the user details profile page22222222222222222 ", user)

  const orderMineList = useSelector((state) => state.orderMineList);
   const { loadings, errors, orders } = orderMineList;

   console.log("my orderMineList deatails are ", orderMineList)




  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(detailsUser(userInfo._id), listOrderMine());
    } else {
      setName(user.name);
      setEmail(user.email);
      setLname(user.lname);
      setMobile(user.mobile);
    }
  }, [dispatch, userInfo._id, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch update profile
    // if (password !== confirmPassword) {
    //   alert('Password and Confirm Password Are Not Matched');
    // } else {
      dispatch(updateUserProfile({ userId: user._id, name, email, lname, mobile }));
    // }

  };
console.log("my orders are", orders)
   
 
  // useEffect(() => {
  //   dispatch();
  // }, [dispatch]);

    return(
        <>
        <style jsx>{`
        .admin-nav{
            display:none;
        }
        .main-sidebar{
            display:none;
        }
        #profile{
            padding:24px 0;
        }
        .order_book h5{
            font-size:14px;
        }
        .order_book p {
            font-size: 11px;
            margin-bottom: 4px;
        }
        .order_image{
            height:100px;
            text-align:center;
            place-items:center;
        }
        .order_image img{
            height:100%;
        }
        #profile .row{
            padding:22px 0;
            border-bottom: 1px solid #dbdbdb;
        }
        .edit_profile{
            margin-top:45px;
        }
        .add-address h6{
            cursor:pointer;
        }
        
        `}</style>
        <section className="main_section">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-3">
                <div className="sec1 d-flex">
                  <span><img src="https://img1a.flixcart.com/www/linchpin/fk-cp-zion/img/profile-pic-female_0627fd.svg" className="img-fluid" /></span>
                  <span className="ml-3">
                    Hello,
                    <h6>{name}</h6>
                  </span>
                </div>
                <div className="sec1">
                  <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    <a className="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Personal Information</a>
                    {/* <a className="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Manage Address</a> */}
                    <a className="nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">My Order</a>
                    {/* <Link className="nav-link"  id="v-pills-messages-tab" data-toggle="pill" to="/orderhistory">Order History</Link> */}

                  </div>
                </div>
              </div>
              <div className="col-lg-9 col-md-9">
                <div className="sec1">
                  <div className="tab-content" id="v-pills-tabContent">
                    <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                      <div className="row">
                        <div className="col-lg-12 col-md-12">
                          <div className="user_form">
                            <div className="row">
                              <div className="col-lg-8 col-md-8">
                                <div className="row">
                                  <div className="col-lg-6 col-md-12">
                                    <h5 className="mb-5">Personal Information</h5>
                                  </div>
                                  <div className="col-lg-6 col-md-12">
                                    <a href="#" className="text-danger" data-toggle="modal" data-target="#editform"><i className="fa fa-edit" /> Edit Details</a>
                                  </div>
                                </div>
                              </div>
                              {/* <div className="col-lg-4 col-md-4"><a href="#" className="text-danger" data-toggle="modal" data-target="#password"><i className="fa fa-lock" /> Change Password</a></div> */}
                            </div>
                            {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>

                            <form id="register-form">
                              <div className="form-row">
                                <div className="form-group col-md-12">
                                  <label htmlFor="fname">First Name</label>
        <input type="text" className="form-control w-30" name="name" id="name" value={user.name}
                                   />
                                </div>
                                <div className="form-group col-md-12">
                                  <label htmlFor="lname">Last Name</label>
                <input type="text" className="form-control w-30" name="lname" value={user.lname} />
                                </div>
                                <div className="form-group  col-md-12">
                                  <label htmlFor="email">Email</label>
                                  <input type="email" className="form-control w-30" name="email" value={user.email}  />
                                </div>
                              </div>
                              <div className="form-row">
                                <div className="form-group  col-1 p-0">
                                  <label htmlFor="inputCity">Mobile</label>
  <input type="text" className="custom-phone-field form-control brtr brbr bltr blbr ml--1 " id="inputPhoneCode" placeholder={+91} 
    name="code" />
                                </div>
                                <div className="form-group  col-10 p-0">
                                  <label htmlFor="mnumber">&nbsp;</label>
                                  <input type="text" className="custom-phone-field form-control w-30 bltr blbr ml--2 mt-0" name="mnumber" value={user.mobile} />
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-6" />
                                <div className="col-6 pull-right" />
                              </div>
                            </form>

                            </>
        )}

                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                      <div className="row">
                        <div className="col-12">
                          <div className="manage_address p-2">
                            <h5 className="mb-5">Manage Address</h5>
                            <div className="add-address mb-5">
                              <h6 onclick="showHideDiv('divMsg')"><i className="fa fa-plus" /> Add New Address</h6>
                            </div>
                            <div id="divMsg">
                              <div className="row">
                                <div className="col-md-12">
                                  <form id="add-form">
                                    <div className="form-row">
                                      <div className="form-group col-md-12">
                                        <label htmlFor="fname">Address</label>
                                        <input type="text" className="form-control" name="fname" placeholder="Address (Area and Street)" 
                                         />
                                      </div>
                                      <div className="form-group col-md-6">
                                        <label htmlFor="fname">City/Disrict/Town</label>
                                        <input type="text" className="form-control" name="fname" placeholder="City/Disrict/Town"  />
                                      </div>
                                      <div className="form-group col-md-6">
                                        <label htmlFor="lname">State</label>
                                        <input type="text" className="form-control" name="lname" placeholder="Enter State" />
                                      </div>
                                      <div className="form-group col-md-6">
                                        <label htmlFor="lname">Pincode</label>
                                        <input type="text" className="form-control" name="lname" placeholder="Enter Pincode" />
                                      </div>
                                      <div className="form-group col-md-6">
                                        <label htmlFor="lname">Landmrk</label>
                                        <input type="text" className="form-control" name="lname" placeholder="Enter Landmrk" />
                                      </div>
                                      <div className="row">
                                        <div className="col-md-12 pull-right mb-5">
                                          <button type="button" className="btn btn-success" data-dismiss="modal">Save</button>
                                        </div>
                                      </div>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </div>
                            <div className="exist_add">
                              <small>Home</small><br />
                              <p className="mt-3"><b className="mr-4 mt-2">Shivani Saini</b> <b className="mt-2">707191779</b></p>
                              <p>A-44 rajiv nagar, kalyanpur, Lucknow, Uttar Pradesh -<strong>226022</strong></p>
                            </div>
                            <div className="exist_add">
                              <small>Work</small><br />
                              <p className="mt-3"><b className="mr-4 mt-2">Shivani Saini</b> <b className="mt-2">707191779</b></p>
                              <p>BFC Infoech, Lucknow, Uttar Pradesh -<strong>226022</strong></p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">

                      <div className="row">


                        <div className="col-12">
                          <div className="Userorder p-2">
                            <h5 className="mb-5">My Order</h5>
                            <div className="Orderinner">

                            {loadings ? (
                                  <LoadingBox></LoadingBox>
                                ) : error ? (
                                  <MessageBox variant="danger">{errors}</MessageBox>
                                ) : (

                                  
                                <div>

                                {orders.length === 0 && (
                                <div className="col-md-6 offset-md-3"> <MessageBox> No Order Found</MessageBox></div>
                                )}

                                {orders.map((order) => (

                              <div className="row" key={order._id}>
                                <div className="col-2">
                                  <div className="image">
                                    <img src={img1} className="img-fluid" />
                                  </div>
                                </div>
                                <div className="col-4">
                                  <h6>Book Title</h6>
                                  <p>By: Shivani Saini</p>
                                  <p>{order.totalPrice.toFixed(2)}</p>
                                </div>
                                <div className="col-4">
                                  <h6>Delivered on Jun 20</h6>
                                </div>
                              </div>
                               ))}

                               {
                                 console.log("orderrrrrrrrrrrrrrr", orders)
                               }
                            
                            </div>
                              )}


                              {/* <div className="row">
                                <div className="col-2">
                                  <div className="image">
                                    <img src={img1} className="img-fluid" />
                                  </div>
                                </div>
                                <div className="col-4">
                                  <h6>Book Title</h6>
                                  <p>By: Shivani Saini</p>
                                  <p>Rs: ₹300</p>
                                </div>
                                <div className="col-4">
                                  <h6>Delivered on Jun 20</h6>
                                </div>
                              </div>
                              <hr /> */}

                              {/* <div className="row">
                                <div className="col-2">
                                  <div className="image">
                                    <img src={img1} className="img-fluid" />
                                  </div>
                                </div>
                                <div className="col-4">
                                  <h6>Book Title</h6>
                                  <p>By: Shivani Saini</p>
                                  <p>Rs: ₹300</p>
                                </div>
                                <div className="col-4">
                                  <h6>Delivered on Jun 20</h6>
                                </div>
                              </div>
                              <hr /> */}

                            </div>
                          </div>
                        </div>

                      </div>




                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
       
        <div className="modal fade" id="password" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                {/* <h5 className="modal-title" id="exampleModalLabel">Change Password</h5> */}
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <form id="register-form">
                  <div className="form-row">
                    <div className="form-group col-md-12">
                      <label htmlFor="fname">Old Password</label>
                      <input type="password" className="form-control" name="fname" placeholder="Old Password" 
                       />
                    </div>
                    <div className="form-group col-md-12">
                      <label htmlFor="lname">New Password</label>
                      <input type="password" className="form-control" name="lname" placeholder="New Password" />
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Update</button>
              </div>
            </div>
          </div>
        </div>


        <div className="modal fade" id="editform" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>



          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Edit Form</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">

              {loadingUpdate && <LoadingBox></LoadingBox>}
            {errorUpdate && (
              <MessageBox variant="danger">{errorUpdate}</MessageBox>
            )}
            {successUpdate && (
              <MessageBox variant="success">
                Profile Updated Successfully
              </MessageBox>
            )}


                <form id="register-form" onSubmit={submitHandler}>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="fname">First Namesss</label>
  <input type="text" className="form-control" name="fname"   value={name} onChange={(e) => setName(e.target.value)}
                       />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="lname">Last Name</label>
<input type="text" className="form-control" name="lname" value={lname} onChange={(e) => setLname(e.target.value)}/>
                    </div>
                    <div className="form-group  col-md-12">
                      <label htmlFor="email">Email</label>
<input type="email" className="form-control" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group  col-2 p-0">
                      <label htmlFor="inputCity">Mobile</label>
                      <input type="text" className="custom-phone-field form-control brtr brbr bltr blbr ml--1 " id="inputPhoneCode" placeholder={+91} name="code" />
                    </div>
                    <div className="form-group  col-10 p-0">
                      <label htmlFor="mnumber">&nbsp;</label>
<input type="text" className="custom-phone-field form-control bltr blbr ml--2 mt-0" name="mnumber"  value={mobile} onChange={(e) => setMobile(e.target.value)} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6" />
                    <div className="col-6 pull-right" />
                  </div>
               
              


                
              
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary">Update</button>
              </div>
              </form>
          </div>


            </div>
          </div>
          </>
        )}

        </div>
        </>
    );
};
export default Profile;
