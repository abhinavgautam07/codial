const express=require('express');
const routes=require('./routes');
const app=express();
app.use('/',routes);


const port=8000;

app.listen(port,function(err){
if(err){
    console.log(`Error in running in the server:${err}`);
}
console.log(`Server is running on port: ${port}`);
});