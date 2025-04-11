import express from "express"
import { addproduct, loaddata, productdelete, productload, productupdate } from "../controllers/mobile_controller.js"

const mobileRoute = express.Router()

mobileRoute.post("/addproduct", addproduct)
mobileRoute.get("/loaddata", loaddata)
mobileRoute.get("/productload/:id", productload)
mobileRoute.get("/delete/:id", productdelete)
mobileRoute.post("/update/:id", productupdate)


export default mobileRoute 