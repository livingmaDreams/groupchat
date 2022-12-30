window.addEventListener('DOMContentLoaded',getUsers);

function getUsers(){
    axios.get('http://52.66.153.80/home/users')
    .then(res => console.log(res.data.users))
    .catch(err => console.log(err));
}