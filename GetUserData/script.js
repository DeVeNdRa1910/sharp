const name = document.getElementById("username");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const saveUserData = document.getElementById("btn");
const getUserData = document.getElementById("getUserData")

saveUserData.addEventListener("click" , (e)=>{
    e.preventDefault();
    saveData();
});

getUserData.addEventListener("click" , (e) => {
    e.preventDefault();
    getData();
})

function getData(){
  axios.get("https://crudcrud.com/api/d61bff51f4ca4df5856b2b5f1ec8d21f/AppoinmentData")
    .then(resp => {
      console.log(resp);
      showOutput(resp)
    })
    .catch(err => console.error(err));
}

function saveData(){
    axios.post("https://crudcrud.com/api/d61bff51f4ca4df5856b2b5f1ec8d21f/AppoinmentData" , {
        "name" : `${name.value}`,
        "email" : `${email.value}`,
        "contact-no" : `${phone.value}`,
    })
    .then(resp => {
        console.log(resp);
    })
    .catch(err => console.error(err));

    name.value = "";
    email.value ="";
    phone.value ="";
}

function showOutput(res) {
  const list = document.getElementById("listOfUsers");
  for (const user of res.data) {
    console.log(user);
    const li = document.createElement('li');
    li.innerHTML = `
    <h4>ID: ${user._id}</h4>
          <h4>Name: ${user.name}</h4>
          <h4>Email: ${user.email}</h4>
          <h4>phone: ${user["contact-no"]}</h4>
        `;
    list.appendChild(li);
  }
}