// Array size declaration and fill an value function
function toFill(arr, val, len){

  for (let i = 0; i < len; i++) {
    arr[i]= val;
  }
}

// Array size undefined and fill all values summation of n
function toFillSumN(arr, val, len){
  for (let i = val; i <= len; i++) {
    arr[i]= i;
  }
}

// generat random number between maximum and minimum number
function getRandomNum(min, max){
  var step1 = max-min+1;
  var step2 = Math.random() * step1;
  return (Math.floor(step2) + min);
}

/*
###### shuffle array short algorithm ####### 
This source code taken from stackoverflow
url: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
*/
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

// ########## Random Numbers Genarator ##########
function randomId() {
  return Math.floor(Math.random() * 999999) + 100000;
}




