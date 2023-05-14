// refrences
const form = document.querySelector('#form')
const todoListContainer = document.querySelector('#todolist-container')
const clearTodos = document.querySelector('#clear-todos')

// listen for the events
form.addEventListener('submit', addTodo)
clearTodos.addEventListener('click', clearAllTodos)

let todos = []
showTodoList()


function clearAllTodos() {
    delete localStorage.todos
    showTodoList()
}

function addTodo(e) {
    e.preventDefault()
    const todo = formToObject(e.target)
    todo.id = Date.now()
    todos.push(todo)

    localStorage.todos = JSON.stringify(todos)
    showTodoList()
    form.reset()
}

function showTodoList() {
    if (!localStorage.todos)
        todos = []
    else
        todos = JSON.parse(localStorage.todos)

    const todosHTML = todos.map(todo => todoToHTML(todo)).join(' ')
    todoListContainer.innerHTML = todosHTML

}

function todoToHTML(todo) {
    return ` 
        <div class="form-group todo" id="">
            <p class="todo-title ${todo.completed ? 'strike' : ''}" id="id-${todo.id}">${todo.title}</p>
            <input class="completed icon" type="checkbox" 
            onclick="changeTodoStatus(${todo.id})" ${todo.completed ? 'checked' : ''}>
            <i class="fa fa-trash icon" onclick="deleteTodoItem(${todo.id})"></i>
        </div>    
`
}

function changeTodoStatus(todoId) {

    const index = todos.findIndex(todo => todo.id == todoId)
    todos[index].completed = !todos[index].completed
    localStorage.todos = JSON.stringify(todos)
    showTodoList()
}

function deleteTodoItem(todoId) {
    console.log('called');
    const index = todos.findIndex(todo => todo.id == todoId)
    todos.splice(index, 1)
    localStorage.todos = JSON.stringify(todos)
    showTodoList()
}
function formToObject(form) {
    const formData = new FormData(form)
    console.log(formData);
    const data = {}

    for (const [key, value] of formData) {
        data[key] = value
    }

    return data;
}