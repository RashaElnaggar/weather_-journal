/* Global Variables */
const apiUrl="https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey="&appid=555cd0786680fb8f36e9423b3ab44f0e";
const zipEle=document.getElementById("zip");
const feelingEle=document.getElementById("feelings");
// Create a new date instance dynamically with JS
let time = new Date();
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const month= months[time.getMonth()];
let newDate = month+'.'+ time.getDate()+'.'+ time.getFullYear();
console.log(newDate);
//click event
const showWeathbtn = document.getElementById("generate");
showWeathbtn.addEventListener("click",(e)=>{
    // 
    if(zipEle.value.trim("")===""||feelingEle.value.trim("")===""){
    alert("Enter zipcode and feeling ");
     return;
    }
    else if (isNaN(zipEle.value))
        alert("Enter a numeric value for zip code");
    
    else{
        
    getWeatherByZipcode(apiUrl,zipEle.value,apiKey)
    .then((data)=>{
        console.log(data);
         sendData({date:newDate,temp:data.main.temp,feelings:feelingEle.value,cityName:data.name,humidity:data.main.humidity});
    })
     .then(()=>{
        updateUI();
    })
     
       }
})
  async function getWeatherByZipcode(apiUrl,zipcode,apiKey){
    const weathData = await fetch(apiUrl+zipcode+apiKey);
    try{
        const response  =  await weathData.json();
         console.log(weathData);
         return response;
        }
    catch(error){
        console.log("error",error);
        throw(error);
    }
}
//send post request
async function sendData(data){
    const request= await fetch("/sendData",{
        method:"POST",
        credentials:"same-origin",
        headers:{
            "Content-Type":"application/json" 
        },
        body:JSON.stringify(data),
    })
try{
    const response = await request.json();
    return response;
}
catch(error){
    throw(error)
}
}

async function updateUI(){
    const request= await fetch("/getData");
try {
  const response= await request.json();
  //update UI
  document.getElementById("date").innerHTML= response.date;

var cityTemp= kelvinToCelicius(response.temp);
console.log(cityTemp);
document.getElementById("temp").innerHTML = cityTemp.toFixed(2)+'°C';
document.getElementById("content").innerHTML=response.feelings;
document.getElementById("city").innerHTML=response.cityName;
document.getElementById("humadity").innerHTML='Humidity : '+response.humidity;

} catch (error) {
  throw(error);  
}
 }
  const kelvinToCelicius= function(temprature){
temprature= parseFloat(temprature);
var celiciusTemp=temprature-273.15;
return celiciusTemp;
 }