import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3002;

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => { req.body; res.sendFile(__dirname + "/Exercise1.html");});


//findSummation
app.post('/findSummation',(req,res)=>{
    const N = req.body.Num;
    const result = findSummation(N);
    if(result===false){
        res.send("Invalid input");
    }
    else{
        res.send(`The summation of 1 to ${N} is ${result}`);
    }
});

//uppercaseFirstAndLast
app.post('/uppercaseFirstAndLast',(req,res)=>{
    const word = req.body.word;
    const result = uppercaseFirstAndLast(word);
    if(result===false){
        res.send("Invalid input");
    }
    else{
        res.send(`The modified word is ${result}`);
    }
});

//findAverageAndMedian
app.post('/findAverageAndMedian',(req,res)=>{
    const numbersArr = req.body.ArrayOfnumbers;
    const result = findAverageAndMedian(numbersArr);
    if(result===false){
        res.send("Invalid input");
    }
    else{
        res.send(`The average is ${result[0]} and the median is ${result[1]}`);
    }
});


// Function: findSummation
function findSummation (N = 1){
    let sum = 0;
    if(isNaN(N)||N<0){
        return false;
    }
    for(let i = 1;i <= N;i++){
        sum += i;
    }
    return sum;
}

//findFourDigits
app.post('/findFourDigits',(req,res)=>{
    const stringOfNumbers = req.body.stringOfNumbers;
    const result = findFourDigits(stringOfNumbers);
    if(result===false){
        res.send("Invalid input");
    }
    else{
        res.send(`The first four digits are ${result}`);
    }
});


//Function: uppercaseFirstAndLast
function uppercaseFirstAndLast(word){
    if(typeof word != "string"){
        return false;
    }
    let modifiedWord = word.charAt(0).toUpperCase()+word.substring(1,word.length-1)+word.charAt(word.length-1).toUpperCase();
    return modifiedWord;
}

//Function: findAverageAndMedian
function findAverageAndMedian(numbers){
    const arr = numbers.split(",");
    if(!Array.isArray(arr)){
        return false;
    }
    let sum = 0;
    for(let i = 0;i<arr.length;i++){
        sum += parseInt(arr[i]);
    }
    let average = sum/(arr.length);
    let median=0;
    arr.sort((a,b)=>a-b);

    const mid= Math.floor(arr.length/2);
   

    if(arr.length%2!=0){
        median = arr[mid];
    }
    else {
        median = (parseFloat(arr[mid - 1]) + parseFloat(arr[mid]))/2;
    }
    let result = [average,median];
    return result;
}

//Function: findFourDigits
function findFourDigits(stringOfNumbers){
    if(typeof stringOfNumbers != "string"||stringOfNumbers.length<4){
        return false;
    }
    let arr = stringOfNumbers.split(" ");
    const fourDigits=[];
    for(let i = 0;i<arr.length&&i<4;i++){
        fourDigits.push(arr[i]);
    }
    return fourDigits;
}

 app.listen(port, () =>{console.log(`The server is listening on port ${port}`)});