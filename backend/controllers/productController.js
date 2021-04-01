import Product from '../models/Product_Schema.js'
import asyncHandler from 'express-async-handler'


const allProducts = asyncHandler(async (req, res) => {
    // for pagination
    const pageSize = 10 
    const page = Number(req.query.pageNumber) || 1


    const keyword = req.query.keyword ? {
    name: {
        $regex: req.query.keyword,
        $options: 'i'
        }
    } : {}

    const countOfProduct = await Product.countDocuments({ ...keyword })
    const products = await Product.find({ ...keyword }).limit(pageSize).skip(pageSize * (page - 1))
    const pages = Math.ceil(countOfProduct / pageSize)
    res.json({products, page, pages})
})

const singleProductDetails = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    res.json(product)
})

const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if(product) {
      await product.remove()
      res.json({ message: "Product Deleted..!!!" })
    } else {
       res.status(404)
       throw new Error("User not found")
    }
})
    
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Sample',
        price: 0,
        user: req.user._id,
        description: 'Sample',
        image: '/images/sample.jpg',
        brand: 'Sample',
        category: 'Sample',
        numReviews: 0,
        countInStock: 0
    })

    const createdProduct = await product.save()
    res.json(createdProduct)
})

const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } = req.body;
    const product = await Product.findById(req.params.id)
    if(product) {
        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock

        const updatedProduct = await product.save()
        res.json(updatedProduct)
    } else {
        res.status(404)
        throw new Error("product not found")
    }
})


const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id)
    if(product) {
        const alreadyReviewed = product.reviews.find(rev => rev.user.toString() === req.user._id.toString())
        if(alreadyReviewed) {
            res.status(400).json({ message: 'Product already reviewed' })
        } else {
            const review = {
                name: req.user.name,
                rating: Number(rating),
                comment,
                user: req.user._id
            }
    
        product.reviews.push(review)
        product.numReviews = product.reviews.length // updates the number of reviews
        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length
        await product.save()
        res.status(201).json({ message: 'Review added..!!!' })
        }
    } else {
        res.status(404)
        throw new Error("product not found")
    }
})

const getTopProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3)   
    res.json(products)
}) 


export {
    allProducts,
    singleProductDetails,
    deleteProduct,
    createProduct,
    updateProduct,
    createProductReview,
    getTopProducts
}