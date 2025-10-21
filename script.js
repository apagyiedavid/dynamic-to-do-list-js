 // Wait for the DOM to be fully loaded before executing the script
        document.addEventListener('DOMContentLoaded', function() {
            // Select DOM elements
            const addButton = document.getElementById('add-task-btn');
            const taskInput = document.getElementById('task-input');
            const taskList = document.getElementById('task-list');
            const totalTasksElement = document.getElementById('total-tasks');
            const completedTasksElement = document.getElementById('completed-tasks');
            
            // Initialize task counters
            let totalTasks = 0;
            let completedTasks = 0;
            
            // Function to update task statistics
            function updateStats() {
                totalTasksElement.textContent = `Total Tasks: ${totalTasks}`;
                completedTasksElement.textContent = `Completed: ${completedTasks}`;
            }
            
            // Function to create a new task item
            function createTaskElement(taskText) {
                // Create list item
                const listItem = document.createElement('li');
                listItem.className = 'task-item';
                
                // Create task text span
                const taskSpan = document.createElement('span');
                taskSpan.className = 'task-text';
                taskSpan.textContent = taskText;
                
                // Create remove button
                const removeButton = document.createElement('button');
                removeButton.className = 'remove-btn';
                removeButton.textContent = 'Remove';
                
                // Create task actions container
                const taskActions = document.createElement('div');
                taskActions.className = 'task-actions';
                
                // Add event listener to remove button
                removeButton.addEventListener('click', function() {
                    // Check if task is completed before removing
                    if (listItem.classList.contains('completed')) {
                        completedTasks--;
                    }
                    
                    // Remove the task from the list
                    taskList.removeChild(listItem);
                    totalTasks--;
                    
                    // Update statistics
                    updateStats();
                    
                    // Show empty state if no tasks remain
                    if (taskList.children.length === 0) {
                        showEmptyState();
                    }
                });
                
                // Add click event to mark task as completed
                taskSpan.addEventListener('click', function() {
                    listItem.classList.toggle('completed');
                    
                    if (listItem.classList.contains('completed')) {
                        completedTasks++;
                        taskSpan.style.textDecoration = 'line-through';
                        taskSpan.style.color = '#7f8c8d';
                    } else {
                        completedTasks--;
                        taskSpan.style.textDecoration = 'none';
                        taskSpan.style.color = '#333';
                    }
                    
                    updateStats();
                });
                
                // Append elements to list item
                taskActions.appendChild(removeButton);
                listItem.appendChild(taskSpan);
                listItem.appendChild(taskActions);
                
                return listItem;
            }
            
            // Function to show empty state
            function showEmptyState() {
                const emptyState = document.createElement('div');
                emptyState.className = 'empty-state';
                emptyState.innerHTML = `
                    <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15" stroke="#7f8c8d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5C15 5.55228 15.4477 6 16 6H8C8.55228 6 9 5.55228 9 5Z" stroke="#7f8c8d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M9 12H15" stroke="#7f8c8d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M9 16H15" stroke="#7f8c8d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <p>No tasks yet. Add a task to get started!</p>
                `;
                
                taskList.appendChild(emptyState);
            }
            
            // Function to add a new task
            function addTask() {
                // Get and trim the task text
                const taskText = taskInput.value.trim();
                
                // Check if the input is empty
                if (taskText === '') {
                    alert('Please enter a task!');
                    return;
                }
                
                // Remove empty state if it exists
                const emptyState = document.querySelector('.empty-state');
                if (emptyState) {
                    taskList.removeChild(emptyState);
                }
                
                // Create new task element
                const taskElement = createTaskElement(taskText);
                
                // Add the task to the list
                taskList.appendChild(taskElement);
                
                // Clear the input field
                taskInput.value = '';
                
                // Focus back to the input for better UX
                taskInput.focus();
                
                // Update task count
                totalTasks++;
                updateStats();
            }
            
            // Event listener for Add button click
            addButton.addEventListener('click', addTask);
            
            // Event listener for Enter key in the input field
            taskInput.addEventListener('keypress', function(event) {
                if (event.key === 'Enter') {
                    addTask();
                }
            });
            
            // Show empty state initially
            showEmptyState();
        });