import React, { useState } from 'react'
import './Featured.scss';
import { Link, useNavigate } from 'react-router-dom';
const Featured = () => {
    const [input,setInput]=useState(null);
    const navigate=useNavigate();
    const handelSearch=()=>{
        navigate(`/gigs?search=${input}`)
    }

  return (
    <div className='featured'>
        <div className='container'>
            <div className="left">
                <h1>Our <i>freelancers </i> 
 will take it from here</h1>
                <div className="search">
                    <div className="searchInput">
                        <img src="./img/search.png" alt="" />
                        <input type="text" placeholder='Try uilding mboole app' onChange={(e)=>setInput(e.target.value)} />
                    </div>
                    <button onClick={handelSearch}>Search</button>
                </div>
                <div className="popular">
                    <span>Popular</span>
                    <Link to="/gigs?cat=design" className='link'><button>Web Design</button></Link>
                      <Link to="/gigs?cat=art" className='link'><button>Logo Design</button></Link>
                       <Link to="/gigs?cat=animation" className='link'><button>AI Services</button></Link>
                       
                </div>
            </div>
            <div className="right">
                <img src="./img/man.png" alt="" />
            </div>
        </div>
    </div>
  )
}

export default Featured