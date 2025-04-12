import cartSchema from "../models/cart_model.js"

export const addcart = async function(req, res){
    console.log("inside add cart");
    const {...content} = req.body
    console.log(content);
    try {
        if (!(content.mobilename && content.brandname && content.ram && content.storage && content.color && content.images && content.price && content.qty)) {
            return res.status(404).send({ error: "select color" })
        }
        const data = await cartSchema.create(content)
        res.status(201).send(data)
    } catch (error) {
        console.log(error)
    }
}

export const loaddata = async function(req, res){
    try {
        const data = await cartSchema.find()
        res.status(200).send(data)
    } catch (error) {
        res.status(404).send("Error to fetch")
        console.log()
    }
}

export const getdata = async function(req, res){
    const { mobilename, brandname } = req.body
    console.log(req.body,"inside getdata")
    try {
        const data = await cartSchema.find({mobilename,brandname})
        res.status(200).send(data)
    } catch (error) {
        res.status(404).send("Error to fetch")
        console.log()
    }
}

export const plus = async (req, res) => {
    console.log("inside plus")
    console.log(req.body)
    try {
        const { _id } = req.params
        console.log(_id, "\n",{_id})
        let { qty } = req.body
        const data = await cartSchema.findByIdAndUpdate(
            _id,
            { qty },
            { new: true }
        )
        res.status(200).send(data)
    } catch (err) {
        res.status(500).send({err: "not increasing"})
    }
}

export const minus = async (req, res) => {
    console.log("inside plus")
    console.log(req.body)
    try {
        const { _id } = req.params
        console.log(_id, "\n",{_id})
        let { qty } = req.body
        const data = await cartSchema.findByIdAndUpdate(
            _id,
            { qty },
            { new: true }
        )
        res.status(200).send(data)
    } catch (err) {
        res.status(500).send({err: "not decreasing"})
    }
}

export const removeitem = async (req, res) => {
    const { _id } = req.params
    try {
        const deleted = await cartSchema.findByIdAndDelete(_id)
        if (!deleted) return res.status(404).send({ error: "Item not found" })
        res.status(200).send({ message: "Item removed" })
    } catch (error) {
        res.status(500).send({ error: "Error removing item" })
    }
}
