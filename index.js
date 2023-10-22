const input = document.querySelector(".input-box");
const ul = document.querySelector("ul");
const btn = document.querySelector(".but");

// Load tasks from localStorage when the page loads
const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

function addTask(taskText) {
    const li = document.createElement("li");
    li.innerHTML = `
        <span class="task-text">${taskText}</span>
        <span class="icons">
            <i class="fas fa-check-circle complete"></i>
            <i class="fas fa-edit edit"></i>
            <i class="fas fa-trash-alt delete"></i>
        </span>
    `;
    ul.appendChild(li);
}

// Load saved tasks when the page loads
savedTasks.forEach(taskText => {
    addTask(taskText);
});

btn.addEventListener("click", function() {
    const taskText = input.value;
    if (taskText.trim() !== "") {
        addTask(taskText);
        savedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(savedTasks));
        input.value = "";
    }
});

ul.addEventListener("click", function(event) {
    const target = event.target;

    if (target.classList.contains('complete')) {
        const li = target.parentElement.parentElement;
        li.classList.toggle("completed");
    } else if (target.classList.contains('edit')) {
        const li = target.parentElement.parentElement;
        const text = li.querySelector('.task-text');
        const newText = prompt("Edit task:", text.textContent);
        if (newText !== null) {
            text.textContent = newText;
            const index = Array.from(ul.children).indexOf(li);
            savedTasks[index] = newText;
            localStorage.setItem('tasks', JSON.stringify(savedTasks));
        }
    } else if (target.classList.contains('delete')) {
        const li = target.parentElement.parentElement;
        const index = Array.from(ul.children).indexOf(li);
        savedTasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(savedTasks));
        ul.removeChild(li);
    }
});