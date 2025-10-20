import Product from "../models/products.js";
import { isAdmin } from "./userController.js";

export async function getProducts(req, res) {
  try{
    const product = await Product.find()
    res.json({ product });

  }catch(error){
    console.error("Error retrieving products", error.message);
    res.status(500).json({
      message: "Error retrieving products",
      status: "error",
    });
  }
}

// Take A Product using by id

export async function getProductById(req, res) {
  try{
    const productID = req.params.ProductID;
    const product = await Product.findOne({productID: productID})
    
    if(product == null){
      res.status(404).json({
        message: "Product not found",
        status: "error",
      });
      return;
    }
    else{
      res.status(200).json({
        product: product,
        status: "success",
      }); 
    }

  }catch(error){
    console.error("Error retrieving product", error.message);
    res.status(500).json({
      message: "Error retrieving product",
      status: "error",
    });

  }
}

export async function createProduct(req, res) {

  if(!isAdmin(req)){
    res.status(403).json({
      message: "You are not authorized to create a product",
      status: "error",
    });
    return;
  }
    
  try {
    const productData = req.body;

    const product = new Product(productData);

    await product.save();

    res.status(201).json({
      message: "New product added successfully",
      status: "success",
    });
  } catch (error) {
    console.error("Error adding new product", error.message);
    res.status(500).json({
      message: "Error adding new product",
      status: "error",
    });
  }
}

export async function deleteProduct(req, res) {

  if(!isAdmin(req)){
    res.status(403).json({
      message: "You are not authorized to delete a product",  
      status: "error",
    });
    return;
  }

  try{
    const productID = req.params.ProductID;
    
      
    
    await Product.deleteOne({
      productID: productID
    })
    
    res.status(200).json({
      message: "Product deleted successfully",
      status: "success",
    });


  }
  catch(error){
    console.error("Error deleting product", error.message);
    res.status(500).json({
      message: "Error deleting product",
      status: "error",
    });

  }

}


export async function updateProduct(req, res) {
  if(!isAdmin(req)){
    res.status(403).json({
      message: "You are not authorized to update a product",
      status: "error",
    });
    return;
  }
try{
  const productID = req.params.ProductID;
  const updateData = req.body;

  await Product.updateOne({productID: productID},{$set: updateData});

  res.status(200).json({
    message: "Product updated successfully",
    status: "success",
  });

}catch(error){
  console.error("Error updating product", error.message);
  res.status(500).json({
    message: "Error updating product",
    status: "error",
  }); 


}  
}