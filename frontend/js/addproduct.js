console.log("this is product add page");

let allimages = []
let colorVariants = [];
let content = null
function confirmation(event) {
    event.preventDefault()
    content = {
        mobilename: document.getElementById("mobilename").value,
        brandname: document.getElementById("brandname").value,
        ram: document.getElementById("ram").value,
        storage: document.getElementById("storage").value,
        colorandquantity: colorVariants,
        images: allimages,
        price: document.getElementById("price").value
    }

    let colorFields = document.querySelectorAll(".color");

    colorFields.forEach((colorField, i) => {
        let colorValue = colorField.value
        let quantityValue = document.getElementById(`quantity${i}`).value

        if (colorValue && quantityValue) {
            colorVariants.push({ color: colorValue, quantity: quantityValue })
        }
    })

    console.log(colorVariants)

    let rows = ''
    colorVariants.forEach((e) => {
        rows += `
            <tr>
                <td>${e.color}</td>
                <td>${e.quantity}</td>
             </tr>
        `
    })

    table = `
        <table>
            <tr>
                <th>Color</th>
                <th>Quantity</th>
             </tr>
             ${rows}
        </table>
    `

    let cimg = ""
    for (let all of allimages) {
        cimg += `<div class="pdiv"><img src="${all}" alt="Preview of selected Mobile" id="imgs"></div>`
    }

    let confirmation = `
    <p><b>Mobile Name: </b> ${content.mobilename}</p>
    <p><b>Brand Name: </b> ${content.brandname}</p>
    <p><b>Ram: </b> ${content.ram}GB</p>
    <p><b>Storage: </b> ${content.storage}GB</p>
    ${table}
    <p><b>Images: </b> </p>
    <div >${cimg}</div>
    <p><b>Price: </b> ₹${content.price}</p>
    <button onclick="addproduct()">Submit</button>
`;


    document.getElementById("confirmation").innerHTML = confirmation
    document.getElementById("confirmation").style.display = "block"
    document.getElementById("blackbackground").style.display = "block"
    


}

// send to server
async function addproduct() {
    console.log("add product");

    try {
        const res = await fetch("http://localhost:8000/api/product/addproduct", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(content)
        })
        const data = res.json()
        if(res.status===201){
            alert("Submitted Successfully")
            window.location.href="/"
        }
    } catch (error) {
        console.log(error)
        alert(error)
    }
}

// color and quantity section
let colorsection = document.getElementById("colorsection")
let i = 1
function addcolorsection() {
    let newColorField = `
        <div class="colorfield">
                <div class="l">
                    <label for="color${i}">Color${i + 1}: </label>
                    <input type="text" name="color" id="color${i}" class="color">
                </div>
                <div class="r">
                    <label for="quantity${i}">Quantity${i + 1}: </label>
                    <input type="text" name="quantity" id="quantity${i}" class="quantity">
                </div>  
        </div>`
    i++;
    colorsection.innerHTML += newColorField;
}


// image convert to base64 ---rest code---
document.getElementById("images").addEventListener("change", async (e) => {
    console.log(e.target.files)
    let str = ""
    for (let file of e.target.files) {
        let res = await convertBase64(file)
        allimages.push(res)
        str += `<img src="${res}" alt="Preview of seleceted Mobile" id="imgs">`
    }
    document.getElementById("previewimages").innerHTML = str
})

function convertBase64(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)

        fileReader.onload = () => {
            resolve(fileReader.result)
        }

        fileReader.onerror = (error) => {
            reject(error)
        }
    })
}