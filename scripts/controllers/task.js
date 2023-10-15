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
    document.querySelector('#clear').addEventListener("click", clearTask);

}

function clearTask() {

    for (let key of fields) {

        if (key === 'monthYear' || key === 'noOfDays' || key === 'lastUpdated')
            continue;

        else
            document.querySelector(`#${key}`).value = '';
    }

    document.querySelector("#action").focus();
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

            let subtractDays = document.querySelector('#excludedDate').value.split(",").length;
            differenceInDays -= subtractDays;

            task[field] = `${differenceInDays}`;
        }

        else if (field === "lastUpdated") {

            const date = new Date();
            let getDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
            let getTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
            task[field] = `${getDate},${getTime}`;
        }

        else
            task[field] = document.querySelector(`#${field}`).value;
    }

    taskOperations.add(task);
    printTask(task);

    clearTask();
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
    
}