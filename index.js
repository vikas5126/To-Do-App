// console.log('javascript is included');
let count = 0;
let addbutton = document.getElementById('content');
var addbutton_icon = document.getElementById('addnote-icon');
let all = [];
let complete = [];
let uncomplete = [];

// in this we are setting the add button to show and hide mode 
document.addEventListener('click', (event)=>{
    if(event.target === addbutton || event.target === addbutton_icon){
        return ;
    }
    addbutton_icon.style.display = 'none';
})

function show(){
    addbutton_icon.style.display = 'inline';
}

function hide(){
    addbutton_icon.style.display = 'none';
}


// in this we are adding the note
let taskcontainer = document.getElementById('task-container');
let content = document.getElementById('content');
let footer = document.getElementById('footer');
let taskcount = document.getElementById('task-count');

addbutton_icon.addEventListener('click', ()=>{
    if(content.value != ""){
        let task = {
            id: new Date().getTime(),
            content : content.value,
            check : false
        }
    
        localStorage.setItem(`${task.id}`, JSON.stringify(task));
        let taskid = `${task.id}`;
        all.push(taskid);
        counttask();
        render(task);
        content.value = "";
    }
});
document.addEventListener('keydown', (event)=>{
    if(event.key == 'Enter'){
        if(content.value != ""){
            let task = {
                id: new Date().getTime(),
                content : content.value,
                check : false
            }
        
            localStorage.setItem(`${task.id}`, JSON.stringify(task));
            let taskid = `${task.id}`;
            all.push(taskid);
            counttask();
            render(task);
            content.value = "";
        }
    }
})

// this function is for rendering the note properly
let render = function Render(task){
    // const div = document.createElement("div");
    // div.setAttribute("id", `${task.id}`)
    taskcontainer.innerHTML+=`
        <div id="${task.id}" class="container">
        <div class="checkbox">
            <input type="checkbox" id="check-${task.id}">
        </div>
        <div class="content">
            <p>${task.content}</p>
        </div>
        
            <button class="deletebtn" >
                <i class="fa-solid fa-xmark" id="${task.id}" style="color: #ff0000;"></i>
            </button>
        </div>
    `
    // if(task.check == true){
    //     document.getElementById(`check-${task.id}`).checked = true;
    //     document.getElementById(`${task.id}`).style.textDecoration = 'line-through';
    // }else{
    //     document.getElementById(`check-${task.id}`).checked = false;
    //     document.getElementById(`${task.id}`).style.textDecoration = 'none';
    // }
    // console.log(task.check);
}

// this is when I retrieve from the localStorage 
for(let i=0; i<localStorage.length; i++){
    let n = localStorage.key(i);
    let task = JSON.parse(localStorage.getItem(n));
    all.push(n);
    render(task);
}

// this is for count the total task 
function counttask(){
    taskcount.textContent = localStorage.length;
}
counttask();

// click event on more button 
let completetask = document.getElementById('report');
let clearcomplete = document.getElementById('clear-com');

completetask.addEventListener('click', ()=>{
    completetask.style.color = 'blue';
    setTimeout(()=>{
        completetask.style.color = 'lightgray';
    },200);
})

clearcomplete.addEventListener('click', ()=>{
    clearcomplete.style.color = 'red';
    setTimeout(()=>{
        clearcomplete.style.color = 'lightgray';
    },200);
})


// click task button to know task information 
let allbtn = document.getElementById('all');
let uncompletebtn = document.getElementById('Uncompelete');
let completebtn = document.getElementById('Completed');

allbtn.addEventListener('click', ()=>{
    allbtn.style.fontWeight = '800';
    uncompletebtn.style.fontWeight = '100';
    completebtn.style.fontWeight = '100';
    for(let i=0; i<all.length; i++){
        let task = JSON.parse(localStorage.getItem(all[i]));
        document.getElementById(all[i]).style.display = 'flex';
    }
})


uncompletebtn.addEventListener('click', ()=>{
    allbtn.style.fontWeight = '100';
    uncompletebtn.style.fontWeight = '800';
    completebtn.style.fontWeight = '100';
    for(let i=0; i<all.length; i++){
        let task = JSON.parse(localStorage.getItem(all[i]));
        console.log(task.check);
        if(task.check == true){
            document.getElementById(all[i]).style.display = 'none';
        }
        else{
            document.getElementById(all[i]).style.display = 'flex';
        }
    }
})


completebtn.addEventListener('click', ()=>{
    allbtn.style.fontWeight = '100';
    uncompletebtn.style.fontWeight = '100';
    completebtn.style.fontWeight = '800';
    for(let i=0; i<all.length; i++){
        let task = JSON.parse(localStorage.getItem(all[i]));
        if(task.check == false){
            document.getElementById(all[i]).style.display = 'none';
        }
        else{
            document.getElementById(all[i]).style.display = 'flex';
        }
    }
})

// in this we are deleting the note 
let list = document.querySelector('.list');
let deletebtn = document.querySelector('.deletebtn');
document.addEventListener('click', deletetask);
function deletetask(event){
    for(let i=0; i<all.length; i++){
        if(all[i] == event.target.id){
            all.splice(i, 1);
            let key = event.target.id;
            localStorage.removeItem(key);
            window.location.reload(true);
        }
    }
}


// checkbox funcationality
document.addEventListener('click', (event)=>{
    let id = document.getElementById(`${event.target.id}`);
    for(let i=0; i<all.length; i++){
        if(event.target.id == `check-${all[i]}`){
            let task = localStorage.getItem(all[i]);
            let size = task.length;
            let obj = JSON.parse(task);
            if(task[size-3] == 'u'){
                document.getElementById(`${all[i]}`).childNodes[3].style.textDecoration = 'none';
                obj.check = false;
                localStorage.removeItem(`${all[i]}`);
                localStorage.setItem(`${all[i]}`, JSON.stringify(obj));
                uncomplete.push(all[i]);
                for(let j=0; j<complete.length; j++){
                    if(complete[j] == all[i]){
                        complete.splice(j,1);
                    }
                }
                
                // move(`${all[i]}`);
            }
            else{
                document.getElementById(`${all[i]}`).childNodes[3].style.textDecoration = 'line-through';
                obj.check = true;
                localStorage.removeItem(`${all[i]}`);
                localStorage.setItem(`${all[i]}`, JSON.stringify(obj));
                complete.push(all[i]);
                for(let j=0; j<uncomplete.length; j++){
                    if(uncomplete[j] == all[i]){
                        uncomplete.splice(j,1);
                    }
                }
            }
            
        }
    }
})

// sustain the checkbox and cross line 
for(let i=0; i<all.length; i++){
    let task = localStorage.getItem(all[i]);
    let size = task.length;
    if(task[size-3] == 'u'){
        document.getElementById(`congo-${all[i]}`).style.display = 'none';
        complete.push(all[i]);
        document.getElementById(`check-${all[i]}`).checked = true;
        document.getElementById(`${all[i]}`).childNodes[3].style.textDecoration = 'line-through';
    }else{
        uncomplete.push(all[i]);
        document.getElementById(`check-${all[i]}`).checked = false;
        document.getElementById(`${all[i]}`).childNodes[3].style.textDecoration = 'none';
    }
}

// this is for complete all tasks and clear complete tasks
let comall = document.getElementById('comp-task');
let clearall = document.getElementById('clear-com');
comall.addEventListener('click', ()=>{
    for(let i=0; i<all.length; i++){
        let allcheckbox = document.getElementById(`check-${all[i]}`);
        allcheckbox.checked = true;
        document.getElementById(`${all[i]}`).childNodes[3].style.textDecoration = 'line-through';
        let task = localStorage.getItem(all[i]);
        let obj = JSON.parse(task);
        obj.check = true;
        localStorage.removeItem(`${all[i]}`);
        localStorage.setItem(`${all[i]}`, JSON.stringify(obj));
    }
})
clearall.addEventListener('click', ()=>{
    for(let i=0; i<all.length; i++){
        let allcheckbox = document.getElementById(`check-${all[i]}`);
        if(allcheckbox.checked == true){
            document.getElementById(`${all[i]}`).style.display = 'none';
            localStorage.removeItem(all[i]);
            counttask();
            window.location.reload();
        } 
    }
})