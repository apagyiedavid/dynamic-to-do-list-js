// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Array to hold tasks in memory
    let tasks = [];

    // Load tasks from localStorage on startup
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks = storedTasks;
        storedTasks.forEach(taskText => {
            createTaskElement(taskText);
        });
    }

    // Save the current tasks array to localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Create a task list item in the DOM for a given task text
    // Parameter save = false when we are loading, so we don't duplicate the save logic
    function createTaskElement(taskText, save = true) {
        // Create a new list item (li)
        const li = document.createElement('li');

        // Create span to hold the task text
        const span = document.createElement('span');
        span.textContent = taskText;
        li.appendChild(span);

        // Create a remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // Add click event to remove the task
        removeBtn.addEventListener('click', () => {
            // Remove from DOM
            taskList.removeChild(li);
            // Remove from array
            tasks = tasks.filter(t => t !== taskText);
            // Save updated tasks
            saveTasks();
        });

        // Append button to the list item
        li.appendChild(removeBtn);

        // Add the list item to the task list in the DOM
        taskList.appendChild(li);

        // If save flag is true, we are in “adding new task” mode, so add to array & save
        if (save) {
            tasks.push(taskText);
            saveTasks();
        }
    }

    // Function to add a new task (gets called by event handlers)
    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        createTaskElement(taskText, true);

        // Clear the input field
        taskInput.value = '';
    }

    // Attach event listener to the Add Task button
    addButton.addEventListener('click', addTask);

    // Allow pressing “Enter” key to add a task
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load existing tasks from localStorage when the page loads
    loadTasks();
});
