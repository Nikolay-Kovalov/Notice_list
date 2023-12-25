const root = document.getElementById('root');
const toDoList = document.getElementById('toDoList');
const addTaskBtn = document.getElementById('addTaskBtn');
const toDoInput = document.getElementById('toDoInput');

addTaskBtn.addEventListener('click', addTask);
toDoList.addEventListener('click', deleteTask);
// toDoList.addEventListener('click', openEditWindow);
toDoList.addEventListener('click', makeTaskDone);


let i = 1 ;

function getFromLS(key) {
    const savedData = localStorage.getItem(key);
    return JSON.parse(savedData)
}

const tasks = getFromLS('myTasks') || [];
console.log(tasks)
    
function renderSavedTasks() {
    if (tasks.length) {
       i = tasks[0].id
   }

    tasks.forEach(item => {
    const li = document.createElement('li');

    li.innerHTML = `<p data-id = ${item.id} class="text">${item.task}</p>
    <div class="taskBtnWrapper">
    <button class="deleteBtn">Удалить</button>
    </div>`
    if (item.done) {
        li.firstElementChild.classList.add('linethrough');
        li.lastElementChild.lastElementChild.classList.add('disabled')
        }
        toDoList.appendChild(li) 

        i += 1
    
    });
}

renderSavedTasks()

let taskArr =  getFromLS('myTasks') || []; 
console.log(taskArr)

function addTask() {
    const text = toDoInput.value;
    if (!text) {
       showWorningWindow()
        return
    }

    const li = document.createElement('li');

    li.innerHTML = `<p data-id = ${i} class="text">${text}</p>
    <div class="taskBtnWrapper">
    <button class="deleteBtn">Удалить</button>
    <button class="editBtn">Редактировать</button>
    </div>`

    toDoList.appendChild(li)
    toDoInput.value = "";

        const task = {
        task: text,
            id: i,
        done: false,
    }
    taskArr.push(task)
        localStorage.setItem('myTasks',JSON.stringify(taskArr) )
    console.log(task)
    console.log(taskArr)
    i+=1
}

function deleteTask(evt) {
    if (evt.target.classList.contains("deleteBtn")) {
        taskArr = taskArr.filter(item => {
    console.log(item.id)
return item.id !== Number(evt.target.closest('li').firstElementChild.dataset.id)
     })
        console.log(evt.target.closest('li').firstElementChild.dataset.id)
        console.log(taskArr)
        evt.target.closest('li').remove()
        localStorage.setItem('myTasks',JSON.stringify(taskArr) )

    }
}

let textId = null;

// function openEditWindow(evt) {
//     const textToEdit = evt.target.closest('li').firstElementChild.textContent
//     textId = evt.target.closest('li').firstElementChild.dataset.id

//     if (evt.target.classList.contains("editBtn")) {
//         const backDrop = document.createElement('div');
//         backDrop.classList.add('backdrop');


//         const modal = document.createElement('div');
//         modal.innerHTML = `
//     <button class="modalEditBtn">Редактировать</button>
// `
//         const textArea = document.createElement('textarea');
//         textArea.cols = "30";
//         textArea.rows = "10";
//         textArea.classList.add('textarea');
//         textArea.textContent = textToEdit;
//         modal.prepend(textArea)
//         modal.classList.add('modal');

//         backDrop.appendChild(modal);
//         document.body.appendChild(backDrop);
//         document.querySelector(".modalEditBtn").addEventListener('click', editTask)
//         document.body.classList.add('open');
//         backDrop.addEventListener('click', onBackdropClick)
//         document.body.addEventListener('keydown', onEscPress)
//     }

// }

function editTask() {
    document.querySelector(`[data-id = "${textId}"`).textContent = document.querySelector('.textarea').value
    document.querySelector('.backdrop').remove()
    document.body.classList.remove('open');
    console.log(  document.querySelector(`[data-id = "${textId}"`))
    taskArr.forEach(item => {
        if (item.id === Number(document.querySelector(`[data-id = "${textId}"`).dataset.id)) {
                       console.log(item.id);
        console.log(Number(document.querySelector(`[data-id = "${textId}"`).dataset.id))
            item.task =   document.querySelector(`[data-id = "${textId}"`).textContent
            localStorage.setItem('myTasks',JSON.stringify(taskArr) )
        }
 
    })
}

function onBackdropClick(evt) {

    if (evt.target.classList.contains('backdrop')) {
        document.querySelector('.backdrop').remove()
              document.body.classList.remove('open');
    }
}

function onEscPress(evt) {
    if (evt.code === "Escape") {
        document.querySelector('.backdrop').remove()
        document.body.removeEventListener('keydown', onEscPress)
              document.body.classList.remove('open');
}
}


function showWorningWindow(evt) {
    const backDrop = document.createElement('div');
        backDrop.classList.add('backdrop');


        const modal = document.createElement('div');
    modal.innerHTML = `
        <p class="warningText">
  Поле ввода не должно быть пустым!</p>
   <p class="warningText">Пожалуйстаб введите как минимум один символ!
</p>
<button class="okWarningBtn">Ok</button>
` 
        modal.classList.add('modal', 'warning');

        backDrop.appendChild(modal);
        document.body.appendChild(backDrop);
    document.body.classList.add('open');
    document.querySelector('.okWarningBtn').addEventListener('click', closeWarningWindow)
    
         backDrop.addEventListener('click', onBackdropClick)
        document.body.addEventListener('keydown', onEscPress)
}
    
function closeWarningWindow() {
    document.querySelector('.backdrop').remove()
          document.body.classList.remove('open');
}


function makeTaskDone(evt) {
    if (evt.target.tagName === 'P') {
        const textarea = document.createElement('textarea');
        textarea.classList.add('textarea');
        textarea.cols = 30;
        textarea.rows = 5;
        textarea.value = evt.target.textContent;
        evt.target.replaceWith(textarea);
            textarea.focus();
        textarea.addEventListener('focusout', onFocusOut)
//         evt.target.classList.toggle('linethrough');
//         evt.target.nextElementSibling.lastElementChild.classList.toggle('disabled')
//       console.log(+evt.target.dataset.id )
// console.log(taskArr[taskArr.findIndex(item => item.task === evt.target.textContent)])
//         taskArr[taskArr.findIndex(item => item.task === evt.target.textContent)].done = taskArr[taskArr.findIndex(item => item.task === evt.target.textContent)].done ? false : true;
//         console.log(taskArr)
//                     localStorage.setItem('myTasks',JSON.stringify(taskArr) )
    }
}

function onFocusOut(evt) {
    if (!evt.currentTarget.value) {
        evt.currentTarget.closest('li').remove();
    }
    const text = document.createElement('p');
    text.classList.add('text');
    text.textContent = evt.currentTarget.value
    evt.currentTarget.replaceWith(text)
}
