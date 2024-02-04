axios.defaults.headers.common['X-Auth-Token'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'



// GET REQUEST
function getTodos() {
  // axios({
  //   method: 'get',
  //   url: 'https://jsonplaceholder.typicode.com/todos',
  //   params: {
  //     _limit: 35
  //   }
  // })
  //   .then(res => showOutput(res))
  //   .catch(err => console.error(err));



  // axios.get('https://jsonplaceholder.typicode.com/todos',{params: {_limit: 35}})
  //   .then(res => showOutput(res))
  //   .catch(err => console.error(err));


  //Prefer to write 
  // by ? we saprating url with parameters , left side from = we will provide parameter and right side from = we will provide value o parameter

  // axios.get('https://jsonplaceholder.typicode.com/todos?_limit=35')
  //   .then(res => showOutput(res))
  //   .catch(err => console.error(err));
  
  
  // axios provide get request by default
  axios('https://jsonplaceholder.typicode.com/todos?_limit=35')
    .then(res => showOutput(res))
    .catch(err => console.error(err));
}

// POST REQUEST
function addTodo() {
  // axios({
  //   method: 'POST',
  //   url: 'https://jsonplaceholder.typicode.com/todos',
  //   data: {
  //     title: 'New Todo',
  //     completed: false
  //   }
  // })
  // .then(res => showOutput(res))
  // .catch(err => console.error(err));

  axios.post('https://jsonplaceholder.typicode.com/todos',{
        title: 'New Todo',
        completed: false
      })
    .then(res => showOutput(res))
    .catch(err => console.error(err));
}

// PUT/PATCH REQUEST
function updateTodo() {
  //put is usually meant to replace the entire resource
  //patch will kind of update it i ncrementally
  // for updating or delete something we have to know the ID of that object for example we are updating 1, so we have to pass https://jsonplaceholder.typicode.com/todos/ID
  
  // Both are working
  
  // axios.put('https://jsonplaceholder.typicode.com/todos/1',{
  //       title: 'Updated Todo',
  //       completed: true,
  //       name: "Jahnavi Panday"
  //     })
  //   .then(res => showOutput(res))
  //   .catch(err => console.error(err));


    axios.patch('https://jsonplaceholder.typicode.com/todos/1',{
          title: 'Updated Todo',
          completed: true,
          name: "Jahnavi Panday"
        })
      .then(res => showOutput(res))
      .catch(err => console.error(err));
  }

// DELETE REQUEST
function removeTodo() { 
  // for delete we must have to know id thet object
  axios.delete('https://jsonplaceholder.typicode.com/todos/3')
      .then(res => showOutput(res))
      .catch(err => console.error(err));
}
    
    // SIMULTANEOUS DATA
function getData() {
  // now we are working with 2 routs todos and posts(according to jsonplaceholder website)
  // axios.all([
  //   axios.get('https://jsonplaceholder.typicode.com/todos'),
  //   axios.get('https://jsonplaceholder.typicode.com/posts')
  // ])
  //   .then( res => {
  //     console.log(res[0]);
  //     console.log(res[1]);
  //     showOutput(res[1]);
  //   })
  //   .catch(err => console.error(err));

  axios.all([
    axios.get('https://jsonplaceholder.typicode.com/todos'),
    axios.get('https://jsonplaceholder.typicode.com/posts')
  ])
    .then(axios.spread((todos , posts) => showOutput(posts)))
    .catch(err => console.error(err));

}

// CUSTOM HEADERS
function customHeaders() {

  const configHeaders = {
    headers:{
      'Content-Type': 'application/json',
      Authorization: 'sometoken'
    }
  }

  axios.post('https://jsonplaceholder.typicode.com/todos' , {
    title: 'cutom todo',
    completed: false
  } , configHeaders)
  .then(res => showOutput(res))
  .catch(err => console.error(err));
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  const option = {
    method: 'post',
    url: 'https://jsonplaceholder.typicode.com/todos',
    data: {
      title: "I: Hello API I am coming",
      ans: "API: I am coming"
    },
    transformResponse: axios.defaults.transformResponse.concat(data => {
      data.title = data.title.toUpperCase();
      return data;
    })
  };

  axios(option).then(res => showOutput(res));
}

// ERROR HANDLING
function errorHandling() {
    axios
      .get('https://jsonplaceholder.typicode.com/todostsdrf')
      .then(res => showOutput(res))
      .catch(err => {
        if(err.response){
          //server responded with a status othen than 200 range
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);

          if(err.response.status === 404){
            alert('Error: Hampe to hei nuuu');
          }

        }else if (err.request){
          // Request was made but no response
          console.error(err.request);
        }else{
          console.error(err.message);
        }
      });
}

// CANCEL TOKEN
function cancelToken() {
  
  const source = axios.CancelToken.source();
  
  axios
      .get('https://jsonplaceholder.typicode.com/todostsdrf' ,{cancelToken: source.token})
      .then(res => showOutput(res))
      .catch(thrown => {
        if(axios.isCancel(thrown)){
          console.log('Request canceled' , thrown.message);
        }
      });

      if(true){
        source.cancel('Request canceled')
      }
}

// INTERCEPTING REQUESTS & RESPONSES

  axios.interceptors.request.use((config) => {
    console.log(`${config.method.toUpperCase()} request sent to ${config.url} at ${new Date().getTime()}`);
    return config
    } , (error) => {Promise.reject(error)}
  )

// AXIOS INSTANCES

// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
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

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
  .getElementById('transform')
  .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);
