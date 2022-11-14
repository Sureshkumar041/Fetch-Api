var url = "https://jsonplaceholder.typicode.com/users/1";
// var URL ='https://reqres.in/api/users';
var form = document.getElementById("form");

form.addEventListener('submit', e => {
    e.preventDefault();
    var payLoad = new FormData(form);
    console.log(payLoad);
    // console.log("EMAIL: ",payLoad.get('email'));
    var emailinput = document.getElementById("email").value;
    var usernameinput = document.getElementById("username").value;

    fetch(url, {
        method: "DELETE",
        headers: {
            'content-type': 'application/json'
        }
        // body: JSON.stringify({
        //     email: "Suresh",
        //     username: "Ramukhserus"
        // })
    })
        .then(response => {
            if (response.ok) {console.log("DELETE request successfully");}
            else { throw new Error("DELETE request unsuccessfully");}
            return response;
        })
        .then(response => response.json())
        // .then(data => console.log("DATA NEW: ", data))
        // .then(data=> console.log("DATA 6: ",data))
        // .catch(error => console.log(error))
    passData();
});






async function passData() {
    alert("Doneee");
    try {
        var promise = await fetch(url);
        if (promise.status === 200) {
            var response = await promise.json();
            console.log("DATA: ", response);
            userData(response);
        } else throw new Error("INVALID API");
    } catch (error) {
        console.log(error.message);
    }
}
// passData();

userData = (data) => {
    // console.log("USER DATA: ",data);
}


// var promise = fetch(url);

// promise
//     .then(function (response) {
//         if (response.status === 200) return response.json();
//         else throw new Error("INVALID API");
//     })
//     .then(function (data) {
//         console.log("DATA: ", data);
//         passData(data);
//     })
//     .catch(function(error){
//         console.log(error.message);
//     });

// passData = (data) => console.log("PASSING DATA: ", data);




// var r = new XMLHttpRequest();

// r.onload = function(){
//     if(r.status == 200){
//         var data = JSON.parse(r.response);
//         console.log("DATA: ",data);
//         xhr(data);
//     }else{
//         console.log("Service Avaliable");
//     }
// }

// r.open("GET",url);
// r.send();

// xhr=(data)=> console.log("XMLHttpRequest data: ",data);