var url = "https://jsonplaceholder.typicode.com/users", posturl;
console.log("JS Connected");
var action = '<i class="fa fa-edit" id="edit" onclick="onEdit(this)"></i> <i class="fa fa-trash text-danger" onclick="onDelete(this)"></i>'
var xhr, row, proms, data, userinput;
var tbody;

// async function defaulfData() {
//     try {
//         var promise = await fetch("https://jsonplaceholder.typicode.com/users");
//         if (promise.ok) {
//             console.log("Get Request Successfully")
//             data = await promise.json();
//             console.log("DATA: ", data);
//             tableShow(data);
//         }
//         else throw new Error("Get Request Unsuccessfully");
//     } catch (error) {
//         console.log(error);
//     }
// }
// defaulfData();


// Ajax Method
async function ajaxMethod() {
    try {
        xhr = new XMLHttpRequest();
        xhr.onload = function () {
            // console.log("Data This: ",this.response);
            // data = this.response; 
            if (xhr.status > 199 && xhr.status < 300) {
                console.log("Get request successfully !");
                data = JSON.parse(this.response);
                tableShow(data);
            }
            else console.log("S");
        };
        xhr.open("GET", url);
        xhr.send();
    } catch (error) {
        console.log(error);
    }
}
ajaxMethod();

// Table creation
try {
    tableShow = (data) => {
        tbody = document.getElementById("tbody");
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
            cell.innerHTML = action;
            var cell = newRow.insertCell(6);
            cell.innerHTML = element.address.suite;
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
        var tr = tbody.querySelectorAll("tr");
        var tabledata = [];
        tr.forEach(element => {
            tabledata.push(element);
        });
        tableData(tabledata);
    }
} catch (error) {
    console.log(error);
}

// Edit Function => edit already exists data => Get Method
onEdit = (row) => {
    document.getElementById("updateBtn").style.display = "";
    document.getElementById("submitBtn").style.display = "none";
    document.getElementById("submitDiv").style.display = "none";
    document.getElementById("searchdiv").style.display = "none";
    document.getElementById("rightdata").style.display = "none";
    document.getElementById("righttable").style.display = "none";
    document.getElementById("forms").style.display = "block";
    rowindex = row.parentNode.parentNode.rowIndex;
    posturl = "https://jsonplaceholder.typicode.com/users/" + rowindex;
    try {
        xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (xhr.status > 199 && xhr.status < 300) {
                console.log("Get request successfully !");
                data = JSON.parse(this.response);
                console.log("DITING DATA: ", data.username);
                document.getElementById("name").value = data.name;
                document.getElementById("username").value = data.username;
                document.getElementById("email").value = data.email;
                document.getElementById("street").value = data.address.street;
                document.getElementById("suite").value = data.address.suite;
                document.getElementById("city").value = data.address.city;
                document.getElementById("zipcode").value = data.address.zipcode;
                document.getElementById("latitude").value = data.address.geo.lat;
                document.getElementById("longitude").value = data.address.geo.lng;
                document.getElementById("phno").value = data.phone;
                document.getElementById("website").value = data.website;
                document.getElementById("cmpyname").value = data.company.name;
                document.getElementById("catchphrase").value = data.company.catchPhrase;
                document.getElementById("cmpybs").value = data.company.bs;
            }
            else throw new Error("Get request unsuccessfull !");
        };
        xhr.open("GET", posturl);
        xhr.send();
    } catch (error) {
        console.log(error);
    }
}

// Delete Function => Deleting particular data => Delete Method
onDelete = (r) => {
    // alert("Delete");
    row = r.parentNode.parentNode.rowIndex;
    url = "https://jsonplaceholder.typicode.com/users/" + row;
    var id = document.getElementById("table").rows[row].cells[0].innerHTML;
    console.log("USER ID: ", id);

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
        var deluser = data.findIndex(i => i.id == id);
        data.splice(deluser, 1);
    } else console.log("Deleting Process Cancelled !");
}

tableData = (tabledata) => {
    // console.log("Function tdata: ", tabledata);
}

// Add Data Function => Add new data in api => Post Method
try {
    addData = (data, url) => {
        document.getElementById("submitBtn").style.display = "";
        document.getElementById("updateBtn").style.display = "none";
        document.getElementById("searchdiv").style.display = "none";
        document.getElementById("rightdata").style.display = "none";
        document.getElementById("righttable").style.display = "none";
        document.getElementById("forms").style.display = "block";
    }
} catch (error) {
    console.log(error);
}
// Form submit => Prevent from auto submission 
var form = document.getElementById("form");
form.addEventListener('submit', e => {
    e.preventDefault();
})

// Update Function => Put method 
onUpdate = () => {
    userinput = enteredInput();
    alert("PUT METHOD START");
    try {
        fetch(posturl, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userinput)
        })
            .then(response => {
                if (response.ok) console.log("PUT request successfully");
                else throw new Error("PUT request unsuccessfully");
                return response;
            })
            .then(response => response.json())
            .then(data => putMethod(data))
        putMethod = (data) => {
            var cells = document.getElementById("table").rows[rowindex].cells;
            cells[5].innerHTML = data.name;
            cells[1].innerHTML = data.name;
            cells[2].innerHTML = data.username;
            cells[3].innerHTML = data.email;
            cells[4].innerHTML = data.address.street;
            cells[5].innerHTML = action;
            cells[6].innerHTML = data.address.suite;
            cells[7].innerHTML = data.address.city;
            cells[8].innerHTML = data.address.zipcode;
            cells[9].innerHTML = data.address.geo.lat;
            cells[10].innerHTML = data.address.geo.lng;
            cells[11].innerHTML = data.phone;
            cells[12].innerHTML = data.website;
            cells[13].innerHTML = data.company.name;
            cells[14].innerHTML = data.company.catchPhrase;
            cells[15].innerHTML = data.company.bs;
        }
    } catch (error) {
        console.log(error);
    }

    console.log("Add data successfully");
    document.getElementById("forms").style.display = "none";
    document.getElementById("searchdiv").style.display = "";
    document.getElementById("rightdata").style.display = "";
    document.getElementById("righttable").style.display = "";
}

// Submit Function => Post Method => Adding data in API
onSubmit = () => {
    // alert("Submit Doneee...");
    // document.getElementById("searchdiv").style.display = "";
    // document.getElementById("rightdata").style.display = "";
    // document.getElementById("righttable").style.display = "";

    // try {
    //     xhr = new XMLHttpRequest();
    //     xhr.onload = function(){
    //         // console.log("Data This: ",this.response);
    //         // data = this.response; 
    //         if(xhr.status > 199 && xhr.status < 300){
    //             console.log("POST request successfully !");
    //             data = JSON.parse(this.response);
    //             console.log("Data Parse: ",data);
    //             tableShow(userinput);
    //             document.getElementById("searchdiv").style.display = "";
    //             document.getElementById("rightdata").style.display = "";
    //             document.getElementById("righttable").style.display = "";
    //         } 
    //         else throw new Error("POST request unsuccessfull !");
    //     };
    //     xhr.open("POST",url);
    //     xhr.send(JSON.stringify(userinput));

    // } catch (error) {
    //     console.log(error);
    // }

    userinput = enteredInput();
    alert("POST METHOD START");
    fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(userinput)
    })
        .then(response => {
            if (response.ok) { console.log("POST request successfully"); }
            else { throw new Error("POST request unsuccessfully"); }
            return response;
        })
        .then(response => response.json())
        .then(newdata => tdata(newdata))
    tdata = (newdata) => {
        var newRow = tbody.insertRow();
        var id = tbody.rows.length;
        console.log("Row length: ", id);
        var cell = newRow.insertCell(0);
        cell.innerHTML = id;
        var cell = newRow.insertCell(1);
        cell.innerHTML = newdata.name;
        var cell = newRow.insertCell(2);
        cell.innerHTML = newdata.username;
        var cell = newRow.insertCell(3);
        cell.innerHTML = newdata.email;
        var cell = newRow.insertCell(4);
        cell.innerHTML = newdata.address.street;
        var cell = newRow.insertCell(5);
        cell.innerHTML = action;
        var cell = newRow.insertCell(6);
        cell.innerHTML = newdata.address.suite;
        var cell = newRow.insertCell(7);
        cell.innerHTML = newdata.address.city;
        var cell = newRow.insertCell(8);
        cell.innerHTML = newdata.address.zipcode;
        var cell = newRow.insertCell(9);
        cell.innerHTML = newdata.address.geo.lat;
        var cell = newRow.insertCell(10);
        cell.innerHTML = newdata.address.geo.lng;
        var cell = newRow.insertCell(11);
        cell.innerHTML = newdata.phone;
        var cell = newRow.insertCell(12);
        cell.innerHTML = newdata.website;
        var cell = newRow.insertCell(13);
        cell.innerHTML = newdata.company.name;
        var cell = newRow.insertCell(14);
        cell.innerHTML = newdata.company.catchPhrase;
        var cell = newRow.insertCell(15);
        cell.innerHTML = newdata.company.bs;
        console.log("Add data successfully");
        document.getElementById("forms").style.display = "none";
        document.getElementById("searchdiv").style.display = "";
        document.getElementById("rightdata").style.display = "";
        document.getElementById("righttable").style.display = "";
    }
}

// Cancel Function => Close the Form
onCancel = () => {
    alert("Cancel");
    document.getElementById("forms").style.display = "none";
    document.getElementById("searchdiv").style.display = "";
    document.getElementById("rightdata").style.display = "";
    document.getElementById("righttable").style.display = "";
}

// Entered Input => Object => Return User Input
enteredInput = () => {
    var nameinput = document.getElementById("name").value.trim();
    var usernameinput = document.getElementById("username").value.trim();
    var emailinput = document.getElementById("email").value.trim();
    var streetinput = document.getElementById("street").value.trim();
    var suiteinput = document.getElementById("suite").value.trim();
    var cityinput = document.getElementById("city").value.trim();
    var zipcodeinput = document.getElementById("zipcode").value.trim();
    var latitideinput = document.getElementById("latitude").value.trim();
    var longitudeinput = document.getElementById("longitude").value.trim();
    var phnoinput = document.getElementById("phno").value.trim();
    var websiteinput = document.getElementById("website").value.trim();
    var cmpynameinput = document.getElementById("cmpyname").value.trim();
    var catchphraseinput = document.getElementById("catchphrase").value.trim();
    var cmpybsinput = document.getElementById("cmpybs").value.trim();
    tbody = document.getElementById("tbody");
    var geo = {}, userinput = {}, company = {}, address = {};
    userinput = {
        name: nameinput,
        username: usernameinput,
        email: emailinput,
        address: {
            street: streetinput,
            suite: suiteinput,
            city: cityinput,
            zipcode: zipcodeinput,
            geo: {
                lat: latitideinput,
                lng: longitudeinput
            }
        },
        phone: phnoinput,
        website: websiteinput,
        company: {
            name: cmpynameinput,
            catchPhrase: catchphraseinput,
            bs: cmpybsinput
        }
    }
    return userinput;
}

// User Profile detail
userProfile=()=>{
    console.log("User profile");
    document.getElementById("userdetails").style.display = "block";
    document.getElementById("searchdiv").style.visibility = "hidden";  
} 

done=()=>{
    document.getElementById("searchdiv").style.visibility = "visible";
    document.getElementById("userdetails").style.display = "none";
} 