const http = require("http");
const fs = require("fs/promises");
const path = require("path");

const host = "localhost";
const port = 8000;

const requestListener = async (req, res) => {
  let filePath;
  switch (req.url) {
    case "/":
      filePath = path.join(__dirname, "index.html");
      break;
    case "/about":
      filePath = path.join(__dirname, "about.html");
      break;
    case "/contact-me":
      filePath = path.join(__dirname, "contact-me.html");
      break;
    default:
      filePath = path.join(__dirname, "404.html")
      break;
  }
  
  try {
    const content = await fs.readFile(filePath);
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end(content);
  } catch (error) {
    res.statusCode = 500;
    res.end(error);
    return;
  }
};

const server = http.createServer(requestListener);

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
