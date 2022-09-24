const userLoginAPIprodu = async params => {
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");
    axios.post(`http://localhost:3000/api/productos`, params, {headers: {
        email, password}
        });
}


const productPost = async e => {
    e.preventDefault();
    try{
        const producto = {
            title: $('#tituli').val(),
            price: $('#priceuli').val(),
            foto: $('#fotuli').val(),
        };
        const posteo = await userLoginAPIprodu(producto);
        if(posteo){
            alert("Producto agregado");
        }
    }
    catch(err) {
        alert("sos un puto");
    }
}


$(document).on('submit','form#Elfo', productPost );

