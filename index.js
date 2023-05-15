const express = require("express");
const chalk = require("chalk");
const { addNote, getNotes, removeNote, editNote } = require("./note.controller");
const path = require("path");

const port = 3000;
const app = express();

app.set("view engine", "ejs");
app.set("views", "pages"); // меняем название паки с файлами проекта с "views" (значение по умолчанию) на "pages"


app.use(express.static(path.resolve(__dirname, "public"))) // подключаем к проекту указываем папку "public"
app.use(express.urlencoded({
    extended: true
})); // данный метод используем для декодирования данных
app.use(express.json());

app.get("/", async (request, response) => {
    response.render("index", {
        title: "Express App",
        notes: await getNotes(),
        created: false
    });
    // response.sendFile(path.join(basePath, "index.html"));
});

app.post("/", async (request, response) => {
    await addNote(request.body.title);
    response.render("index", {
        title: "Express App",
        notes: await getNotes(),
        created: true
    });
    // response.sendFile(path.join(basePath, "index.html"));
});

app.delete("/:id", async (request, response) => {
    await removeNote(request.params.id)
    // console.log(removeNote(request.params.id));
    response.render("index", {
        title: "Express App",
        notes: await getNotes(),
        created: false
    });
});

app.put("/:id", async (request, response) => {
    await editNote(request.params.id, request.body.text)
    response.render("index", {
        title: "Express App",
        notes: await getNotes(),
        created: false
    });
})

app.listen(port, () => {
    console.log(chalk.green(`Server has been started on port ${port}...`));
});

// const server = http.createServer(async(request, response) => {
//     if(request.method === "GET") {  // в cлучае обговления страницы выполняется запрос "GET", мы отфильтровываем его проверкой
//         const content = await fs.readFile(path.join(basePath, "index.html")); // читаеем файл которй находится по адресу path.join(basePath, "index.html")
//         // response.setHead("Content-Type", "text/html");
//         response.writeHead(200, {
//             "Content-Type": "text/html"
//         });
//         response.end(content);
//     } else if (request.method === "POST") {
//         const body = [];
//         response.writeHead(200, {
//             "Content-Type": "text/plain; charset=utf-8",
//         });
//         request.on("data", (data) => {
//             body.push(Buffer.from(data))
//         });
//         request.on("end", () => {
//             const title = body.toString().split("=")[1].replaceAll("+", " ");
//             addNote(title);
//             response.end(`Title: ${title}`);
//         });
//     }
// });
