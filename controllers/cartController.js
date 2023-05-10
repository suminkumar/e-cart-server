//import caritems  collection/model
const cartitems = require('../model/cartSchema')

//to add items to cart
exports.addToCart = async(req,res)=>{
    //to get product properties from request body
    const {id,title,price,image,quantity} = req.body
    //logic
    try{
        //check producrt is already in the cart
        const product = await cartitems.findOne({id})
        if(product){
            //poduct already in cart
            //increment quantity
            product.quantity+=1
            //update tottal price for the product
            product.grantTotal = product.price * product.quantity
            ////to save changed in mongodb
            await product.save()
            //send res to client
            res.status(200).json("Items added to your cart...")

        }
        else{
            //product is not in the cart
            //add product to cart
            const newProduct = new cartitems({
                id,title,price,image,quantity,grantTotal:price
            })
            //to save changes in mongodb
           await newProduct.save()
               //send res to client
               res.status(200).json("Item added to your cart...")
        }
    }
    catch(error){
        res.status(401).json(error)
    }

}

//getCartItems
exports.getCartItems = async (req,res)=>{
    //logic
    try{
        const allItems = await cartitems.find()
        //send allproducts to client
        res.status(200).json(allItems)
    }
    catch(error){
        res.status(401).json(error)
    }
}

//remove an item from cart
exports.removeCartItem = async(req,res)=>{
    //get id of product to be removed
    const {id} = req.params

    //logic
    try{
        const removeItem = await cartitems.deleteOne({id})
        if(removeItem){
            //get remaining items other than the deleted one
            const allItems = await cartitems.find()
            res.status(200).json(allItems)
        }
        else{
            res.status(404).json("Item is not in the cart")
        }
    }
    catch(error){
        res.status(401).json(error)
    }
}

//increment cart item
exports.incrementCartItem = async(req,res)=>{
    const {id}= req.params
    //logic
    try
    {
        const item = await cartitems.findOne({id})
        if(item){
            item.quantity+=1
            item.grantTotal = item.price*item.quantity
            await item.save()

            //get all items from cart
            const allItems = await cartitems.find()
            res.status(200).json(allItems)
        }
        else{
            res.status(404).json("Item is not in the cart")
        }
    }
    catch(error){
        res.status(401).json(error)
    }
}

//decrement cart item
exports.decrementCartItem = async(req,res)=>{
    const {id}= req.params
    //logic
    try
    {
        const item = await cartitems.findOne({id})
        if(item){
            item.quantity-=1
            if(item.quantity==0){
                //remove item from cart
                const deleteItem = await cartitems.deleteOne({id})
                
                    //get all items from cart
                    const allItems = await cartitems.find()
                    res.status(200).json(allItems)
                
              
            }
            else{
                item.grantTotal = item.price*item.quantity
                await item.save()
    
                //get all items from cart
                const allItems = await cartitems.find()
                res.status(200).json(allItems)
            }
        
        }
        else{
            res.status(404).json("Item is not in the cart")
        }
    }
    catch(error){
        res.status(401).json(error)
    }
}

//empty cart
exports.emptyCart = async(req,res)=>{
    try{
        const result = await cartitems.deleteMany({})
        res.status(200).json("Your Cart Is Empty")
    }
    catch(error){
        res.status(401).json(error)
    }
}