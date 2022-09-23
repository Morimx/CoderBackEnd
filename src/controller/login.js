//Funcion Mostrar contraseña
function showPassword(e) {
    e.preventDefault();
    let password = document.getElementById('pwd');
    if (password.type === 'password') {
        password.type = "text";
    } else {
        password.type = "password";
    }

}

// Funcion para logueo de usuario
function login(correo, password) {

    let mail = correo || document.querySelector('.emaillgin').value;
    let passwd = password || document.querySelector('.passwdlgin').value;

    const passwdUsuario = localStorage.getItem(mail);

    if (passwdUsuario == passwd) {
        localStorage.setItem("Useron", "yes");
        window.open("./index.html", "_self");
        return;
    } else {
        alert("Usuario o contraseña incorrecto");
    }

}

// Funcion para Deslogueo
function Logout() {
    localStorage.setItem("Useron", "no");
    window.open("./index.html", "_self");
}