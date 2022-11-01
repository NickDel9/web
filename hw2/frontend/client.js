
const searchButton = document.getElementById("search-button-index");
const searchInput = document.getElementById("search-index");
const main = document.getElementById("search-results");
const ul = document.getElementById("aside_nav");
const table = document.getElementById("table-results");
const courses = document.getElementById("courses-hierarchy");
const courses_header = document.getElementById("courses-header");
const category_name= document.getElementById("category-name");
const form = document.getElementById("form")
const profile_form = document.getElementById("profile-form")
const profile_overview = document.getElementById("profile-overview")

var templateScript
var html
var template

function Search(){
    let input = searchInput.value;
    SearchCourses(input)
}

function Clear(){
    searchInput.value = ""
    onLoadSearch("")
}

async function initMenu(){
    const api_url = "https://elearning-aueb.herokuapp.com/categories"

    var requestOpt = {
        method: 'GET',
        headers: {
            'Accept': 'application/json', 
        },    
    };

    const response = await fetch(api_url, requestOpt);
    const data = await response.json();
    console.log(data)
    onLoadMenu(data)
}


async function SearchCourses(keyword){

    const api_url = "https://elearning-aueb.herokuapp.com/courses/search?title="

    var requestOpt = {
        method: 'GET',
        headers: {
            'Accept': 'application/json', 
        },    
    };

    const response = await fetch(api_url + keyword , requestOpt);
    const data = await response.json();
    console.log(data)

    onLoadSearch(data)
}

async function initCourses(){

    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');

   console.log("parameter : "+category)

    const api_url = "https://elearning-aueb.herokuapp.com/courses/search?category="

    var requestOpt = {
        method: 'GET',
        headers: {
            'Accept': 'application/json', 
        },    
    };
    const response = await fetch(api_url + category, requestOpt);
    const data = await response.json();
    console.log(data)
    
    onLoadMenu(data)
    // init name of selected category
    const api_url1 = "https://elearning-aueb.herokuapp.com/categories"
    const response1 = await fetch(api_url1, requestOpt);
    const data1 = await response1.json();
    courses_header.innerHTML = `Εξερευνήστε τα μαθήματα της κατηγορίας  ${data1[category-1].title } !`
    
    onLoadCourses(data ,data1[category-1].title)

}


function onLoadSearch(data){

    if (!(data.length>0))
    {
        console.log(`no courses found  ${data.length}`);     
    }
    else{
        console.log(`${data.length} courses found ` );
    }

    if (document.getElementById("handlebars-demo"))
    {
        template = document.getElementById("handlebars-demo").innerHTML
    }


    templateScript = Handlebars.compile(template)
    html = templateScript(data)
    main.innerHTML = html;

}

function onLoadMenu(data){

    if (!(data.length>0))
    {
        console.log(`no aside items found ${data.length}`);   
       // return;
    }
    else{
        console.log(`${data.length} aside items found`);
    }

    if (document.getElementById("handlebars-demo-menu"))
    {
        template = document.getElementById("handlebars-demo-menu").innerHTML
    }

    templateScript = Handlebars.compile(template)
    html = templateScript(data)
    ul.innerHTML = html;

}

function onLoadCourses(data , category){

    if (!(data.length>0))
    {
        console.log(`no courses found ${data.length}`);   
       // return;
    }
    else{
        console.log(`${data.length} courses found` );
    }

    if (document.getElementById("handlebars-demo-courses"))
    {
        template = document.getElementById("handlebars-demo-courses").innerHTML
    }

    for (i = 0; i < data.length; i++)
    {
        data[i].category = category;
    }
   
    templateScript = Handlebars.compile(template)
    html = templateScript(data)
    courses.innerHTML = html;
 
}
//validation


function validate(){
    //passwords
        
     var pass = document.querySelector("#password") ;
     var pass1 = document.querySelector("#validate-password");
     
     let same = pass.value === pass1.value;
     if (!same)
     {
        document.querySelector("#validate-password").setCustomValidity("Passwords don't match")
        document.querySelector("#validate-password").reportValidity()
        return false;
     }
     else{
        pass.setCustomValidity("")
        pass.reportValidity()
     }
  
  //tel
  
     var tname = document.querySelector("#tname");
     
     var RegEx = /^(?:[6]{1}[9]{1}[0-9]{8})$/;
     
     var isValid = false;
  
     console.log(tname.value)
  
     if (RegEx.test(tname.value)) {
        isValid = true;
     }
    
  
     if (!isValid)
     {
        tname.setCustomValidity("invalid tel number")
        tname.reportValidity()
        return false;
     }
     else{
        tname.setCustomValidity("")
        tname.reportValidity()
     }

     return true;
}


async function onSumbit(){

    if (!validate())
        return;

    const url = "http://127.0.0.1:3000/register"

    formData = new FormData(form);
    
    const formentries = Object.fromEntries(formData);
    console.log(formentries); // print json

    var requestOpt = {
        method: 'POST',
        body: JSON.stringify(formentries),
        headers: {
            'Content-type': 'application/json',
            "Accept": "*/*"
        },    
    };

    const response = await fetch(url, requestOpt);
    const data = await response.text();

    console.log(data)

    if (data == "Invalid"){
        alert("Email already exists. Please try again.")
    }

    else if(data == "Valid"){

        var elem = document.createElement("div")
        elem.id = "dynamic-div"
        elem.innerHTML = `<h3 id="dynamic-header">Εγγραφείκατε με επιτυχία! Συνεχίστε την περιήγηση σας </h3>
        <img src="C:/Users/User/Desktop/reg_complete.png" id="reg-complete-logo" alt="logo"  </img>
        <a class = link href="index.html"><li>Επιστροφή στην αρχική σελίδα</li></a>`
        
        var div_out = document.querySelector("main div:first-child")
        if (div_out){
            document.getElementById("main").removeChild(div_out)
            document.getElementById("main").appendChild(elem)
        }
         
    }

}

async function onSumbitProfile(){

    const url = "http://127.0.0.1:3000/profile"

    formData = new FormData(profile_form);
    
    const formentries = Object.fromEntries(formData);
    console.log(formentries); // print json

    var requestOpt = {
        method: 'POST',
        body: JSON.stringify(formentries),
        headers: {
            'Content-type': 'application/json',
            "Accept": "*/*"
        },    
    };

    const response = await fetch(url, requestOpt);
    const data = await response.text();

    console.log(data)

    if (data == "Invalid"){
        alert(`Wrong username or password .Please try again`)
    }
    else if (data == 'Valid'){
        console.log('A')
        getProfile(formentries)
    }
}


async function getProfile(formentries){

    const url = new URL(`http://127.0.0.1:3000/getProfile${formentries.email}-${formentries.password}`)


    console.log(url)
 
    var requestOpt = {
        method: 'GET',
        headers: {
            "Accept": 'application/json',
        },    
    };

    const response = await fetch(url, requestOpt);
    const data = await response.json();

    console.log(data)

    profile_form.style.display = 'none'
    profile_overview.style.display = 'block'
    document.getElementById('submit').style.display = 'none'

    if (document.getElementById("handlebars-demo-profile"))
        template = document.getElementById("handlebars-demo-profile").innerHTML
    
    // var dataArray = []
    for (var item in data){
         console.log(data[item])
    }
    
    templateScript = Handlebars.compile(template)
    html = templateScript(data)
    profile_overview.innerHTML = html
}

