import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import './Navbar.css'
import { Link, useNavigate} from 'react-router-dom'
import Cart from '../../pages/Cart/Cart'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
  const Navbar = ({setShowLogin}) => {
  const [menu,SetMenu]=useState("home");
  const [cartItem,setCartItem]=useState("false");
  const{getTotalCartAmount,token,setToken}=useContext(StoreContext);
    const navigate=useNavigate();
  const logOut=()=>{
    localStorage.removeItem("token");
    setToken("");
navigate("/")

  }

  return (
    <div className='navbar'>
   <Link to='/'><img src={assets.logo} alt="logo" ></img></Link>
   <ul className='navbar-menu'>
    <Link to={"/"} className={menu==="home"?"active":""} onClick={()=>SetMenu("home")}>home</Link>
    <a href="#explore-menu"className={menu==="menu"?"active":""} onClick={()=>SetMenu("menu")}>menu</a>
    <li className={menu==="mobile app"?"active":""} onClick={()=>SetMenu("mobile app")}>mobile app</li>
    <a  href="#footer" className={menu==="contact us"?"active":""} onClick={()=>SetMenu("contact us")}>contact us</a>
   </ul>
   <div className='navbar-right'>
   <img src={assets.search_icon}></img>
   <div className='navbar-search-icon'>
<Link to="/cart"><img src={assets.basket_icon} alt=""></img></Link>
    <div className='dot'></div>

   </div>
   {!token?
   <button onClick={()=>setShowLogin(true)}>sign in</button>
  :<div className="navbar-profile">
    <img src={assets.profile_icon}/>
    <ul className='nav-profile-dropdown'>
      <li onClick={()=>navigate("/myOrders")}>
      <img src={assets.bag_icon}/><p>orders</p>
      </li>
      <li onClick={logOut}><img src={assets.logout_icon}/><p>logout</p></li>
    </ul>
    </div >
    }
   </div>
    </div>
  )
}

export default Navbar;