        // Wait for the DOM to be fully loaded before executing the script
        document.addEventListener('DOMContentLoaded', function() {
            // Select DOM elements
            const addButton = document.getElementById('add-task-btn');
            const taskInput = document.getElementById('task-input');
            const taskList = document.getElementById('task-list');

            // Load tasks from Local Storage when the page loads
            loadTasks();

            // Function to load tasks from Local Storage
            function loadTasks() {
                // Retrieve tasks from Local Storage or initialize empty array
                const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
                
                // Create task elements for each stored task
                storedTasks.forEach(taskText => {
                    addTask(taskText, false); // 'false' indicates not to save again to Local Storage
                });
            }

            // Function to add a new task
            function addTask(taskText, save = true) {
                // If taskText is provided as parameter, use it; otherwise get from input field
                const actualTaskText = typeof taskText === 'string' ? taskText : taskInput.value.trim();
                
                // Check if taskText is not empty
                if (actualTaskText === "") {
                    // Alert the user to enter a task if input is empty
                    alert("Please enter a task!");
                    return;
                }
                
                // Create a new li element
                const listItem = document.createElement('li');
                
                // Set the text content of the li element to the task text
                listItem.textContent = actualTaskText;
                
                // Create a new button element for removing the task
                const removeButton = document.createElement('button');
                
                // Set the text content of the remove button to "Remove"
                removeButton.textContent = "Remove";
                
                // Give the remove button a class name of 'remove-btn'
                removeButton.className = 'remove-btn';
                
                // Assign an onclick event to the remove button
                removeButton.onclick = function() {
                    // Remove the li element from taskList when clicked
                    taskList.removeChild(listItem);
                    
                    // Update Local Storage after removal
                    updateLocalStorage();
                };
                
                // Append the remove button to the li element
                listItem.appendChild(removeButton);
                
                // Append the li element to taskList
                taskList.appendChild(listItem);
                
                // Clear the task input field only if we're adding from input
                if (typeof taskText !== 'string') {
                    taskInput.value = "";
                }
                
                // Save to Local Storage if save parameter is true
                if (save) {
                    updateLocalStorage();
                }
            }

            // Function to update Local Storage with current tasks
            function updateLocalStorage() {
                // Get all task text from the DOM
                const tasks = [];
                const taskElements = taskList.querySelectorAll('li');
                
                taskElements.forEach(taskElement => {
                    // Get text content without the remove button text
                    const taskText = taskElement.childNodes[0].textContent;
                    tasks.push(taskText);
                });
                
                // Save tasks array to Local Storage
                localStorage.setItem('tasks', JSON.stringify(tasks));
            }

            // Add event listener to addButton that calls addTask when clicked
            addButton.addEventListener('click', function() {
                addTask(undefined, true); // Call with default parameters
            });
            
            // Add event listener to taskInput for the 'keypress' event
            taskInput.addEventListener('keypress', function(event) {
                // Check if the pressed key is 'Enter'
                if (event.key === 'Enter') {
                    // Call addTask function when Enter key is pressed
                    addTask(undefined, true); // Call with default parameters
                }
            });
        });