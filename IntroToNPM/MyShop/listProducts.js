let fake = require('faker');

console.log("=======================");
console.log("WELCOME TO MY SHOP!");
console.log("======================="); 


for(let i =0;i<10;i++){
    let [ProductName,ProductPrice] = [fake.commerce.productName(),fake.commerce.price()];
    console.log(`${ProductName} - $${ProductPrice}`);
}

    