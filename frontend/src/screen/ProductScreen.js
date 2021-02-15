import React, { useState, useEffect} from 'react';
import data from '../data';
import img1 from "../../src/images/img1.jpg"
import img2 from "../../src/images/img2.jpeg"

import InputRange from 'react-input-range';
import { useSelector, useDispatch } from 'react-redux';
import { createReview, detailsProduct } from '../actions/productActions'
import Rating from '../components/Rating';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Link } from 'react-router-dom';
import { PRODUCT_REVIEW_CREATE_RESET } from '../constants/productConstants';
import { listProducts } from '../actions/productActions';

export default function ProductScreen(props){ 
	console.log(props.match.params.id);
  const [name, setName]=useState('');
  //const product= data.products.find(x=> x._id === props.match.params.id);
  
  // if(!product){
  //   return <div>Product Not Foun</div>
  // }     
	
  const [qty, setQty]=useState(1);
  
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;


  const productList = useSelector((state) => state.productList);
  {console.log("the product screen ", productList)}
  const { loading1, error1, products } = productList;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
  } = productReviewCreate;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

const productDetails= useSelector(state=>state.productDetails);
const productId = props.match.params.id;
console.log("the data is "+productDetails)
const {loading, error, product } =productDetails;
const dispatch = useDispatch();


	useEffect(() =>{
    if (successReviewCreate) {
      window.alert('Review Submitted Successfully');
      setRating('');
      setComment('');
      dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
    }
    dispatch(detailsProduct(productId),listProducts({ name: name !== 'all' ? name : '' }) );
    // dispatch();
		return () =>{
			//
		};
		
	}, [dispatch, productId, successReviewCreate]);
	
	const addToCartHandler=() =>{
		props.history.push("/cart/"+productId+"?qty="+qty)
  }
  
  const submitHandler = (e) => {
    e.preventDefault();
    if (comment || rating) {
      dispatch(
        createReview(productId, { rating, comment, name: userInfo.name })
      );
    } else {
      alert('Please enter comment and select rating star');
    }
  };

  console.log("sasasa", products)

var productView =products.length;
  if (productView=5) {
    productView = <b>Excellent</b>;
  } else if(productView>=2 || productView<5) {
    productView = <b>Good</b>;
  } else if(productView=1) {
    productView = <b>Poor</b>;
  }

	return ( 
   
<>
<style jsx>{`
         
         .admin-nav{
           display:none;
         }.main-sidebar{
           display:none;
         }
        .in-stock{
          font-size: 12px;
    padding: 4px 6px;
    color: #fff;
    border-radius: 6px;
    font-family: cursive;
        }
        .out-stock{
          font-size: 12px;
          padding: 4px 6px;
          color: #fff;
          border-radius: 6px;
          font-family: cursive;
        }
        .swiper-books {
          margin-left: auto;
          margin-right: auto;
          position: relative;
          overflow: hidden;
          list-style: none;
          padding: 0;
          z-index: 1;
      }
      .detail_left{
        padding: 22px;
        height: 420px;
        background: #fff;
        box-shadow: 0 0 12px #e2e2e2;
      }
      .detail_left img{
        height:100%;
        width:auto;
      }
       `}</style>

       
			

			<section className="main_section">
        <div className="container">
        
        <div className="row">
        <div className="col-md-12">
          <div className="book_section">
          {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        
          <>
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="#">Bookstore</a></li>
              <li class="breadcrumb-item"><a href="#">{product.category}</a></li>
              <li class="breadcrumb-item active" aria-current="page">{product.name}</li>
            </ol>
          </nav>
            <div className="row">
              <div className="col-md-5 text-center">
                <div className="detail_left">
                  <img src={ product.image }/>
                </div>
              </div>
              <div className="col-md-7 list-wrapper" id="myList">
                <div className="detail_right">
                  <h2>{product.name}</h2>
                  <p><b>By : {product.author_name}</b></p>
                  <h5>{product.numReviews} 
                    <span>
                    <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                  ></Rating>
                      <span className="ml-3 mr-3">
                        <i className="fa fa-user icon text-primary" />
                        <small className="text-muted ml-2">{product.reviews.length} Reviews</small>
                      </span>
                    </span>		
                  </h5>
                  <h3>₹{product.mrp}</h3>
                  <hr />
                  <div className="avaliable">
                    <h6><b className="text-danger">Format: </b> {product.book_format}</h6>
                    <span class="badge badge-pill badge-info">ISBN : {product.isbn}</span>
                  </div>
                  <hr />
                  <div className="highlight mb-4">
                    <span className="text-muted">Specification :</span>
                    <ul>
                      <li>Genre : {product.category}</li>
                      <li>Cover : {product.book_format}</li>
                      <li>Language : {product.book_language}</li>
                      <li>Book Size : {product.book_size}</li>
                      <li>No. of Pages : {product.page_number}</li>
                    </ul>
                  </div>
                  
                  <div className="highlight">
                    <p><b>Description : </b>{product.description}</p>
                  </div>
                  <hr />
                  {/* {product.countInStock > 0 ? (
                      <span className="bg-success in-stock">In Stock</span>
                    ) : (
                      <span className="bg-danger out-stock">Book is Unavailable</span>
                    )} */}
                  {product.countInStock > 0 ? (
                    
                      <div className="cartbtn">
                        <button onClick= {addToCartHandler} className="btn btn-success" value={qty}><i className="fa fa-plus" /> Add to Cart</button>
                      </div>
                      
                  ) : (
                    <span className="bg-danger out-stock">Currently Out of Stock</span>
                  )}
                  
                  <hr />
                  {userInfo ? (
                  <form onSubmit={submitHandler}> 
                      <div className="ratings">
                        <div className="row">
                          <div className="col-md-5 text-xs-center">
                          <h5>Rate Here</h5>
                          <fieldset className="rate">
                            <input type="radio" id="rating10" name="rating"  onChange={(e) => setRating(5)} /><label htmlFor="rating10" title="5 stars" />
                            <input type="radio" id="rating9" name="rating"onChange={(e) => setRating(4.5)} /><label className="half" htmlFor="rating9" title="4 1/2 stars" />
                            <input type="radio" id="rating8" name="rating" onChange={(e) => setRating(4)}  /><label htmlFor="rating8" title="4 stars" />
                            <input type="radio" id="rating7" name="rating" onChange={(e) => setRating(3.5)}/><label className="half" htmlFor="rating7" title="3 1/2 stars" />
                            <input type="radio" id="rating6" name="rating" onChange={(e) => setRating(3)}/><label htmlFor="rating6" title="3 stars" />
                            <input type="radio" id="rating5" name="rating" onChange={(e) => setRating(2.5)} /><label className="half" htmlFor="rating5" title="2 1/2 stars" />
                            <input type="radio" id="rating4" name="rating" onChange={(e) => setRating(2.0)} /><label htmlFor="rating4" title="2 stars" />
                            <input type="radio" id="rating3" name="rating" onChange={(e) => setRating(1.5)} /><label className="half" htmlFor="rating3" title="1 1/2 stars" />
                            <input type="radio" id="rating2" name="rating" onChange={(e) => setRating(1.0)} /><label htmlFor="rating2" title="1 star" />
                            <input type="radio" id="rating1" name="rating" onChange={(e) => setRating(.5)} /><label className="half" htmlFor="rating1" title="1/2 star" />
                          </fieldset>
                          </div>
                          <div className="col-md-5">
                            <ul id="skill">
                              <li><span className="bar fivestar" /><span className="sstr">5 <i className="fa fa-star" /></span></li>
                              <li><span className="bar fourstar" /><span className="sstr">4 <i className="fa fa-star" /></span></li>
                              <li><span className="bar threestar" /><span className="sstr">3 <i className="fa fa-star" /></span></li>
                              <li><span className="bar twostar" /><span className="sstr">2 <i className="fa fa-star" /></span></li>
                              <li><span className="bar onestar" /><span className="sstr">1 <i className="fa fa-star" /></span></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <hr />
                      <div className="comments">
                        <div className="row">
                          <div className="col-md-12">
                            <h5>Review Here</h5>
                          </div>
                        </div>
                        
                          <div className="form-row">
                            <div className="col-12 mt-2">
                              <textarea className="form-control" placeholder="Write a Review" id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}  />
                            </div>
                            <div className="col-12 mt-2 text-right">
                              <button className="btn btn-sm btn-danger">Post</button>
                            </div>
                          </div>
                          <div>
                            {loadingReviewCreate && <LoadingBox></LoadingBox>}
                            {errorReviewCreate && (
                              <MessageBox variant="danger">
                                {errorReviewCreate}
                              </MessageBox>
                            )}
                          </div>

                        <div className="row mt-3">
                          <div className="col-md-12">
                            <div className="dreview">
                              {product.reviews.length === 0 && (
                                    <MessageBox>There is no review</MessageBox>
                                  )}

                                {product.reviews.map((review) => (
                                  <div className="row" style={{borderBottom:'1px solid #c9c9c9',marginBottom:'12px'}}>
                                    <div className="col-md-6">
                                      <p><span>{review.rating} <i className="fa fa-star" /></span> <productView/>
                                      </p></div>
                                    <div className="col-md-6 text-right">
                                      <p className="text-danger"> - {review.name}</p>
                                    </div>
                                    <div className="col-md-12">
                                      <p className="text-justify">{review.comment}</p>
                                      <p><b>- {review.createdAt.substring(0, 10)}</b></p>
                                    </div>
                                  </div>
                                ))}
                              
                            </div>
                          </div>
                        </div>
                      </div>
                      </form>
                      ) : (
                        <MessageBox>
                          Please <Link to="/signin">Sign In</Link> to write a review
                        </MessageBox>
                      )}
                    </div>
                  </div>
                </div>
                </>
                )
                }
            {/* <div className="row mt-5">
              <div className="col-md-6 mb-2">
                <h4>Similar Books</h4>
              </div>
              <div className="col-md-6 mb-2 text-right">
                <a href className="text-danger">View More -&gt;</a>
              </div>
              <div className="col-md-12">
                <div className="related-products">
                  <div className="swiper-books swiper-container-initialized swiper-container-horizontal">
                    <div className="swiper-wrapper" id="swiper-wrapper-687a9d89480717de">
                    {loading ? (
                      <LoadingBox></LoadingBox>
                    ) : error ? (
                      <MessageBox variant="danger">{error}</MessageBox>
                    ) : (
                    <>
                    {products.length === 0 && (
                    <div className="col-md-6 offset-md-3"> <MessageBox> No Book Found</MessageBox></div>
                    )}
                    {console.log("the total is ".products)}
                      {products.map((product) => (
                      <div className="swiper-slide swiper-slide-active">
                        <div className="featured_colm border-right-0">
                          <div className="single_book">
                            <img src={product.image} className="img-fluid" alt="" />
                          </div>
                          <div className="book_detail mt-2">
                            <h6>{product.name}</h6>
                            <p><strong>By : </strong> {product.author_name}</p>
                            <strong>₹ {product.mrp}</strong>
                          </div>
                        </div>
                      </div>
                      ))}
                          </>
                      )}
                      
                    </div>
                    <div className="swiper-button-next" tabIndex={0} role="button" aria-label="Next slide" aria-controls="swiper-wrapper-a6321c48bcf54a109" aria-disabled="false" />
                    <div className="swiper-button-prev swiper-button-disabled" tabIndex={-1} role="button" aria-label="Previous slide" aria-controls="swiper-wrapper-a6321c48bcf54a109" aria-disabled="true" />
                    <span className="swiper-notification" aria-live="assertive" aria-atomic="true" />
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
        </div>
      </section>


	 
		</>
	
	
  );
    };
