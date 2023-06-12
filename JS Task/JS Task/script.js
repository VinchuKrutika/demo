// var selectedRow = null;

//show alerts
// function showAlert(message, className){
//     const div = document.createElement("div");
//     div.className = `alert alert-${className}`;

//     div.appendChild(document.createTextNode(message));
//     const container = document.querySelector(".main");
//     container.insertBefore(div, main);

//     setTimeout(() => document.querySelector(".alert").remove(), 3000);
// }

//form validation 
function validationform(){
    console.log("going to validation form");
    var id = document.getElementById("id").value;
    var name = document.getElementById("name").value;
    var age = document.getElementById("age").value;
    var gender = document.getElementById("gender").value;
    var people_list;
   

        if(id == ""){
            console.log("please enter your ID")
            alert("id is required");
            return false;
        }else if(isNaN(id)) {
            alert("id should be numeric");
            return false;
        }else if(id <0){
            alert("ID cannot be negative")
            return false;
        }else if(localStorage.getItem("id") === id.value){
            alert("already used!");
            return false;

        }

        if(name == ""){
            alert("name is required");
            return false;
        }

        if(age==""){
                    alert("age is required");
                    return false;
        }else if(age < 18 || age > 65 ){
            alert("Age must be in between 18 and 65");
            return false;
        }

        if(gender == ""){
            alert("gender is required");
            return false;
        }

    return true;
    
}

// display function
function displayData(){
    var people_list;
    if(localStorage.getItem("people_list")== null){
        people_list = [];
    }else people_list= JSON.parse(localStorage.getItem("people_list"));

    var html ="";
    people_list.forEach(function(element, index){
        html += "<tr>";
        html += "<td>" + element.id + "</td>";
        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.age + "</td>";
        html += "<td>" + element.gender + "</td>";
        html += '<td><button onclick="deleteData('+index+')" class = "btn btn danger">Delete</button> <button onclick="editData('+index+')" class = "btn btn warning m-2">Edit</button>';
        html += "</tr>";
    });

    document.querySelector("#crud_table tbody").innerHTML = html;
}

// load all data when document or page loaded
document.onload = displayData();

// function to add data
document.getElementById('add').addEventListener('click',addData);

function addData(){

    // var id = document.getElementById("id").value;
    // var name = document.getElementById("name").value;
    // var age = document.getElementById("age").value;
    // var gender = document.getElementById("gender").value;
    // document.getElementById("edit").style.display= "none";


   
    // function validate(){
    //     console.log("Noooooooooooo")
    //     alert("ID is required");
    //     if(id == ""){
    //         console.log("please enter your ID")
    //         return false;
    //     }

    //     if(name == ""){
    //         alert("name is required");
    //         return false;
    //     }

    //     if(age==""){
    //         alert("age is required");
    //         return false;
    //     }else if(age < 18 || age > 65 ){
    //         alert("Age must be in between 18 and 65");
    //         return false;

    //     }

    //     if(gender == ""){
    //         alert("gender is required");
    //         return false;
    //     }
    //     return true;
    // }



    if(validationform() == true){
        console.log("display process start")
        var id = document.getElementById("id").value;
        var name = document.getElementById("name").value;
        var age = document.getElementById("age").value;
        var gender = document.getElementById("gender").value;
    
        var people_list;
        if(localStorage.getItem("people_list")== null){
            people_list = [];
        }else {
                people_list= JSON.parse(localStorage.getItem("people_list"));
        }    
    

        people_list.push({
            id : id,
            name : name,
            age : age,
            gender : gender
        });

        localStorage.setItem("people_list",JSON.stringify(people_list));
        displayData();

        document.getElementById("id").value= "";
        document.getElementById("name").value= "";
        document.getElementById("age").value= "";
        document.getElementById("gender").value= "";

    }
    console.log("on click not working")
}    

// function to delete data from local storage
function deleteData(index){
    var people_list;
    if(localStorage.getItem("people_list")== null){
        people_list= [];
    }else{
        people_list = JSON.parse(localStorage.getItem("people_list"));
    }

    people_list.splice(index,1);
    localStorage.setItem("people_list", JSON.stringify(people_list));
    displayData();
}


function editData(index){
    document.getElementById("add").style.display= "none";
    document.getElementById("edit").style.display= "block";
    document.getElementById("reset").style.display= "none";


    var people_list;
    if(localStorage.getItem("people_list") == null){
        people_list= [];
    }else{
        people_list = JSON.parse(localStorage.getItem("people_list"));
    }

    document.getElementById("id").value = people_list[index].id;
    document.getElementById("name").value = people_list[index].name;
    document.getElementById("age").value = people_list[index].age;
    document.getElementById("gender").value = people_list[index].gender;

    document.querySelector("#edit").onclick= function(){
        if(validationform){
            people_list[index].id = document.getElementById("id").value;
            people_list[index].name = document.getElementById("name").value;
            people_list[index].age = document.getElementById("age").value;
            people_list[index].gender = document.getElementById("gender").value;

            localStorage.setItem("people_list", JSON.stringify(people_list));

            displayData();

            document.getElementById("id").value = "";
            document.getElementById("name").value = "";
            document.getElementById("age").value = "";
            document.getElementById("gender").value = "";


            //update button will hide and submit button will show

            document.getElementById("add").style.display= "block";
            document.getElementById("edit").style.display= "none";
        

        }
    }
}

//reset btn validation
// let btnClear = document.querySelector('#reset');
// let input_val = document.querySelectorAll('input');

// btnClear.addEventListener('click',()=>{
//     input_val.forEach(input => input.value='');
// });


// delete data
// document.querySelector("#student-list").addEventListener("click",(e => {
//     target = e.target;
//     if (target.classLis.contains("delete")){
//         target.parentElement.parentElement.remove();
//         showAlert("Employee Data Deleted", "danger");
//     }
// }))