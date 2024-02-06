const uid = document.getElementById("userID");
const name = document.getElementById("username");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const saveUserData = document.getElementById("btn");
const getUserData = document.getElementById("getUserData");

saveUserData.addEventListener("click" , (e)=>{
    e.preventDefault();
    saveData();
});

getUserData.addEventListener("click" , (e) => {
    e.preventDefault();
    getData();
})

function getData(){
  axios.get("https://crudcrud.com/api/d0083d6a6edf45ab925d27a856249abb/AppoinmentData")
    .then(resp => {
      console.log(resp);
      showOutput(resp)
    })
    .catch(err => console.error(err));
}

function saveData(){
    axios.post("https://crudcrud.com/api/d0083d6a6edf45ab925d27a856249abb/AppoinmentData" , {
        "userID": `${uid.value}`,
        "name" : `${name.value}`,
        "email" : `${email.value}`,
        "contact-no" : `${phone.value}`,
    })
    .then(resp => {
        console.log(resp);
    })
    .catch(err => console.error(err));
    uid.value ="";
    name.value = "";
    email.value ="";
    phone.value ="";
}

function showOutput(res) {
  const list = document.getElementById("listOfUsers");
  console.log(res.data);
  for (const user of res.data) {
    const li = document.createElement('li');
    li.innerHTML = `
      <h4>ID: ${user._id}</h4>
      <h3>User ID: ${user.userID}</h3>
      <h4>Name: ${user.name}</h4>
      <h4>Email: ${user.email}</h4>
      <h4>Phone: ${user["contact-no"]}</h4>
      <button type="button" class="deleteUser" data-id="${user._id}">Delete</button>
      <button type="button" class="updateUser" data-id="${user._id}">Update</button>
    `;
    list.appendChild(li);
  }

  const deleteButtons = document.querySelectorAll('.deleteUser');
  deleteButtons.forEach(button => {
    button.addEventListener('click', () => {
      const userId = button.getAttribute('data-id');
      deleteData(userId);
    });
  });

  const updateButtons = document.querySelectorAll('.updateUser');
  updateButtons.forEach(button => {
    button.addEventListener('click', () => {
      const userId = button.getAttribute('data-id');
      updateData(userId);
    });
  });
}

function updateData(userId) {
  // Implement the logic to update the user data.
  // You can use axios.put() or axios.patch() based on your API's requirements.
  // After a successful update, you may want to refresh the data by calling getData().
  // You can also remove the corresponding user details from the website.
  
  const url = `https://crudcrud.com/api/d0083d6a6edf45ab925d27a856249abb/AppoinmentData/${userId}`;


  axios.get(url)
    .then(res => {
      const user = res.data
      // console.log(user);
      uid.value = user.userID;
      name.value = user.name;
      email.value = user.email;
      phone.value = user.phone;
    })
    .catch(err => console.error(err));
  
  deleteData(userId);

  

  axios.put(url, { 
        "userID": `${uid.value}`,
        "name" : `${name.value}`,
        "email" : `${email.value}`,
        "contact-no" : `${phone.value}`,
   })
    .then(resp => {
      console.log(resp);
      getData(); // Fetch updated data after the update
    })
    .catch(err => console.error(err));
}


function deleteData(userId) {
    const url = `https://crudcrud.com/api/d0083d6a6edf45ab925d27a856249abb/AppoinmentData/${userId}`;
    axios.delete(url)
      .then(resp => {
        console.log(resp);
        getData(); // Fetch updated data after deletion
      })
      .catch(err => console.error(err));
  }