
document.getElementById('form-signUpPage').addEventListener('submit',postSignUp);

function postSignUp(event){

    event.preventDefault();

    const name= event.target.name.value;
    const mail = event.target.mail.value;
    const phone = event.target.phone.value;
    const password = event.target.password.value;

    const obj = {name,mail,phone,password};

    axios.post('http://52.66.153.80/signup',obj)
    .then(res => {
        if(res.status == 200)
         {
            error.value="*User already exists*"
          
         }else if(res.status == 201){
            error.value="*NewUser created successfully*"    
    }
   })
    .catch(err => {
      if(err.response.status == 500){
         error.value="*Something went wrong*"
        }
    });
    document.getElementById('name').value ='';
    document.getElementById('mail').value='';
    document.getElementById('phone').value='';
    document.getElementById('password').value='';

 setTimeout(()=>{
    error.value = '';
   },2000);
}
