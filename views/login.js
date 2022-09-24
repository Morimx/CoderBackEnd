const userLoginAPI = params => axios.get(`http://localhost:3000/api/login`, {
    params,
});

const loginx = async e => {
    e.preventDefault();
    try{
        const user = {
            email: $('#emaillgin').val(),
            password: $('#lginpwd').val(),
        };
        const consulta = await userLoginAPI(user);
        if(consulta){
            localStorage.setItem("email", user.email);
            localStorage.setItem("password", user.password);
            localStorage.setItem("isLogged", "yes");
            window.location.href = '/';
        }
    }
    catch(err) {
        alert("Usuario o contraseña incorrectos");
    }
}


$(document).on('submit','form#loginForm', loginx );

