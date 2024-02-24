let express= require('express');
// let mysql=require('mysql');
let cors=require('cors')
let connection= require('../Server/DB/db')
let registrationService= require('./Routes/RegistrationServices')
const bodyParser = require('body-parser');

let app=express();

app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));
app.use('/', registrationService)
app.listen(4444,()=>{
    console.log("listening to port 4444")
})

connection.connect((err)=>{
if(err){
    console.log(err)
    console.log("Unable to connect")
}
else{
    // console.log(err);
    console.log("connected")
}
})

