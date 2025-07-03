import React, { useState } from 'react'
import Add from '../COMPONENTS/Add'
// .. kodukkunnadhu thootu munpathe folder aaya componentsil poyi add edukkan anu
import { Link } from 'react-router-dom'
import Category from '../COMPONENTS/Category'
import View from '../COMPONENTS/View'
import { ToastContainer } from 'react-toastify';

function Home() {
  const [uploadVideoStatus,setuploadVideoStatus] = useState({})
  return (
   
   <>
   <div className='container d-flex align-items-center mt-5 textStyle justify-content-between'>
   <Add setuploadVideoStatus = {setuploadVideoStatus}/>
  
   <Link style={{textDecoration:'none'}} to={'/watch'}>
   <span className='fs-4 fw-bold textStyle'>WATCH HISTORY <i className="fa-solid fa-clock"></i></span>
   </Link>
  
   </div>

   {/* second Section */}
   <div className='container-fluid mt-5 w-100 mb-5'>
    <div className='row'>
<div className='col-md-9  textStyle'>
<View uploadVideoStatus = {uploadVideoStatus}/>
</div>

<div className='col-md-3 textStyle'>
<Category/>
</div>
    </div>

   </div>
   <ToastContainer 
position="top-center"
autoClose={3000}
pauseOnHover
theme="colored"


/>
   </>
  )
}


export default Home