window.addEventListener('DOMContentLoaded',getUsers);

function getUsers(){
    axios.get('http://52.66.153.80/home/users')
    .then(res => console.log(res.data.users))
    .catch(err => console.log(err));
}

document.getElementById('send').addEventListener('click',postMessage);

function postMessage(event){
const msg = document.getElementById('message').value;
const token = localStorage.getItem('groupChat');
const obj ={msg};
axios.post('http://52.66.153.80/home/users',obj,{ headers:{"Authorization":token}})
.then(res => console.log(res.data.users))
.catch(err => console.log(err));

}