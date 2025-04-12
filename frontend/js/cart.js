console.log("this is cart's js")

async function loadData(){
    try {
        const res = await fetch("http://localhost:8000/api/cart/loaddata")
        const data = await res.json()
        let str = ""

        data.forEach(product => {
            let price = product.price * product.qty

            str += `
            <div class="content">
                <div><img src="${product.images}" alt="product"></div>
                <div>
                    <p class="brand">${product.brandname}</p>
                    <p class="title">${product.mobilename} (${product.color}, ${product.storage}GB)</p>
                    <p class="price">₹${price}</p>
                    <div class="quantity">
                        <div onclick="minus(${product.qty}, '${product._id}')">-</div>
                        <div class="qty">${product.qty}</div>
                        <div onclick="plus(${product.qty}, '${product._id}')">+</div>
                    </div>
                    <button onclick="removeItem('${product._id}')">Remove</button>
                </div>
            </div>
            `
        })

        document.getElementById("lproducts").innerHTML = str

    } catch (error) {
        console.log(error)
    }
}
loadData()


async function plus(qty, id){
    qty++
    try {
        const res = await fetch(`http://localhost:8000/api/cart/plus/${id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ qty })
        })

        if(res.status === 200){
            console.log("Quantity increased")
            loadData()
        }
    } catch (error) {
        alert(error)
        console.log(error)
    }
}

async function minus(qty, id){
    if(qty <= 1){
        return removeItem(id)
    }

    qty--
    try {
        const res = await fetch(`http://localhost:8000/api/cart/minus/${id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ qty })
        })

        if(res.status === 200){
            console.log("Quantity decreased")
            loadData()
        }
    } catch (error) {
        alert(error)
        console.log(error)
    }
}

async function removeItem(id){
    try {
        const res = await fetch(`http://localhost:8000/api/cart/remove/${id}`)

        if(res.status === 200){
            console.log("Item removed from cart")
            loadData()
        } else {
            const err = await res.json()
            alert(err.error)
        }

    } catch (error) {
        console.log("Failed to remove item:", error)
    }
}
