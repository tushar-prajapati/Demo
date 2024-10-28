// const express = require('express');
// const app = express();
// const port = 2000;

const input = [1,2,3,4,5];

const ans = input.map((i)=>i*2);
const ans2 = input.filter((n)=>{
    if(n%2==0){
        return true;
    }
    else {return false}
});
console.log(ans2+"Hello");
