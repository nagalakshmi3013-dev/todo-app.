const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = "";

    let filtered = tasks.filter(task => {
        if (filter === "active") return !task.completed;
        if (filter === "completed") return task.completed;
        return true;
    });

    filtered.forEach((task, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <span class="${task.completed ? "completed" : ""}">
                ${task.text}
            </span>

            <div>
                <button class="complete">✔</button>
                <button class="edit">✏</button>
                <button class="delete">🗑</button>
            </div>
        `;

        li.dataset.index = index;
        taskList.appendChild(li);
    });

    saveTasks();
}

addBtn.addEventListener("click", () => {
    const text = taskInput.value.trim();

    if (!text) return;

    tasks.push({
        text,
        completed:false
    });

    taskInput.value = "";
    renderTasks();
});

taskList.addEventListener("click", (e) => {

    const index = e.target.closest("li").dataset.index;

    if(e.target.classList.contains("complete")){
        tasks[index].completed = !tasks[index].completed;
    }

    if(e.target.classList.contains("delete")){
        tasks.splice(index,1);
    }

    if(e.target.classList.contains("edit")){
        let updated = prompt("Edit Task", tasks[index].text);

        if(updated){
            tasks[index].text = updated;
        }
    }

    renderTasks();
});

document.querySelectorAll("[data-filter]").forEach(btn => {

    btn.addEventListener("click", () => {

        filter = btn.dataset.filter;
        renderTasks();

    });

});

renderTasks();