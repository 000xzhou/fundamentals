let idCounter = 1
const memo = document.querySelector("#memo")
const todoList = document.querySelector("#todo-list")
const submit = document.querySelector("#submit")
const deleteComplete = document.querySelector("#delete-completed")
const deletetodoList = document.querySelector("#delete-todoList")
    
// add/create new todo
function addTodo() {
    const listItem = document.createElement("li")
    const checkbox = document.createElement("input")
    const label = document.createElement("label")
    checkbox.setAttribute("type", "checkbox")
    checkbox.id = `item_${idCounter}`
    // listItem.textContent = memo.value
    label.setAttribute("for", checkbox.id)
    label.textContent = memo.value

    // checkbox.textContent = memo.value
    listItem.appendChild(checkbox)
    listItem.appendChild(label)
    todoList.appendChild(listItem)
    idCounter++
    memo.value = ""
}


//mark todo complete (cross out text)
function completeTodo() {
    const checkboxes = document.querySelectorAll("input[type='checkbox']")
    checkboxes.forEach(checkbox=> {
            const label = checkbox.nextElementSibling
            if(checkbox.checked) {
                // console.log("check")
                label.classList.add("crossed-out")
            } else {
                label.classList.remove("crossed-out")
            }
        })
}

// delete/remove completed
function deleteCompleteTodo() {
    const checkboxes = document.querySelectorAll("input[type='checkbox']")
    checkboxes.forEach( checkbox => {
        if(checkbox.checked) {
            checkbox.parentElement.remove()
        }
    })
}

// delete/remove todo
function deleteTodo() {
    todoList.innerHTML = ""
}

// save to localStorage
submit.addEventListener("click", (e)=> {
    e.preventDefault()
    addTodo()
})
todoList.addEventListener("change", completeTodo)
deleteComplete.addEventListener("click", deleteCompleteTodo)
deletetodoList.addEventListener("click", deleteTodo)