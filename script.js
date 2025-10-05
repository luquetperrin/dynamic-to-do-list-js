document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // false: don't save again
    }

    // Add task function
    function addTask(taskTextParam = null, save = true) {
        const taskText = taskTextParam || taskInput.value.trim();
        if (taskText === "") {
            if (!taskTextParam) alert("Please enter a task.");
            return;
        }

        // Create list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.classList.add('remove-btn');
        removeBtn.onclick = () => {
            taskList.removeChild(li);
            updateLocalStorage();
        };

        // Append remove button to list item and list item to task list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Save to Local Storage
        if (save) {
            updateLocalStorage();
        }

        // Clear input if manually added
        if (!taskTextParam) taskInput.value = "";
    }

    // Update Local Storage with current tasks
    function updateLocalStorage() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            // Exclude the Remove button text
            const text = li.firstChild.textContent;
            tasks.push(text);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Event listeners
    addButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') addTask();
    });

    // Initial load
    loadTasks();
});

