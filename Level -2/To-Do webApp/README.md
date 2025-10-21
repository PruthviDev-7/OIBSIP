# ✅ To-Do Web App

A fully functional task management application built with HTML, CSS, and JavaScript. Features task creation, completion tracking, local storage persistence, and timestamps for all activities.

## 📋 Overview

This is a modern to-do list application that helps users manage their daily tasks efficiently. Tasks are automatically saved to browser storage, allowing users to persist their to-do items across browser sessions. The app separates tasks into "Pending" and "Completed" sections with real-time counters.

## ✨ Features

- **Add Tasks**: Create new tasks with a simple input interface
- **Task Management**: 
  - Mark tasks as complete/incomplete
  - Edit existing tasks
  - Delete tasks
- **Task Organization**: Automatic separation into Pending and Completed sections
- **Task Counters**: Real-time count of pending and completed tasks
- **Timestamps**: Automatic time tracking for task creation and completion
- **Local Storage**: All tasks persist across browser sessions
- **Data Validation**: Empty task prevention
- **Accessibility**: ARIA labels and semantic HTML
- **Responsive Design**: Beautiful gradient interface

## 🛠️ Technologies Used

- **HTML5**: Semantic structure with accessibility features
- **CSS3**: Gradient backgrounds, flexbox layout, responsive design
- **JavaScript (ES6+)**: Task logic, local storage management, DOM manipulation
- **localStorage API**: Persistent data storage
- **ARIA**: Accessibility compliance

## 📁 File Structure

```
To-Do webApp/
├── index.html      # Main HTML structure with form and task lists
├── style.css       # Styling and layout
├── app.js          # Task management logic
└── README.md       # This file
```

## 🚀 How to Use

### Getting Started
1. **Open** `index.html` in your web browser
2. You'll see an empty task list with two sections

### Adding Tasks
1. **Type** your task in the text input field "Enter new task..."
2. Press **Enter** or click the **Add** button
3. Task appears in the **Pending Tasks** section
4. Counter updates automatically

### Managing Tasks
- **Complete Task**: Click the checkbox next to a pending task to mark it as complete
- **Uncomplete Task**: Click the checkbox of a completed task to move it back to pending
- **Edit Task**: Click the **Edit** button (pencil icon) to modify the task text
- **Delete Task**: Click the **Delete** button (trash icon) to remove the task

### Task Information
- Each task displays:
  - Task text/title
  - **Added**: Timestamp when task was created
  - **Completed**: Timestamp when task was marked complete
- Timestamps auto-update when task status changes

## 💡 Code Architecture

### Data Structure
```javascript
{
  id: "1729512000000",          // Unique timestamp-based ID
  text: "Buy groceries",         // Task description
  createdAt: "10/21/2025, 10:00 AM",  // Creation timestamp
  completed: false,              // Completion status
  completedAt: null             // Completion timestamp (or date if completed)
}
```

### Core Functions

| Function | Purpose |
|----------|---------|
| `addTask()` | Add new task to the list |
| `deleteTask(id)` | Remove a task by ID |
| `toggleComplete(id)` | Mark/unmark task as complete |
| `editTask(id)` | Modify task text |
| `saveTasks()` | Save tasks to localStorage |
| `loadTasks()` | Load tasks from localStorage |
| `render()` | Update DOM with current tasks |

### Event Listeners
- **Add button click**: Trigger `addTask()`
- **Enter key in input**: Trigger `addTask()`
- **Checkbox click**: Trigger `toggleComplete()`
- **Edit button**: Trigger `editTask()`
- **Delete button**: Trigger `deleteTask()`

## 🎨 UI Components

### Task Input Section
```
┌─────────────────────────────┐
│ Enter new task...  [Add]   │
└─────────────────────────────┘
```

### Task Sections
```
📋 Pending Tasks [5]
├─ □ Task 1  [Edit] [Delete]
├─ □ Task 2  [Edit] [Delete]
└─ □ Task 3  [Edit] [Delete]

✅ Completed Tasks [3]
├─ ☑ Task 4  [Undo] [Delete]
└─ ☑ Task 5  [Undo] [Delete]
```

## 🔧 Customization

### Change Color Scheme
Edit CSS in `style.css`:
```css
body {
  background: linear-gradient(135deg, #74ebd5, #ACB6E5);  /* Change gradient */
}

button {
  background: #4a47a3;  /* Change button color */
}
```

### Modify Storage Key
Change in `app.js`:
```javascript
const STORAGE_KEY = 'myCustomTodoApp';  // Change storage identifier
```

### Add New Features
Examples in `app.js`:
```javascript
// Add priority levels
task = {
  ...task,
  priority: 'high'  // Add to task object
}

// Add due dates
task = {
  ...task,
  dueDate: '2025-10-22'  // Add to task object
}
```

## 💾 Local Storage

### Storage Location
- **Key**: `todoTasks_v1`
- **Type**: JSON string array
- **Size**: Browser dependent (typically 5-10MB)

### Accessing Storage
Open DevTools (F12):
1. Go to **Application** → **Local Storage**
2. Find `todoTasks_v1` key
3. Value contains JSON array of all tasks

### Clearing Data
```javascript
// In browser console
localStorage.removeItem('todoTasks_v1');
location.reload();
```

## 🎯 Workflow Example

```
1. User opens app
   └─ Tasks load from localStorage
   
2. User enters "Buy milk" and clicks Add
   └─ Task created with timestamp
   └─ Task appears in Pending section
   └─ Pending counter increments to 1
   
3. User marks task as complete
   └─ Task moves to Completed section
   └─ Completed timestamp recorded
   └─ Counters update
   
4. User edits task to "Buy organic milk"
   └─ Task text updated
   └─ Saved to localStorage
   
5. User closes browser
   └─ All tasks remain in localStorage
   
6. User reopens app
   └─ Tasks restored from localStorage
```

## 🐛 Browser Compatibility

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- IE 11: ⚠️ Partial (localStorage supported, ES6 features may need polyfills)

## ⚠️ Error Handling

The app handles:
- Empty input prevention
- Invalid JSON recovery (resets to empty array)
- Missing task IDs during deletion
- Corrupted localStorage data

## 📝 Future Enhancements

- [ ] Categories/Tags for tasks
- [ ] Task priority levels
- [ ] Due date management
- [ ] Task filtering and search
- [ ] Recurring tasks
- [ ] Dark mode toggle
- [ ] Cloud synchronization
- [ ] Multi-device sync
- [ ] Notifications/reminders
- [ ] Export tasks as PDF/CSV
- [ ] Drag and drop reordering
- [ ] Collaborative task lists

## 🔐 Data Privacy

- All data stored **locally** in browser
- No data sent to external servers
- Clearing browser cache/cookies removes tasks
- Each browser/device has separate data

## ⚡ Performance Tips

- App stores up to ~500 tasks efficiently
- Timestamps use `Date.now()` for performance
- UI updates use efficient DOM manipulation
- Event delegation could optimize for many tasks

## 👨‍💻 Author

Part of the OASIS INFOBYTE Level -2 Projects

## 📄 License

Free to use and modify for personal or educational purposes.

---

**Start organizing your tasks today!** 📝✨
