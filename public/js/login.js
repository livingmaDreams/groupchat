document.getElementById('form-loginPage').addEventListener('submit',postLogin);

function postLogin(event){
    event.preventDefault();

    const mail = event.target.mail.value;
    const password = event.target.password.value;

    const obj={mail,password};

    axios.post('http://52.66.153.80/signup',obj)
    .then(res => {
        const token = res.data.token;
        if(res.status == 200)
        localStorage.setItem('groupChat',token);
        window.location.href='http://52.66.153.80/home';
    })
    .catch(err =>{
        if(err.response.status == 404)
        error.value="*User not found*"
        else if(err.response.status == 401)
        error.value="*Wrong password*"
        else
        error.value="*Something went wrong*"
    })
    document.getElementById('mail').value='';
    document.getElementById('password').value='';
     setTimeout(()=>{
      error.value = '';
     },2000);
}