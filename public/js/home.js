
let grp;
let grpName;

window.addEventListener('DOMContentLoaded',getUsrGroups);

function getUsrGroups(){
  const token = localStorage.getItem('groupChat');
  axios.get('http://localhost:3000/home/usergrps',{ headers:{"Authorization":token}})
  .then(res =>{
    const grp = res.data.groups;
    for(let i of grp)
    grpBtnCreation(i)
  })
  .catch(err => console.log(err));
}

document.getElementById('send').addEventListener('click',postMessage);

function postMessage(event){
const msg = document.getElementById('message').value;
const token = localStorage.getItem('groupChat');
const obj ={msg,grpName};
axios.post(`http://localhost:3000/home/users`,obj,{ headers:{"Authorization":token}})
.then(res => {
  document.getElementById('message').value = '';
})
.catch(err => console.log(err));
 }

document.getElementById('creategroup').addEventListener('click',createGroup);

function createGroup(){
   const parDiv = document.getElementById('group-tab');
   parDiv.style.display='block';
   parDiv.innerHTML=`<p>Create Group</p>
   <input type="text" name="name" id="name" placeholder="Name of the Group">
   <div id="users-list"></div>
   <button id="done" name="done">DONE</button>`;
   axios.get('http://localhost:3000/home/allusers')
   .then(res =>{
    const userList = res.data.users;
    const parDiv = document.getElementById('users-list');
    for(let i of userList){
      if(i != localStorage.getItem('groupChatName')){
      const inputEle = document.createElement('input');
      inputEle.type='checkbox';
      inputEle.className='user-for-group';
      inputEle.name=i;
      parDiv.appendChild(inputEle);
      const labelEle = document.createElement('label');
      labelEle.setAttribute('for',i);
      labelEle.textContent=i;
      parDiv.appendChild(labelEle);
      }
    }
   })
   .catch(err => console.log(err));
   
   document.getElementById('done').addEventListener('click',()=>{
    const grpName = document.getElementById('name').value;
    const user = document.querySelectorAll('.user-for-group:checked');
    const usr =[];
    if(user){
      for(let i of user)
      usr.push(i.name)
    }
    const token = localStorage.getItem('groupChat');
    axios.post('http://localhost:3000/home/creategroup',{grpName,user:[...usr]},{ headers:{"Authorization":token}})
    .then(() => { 
      window.alert(`${grpName} has been created`);
      grpBtnCreation(grpName);
    })
    .catch(err => console.log(err));
    parDiv.style.display='none';
   })
}

function grpBtnCreation(grpName){
  const button = document.createElement('button');
  button.textContent=grpName;
  button.id='grp-list';
  button.addEventListener('click',getGroupChat);
  document.getElementById('group').appendChild(button);
}



function getGroupChat(event){
  if(document.getElementById('grp-active') && document.getElementById('grp-active').textContent != event.target.textContent)
  document.getElementById('grp-active').id='grp-list';
  if(event.target.id == 'grp-list')
    event.target.id='grp-active';
    
    clearInterval(grp);
    document.getElementById('chat-room').innerHTML='';
    grpName = event.target.textContent;
    const token = localStorage.getItem('groupChat');
    let msgCount= 0;
    
    grp = setInterval(()=>{
      axios.get(`http://localhost:3000/home/grpmsg?groupname=${grpName}&msgcount=${msgCount}`,{ headers:{"Authorization":token}})
      .then(res => {
       const msg = res.data.Msg;
       msgCount = res.data.msgCount;
       if(msg){
        for(let i of msg)
        printMessages(`${i.name} : `,i.message);
       }
      
      })
      .catch(err => console.log(err)); 
    },500);
};   

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

