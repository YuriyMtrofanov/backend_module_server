async function remove(id) {
    await fetch(`/${id}`, {method: "DELETE"})
};

async function edit(id, text) {
    await fetch(`/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({text})
      })
}

document.addEventListener("click", async (event) => {
    if (event.target.dataset.type === "remove") {
        const id = event.target.dataset.id;
        remove(id).then(
            event.target.closest("li").remove()
        );
    } else if (event.target.dataset.type === "edit") {
        const id = event.target.dataset.id;
        const textContent = event.target.closest("li").innerText // Что-то никак не получается получить текст именно из родительского li без дочерних button
        const newTextContent = prompt("редактировать", textContent)
        if (newTextContent) {
            await edit(id, newTextContent);
        }
    }
});
