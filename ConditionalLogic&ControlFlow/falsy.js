// Simply function to log out truthyness
const isTruthy = (name, exp) => {
  console.log(`${name}: ${Boolean(exp)}`);
}

// Numbers
isTruthy("val1", 0);
isTruthy("val2", 1);
isTruthy("val3", -1);
isTruthy("val4", NaN);
isTruthy("val5", 0n);

// Boolean, Null, and Undefined
isTruthy("val6", undefined);
isTruthy("val7", null);
isTruthy("val8", false);

// Strings
isTruthy("val9", "");
isTruthy("val10", "Hi");
isTruthy("val11", "false");

// Objects
isTruthy("val12", {});

// Undefined variables
let var1;
isTruthy("val13", var1);
