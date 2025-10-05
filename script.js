// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage if any
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Function to render tasks on the page
    function renderTasks() {
        taskList.innerHTML = ''; // Clear the current list
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.textContent = task;

            // Create remove button
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.className = 'remove-btn';

            // Remove task on click
            removeBtn.onclick = function () {
                tasks.splice(index, 1); // Remove task from array
                localStorage.setItem('tasks', JSON.stringify(tasks)); // Update localStorage
                renderTasks(); // Re-render tasks
            };

            li.appendChild(removeBtn);
            taskList.appendChild(li);
        });
    }

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }
        tasks.push(taskText); // Add task to array
        localStorage.setItem('tasks', JSON.stringify(tasks)); // Save to localStorage
        taskInput.value = ''; // Clear input
        renderTasks(); // Re-render tasks
    }

    // Add event listener for button click
    addButton.addEventListener('click', addTask);

    // Add event listener for Enter key
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Initial rendering of tasks
    renderTasks();
});
