import mobileSchema from "../models/mobile_model.js"

export const addproduct = async function(req, res){
    console.log("inside add product");
    
    const { mobilename, brandname, ram, storage, colorandquantity, images, price } = req.body
    console.log(mobilename, brandname, ram, storage, colorandquantity, images, price);
    
    try {
        if (!(mobilename && brandname && ram && storage && colorandquantity && images && price)) {
            return res.status(404).send({ error: "please fill all fields" })
        }
        const data = await mobileSchema.create({mobilename, brandname, ram, storage, colorandquantity, images, price})
        res.status(201).send(data)
    } catch (error) {
        console.log(error)
    }
}

export const loaddata = async function(req, res){
    try {
        const data = await mobileSchema.find()
        res.status(200).send(data)
    } catch (error) {
        res.status(404).send("Error to fetch")
        console.log()
    }
}

export const productload = async function(req, res){
    const { id } = req.params
    console.log(id)
    try {
        const data = await mobileSchema.findOne({ _id: id })
        res.status(200).send(data)
    } catch (error) {
        res.status(404).send("Error to fetch")
        console.log()
    }
}

export const productdelete = async (req, res) => {
    try {
        const { id } = req.params
        const data = await mobileSchema.findByIdAndDelete(
            id,
            { new: true }
        )
        res.status(200).send(data)
    } catch (err) {
        res.status(500).send({ err })
    }
}

export const productupdate = async (req, res) => {
    try {
        const { id } = req.params
        let { mobilename, brandname, ram, storage, colorandquantity, images, price } = req.body
        const data = await mobileSchema.findByIdAndUpdate(
            id,
            { mobilename, brandname, ram, storage, colorandquantity, images, price },
            { new: true }
        )
        res.status(200).send(data)
    } catch (err) {
        res.status(500).send({ error: err })
    }
}