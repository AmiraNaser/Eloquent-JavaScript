// Your code here.
let size = 8;
for (let i = 0; i < size; i++) {
  let output = "";
  for (let j = 0; j < size; j++) {
    if ((i + j) % 2 == 0) {
      output += " "
    } else {
    output += "#"
    }
  }
  console.log(output)
}