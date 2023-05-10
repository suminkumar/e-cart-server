// import express
const express = require('express')
//Router()
const router = new express.Router()
//import controller
const controllers = require('../controllers/productController')

//import wishlistCOntroller
const wishlistcontroller = require('../controllers/wishlistController')

//import cartController
const cartController = require('../controllers/cartController')


//get-all-products api
//router.http-request(path,callback to define logic to resolve api)
router.get('/products/get-all-products',controllers.getallproducts)

//rputer for view single product
router.get('/products/:id',controllers.viewProduct)

//router for adding wishlist
router.post('/products/add-to-wishlist',wishlistcontroller.addToWishlist)

//router for get all wishlist items
router.get('/wishlist/get-all-items',wishlistcontroller.getAllWishlistItems)

//router for removing item from wishlist
router.delete('/wishlist/remove-item/:id',wishlistcontroller.removeWishlistItems)

//router for adding item to cart
router.post('/products/add-to-cart',cartController.addToCart)

//route for get all cart items
router.get('/cart/get-all-items',cartController.getCartItems)

//route for remove item from vcart
router.delete('/cart/item/:id',cartController.removeCartItem)

//route for incrementing cart item quatity
router.get('/cart/increment/:id',cartController.incrementCartItem)

//router for decrementing cart item quatity
router.get('/cart/decrement/:id',cartController.decrementCartItem)

//router for empty cart
router.delete('/cart/empty-cart',cartController.emptyCart)


//export
module.exports = router