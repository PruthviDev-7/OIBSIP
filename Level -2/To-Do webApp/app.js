// Improved To-Do app script
const taskInput = document.getElementById('taskInput');
const pendingList = document.getElementById('pendingList');
const completedList = document.getElementById('completedList');
const addBtn = document.getElementById('addBtn');
const pendingCount = document.getElementById('pendingCount');
const completedCount = document.getElementById('completedCount');

const STORAGE_KEY = 'todoTasks_v1';

let tasks = [];

function getCurrentTime() {
  return new Date().toLocaleString();
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    tasks = raw ? JSON.parse(raw) : [];
  } catch (e) {
    tasks = [];
  }
}

function addTask() {
  const text = taskInput.value.trim();
  if (!text) {
    taskInput.focus();
    return;
  }

  const task = {
    id: Date.now().toString(),
    text,
    createdAt: getCurrentTime(),
    completed: false,
    completedAt: null
  };

  tasks.unshift(task);
  saveTasks();
  render();
  taskInput.value = '';
  taskInput.focus();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  render();
}

function toggleComplete(id) {
  tasks = tasks.map(t => {
    if (t.id === id) {
      const completed = !t.completed;
      return {
        ...t,
        completed,
        completedAt: completed ? getCurrentTime() : null
      };
    }
    return t;
  });
  saveTasks();
  render();
}

function editTask(id) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;
  const newText = prompt('Edit your task:', task.text);
  if (newText && newText.trim()) {
    task.text = newText.trim();
    saveTasks();
    render();
  }
}

function createTaskElement(task) {
  const li = document.createElement('li');
  li.className = 'task-item';

  const info = document.createElement('div');
  info.className = 'task-info';

  const title = document.createElement('strong');
  title.innerText = task.text;
  title.setAttribute('aria-label', 'task-title');

  const time = document.createElement('div');
  time.className = 'time';
  time.innerText = task.completed ? `Completed: ${task.completedAt}` : `Added: ${task.createdAt}`;

  info.appendChild(title);
  info.appendChild(time);

  const actions = document.createElement('div');
  actions.className = 'task-buttons';

  // Complete / Undo button
  const compBtn = document.createElement('button');
  compBtn.className = 'btn-comp';
  compBtn.innerText = task.completed ? 'Undo' : 'Complete';
  compBtn.title = task.completed ? 'Mark as pending' : 'Mark as completed';
  compBtn.addEventListener('click', () => toggleComplete(task.id));

  // Edit
  const editBtn = document.createElement('button');
  editBtn.className = 'btn-edit';
  editBtn.innerText = 'Edit';
  editBtn.addEventListener('click', () => editTask(task.id));

  // Delete
  const delBtn = document.createElement('button');
  delBtn.className = 'btn-del';
  delBtn.innerText = 'Delete';
  delBtn.addEventListener('click', () => {
    if (confirm('Delete this task?')) deleteTask(task.id);
  });

  if (!task.completed) actions.appendChild(compBtn);
  actions.appendChild(editBtn);
  actions.appendChild(delBtn);

  li.appendChild(info);
  li.appendChild(actions);

  return li;
}

function render() {
  // Clear lists
  pendingList.innerHTML = '';
  completedList.innerHTML = '';

  const pending = tasks.filter(t => !t.completed);
  const completed = tasks.filter(t => t.completed);

  if (pending.length === 0) {
    const empty = document.createElement('li');
    empty.className = 'empty';
    empty.innerText = 'No pending tasks — add one above.';
    pendingList.appendChild(empty);
  } else {
    pending.forEach(t => pendingList.appendChild(createTaskElement(t)));
  }

  if (completed.length === 0) {
    const empty = document.createElement('li');
    empty.className = 'empty';
    empty.innerText = 'No completed tasks yet.';
    completedList.appendChild(empty);
  } else {
    completed.forEach(t => completedList.appendChild(createTaskElement(t)));
  }

  pendingCount.innerText = pending.length;
  completedCount.innerText = completed.length;
}

// Event wiring
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTask();
});

// Init
loadTasks();
render();