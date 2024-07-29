import { createContext, useState } from "react";
import axios from "axios"
import { useEffect } from "react";


export const StoreContext=createContext(null);


const StoreContextProvider=(props)=>{

   const[    cartItems,setCartItems]=useState({});
   const url="http://localhost:4000";
   const [token,setToken]=useState("");
   const [food_list,setFoodList]=useState([]);


   const addToCart=async (itemId)=>{
  




    if(!cartItems[itemId]){
       // console.log("true");

        setCartItems((prev)=>({...prev,[itemId]:1}))
        
    }
    else{
       // console.log(cartItems[price])
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
       
    }
    if(token){
        await axios.post(url+"/api/cart/add",{itemId},{headers:{token}});
    }
   }

   const removeFromCart= async (itemId)=>{
    setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1 }))
    await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}});
   }


const getTotalCartAmount=()=>{
let totalAmount=0;
//console.log("tttttt")
for(const items in cartItems){
    
    if(cartItems[items]>0){
      //
        //console.log("tt")
       
        let itemInfo=food_list.find((product)=>product._id===items);

        
       // if(item._id===items){
        //    totalAmount+=(itemInfo.price)*cartItems[items];
       // }
       totalAmount+=(itemInfo.price)*cartItems[items];
        
        //console.log("iteminfo"= itemInfo+"items= "+items);
       //totalAmount+=(itemInfo.price)*cartItems[items];
    }
}
return totalAmount;
}


const fetchFoodList=async ()=>{
const response=await axios.get(url+"/api/food/list");
console.log(response);
setFoodList(response.data.data);
console.log(food_list);



}
const loadCartData=async (token)=>{
    const res=  await axios.post(url+"/api/cart/get",{},{headers:{token}});
    setCartItems(res.data.cartData)
  }
  

useEffect(()=>{
    async function loadData(){
        await fetchFoodList();
    if(localStorage.getItem("token")){
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
    }
}
 loadData();
},[])
    const contextValue={
        food_list,
         cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken


    
    



    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;