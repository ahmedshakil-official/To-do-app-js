let form = document.querySelector('#task-form');
let task_list = document.querySelector('ol');
let search = document.querySelector('#task-filter');
let task_input = document.querySelector('#new-task')
let all_delete = document.querySelector('#clear-tasks') 

// Add Event listener


form.addEventListener('submit',addTask= e =>{
    if(task_input.value === ''){
        alert("Add a Task!")
    }
    else{
        let li =document.createElement('li')
        li.appendChild(document.createTextNode(task_input.value + ' '));
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = 'x'
        
        li.appendChild(link);
        task_list.appendChild(li);
        storeTaskInLocalStroge(task_input.value);

        task_input.value='';
    }
    e.preventDefault();
});

task_list.addEventListener('click', removeTask = e => {
    if(e.target.hasAttribute('href')){
        if(confirm('Are you sure?')){
            let element = e.target.parentElement;
            element.remove();
            removeFromLS(element);
        }
    }
});

all_delete.addEventListener('click', deleteAll = e =>{
    if(task_list){
        while(task_list.firstChild){
            task_list.removeChild(task_list.firstChild);

        }
        localStorage.clear();
    }
})

search.addEventListener('keyup', filterTask = e =>{
    let text = e.target.value.toLowerCase();
    document.querySelectorAll('li').forEach(task => {
        let item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        }
        else{
            task.style.display = 'none';
        }
    })
})

function storeTaskInLocalStroge(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

document.addEventListener('DOMContentLoaded',getTasks = e => {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(task =>{
        let li =document.createElement('li')
        li.appendChild(document.createTextNode(task + ' '));
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = 'x'
        
        li.appendChild(link);
        task_list.appendChild(li);
    })
})

function removeFromLS(element){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    let li = element;
    li.removeChild(li.lastChild);
    tasks.forEach((task, index) => {
        if(li.textContent.trim() === task){
            tasks.splice(index, 1)
        }
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
}