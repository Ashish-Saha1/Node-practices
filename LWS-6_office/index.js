// const fs = require('fs');

// const ourReadStream = fs.createReadStream(`${__dirname}/book.txt`)

// ourReadStream.on('data', (data)=>{
//         //console.log(data.toString());
       
//     })


console.log('Helo');

let x = `I have a cow.
He has four leg.
Has two eyes`  
        
        //let parts =x.split(/\r?\n/)
        let parts = x.split(/\n/);

        console.log(parts);