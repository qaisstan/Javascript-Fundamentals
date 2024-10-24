import fs from "node:fs/promises";

// Global variables --------------------------------------------

let employees = [];

let currencyData;

// Curremncy data -----------------------------------------------

const getCurrencyConversionData = async () => {
  const headers = new Headers();
  headers.append("apikey", "6261ce1c6a0c4f7e9d67b1bfa5e8410e");
  const option = {
    method: "GET",
    redirect: "follow",
    headers,
  };
  const response = await fetch(
    "https://api.apilayer.com/exchangerates_data/latest?base=USD",
    options
  );

  if (!response.ok) {
    throw new Error("Cannot fetch currency data.");
  }
  currencyData = await response.json();
};

const getSalary = (amountUSD, currency) => {
  const amount =
    currency === "USD" ? amountUSD : amountUSD * currencyData.rates[currency];
  const formatter = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  });
  return formatter.format(amount);
};

// Loading and writing data to the file system ------------------

const loadData = async () => {
  console.log("Loading employees....");
  try {
    const fileData = await fs.readFile("./data.json");
    employees = JSON.parse(fileData);
  } catch (err) {
    console.error("Cannot load in employees");
    throw err;
  }
};

const writeData = async () => {
  console.log("Writing Employees....");
  try {
    await fs.writeFile("./data.json", JSON.stringify(employees, null, 2));
  } catch (err) {
    console.console.error("Cannot write employee data.");
    throw err;
  }
};

import createPrompt from "prompt-sync";
let prompt = createPrompt();

const logEmployee = (employee) => {
  Object.entries(employee).forEach((entry) => {
    if (entry[0] !== "salaryUSD" || entry[0] !== "localCurrency") {
      console.log(`${entry[0]}: ${entry[1]}`);
    }
  });
  console.log(`Salary USD: ${getSalary(employee.salaryUSD, "USD")}`);
  console.log(
    `Local Salary: ${getSalary(employee.salaryUSD, employee.localCurrency)}`
  );
};

function getInput(promptText, validator, transformer) {
  let value = prompt(promptText);
  if (validator && !validator(value)) {
    console.error(`--Invalid input`);
    return getInput(promptText, validator, transformer);
  }
  if (transformer) {
    return transformer(value);
  }
  return value;
}

const getNextEmployeeId = () => {
  const maxID = Math.max(...employees.map((e) => e.id));
  return maxID + 1;
};

// Validator functions ---------------------------------------------------

const isStringInputValid = (input) => {
  return input ? true : false;
};

const isBooleanInputValid = function (input) {
  return input === "yes" || input === "no";
};

const isIntegerValid = (min, max) => {
  return (input) => {
    let numValue = Number(input);
    if (!Number.isInteger(numValue) || numValue < min || numValue > max) {
      return false;
    }
    return true;
  };
};

const isCurrencyCodeValid = function (code) {
  const currencyCode = Object.keys(currencyData.rates);
  return currencyCode.indexOf(code) > -1;
};
// Application commands --------------------------------------------------

function listEmployees() {
  console.log(`Employee List ----------------------------`);
  console.log("");

  employees.forEach((e) => {
    logEmployee(e);
    prompt("Press enter to continue...");
  });
  console.log(`Employee list completed`);
}

async function addEmployee() {
  console.log(`Add Employee -----------------------------`);
  console.log("");
  let employee = {};
  employee.id = getNextEmployeeId();
  employee.firstName = getInput("First Name: ", isStringInputValid);
  employee.lastName = getInput("Last Name: ", isStringInputValid);
  let startDateYear = getInput(
    "Employee Start Year (1990-2023): ",
    isIntegerValid(1990, 2023)
  );
  let startDateMonth = getInput(
    "Employee Start Date Month (1-12): ",
    isIntegerValid(1, 12)
  );
  let startDateDay = getInput(
    "Employee Start Date Day (1-31): ",
    isIntegerValid(1, 31)
  );
  employee.startDate = new Date(
    startDateYear,
    startDateMonth - 1,
    startDateDay
  );
  employee.isActive = getInput(
    "Is employee active (yes or no): ",
    isBooleanInputValid,
    (i) => i === "yes"
  );
  employee.salaryUSD = getInput(
    "Annual salary in USD: ",
    isIntegerValid(10000, 1000000)
  );
  employee.localCurrency = getInput(
    "Local currency (3 letter Code) ",
    isCurrencyCodeValid
  );

  employees.push(employee);
  await writeData();
}

// Search for employees by id
function searchById() {
  const id = getInput("Employee ID: ", null, Number);
  const result = employees.find((e) => e.id === id);
  if (result) {
    console.log("");
    logEmployee(result);
  } else {
    console.log("No results...");
  }
}

// Search for employees by name
function searchByName() {
  const firstNameSearch = getInput("First Name: ").toLowerCase();
  const lastNameSearch = getInput("Last Name: ").toLowerCase();
  const results = employees.filter((e) => {
    if (
      firstNameSearch &&
      !e.firstName.toLowerCase().includes(firstNameSearch)
    ) {
      return false;
    }
    if (lastNameSearch && !e.lastName.toLowerCase().includes(lastNameSearch)) {
      return false;
    }
    return true;
  });
  results.forEach((e, idx) => {
    console.log("");
    console.log(
      `Search Result ${idx + 1} -------------------------------------`
    );
    logEmployee(e);
  });
}

// Application execution -------------------------------------------------

const main = async () => {
  // Get the command the user wants to exexcute
  const command = process.argv[2].toLowerCase();

  switch (command) {
    case "list":
      listEmployees();
      break;

    case "add":
      await addEmployee();
      break;

    case "search-by-id":
      searchById();
      break;

    case "search-by-name":
      searchByName();
      break;

    default:
      console.log("Unsupported command. Exiting...");
      process.exit(1);
  }
};

loadData()
  .then(getCurrencyConversionData)
  .then(main)
  .catch((err) => {
    console.error("Cannot complete startup.");
    throw err;
  });
