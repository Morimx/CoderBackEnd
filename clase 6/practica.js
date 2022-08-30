const http = require("http");


const server = http.createServer((req, res) => {
  const date = new Date();
  const hora = date.getHours;
  if (hora >= 6 && hora <= 12) {
    res.end("Buenos dias");
  } else if (hora >= 13 && hora <= 19) {
    res.end("Buenas tardes");
  } else {
    res.end("Buenas noches");
  }
});

server.listen(8080, () => {
  console.log("Server ON");
});
