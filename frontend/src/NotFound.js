import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {

  return(
    <>
  <style jsx>{`
      
        .admin-nav{
          display:none;
        }.main-sidebar{
          display:none;
        }
     
       
      `}</style>
          	<section className="main_section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="book_section">
              <h1>404 - Not Found!</h1>
                      <Link to="/">
                        Go Home
                      </Link>

              </div>
             </div>
          </div>
        </div>
</section>
    </>
  )


};

export default NotFound;