// script.js

document.addEventListener('DOMContentLoaded', function() {
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList  = document.getElementById('task-list');

  // Load tasks from localStorage (if any) and render them
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function renderTasks() {
    taskList.innerHTML = '';  // clear existing list in DOM
    
    tasks.forEach(taskText => {
      const li = document.createElement('li');
      li.textContent = taskText;

      const removeBtn = document.createElement('button');
      removeBtn.textContent = 'Remove';
      removeBtn.className = 'remove-btn';

      removeBtn.addEventListener('click', function() {
        // remove from tasks array
        tasks = tasks.filter(t => t !== taskText);
        saveTasks();
        renderTasks();
      });

      li.appendChild(removeBtn);
      taskList.appendChild(li);
    });
  }

  function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') {
      alert('Please enter a task.');
      return;
    }
    tasks.push(taskText);
    saveTasks();
    renderTasks();
    taskInput.value = '';
  }

  addButton.addEventListener('click', addTask);

  taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      addTask();
    }
  });

  // Initially render tasks from localStorage
  renderTasks();
});
