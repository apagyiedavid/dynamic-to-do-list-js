// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    function addTask() {
        // Get and trim the input value
        const taskText = taskInput.value.trim();

        // Check if input is empty
        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        // Create a new list item (li)
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // Add click event to remove the task
        removeBtn.onclick = function() {
            taskList.removeChild(li);
        };

        // Append the remove button to the list item
        li.appendChild(removeBtn);

        // Add the new list item to the task list
        taskList.appendChild(li);

        // Clear input field after adding
        taskInput.value = '';
    }

    // Add event listener to the Add Task button
    addButton.addEventListener('click', addTask);

    // Allow pressing "Enter" key to add a task
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Optionally call addTask() when the page loads
    // (for future data-fetching features)
});
