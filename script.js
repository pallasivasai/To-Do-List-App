document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task');
    const addTaskButton = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');

    addTaskButton.addEventListener('click', addTask);
    taskList.addEventListener('click', handleTaskActions);

    loadTasks();

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') {
            alert('Task cannot be empty');
            return;
        }

        const taskItem = createTaskItem(taskText);
        taskList.appendChild(taskItem);
        saveTasks();

        taskInput.value = '';
    }

    function createTaskItem(taskText) {
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';

        const taskCheckbox = document.createElement('input');
        taskCheckbox.type = 'checkbox';
        taskCheckbox.className = 'task-checkbox';

        const taskDescription = document.createElement('span');
        taskDescription.className = 'task-text';
        taskDescription.textContent = taskText;

        const taskActions = document.createElement('div');
        taskActions.className = 'task-actions';

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'edit-task';

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-task';

        taskActions.appendChild(editButton);
        taskActions.appendChild(deleteButton);

        taskItem.appendChild(taskCheckbox);
        taskItem.appendChild(taskDescription);
        taskItem.appendChild(taskActions);

        return taskItem;
    }

    function handleTaskActions(event) {
        const target = event.target;

        if (target.classList.contains('task-checkbox')) {
            const taskItem = target.parentElement;
            taskItem.classList.toggle('completed');
            saveTasks();
        }

        if (target.classList.contains('edit-task')) {
            const taskItem = target.parentElement.parentElement;
            const taskDescription = taskItem.querySelector('.task-text');
            const newTaskText = prompt('Edit task:', taskDescription.textContent);
            if (newTaskText !== null && newTaskText.trim() !== '') {
                taskDescription.textContent = newTaskText.trim();
                saveTasks();
            }
        }

        if (target.classList.contains('delete-task')) {
            const taskItem = target.parentElement.parentElement;
            taskItem.remove();
            saveTasks();
        }
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('.task-item').forEach(taskItem => {
            tasks.push({
                text: taskItem.querySelector('.task-text').textContent,
                completed: taskItem.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const taskItem = createTaskItem(task.text);
            if (task.completed) {
                taskItem.classList.add('completed');
                taskItem.querySelector('.task-checkbox').checked = true;
            }
            taskList.appendChild(taskItem);
        });
    }
});
