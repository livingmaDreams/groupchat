window.addEventListener('DOMContentLoaded',getUsers);

async function getUsers(){
  
    try{
      const res= await axios.get('http://localhost:3000/home/users');
      const users = res.data.users;
      for(let i of users)
      printMessages(`${i}   `,'joined');
      const msg = res.data.message;
      for(let i in msg){
        const totalMsg = msg[i].length;
        for(let j of msg[i])
        printMessages(`${i} : `, j)
      }
      }
    catch(err){ console.log(err)};
  
}

document.getElementById('send').addEventListener('click',postMessage);

function postMessage(event){
const msg = document.getElementById('message').value;
const token = localStorage.getItem('groupChat');
const obj ={msg};
axios.post('http://localhost:3000/home/users',obj,{ headers:{"Authorization":token}})
.then(res => {
  printMessages(`${res.data.name} : `,res.data.message);
})
.catch(err => console.log(err));
}

function printMessages(name,message){
  const div = document.createElement('div');
  div.id = 'user-messages-list';
  div.innerHTML = `<span>${name}</span><span>${message}</span>`;
  document.getElementById('chat-room').appendChild(div);
  document.getElementById('message').value = '';
}

document.getElementById('logout').addEventListener('click',logOut);

function logOut(){
  const token = localStorage.getItem('groupChat');
  axios.get('http://localhost:3000/home/logout',{ headers:{"Authorization":token}})
  .then(res => {
    localStorage.setItem('groupChat','');
    window.location.href='http://localhost:3000/login';
  })
  .catch(err => console.log(err));
}