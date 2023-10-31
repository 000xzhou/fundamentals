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
    label.textContent = " " +memo.value

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

submit.addEventListener("click", (e)=> {
    e.preventDefault()
    addTodo()
    savetoLocal()

})
todoList.addEventListener("change", ()=> {
    completeTodo()
    savetoLocal()

})

deleteComplete.addEventListener("click", ()=> {
    deleteCompleteTodo()
    savetoLocal()
})
deletetodoList.addEventListener("click", () =>{
    deleteTodo()
    savetoLocal()
})


// save to local
function savetoLocal() {
    const listData = []
    const listItemsWithCheckboxes = document.querySelectorAll('ul li')
    listItemsWithCheckboxes.forEach(function(item) {
    let text = item.textContent.trim() // Get the text content
    let isChecked = item.querySelector('input[type="checkbox"]').checked // Check if the checkbox is checked 
    listData.push({ text, isChecked })
    })
    localStorage.setItem('myListData', JSON.stringify(listData))
}


function loadSaveLocal() {
    const storedListDataJSON = localStorage.getItem('myListData')
    todoList.innerHTML = ''
    if (storedListDataJSON) {
        let listDatatwo = JSON.parse(storedListDataJSON)
        listDatatwo.forEach((itemData)=> {
            addTodo2(itemData)
        })
    }
}

function addTodo2(memo2) {
    const listItem = document.createElement("li")
    const checkbox = document.createElement("input")
    const label = document.createElement("label")
    checkbox.setAttribute("type", "checkbox")
    checkbox.id = `item_${idCounter}`
    label.textContent = " " + memo2.text
    label.setAttribute("for", checkbox.id)
            checkbox.checked = memo2.isChecked
    if(checkbox.checked) {
                label.classList.add("crossed-out")
            } else {
                label.classList.remove("crossed-out")
            }
    listItem.appendChild(checkbox)
    listItem.appendChild(label)
    todoList.appendChild(listItem)
    idCounter++
    memo2.value = ""
}

loadSaveLocal()