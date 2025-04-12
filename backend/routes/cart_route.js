import express from "express"
import { addcart, getdata, loaddata, minus, plus, removeitem } from "../controllers/cart_controller.js"


const cartRoute = express.Router()

cartRoute.post("/addcart", addcart)
cartRoute.get("/loaddata", loaddata)
cartRoute.post("/getdata", getdata)
cartRoute.post("/plus/:_id", plus)
cartRoute.post("/minus/:_id", minus)
cartRoute.get("/remove/:_id", removeitem)



export default cartRoute 
