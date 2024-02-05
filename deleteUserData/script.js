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
  axios.get("https://crudcrud.com/api/d917fc4064cf46d6a57ecdfcca0ad470/AppoinmentData")
    .then(resp => {
      console.log(resp);
      showOutput(resp)
    })
    .catch(err => console.error(err));
}

function saveData(){
    axios.post("https://crudcrud.com/api/d917fc4064cf46d6a57ecdfcca0ad470/AppoinmentData" , {
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
}


  function deleteData(userId) {
    const url = `https://crudcrud.com/api/d917fc4064cf46d6a57ecdfcca0ad470/AppoinmentData/${userId}`;
    axios.delete(url)
      .then(resp => {
        console.log(resp);
        getData(); // Fetch updated data after deletion
      })
      .catch(err => console.error(err));
  }