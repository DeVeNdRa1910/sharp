let price = document.querySelector("#price");
let name = document.querySelector("#productName");
let category = document.querySelector("#categoryProducts");
let addbtn = document.querySelector("#addproduct");
let electro = document.querySelector("#electronics");
let food = document.querySelector("#food");
let skin = document.querySelector("#skin");
var selectedCategory = category.value;

const url = "https://crudcrud.com/api/3668f701979a4e09b9b39c9f9b51238a/cart";
window.onload = function(){
    getData();
}

addbtn.addEventListener('click' , (e)=>{
    e.preventDefault();
    addData();
    getData();
})

function addData(){
    axios.post(url , {
        "name" : `${name.value}`,
        "price": `${price.value}`,
        "category" : `${category.value}`,
    })
    .then(resp => {
        console.log(resp , "post");
    })
    .catch(err => console.error(err));
    price.value ="";
    name.value = "";
    category.value =""; 
}

function getData(){
    axios.get(url)
      .then(resp => {
        console.log(resp);
        showOutput(resp);
      })
      .catch(err => console.error(err));
}

function showOutput(res) {
    console.log(res.data , "showOuput");
    if(selectedCategory === "electronics"){
        const elem = document.getElementById("electronics");
        elem.parentElement.removeChild(elem);
        const newList = document.createElement('ul');
        newList.id="electronics";
        for (let user of res.data) {
            const li = document.createElement('li');
            li.id = `${user._id}`;
            li.innerHTML = `
                  <h4> Price: ${user.price}₹ , Product: ${user.name}</h4> <button type="button" class="deleteData" data-id="${user._id}">Delete</button>
            `;
            newList.appendChild(li);
          }
          const getDivData = document.getElementById("electronicsProducts");
          getDivData.appendChild(newList);
    } else if(selectedCategory === "food"){
        const elem = document.getElementById("food");
        elem.parentElement.removeChild(elem)
        const newList = document.createElement('ul');
        newList.id="food";
        for (let user of res.data) {
            const li = document.createElement('li');
            li.id = `${user._id}`;
            li.innerHTML = `
                  <h4> Price:${user.price} ,  Product:${user.name}</h4>
                  <button type="button" class="deleteData" data-id="${user._id}">Delete</button>
            `;
            newList.appendChild(li);
          }
          const getDivData = document.getElementById("foodProducts");
          getDivData.appendChild(newList);
    } else{
        const elem = document.getElementById("skin");
        elem.parentElement.removeChild(elem)
        const newList = document.createElement('ul');
        newList.id="skin";
        for (let user of res.data) {
            const li = document.createElement('li');
            li.id = `${user._id}`;
            li.innerHTML = `
                    <h4> Price:${user.price} ,  Product:${user.name}</h4>
                  <button type="button" class="deleteData " data-id="${user._id}">Delete</button>
            `;
            newList.appendChild(li);
          
        }
        const getDivData = document.getElementById("skinProducts");
        getDivData.appendChild(newList);
    }
  
    const deleteButtons = document.querySelectorAll('.deleteData');
    deleteButtons.forEach(button => {
      button.addEventListener('click', () => {
        const userId = button.getAttribute('data-id');
        deleteData(userId);
      });
    });
}

function deleteData(userId) {
    const newurl = `${url}/${userId}`;
    axios.delete(newurl)
      .then(resp => {
        console.log(resp);
        const delet = document.getElementById(`${userId}`)
        delet.parentElement.removeChild(delet)
        getData()
      })
      .catch(err => console.error(err));
}