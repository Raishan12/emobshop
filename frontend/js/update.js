console.log("Update page's js");

const params = new URLSearchParams(window.location.search)
let id = params.get("id")
let allimages = []
let colorVariants = []
let content = null
let i = 0

async function loadProduct() {
    try {
        let res = await fetch(`http://localhost:8000/api/product/productload/${id}`)
        let data = await res.json()

        document.getElementById("mobilename").value = data.mobilename
        document.getElementById("brandname").value = data.brandname
        document.getElementById("ram").value = data.ram
        document.getElementById("storage").value = data.storage
        document.getElementById("price").value = data.price

 
        let colorsection = document.getElementById("colorsection");
        colorsection.innerHTML = ""

        data.colorandquantity.forEach((item, index) => {
            let newField = `
                <div class="colorfield">
                    <label for="color${index}">Color ${index + 1}: </label>
                    <input type="text" name="color" id="color${index}" class="color" value="${item.color}">
                    <label for="quantity${index}">Quantity: </label>
                    <input type="number" name="quantity" id="quantity${index}" class="quantity" min="1" value="${item.quantity}">
                </div>
            `;
            colorsection.innerHTML += newField
            i = index + 1
        });


        allimages = data.images
        let preview = ""
        data.images.forEach((img) => {
            preview += `<img src="${img}" alt="Preview" style="width:200px;">`
        });
        document.getElementById("previewimages").innerHTML = preview

    } catch (error) {
        console.log("Error loading product: ", error)
    }
}

loadProduct();

function addcolorsection() {
    let colorsection = document.getElementById("colorsection");
    let newColorField = `
        <div class="colorfield">
            <label for="color${i}">Color ${i + 1}: </label>
            <input type="text" name="color" id="color${i}" class="color">
            <label for="quantity${i}">Quantity: </label>
            <input type="number" name="quantity" id="quantity${i}" class="quantity" min="1">
        </div>`
    i++
    colorsection.innerHTML += newColorField
}

window.addcolorsection = addcolorsection


document.getElementById("images").addEventListener("change", async (e) => {
    allimages = [];
    let str = "";
    for (let file of e.target.files) {
        let base64 = await convertBase64(file)
        allimages.push(base64)
        str += `<img src="${base64}" style="width:200px;">`
    }
    document.getElementById("previewimages").innerHTML = str
});

function convertBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });
}

async function confirmation(event) {
    event.preventDefault()

    let colorFields = document.querySelectorAll(".color");
    let updatedColorVariants = []

    colorFields.forEach((field, idx) => {
        let color = field.value;
        let quantity = document.getElementById(`quantity${idx}`).value;
        if (color && quantity) {
            updatedColorVariants.push({ color, quantity });
        }
    });

    content = {
        mobilename: document.getElementById("mobilename").value,
        brandname: document.getElementById("brandname").value,
        ram: document.getElementById("ram").value,
        storage: document.getElementById("storage").value,
        price: document.getElementById("price").value,
        colorandquantity: updatedColorVariants,
        images: allimages,
    }

    try {
        let res = await fetch(`http://localhost:8000/api/product/update/${id}`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(content)
        });

        if (res.status === 200) {
            alert("Product updated successfully")
            window.location.href = `/`
        } else {
            alert("update failed")
        }
    } catch (error) {
        console.log(error)
        alert(error)
    }
};


