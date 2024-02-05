const name = document.getElementById("username").value;
const email = document.getElementById("email").value;
const phone = document.getElementById("phone").value;
const btn = document.getElementById("btn");


function saveData(){
    axios.post("https://crudcrud.com/api/d61bff51f4ca4df5856b2b5f1ec8d21f/AppoinmentData" , {
        "name" : `${name}`,
        "email" : `${email}`,
        "contact-no" : `${phone}`,
    })
    .then(resp => {
        console.log(resp);
    })
    .catch(err => console.error(err));

console.log(`name is => ${name.value}`);
    console.log(`email is => ${email.value}`);
    console.log(`contact no is => ${phone.value}`);
}

btn.addEventListener("click" , (e)=>{
    e.preventDefault();
    saveData();
});

function showOutput(res) {
    document.getElementById('output').innerHTML = `
    <div class="card card-body mb-4">
      <h5>Status: ${res.status}</h5>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Headers
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.headers, null, 2)}</pre>
      </div>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Data
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.data, null, 2)}</pre>
      </div>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Config
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.config, null, 2)}</pre>
      </div>
    </div>
  `;
  }