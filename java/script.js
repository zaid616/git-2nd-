function showOutput(output) {
    document.getElementById("div4").innerHTML = output
}

function inputValue(fieldId) {
    return document.getElementById(fieldId).value;
}

function randomId() {
   return Math.random().toString(36).slice(2);
}

let emailFormat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

// --------------------------------------------------------------------------------------------------------------------------------------------------------------

var users = []

function User(firstName, lastName, email, dob, status, role) {
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.dob = dob
    this.id = randomId()
    this.dateCreated = new Date().getTime()
    this.status = status
    this.role = role
}

User.prototype.calculateAge = function () {
    var dob = new Date(this.dob);
    let currentAge = new Date()  
    //calculate month difference from current date in time  
    var month_diff = currentAge.getTime() - dob.getTime();  
      
    //convert the calculated difference in date format  
    var age_dt = new Date(month_diff);   
      
    //extract year from date      
    var year = age_dt.getUTCFullYear();  
      
    //now calculate the age of the user  
    var age = Math.abs(year - 1970);

    return age;
}

const formFunction = () => {
     event.preventDefault()

     let firstName = inputValue("firstName")
     let lastName = inputValue("lastName")
     let email = inputValue("email")
     let dob = inputValue("dob")

     firstName = firstName.trim()
     lastName = lastName.trim()
     email = email.trim()

     if (firstName.length < 3) {
        showToast("Please Enter Your First Name", "error")
        return;
     }
     if (!emailFormat.test(email)) {
        showToast("Please Enter Your Email", "error")
        return;
     }
     if (!dob) {
        showToast("Please Enter Your Date Of Birth", "error")
        return
     }

     let user = new User(firstName, lastName, email, dob, "active", "student")

     users.push(user)
     showToast("A new user has been successfully added", "success");

}

const bt2 = () => {
    if (!users.length) {
        showToast("There is not a single user available", "error")
        return
    }

    let startingCode = '<div class="table-responsive"><table class="table table-hover">'
    let headCode = '<thead><tr><th scope="col">#</th><th scope="col">First Name</th><th scope="col">Last Name</th><th scope="col">Handle</th><th scope="col">DOB</th><th scope="col">Age</th></tr></thead>'

    let endingCode = '</table></div>'

    let bodyCode = ''

    for (let i = 0; i < users.length; i++) {
        bodyCode += '<tr><th scope="row">'+ (i +1) +'</th><td>'+users[i].firstName + '</td><td>' + users[i].lastName + '</td><td>'+ users[i].email +'</td><td>'+ users[i].dob +'</td><td>'+ users[i].calculateAge() +'</td></tr>'
    }

    let table = startingCode + headCode + "<tbody>" + bodyCode + "</tbody>" + endingCode

    showOutput(table)
}

const bt3 = () => {
    if (!users.length) {
        showToast("There is not a single user available", "error")
        return;
    }

    for (let i = 0; i < users.length; i++) {
        let user = users[i]
        console.log(user)
    }
}


// -------------------------------------------------------------------------------------------------------------------------------------------------------------
const clearB = () => {
    let clearOutput = document.getElementById("div4").innerHTML;

    if (!clearOutput) {
          showToast("Output Is Already Clear", "error")
    } else {
        showOutput("")
        showToast("Output Has Been Cleared", "success")

    }
}


function showToast(msg, type) {
    let bgColor 
    switch (type) {
        case "error":
            bgColor = "linear-gradient(to right, #1a2a6c, #b21f1f, #f64f59)"
            break;
        case "success":
            bgColor = "linear-gradient(to right, #12c2e9, #c471ed, #f64f59)"
            break;
        default:
            bgColor = "#000"
            break;
    }

    Toastify({
        text: msg,
        duration: 3000,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        style: {
          background: bgColor,
        },
      }).showToast();
}
