const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Function to add a new task
function addTask() {
    if (inputBox.value.trim() === '') {
        alert("Please enter a task.");
        return;
    }

    const taskText = inputBox.value.trim();

    // Create a new list item (task)
    const li = document.createElement('li');
    li.textContent = taskText;
    li.classList.add('task-item');

    // Add animation classes for smooth entry
    li.style.opacity = '0';
    li.style.transform = 'translateX(-20px)';
    setTimeout(() => {
        li.style.opacity = '1';
        li.style.transform = 'translateX(0)';
    }, 100);

    // Create a delete button
    const span = document.createElement("span");
    span.textContent = "\u00d7";
    span.classList.add('close');
    li.appendChild(span);

    // Append the task to the list
    listContainer.appendChild(li);

    // Clear input box after adding task
    inputBox.value = '';

    // Save tasks to localStorage
    saveData();
}

// Event listener for Enter key press in input box
inputBox.addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Event listener for clicks on list items and delete buttons
listContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('close')) {
        // Remove task when delete button (span) is clicked
        const li = e.target.parentElement;

        // Add animation classes for smooth exit
        li.style.opacity = '0';
        li.style.transform = 'translateX(-20px)';
        setTimeout(() => {
            li.remove();
            saveData();
        }, 300);
    } else if (e.target.tagName === "LI") {
        // Toggle checked class on list item (task) click
        e.target.classList.toggle("checked");
        saveData();
    }
});

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

// Load saved tasks when the page loads
document.addEventListener('DOMContentLoaded', loadSavedTasks);
