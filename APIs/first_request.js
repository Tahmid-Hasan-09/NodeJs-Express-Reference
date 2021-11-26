/** let request = require('request');
request('http://www.google.com',(error,response,body)=>{
    if(!error && response.statusCode == 200){
        console.log(body);//Show the HTML for google homepage
    }
}); */


/** let request = require('request');
request('http://www.google.com',(error,response,body)=>{
    if(error){
        console.log('Something Went Wrong!!');
        console.log(error);
    }
    else{
        if(response.statusCode == 200){
            //Things Worked
            console.log(body);
        }
    }
}); */

const request = require('request');
/** request('https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400',(error,response,body)=>{
    if(!error && response.statusCode == 200){
        // console.log(typeof body);
        // console.log(body);
        let parsedData = JSON.parse(body);
        console.log('Today Sunrise is at...  ')
        console.log(parsedData.results.sunrise);
        //console.log(parsedData['results']['sunrise']);
    }
}); */

//Go to jsonplaceholder.com for dummy api data
request('https://jsonplaceholder.typicode.com/users/1',(error,response,body)=>{
    // eval(require('locus')) = Freeze the execution & can access to variables
    if(!error && response.statusCode == 200){
        const parsedData = JSON.parse(body);
        console.log(`${parsedData.name} lives in ${parsedData.address.city}`);
    }
});