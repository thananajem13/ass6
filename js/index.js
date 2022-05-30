var path = window.location.pathname;
var page = path.split("/").pop();
console.log(page);
var users = []; 
if (JSON.parse(localStorage.getItem('users')) != null) {
    var users = JSON.parse(localStorage.getItem('users'));
}
else {
    var users = [];
}
var uPass = null;
var uEmail = null;
var uName = null;
var err = null;
if (page == "index.html") {
    if(sessionStorage.getItem("name")==null){document.getElementById("login-btn").addEventListener('click', function () {
        // alert(ValidateEmail(document.getElementById("userEmail").value)) 
         err = document.getElementById("err"); 
         uPass = document.getElementById("userPassword");
         uEmail = document.getElementById("userEmail");
        var userEmail = document.getElementById("userEmail").value;
        var userPassword = document.getElementById("userPassword").value;
        if ( userEmail.length != 0 || userPassword.length != 0) {
            err.innerHTML = "";
            removeErrEmail();
                    removeErrPass(); 
                    removeErrP();
            if(checkIfUserExist(userEmail)){
if(checkIfPassTrueForThisEmail(userEmail,userPassword)){
    err.innerHTML = "sucess";
    removeErrEmail();
            removeErrPass(); 
            removeErrP();
             
                                sessionStorage.setItem("name", getNameForEmail(userEmail));
                                pageRedirect("http://127.0.0.1:5500/home.html");
}
else{
    err.innerHTML = "incorrect password";
    addErrEmail()
    addErrPass()
    addErrP()
     
}
            }
            else{
                err.innerHTML = "incorrect email";
                addErrEmail();
                addErrPass();
                addErrP(); 
            }
        }
        else{
            err.innerHTML = "All inputs is required";
            addErrEmail();
            addErrPass();
            addErrP();  
        }
    })}
    else{pageRedirect("http://127.0.0.1:5500/home.html");}
    
}
else if (page == "home.html") { 
    if(sessionStorage.getItem("name")!=null){
        document.getElementById("username").innerHTML = `Welcome ${sessionStorage.getItem("name")}`;
        document.getElementById("logout").addEventListener('click',function(){
            sessionStorage.removeItem("name");
            pageRedirect("http://127.0.0.1:5500/index.html");
        })
    }
    else{
        pageRedirect("http://127.0.0.1:5500/index.html");
    }

}
// sign up page
else if (page == "sign-up.html") {
    if(sessionStorage.getItem("name")==null){

         err = document.getElementById("err");
         uName = document.getElementById("userName");
         uPass = document.getElementById("userPassword");
         uEmail = document.getElementById("userEmail");
    
        document.getElementById("signUp").addEventListener('click', function () {
            var userName = document.getElementById("userName").value;
            var userEmail = document.getElementById("userEmail").value;
            var userPassword = document.getElementById("userPassword").value;
            if (userName.length != 0 || userEmail.length != 0 || userPassword.length != 0) {
                err.innerHTML = "";
                removeErrEmail();
                removeErrName();
                removeErrP();  
                if (ValidateEmail(userEmail)) { 
                    if (CheckPassword(userPassword)) { 
                        err.innerHTML = "";
                        removeErrPass(); 
                        if (checkUserName(userName)) { 
                            removeErrName(); 
                            //check if email or name is exist
                            if (!checkIfUserExist(userEmail)) { 
                                //excellent
                                removeErrEmail(); 
                                var signleUser = { "username": userName, "userpassword": userPassword, "useremail": userEmail };
                                if (addUser(signleUser)) {
                                    err.innerHTML = "sucess";
                                    removeErrP(); 
                                    pageRedirect("http://127.0.0.1:5500/index.html");
                                }
                                else {
                                    err.innerHTML = "fail";
                                    addErrP(); 
                                     
                                }
                            }
                            else { 
                                err.innerHTML = "user email already exist";
                                addErrEmail()
                                addErrP()
                                 
                            }
                        }
                        else { 
                            err.innerHTML = "user name should start with character or underscore (required) and can add number and dot and dash and underscore and other letters after that (optional) ";
                            addErrName();
                            addErrP();
                             
    
                        }
    
                    }
                    else {
                        addErrPass();
                        addErrP(); 
                        err.innerHTML = "password between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter"; 
                         
                    }
                }
                else {
                    addErrEmail()
                    addErrP() 
                    err.innerHTML = "enter valid email"; 
                }
            }
            else {
                err.innerHTML = "All inputs is required"; 
    addErrEmail()
    addErrPass()
    addErrName()
    addErrP() 
            }
        })
    }
    else{
        pageRedirect("http://127.0.0.1:5500/home.html");
    }

}
else {
    if(sessionStorage.getItem("name")==null){
        pageRedirect("http://127.0.0.1:5500/index.html");
    }
    else{
        pageRedirect("http://127.0.0.1:5500/home.html");
    }
    //check if user login if true appear home page else appear login page
}
// login, sign up and home

function addErrName(){
    uName.classList.add('is-invalid');
    uName.classList.remove('is-valid');
}
function addErrPass(){
    uPass.classList.add('is-invalid');
    uPass.classList.remove('is-valid');
}
function addErrEmail(){
    uEmail.classList.add('is-invalid');
    uEmail.classList.remove('is-valid');
}
function removeErrName(){
    uName.classList.remove('is-invalid');
    uName.classList.add('is-valid');
}
function removeErrPass(){
    uPass.classList.remove('is-invalid');
    uPass.classList.add('is-valid');
}
function removeErrEmail(){
    uEmail.classList.remove('is-invalid');
    uEmail.classList.add('is-valid');
}
function addErrP(){
    err.classList.add("alert-danger");
    err.classList.remove("alert-success");
}
function removeErrP(){
    err.classList.remove("alert-danger");
    err.classList.add("alert-success");
}
//login page 
function getNameForEmail(userEmail){
    for(var count=0;count<users.length;count++){
        if(users[count].useremail == userEmail){
            return users[count].username;
        }
    }
    return "";
}
// sign up page
function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return (true)
    } 
    return (false)
}
function CheckPassword(inputtxt) {
    var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (inputtxt.match(passw)) { 
        return true;
    }
    else {  
        return false;
    }
}
function checkUserName(userNameVal) {
    var usernameRegex = /^[a-z_A-Z]{3,}[0-9]*[ \. \- \_]?[a-z_A-Z]*[0-9]*$/;
    return usernameRegex.test(userNameVal);
}
function addUser(userObj) {
    var lastLenBeforeAdd = users.length; 
    
    users.push(userObj);
    localStorage.setItem('users', JSON.stringify(users));
    
    var lastLenAfterAdd = users.length; 
    return lastLenAfterAdd == lastLenBeforeAdd + 1;
}
function checkIfUserExist(userEmail) {
    for (var count = 0; count < users.length; count++) {
        if (users[count].useremail == userEmail) {
            return true;
        }
    }
    return false;
}
function pageRedirect(url) {
    window.location.replace(url);
    // or
    // window.location.href(url);
} 
// login
function checkIfPassTrueForThisEmail(userEmail,userPassword){
    for(var count=0;count<users.length;count++){
       if(users[count].useremail == userEmail &&
        users[count].userpassword == userPassword ){
            return true;
        } 
    }
    return false;
}
 