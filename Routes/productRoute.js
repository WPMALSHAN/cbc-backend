import express from 'express';
import { getProducts, createProduct ,deleteProduct,updateProduct,getProductById} from '../Controllers/productController.js';


const productRoute = express.Router();




productRoute.get("/",getProducts);

productRoute.get("/:ProductID",getProductById);

productRoute.post("/",createProduct);

productRoute.delete("/:ProductID",deleteProduct);

productRoute.put("/:ProductID",updateProduct);

export default productRoute;