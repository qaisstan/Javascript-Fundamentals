import employee from "./data.json" assert { type: "json" };

import createPrompt from "prompt-sync";
let prompt = createPrompt();

const command = process.argv[2].toLowerCase();

switch (command) {
  case "list":
    console.log(`Employee List --------------------`);
    console.log("");

    for (let emp of employee) {
      for (let property in emp) {
        console.log(`${property} ${emp[property]}`);
      }
      console.log("");
      prompt("Press enter to continue...");
    }
    console.log("The employee list is completed!");
    break;

  case "add":
    console.log(`Add Employee ---------------------`);
    console.log("");

    let newEmployee = {};
    let startDateMonth = prompt("Employee Start Date Month (1-12): ");
    startDateMonth = Number(startDateMonth);
    // Check if it is a valid integer
    if (!Number.isInteger(startDateMonth)) {
      console.error(`Enter a valid start date month`);
      process.exit(1);
    }
    // Check if the number is in the range
    if (startDateMonth < 1 || startDateMonth > 12) {
      console.error(`Enter a start date month within the correct range`);
      process.exit(1);
    }

    let startDateDay = prompt("Employee Start Date Day (1-31): ");
    startDateDay = Number(startDateDay);
    // Check if it is a valid integer
    if (!Number.isInteger(startDateDay)) {
      console.error(`Enter a valid start date day`);
      process.exit(1);
    }
    // Check if the number is in the range
    if (startDateDay < 1 || startDateDay > 31) {
      console.error(`Enter a start date day within the correct range`);
      process.exit(1);
    }

    // Date elements are correct, let's create the date
    employee.startDate = new Date(
      startDateYear,
      startDateMonth - 1,
      startDateDay
    );

    let isActive = prompt("Is employee active (yes or no): ");
    // Check if incorrect value was entered
    if (isActive !== "yes" && isActive !== "no") {
      console.error(`Enter yes or no for employee active status`);
      process.exit(1);
    }
    employee.isActive = isActive === "yes";

    // Output Employee JSON
    const json = JSON.stringify(employee, null, 2);
    console.log(`Employee: ${json}`);

    break;

  default:
    console.log(`Unsupported command. Exiting...`);
    console.log("");
    break;
}

let firstName = prompt("First Name: ");
if (!firstName) {
  console.error(`Invalid first name`);
  process.exit(1);
}
employee.firstName = firstName;

let lastName = prompt("Last Name: ");
if (!lastName) {
  console.error(`Invalid last name`);
  process.exit(1);
}
employee.lastName = lastName;

let startDateYear = prompt("Employee Start Year (1990-2023): ");
startDateYear = Number(startDateYear);
// Check if it is a valid integer
if (!Number.isInteger(startDateYear)) {
  console.error(`Enter a valid start date year`);
  process.exit(1);
}
// Check if the number is in the range
if (startDateYear < 1990 || startDateYear > 2023) {
  console.error(`Enter a start date year within the correct range`);
  process.exit(1);
}
