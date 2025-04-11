console.log("this is index's js")

async function loadData(){
    try {
        const res = await fetch("http://localhost:8000/api/product/loaddata")
        const data = await res.json()
        let str=""
    data.forEach(product=>{
        str += `
        <a href="/product?id=${product._id}"><div class="card">
            <img src="${product.images[0]}" alt="${product.mobilename} Loading">
            <p class="brand">${product.brandname}</p>
            <p class="title">${product.mobilename}</p>
            <p class="price">${product.price}</p>
        </div></a>
        `
    })
    document.getElementById("container").innerHTML=str
    } catch (error) {
        console.log(error)
    }
}
loadData()