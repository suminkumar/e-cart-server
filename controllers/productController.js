//logic to get all products from mongodb
//import products collection/model
const products = require('../model/productSchema')

exports.getallproducts = async (req,res)=>{
    //logic

    try{
   const allproducts = await products.find()
  //send allproducts to client
  res.status(200).json(allproducts)
}
catch(error){
  res.status(401).json(error)
}
}

//logic to get a particular product from mongodb
exports.viewProduct = async(req,res)=>{

  //get id of the product
  const id = req.params.id
  try{
  //logic
  const product = await products.findOne({id})
  if(product){
    //send product details to client
    res.status(200).json(product)
  }
  else{
    res.status(404).json("Item not available")
  }
  }
  catch(error){
    res.status(401).json(error)
  }
}