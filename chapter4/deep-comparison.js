/*
The == operator compares objects by identity. But sometimes you’d prefer to
compare the values of their actual properties.
Write a function deepEqual that takes two values and returns true only if they
are the same value or are objects with the same properties, where the values
of the properties are equal when compared with a recursive call to deepEqual .
To find out whether values should be compared directly (use the === operator
for that) or have their properties compared, you can use the typeof operator.
If it produces "object" for both values, you should do a deep comparison.
But you have to take one silly exception into account: because of a historical
accident, typeof null also produces "object" .
The Object.keys function will be useful when you need to go over the prop-
erties of objects to compare them.
*/

function deepEqual(val1, val2) {
    if (val1 === val2) return true;
    if (typeof(val1) !== "object" ||  typeof(val2) !== "object" || val1 == null || val2 == null)
          return false;
    let keys1 = Object.keys(val1);
    let keys2 = Object.keys(val2);
    if (keys1.length !== keys2.length) return false;
    for (let key of keys1) {
      if (!keys2.includes(key) || !deepEqual(val1[key], val2[key])) return false;
    }
     return true;
   }
   let obj = {here: {is: "an"}, object: 2};
   console.log(deepEqual(obj, obj));
   // → true
   console.log(deepEqual(obj, {here: 1, object: 2}));
   // → false
   console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
   // → true