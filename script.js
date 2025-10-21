       // Wait for the DOM to be fully loaded before executing the script
        document.addEventListener('DOMContentLoaded', function() {
            // Select DOM elements
            const addButton = document.getElementById('add-task-btn');
            const taskInput = document.getElementById('task-input');
            const taskList = document.getElementById('task-list');

            // Function to add a new task
            function addTask() {
                // Retrieve and trim the value from the task input field
                const taskText = taskInput.value.trim();
                
                // Check if taskText is not empty
                if (taskText === "") {
                    // Alert the user to enter a task if input is empty
                    alert("Please enter a task!");
                    return;
                }
                
                // Create a new li element
                const listItem = document.createElement('li');
                
                // Set the text content of the li element to the task text
                listItem.textContent = taskText;
                
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
                };
                
                // Append the remove button to the li element
                listItem.appendChild(removeButton);
                
                // Append the li element to taskList
                taskList.appendChild(listItem);
                
                // Clear the task input field
                taskInput.value = "";
            }

            // Add event listener to addButton that calls addTask when clicked
            addButton.addEventListener('click', addTask);
            
            // Add event listener to taskInput for the 'keypress' event
            taskInput.addEventListener('keypress', function(event) {
                // Check if the pressed key is 'Enter'
                if (event.key === 'Enter') {
                    // Call addTask function when Enter key is pressed
                    addTask();
                }
            });
        });