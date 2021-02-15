import React, { useEffect , useState} from 'react';
import Axios from 'axios';

import { PayPalButton } from 'react-paypal-button-v2';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsOrder } from '../actions/orderActions';
import { detailsUser } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { userDetailsReducer } from '../reducers/userReducers';


export default function OrderScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  {console.log("ssssss",userSignin)}
  const { userInfo } = userSignin;
  
  const orderId = props.match.params.id;
  const [sdkReady, setSdkReady] = useState(false);

 
  const orderDetails = useSelector((state) => state.orderDetails);
  console.log('usestate-----------',orderDetails)
  const { order, loading, error } = orderDetails;
  const dispatch = useDispatch();









  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await Axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order) {
     let myownaddress={
        address:"NAkhaash Nkakaash"
      }

     // detailsUser

      dispatch(detailsOrder(orderId,myownaddress));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, order, orderId, sdkReady]);

  const successPaymentHnadler = () => {
    // TODO: dispatch pay order
  };
  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (

<>
    
    <style jsx>{`
    .admin-nav{
      display:none;
    }
    .main-sidebar{
      display:none;
    }
    .navbar{
      display:none;
    }
    #footer{
      display:none;
    }
    .summery{
      background: #fff;
    box-shadow: 0 0 12px #eee;
    border-radius: 6px;
    padding: 6px;
    }
    .summery-list ul{
      list-style-type:none;
    }
    .summery-list li{
      margin-bottom: 6px;
      color: #e25763;
      margin-left: 37px;
    }
    `}
    </style>
    
       {/* <h1>Order {order._id}</h1> */}

{console.log("vvvvvvvvv",order)}
      <section className="main_section">
        <div className="container">
          <div className="row">
            <div className="col-md-7 offset-md-3">
              <div className="summery">
                <div className="row">
              
                  <div className="col-md-6 text-center">
                  <img src="http://react.bfcgroup.in/assets/images/logos/bfc-publications-logo.png" alt="" />
                    <h3 className="mt-4 mb-4 text-primary">Order Summery</h3>
                    <hr/>
                    <p><b>Order No: {order._id}</b></p>
                    <hr/>
                    {order.orderItems.map((item) => (
                    <p><b>Item Name: </b>{item.name} x {item.qty}</p>))}

                    <p><b>Delivery Address :</b>
                    
                    {/* {order.raviadd.village_add_id} */}
                    {order.raviadd.myoaddress.address}, 
                    {order.raviadd.myoaddress.city}, 
                    {order.raviadd.myoaddress.placeholder}, 
                     {order.raviadd.myoaddress.pincode},
                     {order.raviadd.myoaddress.state},

                      </p>
                  </div>
                  <div className="col-md-6">



                  {/* <form id="checkoutForm" name="checkoutForm" method="POST" action="https://test.cashfree.com/billpay/checkout/post/submit">
                   <input type="text" name="orderId" value="orderId"/>
                     <input type="text" name="orderAmount" value="2" />
                    <input type="text" name="customerName" value="a" />
                    
                     <input type="text" name="customerEmail" value="a@a.com" />
                    <input type="text" name="customerPhone" value="1234512345" />
                          
                         <input type="submit" value="pay cashfree" id="payBtn" />
                    <button value="pay" id="submitBtn">pay11</button>
                 </form>
                 <div id="generatedSignature"></div> */}



                    {/* <form method="get" action="https://test.cashfree.com/billpay/checkout/post/submit" id="contact_form" acceptCharset="UTF-8" className="contact-form summery-list"> */}
                    <form method="get" action="https://bfcpublications.com/paymentRequestnodestore" id="contact_form" acceptCharset="UTF-8" className="contact-form summery-list">

                    
                      <input type="hidden" name="_token" defaultValue="2kMw2kanaq5bwDlsHBE3nrpycBkcS0J4iYJ5y7EB" />            
                      <div className="form-group">
                        <input type="hidden" class="form-control" name="appId" placeholder="Enter App ID here (Ex. 123456a7890bc123defg4567)" value="29787295c06f7f0b7dab18a0678792"/>
                        <input type="hidden" className="form-control" name="appId" placeholder defaultValue="733936538bd77bb9b19ec42f039337" />
                      </div>
                      <input type="hidden" className="form-control" name="packageName" placeholder defaultValue="ebook" />
                      <input type="hidden" className="form-control" name="subPackageName" placeholder defaultValue="Superior" />
                      <input type="hidden" className="form-control" name="orderId" id="orderId" defaultValue={order._id} />
                      <div className="form-group">
                        <input type="hidden" className="form-control" name="orderAmount" placeholder="Enter Order Amount here (Ex. 100)" value={order.totalPrice} />
                      </div>
                      <div className="form-group">
                        <input type="hidden" className="form-control" name="orderCurrency" defaultValue="INR" value={order.user} />
                      </div>
                      <div className="form-group">
                        <input type="hidden" className="form-control" name="orderNote" placeholder="Enter Order Note here (Ex. Test order)" />
                      </div>
                      <div className="form-group">
                        <input className="form-control" name="customerEmail" type="hidden" value={userInfo.email} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" placeholder="Enter your email address here" title="Email Id with a-z,A-Z,any No and remaing @gmail.com,@yahoo.com etc" required />
                      </div>
                      <div className="form-group">
                        <input type="hidden" className="form-control" name="customerPhone" value={userInfo.mobile} placeholder="Enter your phone number here" pattern="[789][0-9]{9}" maxLength={10} required />
                      </div>
                      <div className="form-group">
                        <input type="hidden" className="form-control" name="customerName" value={userInfo.name} placeholder="Enter your phone number here" pattern="[789][0-9]{9}" maxLength={10} required />
                      </div>
                      
                      {/* <div className="form-group">
                        <input type="hidden" className="form-control" name="customerPhone" value={userInfo._id} placeholder="Enter your phone number here" pattern="[789][0-9]{9}" maxLength={10} required />
                      </div> */}
                      <ul className="mt-4 mb-4">
                        <li><b>Name : {userInfo.name}</b></li>
                        <li><b>Email : {userInfo.email}</b></li>
                        <li><b>Phone : {userInfo.mobile}</b></li>
                      </ul>
                      <hr/>
                      <ul style={{listStyleType:'none'}}>
                        <li>
                          Price : Rs {order.itemsPrice}
                        </li>
                        <li>
                          Shipping Charge : Rs {order.shippingPrice}
                        </li>
                        <li>
                          Tax : Rs {order.taxPrice}
                        </li>
                        <li>Total Price : {order.totalPrice}
                        </li>
                      </ul>
                      <div className="row">
                        <div className="col-md-7">
                          <button type="submit" className="btn btn-success mb-4" value="Pay">Confirm <i className="fa fa-arrow-right"></i></button>
                        </div>
                        <div className="col-md-5">
                          <a href="/" className="text-primary btn btn-light mb-4 text-right"><i className="fa fa-arrow-left"></i> Go Back</a>
                        </div>
                      </div>
                      
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
</>
  );
}
