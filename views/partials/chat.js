function render(data){
    const html = data.map(elem => `<div>
    <span style="font-weight: bold;">${elem.email}</span>
    <span style="font-size: 10px;">${elem.date}</span>
    <p>${elem.msg}</p>
    </div>`).join(' ');
    document.getElementById('mensajes-chat').innerHTML = html;
    
}

const socket = io.connect()
socket.on('new-message', (data) => {
  render(data);
})

function chatFunc(event){
  const fecha = new Date().toLocaleDateString()+ ' ' +new Date().toTimeString()
  const fyh = fecha.split(' ');
  let mensaje = {
      email:document.getElementById('email').value,
      msg:document.getElementById('chatMsg').value,
      date:fyh[0]+' '+fyh[1]
  }
  socket.emit('new-message',mensaje);
  document.getElementById('chatMsg').value = '';
  return false;
}