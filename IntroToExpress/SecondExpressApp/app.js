const express = require('express');

const app = express();
const port = 3001;

app.get('/',(req,res)=>{
    res.send('Hi there,welcome to my assignment!');
});

app.get('/speak/:animal',(req,res)=>{
    const sounds ={
        pig:'Oink',
        cow:'Moo',
        dog:'Woof Woof!',
        cat:'I hate you human',
        goldfish:'...'
    }
    
    let animal = req.params.animal.toLowerCase();
    let sound = sounds[animal];
    res.send(`The ${animal} says '${sound}'`);
    // switch(param){
    //     case 'pig':
    //         res.send(`The ${param} says '0ink'`);
    //         break;
    //     case 'cow':
    //         res.send(`The ${param} says 'Moo'`);
    //         break;
    //     case 'dog':
    //         res.send(`The ${param} says 'Woof Woof!'`);
    //         break;
    // }


});

app.get('/repeat/:greeting/:id',(req,res)=>{
    let greeting = req.params.greeting;
    let id = Number(req.params.id);
    let result =''; 
    for(let i =0;i<id;i++){
        result = result+` ${greeting}`;
    }
    res.send(result);
});



app.get('*',(req,res)=>{
    res.send('Sorry,page not found...What are you doing with your life?');
});

app.listen(port,()=>{
    console.log(`Example app listening at http://localhost:${port}`);
});