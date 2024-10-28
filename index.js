const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

var users= [{
    name: "John",
    kidneys: [{
        health: false
    }]
}];

app.get('/',(req,res)=>{
    const johnKidneys = users[0].kidneys;
    const nofKidneys = johnKidneys.length;
    let nofHealthyKidneys = 0;
    for(let i=0; i<johnKidneys.length; i++){
        if(johnKidneys[i].health){
            nofHealthyKidneys +=1;
        }
    }
    const nofUnhealthyKidneys = nofKidneys - nofHealthyKidneys;
    res.json({
        johnKidneys,
        nofKidneys,
        nofHealthyKidneys,
        nofUnhealthyKidneys
    })
});
app.post('/',(req,res)=>{
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        health: isHealthy
    });
    res.json({
        msg: "Done!"
    })
});
app.put('/',(req,res)=>{
    for(let i =0; i< users[0].kidneys.length; i++){
        if(!users[0].kidneys[i].health){
            users[0].kidneys[i].health = true;
        }
    }
    res.json({});
});
app.delete('/',(req,res)=>{
    if(isThereAtLeastOneUnhealthyKidney()){
        const newKidneys= [];
    for(let i = 0;i<users[0].kidneys.length;i++){
        if(users[0].kidneys[i].health){
            newKidneys.push({
                health: true
            })
        }
    }
    users[0].kidneys = newKidneys;
    res.json({});
    }
    else{
        res.status(411).json({
            msg: "No unhealthy Kidneys!"
        })
    }
});

function isThereAtLeastOneUnhealthyKidney(){
    let atLeastOneUnhealthyKidney = false;
    for(let i=0;i<users[0].kidneys.length; i++){
        if(!users[0].kidneys[i].health){
            atLeastOneUnhealthyKidney = true;
        }
    }
    return atLeastOneUnhealthyKidney;   
}

app.listen(port,()=>{
    console.log("Port: ", port);
    
});