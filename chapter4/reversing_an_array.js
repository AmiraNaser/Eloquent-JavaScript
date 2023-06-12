/*
Arrays have a reverse method that changes the array by inverting the order in
which its elements appear. For this exercise, write two functions, reverseArray
and reverseArrayInPlace . The first, reverseArray , takes an array as argument
and produces a new array that has the same elements in the inverse order. The
second, reverseArrayInPlace , does what the reverse method does: it modifies
the array given as argument by reversing its elements. Neither may use the
standard reverse method.
*/
function reverseArray (arr) {
    let newArr = [];
    for (let i = arr.length - 1; i >= 0; i--) {
      newArr.push(arr[i]);
    }
    return newArr;
  }
  //Bubble sort
//   function reverseArrayInPlace (arr) {
//     for (let i = 0;i < arr.length; i++) {
//         for (let j = 0; j < arr.length; j++) {
//           if (arr[j] < arr[j + 1]) {
//             let temp = arr[j];
//             arr[j] = arr[j + 1];
//             arr[j + 1] = temp;
//           }
            
//           }
//         }
//      return arr;
//   }

function reverseArrayInPlace (arr) {
    for (let i = 0; i < Math.floor(arr.length / 2); i++) {
        let temp = arr[i];
        arr[i] = arr[arr.length -1 -i];
        arr[arr.length - 1 - i] = temp;
    }
    return arr;
}