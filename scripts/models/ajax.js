const newData = {

    id: document.querySelector('#id').value,
    action: document.querySelector('#action').value,
    startDate: document.querySelector('#startDate').value,
    endDate: document.querySelector('#endDate').value,
    excludedDate: document.querySelector('#excludedDate').value,
    leadCount: document.querySelector('#leadCount').value,
    expectedDrr: document.querySelector('#expectedDrr').value,
}

const req = new XMLHttpRequest();

req.open('POST', 'https://reqres.in/api/users');

req.setRequestHeader('Content-Type', 'application/json');

req.addEventListener('load', () => {

    if (req.status === 201 && req.readyState === 4) {
        const response = JSON.parse(req.responseText);
        console.log(response);
        alert("Data has been saved successfully.");
    } else {
        console.error('Something went wrong with the request');
    }
});

req.send(JSON.stringify(newData));