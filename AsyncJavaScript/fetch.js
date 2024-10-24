const myHeaders = new Headers();
myHeaders.append("apikey", "6261ce1c6a0c4f7e9d67b1bfa5e8410e");

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

try {
  const result = await fetch(
    "https://api.apilayer.com/exchangerates_data/latest?base=USD",
    requestOptions
  );
  const resultObj = await result.json();
  console.log(JSON.stringify(resultObj, null, 2));
} catch (err) {
  console.error(`Could not fetch currency data`);
  throw err;
}
