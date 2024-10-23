// Import Sample Data
import employees from "./data.json" assert { type: "json" };

import createPrompt from "prompt-sync";
let prompt = createPrompt();

function getInput(promptText, Validator, transformer) {
  let value = prompt(promptText);
  return value;
}

// Application Commands ----------------------------------------------------------------------
function listEmployees() {
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
}

function addEmployee() {
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
}
// Application Execution ---------------------------------------------------------------------

// Get the command the user wants to exexcute
const command = process.argv[2].toLowerCase();

switch (command) {
  case "list":
    listEmployees();
    break;

  case "add":
    addEmployee();
    break;

  default:
    console.log("Unsupported command. Exiting...");
    process.exit(1);
}
