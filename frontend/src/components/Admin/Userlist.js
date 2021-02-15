import React, { useEffect, useState }  from "react";
import AOS from 'aos';
import img1 from "../../../src/images/img1.jpg"
import '../../../node_modules/aos/dist/aos.css';
import { Component } from "react";
import { listProducts, deleteProdcut } from '../../actions/productActions';
// import { listProductszz } from '../../actions/userActions';

import { listUsers } from '../../actions/userActions';


import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import {useSelector, useDispatch } from 'react-redux';
import { ConnectionBase } from "mongoose";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

var createReactClass = require('create-react-class');


const notify = () => { 
  
  alert("My name is Agam the Boss")
  toast("Wow so easy !");

}

function Userlist (props) { 
  
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;  

 let  myData=userList.users ;

  console.log("i am line no 29", myData)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch]);

let i=1;

 { console.log("i am line 35 ss",myData)}

  return (  
    <>
    <style jsx>{`
      .front-nav{
        display:none;
      }
      .section-footer{
        display:none;
      }
      .admin-nav{
        display:block!important;
      }
      .booklist img{
          height:80px;
          width:80px;
          border-radius:50%;
      }
      .navTop{
        display:none;
      }
    `}</style>

<ToastContainer/>
    <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>User List</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><a href="#">Home</a></li>
                  <li className="breadcrumb-item active">User List</li>
                </ol>
              </div>
            </div>
          </div>{/* /.container-fluid */}
        </section>
        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">User List</h3>
                    {/* <button onClick={notify}>Notify !</button> */}
                    

                  </div>
                  {/* /.card-header */}
                  <div className="card-body">
                    <table id="example1" class="table">
                      <thead>
                        <tr>
                          <th>S.No.</th>
                          <th>Name</th>
                          <th>Last Name</th>
                          <th>Mobile</th>
                          <th>Email</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                      { myData && myData.map((user) => (
                      <tr>
                        <td>{i++}</td>
                        <td>{user.name}</td>
                        <td>{user.lname}</td>
                        <td>{user.mobile}</td>
                        <td>{user.email}</td>
                        <td></td>
                      </tr>
                      ))   }
                      {/* { myData && myData.map((user) => (
                        <tr>
                          <td>{i++}</td>
                          <td>{user.name}</td>
                          <td>{user.lname}</td>
                          <td>{user.mobile}</td>
                          <td>{user.email}</td>
                          <td> <button class="btn btn-danger"><i class="fas fa-trash"></i></button></td>
                        </tr>
                         ))   } */}
                      </tbody>
                    
                    </table>
                  </div>
                  {/* /.card-body */}
                </div>
              </div>
              {/* /.col */}
            </div>
            {/* /.row */}
          </div>
          {/* /.container-fluid */}
        </section>
        {/* /.content */}
      </div>
    </>
  );
 
};

export default Userlist;
