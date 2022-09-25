/* Global Variables */
const apiUrl="https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey="@appid=555cd0786680fb8f36e9423b3ab44f0e";
const zipEle=document.getElementById("zip");
const feelingEle=document.getElementById("feelings");
// Create a new date instance dynamically with JS
let date = new Date();
let newDate = date.getMonth()+'.'+ date.getDate()+'.'+ date.getFullYear();
//click event
document.getElementById('generate').addEventListener('click',e=>{
    // 
    if(zipEle.ariaValueMax.trim("")=="")
    alert("Enter zipcode");
    else if(feelingEle.value.trim("")=="")
    alert("Enter your feeling");
    else
    
});
// const getWeather= function(zipEle,feelingEle){
//     alert("clicked");
// }