const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Function to add a new task
function addTask() {
    if (inputBox.value === '') {
        alert("Please enter a task.");
        return;
    }

    const li = document.createElement('li');
    li.textContent = inputBox.value.trim();
    li.classList.add('task-item');

    // Add animation classes for smooth entry
    li.style.opacity = '0';
    li.style.transform = 'translateX(-20px)';
    setTimeout(() => {
        li.style.opacity = '1';
        li.style.transform = 'translateX(0)';
    }, 100);

    const span = document.createElement("span");
    span.textContent = "\u00d7";
    li.appendChild(span);
    listContainer.appendChild(li);

    inputBox.value = '';
    saveData();
}

// Event listener for clicks on list items and delete buttons
listContainer.addEventListener('click', function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        const li = e.target.parentElement;

        // Add animation classes for smooth exit
        li.style.opacity = '0';
        li.style.transform = 'translateX(-20px)';
        setTimeout(() => {
            li.remove();
            saveData();
        }, 300);
    }
}, false);

// Function to save tasks to localStorage
function saveData() {
    localStorage.setItem("tasks", listContainer.innerHTML);
}

// Function to load tasks from localStorage
function loadSavedTasks() {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        listContainer.innerHTML = savedTasks;
    }
}

// Load tasks when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadSavedTasks();
});
