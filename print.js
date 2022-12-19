const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input = [];

rl.on('line', (line) => {
  input = line.split(' ').map(element => parseInt(element));
  rl.close();
}).on('close', () => {
  console.log(input);
  let eachNumber = []
  for(let i=0; i<= input.length-1; i++){
    eachNumber.push(input[i]+10);
  }
  const result = eachNumber.join(" ");
  
  console.log(result)
  console.log("끝");
});