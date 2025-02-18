document.addEventListener('DOMContentLoaded', () => {
    const addTaskButton = document.getElementById('add-task');
    const todoList = document.getElementById('todo-list');
    const categoryTitle = document.getElementById('category-title');
    const categoryLinks = document.querySelectorAll('.sidebar ul li a');
    const taskInputContainer = document.getElementById('task-input-container');
    const taskInput = document.getElementById('task-input');
    const submitTaskButton = document.getElementById('submit-task');
    const cancelTaskButton = document.getElementById('cancel-task');
  
    let currentCategory = 'my-day';
    let tasks = JSON.parse(localStorage.getItem(currentCategory)) || [];
  
    
    loadTasks();
  
    addTaskButton.addEventListener('click', () => {
      taskInputContainer.classList.add('show'); 
      taskInput.focus(); 
    });
  
    submitTaskButton.addEventListener('click', () => {
      const taskText = taskInput.value.trim();
      if (taskText) {
        tasks.push({ text: taskText });
        saveTasks();
        loadTasks();
        taskInput.value = ''; 
        taskInputContainer.classList.remove('show'); 
      }
    });
  
    
    cancelTaskButton.addEventListener('click', () => {
      taskInput.value = ''; 
      taskInputContainer.classList.remove('show'); 
    });
  
    
    categoryLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        currentCategory = link.getAttribute('data-category');
        categoryTitle.textContent = link.textContent;
        tasks = JSON.parse(localStorage.getItem(currentCategory)) || [];
        loadTasks();
      });
    });
  
    
    function loadTasks() {
      todoList.innerHTML = '';
      tasks.forEach((task, index) => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');
        taskElement.innerHTML = `
          <span>${task.text}</span>
          <div class="task-actions">
            <button class="update" onclick="updateTask(${index})">Update</button>
            <button class="delete" onclick="deleteTask(${index})">Delete</button>
          </div>
        `;
        todoList.appendChild(taskElement);
  
        setTimeout(() => {
          taskElement.classList.add('show');
        }, 10);
      });
    }
  
    function saveTasks() {
      localStorage.setItem(currentCategory, JSON.stringify(tasks));
    }
  
    window.updateTask = (index) => {
      const newText = prompt('Update your task:', tasks[index].text);
      if (newText) {
        tasks[index].text = newText;
        saveTasks();
        loadTasks();
      }
    };
  

    window.deleteTask = (index) => {
      if (confirm('Are you sure you want to delete this task?')) {
        const taskElement = document.querySelectorAll('.task')[index];
        taskElement.classList.add('removing'); 
        setTimeout(() => {
          tasks.splice(index, 1);
          saveTasks();
          loadTasks();
        }, 300); 
      }
    };
  });