window.addEventListener('DOMContentLoaded',getUsers);


function getUsers(){
        let msgCount= 0;
      setInterval(()=> {
         axios.post('http://localhost:3000/home/usersall',{msgCount})
        .then(res =>{
          const users = res.data.message;
          msgCount = res.data.msgCount;
            for(let i of users)
            printMessages(`${i.name} : `,i.message);
        })
        .catch(err => console.log(err));
        },500);
}

document.getElementById('send').addEventListener('click',postMessage);

function postMessage(event){
const msg = document.getElementById('message').value;
const token = localStorage.getItem('groupChat');
const obj ={msg};
axios.post('http://localhost:3000/home/users',obj,{ headers:{"Authorization":token}})
.then(res => {
  //printMessages(`${res.data.name} : `,res.data.message);
  document.getElementById('message').value = '';
})
.catch(err => console.log(err));
}

function printMessages(name,message){
  const div = document.createElement('div');
  div.id = 'user-messages-list';
  div.innerHTML = `<span>${name}</span><span>${message}</span>`;
  document.getElementById('chat-room').appendChild(div);
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