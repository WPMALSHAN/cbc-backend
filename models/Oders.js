import mongoose from "mongoose";

const oderSchema = new mongoose.Schema({
    product_id : "string",
    customer_id: "string",
    quantity: Number,
   

})


const Oder = mongoose.model("Oder", oderSchema);

export default Oder;