let addtodobutton = document.getElementById("todobutton");
let cont = document.getElementById("toDocontainter");
let inputF = document.getElementById("inputField");
let searchField = document.getElementById("searchField"); 
let trashContainer = document.getElementById("trash");
let lastRemovedTask = null; 
let confirmModal = document.getElementById("confirmModal");
let modalMessage = document.getElementById("modalMessage");
let confirmDelete = document.getElementById("confirmDelete");
let cancelDelete = document.getElementById("cancelDelete");
let taskToDelete = null; 

addtodobutton.addEventListener('click', function() {
    let taskContainer = document.createElement('div'); 
    taskContainer.classList.add('task-container');

    let taskTextContainer = document.createElement('div'); 
    taskTextContainer.classList.add('task-text-container');

    let taskText = document.createElement('span'); 
    taskText.classList.add('paragraphstyling');
    taskText.innerHTML = inputF.value;

    
    let removeButton = document.createElement('span');
    removeButton.innerText = ' X';
    removeButton.style.color = 'red'; 
    removeButton.style.cursor = 'pointer'; 

    taskTextContainer.appendChild(taskText); 
    taskTextContainer.appendChild(removeButton); 
    taskContainer.appendChild(taskTextContainer); 
    cont.appendChild(taskContainer); 
    inputF.value = '';

 
    let originalText = taskText.innerText;

    taskText.addEventListener('click', function() {
        if (taskText.classList.contains('completed')) {
            taskText.classList.remove('completed');
            taskText.innerText = originalText; 
        } else {
            taskText.classList.add('completed');
            let now = new Date();
            let dateString = now.toLocaleString(); 
            taskText.innerHTML = originalText;
            taskText.innerHTML += "<span class='datehour'>" + ` (${dateString})</span>`; 
        }
    });

    
    removeButton.addEventListener('click', function(event) {
        event.stopPropagation(); 
        
        taskToDelete = taskContainer;
        modalMessage.innerText = `Czy na pewno chcesz usunąć: "${taskText.innerText}"?`;
        confirmModal.style.display = 'flex'; 
    });

    
    confirmDelete.addEventListener('click', function() {
        if (taskToDelete) {
            lastRemovedTask = taskToDelete; 
            cont.removeChild(taskToDelete); 
            taskToDelete = null; 
            confirmModal.style.display = 'none';  
        }
    });

  
    cancelDelete.addEventListener('click', function() {
        confirmModal.style.display = 'none'; 
        taskToDelete = null; 
    });
});

document.getElementById("restoreButton").addEventListener('click', function() {
    if (lastRemovedTask) {
        cont.appendChild(lastRemovedTask); 
        trashContainer.removeChild(lastRemovedTask); 
        lastRemovedTask = null; 
    } else {
        alert("Brak elementu do przywrócenia!");
    }
});


searchField.addEventListener('input', function() {
    let filter = searchField.value.toLowerCase(); 
    let tasks = cont.getElementsByClassName('task-container'); 

    
    for (let i = 0; i < tasks.length; i++) {
        let taskText = tasks[i].getElementsByTagName('span')[0].innerText.toLowerCase(); 
        if (taskText.includes(filter)) {
            tasks[i].style.display = ""; 
        } else {
            tasks[i].style.display = "none"; 
        }
    }
});

let toggleHeader = document.getElementById("toggleHeader");
let taskContainer = document.getElementById("toDocontainter");

toggleHeader.addEventListener('click', function() {
    if (taskContainer.style.display === "none" || taskContainer.style.display === "") {
        taskContainer.style.display = "block"; 
    } else {
        taskContainer.style.display = "none"; 
    }
});

