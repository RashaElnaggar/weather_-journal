// Setup empty JS object to act as endpoint for all routes
let  projectData = {};

// Require Express to run server and routes-----

const express =require('express');

// Start up an instance of app--------
const app = express();
/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
const bodyParser= require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
const { message } = require('statuses');
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));
const port = 4000;


// Setup Server
app.listen(port,listening);
function listening(){
    console.log("O.K server is running");
    console.log(`running on http://localhost at port:${port}`);
};
//get data
app.get('/getdata',function(req,res){
res.send(projectData);
})
//send data
app.post('/postdata',function(req,res){
    projectData=req.body;
    res.send({message:"successfuly added data"})
});

