import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import {useNavigate} from 'react-router-dom';

const Cart = () => {
  const{cartItems,food_list,removeFromCart,getTotalCartAmount ,url}=useContext(StoreContext);
  const navigate=useNavigate();

  //{console.log(food_list)}

  return (
    <div className='cart'>
<div className='cart-items'>
  <div className='cart-items-title'>
   <p>Items</p>
   <p>Price</p>
   <p>Price</p>
   <p>Quantity</p>
   <p>Total</p>
   <p>Remove</p>
  </div>
  <br/>
  <hr/>
  {
 
    
    food_list.map((item,index)=>
      
      {
      if(cartItems[item._id]>0){
        return(
          <>
         // {console.log(cartItems[item._id])}
          <div>
          <div className='cart-items-title cart-items-item'>
            <img src={url+"/images/"+item.
              image}/>
          <p> {item.name}</p>




          
          <p> ${item.price}</p>
          <p>{cartItems[item._id]}</p>
          <p>${item.price*cartItems[item._id]}</p>
          <p onClick={()=>removeFromCart(item._id)} className='cross'>x</p>
            </div>
            <hr/>
            </div>
            </>
        )
      }
})
  }
</div>
<div className='cart-bottom'>
<div className='cart-total'>
<h2>Cart totals</h2>
<div>
  <div className='cart-total-details'>
    <p>subtotal</p>
    <b>${getTotalCartAmount()}</b>
  </div>
  <hr/>
  <div className='cart-total-details'>
  <p>delivery fee</p>
  <b>${getTotalCartAmount()>0?2:0}</b>
  </div>
  <hr/>
  <div className='cart-total-details'>
    <p>total</p>
    <b>${getTotalCartAmount()>0?getTotalCartAmount()+2:0}</b>
  </div>
</div>
<button  onClick={()=>navigate("/order")}>Proceed to payment</button>
</div>
<div className='cart-promocode'>
<div>
  <p>if you have promo code ,enter here</p>
  <div className='cart-promocode-input'>
<input type="text" placeholder='promo code'/>
<button>submit</button>
  </div>
</div>
</div>
</div>
    </div>
  )
}

export default Cart