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