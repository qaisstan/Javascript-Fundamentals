// Creating arrays
let arr1 = [];
let arr2 = ["Item1", "Item2"];
let arr3 = new Array();
let arr4 = new Array("Item1", "Item2");

// Accessing values
let names = ["David", "Kim", "Steve", "Katie"];
console.log(`Names Length: ${names.length}`);
console.log(`First Name: ${names[0]}`);
console.log(`Second Name: ${names[1]}`);
console.log(`Tenth Name: ${names[10]}`);

// Searching for Values
const includesDavid = names.includes("David");
console.log(`Includes David: ${includesDavid}`);
const includesTucker = names.includes("Tucker");
console.log(`Includes Tucker: ${includesTucker}`);
const davidIndex = names.indexOf("David");
console.log(`David Index: ${davidIndex}`);
const tuckerIndex = names.indexOf("Tucker");
console.log(`Tucker Index: ${tuckerIndex}`);

// Adding value - at the end
names.push("Shannon");
console.log(names);

// Adding value - at the beginning
names.unshift("Sarah");
console.log(names);

// Adding value - at a specific index
names.splice(1, 0, "William");
console.log(names);

// Removing value - at the beginning
names.shift();
console.log(names);

// Remove value - at a specific index
names.splice(5, 1);
console.log(names);

// Arrays and objects
const obj1 = {
  firstName: "David",
  lastName: "Tucker",
};

const obj2 = {
  firstName: "Sarah",
  lastName: "Jenkins",
};

const obj3 = {
  firstName: "David",
  lastName: "Tucker",
};

const employees = [obj1, obj2];
console.log(`Is identical object in array: ${employees.includes(obj3)}`);
console.log(`Is same object in array: ${employees.includes(obj1)}`);
