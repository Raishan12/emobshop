import express from "express"
import path from "path"
import url from "url"
import connection from "./connection.js"
import mobileRoute from "./routes/mobile_route.js"

const port = 8000
const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const frontend = path.join(__dirname, "..", "frontend")

const app = express()

app.use(express.static(frontend))
app.use(express.json({limit:"100mb"}))
app.use("/api/product", mobileRoute)

app.get("/addproductpage",(req,res)=>{
    try {
        res.status(200).sendFile(path.join(frontend,"addproduct.html"))
    } catch (error) {
        console.log(error);
        res.status(404).send("page not found",error)
    }
})

app.get("/product",(req,res)=>{
    try {
        res.status(200).sendFile(path.join(frontend,"product.html"))
    } catch (error) {
        console.log(error);
        res.status(404).send("page not found",error)
    }
})

app.get("/update",(req,res)=>{
    try {
        res.status(200).sendFile(path.join(frontend,"update.html"))
    } catch (error) {
        console.log(error);
        res.status(404).send("page not found",error)
    }
})





connection().then(() => {
    app.listen(port, () => {
        console.log(`server running at http://localhost:${port}`)
    })
}).catch((err) => console.log(err))