const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

let todos = [];
let id = 0;

// retrieving objects and current id from localStorage
if(localStorage.length > 0) { 
  for(let i = 0; i < localStorage.length; i++) {
    todos.push(JSON.parse(window.localStorage.getItem(localStorage.key(i))));
  }
  todos.sort((a, b) => a - b);
  id = todos.reduce((max, current) => max.id > current.id ? max : current).id + 1; // retrieved id from last session 
  render();
}

window.onclose = function()
{
  window.localStorage.setItem(id, JSON.stringify(id));
}

// 
// TODO implementation
// 

function newTodo() {
  const text = prompt("Enter task to do")
  const todo = {
    id,
    text,
    checked: false
  }
  todos.push(todo)
  window.localStorage.setItem(id, JSON.stringify(todo))
  id++
  render()
}

function render() {
  list.innerHTML = ''
  todos.map(todo => renderTodo(todo)).forEach(todo => list.append(todo))
  itemCountSpan.textContent = todos.length
  uncheckedCountSpan.textContent = todos.filter(todo => todo.checked == false).length
}

function renderTodo({id, text, checked}) {
  const li = document.createElement("li");
  li.innerHTML = `
  <input type="checkbox" ${checked == true ? 'checked' : "" } onChange="toggleTodo(${id})">
  <span>${text}</span>
  <button onClick="deleteTodo(${id})">delete</button>
  `
  return li
}

function deleteTodo(id) {
  todos = todos.filter(a => a.id !== id);
  window.localStorage.removeItem(id)
  render();
}

function toggleTodo(id) {
  todos = todos.map(todo => todo.id === id ? {...todo, checked: !todo.checked} : todo)
  render()
}

