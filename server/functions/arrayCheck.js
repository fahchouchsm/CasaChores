function arraysSameValues(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    console.log("Not the same length");
    return false;
  }

  return arr1.every((element) => arr2.includes(element));
}

module.exports = arraysSameValues;
