// function declaration

function isInputValidDepartment(input) {
  const departmentNames = ["marketing", "human resource"];
  if (departmentNames.includes(input)) {
    return true;
  } else {
    return false;
  }
}

console.log(isInputValidDepartment("Qais"));
