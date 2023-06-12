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

    let iderror= document.getElementById('idmsg');
    let nameerror= document.getElementById('namemsg');
    let ageerror= document.getElementById('agemsg');
    let gendererror= document.getElementById('gendermsg');
   

        if(id == ""){
            console.log("please enter your ID")
            iderror.innerHTML="please enter your ID";
            return false;
        }else if(isNaN(id)) {
            iderror.innerHTML= "id should be numeric";
            return false;
        }else if(id <0){
            // alert("ID cannot be negative")
            iderror.innerHTML = "ID cannot be negative";
            return false;
        }
        // else if(people_list.getItem("id") === id.value){
        //     iderror.innerHTML = "ID already used!";
        //     return false;

        // }


        
        if(name == ""){
            // alert("name is required");
            nameerror.innerHTML = "Please enter your first name & last name";
            return false;
         }
        //else if(name_validation ){
        //     alert("Family name can only contain alphanumeric characters and hypehns(-)")
        //     return false;
        // }


        

        if(age == ""){
                    // alert("age is required");
                    ageerror.innerHTML = "Age is required!";
                    return false;
        }else if(age < 18 || age > 65 ){
            ageerror.innerHTML = "Age must be in between 18 and 65";

            // alert("Age must be in between 18 and 65");
            return false;
        }

        if(gender == ""){
            // alert("gender is required");
            gendererror.innerHTML = "gender is required";
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
        html += '<td><button onclick="deleteData('+index+')" class="btn" id="delete-btn" >Delete</button> <button onclick="editData('+index+')" id="edit" class ="btn">Edit</button>';
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
    document.getElementById("update").style.display= "block";
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

    document.querySelector("#update").onclick= function(){
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
            document.getElementById("update").style.display= "none";
        

        }
    }
}

// sort ID column
function sortID(n, evt){
    var table = document.querySelector('table'),
        thead = document.querySelector('thead'),
        tbody = table.querySelector('tbody'),
        bRows = [...tbody.rows];
        hData = [...thead.querySelectorAll('th')],
        desc = false;

        hData.map((head)=>{
            if(head != evt){
                head.classlist.remove('asc', 'desc');
            }
        });

        desc = evt.classlist.cotains('asc') ? true : false;
        evt.classlist[desc ? 'remove' : 'add']('asc');
        evt.classlist[desc ? 'add' : 'remove']('desc');


        tbody.innerHTML = '';
        bRows.sort((a,b) =>{
            let x = a.getElementsByTagName('td')[n].innerHTML.toLowerCase(),
                y = b.getElementsByTagName('td')[n].innerHTML.toLowerCase();
        return desc ? (x < y ? 1 : -1) : (x < y ? -1 : 1);
        });
        bRows.map((bRows) =>{
            console.log(bRows.innerHTML);
            tbody.appendChild(bRows);
        });
        console.log("bRows");
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