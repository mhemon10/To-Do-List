
let tasks = [];

const saveTasks = () => {
    localStorage.setItem('task', JSON.stringify(tasks));
};

const addTask = () => {
  const taskInput = document.getElementById("taskInput");
  const text = taskInput.value.trim();

  if (text) {
    tasks.push({ text: text, completed: false });
  }

    updateTaskList();
    updateStates();
    
};

const toggleTestComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
    updateStates();
    saveTasks();

}

//for dellet task
const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTaskList();
    updateStates();
    saveTasks();

}

//edit functionality

const editTask = (index) => {
  const taskInput = document.getElementById("taskInput");
  taskInput.value = tasks[index].text;
  tasks.splice(index, 1);
    updateTaskList();
    updateStates();
    saveTasks();

};

//Update States
const updateStates = () => {
  const completeTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;
  const progress = totalTasks === 0 ? 0 : (completeTasks / totalTasks) * 100;

  const progressBar = document.getElementById("progress");
  progressBar.style.width = `${progress}%`;

  const numbersText = document.getElementById("numbers");
  numbersText.textContent = `${completeTasks} / ${totalTasks}`;
};


const updateTaskList = () => {
    const taskList = document.getElementById('task-list')
    taskList.innerHTML = ''
    
    tasks.forEach((task,index) => {
        const listItem = document.createElement('li')
        listItem.innerHTML = `
        
         <div class="taskItem">
        <div class="task" ${task.completed ? 'completed':''}>
            <input type="checkbox" class="checkbox"${task.completed ? "checked" : ""} />
            <p>${task.text}</p>
        </div>
        <div class="icons">
            <img src="./img/edit.png" onclick="editTask(${index})"/>
            <img src="./img/bin.png" onclick="deleteTask(${index})"/>
        </div>
    </div>
        
        
        `;
        listItem.addEventListener('change', () => toggleTestComplete(index));
        taskList.append(listItem);
});
};

document.getElementById("newTask").addEventListener("click", function (e) {
  e.preventDefault();
  addTask();
});
