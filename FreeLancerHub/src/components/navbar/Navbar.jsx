import React, { useEffect, useState } from 'react'
import './Navbar.scss'
import {Link, useLocation, useNavigate} from 'react-router-dom';
import newRequest from '../../utils/newRequest';
import { useUserContext } from '../../context/UserContext';
const NavBar = () => {

    const [active,setActive]=useState(false);
    const [open,setOpen]=useState(false);
    const navigate=useNavigate()
    const {pathname}=useLocation();
    let currentUser=null;
    const {user,setUser}=useUserContext();
    currentUser=user;
    
    
    const isActive=()=>{
        window.scrollY > 0 ? setActive(true) : setActive(false)
    } 

    const handelLogout=async()=>{
      try{
        const res=await newRequest.delete('/auth/logout');
        localStorage.setItem("currentUser",null);
        setUser(null);
        navigate('/')
      console.log(res);
      }catch(error){

      }
    }

    useEffect(()=>{
        window.addEventListener('scroll',isActive)

        return ()=>{
            window.removeEventListener("scroll",isActive);
        }
    },[])
    


  return (
    <div className={active || pathname !== '/' ? 'navbar active' : 'navbar'}>
        <div className="container">
            <div className="logo">
                <span className='text'>FreeLancerHUB</span>
                <span className="dot">.</span>
            </div>
            <div className="links">
                <Link className='link' to="/"><span>Fiverr Business</span></Link>
                <Link className='link' to="/gigs">Explore</Link>
                <Link className='link' to="/">English</Link>
                {
                  currentUser == null ?   <Link className='link' to="/login">Sign In</Link> : ""
                }
               
                {!currentUser?.isSeller && <Link className='link' to="/register"><span>Become a Seller</span></Link>}
                {!currentUser && (<Link to="/register" className='link'><button>Join</button></Link>)}
                {currentUser && (
                    <div className="user" onClick={()=>setOpen(!open)}>
                        <img src={currentUser?.img || '/img/noavatar.jpg'} alt="" />
                        <span>{currentUser?.username}</span>
                        {open && 
                        (<div className="options">
                            {currentUser?.isSeller && (
                                <>
                                <Link className='link' to="/mygigs">Gigs</Link>
                                <Link className='link' to="/add">Add New Gig</Link>
                                </>
                            )}
                            <Link className='link' to="/orders">Orders</Link>
                            <Link className='link' to="messages">Messages</Link>
                            <span onClick={handelLogout}>Logut</span>
                        </div>)}
                    </div>
                )}
            </div>
        </div>
        {
            (active || pathname !== "/")  &&
            <>
            <hr/>
            <div className='menu'>
                 <Link className="link menuLink" to="/">
              Graphics & Design
            </Link>
            <Link className="link menuLink" to="/">
              Video & Animation
            </Link>
            <Link className="link menuLink" to="/">
              Writing & Translation
            </Link>
            <Link className="link menuLink" to="/">
              AI Services
            </Link>
            <Link className="link menuLink" to="/">
              Digital Marketing
            </Link>
            <Link className="link menuLink" to="/">
              Music & Audio
            </Link>
            <Link className="link menuLink" to="/">
              Programming & Tech
            </Link>
            <Link className="link menuLink" to="/">
              Business
            </Link>
            <Link className="link menuLink" to="/">
              Lifestyle
            </Link>
            </div>
            <hr/>
            </>
        }
    </div>
  )
}

export default NavBar