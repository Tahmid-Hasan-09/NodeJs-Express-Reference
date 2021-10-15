function average(arr){
    let sum = 0;
    let i =0;
    while(i<arr.length ){
        sum = sum+arr[i];
        i++;
    }
    let average = parseInt(Math.ceil(sum/arr.length));
    console.log(`Average : ${average}`);
}

const scores = [90,98,89,100,100,86,94];
average(scores);
const scores2 = [40,65,77,82,80,54,73,63,95,49];
average(scores2);