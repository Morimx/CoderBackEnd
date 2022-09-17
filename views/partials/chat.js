function render(data){
    const html = data.map(elem => `<p>${elem.msg}</p>`).join(' ');
    document.getElementById('mensajes-chat').innerHTML = html;
}

const socket = io.connect()
socket.on('mensaje', (data) => {
  render(data);
})

function chatFunc(event){
    const message = document.getElementById('chatMsg').value;
    socket.emit('mensaje', {msg: message});
    document.getElementById('chatMsg').value = '';
    return false;
}