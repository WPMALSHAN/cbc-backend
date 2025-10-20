
import mongoose from "mongoose";    

const productsSchema = new mongoose.Schema({
    productID:{
        type: String,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true
    },
    altnames:{
        type: [String],
        default: [],
        required:true
    },
    description:{
        type: String,
        required: true
    },
    image :{
        type: [String],
        default: [],
        required: true
    },
    price :{
        type: Number,
        required: true
    },
    lableprice:{
        type: Number,
        required: true
    },
    category:{
        type: String,
        required: true
    },

});

const Product = mongoose.model("Product", productsSchema);

export default Product;