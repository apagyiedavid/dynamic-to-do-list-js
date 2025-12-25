document.addEventListener('DOMContentLoaded', () => {
    // Select DOM Elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // 1. Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        // Use the second argument 'false' so addTask doesn't save them again during loading
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    // 2. Modified addTask function to handle Local Storage
    function addTask(taskText, save = true) {
        // Retrieve value from input if taskText is not provided (clicked from UI)
        if (typeof taskText !== 'string' || taskText === "") {
            taskText = taskInput.value.trim();
        }

        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create Task Element
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';

        // Remove functionality with Local Storage update
        removeButton.onclick = function() {
            taskList.removeChild(listItem);
            removeTaskFromStorage(taskText);
        };

        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);

        // Save to Local Storage if it's a new task
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }

        taskInput.value = "";
    }

    // 3. Helper function to remove a task from Local Storage
    function removeTaskFromStorage(taskTextToRemove) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        // Filter out the task that matches the removed text
        storedTasks = storedTasks.filter(task => task !== taskTextToRemove);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Event Listeners
    addButton.addEventListener('click', () => addTask());

    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // 4. Initialize the app by loading stored tasks
    loadTasks();
});