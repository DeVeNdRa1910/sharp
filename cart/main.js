let productPrice = document.querySelector("#price");
let productName = document.querySelector("#productName");
let productCategory = document.querySelector("#categoryProducts");
let addbtn = document.querySelector("#addproduct");

const url = "https://crudcrud.com/api/9ae1d7c639a640baa1458cb071443d8a/cart";
window.onload = getData();

addbtn.onclick =  (e)=>{
    e.preventDefault();

    const obj = {
        "product" : `${productName.value}`,
        "price": `${productPrice.value}`,
        "category" : `${productCategory.value}`,
    };
    addData(obj);

    productName.value ="";
    productPrice.value = "";
    productCategory.value =""; 
}

async function addData(obj){
    try {
        const resp = await axios.post(url , obj)
        console.log(resp , "POST");
        showOutput(resp.data);
    } catch (err) {
        console.error(err);
    }
}

async function getData(){
    try {
        const resp = await axios.get(url);
        console.log(resp);
        resp.data.forEach((element) => {
            showOutput(element);
        })
    } catch (err) {
        console.error(err)
    }
}

function showOutput(item) {
    const li = document.createElement('li');
    const deleteBtn = document.createElement('button');
    let parentEle;
    if(item.category === 'Electronics'){
        parentEle = document.getElementById('electronicsList');
    }
    else if(item.category === 'Food'){
        parentEle = document.getElementById('foodList');
    }
    else if(item.category === 'Skincare'){
        parentEle = document.getElementById('skinList');
    }

    deleteBtn.innerHTML = 'Delete';
    li.innerHTML = `Product: ${item.product} , Price: ${item.price} , Category: ${item.category}`
    li.appendChild(deleteBtn);

    if(parentEle){
        parentEle.appendChild(li);

        deleteBtn.onclick = () => {
            parentEle.removeChild(li);

            deleteData(item._id);
        }
    }
}


async function deleteData(userId) {
    const newurl = `${url}/${userId}`;
    try {
        const resp = await axios.delete(newurl)
        console.log(resp);
        console.log("Product deleted from server");
    } catch (err) {
        console.error(err)
    }
}