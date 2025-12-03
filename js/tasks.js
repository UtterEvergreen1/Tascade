const tasks = document.querySelectorAll('.task');
const columns = document.querySelectorAll('.column');
let draggedTask = null;
let touchStartY = 0;
let touchStartX = 0;

function addColumnDragEvents(column) {
    column.addEventListener('dragover', e => {
        e.preventDefault();
        column.classList.add('drag-over');
    });
    column.addEventListener('dragleave', e => {
        // Only remove the class if we're leaving the column entirely
        if (!column.contains(e.relatedTarget)) {
            column.classList.remove('drag-over');
        }
    });
    column.addEventListener('drop', () => {
        handleDrop(column);
    });
    column.addEventListener('dragend', () => {
        column.classList.remove('drag-over');
    });

}

function renderTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks.forEach(task => addTaskToBoard(task.text, task.column));
}

function deleteTask(taskElement) {
    taskElement.remove();
    updateLocalStorage();
}

function addTaskToBoard(text, columnId) {
    // create a new task element
    const task = document.createElement('div');
    task.className = 'task';

    // make the task element content
    const taskText = document.createElement('span');
    taskText.textContent = text;

    // create delete button
    const deleteButton = document.createElement('i');
    deleteButton.className = 'fa fa-trash delete-btn ms-auto';
    deleteButton.onclick = () => deleteTask(task);

    // append text and delete button to task
    task.appendChild(taskText);
    task.appendChild(deleteButton);

    // append task to the specified column
    document.getElementById(columnId).appendChild(task);

    // add drag events
    addDragEvents(task);
    addTouchEvents(task);
}

function handleDrop(column) {
    column.classList.remove('drag-over');
    if (draggedTask) {
        const oldColumn = draggedTask.parentElement;

        column.appendChild(draggedTask);
        updateLocalStorage();

        if (column.id === "done" && oldColumn.id !== "done") {
            points += 10;
            updatePointsDisplay();
            savePoints();
        }


        if (oldColumn.id === "done" && column.id !== "done") {
            points -= 10;
            if (points < 0) points = 0;
            updatePointsDisplay();
            savePoints();
        }
    }
}

function addDragEvents(task) {
    task.setAttribute('draggable', 'true');

    task.addEventListener('dragstart', () => {
        draggedTask = task;
    });

    task.addEventListener('dragend', () => {
        draggedTask = null;
    });
}

function addTouchEvents(task) {
    task.addEventListener('touchstart', e => {
        draggedTask = task;
        const touch = e.touches[0];
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
        task.classList.add('dragging');
    });

    task.addEventListener('touchmove', e => {
        e.preventDefault();
        const touch = e.touches[0];
        const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);

        // Remove previous drag-over classes
        Array.from(columns).forEach(col => col.classList.remove('drag-over'));

        // Find the column below the touch point
        const columnBelow = elementBelow?.closest('.column');
        if (columnBelow) {
            columnBelow.classList.add('drag-over');
        }
    });

    task.addEventListener('touchend', e => {
        const touch = e.changedTouches[0];
        const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
        const columnBelow = elementBelow?.closest('.column');

        if (columnBelow) {
            handleDrop(columnBelow);
        }

        task.classList.remove('dragging');
        Array.from(columns).forEach(col => col.classList.remove('drag-over'));
        draggedTask = null;
    });
}

function updateLocalStorage() {
    const tasks = [];
    columns.forEach(column => {
        column.querySelectorAll('.task').forEach(task => {
            tasks.push({ text: task.textContent, column: column.id });
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

columns.forEach(column => {
    addColumnDragEvents(column);
});

renderTasks();