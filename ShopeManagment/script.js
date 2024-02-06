const sno = document.getElementById('sno');
const name = document.getElementById('name');
const price = document.getElementById('price');
const quantity = document.getElementById('quantity');
const saveItems = document.getElementById('addData');
const getItems = document.getElementById('getData');
const list = document.getElementById('listOfItems');

var url = "https://crudcrud.com/api/a730dfcc590e4dd5b7af265dd35977a5/shopmanagement";

saveItems.addEventListener("click" , (e)=>{
    e.preventDefault();
    saveData()
});

getItems.addEventListener("click" , (e) =>{
    e.preventDefault();
    getData();
})

function getData(){
    axios.get(url)
    .then(resp => {
        console.log(resp , "getData()");
        showOutput(resp)
    })
    .catch(err => console.error(err));
}


function saveData(){
    
    axios.post(url , {
        "sno":`${sno.value}`,
        "product":`${name.value}`,
        "price":`${price.value}`,
        "quantity":`${quantity.value}`,
    })
    .then(resp => {
        console.log(resp , "addData()");
        const oldBody = document.getElementById('dataBody');
        oldBody.parentElement.removeChild(oldBody);
        getData();
    })
    .catch(err => console.error(err));

    sno.value = "";
    name.value = "";
    price.value = "";
    quantity.value = "";

    
}

function showOutput(resp){
    const newbody = document.createElement('tbody');
    newbody.id = "dataBody";
    for(let item of resp.data){
        let tr = document.createElement('tr');
        tr.id = `${item._id}`;
        tr.innerHTML = `
            <td>${item.sno}</td>
            <td>${item.product}</td>
            <td>${item.price}</td>
            <td>${item.quantity}</td>
            <td>
                <button type="button" class="updateItem" id="updateData" data-id="${item._id}">UPDATE</button>
                <button type="button" class="deleteItem "id="deleteData" data-id="${item._id}">DELETE</button>
            </td>
        `;
        newbody.appendChild(tr);
    }

    const table = document.getElementById('dataTable');
    table.appendChild(newbody);
    
    const deleteButtons = document.querySelectorAll('.deleteItem');
    deleteButtons.forEach(button => {
        button.addEventListener("click",() => {
            const itemId = button.getAttribute('data-id');
            deleteData(itemId);
        });
    });
    
    const updateButtons = document.querySelectorAll('.updateItem');
    updateButtons.forEach(button => {
        button.addEventListener("click",() => {
            const itemId = button.getAttribute('data-id');
            updateData(itemId);
        });
    });

}

function updateData(itemId){
    axios.get(`${url}/${itemId}`)
        .then(res => {
            const items = res.data;
            console.log(items);
            sno.value = items.sno;
            name.value = items.product;
            price.value = items.price;
            quantity.value = items.quantity;
        })
        .catch(err => console.error(err))


    deleteData(itemId);

    axios.put(url , {
            "sno":`${sno.value}`,
            "product":`${name.value}`,
            "price":`${price.value}`,
            "quantity":`${quantity.value}`,
        })
        .then(resp => {
            console.log(resp , "updateData()");
            const oldBody = getElementById('dataBody');
            oldBody.parentElement.removeChild(oldBody);
            getData();
        })
        .catch(err => console.error(err))
}

function deleteData(itemId){
    const delet = document.getElementById(`${itemId}`);
    delet.parentElement.removeChild(delet);
    axios.delete(`${url}/${itemId}`)
        .then(resp => {
            console.log(resp , "deleteData()");
            const oldBody = document.getElementById("dataBody");
            oldBody.parentElement.removeChild(oldBody);
            getData();
        })
        .catch(err => console.error(err));
}


/* 
function updateData(itemId){
    axios.get(`https://crudcrud.com/api/a730dfcc590e4dd5b7af265dd35977a5/shopmanagement/${itemId}`)
        .then(res => {
            const items = res.data;
            console.log(items);
            sno.value = items.sno;
            name.value = items.product;
            price.value = items.price;
            quantity.value = items.quantity;
        })
        .catch(err => console.error(err))

    const delet = document.getElementById(`${itemId}`);
    delet.parentElement.removeChild(delet);

    axios.put(`https://crudcrud.com/api/a730dfcc590e4dd5b7af265dd35977a5/shopmanagement/${itemId}`, {
            "sno":`${sno.value}`,
            "product":`${name.value}`,
            "price":`${price.value}`,
            "quantity":`${quantity.value}`,
        })
        .then(resp => {
            console.log(resp , "updateData()");
            const oldBody = document.getElementById('dataBody');
            oldBody.parentElement.removeChild(oldBody);
            getData();
        })
        .catch(err => console.error(err))
}
*/

/* 
function deleteData(itemId){
    const delet = document.getElementById(`${itemId}`);
    delet.parentElement.removeChild(delet);
    axios.delete(`https://crudcrud.com/api/a730dfcc590e4dd5b7af265dd35977a5/shopmanagement/${itemId}`)
        .then(resp => {
            console.log(resp , "deleteData()");
            const oldBody = document.getElementById("dataBody");
            oldBody.parentElement.removeChild(oldBody);
            getData();
        })
        .catch(err => console.error(err));
}
*/