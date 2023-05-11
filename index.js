const http = require("http");
const chalk = require("chalk");
const fs = require("fs/promises");
const path = require("path");
const { addNote } = require("./note.controller");

const port = 3000;
const basePath = path.join(__dirname, "pages"); // путь к папке с проектом

const server = http.createServer(async(request, response) => {
    if(request.method === "GET") {  // в олучае обговления страницы выполняется запрос "GET", мы отфильтровываем его проверкой
        const content = await fs.readFile(path.join(basePath, "index.html")); // читаеем файл которй находится по адресу path.join(basePath, "index.html")
        // response.setHead("Content-Type", "text/html");
        response.writeHead("200", {
            "Content-Type": "text/html"
        });
        response.end(content);
    } else if (request.method === "POST") {
        const body = [];
        response.writeHead("200", {
            "Content-Type": "text/plain; charset=utf-8",
        });
        request.on("data", (data) => {
            body.push(Buffer.from(data))
        });
        request.on("end", () => {
            const title = body.toString().split("=")[1].replaceAll("+", " ");
            addNote(title);
            response.end(`Title: ${title}`);
        });
    }
});

server.listen(port, () => {
    console.log(chalk.green(`Server has been started on port ${port}...`));
});
