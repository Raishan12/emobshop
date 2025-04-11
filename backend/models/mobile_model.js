import mongoose from "mongoose"

const mobileSchema = new mongoose.Schema({
    mobilename: {type: String, required: true},
    brandname:  {type: String, required: true},
    ram:  {type: String, required: true},
    storage:  {type: String, required: true},
    colorandquantity:  {type: Array, required: true},
    images:  {type: Array, required: true},
    price:  {type: String, required: true} 
})

export default mongoose.model.mobiles || mongoose.model("mobile",mobileSchema)