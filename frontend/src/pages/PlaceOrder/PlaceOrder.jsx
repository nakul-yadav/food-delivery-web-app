import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'






const PlaceOrder = () => {

  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    zipcode: "",
    country: "",
    phone: ""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }


  const placeOrder = async (event) => {
    
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id]
        orderItems.push(itemInfo)
      }
    })
   
    let orderData = {
      "address": data,
      "items": orderItems,
      "amount": getTotalCartAmount() + 2
    }
   // console.log("orderdata=" + orderData.amount)
    let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } })

    // console.log(response.data)
    if (response.data.success) {
      // console.log("444")
      const { session_url } = response.data
      window.location.replace(session_url)
    }
    else {
      alert("error")
    }
  }
  
const navigate=useNavigate();
  
useEffect(()=>{
  if(!token){
    navigate("/cart");
  }
  else if(getTotalCartAmount()===0){
    navigate("/cart");
  }
},[token])

  return (

    <form onSubmit={placeOrder} className='place-order'>
      <div className='place-order-left'>
        <p className='title'>Delivery infirmation</p>
        <div className='multi-fields'>
          <input required name="firstName" onChange={onChangeHandler} value={data
            .firstName

          } type="text" placeholder='first name' />
          <input required name="lastName" onChange={onChangeHandler} type="text" placeholder='last name' />
        </div>
        <input required name="email" onChange={onChangeHandler} type="email" placeholder='email address' />
        <input required name="street" onChange={onChangeHandler} type="text" placeholder='street' />
        <div className='multi-fields'>
          <input required name="city" onChange={onChangeHandler} type="text" placeholder='city' />
          <input required name="state" onChange={onChangeHandler} type="text" placeholder='state' />
        </div>
        <div className='multi-fields'>
          <input required name="zipcode" onChange={onChangeHandler} type="text" placeholder='Zip code' />
          <input requi
            red name="country" onChange={onChangeHandler} type="text" placeholder='Country' />



        </div>
        <input required name="phone" onChange={onChangeHandler} type="text" placeholder='phone' />



      </div>
      <div className='place-order-right'>
        <div className='cart-total'>
          <h2>Cart totals</h2>
          <div>
            <div className='cart-total-details'>
              <p>subtotal</p>
              <b>${getTotalCartAmount()}</b>
            </div>
            <hr />
            <div className='cart-total-details'>
              <p>delivery fee</p>
              <b>${getTotalCartAmount() > 0 ? 2 : 0}</b>
            </div>
            <hr />
            <div className='cart-total-details'>
              <p>total</p>
              <b>${getTotalCartAmount() > 0 ? getTotalCartAmount() + 2 : 0}</b>
            </div>
          </div>
          <button type="submit">Proceed to checkout</button>





        </div>
      </div>
    </form>
  )
}

export default PlaceOrder