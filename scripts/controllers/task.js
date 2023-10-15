// Glue b/w View and Model
// Controller doing DOM input, output
window.addEventListener("load", init);

let taskObject;
const fields = ["action", "id", "startDate", "endDate", "monthYear", "excludedDate", "noOfDays", "leadCount", "expectedDrr", "lastUpdated"];
let incNumber;

function init() {

    bindEvents();
}

function bindEvents() {

    document.querySelector('#add').addEventListener("click", addTask);
    document.querySelector('#delete').addEventListener("click", deleteTasks);
    document.querySelector('#update').addEventListener("click", updateTask);
    document.querySelector("#loadFromServer").addEventListener("click", loadFromServer);
    document.querySelector('#clear').addEventListener("click", clearTask);

}

function clearTask() {

    for (let key of fields) {

        document.querySelector(`#${key}`).value = '';
    }

    document.querySelector("#name").focus();
}

function updateTask() {

    for (let key in taskObject) {

        if (key === 'markForDelete')
            continue;

        taskObject[key] = document.querySelector(`#${key}`).value;
    }

    printTasks();
}

function deleteTasks() {

    taskOperations.remove();
    countUpdate();
    printTasks();
}

function addTask() {

    const task = {};

    for (let field of fields) {

        if (field === "monthYear") {

            let month = document.querySelector('#startDate').value.split("-")[1];
            let year = document.querySelector('#startDate').value.split("-")[2];
            task[field] = `${month},${year}`;

        }

        else if (field === "noOfDays") {

            let date1 = document.querySelector('#startDate').value.split("-").join("/");
            date1 = new Date(date1);
            let date2 = document.querySelector('#endDate').value.split("-").join("/");
            date2 = new Date(date2);

            let differenceInDays = date2.getTime() - date1.getTime();
            differenceInDays = differenceInDays / (1000 * 3600 * 24);

            task[field] = `${differenceInDays}`;
            console.log(document.querySelector('#excludedDate'));
        }

        else if (field === "lastUpdated") {

            const date = new Date();
            let getTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
            task[field] = `${getTime}`;
        }

        else
            task[field] = document.querySelector(`#${field}`).value;
    }

    taskOperations.add(task);
    printTask(task);

    clearTask();
}

function createIcon(className, fn, taskid) {

    let icon = document.createElement('i');
    icon.className = `fas ${className}`;
    icon.setAttribute("task-id", taskid);
    icon.addEventListener('click', fn);
    return icon;
}

function edit() {

    let id = this.getAttribute("task-id");
    taskObject = taskOperations.searchById(id);

    for (let key in taskObject) {

        if (key === 'markForDelete')
            continue;

        if (key === 'id')
            document.querySelector(`#${key}`).innerText = taskObject[key];

        document.querySelector(`#${key}`).value = taskObject[key];
    }

}

function markForDelete() {

    let id = this.getAttribute("task-id");
    taskOperations.mark(id);

    let tr = this.parentNode.parentNode;
    tr.classList.add('alert');
    tr.classList.toggle('alert-danger');

    countUpdate();
}

function printTasks() {

    document.querySelector('#tasks').innerHTML = ``;

    let allTasks = taskOperations.getAllTasks();
    allTasks.forEach(printTask);
}

function printTask(task) {

    let tbody = document.querySelector('#tasks');
    let tr = tbody.insertRow();
    let idx = 0;

    for (let key in task) {

        if (key === 'markForDelete')
            continue;

        tr.insertCell(idx).innerText = task[key];
        idx++;
    }

    let editIcon = createIcon('fa-edit me-2', edit, task.id);
    let deleteIcon = createIcon('fa-trash-alt', markForDelete, task.id);

    let td = tr.insertCell(idx);
    td.appendChild(editIcon);
    td.appendChild(deleteIcon);
}