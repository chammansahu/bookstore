import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { addToCart, savePaymentMethod} from '../actions/cartActions';
import {useSelector, useDispatch } from 'react-redux';  
import { saveShippingAddress } from '../actions/cartActions';
import { createOrder } from '../actions/orderActions';

import { detailsUser } from '../actions/userActions';

import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';



class MyForm extends React.Component {
    //for state you MUST have a constructor
    //as well as super()
    //remember to pass in props



    
    constructor(props) {
      super(props);
      this.state = {value7: '', value8: '', value: '', value2: '', value3: '', value4: '', value5: '', value6: ''};
      
      this.handleChange = this.handleChange.bind(this);
      this.handleChange2 = this.handleChange2.bind(this);
      this.handleChange3 = this.handleChange3.bind(this);
      this.handleChange4 = this.handleChange4.bind(this);
      this.handleChange5 = this.handleChange5.bind(this);
      this.handleChange6 = this.handleChange6.bind(this);
      this.handleChange7 = this.handleChange7.bind(this);
      this.handleChange8 = this.handleChange8.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
      //handles change in the input's value
      this.setState({value: event.target.value});
    }
    handleChange2(event) {
        //handles change in the input's value
        this.setState({value2: event.target.value});
      }
      handleChange3(event) {
          //handles change in the input's value
          this.setState({value3: event.target.value});
        }
        handleChange4(event) {
            //handles change in the input's value
            this.setState({value4: event.target.value});
          }
          handleChange5(event) {
              //handles change in the input's value
              this.setState({value5: event.target.value});
            }
            handleChange6(event) {
                //handles change in the input's value
                this.setState({value6: event.target.value});
              }
              handleChange7(event) {
                  //handles change in the input's value
                  this.setState({value7: event.target.value});
                }
                handleChange8(event) {
                    //handles change in the input's value
                    this.setState({value8: event.target.value});
                  }
    
    handleSubmit(event) {

const dispatch=useDispatch();   

        let sso= this.state.value7;
        let ssk="saini@gmail.com";

        dispatch(saveShippingAddress({ssk, sso, sso, sso, sso, sso, sso, sso}));



        const userSignin = useSelector((state) => state.userSignin);
        const { userInfo } = userSignin;
        const userId= userInfo._id;
   

        

   
        const userDetails = useSelector((state) => state.userDetails);

        console.log("sssss0",userDetails);

      //display message and name to user
      ReactDOM.render(
          <>
            <div className="form-group">
                <input type="checkbox" id="html"/>
                <label htmlFor="html">
                    <div className="exist_add">
                        {/* <small>{user.name}</small><br /> */}
                        <small>{this.state.value6}</small>
                        <p className="mt-3"><b className="mr-4 mt-2">{this.state.value7}</b> <b className="mt-2">{this.state.value8}</b></p>
                        <p>{this.state.value}, {this.state.value2}, {this.state.value3} -<strong>{this.state.value4}</strong></p>
                    </div>
                </label>
            </div>
      </>
      , document.getElementById('userInfo'));
      event.preventDefault(); 
    }



    render() {
      return (


        <form id="add-form"  class="lineform121fffff0" onSubmit={this.handlerSubmit}>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="fname">Name</label>
                    <input type="text" value={this.state.value7} onChange={this.handleChange7} className="form-control form-control-sm" name="fname" required />
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="fname">Phone</label>
                    <input type="text" className="form-control form-control-sm" name="fname" value={this.state.value8} onChange={this.handleChange8} required/>
                </div>
                <div className="form-group col-md-12">
                    <label htmlFor="fname">Address</label>
                    <input type="text" value={this.state.value} onChange={this.handleChange} className="form-control form-control-sm" name="fname" required/>
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="fname">City/Disrict/Town</label>
                    <input type="text" className="form-control form-control-sm" name="fname" value={this.state.value2} onChange={this.handleChange2} required/>
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="lname">State</label>
                    <input type="text" className="form-control form-control-sm" name="lname" value={this.state.value3} onChange={this.handleChange3} required/>
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="lname">Pincode</label>
                    <input type="text" className="form-control form-control-sm" name="lname"  value={this.state.value4} onChange={this.handleChange4} required/>
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="lname">Landmark</label>
                    <input type="text" className="form-control form-control-sm" name="lname" value={this.state.value5} onChange={this.handleChange5} />
                </div>
                <div className="form-group col-md-12">
                    <label htmlFor="lname">Name this address</label>
                    <input type="text" className="form-control form-control-sm" name="lname" value={this.state.value6} onChange={this.handleChange6} required/>
                </div>
                <div className="row">
                    <div className="col-md-12 pull-right mb-5">
                    <input type="submit" className="btn btn-sm btn-danger" value="Save"  id="myBtn"/>
                    </div>
                </div>
            </div>
        </form>
      );
    }
  }


function ShippingScreen(props){

    const userSignin = useSelector((state) => state.userSignin);
     const { userInfo } = userSignin;
     const userId= userInfo._id;

     let add = userInfo.address;
     console.log("addresss ", add)

     const userDetails = useSelector((state) => state.userDetails);
     const { loading1, error1, user } = userDetails;

     console.log("the userDetails is user ", user)

     if (!userInfo) {
        props.history.push('/signin');
      }

      const cart = useSelector(state => state.cart);  
      const { cartItems } = cart;
      const { shippingAddress } = cart;

      const orderCreate = useSelector((state) => state.orderCreate);
      const { loading, success, error, order } = orderCreate;


    const [name, setName]=useState(shippingAddress.name);
    // const [lname, setLname]=useState(shippingAddress.lname);
    // const [email, setEmail]=useState(shippingAddress.email);
    const [mobile, setMobile]=useState(shippingAddress.mobile);


    const [address, setAddress]=useState(shippingAddress.address);
    const [city, setCity]=useState(shippingAddress.city);
    const [state, setState]=useState(shippingAddress.state);
    const [pincode, setPinCode]=useState(shippingAddress.pincode);
    const [landmark, setLandmark]=useState(shippingAddress.landmark);
    const [role, setRole]=useState(shippingAddress.role);
    const [radio, setRadio]=useState(shippingAddress.radio);
    
    const [place, setPlace]=useState(shippingAddress.place);
    const [paymentMethod, setPaymentMethod]=useState('cashfree');
    
   // const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12

    const itemsPrice = cartItems.reduce((a, c) => a + c.mrp * c.qty, 0);    
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    // const taxPrice = 0.18 * itemsPrice;
    const taxPrice = 0.18 * itemsPrice;
    const totalPrice = itemsPrice + shippingPrice + taxPrice;


   
    const dispatch=useDispatch();

    const submitrHandler=(e)=>{

        window.alert("sdfasdf");
        let sso= this.state.value7;
        let ssk="saini@gmail.com";

        dispatch(saveShippingAddress({ssk, sso, sso, sso, sso, sso, sso, sso}));

        window.alert("dddsdfasdf");

      //  window.alert('Data Saved in the Redux')
        console.log("handlfasfas er 1",userId, address, pincode, landmark, city, state, place, paymentMethod)
    // e.preventDefault();
           dispatch(saveShippingAddress({userId, address, pincode, landmark, city, state, place, paymentMethod}));
     //props.history.push('/shipping');
    }

    const submitHandler2 = (e) => {
        window.alert('hiii handle2')
        console.log("hi agam")
        e.preventDefault();
       dispatch(savePaymentMethod(paymentMethod));
          props.history.push('/placeorder');
      };

      

      const placeOrderHandler = () => {
        
        console.log("helllooooooooo");

      //  var colors = ['red', 'green', 'blue'];
        var refColors = [{...cart, orderItems:'yellow',orderItemsT:totalPrice}];

      //  var fruits = ["Banana", "Orange", "Apple", "Mango"];
      //  cart.push("Kiwi");
       console.log("shiiping screen",refColors,cart )
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems,orderItemsT:totalPrice,kitemsPrice:itemsPrice,kshippingPrice:shippingPrice, ktaxPrice:taxPrice }));
        // TODO: dispatch place order action

      };

      useEffect(() => {
        dispatch(detailsUser(userInfo._id));
        if (success) {
          props.history.push(`/order/${order._id}`);
          dispatch({ type: ORDER_CREATE_RESET });
        }
      }, [dispatch, order, props.history, success, , userInfo._id]);

     // console.log("the user data of record is addresss", userInfo);
  //  console.log("the user address  is", user.addresss);



return (
    <>
    <style jsx>{`
    .admin-nav{
      display:none;
    }
    .main-sidebar{
      display:none;
    }
.btn-block span{
    color:#000;
}

.checkout .form-control {
    display: block;
    width: 100%;
    font-size: 14px!important;
    line-height: 1.5;
    color: #1f1e1e!important;}
.new {
padding: 50px;
}

.new .form-group {
display: block;
margin-bottom: 15px;
}

.new .form-group input {
padding: 0;
height: initial;
width: initial;
margin-bottom: 0;
display: none;
cursor: pointer;
}

.new .form-group label {
position: relative;
cursor: pointer;
}

.new .form-group label:before {
content:'';
-webkit-appearance: none;
background-color: transparent;
border: 2px solid #0079bf;
box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05);
padding: 6px;
display: inline-block;
position: relative;
vertical-align: middle;
cursor: pointer;
margin-right: 5px;
border-radius:50%;
}

.new .form-group input:checked + label:after {
content: '';
display: block;
position: absolute;
top: 2px;
left: 9px;
width: 6px;
height: 14px;
border: solid #0079bf;
border-width: 0 2px 2px 0;
transform: rotate(45deg);
}
.exist_add{
  display: contents;
}
.Checkoutsection{
    position:relative;
}
.Yorder{
    position:sticky;
    top:100px;
}
    `}</style>
    <section className="main_section checkout">
        <div className="container">
            <div className="row d-flex Checkoutsection">
                <div className="col-md-7">
                    <div className="form_block Yorder w-100">
                    <h3 className="text-center">BILLING DETAILS</h3>
                    <div className="accordion accordion_course_details" id="accordionExample">
                        <div className="card">
                            <div className="card-header" id="headingOne41">
                                <h6 className="mb-0 d-flex">
                                <button className="btn btn-block text-left d-flex" type="button" data-toggle="collapse" data-target="#collapseOne165" aria-expanded="true" aria-controls="collapseOne">
                                    <span>Add New Address</span>
                                    <span className="ml-auto">
                                        <p className="mb-0"><small>
                                            <i className="fa fa-arrow-down text-muted ml-3" /></small>
                                        </p>
                                    </span>
                                </button>
                                </h6>
                            </div>
                            <div id="collapseOne165" className="collapse" aria-labelledby="headingOne41" data-parent="#accordionExample">
                                <div className="card-body">
                                {/* <MyForm/> */}
                                    <form id="add-form"  class="lineform380f"  onSubmit={submitrHandler}>
                                        <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="fname">Name</label>
                            <input type="text" onChange={(e) =>setName(e.target.value)}  value={name} className="form-control input-sm" name="name"  />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="fname">Mobile</label>
                            <input type="text" onChange={(e) =>setMobile(e.target.value)}  value={mobile} className="form-control input-sm" name="mobile"  />
                                        </div>
                                        <div className="form-group col-md-12">
                                            <label htmlFor="fname">Address</label>
                            <input type="text" onChange={(e) =>setAddress(e.target.value)}  value={address} className="form-control input-sm" name="address"  />
                                        </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="fname">City/Disrict/Town</label>
                                <input type="text" className="form-control" name="city" value={city}  onChange={(e) =>setCity(e.target.value)} />
                            </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="lname">State</label>
                                            <input type="text" className="form-control" name="state" value={state}  onChange={(e) =>setState(e.target.value)} />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="lname">Pincode</label>
                                <input type="text" className="form-control" name="pincode"  onChange={(e) =>setPinCode(e.target.value)}  value={pincode} />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="lname">Landmark</label>
                                <input type="text" className="form-control" name="lname"  value={landmark}  onChange={(e) =>setLandmark(e.target.value)} />
                                        </div>
                                        <div className="form-group col-md-12">
                                            <label htmlFor="lname">Name this address</label>
                                            <input type="text" className="form-control" name="lname" value={place}  onChange={(e) =>setPlace(e.target.value)} />
                                        </div>

                                        <div className="row">
                                            <div className="col-md-12 pull-right mb-5">
                                            <button type="submit" className="btn btn-success" data-dismiss="modal">Save</button>
                                            </div>
                                        </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="new">
                                <form id="display_data" class="nouseeeeeeeee" onSubmit={submitrHandler}>
                                {loading1 ? (
                                <LoadingBox></LoadingBox>
                                ) : error1 ? (
                                <MessageBox variant="danger">{error}</MessageBox>
                                ) : (  
                                <>
                                {add.map(item =>
                                <div className="form-group">
                                    <input type="checkbox" name="checkbox_name[]" id="html" required/>
                                    <label htmlFor="html">
                                        <div className="exist_add">
                                          
                                            <small>Home</small>
                                            <p className="mt-3"><b className="mr-4 mt-2">Shivani Saini</b> <b className="mt-2">707191779</b></p>
                                            <p>{item.address},{item.landmark} {item.city}, {item.state}-<strong>{item.pincode}</strong></p>
                                        </div>
                                    </label>
                                    {error && <MessageBox variant="danger">{error}</MessageBox>}
                                </div>
                                )}
                                </>
                                )}

                                {/* <div id="userInfo"></div> */}

                                {/* <button
                                    type="submit"
                                    onClick={placeOrderHandler}
                                    className="primary block button"
                                    disabled={cartItems.length === 0}
                                    id="login_button"
                                    >
                                    Deliver Here
                                    {loading && 
                                    <LoadingBox></LoadingBox>
                                    }
                                    {error && 
                                    <MessageBox variant="danger">{error}</MessageBox>
                                    }
                                </button> */}
                               
                                </form>
                            </div>
                        </div>
                    </div>                   
                    </div>
                </div>
                <div className="col-md-5">
                    <div className="Yorder">
                    <h3 className="text-center">YOUR ORDER</h3>
                    <table className="table">
                        <tbody>
                            {
                            cartItems.length === 0 ?
                            <div>
                                Cart is empty
                            </div>
                            :
                            cartItems.map(item =>  
                            <tr>
                                <td>{item.name} x {item.qty}(Qty)</td>
                                <td>INR {item.mrp}</td>
                            </tr>
                            )}
                            <tr>
                                <td>Item Price</td>
                                <td>INR {itemsPrice}</td>
                            </tr>
                            <tr>
                                <td>Tax</td>
                                <td>INR {taxPrice}</td>
                            </tr>
                            <tr>
                                <td>Subtotal</td>
                                <td>INR {totalPrice}</td>
                            </tr>
                            <tr>
                                <td>Shipping</td>
                                <td>INR {shippingPrice}</td>
                            </tr>
                        </tbody>
                    </table>
                    <br />
                    {/* <form onSubmit={submitHandler2}>
                        <div  style={{display:'none' }}>
                            <input type="radio" name="paymentMethod"  id="paymentMethod" onChange={(e) =>setPaymentMethod(e.target.value)} value="cashfree" checked /> Cashfree <span>
                            <img src="https://www.logolynx.com/images/logolynx/c3/c36093ca9fb6c250f74d319550acac4d.jpeg" alt="" width={50} />
                            </span>
                        </div>
                    </form> */}
                    {/* Yorder */}
                    <button
                    type="submit"
                    onClick={placeOrderHandler}
                    className="primary block button"
                    disabled={cartItems.length === 0}
                    value="Register"
                    >
                    Place Order
                    {loading && 
                    <LoadingBox></LoadingBox>
                    }
                    {error && 
                    <MessageBox variant="danger">{error}</MessageBox>
                    }
                    </button>
                    
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
  );
}
export default ShippingScreen;
