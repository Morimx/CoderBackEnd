const userRegistryAPI = params => axios.get(`http://localhost:3000/api/signup`, {
    params,
});

const userRegistry = async e => {
    e.preventDefault();
    try {

        const newUser = {
            email: $('#email').val(),
            password: $('#pwd').val(),
        };
        const consulta = await userRegistryAPI(newUser);
        if(consulta){
            alert('Usuario creado con éxito');
            window.location.href = '/login';
        }
    } catch(err) {
        alert("El usuario ya existe");
        console.error(err);
    }
}

$(document).on('submit','form#signUpForm', userRegistry );

