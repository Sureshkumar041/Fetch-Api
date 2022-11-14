// var url = "https://jsonplaceholder.typicode.com/users";
console.log("JS Connected");
var action = '<i class="fa fa-edit" id="edit" onclick="onEdit(this)"></i> <i class="fa fa-trash text-danger" onclick="onDelete(this)"></i>'
var row, proms,data;


async function defaulfData() {
    try {
        var promise = await fetch("https://jsonplaceholder.typicode.com/users");
        if (promise.ok) {
            console.log("Get Request Successfully")
            data = await promise.json();
            console.log("DATA: ", data);
            tableShow(data);
        }
        else throw new Error("Get Request Unsuccessfully");
    } catch (error) {
        console.log(error);
    }
}
defaulfData();

try {
    tableShow = (data) => {
        console.log("Passed Api Data: ", data[0].address.geo.lat);
        var tbody = document.getElementById("tbody");
        data.forEach(element => {
            var newRow = tbody.insertRow();
            var cell = newRow.insertCell(0);
            cell.innerHTML = element.id;
            var cell = newRow.insertCell(1);
            cell.innerHTML = element.name;
            var cell = newRow.insertCell(2);
            cell.innerHTML = element.username;
            var cell = newRow.insertCell(3);
            cell.innerHTML = element.email;
            var cell = newRow.insertCell(4);
            cell.innerHTML = element.address.street;
            var cell = newRow.insertCell(5);
            cell.innerHTML = element.address.suite;
            var cell = newRow.insertCell(6);
            cell.innerHTML = action;
            var cell = newRow.insertCell(7);
            cell.innerHTML = element.address.city;
            var cell = newRow.insertCell(8);
            cell.innerHTML = element.address.zipcode;
            var cell = newRow.insertCell(9);
            cell.innerHTML = element.address.geo.lat;
            var cell = newRow.insertCell(10);
            cell.innerHTML = element.address.geo.lng;
            var cell = newRow.insertCell(11);
            cell.innerHTML = element.phone;
            var cell = newRow.insertCell(12);
            cell.innerHTML = element.website;
            var cell = newRow.insertCell(13);
            cell.innerHTML = element.company.name;
            var cell = newRow.insertCell(14);
            cell.innerHTML = element.company.catchPhrase;
            var cell = newRow.insertCell(15);
            cell.innerHTML = element.company.bs;
        });
        var tbody = document.getElementById("tbody");
        // console.log("TBODY: ",tbody);
        var tr = tbody.querySelectorAll("tr");
        // console.log("ROW TR : ", tr);

        var tabledata = [];
        tr.forEach(element => {
            tabledata.push(element);
        });
        tableData(tabledata);
        // console.log("TABLE DATA: ", tabledata);
    }
} catch (error) {
    console.log(error);
}

onEdit = (row) => {
    alert("Edit");
    row = row.parentNode.parentNode.rowIndex;
    console.log("ROW EDIT INDEX: ", row);
    url = "https://jsonplaceholder.typicode.com/users/" + row;
    console.log("URL PUT: ", url);

    // async function editData(){
    //     try {
    //         prom = await fetch(url);
    //         // if(Response.ok) 
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }  
}

onDelete = (r) => {
    alert("Delete");
    row = r.parentNode.parentNode.rowIndex;
    console.log("ROW DELETE INDEX: ", row);
    url = "https://jsonplaceholder.typicode.com/users/" + row;
    console.log("URL DELETE: ", url);
    var id = document.getElementById("table").rows[row].cells[0].innerHTML;
    console.log("USER ID: ",id);

    if (confirm("Do you want delete this record ?")) {
        fetch(url, {
            method: "DELETE",
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) console.log("DELETE request successfully");
                else throw new Error("DELETE request unsuccessfully");
                return response;
            })
            .then(response => response.json())
            .then(data => console.log("DATA NEW: ", data))
            .catch(error => console.log(error))
        document.getElementById("table").deleteRow(row);
        console.log("DEL LOOP: ",data);
        var deluser = data.findIndex(i => i.id == id);
        console.log("Index of user in data: ",deluser);
        data.splice(deluser,1);
        // data.forEach(element => {
        //     if(id === element.id){

        //     }
        // });
    } else console.log("Deleting Process Cancelled !");
}

tableData=(tabledata)=>{
    console.log("Function tdata: ",tabledata);
}


addData=()=>{
    document.getElementsByClassName(".rightside").style.display = "none";
}
onSubmit=()=>{
    alert("Submit Doneee...");
}

onCancel=()=>{
    
}