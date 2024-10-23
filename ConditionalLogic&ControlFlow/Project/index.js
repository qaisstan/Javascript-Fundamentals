import createPrompt from "prompt-sync";
let prompt = createPrompt();

let employee = {};

let firstName = prompt("First Name: ");
if (!firstName) {
  console.error("Invalid first name.");
  process.exit(1);
}
employee.firstName = firstName;

let lastName = prompt("Last Name: ");
if (!lastName) {
  console.error("Invalid first name.");
  process.exit(1);
}
employee.lastName = lastName;

let startDateYear = prompt("Employee Start Year (1990-2023): ");
startDateYear = Number(startDateYear);

if (!Number.isInteger(startDateYear)) {
  console.error("Enter a valid start date year.");
  process.exit(1);
}

if (startDateYear < 1990 || startDateYear > 2023) {
  console.error("Enter a start date year within the correct range. ");
}

let startDateMonth = prompt("Employee start date month (1-12): ");
startDateMonth = Number(startDateMonth);
if (!Number.isInteger(startDateMonth)) {
  console.error("Enter a valid start date month. ");
  process.exit(1);
}
if (startDateMonth < 1 || startDateMonth > 12) {
  console.error("Enter a valid start date month within the correct range. ");
  process.exit(1);
}

let startDateDay = prompt("Employee start date day (1-31): ");
startDateDay = Number(startDateDay);
if (!Number.isInteger(startDateDay)) {
  console.error("Enter a valid start date day within the correct range. ");
  process.exit(1);
}

if (startDateDay < 1 || startDateDay > 31) {
  console.error("Enter a valid start date day within the correct range. ");
  process.exit(1);
}

employee.startDate = new Date(startDateYear, startDateMonth - 1, startDateDay);

let isActive = prompt("Is employee active (yes or no): ");
if (isActive !== "yes" && isActive !== "no") {
  console.error("Please enter yes or no for employee active status. ");
  process.exit(1);
}

employee.isActive = isActive === "yes";
const json = JSON.stringify(employee, null, 2);
console.log(`Employee ${json}`);
