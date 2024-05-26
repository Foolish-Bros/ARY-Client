import  express  from "express";
import path from 'path';


const app= express();

app.listen(3000,function(){
    console.log('listening on 3000')
})

app.use(express.static(path.join(__dirname,'./build')));

app.get('*',function(req,res){
    res.sendFile(path.join(__dirname,'./build/index.html'));
});