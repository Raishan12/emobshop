import express from "express"
import { addcart } from "../controllers/cart_controller.js"


const cartRoute = express.Router()

cartRoute.post("/addcart", addcart)


export default cartRoute 
