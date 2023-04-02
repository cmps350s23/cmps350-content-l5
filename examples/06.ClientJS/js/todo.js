const addToDoButton = document.querySelector('#addToDo')
const toDoList = document.querySelector('#toDoList')

function addToDo(toDo) {
    const p = document.createElement('p')
    p.classList.add('paragraph-styling')
    p.innerText = toDo
    toDoList.appendChild(p)
    inputField.value = ""
    p.addEventListener('click', function(){
        p.style.textDecoration = "line-through"
    })
    p.addEventListener('dblclick', function(){
        toDoList.removeChild(p)
    })
}