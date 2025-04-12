console.log("this is product page's js")

const params = new URLSearchParams(window.location.search)
let id = params.get("id")
console.log(id)
let mobilename = null
let brandname = null
let flag = 0
async function checkCart(){

    try {
        const res = await fetch("http://localhost:8000/api/cart/getdata",{
            method: "POST",
            headers: {"Content-type":"application/json"},
            body: JSON.stringify({mobilename, brandname})
        })
        const data = await res.json()
        console.log(res)
        console.log(data)
        if(data.length==0){
            flag = 1
        }

    } catch (error) {
        console.log(error)
    }
}

let cartContent = null
async function product(){
    try{
        let res = await fetch(`http://localhost:8000/api/product/productload/${id}`)
        let data = await res.json()
        console.log(data);

        mobilename = data.mobilename
        brandname = data.brandname
        await checkCart()

        image = data.thumbnail
    
        let smallImages = ""
        data.images.map((e)=>{
            smallImages += `
            <div style="height: 80px; width: 80px"><img src=${e} onmouseover="hoverImage(this)"></div>
            `
        })

        let btnContent=flag==0?"Go to Cart":"Add to Cart"

        btn=`
        <div class="buttons">
        <div class="addtocart" id="cartbutton">${btnContent}</div>
        <div class="buybutton">Buy</div>
        </div>
        `

        

        colordd=""
        quantity=0
        data.colorandquantity.forEach(cq=>{
            colordd += `<option value="${cq.color}">${cq.color}</option>` 
            quantity += parseInt(cq.quantity)
        })

        edbtns = `
        <div class="btns" id="btns">
        <a href="/update?id=${data._id}"><div class="edit">Edit</div></a>
        <div onclick="productDelete()" class="delete">Delete</div>
        </div>
        `
        document.getElementById("edbuttons").innerHTML = edbtns

        document.getElementById("thumbnail").innerHTML = smallImages
        document.getElementById("images").innerHTML = `<img src=${data.images[0]}>`

        document.getElementById("content").innerHTML = `
        <p class="brand">${data.brandname}</p>
        <p class="title">${data.mobilename}</p>
        <p><b>RAM:</b> ${data.ram} | <b>ROM:</b> ${data.storage}GB</p>
        <label for="color"><b>Colors: </b></label>
        <select name="color" id="selectcolor">
            <option value="" hidden>Choose Color</option>
            ${colordd}
        </select>
        <p class="price">$${data.price}</p>
        <p class="stock">Stock: ${quantity}</p>
         ${btn}
        `
        document.getElementById("cartbutton").addEventListener("click",()=>{
            if(document.getElementById("cartbutton").textContent=="Add to Cart"){
                cart()
            }else{
                window.location.href="/cart"
            }
        })
        document.getElementById("selectcolor").addEventListener("change",()=>{
            let selectedColor = document.getElementById("selectcolor").value
            console.log(selectedColor);

            cartContent = {
                mobilename: data.mobilename,
                brandname:  data.brandname,
                ram:  data.ram,
                storage:  data.storage,
                color:  selectedColor,
                images:  data.images[0],
                price:  data.price,
                qty: 1
            }
            
        })


        



    }catch(error){
        console.log("got an error"+error)
    }
}

product()

function hoverImage(img){
    image=img.src
    document.getElementById("images").innerHTML = `<img src=${image} style="height: 100%">`
}

async function productDelete() {
    console.log("delete function");
    console.log(id);
    try {
        const res = await fetch(`http://localhost:8000/api/product/delete/${id}`)
        const data = await res.json()
        if(res.status==200){
            window.location.href="http://localhost:8000/"  
        } else {
            alert(data.error)
        }
    } catch (error) {
        console.log(error);
        
    }        
}

function ham(){
    if(document.getElementById("btns").style.display=="none"){
        document.getElementById("btns").style.display="block"
    }else{
        document.getElementById("btns").style.display="none"
    }
}




async function cart(){



    try {
        const res = await fetch("http://localhost:8000/api/cart/addcart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cartContent)
        })
        const data = await res.json()
        if(res.status===201){
            alert("Added to Cart")
            window.location.href="/cart"
        }
    } catch (error) {
        console.log(error)
    }
}