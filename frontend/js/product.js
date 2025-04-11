console.log("this is product page's js")

const params = new URLSearchParams(window.location.search)
let id = params.get("id")
console.log(id)


async function product(){
    try{
        let res = await fetch(`http://localhost:8000/api/product/productload/${id}`)
        let data = await res.json()
        console.log(data);

        
        image = data.thumbnail
    
        let smallImages = ""
        data.images.map((e)=>{
            smallImages += `
            <img src=${e} onmouseover="hoverImage(this)">
            `
        })

        btn=`
        <div class="buttons">
        <div class="addtocart">Cart</div>
        <div class="buybutton">Buy</div>
        </div>
        `

        edbtns = `
        <div class="btns"><a href="/update?id=${data._id}"><div>Edit</div></a>
        <div onclick="productDelete()" class="delbtn">Delete</div></div>
        `
        document.getElementById("edbuttons").innerHTML = edbtns

        document.getElementById("thumbnail").innerHTML = smallImages
        document.getElementById("images").innerHTML = `<img src=${data.images[0]}> ${btn}`

        document.getElementById("content").innerHTML = `
        <p class="brand">${data.brandname}</p>
        <p class="title">${data.mobilename}</p>
        <p class="price">$${data.price}</p>
        <p class="stock">Stock: ${data.colorandquantity[0].quantity}</p>
        `


    }catch(error){
        console.log("got an error"+error)
    }
}

product()

function hoverImage(img){
    image=img.src
    document.getElementById("images").innerHTML = `<img src=${image}> ${btn}`
}

async function productDelete() {
    console.log("delete function");
    console.log(id);
    try {
        const res = await fetch(`http://localhost:8000/api/product/delete/${id}`)
        const data = res.json()
        if(res.status==200){
            window.location.href="http://localhost:8000/"  
        } else {
            alert(data.error)
        }
    } catch (error) {
        console.log(error);
        
    }        
}