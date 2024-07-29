import userModel from "../models/userModel.js"

//add item to cart
const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findOne({ _id: req.body.userId });
        let cartData = await userData.cartData;
        //console.log(cartData[req.body.itemId])
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        }
        else {
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData })
        res.json({ success: true, message: "added" })
    }
    catch (error) {
        res.json({ success: false, message: "error" })
    }
}


//add ite to cart
const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "remove from cart" })
    }

    catch (error) {
        res.json({ success: false, message: "error" })
    }
}

//fetch user cart data

const getCart = async (req, res) => {
    try{
           let userData=await userModel.findById(req.body.userId);



           let cartData = await userData.cartData;
           res.json({ success: true, cartData })
    }
    catch(error){
 res.json({ success: false, message: "error" })
    }
}

export { addToCart, removeFromCart, getCart };