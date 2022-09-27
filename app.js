/* Global Variables */
const apiUrl="https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey="&appid=555cd0786680fb8f36e9423b3ab44f0e";
const zipEle=document.getElementById("zip");
const feelingEle=document.getElementById("feelings");
// Create a new date instance dynamically with JS
let date = new Date();
let newDate = date.getMonth()+'.'+ date.getDate()+'.'+ date.getFullYear();
//click event
const showWeathbtn = document.getElementById("generate");
showWeathbtn.addEventListener("click",(e)=>{
    // 
    if(zipEle.value.trim("")===""||feelingEle.value.trim("")===""){
    alert("Enter zipcode and feeling ");
     return;
    }

    else{
        
    getWeatherByZipcode(apiUrl,zipEle.value,apiKey)
    .then((data)=>{
        console.log(data);
         sendData({date:newDate,temp:data.main.temp,feelings:feelingEle.value});
    })
     .then(()=>{
        updateUI();
    })
     
       }
})
  async function getWeatherByZipcode(url,zipcode,Key){
    const weathData = await fetch(url+zipcode+Key);
    try{
        const response  =  await weathData.json();
        // console.log(weathData);
         return response;
        }
    catch(error){
       // console.log("error",error);
        throw(error);
    }
}
//send post request
async function sendData(data){
    const request= await fetch("/senddata",{
        method:"post",
        credentials:"same-origin",
        headers:{
            "Content-Type":"application/json" 
        },
        body:JSON.stringify(data),
    });


try{
    const response = await request.json();
    return response;
}
catch(error){
    throw(error)
}
}

async function updateUI(){
    const request= await fetch("/getdata");
try {
  const response=await request.json();
  //update UI
  document.getElementById("date").innerHTML= response.date;
  document.getElementById("temp").innerHTML= response.temp;
  document.getElementById("content").innerHTML=response.feelings;

} catch (error) {
  throw(error);  
}
 }