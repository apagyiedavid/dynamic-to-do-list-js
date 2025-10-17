document.addEventListener("DOMContentLoaded", function() {
  // Select DOM elements
  const addButton = document.getElementById("add-task");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  // Function to add a new task
  function addTask() {
    const taskText = taskInput.value.trim();

    // If input is empty, alert user to enter a task
    if (taskText === "") {
      alert("Please enter a task.");
      return;
    }

    // Create a new list item for this task
    const li = document.createElement("li");
    li.textContent = taskText;

    // Create a remove button for this task
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.className = "remove-btn";

    // When the remove button is clicked, remove the li from the list
    removeBtn.onclick = function() {
      taskList.removeChild(li);
    };

    // Append the remove button to the li, then append li to taskList
    li.appendChild(removeBtn);
    taskList.appendChild(li);

    // Clear the input field for the next task
    taskInput.value = "";
  }

  // Add event listener to “Add Task” button
  addButton.addEventListener("click", function() {
    addTask();
  });

  // Add “Enter key” listener on the input field
  taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      addTask();
    }
  });

  // Optionally, you could call addTask on DOMContentLoaded if you wanted a default task or something.
  // (Not required by instructions, so we won’t call it automatically.)
});
