let students = []

let studentName = document.getElementById("studentName")
let studentMarks = document.getElementById("studentMarks")
let studentForm  = document.getElementById("studentForm")
let filterSelect = document.getElementById("filterSelect")


let total = document.getElementById("totalStudents")
let average = document.getElementById("averageMarks")
let passed = document.getElementById("passedStudents")
let demo = document.getElementById("demo");
let table = document.getElementById("studentTable")
let heading = document.getElementById("topper")
let mainHeading = document.querySelector("header h1")
let dashboard = document.querySelector(".dashboard")
let button = document.querySelector("#studentForm button")
let search = document.querySelector("#searchInput")
// let changeBtn = document.getElementById("changeBtn")
// let countBtn = document.getElementById("countBtn")
// let clickCount = document.getElementById("clickCount");
// let count = 0




studentForm.addEventListener("submit",function(event){
event.preventDefault()
let name = studentName.value;
let marks = Number(studentMarks.value);
if (name.trim() === "") {
    alert("Please enter student name");
    return;
}
if (studentMarks.value.trim() === "") {
    alert("Please enter marks");
    return;
}
if (marks < 0 || marks > 100) {
    alert("Marks must be between 0 and 100");
    return;
}

let newStudent = {
    name:name,
    marks:marks
}

students.push(newStudent);
studentForm.reset();
displayStudent();
updateDashboard()
updateAverage()
updateTopper()
updatePassedStudent()
console.log(students);
})


function displayStudent(studentList = students){
    table.innerHTML=""
    studentList.forEach(function(student){
        let status;
        if(student.marks>=40){
            status = "Passed"
        }
        else{
            status = "Failed"
        }
        table.innerHTML += `
    <tr>
        <td>${student.name}</td>
        <td>${student.marks}</td>
        <td>${status}</td>
           <td>
           <button class="deleteBtn" data-name="${student.name}">
    Delete
</button>
        </td>
    </tr>
`;
    })

    
}


 table.addEventListener("click", function(event) {
    if (event.target.classList.contains("deleteBtn")) {

        let studentName = event.target.dataset.name;

        let index = students.findIndex(student => student.name === studentName);

        if (index !== -1) {
            students.splice(index, 1);

            displayStudent();
            updateDashboard();
            updateAverage();
            updateTopper();
            updatePassedStudent();

            console.log(studentName + " deleted!");
        }
    }
});



function updateDashboard(){
 
    total.textContent = students.length
   
}
function updateAverage(){
        if (students.length === 0) {
        average.textContent = 0;
        return;
    }

let totalMarks = students.reduce((sum,student)=>{
      return sum+student.marks
},0)

let avg = totalMarks/students.length
average.textContent = avg

}


function updateTopper() {
    if (students.length === 0) {
        heading.textContent = "No students yet";
        return;
    }

    let topperStudent = students[0];

    students.forEach((student) => {
        if (student.marks > topperStudent.marks) {
            topperStudent = student;
        }
    });
heading.textContent = `${topperStudent.name} - ${topperStudent.marks}`;

}

function updatePassedStudent(){
    let PassedStudent = students.filter((student)=>{
        return student.marks>=40
      
    })
      passed.textContent = PassedStudent.length
}


filterSelect.addEventListener("change", () => {

    let selectValue = filterSelect.value;

    if (selectValue === "all") {
        displayStudent(students);
    }

    else if (selectValue === "passed") {
       let passedStudents = students.filter((student) => {
    return student.marks >= 40;
});
displayStudent(passedStudents)
    }

    else if (selectValue === "failed") {
       let failedStudent = students.filter((student)=>{
        return student.marks<40
       })
       displayStudent(failedStudent)
    }

});






// countBtn.addEventListener("click",()=>{

//     count ++
//   clickCount.textContent = count

// })

// changeBtn.addEventListener("click",function(){
//      document.querySelector("header h1").textContent =
//         "Welcome Ashab!";
// })

search.addEventListener("input",function(){
    console.log(search.value);
      let searchValue = search.value.toLowerCase();
      let searchStudent = students.filter((student)=>{
     
            return student.name.toLowerCase().includes(searchValue);
        
      })
  displayStudent(searchStudent)
})


// button.addEventListener("click", function () {
//     document.getElementById("demo").textContent =
//         "Student button clicked!";
// });


mainHeading.style.color = "lightblue"

// Main heading font size
mainHeading.style.fontSize = "35px";

// Table background
table.style.backgroundColor = "#f1f5f9";

// Topper font weight
heading.style.fontWeight = "bold";
heading.style.color = "green"
dashboard.style.backgroundColor = "#dbeafe";
demo.innerHTML =  `
    <h2>Welcome to Student Analyzer</h2>
    <p>Manage your student records easily.</p>
`

// total.textContent = 10
// average.textContent = 76.5
// topper.textContent = "Cristiano"
// passed.textContent = 4
// table.innerHTML = `<tr>
//     <td>Ashab</td>
//     <td>85</td>
//     <td>Pass</td>
// </tr>

//     <tr>
//         <td>Rahul</td>
//         <td>72</td>
//         <td>Pass</td>
//     </tr>

//     <tr>
//         <td>Aman</td>
//         <td>35</td>
//         <td>Fail</td>
//     </tr>`

console.log(total);