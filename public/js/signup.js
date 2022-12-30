
document.getElementById('submit').addEventListener('submit',postSignUp);

function postSignUp(event){
    const name= event.target.name;
    const mail = event.target.mail;
    const phone = event.target.phone;
    const password = event.target.password;

    const obj = {name,mail,phone,password};

    axios.post('http://52.66.153.80:3000/signup',obj)
    .then((res)=>{
        document.getElementById('error').value="User has been created successfully";
    })
    .catch((err)=>{
        document.getElementById('error').value="User Exists already"; 
    });
}
