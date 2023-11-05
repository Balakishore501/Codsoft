document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('task');
    const addTaskButton = document.getElementById('addTask');
    const taskList = document.getElementById('taskList');
    const clearCompletedButton = document.getElementById('clearCompleted');

    addTaskButton.addEventListener('click', function () {
        const taskText = taskInput.value;
        if (taskText) {
            const li = createTaskElement(taskText);
            taskList.appendChild(li);
            taskInput.value = '';
            saveTasksToLocalStorage();
        }
    });

    taskList.addEventListener('click', function (e) {
        if (e.target.classList.contains('delete')) {
            e.target.parentElement.remove();
            saveTasksToLocalStorage();
        } else if (e.target.classList.contains('edit')) {
            const li = e.target.parentElement;
            const taskText = li.querySelector('.task-text');
            const newText = prompt('Edit task:', taskText.textContent);
            if (newText !== null) {
                taskText.textContent = newText;
                saveTasksToLocalStorage();
            } 
        } else if (e.target.classList.contains('complete')) {
            e.target.parentElement.classList.toggle('completed');
            saveTasksToLocalStorage();
        }
    });

    clearCompletedButton.addEventListener('click', function () {
        const completedTasks = document.querySelectorAll('.completed');
        completedTasks.forEach((task) => {
            task.remove();
        });
        saveTasksToLocalStorage();
    });

    function createTaskElement(text) {
        const li = document.createElement('li');
        li.classList.add('task-item');
        const taskText = document.createElement('span');
        taskText.classList.add('task-text');
        taskText.textContent = text;
        const editButton = createButton('edit', 'Edit');
		const deleteButton = createButton('delete', 'Delete');
        const completeButton = createButton('complete', 'Complete');
        li.appendChild(taskText);
        li.appendChild(editButton);
		li.appendChild(deleteButton);
        li.appendChild(completeButton);
        return li;
    }

    function createButton(className, text) {
        const button = document.createElement('button');
        button.classList.add(className);
        button.textContent = text;
        return button;
    }

    function saveTasksToLocalStorage() {
        const tasks = [];
        const taskElements = document.querySelectorAll('.task-item');
        taskElements.forEach((taskElement) => {
            tasks.push({
                text: taskElement.querySelector('.task-text').textContent,
                completed: taskElement.classList.contains('completed'),
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasksFromLocalStorage() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach((task) => {
            const li = createTaskElement(task.text);
            if (task.completed) {
                li.classList.add('completed');
            }
            taskList.appendChild(li);
        });
    }

    loadTasksFromLocalStorage();
});
